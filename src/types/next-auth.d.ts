// next-auth.d.ts (in root or types folder)


declare module "next-auth" {
    interface Session {
        user: {
            /** Existing fields */
            name?: string | null;
            email?: string | null;
            image?: string | null;

            /** Add your custom role */
            role?: string;
        };
    }
}
