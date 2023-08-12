export function generateArrayNumber(maxValue: number) {
    if (typeof maxValue !== 'number' || maxValue <= 0) {
      throw new Error('Input harus berupa angka positif.');
    }
  
    const resultArray = [];
    for (let i = 1; i <= maxValue; i++) {
      resultArray.push(i);
    }
    return resultArray;
  }


export function generateUniqueRandomNumbers(count: number, min: number, max: number) {
    if (max - min + 1 < count) {
        throw new Error("Range is not large enough to generate unique numbers.");
    }


    const randomNumbers = new Set<number>();

    while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
}
