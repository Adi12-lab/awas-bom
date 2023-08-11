import BackButton from './partials/backButton'
import Area from './components/Area'
import Menu from './components/Menu'
import Settings from './components/Settings'
export default function Home() {
  return (

    <main className="bg-[url('/image/neon-bg.jpg')] h-screen bg-cover bg-center">
      <BackButton />
      <Menu />
      <Area />
      <Settings />
    </main>
  )
}
