const FadeIn = (element: HTMLElement, delay: number) => {
  let startTime = 0
  const duration = 700
  const amountOfPixelsToBottom = 20

  const animate = (timeStamp: number): void => {
    if (!startTime) {
      startTime = timeStamp
    }
    const runtime = timeStamp - startTime
    if (runtime < delay) {
      requestAnimationFrame(animate)
      return
    }
    const relativeProgress = (runtime - delay) / duration
    const opacity = Math.min(relativeProgress, 1)
    const bottom = amountOfPixelsToBottom * Math.min(relativeProgress, 1)

    element.style.opacity = opacity.toString()
    element.style.marginBottom = bottom.toString() + 'px'

    if (runtime < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

export default FadeIn
