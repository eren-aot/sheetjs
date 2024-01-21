import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { type GetServerSidePropsContext } from "next";
import { prisma } from "./db";
import { type NextAuthOptions, getServerSession, type DefaultSession } from "next-auth";
import { google } from 'googleapis';


export const Prisma = PrismaAdapter(prisma)



declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // name: string;
            // email: string;
            // image: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        // name: string;
        // email: string;
        // image: string;

    }
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token }) => {
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token?.email,
                },
            });

            if (db_user) {
                token.id = db_user.id;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;

            }
            return session;

        }
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: { params: { scope: SCOPES[0] } },
        }),
    ],
};

export const getAuthSession = () => {
    return getServerSession(authOptions)
}