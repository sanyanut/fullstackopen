const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://sanyanut:${password}@cluster0.cu3hgep.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(person.name, person.number)
          return mongoose.connection.close()
        })
      })
    })
    .catch((err) => console.log(err))
}

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')
      const person = new Person({
        name: name,
        number: number
      })
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      return person.save()
    })
    .then(() => {
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}