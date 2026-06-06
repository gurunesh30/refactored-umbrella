import { useState, useEffect } from 'react'
import { 
  Activity, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Copy, 
  Terminal,
  HelpCircle,
  Database,
  CreditCard,
  CloudLightning,
  Sparkles
} from 'lucide-react'

interface DiagnosticsReport {
  status: string
  timestamp: string
  diagnostics: {
    supabase?: {
      status: string
      message?: string
      error?: string
      configured: boolean
    }
    stripe?: {
      status: string
      message?: string
      error?: string
      configured: boolean
    }
    vercel?: {
      status: string
      message?: string
      error?: string
      configured: boolean
    }
  }
}

export default function App() {
  const [data, setData] = useState<DiagnosticsReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  const fetchDiagnostics = async () => {
    setLoading(true)
    setError(null)
    try {
      // Connect to the Next.js endpoint on port 3000
      const response = await fetch('http://localhost:3000/api/health-check')
      if (!response.ok) {
        throw new Error(`Health Check API returned status code ${response.status}`)
      }
      const json = await response.json()
      setData(json)
    } catch (err: any) {
      console.error(err)
      setError('Could not connect to health-check endpoint. Make sure apps/web is running on http://localhost:3000')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiagnostics()
  }, [])

  const copyToClipboard = () => {
    if (!data) return
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'success':
        return (
          <span className="badge badge-success">
            <CheckCircle size={13} /> Active
          </span>
        )
      case 'failed':
        return (
          <span className="badge badge-failed">
            <XCircle size={13} /> Failed
          </span>
        )
      case 'not_configured':
      default:
        return (
          <span className="badge badge-warning">
            <AlertCircle size={13} /> Unconfigured
          </span>
        )
    }
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="logo-group">
          <div className="logo-badge">
            <Activity size={24} />
          </div>
          <div className="title-section">
            <h1>Diagnostics Engine</h1>
            <p>Admin Control Panel • Orchestration Suite</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={fetchDiagnostics} disabled={loading}>
          <RefreshCw className={loading ? 'animate-spin' : ''} size={16} />
          {loading ? 'Polling...' : 'Sync Diagnostics'}
        </button>
      </header>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left: Integration Cards */}
        <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h2 className="card-title">
              <Sparkles size={20} className="text-indigo-500" />
              Integrations Status
            </h2>

            {error && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.05)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                padding: '1.25rem',
                borderRadius: '16px',
                color: '#f43f5e',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <XCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="integration-list">
              {/* Supabase Status Row */}
              <div className="integration-row">
                <div className="integration-info">
                  <div className="integration-icon text-indigo-500">
                    <Database size={20} />
                  </div>
                  <div className="integration-details">
                    <h3>Supabase Integration</h3>
                    <p>{data?.diagnostics?.supabase?.message || data?.diagnostics?.supabase?.error || 'Awaiting synchronization...'}</p>
                  </div>
                </div>
                <div>
                  {getStatusBadge(data?.diagnostics?.supabase?.status)}
                </div>
              </div>

              {/* Stripe Status Row */}
              <div className="integration-row">
                <div className="integration-info">
                  <div className="integration-icon text-indigo-500">
                    <CreditCard size={20} />
                  </div>
                  <div className="integration-details">
                    <h3>Stripe Integration</h3>
                    <p>{data?.diagnostics?.stripe?.message || data?.diagnostics?.stripe?.error || 'Awaiting synchronization...'}</p>
                  </div>
                </div>
                <div>
                  {getStatusBadge(data?.diagnostics?.stripe?.status)}
                </div>
              </div>

              {/* Vercel Status Row */}
              <div className="integration-row">
                <div className="integration-info">
                  <div className="integration-icon text-indigo-500">
                    <CloudLightning size={20} />
                  </div>
                  <div className="integration-details">
                    <h3>Vercel Deployments</h3>
                    <p>{data?.diagnostics?.vercel?.message || data?.diagnostics?.vercel?.error || 'Awaiting synchronization...'}</p>
                  </div>
                </div>
                <div>
                  {getStatusBadge(data?.diagnostics?.vercel?.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Setup Guide */}
          <div className="card">
            <h2 className="card-title">
              <HelpCircle size={20} className="text-indigo-500" />
              Diagnostics Assistance
            </h2>
            <div className="setup-guide">
              <div className="setup-step">
                <div className="step-num">1</div>
                <div className="step-content">
                  <h4>Supabase Configuration</h4>
                  <p>
                    Provide credentials inside <span className="step-code">apps/web/.env.local</span>:
                    <br />
                    <span className="step-code">NEXT_PUBLIC_SUPABASE_URL</span> &amp; <span className="step-code">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                  </p>
                </div>
              </div>

              <div className="setup-step">
                <div className="step-num">2</div>
                <div className="step-content">
                  <h4>Stripe Authentication</h4>
                  <p>
                    Setup API secrets and price mappings in <span className="step-code">.env.local</span>:
                    <br />
                    <span className="step-code">STRIPE_SECRET_KEY</span> &amp; <span className="step-code">STRIPE_PRO_PRICE_ID</span>
                  </p>
                </div>
              </div>

              <div className="setup-step">
                <div className="step-num">3</div>
                <div className="step-content">
                  <h4>Run Local Dev Servers</h4>
                  <p>
                    From the root folder, launch the dual environments concurrently:
                    <br />
                    <span className="step-code">npm run dev</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Code panel with raw JSON logs */}
        <div className="card code-panel">
          <div className="code-header">
            <h2 className="card-title" style={{ margin: 0 }}>
              <Terminal size={20} className="text-indigo-500" />
              Raw Report
            </h2>
            {data && (
              <button className="btn" onClick={copyToClipboard} title="Copy diagnostics payload">
                <Copy size={14} /> Copy Payload
              </button>
            )}
          </div>
          <div className="code-box">
            {loading ? (
              <p style={{ color: 'var(--color-text-muted)' }}>Synchronizing diagnostic payloads...</p>
            ) : data ? (
              JSON.stringify(data, null, 2)
            ) : (
              <p style={{ color: 'var(--color-error)' }}>No diagnostics payload available. Ensure apps/web is accessible.</p>
            )}
          </div>
        </div>
      </div>

      {/* Copy Toast Alert */}
      {showToast && (
        <div className="toast">
          <CheckCircle size={16} /> Copied diagnostics payload to clipboard!
        </div>
      )}
    </div>
  )
}
