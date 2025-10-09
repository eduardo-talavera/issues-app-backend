# Issues App Guia de Ejecución

<br />

## Requerimientos mínimos
- Tener en ejecución el demonio de docker

<br />

#### Puede descargar docker desktop haciendo clic en el siguiente enlace: [descargar docker desktop.](https://www.docker.com/products/docker-desktop/)

<br />

## Pasos para la ejecución del proyecto backend 

<br />

#### Paso 1 configuración de variables de entorno: una vez hallas clonado el proyecto abrelo y renombra el archivo .env.example a .env, deberia quedar algo como lo siguiente...

```shell
FRONTEND_URL=http://localhost:5173
PORT=4000
MONGO_URI=mongodb://root:Y78gsjsfgt@mongo:27017/issues_db?authSource=admin
ACCESS_TOKEN_SECRET=alguna_clave_muy_secreta_access
REFRESH_TOKEN_SECRET=otra_clave_muy_secreta_refresh
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
NODE_ENV=development
CORS_STRATEGY=all_origins
#CORS_STRATEGY=whitelist #descomentaremos esta variable en un paso posterior
```

<br />

#### Paso 2 Ejecutar el siguiente comando para arrancar el servidor local.

```shell
make dev
```

#### El comando anterior ejecutara internamente el siguiente comando de docker `docker compose -f docker-compose-dev.yml up --build` lo que creara una instancia de base de datos en mongDB con el usuario root y la contraseña: Y78gsjsfgt, instalara las dependencias, arrancara el proyecto y lo expondra en localhost en el puerto 4000  👉 http://localhost:4000

<br />

#### Paso 3 ejecución de request seed para aprovisionar la base de datos local con datos de prueba: ejecute la siguiente solicitud de tipo POST en una herramienta de solicitudes http como [Postman](https://www.postman.com/), [Imsomnia](https://insomnia.rest/download) o Thunder client para VSCode.

```http
POST http://localhost:4000/seed
```

#### Si todo salio correcto obtendremos la siguiente respuesta en formato json...

```json
{
    "message": "Base de datos reseteada y poblada correctamente",
    "usersCount": 13,
    "issuesCount": 100
}
```

#### Esto creara tickets y usuarios de prueba incluidos los que continuación se muestran, que podras usar para hacer tus pruebas

```ts
    const testUser1 = {
        name: 'Usuario Prueba a',
        email: 'usuario.prueba_a@mail.com',
        password: 'password123'
    }

    const testUser2 = {
        name: 'Usuario Prueba b',
        email: 'usuario.prueba_b@mail.com',
        password: 'password_abc'
    }

    const testUser3 = {
        name: 'Usuario Prueba c',
        email: 'usuario.prueba_c@mail.com',
        password: 'password.$&'
    }
```

<br />

#### Paso 4 Comente la variable `CORS_STRATEGY=all_origins` y descomente `CORS_STRATEGY=whitelist`, esto es necesario dado que se requiere una configuración de cors especifica para la estrategia de sesion utilizada en el proyecto. Su archivo de variables deberia verse algo asi...

```shell
FRONTEND_URL=http://localhost:5173
PORT=4000
MONGO_URI=mongodb://root:Y78gsjsfgt@mongo:27017/issues_db?authSource=admin
ACCESS_TOKEN_SECRET=alguna_clave_muy_secreta_access
REFRESH_TOKEN_SECRET=otra_clave_muy_secreta_refresh
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
NODE_ENV=development
#CORS_STRATEGY=all_origins
CORS_STRATEGY=whitelist
```

<br />

#### Paso 5 a continuación detenga el servidor backend con la combinacion de teclas ctrl + c y vuelva a arrancarlo con `make dev`.

<br />

## Listo 🎉 🎊 con esto ya hemos configurado el servidor backend y tenemos lo necesario para arrancar con el cliente frontend.

<br />

### Antes de que pasemos al frontend dejo los endpoints disponibles en el API...

<br />


#### `Autenticación`
```shell
## Inicio de sesión
METHOD: POST 
ENDPOINT: /auth/login
BODY: { "email": "email.test@mail.com", "password": "password123" }

## Registro de usuarios
METHOD: POST 
ENDPOINT: /auth/register
BODY: { "email": "email.test@mail.com", "password": "password123" }

# Para refrescar el token
METHOD: POST 
ENDPOINT: /auth/refresh
COOKIES:  "refreshToken": "****************************************" 

# Cerrar sesión
METHOD: POST 
ENDPOINT: /auth/logout
COOKIES:  "refreshToken": "****************************************" 
```

<br />

#### `Issues`
```shell
## Creación de issue
METHOD: POST 
ENDPOINT: /issues
BODY: { 
  "title": "some title", 
  "description": "some description",
  "priority": "medium", 
  "state": "open",
}

## Actualización de issue
METHOD: PUT
ENDPOINT: /issues
PARAMS: :issueId
BODY: { 
  "title": "some title", 
  "description": "some description",
  "priority": "medium", 
  "state": "open",
}

## Actualiza el estado de un issue dado su id
METHOD: PUT
ENDPOINT: /issues
PARAMS: :issueId
BODY: { 
  "state": "in_progress", 
}

## Obtiene los issues aplicando filtros
METHOD: GET
ENDPOINT: /issues
QUERY_PARAMS: ?search=&state=&priority=&page=&limit

# Obtiene un issue por su id
METHOD: GET
ENDPOINT: /issues
PARAMS:  :issueId

# Borra un issue dado su id
METHOD: DELETE
ENDPOINT: /issues
PARAMS: :issueId
```

<br />

#### Para arrancar las pruebas automatizadas puede ejecutar el comando `npm run test` y para ejecurarlos con umbral de cobertura ejecute `npm run test:coverage`

<br />

## Pasos para la configuración del proyecto frontend: 

<br />

[Haz clic aqui, para redirigir al repositorio frontend con los pasos a seguir](https://github.com/eduardo-talavera/issues-app-frontend)

