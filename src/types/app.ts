import { UserRole } from "../schema/User";

type ApiSuccessResponse<T> = { success: true } & T;
type ApiFailResponse = { success: false; usrMsg: string; devMsg: string };
export type ApiResponse<T = {}> = ApiSuccessResponse<T> | ApiFailResponse;
export type AuthClaim = {
  iss: "app-name"; // issure
  exp: number; // expired time (unix time ex. 1610147472955)
  sub: "user-auth";
  iat: number; // issued at time (unix time)
  uid: string; // user id
  rol: UserRole;
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthClaim;
    }
  }
}
