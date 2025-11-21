# AI Content Automation Agent - Implementation Guide

## 🎯 Overview
This system automates the entire content creation pipeline from rhyme generation to YouTube upload.

## 🏗️ Architecture

### Frontend Dashboard (Next.js)
- Real-time workflow visualization
- Configuration management
- Log viewing and tracking
- Manual trigger controls

### Automation Pipeline Steps

#### 1. **Rhyme Generation (AI)**
**Free Tools:**
- **GPT-Neo via Hugging Face API** (Free tier)
- **OpenAI Playground** (Free credits)
- **Google Gemini API** (Free tier)
- **Cohere API** (Free tier)

**Implementation:**
```javascript
// In production, connect to Hugging Face API
const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', {
  headers: { Authorization: `Bearer ${HUGGINGFACE_TOKEN}` },
  method: 'POST',
  body: JSON.stringify({ inputs: 'Generate a creative rhyme about...' })
})
```

#### 2. **Google Sheets Logging**
**Free Tool:** Google Sheets API (Free)

**Setup:**
1. Create Google Cloud Project (free)
2. Enable Google Sheets API
3. Create Service Account
4. Share sheet with service account email

**Implementation:**
```javascript
// Use googleapis package
const { google } = require('googleapis')
const sheets = google.sheets('v4')

await sheets.spreadsheets.values.append({
  spreadsheetId: SHEET_ID,
  range: 'Logs!A:F',
  valueInputOption: 'RAW',
  resource: { values: [[timestamp, rhyme, status, audioUrl, videoUrl, youtubeUrl]] }
})
```

#### 3. **Audio Creation**
**Free Tools:**
- **Suno AI** (Limited free tier) - suno.ai
- **Uberduck** (Free tier) - uberduck.ai
- **Bark by Suno** (Open source)
- **MusicGen by Meta** (Free via Hugging Face)
- **Riffusion** (Free, open source)

**Implementation:**
```javascript
// MusicGen via Replicate (free tier)
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })
const output = await replicate.run(
  "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
  { input: { prompt: "upbeat hip hop instrumental" } }
)
```

#### 4. **Video Generation**
**Free Tools:**
- **D-ID** (Free tier - 20 videos/month) - d-id.com
- **Synthesia** (Free trial) - synthesia.io
- **Runway ML** (Free credits) - runwayml.com
- **Pictory** (Free tier) - pictory.ai
- **InVideo** (Free plan) - invideo.io
- **Kapwing** (Free tier) - kapwing.com

**Alternative - DIY Video:**
```javascript
// Use FFmpeg via fluent-ffmpeg
const ffmpeg = require('fluent-ffmpeg')

ffmpeg()
  .input('audio.mp3')
  .input('background.jpg')
  .complexFilter([
    '[1:v]scale=1920:1080[bg]',
    '[bg]drawtext=text=\'Your Rhyme\':fontsize=60:fontcolor=white[v]'
  ])
  .map('[v]')
  .output('video.mp4')
  .run()
```

#### 5. **YouTube Upload**
**Free Tool:** YouTube Data API v3 (Free, 10,000 quota/day)

**Setup:**
1. Create Google Cloud Project
2. Enable YouTube Data API v3
3. Create OAuth 2.0 credentials
4. Authorize application

**Implementation:**
```javascript
const { google } = require('googleapis')
const youtube = google.youtube('v3')

const res = await youtube.videos.insert({
  part: 'snippet,status',
  requestBody: {
    snippet: {
      title: 'AI Generated Content',
      description: rhyme,
      tags: ['AI', 'automation', 'music']
    },
    status: { privacyStatus: 'public' }
  },
  media: { body: fs.createReadStream('video.mp4') }
})
```

## 🔧 N8N Workflow Setup

### Prerequisites
1. **N8N Installation** (Free, self-hosted)
   - Docker: `docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n`
   - npm: `npm install n8n -g && n8n start`

### Workflow Nodes Configuration

```
┌─────────────┐
│   Schedule  │  (Cron: every hour)
│   Trigger   │
└──────┬──────┘
       │
┌──────▼──────┐
│  HTTP       │  (Call Hugging Face API)
│  Request    │  Generate rhyme
└──────┬──────┘
       │
┌──────▼──────┐
│  Google     │  Log rhyme + timestamp
│  Sheets     │
└──────┬──────┘
       │
┌──────▼──────┐
│  HTTP       │  (Call MusicGen API)
│  Request    │  Create audio
└──────┬──────┘
       │
┌──────▼──────┐
│  Webhook/   │  Trigger video creation
│  HTTP       │  (D-ID or Runway)
└──────┬──────┘
       │
┌──────▼──────┐
│  Wait       │  (Wait for video processing)
│             │
└──────┬──────┘
       │
┌──────▼──────┐
│  Google     │  Upload to YouTube
│  YouTube    │
└──────┬──────┘
       │
┌──────▼──────┐
│  Google     │  Update log with URLs
│  Sheets     │
└─────────────┘
```

## 🚀 Complete Setup Steps

