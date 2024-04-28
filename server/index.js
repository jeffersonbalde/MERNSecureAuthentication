const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser");

const UserRoutes = require("./routes/user.routes.js")

app.use(express.json());
app.use(express.urlencoded({extend: false}));
app.use(cookieParser());

app.use("/", UserRoutes)

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