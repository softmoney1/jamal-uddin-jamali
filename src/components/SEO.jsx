import { useEffect } from 'react'

const SITE_URL = 'https://jamaluddinjamali.com'

function setMeta(selector, attr, value) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    // determine if property or name attr
    if (selector.includes('property=')) {
      el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '')
    } else {
      el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '')
    }
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function SEO({ title, description, image, robots = 'index, follow' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Jamaluddin Jamali` : 'Jamaluddin Jamali'
    const absoluteImage = image
      ? image.startsWith('http') ? image : `${SITE_URL}${image}`
      : null
    const currentUrl = `${SITE_URL}${window.location.pathname}`

    // Page title
    document.title = fullTitle

    // Standard meta
    if (description) setMeta('meta[name="description"]', 'content', description)
    if (robots)      setMeta('meta[name="robots"]',      'content', robots)

    // Open Graph
    setMeta('meta[property="og:title"]',       'content', fullTitle)
    setMeta('meta[property="og:url"]',         'content', currentUrl)
    if (description) setMeta('meta[property="og:description"]', 'content', description)
    if (absoluteImage) {
      setMeta('meta[property="og:image"]',     'content', absoluteImage)
      setMeta('meta[property="og:image:width"]',  'content', '348')
      setMeta('meta[property="og:image:height"]', 'content', '522')
    }

    // Twitter / X
    setMeta('meta[name="twitter:title"]',       'content', fullTitle)
    if (description) setMeta('meta[name="twitter:description"]', 'content', description)
    if (absoluteImage) setMeta('meta[name="twitter:image"]',     'content', absoluteImage)

  }, [title, description, image, robots])

  return null
}

export default SEO
