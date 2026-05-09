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

function Navbar({ authorName, books, upcoming, searchTerm, setSearchTerm }) {
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
      ? 'inline-flex items-center px-4 py-2 text-sm font-semibold text-gold underline decoration-gold decoration-2 underline-offset-8 transition'
      : 'inline-flex items-center px-4 py-2 text-sm font-semibold text-cream-alt transition hover:text-gold'

  const onSearchChange = (value) => {
    setSearchTerm(value)
  }

  const bookItems = useMemo(
    () =>
      books.map((book) => (
        <li key={book.slug}>
          <Link
            to={`/books/${book.slug}`}
            className="block rounded-lg px-3 py-2 text-sm text-cream-alt transition hover:bg-midnight-navy hover:text-gold"
            onClick={() => setMenuOpen(false)}
          >
            {book.title}
          </Link>
        </li>
      )),
    [books],
  )

  return (
    <header className="relative sticky top-0 z-40 border-b border-midnight-navy bg-midnight-navy backdrop-blur-xl">
      <div className="hidden items-center justify-between bg-steel-blue px-4 py-3 text-cream-alt sm:flex sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.32em] text-cream-alt/80">
          <span className="text-cream-alt">Get new book alerts, news & more!</span>
          <span className="inline-flex items-center gap-4 px-3 py-1">
            <a href='https://x.com/jm_jamali' target="_blank" rel="noreferrer" className="text-cream-alt hover:text-gold transition flex items-center" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="h-4 w-4" />
            </a>
            <a href='https://www.instagram.com/ourbookreaders/' target="_blank" rel="noreferrer" className="text-cream-alt hover:text-gold transition flex items-center" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
            </a>
            <a href='https://www.facebook.com/ThebookReadersReview/' target="_blank" rel="noreferrer" className="text-cream-alt hover:text-gold transition flex items-center" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
            </a>
          </span>
        </div>
        <button
          type="button"
          className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-midnight-navy transition hover:opacity-80"
        >
          Join My Newsletter
        </button>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold tracking-tight text-cream-alt hover:text-gold transition">
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
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-cream-alt transition hover:text-gold"
            >
              Books
              <span onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }} className="cursor-pointer">
                <FontAwesomeIcon icon={faChevronDown} className="h-3.5 w-3.5" />
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-3 min-w-[20rem] overflow-hidden rounded-[1.5rem] border border-midnight-navy bg-steel-blue shadow-xl">
                <div className="border-b border-midnight-navy px-5 py-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-where-to-buy">All Books</span>
                </div>
                <ul className="space-y-1 p-3">
                  {bookItems}
                  {upcoming && (
                    <li className="mt-2 rounded-lg bg-midnight-navy/80 px-3 py-2 text-sm text-cream-alt opacity-70 pointer-events-none">
                      <div className="flex items-center justify-between gap-3">
                        <span>{upcoming.title}</span>
                        <span className="rounded-full bg-[#fdf3d0] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a43a]">
                          Soon
                        </span>
                      </div>
                    </li>
                  )}
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream-alt transition hover:text-gold"
          >
            <FontAwesomeIcon icon={searchOpen ? faTimes : faSearch} />
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream-alt transition hover:text-gold md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-midnight-navy bg-steel-blue px-4 py-4 sm:px-6 lg:px-8">
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
              className="w-full rounded-2xl border border-midnight-navy bg-midnight-navy px-4 py-3 text-sm text-cream-alt placeholder-cream-alt/50 shadow-sm outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
            />
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-[999] w-full border-t border-[rgba(232,196,104,0.2)] bg-[#1a1a2e] py-4 md:hidden">
          {/* Home */}
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block w-full py-[14px] px-6 text-center text-[15px] tracking-[0.03em] transition ${isActive ? 'font-semibold text-[#e8c468]' : 'text-[#f5f0e8] hover:bg-[rgba(232,196,104,0.06)] hover:text-[#e8c468]'
              }`
            }
          >
            Home
          </NavLink>

          {/* Books toggle */}
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex w-full items-center justify-center gap-2 py-[14px] px-6 text-center text-[15px] tracking-[0.03em] text-[#f5f0e8] transition hover:bg-[rgba(232,196,104,0.06)] hover:text-[#e8c468]"
          >
            Books
            <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Books sub-items */}
          {dropdownOpen && (
            <div className="border-y border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)]">
              {books.map((book) => (
                <NavLink
                  key={book.slug}
                  to={`/books/${book.slug}`}
                  onClick={() => { setMenuOpen(false); setDropdownOpen(false) }}
                  className="block w-full py-[10px] px-6 text-center text-[13px] text-[#a8a8b8] transition hover:text-[#e8c468]"
                >
                  {book.title}
                </NavLink>
              ))}
              {upcoming && (
                <div className="w-full py-[10px] px-6 text-center text-[13px] text-[#a8a8b8] opacity-50 pointer-events-none">
                  {upcoming.title} <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-[#e8c468]">(Soon)</span>
                </div>
              )}
            </div>
          )}

          {/* About */}
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block w-full py-[14px] px-6 text-center text-[15px] tracking-[0.03em] transition ${isActive ? 'font-semibold text-[#e8c468]' : 'text-[#f5f0e8] hover:bg-[rgba(232,196,104,0.06)] hover:text-[#e8c468]'
              }`
            }
          >
            About
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block w-full py-[14px] px-6 text-center text-[15px] tracking-[0.03em] transition ${isActive ? 'font-semibold text-[#e8c468]' : 'text-[#f5f0e8] hover:bg-[rgba(232,196,104,0.06)] hover:text-[#e8c468]'
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default Navbar
