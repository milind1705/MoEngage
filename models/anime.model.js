const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trailerUrl: {
      type: String,
      trim:true
    },
    genrs: {
      type: String,
      enum:['Shonen','Shoujo','Seinen','Josei', 'Fantasy', 'Action', 'Comedy', "drama", "dark fantacy"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seasonYear: {
      type: Number,
      required: true,
    },
    NoOfEpisode: {
      type: Number,
      required: true,
    },
   
    reviews:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    }],
    // avgRating:{
    //     type: Number,
    //     required:true,
    //     default:4.5,
    //     min: 1,
    //     max: 5

    // },
    // numReviews: {
    //     type: Number,
    //     reuiered: true,
    //     default:0
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anime", animeSchema);
