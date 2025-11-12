[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gJA-GD-V)

# Convertidor de Números Romanos (Full-Stack)

Aplicación **Full Stack** que permite la conversión **bidireccional** entre números **arábigos ↔ romanos**, mediante una **API RESTful** y una interfaz web simple.
El proyecto incluye **tests automatizados con Jest**, **CI/CD con GitHub Actions** y **despliegue en Vercel**.

---

## Estado y despliegue

| Componente                   | Estado               | URL                                                                                                  |
| :--------------------------- | :------------------- | :--------------------------------------------------------------------------------------------------- |
| **API (Backend)**            |  Activa y funcional | [https://romas-kappa.vercel.app/api/a2r?arabic=42](https://romas-kappa.vercel.app/api/a2r?arabic=42) |
| **Interfaz Web (Frontend)**  |  Online             | [https://romas-kappa.vercel.app](https://romas-kappa.vercel.app)                                     |
| **Tests automáticos (Jest)** |  100% Pasados       | Cobertura: 95% líneas                                                                                |

El despliegue está **automatizado mediante GitHub Actions**, ejecutando pruebas unitarias (`npm test`) antes de enviar el build final a **Vercel**.
Cada *push* o *merge* en la rama `main` activa el flujo CI/CD completo.

---

## Descripción técnica

### Arquitectura general

* **Backend:** Implementado en **Node.js (v18+)** con **Express.js**.
* **Frontend:** HTML5 + CSS3 + JavaScript vanilla.
* **Ejecución:**

  * Localmente mediante `npm run dev`
  * En producción mediante *Serverless Functions* de **Vercel**.

### Funcionalidad principal

El servidor ofrece endpoints REST que permiten:

1. Convertir números **arábigos → romanos**.
2. Convertir números **romanos → arábigos**.
3. Validar entradas, manejar errores y devolver respuestas en formato **JSON**.

---

## Endpoints de la API

> **Los endpoints están disponibles tanto con prefijo `/api` como sin él.**
> Por ejemplo, `/api/a2r` y `/a2r` funcionan de igual manera, tanto localmente como en Vercel.

| Método    | Endpoint                   | Descripción                                                    | Parámetros                                  | Ejemplo               |
| :-------- | :------------------------- | :------------------------------------------------------------- | :------------------------------------------ | :-------------------- |
| **GET**   | `/api/a2r`                 | Convierte de arábigo a romano                                  | `arabic` (int)                              | `/api/a2r?arabic=42`  |
| **GET**   | `/api/r2a`                 | Convierte de romano a arábigo                                  | `roman` (string)                            | `/api/r2a?roman=XLII` |
| **POST**  | `/api/convert`             | Conversión automática detectando tipo de input                 | `{ "input": "42" }` o `{ "input": "XLII" }` |                       |
| **Alias** | `/a2r`, `/r2a`, `/convert` | Versiones sin `/api` para compatibilidad con navegador directo | Idénticos                                   | `/a2r?arabic=42`      |

---

### Ejemplos de respuesta

```json
// GET /api/a2r?arabic=42
{ "roman": "XLII" }

// GET /api/r2a?roman=XLII
{ "arabic": 42 }

// POST /api/convert { "input": "XLII" }
{ "original": "XLII", "resultado": 42, "tipo": "romano_a_arábigo" }
```

---

## Testing (Jest)

El proyecto incluye **tests unitarios y de integración** realizados con **Jest** y **Supertest**, cubriendo:

* Conversión arábigo → romano
* Conversión romano → arábigo
* Casos borde (números fuera de rango, errores de formato)
* Endpoints locales (`localhost`) y desplegados en **Vercel**

### Ejecución de pruebas

```bash
npm test
```

**Resultado actual:**

```
Tests:       17 passed, 17 total
Coverage:    95% líneas, 87% ramas
```

---

## Ejecución local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Despliegue-I-2025/numeros-romanos-IG4141.git
   cd numeros-romanos-IG4141
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

   El servidor quedará disponible en:
    [http://localhost:3000](http://localhost:3000)

4. **Probar endpoints localmente**

   ```
   http://localhost:3000/a2r?arabic=42
   http://localhost:3000/r2a?roman=XLII
   http://localhost:3000/api/convert
   ```

---

##  Despliegue en Vercel

* El proyecto se despliega automáticamente desde GitHub.
* **Build Command:** `npm install && npm test`
* **Output Directory:** `/public`
* **Serverless Functions:** alojadas en `/api`

La configuración está definida en:

* `vercel.json` (rutas y funciones serverless)
* `.github/workflows/main.yml` (flujo CI/CD automático)

---

## Particularidades técnicas

* Implementación modular: `converter.js` maneja la lógica pura, `index.js` gestiona las rutas Express.
* Compatible con Node 18+.
* Tests verifican **entorno local y remoto (Vercel)**.
* Soporte doble de rutas (`/api/...` y `/...`) para máxima compatibilidad en clientes y navegadores.

---

## Autor

**Nombre:** Ivo Giuliano Cappetto


**Repositorio:** [https://github.com/Despliegue-I-2025/numeros-romanos-IG4141](https://github.com/Despliegue-I-2025/numeros-romanos-IG4141)


**Deploy:** [https://romas-kappa.vercel.app](https://romas-kappa.vercel.app)

---
