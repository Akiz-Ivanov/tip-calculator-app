const clampValue = (value: number | string, min: number, max: number) => {
  if (typeof value === "string") value = parseFloat(value)
  return Math.min(Math.max(value, min), max)
}

export default clampValue