const keydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === '-' || e.key === '+' || e.key.toLowerCase() === 'e') {
    e.preventDefault()
  }
}

const paste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const pasted = e.clipboardData.getData('text')
  if (!/^\d*\.?\d{0,2}$/.test(pasted)) {
    e.preventDefault()
  }
}

const validDecimalRegex = /^(\d+)?(\.\d{0,2})?$/

const validIntegerRegex = /^\d+$/

export default { keydown, paste, validDecimalRegex, validIntegerRegex }