const { mongoose } = require("../config/db");

const { Schema } = mongoose;

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true, // esto significa que cuando un dato nuevo es creado, se van a guardar dos propiedades mas, una propiedad llamada created_at el cual específica cuando fue creado el dato y updated_at el cual específica cuando fue la última vez que se actualizó
    }
);

const NoteModel = mongoose.model("notes", noteSchema);

module.exports = NoteModel;
