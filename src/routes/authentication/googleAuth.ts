import passport, { use } from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../../users";
import { generateAccessToken } from "../../auth";



dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile: Profile, done) => {
       try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google account has no email"), undefined);
        }

        // Check if a user already exists with this email
        let user = await User.findOne({ email });

        if (user) {
          // If user exists but no Google provider info, link the account
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
            console.log("🔗 Linked Google account to existing user:", email);
          }
        } else {
          // Create a new user if none found
      user = await User.create({
      name: profile.name,
      email: email
    });
          console.log("🆕 Created new Google user:", email);
        }

        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;