### Step 1: Set up Google Cloud APIs
```bash
1. Go to console.cloud.google.com
2. Create new project
3. Enable APIs:
   - Google Sheets API
   - YouTube Data API v3
4. Create Service Account (for Sheets)
5. Create OAuth 2.0 Client (for YouTube)
6. Download credentials JSON
```

### Step 2: Set up AI Services
```bash
# Hugging Face (Rhyme Generation)
1. Sign up at huggingface.co
2. Get API token from settings
3. Test with GPT-Neo or GPT-J

# Replicate (Music Generation)
1. Sign up at replicate.com
2. Get API token
3. Use MusicGen model

# D-ID (Video Creation)
1. Sign up at d-id.com
2. Get API key (20 free videos/month)
3. Test with sample text
```

### Step 3: Deploy N8N Workflow
```bash
# Self-hosted N8N
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Access at http://localhost:5678
# Import workflow JSON
# Configure credentials for each service
# Activate workflow
```

### Step 4: Configure Environment Variables
```bash
# Create .env.local file
HUGGINGFACE_API_KEY=hf_xxxxx
REPLICATE_API_TOKEN=r8_xxxxx
DID_API_KEY=xxxxx
GOOGLE_SHEETS_CREDENTIALS='{...}'
YOUTUBE_CLIENT_ID=xxxxx
YOUTUBE_CLIENT_SECRET=xxxxx
YOUTUBE_REFRESH_TOKEN=xxxxx
```

### Step 5: Test Pipeline
```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Test automation button
# Check logs
# Verify sheet updates
```

## 📊 N8N Workflow JSON

Create this workflow in N8N:

```json
{
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{ "field": "hours", "hoursInterval": 1 }]
        }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "position": [240, 300]
    },
    {
      "parameters": {
        "url": "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B",
        "authentication": "headerAuth",
        "requestMethod": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "={\"inputs\": \"Write a creative rhyme about technology and innovation:\"}"
      },
      "name": "Generate Rhyme",
      "type": "n8n-nodes-base.httpRequest",
      "position": [440, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "sheetId": "YOUR_SHEET_ID",
        "range": "Logs!A:F",
        "options": {}
      },
      "name": "Log to Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "position": [640, 300]
    },
    {
      "parameters": {
        "url": "https://api.replicate.com/v1/predictions",
        "authentication": "headerAuth",
        "requestMethod": "POST",
        "jsonParameters": true
      },
      "name": "Create Audio",
      "type": "n8n-nodes-base.httpRequest",
      "position": [840, 300]
    },
    {
      "parameters": {
        "url": "https://api.d-id.com/talks",
        "authentication": "headerAuth",
        "requestMethod": "POST"
      },
      "name": "Create Video",
      "type": "n8n-nodes-base.httpRequest",
      "position": [1040, 300]
    },
    {
      "parameters": {
        "amount": 60
      },
      "name": "Wait for Processing",
      "type": "n8n-nodes-base.wait",
      "position": [1240, 300]
    },
    {
      "parameters": {
        "operation": "upload",
        "title": "=AI Generated: {{$json[\"rhyme\"]}}",
        "categoryId": "22"
      },
      "name": "Upload to YouTube",
      "type": "n8n-nodes-base.youTube",
      "position": [1440, 300]
    }
  ]
}
```

## 🔄 Alternative Free Tools Combinations

### Combo 1: All Open Source
- **Rhymes:** GPT-J via Hugging Face
- **Audio:** MusicGen (Meta, open source)
- **Video:** FFmpeg + PIL (Python)
- **Upload:** YouTube API

### Combo 2: Best Free Tiers
- **Rhymes:** Google Gemini API
- **Audio:** Suno AI free tier
- **Video:** D-ID free tier (20/month)
- **Upload:** YouTube API

### Combo 3: Maximum Automation
- **Rhymes:** ChatGPT API (if available)
- **Audio:** ElevenLabs free tier
- **Video:** Runway ML free credits
- **Upload:** YouTube API

## 🎨 Advanced Features

### Auto-scheduling
```javascript
// In N8N, use Cron expression
// Run every 6 hours: 0 */6 * * *
// Run daily at 9 AM: 0 9 * * *
```

### Error Handling
```javascript
// Add error workflow in N8N
// Send notifications via Telegram/Discord
// Retry failed steps automatically
```

### Analytics Dashboard
```javascript
// Query Google Sheets
// Display metrics in web dashboard
// Track success rates
```

## 📝 Monitoring & Logs

All logs are stored in:
1. **Google Sheets** - Full audit trail
2. **Local Storage** - Browser cache
3. **N8N Execution Log** - Workflow history

## 🔐 Security Notes

- Store API keys in environment variables
- Use service accounts for Google APIs
- Enable OAuth 2.0 for YouTube
- Never commit credentials to Git

## 💡 Cost Optimization

- All tools have free tiers
- Monitor API quotas
- Use caching where possible
- Implement rate limiting

## 🚀 Scaling Up

When ready to scale:
1. Move from free tiers to paid plans
2. Use N8N cloud hosting
3. Add queue system (Bull/Redis)
4. Implement CDN for assets
5. Add database for persistent logs
