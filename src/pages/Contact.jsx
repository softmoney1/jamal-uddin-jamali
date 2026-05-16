import { useState } from 'react'
import { motion } from 'framer-motion'
import { data } from '../data.js'
import SEO from '../components/SEO'

const contact = data.contact
const socialLinks = data.social

const fields = [
  { id: 'name',    label: 'Your Name',    type: 'text',     placeholder: 'e.g. Sarah Ahmed' },
  { id: 'email',   label: 'Your Email',   type: 'email',    placeholder: 'e.g. sarah@email.com' },
  { id: 'subject', label: 'Subject',      type: 'text',     placeholder: 'Optional — defaults to "Message from website"' },
  { id: 'message', label: 'Your Message', type: 'textarea', placeholder: 'Write your message here…' },
]

function validate(form) {
  const errors = {}
  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.message || form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }
  return errors
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const mailto =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(form.subject || 'Message from website')}` +
      `&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailto, '_self')
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <SEO 
        title="Contact" 
        description="Get in touch with Jamaluddin Jamali for inquiries, feedback, or to say hello." 
      />
      {/* ── PAGE HEADING ── */}
      <div className="px-4 py-12 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#6b4c3b]">Contact</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1a1a2e]">{contact.heading}</h1>
          <p className="mt-3 text-base text-[#5f5e5a]">{contact.subheading}</p>
        </motion.div>
      </div>

      {/* ── TWO COLUMN LAYOUT ── */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* ── LEFT COL — contact info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="w-full lg:w-[40%] flex-shrink-0"
          >
            <div
              className="rounded-2xl p-10 lg:p-[40px_32px] space-y-6 h-full"
              style={{ background: '#1a1a2e', borderRadius: '16px', padding: '40px 32px' }}
            >
              {/* Heading */}
              <div>
                <h2 style={{ color: '#e8c468', fontSize: '16px', fontWeight: 600 }}>
                  Contact Information
                </h2>
                <div style={{ width: 40, height: 2, background: '#e8c468', margin: '12px 0 24px' }} />
              </div>

              {/* Email row */}
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition-colors duration-200 group"
                style={{ textDecoration: 'none' }}
              >
                <i
                  className="fa-solid fa-envelope"
                  style={{ fontSize: 18, color: '#f5f0e8', transition: 'color 0.2s' }}
                />
                <span
                  className="text-sm group-hover:text-[#e8c468] transition-colors duration-200"
                  style={{ color: '#f5f0e8' }}
                >
                  {contact.email}
                </span>
              </a>

              {/* Location */}
              {contact.address && (
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot" style={{ fontSize: 18, color: '#f5f0e8' }} />
                  <span className="text-sm" style={{ color: '#f5f0e8' }}>{contact.address}</span>
                </div>
              )}

              {/* Response note */}
              <p style={{ color: '#a8a8b8', fontSize: 13, fontStyle: 'italic', marginTop: 32, lineHeight: 1.7 }}>
                {contact.responseNote}
              </p>

              {/* Social note */}
              <p style={{ color: '#a8a8b8', fontSize: 13, marginTop: 8 }}>
                {contact.social}
              </p>

              {/* Social icons */}
              <div className="flex flex-wrap gap-4 pt-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noreferrer"
                    aria-label={item.platform}
                    title={item.platform}
                    className="transition-colors duration-200 hover:text-[#e8c468]"
                    style={{ fontSize: 20, color: '#f5f0e8' }}
                  >
                    <i className={item.icon} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COL — contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="w-full lg:flex-1"
          >
            <div className="rounded-2xl border border-[#e8e0d0] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-0">
                  {fields.map(({ id, label, type, placeholder }, index) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                      className="mb-4"
                    >
                      <label
                        htmlFor={id}
                        className="mb-1.5 block text-sm font-semibold text-[#1a1a2e]"
                      >
                        {label}
                        {id !== 'subject' && (
                          <span className="ml-1 text-[#c0392b]">*</span>
                        )}
                      </label>

                      {type === 'textarea' ? (
                        <textarea
                          id={id}
                          name={id}
                          value={form[id]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          rows={5}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: `1px solid ${errors[id] ? '#c0392b' : '#e8e0d0'}`,
                            borderRadius: 8,
                            fontSize: 14,
                            color: '#1a1a2e',
                            background: '#fdfaf5',
                            outline: 'none',
                            resize: 'vertical',
                            minHeight: 140,
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#e8c468'
                            e.target.style.boxShadow = '0 0 0 3px rgba(232,196,104,0.15)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = errors[id] ? '#c0392b' : '#e8e0d0'
                            e.target.style.boxShadow = 'none'
                          }}
                        />
                      ) : (
                        <input
                          id={id}
                          name={id}
                          type={type}
                          value={form[id]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: `1px solid ${errors[id] ? '#c0392b' : '#e8e0d0'}`,
                            borderRadius: 8,
                            fontSize: 14,
                            color: '#1a1a2e',
                            background: '#fdfaf5',
                            outline: 'none',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#e8c468'
                            e.target.style.boxShadow = '0 0 0 3px rgba(232,196,104,0.15)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = errors[id] ? '#c0392b' : '#e8e0d0'
                            e.target.style.boxShadow = 'none'
                          }}
                        />
                      )}

                      {/* Inline validation error */}
                      {errors[id] && (
                        <p className="mt-1 text-xs font-medium" style={{ color: '#c0392b' }}>
                          {errors[id]}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#1a1a2e',
                    color: '#e8c468',
                    fontSize: 15,
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    transition: 'background 0.2s',
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2a4e')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#1a1a2e')}
                >
                  Send Message →
                </motion.button>

                {sent && (
                  <p className="mt-4 text-center text-sm font-medium text-[#2d6a4f]">
                    ✓ Your mail client should open. Thank you for reaching out!
                  </p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
