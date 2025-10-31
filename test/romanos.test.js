const { romanToArabic, arabicToRoman } = require('../romanos'); // Ajusta la ruta si es necesario

describe('Funciones de conversión', () => {
  test('Convierte romano XV a 15', () => {
    expect(romanToArabic('XV')).toBe(15);
  });

  test('Convierte romano ix a 9 (minúscula)', () => {
    expect(romanToArabic('ix')).toBe(9);
  });

  test('Convierte arábigo 9 a IX', () => {
    expect(arabicToRoman(9)).toBe('IX');
  });

  test('Convierte arábigo 2024 a MMXXIV', () => {
    expect(arabicToRoman(2024)).toBe('MMXXIV');
  });

  test('Número romano inválido devuelve null', () => {
    expect(romanToArabic('Z')).toBeNull();
    expect(romanToArabic('')).toBeNull();
    expect(romanToArabic(null)).toBeNull();
  });

  test('Número arábigo inválido devuelve null', () => {
    expect(arabicToRoman(0)).toBeNull();
    expect(arabicToRoman(-5)).toBeNull();
    expect(arabicToRoman(4000)).toBeNull();
    expect(arabicToRoman(null)).toBeNull();
    expect(arabicToRoman('abc')).toBeNull();
  });
});
