"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("../../users");
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("Google account has no email"), undefined);
        }
        // Check if a user already exists with this email
        let user = await users_1.User.findOne({ email });
        if (user) {
            // If user exists but no Google provider info, link the account
            if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
                console.log("🔗 Linked Google account to existing user:", email);
            }
        }
        else {
            // Create a new user if none found
            user = await users_1.User.create({
                name: profile.name,
                email: email
            });
            console.log("🆕 Created new Google user:", email);
        }
        done(null, user);
    }
    catch (err) {
        done(err, undefined);
    }
}));
// Serialize user to session
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
// Deserialize user from session
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passport_1.default;
//# sourceMappingURL=googleAuth.js.map