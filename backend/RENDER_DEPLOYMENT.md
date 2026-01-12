# Deploying to Render

## Quick Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub/GitLab:
```bash
git add .
git commit -m "Add chatbot service"
git push origin main
```

### 2. Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up or log in
3. Connect your GitHub/GitLab account

### 3. Deploy from Dashboard

#### Option A: Using render.yaml (Recommended)

1. **Create New Web Service**
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will auto-detect `render.yaml`

2. **Configure Environment Variables**
   - Go to your service dashboard
   - Navigate to "Environment" tab
   - Add these **secret** environment variables:
   
   ```
   MONGODB_URI = mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@bigfat1.y7mpuap.mongodb.net/?appName=bigfat1
   OPENROUTER_API_KEY = your_openrouter_api_key_here
   ```

3. **Deploy**
   - Click "Create Blueprint Instance"
   - Wait for deployment (2-3 minutes)
   - Your API will be live at: `https://your-service.onrender.com`

#### Option B: Manual Setup

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select the `backend` directory as root

2. **Configure Build Settings**
   ```
   Name: bigfat-chatbot-api
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

3. **Add Environment Variables** (same as Option A)

4. **Set Health Check Path**
   ```
   Health Check Path: /health
   ```

5. **Deploy**
   - Click "Create Web Service"

### 4. Verify Deployment

Once deployed, test your API:

```bash
# Health check
curl https://your-service.onrender.com/health

# API docs
open https://your-service.onrender.com/docs

# Test chat
curl -X POST https://your-service.onrender.com/api/v1/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What services does BIGFAT AI provide?",
    "user_id": "test_user"
  }'
```

## Environment Variables Configuration

### Required (Set as Secrets)
```
MONGODB_URI = mongodb+srv://username:password@bigfat1.y7mpuap.mongodb.net/?appName=bigfat1
OPENROUTER_API_KEY = sk-or-v1-xxxxxxxxxxxxx
```

### Optional (Already in render.yaml)
```
ENVIRONMENT = production
LOG_LEVEL = INFO
JSON_LOGS = true
MONGODB_DATABASE = Bigfat
MONGODB_COLLECTION = chatbot
MAX_CONVERSATION_HISTORY = 10
STREAM_ENABLED = true
```

### CORS Configuration
Add your frontend URL to `CORS_ORIGINS`:
```
CORS_ORIGINS = https://www.bigfat.ai,https://bigfat.ai,https://your-frontend.vercel.app
```

## Optional: Add Redis for Caching

If you want to enable caching and rate limiting:

1. **Create Redis Instance on Render**
   - Click "New +" → "Redis"
   - Choose a plan (free tier available)
   - Note the internal connection URL

2. **Update Environment Variables**
   ```
   REDIS_ENABLED = true
   REDIS_HOST = your-redis-instance.internal
   REDIS_PORT = 6379
   CACHE_ENABLED = true
   RATE_LIMIT_ENABLED = true
   ```

## Deployment Settings

### Auto-Deploy
- ✅ Enabled by default
- Pushes to `main` branch trigger automatic deployment

### Health Checks
- ✅ Configured at `/health`
- Render monitors service health automatically

### Logs
View logs in Render dashboard:
- Navigate to your service
- Click "Logs" tab
- Real-time log streaming available

## Troubleshooting

### Build Fails

**Error:** "Could not find requirements.txt"
- **Solution:** Ensure "Root Directory" is set to `backend` in Render settings

**Error:** "Python version mismatch"
- **Solution:** Add to environment variables:
  ```
  PYTHON_VERSION = 3.11.0
  ```

### Service Crashes

**Error:** "MongoDB connection failed"
- **Solution:** 
  1. Verify `MONGODB_URI` in environment variables
  2. Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)

**Error:** "Missing OPENROUTER_API_KEY"
- **Solution:** Add API key to environment variables in Render dashboard

### Slow Cold Starts

Render free tier spins down after inactivity:
- **Solution:** Upgrade to paid plan for always-on service
- **Alternative:** Use a cron job to ping your service every 10 minutes

## Production Checklist

Before going live:

- [ ] ✅ MongoDB URI configured with correct credentials
- [ ] ✅ OpenRouter API key added
- [ ] ✅ CORS origins include your frontend URLs
- [ ] ✅ Health check endpoint responding
- [ ] ✅ MongoDB Atlas IP whitelist includes Render IPs (or 0.0.0.0/0)
- [ ] ✅ Environment set to `production`
- [ ] ✅ JSON logs enabled
- [ ] ✅ Test all endpoints work correctly

## Monitoring

### Metrics in Render Dashboard
- CPU usage
- Memory usage
- Request count
- Response times
- Error rates

### Custom Monitoring
Access metrics endpoint:
```bash
curl https://your-service.onrender.com/api/v1/chatbot/health
```

## Scaling

### Horizontal Scaling
1. Go to service settings
2. Increase "Instances" count
3. Render automatically load balances

### Vertical Scaling
1. Upgrade plan for more CPU/RAM
2. Plans: Starter → Standard → Pro

## Cost Optimization

**Free Tier:**
- 750 hours/month free
- Spins down after inactivity
- Good for development/testing

**Paid Plans ($7+/month):**
- Always-on
- Better performance
- More resources

**Tips:**
- Enable Redis caching to reduce OpenRouter API costs
- Set appropriate `MAX_CONVERSATION_HISTORY` to limit context size
- Use fallback model for non-critical queries

## Support

For deployment issues:
- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Contact: bigfatailabs@bigfat.ai
