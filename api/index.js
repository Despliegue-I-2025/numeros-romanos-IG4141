const express = require('express');
const cors = require('cors');
const path = require('path');
const { toRoman, toArabic } = require('./converter');

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json());

// Servir frontend local (solo para desarrollo local)
app.use(express.static(path.join(__dirname, '../public')));

// === Endpoint principal de conversión ===
app.post('/api/convert', (req, res) => {
  const { input } = req.body;

  if (input === undefined || input === null || input === '') {
    return res.status(400).json({ error: 'Input no puede estar vacío.' });
  }

  let result;
  let type;

  const numberInput = parseInt(input, 10);

  if (!isNaN(numberInput) && String(numberInput) === String(input)) {
    // Es un número arábigo
    result = toRoman(numberInput);
    type = 'arábigo_a_romano';
    if (!result) {
      return res.status(400).json({ error: 'Número fuera de rango (1-3999).' });
    }
  } else {
    // Es un número romano (o inválido)
    const arabicResult = toArabic(input);
    if (arabicResult && arabicResult.error) {
      return res.status(400).json({ error: arabicResult.error });
    }
    result = arabicResult;
    type = 'romano_a_arábigo';
  }

  res.json({
    original: input,
    resultado: result,
    tipo: type,
  });
});

// Exporta la app para Vercel
module.exports = app;

// === Ejecución local ===
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor local ejecutándose en: http://localhost:${PORT}`);
  });
}
