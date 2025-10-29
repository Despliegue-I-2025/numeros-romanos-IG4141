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
    const res = await fetch(`/r2a?roman=${encodeURIComponent(roman)}`);
    const data = await res.json();
    if (res.ok) {
      arabicResult.value = data.arabic;
    } else {
      arabicResult.value = data.error;
    }
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
    const res = await fetch(`/a2r?arabic=${encodeURIComponent(arabic)}`);
    const data = await res.json();
    if (res.ok) {
      romanResult.value = data.roman;
    } else {
      romanResult.value = data.error;
    }
  } catch (err) {
    romanResult.value = 'Error de conexión';
  }
});
