function toRoman(num) {
  if (num < 1 || num > 3999) return null
  const map = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ]
  let result = ''
  for (const [roman, value] of map) {
    while (num >= value) {
      result += roman
      num -= value
    }
  }
  return result
}

function toArabic(roman) {
  if (typeof roman !== 'string' || roman.trim() === '') return { error: 'Entrada inválida.' }
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  const upper = roman.toUpperCase()
  let total = 0
  let prev = 0
  let repeatCount = 0
  let lastChar = ''

  for (let i = upper.length - 1; i >= 0; i--) {
    const curr = map[upper[i]]
    if (!curr) return { error: `Símbolo inválido: '${upper[i]}'` }

    if (upper[i] === lastChar) {
      repeatCount++
      if ((['V', 'L', 'D'].includes(upper[i]) && repeatCount > 1) ||
          (['I', 'X', 'C', 'M'].includes(upper[i]) && repeatCount > 3)) {
        return { error: `Repetición inválida: '${upper[i]}'` }
      }
    } else {
      repeatCount = 1
      lastChar = upper[i]
    }

    if (curr < prev) {
      if (!((curr === 1 && (prev === 5 || prev === 10)) ||
            (curr === 10 && (prev === 50 || prev === 100)) ||
            (curr === 100 && (prev === 500 || prev === 1000)))) {
        return { error: `Sustracción inválida: '${upper[i]}'` }
      }
      total -= curr
    } else {
      total += curr
    }
    prev = curr
  }
  return total
}

module.exports = { toRoman, toArabic }
