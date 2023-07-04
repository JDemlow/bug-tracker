const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignedDeveloper: {
      type: String,
    },
    tags: {
      type: [String],
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
