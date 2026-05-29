import { Link } from 'react-router-dom'
import ThreeScene from '../components/ThreeScene'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Pricing() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <ErrorBoundary><ThreeScene /></ErrorBoundary>
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold gradient-text">LA-TO-RA</Link>
          <Link to="/auth" className="text-sm bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full transition-all">Get started</Link>
        </div>
      </div>

      <main className="relative z-10 pt-24 px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            Skip one <span className="text-amber-accent">Dairy Milk</span> 🍫
          </h1>
          <p className="text-xl text-muted animate-slide-up animate-delay-100">
            and you're in for life. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="max-w-lg mx-auto animate-slide-up animate-delay-200">
          <div className="glass rounded-3xl border border-accent/30 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">POPULAR</div>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">
                <span className="text-2xl align-top">₹</span>11
              </div>
              <p className="text-muted">Lifetime access · One-time payment</p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Full access to all subjects',
                'Topic-wise question banks',
                'Unlimited mock tests',
                'Detailed explanations',
                'Bookmark & review questions',
                'Progress tracking',
                'No ads, ever',
                'Lifetime updates',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-green-accent text-lg">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/auth" className="block w-full bg-accent hover:bg-accent/90 text-white text-center py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] animate-pulse-glow">
              Get lifetime access → ₹11
            </Link>

            <p className="text-center text-xs text-muted mt-4">Skip one Dairy Milk. It's that simple.</p>
          </div>

          <div className="text-center mt-12 space-y-3">
            <p className="text-sm text-muted">Why so cheap?</p>
            <p className="text-sm text-muted max-w-md mx-auto">
              Built by a student, for students. No VC funding, no ₹15,000 paywalls.
              Just a hostel room project that grew into something useful.
            </p>
          </div>
        </div>

        <footer className="border-t border-white/5 mt-20 pt-8 text-center text-sm text-muted">
          <p>© 2026 LA-TO-RA — built for Indian PG aspirants</p>
        </footer>
      </main>
    </div>
  )
}
