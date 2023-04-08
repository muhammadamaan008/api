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

app.get('/persons', async (req,res)=> {

    const persons = await Person.find();
  
    if (persons) {
      res.json(persons)
    } else {
      res.send("Something went wrong.");
    }
    
  });

app.get('/add-person', async (req,res) => {
    try {
      await Person.insertMany([
        {
            "name": "Bilal Sharafat Ali",
            "age": 29,
            "bloodGroup": "O+",
            "criminalStatus": true,
            "address": "Kb Colony",
            "phoneNo": 923164846229,
            "cnicNo": 3520133868641,
        },
        {
            "name": "Ibrar Sharafat Ali",
            "age": 59,
            "bloodGroup": "O+",
            "criminalStatus": true,
            "address": "Kb Colony",
            "phoneNo": 923064846229,
            "cnicNo": 3520133068641,
        }
      ]);
      res.json({"Data":"Added"})
    } catch (error) {
      console.log("err", + error);
    }
  })

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('listening for requests ${PORT}');
    })
})