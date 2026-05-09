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
              {featured.title}
            </h1>
            <p className="text-base font-bold uppercase tracking-[0.32em] text-midnight-navy">
              {featured.tagline}
            </p>
            <div className="space-y-5 text-body-text">
              <p className="max-w-2xl text-base leading-8 line-clamp-5">
                {featured.hook && <span className="font-semibold">{featured.hook} </span>}
                {featured.shortDescription}
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
          <article key={book.slug} className="flex flex-col mx-auto w-full max-w-[640px] bg-[#ffffff] border border-[#e8e0d0] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-[20px] transition hover:border-gold h-full min-h-[26rem]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {index === 0 ? 'COMING SOON!' : 'OUT NOW'}
                </p>
                <h2 className="mt-[8px] text-[20px] font-bold text-[#1a1a2e] leading-[1.3]">{book.title}</h2>
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {book.genre.map((g) => (
                  <span key={g} className="bg-[#f5f0e8] text-[#6b4c3b] text-[10px] font-semibold tracking-[0.06em] px-[10px] py-[4px] rounded-[20px] uppercase">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[24px] lg:flex-row lg:items-center h-full">
              <div className="flex-shrink-0 overflow-hidden rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.18)] aspect-[2/3] w-[180px] self-center my-auto mx-auto lg:mx-0">
                <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
              </div>
              <div className="book-info">
                <div className="mt-[8px] text-[13px] text-[#5f5e5a] leading-[1.6] line-clamp-3">
                  {book.shortDescription}
                </div>
                <div className="h-px w-full bg-[#f0ece4] my-[14px]"></div>
                <div className="book-card-buttons">
                  <a
                    href={book.buyLinks?.amazon || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="book-card-btn bg-[#1a1a2e] text-[#e8c468]"
                  >
                    Amazon
                  </a>
                  <a
                    href={book.buyLinks?.goodreads || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="book-card-btn bg-[#2d6a4f] text-[#b7e4c7]"
                  >
                    Goodreads
                  </a>
                  <a
                    href={book.buyLinks?.kindle || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="book-card-btn bg-[#f5f0e8] text-[#1a1a2e] border border-[#d4c9b0]"
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
