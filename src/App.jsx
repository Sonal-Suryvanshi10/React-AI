import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Command,
  LoaderCircle,
  MessageCircle,
  Moon,
  RotateCcw,
  Send,
  Sparkles,
  Sun,
  WandSparkles,
  Zap,
} from 'lucide-react'
import askAi from './AskAi'
import './App.css'

const suggestions = [
  'Explain quantum physics simply',
  'Give me a creative business idea',
  'Write a fun birthday message',
]

export default function App() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('sakhi-theme') || 'dark')
  const [question, setQuestion] = useState('')
  const [conversation, setConversation] = useState([])
  const [pendingQuestion, setPendingQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const conversationEndRef = useRef(null)

  useEffect(() => {
    window.localStorage.setItem('sakhi-theme', theme)
  }, [theme])

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [conversation, pendingQuestion])

  async function handleSubmit(event) {
    event.preventDefault()
    const userQuestion = question.trim()
    if (!userQuestion || isLoading) return

    setIsLoading(true)
    setError('')
    setPendingQuestion(userQuestion)

    try {
      const response = await askAi(userQuestion, conversation)
      const answer = JSON.parse(response)
      setConversation((previous) => [
        ...previous,
        { role: 'user', content: userQuestion },
        { role: 'assistant', content: answer },
      ])
      setQuestion((current) => current === userQuestion ? '' : current)
    } catch {
      setError('Oops, response load nahi ho paaya. Ek baar phir try karo.')
    } finally {
      setIsLoading(false)
      setPendingQuestion('')
    }
  }

  function askSuggestion(suggestion) {
    setQuestion(suggestion)
    setError('')
  }

  function startNewConversation() {
    setConversation([])
    setPendingQuestion('')
    setError('')
  }

  return (
    <main className="app-shell relative isolate mx-auto min-h-screen w-full max-w-[1440px] overflow-hidden" data-theme={theme}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="topbar flex min-h-[88px] items-center justify-between">
        <a className="brand" href="#" aria-label="SAKHI home">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>SAKHI</span>
        </a>
        <div className="topbar-note"><span className="live-dot" /> Your little spark of genius</div>
        <div className="topbar-actions flex items-center gap-2">
          <div className="topbar-shortcut"><Command size={13} /> <span>AI powered</span></div>
          <button
            className="theme-toggle inline-flex min-h-[34px] items-center gap-[7px] px-[11px] text-[11px]"
            type="button"
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR IDEAS, AMPLIFIED</div>
          <h1>Curiosity looks<br />good <span className="gradient-text">on you.</span></h1>
          <p className="hero-description">
            Big questions, tiny curiosities, random 2am thoughts —
            bring them all. We&apos;re listening.
          </p>
          <div className="hero-stats">
            <span><Zap size={15} /> Quick, thoughtful answers</span>
            <i />
            <span><WandSparkles size={15} /> A little bit of magic</span>
          </div>
        </div>

        <div className="orb-stage" aria-hidden="true">
          <div className="orb-orbit orbit-one" />
          <div className="orb-orbit orbit-two" />
          <div className="orb-glow" />
          <div className="orb">
            <div className="orb-highlight" />
            <div className="orb-core"><Sparkles size={35} strokeWidth={1.4} /></div>
          </div>
          <div className="float-card float-card-top"><span className="float-icon violet"><Sparkles size={14} /></span><span>Ideas, meet answers</span></div>
          <div className="float-card float-card-bottom"><span className="float-icon peach"><MessageCircle size={14} /></span><span>Made for curious minds</span></div>
          <span className="sparkle sparkle-a">✳</span>
          <span className="sparkle sparkle-b">✦</span>
          <span className="sparkle sparkle-c">·</span>
        </div>
      </section>

      <section className="workspace" aria-label="Ask SAKHI">
        <div className="workspace-heading mb-[18px] flex items-end justify-between">
          <div>
            <div className="section-kicker">LET&apos;S MAKE SOMETHING CLICK</div>
            <h2>What&apos;s on your mind?</h2>
          </div>
          <div className="secure-note"><span className="secure-dot" /> Ready when you are</div>
        </div>

        {conversation.length > 0 && (
          <section className="conversation" aria-label="Conversation with SAKHI" aria-live="polite">
            <div className="conversation-heading">
              <div className="answer-label"><span className="answer-icon"><MessageCircle size={14} /></span> YOUR CONVERSATION</div>
              <button className="reset-button" type="button" onClick={startNewConversation} disabled={isLoading}>
                <RotateCcw size={13} /> New conversation
              </button>
            </div>
            <div className="conversation-messages">
              {conversation.map((message, index) => (
                <article className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    <div className="chat-answer">
                      {message.content.greeting && <p className="answer-greeting">{message.content.greeting}</p>}
                      {message.content.heading && <h3>{message.content.heading}</h3>}
                      <p className="answer-text">{message.content.answer}</p>
                    </div>
                  )}
                </article>
              ))}
              {pendingQuestion && (
                <>
                  <article className="chat-message user"><p>{pendingQuestion}</p></article>
                  <div className="loading-state"><span className="loading-orb"><Sparkles size={19} /></span><span>Soch rahi hoon...</span></div>
                </>
              )}
              <div ref={conversationEndRef} />
            </div>
            <div className="answer-bottom"><Check size={13} /> SAKHI is keeping the context of this conversation</div>
          </section>
        )}

        {pendingQuestion && conversation.length === 0 && (
          <section className="answer-card" aria-live="polite">
            <div className="answer-topline">
              <div className="answer-label"><span className="answer-icon"><Sparkles size={15} /></span> SAKHI IS THINKING</div>
            </div>
            <div className="loading-state"><span className="loading-orb"><Sparkles size={19} /></span><span>Putting a little thought into this...</span></div>
          </section>
        )}

        <form className="prompt-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="prompt">Ask SAKHI anything</label>
          <textarea
            id="prompt"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                event.currentTarget.form.requestSubmit()
              }
            }}
            placeholder="Ask anything... the weirder, the better."
            rows={2}
          />
          <div className="prompt-footer flex items-center justify-between gap-3 pt-2">
            <span className="input-hint"><span>↵</span> to send <span className="hint-divider">·</span> shift + ↵ for a new line</span>
            <button className="send-button" type="submit" disabled={isLoading || !question.trim()}>
              {isLoading ? <LoaderCircle className="spin" size={17} /> : <Send size={16} />}
              <span>{isLoading ? 'Thinking...' : 'Ask SAKHI'}</span>
              {!isLoading && <ArrowUpRight size={15} />}
            </button>
          </div>
        </form>

        <div className="suggestions">
          <span className="suggestion-label">Need a spark?</span>
          {suggestions.map((suggestion) => (
            <button
              className="suggestion-chip"
              type="button"
              key={suggestion}
              onClick={() => askSuggestion(suggestion)}
            >
              {suggestion}<ArrowUpRight size={12} />
            </button>
          ))}
        </div>

        {error && <div className="error-message" role="alert">{error}</div>}
      </section>

      <footer className="page-footer">
        <span>GOOD QUESTIONS MAKE GOOD THINGS HAPPEN</span>
        <a href="#prompt" onClick={() => document.getElementById('prompt')?.focus()}>
          Back to your question <ArrowDown size={13} />
        </a>
      </footer>
    </main>
  )
}
