"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ChatGPTAPI = void 0;
var expiry_map_1 = require("expiry-map");
var p_timeout_1 = require("p-timeout");
var uuid_1 = require("uuid");
var types = require("./types");
var abstract_chatgpt_api_1 = require("./abstract-chatgpt-api");
var fetch_1 = require("./fetch");
var fetch_sse_1 = require("./fetch-sse");
var utils_1 = require("./utils");
var KEY_ACCESS_TOKEN = 'accessToken';
var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36';
var ChatGPTAPI = /** @class */ (function (_super) {
    __extends(ChatGPTAPI, _super);
    /**
     * Creates a new client wrapper around the unofficial ChatGPT REST API.
     *
     * Note that your IP address and `userAgent` must match the same values that you used
     * to obtain your `clearanceToken`.
     *
     * @param opts.sessionToken = **Required** OpenAI session token which can be found in a valid session's cookies (see readme for instructions)
     * @param opts.clearanceToken = **Required** Cloudflare `cf_clearance` cookie value (see readme for instructions)
     * @param apiBaseUrl - Optional override; the base URL for ChatGPT webapp's API (`/api`)
     * @param backendApiBaseUrl - Optional override; the base URL for the ChatGPT backend API (`/backend-api`)
     * @param userAgent - Optional override; the `user-agent` header to use with ChatGPT requests
     * @param accessTokenTTL - Optional override; how long in milliseconds access tokens should last before being forcefully refreshed
     * @param accessToken - Optional default access token if you already have a valid one generated
     * @param heaaders - Optional additional HTTP headers to be added to each `fetch` request
     * @param debug - Optional enables logging debugging into to stdout
     */
    function ChatGPTAPI(opts) {
        var _this = _super.call(this) || this;
        _this._user = null;
        var sessionToken = opts.sessionToken, clearanceToken = opts.clearanceToken, _a = opts.markdown, markdown = _a === void 0 ? true : _a, _b = opts.apiBaseUrl, apiBaseUrl = _b === void 0 ? 'https://chat.openai.com/api' : _b, _c = opts.backendApiBaseUrl, backendApiBaseUrl = _c === void 0 ? 'https://chat.openai.com/backend-api' : _c, _d = opts.userAgent, userAgent = _d === void 0 ? USER_AGENT : _d, _e = opts.accessTokenTTL, accessTokenTTL = _e === void 0 ? 60 * 60000 : _e, // 1 hour
        accessToken = opts.accessToken, headers = opts.headers, _f = opts.debug, debug = _f === void 0 ? false : _f;
        _this._sessionToken = sessionToken;
        _this._clearanceToken = clearanceToken;
        _this._markdown = !!markdown;
        _this._debug = !!debug;
        _this._apiBaseUrl = apiBaseUrl;
        _this._backendApiBaseUrl = backendApiBaseUrl;
        _this._userAgent = userAgent;
        _this._headers = __assign({ 'user-agent': _this._userAgent, 'x-openai-assistant-app-id': '', 'accept-language': 'en-US,en;q=0.9', 'accept-encoding': 'gzip, deflate, br', origin: 'https://chat.openai.com', referer: 'https://chat.openai.com/chat', 'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 'sec-ch-ua-platform': '"macOS"', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-origin' }, headers);
        _this._accessTokenCache = new expiry_map_1.default(accessTokenTTL);
        if (accessToken) {
            _this._accessTokenCache.set(KEY_ACCESS_TOKEN, accessToken);
        }
        if (!_this._sessionToken) {
            var error = new types.ChatGPTError('ChatGPT invalid session token');
            error.statusCode = 401;
            throw error;
        }
        if (!_this._clearanceToken) {
            var error = new types.ChatGPTError('ChatGPT invalid clearance token');
            error.statusCode = 401;
            throw error;
        }
        return _this;
    }
    Object.defineProperty(ChatGPTAPI.prototype, "user", {
        /**
         * Gets the currently signed-in user, if authenticated, `null` otherwise.
         */
        get: function () {
            return this._user;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChatGPTAPI.prototype, "sessionToken", {
        /** Gets the current session token. */
        get: function () {
            return this._sessionToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChatGPTAPI.prototype, "clearanceToken", {
        /** Gets the current Cloudflare clearance token (`cf_clearance` cookie value). */
        get: function () {
            return this._clearanceToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChatGPTAPI.prototype, "userAgent", {
        /** Gets the current user agent. */
        get: function () {
            return this._userAgent;
        },
        enumerable: false,
        configurable: true
    });
    ChatGPTAPI.prototype.initSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshSession()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPI.prototype.sendMessage = function (message, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var conversationId, _a, parentMessageId, _b, messageId, _c, action, timeoutMs, onProgress, abortSignal, abortController, accessToken, body, result, responseP;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        conversationId = opts.conversationId, _a = opts.parentMessageId, parentMessageId = _a === void 0 ? uuid_1.v4() : _a, _b = opts.messageId, messageId = _b === void 0 ? uuid_1.v4() : _b, _c = opts.action, action = _c === void 0 ? 'next' : _c, timeoutMs = opts.timeoutMs, onProgress = opts.onProgress;
                        abortSignal = opts.abortSignal;
                        abortController = null;
                        if (timeoutMs && !abortSignal) {
                            abortController = new AbortController();
                            abortSignal = abortController.signal;
                        }
                        return [4 /*yield*/, this.refreshSession()];
                    case 1:
                        accessToken = _d.sent();
                        body = {
                            action: action,
                            messages: [
                                {
                                    id: messageId,
                                    role: 'user',
                                    content: {
                                        content_type: 'text',
                                        parts: [message]
                                    }
                                }
                            ],
                            model: 'text-davinci-002-render',
                            parent_message_id: parentMessageId
                        };
                        if (conversationId) {
                            body.conversation_id = conversationId;
                        }
                        result = {
                            conversationId: conversationId,
                            messageId: messageId,
                            response: ''
                        };
                        responseP = new Promise(function (resolve, reject) {
                            var url = _this._backendApiBaseUrl + "/conversation";
                            var headers = __assign(__assign({}, _this._headers), { Authorization: "Bearer " + accessToken, Accept: 'text/event-stream', 'Content-Type': 'application/json', Cookie: "cf_clearance=" + _this._clearanceToken });
                            if (_this._debug) {
                                console.log('POST', url, { body: body, headers: headers });
                            }
                            fetch_sse_1.fetchSSE(url, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify(body),
                                signal: abortSignal,
                                onMessage: function (data) {
                                    var _a, _b, _c;
                                    if (data === '[DONE]') {
                                        return resolve(result);
                                    }
                                    try {
                                        var convoResponseEvent = JSON.parse(data);
                                        if (convoResponseEvent.conversation_id) {
                                            result.conversationId = convoResponseEvent.conversation_id;
                                        }
                                        if ((_a = convoResponseEvent.message) === null || _a === void 0 ? void 0 : _a.id) {
                                            result.messageId = convoResponseEvent.message.id;
                                        }
                                        var message_1 = convoResponseEvent.message;
                                        // console.log('event', JSON.stringify(convoResponseEvent, null, 2))
                                        if (message_1) {
                                            var text = (_c = (_b = message_1 === null || message_1 === void 0 ? void 0 : message_1.content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0];
                                            if (text) {
                                                if (!_this._markdown) {
                                                    text = utils_1.markdownToText(text);
                                                }
                                                result.response = text;
                                                if (onProgress) {
                                                    onProgress(result);
                                                }
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.warn('fetchSSE onMessage unexpected error', err);
                                        reject(err);
                                    }
                                }
                            }).catch(function (err) {
                                var errMessageL = err.toString().toLowerCase();
                                if (result.response &&
                                    (errMessageL === 'error: typeerror: terminated' ||
                                        errMessageL === 'typeerror: terminated')) {
                                    // OpenAI sometimes forcefully terminates the socket from their end before
                                    // the HTTP request has resolved cleanly. In my testing, these cases tend to
                                    // happen when OpenAI has already send the last `response`, so we can ignore
                                    // the `fetch` error in this case.
                                    return resolve(result);
                                }
                                else {
                                    return reject(err);
                                }
                            });
                        });
                        if (timeoutMs) {
                            if (abortController) {
                                // This will be called when a timeout occurs in order for us to forcibly
                                // ensure that the underlying HTTP request is aborted.
                                ;
                                responseP.cancel = function () {
                                    abortController.abort();
                                };
                            }
                            return [2 /*return*/, p_timeout_1.default(responseP, {
                                    milliseconds: timeoutMs,
                                    message: 'ChatGPT timed out waiting for response'
                                })];
                        }
                        else {
                            return [2 /*return*/, responseP];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPI.prototype.sendModeration = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, url, headers, body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshSession()];
                    case 1:
                        accessToken = _a.sent();
                        url = this._backendApiBaseUrl + "/moderations";
                        headers = __assign(__assign({}, this._headers), { Authorization: "Bearer " + accessToken, Accept: '*/*', 'Content-Type': 'application/json', Cookie: "cf_clearance=" + this._clearanceToken });
                        body = {
                            input: input,
                            model: 'text-moderation-playground'
                        };
                        if (this._debug) {
                            console.log('POST', url, headers, body);
                        }
                        return [4 /*yield*/, fetch_1.fetch(url, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify(body)
                            }).then(function (r) {
                                if (!r.ok) {
                                    var error = new types.ChatGPTError(r.status + " " + r.statusText);
                                    error.response = r;
                                    error.statusCode = r.status;
                                    error.statusText = r.statusText;
                                    throw error;
                                }
                                return r.json();
                            })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    ChatGPTAPI.prototype.getIsAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.refreshSession()];
                    case 1:
                        void (_a.sent());
                        return [2 /*return*/, true];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPI.prototype.refreshSession = function () {
        return __awaiter(this, void 0, Promise, function () {
            var cachedAccessToken, response, url, headers, res, accessToken, error, appError, error, error, err_2, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachedAccessToken = this._accessTokenCache.get(KEY_ACCESS_TOKEN);
                        if (cachedAccessToken) {
                            return [2 /*return*/, cachedAccessToken];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = this._apiBaseUrl + "/auth/session";
                        headers = __assign(__assign({}, this._headers), { cookie: "cf_clearance=" + this._clearanceToken + "; __Secure-next-auth.session-token=" + this._sessionToken, accept: '*/*' });
                        if (this._debug) {
                            console.log('GET', url, headers);
                        }
                        return [4 /*yield*/, fetch_1.fetch(url, {
                                headers: headers
                            }).then(function (r) {
                                response = r;
                                if (!r.ok) {
                                    var error = new types.ChatGPTError(r.status + " " + r.statusText);
                                    error.response = r;
                                    error.statusCode = r.status;
                                    error.statusText = r.statusText;
                                    throw error;
                                }
                                return r.json();
                            })];
                    case 2:
                        res = _a.sent();
                        accessToken = res === null || res === void 0 ? void 0 : res.accessToken;
                        if (!accessToken) {
                            error = new types.ChatGPTError('Unauthorized');
                            error.response = response;
                            error.statusCode = response === null || response === void 0 ? void 0 : response.status;
                            error.statusText = response === null || response === void 0 ? void 0 : response.statusText;
                            throw error;
                        }
                        appError = res === null || res === void 0 ? void 0 : res.error;
                        if (appError) {
                            if (appError === 'RefreshAccessTokenError') {
                                error = new types.ChatGPTError('session token may have expired');
                                error.response = response;
                                error.statusCode = response === null || response === void 0 ? void 0 : response.status;
                                error.statusText = response === null || response === void 0 ? void 0 : response.statusText;
                                throw error;
                            }
                            else {
                                error = new types.ChatGPTError(appError);
                                error.response = response;
                                error.statusCode = response === null || response === void 0 ? void 0 : response.status;
                                error.statusText = response === null || response === void 0 ? void 0 : response.statusText;
                                throw error;
                            }
                        }
                        if (res.user) {
                            this._user = res.user;
                        }
                        this._accessTokenCache.set(KEY_ACCESS_TOKEN, accessToken);
                        return [2 /*return*/, accessToken];
                    case 3:
                        err_2 = _a.sent();
                        if (this._debug) {
                            console.error(err_2);
                        }
                        error = new types.ChatGPTError("ChatGPT failed to refresh auth token. " + err_2.toString());
                        error.response = response;
                        error.statusCode = response === null || response === void 0 ? void 0 : response.status;
                        error.statusText = response === null || response === void 0 ? void 0 : response.statusText;
                        error.originalError = err_2;
                        throw error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPI.prototype.closeSession = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this._accessTokenCache.delete(KEY_ACCESS_TOKEN);
                return [2 /*return*/];
            });
        });
    };
    return ChatGPTAPI;
}(abstract_chatgpt_api_1.AChatGPTAPI));
exports.ChatGPTAPI = ChatGPTAPI;

