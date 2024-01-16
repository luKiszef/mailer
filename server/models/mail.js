const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});

mailSchema.methods.getFormattedDate = function () {
  return this.date.toLocaleDateString();
};
const Mail = mongoose.model("messages", mailSchema);

module.exports = Mail;
