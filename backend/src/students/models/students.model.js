const mongoose = require("mongoose");

const StudentRegistrationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Enter the user Id"],
      unique: [true, "user id should be unique"],
      primaryKey: true,
    },
    password: {
      type: String,
      required: [true, "Enter the password"],
    },
  },
  {
    timestamps: true,
  }
);

const StudentRegistration = mongoose.model(
  "StudentRegistration",
  StudentRegistrationSchema
);

const StudentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "StudentRegistration",
      required: [true, "Enter the user Id"],
    },
    task: {
      type: String,
      required: [true, "Enter the task name"],
    },
    admin: {
      type: String,
      required: [true, "Enter the desiginated admin"],
    },
  },
  {
    timestamps: true,
  }
);

const Students = mongoose.model("Students", StudentSchema);

const AssignmentStatusSchema = mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId, //_id of student schema
    ref: "StudentSchema",
    required: [true, "Enter the user Id"],
  },
  task: {
    type: String,
    required: [true, "Enter the task name"],
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const AssignmentStatus = mongoose.model(
  "AssignmentStatus",
  AssignmentStatusSchema
);

module.exports = {
  StudentRegistration,
  Students,
  AssignmentStatus,
};
