const AdminModel = require("../models/admin.model");
const StudentModel = require("../../students/models/students.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register new admin
const registerAdmin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    let admin = await AdminModel.AdminRegistration.findOne({ userId });

    if (admin) {
      return res.status(400).json({ message: "Admin with same userID exists" });
    }

    if (password.length < 1) {
      return res.status(400).json({ message: "The password length is weak!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new AdminModel.AdminRegistration({
      userId,
      password: hashedPassword,
    });

    await admin.save();
    return res.status(201).json({ message: "Admin created successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Admin login
const loginAdmin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    let admin = await AdminModel.AdminRegistration.findOne({ userId });

    if (!admin) {
      return res.status(404).json({ message: "Admin with userId not found!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const payload = {
      admin: {
        id: admin.id,
        userId: admin.userId,
      },
    };

    const token = jwt.sign(payload, "Secret_Key", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get all the tagged assignments
const getTaggedAssignments = async (req, res) => {
  const admin = req.user.admin.userId;
  try {
    const assignment = await StudentModel.Students.find({ admin });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found!" });
    }
    return res.status(200).json({ assignment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// Accept assignments
const acceptAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    let assignments = await StudentModel.AssignmentStatus.findOne({
      taskId: assignmentId,
    });

    if (!assignments) {
      return res
        .status(404)
        .json({ message: "Given assignment id doesnot exists" });
    }
    assignments.status = "Accepted";

    await assignments.save();
    return res.status(200).json({ message: "Assignment status updated!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// Reject the assignments
const rejectAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    let assignments = await StudentModel.AssignmentStatus.findOne({
      taskId: assignmentId,
    });

    if (!assignments) {
      return res
        .status(404)
        .json({ message: "Given assignment id doesnot exists" });
    }
    assignments.status = "Rejected";

    await assignments.save();
    return res.status(200).json({ message: "Assignment status updated!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Google Auth

const googleAuthToken = async (req, res) => {
  let userId = req.user.email;
  let password = req.user.id;
  try {
    let admin = await AdminModel.AdminRegistration.findOne({ userId });
    if (!admin) {
      admin = new AdminModel.AdminRegistration({
        userId,
        password,
      });
      await admin.save();
    }
    const payload = {
      admin: {
        id: req.user.id,
        userId,
      },
    };
    const token = await jwt.sign(payload, "Secret_Key", {
      expiresIn: "1h",
    });
    res.send(token);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getTaggedAssignments,
  acceptAssignment,
  rejectAssignment,
  googleAuthToken,
};
