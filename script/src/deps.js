"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIMEType = void 0;
var whatwg_mimetype_1 = require("whatwg-mimetype");
Object.defineProperty(exports, "MIMEType", { enumerable: true, get: function () { return __importDefault(whatwg_mimetype_1).default; } });
