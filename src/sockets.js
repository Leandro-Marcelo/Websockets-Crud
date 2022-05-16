// Aquí es donde vamos a estar utilizando las conexiones y vamos a escuchar eventos de Websockets, pero primero de alguna forma tengo que utilizar la conexión que había definido en index.js (el io) y pasarselo a esta función que estoy exportando

const NoteModel = require("./models/note");

function sockets(io) {
    io.on("connection", (socket) => {
        // Cuando el cliente (cada ventana de navegador es un cliente) se conecta a nuestra aplicación este recibe un socket (por eso que solamente entre ellos pueden enviarse datos en tiempo real) , entonces este socket que recibo aquí en el backend es el que se conecta con ese socket del cliente y es que utilizo en las demas aplicaciones para crear un Map, un Set o un arreglo donde estan los usuarios conectados el cual guardo junto al id del socket (socket.id) ya que como mencionamos este socket es único y está conectado con un cliente. Ahora si nos fijamos en el evento de newnote, si nosotros pusieramos socket.emit("server:newnote", savedNote) esto lo que haría es enviarle esa nota nueva tan sólo a la ventana que ha emitido el evento/cliente, si nosotros quisieramos emitirlo hacía todos los clientes que esten conectados en mi aplicación, hay otro objeto llamado io el cual tambien puede emitir eventos, pero este lo emite a todas las ventanas/clientes conectad@s.
        console.log("nuevo socket connectado:", socket.id);

        const emitNotes = async () => {
            const notes = await NoteModel.find();
            io.emit("server:loadnotes", notes); // Se vuelve complicado para una aplicación de Websockets el nombrar los eventos, porque aveces no sabemos si un evento es del backend o es del frontend ya que como ambos pueden emitir eventos y escuchar eventos, entonces es buena idea tener una convención al momento de nombrar estos eventos, por lo tanto, cuando nosotros estamos escuchando o emitiendo este evento loadnotes, sería bueno indicarle que el que esta emitiendo este evento es el servidor, de esta forma en el lado del frontend =>
            /* Ademas me permite poder llamar al evento de la misma forma, por ejemplo, en el evento de abajo ambos eventos se llaman newnote, pero yo ya sé que el primero viene del cliente donde esta creando la nota a través del formulario y yo agarró esa información, la creo en la base de datos y retorno ese nueva nota ya creada */
        };
        emitNotes();

        //  esto se leería como: escucha el evento que viene del cliente llamado newnote
        socket.on("client:newnote", async (data) => {
            const newNote = new NoteModel(data);
            const savedNote = await newNote.save(); // tambien podemos usar create
            io.emit("server:newnote", savedNote);
        });

        socket.on("client:deletenote", async (noteId) => {
            await NoteModel.findByIdAndDelete(noteId);
            emitNotes();
        });

        socket.on("client:getnote", async (noteId) => {
            const note = await NoteModel.findById(noteId);
            socket.emit("server:selectednote", note);
        });

        socket.on("client:updatenote", async (updatedNote) => {
            await NoteModel.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description,
            });
            emitNotes();
        });

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
    });
}

module.exports = sockets;
