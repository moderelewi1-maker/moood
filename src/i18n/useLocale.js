import { useContext } from 'react'
import { LocaleContext } from './LocaleContext.js'

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
