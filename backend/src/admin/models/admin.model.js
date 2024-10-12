const mongoose = require("mongoose");

const AdminRegistrationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Enter the admin user id"],
      primaryKey: [true, "user id should be unique"],
      unique: true,
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

const AdminRegistration = mongoose.model(
  "AdminRegistration",
  AdminRegistrationSchema
);


module.exports = {
  AdminRegistration,
};
