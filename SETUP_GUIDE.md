# 🚀 Complete Setup Guide for AI Content Automation Agent

## ✅ What's Already Deployed

Your application is now live at: **https://agentic-3553a3b2.vercel.app**

The web dashboard is fully functional and includes:
- Visual workflow pipeline display
- Manual trigger button for automation
- Real-time status updates
- Log viewing and tracking
- Configuration interface

## 📋 Next Steps to Make It Fully Functional

### Step 1: Set Up Free API Services

#### 1.1 Hugging Face (Rhyme Generation)
```bash
# Sign up for free account
Visit: https://huggingface.co/join

# Get API token
1. Go to Settings → Access Tokens
2. Create new token with "Read" access
3. Copy token (starts with hf_)
```

#### 1.2 Replicate (Music Generation)
```bash
# Sign up for free account
Visit: https://replicate.com/signin

# Get API token
1. Go to Account → API Tokens
2. Copy your default token (starts with r8_)
3. You get free credits every month
```

#### 1.3 D-ID (Video Creation)
```bash
# Sign up for free account
Visit: https://studio.d-id.com/

# Get API key
1. Go to Settings → API Access
2. Create new API key
3. Free tier: 20 video credits per month
```

#### 1.4 Google Cloud (Sheets + YouTube)
```bash
# Create Google Cloud Project
Visit: https://console.cloud.google.com/

# For Google Sheets:
1. Create new project
2. Enable "Google Sheets API"
3. Create Service Account:
   - Go to IAM & Admin → Service Accounts
   - Create new service account
   - Download JSON credentials
4. Create a Google Sheet
5. Share sheet with service account email

# For YouTube:
1. Enable "YouTube Data API v3"
2. Create OAuth 2.0 credentials:
   - Go to APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Add redirect URI: https://developers.google.com/oauthplayground
3. Get refresh token:
   - Visit: https://developers.google.com/oauthplayground
   - Settings → Use your own OAuth credentials
   - Authorize YouTube Data API v3
   - Exchange authorization code for tokens
   - Copy refresh token
```

### Step 2: Set Up N8N Workflow Automation

#### 2.1 Install N8N (Choose one method)

**Option A: Using Docker (Recommended)**
```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Access at http://localhost:5678
```

**Option B: Using npm**
```bash
npm install n8n -g
n8n start

# Access at http://localhost:5678
```

**Option C: N8N Cloud (Easiest)**
```bash
# Sign up for free account
Visit: https://n8n.io/cloud

# Free tier includes:
- 5,000 workflow executions/month
- All integrations included
- No installation needed
```

#### 2.2 Import Workflow
```bash
1. Open N8N at http://localhost:5678 (or your cloud URL)
2. Create new workflow
3. Click the "..." menu → Import from File
4. Select N8N_WORKFLOW.json from this project
5. The complete automation pipeline will be imported
```

#### 2.3 Configure N8N Credentials

**Add Hugging Face Credentials:**
```
1. Click any "HTTP Request" node for Hugging Face
2. Click "Credentials" → "Create New"
3. Select "Header Auth"
4. Name: Hugging Face API
5. Add header:
   - Name: Authorization
   - Value: Bearer hf_YOUR_TOKEN_HERE
```

**Add Replicate Credentials:**
```
1. Click the "Create Audio" node
2. Create new Header Auth credential
3. Name: Replicate API
4. Add header:
   - Name: Authorization
   - Value: Token r8_YOUR_TOKEN_HERE
```

**Add D-ID Credentials:**
```
1. Click the "Create Video" node
2. Create new Header Auth credential
3. Name: D-ID API
4. Add header:
   - Name: Authorization
   - Value: Basic YOUR_API_KEY
```

**Add Google Sheets Credentials:**
```
1. Click "Log to Sheets" node
2. Click "Credentials" → "Google Sheets OAuth2 API"
3. Click "Create New Credential"
4. Option 1: OAuth (recommended for personal use)
   - Follow Google OAuth flow
5. Option 2: Service Account
   - Upload JSON credentials file
6. Test connection
```

