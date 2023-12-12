import rouletteimage from "../assets/roulette-logo.svg"

export default function Homepage() {
  return (
    <>
      <div className="items-stretch flex flex-col py-12">
        <img
          src={rouletteimage}
          className="aspect-[2.08] object-contain object-center w-[81px] overflow-hidden self-center max-w-full mt-2.5"
        />
      </div>
      <h1>HOMIE PAGE</h1>
    </>
  )
}
