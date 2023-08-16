function generateSettings(difficult: string) {
    switch (difficult) {
        case "easy":
            return {
                type: "Mudah",
                block: 12,
                bomb: 1,
                minutes: 0,
                seconds: 20,
                help: 4
            }
        case "medium":
            return {
                type: "Awas",
                block: 12,
                bomb: 3,
                minutes: 3,
                seconds: 0,
                help: 6,
            }
        case "hard":
            return {
                type: "Ranjau",
                block: 12,
                bomb: 5,
                minutes: 2,
                seconds: 30,
                help: 5,
            }
        default:
            return {
                type: "Mudah",
                block: 12,
                bomb: 1,
                minutes: 2,
                seconds: 30,
                help: 4
            }
    }
}

function helpSetting(num: number, blockLength: number) {
    if(1 <= num && num <= blockLength) {
        
    }
}
export { generateSettings }