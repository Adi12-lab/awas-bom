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
  changeResults: (results) => set((state) => ({ ...state.results, results }))
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



export { useStartStore, useSettingsStore, useResults, useShowBombs }