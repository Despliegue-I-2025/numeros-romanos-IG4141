[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gJA-GD-V)

#  Convertidor de Números Romanos ( Full-Stack )

Proyecto que implementa la conversión bidireccional de números arábigos a romanos (y viceversa) mediante una API RESTful y una interfaz de usuario simple y funcional.

---

## 🚀 Estado y Despliegue

| Componente | Estado | URL de Producción |
| :--- | :--- | :--- |
| **Lógica de Negocio** | ✅ Tests Pasados (Jest) | |
| **Despliegue** | ✅ Funcional (Vercel) | [fusion-romanos.vercel.app](https://romas-kappa.vercel.app/) |

El despliegue está automatizado mediante **GitHub Actions**, garantizando que cada `push` a la rama `main` ejecute las pruebas y se despliegue automáticamente en Vercel.

---

##  Tecnologías Utilizadas

### Backend (API REST)
* **Node.js** (v18+)
* **Express.js:** Framework minimalista para crear los *endpoints* de la API.
* **CORS:** Permite la comunicación entre el frontend y el backend.
* **Jest:** Framework de testing para garantizar la precisión de las conversiones.

### Frontend
* **HTML5 / CSS3:** Estructura y estilos de la interfaz de usuario.
* **JavaScript (Vanilla JS):** Lógica del cliente para realizar peticiones `fetch` a la API.

### CI/CD y Despliegue
* **GitHub Actions:** Automatiza pruebas (`npm test`) y despliegue (`vercel deploy`).
* **Vercel:** Plataforma para *Serverless Functions* (API) y frontend estático.

---

##  Endpoints de la API

| Método | Endpoint | Descripción | Parámetros Requeridos |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/a2r` | Convierte un número Arábigo a Romano | `arabic` (ej: `?arabic=1994`) |
| **GET** | `/api/r2a` | Convierte un número Romano a Arábigo | `roman` (ej: `?roman=MCMXCIV`) |

### Ejemplos de Petición

| Conversión | Solicitud | Respuesta Esperada |
| :--- | :--- | :--- |
| **Arábigo a Romano** | `/api/a2r?arabic=42` | `{"roman": "XLII"}` |
| **Romano a Arábigo** | `/api/r2a?roman=XLII` | `{"arabic": 42}` |

---

##  Ejecución Local

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Despliegue-I-2025/numeros-romanos-IG4141.git
    cd numeros-romanos-IG4141
    ```
2. **Instalar dependencias:**
    ```bash
    npm install
    ```
3. **Ejecutar tests:** Para verificar que la lógica de conversión funciona correctamente.
    ```bash
    npm test
    ```
4. **Iniciar la API:** Para pruebas locales (la API está optimizada para Vercel, no necesita puerto tradicional).
    ```bash
    npm start
    ```

---

##  Autor

* **Ivo Giuliano Cappetto**
