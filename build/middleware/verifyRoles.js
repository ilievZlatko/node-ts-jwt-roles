"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        /* @ts-ignore */
        if (!(req === null || req === void 0 ? void 0 : req.roles))
            return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        /* @ts-ignore */
        const result = Object.values(req.roles)
            /* @ts-ignore */
            .map((role) => rolesArray.includes(role))
            .find((val) => val === true);
        if (!result)
            return res.sendStatus(401);
        next();
    };
};
exports.default = verifyRoles;
