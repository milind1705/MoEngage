const Anime = require("../models/anime.model");
const User = require("../models/user.model")

module.exports.create = (req, res) => {
  const {name, genrs, description, trailerUrl, seasonYear, NoOfEpisode} = req.body;
  const userId = req.payload.id;
  -
  Anime.findOne({name:name}).then((anime)=>{
    if(anime){
      return res.status(400).json({message:"This Anime is alreday exists"})
    }
  const newAnime = new Anime({userId, name, genrs, description, trailerUrl, seasonYear, NoOfEpisode} );
  newAnime
    .save()
    .then((data) => {

      res.status(200).json({
        data:data,
        error:null,
        message:"Anime saved succesfully"
      });
    })
    .catch((err) => {
      return res.status(400).json({
        data:null,
        error: err.message,
        message: "something went wrong"
      });
    });
  })
  
};

module.exports.getAll = (req, res) => {
  Anime.find()
    .then((data) => {
      res.status(200).json({data:data,
        error:null,
        message:"Data fetched succesfully" });
    })
    .catch((error) => {
      return res.status(400).json({
        data:null,
        error: err.message,
        message: "something went wrong"
      });
    });
};

module.exports.getOne = (req, res) => {
    Anime.findById({
    _id: req.params.id,
  }).populate("reviews")
    .then((data) => {
      res.status(200).json({
        data:data,
        error:null,
        message:"Data fetched succesfully"
      });
    })
    .catch((err) => {
      return res.status(400).json({
        data:null,
        error: err.message,
        message: "something went wrong"
      });
    });
};

module.exports.update =async (req, res) => {
  try{
    const id = req.params.id;
    const userId = req.payload.id;
    const user = await User.findById(userId)
    const anime = await Anime.findById(id)
    if(user.id==anime.userId){
        const updated= await Anime.findByIdAndUpdate(id, req.body, {new: true})
        res.json({ message: updated });
    }else{
        res.json("anime doesnt belong to you to update")
    }

    
} catch(err){
    console.log(err)
}
}

module.exports.delete = (req, res) => {
  Anime.findByIdAndDelete({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        message:"Anime deleted"
      });
    })
    .catch((err) => {
      res.status(400).json({
        data:null,
        error: err.message,
        message: "something went wrong"
      });
    });
};
