const request = require('supertest');
const app = require('../api/index');
const { toRoman, toArabic } = require('../api/converter');

describe('Funciones internas', () => {
  describe('toRoman()', () => {
    test('convierte números simples', () => {
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

    test('devuelve null fuera de rango', () => {
      expect(toRoman(0)).toBeNull();
      expect(toRoman(4000)).toBeNull();
    });
  });

  describe('toArabic()', () => {
    test('convierte números simples', () => {
      expect(toArabic('I')).toBe(1);
      expect(toArabic('V')).toBe(5);
      expect(toArabic('X')).toBe(10);
    });

    test('convierte números complejos', () => {
      expect(toArabic('LVIII')).toBe(58);
      expect(toArabic('MCMXCIV')).toBe(1994);
    });

    test('maneja minúsculas', () => {
      expect(toArabic('mcmxciv')).toBe(1994);
    });

    test('errores de input inválido', () => {
      expect(toArabic('')).toHaveProperty('error');
      expect(toArabic('IIII')).toHaveProperty('error');
      expect(toArabic('IL')).toHaveProperty('error');
    });
  });
});

describe('API endpoints', () => {
  test('POST /api/convert arábigo → romano', async () => {
    const res = await request(app).post('/api/convert').send({ input: '1994' });
    expect(res.statusCode).toBe(200);
    expect(res.body.resultado).toBe('MCMXCIV');
    expect(res.body.tipo).toBe('arábigo_a_romano');
  });

  test('POST /api/convert romano → arábigo', async () => {
    const res = await request(app).post('/api/convert').send({ input: 'MCMXCIV' });
    expect(res.statusCode).toBe(200);
    expect(res.body.resultado).toBe(1994);
    expect(res.body.tipo).toBe('romano_a_arábigo');
  });

  test('GET /a2r', async () => {
    const res = await request(app).get('/a2r?arabic=42');
    expect(res.statusCode).toBe(200);
    expect(res.body.roman).toBe('XLII');
  });

  test('GET /r2a', async () => {
    const res = await request(app).get('/r2a?roman=XLII');
    expect(res.statusCode).toBe(200);
    expect(res.body.arabic).toBe(42);
  });

  test('Errores GET y POST', async () => {
    let res = await request(app).get('/a2r');
    expect(res.statusCode).toBe(400);
    res = await request(app).get('/r2a');
    expect(res.statusCode).toBe(400);
    res = await request(app).post('/api/convert').send({ input: '' });
    expect(res.statusCode).toBe(400);
  });
});
