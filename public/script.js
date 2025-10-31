document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert-btn');
  const inputEl = document.getElementById('input-value');
  const outputEl = document.getElementById('output-value');
  const errorEl = document.getElementById('error-message');

  const handleConversion = async () => {
    const inputValue = inputEl.value.trim();
    
    // Limpiar estado previo
    outputEl.textContent = '';
    errorEl.textContent = '';

    if (!inputValue) {
      errorEl.textContent = 'Por favor, introduce un valor.';
      return;
    }

    try {
      // Llamamos a nuestra API
      // Usamos una ruta relativa '/api/convert' que Vercel manejará
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Error de la API (ej: 400)
        throw new Error(data.error || 'Ocurrió un error');
      }

      // Éxito: Mostrar en la caja de la derecha
      outputEl.textContent = data.resultado;

    } catch (error) {
      // Error de red o error de la API
      errorEl.textContent = error.message;
    }
  };

  convertBtn.addEventListener('click', handleConversion);

  // Opcional: permitir convertir con "Enter"
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleConversion();
    }
  });
});