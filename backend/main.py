from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS for frontend communication
origins = [
    "http://localhost:5173",
    "https://www.bigfat.ai",
    "https://bigfat.ai",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Keys
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
SITE_URL = "https://www.bigfat.ai" 
SITE_NAME = "BIGFAT AI"

# Data Models
class ChatRequest(BaseModel):
    message: str
    history: list = []

def load_knowledgebase():
    try:
        # Knowledgebase is now in backend/data/ for security
        file_path = os.path.join(os.path.dirname(__file__), "data", "knowledgebase.txt")
        with open(file_path, "r") as f:
            return f.read()
    except Exception as e:
        print(f"Error loading knowledgebase: {e}")
        return "BIGFAT AI Labs is an enterprise AI company."

KNOWLEDGE_BASE = load_knowledgebase()

@app.get("/")
def read_root():
    return {"status": "Chatbot Backend Running"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        return {
            "response": "I am connected, but the API Key is missing. Please add OPENROUTER_API_KEY to backend/.env."
        }

    # Construct the system prompt
    messages = [
        {
            "role": "system",
            "content": f"""You are a helpful support assistant for BIGFAT AI Labs. 
            Your goal is to provide concise, to-the-point answers using the following context. 
            Avoid long paragraphs. Use clear, short sentences or bullet points. 
            If the answer is not in the context, politely say you don't know and offer to connect them to human support.

            Context:
            {KNOWLEDGE_BASE}
            """
        }
    ]
    
    # Add conversation history (optional: limit length)
    messages.extend(request.history)
    
    # Add current user message
    messages.append({"role": "user", "content": request.message})

    # Call OpenRouter API
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "openai/gpt-4o", 
        "messages": messages
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data
        )
        response.raise_for_status()
        result = response.json()
        ai_message = result['choices'][0]['message']['content']
        return {"response": ai_message}
    
    except Exception as e:
        print(f"API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
