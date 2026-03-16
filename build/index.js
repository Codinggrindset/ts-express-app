"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = require("./routers");
const authentication_1 = __importDefault(require("./routes/authentication"));
require("./routes/authentication/googleAuth");
const passport_1 = __importDefault(require("passport"));
const googleRoutes_1 = require("./routes/authentication/googleRoutes");
const errorHandler_1 = require("./routes/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({ secret: 'cats' }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use('/', routers_1.router);
app.use('/auth', authentication_1.default);
app.use('/auth/google', googleRoutes_1.googleRoute);
app.use(errorHandler_1.errorHandler);
app.get('/home', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google');
});
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => { console.log('database connected'); })
    .catch(err => console.log('Connection error:', err));
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map