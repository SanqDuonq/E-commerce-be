import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import authServices from '../services/auth.services';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:8888/api/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken,refreshToken, profile,done) => {
            try {
                console.log("Google profile", profile)
				const user = await authServices.createUserGoogle(profile);
				return done(null, user);
			} catch (error) {
				return done(error, null!);
			}
        }
    )
)

