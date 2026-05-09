import { useMemo, useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faBars,
  faTimes,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faInstagram,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons'

function Navbar({ authorName, books, searchTerm, setSearchTerm }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const activeClass = ({ isActive }) =>
    isActive
      ? 'inline-flex items-center rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition'
      : 'inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'

  const onSearchChange = (value) => {
    setSearchTerm(value)
  }

  const bookItems = useMemo(
    () =>
      books.map((book) => (
        <li key={book.slug}>
          <Link
            to={`/books/${book.slug}`}
            className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            onClick={() => setMenuOpen(false)}
          >
            {book.title}
          </Link>
        </li>
      )),
    [books],
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="hidden items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-slate-100 sm:flex sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.32em] text-slate-300">
          <span className="text-slate-100">Get new book alerts, news & more!</span>
          <span className="inline-flex items-center gap-4 px-3 py-1 text-slate-300">
            <FontAwesomeIcon icon={faTwitter} className="h-4 w-4" />
            <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
            <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
          </span>
        </div>
        <button
          type="button"
          className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-brand-500"
        >
          Join My Newsletter
        </button>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold tracking-tight text-slate-950">
          {authorName}
        </Link>

        <div className="hidden items-center gap-4 md:flex md:grow md:justify-center">
          <NavLink to="/" className={activeClass} end>
            Home
          </NavLink>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Books
              <span onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }} className="cursor-pointer">
                <FontAwesomeIcon icon={faChevronDown} className="h-3.5 w-3.5" />
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-3 min-w-[20rem] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-200 px-5 py-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">All Books</span>
                </div>
                <ul className="space-y-1 p-3">
                  {bookItems}
                </ul>
              </div>
            )}
          </div>
          <NavLink to="/about" className={activeClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={activeClass}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search books"
            onClick={() => {
              const willOpen = !searchOpen
              setSearchOpen(willOpen)
              if (!willOpen) {
                setSearchTerm('')
              }
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
          >
            <FontAwesomeIcon icon={searchOpen ? faTimes : faSearch} />
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-slate-200 bg-slate-50/95 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <label className="sr-only" htmlFor="book-search">
              Search books by title
            </label>
            <input
              id="book-search"
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && location.pathname !== '/books') {
                  navigate('/books')
                }
              }}
              placeholder="Search titles like The Sin of Killing"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8 md:hidden">
          <div className="space-y-3">
            <NavLink to="/" className={activeClass} onClick={() => setMenuOpen(false)} end>
              Home
            </NavLink>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              Books
              <FontAwesomeIcon icon={faChevronDown} className="h-3.5 w-3.5" />
            </button>
            {dropdownOpen && <ul className="space-y-1 pl-4">{bookItems}</ul>}
            <NavLink to="/about" className={activeClass} onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" className={activeClass} onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
