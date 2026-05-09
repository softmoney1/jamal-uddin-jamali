import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPaperPlane,
  faCopyright,
} from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faLinkedin,
  faInstagram,
  faAmazon,
  faGoodreads,
} from '@fortawesome/free-brands-svg-icons'

const iconMap = {
  twitter: faTwitter,
  linkedin: faLinkedin,
  instagram: faInstagram,
  amazon: faAmazon,
  goodreads: faGoodreads,
  kindle: faAmazon,
}

function Footer({ social, books }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const buyLinks = useMemo(() => {
    const featured = books.find((book) => book.featured)
    return featured?.buyLinks ?? {}
  }, [books])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (email.trim()) {
      setStatus('Thanks for joining the newsletter!')
      setEmail('')
    }
  }

  return (
    <footer className="border-t border-midnight-navy bg-steel-blue text-cream-alt px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl bg-midnight-navy px-8 py-10 text-cream-alt shadow-soft sm:px-10">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Newsletter</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Join My Newsletter</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Receive news about new books, reading notes, and special writing updates.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-midnight-navy transition hover:opacity-80"
              >
                Join My Newsletter
              </button>
            </form>
            {status && <p className="mt-3 text-sm text-emerald-300">{status}</p>}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-midnight-navy bg-midnight-navy p-6">
              <h3 className="text-sm font-semibold uppercase text-where-to-buy">Follow</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {social.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-card-border bg-transparent px-4 py-3 text-sm text-cream-alt transition hover:border-gold hover:text-gold"
                  >
                    <FontAwesomeIcon icon={iconMap[item.icon]} />
                    {item.platform}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-midnight-navy bg-midnight-navy p-6">
              <h3 className="text-sm font-semibold uppercase text-where-to-buy">Where to Buy</h3>
              <div className="mt-4 space-y-3">
                {Object.entries(buyLinks).map(([store, url]) => (
                  <a
                    key={store}
                    href={url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-card-border bg-transparent px-4 py-3 text-sm font-medium text-cream-alt transition hover:border-gold hover:text-gold"
                  >
                    <FontAwesomeIcon icon={iconMap[store]} className="h-4 w-4" />
                    {store.charAt(0).toUpperCase() + store.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-midnight-navy pt-6 text-sm text-cream-alt sm:flex-row">
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCopyright} className="h-3.5 w-3.5" />
            2026 Jamaluddin Jamali. All rights reserved.
          </p>
          <p>Designed with a clean, minimal author portfolio layout.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
