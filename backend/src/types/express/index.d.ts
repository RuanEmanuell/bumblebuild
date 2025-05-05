import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  export interface Request {
    usuario?: JwtPayload & {
      id: string;
      email: string;
      cargo: string;
    };
  }
}
