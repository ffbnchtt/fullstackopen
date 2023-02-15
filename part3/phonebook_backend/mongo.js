const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb://phonebook:${password}@ac-jvttjzb-shard-00-00.cfo0olc.mongodb.net:27017,ac-jvttjzb-shard-00-01.cfo0olc.mongodb.net:27017,ac-jvttjzb-shard-00-02.cfo0olc.mongodb.net:27017/?ssl=true&replicaSet=atlas-8ewk2f-shard-0&authSource=admin&retryWrites=true&w=majority`

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
        persons.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

const person = new Person({
    "id": 6,
    "name": process.argv[3],
    "number": process.argv[4]
})

person.save().then(person => {
    console.log('person saved! ', person)
    mongoose.connection.close()
})

person.update().then(person => {
    console.log(person)
})