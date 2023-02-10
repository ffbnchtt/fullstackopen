import { set, connect, Schema, model, connection } from 'mongoose'

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}>@cluster0.mggevaw.mongodb.net/persons?retryWrites=true&w=majority`

set('strictQuery',false)
connect(url)

const noteSchema = new Schema({
  content: String,
  important: Boolean,
})

const Note = model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  connection.close()
})