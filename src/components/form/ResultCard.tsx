import RegularButton from "../common/RegularButton"

type ResultCardProps = {
  tipAmount: string
  total: string
  handleReset: () => void
  isResetEnabled: boolean
}

const ResultCard = ({ tipAmount, total, handleReset, isResetEnabled }: ResultCardProps) => {
  return (
    <section 
      className="flex flex-col p-6 md:px-8 md:py-10 rounded-xl bg-green-900 text-white h-full justify-between"
    >

      <h2 className="sr-only">
        Calculation Results
      </h2>
       
      <div className="mb-8 mt-2 space-y-6">

        <div className="w-full flex justify-between items-center">
          <label htmlFor="tipAmount" className="flex flex-col text-14-16">
            <p>
              Tip Amount
            </p>
            <span className="text-grey-400">
              / person
            </span>
          </label>
          <output id="tipAmount" className="text-primary text-24-48" aria-live="polite">
            ${tipAmount}
          </output>
        </div>
        <div className="w-full flex justify-between items-center">
          <label htmlFor="total" className="flex flex-col text-14-16">
            <p>
              Total
            </p>
            <span className="text-grey-400">
              / person
            </span>
          </label>
          <output id="total" className="text-primary text-24-48" aria-live="polite">
            ${total}
          </output>
        </div>
      </div>

      <RegularButton
        type="reset"
        onClick={handleReset}
        disabled={!isResetEnabled}
        className="bg-primary text-green-900 focus-visible:ring-white focus-visible:ring-offset-grey-500"
      >
        RESET
      </RegularButton>

    </section>
  )
}

export default ResultCard