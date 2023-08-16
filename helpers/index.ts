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

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1 + min))
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


export function countBoolean(arr: boolean[], condition: boolean) {
  let booleanCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === condition) {
      booleanCount++;
    }
  }

  return booleanCount;
}

export function subtractArrays(arrayA: number[], arrayB: number[]) {
  return arrayA.filter(item => !arrayB.includes(item));
}

export function getRandomUniqueNumbers(array: number[], count: number) {
  if (count > array.length) {
    console.log("Jumlah angka yang diminta lebih besar dari panjang array.");
    return [];
  }

  const selectedIndexes: number[] = [];
  const result = [];

  while (selectedIndexes.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!selectedIndexes.includes(randomIndex)) {
      selectedIndexes.push(randomIndex);
      result.push(array[randomIndex]);
    }
  }

  return result;
}


export function getIndexArray(arrays: number[]) {
  let allIndex: number[] = []
  arrays.forEach((arr) => {
    allIndex.push(arrays.indexOf(arr))
  })

  return allIndex
}

export function combineArrays(numbersArray: number[], guessedArray: boolean[]) {
  if (numbersArray.length !== guessedArray.length) {
    throw new Error("Array lengths do not match");
  }

  return numbersArray.map((num, index) => ({
    num,
    guessed: guessedArray[index]
  }));
}
type numberBomb = {
  num: number,
  guessed: boolean
}
export function removeObjectsByNumber(originalArray: numberBomb[], numbersToRemove: number[]) {
  const newArray = originalArray.filter(obj => !numbersToRemove.includes(obj.num));
  return newArray;

}

export function checkIfElementsNotExist(a: number[], b: number[]) {
  for (let i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) {
      return true;
    }
  }
  return false;
}
