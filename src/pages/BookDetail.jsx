import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faAmazon, faGoodreads } from '@fortawesome/free-brands-svg-icons'
import data from '../data.json'

const storeIcons = {
  Amazon: faAmazon,
  Goodreads: faGoodreads,
}

function BookDetail() {
  const { slug } = useParams()
  const book = useMemo(
    () => data.books.find((item) => item.slug === slug),
    [slug],
  )
  const relatedBooks = useMemo(
    () => data.books.filter((item) => item.slug !== slug),
    [slug],
  )
  const [message, setMessage] = useState('')

  if (!book) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
        <p className="text-base text-slate-600">Book not found.</p>
        <Link to="/books" className="mt-4 inline-flex rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-500">
          Back to Books
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to books
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-midnight-navy">
            {book.title}
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-700">{book.tagline}</p>
        </div>
        <div className="rounded-3xl border border-card-border bg-cream-alt p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Details</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Pages:</span> {book.pages}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Format:</span> {book.format}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Published:</span> {book.publishedDate}
            </p>
            <p>
              <span className="font-semibold text-slate-900">File size:</span> {book.fileSize}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Editor:</span> {book.editor}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-2xl font-semibold text-midnight-navy">About the Book</h2>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-600">{book.tagline}</p>
          </div>
          {book.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap gap-3">
            {book.buyLinks.map((link) => (
              <a
                key={link.store}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition hover:opacity-80 ${link.store === 'Amazon' ? 'bg-amazon text-gold' : 'bg-goodreads text-white'}`}
              >
                <FontAwesomeIcon icon={storeIcons[link.store]} className="h-4 w-4 text-current" />
                Buy on {link.store}
              </a>
            ))}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Editorial review</p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              “{book.editorialReview.text}”
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">— {book.editorialReview.reviewer}</p>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap gap-2">
              {book.genre.map((genre) => (
                <span key={genre} className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Rating: {book.rating.amazon} Amazon · {book.rating.goodreads} Goodreads ({book.rating.reviews} ratings)
            </p>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft aspect-[2/3] lg:max-w-none">
            <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-midnight-navy">Related books</h3>
            <div className="space-y-4">
              {relatedBooks.map((item) => (
                <Link
                  key={item.slug}
                  to={`/books/${item.slug}`}
                  className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-white"
                >
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  )
}

export default BookDetail
