# Introducción

Este repositorio corresponde a la actividad 3 de la materia Cliente y Servidor 3 de la Maestría en la UNIR en Dirección e Ingeniería en Sitios Web.
La aplicación corresponde a un buscador de películas que permite añadir a ciertas de ellas a tus favoritas.

# Estructura
1. La aplicación está construida usando PHP y JS distribuyendo responsabilidades en el Cliente y Servidor. 

## Patrón MVC
### Modelo
El directorio `Model` define dos archivos:
* El connectorDb que define la conexión a MySQL
* El Modelo `movieModelo` que define las propiedades de una película y los métodos para llamar todas la películas, añadir una nueva o eliminarla.

### Controlador
El Controlador define:

* Activar el CORS
* Sentencias if para definir la función dependiendo del Método HTTP que solicite el request.

### Vistas 
Esta aplicación tiene 2 vistas:

1. `index.php`.- El buscador de películas
1. `my-movies.php`.- Catalogo de películas favoritas

## Ajax
La aplicación define ciertas interacciones ajax utilizando jquery.

1. El buscador se apoya haciendo requests a la API Pública `https://omdbapi.com/`.
1. Al momento de añadir una película a favoritas se hace un request POST al controlador y se guarda en la base de datos local.
1. La vista `my-movies.php` hace una request GET al controlador y se obtiene los datos de la base de datos local.
1. En la vista `my-movies.php` se puede eliminar una tarjeta haciendo un request DELETE al controlador y se remueve de la base de datos local.

# Consideraciones.
## Base de Datos
Para correr el programa localmente, se necesita crear una base de datos llamadad `movies` y crear la tabla `favorite_movies`.

Para crear la tabla puedes usar el siguiente SQL:

```
CREATE TABLE favorite_movies (
id varchar(45)  NOT NULL,
poster VARCHAR(300) NOT NULL,
title VARCHAR(45) NOT NULL,
year VARCHAR(15),
PRIMARY KEY (`id`)
);
```
