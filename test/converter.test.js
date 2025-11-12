const request = require('supertest')
const fetch = require('node-fetch')
const app = require('../api/index')
const { toRoman, toArabic } = require('../api/converter')

/* ------------------- PRUEBAS INTERNAS ------------------- */
describe('Funciones internas', () => {
  describe('toRoman()', () => {
    test('convierte números simples', () => {
      expect(toRoman(1)).toBe('I')
      expect(toRoman(5)).toBe('V')
      expect(toRoman(10)).toBe('X')
    })

    test('convierte números con sustracción', () => {
      expect(toRoman(4)).toBe('IV')
      expect(toRoman(9)).toBe('IX')
      expect(toRoman(40)).toBe('XL')
      expect(toRoman(90)).toBe('XC')
      expect(toRoman(400)).toBe('CD')
      expect(toRoman(900)).toBe('CM')
    })

    test('convierte números complejos', () => {
      expect(toRoman(58)).toBe('LVIII')
      expect(toRoman(1994)).toBe('MCMXCIV')
      expect(toRoman(3999)).toBe('MMMCMXCIX')
    })

    test('devuelve null fuera de rango', () => {
      expect(toRoman(0)).toBeNull()
      expect(toRoman(4000)).toBeNull()
      expect(toRoman(-5)).toBeNull()
    })
  })

  describe('toArabic()', () => {
    test('convierte números simples', () => {
      expect(toArabic('I')).toBe(1)
      expect(toArabic('V')).toBe(5)
      expect(toArabic('X')).toBe(10)
    })

    test('convierte números complejos', () => {
      expect(toArabic('LVIII')).toBe(58)
      expect(toArabic('MCMXCIV')).toBe(1994)
      expect(toArabic('MMMCMXCIX')).toBe(3999)
    })

    test('maneja minúsculas', () => {
      expect(toArabic('mcmxciv')).toBe(1994)
    })

    test('errores de input inválido', () => {
      expect(toArabic('')).toHaveProperty('error')
      expect(toArabic('IIII')).toHaveProperty('error')
      expect(toArabic('IL')).toHaveProperty('error')
      expect(toArabic('IC')).toHaveProperty('error')
      expect(toArabic('IM')).toHaveProperty('error')
      expect(toArabic('VX')).toHaveProperty('error')
      expect(toArabic('A')).toHaveProperty('error')
      expect(toArabic('123')).toHaveProperty('error')
    })
  })
})

/* ------------------- PRUEBAS API LOCAL ------------------- */
describe('API local (Express)', () => {
  test('POST /api/convert arábigo → romano', async () => {
    const res = await request(app).post('/api/convert').send({ input: '1994' })
    expect(res.statusCode).toBe(200)
    expect(res.body.resultado).toBe('MCMXCIV')
  })

  test('POST /api/convert romano → arábigo', async () => {
    const res = await request(app).post('/api/convert').send({ input: 'MCMXCIV' })
    expect(res.statusCode).toBe(200)
    expect(res.body.resultado).toBe(1994)
  })

  test('GET /a2r y /r2a válidos', async () => {
    let res = await request(app).get('/a2r?arabic=42')
    expect(res.statusCode).toBe(200)
    expect(res.body.roman).toBe('XLII')

    res = await request(app).get('/r2a?roman=XLII')
    expect(res.statusCode).toBe(200)
    expect(res.body.arabic).toBe(42)
  })
})

/* ------------------- PRUEBAS API DEPLOY (VERCEL) ------------------- */
describe('API deploy (Vercel)', () => {
  const base = 'https://romas-kappa.vercel.app'
  const prefixes = ['/api', ''] // probamos con y sin /api

  for (const prefix of prefixes) {
    test(`GET ${prefix}/a2r?arabic=42`, async () => {
      const res = await fetch(`${base}${prefix}/a2r?arabic=42`)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.roman).toBe('XLII')
    })

    test(`GET ${prefix}/r2a?roman=XLII`, async () => {
      const res = await fetch(`${base}${prefix}/r2a?roman=XLII`)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.arabic).toBe(42)
    })

    test(`POST ${prefix}/convert`, async () => {
      const res = await fetch(`${base}${prefix}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: 'MCMXCIV' })
      })
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.resultado).toBe(1994)
    })
  }
})
