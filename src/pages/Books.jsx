import { useOutletContext, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmazon, faGoodreads } from '@fortawesome/free-brands-svg-icons'

const iconMap = {
  Amazon: faAmazon,
  Goodreads: faGoodreads,
}

function Books() {
  const { filteredBooks, searchTerm } = useOutletContext()

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-card-border bg-warm-cream p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-midnight-navy">Books</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Explore the collection of stories by Jamaluddin Jamali. Use the search field above to filter by title or browse every book here.
        </p>
        {searchTerm && (
          <p className="mt-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            Search results for <strong>{searchTerm}</strong>
          </p>
        )}
      </div>
      <motion.div
        className="grid gap-6 lg:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {filteredBooks.map((book) => (
          <motion.article
            key={book.slug}
            className="overflow-hidden rounded-[2rem] border border-card-border bg-cream-alt p-6 shadow-soft transition hover:border-gold h-full min-h-[26rem]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start h-full">
              <div className="flex-shrink-0 overflow-hidden rounded-3xl aspect-[2/3] w-[180px] lg:w-[200px]">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="book-info space-y-4">
                <div>
                  <p className="inline-block rounded-xl bg-genre-bg px-3 py-1 text-xs uppercase tracking-[0.3em] text-genre-text">{book.genre.join(' · ')}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-midnight-navy">
                    {book.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-sm leading-7 text-slate-600">{book.shortDescription}</p>
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
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Books
