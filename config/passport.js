const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/User"); // Assuming you have a User model

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Assuming email is used as the username field
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
