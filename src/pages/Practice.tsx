import { useState } from 'react'
import { Link } from 'react-router-dom'
import { subjects, mcqs, type Subject } from '../data/mcqData'

export default function Practice() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizDone, setQuizDone] = useState(false)

  const filteredMcqs = selectedTopic
    ? mcqs.filter(m => m.topic === selectedTopic)
    : selectedSubject
    ? mcqs.filter(m => m.subject === selectedSubject.id)
    : mcqs

  const startQuiz = () => {
    setCurrentQ(0)
    setScore(0)
    setQuizStarted(true)
    setQuizDone(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (idx: number) => {
    if (showResult) return
    setSelectedAnswer(idx)
    setShowResult(true)
    if (idx === filteredMcqs[currentQ].correct) setScore(s => s + 1)
  }

  const nextQuestion = () => {
    if (currentQ < filteredMcqs.length - 1) {
      setCurrentQ(c => c + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizDone(true)
      setQuizStarted(false)
    }
  }

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (quizDone) {
    const pct = Math.round((score / filteredMcqs.length) * 100)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="glass rounded-3xl border border-white/10 p-12 w-full max-w-md text-center animate-slide-up">
          <div className="text-6xl mb-6">{pct >= 70 ? '🎉' : pct >= 40 ? '💪' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-2">{score}/{filteredMcqs.length}</h2>
          <p className="text-muted mb-2">You scored {pct}%</p>
          <div className="w-full bg-surface-2 rounded-full h-3 mb-8">
            <div className="bg-accent rounded-full h-3 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={startQuiz} className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-medium transition-all">Try again</button>
            <Link to="/mock-test" className="glass border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-full font-medium transition-all">Take a mock</Link>
          </div>
        </div>
      </div>
    )
  }

  if (quizStarted && filteredMcqs.length > 0) {
    const q = filteredMcqs[currentQ]
    return (
      <div className="min-h-screen bg-[#0a0a0a] px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/practice" className="text-muted hover:text-white transition-colors">← Back</Link>
            <div className="flex items-center gap-4">
              <button onClick={() => toggleBookmark(q.id)} className={`text-xl transition-colors ${bookmarks.has(q.id) ? 'text-amber-accent' : 'text-muted hover:text-white'}`}>
                {bookmarks.has(q.id) ? '⭐' : '☆'}
              </button>
              <span className="text-sm text-muted">{currentQ + 1}/{filteredMcqs.length}</span>
            </div>
          </div>

          <div className="w-full bg-surface-2 rounded-full h-1.5 mb-10">
            <div className="bg-accent rounded-full h-1.5 transition-all" style={{ width: `${((currentQ + 1) / filteredMcqs.length) * 100}%` }} />
          </div>

          <div className="glass rounded-2xl border border-white/10 p-8 md:p-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-light font-medium">{q.subject}</span>
              <span className="text-xs text-muted">{q.topic}</span>
            </div>
            <h2 className="text-xl font-semibold mb-8 leading-relaxed">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let cls = 'border-border bg-surface-2 hover:border-accent/30'
                if (showResult && idx === q.correct) cls = 'border-green-accent bg-green-accent/10'
                else if (showResult && idx === selectedAnswer && idx !== q.correct) cls = 'border-red-500 bg-red-500/10'
                else if (selectedAnswer === idx) cls = 'border-accent bg-accent/10'

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${cls}`}
                  >
                    <span className="text-muted mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {showResult && (
              <div className="mt-8 animate-slide-up">
                <div className={`p-5 rounded-xl ${selectedAnswer === q.correct ? 'bg-green-accent/10 border border-green-accent/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <p className={`font-medium mb-1 ${selectedAnswer === q.correct ? 'text-green-accent' : 'text-red-400'}`}>
                    {selectedAnswer === q.correct ? '✅ Correct!' : '❌ Incorrect'}
                  </p>
                  <p className="text-muted text-sm leading-relaxed">{q.explanation}</p>
                </div>
                <button onClick={nextQuestion} className="mt-6 w-full bg-accent hover:bg-accent/90 text-white py-3.5 rounded-xl font-medium transition-all">
                  {currentQ < filteredMcqs.length - 1 ? 'Next question →' : 'See results'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="text-2xl font-bold gradient-text">LA-TO-RA</Link>
          <Link to="/auth" className="text-sm bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full transition-all">Sign in</Link>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Topic-wise practice</h1>
          <p className="text-muted">Pick a subject, drill down to a topic, and start mastering MCQs.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {subjects.map(sub => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubject(sub)
                setSelectedTopic(null)
              }}
              className={`glass rounded-2xl p-5 border text-left transition-all hover:-translate-y-0.5 ${
                selectedSubject?.id === sub.id ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-3">{sub.icon}</div>
              <h3 className="font-semibold">{sub.name}</h3>
              <p className="text-xs text-muted mt-1">{sub.topics.length} topics</p>
            </button>
          ))}
        </div>

        {selectedSubject && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{selectedSubject.icon} {selectedSubject.name}</h2>
              <button onClick={() => setSelectedSubject(null)} className="text-sm text-muted hover:text-white transition-colors">Clear</button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedSubject.topics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`glass rounded-xl px-5 py-4 border text-left transition-all ${
                    selectedTopic === topic ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="font-medium text-sm">{topic}</span>
                  <span className="text-xs text-muted block mt-1">{mcqs.filter(m => m.topic === topic).length} questions</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTopic && (
          <div className="mt-10 animate-slide-up">
            <div className="glass rounded-2xl border border-white/10 p-8 text-center">
              <p className="text-muted mb-6">{filteredMcqs.length} questions available in <span className="text-white font-medium">{selectedTopic}</span></p>
              <button onClick={startQuiz} className="bg-accent hover:bg-accent/90 text-white px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105">
                Start drilling
              </button>
            </div>
          </div>
        )}

        {bookmarks.size > 0 && (
          <div className="mt-16 animate-slide-up">
            <h2 className="text-xl font-semibold mb-6">⭐ Your bookmarks ({bookmarks.size})</h2>
            <div className="space-y-4">
              {mcqs.filter(m => bookmarks.has(m.id)).map(q => (
                <div key={q.id} className="glass rounded-2xl border border-white/5 p-6 hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent-light">{q.subject}</span>
                    <span className="text-xs text-muted">{q.topic}</span>
                  </div>
                  <p className="font-medium mb-3">{q.question}</p>
                  <p className="text-sm text-muted">{q.options[q.correct]} ✓</p>
                  <button onClick={() => toggleBookmark(q.id)} className="text-xs text-amber-accent mt-2">Remove bookmark</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
