import { arabicToRoman } from '../romanos.js';

export default function handler(req, res) {
  const arabic = parseInt(req.query.arabic, 10);

  if (isNaN(arabic)) {
    return res.status(400).json({ error: 'Falta parámetro arabic' });
  }

  const roman = arabicToRoman(arabic);
  if (roman === null) {
    return res.status(400).json({ error: 'Número arábigo inválido' });
  }

  return res.status(200).json({ roman });
}
