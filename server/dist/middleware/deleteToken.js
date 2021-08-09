"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("../models/User.model");
User_model_1.UserSchema.methods.deleteToken = function (token, cb) {
    const user = this;
    user.update({ $unset: { token: 1 } }, function (err, user) {
        if (err)
            return cb(err);
        cb(null, user);
    });
};
//# sourceMappingURL=deleteToken.js.map