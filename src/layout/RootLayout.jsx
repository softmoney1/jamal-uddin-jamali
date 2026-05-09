import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { data } from '../data.js'

function RootLayout() {
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) {
      return data.books
    }
    return data.books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-warm-cream text-body-text">
      <Navbar
        authorName={data.author.name}
        books={data.books}
        upcoming={data.upcoming}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8"
        >
          <Outlet context={{ searchTerm, filteredBooks, data }} />
        </motion.main>
      </AnimatePresence>
      <Footer social={data.social} books={data.books} />
    </div>
  )
}

export default RootLayout
