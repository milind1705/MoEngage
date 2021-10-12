const Rating = require('../models/rating.model');
const Anime = require('../models/anime.model');
const User = require('../models/user.model')
module.exports.addRating = async (req, res) =>{
    //find the Anime
    const userId = req.payload.id;
    const animeId = req.params.animeId;
    //create a rating and comment
    const {rating, review} = req.body
    const newRating = new Rating({rating:rating, review:review, userId:userId, animeId:animeId});

     await newRating
        .save()
    //associate the rating with Anime
    let anime =await Anime.findByIdAndUpdate(animeId, {$push:{reviews:newRating._id}}, {new:true})
    return res.json(anime)
}

module.exports.deleteRating = (req, res) => {
    Rating.findByIdAndDelete({
        _id: req.params.id
    })
        .then(() => {
            res.status(200).json({message:"rating and comment successfuly deleted"})
        })
        .catch((err)=> {
            return res.status(400).json(err|| "something went wrong")
        })
}
   

