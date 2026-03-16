import { JwtPayload } from "jsonwebtoken";
export interface UserAuthToken extends JwtPayload {
    userId: string;
}
declare const router: import("express-serve-static-core").Router;
export { router };
//# sourceMappingURL=routers.d.ts.map