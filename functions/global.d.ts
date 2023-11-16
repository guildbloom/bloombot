import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

interface User {
  profile: {
    id: string;
    username: string;
    discriminator: string;
    email: string;
    accessToken: string;
  };
  firebaseToken: string;
}
