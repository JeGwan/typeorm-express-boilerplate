import { Router, json, urlencoded, Request } from "express";
import { authChecker, errorHandler } from "../lib/utils";
import { User, UserRole } from "../schema/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthClaim } from "../types/app";
const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

// read many user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send({ success: true, users });
  } catch (error) {
    errorHandler(res, error);
  }
});

// signup user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) throw { usrMsg: "해당 email을 가진 회원이 존재합니다." };

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      email,
      password: hashedPassword,
      name,
    }).save();

    const claim: AuthClaim = {
      iss: "app-name",
      sub: "user-auth",
      iat: Date.now(),
      exp: Date.now() + 60 * 60 * 24, // 1 day expired
      uid: user?.id,
      rol: UserRole.user,
    };

    const token = jwt.sign(claim, process.env.APP_SECRET as string);

    res.send({ success: true, token });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get("/me", authChecker([UserRole.user]), async (req, res) => {
  try {
    const me = await User.findOne(req.auth?.uid);
    if (!me) throw { devMsg: "더 이상 존재하지 않는 유저입니다." };
    res.send({ success: true, me });
  } catch (error) {
    errorHandler(res, error);
  }
});

// read one user, 일종의 와일드 카드이므로 마지막에 위치해야 다른거 방해 안한다.
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne(req.params.id);
    if (!user) throw { usrMsg: "해당 회원이 존재하지 않습니다." };
    res.send({ success: true, user });
  } catch (error) {
    errorHandler(res, error);
  }
});
export default router;
