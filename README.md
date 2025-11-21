# 🤖 AI Content Automation Agent

Fully automated pipeline that generates rhymes, creates music, produces videos, and uploads to YouTube - all using free tools and APIs.

## 🚀 Features

- **AI Rhyme Generation** - Automated creative content using Hugging Face GPT models
- **Google Sheets Logging** - Full audit trail of all generated content
- **AI Music Creation** - MusicGen by Meta via Replicate API
- **AI Video Generation** - D-ID talking head videos or DIY FFmpeg
- **YouTube Auto-Upload** - Direct publishing with metadata
- **Real-time Dashboard** - Monitor and control the entire pipeline
- **N8N Workflow** - Complete automation with visual workflow editor

## 🎯 Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Automation:** N8N (self-hosted or cloud)
- **AI Services:** Hugging Face, Replicate, D-ID
- **Storage:** Google Sheets API, YouTube Data API
- **Deployment:** Vercel

## 📦 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local`:
```env
# AI Services
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxx
DID_API_KEY=xxxxxxxxxxxxx

# Google Services
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
YOUTUBE_CLIENT_ID=xxxxxxxxxxxxx
YOUTUBE_CLIENT_SECRET=xxxxxxxxxxxxx
YOUTUBE_REFRESH_TOKEN=xxxxxxxxxxxxx

# N8N (optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/automation
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel
```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-3553a3b2
```

## 🔧 N8N Setup

### Install N8N
```bash
# Using Docker
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Using npm
npm install n8n -g
n8n start
```

### Import Workflow
1. Open N8N at http://localhost:5678
2. Go to Workflows → Import
3. Upload `N8N_WORKFLOW.json`
4. Configure credentials for each service
5. Activate the workflow

## 🛠️ Free Tools & APIs

### 1. Rhyme Generation
- **Hugging Face** (Free tier)
  - Sign up: https://huggingface.co
  - Get API token from Settings → Access Tokens
  - Models: GPT-Neo, GPT-J, BLOOM

### 2. Audio Creation
- **Replicate** (Free tier with credits)
  - Sign up: https://replicate.com
  - Get API token
  - Use MusicGen model by Meta

### 3. Video Generation
- **D-ID** (20 free videos/month)
  - Sign up: https://www.d-id.com
  - Get API key from Settings
  - Free tier: 20 credits = 20 videos

### 4. Google Sheets Logging
- **Google Cloud Console**
  - Create project: https://console.cloud.google.com
  - Enable Google Sheets API
  - Create Service Account
  - Download credentials JSON

### 5. YouTube Upload
- **YouTube Data API v3**
  - Enable in Google Cloud Console
  - Create OAuth 2.0 credentials
  - 10,000 quota units/day (free)

## 📋 Implementation Steps

### Phase 1: Web Dashboard (Completed)
✅ Next.js application with React
✅ Real-time workflow visualization
✅ Configuration management
✅ Log viewing and tracking

### Phase 2: API Integration
```bash
# Install additional packages
npm install googleapis replicate-js axios dotenv
```

Create API routes:
- `/api/generate-rhyme` - Hugging Face integration
- `/api/create-audio` - Replicate MusicGen
- `/api/create-video` - D-ID API
- `/api/upload-youtube` - YouTube Data API
- `/api/log-sheets` - Google Sheets API

### Phase 3: N8N Automation
1. Import `N8N_WORKFLOW.json`
2. Configure all credentials
3. Test each node individually
4. Set up schedule trigger (every 6 hours)
5. Enable error notifications

### Phase 4: Advanced Features
- Webhook triggers for on-demand generation
- Batch processing for multiple rhymes
- A/B testing for different styles
- Analytics dashboard
- Email/Telegram notifications

## 🎨 Workflow Pipeline

```
┌─────────────────┐
│  Cron Schedule  │ Every 6 hours
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Generate       │ Hugging Face GPT-Neo
│  Rhyme          │ Creative AI-powered content
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Log to         │ Google Sheets API
│  Sheets         │ Timestamp + content
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create         │ MusicGen via Replicate
│  Audio          │ 30-second instrumental
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Generate       │ D-ID talking head
│  Video          │ Audio + presenter
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Upload to      │ YouTube Data API
│  YouTube        │ Public video + metadata
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update         │ Log URLs and status
│  Sheet          │ Complete audit trail
└─────────────────┘
```

## 💡 Alternative Free Tools

### For Audio
- **Suno AI** (Limited free) - suno.ai
- **Uberduck** (Free tier) - uberduck.ai
- **Bark** (Open source) - github.com/suno-ai/bark
- **Riffusion** (Free) - riffusion.com

### For Video
- **Runway ML** (Free credits) - runwayml.com
- **Pictory** (Free tier) - pictory.ai
- **InVideo** (Free plan) - invideo.io
- **Kapwing** (Free tier) - kapwing.com
- **FFmpeg** (Open source) - DIY video creation

### For Rhyme Generation
- **Google Gemini** (Free tier) - makersuite.google.com
- **Cohere** (Free tier) - cohere.ai
- **OpenAI** (Free credits) - platform.openai.com

## 📊 Google Sheets Structure

Create a sheet with these columns:
| Timestamp | Rhyme | Status | Audio URL | Video URL | YouTube URL |
|-----------|-------|--------|-----------|-----------|-------------|
| 2025-01-21 10:00 | "..." | completed | https://... | https://... | https://... |

## 🔐 Security

- All API keys stored in environment variables
- Service accounts for Google APIs
- OAuth 2.0 for YouTube authentication
- Never commit `.env.local` to Git
- Use Vercel environment variables for production

## 📈 Monitoring

- View logs in web dashboard
- Check Google Sheets for full history
- N8N execution history
- YouTube Studio analytics

## 🎯 Cost Optimization

All services used have generous free tiers:
- **Hugging Face:** Free inference API
- **Replicate:** Free credits monthly
- **D-ID:** 20 free videos/month
- **Google Sheets:** Free up to 10M cells
- **YouTube API:** 10,000 quota units/day
- **Vercel:** Free hosting for hobby projects

## 🚀 Scaling Up

When ready to scale:
1. Upgrade to paid tiers for higher limits
2. Use N8N Cloud for managed hosting
3. Add Redis queue for batch processing
4. Implement CDN for media delivery
5. Set up PostgreSQL for persistent logs

## 📖 Documentation

Full implementation guide: [IMPLEMENTATION.md](./IMPLEMENTATION.md)

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - Use freely for any purpose

## 🎉 Demo

Live demo: https://agentic-3553a3b2.vercel.app

---

Built with ❤️ using Next.js, N8N, and AI
