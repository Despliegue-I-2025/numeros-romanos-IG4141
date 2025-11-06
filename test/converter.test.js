const request = require('supertest');
const app = require('../api/index');
const { toRoman, toArabic } = require('../api/converter');

// ===============================
// Tests de funciones internas
// ===============================
describe('Funciones de conversión', () => {

  // Arábigo → Romano
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

    test('maneja el número máximo', () => {
      expect(toRoman(3999)).toBe('MMMCMXCIX');
    });

    test('devuelve null para números fuera de rango', () => {
      expect(toRoman(0)).toBeNull();
      expect(toRoman(4000)).toBeNull();
    });
  });

  // Romano → Arábigo
  describe('toArabic()', () => {
    test('convierte números simples', () => {
      expect(toArabic('I')).toBe(1);
      expect(toArabic('V')).toBe(5);
      expect(toArabic('X')).toBe(10);
      expect(toArabic('L')).toBe(50);
      expect(toArabic('C')).toBe(100);
      expect(toArabic('D')).toBe(500);
      expect(toArabic('M')).toBe(1000);
    });

    test('convierte números con sustracción', () => {
      expect(toArabic('IV')).toBe(4);
      expect(toArabic('IX')).toBe(9);
      expect(toArabic('XL')).toBe(40);
      expect(toArabic('XC')).toBe(90);
      expect(toArabic('CD')).toBe(400);
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

    test('devuelve error para strings inválidos', () => {
      expect(toArabic('ABC').error).toBe("Símbolo inválido: 'A'");
      expect(toArabic('').error).toBe('Input vacío o no es un string');
    });

    test('detecta repeticiones inválidas', () => {
      expect(toArabic('IIII').error).toBe("Símbolo 'I' repetido más de 3 veces consecutivas");
      expect(toArabic('VV').error).toBe("Símbolo 'V' no puede repetirse");
    });

    test('detecta sustracciones inválidas', () => {
      expect(toArabic('IL').error).toBe("Sustracción inválida: 'IL'");
      expect(toArabic('IC').error).toBe("Sustracción inválida: 'IC'");
    });
  });
});

// ===============================
// Tests de API con Supertest
// ===============================
describe('API POST /api/convert', () => {
  test('Convierte número arábigo a romano', async () => {
    const res = await request(app).post('/api/convert').send({ input: '1994' });
    expect(res.statusCode).toBe(200);
    expect(res.body.resultado).toBe('MCMXCIV');
    expect(res.body.tipo).toBe('arábigo_a_romano');
  });

  test('Convierte romano a número arábigo', async () => {
    const res = await request(app).post('/api/convert').send({ input: 'MCMXCIV' });
    expect(res.statusCode).toBe(200);
    expect(res.body.resultado).toBe(1994);
    expect(res.body.tipo).toBe('romano_a_arábigo');
  });

  test('Error al enviar input vacío', async () => {
    const res = await request(app).post('/api/convert').send({ input: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Input no puede estar vacío.');
  });

  test('Error al enviar romano inválido', async () => {
    const res = await request(app).post('/api/convert').send({ input: 'ABCD' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Símbolo inválido: 'A'");
  });

  test('Error al enviar número fuera de rango', async () => {
    const res = await request(app).post('/api/convert').send({ input: '4000' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Número fuera de rango (1-3999).');
  });
});
