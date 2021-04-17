const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config()


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


console.log(process.env.DB_USER, process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b9ncf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('error test', err)
  const productCollection = client.db("assignmentEleven").collection("assignment");
  // perform actions on the collection object
 console.log("database successfully done")
 
 app.post('/addProduct', (req, res) => {
 
  const newData = req.body;
  console.log("new data: ", newData);
  productCollection.insertOne(newData)
  .then(result => {
    console.log('inserted count', result.insertedCount)
    res.send(result.insertedCount > 0)
  })

})


app.get('/getProducts', (req, res) => {
   productCollection.find()
   .toArray((err, products) => {
     res.send(products)
   })
})


app.get('/getSkipping', (req, res) => {
  productCollection.find().skip(5).limit(5)
  .toArray((err, products) => {
    res.send(products)
  })
})



app.delete('/deleteProduct/:id', (req, res) =>{

  const id = ObjectID(req.params.id);
  console.log('delete text', id);
  productCollection.deleteOne({_id: id})
  .then((err, documents) => res.send({
    success: true
  }))
})




  
  })









app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 5000, () => {
  console.log("http://localhost:5000")
})