function generateSettings(difficult: string) {
    switch (difficult) {
        case "easy":
            return {
                type: "Mudah",
                block: 12,
                bomb: 1,
            }
        case "medium":
            return {
                type: "Awas",
                block: 12,
                bomb: 3
            }
        case "hard":
            return {
                type: "Ranjau",
                block: 12,
                bomb: 5
            }
        default:
            return {
                type: "Mudah",
                block: 12,
                bomb: 1,
            }
    }
}
export { generateSettings }