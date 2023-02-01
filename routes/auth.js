const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    successRedirect : "http://localhost:3000/"
  })
);

router.get("/login/success", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "loogged in success",
      user: req.user,
    //   cookies : req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failed to login",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});



module.exports = router;