**Add YouTube Credentials:**
```
1. Click "Upload to YouTube" node
2. Create new "YouTube OAuth2 API" credential
3. Enter:
   - Client ID: YOUR_CLIENT_ID
   - Client Secret: YOUR_CLIENT_SECRET
   - Refresh Token: YOUR_REFRESH_TOKEN
4. Test connection
```

#### 2.4 Configure Workflow Settings
```bash
1. Update Sheet ID:
   - Click "Log to Sheets" node
   - Replace YOUR_SHEET_ID with your actual Sheet ID
   - (Found in URL: docs.google.com/spreadsheets/d/[SHEET_ID]/edit)

2. Adjust schedule:
   - Click "Schedule Trigger" node
   - Default: Every 6 hours
   - Modify as needed (hourly, daily, etc.)

3. Test individual nodes:
   - Click on each node
   - Click "Execute Node" button
   - Verify output

4. Activate workflow:
   - Toggle the "Active" switch at top
   - Workflow will now run automatically
```

### Step 3: Configure Web Dashboard

The web dashboard at https://agentic-3553a3b2.vercel.app can be enhanced with environment variables:

#### 3.1 Add Environment Variables to Vercel
```bash
# Go to Vercel Dashboard
Visit: https://vercel.com/arcada-agentic-models/agentic-3553a3b2/settings/environment-variables

# Add these variables:
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxx
DID_API_KEY=xxxxxxxxxxxxx
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEET_ID=xxxxxxxxxxxxx
YOUTUBE_CLIENT_ID=xxxxxxxxxxxxx
YOUTUBE_CLIENT_SECRET=xxxxxxxxxxxxx
YOUTUBE_REFRESH_TOKEN=xxxxxxxxxxxxx
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/automation

# Redeploy to apply changes
```

### Step 4: Test the Complete Pipeline

#### 4.1 Test from Web Dashboard
```bash
1. Visit https://agentic-3553a3b2.vercel.app
2. Click "Start Automation" button
3. Watch the progress through each step
4. Check the logs section for results
```

#### 4.2 Test from N8N
```bash
1. Open your N8N workflow
2. Click "Execute Workflow" button
3. Watch each node execute in sequence
4. Check execution log for any errors
```

#### 4.3 Verify Results
```bash
1. Check Google Sheets:
   - Should see new row with timestamp
   - Rhyme text logged
   - Status updated through pipeline

2. Check for generated content:
   - Audio file URL logged
   - Video URL logged
   - YouTube URL logged

3. Check YouTube channel:
   - New video should be uploaded
   - Title and description populated
   - Video is public/unlisted as configured
```

## 🎯 Workflow Execution Flow

Once fully configured, the automation will:

```
Every 6 hours (or your schedule):
├─ Generate AI rhyme (Hugging Face GPT-Neo)
├─ Log to Google Sheets with timestamp
├─ Create 30-second music track (MusicGen)
├─ Wait for audio processing (30 seconds)
├─ Generate video with talking head (D-ID)
├─ Wait for video processing (60 seconds)
├─ Upload video to YouTube
└─ Update Sheet with all URLs and status
```

## 🔧 Troubleshooting

### Common Issues and Solutions

**Issue: N8N node fails with authentication error**
```
Solution:
- Verify API key is correct
- Check header format (Bearer, Basic, Token)
- Ensure no extra spaces in credentials
```

**Issue: Google Sheets "Permission denied"**
```
Solution:
- Share sheet with service account email
- Grant "Editor" permissions
- Verify Sheet ID is correct
```

**Issue: YouTube upload fails**
```
Solution:
- Check quota limit (10,000 units/day)
- Verify OAuth refresh token is valid
- Ensure video file is under 256 MB
```

**Issue: D-ID video creation fails**
```
Solution:
- Check monthly credit limit (20 free)
- Verify audio URL is publicly accessible
- Ensure API key is active
```

**Issue: Hugging Face timeout**
```
Solution:
- Model may be "cold starting"
- Add retry logic in N8N
- Try smaller model (GPT-Neo 1.3B)
```

## 📊 Monitoring and Logs

### View Execution Logs
```bash
# In N8N:
- Go to Executions tab
- View detailed logs for each run
- See input/output of each node

# In Google Sheets:
- View complete audit trail
- Filter by status (completed/failed)
- Track timestamps and URLs

# In Web Dashboard:
- View recent executions
- See success/failure rates
- Monitor current status
```

