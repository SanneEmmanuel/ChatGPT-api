"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChromeExecutablePath = exports.initializeNopechaExtension = exports.getBrowser = exports.getPage = exports.getOpenAIAuth = void 0;
var fs = require("node:fs");
var os = require("node:os");
var path = require("node:path");
var url = require("node:url");
var delay_1 = require("delay");
var p_timeout_1 = require("p-timeout");
var puppeteer_extra_1 = require("puppeteer-extra");
var puppeteer_extra_plugin_recaptcha_1 = require("puppeteer-extra-plugin-recaptcha");
var puppeteer_extra_plugin_stealth_1 = require("puppeteer-extra-plugin-stealth");
var random_1 = require("random");
var types = require("./types");
var utils_1 = require("./utils");
puppeteer_extra_1.default.use(puppeteer_extra_plugin_stealth_1.default());
var hasRecaptchaPlugin = false;
var hasNopechaExtension = false;
var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
var DEFAULT_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes
/**
 * Bypasses OpenAI's use of Cloudflare to get the cookies required to use
 * ChatGPT. Uses Puppeteer with a stealth plugin under the hood.
 *
 * If you pass `email` and `password`, then it will log into the account and
 * include a `sessionToken` in the response.
 *
 * If you don't pass `email` and `password`, then it will just return a valid
 * `clearanceToken`.
 *
 * This can be useful because `clearanceToken` expires after ~2 hours, whereas
 * `sessionToken` generally lasts much longer. We recommend renewing your
 * `clearanceToken` every hour or so and creating a new instance of `ChatGPTAPI`
 * with your updated credentials.
 */
