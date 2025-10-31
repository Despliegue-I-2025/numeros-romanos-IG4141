const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function romanToArabic(roman) {
  if (!roman || typeof roman !== 'string') return null;

  const map = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
  let total = 0, prev = 0;

  roman = roman.toUpperCase();
  for (let i = roman.length - 1; i >= 0; i--) {
    const num = map[roman[i]];
    if (!num) return null;
    if (num < prev) total -= num;
    else total += num;
    prev = num;
  }
  return total;
}

function arabicToRoman(num) {
  if (!Number.isInteger(num) || num <= 0 || num >= 4000) return null;

  const map = [
    ['M',1000], ['CM',900], ['D',500], ['CD',400],
    ['C',100], ['XC',90], ['L',50], ['XL',40],
    ['X',10], ['IX',9], ['V',5], ['IV',4], ['I',1]
  ];

  let roman = '';
  for (const [letter, value] of map) {
    while (num >= value) {
      roman += letter;
      num -= value;
    }
  }
  return roman;
}

app.use(express.static('public'));

app.get('/r2a', (req, res) => {
  const { roman } = req.query;
  if (!roman) return res.status(400).json({ error: 'Falta parámetro roman' });

  const arabic = romanToArabic(roman);
  if (arabic === null) return res.status(400).json({ error: 'Número romano inválido' });

  res.json({ arabic });
});

app.get('/a2r', (req, res) => {
  const arabic = parseInt(req.query.arabic);
  if (!req.query.arabic) return res.status(400).json({ error: 'Falta parámetro arabic' });

  const roman = arabicToRoman(arabic);
  if (roman === null) return res.status(400).json({ error: 'Número arábigo inválido' });

  res.json({ roman });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

module.exports = { app, romanToArabic, arabicToRoman };
