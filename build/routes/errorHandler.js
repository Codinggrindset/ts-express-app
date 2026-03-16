"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.issues.map((i) => i.message),
        });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
}
//# sourceMappingURL=errorHandler.js.map