function getOpenAIAuth(_a) {
    var _b, _c, _d, _e;
    var email = _a.email, password = _a.password, browser = _a.browser, page = _a.page, _f = _a.timeoutMs, timeoutMs = _f === void 0 ? DEFAULT_TIMEOUT_MS : _f, _g = _a.isGoogleLogin, isGoogleLogin = _g === void 0 ? false : _g, _h = _a.isMicrosoftLogin, isMicrosoftLogin = _h === void 0 ? false : _h, _j = _a.captchaToken, captchaToken = _j === void 0 ? process.env.CAPTCHA_TOKEN : _j, _k = _a.nopechaKey, nopechaKey = _k === void 0 ? process.env.NOPECHA_KEY : _k, executablePath = _a.executablePath, _l = _a.proxyServer, proxyServer = _l === void 0 ? process.env.PROXY_SERVER : _l, _m = _a.minimize, minimize = _m === void 0 ? false : _m;
    return __awaiter(this, void 0, Promise, function () {
        var origBrowser, origPage, userAgent, captchas, res, submitP, _o, _p, _q, _r, _s, _t, _u, _v, _w, retries, i, res, e_1, frame, submit, pageCookies, cookies, authInfo, err_1;
        return __generator(this, function (_x) {
            switch (_x.label) {
                case 0:
                    origBrowser = browser;
                    origPage = page;
                    _x.label = 1;
                case 1:
                    _x.trys.push([1, 73, 74, 80]);
                    if (!!browser) return [3 /*break*/, 3];
                    return [4 /*yield*/, getBrowser({
                            captchaToken: captchaToken,
                            nopechaKey: nopechaKey,
                            executablePath: executablePath,
                            proxyServer: proxyServer,
                            timeoutMs: timeoutMs
                        })];
                case 2:
                    browser = _x.sent();
                    _x.label = 3;
                case 3: return [4 /*yield*/, browser.userAgent()];
                case 4:
                    userAgent = _x.sent();
                    if (!!page) return [3 /*break*/, 7];
                    return [4 /*yield*/, getPage(browser, { proxyServer: proxyServer })];
                case 5:
                    page = _x.sent();
                    page.setDefaultTimeout(timeoutMs);
                    if (!minimize) return [3 /*break*/, 7];
                    return [4 /*yield*/, utils_1.minimizePage(page)];
                case 6:
                    _x.sent();
                    _x.label = 7;
                case 7: return [4 /*yield*/, page.goto('https://chat.openai.com/auth/login', {
                        waitUntil: 'networkidle2'
                    })
                    // NOTE: this is where you may encounter a CAPTCHA
                ];
                case 8:
                    _x.sent();
                    // NOTE: this is where you may encounter a CAPTCHA
                    return [4 /*yield*/, checkForChatGPTAtCapacity(page, { timeoutMs: timeoutMs })];
                case 9:
                    // NOTE: this is where you may encounter a CAPTCHA
                    _x.sent();
                    if (!hasRecaptchaPlugin) return [3 /*break*/, 12];
                    return [4 /*yield*/, page.findRecaptchas()];
                case 10:
                    captchas = _x.sent();
                    if (!((_b = captchas === null || captchas === void 0 ? void 0 : captchas.filtered) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 12];
                    console.log('solving captchas using 2captcha...');
                    return [4 /*yield*/, page.solveRecaptchas()];
                case 11:
                    res = _x.sent();
                    console.log('captcha result', res);
                    _x.label = 12;
                case 12:
                    if (!(email && password)) return [3 /*break*/, 68];
                    return [4 /*yield*/, waitForConditionOrAtCapacity(page, function () {
                            return page.waitForSelector('#__next .btn-primary', { timeout: timeoutMs });
                        })];
                case 13:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(500)
                        // click login button and wait for navigation to finish
                    ];
                case 14:
                    _x.sent();
                    _x.label = 15;
                case 15: return [4 /*yield*/, Promise.all([
                        page.waitForNavigation({
                            waitUntil: 'networkidle2',
                            timeout: timeoutMs
                        }),
                        page.click('#__next .btn-primary')
                    ])];
                case 16:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(500)];
                case 17:
                    _x.sent();
                    _x.label = 18;
                case 18:
                    if (page.url().endsWith('/auth/login')) return [3 /*break*/, 15];
                    _x.label = 19;
                case 19: return [4 /*yield*/, checkForChatGPTAtCapacity(page, { timeoutMs: timeoutMs })];
                case 20:
                    _x.sent();
                    submitP = void 0;
                    if (!isGoogleLogin) return [3 /*break*/, 30];
                    return [4 /*yield*/, page.waitForSelector('button[data-provider="google"]', {
                            timeout: timeoutMs
                        })];
                case 21:
                    _x.sent();
                    return [4 /*yield*/, page.click('button[data-provider="google"]')];
                case 22:
                    _x.sent();
                    return [4 /*yield*/, page.waitForSelector('input[type="email"]')];
                case 23:
                    _x.sent();
                    return [4 /*yield*/, page.type('input[type="email"]', email)];
                case 24:
                    _x.sent();
                    _p = (_o = Promise).all;
                    _q = [page.waitForNavigation()];
                    return [4 /*yield*/, page.keyboard.press('Enter')];
                case 25: return [4 /*yield*/, _p.apply(_o, [_q.concat([
                            _x.sent()
                        ])])];
                case 26:
                    _x.sent();
                    return [4 /*yield*/, page.waitForSelector('input[type="password"]', { visible: true })];
                case 27:
                    _x.sent();
                    return [4 /*yield*/, page.type('input[type="password"]', password)];
                case 28:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(50)];
                case 29:
                    _x.sent();
                    submitP = function () { return page.keyboard.press('Enter'); };
                    return [3 /*break*/, 66];
                case 30:
                    if (!isMicrosoftLogin) return [3 /*break*/, 43];
                    return [4 /*yield*/, page.click('button[data-provider="windowslive"]')];
                case 31:
                    _x.sent();
                    return [4 /*yield*/, page.waitForSelector('input[type="email"]')];
                case 32:
                    _x.sent();
                    return [4 /*yield*/, page.type('input[type="email"]', email)];
                case 33:
                    _x.sent();
                    _s = (_r = Promise).all;
                    _t = [page.waitForNavigation()];
                    return [4 /*yield*/, page.keyboard.press('Enter')];
                case 34: return [4 /*yield*/, _s.apply(_r, [_t.concat([
                            _x.sent()
                        ])])];
                case 35:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(1500)];
                case 36:
                    _x.sent();
                    return [4 /*yield*/, page.waitForSelector('input[type="password"]', { visible: true })];
                case 37:
                    _x.sent();
                    return [4 /*yield*/, page.type('input[type="password"]', password)];
                case 38:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(50)];
                case 39:
                    _x.sent();
                    submitP = function () { return page.keyboard.press('Enter'); };
                    _v = (_u = Promise).all;
                    _w = [page.waitForNavigation()];
                    return [4 /*yield*/, page.keyboard.press('Enter')];
                case 40: return [4 /*yield*/, _v.apply(_u, [_w.concat([
                            _x.sent()
                        ])])];
                case 41:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(1000)];
                case 42:
                    _x.sent();
                    return [3 /*break*/, 66];
                case 43: return [4 /*yield*/, page.waitForSelector('#username')];
                case 44:
                    _x.sent();
                    return [4 /*yield*/, page.type('#username', email)];
                case 45:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(100)
                        // NOTE: this is where you may encounter a CAPTCHA
                    ];
                case 46:
                    _x.sent();
                    if (!hasNopechaExtension) return [3 /*break*/, 48];
                    return [4 /*yield*/, waitForRecaptcha(page, { timeoutMs: timeoutMs })];
                case 47:
                    _x.sent();
                    return [3 /*break*/, 57];
                case 48:
                    if (!hasRecaptchaPlugin) return [3 /*break*/, 57];
                    console.log('solving captchas using 2captcha...');
                    retries = 3;
                    i = 0;
                    _x.label = 49;
                case 49:
                    if (!(i < retries)) return [3 /*break*/, 57];
                    _x.label = 50;
                case 50:
                    _x.trys.push([50, 55, , 56]);
                    return [4 /*yield*/, page.solveRecaptchas()];
                case 51:
                    res = _x.sent();
                    if (!((_c = res.captchas) === null || _c === void 0 ? void 0 : _c.length)) return [3 /*break*/, 52];
                    console.log('captchas result', res);
                    return [3 /*break*/, 57];
                case 52:
                    console.log('no captchas found');
                    return [4 /*yield*/, delay_1.default(500)];
                case 53:
                    _x.sent();
                    _x.label = 54;
                case 54: return [3 /*break*/, 56];
                case 55:
                    e_1 = _x.sent();
                    console.log('captcha error', e_1);
                    return [3 /*break*/, 56];
                case 56:
                    i++;
                    return [3 /*break*/, 49];
                case 57: return [4 /*yield*/, delay_1.default(2000)];
                case 58:
                    _x.sent();
                    frame = page.mainFrame();
                    return [4 /*yield*/, page.waitForSelector('button[type="submit"]', {
                            timeout: timeoutMs
                        })];
                case 59:
                    submit = _x.sent();
                    return [4 /*yield*/, frame.focus('button[type="submit"]')];
                case 60:
                    _x.sent();
                    return [4 /*yield*/, submit.focus()];
                case 61:
                    _x.sent();
                    return [4 /*yield*/, submit.click()];
                case 62:
                    _x.sent();
                    return [4 /*yield*/, page.waitForSelector('#password', { timeout: timeoutMs })];
                case 63:
                    _x.sent();
                    return [4 /*yield*/, page.type('#password', password)];
                case 64:
                    _x.sent();
                    return [4 /*yield*/, delay_1.default(50)];
                case 65:
                    _x.sent();
                    submitP = function () { return page.click('button[type="submit"]'); };
                    _x.label = 66;
                case 66: return [4 /*yield*/, Promise.all([
                        waitForConditionOrAtCapacity(page, function () {
                            return page.waitForNavigation({
                                waitUntil: 'networkidle2',
                                timeout: timeoutMs
                            });
                        }),
                        submitP()
                    ])];
                case 67:
                    _x.sent();
                    return [3 /*break*/, 71];
                case 68: return [4 /*yield*/, delay_1.default(2000)];
                case 69:
                    _x.sent();
                    return [4 /*yield*/, checkForChatGPTAtCapacity(page, { timeoutMs: timeoutMs })];
                case 70:
                    _x.sent();
                    _x.label = 71;
                case 71: return [4 /*yield*/, page.cookies()];
                case 72:
                    pageCookies = _x.sent();
                    cookies = pageCookies.reduce(function (map, cookie) {
                        var _a;
                        return (__assign(__assign({}, map), (_a = {}, _a[cookie.name] = cookie, _a)));
                    }, {});
                    authInfo = {
                        userAgent: userAgent,
                        clearanceToken: (_d = cookies['cf_clearance']) === null || _d === void 0 ? void 0 : _d.value,
                        sessionToken: (_e = cookies['__Secure-next-auth.session-token']) === null || _e === void 0 ? void 0 : _e.value
                    };
                    return [2 /*return*/, authInfo];
                case 73:
                    err_1 = _x.sent();
                    throw err_1;
                case 74:
                    if (!origBrowser) return [3 /*break*/, 77];
                    if (!(page && page !== origPage)) return [3 /*break*/, 76];
                    return [4 /*yield*/, page.close()];
                case 75:
                    _x.sent();
                    _x.label = 76;
                case 76: return [3 /*break*/, 79];
                case 77:
                    if (!browser) return [3 /*break*/, 79];
                    return [4 /*yield*/, browser.close()];
                case 78:
                    _x.sent();
                    _x.label = 79;
                case 79:
                    page = null;
                    browser = null;
                    return [7 /*endfinally*/];
                case 80: return [2 /*return*/];
            }
        });
    });
}
exports.getOpenAIAuth = getOpenAIAuth;
function getPage(browser, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, proxyServer, page, _b, proxyAuth, proxyUsername, proxyPassword, err_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = opts.proxyServer, proxyServer = _a === void 0 ? process.env.PROXY_SERVER : _a;
                    return [4 /*yield*/, browser.pages()];
                case 1:
                    _b = (_c.sent())[0];
                    if (_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    _b = (_c.sent());
                    _c.label = 3;
                case 3:
                    page = _b;
                    if (!(proxyServer && proxyServer.includes('@'))) return [3 /*break*/, 7];
                    proxyAuth = proxyServer.split('@')[0].split(':');
                    proxyUsername = proxyAuth[0];
                    proxyPassword = proxyAuth[1];
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, page.authenticate({
                            username: proxyUsername,
                            password: proxyPassword
                        })];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_2 = _c.sent();
                    console.error("ChatGPT \"" + this._email + "\" error authenticating proxy \"" + this._proxyServer + "\"", err_2.toString());
                    throw err_2;
                case 7: return [2 /*return*/, page];
            }
        });
    });
}
exports.getPage = getPage;
/**
 * Launches a non-puppeteer instance of Chrome. Note that in my testing, I wasn't
 * able to use the built-in `puppeteer` version of Chromium because Cloudflare
 * recognizes it and blocks access.
 */
