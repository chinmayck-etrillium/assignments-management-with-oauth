const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/students.controller");
const passport = require("passport");

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.send(401);
};

router.post("/register", controller.studentRegistration);
router.post("/login", controller.studentLogin);
router.post("/add-assignment", auth, controller.addAssignment);
router.get("/assignments", auth, controller.getAssignments);
router.get("/status/:id", auth, controller.assignmentStatus);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/redirected",
  passport.authenticate("google", {
    successRedirect: "/students/google/success",
    failureRedirect: "/students/google/failure",
  })
);
router.get("/google/failure", (req, res) => res.send("Failed"));
router.get("/google/success", isLoggedIn, controller.googleAuthToken);

module.exports = router;
