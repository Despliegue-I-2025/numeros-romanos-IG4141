const express = require('express');
const cors = require('cors');
const path = require('path');

const { toRoman, toArabic, romanStructureIsValid } = require('./converter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.post('/api/convert', (req, res) => {
  const { input } = req.body;

  if (!input)
    return res.status(400).json({ error: 'Input no puede estar vacío.' });

  let result, type;

  const numberInput = parseInt(input, 10);

  if (!isNaN(numberInput) && String(numberInput) === String(input)) {
    result = toRoman(numberInput);
    type = 'arábigo_a_romano';

    if (!result)
      return res
        .status(400)
        .json({ error: 'Número fuera de rango (1-3999).' });
  } else {
    if (!romanStructureIsValid(input.toUpperCase()))
      return res.status(400).json({ error: 'Estructura romana inválida.' });

    const arabicResult = toArabic(input);

    if (arabicResult && arabicResult.error)
      return res.status(400).json({ error: arabicResult.error });

    result = arabicResult;
    type = 'romano_a_arábigo';
  }

  res.json({ original: input, resultado: result, tipo: type });
});


app.get('/api/a2r', (req, res) => {
  const raw = req.query.arabic;

  if (!raw || !/^\d+$/.test(raw)) {
    return res.status(400).json({ error: 'Parámetro arabic inválido.' });
  }

  const num = Number(raw);
  const roman = toRoman(num);

  if (!roman) {
    return res.status(400).json({ error: 'Número fuera de rango (1-3999).' });
  }

  res.json({ roman });
});


app.get('/api/r2a', (req, res) => {
  const roman = req.query.roman;
  if (!roman)
    return res.status(400).json({ error: 'Parámetro roman requerido.' });

  const upper = roman.toUpperCase();


  if (!romanStructureIsValid(upper))
    return res.status(400).json({ error: 'Estructura romana inválida.' });

  const arabicResult = toArabic(upper);

  if (arabicResult && arabicResult.error) {
    return res.status(400).json({ error: arabicResult.error });
  }

  res.json({ arabic: arabicResult });
});

app.post('/convert', (req, res) => {
  req.url = '/api/convert';
  app._router.handle(req, res);
});

app.get('/a2r', (req, res) => {
  req.url = '/api/a2r';
  app._router.handle(req, res);
});

app.get('/r2a', (req, res) => {
  req.url = '/api/r2a';
  app._router.handle(req, res);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Servidor ejecutándose en: http://localhost:${PORT}`)
  );
}

module.exports = app;
