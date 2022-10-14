const express = require('express')
const app = express()
const bodyarser = require('body-parser')
const cors = require('cors')

const classes = require('./routes/classesRouts')
const students = require('./routes/studentsRouts')
const sequelize = require('./models/index.js')

app.use(bodyarser.json())
app.use(cors())

app.use('/classes', classes)
app.use('/students', students)

sequelize.Sequelize.sync().then(result => {
    console.log('connected!');
}).catch(e => {
    console.log(e);
})

app.get('/', (req, res) => {
    res.send('<h1>wolcome to the homepage!</h1>')
})

app.listen(8080)
