import { getToken } from "next-auth/jwt";

export default async (req: any, res: any) => {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret, raw: true });
    if (token) {
        res.json({ token });
    } else {
        res.status(401).end();
    }
};
