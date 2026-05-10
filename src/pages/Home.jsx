import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { data } from '../data.js'
import SEO from '../components/SEO'

function Home() {
  const featured = data.books.find((item) => item.featured)
  const upcoming = data.upcoming

  return (
    <div className="space-y-0">
      <SEO 
        title="Home" 
        description="Official website of Jamaluddin Jamali, Pakistani literary fiction and suspense author. Explore his books including The Sin of Killing and The Baby Who Brought the Storm." 
      />
      {/* ── HERO SECTION ── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 bg-[#fdfaf5]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[30%_70%] lg:items-center">
            {/* LEFT 30% */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                <span className="font-semibold text-slate-900">Out Now</span>
                <span className="inline-block h-px w-16 bg-slate-300 align-middle"></span>
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-[-0.03em] text-[#c0392b] sm:text-5xl">
                {featured.title}
              </h1>

              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#1a1a2e]">
                {featured.tagline}
              </p>

              <div className="text-[#2c2c2a] space-y-3">
                {featured.hook && (
                  <p className="text-sm leading-7 font-medium">{featured.hook}</p>
                )}
                <p className="text-sm leading-7">{featured.shortDescription}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={featured.buyLinks?.amazon || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#e8c468] px-5 py-2.5 text-sm font-semibold text-[#1a1a2e] transition hover:opacity-80"
                >
                  Buy Today
                </a>
                <Link
                  to={`/books/${featured.slug}`}
                  className="inline-flex items-center justify-center rounded-xl border border-[#1a1a2e] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#1a1a2e] transition hover:bg-[#1a1a2e] hover:text-white"
                >
                  More Info
                </Link>
              </div>
            </motion.div>

            {/* RIGHT 70% */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-xs overflow-hidden rounded-[2rem] border border-[#e8e0d0] bg-[#f5f0e8] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:max-w-sm lg:max-w-md">
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
      </section>

      {/* ── UPCOMING BOOK SECTION ── */}
      {upcoming && (
        <section className="relative overflow-hidden bg-[#0a0a14] px-4 py-16 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: `url('/images/darkside.jpeg')` }}>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[rgba(10,10,20,0.72)] z-0" />
          <div className="relative z-10 mx-auto max-w-2xl text-center space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#e8c468]">
              {upcoming.label}
            </p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              {upcoming.title}
            </h2>
            <div className="mx-auto h-px w-[60px] bg-[#e8c468]" />
            <p className="text-base leading-7 text-slate-300 italic">
              A new novel by {upcoming.author}
            </p>
            <a
              href="#newsletter-email"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('newsletter-email')?.focus()
                document.getElementById('newsletter-email')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center rounded-xl border border-[#e8c468] bg-transparent px-6 py-3 text-sm font-semibold text-[#e8c468] transition hover:bg-[#e8c468] hover:text-[#1a1a2e]"
            >
              Notify Me
            </a>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
