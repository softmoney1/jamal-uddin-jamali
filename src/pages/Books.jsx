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
      <div className="rounded-3xl border border-[#e8e0d0] bg-[#fdfaf5] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <h1 className="text-3xl font-bold text-[#1a1a2e]">Books by Jamaluddin Jamali</h1>
        <p className="mt-2 text-sm leading-7 text-[#5f5e5a]">Fiction that goes where others don't dare.</p>
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
          <Link
            key={book.slug}
            to={`/books/${book.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <motion.article
              className="flex flex-col mx-auto w-full max-w-[640px] bg-[#ffffff] border border-[#e8e0d0] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-[20px] transition-all duration-200 ease-[ease] hover:border-gold hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] cursor-pointer h-full min-h-[26rem]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex flex-col gap-[24px] lg:flex-row lg:items-center h-full">
                <div className="flex-shrink-0 overflow-hidden rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.18)] aspect-[2/3] w-[180px] self-center my-auto">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="book-info">
                  <div>
                    <div className="flex flex-wrap gap-[6px]">
                    {book.genre.map((g) => (
                      <span key={g} className="bg-[#f5f0e8] text-[#6b4c3b] text-[10px] font-semibold tracking-[0.06em] px-[10px] py-[4px] rounded-[20px] uppercase">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-[8px] text-[20px] font-bold text-[#1a1a2e] leading-[1.3]">
                    {book.title}
                  </h2>
                </div>
                <div className="mt-[8px] text-[13px] text-[#5f5e5a] leading-[1.6] line-clamp-3">
                  {book.shortDescription}
                </div>
                <div className="h-px w-full bg-[#f0ece4] my-[14px]"></div>
                <div className="book-card-buttons">
                  <a
                    href={book.buyLinks?.amazon || '#'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="book-card-btn bg-[#1a1a2e] text-[#e8c468]"
                  >
                    Amazon
                  </a>
                  <a
                    href={book.buyLinks?.goodreads || '#'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="book-card-btn bg-[#2d6a4f] text-[#b7e4c7]"
                  >
                    Goodreads
                  </a>
                  <a
                    href={book.buyLinks?.kindle || '#'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="book-card-btn bg-[#f5f0e8] text-[#1a1a2e] border border-[#d4c9b0]"
                  >
                    Kindle
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}

export default Books
