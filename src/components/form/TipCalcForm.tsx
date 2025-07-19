import RegularInput from "@/components/common/RegularInput"
import TipSelector from "@/components/form/TipSelector"
import inputValidation from "@/utils/inputValidation"
import iconDollar from "@/assets/images/icon-dollar.svg"
import iconPerson from "@/assets/images/icon-person.svg"
import { useState } from "react"
import useClampedInput from "@/hooks/useClampedInput"
import ResultCard from "@/components/form/ResultCard"

const TipCalcForm = () => {

  //*====== Form State ======
  const [tipPercent, setTipPercent] = useState<string>("")
  const billInput = useClampedInput("", 0, 1000000, inputValidation.validDecimalRegex)
  const peopleInput = useClampedInput("", 1, 100, inputValidation.validIntegerRegex)

  const customTip = useClampedInput("", 0, 100, inputValidation.validDecimalRegex);
  const [customTipSave, setCustomTipSave] = useState("");

  //*====== Tip Button Click ======
  const handleTipButtonSelect = (btnValue: string) => {
    if (btnValue === tipPercent) {
      setTipPercent("")
      return
    }
    setTipPercent(btnValue)
  }

  //*====== Custom Tip Change ======
  const handleCustomTipChange = (value: string) => {
    setTipPercent(value)
  }

  //*====== Calculate values ======
  const bill = parseFloat(billInput.value)
  const people = parseInt(peopleInput.value, 10)
  const tip = parseFloat(tipPercent)

  let tipAmount = "0.00"
  let totalAmount = "0.00"

  if (!isNaN(bill) && !isNaN(people) && people > 0 && !isNaN(tip)) {
    const totalTip = bill * (tip / 100)
    const tipPerPerson = totalTip / people
    const totalPerPerson = (bill + totalTip) / people

    tipAmount = tipPerPerson.toFixed(2)
    totalAmount = totalPerPerson.toFixed(2)
  }

  //*====== Error Messages ======
  const showBillError = billInput.touched && (bill === 0 || isNaN(bill))
  const showPeopleError = peopleInput.touched && (people === 0 || isNaN(people))


  const handleReset = () => {
    billInput.resetTouched()
    peopleInput.resetTouched()
    setTipPercent("")
    billInput.setValue("")
    peopleInput.setValue("")
    customTip.setValue("")
    setCustomTipSave("")
  }

  //*====== Reset state ======
  const isResetEnabled = (
    billInput.value !== "" ||
    tipPercent !== "" ||
    customTip.value !== "" ||
    peopleInput.value !== ""
  )

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6 flex flex-col md:flex-row md:gap-6"
    >
      <div className="md:w-1/2 space-y-6 md:space-y-8 md:pt-3 md:pb-0 md:px-4">

        <RegularInput
          id="bill"
          label="Bill"
          icon={iconDollar}
          errorMessage={showBillError ? "Can't be zero" : undefined}
          inputMode="decimal"
          value={billInput.value}
          onKeyDown={inputValidation.keydown}
          onPaste={inputValidation.paste}
          onChange={billInput.onChange}
          onBlur={billInput.onBlur}
        />

        <TipSelector
          value={tipPercent}
          onBtnTipClick={handleTipButtonSelect}
          onCustomTipChange={handleCustomTipChange}
          customTip={customTip}
          customTipSave={customTipSave}
          setCustomTipSave={setCustomTipSave}
        />

        <RegularInput
          id="people"
          label="Number of People"
          icon={iconPerson}
          errorMessage={showPeopleError ? "Can't be zero" : undefined}
          inputMode="decimal"
          value={peopleInput.value}
          onKeyDown={inputValidation.keydown}
          onPaste={inputValidation.paste}
          onChange={peopleInput.onChange}
          onBlur={peopleInput.onBlur}
        />

      </div>

      <div className="md:w-1/2">
        <ResultCard
          tipAmount={tipAmount}
          total={totalAmount}
          handleReset={handleReset}
          isResetEnabled={isResetEnabled}
        />
      </div>

    </form>
  )
}

export default TipCalcForm