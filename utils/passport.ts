import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import User from "../models/user.model";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: "http://localhost:8888/api/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
                console.log("Google OAuth triggered ✅");
                console.log("Google Profile:", profile);
				const email = profile.emails?.[0].value;
				let user = await User.findOne({ email });

				if (!user) {
					user = new User({
						fullName: profile.displayName,
						email,
						profilePicture: profile.photos?.[0].value || null,
						isVerify: true,
						oauth: [
							{
								providerName: "google",
								providerId: profile.id,
								email,
								fullName: profile.displayName,
								profilePicture: profile.photos?.[0].value || null,
							},
						],
					});
				} else {
					const isGoogleLinked = user?.oauth!.some(
						(provider: any) => provider.providerName === "google"
					);

					if (!isGoogleLinked) {
						user?.oauth!.push({
							providerName: "google",
							providerId: profile.id,
							email: profile.emails?.[0]?.value,
							fullName: profile.displayName,
							profilePicture: profile.photos?.[0]?.value,
						});
					}
				}

				await user.save();
                console.log("Lưu user vào database thành công.");
				return done(null, user);
			} catch (error) {
                console.error("Lỗi trong quá trình xác thực Google:", error)
				return done(error, null!);
			}
		}
	)
);

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			callbackURL: "http://localhost:8888/api/auth/github/callback",
			scope: ["user:email"],
		},
		async (accessToken:any, refreshToken:any, profile:any, done:any) => {
			try {
				const email = profile.emails?.[0].value;
				let user = await User.findOne({ email });

				if (!user) {
					user = new User({
						fullName: profile.displayName || profile.username,
						email,
						profilePicture: profile.photos?.[0].value || null,
						isVerify: true,
						oauth: [
							{
								providerName: "github",
								providerId: profile.id,
								email,
								fullName:
								profile.displayName || profile.username,
								profilePicture:
								profile.photos?.[0].value || null,
							},
						],
					});
				} else {
					const isGitHubLinked = user!.oauth!.some(
						(provider) => provider.providerName === "github"
					);

					if (!isGitHubLinked) {
						user!.oauth!.push({
							providerName: "github",
							providerId: profile.id,
							email,
							fullName: profile.displayName || profile.username,
							profilePicture: profile.photos?.[0].value || null,
						});
					}
				}
				await user.save();
				return done(null, user);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);
