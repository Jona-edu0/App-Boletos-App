# Ticket Star — App Web de Venta de Boletos para Eventos de Circo

## 1. Descripción del proyecto

**Ticket Star** es una aplicación web de venta de boletos para eventos de circo, desarrollada como proyecto académico por el equipo Circus Team. La interfaz está inspirada en la ambientación visual de los espectáculos circenses y busca ofrecer una experiencia atractiva, organizada y sencilla para consultar funciones y seleccionar boletos.

La aplicación permite presentar información de los espectáculos, como sus nombres, fechas, horarios, ubicaciones y precios. Asimismo, la interfaz está orientada a facilitar la selección de boletos y la consulta de un carrito o resumen de compra simulado.

El frontend está desarrollado con React, Vite, JavaScript y CSS. El proyecto se organiza mediante componentes reutilizables y estilos visuales que refuerzan la identidad circense.

## 2. Objetivo del proyecto

Desarrollar y verificar una aplicación web de venta de boletos para eventos de circo que permita consultar las funciones disponibles, revisar su información y simular la selección de boletos mediante una interfaz clara, funcional y visualmente coherente con la temática circense.

Además, el proyecto busca aplicar principios de trabajo ágil mediante Scrum, organizar las actividades en tres sprints, dar seguimiento a las tareas con Trello y mantener el código fuente en un repositorio compartido de GitHub.

## 3. Funcionalidades principales

Las funcionalidades que se describen a continuación corresponden al alcance previsto para el frontend y deben mantenerse únicamente si están disponibles en la versión actual de la aplicación.

- **Página principal:** presenta la identidad visual de Ticket Star y elementos gráficos relacionados con el circo.
- **Catálogo de funciones:** permite consultar los espectáculos y visualizar información como fechas, horarios, ubicaciones y precios.
- **Navegación por secciones:** incluye accesos como Funciones, Cómo funciona, Ayuda, Mis boletos y Carrito, de acuerdo con la interfaz implementada.
- **Consulta de información:** facilita revisar los datos de las funciones disponibles.
- **Selección de boletos:** permite interactuar con las opciones de boletos y sus cantidades, si están habilitadas.
- **Carrito y resumen de compra:** está orientado a mostrar la selección del usuario y el importe correspondiente.
- **Interfaz adaptable:** busca conservar una presentación legible y organizada en distintos tamaños de pantalla.

### Alcance y limitaciones

El proyecto se concentra en el frontend. Las funciones de consulta, selección y compra se manejan como una demostración utilizando la lógica y los datos disponibles en la aplicación.

No se contempla un backend, una API propia, una base de datos en servidor ni el procesamiento de pagos reales. Por lo tanto, la aplicación debe entenderse como un prototipo de interfaz y simulación de compra, no como una plataforma comercial que procese transacciones reales.

## 4. Tecnologías utilizadas

| Tecnología | Función dentro del proyecto |
|---|---|
| **React** | Permite construir la interfaz mediante componentes reutilizables y gestionar la presentación de los elementos de la aplicación. |
| **Vite** | Proporciona el entorno de desarrollo y permite compilar el frontend para generar la versión de producción. |
| **JavaScript** | Implementa la lógica de las interacciones, la selección y las operaciones necesarias de la interfaz. |
| **CSS** | Define los colores, las tipografías, la distribución de los componentes y los estilos inspirados en la temática circense. |
| **Git** | Permite registrar versiones y conservar el historial de modificaciones del código. |
| **GitHub** | Aloja el repositorio compartido y facilita la colaboración y la integración de cambios. |
| **Trello** | Se utiliza para organizar las historias de usuario, tareas, prioridades y estados de los tres sprints. |
| **GitHub Pages** | Se utiliza para publicar el frontend y permitir su consulta mediante una dirección web pública, una vez configurado el despliegue. |

## 5. Estructura del proyecto

El frontend utiliza una estructura basada en React y Vite. La ubicación real de los archivos debe corresponder con la versión del repositorio.

