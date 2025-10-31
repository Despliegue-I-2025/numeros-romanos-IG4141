import { romanToArabic } from '../romanos.js';

export default function handler(req, res) {
  const { roman } = req.query;

  if (!roman) {
    return res.status(400).json({ error: 'Falta parámetro roman' });
  }

  const arabic = romanToArabic(roman);
  if (arabic === null) {
    return res.status(400).json({ error: 'Número romano inválido' });
  }

  return res.status(200).json({ arabic });
}
