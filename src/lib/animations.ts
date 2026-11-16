import { gsap } from 'gsap'

const EASE = 'power2.out'

/** Header + nav entrance. Targets elements marked with `data-reveal`. */
export function playIntroAnimation(scope: Element) {
  return gsap.context(() => {
    gsap.from('[data-reveal="title"]', { x: -100, opacity: 0, duration: 1, ease: EASE })
    gsap.from('[data-reveal="theme"]', { x: 100, opacity: 0, duration: 1, ease: EASE })
    if (scope.querySelector('[data-reveal="nav"]')) {
      gsap.from('[data-reveal="nav"]', { y: -100, opacity: 0, duration: 1, ease: EASE })
    }
  }, scope)
}

export function playGridAnimation(grid: Element) {
  return gsap.context(() => {
    gsap.from(grid, { x: -50, opacity: 0, duration: 0.6, ease: EASE })
  }, grid)
}

export function playDetailAnimation(scope: Element) {
  return gsap.context(() => {
    gsap.from('[data-reveal="flag"]', { x: -50, opacity: 0, duration: 0.6, ease: EASE })
    gsap.from('[data-reveal="details"]', { x: 50, opacity: 0, duration: 0.6, ease: EASE })
  }, scope)
}