```text
boletos-app/
├── README.md
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

**Descripción de los archivos y carpetas principales:**

- `src/`: contiene el código fuente del frontend.
- `src/App.jsx`: contiene el componente principal de la aplicación.
- `src/main.jsx`: inicia la aplicación React.
- `src/App.css` y `src/index.css`: contienen estilos visuales y reglas generales de presentación.
- `src/assets/`: almacena recursos gráficos utilizados por los componentes.
- `public/`: contiene recursos estáticos que se utilizan directamente en la aplicación.
- `index.html`: archivo HTML de entrada de Vite.
- `package.json`: contiene las dependencias y los comandos disponibles para ejecutar y compilar el proyecto.
- `package-lock.json`: registra las versiones de las dependencias instaladas mediante npm.
- `vite.config.js`: contiene la configuración de Vite.
- `.gitignore`: excluye archivos y carpetas que no deben incorporarse al repositorio.

La estructura puede variar según los cambios realizados durante el desarrollo. Si se agregan o modifican archivos, esta sección deberá actualizarse para reflejar el repositorio real.

## 6. Requisitos para ejecutar la aplicación

Para ejecutar el proyecto localmente se necesita:

- Una instalación de Node.js compatible con la versión de Vite utilizada.
- npm, incluido habitualmente con Node.js.
- Git para clonar el repositorio y actualizar el código.
- Un editor de código, como Visual Studio Code.
- Un navegador web actualizado.

## 7. Instalación y ejecución

El repositorio del proyecto se encuentra en:

**GitHub:** https://github.com/Jona-edu0/App-Boletos-App

**Aplicación publicada:** https://jona-edu0.github.io/App-Boletos-App/

Según la estructura de carpetas utilizada actualmente, el frontend se encuentra dentro de la carpeta `boletos-app` del repositorio. Para descargar el proyecto y ejecutarlo desde una terminal, se pueden utilizar los siguientes comandos:

```bash
git clone https://github.com/Jona-edu0/App-Boletos-App.git
cd App-Boletos-App/boletos-app
npm install
npm run dev
```

El primer comando descarga el repositorio. El segundo entra en la carpeta que contiene la aplicación React + Vite. El tercer comando instala las dependencias y el cuarto inicia el servidor de desarrollo.

Al ejecutar `npm run dev`, la terminal mostrará la dirección local donde se puede abrir la aplicación en el navegador. Debe utilizarse la dirección que muestre la terminal.

**Nota:** si la carpeta del frontend se mueve a la raíz del repositorio, las instrucciones de navegación deberán actualizarse. Los comandos de instalación y ejecución deben realizarse desde la carpeta que contiene el `package.json` de la aplicación React + Vite.

## 8. Comandos disponibles

Los siguientes comandos corresponden a los scripts habituales de un proyecto Vite. Debe comprobarse que estén definidos en el `package.json` de la aplicación.

### Iniciar el entorno de desarrollo

```bash
npm run dev
```

Inicia el servidor local para consultar y probar la aplicación durante el desarrollo.

### Generar la versión de producción

```bash
npm run build
```

Compila el frontend y genera los archivos optimizados para su publicación. En una configuración estándar de Vite, el resultado se guarda en la carpeta `dist`.

### Revisar la versión compilada

```bash
npm run preview
```

Permite comprobar localmente la versión generada por el proceso de compilación antes de publicarla.

Estos comandos deben ejecutarse desde el directorio del frontend y utilizarse conforme a los scripts que estén configurados en el proyecto.

## 9. Organización del trabajo con Scrum

El proyecto se organiza mediante el marco de trabajo Scrum, con tres sprints planificados para distribuir y dar seguimiento a las actividades.

### Sprint 1. Estructura e identidad circense

Se centra en revisar la estructura del proyecto, la página principal, los estilos inspirados en el circo, el menú de navegación y el catálogo inicial de funciones.

### Sprint 2. Catálogo interactivo y selección de boletos

Se orienta a revisar la información de las funciones, los detalles de cada espectáculo, la selección de boletos y el cálculo del importe mostrado en el resumen de compra.

### Sprint 3. Validación, pruebas y publicación

Se enfoca en comprobar las validaciones, realizar pruebas del frontend, corregir errores, actualizar la documentación y verificar la publicación mediante GitHub Pages.

## 10. Gestión de tareas con Trello

Trello se utiliza para organizar las actividades del equipo y dar seguimiento a las tareas del Product Backlog y los Sprint Backlogs.

El tablero se divide en las siguientes listas:

- **Por hacer:** tareas seleccionadas que todavía no han comenzado.
- **En progreso:** tareas que están siendo realizadas.
- **En revisión o pruebas:** actividades que requieren comprobación o revisión.
- **Hecho:** tareas verificadas que cumplen sus criterios de aceptación.

Cada tarjeta puede incluir un identificador, título, descripción, criterios de aceptación, prioridad, estimación, responsable, sprint y enlace a la evidencia o al cambio correspondiente.

## 11. Trabajo colaborativo con GitHub

GitHub es el repositorio compartido del proyecto. Se utiliza para almacenar el código, registrar las contribuciones, revisar los cambios y conservar el historial de versiones.

El flujo de trabajo acordado consiste en:

1. Actualizar el repositorio local antes de comenzar una tarea.
2. Seleccionar una tarjeta de Trello y trabajar en la actividad asignada.
3. Crear una rama para una mejora o corrección cuando corresponda.
4. Guardar los cambios mediante commits descriptivos.
5. Compartir los cambios en GitHub.
6. Revisar e integrar las modificaciones, utilizando pull requests cuando sea posible.
7. Comprobar que la aplicación continúe funcionando después de integrar los cambios.

Cada integrante debe realizar contribuciones auténticas y comprobables. El historial de commits y las evidencias del tablero permiten relacionar las tareas planificadas con el trabajo efectuado.

## 12. Integrantes del equipo

**Nombre del equipo:** Circus Team.

| Integrante | Rol de Scrum |
|---|---|
| Jonathan Eduardo Lopez Leal | Equipo de Desarrollo |
| Oralia Fernanda Verdugo Camacho | Equipo de Desarrollo |
| Amelia Soledad Montoya Flores | Product Owner |
| Maria de Jesus Alfaro Quintero | Scrum Master |

Aunque cada integrante tiene responsabilidades específicas, todos deben participar en el desarrollo, la revisión y la integración del frontend.

## 13. Pruebas y verificación

Antes de entregar o publicar una versión del proyecto, se recomienda comprobar los siguientes aspectos:

- La página principal y la navegación cargan correctamente.
- El catálogo presenta la información esperada de las funciones.
- Los detalles corresponden con el espectáculo seleccionado.
- Los controles de selección de boletos responden correctamente.
- El importe total coincide con el precio y la cantidad seleccionada.
- Las validaciones muestran mensajes comprensibles.
- Los estilos, las imágenes y los recursos se cargan correctamente.
- La interfaz se mantiene legible en los tamaños de pantalla revisados.
- La versión compilada puede abrirse y utilizarse correctamente.
- La versión publicada funciona desde su enlace público.

Los resultados de las pruebas deberán documentarse de acuerdo con lo que el equipo haya comprobado realmente. Los errores que continúen pendientes deben registrarse como tales, sin presentarlos como corregidos.

## 14. Publicación en GitHub Pages

La aplicación se publicará mediante GitHub Pages una vez que el frontend y su configuración de Vite estén preparados para el despliegue.

Durante la publicación se deberá comprobar que las rutas, los recursos gráficos, los estilos y las interacciones funcionen correctamente. Si la aplicación se publica dentro de una ruta que incluye el nombre del repositorio, la propiedad `base` de Vite debe corresponder con esa ubicación.

**Repositorio:** https://github.com/Jona-edu0/App-Boletos-App

**Enlace público de la aplicación:** https://jona-edu0.github.io/App-Boletos-App/

El flujo de GitHub Actions compila y publica esta carpeta al actualizar `main`. Antes del primer despliegue, selecciona **Settings → Pages → Build and deployment → Source → GitHub Actions** en el repositorio. El resultado de cada publicación se puede consultar en la pestaña **Actions**, en el flujo **Deploy to GitHub Pages**.

## 15. Recursos de consulta

- React: https://es.react.dev/learn
- Vite: https://vite.dev/guide/
- Guía de publicación de Vite: https://vite.dev/guide/static-deploy.html
- GitHub Docs: https://docs.github.com/
- Trello: https://trello.com/

---

**Proyecto académico:** App Web de Venta de Boletos para Eventos de Circo.

**Equipo:** Circus Team.

**Tecnologías principales:** React, Vite, JavaScript y CSS.