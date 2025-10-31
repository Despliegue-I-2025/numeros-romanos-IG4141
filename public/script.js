const romanInput = document.getElementById('romanInput');
const arabicResult = document.getElementById('arabicResult');
const arabicInput = document.getElementById('arabicInput');
const romanResult = document.getElementById('romanResult');

document.getElementById('toArabicBtn').addEventListener('click', async () => {
  const roman = romanInput.value.trim();
  if (!roman) {
    arabicResult.value = 'Ingrese un número romano';
    return;
  }
  try {
    const res = await fetch(`/api/r2a?roman=${encodeURIComponent(roman)}`);
    const data = await res.json();
    arabicResult.value = res.ok ? data.arabic : data.error;
  } catch (err) {
    arabicResult.value = 'Error de conexión';
  }
});

document.getElementById('toRomanBtn').addEventListener('click', async () => {
  const arabic = arabicInput.value.trim();
  if (!arabic) {
    romanResult.value = 'Ingrese un número arábigo';
    return;
  }
  try {
    const res = await fetch(`/api/a2r?arabic=${encodeURIComponent(arabic)}`);
    const data = await res.json();
    romanResult.value = res.ok ? data.roman : data.error;
  } catch (err) {
    romanResult.value = 'Error de conexión';
  }
});
