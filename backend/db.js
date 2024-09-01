const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Expense Sub-Schema
const expenseSchema = new Schema({
  expenseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   splitBetween: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User", // Reference to User model
  //       required: true,
  //     },
  //   ],
});

// Group Schema
const groupSchema = new Schema({
  groupID: { type: String },
  groupName: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
    },
  ],
  expenses: [expenseSchema],
});

const Group = mongoose.model("Group", groupSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Group };
