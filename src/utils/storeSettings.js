export const SETTINGS_KEY = 'shopke-store-settings'

export const defaultSettings = {
  name: 'Ade Fabrics',
  tagline: 'Colour, cloth and craft from Ibadan',
  color: '#2F6B3F',
  logo: '',
  columns: 4,
}

export const loadSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // Storage can be blocked. The page still works without it.
  }
}