function getBrowser(opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, captchaToken, _b, nopechaKey, _c, executablePath, _d, proxyServer, _e, minimize, _f, debug, _g, timeoutMs, launchOptions, puppeteerArgs, nopechaPath, ipPort, browser, page, ip, res, err_3;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = opts.captchaToken, captchaToken = _a === void 0 ? process.env.CAPTCHA_TOKEN : _a, _b = opts.nopechaKey, nopechaKey = _b === void 0 ? process.env.NOPECHA_KEY : _b, _c = opts.executablePath, executablePath = _c === void 0 ? exports.defaultChromeExecutablePath() : _c, _d = opts.proxyServer, proxyServer = _d === void 0 ? process.env.PROXY_SERVER : _d, _e = opts.minimize, minimize = _e === void 0 ? false : _e, _f = opts.debug, debug = _f === void 0 ? false : _f, _g = opts.timeoutMs, timeoutMs = _g === void 0 ? DEFAULT_TIMEOUT_MS : _g, launchOptions = __rest(opts, ["captchaToken", "nopechaKey", "executablePath", "proxyServer", "minimize", "debug", "timeoutMs"]);
                    if (captchaToken && !hasRecaptchaPlugin) {
                        hasRecaptchaPlugin = true;
                        // console.log('use captcha', captchaToken)
                        puppeteer_extra_1.default.use(puppeteer_extra_plugin_recaptcha_1.default({
                            provider: {
                                id: '2captcha',
                                token: captchaToken
                            },
                            visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
                        }));
                    }
                    puppeteerArgs = [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-infobars',
                        '--disable-dev-shm-usage',
                        '--disable-blink-features=AutomationControlled',
                        '--ignore-certificate-errors',
                        '--no-first-run',
                        '--no-service-autorun',
                        '--password-store=basic',
                        '--system-developer-mode',
                        // the following flags all try to reduce memory
                        // '--single-process',
                        '--mute-audio',
                        '--disable-default-apps',
                        '--no-zygote',
                        '--disable-accelerated-2d-canvas',
                        '--disable-web-security'
                        // '--disable-gpu'
                        // '--js-flags="--max-old-space-size=1024"'
                    ];
                    if (nopechaKey) {
                        nopechaPath = path.join(__dirname, '..', 'third-party', 'nopecha-chrome-extension');
                        puppeteerArgs.push("--disable-extensions-except=" + nopechaPath);
                        puppeteerArgs.push("--load-extension=" + nopechaPath);
                        hasNopechaExtension = true;
                    }
                    if (proxyServer) {
                        ipPort = proxyServer.includes('@')
                            ? proxyServer.split('@')[1]
                            : proxyServer;
                        puppeteerArgs.push("--proxy-server=" + ipPort);
                    }
                    return [4 /*yield*/, puppeteer_extra_1.default.launch(__assign({ headless: false, 
                            // devtools: true,
                            args: puppeteerArgs, ignoreDefaultArgs: [
                                '--disable-extensions',
                                '--enable-automation',
                                '--disable-component-extensions-with-background-pages'
                            ], ignoreHTTPSErrors: true, executablePath: executablePath }, launchOptions))];
                case 1:
                    browser = _h.sent();
                    if (!process.env.PROXY_VALIDATE_IP) return [3 /*break*/, 9];
                    return [4 /*yield*/, getPage(browser, { proxyServer: proxyServer })];
                case 2:
                    page = _h.sent();
                    if (!minimize) return [3 /*break*/, 4];
                    return [4 /*yield*/, utils_1.minimizePage(page)];
                case 3:
                    _h.sent();
                    _h.label = 4;
                case 4:
                    ip = void 0;
                    _h.label = 5;
                case 5:
                    _h.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, page.evaluate(function () {
                            return fetch('https://ifconfig.co', {
                                headers: {
                                    Accept: 'application/json'
                                }
                            }).then(function (res) { return res.json(); });
                        })];
                case 6:
                    res = _h.sent();
                    ip = res === null || res === void 0 ? void 0 : res.ip;
                    return [3 /*break*/, 8];
                case 7:
                    err_3 = _h.sent();
                    throw new Error("Proxy IP validation failed: " + err_3.toString(), {
                        cause: err_3
                    });
                case 8:
                    if (!ip || ip !== process.env.PROXY_VALIDATE_IP) {
                        throw new Error("Proxy IP mismatch: " + ip + " !== " + process.env.PROXY_VALIDATE_IP);
                    }
                    _h.label = 9;
                case 9: return [4 /*yield*/, initializeNopechaExtension(browser, {
                        nopechaKey: nopechaKey,
                        minimize: minimize,
                        debug: debug,
                        timeoutMs: timeoutMs,
                        proxyServer: proxyServer
                    })];
                case 10:
                    _h.sent();
                    return [2 /*return*/, browser];
            }
        });
    });
}
exports.getBrowser = getBrowser;
function initializeNopechaExtension(browser, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, minimize, _b, debug, nopechaKey, proxyServer, page, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = opts.minimize, minimize = _a === void 0 ? false : _a, _b = opts.debug, debug = _b === void 0 ? false : _b, nopechaKey = opts.nopechaKey, proxyServer = opts.proxyServer;
                    if (!hasNopechaExtension) return [3 /*break*/, 8];
                    return [4 /*yield*/, getPage(browser, { proxyServer: proxyServer })];
                case 1:
                    page = _c.sent();
                    if (!minimize) return [3 /*break*/, 3];
                    return [4 /*yield*/, utils_1.minimizePage(page)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    if (debug) {
                        console.log('initializing nopecha extension with key', nopechaKey, '...');
                    }
                    i = 0;
                    _c.label = 4;
                case 4:
                    if (!(i < 5)) return [3 /*break*/, 8];
                    return [4 /*yield*/, page.goto("https://nopecha.com/setup#" + nopechaKey, {
                            waitUntil: 'networkidle0'
                        })];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, delay_1.default(500)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    ++i;
                    return [3 /*break*/, 4];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.initializeNopechaExtension = initializeNopechaExtension;
/**
 * Gets the default path to chrome's executable for the current platform.
 */
exports.defaultChromeExecutablePath = function () {
    // return executablePath()
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        return process.env.PUPPETEER_EXECUTABLE_PATH;
    }
    switch (os.platform()) {
        case 'win32':
            return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
        case 'darwin':
            return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        default: {
            /**
             * Since two (2) separate chrome releases exist on linux, we first do a
             * check to ensure we're executing the right one.
             */
            var chromeExists = fs.existsSync('/usr/bin/google-chrome');
            return chromeExists
                ? '/usr/bin/google-chrome'
                : '/usr/bin/google-chrome-stable';
        }
    }
};
function checkForChatGPTAtCapacity(page, opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, timeoutMs, _b, pollingIntervalMs, _c, retries, isAtCapacity, numTries, res, err_4, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = opts.timeoutMs, timeoutMs = _a === void 0 ? 2 * 60 * 1000 : _a, _b = opts.pollingIntervalMs, pollingIntervalMs = _b === void 0 ? 3000 : _b, _c = opts.retries, retries = _c === void 0 ? 10 : _c;
                    isAtCapacity = false;
                    numTries = 0;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, solveSimpleCaptchas(page)];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, page.$x("//div[contains(., 'ChatGPT is at capacity')]")];
                case 3:
                    res = _d.sent();
                    isAtCapacity = !!(res === null || res === void 0 ? void 0 : res.length);
                    if (!isAtCapacity) return [3 /*break*/, 6];
                    if (++numTries >= retries) {
                        return [3 /*break*/, 9];
                    }
                    // try refreshing the page if chatgpt is at capacity
                    return [4 /*yield*/, page.reload({
                            waitUntil: 'networkidle2',
                            timeout: timeoutMs
                        })];
                case 4:
                    // try refreshing the page if chatgpt is at capacity
                    _d.sent();
                    return [4 /*yield*/, delay_1.default(pollingIntervalMs)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_4 = _d.sent();
                    // ignore errors likely due to navigation
                    ++numTries;
                    return [3 /*break*/, 9];
                case 8:
                    if (isAtCapacity) return [3 /*break*/, 1];
                    _d.label = 9;
                case 9:
                    if (isAtCapacity) {
                        error = new types.ChatGPTError('ChatGPT is at capacity');
                        error.statusCode = 503;
                        throw error;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function waitForConditionOrAtCapacity(page, condition, opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, pollingIntervalMs;
        return __generator(this, function (_b) {
            _a = opts.pollingIntervalMs, pollingIntervalMs = _a === void 0 ? 500 : _a;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var resolved = false;
                    function waitForCapacityText() {
                        return __awaiter(this, void 0, void 0, function () {
                            var err_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (resolved) {
                                            return [2 /*return*/];
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, checkForChatGPTAtCapacity(page)];
                                    case 2:
                                        _a.sent();
                                        if (!resolved) {
                                            setTimeout(waitForCapacityText, pollingIntervalMs);
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_5 = _a.sent();
                                        if (!resolved) {
                                            resolved = true;
                                            return [2 /*return*/, reject(err_5)];
                                        }
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    }
                    condition()
                        .then(function () {
                        if (!resolved) {
                            resolved = true;
                            resolve();
                        }
                    })
                        .catch(function (err) {
                        if (!resolved) {
                            resolved = true;
                            reject(err);
                        }
                    });
                    setTimeout(waitForCapacityText, pollingIntervalMs);
                })];
        });
    });
}
function solveSimpleCaptchas(page) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyYouAreHuman, cloudflareButton, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, page.$('text=Verify you are human')];
                case 1:
                    verifyYouAreHuman = _a.sent();
                    if (!verifyYouAreHuman) return [3 /*break*/, 5];
                    return [4 /*yield*/, delay_1.default(2000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, verifyYouAreHuman.click({
                            delay: random_1.default.int(5, 25)
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, delay_1.default(1000)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, page.$('.hcaptcha-box')];
                case 6:
                    cloudflareButton = _a.sent();
                    if (!cloudflareButton) return [3 /*break*/, 10];
                    return [4 /*yield*/, delay_1.default(2000)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, cloudflareButton.click({
                            delay: random_1.default.int(5, 25)
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, delay_1.default(1000)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_6 = _a.sent();
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function waitForRecaptcha(page, opts) {
    var _a;
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _b, pollingIntervalMs, timeoutMs, captcha, startTime, captcha_1, value, err_7, now;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, solveSimpleCaptchas(page)];
                case 1:
                    _c.sent();
                    if (!hasNopechaExtension) {
                        return [2 /*return*/];
                    }
                    _b = opts.pollingIntervalMs, pollingIntervalMs = _b === void 0 ? 100 : _b, timeoutMs = opts.timeoutMs;
                    return [4 /*yield*/, page.$('textarea#g-recaptcha-response')];
                case 2:
                    captcha = _c.sent();
                    startTime = Date.now();
                    if (!captcha) return [3 /*break*/, 10];
                    console.log('waiting to solve recaptcha...');
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, page.$('textarea#g-recaptcha-response')];
                case 4:
                    captcha_1 = _c.sent();
                    if (!captcha_1) {
                        // the user may have gone past the page manually
                        console.log('captcha no longer found; continuing');
                        return [3 /*break*/, 10];
                    }
                    return [4 /*yield*/, captcha_1.evaluate(function (el) { return el.value; })];
                case 5:
                    value = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.trim();
                    if (value === null || value === void 0 ? void 0 : value.length) {
                        // recaptcha has been solved!
                        console.log('captcha solved; continuing');
                        return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_7 = _c.sent();
                    return [3 /*break*/, 7];
                case 7:
                    if (timeoutMs) {
                        now = Date.now();
                        if (now - startTime >= timeoutMs) {
                            throw new p_timeout_1.TimeoutError('Timed out waiting to solve Recaptcha');
                        }
                    }
                    return [4 /*yield*/, delay_1.default(pollingIntervalMs)];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    if (true) return [3 /*break*/, 3];
                    _c.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}

