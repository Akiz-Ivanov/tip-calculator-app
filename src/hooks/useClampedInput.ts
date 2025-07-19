import { useState } from "react"
import clampValue from "@/utils/clampValue"

export type UseClampedInputReturn = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  setValue: React.Dispatch<React.SetStateAction<string>>
  touched: boolean
  resetTouched: () => void
}

const useClampedInput = (
  initialValue: string,
  min: number,
  max: number,
  validRegex: RegExp
): UseClampedInputReturn => {

  //*====== Input State ======
  const [value, setValue] = useState(initialValue)
  const [touched, setTouched] = useState(false)

  //*====== Input Handler ======
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value

    //* Allows user to clear the input
    if (val === "") {
      setValue("")
      return
    }

    //* Validate input
    if (!validRegex.test(val)) return

    //* Add leading zero if user starts input with a decimal
    if (val.startsWith(".")) {
      val = "0" + val
    }

    val = val.replace(/^0+(?!\.|$)/, "")

    setValue(val)

    const parsed = parseFloat(val)
    const checkZeroDot = /^\d*\.0$/.test(val)

    //*====== Clamp value ======
    if (
      !isNaN(parsed) &&
      !checkZeroDot &&
      !val.endsWith(".") &&
      (parsed < min || parsed > max)
    ) {
      const clamped = clampValue(parsed, min, max)
      if (String(clamped) !== val) {
        setValue(String(clamped))
      }
    }
  }

  //*====== Input Blur, remove trailing dot ======
  function onBlur() {
    setTouched(true)
    if (value.endsWith(".")) {
      setValue(value.slice(0, -1))
    }
  }

  //*====== Reset touched ======
  const resetTouched = () => {
    setValue(initialValue)
    setTouched(false)
  }

  return { value, onChange, onBlur, setValue, touched, resetTouched }
}

export default useClampedInput