import { generateSettings } from '@/constant/settings'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
interface StartState {
    start: boolean,
    changeStart: (isStart: boolean) => void
}
const useStartStore = create<StartState>((set) => ({
  start: false,
  changeStart: (isStart) => set((state) => ({start: isStart}))
}))

type Settings = {
  type: string,
  block: number,
  bomb: number,

}

interface SettingsState {
 settings: Settings,
 changeSettings: (dataSettings: Settings) => void
}


const useSettingsStore = create<SettingsState>((set) => ({
  settings: generateSettings("easy"),
  changeSettings: (dataSettings) => set((state) => ({settings: dataSettings}))
}))

interface IsWin {
  isWin: boolean,
  changeIsWin: (isWin: boolean) => void 
}
const useIsWin = create<IsWin>((set) => ({
  isWin: false,
  changeIsWin: (iswin) => set((state) => ({isWin: iswin}))
}))


export { useStartStore, useSettingsStore, useIsWin }