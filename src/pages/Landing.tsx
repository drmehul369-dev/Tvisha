import { Link } from 'react-router-dom'
import ThreeScene from '../components/ThreeScene'

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThreeScene />

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">LA-TO-RA</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm text-muted hover:text-white transition-colors px-4 py-2">Sign in</Link>
            <Link to="/auth" className="text-sm bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full transition-all hover:scale-105 font-medium">Get started</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent-light text-sm mb-8 animate-fade-in">
            <span>INI-CET · NEET-PG · FMGE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Master every MCQ<br />
            <span className="gradient-text">that matters.</span>
          </h1>

          <p className="text-lg text-muted max-w-xl mb-10 animate-slide-up animate-delay-100">
            A focused, beautifully fast question bank for Indian PG aspirants. Practice topic-wise,
            track your accuracy, take timed mocks, and bookmark anything you want to revisit.
          </p>

          <div className="flex items-center gap-4 animate-slide-up animate-delay-200">
            <Link to="/practice" className="bg-accent hover:bg-accent/90 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all hover:scale-105 animate-pulse-glow">
              Start practicing
            </Link>
            <Link to="/mock-test" className="glass border border-white/10 hover:border-white/20 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all">
              Take a mock test
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Topic-wise drill', desc: 'Master one topic at a time. Instant feedback and full explanations on every MCQ.' },
              { icon: '📝', title: 'Realistic mock tests', desc: 'Quick, subject, and full NEET-PG style grand mocks with live timers and review.' },
              { icon: '⭐', title: 'Bookmark anything', desc: 'Star tricky questions and revisit them in a dedicated review mode.' },
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-8 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${(i + 3) * 100}ms` }}>
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="glass rounded-3xl p-12 md:p-16 border border-white/5">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-2 border-accent/30">
              <img
                src="https://www.carotid.in/assets/mehul-DGBRmGQ5.jpg"
                alt="Mehul H. Jadav"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div className="w-20 h-20 rounded-full mx-auto mb-6 bg-accent/20 flex items-center justify-center text-3xl" id="avatar-fallback">
              👨‍⚕️
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Mehul H. Jadav</h2>
            <p className="text-accent-light mb-8">Founder · MBBS, 3rd year</p>
            <h3 className="text-xl md:text-2xl font-semibold mb-6">Built by a student, for students</h3>
            <div className="max-w-2xl mx-auto text-left space-y-4 text-muted leading-relaxed">
              <p>Hi, I'm Mehul — and LA-TO-RA started in my hostel room.</p>
              <p>I'm a 3rd-year MBBS student grinding through the same syllabus you are. I got tired of bouncing between five apps to find one decent question, so I started building a place where every MCQ that actually matters lives under one roof — fast, clean, and kind to your wallet.</p>
              <p>LA-TO-RA is my pinky-promise to junior batches: no ₹15,000 paywalls, no algorithm games. Skip one Dairy Milk and you're in for life.</p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8 text-sm text-muted">
              <span>MBBS · 3rd year</span>
              <span className="w-1 h-1 rounded-full bg-muted" />
              <span>Built between rounds</span>
              <span className="w-1 h-1 rounded-full bg-muted" />
              <span>Made in India 🇮🇳</span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-10">
              <Link to="/auth" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105">Join the journey</Link>
              <Link to="/pricing" className="glass border border-white/10 hover:border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all">See the ₹11 lifetime plan</Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8 text-center text-sm text-muted">
          <p>© 2026 LA-TO-RA — built for Indian PG aspirants</p>
        </footer>
      </main>
    </div>
  )
}
