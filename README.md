1.- `npm i @babel/core @babel/cli @babel/node @babel/plugin-transform-runtime @babel/preset-env nodemon rimraf ncp -D`

2.- `npm i express express-fileupload morgan pg pg-hstore axios body-parser cookie-parser fs jimp dotenv`

3.- `npm i sequelize cors`

4.- `npm i concurrently -D`

Games API es una aplicación que permite obtener información de la API de juegos libres freetogame.com. Consiste en un BackEnd que maneja todas las peticiones y la base de datos en donde se aloja toda la información recopilada y de un FrontEnd que muestra información general sobre todos los juegos e información detallada de cada uno de los juegos que existen el el servidor.

Agradecemos a TOBS https://tobs.com.ar/ y a su CEO `Martín Alejandro` https://linkedin.com/in/mmednik por permitirnos trabajar en este proyecto.

Hemos diseñado el servidor con Node Js, Express y Sequelize como ORM (Object Relational Mapping). Como base de datos hemos seleccionado a PostgreSQL.

Para poder utilizar todas las funcionales de Ecmascript 6 con Node Js, utilizamos Babel como compilador de JavaScript, de esta forma obtenemos un código compatible con todos los navegadores.

Fueron definidas tres rutas principales:

1. `/games`: ruta que permite acceder a las peticiones HTTP get para obtener información inicialmente de la API de freegames.com y poder guardar todos los datos de los juegos en la base de datos “gamesapi”. Teniendo datos almacenados en la base de datos, todas las peticiones son dirigidas hacia la misma.

2. `/genres`: ruta que permitire identificar todos los géneros de juegos existentes y contabilizar cuantos juegos existen por género. Esta ruta permite filtrar la información de los juegos por sus respectivos géneros.

3. `/upload`: ruta que permite mostrar las imágenes descargadas, transformadas y guardadas en la carpeta img del servidor. Estas imágenes estarán disponibles para ser mostradas en la página principal de la aplicación.

La funcionalidad correspondiente a cada una de las rutas ha sido desarrollada en los controladores ubicados en la carpeta controllers (games.controllers, genres.controllers y upload.controllers):

• `games.controllers .getGames`: verifica si existe datos almacenados en la tabla “game” de la base de datos, en caso de no existir datos, realiza una petición GET a la API de freetogame.com (https://www.freetogame.com/api/games). Luego utiliza el módulo Jimp (https://www.npmjs.com/package/jimp) el cual es un manipulador de imágenes de JavaScript para cambiar el tamaño de la imagen al 50%, transformarla a blanco y negro y guardar la imagen transformada en la carpeta “src/img” del servidor. Adicionalmente determina la cantidad de juegos por género, guardando la información en la tabla “Genre” de la base de datos. En el caso de existir información almacenada en la tabla “Game” de la base de datos, devuelve la información correspondiente

• `games.controllers.getGamesbyId`: permite seleccionar la información de un juego en particular, esta información se utilizará para renderizar toda la información perteneciente al juego seleccionado en el navegador.

• `genres.controllers.getGenre`: Obtiene toda la información de la tabla “Genre” . Esta información permitirá filtrar por genero en la ruta principal de la aplicación.

• `upload.controllers.uploadThumbnailBW`: funcionalidad que permite obtener una ruta de acceso a los archivos de imágenes ubicadas en la carpeta img, de esta forma pueden ser mostradas en el navegador.

En el caso del Front, se utilizó una aplicación desarrollada con React Js (`npx create-react-app`) y Redux para el manejo de los estados de la aplicación. En el caso de Redux, se seleccionó `Redux-Ducks` ya que se considera una forma de modularizar el manejo de estados mas clara, entendible y agradable : https://github.com/erikras/ducks-modular-redux.

La aplicación contiene dos ventanas,

1. Una ventana principal en donde se muestran todos los juegos que se pueden obtener de forma gratis en la web freetogame.com. Estos juegos pueden ser filtrados por género y se mantiene un máximo de nueve juegos por pantalla en función de tener una aplicación liviana y no cargar todos los juegos a la vez en una sola pantalla, para esto se utilizó un modulo de paginación (https://www.npmjs.com/package/multiselect-react-dropdown).

2. Una ventana secundaria en donde se muestra toda la información ofrecida por la API para un juego en particular. A esta pantalla se puede acceder haciendo click sobre la tarjeta del juego del que se quiera obtener mayor información.

La distribución de las carpetas y archivos de client corresponde a una distribución clásica de una aplicación React, con los componentes Details, GameCard, GameCards, Home y MultiselectTypes.

Para los estilos se utilizó el módelo `styled-components` en la mayoría de los casos, salvo en módulos externos que ya están configurados para trabajar con el modelo de estilos clásico de CSS.

# gameapi
