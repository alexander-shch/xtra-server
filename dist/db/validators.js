"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = exports.email = void 0;
function email(value) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}
exports.email = email;
exports.Validators = {
    email: email,
};
