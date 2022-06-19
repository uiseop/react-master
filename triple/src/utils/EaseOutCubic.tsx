const EaseOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3)
}

export default EaseOutCubic
