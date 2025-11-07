const express = require('express');
const cors = require('cors');
const path = require('path');
const { toRoman, toArabic } = require('./converter');

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// === POST /api/convert ===
app.post('/api/convert', (req, res) => {
  const { input } = req.body;

  if (input === undefined || input === null || input === '') {
    return res.status(400).json({ error: 'Input no puede estar vacío.' });
  }

  let result;
  let type;

  const numberInput = parseInt(input, 10);

  if (!isNaN(numberInput) && String(numberInput) === String(input)) {
    // Arábigo → Romano
    result = toRoman(numberInput);
    type = 'arábigo_a_romano';
    if (!result) return res.status(400).json({ error: 'Número fuera de rango (1-3999).' });
  } else {
    // Romano → Arábigo
    const arabicResult = toArabic(input);
    if (arabicResult && arabicResult.error) return res.status(400).json({ error: arabicResult.error });
    result = arabicResult;
    type = 'romano_a_arábigo';
  }

  res.json({ original: input, resultado: result, tipo: type });
});

// === GET /a2r?arabic=NUM ===
app.get('/a2r', (req, res) => {
  const num = parseInt(req.query.arabic, 10);
  if (isNaN(num)) return res.status(400).json({ error: 'Parametro arabic requerido.' });

  const roman = toRoman(num);
  if (!roman) return res.status(400).json({ error: 'Número fuera de rango (1-3999).' });
  res.json({ roman });
});

// === GET /r2a?roman=ROMAN ===
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;
  if (!roman) return res.status(400).json({ error: 'Parametro roman requerido.' });

  const arabicResult = toArabic(roman);
  if (arabicResult && arabicResult.error) return res.status(400).json({ error: arabicResult.error });
  res.json({ arabic: arabicResult });
});

// Exportar app para Vercel
module.exports = app;

// === Ejecución local ===
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor local ejecutándose en: http://localhost:${PORT}`);
  });
}
