import { create } from 'zustand'



type AskHelpType = {
    ask: boolean,
    active: boolean,
    saveBlocks: number[],
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
        saveBlocks: [],
        isCorrect: false,
    },
    changeAskHelp: (askHelp) => set((state) => ({ askHelp }))
}))

export { useAskHelp }