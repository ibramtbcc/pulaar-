import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useScrollReveal(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-60px 0px',
  })
  return { ref, isInView }
}
