import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import data from '../data.json'

function Home() {
  const featured = data.books.find((item) => item.featured)
  const secondaryBooks = data.books.filter((item) => !item.featured)

  return (
    <section className="space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
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
            <h1 className="text-5xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-6xl">
              The Sin of Killing
            </h1>
            <p className="text-base font-semibold uppercase tracking-[0.32em] text-red-600">
              {featured.tagline}
            </p>
            <div className="space-y-5 text-slate-600">
              <p className="max-w-2xl text-base leading-8">{featured.shortDescription}</p>
              <p className="max-w-2xl text-sm leading-7">
                The Sin of Killing follows Salma from a fifth birthday in Lahore to a restless search for truth across generations. When nephew Ahsen arrives, family sins open into a dark, tender story of lost love, danger, and the possibility of redemption in a world shaped by memory and quiet violence.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={featured.buyLinks[0].url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white! transition hover:bg-slate-800"
              >
                Buy Today
              </a>
              <Link
                to={`/books/${featured.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400"
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
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-soft">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="h-[520px] w-full object-cover sm:h-[560px]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-2">
        {secondaryBooks.map((book, index) => (
          <article key={book.slug} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {index === 0 ? 'COMING SOON!' : 'OUT NOW'}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">{book.title}</h2>
              </div>
              <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.32em] text-slate-600">
                {book.genre[0]}
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-[180px_1fr] lg:items-start">
              <img src={book.coverImage} alt={book.title} className="h-64 w-full rounded-[1.5rem] object-cover" />
              <div className="space-y-4">
                <p className="text-sm leading-7 text-slate-600">{book.shortDescription}</p>
                <p className="text-sm leading-7 text-slate-600">{book.paragraphs[0]}</p>
                <div className="flex flex-wrap gap-3">
                  {book.buyLinks.map((link) => (
                    <a
                      key={link.store}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 transition hover:bg-slate-200"
                    >
                      {link.store}
                    </a>
                  ))}
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
