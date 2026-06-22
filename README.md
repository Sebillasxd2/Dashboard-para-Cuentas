# 📋 Mi Dashboard de Cuentas

Dashboard personal para manejar tu día a día: notas, calendario, horarios (universidad y rutina) y un **control de gastos** completo con registro mensual, tendencias y plantilla de inicio de mes. Funciona en la PC y en el celular, se instala como app y **sincroniza en la nube — todo gratis**.

## ✨ Qué incluye

- **⚡ Registro rápido** (pensado para el celular): anota un gasto o ingreso en 2 toques.
- **🏠 Inicio**: notas divididas en *Ideas/recordatorios* y *Apuntes/preguntas teóricas*, calendario mensual con eventos y horario semanal general.
- **🎓 Universidad**: horario de clases + tareas/exámenes con fecha.
- **🔁 Vida rutinaria**: rutina semanal + hábitos diarios + pendientes.
- **💰 Gastos**:
  - Tablas tipo Excel de ingresos y gastos con porcentajes.
  - **Tendencias y comparación mensual** (gráfico + tabla: cuánto subió/bajó cada mes).
  - **Plantilla de inicio de mes**: defines tu paga esperada y gastos fijos, y cada mes nuevo arranca solo con esos valores.
  - **Historial** de cada mes archivado automáticamente.
- **Modo claro/oscuro**, respaldo manual (exportar/importar) y sincronización en la nube opcional.

## 💵 ¿Cuánto cuesta? — Nada

- **GitHub Pages**: hosting gratis.
- **Firebase (plan Spark)**: gratis, sin tarjeta de crédito. Más que suficiente para uso personal.

---

## 🚀 Paso 1 — Publicar la app en GitHub Pages

1. Sube estos archivos al repositorio (ya hecho si clonaste/empujaste).
2. En GitHub: **Settings › Pages**.
3. En *Branch* elige `main` y carpeta `/ (root)` › **Save**.
4. Espera ~1 minuto. Tu app quedará en:
   `https://<tu-usuario>.github.io/Dashboard-para-Cuentas/`
5. Abre esa dirección en la PC y en el celular. En el celular: menú del navegador › **“Agregar a la pantalla de inicio”** para instalarla como app.

> Sin hacer nada más, la app ya funciona en modo **local** (los datos se guardan en cada dispositivo). Para que el celular y la PC compartan datos, sigue el Paso 2.

---

## ☁️ Paso 2 — Activar la sincronización (Firebase) — 5 minutos, gratis

### 2.1 Crear el proyecto
1. Entra a https://console.firebase.google.com (con tu cuenta de Google).
2. **Agregar proyecto** › ponle un nombre (ej: `mis-cuentas`) › puedes **desactivar** Google Analytics › Crear.

### 2.2 Registrar la app web
1. En la página del proyecto, haz clic en el ícono **`</>`** (Web).
2. Ponle un apodo y **Registrar app**.
3. Te mostrará un bloque `const firebaseConfig = { ... }`. **Copia ese objeto completo** (lo pegarás en la app).

### 2.3 Activar Autenticación
1. Menú izquierdo › **Authentication** › **Comenzar**.
2. Pestaña **Sign-in method** › habilita **Correo electrónico/contraseña** › Guardar.

### 2.4 Crear la base de datos
1. Menú izquierdo › **Firestore Database** › **Crear base de datos**.
2. Elige una ubicación › modo **producción** › Crear.
3. Pestaña **Reglas**: borra lo que haya, pega el contenido de [`firestore.rules`](firestore.rules) y **Publica**.

### 2.5 Conectar la app
1. Abre la app (en la PC o el celular) › ⚙️ arriba a la derecha.
2. En **Sincronización en la nube**, pega el objeto `firebaseConfig` que copiaste › **Conectar Firebase**.
3. Escribe un correo y contraseña › **Crear cuenta**.
4. En el otro dispositivo, repite: pega la misma configuración e **Inicia sesión** con el mismo correo y contraseña.

¡Listo! Lo que registres en el celular aparecerá solo en la PC y viceversa. ✅

---

## 🔒 Privacidad
- Tus datos viven en **tu** proyecto de Firebase, protegidos por las reglas: solo tu usuario puede leerlos/escribirlos.
- La `firebaseConfig` (incluida la apiKey) **no es secreta**: es una clave pública de cliente. La seguridad la dan las reglas de Firestore y tu contraseña.
- Aun así, exporta un respaldo de vez en cuando desde ⚙️ › *Exportar*.

## 🛠️ Estructura
```
index.html        La app completa (HTML + CSS + JS)
manifest.json     Metadatos para instalarla como app (PWA)
sw.js             Service worker (funciona sin conexión)
icon-192/512.png  Íconos de la app
firestore.rules   Reglas de seguridad de la base de datos
```
