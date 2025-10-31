// Lógica para convertir de Arábigo a Romano
function toRoman(num) {
  if (typeof num !== 'number' || num < 1 || num > 3999) {
    return null; // O manejar el error como prefieras
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

// Lógica para convertir de Romano a Arábigo
function toArabic(roman) {
  if (typeof roman !== 'string' || roman.length === 0) {
    return null;
  }

  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const char = roman[i].toUpperCase();
    const value = romanValues[char];

    if (!value) {
      return null; // Caracter inválido
    }

    if (value < prevValue) {
      result -= value;
    } else {
      result += value;
    }
    prevValue = value;
  }
  return result;
}

// Exportamos las funciones para usarlas en la API y en los tests
module.exports = { toRoman, toArabic };