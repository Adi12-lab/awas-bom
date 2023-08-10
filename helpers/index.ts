export function generateUniqueRandomNumbers(count: number, min: number, max: number) {
    if (max - min + 1 < count) {
        throw new Error("Range is not large enough to generate unique numbers.");
    }


    const randomNumbers = new Set();

    while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
}
