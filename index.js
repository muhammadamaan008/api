require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const Person = require("./models/person");

const app = express()
const PORT = process.env.PORT || 3000

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
app.get('/', (req,res) => {
    res.send("Welcome to Nadra Api");
})

app.get('/persons/:cnicNo', async (req, res) => {
    const cnicNo = req.params.cnicNo;
    try {
      const person = await Person.findOne({ cnicNo: cnicNo });
      if (person) {
        res.json(person);
      } else {
        res.status(404).send("Person not found.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  });
  

app.get('/all-persons', async (req,res)=> {

    const persons = await Person.find();
  
    if (persons) {
      res.json(persons)
    } else {
      res.send("Something went wrong.");
    }
    
  });

//Adding a Single Person Data in DB
  app.post('/persons', async (req, res) => {
    try {
      const newPerson = new Person(req.body);
      const savedPerson = await newPerson.save();
      res.json(savedPerson);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  });
  
//Adding Multiple Person Data in DB
app.post('/persons', async (req, res) => {
    try {
      const persons = req.body;
      const result = await Person.insertMany(persons);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  });
  
// app.get('/add-person', async (req,res) => {
//     try {
//       await Person.insertMany([
//         {
//             "name": "Bilal Sharafat Ali",
//             "age": 29,
//             "bloodGroup": "O+",
//             "criminalStatus": true,
//             "address": "Kb Colony",
//             "phoneNo": 923164846229,
//             "cnicNo": 3520133868641,
//         },
//         {
//             "name": "Ibrar Sharafat Ali",
//             "age": 59,
//             "bloodGroup": "O+",
//             "criminalStatus": true,
//             "address": "Kb Colony",
//             "phoneNo": 923064846229,
//             "cnicNo": 3520133068641,
//         }
//       ]);
//       res.json({"Data":"Added"})
//     } catch (error) {
//       console.log("err", + error);
//     }
//   })

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('listening for requests ${PORT}');
    })
})