import { motion } from 'framer-motion'
import data from '../data.json'

const author = data.author

// Split the large bio into logical paragraphs
const bioParagraphs = [
  "Jamaluddin Jamali writes crossover book club fiction, suspense, and literary thrillers. His stories take you inside the darkest chambers of the human heart and mind — deep into the house of desires and fears, the parts of human nature which are universal: love and fear, bliss and sorrow, happiness and grief, hope and depression, light and darkness.",
  "His stories may take you into dark rabbit holes miles away from hope, but they always bring you back to a new beginning. Hope is always there, even when it doesn't seem to be — like a new morning waiting behind some invisible corner, ready to fill your heart again. Keep smiling. For that is life.",
  "He lives in Lahore with his wife and four children. He works as a reporter for City News Network, City42, and 24 News. Previously he wrote for The Nation, The Post, and Pakistan Today. He holds a master's degree in English Literature. He is currently working on a new psychological fiction novel with a female protagonist.",
]

const reviews = [
  {
    text: "The setting is Pakistan and the book is rich in that country's culture... a great read with a twist in the tail.",
    reviewer: "E.D. Bird",
    role: "Editor",
  },
  {
    text: "Jamaluddin Jamali writes with the precision of a journalist and the soul of a poet. His fiction is emotionally fearless.",
    reviewer: "Raymond Walker",
    role: "Mentor & Literary Advisor",
  },
]

function About() {
  return (
    <div className="space-y-0">
      {/* ── AUTHOR HERO ── */}
      <section className="bg-[#1a1a2e] px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#e8c468]">
            About the Author
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Jamaluddin Jamali
          </h1>
          <p className="text-lg leading-8 text-slate-300 italic">
            A Writer. A Journalist. A Storyteller.
          </p>
        </motion.div>
      </section>

      {/* ── AUTHOR BIO ── */}
      <section className="bg-[#fdfaf5] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">Biography</p>
          {bioParagraphs.map((para, i) => (
            <p key={i} className="text-base leading-8 text-[#2c2c2a]">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL REVIEWS ── */}
      <section className="bg-[#f5f0e8] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#6b4c3b]">What They Say</p>
            <h2 className="text-2xl font-bold text-[#1a1a2e]">Editorial Reviews</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-[#e8e0d0] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-4"
              >
                <p className="text-base leading-7 text-[#2c2c2a] italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-[#e8e0d0] pt-4">
                  <p className="text-sm font-bold text-[#1a1a2e]">— {review.reviewer}</p>
                  <p className="text-xs text-[#6b4c3b] uppercase tracking-[0.1em] mt-1">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
