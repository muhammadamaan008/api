require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const Person = require("./models/person");

const app = express()
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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

//Get Data of Specific Users with CNIC
app.get('/person/:cnicNo', async (req, res) => {
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
  
//Get Data of All Persons
app.get('/all-persons', async (req,res)=> {

    const persons = await Person.find();
  
    if (persons) {
      res.json(persons)
    } else {
      res.send("Something went wrong.");
    }
    
  });

//Adding a Single Person Data in DB
  app.post('/person', async (req, res) => {
    try {
      const newPerson = new Person(req.body);
      const savedPerson = await newPerson.save();
      res.json(savedPerson);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  });

//Update Specific User using CNIC
app.put('/update-person/:cnic', async (req, res) => {
    const cnic = req.params.cnic;
    try {
      const person = await Person.findOne({ cnicNo: cnic });
      if (!person) {
        return res.status(404).send("Person not found.");
      }
      const updatedPerson = await Person.findOneAndUpdate(
        { cnicNo: cnic },
        req.body,
        { new: true }
      );
      res.json(updatedPerson);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  });

  
  //Delete Specific User using CNIC
  app.delete('/delete-person/:cnic', async (req, res) => {
    const cnic = req.params.cnic;
    try {
      const deletedPerson = await Person.findOneAndDelete({ cnicNo: cnic });
      if (!deletedPerson) {
        return res.status(404).send("Person not found.");
      }
      res.json(deletedPerson);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  });

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('listening for requests ${PORT}');
    })
})