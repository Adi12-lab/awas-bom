import { generateSettings } from '@/constant/settings'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
interface MenuState {
    menu: string,
    changeMenu: (dataMenu: string) => void
}
const useMenuStore = create<MenuState>((set) => ({
  menu: "menu",
  changeMenu: (dataMenu) => set((state) => ({menu: dataMenu}))
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

export { useMenuStore, useSettingsStore }