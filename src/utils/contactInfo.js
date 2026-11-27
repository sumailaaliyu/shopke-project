const KEY = 'shopke-contact-info'

export const loadContactInfo = () => {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// WhatsApp links need digits only, in international format.
// 08012345678 and +2348012345678 both become 2348012345678.
export const toWhatsAppNumber = (number = '') => {
  const digits = number.replace(/\D/g, '')
  return digits.startsWith('0') ? '234' + digits.slice(1) : digits
}