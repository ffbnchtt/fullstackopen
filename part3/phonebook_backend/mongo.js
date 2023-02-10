const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}>@cluster0.mggevaw.mongodb.net/people?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

Person
    .find({})
    .then(persons => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })

const person = new Person({
    "id": 5,
    "name": "test",
    "number": "123"
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})