const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const auth = require("../middlewares/auth");
const passport = require("passport");

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.send(401);
};

router.post("/register", controller.registerAdmin);
router.post("/login", controller.loginAdmin);
router.get("/find/", auth, controller.getTaggedAssignments);
router.post("/accept/:id", auth, controller.acceptAssignment);
router.post("/reject/:id", auth, controller.rejectAssignment);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/redirected",
  passport.authenticate("google", {
    successRedirect: "/admin/success",
    failureRedirect: "/admin/failure",
  })
);
router.get("/failure", (req, res) => res.send(400));
router.get("/success", isLoggedIn, controller.googleAuthToken);

module.exports = router;
