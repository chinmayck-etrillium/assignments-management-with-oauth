const StudentModel = require("../models/students.model");
const AdminModel = require("../../admin/models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

// Register a new student as a user
const studentRegistration = async (req, res) => {
  const { userId, password } = req.body;
  try {
    let user = await StudentModel.StudentRegistration.findOne({ userId });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with the same username exists!" });
    }
    if (password.length < 1) {
      return res.status(400).json({ message: "The password length is weak!" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new StudentModel.StudentRegistration({
      userId,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: "New student registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Student login
const studentLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user = await StudentModel.StudentRegistration.findOne({ userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Student not registered with the system!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const payload = {
      user: {
        id: user.id,
        userId: user.userId,
      },
    };

    const token = jwt.sign(payload, "Secret_Key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// Add assignment
const addAssignment = async (req, res) => {
  const { task, admin } = req.body;
  let userId = req.user.user.userId;
  let user = await StudentModel.StudentRegistration.findOne({ userId });
  let isAdmin = await AdminModel.AdminRegistration.findOne({ userId: admin });

  if (!user) {
    return res.status(404).json({ message: "Not found!" });
  }
  console.log(isAdmin);

  if (!isAdmin) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    if (req.user) {
      const assignment = {
        userId: user.userId,
        task: task,
        admin: admin,
      };

      const student = await StudentModel.Students.create(assignment);
      const { _id } = student;
      const assignment_upload = { taskId: _id, task };
      const assignmentStatus = await StudentModel.AssignmentStatus.create(
        assignment_upload
      );
      return res.status(201).json({ student, assignmentStatus });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

//Get assignments for respective students
const getAssignments = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    let user = await StudentModel.Students.find({ userId });
    if (!user) {
      return res.status(404).json({ message: "Not Found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Check assigment status
const assignmentStatus = async (req, res) => {
  const taskId = req.params["id"];
  try {
    const userId = req.user.user.userId;
    let user = await StudentModel.Students.find({ userId });
    let assignment = await StudentModel.AssignmentStatus.findOne({ taskId });

    if (!user) {
      return res.status(404).json({ message: "Not Found!" });
    }

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Assignment with the current taskId not found!" });
    }
    assignment_status = assignment.status;
    return res.status(200).json({ assignment_status });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

//Google Auth
const googleAuthToken = async (req, res) => {
  const userId = req.user.email;
  const password = req.user.id;
  try {
    let user = await StudentModel.StudentRegistration.findOne({ userId });

    if (!user) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new StudentModel.StudentRegistration({
        userId,
        password: hashedPassword,
      });

      await user.save();
    }

    const payload = {
      user: {
        id: req.user.id,
        userId: userId,
      },
    };
    const token = jwt.sign(payload, "Secret_Key", {
      expiresIn: "1h",
    });

    return res.send(token);
  } catch (error) {
    return res.send(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  studentRegistration,
  studentLogin,
  addAssignment,
  getAssignments,
  assignmentStatus,
  googleAuthToken,
};
