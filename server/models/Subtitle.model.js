const mongoose = require("mongoose");
const constants = require("../constants.json");
const Subtitle = mongoose.Schema({
  subtitleNumber: {
    type: Number,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
  },
  // Contents: {
  //   type: [{ type: mongoose.Types.ObjectId, ref: "Content" }],
  // },
  // exercises: {
  //   type: [{ type: mongoose.Types.ObjectId, ref: "Exercises" }],
  // },
  subTitle_Content : {
    type : [   { subTitle_Content_id : {
      type : mongoose.Types.ObjectId,
      required : true
  },
  type : {
      type  : String,
      enum : [constants.content , constants.excercise],
      default : constants.content,
      required : true
  }
}],
    default:[]
  }
});

module.exports = mongoose.model("Subtitle", Subtitle);
