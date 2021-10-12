const mongoose = require('mongoose');
const Anime = require('./anime.model');
const { ObjectId } = mongoose.Schema;
const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  anime:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Anime"
  }

});


// ratingSchema.statics.calcAverageRating =async function(animeId){
//   // const animeId = req.params.animeId;
//   console.log(animeId)
//   const stats = await this.aggregate([
//     {
//       $match: {anime: animeId}
//     },
//     {
//       $group: {
//         _id: '$anime',
//         nRating: {$sum : 1},
//         avgRating: {$avg: '$rating'}
//       }
//     }
//   ])
//   console.log(stats);
// const rates = await Anime.findByIdAndUpdate(animeId, {
//   numReviews: stats[0].nRating,
//   avgRating: stats[0].avgRating
//   })
//   console.log(animeId)
// console.log(rates)
// };

// ratingSchema.post('save', function(){

//   this.constructor.calcAverageRating(this.anime);
  
// })



module.exports = mongoose.model('Rating', ratingSchema);