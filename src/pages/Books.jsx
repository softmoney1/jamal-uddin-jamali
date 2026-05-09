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
            className="overflow-hidden rounded-[2rem] border border-card-border bg-cream-alt p-6 shadow-soft transition hover:border-gold"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="grid gap-6 lg:grid-cols-[120px_1fr] lg:items-start">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-[180px] w-full rounded-3xl object-cover lg:h-[220px]"
              />
              <div className="space-y-4">
                <div>
                  <p className="inline-block rounded-full bg-genre-bg px-3 py-1 text-xs uppercase tracking-[0.3em] text-genre-text">{book.genre.join(' · ')}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-midnight-navy">
                    {book.title}
                  </h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">{book.shortDescription}</p>
                <div className="flex flex-wrap gap-3">
                  {book.buyLinks.map((link) => (
                    <a
                      key={link.store}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 ${link.store === 'Amazon' ? 'bg-amazon' : 'bg-goodreads'}`}
                    >
                      <FontAwesomeIcon icon={iconMap[link.store]} className="h-4 w-4 text-current" />
                      {link.store}
                    </a>
                  ))}
                  <Link
                    to={`/books/${book.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-midnight-navy bg-transparent text-midnight-navy px-4 py-2 text-sm font-semibold transition hover:bg-midnight-navy hover:text-white"
                  >
                    Details
                  </Link>
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
