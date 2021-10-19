const express = require("express");
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan  = require('morgan');
const helmet = require('helmet');

const userRouter = require("./routes/users")
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
dotenv.config();

const app = express();
mongoose.connect('mongodb+srv://realworld:$developer123@cluster0.x6fck.mongodb.net/realworld?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} , () => console.log("connect"));

// middleWare
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'))

app.use('/api/user' , userRouter);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute); ds
app.listen(8800 , () => {
    console.log("server is running onport 80800")
})