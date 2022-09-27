"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUrlEnum = exports.RequestTypeEnum = void 0;
var RequestTypeEnum;
(function (RequestTypeEnum) {
    RequestTypeEnum["GET"] = "get";
    RequestTypeEnum["POST"] = "post";
})(RequestTypeEnum = exports.RequestTypeEnum || (exports.RequestTypeEnum = {}));
var BaseUrlEnum;
(function (BaseUrlEnum) {
    BaseUrlEnum["SANDBOX_DEFAULT_API_BASE"] = "https://api-sandbox.coingate.com";
    BaseUrlEnum["DEFAULT_API_BASE"] = "https://api.coingate.com";
})(BaseUrlEnum = exports.BaseUrlEnum || (exports.BaseUrlEnum = {}));
