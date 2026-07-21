import { Languages, Palette } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'mind-blog-color-vision-mode'
const COLOR_CLASS_PREFIX = 'accessibility-color-'
const VLIBRAS_SCRIPT_SRC = 'https://vlibras.gov.br/app/vlibras-plugin.js'

const colorVisionModes = [
  { value: 'default', label: 'Padrao' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
  { value: 'monochrome', label: 'Monocromatico' },
] as const

type ColorVisionMode = (typeof colorVisionModes)[number]['value']

interface VlibrasWindow extends Window {
  VLibras?: {
    Widget: new (url: string) => unknown
  }
}

const isColorVisionMode = (value: string | null): value is ColorVisionMode =>
  colorVisionModes.some((mode) => mode.value === value)

const getInitialColorVisionMode = (): ColorVisionMode => {
  if (typeof window === 'undefined') {
    return 'default'
  }

  const storedMode = window.localStorage.getItem(STORAGE_KEY)

  return isColorVisionMode(storedMode) ? storedMode : 'default'
}

const applyColorVisionMode = (mode: ColorVisionMode) => {
  document.documentElement.classList.remove(
    ...colorVisionModes
      .filter(({ value }) => value !== 'default')
      .map(({ value }) => `${COLOR_CLASS_PREFIX}${value}`),
  )

  if (mode !== 'default') {
    document.documentElement.classList.add(`${COLOR_CLASS_PREFIX}${mode}`)
  }
}

const ensureVlibrasContainer = () => {
  if (document.querySelector('[vw]')) {
    return
  }

  const container = document.createElement('div')
  container.setAttribute('vw', '')
  container.className = 'enabled'

  const accessButton = document.createElement('div')
  accessButton.setAttribute('vw-access-button', '')
  accessButton.className = 'active'

  const pluginWrapper = document.createElement('div')
  pluginWrapper.setAttribute('vw-plugin-wrapper', '')

  const pluginTopWrapper = document.createElement('div')
  pluginTopWrapper.className = 'vw-plugin-top-wrapper'

  pluginWrapper.appendChild(pluginTopWrapper)
  container.append(accessButton, pluginWrapper)
  document.body.appendChild(container)
}

const initializeVlibras = () => {
  const vlibrasWindow = window as VlibrasWindow

  if (vlibrasWindow.VLibras?.Widget) {
    new vlibrasWindow.VLibras.Widget('https://vlibras.gov.br/app')
  }
}

const loadVlibras = () => {
  ensureVlibrasContainer()

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${VLIBRAS_SCRIPT_SRC}"]`,
  )

  if (existingScript) {
    initializeVlibras()
    return
  }

  const script = document.createElement('script')
  script.src = VLIBRAS_SCRIPT_SRC
  script.async = true
  script.onload = initializeVlibras

  document.body.appendChild(script)
}

export const AccessibilityToolbar = () => {
  const [colorVisionMode, setColorVisionMode] = useState<ColorVisionMode>(
    getInitialColorVisionMode,
  )

  const selectedModeLabel = useMemo(
    () =>
      colorVisionModes.find((mode) => mode.value === colorVisionMode)?.label ??
      'Padrao',
    [colorVisionMode],
  )

  useEffect(() => {
    applyColorVisionMode(colorVisionMode)

    if (colorVisionMode === 'default') {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }

    window.localStorage.setItem(STORAGE_KEY, colorVisionMode)
  }, [colorVisionMode])

  return (
    <aside
      aria-label="Barra de acessibilidade"
      className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-border bg-background/95 px-2 py-3 text-foreground shadow-lg backdrop-blur"
    >
      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
        <Palette className="h-4 w-4" aria-hidden="true" />
      </div>

      <label className="sr-only" htmlFor="color-vision-mode">
        Modo de visualizacao para daltonismo
      </label>
      <select
        id="color-vision-mode"
        aria-label="Modo de visualizacao para daltonismo"
        className="h-9 w-32 rounded-md border border-border bg-background px-2 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onChange={(event) =>
          setColorVisionMode(event.target.value as ColorVisionMode)
        }
        title={`Daltonismo: ${selectedModeLabel}`}
        value={colorVisionMode}
      >
        {colorVisionModes.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>

      <button
        aria-label="Ativar VLibras"
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={loadVlibras}
        title="Ativar VLibras"
        type="button"
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  )
}

export default AccessibilityToolbar
