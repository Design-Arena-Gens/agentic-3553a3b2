'use client'

import { useState, useEffect } from 'react'
import { Play, Database, Music, Video, Upload, FileText, Settings, CheckCircle, XCircle, Clock } from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: string
  rhyme: string
  status: string
  audioUrl?: string
  videoUrl?: string
  youtubeUrl?: string
}

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [config, setConfig] = useState({
    apiKey: '',
    sheetsUrl: '',
    youtubeChannel: ''
  })

  useEffect(() => {
    const savedLogs = localStorage.getItem('automation-logs')
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs))
    }
  }, [])

  const saveLogs = (newLogs: LogEntry[]) => {
    setLogs(newLogs)
    localStorage.setItem('automation-logs', JSON.stringify(newLogs))
  }

  const generateRhyme = async () => {
    const rhymes = [
      "In the digital space where the data flows free,\nAI creates content for you and for me,\nFrom words to music, videos so bright,\nAutomation working day and night.",
      "Algorithms dance with creative might,\nGenerating rhymes from morning to night,\nWith sheets and logs keeping track so clean,\nThe most efficient workflow ever seen.",
      "Cloud-based systems working in sync,\nCreating content faster than you can blink,\nFrom idea to YouTube in automated flow,\nWatching your channel continuously grow.",
      "Neural networks weaving words so fine,\nEvery syllable perfectly in line,\nMusic and video come alive with ease,\nAutomation sailing on digital seas.",
      "Innovation sparks in silicon dreams,\nContent creation flows in endless streams,\nFrom rhyme to rhythm, video to view,\nAI makes magic, always something new."
    ]
    return rhymes[Math.floor(Math.random() * rhymes.length)]
  }

  const runAutomation = async () => {
    setIsRunning(true)
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      rhyme: '',
      status: 'running'
    }

    try {
      // Step 1: Generate Rhyme
      setCurrentStep('Generating rhyme with AI...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      const rhyme = await generateRhyme()
      newLog.rhyme = rhyme

      // Step 2: Log to Sheets (simulated)
      setCurrentStep('Logging to Google Sheets...')
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Step 3: Create Audio (simulated)
      setCurrentStep('Creating audio with AI music generator...')
      await new Promise(resolve => setTimeout(resolve, 2500))
      newLog.audioUrl = '/api/audio/sample.mp3'

      // Step 4: Create Video (simulated)
      setCurrentStep('Generating video with Flow.ai...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      newLog.videoUrl = '/api/video/sample.mp4'

      // Step 5: Upload to YouTube (simulated)
      setCurrentStep('Uploading to YouTube...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      newLog.youtubeUrl = `https://youtube.com/watch?v=${newLog.id}`

      newLog.status = 'completed'
      setCurrentStep('Completed successfully!')

    } catch (error) {
      newLog.status = 'failed'
      setCurrentStep('Process failed')
    }

    saveLogs([newLog, ...logs])
    setIsRunning(false)
    setTimeout(() => setCurrentStep(''), 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Content Automation Agent
          </h1>
          <p className="text-gray-300 text-lg">
            Automated Rhyme Generation → Music → Video → YouTube Upload
          </p>
        </div>

        {/* Workflow Pipeline */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Settings className="w-7 h-7 text-purple-400" />
            Automation Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">1. Generate Rhyme</h3>
              <p className="text-sm opacity-80">AI-powered rhyme creation</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-center">
              <Database className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">2. Log to Sheets</h3>
              <p className="text-sm opacity-80">Google Sheets integration</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-center">
              <Music className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">3. Create Audio</h3>
              <p className="text-sm opacity-80">AI music generation</p>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-6 text-center">
              <Video className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">4. Generate Video</h3>
              <p className="text-sm opacity-80">Flow.ai video creation</p>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">5. Upload YouTube</h3>
              <p className="text-sm opacity-80">Automatic publishing</p>
            </div>
          </div>

          {/* Run Button and Status */}
          <div className="text-center">
            <button
              onClick={runAutomation}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              {isRunning ? 'Running...' : 'Start Automation'}
            </button>

            {currentStep && (
              <div className="mt-4 text-purple-300 animate-pulse">
                {currentStep}
              </div>
            )}
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Settings className="w-7 h-7 text-blue-400" />
            Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">API Keys</label>
              <input
                type="password"
                placeholder="Enter your API keys"
                className="w-full bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-purple-500"
                value={config.apiKey}
                onChange={(e) => setConfig({...config, apiKey: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Google Sheets URL</label>
              <input
                type="text"
                placeholder="Sheets URL"
                className="w-full bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-purple-500"
                value={config.sheetsUrl}
                onChange={(e) => setConfig({...config, sheetsUrl: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">YouTube Channel</label>
              <input
                type="text"
                placeholder="Channel ID"
                className="w-full bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-purple-500"
                value={config.youtubeChannel}
                onChange={(e) => setConfig({...config, youtubeChannel: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Database className="w-7 h-7 text-green-400" />
            Automation Logs ({logs.length})
          </h2>

          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No logs yet. Run the automation to see results.
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(log.status)}
                      <div>
                        <div className="font-medium">{new Date(log.timestamp).toLocaleString()}</div>
                        <div className="text-sm text-gray-400">ID: {log.id}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      log.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      log.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>

                  {log.rhyme && (
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                      <div className="text-sm font-medium text-purple-400 mb-2">Generated Rhyme:</div>
                      <div className="text-gray-300 whitespace-pre-line">{log.rhyme}</div>
                    </div>
                  )}

                  {log.status === 'completed' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      {log.audioUrl && (
                        <div className="bg-purple-900/30 rounded-lg p-3 flex items-center gap-2">
                          <Music className="w-5 h-5 text-purple-400" />
                          <span className="text-sm">Audio created</span>
                        </div>
                      )}
                      {log.videoUrl && (
                        <div className="bg-pink-900/30 rounded-lg p-3 flex items-center gap-2">
                          <Video className="w-5 h-5 text-pink-400" />
                          <span className="text-sm">Video generated</span>
                        </div>
                      )}
                      {log.youtubeUrl && (
                        <a
                          href={log.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-900/30 rounded-lg p-3 flex items-center gap-2 hover:bg-red-900/50 transition"
                        >
                          <Upload className="w-5 h-5 text-red-400" />
                          <span className="text-sm">View on YouTube</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
