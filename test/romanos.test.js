const request = require('supertest');
const { app, romanToArabic, arabicToRoman } = require('../romanos'); // Ajusta la ruta según tu estructura

// --- Tests de funciones ---
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
  });

  test('Número arábigo inválido devuelve null', () => {
    expect(arabicToRoman(0)).toBeNull();
    expect(arabicToRoman(-5)).toBeNull();
    expect(arabicToRoman(4000)).toBeNull();
  });
});

// --- Tests de endpoints Express ---
describe('Endpoints Express', () => {
  test('GET /r2a devuelve 15 para roman=XV', async () => {
    const res = await request(app).get('/r2a').query({ roman: 'XV' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ arabic: 15 });
  });

  test('GET /r2a devuelve 400 si no hay parámetro roman', async () => {
    const res = await request(app).get('/r2a');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /r2a devuelve 400 si el número romano es inválido', async () => {
    const res = await request(app).get('/r2a').query({ roman: 'Z' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /a2r devuelve IX para arabic=9', async () => {
    const res = await request(app).get('/a2r').query({ arabic: 9 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ roman: 'IX' });
  });

  test('GET /a2r devuelve 400 si no hay parámetro arabic', async () => {
    const res = await request(app).get('/a2r');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /a2r devuelve 400 si el número arábigo es inválido', async () => {
    const res = await request(app).get('/a2r').query({ arabic: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
