const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const sockets = require("./sockets");
const config = require("./config");

// Conexión con la base de datos
const { connection } = require("./config/db");
connection(); // la ejecutamos al inicio porque es esencial para que la aplicación funcione porque depende de la base de datos

/* 2. importo http para crear un servidor y le paso app y esto finalmente me va a retornar un servidor, es algo redundante porque express ya te retorna un servidor entonces ¿Por qué hay que hacer esto? Es básicamente el requerimiento para que yo pueda asignarle un listen y este me va a retornar una instancia y esa instancia será la que le pase a new Server(esa instancia) */
const server = http.createServer(app);

const httpServer = server.listen(config.port);

//1. creo un nuevo servidor de WebsocketServer y este me va a devolver un objecto el cual lo llamaremos io ya que así lo llama la documentación, io basicamente es la conexion que yo voy a tener con mis clientes, es decir, las multiples aplicaciones cliente como podrían ser aplicaciones mobiles o aplicaciones web, van a conectarse a mi servidor a través de este objecto io, el cual puede emitir eventos, recibir eventos y demas.
// Entonces con esto ya tengo un servidor básico de Websocket, pero este servidor básico de Websocket tiene que estar en el mismo servidor http que acabo de crear, es decir, tiene que estar como conectado, entonces para yo hacer eso tengo que pasarle aquí la aplicación http, entonces debería ir const io = new Server(app), pero la propia documentación indica que como express en si engloba un servidor http o es una aplicación que resume una aplicación http, pues es mucho mejor que nuevamente esta aplicación de express la transformemos a un modulo que no detiene por defecto que se llama http, básicamente como express es una aplicación que ya tiene su propia lógica yo no puedo pasarle directamente app, sino que tengo que pasarlo nuevamente por un servidor http o una clase http de NodeJS, entonces importo http
const io = new Server(httpServer);

/* RESUMEN: Primero tenemos la aplicación de express que ya tenemos configurado, lo paso a través de una función createServer de http, me retorna un servidor, luego hago que el servidor escuche en un puerto, en el puerto 5000 por ejemplo, por lo tanto, esa instancia que yo obtenga de ahí sabré que estará escuchando en el puerto 5000 entonces le paso ese servidor a la función que crea un Websocket Server, entonces ahora ese Websocket Server sabe que ese servidor es el servidor que finalmente va a servir el contenido de los Sockets */

console.log("listening on: http://localhost:" + config.port);

sockets(io); //  de esta forma el objeto io esta dentro del archivo sockets.js
