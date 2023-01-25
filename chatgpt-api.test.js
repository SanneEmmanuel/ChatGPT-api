"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var dotenv_safe_1 = require("dotenv-safe");
var types = require("./types");
var chatgpt_api_1 = require("./chatgpt-api");
dotenv_safe_1.default.config();
var isCI = !!process.env.CI;
ava_1.default('ChatGPTAPI invalid session token', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.timeout(30 * 1000); // 30 seconds
                t.throws(function () { return new chatgpt_api_1.ChatGPTAPI({ sessionToken: null, clearanceToken: null }); }, {
                    message: 'ChatGPT invalid session token'
                });
                return [4 /*yield*/, t.throwsAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var chatgpt;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    chatgpt = new chatgpt_api_1.ChatGPTAPI({
                                        sessionToken: 'invalid',
                                        clearanceToken: 'invalid'
                                    });
                                    return [4 /*yield*/, chatgpt.initSession()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, {
                        instanceOf: types.ChatGPTError,
                        message: 'ChatGPT failed to refresh auth token. Error: Unauthorized'
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('ChatGPTAPI valid session token', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isCI) {
                    t.timeout(2 * 60 * 1000); // 2 minutes
                }
                t.notThrows(function () {
                    return new chatgpt_api_1.ChatGPTAPI({
                        sessionToken: 'fake valid session token',
                        clearanceToken: 'invalid'
                    });
                });
                return [4 /*yield*/, t.notThrowsAsync((function () { return __awaiter(void 0, void 0, void 0, function () {
                        var chatgpt, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    chatgpt = new chatgpt_api_1.ChatGPTAPI({
                                        sessionToken: process.env.SESSION_TOKEN,
                                        clearanceToken: process.env.CLEARANCE_TOKEN
                                    });
                                    if (!!isCI) return [3 /*break*/, 3];
                                    return [4 /*yield*/, chatgpt.initSession()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, chatgpt.sendMessage('test')];
                                case 2:
                                    response = _a.sent();
                                    console.log('chatgpt response', response);
                                    t.truthy(response);
                                    t.is(typeof response, 'string');
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })())];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
if (!isCI) {
    ava_1.default('ChatGPTAPI expired session token', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var expiredSessionToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t.timeout(30 * 1000); // 30 seconds
                    expiredSessionToken = process.env.TEST_EXPIRED_SESSION_TOKEN;
                    return [4 /*yield*/, t.throwsAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var chatgpt;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        chatgpt = new chatgpt_api_1.ChatGPTAPI({
                                            sessionToken: expiredSessionToken,
                                            clearanceToken: 'invalid'
                                        });
                                        return [4 /*yield*/, chatgpt.initSession()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, {
                            instanceOf: types.ChatGPTError,
                            message: 'ChatGPT failed to refresh auth token. Error: session token may have expired'
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
if (!isCI) {
    ava_1.default('ChatGPTAPI timeout', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t.timeout(30 * 1000); // 30 seconds
                    return [4 /*yield*/, t.throwsAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var chatgpt;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        chatgpt = new chatgpt_api_1.ChatGPTAPI({
                                            sessionToken: process.env.SESSION_TOKEN,
                                            clearanceToken: process.env.CLEARANCE_TOKEN
                                        });
                                        return [4 /*yield*/, chatgpt.sendMessage('test', {
                                                timeoutMs: 1
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, {
                            message: 'ChatGPT timed out waiting for response'
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('ChatGPTAPI abort', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t.timeout(30 * 1000); // 30 seconds
                    return [4 /*yield*/, t.throwsAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var chatgpt, abortController;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        chatgpt = new chatgpt_api_1.ChatGPTAPI({
                                            sessionToken: process.env.SESSION_TOKEN,
                                            clearanceToken: process.env.CLEARANCE_TOKEN
                                        });
                                        abortController = new AbortController();
                                        setTimeout(function () { return abortController.abort(new Error('testing abort')); }, 10);
                                        return [4 /*yield*/, chatgpt.sendMessage('test', {
                                                abortSignal: abortController.signal
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, {
                            message: 'testing abort'
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}

