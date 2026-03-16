import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

const googleRoute = Router()

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        return res.sendStatus(401)
    }
    console.log(req.user)
    next()
}

googleRoute.get('/', passport.authenticate('google', {scope: ['email', 'profile']}))

googleRoute.get('/callback', passport.authenticate('google', {
    successRedirect: '/auth/google/protected',
    failureRedirect: '/auth/google/failure'
}))

googleRoute.get('/protected', isLoggedIn, (req: Request, res: Response) => {
    res.send(`Welcome to the protected route ${req.user.name}`)
});

googleRoute.get('/failure', (req: Request, res: Response) => {
    res.send('something went wrong')
})


googleRoute.get("/logout", (req: Request, res: Response) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to destroy session" });
      }

      res.clearCookie("connect.sid"); // default session cookie name
      res.json({ message: "Logged out successfully" });
    });
  });
});

export {googleRoute}
