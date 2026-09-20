import { useEffect, useState } from 'react'
import './App.css'

const navItems = [['/', 'Home'], ['/services', 'Services'], ['/clients', 'Profile'], ['/qualifications', 'Team'], ['/contact', 'Contact']]
const routePaths = navItems.map(([href]) => href).filter((href) => href !== '/')
const siteBase = window.location.pathname.includes('/dawit-') ? '/dawit-' : ''
const routePath = (pathname) => {
  const pathnameWithoutBase = pathname.startsWith(siteBase) ? pathname.slice(siteBase.length) : pathname
  return routePaths.find((route) => pathnameWithoutBase === route || pathnameWithoutBase === `${route}/`) || '/'
}

function CalculatorIntro({ onEnter }) {
  const [display, setDisplay] = useState('0')
  const [stored, setStored] = useState(null)
  const [operator, setOperator] = useState(null)
  const [fresh, setFresh] = useState(true)
  const [awake, setAwake] = useState(false)
  const [entering, setEntering] = useState(false)
  const press = (key) => {
    if (entering) return
    if (/^\d$/.test(key) || key === '.') { setDisplay((value) => (fresh || value === '0' ? key : `${value}${key}`)); setFresh(false); return }
    if (key === 'AC') { setDisplay('0'); setStored(null); setOperator(null); setFresh(true); return }
    if (key === '=') {
      if (operator && stored !== null) { const current = Number(display); const result = operator === '+' ? stored + current : operator === '-' ? stored - current : operator === 'x' ? stored * current : stored / current; setDisplay(String(Number.isFinite(result) ? Math.round(result * 100) / 100 : 0)); setStored(null); setOperator(null); setFresh(true) } else { setAwake(true); setEntering(true); onEnter() }
      return
    }
    if (['+', '-', 'x', '/'].includes(key)) { setStored(Number(display)); setOperator(key); setFresh(true) }
  }
  useEffect(() => { const handleKey = (event) => { const map = { '*': 'x', '/': '/', '+': '+', '-': '-', Enter: '=', '=': '=', Escape: 'AC' }; if (/^\d$/.test(event.key) || event.key === '.' || map[event.key]) { event.preventDefault(); press(map[event.key] || event.key) } }; window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey) })
  const keys = ['MC', 'MR', 'M-', 'M+', 'AC', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']
  return <main className={`intro ${awake ? 'is-awake' : ''}`}><div className="intro-meta"><span>EST. 2018</span><span>PRECISION IN PRACTICE</span></div><section className="calculator-wrap" aria-label="Interactive calculator gateway"><div className="calculator"><div className="calculator-top"><span className="screw" /><span>ACCT-08</span><span className="screw" /></div><div className="display-frame"><div className="display" aria-live="polite"><span className="display-brand">DAWIT THEODROS / AUTHORIZED ACCOUNTANT</span><span className="display-number">{display}<span className="display-cursor" /></span></div></div><div className="key-grid">{keys.map((key) => <button key={key} type="button" aria-label={key === '/' ? 'Divide' : key === 'x' ? 'Multiply' : key === '=' ? 'Enter website' : undefined} className={`calc-key key-${key.replace(/[^a-zA-Z0-9]/g, 'op')}`} onClick={() => press(key)}>{key === '/' ? '÷' : key}</button>)}</div><div className="calculator-label">ELECTRONIC ACCOUNTING MACHINE <span>MADE FOR CLEAR THINKING</span></div></div></section><p className="intro-hint"><span className="hint-dot" /> Press <strong>=</strong> to enter the office</p><div className="intro-mark">DAWIT THEODROS<br /><span>ACCOUNTING FIRM</span></div><div className="zap-field" aria-hidden="true" /></main>
}

function SiteNavigation({ path, basePath, onNavigate }) {
  const [open, setOpen] = useState(false)
  const navigate = (event, href) => { event.preventDefault(); setOpen(false); onNavigate(href) }
  return <header className="site-nav"><a className="wordmark" href={`${basePath}/`} onClick={(event) => navigate(event, '/')}>DAWIT THEODROS <span>/ AF</span></a><button className="menu-toggle" aria-expanded={open} onClick={() => setOpen(!open)}><span /> MENU</button><nav className={open ? 'nav-open' : ''}>{navItems.map(([href, label], index) => <a key={href} className={path === href ? 'active' : ''} href={`${basePath}${href}`} onClick={(event) => navigate(event, href)}><small>0{index + 1}</small>{label}</a>)}</nav></header>
}

