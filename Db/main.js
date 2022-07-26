const express=require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))

const create = require('./db')
const { default: mongoose } = require('mongoose')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
  
app.post('/',create.createNote)
app.get('/',create.getNotes)
app.get('/:id',create.getNoteById)
app.post('/:id',create.deleteNoteById)
app.post('/edit/:id',create.editNoteById)
url='mongodb+srv://[username]:[password]@cluster0.oll6q.mongodb.net/Empathymap?retryWrites=true&w=majority'
mongoose.Promise = global.Promise;
mongoose.connect(url)
.then(()=>{app.listen(5000)})
.catch(error => console.log(error.message))

