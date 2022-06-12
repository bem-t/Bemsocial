const express = require("express");   //create express, it require express
const app = express();      // create app
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer")
const path = require("path")

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/social');

app.use("/images", express.static(path.join(__dirname,"public/images")))
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "public/images");
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name)
    }
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file", (req, res)=>{
    try {
      return res.status(200).json("File uploaded successfully.");
    } catch (error) {
        console.log(err)
    }
}))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute)

app.listen(8800, ()=>{               //use app, indicate port
    console.log("backend is ready")
})