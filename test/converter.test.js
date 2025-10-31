const { toRoman, toArabic } = require('../api/converter');

// Pruebas de Arábigo a Romano
describe('toRoman()', () => {
  test('convierte números  simples.', () => {
    expect(toRoman(1)).toBe('I');
    expect(toRoman(5)).toBe('V');
    expect(toRoman(10)).toBe('X');
  });

  test('convierte números con sustracción', () => {
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(9)).toBe('IX');
    expect(toRoman(40)).toBe('XL');
    expect(toRoman(900)).toBe('CM');
  });

  test('convierte números complejos', () => {
    expect(toRoman(58)).toBe('LVIII');
    expect(toRoman(1994)).toBe('MCMXCIV');
  });

  test('maneja el número máximo', () => {
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });

  test('devuelve null para números fuera de rango', () => {
    expect(toRoman(0)).toBeNull();
    expect(toRoman(4000)).toBeNull();
  });
});

// Pruebas de Romano a Arábigo
describe('toArabic()', () => {
  test('convierte números simples', () => {
    expect(toArabic('I')).toBe(1);
    expect(toArabic('V')).toBe(5);
    // AQUÍ ESTABA EL ERROR 1 (Tobe -> toBe)
    expect(toArabic('X')).toBe(10);
  });

  test('convierte números con sustracción', () => {
    expect(toArabic('IV')).toBe(4);
    expect(toArabic('IX')).toBe(9);
    expect(toArabic('XL')).toBe(40);
    expect(toArabic('CM')).toBe(900);
  });

  test('convierte números complejos', () => {
    expect(toArabic('LVIII')).toBe(58);
    expect(toArabic('MCMXCIV')).toBe(1994);
  });

  test('convierte el número máximo', () => {
    expect(toArabic('MMMCMXCIX')).toBe(3999);
  });

  test('maneja minúsculas', () => {
    expect(toArabic('mcmxciv')).toBe(1994);
  });

  test('devuelve null para strings inválidos', () => {
  
    expect(toArabic('ABC')).toBeNull();
    expect(toArabic('')).toBeNull();
  });
});