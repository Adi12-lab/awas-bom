import { generateSettings } from '@/constant/settings'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// -----Arena Start------
interface StartState {
  start: "start" | "pre-start" | "stop",
  changeStart: (isStart: "start" | "pre-start" | "stop") => void
}
const useStartStore = create<StartState>((set) => ({//memasuki arena atau tidak
  start: "stop",
  changeStart: (startType) => set((state) => ({ start: startType }))
}))


//----Settings-------
type Settings = {
  type: string,
  block: number,
  bomb: number,
  minutes: number,
  seconds: number,
  help: number

}

interface SettingsState {
  settings: Settings,
  changeSettings: (dataSettings: Settings) => void
}


const useSettingsStore = create<SettingsState>((set) => ({
  settings: generateSettings("easy"),
  changeSettings: (dataSettings) => set((state) => ({ settings: dataSettings }))
}))

//----Result----
type result = {
  isFinish: boolean,
  result: "win" | "lose"
}
interface Result {
  results: result,
  changeResults: (resultSet: result) => void
}

const useResults = create<Result>((set) => ({
  results: {
    isFinish: false,
    result: "lose"
  },
  changeResults: (results) => set((state) => ({ results }))
}))

//----Show Bombs----

interface ShowBombsState {
  isShow: boolean,
  changeIsShow: (isShow: boolean) => void
}

const useShowBombs = create<ShowBombsState>((set) => ({
  isShow: false,
  changeIsShow: (isShow) => set((state) => ({ isShow }))
}))

// -------Statement------


// interface StatementsState {
//   statements: Statement[],
//   changeStatements: (statements: Statement[]) => void
// }

// const useStatement = create<StatementsState>((set) => ({//data statement
//   statements: [],
//   changeStatements: (statements) => set((state) => ({ statements }))
// }))

//-----Ask Help-----

type AskHelpType = {
  ask: boolean, //user minta bantuan atau tidak
  active: boolean, //bantuan aktif atau tidak
  isCorrect: boolean
}

interface AskHelp {
  askHelp: AskHelpType,
  changeAskHelp: (askHelp: AskHelpType) => void
}

const useAskHelp = create<AskHelp>((set) => ({
  askHelp: {
    ask: false,
    active: false,
    isCorrect: false,
  },
  changeAskHelp: (askHelp) => set((state) => ({ askHelp }))
}))







export { useStartStore, useSettingsStore, useResults, useShowBombs, useAskHelp }