# BIGFAT AI Chatbot Service

Production-ready, scalable chatbot service built with FastAPI, MongoDB, and OpenRouter API.

## Features

✨ **Enterprise Architecture**
- Layered architecture (Router → Service → Repository)
- Async/await for high performance
- MongoDB for conversation persistence
- Redis support for caching and rate limiting (optional)

🚀 **Production Ready**
- Docker containerization
- Health checks and monitoring
- Structured logging
- Graceful shutdown handling
- CORS configuration

🤖 **AI Capabilities**
- OpenRouter API integration
- Multi-model support with fallback
- Streaming responses
- Conversation history management
- Response caching (with Redis)

## Quick Start

### Prerequisites
- Python 3.11+
- MongoDB Atlas account (or local MongoDB)
- OpenRouter API key
- (Optional) Redis for caching

### Installation

1. **Clone and navigate to backend:**
```bash
cd BIGFAT/backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your credentials
# Required: OPENROUTER_API_KEY
# MongoDB credentials are already configured
```

5. **Run the service:**
```bash
python main.py
```

The service will start at `http://localhost:8000`

### Render Deployment (Recommended for Production)

1. **Push your code to GitHub/GitLab**

2. **Deploy to Render:**
   - See detailed guide: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
   - Quick: Connect repo → Render auto-detects `render.yaml` → Deploy

3. **Configure environment variables:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `OPENROUTER_API_KEY` - Your OpenRouter API key

Your API will be live at: `https://your-service.onrender.com`

### Docker Deployment (Optional)

For local development or self-hosting:
```bash
docker-compose up -d
```

See [Docker documentation](docker-compose.yml) for details.

## API Endpoints

### Chat Endpoints

#### Standard Chat
```bash
POST /api/v1/chatbot/chat
```

**Request:**
```json
{
  "message": "What services does BIGFAT AI Labs provide?",
  "history": [],
  "user_id": "user_123",
  "session_id": "session_abc"
}
```

**Response:**
```json
{
  "response": "BIGFAT AI Labs provides...",
  "conversation_id": "conv_123",
  "session_id": "session_abc",
  "cached": false,
  "tokens_used": 150,
  "model": "anthropic/claude-3-haiku",
  "timestamp": "2026-01-09T14:00:00Z"
}
```

#### Streaming Chat
```bash
POST /api/v1/chatbot/stream
```

Returns Server-Sent Events (SSE) stream.

#### Get Conversation History
```bash
GET /api/v1/chatbot/history/{session_id}
```

#### Clear Conversation History
```bash
DELETE /api/v1/chatbot/history/{session_id}
```

### Health Check
```bash
GET /health
GET /api/v1/chatbot/health
```

## Configuration

All configuration is done via environment variables in `.env`:

### Required
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `MONGODB_URI` - MongoDB connection string (pre-configured)

### Optional
- `REDIS_ENABLED` - Enable Redis (default: false)
- `CACHE_ENABLED` - Enable response caching (default: false)
- `RATE_LIMIT_ENABLED` - Enable rate limiting (default: false)
- `LOG_LEVEL` - Logging level (default: INFO)
- `ENVIRONMENT` - Environment: development/staging/production

See `.env.example` for all available options.

## Architecture

```
backend/
├── app/
│   ├── api/v1/
│   │   ├── endpoints/
│   │   │   └── chatbot.py      # API endpoints
│   │   └── router.py            # API router
│   ├── core/
│   │   ├── config.py            # Configuration
│   │   ├── database.py          # MongoDB manager
│   │   └── cache.py             # Redis manager
│   ├── schemas/
│   │   └── chatbot.py           # Pydantic models
│   ├── repositories/
│   │   └── chatbot_repository.py # Data access layer
│   ├── services/
│   │   ├── llm_service.py       # OpenRouter client
│   │   └── chatbot_service.py   # Business logic
│   └── utils/
│       └── logger.py            # Logging setup
├── data/
│   └── knowledgebase.txt        # Knowledge base
├── main.py                      # Application entry
├── requirements.txt             # Dependencies
├── Dockerfile                   # Docker image
└── docker-compose.yml           # Docker compose
```

## Testing

### Manual Testing

1. **Start the service:**
```bash
python main.py
```

2. **Test chat endpoint:**
```bash
curl -X POST http://localhost:8000/api/v1/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What services does BIGFAT AI provide?",
    "user_id": "test_user"
  }'
```

3. **Check health:**
```bash
curl http://localhost:8000/health
```

4. **View API docs:**
Open `http://localhost:8000/docs` in your browser

## Monitoring

### Health Checks
- `/health` - Overall service health
- `/api/v1/chatbot/health` - Chatbot-specific health

### Logs
Structured logging with:
- Request/response logging
- Processing time tracking
- Error logging with stack traces

Enable JSON logs for production:
```bash
JSON_LOGS=true
```

## Scaling

### Horizontal Scaling
1. Deploy multiple backend instances behind a load balancer
2. Enable Redis for shared caching and rate limiting
3. MongoDB handles concurrent connections automatically

### Performance Tuning
- Adjust `MAX_CONVERSATION_HISTORY` to limit context size
- Enable `CACHE_ENABLED` to reduce API calls
- Use `OPENROUTER_FALLBACK_MODEL` for cost optimization

## Security

- Non-root Docker user
- Environment variable validation
- Input sanitization via Pydantic
- CORS configuration
- Rate limiting (with Redis)

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check network connectivity
- Ensure IP is whitelisted in MongoDB Atlas

### Redis Connection Issues
- Set `REDIS_ENABLED=false` to run without Redis
- Verify Redis is running: `docker ps`
- Check Redis logs: `docker-compose logs redis`

### Import Errors
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## Support

For issues or questions, contact: bigfatailabs@bigfat.ai
