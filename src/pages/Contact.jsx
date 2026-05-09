import { useState } from 'react'
import data from '../data.json'

function Contact() {
  const contact = data.contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Please complete all fields before sending your message.')
      return
    }
    setStatus('Thank you — your message has been received. I will respond soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
      <section id="contact" className="space-y-6 rounded-[2rem] border border-card-border bg-cream-alt p-10 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-600">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold text-midnight-navy">Get in touch</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Send a note about speaking, book events, or media inquiries. No backend is required — this form shows the expected contact flow.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <button
            type="submit"
            className="inline-flex rounded-2xl bg-gold px-6 py-3 text-sm font-semibold text-midnight-navy transition hover:opacity-80"
          >
            Send Message
          </button>
          {status && <p className="text-sm text-slate-600">{status}</p>}
        </form>
      </section>

      <aside className="rounded-[2rem] border border-card-border bg-warm-cream p-10 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-600">Details</p>
          <p className="text-lg font-semibold text-midnight-navy">Contact information</p>
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Location:</strong> {contact.address}
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Contact
