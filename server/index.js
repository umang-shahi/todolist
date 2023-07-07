const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require('cors');

const app = express();


app.use(express.json());


const todoItemRoute = require("./routes/todoItems");

const PORT = process.env.PORT || 5500;

app.use(cors());

mongoose.connect(process.env.DB_CONNECT)
.then(()=>console.log("Database Connected"))
.catch(err => console.log(err))



app.use("/", todoItemRoute);


app.listen(PORT,()=> {

console.log(`Server is running at: http://localhost:${PORT}`);
}
);
