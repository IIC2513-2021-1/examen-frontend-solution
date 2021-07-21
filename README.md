# Examen frontend

Este proyecto fue construido con la herramienta [Create React App](https://create-react-app.dev/), para crear single page applications con React. Constituye una aplicación frontend con información sobre la carrera espacial de empresas privadas en 2021.

## Pre-requisitos para correr proyecto:
* Node.js (ojalá 12.x, pero también puede ser 10.x)
* [Yarn](https://yarnpkg.com)

## Setup proyecto

* Clonar repositorio
* `cd examen-frontend`
* (Opcional) Si usan `nvm`, cambiar a versión válida para el proyecto
  * `nvm use`
* Instalar dependencias:
  * `yarn install`

## Ejecutar aplicación

```sh
PORT=8000 yarn start
```
Este comando corre la aplicación en modo development en el puerto 8000. Alternativamente, es posible definir un archivo `.env.local` en la raíz del repositorio e incluir esta variable de ambiente ahí.

Fíjese en el archivo `src/config.js`. Utiliza la variable `REACT_APP_API_URL` para conectarse a la [API del examen](https://github.com/IIC2513-2021-1/examen-backend). De no estar presente esta variable, utiliza por defecto `http://localhost:3000`. Usted puede utilizar el valor mencionado en otro archivo de la siguiente forma:

```javascript
import config from '../config'; // Suponiendo que estamos un nivel dentro de src

console.log(config.apiUrl);
```

## Probar aplicación

Para verificar que todo está bien debe abrir [http://localhost:8000](http://localhost:800) para ver el resultado en el browser. Debiese ver el formulario de login del examen.

¡Listo! Ya está de condiciones de correr una single page application en el browser para desarrollar el examen.

¡Éxito!
