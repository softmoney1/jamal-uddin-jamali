import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import data from '../data.json'

function Home() {
  const featured = data.books.find((item) => item.featured)
  const secondaryBooks = data.books.filter((item) => !item.featured)

  return (
    <section className="space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-warm-cream p-8 shadow-soft sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.35em] text-slate-500">
              <span className="font-semibold text-slate-900">OUT NOW!!!</span>
              <span className="inline-block h-px w-24 bg-slate-200 align-middle"></span>
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-[-0.04em] text-deep-crimson sm:text-6xl">
              The Sin of Killing
            </h1>
            <p className="text-base font-bold uppercase tracking-[0.32em] text-midnight-navy">
              {featured.tagline}
            </p>
            <div className="space-y-5 text-body-text">
              <p className="max-w-2xl text-base leading-8">{featured.shortDescription}</p>
              <p className="max-w-2xl text-sm leading-7">
                The Sin of Killing follows Salma from a fifth birthday in Lahore to a restless search for truth across generations. When nephew Ahsen arrives, family sins open into a dark, tender story of lost love, danger, and the possibility of redemption in a world shaped by memory and quiet violence.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={featured.buyLinks?.amazon || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-gold px-6 py-3 text-sm font-semibold text-midnight-navy transition hover:opacity-80"
              >
                Buy Today
              </a>
              <Link
                to={`/books/${featured.slug}`}
                className="inline-flex items-center justify-center rounded-2xl border border-midnight-navy bg-transparent px-6 py-3 text-sm font-semibold text-midnight-navy transition hover:bg-midnight-navy hover:text-white"
              >
                More Info
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-card-border bg-cream-alt p-4 shadow-soft lg:max-w-md">
              <div className="w-full overflow-hidden rounded-[1.5rem] aspect-[2/3]">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-2">
        {secondaryBooks.map((book, index) => (
          <article key={book.slug} className="flex flex-col rounded-[2rem] border border-card-border bg-cream-alt p-7 shadow-soft transition hover:border-gold h-full min-h-[26rem]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {index === 0 ? 'COMING SOON!' : 'OUT NOW'}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-midnight-navy">{book.title}</h2>
              </div>
              <span className="rounded-xl bg-genre-bg text-genre-text px-3 py-1 text-xs uppercase tracking-[0.32em]">
                {book.genre[0]}
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-[180px_1fr] lg:items-stretch h-full">
              <div className="mx-auto w-full max-w-[180px] overflow-hidden rounded-[1.5rem] aspect-[2/3] lg:max-w-none">
                <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
              </div>
              <div className="book-info space-y-4">
                <div className="space-y-4">
                  <p className="text-sm leading-7 text-slate-600">{book.shortDescription}</p>
                  <p className="text-sm leading-7 text-slate-600">{book.paragraphs[0]}</p>
                </div>
                <div className="book-card-buttons">
                  <a
                    href={book.buyLinks?.amazon || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="book-card-btn bg-midnight-navy text-gold hover:opacity-80 transition"
                  >
                    Amazon
                  </a>
                  <a
                    href={book.buyLinks?.goodreads || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="book-card-btn bg-goodreads text-[#b7e4c7] hover:opacity-80 transition"
                  >
                    Goodreads
                  </a>
                  <a
                    href={book.buyLinks?.kindle || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="book-card-btn bg-cream-alt text-midnight-navy border border-card-border hover:opacity-80 transition"
                  >
                    Kindle
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home
