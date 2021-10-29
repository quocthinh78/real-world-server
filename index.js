const express = require("express");
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan  = require('morgan');
const helmet = require('helmet');
const multer = require("multer");
const path = require("path")
const userRouter = require("./routes/users")
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
dotenv.config();

const app = express();
mongoose.connect('mongodb+srv://realworld:$developer123@cluster0.x6fck.mongodb.net/realworld?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} , () => console.log("connect"));

app.use("/images", express.static(path.join(__dirname, "public/images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null,req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
// middleWare
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'))

app.use('/api/user' , userRouter);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute); 
app.listen(8800 , () => {
    console.log("server is running onport 80800")
})