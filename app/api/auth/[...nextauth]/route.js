import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "@utils/db";
import User from "@models/user";


const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB();

                // check if user already exists
                const userExisis = await User.findOne({ email: profile.email })

                // if not user not exists, create new one
                if (!userExisis) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replaceAll(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;

            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }

})

export { handler as GET, handler as POST }