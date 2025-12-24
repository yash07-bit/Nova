const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Change this line:
const passportLocalMongoose = require("passport-local-mongoose");
// Support both CJS and ESM default export shapes
const passportLocalMongoosePlugin =
  passportLocalMongoose && passportLocalMongoose.default
    ? passportLocalMongoose.default
    : passportLocalMongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// If the above still fails, try: UserSchema.plugin(passportLocalMongoose.default);
UserSchema.plugin(passportLocalMongoosePlugin);

module.exports = mongoose.model("User", UserSchema);
