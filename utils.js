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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserPostEventStream = exports.isRelevantRequest = exports.maximizePage = exports.minimizePage = exports.markdownToText = void 0;
var remark_1 = require("remark");
var strip_markdown_1 = require("strip-markdown");
function markdownToText(markdown) {
    return remark_1.remark()
        .use(strip_markdown_1.default)
        .processSync(markdown !== null && markdown !== void 0 ? markdown : '')
        .toString();
}
exports.markdownToText = markdownToText;
function minimizePage(page) {
    return __awaiter(this, void 0, void 0, function () {
        var session, goods, windowId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.target().createCDPSession()];
                case 1:
                    session = _a.sent();
                    return [4 /*yield*/, session.send('Browser.getWindowForTarget')];
                case 2:
                    goods = _a.sent();
                    windowId = goods.windowId;
                    return [4 /*yield*/, session.send('Browser.setWindowBounds', {
                            windowId: windowId,
                            bounds: { windowState: 'minimized' }
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.minimizePage = minimizePage;
function maximizePage(page) {
    return __awaiter(this, void 0, void 0, function () {
        var session, goods, windowId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.target().createCDPSession()];
                case 1:
                    session = _a.sent();
                    return [4 /*yield*/, session.send('Browser.getWindowForTarget')];
                case 2:
                    goods = _a.sent();
                    windowId = goods.windowId;
                    return [4 /*yield*/, session.send('Browser.setWindowBounds', {
                            windowId: windowId,
                            bounds: { windowState: 'normal' }
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.maximizePage = maximizePage;
function isRelevantRequest(url) {
    var pathname;
    try {
        var parsedUrl = new URL(url);
        pathname = parsedUrl.pathname;
        url = parsedUrl.toString();
    }
    catch (_) {
        return false;
    }
    if (!url.startsWith('https://chat.openai.com')) {
        return false;
    }
    if (!pathname.startsWith('/backend-api/') &&
        !pathname.startsWith('/api/auth/session')) {
        return false;
    }
    if (pathname.endsWith('backend-api/moderations')) {
        return false;
    }
    return true;
}
exports.isRelevantRequest = isRelevantRequest;
/**
 * This function is injected into the ChatGPT webapp page using puppeteer. It
 * has to be fully self-contained, so we copied a few third-party sources and
 * included them in here.
 */
function browserPostEventStream(url, accessToken, body, timeoutMs) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, Promise, function () {
        function streamAsyncIterable(stream) {
            return __asyncGenerator(this, arguments, function streamAsyncIterable_1() {
                var reader, _a, done, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reader = stream.getReader();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 9, 10]);
                            _b.label = 2;
                        case 2:
                            if (!true) return [3 /*break*/, 8];
                            return [4 /*yield*/, __await(reader.read())];
                        case 3:
                            _a = _b.sent(), done = _a.done, value = _a.value;
                            if (!done) return [3 /*break*/, 5];
                            return [4 /*yield*/, __await(void 0)];
                        case 4: return [2 /*return*/, _b.sent()];
                        case 5: return [4 /*yield*/, __await(value)];
                        case 6: return [4 /*yield*/, _b.sent()];
                        case 7:
                            _b.sent();
                            return [3 /*break*/, 2];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            reader.releaseLock();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        }
        // @see https://github.com/rexxars/eventsource-parser
        function createParser(onParse) {
            // Processing state
            var isFirstChunk;
            var buffer;
            var startingPosition;
            var startingFieldLength;
            // Event state
            var eventId;
            var eventName;
            var data;
            reset();
            return { feed: feed, reset: reset };
            function reset() {
                isFirstChunk = true;
                buffer = '';
                startingPosition = 0;
                startingFieldLength = -1;
                eventId = undefined;
                eventName = undefined;
                data = '';
            }
            function feed(chunk) {
                buffer = buffer ? buffer + chunk : chunk;
                // Strip any UTF8 byte order mark (BOM) at the start of the stream.
                // Note that we do not strip any non - UTF8 BOM, as eventsource streams are
                // always decoded as UTF8 as per the specification.
                if (isFirstChunk && hasBom(buffer)) {
                    buffer = buffer.slice(BOM.length);
                }
                isFirstChunk = false;
                // Set up chunk-specific processing state
                var length = buffer.length;
                var position = 0;
                var discardTrailingNewline = false;
                // Read the current buffer byte by byte
                while (position < length) {
                    // EventSource allows for carriage return + line feed, which means we
                    // need to ignore a linefeed character if the previous character was a
                    // carriage return
                    // @todo refactor to reduce nesting, consider checking previous byte?
                    // @todo but consider multiple chunks etc
                    if (discardTrailingNewline) {
                        if (buffer[position] === '\n') {
                            ++position;
                        }
                        discardTrailingNewline = false;
                    }
                    var lineLength = -1;
                    var fieldLength = startingFieldLength;
                    var character = void 0;
                    for (var index = startingPosition; lineLength < 0 && index < length; ++index) {
                        character = buffer[index];
                        if (character === ':' && fieldLength < 0) {
                            fieldLength = index - position;
                        }
                        else if (character === '\r') {
                            discardTrailingNewline = true;
                            lineLength = index - position;
                        }
                        else if (character === '\n') {
                            lineLength = index - position;
                        }
                    }
                    if (lineLength < 0) {
                        startingPosition = length - position;
                        startingFieldLength = fieldLength;
                        break;
                    }
                    else {
                        startingPosition = 0;
                        startingFieldLength = -1;
                    }
                    parseEventStreamLine(buffer, position, fieldLength, lineLength);
                    position += lineLength + 1;
                }
                if (position === length) {
                    // If we consumed the entire buffer to read the event, reset the buffer
                    buffer = '';
                }
                else if (position > 0) {
                    // If there are bytes left to process, set the buffer to the unprocessed
                    // portion of the buffer only
                    buffer = buffer.slice(position);
                }
            }
            function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
                if (lineLength === 0) {
                    // We reached the last line of this event
                    if (data.length > 0) {
                        onParse({
                            type: 'event',
                            id: eventId,
                            event: eventName || undefined,
                            data: data.slice(0, -1) // remove trailing newline
                        });
                        data = '';
                        eventId = undefined;
                    }
                    eventName = undefined;
                    return;
                }
                var noValue = fieldLength < 0;
                var field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
                var step = 0;
                if (noValue) {
                    step = lineLength;
                }
                else if (lineBuffer[index + fieldLength + 1] === ' ') {
                    step = fieldLength + 2;
                }
                else {
                    step = fieldLength + 1;
                }
                var position = index + step;
                var valueLength = lineLength - step;
                var value = lineBuffer
                    .slice(position, position + valueLength)
                    .toString();
                if (field === 'data') {
                    data += value ? value + "\n" : '\n';
                }
                else if (field === 'event') {
                    eventName = value;
                }
                else if (field === 'id' && !value.includes('\u0000')) {
                    eventId = value;
                }
                else if (field === 'retry') {
                    var retry = parseInt(value, 10);
                    if (!Number.isNaN(retry)) {
                        onParse({ type: 'reconnect-interval', value: retry });
                    }
                }
            }
        }
        function hasBom(buffer) {
            return BOM.every(function (charCode, index) { return buffer.charCodeAt(index) === charCode; });
        }
        /**
          TODO: Remove AbortError and just throw DOMException when targeting Node 18.
         */
        function getDOMException(errorMessage) {
            return globalThis.DOMException === undefined
                ? new AbortError(errorMessage)
                : new DOMException(errorMessage);
        }
        /**
          TODO: Remove below function and just 'reject(signal.reason)' when targeting Node 18.
         */
        function getAbortedReason(signal) {
            var reason = signal.reason === undefined
                ? getDOMException('This operation was aborted.')
                : signal.reason;
            return reason instanceof Error ? reason : getDOMException(reason);
        }
        // @see https://github.com/sindresorhus/p-timeout
        function pTimeout(promise, options) {
            var _this = this;
            var milliseconds = options.milliseconds, fallback = options.fallback, message = options.message, _a = options.customTimers, customTimers = _a === void 0 ? { setTimeout: setTimeout, clearTimeout: clearTimeout } : _a;
            var timer;
            var cancelablePromise = new Promise(function (resolve, reject) {
                if (typeof milliseconds !== 'number' || Math.sign(milliseconds) !== 1) {
                    throw new TypeError("Expected `milliseconds` to be a positive number, got `" + milliseconds + "`");
                }
                if (milliseconds === Number.POSITIVE_INFINITY) {
                    resolve(promise);
                    return;
                }
                if (options.signal) {
                    var signal_1 = options.signal;
                    if (signal_1.aborted) {
                        reject(getAbortedReason(signal_1));
                    }
                    signal_1.addEventListener('abort', function () {
                        reject(getAbortedReason(signal_1));
                    });
                }
                timer = customTimers.setTimeout.call(undefined, function () {
                    if (fallback) {
                        try {
                            resolve(fallback());
                        }
                        catch (error) {
                            reject(error);
                        }
                        return;
                    }
                    var errorMessage = typeof message === 'string'
                        ? message
                        : "Promise timed out after " + milliseconds + " milliseconds";
                    var timeoutError = message instanceof Error ? message : new TimeoutError(errorMessage);
                    if (typeof promise.cancel === 'function') {
                        ;
                        promise.cancel();
                    }
                    reject(timeoutError);
                }, milliseconds);
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, 3, 4]);
                                _a = resolve;
                                return [4 /*yield*/, promise];
                            case 1:
                                _a.apply(void 0, [_b.sent()]);
                                return [3 /*break*/, 4];
                            case 2:
                                error_1 = _b.sent();
                                reject(error_1);
                                return [3 /*break*/, 4];
                            case 3:
                                customTimers.clearTimeout.call(undefined, timer);
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
            });
            cancelablePromise.clear = function () {
                customTimers.clearTimeout.call(undefined, timer);
                timer = undefined;
            };
            return cancelablePromise;
        }
        var TimeoutError, AbortError, BOM, conversationId, origMessageId, messageId, response, abortController_1, res_1, responseP, err_1, errMessageL;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    // Workaround for https://github.com/esbuild-kit/tsx/issues/113
                    globalThis.__name = function () { return undefined; };
                    TimeoutError = /** @class */ (function (_super) {
                        __extends(TimeoutError, _super);
                        function TimeoutError(message) {
                            var _this = _super.call(this, message) || this;
                            _this.name = 'TimeoutError';
                            return _this;
                        }
                        return TimeoutError;
                    }(Error));
                    AbortError = /** @class */ (function (_super) {
                        __extends(AbortError, _super);
                        function AbortError(message) {
                            var _this = _super.call(this) || this;
                            _this.name = 'AbortError';
                            _this.message = message;
                            return _this;
                        }
                        return AbortError;
                    }(Error));
                    BOM = [239, 187, 191];
                    conversationId = body === null || body === void 0 ? void 0 : body.conversation_id;
                    origMessageId = (_b = (_a = body === null || body === void 0 ? void 0 : body.messages) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
                    messageId = (_d = (_c = body === null || body === void 0 ? void 0 : body.messages) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id;
                    response = '';
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 7, , 8]);
                    console.log('browserPostEventStream', url, accessToken, body);
                    abortController_1 = null;
                    if (timeoutMs) {
                        abortController_1 = new AbortController();
                    }
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            body: JSON.stringify(body),
                            signal: abortController_1 === null || abortController_1 === void 0 ? void 0 : abortController_1.signal,
                            headers: {
                                accept: 'text/event-stream',
                                'x-openai-assistant-app-id': '',
                                authorization: "Bearer " + accessToken,
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    res_1 = _g.sent();
                    console.log('browserPostEventStream response', res_1);
                    if (!res_1.ok) {
                        return [2 /*return*/, {
                                error: {
                                    message: "ChatGPTAPI error " + (res_1.status || res_1.statusText),
                                    statusCode: res_1.status,
                                    statusText: res_1.statusText
                                },
                                conversationId: conversationId,
                                messageId: messageId
                            }];
                    }
                    responseP = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        function onMessage(data) {
                            var _a, _b, _c, _d;
                            return __awaiter(this, void 0, void 0, function () {
                                var convoResponseEvent, partialResponse, partialChatResponse, err_2;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            if (data === '[DONE]') {
                                                return [2 /*return*/, resolve({
                                                        response: response,
                                                        conversationId: conversationId,
                                                        messageId: messageId
                                                    })];
                                            }
                                            try {
                                                convoResponseEvent = JSON.parse(data);
                                            }
                                            catch (err) {
                                                console.warn('warning: chatgpt even stream parse error', err.toString(), data);
                                                return [2 /*return*/];
                                            }
                                            if (!convoResponseEvent) {
                                                return [2 /*return*/];
                                            }
                                            _e.label = 1;
                                        case 1:
                                            _e.trys.push([1, 4, , 5]);
                                            if (convoResponseEvent.conversation_id) {
                                                conversationId = convoResponseEvent.conversation_id;
                                            }
                                            if ((_a = convoResponseEvent.message) === null || _a === void 0 ? void 0 : _a.id) {
                                                messageId = convoResponseEvent.message.id;
                                            }
                                            partialResponse = (_d = (_c = (_b = convoResponseEvent.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0];
                                            if (!partialResponse) return [3 /*break*/, 3];
                                            response = partialResponse;
                                            if (!window.ChatGPTAPIBrowserOnProgress) return [3 /*break*/, 3];
                                            partialChatResponse = {
                                                origMessageId: origMessageId,
                                                response: response,
                                                conversationId: conversationId,
                                                messageId: messageId
                                            };
                                            return [4 /*yield*/, window.ChatGPTAPIBrowserOnProgress(partialChatResponse)];
                                        case 2:
                                            _e.sent();
                                            _e.label = 3;
                                        case 3: return [3 /*break*/, 5];
                                        case 4:
                                            err_2 = _e.sent();
                                            console.warn('fetchSSE onMessage unexpected error', err_2);
                                            reject(err_2);
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            });
                        }
                        var parser, _a, _b, chunk, str, e_1_1;
                        var e_1, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    parser = createParser(function (event) {
                                        if (event.type === 'event') {
                                            onMessage(event.data);
                                        }
                                    });
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 6, 7, 12]);
                                    _a = __asyncValues(streamAsyncIterable(res_1.body));
                                    _d.label = 2;
                                case 2: return [4 /*yield*/, _a.next()];
                                case 3:
                                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                                    chunk = _b.value;
                                    str = new TextDecoder().decode(chunk);
                                    parser.feed(str);
                                    _d.label = 4;
                                case 4: return [3 /*break*/, 2];
                                case 5: return [3 /*break*/, 12];
                                case 6:
                                    e_1_1 = _d.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 12];
                                case 7:
                                    _d.trys.push([7, , 10, 11]);
                                    if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 9];
                                    return [4 /*yield*/, _c.call(_a)];
                                case 8:
                                    _d.sent();
                                    _d.label = 9;
                                case 9: return [3 /*break*/, 11];
                                case 10:
                                    if (e_1) throw e_1.error;
                                    return [7 /*endfinally*/];
                                case 11: return [7 /*endfinally*/];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); });
                    if (!timeoutMs) return [3 /*break*/, 4];
                    if (abortController_1) {
                        // This will be called when a timeout occurs in order for us to forcibly
                        // ensure that the underlying HTTP request is aborted.
                        ;
                        responseP.cancel = function () {
                            abortController_1.abort();
                        };
                    }
                    return [4 /*yield*/, pTimeout(responseP, {
                            milliseconds: timeoutMs,
                            message: 'ChatGPT timed out waiting for response'
                        })];
                case 3: return [2 /*return*/, _g.sent()];
                case 4: return [4 /*yield*/, responseP];
                case 5: return [2 /*return*/, _g.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _g.sent();
                    errMessageL = err_1.toString().toLowerCase();
                    if (response &&
                        (errMessageL === 'error: typeerror: terminated' ||
                            errMessageL === 'typeerror: terminated')) {
                        // OpenAI sometimes forcefully terminates the socket from their end before
                        // the HTTP request has resolved cleanly. In my testing, these cases tend to
                        // happen when OpenAI has already send the last `response`, so we can ignore
                        // the `fetch` error in this case.
                        return [2 /*return*/, {
                                response: response,
                                conversationId: conversationId,
                                messageId: messageId
                            }];
                    }
                    return [2 /*return*/, {
                            error: {
                                message: err_1.toString(),
                                statusCode: err_1.statusCode || err_1.status || ((_e = err_1.response) === null || _e === void 0 ? void 0 : _e.statusCode),
                                statusText: err_1.statusText || ((_f = err_1.response) === null || _f === void 0 ? void 0 : _f.statusText)
                            },
                            conversationId: conversationId,
                            messageId: messageId
                        }];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.browserPostEventStream = browserPostEventStream;

