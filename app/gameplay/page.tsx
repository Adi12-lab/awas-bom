import Area from "./pages/Area"
import Settings from "./pages/Settings"
import Timer from "@/components/timer"
import ModalResult from "@/components/modal-result"
import Counter from "@/components/counter"
import ShowBombs from "@/components/show-bombs"
import RestartButton from "@/components/restart"
export default function Home() {
  return (
    <>
      <Settings />
      <main className="flex h-screen flex-col items-center justify-center md:flex-row text-white">

        <Area />
        <div className="order-first md:order-last flex flex-col items-center">
          <Timer />
          <div>
            <ShowBombs />
            <RestartButton />
          </div>
        </div>

        <Counter />

      </main>
      <ModalResult />
    </>
  )
}
