import TipCalcForm from "./components/form/TipCalcForm"

function App() {

  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen px-0-144 md:p-4">
      <div className="flex flex-col items-center justify-center max-w-4xl w-full flex-1">
        <h1 className="text-2xl flex flex-col tracking-[0.8rem] text-green-900/80 m-8 md:mt-0 md:mb-16">
          SPLI <br />TTER
        </h1>
        <div
          className="bg-white rounded-tr-3xl rounded-tl-3xl md:rounded-3xl w-full p-7 flex-1 md:flex-0 "
        >
          <TipCalcForm />
        </div>
      </div>
    </main>
  )
}

export default App