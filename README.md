
# Proyecto Trivia Interactiva con Ranking en Tiempo Real

Este proyecto es una aplicación web de trivia interactiva que permite a los usuarios responder preguntas y ver su puntaje en tiempo real. La aplicación está desarrollada utilizando **React.js**, **Next.js**, **Nest.js**, **WebSockets** y **PostgreSQL**.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

-   [Node.js](https://nodejs.org/) (Recomendado: v16 o superior)
-   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
-   [PostgreSQL](https://www.postgresql.org/) para la base de datos
-   [Nest.js](https://nestjs.com/) (si usas el backend)

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar las dependencias

Tanto el frontend como el backend tienen dependencias que deben ser instaladas por separado.

#### Frontend (React/Next.js)

1.  Navega al directorio del frontend:

```bash
cd frontend
```

2.  Instala las dependencias:

```bash
npm install # o si prefieres usar yarn yarn install
```

#### Backend (Nest.js)

1.  Navega al directorio del backend:

```bash
cd backend
```

2.  Instala las dependencias:

```bash
npm install # o si prefieres usar yarn yarn install
```

### 3. Configurar PostgreSQL

Crea una base de datos en PostgreSQL para almacenar las preguntas y los resultados. Si usas Docker, puedes ejecutar este comando:

```bash
docker run --name trivia-db -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=contraseña -e POSTGRES_DB=trivia -p 5432:5432 -d postgres
```

Recuerda cambiar las variables de entorno para poder correrlo en tu local

## Ejecutar la aplicación

### 1. Ejecutar el backend (Nest.js)

Desde el directorio del backend, ejecuta el siguiente comando para iniciar el servidor:

```bash
npm run start:dev # o si usas yarn yarn start:dev
```

El servidor backend estará disponible en `http://localhost:3000`.

### 2. Ejecutar el frontend (React/Next.js)

Desde el directorio del frontend, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
npm run dev # o si usas yarn yarn dev
```

El frontend estará disponible en `http://localhost:3001`.

## Explicación de los módulos

### 1. Frontend (React.js y Next.js)

#### **Componentes**

-   **`Dashboard`**: Muestra las preguntas y opciones para el juego de trivia. Los usuarios pueden responder y se muestra el puntaje en tiempo real. Al final del juego, se redirige al usuario al ranking.
-   **`AddQuestion`**: Permite a los administradores agregar nuevas preguntas al sistema. El formulario incluye campos para la categoría, el texto de la pregunta, las opciones y la respuesta correcta.
-   **`Ranking`**: Muestra los mejores puntajes obtenidos por los jugadores.

#### **Estado**

-   **`useState`**: Usado para manejar el estado de las preguntas, puntaje, la pregunta actual y los errores de carga.
-   **`useEffect`**: Usado para cargar las preguntas desde la API del backend al iniciar la aplicación.

#### **WebSockets**

El frontend se conecta a través de WebSockets para recibir actualizaciones en tiempo real (por ejemplo, cambios en el ranking o el estado del juego).

### 2. Backend (Nest.js)

#### **Módulos**

-   **`QuestionsModule`**: Módulo responsable de gestionar las preguntas, incluyendo la creación, obtención y almacenamiento de preguntas en la base de datos.
-   **`RankingModule`**: Módulo encargado de gestionar los puntajes de los jugadores, manteniendo el ranking en tiempo real.
-   **`SocketModule`**: Módulo que configura el servidor de WebSockets, permitiendo la comunicación en tiempo real entre el backend y el frontend.

#### **Servicios**

-   **`QuestionsService`**: Lógica para agregar, obtener y actualizar las preguntas.
-   **`RankingService`**: Lógica para gestionar los puntajes de los jugadores.
-   **`SocketService`**: Gestiona las conexiones de WebSocket y la transmisión de datos en tiempo real.

#### **Controladores**

-   **`QuestionsController`**: Maneja las peticiones HTTP para obtener y agregar preguntas.
-   **`RankingController`**: Maneja las peticiones HTTP para obtener el ranking de puntajes.
-   **`SocketController`**: Maneja las conexiones y mensajes a través de WebSockets.

### 3. WebSockets

Utilizamos WebSockets para actualizar en tiempo real el ranking de jugadores y el estado del juego. Esto permite a los jugadores ver su puntaje y el ranking de manera instantánea mientras juegan.
