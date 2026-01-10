"""
LLM service for OpenRouter API integration.
Handles API calls, retry logic, and multi-model support.
"""

import logging
from typing import List, Dict, Any, Optional
import asyncio
import aiohttp
from aiohttp import ClientError, ClientTimeout
from app.core.config import settings
from app.schemas.chatbot import ChatMessage

logger = logging.getLogger(__name__)


class LLMService:
    """Service for interacting with OpenRouter LLM API."""
    
    def __init__(self):
        self.api_url = settings.OPENROUTER_API_URL
        self.api_key = settings.OPENROUTER_API_KEY
        self.default_model = settings.OPENROUTER_MODEL
        self.fallback_model = settings.OPENROUTER_FALLBACK_MODEL
        self.timeout = ClientTimeout(total=settings.REQUEST_TIMEOUT)
    
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        stream: bool = False
    ) -> Dict[str, Any]:
        """
        Send chat completion request to OpenRouter API.
        
        Args:
            messages: List of message dictionaries
            model: Model to use. Defaults to settings.OPENROUTER_MODEL
            temperature: Sampling temperature. Defaults to settings.TEMPERATURE
            max_tokens: Maximum tokens. Defaults to settings.MAX_TOKENS
            stream: Whether to stream response
            
        Returns:
            Dict containing the response
            
        Raises:
            Exception: If API call fails after retries
        """
        model = model or self.default_model
        temperature = temperature if temperature is not None else settings.TEMPERATURE
        max_tokens = max_tokens or settings.MAX_TOKENS
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": settings.SITE_URL,
            "X-Title": settings.SITE_NAME,
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }
        
        if stream:
            payload["stream"] = True
        
        # Try primary model first, then fallback
        models_to_try = [model]
        if self.fallback_model and model != self.fallback_model:
            models_to_try.append(self.fallback_model)
        
        last_exception = None
        
        for attempt_model in models_to_try:
            payload["model"] = attempt_model
            
            try:
                logger.info(f"Calling OpenRouter API with model: {attempt_model}")
                
                async with aiohttp.ClientSession(timeout=self.timeout) as session:
                    async with session.post(
                        self.api_url,
                        headers=headers,
                        json=payload
                    ) as response:
                        response.raise_for_status()
                        result = await response.json()
                        
                        logger.info(f"Successfully received response from {attempt_model}")
                        return result
                        
            except ClientError as e:
                last_exception = e
                logger.warning(f"API call failed with model {attempt_model}: {e}")
                
                # If this is the last model, raise the exception
                if attempt_model == models_to_try[-1]:
                    logger.error(f"All models failed. Last error: {e}")
                    raise
                
                # Otherwise, try the next model
                logger.info(f"Trying fallback model: {self.fallback_model}")
                continue
                
            except Exception as e:
                last_exception = e
                logger.error(f"Unexpected error calling OpenRouter API: {e}")
                raise
        
        # This shouldn't be reached, but just in case
        raise last_exception or Exception("Unknown error in LLM service")
    
    async def stream_chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
    ):
        """
        Stream chat completion from OpenRouter API.
        
        Args:
            messages: List of message dictionaries
            model: Model to use
            temperature: Sampling temperature
            max_tokens: Maximum tokens
            
        Yields:
            str: Content chunks as they arrive
        """
        model = model or self.default_model
        temperature = temperature if temperature is not None else settings.TEMPERATURE
        max_tokens = max_tokens or settings.MAX_TOKENS
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": settings.SITE_URL,
            "X-Title": settings.SITE_NAME,
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": True
        }
        
        try:
            logger.info(f"Starting streaming request with model: {model}")
            
            async with aiohttp.ClientSession(timeout=self.timeout) as session:
                async with session.post(
                    self.api_url,
                    headers=headers,
                    json=payload
                ) as response:
                    response.raise_for_status()
                    
                    async for line in response.content:
                        if line:
                            line_str = line.decode('utf-8').strip()
                            
                            # OpenRouter uses SSE format: "data: {...}"
                            if line_str.startswith('data: '):
                                data_str = line_str[6:]  # Remove "data: " prefix
                                
                                if data_str == '[DONE]':
                                    break
                                
                                try:
                                    import json
                                    data = json.loads(data_str)
                                    
                                    if 'choices' in data and len(data['choices']) > 0:
                                        delta = data['choices'][0].get('delta', {})
                                        content = delta.get('content', '')
                                        
                                        if content:
                                            yield content
                                            
                                except json.JSONDecodeError:
                                    logger.warning(f"Failed to parse streaming data: {data_str}")
                                    continue
                                    
        except Exception as e:
            logger.error(f"Error in streaming completion: {e}")
            raise
    
    def estimate_tokens(self, text: str) -> int:
        """
        Roughly estimate token count for text.
        Uses simple heuristic: ~4 characters per token.
        
        Args:
            text: Text to estimate
            
        Returns:
            int: Estimated token count
        """
        return len(text) // 4
    
    def count_messages_tokens(self, messages: List[Dict[str, str]]) -> int:
        """
        Estimate total tokens in message list.
        
        Args:
            messages: List of messages
            
        Returns:
            int: Estimated total tokens
        """
        total = 0
        for msg in messages:
            total += self.estimate_tokens(msg.get('content', ''))
            total += 4  # Overhead per message
        
        return total


# Global LLM service instance
llm_service = LLMService()


def get_llm_service() -> LLMService:
    """
    Dependency to get LLM service.
    
    Returns:
        LLMService: LLM service instance
    """
    return llm_service
