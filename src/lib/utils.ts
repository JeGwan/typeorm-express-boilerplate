import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserRole } from "../schema/User";
import jwt from "jsonwebtoken";
import { ApiResponse, AuthClaim } from "../types/app";

export const errorHandler = (res: Response, error: any) => {
  console.error(error);
  const usrMsg = error.usrMsg || "서버 내부 에러";
  const devMsg = error.devMsg || error.toString();
  res.send({ success: false, usrMsg, devMsg } as ApiResponse);
};

export const authChecker = (allowRoles?: UserRole[]) => {
  const check: RequestHandler = (req, res, next) => {
    try {
      // 인자가 없거나, 길이가 0이면 그냥 통과 시켜준다.
      if (!allowRoles?.length) return next();
      // 토큰을 가져온다.
      const token = req.headers.authorization?.split("Bearer ")[1];
      // 토큰이 없으면 바로 던져서 막아버리기.
      if (!token) throw "";
      const secret = process.env.APP_SECRET as string;
      const auth = jwt.verify(token, secret) as AuthClaim;
      req.auth = auth;

      // 어드민이면 무조건 통과
      if (auth.rol === UserRole.admin) return next();
      // 아니면 우리가 정의해준 롤에 해당 롤이 포함되는지 체크
      else if (allowRoles.some((role) => auth.rol === role)) return next();
      // 그것도 아니면 권한 없음.
      else throw "";
    } catch (error) {
      console.error(error);
      return errorHandler(res, { devMsg: "권한이 없습니다." });
    }
  };
  return check;
};
