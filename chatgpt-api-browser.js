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
exports.ChatGPTAPIBrowser = void 0;
var delay_1 = require("delay");
var tempy_1 = require("tempy");
var uuid_1 = require("uuid");
var types = require("./types");
var abstract_chatgpt_api_1 = require("./abstract-chatgpt-api");
var openai_auth_1 = require("./openai-auth");
var utils_1 = require("./utils");
var CHAT_PAGE_URL = 'https://chat.openai.com/chat';
var ChatGPTAPIBrowser = /** @class */ (function (_super) {
    __extends(ChatGPTAPIBrowser, _super);
    /**
     * Creates a new client for automating the ChatGPT webapp.
     */
    function ChatGPTAPIBrowser(opts) {
        var _this = _super.call(this) || this;
        _this._onRequest = function (request) {
            var url = request.url();
            if (!utils_1.isRelevantRequest(url)) {
                return;
            }
            var method = request.method();
            var body;
            if (method === 'POST') {
                body = request.postData();
                try {
                    body = JSON.parse(body);
                }
                catch (_) { }
                // if (url.endsWith('/conversation') && typeof body === 'object') {
                //   const conversationBody: types.ConversationJSONBody = body
                //   const conversationId = conversationBody.conversation_id
                //   const parentMessageId = conversationBody.parent_message_id
                //   const messageId = conversationBody.messages?.[0]?.id
                //   const prompt = conversationBody.messages?.[0]?.content?.parts?.[0]
                //   // TODO: store this info for the current sendMessage request
                // }
            }
            if (_this._debug) {
                console.log('\nrequest', {
                    url: url,
                    method: method,
                    headers: request.headers(),
                    body: body
                });
            }
        };
        _this._onResponse = function (response) { return __awaiter(_this, void 0, void 0, function () {
            var request, url, status, body, _1, detail, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = response.request();
                        url = response.url();
                        if (!utils_1.isRelevantRequest(url)) {
                            return [2 /*return*/];
                        }
                        status = response.status();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response.json()];
                    case 2:
                        body = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (this._debug) {
                            console.log('\nresponse', {
                                url: url,
                                ok: response.ok(),
                                status: status,
                                statusText: response.statusText(),
                                headers: response.headers(),
                                body: body,
                                request: {
                                    method: request.method(),
                                    headers: request.headers(),
                                    body: request.postData()
                                }
                            });
                        }
                        detail = (body === null || body === void 0 ? void 0 : body.detail) || '';
                        if (url.endsWith('/conversation')) {
                            if (status >= 400) {
                                console.warn("ChatGPT \"" + this._email + "\" error " + status + ";", detail);
                                // this will be handled in the sendMessage error handler
                                // await this.refreshSession()
                            }
                        }
                        else if (url.endsWith('api/auth/session')) {
                            if (status >= 400) {
                                console.warn("ChatGPT \"" + this._email + "\" error " + status + ";", detail);
                                // this will be handled in the sendMessage error handler
                                // await this.resetSession()
                            }
                            else {
                                session = body;
                                if (session === null || session === void 0 ? void 0 : session.accessToken) {
                                    this._accessToken = session.accessToken;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        var email = opts.email, password = opts.password, _a = opts.isProAccount, isProAccount = _a === void 0 ? false : _a, _b = opts.markdown, markdown = _b === void 0 ? true : _b, _c = opts.debug, debug = _c === void 0 ? false : _c, _d = opts.isGoogleLogin, isGoogleLogin = _d === void 0 ? false : _d, _e = opts.isMicrosoftLogin, isMicrosoftLogin = _e === void 0 ? false : _e, _f = opts.minimize, minimize = _f === void 0 ? true : _f, captchaToken = opts.captchaToken, nopechaKey = opts.nopechaKey, executablePath = opts.executablePath, proxyServer = opts.proxyServer, userDataDir = opts.userDataDir;
        _this._email = email;
        _this._password = password;
        _this._isProAccount = isProAccount;
        _this._markdown = !!markdown;
        _this._debug = !!debug;
        _this._isGoogleLogin = !!isGoogleLogin;
        _this._isMicrosoftLogin = !!isMicrosoftLogin;
        _this._minimize = !!minimize;
        _this._captchaToken = captchaToken;
        _this._nopechaKey = nopechaKey;
        _this._executablePath = executablePath;
        _this._proxyServer = proxyServer;
        _this._isRefreshing = false;
        _this._messageOnProgressHandlers = {};
        _this._userDataDir = userDataDir !== null && userDataDir !== void 0 ? userDataDir : tempy_1.temporaryDirectory({ prefix: _this._email });
        if (!_this._email) {
            var error = new types.ChatGPTError('ChatGPT invalid email');
            error.statusCode = 401;
            throw error;
        }
        if (!_this._password) {
            var error = new types.ChatGPTError('ChatGPT invalid password');
            error.statusCode = 401;
            throw error;
        }
        return _this;
    }
    ChatGPTAPIBrowser.prototype.initSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, authInfo, err_1, modalSelector, err_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this._browser) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.closeSession()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 6, , 9]);
                        _a = this;
                        return [4 /*yield*/, openai_auth_1.getBrowser({
                                captchaToken: this._captchaToken,
                                nopechaKey: this._nopechaKey,
                                executablePath: this._executablePath,
                                proxyServer: this._proxyServer,
                                minimize: this._minimize,
                                userDataDir: this._userDataDir
                            })];
                    case 3:
                        _a._browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, openai_auth_1.getPage(this._browser, {
                                proxyServer: this._proxyServer
                            })
                            // bypass annoying popup modals
                        ];
                    case 4:
                        _b._page = _c.sent();
                        // bypass annoying popup modals
                        this._page.evaluateOnNewDocument(function () {
                            window.localStorage.setItem('oai/apps/hasSeenOnboarding/chat', 'true');
                            window.localStorage.setItem('oai/apps/hasSeenReleaseAnnouncement/2022-12-15', 'true');
                            window.localStorage.setItem('oai/apps/hasSeenReleaseAnnouncement/2022-12-19', 'true');
                            window.localStorage.setItem('oai/apps/hasSeenReleaseAnnouncement/2023-01-09', 'true');
                        });
                        // await maximizePage(this._page)
                        this._page.on('request', this._onRequest.bind(this));
                        this._page.on('response', this._onResponse.bind(this));
                        return [4 /*yield*/, openai_auth_1.getOpenAIAuth({
                                email: this._email,
                                password: this._password,
                                browser: this._browser,
                                page: this._page,
                                isGoogleLogin: this._isGoogleLogin,
                                isMicrosoftLogin: this._isMicrosoftLogin
                            })];
                    case 5:
                        authInfo = _c.sent();
                        if (this._debug) {
                            console.log('chatgpt', this._email, 'auth', authInfo);
                        }
                        return [3 /*break*/, 9];
                    case 6:
                        err_1 = _c.sent();
                        if (!this._browser) return [3 /*break*/, 8];
                        return [4 /*yield*/, this._browser.close()];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        this._browser = null;
                        this._page = null;
                        throw err_1;
                    case 9:
                        if (!(!this.isChatPage || this._isGoogleLogin || this._isMicrosoftLogin)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this._page.goto(CHAT_PAGE_URL, {
                                waitUntil: 'networkidle2'
                            })];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11: 
                    // TODO: will this exist after page reload and navigation?
                    return [4 /*yield*/, this._page.exposeFunction('ChatGPTAPIBrowserOnProgress', function (partialResponse) {
                            var _a;
                            if ((_a = partialResponse) === null || _a === void 0 ? void 0 : _a.origMessageId) {
                                var onProgress = _this._messageOnProgressHandlers[partialResponse.origMessageId];
                                if (onProgress) {
                                    onProgress(partialResponse);
                                    return;
                                }
                            }
                        })
                        // dismiss welcome modal (and other modals)
                    ];
                    case 12:
                        // TODO: will this exist after page reload and navigation?
                        _c.sent();
                        _c.label = 13;
                    case 13:
                        modalSelector = '[data-headlessui-state="open"]';
                        _c.label = 14;
                    case 14:
                        _c.trys.push([14, 17, , 18]);
                        return [4 /*yield*/, this._page.$(modalSelector)];
                    case 15:
                        if (!(_c.sent())) {
                            return [3 /*break*/, 21];
                        }
                        return [4 /*yield*/, this._page.click(modalSelector + " button:last-child")];
                    case 16:
                        _c.sent();
                        return [3 /*break*/, 18];
                    case 17:
                        err_2 = _c.sent();
                        // "next" button not found in welcome modal
                        return [3 /*break*/, 21];
                    case 18: return [4 /*yield*/, delay_1.default(300)];
                    case 19:
                        _c.sent();
                        _c.label = 20;
                    case 20:
                        if (true) return [3 /*break*/, 13];
                        _c.label = 21;
                    case 21: return [4 /*yield*/, this.getIsAuthenticated()];
                    case 22:
                        if (!(_c.sent())) {
                            if (!this._accessToken) {
                                console.warn('no access token');
                            }
                            else {
                                console.warn('failed to find prompt textarea');
                            }
                            throw new types.ChatGPTError('Failed to authenticate session');
                        }
                        if (this._minimize) {
                            return [2 /*return*/, utils_1.minimizePage(this._page)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Attempts to handle 401 errors by re-authenticating.
     */
    ChatGPTAPIBrowser.prototype.resetSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ChatGPT \"" + this._email + "\" resetSession...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        console.log('>>> closing session', this._email);
                        return [4 /*yield*/, this.closeSession()];
                    case 2:
                        _a.sent();
                        console.log('<<< closing session', this._email);
                        return [4 /*yield*/, this.initSession()];
                    case 3:
                        _a.sent();
                        console.log("ChatGPT \"" + this._email + "\" refreshSession success");
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        console.error("ChatGPT \"" + this._email + "\" resetSession error", err_3.toString());
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Attempts to handle 403 errors by refreshing the page.
     */
    ChatGPTAPIBrowser.prototype.refreshSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, timeout, err_4, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isRefreshing) {
                            return [2 /*return*/];
                        }
                        this._isRefreshing = true;
                        console.log("ChatGPT \"" + this._email + "\" refreshSession...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, 13, 14]);
                        if (!!this._minimize) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.maximizePage(this._page)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this._page.reload()];
                    case 4:
                        _a.sent();
                        response = void 0;
                        timeout = 120000 // 2 minutes in milliseconds
                        ;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 9]);
                        return [4 /*yield*/, this._page.waitForResponse(function (response) {
                                var _a, _b, _c;
                                var cookie = response.headers()['set-cookie'];
                                if (cookie === null || cookie === void 0 ? void 0 : cookie.includes('cf_clearance=')) {
                                    var cfClearance = (_c = (_b = (_a = cookie
                                        .split('cf_clearance=')) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.split(';')) === null || _c === void 0 ? void 0 : _c[0];
                                    // console.log('Cloudflare Cookie:', cfClearance)
                                    return true;
                                }
                                return false;
                            }, { timeout: timeout })];
                    case 6:
                        // Wait for a response that includes the 'cf_clearance' cookie
                        response = _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        err_4 = _a.sent();
                        return [4 /*yield*/, this._getInputBox()];
                    case 8:
                        // Useful for when cloudflare cookie is still valid, to catch TimeoutError
                        response = !!(_a.sent());
                        return [3 /*break*/, 9];
                    case 9:
                        if (!response) {
                            throw new types.ChatGPTError('Could not fetch cf_clearance cookie');
                        }
                        if (!(this._minimize && this.isChatPage)) return [3 /*break*/, 11];
                        return [4 /*yield*/, utils_1.minimizePage(this._page)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        console.log("ChatGPT \"" + this._email + "\" refreshSession success");
                        return [3 /*break*/, 14];
                    case 12:
                        err_5 = _a.sent();
                        console.error("ChatGPT \"" + this._email + "\" error refreshing session", err_5.toString());
                        return [3 /*break*/, 14];
                    case 13:
                        this._isRefreshing = false;
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPIBrowser.prototype.getIsAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputBox, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this._accessToken) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this._getInputBox()];
                    case 1:
                        inputBox = _a.sent();
                        return [2 /*return*/, !!inputBox];
                    case 2:
                        err_6 = _a.sent();
                        // can happen when navigating during login
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPIBrowser.prototype.sendMessage = function (message, opts) {
        var _a, _b;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var conversationId, _c, parentMessageId, _d, messageId, _e, action, timeoutMs, onProgress, url, body, cleanup, result, numTries, is401, _f, err_7, error, err_8, error, error;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        conversationId = opts.conversationId, _c = opts.parentMessageId, parentMessageId = _c === void 0 ? uuid_1.v4() : _c, _d = opts.messageId, messageId = _d === void 0 ? uuid_1.v4() : _d, _e = opts.action, action = _e === void 0 ? 'next' : _e, timeoutMs = opts.timeoutMs, onProgress = opts.onProgress;
                        url = "https://chat.openai.com/backend-api/conversation";
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
                            model: this._isProAccount
                                ? 'text-davinci-002-render-paid'
                                : 'text-davinci-002-render',
                            parent_message_id: parentMessageId
                        };
                        if (conversationId) {
                            body.conversation_id = conversationId;
                        }
                        if (onProgress) {
                            this._messageOnProgressHandlers[messageId] = onProgress;
                        }
                        cleanup = function () {
                            if (_this._messageOnProgressHandlers[messageId]) {
                                delete _this._messageOnProgressHandlers[messageId];
                            }
                        };
                        numTries = 0;
                        is401 = false;
                        _g.label = 1;
                    case 1:
                        _f = is401;
                        if (_f) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getIsAuthenticated()];
                    case 2:
                        _f = !(_g.sent());
                        _g.label = 3;
                    case 3:
                        if (!_f) return [3 /*break*/, 9];
                        console.log("chatgpt re-authenticating " + this._email);
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.resetSession()];
                    case 5:
                        _g.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_7 = _g.sent();
                        console.warn("chatgpt error re-authenticating " + this._email, err_7.toString());
                        return [3 /*break*/, 7];
                    case 7: return [4 /*yield*/, this.getIsAuthenticated()];
                    case 8:
                        if (!(_g.sent())) {
                            error = new types.ChatGPTError('Not signed in');
                            error.statusCode = 401;
                            cleanup();
                            throw error;
                        }
                        _g.label = 9;
                    case 9:
                        _g.trys.push([9, 11, , 13]);
                        return [4 /*yield*/, this._page.evaluate(utils_1.browserPostEventStream, url, this._accessToken, body, timeoutMs)];
                    case 10:
                        // console.log('>>> EVALUATE', url, this._accessToken, body)
                        result = _g.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        err_8 = _g.sent();
                        // We catch all errors in `browserPostEventStream`, so this should really
                        // only happen if the page is refreshed or closed during its invocation.
                        // This may happen if we encounter a 401/403 and refresh the page in it's
                        // response handler or if the user has closed the page manually.
                        if (++numTries >= 2) {
                            error = new types.ChatGPTError(err_8.toString(), { cause: err_8 });
                            error.statusCode = (_a = err_8.response) === null || _a === void 0 ? void 0 : _a.statusCode;
                            error.statusText = (_b = err_8.response) === null || _b === void 0 ? void 0 : _b.statusText;
                            cleanup();
                            throw error;
                        }
                        console.warn('chatgpt sendMessage error; retrying...', err_8.toString());
                        return [4 /*yield*/, delay_1.default(5000)];
                    case 12:
                        _g.sent();
                        return [3 /*break*/, 22];
                    case 13:
                        if (!('error' in result)) return [3 /*break*/, 21];
                        error = new types.ChatGPTError(result.error.message);
                        error.statusCode = result.error.statusCode;
                        error.statusText = result.error.statusText;
                        ++numTries;
                        if (!(error.statusCode === 401)) return [3 /*break*/, 14];
                        is401 = true;
                        if (numTries >= 2) {
                            cleanup();
                            throw error;
                        }
                        else {
                            return [3 /*break*/, 22];
                        }
                        return [3 /*break*/, 20];
                    case 14:
                        if (!(error.statusCode !== 403)) return [3 /*break*/, 15];
                        throw error;
                    case 15:
                        if (!(numTries >= 2)) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.refreshSession()];
                    case 16:
                        _g.sent();
                        throw error;
                    case 17: return [4 /*yield*/, this.refreshSession()];
                    case 18:
                        _g.sent();
                        return [4 /*yield*/, delay_1.default(1000)];
                    case 19:
                        _g.sent();
                        result = null;
                        return [3 /*break*/, 22];
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        if (!this._markdown) {
                            result.response = utils_1.markdownToText(result.response);
                        }
                        cleanup();
                        return [2 /*return*/, result];
                    case 22:
                        if (!result) return [3 /*break*/, 1];
                        _g.label = 23;
                    case 23:
                        cleanup();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPIBrowser.prototype.resetThread = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._page.click('nav > a:nth-child(1)')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPIBrowser.prototype.closeSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_10, pages, _i, pages_1, page, err_11, browserProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!this._page) return [3 /*break*/, 3];
                        this._page.off('request', this._onRequest.bind(this));
                        this._page.off('response', this._onResponse.bind(this));
                        return [4 /*yield*/, this._page.deleteCookie({
                                name: 'cf_clearance',
                                domain: '.chat.openai.com'
                            })
                            // TODO; test this
                            // const client = await this._page.target().createCDPSession()
                            // await client.send('Network.clearBrowserCookies')
                            // await client.send('Network.clearBrowserCache')
                        ];
                    case 1:
                        _a.sent();
                        // TODO; test this
                        // const client = await this._page.target().createCDPSession()
                        // await client.send('Network.clearBrowserCookies')
                        // await client.send('Network.clearBrowserCache')
                        return [4 /*yield*/, this._page.close()];
                    case 2:
                        // TODO; test this
                        // const client = await this._page.target().createCDPSession()
                        // await client.send('Network.clearBrowserCookies')
                        // await client.send('Network.clearBrowserCache')
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_10 = _a.sent();
                        console.warn('closeSession error', err_10);
                        return [3 /*break*/, 5];
                    case 5:
                        if (!this._browser) return [3 /*break*/, 15];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 12, , 13]);
                        return [4 /*yield*/, this._browser.pages()];
                    case 7:
                        pages = _a.sent();
                        _i = 0, pages_1 = pages;
                        _a.label = 8;
                    case 8:
                        if (!(_i < pages_1.length)) return [3 /*break*/, 11];
                        page = pages_1[_i];
                        return [4 /*yield*/, page.close()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 8];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_11 = _a.sent();
                        console.warn('closeSession error', err_11);
                        return [3 /*break*/, 13];
                    case 13: return [4 /*yield*/, this._browser.close()];
                    case 14:
                        _a.sent();
                        browserProcess = this._browser.process();
                        // Rule number 1 of zombie process hunting: double-tap
                        if (browserProcess) {
                            browserProcess.kill('SIGKILL');
                        }
                        _a.label = 15;
                    case 15:
                        this._page = null;
                        this._browser = null;
                        this._accessToken = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTAPIBrowser.prototype._getInputBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._page.$('textarea')];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_12 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ChatGPTAPIBrowser.prototype, "isChatPage", {
        get: function () {
            var _a;
            try {
                var url = (_a = this._page) === null || _a === void 0 ? void 0 : _a.url().replace(/\/$/, '');
                return url === CHAT_PAGE_URL;
            }
            catch (err) {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    return ChatGPTAPIBrowser;
}(abstract_chatgpt_api_1.AChatGPTAPI));
exports.ChatGPTAPIBrowser = ChatGPTAPIBrowser;

