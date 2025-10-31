const express = require('express');
const cors = require('cors');
const { toRoman, toArabic } = require('./converter');

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Parsea body JSON

// Endpoint principal de conversión
app.post('/api/convert', (req, res) => {
  const { input } = req.body;

  if (input === undefined || input === null || input === '') {
    return res.status(400).json({ error: 'Input no puede estar vacío.' });
  }

  let result;
  let type;

  // Intenta parsear como número primero
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
    result = toArabic(input);
    type = 'romano_a_arábigo';
    if (result === null) {
      return res.status(400).json({ error: 'Número romano inválido.' });
    }
  }

  res.json({
    original: input,
    resultado: result,
    tipo: type,
  });
});

// Exporta la app para Vercel
module.exports = app;