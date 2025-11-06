// converter.js

// Conversor Arábigo → Romano
function toRoman(num) {
  if (typeof num !== 'number' || !Number.isInteger(num) || num < 1 || num > 3999) {
    return null;
  }

  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  let result = '';
  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

// Conversor Romano → Arábigo con validación estricta
function toArabic(roman) {
  if (typeof roman !== 'string' || roman.trim() === '') {
    return { error: 'Input vacío o no es un string' };
  }

  roman = roman.toUpperCase().trim();
  const romanValues = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  const validSubtractPairs = { I:['V','X'], X:['L','C'], C:['D','M'] };

  let result = 0;
  let prevValue = 0;
  let prevChar = '';
  let repeatCount = 1;

  for (let i = 0; i < roman.length; i++) {
    const char = roman[i];
    const value = romanValues[char];

    if (!value) return { error: `Símbolo inválido: '${char}'` };

    // Repeticiones
    if (char === prevChar) {
      repeatCount++;
      if (['V','L','D'].includes(char)) return { error: `Símbolo '${char}' no puede repetirse` };
      if (repeatCount > 3) return { error: `Símbolo '${char}' repetido más de 3 veces consecutivas` };
    } else repeatCount = 1;

    // Sustracción
    if (prevChar && prevValue < value) {
      if (!validSubtractPairs[prevChar] || !validSubtractPairs[prevChar].includes(char)) {
        return { error: `Sustracción inválida: '${prevChar}${char}'` };
      }
      result -= 2 * prevValue; // Ajusta porque ya sumamos prevValue
    }

    result += value;
    prevValue = value;
    prevChar = char;
  }

  if (result < 1 || result > 3999) return { error: 'Número fuera de rango (1-3999)' };
  return result;
}

module.exports = { toRoman, toArabic };
