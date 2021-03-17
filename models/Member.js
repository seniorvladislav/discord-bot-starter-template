const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const MemberSchema = new Schema({
  guildId: reqString,
  discordId: reqString,
  username: reqString,
  balance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Member", MemberSchema);
