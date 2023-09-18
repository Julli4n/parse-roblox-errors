"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dntShim = __importStar(require("../_dnt.test_shims.js"));
const deps_js_1 = require("./deps.js");
const mod_js_1 = require("../mod.js");
const responseFromJson_js_1 = require("./utils/responseFromJson.js");
dntShim.Deno.test({
    name: "Parse errors from response",
    async fn() {
        (0, deps_js_1.assertEquals)(await (0, mod_js_1.parseBEDEV1Error)((0, responseFromJson_js_1.responseFromJSON)("Error")), [
            {
                message: "Error",
            },
        ], "Error as string returned");
        (0, deps_js_1.assertEquals)(await (0, mod_js_1.parseBEDEV1Error)((0, responseFromJson_js_1.responseFromJSON)({
            code: 0,
            message: "Error",
        })), [
            {
                code: 0,
                message: "Error",
            },
        ], "1 error object returned");
        (0, deps_js_1.assertEquals)(await (0, mod_js_1.parseBEDEV1Error)((0, responseFromJson_js_1.responseFromJSON)({
            errors: [{
                    code: 0,
                    message: "Error",
                    userFacingMessage: "User Facing",
                }],
        })), [
            {
                code: 0,
                message: "Error",
                userFacingMessage: "User Facing",
            },
        ], "Regular error arrays with userFacingMessage returned");
    },
});
