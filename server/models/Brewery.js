const { Schema, model } = require("mongoose");


const brewerySchema = new Schema(
  {
    breweryName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    breweryId: {
      //Pull ID from API call
      type: String,
      required: true,
    },
    breweryAddress: {
      //Do we need to breakup address into its components
      type: String,
      required: true,
      trim: true,
    },
    breweryWebsite: {
      type: String,
      required: false,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


brewerySchema.virtual('avgRating').get(function () {
    if(this.reviews.length){
        let ratingSum = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            ratingSum += this.reviews[i];
        }
        return ((ratingSum / reviews.length).toFixed(1));;
    } else {
        return null;
    }
});


brewerySchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
});


const Brewery = model("Brewery", brewerySchema);


module.exports = Brewery;

//Schemas will be User and Review and Brewery
//Saved-Breweries and Friends will all be added as arrays on the User
