const express = require ('express')
const connectDB = require('./config/connectDB')


const app = express()

app.use(express.json())

app.use("/api/users", require('./Routes/user'))

connectDB()
//**********************************
//Create and Save a Record of a Model

const newPerson = new Person({
    name: "hichem",
    age: "32",
    favoriteFoods: ["pancakes", "pizza", "burritos"],
  });
  
  newPerson.save(function (err, data) {
    err ? console.log(err) : console.log(data);
  });
  
  //**********************************
  Create Many Records with model.create()
  
  const arrayOfPeople = [
    { name: "Slim", age: 27, favoriteFoods: ["kafteji", "mloukheya", "Sauce"] },
    { name: "Mouna", age: 25, favoriteFoods: ["Pasta", "Sauce", "burritos"] },
    {
      name: "Hichem",
      age: 31,
      favoriteFoods: ["Couscous", "mongo", "mloukheya", "burritos"],
    },
  ];
  
  Person.create(arrayOfPeople);
  
  const arrayOfMarys = [
    { name: "Mary", age: 27, favoriteFoods: ["kafteji", "mloukheya", "Sauce"] },
    { name: "Mary", age: 25, favoriteFoods: ["Pasta", "Sauce"] },
    {
      name: "Maary",
      age: 31,
      favoriteFoods: ["Couscous", "mongo", "mloukheya"],
    },
  ];
  
  Person.create(arrayOfMarys)
  
  //**********************************
  Use model.find() to Search Your Database
  
  Person.find(
    { $or: [{ name: "Hichem" }, { name: "Mouna" }] },
    function (err, data) {
      err ? console.log(err) : console.log(data);
    }
  );
  
  //**********************************
  Use model.findOne() to Return a Single Matching Document from Your Database
  
  Person.findOne({ favoriteFoods: "Sauce" }, function (err, data) {
    err ? console.log(err) : console.log(data);
  });
  
  //**********************************
  Use model.findById() to Search Your Database By _id
  
  Person.findById("6212201069f8e438d98ab304", function (err, data) {
    err ? console.log(err) : console.log(data);
  });
  
  //**********************************
  Perform Classic Updates by Running Find, Edit, then Save
  
  Person.findById("62121f3b3181d421417e7546", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      data.favoriteFoods.push("Humberguer");
      data.save();
      console.log(data);
    }
  });
  
  //**********************************
  Perform New Updates on a Document Using model.findOneAndUpdate()
  
  Person.findOneAndUpdate(
    { name: "Mouna" },
    { age: 20 },
    { new: true },
    function (err, data) {
      err ? console.log(err) : console.log(data);
    }
  );
  
  //**********************************
  Delete One Document Using model.findByIdAndRemove
  
  Person.findByIdAndRemove("62121f3b3181d421417e7546", function (err, data) {
    err ? console.log(err) : console.log(data);
  });
  
  **********************************
  MongoDB and Mongoose - Delete Many Documents with model.remove()
  
  Person.remove(
    {
      name: "Mary",
    },
    function (err, data) {
      err ? console.log(err) : console.log(data);
    }
  );
  
  //**********************************
  Chain Search Query Helpers to Narrow Search Results
  
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec(function (err, data) {
      err ? console.log(err) : console.log(data);
    });

const PORT = process.env.PORT || 7000
app.listen(PORT, err=>{
    err ? console.log(err)
        : console.log(`the server is running on http://localhost: ${PORT}`)
})