const pageData = {
  '/services': { eyebrow: 'CAPABILITIES / 02', title: 'More than\nnumbers.', intro: 'Clear financial planning, reporting, compliance, risk management, and leadership for better decisions.', sections: [['01', 'Financial planning & analysis', 'Budgeting: annual operating budgets and long-term financial plans. Forecasting: future revenue, expenses, and cash flows. Variance analysis: comparing actual performance with planned budgets to adjust strategy.'], ['02', 'Financial reporting & compliance', 'Statement preparation for balance sheets, income statements, and cash flow statements. Regulatory compliance with national tax laws, local regulations, IFRS, and GAAP. Audit coordination with internal and external auditors.'], ['03', 'Strategic financial management & risk', 'Cash flow management for daily liquidity and short-term obligations. Risk assessment covering credit, currency, and market risk, with controls to mitigate exposure. Cost control and strategy to improve margins and reduce unnecessary expenditure.'], ['04', 'Operational & team leadership', 'Department oversight across accounts payable, accounts receivable, and payroll. Team guidance through training, mentoring, and performance goals for finance staff.']] },
  '/clients': { eyebrow: 'THE FIRM / 03', title: 'A clear record\nof purpose.', intro: 'Dawit Theodros Accounting Firm is a professional service firm registered in Ethiopia and established in 2018 by Ato Dawit Theodros.', sections: [['VISION', 'A trusted financial partner', 'To support sound decisions through dependable accounting and practical financial insight.'], ['MISSION', 'Professional clarity', 'To provide accurate accounting works, financial statement preparation, tax consulting, finance consulting, and IFRS conversion.'], ['CORE VALUES', 'Precision with integrity', 'Accuracy, confidentiality, accountability, and service-minded guidance shape every engagement.'], ['EXPERIENCE', '25 years in accounting', 'A deep accounting practice, including 8 years of experience as an authorized accountant.'], ['AUTHORISATION', 'Authorized accountant', 'Led by Ato Dawit Theodros with professional service rooted in the Ethiopian business context.']] },
  '/qualifications': { eyebrow: 'THE TEAM / 04', title: 'Experience\nbehind the figures.', intro: 'A capable team brings disciplined work and considered advice to every client relationship.', sections: [['TEAM', 'Full-time and part-time employees', 'The firm works with both full-time and part-time employees to meet the needs of each engagement.'], ['EXPERTISE', 'Master’s-level professionals', 'Many employees hold Master’s degrees in their respective fields.'], ['PRACTICE', '10+ years in their fields', 'Many team members bring more than 10 years of experience in their respective fields.'], ['APPROACH', 'Guidance that stays practical', 'Training, mentoring, and performance goals support consistent quality across finance and accounting work.']] },
}

function HomePage({ onNavigate }) { return <><section className="hero-page"><div className="hero-copy"><p className="eyebrow">ACCOUNTING <i /> TAX <i /> FINANCE</p><h1>Your Trusted<br /><em>Financial Partner.</em></h1><p className="lede">Dawit Theodros Accounting Firm brings 25 years of accounting experience and clear financial insight to every decision.</p><div className="hero-actions"><button className="button button-primary" onClick={() => onNavigate('/services')}>Explore services <span>↗</span></button><button className="text-button" onClick={() => onNavigate('/contact')}>Start a conversation <span>→</span></button></div></div><div className="hero-instrument"><div className="instrument-ring" /><div className="instrument-core"><span>01</span><strong>CLARITY</strong><small>IN EVERY FIGURE</small></div><div className="instrument-line line-one" /><div className="instrument-line line-two" /><span className="hero-coordinate">ETHIOPIA<br />EST. 2018</span></div></section><section className="home-strip"><div><span className="strip-number">01</span><strong>Measured work.<br />Meaningful insight.</strong></div><p>Authorized accounting, practical advice, and dependable reporting for the work that comes next.</p><span className="strip-code">DT / FIELD NOTE 001</span></section></> }

function DetailPage({ data }) { return <section className="detail-page"><div className="detail-heading"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h1><p className="lede">{data.intro}</p></div><div className="detail-grid">{data.sections.map(([number, title, description]) => <article className="detail-item" key={title}><span className="item-number">{number}</span><div><h2>{title}</h2><p>{description}</p></div><span className="item-arrow">↗</span></article>)}</div></section> }

function ContactPage() { const [sent, setSent] = useState(false); return <section className="contact-page"><div className="contact-heading"><p className="eyebrow">OPEN CHANNEL / 05</p><h1>Let's make<br /><em>things clear.</em></h1><p className="lede">Tell us a little about the accounting or financial work you are considering. We will get back to you with a considered response.</p><div className="contact-details"><span>FIRM</span><p>Dawit Theodros Accounting Firm<br />Authorized Accountant</p><span>ESTABLISHED</span><p>2018 · Ethiopia</p></div></div><form onSubmit={(event) => { event.preventDefault(); setSent(true) }} className="contact-form"><label>Name<input required autoComplete="name" placeholder="Your name" /></label><label>Email<input required type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Phone<input type="tel" autoComplete="tel" placeholder="Your phone number" /></label><label>Subject<input required placeholder="How can we help?" /></label><label>Message<textarea required rows="5" placeholder="A little more detail..." /></label><button className="button button-primary" type="submit">{sent ? 'Message queued' : 'Send message'}</button></form></section> }

function App() {
  const [path, setPath] = useState(() => routePath(window.location.pathname))
  const [entered, setEntered] = useState(() => routePath(window.location.pathname) !== '/')
  useEffect(() => { const handlePop = () => setPath(routePath(window.location.pathname)); window.addEventListener('popstate', handlePop); return () => window.removeEventListener('popstate', handlePop) }, [])
  const navigate = (next) => { window.history.pushState({}, '', `${siteBase}${next}`); setPath(next); window.scrollTo(0, 0) }
  if (!entered) return <CalculatorIntro onEnter={() => { const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; window.setTimeout(() => setEntered(true), reduced ? 0 : 1100) }} />
  const content = path === '/' ? <HomePage onNavigate={navigate} /> : path === '/contact' ? <ContactPage /> : <DetailPage data={pageData[path] || pageData['/services']} />
  return <div className="site-shell"><SiteNavigation path={path} basePath={siteBase} onNavigate={navigate} /><main className="site-main">{content}</main><footer><span>DAWIT THEODROS / ACCOUNTING FIRM</span><span>OLD-SCHOOL PRECISION / MODERN PROFESSIONALISM</span><span>© 2026</span></footer></div>
}

export default App
