const { Schema, model } = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};

const MemberSchema = new Schema(
  {
    discordId: requiredString,
    guildId: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    username: requiredString,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Member", MemberSchema);
