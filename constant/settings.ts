function generateSettings(difficult: string) {
    switch (difficult) {
        case "easy":
            return {
                type: "Mudah",
                block: 12,
                bomb: 1,
                minutes: 0,
                seconds: 5
            }
        case "medium":
            return {
                type: "Awas",
                block: 12,
                bomb: 3,
                minutes: 3,
                seconds: 0
            }
        case "hard":
            return {
                type: "Ranjau",
                block: 12,
                bomb: 5,
                minutes: 2,
                seconds: 30
            }
        default:
            return {
                type: "Mudah",
                block: 12,
                bomb: 1,
                minutes: 2,
                seconds: 30
            }
    }
}
export { generateSettings }