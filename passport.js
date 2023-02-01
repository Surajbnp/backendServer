const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const UserModel = require('./models/UserModel')
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const user = {
        email: profile.email,
        name: profile.displayName,
        user_id: profile.id,
        picture: profile.picture,
      };
      let isRegd = await UserModel.findOne({ email: profile.email });
      if (isRegd) {
      } else {
        let data = new UserModel(user);
        await data.save();
      }
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

