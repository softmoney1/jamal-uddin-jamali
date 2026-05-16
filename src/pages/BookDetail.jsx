import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmazon, faGoodreads, faApple } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { data } from '../data.js'
import SEO from '../components/SEO'

// Map store keys to icons; kindle falls back to Amazon icon
const storeIcons = {
  amazon:      faAmazon,
  goodreads:   faGoodreads,
  kindle:      faAmazon,
  apple:       faApple,
  barnesnoble: faBookOpen,
}

// Render buy buttons — only shows stores that have a link in buyLinks
function BuyButtonRow({ buyLinks, size = 'sm' }) {
  const allButtons = [
    { key: 'amazon',      label: 'Amazon',        bg: '#1a1a2e', color: '#e8c468' },
    { key: 'goodreads',   label: 'Goodreads',      bg: '#2d6a4f', color: '#b7e4c7' },
    { key: 'apple',       label: 'Apple Books',    bg: '#000000', color: '#ffffff' },
    { key: 'barnesnoble', label: 'Barnes & Noble', bg: '#1c4e2e', color: '#f5f0e8' },
  ]
  const buttons = allButtons.filter(({ key }) => buyLinks?.[key])
  const padding = size === 'lg' ? 'px-5 py-3 text-sm' : 'book-card-btn'

  if (size === 'lg') {
    return (
      <div className="flex flex-wrap gap-3">
        {buttons.map(({ key, label, bg, color }) => (
          <a
            key={key}
            href={buyLinks[key]}
            target="_blank"
            rel="noreferrer"
            style={{ background: bg, color }}
            className={`inline-flex items-center gap-2 rounded-xl font-semibold transition hover:opacity-80 ${padding}`}
          >
            <FontAwesomeIcon icon={storeIcons[key]} className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="book-card-buttons">
      {buttons.map(({ key, label, bg, color }) => (
        <a
          key={key}
          href={buyLinks[key]}
          target="_blank"
          rel="noreferrer"
          style={{ background: bg, color }}
          className="book-card-btn transition hover:opacity-80"
        >
          {label}
        </a>
      ))}
    </div>
  )
}

function BookDetail() {
  const { slug } = useParams()
  const book = useMemo(() => data.books.find((item) => item.slug === slug), [slug])
  const relatedBooks = useMemo(() => data.books.filter((item) => item.slug !== slug), [slug])

  if (!book) {
    return (
      <div className="rounded-3xl border border-[#e8e0d0] bg-white p-10">
        <p className="text-base text-slate-600">Book not found.</p>
        <Link to="/books" className="mt-4 inline-flex rounded-xl bg-[#1a1a2e] px-5 py-3 text-sm font-semibold text-[#e8c468] hover:opacity-80">
          Back to Books
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <SEO 
        title={book.title} 
        description={book.shortDescription}
        image={book.coverImage}
      />

      {/* ── BACK LINK ── */}
      <Link
        to="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a2e] hover:text-[#c0392b] transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Books
      </Link>

      {/* ── TOP SECTION — 2 columns ── */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

        {/* LEFT COL — cover + buy icons */}
        <div className="flex-shrink-0 space-y-5 lg:w-[200px]">
          <div className="overflow-hidden rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.18)] aspect-[2/3] w-full">
            <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
          </div>
          {/* Buy icons below cover */}
          <div className="flex flex-col gap-2">
            {[
              { key: 'amazon',      label: 'Amazon',           icon: faAmazon,    bg: '#1a1a2e', color: '#e8c468' },
              { key: 'goodreads',   label: 'Goodreads',         icon: faGoodreads, bg: '#2d6a4f', color: '#b7e4c7' },
              { key: 'apple',       label: 'Apple Books',       icon: faApple,     bg: '#000000', color: '#ffffff' },
              { key: 'barnesnoble', label: 'Barnes & Noble',    icon: faBookOpen,  bg: '#1c4e2e', color: '#f5f0e8' },
            ].filter(({ key }) => book.buyLinks?.[key]).map(({ key, label, icon, bg, color }) => (
              <a
                key={key}
                href={book.buyLinks?.[key] || '#'}
                target="_blank"
                rel="noreferrer"
                style={{ background: bg, color }}
                className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition hover:opacity-80"
              >
                <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COL — content */}
        <div className="flex-1 space-y-5 min-w-0">
          {/* Genre badges */}
          <div className="flex flex-wrap gap-[6px]">
            {book.genre.map((g) => (
              <span key={g} className="bg-[#f5f0e8] text-[#6b4c3b] text-[10px] font-semibold tracking-[0.06em] px-[10px] py-[4px] rounded-[20px] uppercase">
                {g}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black leading-tight text-[#1a1a2e] tracking-tight">
            {book.title}
          </h1>

          {/* Tagline (italic, crimson) */}
          {book.tagline && (
            <p className="text-lg leading-7 text-[#c0392b] italic">{book.tagline}</p>
          )}

          {/* boldLine */}
          {book.boldLine && (
            <p className="text-base leading-7 text-[#1a1a2e] font-bold">{book.boldLine}</p>
          )}

          {/* hook */}
          {book.hook && (
            <p className="text-base leading-7 text-[#2c2c2a]">{book.hook}</p>
          )}

          {/* Paragraphs — full text, no clamp */}
          <div className="space-y-4 pt-2">
            {book.paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-8 text-[#5f5e5a]">{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ── GET THE BOOK — full-width button row ── */}
      <div className="rounded-2xl border border-[#e8e0d0] bg-[#fdfaf5] px-6 py-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">Get the Book</p>
        <BuyButtonRow buyLinks={book.buyLinks} size="lg" />
      </div>

      {/* ── EDITORIAL REVIEW BLOCK ── */}
      {book.editorialReview && (
        <div className="rounded-2xl border border-[#e8e0d0] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">Editorial Review</p>
          <p className="text-base leading-8 text-[#2c2c2a] italic">
            &ldquo;{book.editorialReview.text}&rdquo;
          </p>
          <p className="text-sm font-bold text-[#1a1a2e]">— {book.editorialReview.reviewer}</p>
        </div>
      )}

      {/* ── DETAILS ROW — 2 columns ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Publisher details */}
        <div className="rounded-2xl border border-[#e8e0d0] bg-[#f5f0e8] p-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">Details</p>
          <dl className="space-y-2 text-sm text-[#2c2c2a]">
            {book.pages && <div className="flex gap-2"><dt className="font-semibold min-w-[90px]">Pages</dt><dd>{book.pages}</dd></div>}
            {book.format && <div className="flex gap-2"><dt className="font-semibold min-w-[90px]">Format</dt><dd>{book.format}</dd></div>}
            {book.publishedDate && <div className="flex gap-2"><dt className="font-semibold min-w-[90px]">Published</dt><dd>{book.publishedDate}</dd></div>}
            {book.fileSize && <div className="flex gap-2"><dt className="font-semibold min-w-[90px]">File Size</dt><dd>{book.fileSize}</dd></div>}
            {book.editor && <div className="flex gap-2"><dt className="font-semibold min-w-[90px]">Editor</dt><dd>{book.editor}</dd></div>}
            {book.rating?.amazon && (
              <div className="flex gap-2">
                <dt className="font-semibold min-w-[90px]">Rating</dt>
                <dd>{book.rating.amazon} Amazon · {book.rating.goodreads} Goodreads ({book.rating.reviews} reviews)</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Genre tags */}
        <div className="rounded-2xl border border-[#e8e0d0] bg-[#f5f0e8] p-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">Genre</p>
          <div className="flex flex-wrap gap-[8px]">
            {book.genre.map((g) => (
              <span key={g} className="bg-[#1a1a2e] text-[#e8c468] text-[11px] font-semibold tracking-[0.06em] px-3 py-1.5 rounded-xl uppercase">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED BOOKS ── */}
      {relatedBooks.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">Related Books</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBooks.map((item) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/books/${item.slug}`}
                  className="block rounded-2xl border border-[#e8e0d0] bg-white p-5 transition hover:border-[#e8c468] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                >
                  <p className="font-bold text-[#1a1a2e] text-sm leading-snug">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#5f5e5a] line-clamp-2">{item.shortDescription}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default BookDetail