## 🎨 Customization Options

### Modify Rhyme Generation
```javascript
// In N8N HTTP Request node for Hugging Face:
{
  "inputs": "Write a haiku about...", // Change prompt
  "parameters": {
    "max_length": 100,     // Adjust length
    "temperature": 0.9,    // Control creativity (0-1)
    "top_p": 0.95         // Control randomness
  }
}
```

### Modify Music Style
```javascript
// In Replicate API call:
{
  "input": {
    "prompt": "jazz piano instrumental",  // Change genre
    "duration": 30,                       // Adjust length (8-30s)
    "model_version": "stereo-melody-large"
  }
}
```

### Modify Video Settings
```javascript
// In D-ID API call:
{
  "source_url": "your-custom-presenter.jpg",  // Use custom presenter
  "config": {
    "result_format": "mp4",
    "logo": {
      "url": "your-logo.png",  // Add watermark
      "position": [10, 10]
    }
  }
}
```

### Modify YouTube Settings
```javascript
// In YouTube upload node:
{
  "snippet": {
    "title": "Custom Title",
    "description": "Custom description",
    "tags": ["tag1", "tag2"],
    "categoryId": "22"  // See YouTube categories
  },
  "status": {
    "privacyStatus": "unlisted"  // public/unlisted/private
  }
}
```

## 💡 Advanced Features

### Add Webhook Trigger
```bash
# In N8N, replace Schedule Trigger with Webhook:
1. Delete "Schedule Trigger" node
2. Add "Webhook" node
3. Set path: /automation-webhook
4. Get webhook URL
5. Call from anywhere:
   curl -X POST https://your-n8n.com/webhook/automation-webhook
```

### Add Error Notifications
```bash
# Add error handling to N8N:
1. Add "Error Trigger" node
2. Connect to Telegram/Discord/Email node
3. Configure notification message
4. Activate error workflow
```

### Batch Processing
```bash
# Generate multiple rhymes per run:
1. Add "Loop" node after Schedule
2. Set iterations: 5
3. All nodes will run 5 times
4. Creates 5 videos per execution
```

### Add Analytics
```bash
# Track metrics in separate sheet:
1. Add another Google Sheets node
2. Log metrics: success rate, execution time, etc.
3. Create charts in Google Sheets
4. Visualize performance trends
```

## 📈 Cost Management

### Free Tier Limits
```
Hugging Face: Unlimited (rate limited)
Replicate: ~$5 credits/month free
D-ID: 20 videos/month free
Google Sheets: 10M cells free
YouTube API: 10,000 quota/day free
N8N: 5,000 executions/month (cloud)
Vercel: Free for hobby projects
```

### Optimize Costs
```bash
1. Reduce execution frequency:
   - Change from 6 hours to 12 hours
   - Run only during certain hours

2. Use smaller models:
   - GPT-Neo 1.3B instead of 2.7B
   - Reduces processing time

3. Batch operations:
   - Generate multiple rhymes in one run
   - More efficient use of API calls

4. Cache results:
   - Store generated rhymes
   - Reuse audio for multiple videos
```

## 🚀 Production Deployment Checklist

- [ ] All API keys configured
- [ ] Google Cloud credentials set up
- [ ] N8N workflow imported and tested
- [ ] Credentials added to all N8N nodes
- [ ] Google Sheet created and shared
- [ ] YouTube channel configured
- [ ] Test execution successful
- [ ] Schedule trigger activated
- [ ] Error handling configured
- [ ] Monitoring set up
- [ ] Environment variables added to Vercel
- [ ] Web dashboard tested
- [ ] Documentation reviewed

## 🎉 You're All Set!

Your AI Content Automation Agent is now ready to:
- Generate creative rhymes automatically
- Create music and videos
- Upload to YouTube
- Log everything to Google Sheets
- Run on schedule 24/7

Visit: **https://agentic-3553a3b2.vercel.app**

For support or questions, check the documentation or customize the workflow to your needs!

---

Happy Automating! 🤖🎵🎥
