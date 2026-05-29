import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockTests, mcqs } from '../data/mcqData'

export default function MockTest() {
  const [selectedTest, setSelectedTest] = useState<typeof mockTests[0] | null>(null)
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])

  const testMcqs = mcqs.slice(0, selectedTest?.questions || 10)

  useEffect(() => {
    if (!started || timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [started, timeLeft])

  useEffect(() => {
    if (timeLeft === 0 && started) finishTest()
  }, [timeLeft])

  const startTest = () => {
    if (!selectedTest) return
    setStarted(true)
    setCurrentQ(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setFinished(false)
    setAnswers(new Array(selectedTest.questions).fill(-1))
    setTimeLeft(selectedTest.duration * 60)
  }

  const handleAnswer = (idx: number) => {
    if (showResult) return
    setSelectedAnswer(idx)
    setShowResult(true)
    const newAnswers = [...answers]
    newAnswers[currentQ] = idx
    setAnswers(newAnswers)
    if (idx === testMcqs[currentQ].correct) setScore(s => s + 1)
  }

  const nextQuestion = () => {
    if (currentQ < testMcqs.length - 1) {
      setCurrentQ(c => c + 1)
      setSelectedAnswer(answers[currentQ + 1] !== -1 ? answers[currentQ + 1] : null)
      setShowResult(false)
    }
  }

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(c => c - 1)
      setSelectedAnswer(answers[currentQ - 1] !== -1 ? answers[currentQ - 1] : null)
      setShowResult(false)
    }
  }

  const finishTest = () => {
    setFinished(true)
    setStarted(false)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (finished) {
    const pct = Math.round((score / testMcqs.length) * 100)
    const correctAnswers = answers.filter((a, i) => a === testMcqs[i]?.correct).length
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="glass rounded-3xl border border-white/10 p-12 w-full max-w-md text-center animate-slide-up">
          <div className="text-6xl mb-6">{pct >= 70 ? '🎉' : pct >= 40 ? '💪' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-1">{correctAnswers}/{testMcqs.length}</h2>
          <p className="text-muted mb-1">Score: {pct}%</p>
          <p className="text-sm text-muted mb-6">
            Accuracy: {answers.filter(a => a !== -1).length > 0
              ? Math.round((correctAnswers / answers.filter(a => a !== -1).length) * 100)
              : 0}% · {answers.filter(a => a !== -1).length} attempted
          </p>
          <div className="w-full bg-surface-2 rounded-full h-3 mb-8">
            <div className="bg-accent rounded-full h-3 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={startTest} className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-medium transition-all">Retake</button>
            <Link to="/practice" className="glass border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-full font-medium transition-all">Practice topics</Link>
          </div>

          <div className="mt-8 text-left">
            <h3 className="font-medium mb-3">Review answers</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
              {testMcqs.map((q, i) => (
                <div key={i} className={`p-3 rounded-xl text-sm border ${answers[i] === q.correct ? 'border-green-accent/30 bg-green-accent/5' : answers[i] !== -1 ? 'border-red-500/30 bg-red-500/5' : 'border-border bg-surface-2'}`}>
                  <p className="line-clamp-2 mb-1">{q.question}</p>
                  <p className={`text-xs ${answers[i] === q.correct ? 'text-green-accent' : answers[i] !== -1 ? 'text-red-400' : 'text-muted'}`}>
                    {answers[i] === q.correct ? '✓ Correct' : answers[i] !== -1 ? `✗ Your answer: ${q.options[answers[i]]}` : '— Not answered'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (started) {
    const q = testMcqs[currentQ]
    return (
      <div className="min-h-screen bg-[#0a0a0a] px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={finishTest} className="text-sm text-muted hover:text-white transition-colors">← Exit mock</button>
            <div className={`text-lg font-bold font-mono ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-accent-light'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-8">
            {testMcqs.map((_, i) => (
              <div
                key={i}
                onClick={() => { setCurrentQ(i); setSelectedAnswer(answers[i] !== -1 ? answers[i] : null); setShowResult(false) }}
                className={`w-7 h-7 rounded-full text-xs flex items-center justify-center cursor-pointer transition-all ${
                  i === currentQ ? 'ring-2 ring-accent bg-accent text-white scale-110'
                  : answers[i] !== -1 ? 'bg-accent/30 text-accent-light'
                  : 'bg-surface-2 text-muted hover:bg-surface-3'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl border border-white/10 p-8 md:p-10">
            <h2 className="text-xl font-semibold mb-8 leading-relaxed">{q?.question}</h2>

            <div className="space-y-3">
              {q?.options.map((opt, idx) => {
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
              <div className="mt-6 animate-slide-up">
                <p className={`font-medium mb-1 ${selectedAnswer === q.correct ? 'text-green-accent' : 'text-red-400'}`}>
                  {selectedAnswer === q.correct ? '✅ Correct' : '❌ Incorrect'}
                </p>
                <p className="text-sm text-muted leading-relaxed">{q?.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <button onClick={prevQuestion} disabled={currentQ === 0} className="px-5 py-2.5 rounded-xl border border-border text-sm disabled:opacity-30 hover:border-accent/30 transition-all">← Previous</button>
              {currentQ < testMcqs.length - 1 ? (
                <button onClick={nextQuestion} className="px-5 py-2.5 rounded-xl bg-accent text-sm font-medium hover:bg-accent/90 transition-all">Next →</button>
              ) : (
                <button onClick={finishTest} className="px-5 py-2.5 rounded-xl bg-green-accent/20 text-green-accent text-sm font-medium hover:bg-green-accent/30 transition-all">Finish test</button>
              )}
            </div>
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Mock tests</h1>
          <p className="text-muted">Simulate the real exam with timed, subject-wise, and grand mocks.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockTests.map(test => (
            <button
              key={test.id}
              onClick={() => setSelectedTest(test)}
              className={`glass rounded-2xl p-6 border text-left transition-all hover:-translate-y-0.5 ${
                selectedTest?.id === test.id ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  test.difficulty === 'Easy' ? 'bg-green-accent/10 text-green-accent'
                  : test.difficulty === 'Medium' ? 'bg-amber-accent/10 text-amber-accent'
                  : 'bg-red-500/10 text-red-400'
                }`}>
                  {test.difficulty}
                </div>
                <span className="text-sm text-muted">{test.duration} min</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{test.name}</h3>
              <p className="text-sm text-muted">{test.questions} questions · {test.subjects.join(', ')}</p>
            </button>
          ))}
        </div>

        {selectedTest && (
          <div className="mt-10 animate-slide-up">
            <div className="glass rounded-2xl border border-white/10 p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold mb-2">{selectedTest.name}</h2>
              <p className="text-muted mb-2">
                {selectedTest.questions} questions · {selectedTest.duration} minutes · {selectedTest.difficulty} difficulty
              </p>
              <p className="text-sm text-muted mb-8">{selectedTest.subjects.join(', ')}</p>
              <button onClick={startTest} className="bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-full font-medium text-lg transition-all hover:scale-105 animate-pulse-glow">
                Start mock test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
