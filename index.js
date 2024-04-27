const express = require("express");
const mongoose = require("mongoose")
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world")
})

mongoose.connect("mongodb+srv://jeffersonbalde13:fsHKSH5dtGpBht2Y@cluster0.mrqsoi9.mongodb.net/Mern-Auth?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected to database");   

    app.listen("3000", () => {
        console.log("server is running on port 3000");
    })
})
.catch(() => {
    console.log("connection failed");
})