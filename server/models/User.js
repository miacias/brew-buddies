const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      min: [8, 'must be at least 8 characters'],
      max: [25, 'must be less than 25 characters']
    },
    postalCode: {
        type: String,
        required: false,
        trim: true
    },
    pronouns: {
        type: String,
        enum: ['She/Her', 'He/Him', 'They/Them', 'Other', 'Prefer not to say'],
        required: false
    },
    profilePic: {
        type: String,
        required: false,
    },
    intro: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 250,
        trim: true
    },
    birthday: {
        type: Date,
        required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    favBreweries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Brewery",
        required: false
      },
    ],
    wishBreweries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Brewery",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Schemas will be User and Review and Brewery
//Saved-Breweries and Friends will all be added as arrays on the User

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;