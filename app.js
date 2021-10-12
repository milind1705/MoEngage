require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const userRoute = require('./routes/user.routes')
const animeRoutes = require('./routes/anime.routes')
const ratingRoute = require('./routes/rating.routes');
const range = require('./range')
const app = express();

//initializing of mongoDb
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("open", (err) => {
  console.log(err || "connected to database...");
});

//middleware
app.use(range);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/user', userRoute)
 app.use('/anime', animeRoutes);
app.use('/rating', ratingRoute);
app.get('/', (req,res) => {
    res.send('welcome to Anime')
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})


