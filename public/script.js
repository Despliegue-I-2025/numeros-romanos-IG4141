document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert-btn');
  const inputEl = document.getElementById('input-value');
  const outputEl = document.getElementById('output-value');
  const errorEl = document.getElementById('error-message');

  const handleConversion = async () => {
    const inputValue = inputEl.value.trim();

    outputEl.textContent = '';
    errorEl.textContent = '';

    if (!inputValue) {
      errorEl.textContent = 'Por favor, introduce un valor.';
      return;
    }

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Ocurrió un error');

      outputEl.textContent = data.resultado;

    } catch (error) {
      errorEl.textContent = error.message;
    }
  };

  convertBtn.addEventListener('click', handleConversion);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleConversion();
  });
});
