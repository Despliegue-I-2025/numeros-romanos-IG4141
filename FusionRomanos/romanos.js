const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// --- Endpoints ---

// Romanos → Arábigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parámetro "roman" requerido.' });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  if (arabicNumber === null) {
    return res.status(400).json({ error: 'Número romano inválido.' });
  }

  return res.json({ arabic: arabicNumber });
});

// Arábigos → Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro "arabic" requerido.' });
  }

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Número arábigo inválido.' });
  }

  return res.json({ roman: romanNumeral });
});

// --- Funciones de conversión ---

function romanToArabic(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  roman = roman.toUpperCase();

  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]];
    const next = map[roman[i + 1]];
    if (!current) return null; // símbolo no válido
    if (next && current < next) total -= current;
    else total += current;
  }

  return total;
}

function arabicToRoman(num) {
  num = parseInt(num);
  if (isNaN(num) || num <= 0 || num >= 4000) return null;

  const map = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  let result = '';
  for (const [value, symbol] of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

// --- Servidor ---
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de conversor romano-arábigo escuchando en el puerto ${PORT}`);
  });
}

// --- Export para tests ---
module.exports = { app, romanToArabic, arabicToRoman };
