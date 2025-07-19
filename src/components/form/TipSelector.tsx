import { cn } from "@/lib/utils"
import RegularButton from "../common/RegularButton"
import RegularInput from "../common/RegularInput"
import inputValidation from "@/utils/inputValidation"

import type { UseClampedInputReturn } from "@/hooks/useClampedInput"

type TipSelectorProps = {
  value: string
  onBtnTipClick: (value: string) => void
  onCustomTipChange: (value: string) => void
  customTip: UseClampedInputReturn
  customTipSave: string
  setCustomTipSave: React.Dispatch<React.SetStateAction<string>>
}
const TipSelector = ({ 
  value, 
  onBtnTipClick, 
  onCustomTipChange,
  customTip,
  customTipSave, 
  setCustomTipSave,
}: TipSelectorProps) => {

  const tipPercentages = ["5", "10", "15", "25", "50"]

  const handleTipButtonClick = (percentage: string) => {
    onBtnTipClick(percentage)
    if (customTip.value.trim() !== "") {
      setCustomTipSave(customTip.value)
    }
    customTip.setValue("")
  }

  return (
    <fieldset
      aria-labelledby="tip-label"
      className="flex flex-col"
    >
      <legend
        className="text-grey-500 text-14-16"
      >
        Select Tip %
      </legend>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4 auto-rows-fr">

        {tipPercentages.map((percentage) => (
          <RegularButton
            key={percentage}
            aria-pressed={value === percentage}
            onClick={() => handleTipButtonClick(percentage)}
            className={cn(
              value === percentage && "bg-primary text-green-900"
            )}
          >
            {percentage}%
          </RegularButton>
        ))}

        <RegularInput
          id="custom"
          placeholder="Custom"
          aria-label="Custom tip percentage"
          inputMode="decimal"
          value={customTip.value}
          onKeyDown={inputValidation.keydown}
          onPaste={inputValidation.paste}
          onChange={(e) => {
            onCustomTipChange(e.target.value)
            customTip.onChange(e)
          }}
          onBlur={customTip.onBlur}
          onFocus={() => {
            if (customTipSave) {
              customTip.setValue(customTipSave)
              onCustomTipChange(customTipSave)
            }
          }}
          className="placeholder:text-green-900/60 pl-2"
        />

      </div>

    </fieldset>
  )
}

export default TipSelector