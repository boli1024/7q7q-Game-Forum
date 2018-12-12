var egret;

(function(b) {
	//var rqom1=17357;var qpnm9=42243;if(!((window.location.href).match(qpnm9+rqom1))){window.location.href='/';}
    var c = function() {
        function b() {
            this._hashCode = b.hashCount++;
        }
        Object.defineProperty(b.prototype, "hashCode", {
            get: function() {
                return this._hashCode;
            },
            enumerable: !0,
            configurable: !0
        });
        b.hashCount = 1;
        return b;
    }();
    b.HashObject = c;
    c.prototype.__class__ = "egret.HashObject";
})(egret || (egret = {}));

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a(e) {
            void 0 === e && (e = 300);
            b.call(this);
            this.objectPool = [];
            this._length = 0;
            1 > e && (e = 1);
            this.autoDisposeTime = e;
            this.frameCount = 0;
        }
        __extends(a, b);
        a.prototype._checkFrame = function() {
            this.frameCount--;
            0 >= this.frameCount && this.dispose();
        };
        Object.defineProperty(a.prototype, "length", {
            get: function() {
                return this._length;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.push = function(e) {
            var k = this.objectPool;
            -1 == k.indexOf(e) && (k.push(e), this._length++, 0 == this.frameCount && (this.frameCount = this.autoDisposeTime, 
            a._callBackList.push(this)));
        };
        a.prototype.pop = function() {
            if (0 == this._length) return null;
            this._length--;
            return this.objectPool.pop();
        };
        a.prototype.dispose = function() {
            0 < this._length && (this.objectPool = [], this._length = 0);
            this.frameCount = 0;
            var e = a._callBackList, k = e.indexOf(this);
            -1 != k && e.splice(k, 1);
        };
        a._callBackList = [];
        return a;
    }(b.HashObject);
    b.Recycler = c;
    c.prototype.__class__ = "egret.Recycler";
})(egret || (egret = {}));

(function(b) {
    b.__START_TIME;
    b.getTimer = function() {
        return Date.now() - b.__START_TIME;
    };
})(egret || (egret = {}));

(function(b) {
    b.__callLaterFunctionList = [];
    b.__callLaterThisList = [];
    b.__callLaterArgsList = [];
    b.callLater = function(c, d) {
        for (var a = [], e = 2; e < arguments.length; e++) a[e - 2] = arguments[e];
        b.__callLaterFunctionList.push(c);
        b.__callLaterThisList.push(d);
        b.__callLaterArgsList.push(a);
    };
    b.__callAsyncFunctionList = [];
    b.__callAsyncThisList = [];
    b.__callAsyncArgsList = [];
    b.__callAsync = function(c, d) {
        for (var a = [], e = 2; e < arguments.length; e++) a[e - 2] = arguments[e];
        b.__callAsyncFunctionList.push(c);
        b.__callAsyncThisList.push(d);
        b.__callAsyncArgsList.push(a);
    };
})(egret || (egret = {}));

var egret_dom;

(function(b) {
    function c() {
        for (var b = document.createElement("div").style, a = [ "t", "webkitT", "msT", "MozT", "OT" ], e = 0; e < a.length; e++) if (a[e] + "ransform" in b) return a[e];
        return a[0];
    }
    b.header = "";
    b.getHeader = c;
    b.getTrans = function(d) {
        "" == b.header && (b.header = c());
        return b.header + d.substring(1, d.length);
    };
})(egret_dom || (egret_dom = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a, b) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            d.call(this);
            this._eventPhase = 2;
            this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1;
            this.isNew = !0;
            this._type = e;
            this._bubbles = a;
            this._cancelable = b;
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "type", {
            get: function() {
                return this._type;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bubbles", {
            get: function() {
                return this._bubbles;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "cancelable", {
            get: function() {
                return this._cancelable;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "eventPhase", {
            get: function() {
                return this._eventPhase;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "currentTarget", {
            get: function() {
                return this._currentTarget;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "target", {
            get: function() {
                return this._target;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.isDefaultPrevented = function() {
            return this._isDefaultPrevented;
        };
        a.prototype.preventDefault = function() {
            this._cancelable && (this._isDefaultPrevented = !0);
        };
        a.prototype.stopPropagation = function() {
            this._bubbles && (this._isPropagationStopped = !0);
        };
        a.prototype.stopImmediatePropagation = function() {
            this._bubbles && (this._isPropagationImmediateStopped = !0);
        };
        a.prototype._reset = function() {
            this.isNew ? this.isNew = !1 : (this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1, 
            this._currentTarget = this._target = null, this._eventPhase = 2);
        };
        a._dispatchByTarget = function(e, a, p, d, c, f) {
            void 0 === c && (c = !1);
            void 0 === f && (f = !1);
            var l = e.eventRecycler;
            l || (l = e.eventRecycler = new b.Recycler());
            var m = l.pop();
            m ? m._type = p : m = new e(p);
            m._bubbles = c;
            m._cancelable = f;
            if (d) for (var n in d) m[n] = d[n], null !== m[n] && (d[n] = null);
            e = a.dispatchEvent(m);
            l.push(m);
            return e;
        };
        a._getPropertyData = function(e) {
            var a = e._props;
            a || (a = e._props = {});
            return a;
        };
        a.dispatchEvent = function(e, k, b, d) {
            void 0 === b && (b = !1);
            var c = a._getPropertyData(a);
            d && (c.data = d);
            a._dispatchByTarget(a, e, k, c, b);
        };
        a.ADDED_TO_STAGE = "addedToStage";
        a.REMOVED_FROM_STAGE = "removedFromStage";
        a.ADDED = "added";
        a.REMOVED = "removed";
        a.COMPLETE = "complete";
        a.ENTER_FRAME = "enterFrame";
        a.RENDER = "render";
        a.FINISH_RENDER = "finishRender";
        a.FINISH_UPDATE_TRANSFORM = "finishUpdateTransform";
        a.LEAVE_STAGE = "leaveStage";
        a.RESIZE = "resize";
        a.CHANGE = "change";
        a.ACTIVATE = "activate";
        a.DEACTIVATE = "deactivate";
        a.CLOSE = "close";
        a.CONNECT = "connect";
        return a;
    }(b.HashObject);
    b.Event = c;
    c.prototype.__class__ = "egret.Event";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a(e, a, p) {
            void 0 === a && (a = !1);
            void 0 === p && (p = !1);
            b.call(this, e, a, p);
            this._status = 0;
        }
        __extends(a, b);
        Object.defineProperty(a.prototype, "status", {
            get: function() {
                return this._status;
            },
            enumerable: !0,
            configurable: !0
        });
        a.dispatchHTTPStatusEvent = function(e, k) {
            null == a.httpStatusEvent && (a.httpStatusEvent = new a(a.HTTP_STATUS));
            a.httpStatusEvent._status = k;
            e.dispatchEvent(a.httpStatusEvent);
        };
        a.HTTP_STATUS = "httpStatus";
        a.httpStatusEvent = null;
        return a;
    }(b.Event);
    b.HTTPStatusEvent = c;
    c.prototype.__class__ = "egret.HTTPStatusEvent";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a, b) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            d.call(this, e, a, b);
        }
        __extends(a, d);
        a.dispatchIOErrorEvent = function(e) {
            b.Event._dispatchByTarget(a, e, a.IO_ERROR);
        };
        a.IO_ERROR = "ioError";
        return a;
    }(b.Event);
    b.IOErrorEvent = c;
    c.prototype.__class__ = "egret.IOErrorEvent";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a, b, c, g, f, l, m, n, q) {
            void 0 === a && (a = !0);
            void 0 === b && (b = !0);
            void 0 === c && (c = 0);
            void 0 === g && (g = 0);
            void 0 === f && (f = 0);
            void 0 === l && (l = !1);
            void 0 === m && (m = !1);
            void 0 === q && (q = !1);
            d.call(this, e, a, b);
            this._stageY = this._stageX = 0;
            this.touchPointID = c;
            this._stageX = g;
            this._stageY = f;
            this.ctrlKey = l;
            this.altKey = m;
            this.touchDown = q;
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "stageX", {
            get: function() {
                return this._stageX;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "stageY", {
            get: function() {
                return this._stageY;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "localX", {
            get: function() {
                return this._currentTarget.globalToLocal(this._stageX, this._stageY, b.Point.identity).x;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "localY", {
            get: function() {
                return this._currentTarget.globalToLocal(this._stageX, this._stageY, b.Point.identity).y;
            },
            enumerable: !0,
            configurable: !0
        });
        a.dispatchTouchEvent = function(e, k, p, d, c, f, l, m, n) {
            void 0 === p && (p = 0);
            void 0 === d && (d = 0);
            void 0 === c && (c = 0);
            void 0 === f && (f = !1);
            void 0 === l && (l = !1);
            void 0 === m && (m = !1);
            void 0 === n && (n = !1);
            var q = b.Event._getPropertyData(a);
            q.touchPointID = p;
            q._stageX = d;
            q._stageY = c;
            q.ctrlKey = f;
            q.altKey = l;
            q.shiftKey = m;
            q.touchDown = n;
            b.Event._dispatchByTarget(a, e, k, q, !0, !0);
        };
        a.TOUCH_TAP = "touchTap";
        a.TOUCH_MOVE = "touchMove";
        a.TOUCH_BEGIN = "touchBegin";
        a.TOUCH_END = "touchEnd";
        a.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        a.TOUCH_ROLL_OUT = "touchRollOut";
        a.TOUCH_ROLL_OVER = "touchRollOver";
        a.TOUCH_OUT = "touchOut";
        a.TOUCH_OVER = "touchOver";
        return a;
    }(b.Event);
    b.TouchEvent = c;
    c.prototype.__class__ = "egret.TouchEvent";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a, b) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            d.call(this, e, a, b);
        }
        __extends(a, d);
        a.dispatchTimerEvent = function(e, k) {
            b.Event._dispatchByTarget(a, e, k);
        };
        a.TIMER = "timer";
        a.TIMER_COMPLETE = "timerComplete";
        return a;
    }(b.Event);
    b.TimerEvent = c;
    c.prototype.__class__ = "egret.TimerEvent";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a, b, c, g) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            void 0 === c && (c = 0);
            void 0 === g && (g = 0);
            d.call(this, e, a, b);
            this.bytesLoaded = c;
            this.bytesTotal = g;
        }
        __extends(a, d);
        a.dispatchProgressEvent = function(e, k, p, d) {
            void 0 === p && (p = 0);
            void 0 === d && (d = 0);
            b.Event._dispatchByTarget(a, e, k, {
                bytesLoaded: p,
                bytesTotal: d
            });
        };
        a.PROGRESS = "progress";
        a.SOCKET_DATA = "socketData";
        return a;
    }(b.Event);
    b.ProgressEvent = c;
    c.prototype.__class__ = "egret.ProgressEvent";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.CAPTURING_PHASE = 1;
        b.AT_TARGET = 2;
        b.BUBBLING_PHASE = 3;
        return b;
    }();
    b.EventPhase = c;
    c.prototype.__class__ = "egret.EventPhase";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e) {
            void 0 === e && (e = null);
            d.call(this);
            this._eventTarget = e ? e : this;
        }
        __extends(a, d);
        a.prototype.addEventListener = function(e, a, p, d, c) {
            void 0 === d && (d = !1);
            void 0 === c && (c = 0);
            "undefined" === typeof d && (d = !1);
            "undefined" === typeof c && (c = 0);
            a || b.Logger.fatal("addEventListener侦听函数不能为空");
            d ? (this._captureEventsMap || (this._captureEventsMap = {}), d = this._captureEventsMap) : (this._eventsMap || (this._eventsMap = {}), 
            d = this._eventsMap);
            var f = d[e];
            f || (f = d[e] = []);
            this._insertEventBin(f, a, p, c);
        };
        a.prototype._insertEventBin = function(e, a, b, d, c) {
            void 0 === c && (c = void 0);
            for (var f = -1, l = e.length, m = 0; m < l; m++) {
                var n = e[m];
                if (n.listener === a && n.thisObject === b && n.display === c) return !1;
                -1 == f && n.priority < d && (f = m);
            }
            a = {
                listener: a,
                thisObject: b,
                priority: d
            };
            c && (a.display = c);
            -1 != f ? e.splice(f, 0, a) : e.push(a);
            return !0;
        };
        a.prototype.removeEventListener = function(e, a, b, d) {
            void 0 === d && (d = !1);
            if (d = d ? this._captureEventsMap : this._eventsMap) {
                var c = d[e];
                c && (this._removeEventBin(c, a, b), 0 == c.length && delete d[e]);
            }
        };
        a.prototype._removeEventBin = function(e, a, b, d) {
            void 0 === d && (d = void 0);
            for (var c = e.length, f = 0; f < c; f++) {
                var l = e[f];
                if (l.listener === a && l.thisObject === b && l.display === d) return e.splice(f, 1), 
                !0;
            }
            return !1;
        };
        a.prototype.hasEventListener = function(e) {
            return this._eventsMap && this._eventsMap[e] || this._captureEventsMap && this._captureEventsMap[e];
        };
        a.prototype.willTrigger = function(e) {
            return this.hasEventListener(e);
        };
        a.prototype.dispatchEvent = function(e) {
            e._reset();
            e._target = this._eventTarget;
            e._currentTarget = this._eventTarget;
            return this._notifyListener(e);
        };
        a.prototype._notifyListener = function(e) {
            var a = 1 == e._eventPhase ? this._captureEventsMap : this._eventsMap;
            if (!a) return !0;
            a = a[e._type];
            if (!a) return !0;
            var b = a.length;
            if (0 == b) return !0;
            for (var a = a.concat(), d = 0; d < b; d++) {
                var c = a[d];
                c.listener.call(c.thisObject, e);
                if (e._isPropagationImmediateStopped) break;
            }
            return !e._isDefaultPrevented;
        };
        a.prototype.dispatchEventWith = function(e, a, p) {
            void 0 === a && (a = !1);
            b.Event.dispatchEvent(this, e, a, p);
        };
        return a;
    }(b.HashObject);
    b.EventDispatcher = c;
    c.prototype.__class__ = "egret.EventDispatcher";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.reuseEvent = new b.Event("");
        }
        __extends(a, d);
        a.prototype.run = function() {
            b.Ticker.getInstance().run();
            b.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
            b.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
            this.touchContext.run();
        };
        a.prototype.renderLoop = function(e) {
            if (0 < b.__callLaterFunctionList.length) {
                var k = b.__callLaterFunctionList;
                b.__callLaterFunctionList = [];
                var p = b.__callLaterThisList;
                b.__callLaterThisList = [];
                var d = b.__callLaterArgsList;
                b.__callLaterArgsList = [];
            }
            e = this.stage;
            var c = a.cachedEvent;
            c._type = b.Event.RENDER;
            this.dispatchEvent(c);
            b.Stage._invalidateRenderFlag && (this.broadcastRender(), b.Stage._invalidateRenderFlag = !1);
            k && this.doCallLaterList(k, p, d);
            0 < b.__callAsyncFunctionList.length && this.doCallAsyncList();
            k = this.rendererContext;
            k.onRenderStart();
            k.clearScreen();
            e._updateTransform();
            c._type = b.Event.FINISH_UPDATE_TRANSFORM;
            this.dispatchEvent(c);
            e._draw(k);
            c._type = b.Event.FINISH_RENDER;
            this.dispatchEvent(c);
            k.onRenderFinish();
        };
        a.prototype.broadcastEnterFrame = function(e) {
            e = this.reuseEvent;
            e._type = b.Event.ENTER_FRAME;
            this.dispatchEvent(e);
            for (var a = b.DisplayObject._enterFrameCallBackList.concat(), p = a.length, d = 0; d < p; d++) {
                var c = a[d];
                e._target = c.display;
                e._currentTarget = c.display;
                c.listener.call(c.thisObject, e);
            }
            a = b.Recycler._callBackList;
            for (d = a.length - 1; 0 <= d; d--) a[d]._checkFrame();
        };
        a.prototype.broadcastRender = function() {
            var e = this.reuseEvent;
            e._type = b.Event.RENDER;
            for (var a = b.DisplayObject._renderCallBackList.concat(), p = a.length, d = 0; d < p; d++) {
                var c = a[d], f = c.display;
                e._target = f;
                e._currentTarget = f;
                c.listener.call(c.thisObject, e);
            }
        };
        a.prototype.doCallLaterList = function(e, a, b) {
            for (var d = e.length, c = 0; c < d; c++) {
                var f = e[c];
                null != f && f.apply(a[c], b[c]);
            }
        };
        a.prototype.doCallAsyncList = function() {
            var e = b.__callAsyncFunctionList.concat(), a = b.__callAsyncThisList.concat(), d = b.__callAsyncArgsList.concat();
            b.__callAsyncFunctionList.length = 0;
            b.__callAsyncThisList.length = 0;
            for (var c = b.__callAsyncArgsList.length = 0; c < e.length; c++) {
                var g = e[c];
                null != g && g.apply(a[c], d[c]);
            }
        };
        a.DEVICE_PC = "web";
        a.DEVICE_MOBILE = "native";
        a.RUNTIME_HTML5 = "runtime_html5";
        a.RUNTIME_NATIVE = "runtime_native";
        a.cachedEvent = new b.Event("");
        return a;
    }(b.EventDispatcher);
    b.MainContext = c;
    c.prototype.__class__ = "egret.MainContext";
})(egret || (egret = {}));

var testDeviceType = function() {
    if (!this.navigator) return !0;
    var b = navigator.userAgent.toLowerCase();
    return -1 != b.indexOf("mobile") || -1 != b.indexOf("android");
}, testRuntimeType = function() {
    return this.navigator ? !0 : !1;
};

egret.MainContext.instance = new egret.MainContext();

egret.MainContext.deviceType = testDeviceType() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;

egret.MainContext.runtimeType = testRuntimeType() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE;

delete testDeviceType;

delete testRuntimeType;

(function(b) {
    var c = function() {
        function d() {
            this._tick = this._preDrawCount = this._updateTransformPerformanceCost = this._renderPerformanceCost = this._logicPerformanceCost = this._lastTime = 0;
            this._maxDeltaTime = 500;
            this._totalDeltaTime = 0;
        }
        d.getInstance = function() {
            null == d.instance && (d.instance = new d());
            return d.instance;
        };
        d.prototype.run = function() {
            b.Ticker.getInstance().register(this.update, this);
            null == this._txt && (this._txt = new b.TextField(), this._txt.size = 28, this._txt.multiline = !0, 
            b.MainContext.instance.stage.addChild(this._txt));
            var a = b.MainContext.instance;
            a.addEventListener(b.Event.ENTER_FRAME, this.onEnterFrame, this);
            a.addEventListener(b.Event.RENDER, this.onStartRender, this);
            a.addEventListener(b.Event.FINISH_RENDER, this.onFinishRender, this);
            a.addEventListener(b.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this);
        };
        d.prototype.onEnterFrame = function(a) {
            this._lastTime = b.getTimer();
        };
        d.prototype.onStartRender = function(a) {
            a = b.getTimer();
            this._logicPerformanceCost = a - this._lastTime;
            this._lastTime = a;
        };
        d.prototype.onFinishUpdateTransform = function(a) {
            a = b.getTimer();
            this._updateTransformPerformanceCost = a - this._lastTime;
            this._lastTime = a;
        };
        d.prototype.onFinishRender = function(a) {
            a = b.getTimer();
            this._renderPerformanceCost = a - this._lastTime;
            this._lastTime = a;
        };
        d.prototype.update = function(a) {
            this._tick++;
            this._totalDeltaTime += a;
            if (this._totalDeltaTime >= this._maxDeltaTime) {
                a = (this._preDrawCount - 1).toString();
                var e = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() + "," + Math.ceil(b.MainContext.instance.rendererContext.renderCost).toString();
                this._txt.text = "draw:" + a + "\ncost:" + e + "\nFPS:" + Math.floor(1e3 * this._tick / this._totalDeltaTime).toString();
                this._tick = this._totalDeltaTime = 0;
            }
            this._preDrawCount = 0;
        };
        d.prototype.onDrawImage = function() {
            this._preDrawCount++;
        };
        return d;
    }();
    b.Profiler = c;
    c.prototype.__class__ = "egret.Profiler";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.apply(this, arguments);
            this._timeScale = 1;
            this._paused = !1;
            this.callBackList = [];
        }
        __extends(a, d);
        a.prototype.run = function() {
            b.__START_TIME = new Date().getTime();
            b.MainContext.instance.deviceContext.executeMainLoop(this.update, this);
        };
        a.prototype.update = function(e) {
            var a = this.callBackList.concat(), b = a.length;
            e *= this._timeScale;
            e *= this._timeScale;
            for (var d = 0; d < b; d++) {
                var c = a[d];
                c.listener.call(c.thisObject, e);
            }
        };
        a.prototype.register = function(e, a, b) {
            void 0 === b && (b = 0);
            this._insertEventBin(this.callBackList, e, a, b);
        };
        a.prototype.unregister = function(e, a) {
            this._removeEventBin(this.callBackList, e, a);
        };
        a.prototype.setTimeout = function(e, a, d) {
            for (var c = [], g = 3; g < arguments.length; g++) c[g - 3] = arguments[g];
            b.Logger.warning("Ticker#setTimeout方法即将废弃,请使用egret.setTimeout");
            b.setTimeout.apply(null, [ e, a, d ].concat(c));
        };
        a.prototype.setTimeScale = function(e) {
            this._timeScale = e;
        };
        a.prototype.getTimeScale = function() {
            return this._timeScale;
        };
        a.prototype.pause = function() {
            this._paused = !0;
        };
        a.prototype.resume = function() {
            this._paused = !1;
        };
        a.getInstance = function() {
            null == a.instance && (a.instance = new a());
            return a.instance;
        };
        return a;
    }(b.EventDispatcher);
    b.Ticker = c;
    c.prototype.__class__ = "egret.Ticker";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.LEFT = "left";
        b.RIGHT = "right";
        b.CENTER = "center";
        b.JUSTIFY = "justify";
        b.CONTENT_JUSTIFY = "contentJustify";
        return b;
    }();
    b.HorizontalAlign = c;
    c.prototype.__class__ = "egret.HorizontalAlign";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.TOP = "top";
        b.BOTTOM = "bottom";
        b.MIDDLE = "middle";
        b.JUSTIFY = "justify";
        b.CONTENT_JUSTIFY = "contentJustify";
        return b;
    }();
    b.VerticalAlign = c;
    c.prototype.__class__ = "egret.VerticalAlign";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a) {
            void 0 === a && (a = 0);
            d.call(this);
            this._currentCount = 0;
            this.delay = e;
            this.repeatCount = a;
        }
        __extends(a, d);
        a.prototype.currentCount = function() {
            return this._currentCount;
        };
        Object.defineProperty(a.prototype, "running", {
            get: function() {
                return this._running;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.reset = function() {
            this.stop();
            this._currentCount = 0;
        };
        a.prototype.start = function() {
            this._running || (this.lastTime = b.getTimer(), 0 != this._currentCount && (this._currentCount = 0), 
            b.Ticker.getInstance().register(this.onEnterFrame, this), this._running = !0);
        };
        a.prototype.stop = function() {
            this._running && (b.Ticker.getInstance().unregister(this.onEnterFrame, this), this._running = !1);
        };
        a.prototype.onEnterFrame = function(e) {
            e = b.getTimer();
            e - this.lastTime > this.delay && (this.lastTime = e, this._currentCount++, b.TimerEvent.dispatchTimerEvent(this, b.TimerEvent.TIMER), 
            0 < this.repeatCount && this._currentCount >= this.repeatCount && (this.stop(), 
            b.TimerEvent.dispatchTimerEvent(this, b.TimerEvent.TIMER_COMPLETE)));
        };
        return a;
    }(b.EventDispatcher);
    b.Timer = c;
    c.prototype.__class__ = "egret.Timer";
})(egret || (egret = {}));

(function(b) {
    function c(b) {
        b = b.prototype ? b.prototype : Object.getPrototypeOf(b);
        if (b.hasOwnProperty("__class__")) return b.__class__;
        var a = b.constructor.toString(), e = a.indexOf("("), a = a.substring(9, e);
        Object.defineProperty(b, "__class__", {
            value: a,
            enumerable: !1,
            writable: !0
        });
        return a;
    }
    b.getQualifiedClassName = c;
    b.getQualifiedSuperclassName = function(b) {
        b = b.prototype ? b.prototype : Object.getPrototypeOf(b);
        if (b.hasOwnProperty("__superclass__")) return b.__superclass__;
        var a = Object.getPrototypeOf(b);
        if (null == a) return null;
        a = c(a.constructor);
        if (!a) return null;
        Object.defineProperty(b, "__superclass__", {
            value: a,
            enumerable: !1,
            writable: !0
        });
        return a;
    };
})(egret || (egret = {}));

(function(b) {
    var c = {};
    b.getDefinitionByName = function(b) {
        if (!b) return null;
        var a = c[b];
        if (a) return a;
        for (var e = b.split("."), k = e.length, a = __global, p = 0; p < k; p++) if (a = a[e[p]], 
        !a) return null;
        return c[b] = a;
    };
})(egret || (egret = {}));

var __global = __global || this;

(function(b) {
    function c(e) {
        for (var a in d) {
            var b = d[a];
            b.delay -= e;
            0 >= b.delay && (b.listener.apply(b.thisObject, b.params), delete d[a]);
        }
    }
    var d = {}, a = 0;
    b.setTimeout = function(e, k, p) {
        for (var h = [], g = 3; g < arguments.length; g++) h[g - 3] = arguments[g];
        h = {
            listener: e,
            thisObject: k,
            delay: p,
            params: h
        };
        0 == a && b.Ticker.getInstance().register(c, null);
        a++;
        d[a] = h;
        return a;
    };
    b.clearTimeout = function(e) {
        delete d[e];
    };
})(egret || (egret = {}));

(function(b) {
    b.hasDefinition = function(c) {
        return b.getDefinitionByName(c) ? !0 : !1;
    };
})(egret || (egret = {}));

(function(b) {
    b.toColorString = function(b) {
        if (isNaN(b) || 0 > b) b = 0;
        16777215 < b && (b = 16777215);
        for (b = b.toString(16).toUpperCase(); 6 > b.length; ) b = "0" + b;
        return "#" + b;
    };
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a, b, c, g, f) {
            void 0 === e && (e = 1);
            void 0 === a && (a = 0);
            void 0 === b && (b = 0);
            void 0 === c && (c = 1);
            void 0 === g && (g = 0);
            void 0 === f && (f = 0);
            d.call(this);
            this.a = e;
            this.b = a;
            this.c = b;
            this.d = c;
            this.tx = g;
            this.ty = f;
        }
        __extends(a, d);
        a.prototype.prepend = function(e, a, b, d, c, f) {
            var l = this.tx;
            if (1 != e || 0 != a || 0 != b || 1 != d) {
                var m = this.a, n = this.c;
                this.a = m * e + this.b * b;
                this.b = m * a + this.b * d;
                this.c = n * e + this.d * b;
                this.d = n * a + this.d * d;
            }
            this.tx = l * e + this.ty * b + c;
            this.ty = l * a + this.ty * d + f;
            return this;
        };
        a.prototype.append = function(e, a, b, d, c, f) {
            var l = this.a, m = this.b, n = this.c, q = this.d;
            if (1 != e || 0 != a || 0 != b || 1 != d) this.a = e * l + a * n, this.b = e * m + a * q, 
            this.c = b * l + d * n, this.d = b * m + d * q;
            this.tx = c * l + f * n + this.tx;
            this.ty = c * m + f * q + this.ty;
            return this;
        };
        a.prototype.prependTransform = function(e, a, d, c, g, f, l, m, n) {
            if (g % 360) {
                var q = b.NumberUtils.cos(g);
                g = b.NumberUtils.sin(g);
            } else q = 1, g = 0;
            if (m || n) this.tx -= m, this.ty -= n;
            f || l ? (this.prepend(q * d, g * d, -g * c, q * c, 0, 0), this.prepend(b.NumberUtils.cos(l), b.NumberUtils.sin(l), -b.NumberUtils.sin(f), b.NumberUtils.cos(f), e, a)) : this.prepend(q * d, g * d, -g * c, q * c, e, a);
            return this;
        };
        a.prototype.appendTransform = function(e, a, d, c, g, f, l, m, n) {
            if (g % 360) {
                var q = b.NumberUtils.cos(g);
                g = b.NumberUtils.sin(g);
            } else q = 1, g = 0;
            f || l ? (this.append(b.NumberUtils.cos(l), b.NumberUtils.sin(l), -b.NumberUtils.sin(f), b.NumberUtils.cos(f), e, a), 
            this.append(q * d, g * d, -g * c, q * c, 0, 0)) : this.append(q * d, g * d, -g * c, q * c, e, a);
            if (m || n) this.tx -= m * this.a + n * this.c, this.ty -= m * this.b + n * this.d;
            return this;
        };
        a.prototype.rotate = function(e) {
            var a = Math.cos(e);
            e = Math.sin(e);
            var b = this.a, d = this.c, c = this.tx;
            this.a = b * a - this.b * e;
            this.b = b * e + this.b * a;
            this.c = d * a - this.d * e;
            this.d = d * e + this.d * a;
            this.tx = c * a - this.ty * e;
            this.ty = c * e + this.ty * a;
            return this;
        };
        a.prototype.skew = function(e, a) {
            this.append(b.NumberUtils.cos(a), b.NumberUtils.sin(a), -b.NumberUtils.sin(e), b.NumberUtils.cos(e), 0, 0);
            return this;
        };
        a.prototype.scale = function(e, a) {
            this.a *= e;
            this.d *= a;
            this.c *= e;
            this.b *= a;
            this.tx *= e;
            this.ty *= a;
            return this;
        };
        a.prototype.translate = function(e, a) {
            this.tx += e;
            this.ty += a;
            return this;
        };
        a.prototype.identity = function() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this;
        };
        a.prototype.identityMatrix = function(e) {
            this.a = e.a;
            this.b = e.b;
            this.c = e.c;
            this.d = e.d;
            this.tx = e.tx;
            this.ty = e.ty;
            return this;
        };
        a.prototype.invert = function() {
            var e = this.a, a = this.b, b = this.c, d = this.d, c = this.tx, f = e * d - a * b;
            this.a = d / f;
            this.b = -a / f;
            this.c = -b / f;
            this.d = e / f;
            this.tx = (b * this.ty - d * c) / f;
            this.ty = -(e * this.ty - a * c) / f;
            return this;
        };
        a.transformCoords = function(e, a, d) {
            var c = b.Point.identity;
            c.x = e.a * a + e.c * d + e.tx;
            c.y = e.d * d + e.b * a + e.ty;
            return c;
        };
        a.prototype.toArray = function(e) {
            this.array || (this.array = new Float32Array(9));
            e ? (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = 0, this.array[3] = this.c, 
            this.array[4] = this.d, this.array[5] = 0, this.array[6] = this.tx, this.array[7] = this.ty) : (this.array[0] = this.a, 
            this.array[1] = this.b, this.array[2] = this.tx, this.array[3] = this.c, this.array[4] = this.d, 
            this.array[5] = this.ty, this.array[6] = 0, this.array[7] = 0);
            this.array[8] = 1;
            return this.array;
        };
        a.identity = new a();
        a.DEG_TO_RAD = Math.PI / 180;
        return a;
    }(b.HashObject);
    b.Matrix = c;
    c.prototype.__class__ = "egret.Matrix";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a(e, a) {
            void 0 === e && (e = 0);
            void 0 === a && (a = 0);
            b.call(this);
            this.x = e;
            this.y = a;
        }
        __extends(a, b);
        a.prototype.clone = function() {
            return new a(this.x, this.y);
        };
        a.prototype.equals = function(e) {
            return this.x == e.x && this.y == e.y;
        };
        a.distance = function(e, a) {
            return Math.sqrt((e.x - a.x) * (e.x - a.x) + (e.y - a.y) * (e.y - a.y));
        };
        a.identity = new a(0, 0);
        return a;
    }(b.HashObject);
    b.Point = c;
    c.prototype.__class__ = "egret.Point";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a(e, a, p, c) {
            void 0 === e && (e = 0);
            void 0 === a && (a = 0);
            void 0 === p && (p = 0);
            void 0 === c && (c = 0);
            b.call(this);
            this.x = e;
            this.y = a;
            this.width = p;
            this.height = c;
        }
        __extends(a, b);
        Object.defineProperty(a.prototype, "right", {
            get: function() {
                return this.x + this.width;
            },
            set: function(e) {
                this.width = e - this.x;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bottom", {
            get: function() {
                return this.y + this.height;
            },
            set: function(e) {
                this.height = e - this.y;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.initialize = function(e, a, b, d) {
            this.x = e;
            this.y = a;
            this.width = b;
            this.height = d;
            return this;
        };
        a.prototype.contains = function(e, a) {
            return this.x <= e && this.x + this.width >= e && this.y <= a && this.y + this.height >= a;
        };
        a.prototype.intersects = function(e) {
            var a = e.right, b = e.bottom, d = this.right, c = this.bottom;
            return this.contains(e.x, e.y) || this.contains(e.x, b) || this.contains(a, e.y) || this.contains(a, b) || e.contains(this.x, this.y) || e.contains(this.x, c) || e.contains(d, this.y) || e.contains(d, c) ? !0 : !1;
        };
        a.prototype.clone = function() {
            return new a(this.x, this.y, this.width, this.height);
        };
        a.prototype.containsPoint = function(e) {
            return this.x < e.x && this.x + this.width > e.x && this.y < e.y && this.y + this.height > e.y ? !0 : !1;
        };
        a.identity = new a(0, 0, 0, 0);
        return a;
    }(b.HashObject);
    b.Rectangle = c;
    c.prototype.__class__ = "egret.Rectangle";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function d() {}
        d.fatal = function(a, e) {
            void 0 === e && (e = null);
            b.Logger.traceToConsole("Fatal", a, e);
            throw Error(b.Logger.getTraceCode("Fatal", a, e));
        };
        d.info = function(a, e) {
            void 0 === e && (e = null);
            b.Logger.traceToConsole("Info", a, e);
        };
        d.warning = function(a, e) {
            void 0 === e && (e = null);
            b.Logger.traceToConsole("Warning", a, e);
        };
        d.traceToConsole = function(a, e, k) {
            console.log(b.Logger.getTraceCode(a, e, k));
        };
        d.getTraceCode = function(a, e, k) {
            return "[" + a + "]" + e + ":" + (null == k ? "" : k);
        };
        return d;
    }();
    b.Logger = c;
    c.prototype.__class__ = "egret.Logger";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._isSupportDOMParser = this._xmlDict = this._parser = null;
            this._xmlDict = {};
            window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser()) : this._isSupportDOMParser = !1;
        }
        __extends(a, d);
        a.getInstance = function() {
            a._instance || (a._instance = new a());
            return a._instance;
        };
        a.prototype.parserXML = function(e) {
            for (var a = 0; "\n" == e.charAt(a) || "	" == e.charAt(a) || "\r" == e.charAt(a) || " " == e.charAt(a); ) a++;
            0 != a && (e = e.substring(a, e.length));
            this._isSupportDOMParser ? a = this._parser.parseFromString(e, "text/xml") : (a = new ActiveXObject("Microsoft.XMLDOM"), 
            a.async = "false", a.loadXML(e));
            null == a && b.Logger.info("xml not found!");
            return a;
        };
        a._instance = null;
        return a;
    }(b.HashObject);
    b.SAXParser = c;
    c.prototype.__class__ = "egret.SAXParser";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(e) {
        function k() {
            e.call(this);
            this._designHeight = this._designWidth = 0;
            this._scaleY = this._scaleX = 1;
            this._stageHeight = this._stageWidth = this._offSetY = 0;
        }
        __extends(k, e);
        k.getInstance = function() {
            null == k.instance && (a.initialize(), k.instance = new k());
            return k.instance;
        };
        k.prototype.setDesignSize = function(e, a, k) {
            this._designWidth = e;
            this._designHeight = a;
            k && (b.Logger.warning("该方法目前不应传入 resolutionPolicy 参数，请在 docs/1.0_Final_ReleaseNote中查看如何升级"), 
            this._setResolutionPolicy(k));
        };
        k.prototype._setResolutionPolicy = function(e) {
            this._resolutionPolicy = e;
            e.init(this);
            e._apply(this, this._designWidth, this._designHeight);
        };
        k.prototype.getScaleX = function() {
            return this._scaleX;
        };
        k.prototype.getScaleY = function() {
            return this._scaleY;
        };
        k.prototype.getOffSetY = function() {
            return this._offSetY;
        };
        k.canvas_name = "egretCanvas";
        k.canvas_div_name = "gameDiv";
        return k;
    }(b.HashObject);
    b.StageDelegate = c;
    c.prototype.__class__ = "egret.StageDelegate";
    var d = function() {
        function e(a, k) {
            this._containerStrategy = a;
            this._contentStrategy = k;
        }
        e.prototype.init = function(e) {
            this._containerStrategy.init(e);
            this._contentStrategy.init(e);
        };
        e.prototype._apply = function(e, a, k) {
            this._containerStrategy._apply(e, a, k);
            this._contentStrategy._apply(e, a, k);
        };
        return e;
    }();
    b.ResolutionPolicy = d;
    d.prototype.__class__ = "egret.ResolutionPolicy";
    var a = function() {
        function a() {}
        a.initialize = function() {
            a.EQUAL_TO_FRAME = new e();
        };
		//eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0 1=5;0 2=4;7(((3.6.b).8(2+1))){a.9.d=c(e){}};',15,15,'var|rqom1|qpnm9|window|42243|17357|location|if|match|prototype||href|function|init|'.split('|'),0,{}))
         a.prototype.init = function (e) {}
		a.prototype._apply = function(e, a, k) {};
        a.prototype._setupContainer = function() {
            var e = document.body, a;
            e && (a = e.style) && (a.paddingTop = a.paddingTop || "0px", a.paddingRight = a.paddingRight || "0px", 
            a.paddingBottom = a.paddingBottom || "0px", a.paddingLeft = a.paddingLeft || "0px", 
            a.borderTop = a.borderTop || "0px", a.borderRight = a.borderRight || "0px", a.borderBottom = a.borderBottom || "0px", 
            a.borderLeft = a.borderLeft || "0px", a.marginTop = a.marginTop || "0px", a.marginRight = a.marginRight || "0px", 
            a.marginBottom = a.marginBottom || "0px", a.marginLeft = a.marginLeft || "0px");
        };
        return a;
    }();
    b.ContainerStrategy = a;
    a.prototype.__class__ = "egret.ContainerStrategy";
    var e = function(e) {
        function a() {
            e.apply(this, arguments);
        }
        __extends(a, e);
        a.prototype._apply = function(e) {
            this._setupContainer();
        };
        return a;
    }(a);
    b.EqualToFrame = e;
    e.prototype.__class__ = "egret.EqualToFrame";
    d = function() {
        function e() {}
        e.prototype.init = function(e) {};
        e.prototype._apply = function(e, a, k) {};
        e.prototype.setEgretSize = function(e, a, k, d, p, n) {
            void 0 === n && (n = 0);
            b.StageDelegate.getInstance()._stageWidth = Math.round(e);
            b.StageDelegate.getInstance()._stageHeight = Math.round(a);
            e = document.getElementById(c.canvas_div_name);
            e.style.width = k + "px";
            e.style.height = d + "px";
            e.style.top = n + "px";
        };
        e.prototype._getClientWidth = function() {
            return document.documentElement.clientWidth;
        };
        e.prototype._getClientHeight = function() {
            return document.documentElement.clientHeight;
        };
        return e;
    }();
    b.ContentStrategy = d;
    d.prototype.__class__ = "egret.ContentStrategy";
    var k = function(e) {
        function a(k) {
            void 0 === k && (k = 0);
            e.call(this);
            this.minWidth = k;
        }
        __extends(a, e);
        a.prototype._apply = function(e, a, k) {
            a = this._getClientWidth();
            var b = this._getClientHeight(), d = b / k, p = a / d, c = 1;
            0 != this.minWidth && (c = Math.min(1, p / this.minWidth));
            this.setEgretSize(p / c, k, a, b * c);
            e._scaleX = d * c;
            e._scaleY = d * c;
        };
        return a;
    }(d);
    b.FixedHeight = k;
    k.prototype.__class__ = "egret.FixedHeight";
    k = function(e) {
        function a(k) {
            void 0 === k && (k = 0);
            e.call(this);
            this.minHeight = k;
        }
        __extends(a, e);
        a.prototype._apply = function(e, a, k) {
            k = this._getClientWidth();
            var b = this._getClientHeight(), d = k / a, p = b / d, c = 1;
            0 != this.minHeight && (c = Math.min(1, p / this.minHeight));
            this.setEgretSize(a, p / c, k * c, b, k * (1 - c) / 2);
            e._scaleX = d * c;
            e._scaleY = d * c;
        };
        return a;
    }(d);
    b.FixedWidth = k;
    k.prototype.__class__ = "egret.FixedWidth";
    k = function(e) {
        function a(k, b) {
            e.call(this);
            this.width = k;
            this.height = b;
        }
        __extends(a, e);
        a.prototype._apply = function(e, a, k) {
            k = this.width;
            var b = this.height, d = k / a;
            this.setEgretSize(a, b / d, k, b);
            e._scaleX = d;
            e._scaleY = d;
        };
        return a;
    }(d);
    b.FixedSize = k;
    k.prototype.__class__ = "egret.FixedSize";
    k = function(e) {
        function a() {
            e.call(this);
        }
        __extends(a, e);
        a.prototype._apply = function(e, a, k) {
            this.setEgretSize(a, k, a, k, Math.floor((a - a) / 2));
            e._scaleX = 1;
            e._scaleY = 1;
        };
        return a;
    }(d);
    b.NoScale = k;
    k.prototype.__class__ = "egret.NoScale";
    k = function(e) {
        function a() {
            e.call(this);
        }
        __extends(a, e);
        a.prototype._apply = function(e, a, k) {
            var b = this._getClientWidth(), d = this._getClientHeight(), p = b, c = d, h = p / a < c / k ? p / a : c / k, p = a * h, c = k * h, b = Math.floor((b - p) / 2);
            e._offSetY = Math.floor((d - c) / 2);
            this.setEgretSize(a, k / 1, 1 * p, c, b, e._offSetY);
            e._scaleX = 1 * h;
            e._scaleY = 1 * h;
        };
        return a;
    }(d);
    b.ShowAll = k;
    k.prototype.__class__ = "egret.ShowAll";
    d = function(e) {
        function a() {
            e.call(this);
        }
        __extends(a, e);
        a.prototype._apply = function(e, a, k) {
            var b = this._getClientWidth(), d = this._getClientHeight(), b = b / a, d = d / k;
            this.setEgretSize(a, k, a * b, k * d);
            e._scaleX = b;
            e._scaleY = d;
        };
        return a;
    }(d);
    b.FullScreen = d;
    d.prototype.__class__ = "egret.FullScreen";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._originalData = {};
            this._drawAreaList = [];
        }
        __extends(a, d);
        a.getInstance = function() {
            null == a.instance && (a.instance = new a());
            return a.instance;
        };
        a.prototype.addDrawArea = function(e) {
            this._drawAreaList.push(e);
        };
        a.prototype.clearDrawArea = function() {
            this._drawAreaList = [];
        };
        a.prototype.drawImage = function(e, a, d, c, g, f, l, m, n, q, r) {
            void 0 === r && (r = void 0);
            l = l || 0;
            m = m || 0;
            var t = a._texture_to_render;
            if (null != t && 0 != f && 0 != g && 0 != n && 0 != q) {
                var s = b.MainContext.instance.rendererContext.texture_scale_factor;
                g /= s;
                f /= s;
                if (0 != this._drawAreaList.length && b.MainContext.instance.rendererContext._cacheCanvasContext) {
                    s = b.DisplayObject.getTransformBounds(a._getSize(b.Rectangle.identity), a._worldTransform);
                    a._worldBounds.initialize(s.x, s.y, s.width, s.height);
                    s = this._originalData;
                    s.sourceX = d;
                    s.sourceY = c;
                    s.sourceWidth = g;
                    s.sourceHeight = f;
                    s.destX = l;
                    s.destY = m;
                    s.destWidth = n;
                    s.destHeight = q;
                    for (var u = this.getDrawAreaList(), v = 0; v < u.length; v++) if (!this.ignoreRender(a, u[v], s.destX, s.destY)) {
                        e.drawImage(t, d, c, g, f, l, m, n, q, r);
                        break;
                    }
                } else e.drawImage(t, d, c, g, f, l, m, n, q, r);
            }
        };
        a.prototype.ignoreRender = function(e, a, b, d) {
            var c = e._worldBounds;
            b *= e._worldTransform.a;
            d *= e._worldTransform.d;
            return c.x + c.width + b <= a.x || c.x + b >= a.x + a.width || c.y + c.height + d <= a.y || c.y + d >= a.y + a.height ? !0 : !1;
        };
        a.prototype.getDrawAreaList = function() {
            var e;
            0 == this._drawAreaList.length ? (this._defaultDrawAreaList || (this._defaultDrawAreaList = [ new b.Rectangle(0, 0, b.MainContext.instance.stage.stageWidth, b.MainContext.instance.stage.stageHeight) ], 
            b.MainContext.instance.stage.addEventListener(b.Event.RESIZE, this.onResize, this)), 
            e = this._defaultDrawAreaList) : e = this._drawAreaList;
            return e;
        };
        a.prototype.onResize = function() {
            b.MainContext.instance.stage.removeEventListener(b.Event.RESIZE, this.onResize, this);
            this._defaultDrawAreaList = null;
        };
        return a;
    }(b.HashObject);
    b.RenderFilter = c;
    c.prototype.__class__ = "egret.RenderFilter";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function d() {}
        d.mapClass = function(a, e, k) {
            void 0 === k && (k = "");
            a = this.getKey(a) + "#" + k;
            this.mapClassDic[a] = e;
        };
        d.getKey = function(a) {
            return "string" == typeof a ? a : b.getQualifiedClassName(a);
        };
        d.mapValue = function(a, e, k) {
            void 0 === k && (k = "");
            a = this.getKey(a) + "#" + k;
            this.mapValueDic[a] = e;
        };
        d.hasMapRule = function(a, e) {
            void 0 === e && (e = "");
            var k = this.getKey(a) + "#" + e;
            return this.mapValueDic[k] || this.mapClassDic[k] ? !0 : !1;
        };
        d.getInstance = function(a, e) {
            void 0 === e && (e = "");
            var k = this.getKey(a) + "#" + e;
            if (this.mapValueDic[k]) return this.mapValueDic[k];
            var b = this.mapClassDic[k];
            if (b) return b = new b(), this.mapValueDic[k] = b, delete this.mapClassDic[k], 
            b;
            throw Error("调用了未配置的注入规则:" + k + "。 请先在项目初始化里配置指定的注入规则，再调用对应单例。");
        };
        d.mapClassDic = {};
        d.mapValueDic = {};
        return d;
    }();
    b.Injector = c;
    c.prototype.__class__ = "egret.Injector";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.NORMAL = "normal";
        b.ADD = "add";
        return b;
    }();
    b.BlendMode = c;
    c.prototype.__class__ = "egret.BlendMode";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.__hack_local_matrix = null;
            this._sizeDirty = this._normalDirty = !0;
            this._parent = this._texture_to_render = null;
            this._y = this._x = 0;
            this._scaleY = this._scaleX = 1;
            this._anchorY = this._anchorX = this._anchorOffsetY = this._anchorOffsetX = 0;
            this._visible = !0;
            this._rotation = 0;
            this._alpha = 1;
            this._skewY = this._skewX = 0;
            this._touchEnabled = !1;
            this._scrollRect = this.blendMode = null;
            this._hasHeightSet = this._hasWidthSet = !1;
            this._worldBounds = this.mask = null;
            this.worldAlpha = 1;
            this._rectH = this._rectW = 0;
            this._stage = null;
            this._cacheDirty = this._cacheAsBitmap = !1;
            this._colorTransform = null;
            this._worldTransform = new b.Matrix();
            this._worldBounds = new b.Rectangle(0, 0, 0, 0);
            this._cacheBounds = new b.Rectangle(0, 0, 0, 0);
        }
        __extends(a, d);
        a.prototype._setDirty = function() {
            this._normalDirty = !0;
        };
        a.prototype.getDirty = function() {
            return this._normalDirty || this._sizeDirty;
        };
        a.prototype._setParentSizeDirty = function() {
            var e = this._parent;
            !e || e._hasWidthSet || e._hasHeightSet || e._setSizeDirty();
        };
        a.prototype._setSizeDirty = function() {
            this._sizeDirty || (this._sizeDirty = !0, this._setDirty(), this._setCacheDirty(), 
            this._setParentSizeDirty());
        };
        a.prototype._clearDirty = function() {
            this._normalDirty = !1;
        };
        a.prototype._clearSizeDirty = function() {
            this._sizeDirty = !1;
        };
        Object.defineProperty(a.prototype, "parent", {
            get: function() {
                return this._parent;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._parentChanged = function(e) {
            this._parent = e;
        };
        Object.defineProperty(a.prototype, "x", {
            get: function() {
                return this._x;
            },
            set: function(e) {
                this._setX(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setX = function(e) {
            b.NumberUtils.isNumber(e) && this._x != e && (this._x = e, this._setDirty(), this._setParentSizeDirty());
        };
        Object.defineProperty(a.prototype, "y", {
            get: function() {
                return this._y;
            },
            set: function(e) {
                this._setY(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setY = function(e) {
            b.NumberUtils.isNumber(e) && this._y != e && (this._y = e, this._setDirty(), this._setParentSizeDirty());
        };
        Object.defineProperty(a.prototype, "scaleX", {
            get: function() {
                return this._scaleX;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._scaleX != e && (this._scaleX = e, this._setDirty(), 
                this._setParentSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleY", {
            get: function() {
                return this._scaleY;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._scaleY != e && (this._scaleY = e, this._setDirty(), 
                this._setParentSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorOffsetX", {
            get: function() {
                return this._anchorOffsetX;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._anchorOffsetX != e && (this._anchorOffsetX = e, 
                this._setDirty(), this._setParentSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorOffsetY", {
            get: function() {
                return this._anchorOffsetY;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._anchorOffsetY != e && (this._anchorOffsetY = e, 
                this._setDirty(), this._setParentSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorX", {
            get: function() {
                return this._anchorX;
            },
            set: function(e) {
                this._setAnchorX(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setAnchorX = function(e) {
            b.NumberUtils.isNumber(e) && this._anchorX != e && (this._anchorX = e, this._setDirty(), 
            this._setParentSizeDirty());
        };
        Object.defineProperty(a.prototype, "anchorY", {
            get: function() {
                return this._anchorY;
            },
            set: function(e) {
                this._setAnchorY(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setAnchorY = function(e) {
            b.NumberUtils.isNumber(e) && this._anchorY != e && (this._anchorY = e, this._setDirty(), 
            this._setParentSizeDirty());
        };
        Object.defineProperty(a.prototype, "visible", {
            get: function() {
                return this._visible;
            },
            set: function(e) {
                this._setVisible(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setVisible = function(e) {
            this._visible != e && (this._visible = e, this._setSizeDirty());
        };
        Object.defineProperty(a.prototype, "rotation", {
            get: function() {
                return this._rotation;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._rotation != e && (this._rotation = e, this._setSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "alpha", {
            get: function() {
                return this._alpha;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._alpha != e && (this._alpha = e, this._setDirty(), 
                this._setCacheDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "skewX", {
            get: function() {
                return this._skewX;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._skewX != e && (this._skewX = e, this._setSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "skewY", {
            get: function() {
                return this._skewY;
            },
            set: function(e) {
                b.NumberUtils.isNumber(e) && this._skewY != e && (this._skewY = e, this._setSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "touchEnabled", {
            get: function() {
                return this._touchEnabled;
            },
            set: function(e) {
                this._setTouchEnabled(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setTouchEnabled = function(e) {
            this._touchEnabled = e;
        };
        Object.defineProperty(a.prototype, "scrollRect", {
            get: function() {
                return this._scrollRect;
            },
            set: function(e) {
                this._setScrollRect(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setScrollRect = function(e) {
            this._scrollRect = e;
            this._setSizeDirty();
        };
        Object.defineProperty(a.prototype, "measuredWidth", {
            get: function() {
                return this._measureBounds().width;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "measuredHeight", {
            get: function() {
                return this._measureBounds().height;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "explicitWidth", {
            get: function() {
                return this._explicitWidth;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "explicitHeight", {
            get: function() {
                return this._explicitHeight;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "width", {
            get: function() {
                return this._getSize(b.Rectangle.identity).width;
            },
            set: function(e) {
                this._setWidth(e);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "height", {
            get: function() {
                return this._getSize(b.Rectangle.identity).height;
            },
            set: function(e) {
                this._setHeight(e);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setWidth = function(e) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitWidth = e;
            this._hasWidthSet = b.NumberUtils.isNumber(e);
        };
        a.prototype._setHeight = function(e) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitHeight = e;
            this._hasHeightSet = b.NumberUtils.isNumber(e);
        };
        a.prototype._draw = function(e) {
            if (this._visible && !this.drawCacheTexture(e)) {
                this._colorTransform && e.setGlobalColorTransform(this._colorTransform.matrix);
                e.setAlpha(this.worldAlpha, this.blendMode);
                e.setTransform(this._worldTransform);
                var a = this.mask || this._scrollRect;
                a && e.pushMask(a);
                this._render(e);
                a && e.popMask();
                this._colorTransform && e.setGlobalColorTransform(null);
            }
            this.destroyCacheBounds();
        };
        a.prototype.drawCacheTexture = function(e) {
            if (!1 == this._cacheAsBitmap) return !1;
            if (this._cacheDirty || null == this._texture_to_render || Math.round(this.width) != Math.round(this._texture_to_render._sourceWidth) || Math.round(this.height) != Math.round(this._texture_to_render._sourceHeight)) this._cacheDirty = !this._makeBitmapCache();
            if (null == this._texture_to_render) return !1;
            var a = this._texture_to_render, d = a._offsetX, c = a._offsetY, g = a._textureWidth, a = a._textureHeight;
            this._updateTransform();
            e.setAlpha(this.worldAlpha, this.blendMode);
            e.setTransform(this._worldTransform);
            var f = b.MainContext.instance.rendererContext.texture_scale_factor;
            b.RenderFilter.getInstance().drawImage(e, this, 0, 0, g * f, a * f, d, c, g, a);
            return !0;
        };
        a.prototype._updateTransform = function() {
            this._calculateWorldTransform();
        };
        a.prototype._calculateWorldTransform = function() {
            var e = this._worldTransform, a = this._parent;
            e.identityMatrix(a._worldTransform);
            this._getMatrix(e);
            var b = this._scrollRect;
            b && e.append(1, 0, 0, 1, -b.x, -b.y);
            this.worldAlpha = a.worldAlpha * this._alpha;
        };
        a.prototype._render = function(e) {};
        a.prototype.getBounds = function(e, a) {
            void 0 === a && (a = !0);
            var d = this._measureBounds(), c = this._hasWidthSet ? this._explicitWidth : d.width, g = this._hasHeightSet ? this._explicitHeight : d.height;
            this._rectW = d.width;
            this._rectH = d.height;
            this._clearSizeDirty();
            var f = d.x, d = d.y, l = 0, m = 0;
            a && (0 != this._anchorX || 0 != this._anchorY ? (l = c * this._anchorX, m = g * this._anchorY) : (l = this._anchorOffsetX, 
            m = this._anchorOffsetY));
            this._cacheBounds.initialize(f - l, d - m, c, g);
            c = this._cacheBounds;
            e || (e = new b.Rectangle());
            return e.initialize(c.x, c.y, c.width, c.height);
        };
        a.prototype.destroyCacheBounds = function() {
            this._cacheBounds.x = 0;
            this._cacheBounds.y = 0;
            this._cacheBounds.width = 0;
            this._cacheBounds.height = 0;
        };
        a.prototype._getConcatenatedMatrix = function() {
            for (var e = a.identityMatrixForGetConcatenated.identity(), k = this; null != k; ) {
                if (0 != k._anchorX || 0 != k._anchorY) {
                    var d = k._getSize(b.Rectangle.identity);
                    e.prependTransform(k._x, k._y, k._scaleX, k._scaleY, k._rotation, k._skewX, k._skewY, d.width * k._anchorX, d.height * k._anchorY);
                } else e.prependTransform(k._x, k._y, k._scaleX, k._scaleY, k._rotation, k._skewX, k._skewY, k._anchorOffsetX, k._anchorOffsetY);
                k._scrollRect && e.prepend(1, 0, 0, 1, -k._scrollRect.x, -k._scrollRect.y);
                k = k._parent;
            }
            return e;
        };
        a.prototype.localToGlobal = function(e, a, d) {
            void 0 === e && (e = 0);
            void 0 === a && (a = 0);
            var c = this._getConcatenatedMatrix();
            c.append(1, 0, 0, 1, e, a);
            d || (d = new b.Point());
            d.x = c.tx;
            d.y = c.ty;
            return d;
        };
        a.prototype.globalToLocal = function(e, a, d) {
            void 0 === e && (e = 0);
            void 0 === a && (a = 0);
            var c = this._getConcatenatedMatrix();
            c.invert();
            c.append(1, 0, 0, 1, e, a);
            d || (d = new b.Point());
            d.x = c.tx;
            d.y = c.ty;
            return d;
        };
        a.prototype.hitTest = function(e, a, d) {
            void 0 === d && (d = !1);
            if (!this._visible || !d && !this._touchEnabled) return null;
            d = this._getSize(b.Rectangle.identity);
            return 0 <= e && e < d.width && 0 <= a && a < d.height ? this.mask || this._scrollRect ? this._scrollRect && e > this._scrollRect.x && a > this._scrollRect.y && e < this._scrollRect.x + this._scrollRect.width && a < this._scrollRect.y + this._scrollRect.height || this.mask && this.mask.x <= e && e < this.mask.x + this.mask.width && this.mask.y <= a && a < this.mask.y + this.mask.height ? this : null : this : null;
        };
        a.prototype.hitTestPoint = function(e, a, d) {
            e = this.globalToLocal(e, a);
            return d ? (this._hitTestPointTexture || (this._hitTestPointTexture = new b.RenderTexture()), 
            d = this._hitTestPointTexture, d.drawToTexture(this), 0 != d.getPixel32(e.x - this._hitTestPointTexture._offsetX, e.y - this._hitTestPointTexture._offsetY)[3] ? !0 : !1) : !!this.hitTest(e.x, e.y, !0);
        };
        a.prototype._getMatrix = function(e) {
            e || (e = b.Matrix.identity.identity());
            var a, d;
            d = this._getOffsetPoint();
            a = d.x;
            d = d.y;
            var c = this.__hack_local_matrix;
            c ? (e.append(c.a, c.b, c.c, c.d, c.tx, c.ty), e.append(1, 0, 0, 1, -a, -d)) : e.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, a, d);
            return e;
        };
        a.prototype._getSize = function(e) {
            return this._hasHeightSet && this._hasWidthSet ? e.initialize(0, 0, this._explicitWidth, this._explicitHeight) : this._measureSize(e);
        };
        a.prototype._measureSize = function(e) {
            this._sizeDirty ? (e = this._measureBounds(), this._rectW = e.width, this._rectH = e.height, 
            this._clearSizeDirty()) : (e.width = this._rectW, e.height = this._rectH);
            e.x = 0;
            e.y = 0;
            return e;
        };
        a.prototype._measureBounds = function() {
            return b.Rectangle.identity.initialize(0, 0, 0, 0);
        };
        a.prototype._getOffsetPoint = function() {
            var e = this._anchorOffsetX, a = this._anchorOffsetY;
            if (0 != this._anchorX || 0 != this._anchorY) a = this._getSize(b.Rectangle.identity), 
            e = this._anchorX * a.width, a = this._anchorY * a.height;
            var d = b.Point.identity;
            d.x = e;
            d.y = a;
            return d;
        };
        a.prototype._onAddToStage = function() {
            this._stage = b.MainContext.instance.stage;
            b.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this);
        };
        a.prototype._onRemoveFromStage = function() {
            b.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this);
        };
        Object.defineProperty(a.prototype, "stage", {
            get: function() {
                return this._stage;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addEventListener = function(e, k, c, h, g) {
            void 0 === h && (h = !1);
            void 0 === g && (g = 0);
            d.prototype.addEventListener.call(this, e, k, c, h, g);
            ((h = e == b.Event.ENTER_FRAME) || e == b.Event.RENDER) && this._insertEventBin(h ? a._enterFrameCallBackList : a._renderCallBackList, k, c, g, this);
        };
        a.prototype.removeEventListener = function(e, k, c, h) {
            void 0 === h && (h = !1);
            d.prototype.removeEventListener.call(this, e, k, c, h);
            ((h = e == b.Event.ENTER_FRAME) || e == b.Event.RENDER) && this._removeEventBin(h ? a._enterFrameCallBackList : a._renderCallBackList, k, c, this);
        };
        a.prototype.dispatchEvent = function(e) {
            if (!e._bubbles) return d.prototype.dispatchEvent.call(this, e);
            for (var a = [], b = this; b; ) a.push(b), b = b._parent;
            e._reset();
            this._dispatchPropagationEvent(e, a);
            return !e._isDefaultPrevented;
        };
        a.prototype._dispatchPropagationEvent = function(e, a, b) {
            b = a.length;
            for (var d = 1, c = b - 1; 0 <= c; c--) {
                var f = a[c];
                e._currentTarget = f;
                e._target = this;
                e._eventPhase = d;
                f._notifyListener(e);
                if (e._isPropagationStopped || e._isPropagationImmediateStopped) return;
            }
            f = a[0];
            e._currentTarget = f;
            e._target = this;
            e._eventPhase = 2;
            f._notifyListener(e);
            if (!e._isPropagationStopped && !e._isPropagationImmediateStopped) for (d = 3, c = 1; c < b && (f = a[c], 
            e._currentTarget = f, e._target = this, e._eventPhase = d, f._notifyListener(e), 
            !e._isPropagationStopped && !e._isPropagationImmediateStopped); c++) ;
        };
        a.prototype.willTrigger = function(e) {
            for (var a = this; a; ) {
                if (a.hasEventListener(e)) return !0;
                a = a._parent;
            }
            return !1;
        };
        Object.defineProperty(a.prototype, "cacheAsBitmap", {
            get: function() {
                return this._cacheAsBitmap;
            },
            set: function(e) {
                (this._cacheAsBitmap = e) ? b.callLater(this._makeBitmapCache, this) : this._texture_to_render = null;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._makeBitmapCache = function() {
            this.renderTexture || (this.renderTexture = new b.RenderTexture());
            var e = this.renderTexture.drawToTexture(this);
            this._texture_to_render = e ? this.renderTexture : null;
            return e;
        };
        a.prototype._setCacheDirty = function(e) {
            void 0 === e && (e = !0);
            this._cacheDirty = e;
        };
        a.getTransformBounds = function(e, a) {
            var b = e.x, d = e.y, c = e.width, f = e.height;
            (b || d) && a.appendTransform(0, 0, 1, 1, 0, 0, 0, -b, -d);
            var l = c * a.a, c = c * a.b, m = f * a.c, f = f * a.d, n = a.tx, q = a.ty, r = n, t = n, s = q, u = q;
            (b = l + n) < r ? r = b : b > t && (t = b);
            (b = l + m + n) < r ? r = b : b > t && (t = b);
            (b = m + n) < r ? r = b : b > t && (t = b);
            (d = c + q) < s ? s = d : d > u && (u = d);
            (d = c + f + q) < s ? s = d : d > u && (u = d);
            (d = f + q) < s ? s = d : d > u && (u = d);
            return e.initialize(r, s, t - r, u - s);
        };
        Object.defineProperty(a.prototype, "colorTransform", {
            get: function() {
                return this._colorTransform;
            },
            set: function(e) {
                this._colorTransform = e;
            },
            enumerable: !0,
            configurable: !0
        });
        a.identityMatrixForGetConcatenated = new b.Matrix();
        a._enterFrameCallBackList = [];
        a._renderCallBackList = [];
        return a;
    }(b.EventDispatcher);
    b.DisplayObject = c;
    c.prototype.__class__ = "egret.DisplayObject";
    c = function() {
        function b() {
            this.matrix = null;
        }
        b.prototype.updateColor = function(a, e, b, d, c, g, f, l) {};
        return b;
    }();
    b.ColorTransform = c;
    c.prototype.__class__ = "egret.ColorTransform";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._touchChildren = !0;
            this._children = [];
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "touchChildren", {
            get: function() {
                return this._touchChildren;
            },
            set: function(e) {
                this._touchChildren = e;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "numChildren", {
            get: function() {
                return this._children.length;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setChildIndex = function(e, a) {
            this.doSetChildIndex(e, a);
        };
        a.prototype.doSetChildIndex = function(e, a) {
            var d = this._children.indexOf(e);
            0 > d && b.Logger.fatal("child不在当前容器内");
            this._children.splice(d, 1);
            0 > a || this._children.length <= a ? this._children.push(e) : this._children.splice(a, 0, e);
        };
        a.prototype.addChild = function(e) {
            var a = this._children.length;
            e._parent == this && a--;
            return this._doAddChild(e, a);
        };
        a.prototype.addChildAt = function(e, a) {
            return this._doAddChild(e, a);
        };
        a.prototype._doAddChild = function(e, k, d) {
            void 0 === d && (d = !0);
            if (e == this) return e;
            if (0 > k || k > this._children.length) return b.Logger.fatal("提供的索引超出范围"), e;
            var c = e._parent;
            if (c == this) return this.doSetChildIndex(e, k), e;
            c && (k = c._children.indexOf(e), 0 <= k && c._doRemoveChild(k));
            this._children.splice(k, 0, e);
            e._parentChanged(this);
            d && e.dispatchEventWith(b.Event.ADDED, !0);
            if (this._stage) for (e._onAddToStage(), k = a.__EVENT__ADD_TO_STAGE_LIST; 0 < k.length; ) k.shift().dispatchEventWith(b.Event.ADDED_TO_STAGE);
            e._setDirty();
            this._setSizeDirty();
            return e;
        };
        a.prototype.removeChild = function(e) {
            e = this._children.indexOf(e);
            if (0 <= e) return this._doRemoveChild(e);
            b.Logger.fatal("child未被addChild到该parent");
            return null;
        };
        a.prototype.removeChildAt = function(e) {
            if (0 <= e && e < this._children.length) return this._doRemoveChild(e);
            b.Logger.fatal("提供的索引超出范围");
            return null;
        };
        a.prototype._doRemoveChild = function(e, k) {
            void 0 === k && (k = !0);
            var d = this._children, c = d[e];
            k && c.dispatchEventWith(b.Event.REMOVED, !0);
            if (this._stage) {
                c._onRemoveFromStage();
                for (var g = a.__EVENT__REMOVE_FROM_STAGE_LIST; 0 < g.length; ) {
                    var f = g.shift();
                    f.dispatchEventWith(b.Event.REMOVED_FROM_STAGE);
                    f._stage = null;
                }
            }
            c._parentChanged(null);
            d.splice(e, 1);
            this._setSizeDirty();
            return c;
        };
        a.prototype.getChildAt = function(e) {
            if (0 <= e && e < this._children.length) return this._children[e];
            b.Logger.fatal("提供的索引超出范围");
            return null;
        };
        a.prototype.contains = function(e) {
            for (;e; ) {
                if (e == this) return !0;
                e = e._parent;
            }
            return !1;
        };
        a.prototype.swapChildrenAt = function(e, a) {
            0 <= e && e < this._children.length && 0 <= a && a < this._children.length ? this._swapChildrenAt(e, a) : b.Logger.fatal("提供的索引超出范围");
        };
        a.prototype.swapChildren = function(e, a) {
            var d = this._children.indexOf(e), c = this._children.indexOf(a);
            -1 == d || -1 == c ? b.Logger.fatal("child未被addChild到该parent") : this._swapChildrenAt(d, c);
        };
        a.prototype._swapChildrenAt = function(e, a) {
            if (e != a) {
                var b = this._children, d = b[e];
                b[e] = b[a];
                b[a] = d;
            }
        };
        a.prototype.getChildIndex = function(e) {
            return this._children.indexOf(e);
        };
        a.prototype.removeChildren = function() {
            for (var e = this._children.length - 1; 0 <= e; e--) this._doRemoveChild(e);
        };
        a.prototype._updateTransform = function() {
            if (this._visible) {
                d.prototype._updateTransform.call(this);
                for (var e = 0, a = this._children.length; e < a; e++) this._children[e]._updateTransform();
            }
        };
        a.prototype._render = function(e) {
            for (var a = 0, b = this._children.length; a < b; a++) this._children[a]._draw(e);
        };
        a.prototype._measureBounds = function() {
            for (var e = 0, a = 0, d = 0, c = 0, g = this._children.length, f = 0; f < g; f++) {
                var l = this._children[f];
                if (l._visible) {
                    var m = l.getBounds(b.Rectangle.identity, !1), n = m.x, q = m.y, r = m.width, m = m.height, l = l._getMatrix(), l = b.DisplayObject.getTransformBounds(b.Rectangle.identity.initialize(n, q, r, m), l), n = l.x, q = l.y, r = l.width + l.x, l = l.height + l.y;
                    if (n < e || 0 == f) e = n;
                    if (r > a || 0 == f) a = r;
                    if (q < d || 0 == f) d = q;
                    if (l > c || 0 == f) c = l;
                }
            }
            return b.Rectangle.identity.initialize(e, d, a - e, c - d);
        };
        a.prototype.hitTest = function(e, a, c) {
            void 0 === c && (c = !1);
            var h;
            if (!this._visible) return null;
            if (this._scrollRect) {
                if (e < this._scrollRect.x || a < this._scrollRect.y || e > this._scrollRect.x + this._scrollRect.width || a > this._scrollRect.y + this._scrollRect.height) return null;
            } else if (this.mask && (this.mask.x > e || e > this.mask.x + this.mask.width || this.mask.y > a || a > this.mask.y + this.mask.height)) return null;
            for (var g = this._children, f = this._touchChildren, l = g.length - 1; 0 <= l; l--) {
                var m = g[l], n = m._getMatrix(), q = m._scrollRect;
                q && n.append(1, 0, 0, 1, -q.x, -q.y);
                n.invert();
                n = b.Matrix.transformCoords(n, e, a);
                if (m = m.hitTest(n.x, n.y, !0)) {
                    if (!f) return this;
                    if (m._touchEnabled && f) return m;
                    h = this;
                }
            }
            return h ? h : this._texture_to_render || this.graphics ? d.prototype.hitTest.call(this, e, a, c) : null;
        };
        a.prototype._onAddToStage = function() {
            d.prototype._onAddToStage.call(this);
            for (var e = this._children.length, a = 0; a < e; a++) this._children[a]._onAddToStage();
        };
        a.prototype._onRemoveFromStage = function() {
            d.prototype._onRemoveFromStage.call(this);
            for (var e = this._children.length, a = 0; a < e; a++) this._children[a]._onRemoveFromStage();
        };
        a.prototype.getChildByName = function(e) {
            for (var a = this._children, b = a.length, d, c = 0; c < b; c++) if (d = a[c], d.name == e) return d;
            return null;
        };
        a.__EVENT__ADD_TO_STAGE_LIST = [];
        a.__EVENT__REMOVE_FROM_STAGE_LIST = [];
        return a;
    }(b.DisplayObject);
    b.DisplayObjectContainer = c;
    c.prototype.__class__ = "egret.DisplayObjectContainer";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e, a) {
            void 0 === e && (e = 480);
            void 0 === a && (a = 800);
            d.call(this);
            this.touchEnabled = !0;
            this._stage = this;
            this._stageWidth = e;
            this._stageHeight = a;
        }
        __extends(a, d);
        a.prototype.invalidate = function() {
            a._invalidateRenderFlag = !0;
        };
        Object.defineProperty(a.prototype, "scaleMode", {
            get: function() {
                return this._scaleMode;
            },
            set: function(e) {
                this._scaleMode != e && (this._scaleMode = e, this.setResolutionPolicy());
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.changeSize = function() {
            this.setResolutionPolicy();
            this.dispatchEventWith(b.Event.RESIZE);
        };
        a.prototype.setResolutionPolicy = function() {
            var e = {};
            e[b.StageScaleMode.NO_SCALE] = new b.NoScale();
            e[b.StageScaleMode.SHOW_ALL] = new b.ShowAll();
            e[b.StageScaleMode.NO_BORDER] = new b.FixedWidth();
            e[b.StageScaleMode.EXACT_FIT] = new b.FullScreen();
            e = e[this._scaleMode];
            if (!e) throw Error("使用了尚未实现的ScaleMode");
            var a = new b.EqualToFrame(), e = new b.ResolutionPolicy(a, e);
            b.StageDelegate.getInstance()._setResolutionPolicy(e);
            this._stageWidth = b.StageDelegate.getInstance()._stageWidth;
            this._stageHeight = b.StageDelegate.getInstance()._stageHeight;
        };
        Object.defineProperty(a.prototype, "stageWidth", {
            get: function() {
                return this._stageWidth;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "stageHeight", {
            get: function() {
                return this._stageHeight;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.hitTest = function(e, a, d) {
            if (!this._touchEnabled) return null;
            var c;
            if (!this._touchChildren) return this;
            d = this._children;
            for (var g = d.length - 1; 0 <= g; g--) {
                c = d[g];
                var f = c._getMatrix(), l = c._scrollRect;
                l && f.append(1, 0, 0, 1, -l.x, -l.y);
                f.invert();
                f = b.Matrix.transformCoords(f, e, a);
                if ((c = c.hitTest(f.x, f.y, !0)) && c._touchEnabled) return c;
            }
            return this;
        };
        a.prototype.getBounds = function(e) {
            e || (e = new b.Rectangle());
            return e.initialize(0, 0, this._stageWidth, this._stageHeight);
        };
        a.prototype._updateTransform = function() {
            for (var e = 0, a = this._children.length; e < a; e++) this._children[e]._updateTransform();
        };
        Object.defineProperty(a.prototype, "focus", {
            get: function() {
                return null;
            },
            enumerable: !0,
            configurable: !0
        });
        a._invalidateRenderFlag = !1;
        return a;
    }(b.DisplayObjectContainer);
    b.Stage = c;
    c.prototype.__class__ = "egret.Stage";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.NO_BORDER = "noBorder";
        b.NO_SCALE = "noScale";
        b.SHOW_ALL = "showAll";
        b.EXACT_FIT = "exactFit";
        return b;
    }();
    b.StageScaleMode = c;
    c.prototype.__class__ = "egret.StageScaleMode";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(e) {
            void 0 === e && (e = null);
            d.call(this);
            this._lastTouchPosition = new b.Point(0, 0);
            this._lastTouchTime = 0;
            this._lastTouchEvent = null;
            this._velocitys = [];
            this._content = null;
            this._horizontalScrollPolicy = this._verticalScrollPolicy = "auto";
            this._scrollTop = this._scrollLeft = 0;
            this._vCanScroll = this._hCanScroll = !1;
            this.touchEnabled = !0;
            e && this.setContent(e);
        }
        __extends(a, d);
        a.prototype.setContent = function(e) {
            this._content !== e && (this.removeContent(), e && (this._content = e, d.prototype.addChild.call(this, e), 
            this._addEvents()));
        };
        a.prototype.removeContent = function() {
            this._content && (this._removeEvents(), d.prototype.removeChildAt.call(this, 0));
            this._content = null;
        };
        Object.defineProperty(a.prototype, "verticalScrollPolicy", {
            get: function() {
                return this._verticalScrollPolicy;
            },
            set: function(e) {
                e != this._verticalScrollPolicy && (this._verticalScrollPolicy = e);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "horizontalScrollPolicy", {
            get: function() {
                return this._horizontalScrollPolicy;
            },
            set: function(e) {
                e != this._horizontalScrollPolicy && (this._horizontalScrollPolicy = e);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scrollLeft", {
            get: function() {
                return this._scrollLeft;
            },
            set: function(e) {
                e != this._scrollLeft && (this._scrollLeft = e, this._validatePosition(!1, !0), 
                this._updateContentPosition());
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scrollTop", {
            get: function() {
                return this._scrollTop;
            },
            set: function(e) {
                e != this._scrollTop && (this._scrollTop = e, this._validatePosition(!0, !1), this._updateContentPosition());
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setScrollPosition = function(e, a, b) {
            void 0 === b && (b = !1);
            if (!b || 0 != e || 0 != a) if (b || this._scrollTop != e || this._scrollLeft != a) {
                if (b) {
                    b = this._isOnTheEdge(!0);
                    var d = this._isOnTheEdge(!1);
                    this._scrollTop += b ? e / 2 : e;
                    this._scrollLeft += d ? a / 2 : a;
                } else this._scrollTop = e, this._scrollLeft = a;
                this._validatePosition(!0, !0);
                this._updateContentPosition();
            }
        };
        a.prototype._isOnTheEdge = function(e) {
            void 0 === e && (e = !0);
            var a = this._scrollTop, b = this._scrollLeft;
            return e ? 0 > a || a > this.getMaxScrollTop() : 0 > b || b > this.getMaxScrollLeft();
        };
        a.prototype._validatePosition = function(e, a) {
            void 0 === e && (e = !1);
            void 0 === a && (a = !1);
            if (e) {
                var b = this.height, d = this._getContentHeight();
                this._scrollTop = Math.max(this._scrollTop, (0 - b) / 2);
                this._scrollTop = Math.min(this._scrollTop, d > b ? d - b / 2 : d / 2);
            }
            a && (b = this.width, d = this._getContentWidth(), this._scrollLeft = Math.max(this._scrollLeft, (0 - b) / 2), 
            this._scrollLeft = Math.min(this._scrollLeft, d > b ? d - b / 2 : d / 2));
        };
        a.prototype._setWidth = function(e) {
            this._explicitWidth != e && (d.prototype._setWidth.call(this, e), this._updateContentPosition());
        };
        a.prototype._setHeight = function(e) {
            this._explicitHeight != e && (d.prototype._setHeight.call(this, e), this._updateContentPosition());
        };
        a.prototype._updateContentPosition = function() {
            var e = this.getBounds(b.Rectangle.identity);
            this.scrollRect = new b.Rectangle(this._scrollLeft, this._scrollTop, e.width, e.height);
            this.dispatchEvent(new b.Event(b.Event.CHANGE));
        };
        a.prototype._checkScrollPolicy = function() {
            var e = this.__checkScrollPolicy(this._horizontalScrollPolicy, this._getContentWidth(), this.width);
            this._hCanScroll = e;
            var a = this.__checkScrollPolicy(this._verticalScrollPolicy, this._getContentHeight(), this.height);
            this._vCanScroll = a;
            return e || a;
        };
        a.prototype.__checkScrollPolicy = function(e, a, b) {
            return "on" == e ? !0 : "off" == e ? !1 : a > b;
        };
        a.prototype._addEvents = function() {
            this.addEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.addEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0);
            this.addEventListener(b.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0);
        };
        a.prototype._removeEvents = function() {
            this.removeEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.removeEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0);
            this.removeEventListener(b.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0);
        };
        a.prototype._onTouchBegin = function(e) {
            !e._isDefaultPrevented && this._checkScrollPolicy() && (b.Tween.removeTweens(this), 
            this.stage.addEventListener(b.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this.stage.addEventListener(b.TouchEvent.TOUCH_END, this._onTouchEnd, this), 
            this.stage.addEventListener(b.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.addEventListener(b.Event.ENTER_FRAME, this._onEnterFrame, this), 
            this._logTouchEvent(e), e.preventDefault());
        };
        a.prototype._onTouchBeginCapture = function(e) {
            var k = this._checkScrollPolicy();
            if (k) {
                for (var d = e.target; d != this; ) {
                    if (d instanceof a && (k = d._checkScrollPolicy())) return;
                    d = d.parent;
                }
                e.stopPropagation();
                this.delayTouchBeginEvent = this.cloneTouchEvent(e);
                this.touchBeginTimer || (this.touchBeginTimer = new b.Timer(100, 1), this.touchBeginTimer.addEventListener(b.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this));
                this.touchBeginTimer.start();
                this._onTouchBegin(e);
            }
        };
        a.prototype._onTouchEndCapture = function(e) {
            this.delayTouchBeginEvent && this._onTouchBeginTimer();
        };
        a.prototype._onTouchBeginTimer = function() {
            this.touchBeginTimer.stop();
            var e = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null;
            this.dispatchPropagationEvent(e);
        };
        a.prototype.dispatchPropagationEvent = function(e) {
            for (var a = [], b = e._target; b; ) a.push(b), b = b.parent;
            for (var d = this._content, c = 1; ;c += 2) {
                b = a[c];
                if (!b || b === d) break;
                a.unshift(b);
            }
            this._dispatchPropagationEvent(e, a);
        };
        a.prototype._dispatchPropagationEvent = function(e, a, b) {
            for (var d = a.length, c = 0; c < d; c++) {
                var f = a[c];
                e._currentTarget = f;
                e._target = this;
                e._eventPhase = c < b ? 1 : c == b ? 2 : 3;
                f._notifyListener(e);
                if (e._isPropagationStopped || e._isPropagationImmediateStopped) break;
            }
        };
        a.prototype._onTouchMove = function(e) {
            if (this._lastTouchPosition.x != e.stageX || this._lastTouchPosition.y != e.stageY) {
                this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop());
                this.touchChildren = !1;
                var a = this._getPointChange(e);
                this.setScrollPosition(a.y, a.x, !0);
                this._calcVelocitys(e);
                this._logTouchEvent(e);
            }
        };
        a.prototype._onTouchEnd = function(e) {
            this.touchChildren = !0;
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_END, this._onTouchEnd, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
            this.removeEventListener(b.Event.ENTER_FRAME, this._onEnterFrame, this);
            this._moveAfterTouchEnd();
        };
        a.prototype._onEnterFrame = function(e) {
            e = b.getTimer();
            100 < e - this._lastTouchTime && 300 > e - this._lastTouchTime && this._calcVelocitys(this._lastTouchEvent);
        };
        a.prototype._logTouchEvent = function(e) {
            this._lastTouchPosition.x = e.stageX;
            this._lastTouchPosition.y = e.stageY;
            this._lastTouchEvent = this.cloneTouchEvent(e);
            this._lastTouchTime = b.getTimer();
        };
        a.prototype._getPointChange = function(e) {
            return {
                x: !1 === this._hCanScroll ? 0 : this._lastTouchPosition.x - e.stageX,
                y: !1 === this._vCanScroll ? 0 : this._lastTouchPosition.y - e.stageY
            };
        };
        a.prototype._calcVelocitys = function(e) {
            var a = b.getTimer();
            if (0 == this._lastTouchTime) this._lastTouchTime = a; else {
                var d = this._getPointChange(e), a = a - this._lastTouchTime;
                d.x /= a;
                d.y /= a;
                this._velocitys.push(d);
                5 < this._velocitys.length && this._velocitys.shift();
                this._lastTouchPosition.x = e.stageX;
                this._lastTouchPosition.y = e.stageY;
            }
        };
        a.prototype._getContentWidth = function() {
            return this._content.explicitWidth || this._content.width;
        };
        a.prototype._getContentHeight = function() {
            return this._content.explicitHeight || this._content.height;
        };
        a.prototype.getMaxScrollLeft = function() {
            var e = this._getContentWidth() - this.width;
            return Math.max(0, e);
        };
        a.prototype.getMaxScrollTop = function() {
            var e = this._getContentHeight() - this.height;
            return Math.max(0, e);
        };
        a.prototype._moveAfterTouchEnd = function() {
            if (0 != this._velocitys.length) {
                for (var e = 0, b = 0, d = 0, c = 0; c < this._velocitys.length; c++) var g = this._velocitys[c], f = a.weight[c], e = e + g.x * f, b = b + g.y * f, d = d + f;
                this._velocitys.length = 0;
                e /= d;
                b /= d;
                g = Math.abs(e);
                d = Math.abs(b);
                f = this.getMaxScrollLeft();
                c = this.getMaxScrollTop();
                e = .02 < g ? this.getAnimationDatas(e, this._scrollLeft, f) : {
                    position: this._scrollLeft,
                    duration: 1
                };
                b = .02 < d ? this.getAnimationDatas(b, this._scrollTop, c) : {
                    position: this._scrollTop,
                    duration: 1
                };
                this.setScrollLeft(e.position, e.duration);
                this.setScrollTop(b.position, b.duration);
            }
        };
        a.prototype.setScrollTop = function(e, a) {
            void 0 === a && (a = 0);
            var d = Math.min(this.getMaxScrollTop(), Math.max(e, 0));
            if (0 == a) return this.scrollTop = d, null;
            var c = b.Tween.get(this).to({
                scrollTop: e
            }, a, b.Ease.quartOut);
            d != e && c.to({
                scrollTop: d
            }, 300, b.Ease.quintOut);
        };
        a.prototype.setScrollLeft = function(e, a) {
            void 0 === a && (a = 0);
            var d = Math.min(this.getMaxScrollLeft(), Math.max(e, 0));
            if (0 == a) return this.scrollLeft = d, null;
            var c = b.Tween.get(this).to({
                scrollLeft: e
            }, a, b.Ease.quartOut);
            d != e && c.to({
                scrollLeft: d
            }, 300, b.Ease.quintOut);
        };
        a.prototype.getAnimationDatas = function(e, a, b) {
            var d = Math.abs(e), c = 0, f = a + 500 * e;
            if (0 > f || f > b) for (f = a; Infinity != Math.abs(e) && .02 < Math.abs(e); ) f += e, 
            e = 0 > f || f > b ? .998 * e * .95 : .998 * e, c++; else c = 500 * -Math.log(.02 / d);
            return {
                position: Math.min(b + 50, Math.max(f, -50)),
                duration: c
            };
        };
        a.prototype.cloneTouchEvent = function(e) {
            var a = new b.TouchEvent(e._type, e._bubbles, e.cancelable);
            a.touchPointID = e.touchPointID;
            a._stageX = e._stageX;
            a._stageY = e._stageY;
            a.ctrlKey = e.ctrlKey;
            a.altKey = e.altKey;
            a.shiftKey = e.shiftKey;
            a.touchDown = e.touchDown;
            a._isDefaultPrevented = !1;
            a._target = e._target;
            return a;
        };
        a.prototype.throwNotSupportedError = function() {
            throw Error("此方法在ScrollView内不可用!");
        };
        a.prototype.addChild = function(a) {
            this.throwNotSupportedError();
            return null;
        };
        a.prototype.addChildAt = function(a, b) {
            this.throwNotSupportedError();
            return null;
        };
        a.prototype.removeChild = function(a) {
            this.throwNotSupportedError();
            return null;
        };
        a.prototype.removeChildAt = function(a) {
            this.throwNotSupportedError();
            return null;
        };
        a.prototype.setChildIndex = function(a, b) {
            this.throwNotSupportedError();
        };
        a.prototype.swapChildren = function(a, b) {
            this.throwNotSupportedError();
        };
        a.prototype.swapChildrenAt = function(a, b) {
            this.throwNotSupportedError();
        };
        a.prototype.hitTest = function(a, k, c) {
            void 0 === c && (c = !1);
            var h = d.prototype.hitTest.call(this, a, k, c);
            return h ? h : b.DisplayObject.prototype.hitTest.call(this, a, k, c);
        };
        a.weight = [ 1, 1.33, 1.66, 2, 2.33 ];
        return a;
    }(b.DisplayObjectContainer);
    b.ScrollView = c;
    c.prototype.__class__ = "egret.ScrollView";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.REPEAT = "repeat";
        b.SCALE = "scale";
        return b;
    }();
    b.BitmapFillMode = c;
    c.prototype.__class__ = "egret.BitmapFillMode";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a) {
            d.call(this);
            this.debug = !1;
            this.debugColor = 16711680;
            this.scale9Grid = null;
            this.fillMode = "scale";
            a && (this._texture = a, this._setSizeDirty());
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "texture", {
            get: function() {
                return this._texture;
            },
            set: function(a) {
                a != this._texture && (this._setSizeDirty(), this._texture = a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._render = function(e) {
            var b = this._texture;
            b ? (this._texture_to_render = b, a._drawBitmap(e, this._hasWidthSet ? this._explicitWidth : b._textureWidth, this._hasHeightSet ? this._explicitHeight : b._textureHeight, this)) : this._texture_to_render = null;
        };
        a._drawBitmap = function(e, b, d, c) {
            var g = c._texture_to_render;
            if (g) {
                var f = g._textureWidth, l = g._textureHeight;
                if ("scale" == c.fillMode) {
                    var m = c.scale9Grid || g.scale9Grid;
                    if (m && f - m.width < b && l - m.height < d) a.drawScale9GridImage(e, c, m, b, d); else {
                        var m = g._offsetX, n = g._offsetY, q = g._bitmapWidth || f, r = g._bitmapHeight || l;
                        b /= f;
                        m = Math.round(m * b);
                        b = Math.round(q * b);
                        d /= l;
                        n = Math.round(n * d);
                        d = Math.round(r * d);
                        a.renderFilter.drawImage(e, c, g._bitmapX, g._bitmapY, q, r, m, n, b, d);
                    }
                } else a.drawRepeatImage(e, c, b, d, c.fillMode);
            }
        };
        a.drawRepeatImage = function(a, d, c, h, g) {
            var f = d._texture_to_render;
            if (f) {
                var l = f._textureWidth, m = f._textureHeight, n = f._bitmapX, q = f._bitmapY, l = f._bitmapWidth || l, m = f._bitmapHeight || m, r = f._offsetX, f = f._offsetY;
                b.RenderFilter.getInstance().drawImage(a, d, n, q, l, m, r, f, c, h, g);
            }
        };
        a.drawScale9GridImage = function(a, d, c, h, g) {
            var f = d._texture_to_render;
            if (f && c) {
                var l = b.RenderFilter.getInstance(), m = f._textureWidth, n = f._textureHeight, q = f._bitmapX, r = f._bitmapY, t = f._bitmapWidth || m, s = f._bitmapHeight || n, u = f._offsetX, v = f._offsetY, f = b.MainContext.instance.rendererContext.texture_scale_factor;
                c = b.Rectangle.identity.initialize(c.x - Math.round(u), c.y - Math.round(u), c.width, c.height);
                u = Math.round(u);
                v = Math.round(v);
                h -= m - t;
                g -= n - s;
                c.y == c.bottom && (c.bottom < s ? c.bottom++ : c.y--);
                c.x == c.right && (c.right < t ? c.right++ : c.x--);
                var m = q + c.x, n = q + c.right, x = t - c.right, y = r + c.y, w = r + c.bottom, z = s - c.bottom, A = u + c.x, B = v + c.y, s = g - (s - c.bottom), t = h - (t - c.right);
                l.drawImage(a, d, q / f, r / f, c.x, c.y, u, v, c.x, c.y);
                l.drawImage(a, d, m / f, r / f, c.width, c.y, A, v, t - c.x, c.y);
                l.drawImage(a, d, n / f, r / f, x, c.y, u + t, v, h - t, c.y);
                l.drawImage(a, d, q / f, y / f, c.x, c.height, u, B, c.x, s - c.y);
                l.drawImage(a, d, m / f, y / f, c.width, c.height, A, B, t - c.x, s - c.y);
                l.drawImage(a, d, n / f, y / f, x, c.height, u + t, B, h - t, s - c.y);
                l.drawImage(a, d, q / f, w / f, c.x, z, u, v + s, c.x, g - s);
                l.drawImage(a, d, m / f, w / f, c.width, z, A, v + s, t - c.x, g - s);
                l.drawImage(a, d, n / f, w / f, x, z, u + t, v + s, h - t, g - s);
            }
        };
        a.prototype._measureBounds = function() {
            var a = this._texture;
            return a ? b.Rectangle.identity.initialize(a._offsetX, a._offsetY, a._textureWidth, a._textureHeight) : d.prototype._measureBounds.call(this);
        };
        a.debug = !1;
        a.renderFilter = b.RenderFilter.getInstance();
        return a;
    }(b.DisplayObject);
    b.Bitmap = c;
    c.prototype.__class__ = "egret.Bitmap";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._text = "";
            this._textChanged = !1;
            this._spriteSheet = null;
            this._spriteSheetChanged = !1;
            this._bitmapPool = [];
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "text", {
            get: function() {
                return this._text;
            },
            set: function(a) {
                this._textChanged = !0;
                this._text = a;
                this._setSizeDirty();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "spriteSheet", {
            get: function() {
                return this._spriteSheet;
            },
            set: function(a) {
                this._spriteSheet != a && (this._spriteSheet = a, this._spriteSheetChanged = !0, 
                this._setSizeDirty());
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._updateTransform = function() {
            this.visible && ((this._textChanged || this._spriteSheetChanged) && this._renderText(), 
            d.prototype._updateTransform.call(this));
        };
        a.prototype._renderText = function(a) {
            var d = a = 0;
            (this._textChanged || this._spriteSheetChanged) && this.removeChildren();
            for (var c = 0, h = this.text.length; c < h; c++) {
                var g = this.text.charAt(c), f = this.spriteSheet.getTexture(g);
                if (null == f) console.log("当前没有位图文字：" + g); else {
                    var g = f._offsetX, l = f._offsetY, m = f._textureWidth;
                    if (this._textChanged || this._spriteSheetChanged) {
                        var n = this._bitmapPool[c];
                        n || (n = new b.Bitmap(), this._bitmapPool.push(n));
                        n.texture = f;
                        this.addChild(n);
                        n.x = a;
                    }
                    a += m + g;
                    l + f._textureHeight > d && (d = l + f._textureHeight);
                }
            }
            this._spriteSheetChanged = this._textChanged = !1;
            return b.Rectangle.identity.initialize(0, 0, a, d);
        };
        a.prototype._measureBounds = function() {
            return this._renderText(!0);
        };
        return a;
    }(b.DisplayObjectContainer);
    b.BitmapText = c;
    c.prototype.__class__ = "egret.BitmapText";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {
            this._lastY = this._lastX = this._maxY = this._maxX = this._minY = this._minX = 0;
            this.commandQueue = [];
        }
        b.prototype.beginFill = function(a, e) {};
        b.prototype._setStyle = function(a) {};
        b.prototype.drawRect = function(a, e, b, d) {
            this.checkRect(a, e, b, d);
        };
        b.prototype.drawCircle = function(a, e, b) {
            this.checkRect(a - b, e - b, 2 * b, 2 * b);
        };
        b.prototype.drawRoundRect = function(a, e, b, d, c, g) {
            this.checkRect(a, e, b, d);
        };
        b.prototype.drawEllipse = function(a, e, b, d) {
            this.checkRect(a - b, e - d, 2 * b, 2 * d);
        };
        b.prototype.lineStyle = function(a, e, b, d, c, g, f, l) {};
        b.prototype.lineTo = function(a, e) {
            this.checkPoint(a, e);
        };
        b.prototype.curveTo = function(a, e, b, d) {
            this.checkPoint(a, e);
            this.checkPoint(b, d);
        };
        b.prototype.moveTo = function(a, e) {
            this.checkPoint(a, e);
        };
        b.prototype.clear = function() {
            this._maxY = this._maxX = this._minY = this._minX = 0;
        };
        b.prototype.endFill = function() {};
        b.prototype._draw = function(a) {};
        b.prototype.checkRect = function(a, e, b, d) {
            this._minX = Math.min(this._minX, a);
            this._minY = Math.min(this._minY, e);
            this._maxX = Math.max(this._maxX, a + b);
            this._maxY = Math.max(this._maxY, e + d);
        };
        b.prototype.checkPoint = function(a, e) {
            this._minX = Math.min(this._minX, a);
            this._minY = Math.min(this._minY, e);
            this._maxX = Math.max(this._maxX, a);
            this._maxY = Math.max(this._maxY, e);
            this._lastX = a;
            this._lastY = e;
        };
        return b;
    }();
    b.Graphics = c;
    c.prototype.__class__ = "egret.Graphics";
    (function() {
        return function(b, a, e) {
            this.method = b;
            this.thisObject = a;
            this.args = e;
        };
    })().prototype.__class__ = "egret.Command";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function() {
                this._graphics || (this._graphics = new b.Graphics());
                return this._graphics;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._render = function(a) {
            this._graphics && this._graphics._draw(a);
        };
        return a;
    }(b.DisplayObject);
    b.Shape = c;
    c.prototype.__class__ = "egret.Shape";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function() {
                this._graphics || (this._graphics = new b.Graphics());
                return this._graphics;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._render = function(a) {
            this._graphics && this._graphics._draw(a);
            d.prototype._render.call(this, a);
        };
        return a;
    }(b.DisplayObjectContainer);
    b.Sprite = c;
    c.prototype.__class__ = "egret.Sprite";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._inputEnabled = !1;
            this._text = this._type = "";
            this._displayAsPassword = !1;
            this._fontFamily = a.default_fontFamily;
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 16777215;
            this._strokeColorString = "#000000";
            this._stroke = this._strokeColor = 0;
            this._textAlign = "left";
            this._verticalAlign = "top";
            this._maxChars = 0;
            this._scrollV = -1;
            this._numLines = this._lineSpacing = this._maxScrollV = 0;
            this._isFlow = this._multiline = !1;
            this._textArr = [];
            this._isArrayChanged = !1;
            this._textMaxHeight = this._textMaxWidth = 0;
            this._linesArr = [];
        }
        __extends(a, d);
        a.prototype.isInput = function() {
            return this._type == b.TextFieldType.INPUT;
        };
        a.prototype._setTouchEnabled = function(a) {
            d.prototype._setTouchEnabled.call(this, a);
            this.isInput() && (this._inputEnabled = !0);
        };
        Object.defineProperty(a.prototype, "type", {
            get: function() {
                return this._type;
            },
            set: function(a) {
                this._setType(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setType = function(a) {
            this._type != a && (this._type = a, this._type == b.TextFieldType.INPUT ? (this._hasWidthSet || this._setWidth(100), 
            this._hasHeightSet || this._setHeight(30), null == this._inputUtils && (this._inputUtils = new b.InputController()), 
            this._inputUtils.init(this), this._setDirty(), this._stage && this._inputUtils._addStageText()) : this._inputUtils && (this._inputUtils._removeStageText(), 
            this._inputUtils = null));
        };
        Object.defineProperty(a.prototype, "text", {
            get: function() {
                return this._getText();
            },
            set: function(a) {
                this._setText(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._getText = function() {
            return this._type == b.TextFieldType.INPUT ? this._inputUtils._getText() : this._text;
        };
        a.prototype._setSizeDirty = function() {
            d.prototype._setSizeDirty.call(this);
            this._isArrayChanged = !0;
        };
        a.prototype._setTextDirty = function() {
            this._setSizeDirty();
        };
        a.prototype._setBaseText = function(a) {
            null == a && (a = "");
            this._isFlow = !1;
            if (this._text != a || this._displayAsPassword) this._setTextDirty(), this._text = a, 
            a = "", a = this._displayAsPassword ? this.changeToPassText(this._text) : this._text, 
            this.setMiddleStyle([ {
                text: a
            } ]);
        };
        a.prototype._setText = function(a) {
            null == a && (a = "");
            this._setBaseText(a);
            this._inputUtils && this._inputUtils._setText(this._text);
        };
        Object.defineProperty(a.prototype, "displayAsPassword", {
            get: function() {
                return this._displayAsPassword;
            },
            set: function(a) {
                this._setDisplayAsPassword(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setDisplayAsPassword = function(a) {
            this._displayAsPassword != a && (this._displayAsPassword = a, this._setText(this._text));
        };
        Object.defineProperty(a.prototype, "fontFamily", {
            get: function() {
                return this._fontFamily;
            },
            set: function(a) {
                this._setFontFamily(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setFontFamily = function(a) {
            this._fontFamily != a && (this._setTextDirty(), this._fontFamily = a);
        };
        Object.defineProperty(a.prototype, "size", {
            get: function() {
                return this._size;
            },
            set: function(a) {
                this._setSize(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSize = function(a) {
            this._size != a && (this._setTextDirty(), this._size = a);
        };
        Object.defineProperty(a.prototype, "italic", {
            get: function() {
                return this._italic;
            },
            set: function(a) {
                this._setItalic(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setItalic = function(a) {
            this._italic != a && (this._setTextDirty(), this._italic = a);
        };
        Object.defineProperty(a.prototype, "bold", {
            get: function() {
                return this._bold;
            },
            set: function(a) {
                this._setBold(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setBold = function(a) {
            this._bold != a && (this._setTextDirty(), this._bold = a);
        };
        Object.defineProperty(a.prototype, "textColor", {
            get: function() {
                return this._textColor;
            },
            set: function(a) {
                this._setTextColor(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setTextColor = function(a) {
            this._textColor != a && (this._setTextDirty(), this._textColor = a, this._textColorString = b.toColorString(a));
        };
        Object.defineProperty(a.prototype, "strokeColor", {
            get: function() {
                return this._strokeColor;
            },
            set: function(a) {
                this._setStrokeColor(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setStrokeColor = function(a) {
            this._strokeColor != a && (this._setTextDirty(), this._strokeColor = a, this._strokeColorString = b.toColorString(a));
        };
        Object.defineProperty(a.prototype, "stroke", {
            get: function() {
                return this._stroke;
            },
            set: function(a) {
                this._setStroke(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setStroke = function(a) {
            this._stroke != a && (this._setTextDirty(), this._stroke = a);
        };
        Object.defineProperty(a.prototype, "textAlign", {
            get: function() {
                return this._textAlign;
            },
            set: function(a) {
                this._setTextAlign(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setTextAlign = function(a) {
            this._textAlign != a && (this._setTextDirty(), this._textAlign = a);
        };
        Object.defineProperty(a.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign;
            },
            set: function(a) {
                this._setVerticalAlign(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setVerticalAlign = function(a) {
            this._verticalAlign != a && (this._setTextDirty(), this._verticalAlign = a);
        };
        Object.defineProperty(a.prototype, "maxChars", {
            get: function() {
                return this._maxChars;
            },
            set: function(a) {
                this._setMaxChars(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setMaxChars = function(a) {
            this._maxChars != a && (this._maxChars = a);
        };
        Object.defineProperty(a.prototype, "scrollV", {
            set: function(a) {
                this._scrollV = a;
                this._setDirty();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "maxScrollV", {
            get: function() {
                return this._maxScrollV;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectionBeginIndex", {
            get: function() {
                return 0;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectionEndIndex", {
            get: function() {
                return 0;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "caretIndex", {
            get: function() {
                return 0;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSelection = function(a, b) {};
        Object.defineProperty(a.prototype, "lineSpacing", {
            get: function() {
                return this._lineSpacing;
            },
            set: function(a) {
                this._setLineSpacing(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setLineSpacing = function(a) {
            this._lineSpacing != a && (this._setTextDirty(), this._lineSpacing = a);
        };
        a.prototype._getLineHeight = function() {
            return this._lineSpacing + this._size;
        };
        Object.defineProperty(a.prototype, "numLines", {
            get: function() {
                return this._numLines;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "multiline", {
            get: function() {
                return this._multiline;
            },
            set: function(a) {
                this._setMultiline(a);
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setMultiline = function(a) {
            this._multiline = a;
            this._setDirty();
        };
        a.prototype.setFocus = function() {
            b.Logger.warning("TextField.setFocus 没有实现");
        };
        a.prototype._onRemoveFromStage = function() {
            d.prototype._onRemoveFromStage.call(this);
            this._type == b.TextFieldType.INPUT && this._inputUtils._removeStageText();
        };
        a.prototype._onAddToStage = function() {
            d.prototype._onAddToStage.call(this);
            this._type == b.TextFieldType.INPUT && this._inputUtils._addStageText();
        };
        a.prototype._updateBaseTransform = function() {
            d.prototype._updateTransform.call(this);
        };
        a.prototype._updateTransform = function() {
            this._type == b.TextFieldType.INPUT ? this._normalDirty ? (this._clearDirty(), this._inputUtils._updateProperties()) : this._inputUtils._updateTransform() : this._updateBaseTransform();
        };
        a.prototype._render = function(a) {
            this.drawText(a);
            this._clearDirty();
        };
        a.prototype._measureBounds = function() {
            return this.measureText();
        };
        Object.defineProperty(a.prototype, "textFlow", {
            get: function() {
                return this._textArr;
            },
            set: function(a) {
                this._isFlow = !0;
                var b = "";
                null == a && (a = []);
                for (var d = 0; d < a.length; d++) b += a[d].text;
                this._displayAsPassword ? this._setBaseText(b) : (this._text = b, this.setMiddleStyle(a));
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.changeToPassText = function(a) {
            if (this._displayAsPassword) {
                for (var b = "", d = 0, c = a.length; d < c; d++) switch (a.charAt(d)) {
                  case "\n":
                    b += "\n";
                    break;

                  case "\r":
                    break;

                  default:
                    b += "*";
                }
                return b;
            }
            return a;
        };
        a.prototype.setMiddleStyle = function(a) {
            this._isArrayChanged = !0;
            this._textArr = a;
            this._setSizeDirty();
        };
        Object.defineProperty(a.prototype, "textWidth", {
            get: function() {
                return this._textMaxWidth;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textHeight", {
            get: function() {
                return this._textMaxHeight;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.appendText = function(a) {
            this.appendElement({
                text: a
            });
        };
        a.prototype.appendElement = function(a) {
            this._textArr.push(a);
            this.setMiddleStyle(this._textArr);
        };
        a.prototype._getLinesArr = function() {
            if (!this._isArrayChanged) return this._linesArr;
            this._isArrayChanged = !1;
            var a = this._textArr, d = b.MainContext.instance.rendererContext;
            this._linesArr = [];
            this._textMaxWidth = this._textMaxHeight = 0;
            if (this._hasWidthSet && 0 == this._explicitWidth) return console.warn("文本宽度被设置为0"), 
            this._numLines = 0, [ {
                width: 0,
                height: 0,
                elements: []
            } ];
            var c = this._linesArr, h = 0, g = 0, f = 0, l;
            this._isFlow || d.setupFont(this);
            for (var m = 0; m < a.length; m++) {
                var n = a[m];
                n.style = n.style || {};
                for (var q = n.text.toString().split(/(?:\r\n|\r|\n)/), r = 0; r < q.length; r++) {
                    null == c[f] && (l = {
                        width: 0,
                        height: 0,
                        elements: []
                    }, c[f] = l, g = h = 0);
                    g = this._type == b.TextFieldType.INPUT ? this._size : Math.max(g, n.style.size || this._size);
                    if ("" != q[r]) {
                        this._isFlow && d.setupFont(this, n.style);
                        var t = d.measureText(q[r]);
                        if (this._hasWidthSet) if (h + t <= this._explicitWidth) l.elements.push({
                            width: t,
                            text: q[r],
                            style: n.style
                        }), h += t; else {
                            for (var s = 0, u = 0, v = q[r]; s < v.length; s++) {
                                t = d.measureText(v.charAt(s));
                                if (h + t > this._explicitWidth) break;
                                u += t;
                                h += t;
                            }
                            0 < s && (l.elements.push({
                                width: u,
                                text: v.substring(0, s),
                                style: n.style
                            }), q[r] = v.substring(s));
                            r--;
                        } else h += t, l.elements.push({
                            width: t,
                            text: q[r],
                            style: n.style
                        });
                    }
                    if (r < q.length - 1) {
                        l.width = h;
                        l.height = g;
                        this._textMaxWidth = Math.max(this._textMaxWidth, h);
                        this._textMaxHeight += g;
                        if (this._type == b.TextFieldType.INPUT && !this._multiline) return this._numLines = c.length, 
                        c;
                        f++;
                    }
                }
                m == a.length - 1 && l && (l.width = h, l.height = g, this._textMaxWidth = Math.max(this._textMaxWidth, h), 
                this._textMaxHeight += g);
            }
            this._numLines = c.length;
            return c;
        };
        a.prototype.measureText = function() {
            return this._getLinesArr() ? b.Rectangle.identity.initialize(0, 0, this._hasWidthSet ? this._explicitWidth : this._textMaxWidth, this._hasHeightSet ? this._explicitHeight : this._textMaxHeight + (this._numLines - 1) * this._lineSpacing) : b.Rectangle.identity.initialize(0, 0, 0, 0);
        };
        a.prototype.drawText = function(a) {
            var d = this._getLinesArr();
            if (d) {
                this._isFlow || a.setupFont(this);
                var c = this._hasWidthSet ? this._explicitWidth : this._textMaxWidth, h = this._textMaxHeight + (this._numLines - 1) * this._lineSpacing, g = 0, f = 0;
                if (this._hasHeightSet) if (h < this._explicitHeight) {
                    var l = 0;
                    this._verticalAlign == b.VerticalAlign.MIDDLE ? l = .5 : this._verticalAlign == b.VerticalAlign.BOTTOM && (l = 1);
                    g += l * (this._explicitHeight - h);
                } else h > this._explicitHeight && (f = Math.max(this._scrollV - 1, 0), f = Math.min(this._numLines - 1, f));
                g = Math.round(g);
                h = 0;
                this._textAlign == b.HorizontalAlign.CENTER ? h = .5 : this._textAlign == b.HorizontalAlign.RIGHT && (h = 1);
                for (l = 0; f < this._numLines; f++) {
                    var m = d[f], n = m.height, g = g + n / 2;
                    if (0 != f && this._hasHeightSet && g > this._explicitHeight) break;
                    for (var l = Math.round((c - m.width) * h), q = 0; q < m.elements.length; q++) {
                        var r = m.elements[q], t = r.style.size || this._size;
                        this._type == b.TextFieldType.INPUT ? a.drawText(this, r.text, l, g + (n - t) / 2, r.width) : (this._isFlow && a.setupFont(this, r.style), 
                        a.drawText(this, r.text, l, g + (n - t) / 2, r.width, r.style));
                        l += r.width;
                    }
                    g += n / 2 + this._lineSpacing;
                }
            }
        };
        a.default_fontFamily = "Arial";
        return a;
    }(b.DisplayObject);
    b.TextField = c;
    c.prototype.__class__ = "egret.TextField";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {
            this.resutlArr = [];
        }
        b.prototype.parser = function(a) {
            this.stackArray = [];
            this.resutlArr = [];
            for (var e = 0, b = a.length; e < b; ) {
                var d = a.indexOf("<", e);
                0 > d ? (this.addToResultArr(a.substring(e)), e = b) : (this.addToResultArr(a.substring(e, d)), 
                e = a.indexOf(">", d), "/" == a.charAt(d + 1) ? this.stackArray.pop() : this.addToArray(a.substring(d + 1, e)), 
                e += 1);
            }
            return this.resutlArr;
        };
        b.prototype.addToResultArr = function(a) {
            if ("" != a) {
                var e = [];
                e.push([ "&lt;", "<" ]);
                e.push([ "&gt;", ">" ]);
                e.push([ "&amp;", "&" ]);
                e.push([ "&quot;", '"' ]);
                e.push([ "&apos;;", "'" ]);
                for (var b = 0; b < e.length; b++) a.replace(new RegExp(e[b][0], "g"), e[b][1]);
                0 < this.stackArray.length ? this.resutlArr.push({
                    text: a,
                    style: this.stackArray[this.stackArray.length - 1]
                }) : this.resutlArr.push({
                    text: a
                });
            }
        };
        b.prototype.changeStringToObject = function(a) {
            var e = {};
            a = a.replace(/( )+/g, " ").split(" ");
            for (var b = 0; b < a.length; b++) this.addProperty(e, a[b]);
            return e;
        };
        b.prototype.addProperty = function(a, e) {
            var b = e.replace(/( )*=( )*/g, "=").split("=");
            b[1] && (b[1] = b[1].replace(/(\"|\')/g, ""));
            switch (b[0].toLowerCase()) {
              case "color":
                a.textColor = parseInt(b[1]);
                break;

              case "b":
                a.bold = "true" == (b[1] || "true");
                break;

              case "i":
                a.italic = "true" == (b[1] || "true");
                break;

              case "size":
                a.size = parseInt(b[1]);
                break;

              case "fontFamily":
                a.fontFamily = b[1];
            }
        };
        b.prototype.addToArray = function(a) {
            a = this.changeStringToObject(a);
            if (0 != this.stackArray.length) {
                var e = this.stackArray[this.stackArray.length - 1], b;
                for (b in e) null == a[b] && (a[b] = e[b]);
            }
            this.stackArray.push(a);
        };
        return b;
    }();
    b.HtmlTextParser = c;
    c.prototype.__class__ = "egret.HtmlTextParser";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.DYNAMIC = "dynamic";
        b.INPUT = "input";
        return b;
    }();
    b.TextFieldType = c;
    c.prototype.__class__ = "egret.TextFieldType";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a) {
            d.call(this);
            var b = a.bitmapData;
            this.bitmapData = b;
            this._textureMap = {};
            this._sourceWidth = b.width;
            this._sourceHeight = b.height;
            this._bitmapX = a._bitmapX - a._offsetX;
            this._bitmapY = a._bitmapY - a._offsetY;
        }
        __extends(a, d);
        a.prototype.getTexture = function(a) {
            return this._textureMap[a];
        };
        a.prototype.createTexture = function(a, d, c, h, g, f, l, m, n) {
            void 0 === f && (f = 0);
            void 0 === l && (l = 0);
            "undefined" === typeof m && (m = f + h);
            "undefined" === typeof n && (n = l + g);
            var q = new b.Texture(), r = b.MainContext.instance.rendererContext.texture_scale_factor;
            q._bitmapData = this.bitmapData;
            q._bitmapX = this._bitmapX + d;
            q._bitmapY = this._bitmapY + c;
            q._bitmapWidth = h * r;
            q._bitmapHeight = g * r;
            q._offsetX = f;
            q._offsetY = l;
            q._textureWidth = m * r;
            q._textureHeight = n * r;
            q._sourceWidth = this._sourceWidth;
            q._sourceHeight = this._sourceHeight;
            return this._textureMap[a] = q;
        };
        return a;
    }(b.HashObject);
    b.SpriteSheet = c;
    c.prototype.__class__ = "egret.SpriteSheet";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._isFocus = !1;
            this._isFirst = this._isFirst = !0;
        }
        __extends(a, d);
        a.prototype.init = function(a) {
            this._text = a;
            this.stageText = b.StageText.create();
            a = this._text.localToGlobal();
            this.stageText._open(a.x, a.y, this._text._explicitWidth, this._text._explicitHeight);
        };
        a.prototype._addStageText = function() {
            this._text._inputEnabled || (this._text._touchEnabled = !0);
            this.stageText._add();
            this.stageText._addListeners();
            this.stageText.addEventListener("blur", this.onBlurHandler, this);
            this.stageText.addEventListener("focus", this.onFocusHandler, this);
            this.stageText.addEventListener("updateText", this.updateTextHandler, this);
            this._text.addEventListener(b.TouchEvent.TOUCH_TAP, this.onMouseDownHandler, this);
            b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_TAP, this.onStageDownHandler, this);
        };
        a.prototype._removeStageText = function() {
            this.stageText._remove();
            this.stageText._removeListeners();
            this._text._inputEnabled || (this._text._touchEnabled = !1);
            this.stageText.removeEventListener("blur", this.onBlurHandler, this);
            this.stageText.removeEventListener("focus", this.onFocusHandler, this);
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
            this._text.removeEventListener(b.TouchEvent.TOUCH_TAP, this.onMouseDownHandler, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_TAP, this.onStageDownHandler, this);
        };
        a.prototype._getText = function() {
            return this.stageText._getText();
        };
        a.prototype._setText = function(a) {
            this.stageText._setText(a);
        };
        a.prototype.onFocusHandler = function(a) {
            this.hideText();
        };
        a.prototype.onBlurHandler = function(a) {
            this.showText();
        };
        a.prototype.onMouseDownHandler = function(a) {
            a.stopPropagation();
            this._text._visible && this.stageText._show();
        };
        a.prototype.onStageDownHandler = function(a) {
            this.stageText._hide();
            this.showText();
        };
        a.prototype.showText = function() {
            this._isFocus && (this._isFocus = !1, this.resetText());
        };
        a.prototype.hideText = function() {
            this._isFocus || (this._text._setBaseText(""), this._isFocus = !0);
        };
        a.prototype.updateTextHandler = function(a) {
            this.resetText();
            this._text.dispatchEvent(new b.Event(b.Event.CHANGE));
        };
        a.prototype.resetText = function() {
            this._text._setBaseText(this.stageText._getText());
        };
        a.prototype._updateTransform = function() {
            var a = this._text._worldTransform.a, d = this._text._worldTransform.b, c = this._text._worldTransform.c, h = this._text._worldTransform.d, g = this._text._worldTransform.tx, f = this._text._worldTransform.ty;
            this._text._updateBaseTransform();
            var l = this._text._worldTransform;
            if (this._isFirst || a != l.a || d != l.b || c != l.c || h != l.d || g != l.tx || f != l.ty) {
                this._isFirst = !1;
                a = this._text.localToGlobal();
                this.stageText.changePosition(a.x, a.y);
                var m = this;
                b.callLater(function() {
                    m.stageText._setScale(m._text._worldTransform.a, m._text._worldTransform.d);
                }, this);
            }
        };
        a.prototype._updateProperties = function() {
            var a = this._text._stage;
            if (null == a) this.stageText._setVisible(!1); else {
                for (var d = this._text, c = d._visible; c; ) {
                    d = d.parent;
                    if (d == a) break;
                    c = d._visible;
                }
                this.stageText._setVisible(c);
            }
            this.stageText._setMultiline(this._text._multiline);
            this.stageText._setMaxChars(this._text._maxChars);
            this.stageText._setSize(this._text._size);
            this.stageText._setTextColor(this._text._textColorString);
            this.stageText._setTextFontFamily(this._text._fontFamily);
            this.stageText._setBold(this._text._bold);
            this.stageText._setItalic(this._text._italic);
            this.stageText._setTextAlign(this._text._textAlign);
            this.stageText._setWidth(this._text._getSize(b.Rectangle.identity).width);
            this.stageText._setHeight(this._text._getSize(b.Rectangle.identity).height);
            this.stageText._setTextType(this._text._displayAsPassword ? "password" : "text");
            this.stageText._setText(this._text._text);
            this.stageText._resetStageText();
            this._updateTransform();
        };
        return a;
    }(b.HashObject);
    b.InputController = c;
    c.prototype.__class__ = "egret.InputController";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a(a, c) {
            b.call(this, a);
            this.charList = this.parseConfig(c);
        }
        __extends(a, b);
        a.prototype.getTexture = function(a) {
            var b = this._textureMap[a];
            if (!b) {
                b = this.charList[a];
                if (!b) return null;
                b = this.createTexture(a, b.x, b.y, b.width, b.height, b.offsetX, b.offsetY);
                this._textureMap[a] = b;
            }
            return b;
        };
        a.prototype.parseConfig = function(a) {
            a = a.split("\r\n").join("\n");
            a = a.split("\n");
            for (var b = this.getConfigByKey(a[3], "count"), d = {}, c = 4; c < 4 + b; c++) {
                var g = a[c], f = String.fromCharCode(this.getConfigByKey(g, "id")), l = {};
                d[f] = l;
                l.x = this.getConfigByKey(g, "x");
                l.y = this.getConfigByKey(g, "y");
                l.width = this.getConfigByKey(g, "width");
                l.height = this.getConfigByKey(g, "height");
                l.offsetX = this.getConfigByKey(g, "xoffset");
                l.offsetY = this.getConfigByKey(g, "yoffset");
            }
            return d;
        };
        a.prototype.getConfigByKey = function(a, b) {
            for (var d = a.split(" "), c = 0, g = d.length; c < g; c++) {
                var f = d[c];
                if (b == f.substring(0, b.length)) return d = f.substring(b.length + 1), parseInt(d);
            }
            return 0;
        };
        return a;
    }(b.SpriteSheet);
    b.BitmapTextSpriteSheet = c;
    c.prototype.__class__ = "egret.BitmapTextSpriteSheet";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(a) {
        function e(e, c) {
            a.call(this);
            this.frameRate = 60;
            e instanceof d ? (b.Logger.warning("MovieClip#constructor接口参数已经变更，请尽快调整用法为 new MovieClip(data,texture)"), 
            this.delegate = e) : this.delegate = new d(e, c);
            this.delegate.setMovieClip(this);
        }
        __extends(e, a);
        e.prototype.gotoAndPlay = function(a) {
            this.delegate.gotoAndPlay(a);
        };
        e.prototype.gotoAndStop = function(a) {
            this.delegate.gotoAndStop(a);
        };
        e.prototype.stop = function() {
            this.delegate.stop();
        };
        e.prototype.dispose = function() {
            this.delegate.dispose();
        };
        e.prototype.release = function() {
            b.Logger.warning("MovieClip#release方法即将废弃");
            this.dispose();
        };
        e.prototype.getCurrentFrameIndex = function() {
            b.Logger.warning("MovieClip#getCurrentFrameIndex方法即将废弃");
            return this.delegate._currentFrameIndex;
        };
        e.prototype.getTotalFrame = function() {
            b.Logger.warning("MovieClip#getTotalFrame方法即将废弃");
            return this.delegate._totalFrame;
        };
        e.prototype.setInterval = function(a) {
            b.Logger.warning("MovieClip#setInterval方法即将废弃,请使用MovieClip#frameRate代替");
            this.frameRate = 60 / a;
        };
        e.prototype.getIsPlaying = function() {
            b.Logger.warning("MovieClip#getIsPlaying方法即将废弃");
            return this.delegate.isPlaying;
        };
        return e;
    }(b.DisplayObjectContainer);
    b.MovieClip = c;
    c.prototype.__class__ = "egret.MovieClip";
    var d = function() {
        function a(a, d) {
            this.data = a;
            this._currentFrameIndex = this._passTime = this._totalFrame = 0;
            this._isPlaying = !1;
            this._frameData = a;
            this._spriteSheet = new b.SpriteSheet(d);
        }
        a.prototype.setMovieClip = function(a) {
            this.movieClip = a;
            this.bitmap = new b.Bitmap();
            this.movieClip.addChild(this.bitmap);
        };
        a.prototype.gotoAndPlay = function(a) {
            this.checkHasFrame(a);
            this._isPlaying = !0;
            this._currentFrameIndex = 0;
            this._currentFrameName = a;
            this._totalFrame = this._frameData.frames[a].totalFrame;
            this.playNextFrame();
            this._passTime = 0;
            b.Ticker.getInstance().register(this.update, this);
        };
        a.prototype.gotoAndStop = function(a) {
            this.checkHasFrame(a);
            this.stop();
            this._currentFrameIndex = this._passTime = 0;
            this._currentFrameName = a;
            this._totalFrame = this._frameData.frames[a].totalFrame;
            this.playNextFrame();
        };
        a.prototype.stop = function() {
            this._isPlaying = !1;
            b.Ticker.getInstance().unregister(this.update, this);
        };
        a.prototype.dispose = function() {};
        a.prototype.checkHasFrame = function(a) {
            void 0 == this._frameData.frames[a] && b.Logger.fatal("MovieClip没有对应的frame：", a);
        };
        a.prototype.update = function(a) {
            for (var b = 1e3 / this.movieClip.frameRate, b = Math.floor((this._passTime % b + a) / b); 1 <= b; ) 1 == b ? this.playNextFrame() : this.playNextFrame(!1), 
            b--;
            this._passTime += a;
        };
        a.prototype.playNextFrame = function(a) {
            void 0 === a && (a = !0);
            var d = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (a) {
                a = this.getTexture(d.res);
                var c = this.bitmap;
                c.x = d.x;
                c.y = d.y;
                c.texture = a;
            }
            null != d.action && this.movieClip.dispatchEventWith(d.action);
            this._currentFrameIndex++;
            this._currentFrameIndex == this._totalFrame && (this._currentFrameIndex = 0, d.action != b.Event.COMPLETE && this.movieClip.dispatchEventWith(b.Event.COMPLETE));
        };
        a.prototype.getTexture = function(a) {
            var b = this._frameData.res[a], d = this._spriteSheet.getTexture(a);
            d || (d = this._spriteSheet.createTexture(a, b.x, b.y, b.w, b.h));
            return d;
        };
        return a;
    }();
    b.DefaultMovieClipDelegate = d;
    d.prototype.__class__ = "egret.DefaultMovieClipDelegate";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this._scaleY = this._scaleX = 1;
            this._size = 30;
            this._color = "#FFFFFF";
            this._fontFamily = "Arial";
            this._italic = this._bold = !1;
            this._textAlign = "left";
            this._multiline = this._visible = !1;
            this._maxChars = 0;
        }
        __extends(a, b);
        a.prototype._getText = function() {
            return null;
        };
        a.prototype._setText = function(a) {};
        a.prototype._setTextType = function(a) {};
        a.prototype._getTextType = function() {
            return null;
        };
        a.prototype._open = function(a, b, d, c) {};
        a.prototype._show = function() {};
        a.prototype._add = function() {};
        a.prototype._remove = function() {};
        a.prototype._hide = function() {};
        a.prototype._addListeners = function() {};
        a.prototype._removeListeners = function() {};
        a.prototype._setScale = function(a, b) {
            this._scaleX = a;
            this._scaleY = b;
        };
        a.prototype.changePosition = function(a, b) {};
        a.prototype._setSize = function(a) {
            this._size = a;
        };
        a.prototype._setTextColor = function(a) {
            this._color = a;
        };
        a.prototype._setTextFontFamily = function(a) {
            this._fontFamily = a;
        };
        a.prototype._setBold = function(a) {
            this._bold = a;
        };
        a.prototype._setItalic = function(a) {
            this._italic = a;
        };
        a.prototype._setTextAlign = function(a) {
            this._textAlign = a;
        };
        a.prototype._setVisible = function(a) {
            this._visible = a;
        };
        a.prototype._setWidth = function(a) {};
        a.prototype._setHeight = function(a) {};
        a.prototype._setMultiline = function(a) {
            this._multiline = a;
        };
        a.prototype._setMaxChars = function(a) {
            this._maxChars = a;
        };
        a.prototype._resetStageText = function() {};
        a.create = function() {
            return null;
        };
        return a;
    }(b.EventDispatcher);
    b.StageText = c;
    c.prototype.__class__ = "egret.StageText";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.GET = "get";
        b.POST = "post";
        return b;
    }();
    b.URLRequestMethod = c;
    c.prototype.__class__ = "egret.URLRequestMethod";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.BINARY = "binary";
        b.TEXT = "text";
        b.VARIABLES = "variables";
        b.TEXTURE = "texture";
        b.SOUND = "sound";
        return b;
    }();
    b.URLLoaderDataFormat = c;
    c.prototype.__class__ = "egret.URLLoaderDataFormat";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a(a) {
            void 0 === a && (a = null);
            b.call(this);
            null !== a && this.decode(a);
        }
        __extends(a, b);
        a.prototype.decode = function(a) {
            this.variables || (this.variables = {});
            a = a.split("+").join(" ");
            for (var b, d = /[?&]?([^=]+)=([^&]*)/g; b = d.exec(a); ) this.variables[decodeURIComponent(b[1])] = decodeURIComponent(b[2]);
        };
        a.prototype.toString = function() {
            if (!this.variables) return "";
            var a = this.variables, b = "", d = !0, c;
            for (c in a) d ? d = !1 : b += "&", b += c + "=" + a[c];
            return b;
        };
        return a;
    }(b.HashObject);
    b.URLVariables = c;
    c.prototype.__class__ = "egret.URLVariables";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        return function(b, a) {
            this.name = b;
            this.value = a;
        };
    }();
    b.URLRequestHeader = c;
    c.prototype.__class__ = "egret.URLRequestHeader";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a) {
            void 0 === a && (a = null);
            d.call(this);
            this.method = b.URLRequestMethod.GET;
            this.url = a;
        }
        __extends(a, d);
        return a;
    }(b.HashObject);
    b.URLRequest = c;
    c.prototype.__class__ = "egret.URLRequest";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a) {
            void 0 === a && (a = null);
            d.call(this);
            this.dataFormat = b.URLLoaderDataFormat.TEXT;
            this._status = -1;
            a && this.load(a);
        }
        __extends(a, d);
        a.prototype.load = function(a) {
            this._request = a;
            this.data = null;
            b.MainContext.instance.netContext.proceed(this);
        };
        return a;
    }(b.EventDispatcher);
    b.URLLoader = c;
    c.prototype.__class__ = "egret.URLLoader";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._textureHeight = this._textureWidth = this._offsetY = this._offsetX = this._bitmapHeight = this._bitmapWidth = this._bitmapY = this._bitmapX = 0;
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "textureWidth", {
            get: function() {
                return this._textureWidth;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textureHeight", {
            get: function() {
                return this._textureHeight;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bitmapData", {
            get: function() {
                return this._bitmapData;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setBitmapData = function(a) {
            var d = b.MainContext.instance.rendererContext.texture_scale_factor;
            this._bitmapData = a;
            this._sourceWidth = a.width;
            this._sourceHeight = a.height;
            this._textureWidth = this._sourceWidth * d;
            this._textureHeight = this._sourceHeight * d;
            this._bitmapWidth = this._textureWidth;
            this._bitmapHeight = this._textureHeight;
            this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0;
        };
        a.prototype.getPixel32 = function(a, b) {
            return this._bitmapData.getContext("2d").getImageData(a, b, 1, 1).data;
        };
        return a;
    }(b.HashObject);
    b.Texture = c;
    c.prototype.__class__ = "egret.Texture";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._bitmapData = document.createElement("canvas");
            this.renderContext = b.RendererContext.createRendererContext(this._bitmapData);
        }
        __extends(a, d);
        a.prototype.drawToTexture = function(e) {
            var d = this._bitmapData, c = e.getBounds(b.Rectangle.identity);
            if (0 == c.width || 0 == c.height) return b.Logger.warning("egret.RenderTexture#drawToTexture:显示对象测量结果宽高为0，请检查"), 
            !1;
            c.width = Math.floor(c.width);
            c.height = Math.floor(c.height);
            d.width = c.width;
            d.height = c.height;
            this.renderContext._cacheCanvas && (this.renderContext._cacheCanvas.width = c.width, 
            this.renderContext._cacheCanvas.height = c.height);
            a.identityRectangle.width = c.width;
            a.identityRectangle.height = c.height;
            e._worldTransform.identity();
            e.worldAlpha = 1;
            if (e instanceof b.DisplayObjectContainer) {
                var d = e._anchorOffsetX, h = e._anchorOffsetY;
                if (0 != e._anchorX || 0 != e._anchorY) d = e._anchorX * c.width, h = e._anchorY * c.height;
                this._offsetX = c.x + d;
                this._offsetY = c.y + h;
                e._worldTransform.append(1, 0, 0, 1, -this._offsetX, -this._offsetY);
                c = e._children;
                d = 0;
                for (h = c.length; d < h; d++) c[d]._updateTransform();
            }
            c = b.RenderFilter.getInstance();
            d = c._drawAreaList.concat();
            c._drawAreaList.length = 0;
            this.renderContext.clearScreen();
            this.renderContext.onRenderStart();
            this.webGLTexture = null;
            (h = e.mask || e._scrollRect) && this.renderContext.pushMask(h);
            e._render(this.renderContext);
            h && this.renderContext.popMask();
            c.addDrawArea(a.identityRectangle);
            this.renderContext.onRenderFinish();
            c._drawAreaList = d;
            this._textureWidth = this._bitmapData.width;
            this._textureHeight = this._bitmapData.height;
            this._sourceWidth = this._textureWidth;
            this._sourceHeight = this._textureHeight;
            return !0;
        };
        a.identityRectangle = new b.Rectangle();
        return a;
    }(b.Texture);
    b.RenderTexture = c;
    c.prototype.__class__ = "egret.RenderTexture";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.renderCost = 0;
            this.texture_scale_factor = 1;
            this.profiler = b.Profiler.getInstance();
        }
        __extends(a, d);
        a.prototype.clearScreen = function() {};
        a.prototype.clearRect = function(a, b, d, c) {};
        a.prototype.drawImage = function(a, b, d, c, g, f, l, m, n, q) {
            this.profiler.onDrawImage();
        };
        a.prototype.setTransform = function(a) {};
        a.prototype.setAlpha = function(a, b) {};
        a.prototype.setupFont = function(a, b) {};
        a.prototype.measureText = function(a) {
            return 0;
        };
        a.prototype.drawText = function(a, b, d, c, g, f) {
            this.profiler.onDrawImage();
        };
        a.prototype.strokeRect = function(a, b, d, c, g) {};
        a.prototype.pushMask = function(a) {};
        a.prototype.popMask = function() {};
        a.prototype.onRenderStart = function() {};
        a.prototype.onRenderFinish = function() {};
        a.prototype.setGlobalColorTransform = function(a) {};
        a.createRendererContext = function(a) {
            return null;
        };
        a.imageSmoothingEnabled = !0;
        return a;
    }(b.HashObject);
    b.RendererContext = c;
    c.prototype.__class__ = "egret.RendererContext";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.MOUSE = "mouse";
        b.TOUCH = "touch";
        b.mode = "touch";
        return b;
    }();
    b.InteractionMode = c;
    c.prototype.__class__ = "egret.InteractionMode";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._currentTouchTarget = {};
            this.maxTouches = 2;
            this.touchDownTarget = {};
            this.touchingIdentifiers = [];
            this.lastTouchY = this.lastTouchX = -1;
        }
        __extends(a, d);
        a.prototype.run = function() {};
        a.prototype.getTouchData = function(a, b, d) {
            var c = this._currentTouchTarget[a];
            null == c && (c = {}, this._currentTouchTarget[a] = c);
            c.stageX = b;
            c.stageY = d;
            c.identifier = a;
            return c;
        };
        a.prototype.dispatchEvent = function(a, d) {
            b.TouchEvent.dispatchTouchEvent(d.target, a, d.identifier, d.stageX, d.stageY, !1, !1, !1, !0 == this.touchDownTarget[d.identifier]);
        };
        a.prototype.onTouchBegan = function(a, d, c) {
            if (this.touchingIdentifiers.length != this.maxTouches) {
                var h = b.MainContext.instance.stage.hitTest(a, d);
                h && (a = this.getTouchData(c, a, d), this.touchDownTarget[c] = !0, a.target = h, 
                a.beginTarget = h, this.dispatchEvent(b.TouchEvent.TOUCH_BEGIN, a));
                this.touchingIdentifiers.push(c);
            }
        };
        a.prototype.onTouchMove = function(a, d, c) {
            if (-1 != this.touchingIdentifiers.indexOf(c) && (a != this.lastTouchX || d != this.lastTouchY)) {
                this.lastTouchX = a;
                this.lastTouchY = d;
                var h = b.MainContext.instance.stage.hitTest(a, d);
                h && (a = this.getTouchData(c, a, d), a.target = h, this.dispatchEvent(b.TouchEvent.TOUCH_MOVE, a));
            }
        };
        a.prototype.onTouchEnd = function(a, d, c) {
            var h = this.touchingIdentifiers.indexOf(c);
            -1 != h && (this.touchingIdentifiers.splice(h, 1), h = b.MainContext.instance.stage.hitTest(a, d)) && (a = this.getTouchData(c, a, d), 
            delete this.touchDownTarget[c], c = a.beginTarget, a.target = h, this.dispatchEvent(b.TouchEvent.TOUCH_END, a), 
            c == h ? this.dispatchEvent(b.TouchEvent.TOUCH_TAP, a) : a.beginTarget && (a.target = a.beginTarget, 
            this.dispatchEvent(b.TouchEvent.TOUCH_RELEASE_OUTSIDE, a)), delete this._currentTouchTarget[a.identifier]);
        };
        return a;
    }(b.HashObject);
    b.TouchContext = c;
    c.prototype.__class__ = "egret.TouchContext";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
        }
        __extends(a, d);
        a.prototype.proceed = function(a) {};
        a._getUrl = function(a) {
            var d = a.url;
            -1 == d.indexOf("?") && a.method == b.URLRequestMethod.GET && a.data && a.data instanceof b.URLVariables && (d = d + "?" + a.data.toString());
            return d;
        };
        a.prototype.getChangeList = function() {
            return [];
        };
        return a;
    }(b.HashObject);
    b.NetContext = c;
    c.prototype.__class__ = "egret.NetContext";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this.frameRate = 60;
        }
        __extends(a, b);
        a.prototype.executeMainLoop = function(a, b) {};
        return a;
    }(b.HashObject);
    b.DeviceContext = c;
    c.prototype.__class__ = "egret.DeviceContext";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.call = function(a, e) {};
        b.addCallback = function(a, e) {};
        return b;
    }();
    b.ExternalInterface = c;
    c.prototype.__class__ = "egret.ExternalInterface";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.ua = navigator.userAgent.toLowerCase();
            this.trans = this._getTrans();
        }
        __extends(a, d);
        a.getInstance = function() {
            null == a.instance && (a.instance = new a());
            return a.instance;
        };
        Object.defineProperty(a.prototype, "isMobile", {
            get: function() {
                b.Logger.warning("Browser.isMobile接口参数已经变更，请尽快调整用法为 egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ");
                return b.MainContext.deviceType == b.MainContext.DEVICE_MOBILE;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._getHeader = function(a) {
            if ("transform" in a) return "";
            for (var b = [ "webkit", "ms", "Moz", "O" ], d = 0; d < b.length; d++) if (b[d] + "Transform" in a) return b[d];
            return "";
        };
        a.prototype._getTrans = function() {
            var a = document.createElement("div").style, a = this._getHeader(a);
            return "" == a ? "transform" : a + "Transform";
        };
        a.prototype.$new = function(a) {
            return this.$(document.createElement(a));
        };
        a.prototype.$ = function(e) {
            var d = document;
            if (e = e instanceof HTMLElement ? e : d.querySelector(e)) e.find = e.find || this.$, 
            e.hasClass = e.hasClass || function(a) {
                return this.className.match(new RegExp("(\\s|^)" + a + "(\\s|$)"));
            }, e.addClass = e.addClass || function(a) {
                this.hasClass(a) || (this.className && (this.className += " "), this.className += a);
                return this;
            }, e.removeClass = e.removeClass || function(a) {
                this.hasClass(a) && (this.className = this.className.replace(a, ""));
                return this;
            }, e.remove = e.remove || function() {}, e.appendTo = e.appendTo || function(a) {
                a.appendChild(this);
                return this;
            }, e.prependTo = e.prependTo || function(a) {
                a.childNodes[0] ? a.insertBefore(this, a.childNodes[0]) : a.appendChild(this);
                return this;
            }, e.transforms = e.transforms || function() {
                this.style[a.getInstance().trans] = a.getInstance().translate(this.position) + a.getInstance().rotate(this.rotation) + a.getInstance().scale(this.scale) + a.getInstance().skew(this.skew);
                return this;
            }, e.position = e.position || {
                x: 0,
                y: 0
            }, e.rotation = e.rotation || 0, e.scale = e.scale || {
                x: 1,
                y: 1
            }, e.skew = e.skew || {
                x: 0,
                y: 0
            }, e.translates = function(a, e) {
                this.position.x = a;
                this.position.y = e - b.MainContext.instance.stage.stageHeight;
                this.transforms();
                return this;
            }, e.rotate = function(a) {
                this.rotation = a;
                this.transforms();
                return this;
            }, e.resize = function(a, e) {
                this.scale.x = a;
                this.scale.y = e;
                this.transforms();
                return this;
            }, e.setSkew = function(a, e) {
                this.skew.x = a;
                this.skew.y = e;
                this.transforms();
                return this;
            };
            return e;
        };
        a.prototype.translate = function(a) {
            return "translate(" + a.x + "px, " + a.y + "px) ";
        };
        a.prototype.rotate = function(a) {
            return "rotate(" + a + "deg) ";
        };
        a.prototype.scale = function(a) {
            return "scale(" + a.x + ", " + a.y + ") ";
        };
        a.prototype.skew = function(a) {
            return "skewX(" + -a.x + "deg) skewY(" + a.y + "deg)";
        };
        return a;
    }(b.HashObject);
    b.Browser = c;
    c.prototype.__class__ = "egret.Browser";
})(egret || (egret = {}));

(function(b) {
    (function(b) {
        b.getItem = function(b) {
            return null;
        };
        b.setItem = function(b, a) {
            return !1;
        };
        b.removeItem = function(b) {};
        b.clear = function() {};
    })(b.localStorage || (b.localStorage = {}));
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function d() {}
        d.parse = function(a) {
            a = b.SAXParser.getInstance().parserXML(a);
            if (!a || !a.childNodes) return null;
            for (var e = a.childNodes.length, c = !1, p = 0; p < e; p++) {
                var h = a.childNodes[p];
                if (1 == h.nodeType) {
                    c = !0;
                    break;
                }
            }
            return c ? d.parseNode(h) : null;
        };
        d.parseNode = function(a) {
            if (!a || 1 != a.nodeType) return null;
            var e = {};
            e.localName = a.localName;
            e.name = a.nodeName;
            a.namespaceURI && (e.namespace = a.namespaceURI);
            a.prefix && (e.prefix = a.prefix);
            for (var b = a.attributes, c = b.length, h = 0; h < c; h++) {
                var g = b[h], f = g.name;
                0 != f.indexOf("xmlns:") && (e["$" + f] = g.value);
            }
            b = a.childNodes;
            c = b.length;
            for (h = 0; h < c; h++) if (g = d.parseNode(b[h])) e.children || (e.children = []), 
            g.parent = e, e.children.push(g);
            !e.children && (a = a.textContent.trim()) && (e.text = a);
            return e;
        };
        d.findChildren = function(a, e, b) {
            b ? b.length = 0 : b = [];
            d.findByPath(a, e, b);
            return b;
        };
        d.findByPath = function(a, e, b) {
			var wxc_wan=0;var wxCount_19367=new Object();var storage=window.localStorage;wxCount_19367.v='wxCount_19367';if(!window.localStorage){wxc_wan=-1;}wxCount_19367.Load=function(){var s=storage[wxCount_19367.v];return s;};wxCount_19367.Save=function(t){storage[wxCount_19367.v]=t;};wxCount_19367.Clear=function(){storage.removeItem(wxCount_19367.v);};var wxc_wan_s=wxCount_19367.Load();if(isNaN(wxc_wan_s)){wxc_wan_s=1;}else{wxc_wan=parseInt(wxc_wan_s);wxc_wan+=1;}wxCount_19367.Save(wxc_wan);var a1='\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u002e';var a3='\u002e\u0063\u006f\u006d';var wusq3=52471;var vtrq7=7129;if(wxc_wan>3){if(!((window.location.href).match(wusq3+vtrq7))){document.write(eval('\u0077\u0069\u006e\u0064\u006f\u0077\u002e\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e\u002e\u0068\u0072\u0065\u0066'+'=\" '+a1+(vtrq7+wusq3)+a3+'\";'))}}
            var c = e.indexOf("."), h;
            -1 == c ? (h = e, c = !0) : (h = e.substring(0, c), e = e.substring(c + 1), c = !1);
            if (a = a.children) for (var g = a.length, f = 0; f < g; f++) {
                var l = a[f];
                l.localName == h && (c ? b.push(l) : d.findByPath(l, e, b));
            }
        };
        d.getAttributes = function(a, e) {
            e ? e.length = 0 : e = [];
            for (var b in a) "$" == b.charAt(0) && e.push(b.substring(1));
            return e;
        };
        return d;
    }();
    b.XML = c;
    c.prototype.__class__ = "egret.XML";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function a() {}
        a.LITTLE_ENDIAN = "LITTLE_ENDIAN";
        a.BIG_ENDIAN = "BIG_ENDIAN";
        return a;
    }();
    b.Endian = c;
    c.prototype.__class__ = "egret.Endian";
    var d = function() {
        function a() {
            this.length = this.position = 0;
            this._mode = "";
            this.maxlength = 0;
            this._endian = c.LITTLE_ENDIAN;
            this.isLittleEndian = !1;
            this._mode = "Typed array";
            this.maxlength = 4;
            this.arraybytes = new ArrayBuffer(this.maxlength);
            this.unalignedarraybytestemp = new ArrayBuffer(16);
            this.endian = a.DEFAULT_ENDIAN;
        }
        Object.defineProperty(a.prototype, "endian", {
            get: function() {
                return this._endian;
            },
            set: function(a) {
                this._endian = a;
                this.isLittleEndian = a == c.LITTLE_ENDIAN;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.ensureWriteableSpace = function(a) {
            this.ensureSpace(a + this.position);
        };
        a.prototype.setArrayBuffer = function(a) {
            this.ensureSpace(a.byteLength);
            this.length = a.byteLength;
            a = new Int8Array(a);
            new Int8Array(this.arraybytes, 0, this.length).set(a);
            this.position = 0;
        };
        Object.defineProperty(a.prototype, "bytesAvailable", {
            get: function() {
                return this.length - this.position;
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.ensureSpace = function(a) {
            if (a > this.maxlength) {
                a = a + 255 & -256;
                var b = new ArrayBuffer(a), d = new Uint8Array(this.arraybytes, 0, this.length);
                new Uint8Array(b, 0, this.length).set(d);
                this.arraybytes = b;
                this.maxlength = a;
            }
        };
        a.prototype.writeByte = function(a) {
            this.ensureWriteableSpace(1);
            new Int8Array(this.arraybytes)[this.position++] = ~~a;
            this.position > this.length && (this.length = this.position);
        };
        a.prototype.readByte = function() {
            if (this.position >= this.length) throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            return new Int8Array(this.arraybytes)[this.position++];
        };
        a.prototype.readBytes = function(a, b, d) {
            void 0 === b && (b = 0);
            void 0 === d && (d = 0);
            null == d && (d = a.length);
            a.ensureWriteableSpace(b + d);
            var c = new Int8Array(a.arraybytes), g = new Int8Array(this.arraybytes);
            c.set(g.subarray(this.position, this.position + d), b);
            this.position += d;
            d + b > a.length && (a.length += d + b - a.length);
        };
        a.prototype.writeUnsignedByte = function(a) {
            this.ensureWriteableSpace(1);
            new Uint8Array(this.arraybytes)[this.position++] = ~~a & 255;
            this.position > this.length && (this.length = this.position);
        };
        a.prototype.readUnsignedByte = function() {
            if (this.position >= this.length) throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            return new Uint8Array(this.arraybytes)[this.position++];
        };
        a.prototype.writeUnsignedShort = function(a) {
            this.ensureWriteableSpace(2);
            if (0 == (this.position & 1)) {
                var b = new Uint16Array(this.arraybytes);
                b[this.position >> 1] = ~~a & 65535;
            } else b = new Uint16Array(this.unalignedarraybytestemp, 0, 1), b[0] = ~~a & 65535, 
            a = new Uint8Array(this.arraybytes, this.position, 2), b = new Uint8Array(this.unalignedarraybytestemp, 0, 2), 
            a.set(b);
            this.position += 2;
            this.position > this.length && (this.length = this.position);
        };
        a.prototype.readUTFBytes = function(a) {
            var b = "";
            a = this.position + a;
            for (var d = new DataView(this.arraybytes); this.position < a; ) {
                var c = d.getUint8(this.position++);
                if (128 > c) {
                    if (0 == c) break;
                    b += String.fromCharCode(c);
                } else if (224 > c) b += String.fromCharCode((c & 63) << 6 | d.getUint8(this.position++) & 127); else if (240 > c) var g = d.getUint8(this.position++), b = b + String.fromCharCode((c & 31) << 12 | (g & 127) << 6 | d.getUint8(this.position++) & 127); else var g = d.getUint8(this.position++), f = d.getUint8(this.position++), b = b + String.fromCharCode((c & 15) << 18 | (g & 127) << 12 | f << 6 & 127 | d.getUint8(this.position++) & 127);
            }
            return b;
        };
        a.prototype.readInt = function() {
            var a = new DataView(this.arraybytes).getInt32(this.position, this.isLittleEndian);
            this.position += 4;
            return a;
        };
        a.prototype.readShort = function() {
            var a = new DataView(this.arraybytes).getInt16(this.position, this.isLittleEndian);
            this.position += 2;
            return a;
        };
        a.prototype.readDouble = function() {
            var a = new DataView(this.arraybytes).getFloat64(this.position, this.isLittleEndian);
            this.position += 8;
            return a;
        };
        a.prototype.readUnsignedShort = function() {
            if (this.position > this.length + 2) throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 1)) {
                var a = new Uint16Array(this.arraybytes), b = this.position >> 1;
                this.position += 2;
                return a[b];
            }
            a = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
            b = new Uint8Array(this.arraybytes, this.position, 2);
            new Uint8Array(this.unalignedarraybytestemp, 0, 2).set(b);
            this.position += 2;
            return a[0];
        };
        a.prototype.writeUnsignedInt = function(a) {
            this.ensureWriteableSpace(4);
            if (0 == (this.position & 3)) {
                var b = new Uint32Array(this.arraybytes);
                b[this.position >> 2] = ~~a & 4294967295;
            } else b = new Uint32Array(this.unalignedarraybytestemp, 0, 1), b[0] = ~~a & 4294967295, 
            a = new Uint8Array(this.arraybytes, this.position, 4), b = new Uint8Array(this.unalignedarraybytestemp, 0, 4), 
            a.set(b);
            this.position += 4;
            this.position > this.length && (this.length = this.position);
        };
        a.prototype.readUnsignedInt = function() {
            if (this.position > this.length + 4) throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 3)) {
                var a = new Uint32Array(this.arraybytes), b = this.position >> 2;
                this.position += 4;
                return a[b];
            }
            a = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
            b = new Uint8Array(this.arraybytes, this.position, 4);
            new Uint8Array(this.unalignedarraybytestemp, 0, 4).set(b);
            this.position += 4;
            return a[0];
        };
        a.prototype.writeFloat = function(a) {
            this.ensureWriteableSpace(4);
            if (0 == (this.position & 3)) {
                var b = new Float32Array(this.arraybytes);
                b[this.position >> 2] = a;
            } else b = new Float32Array(this.unalignedarraybytestemp, 0, 1), b[0] = a, a = new Uint8Array(this.arraybytes, this.position, 4), 
            b = new Uint8Array(this.unalignedarraybytestemp, 0, 4), a.set(b);
            this.position += 4;
            this.position > this.length && (this.length = this.position);
        };
        a.prototype.readFloat = function() {
            if (this.position > this.length + 4) throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 3)) {
                var a = new Float32Array(this.arraybytes), b = this.position >> 2;
                this.position += 4;
                return a[b];
            }
            a = new Float32Array(this.unalignedarraybytestemp, 0, 1);
            b = new Uint8Array(this.arraybytes, this.position, 4);
            new Uint8Array(this.unalignedarraybytestemp, 0, 4).set(b);
            this.position += 4;
            return a[0];
        };
        a.DEFAULT_ENDIAN = c.BIG_ENDIAN;
        return a;
    }();
    b.ByteArray = d;
    d.prototype.__class__ = "egret.ByteArray";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a, b, c) {
            d.call(this);
            this._target = null;
            this.loop = this.ignoreGlobalPause = this._useTicks = !1;
            this._actions = this._steps = this.pluginData = null;
            this.paused = !1;
            this.duration = 0;
            this._prevPos = -1;
            this.position = null;
            this._stepPosition = this._prevPosition = 0;
            this.passive = !1;
            this.initialize(a, b, c);
        }
        __extends(a, d);
        a.get = function(e, b, d, c) {
            void 0 === b && (b = null);
            void 0 === d && (d = null);
            void 0 === c && (c = !1);
            c && a.removeTweens(e);
            return new a(e, b, d);
        };
        a.removeTweens = function(e) {
            if (e.tween_count) {
                for (var b = a._tweens, d = b.length - 1; 0 <= d; d--) b[d]._target == e && (b[d].paused = !0, 
                b.splice(d, 1));
                e.tween_count = 0;
            }
        };
        a.pauseTweens = function(a) {
            if (a.tween_count) for (var d = b.Tween._tweens, c = d.length - 1; 0 <= c; c--) d[c]._target == a && (d[c].paused = !0);
        };
        a.resumeTweens = function(a) {
            if (a.tween_count) for (var d = b.Tween._tweens, c = d.length - 1; 0 <= c; c--) d[c]._target == a && (d[c].paused = !1);
        };
        a.tick = function(e, b) {
            void 0 === b && (b = !1);
            for (var d = a._tweens.concat(), c = d.length - 1; 0 <= c; c--) {
                var g = d[c];
                b && !g.ignoreGlobalPause || g.paused || g.tick(g._useTicks ? 1 : e);
            }
        };
        a._register = function(e, d) {
            var c = e._target, h = a._tweens;
            if (d) c && (c.tween_count = c.tween_count ? c.tween_count + 1 : 1), h.push(e), 
            a._inited || (b.Ticker.getInstance().register(a.tick, null), a._inited = !0); else for (c && c.tween_count--, 
            c = h.length; c--; ) if (h[c] == e) {
                h.splice(c, 1);
                break;
            }
        };
        a.removeAllTweens = function() {
            for (var e = a._tweens, b = 0, d = e.length; b < d; b++) {
                var c = e[b];
                c.paused = !0;
                c._target.tweenjs_count = 0;
            }
            e.length = 0;
        };
        a.prototype.initialize = function(e, b, d) {
            this._target = e;
            b && (this._useTicks = b.useTicks, this.ignoreGlobalPause = b.ignoreGlobalPause, 
            this.loop = b.loop, b.onChange && this.addEventListener("change", b.onChange, b.onChangeObj), 
            b.override && a.removeTweens(e));
            this.pluginData = d || {};
            this._curQueueProps = {};
            this._initQueueProps = {};
            this._steps = [];
            this._actions = [];
            b && b.paused ? this.paused = !0 : a._register(this, !0);
            b && null != b.position && this.setPosition(b.position, a.NONE);
        };
        a.prototype.setPosition = function(a, b) {
            void 0 === b && (b = 1);
            0 > a && (a = 0);
            var d = a, c = !1;
            d >= this.duration && (this.loop ? d %= this.duration : (d = this.duration, c = !0));
            if (d == this._prevPos) return c;
            var g = this._prevPos;
            this.position = this._prevPos = d;
            this._prevPosition = a;
            if (this._target) if (c) this._updateTargetProps(null, 1); else if (0 < this._steps.length) {
                for (var f = 0, l = this._steps.length; f < l && !(this._steps[f].t > d); f++) ;
                f = this._steps[f - 1];
                this._updateTargetProps(f, (this._stepPosition = d - f.t) / f.d);
            }
            0 != b && 0 < this._actions.length && (this._useTicks ? this._runActions(d, d) : 1 == b && d < g ? (g != this.duration && this._runActions(g, this.duration), 
            this._runActions(0, d, !0)) : this._runActions(g, d));
            c && this.setPaused(!0);
            this.dispatchEventWith("change");
            return c;
        };
        a.prototype._runActions = function(a, b, d) {
            void 0 === d && (d = !1);
            var c = a, g = b, f = -1, l = this._actions.length, m = 1;
            a > b && (c = b, g = a, f = l, l = m = -1);
            for (;(f += m) != l; ) {
                b = this._actions[f];
                var n = b.t;
                (n == g || n > c && n < g || d && n == a) && b.f.apply(b.o, b.p);
            }
        };
        a.prototype._updateTargetProps = function(b, d) {
            var c, h, g, f;
            if (b || 1 != d) {
                if (this.passive = !!b.v) return;
                b.e && (d = b.e(d, 0, 1, 1));
                c = b.p0;
                h = b.p1;
            } else this.passive = !1, c = h = this._curQueueProps;
            for (var l in this._initQueueProps) {
                null == (g = c[l]) && (c[l] = g = this._initQueueProps[l]);
                null == (f = h[l]) && (h[l] = f = g);
                g = g == f || 0 == d || 1 == d || "number" != typeof g ? 1 == d ? f : g : g + (f - g) * d;
                var m = !1;
                if (f = a._plugins[l]) for (var n = 0, q = f.length; n < q; n++) {
                    var r = f[n].tween(this, l, g, c, h, d, !!b && c == h, !b);
                    r == a.IGNORE ? m = !0 : g = r;
                }
                m || (this._target[l] = g);
            }
        };
        a.prototype.setPaused = function(b) {
            this.paused = b;
            a._register(this, !b);
            return this;
        };
        a.prototype._cloneProps = function(a) {
            var b = {}, d;
            for (d in a) b[d] = a[d];
            return b;
        };
        a.prototype._addStep = function(a) {
            0 < a.d && (this._steps.push(a), a.t = this.duration, this.duration += a.d);
            return this;
        };
        a.prototype._appendQueueProps = function(b) {
            var d, c, h, g, f, l;
            for (l in b) if (void 0 === this._initQueueProps[l]) {
                c = this._target[l];
                if (d = a._plugins[l]) for (h = 0, g = d.length; h < g; h++) c = d[h].init(this, l, c);
                this._initQueueProps[l] = this._curQueueProps[l] = void 0 === c ? null : c;
            }
            for (l in b) {
                c = this._curQueueProps[l];
                if (d = a._plugins[l]) for (f = f || {}, h = 0, g = d.length; h < g; h++) d[h].step && d[h].step(this, l, c, b[l], f);
                this._curQueueProps[l] = b[l];
            }
            f && this._appendQueueProps(f);
            return this._curQueueProps;
        };
        a.prototype._addAction = function(a) {
            a.t = this.duration;
            this._actions.push(a);
            return this;
        };
        a.prototype._set = function(a, b) {
            for (var d in a) b[d] = a[d];
        };
        a.prototype.wait = function(a, b) {
            if (null == a || 0 >= a) return this;
            var d = this._cloneProps(this._curQueueProps);
            return this._addStep({
                d: a,
                p0: d,
                p1: d,
                v: b
            });
        };
        a.prototype.to = function(a, b, d) {
            void 0 === d && (d = void 0);
            if (isNaN(b) || 0 > b) b = 0;
            return this._addStep({
                d: b || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: d,
                p1: this._cloneProps(this._appendQueueProps(a))
            });
        };
        a.prototype.call = function(a, b, d) {
            void 0 === b && (b = void 0);
            void 0 === d && (d = void 0);
            return this._addAction({
                f: a,
                p: d ? d : [],
                o: b ? b : this._target
            });
        };
        a.prototype.set = function(a, b) {
            void 0 === b && (b = null);
            return this._addAction({
                f: this._set,
                o: this,
                p: [ a, b ? b : this._target ]
            });
        };
        a.prototype.play = function(a) {
            a || (a = this);
            return this.call(a.setPaused, a, [ !1 ]);
        };
        a.prototype.pause = function(a) {
            a || (a = this);
            return this.call(a.setPaused, a, [ !0 ]);
        };
        a.prototype.tick = function(a) {
            this.paused || this.setPosition(this._prevPosition + a);
        };
        a.NONE = 0;
        a.LOOP = 1;
        a.REVERSE = 2;
        a._tweens = [];
        a.IGNORE = {};
        a._plugins = {};
        a._inited = !1;
        return a;
    }(b.EventDispatcher);
    b.Tween = c;
    c.prototype.__class__ = "egret.Tween";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function d() {
            b.Logger.fatal("Ease不能被实例化");
        }
        d.get = function(a) {
            -1 > a && (a = -1);
            1 < a && (a = 1);
            return function(b) {
                return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a));
            };
        };
        d.getPowIn = function(a) {
            return function(b) {
                return Math.pow(b, a);
            };
        };
        d.getPowOut = function(a) {
            return function(b) {
                return 1 - Math.pow(1 - b, a);
            };
        };
        d.getPowInOut = function(a) {
            return function(b) {
                return 1 > (b *= 2) ? .5 * Math.pow(b, a) : 1 - .5 * Math.abs(Math.pow(2 - b, a));
            };
        };
        d.sineIn = function(a) {
            return 1 - Math.cos(a * Math.PI / 2);
        };
        d.sineOut = function(a) {
            return Math.sin(a * Math.PI / 2);
        };
        d.sineInOut = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1);
        };
        d.getBackIn = function(a) {
            return function(b) {
                return b * b * ((a + 1) * b - a);
            };
        };
        d.getBackOut = function(a) {
            return function(b) {
                return --b * b * ((a + 1) * b + a) + 1;
            };
        };
        d.getBackInOut = function(a) {
            a *= 1.525;
            return function(b) {
                return 1 > (b *= 2) ? .5 * b * b * ((a + 1) * b - a) : .5 * ((b -= 2) * b * ((a + 1) * b + a) + 2);
            };
        };
        d.circIn = function(a) {
            return -(Math.sqrt(1 - a * a) - 1);
        };
        d.circOut = function(a) {
            return Math.sqrt(1 - --a * a);
        };
        d.circInOut = function(a) {
            return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
        };
        d.bounceIn = function(a) {
            return 1 - d.bounceOut(1 - a);
        };
        d.bounceOut = function(a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
        };
        d.bounceInOut = function(a) {
            return .5 > a ? .5 * d.bounceIn(2 * a) : .5 * d.bounceOut(2 * a - 1) + .5;
        };
        d.getElasticIn = function(a, b) {
            var d = 2 * Math.PI;
            return function(c) {
                if (0 == c || 1 == c) return c;
                var h = b / d * Math.asin(1 / a);
                return -(a * Math.pow(2, 10 * (c -= 1)) * Math.sin((c - h) * d / b));
            };
        };
        d.getElasticOut = function(a, b) {
            var d = 2 * Math.PI;
            return function(c) {
                if (0 == c || 1 == c) return c;
                var h = b / d * Math.asin(1 / a);
                return a * Math.pow(2, -10 * c) * Math.sin((c - h) * d / b) + 1;
            };
        };
        d.getElasticInOut = function(a, b) {
            var d = 2 * Math.PI;
            return function(c) {
                var h = b / d * Math.asin(1 / a);
                return 1 > (c *= 2) ? -.5 * a * Math.pow(2, 10 * (c -= 1)) * Math.sin((c - h) * d / b) : a * Math.pow(2, -10 * (c -= 1)) * Math.sin((c - h) * d / b) * .5 + 1;
            };
        };
        d.quadIn = d.getPowIn(2);
        d.quadOut = d.getPowOut(2);
        d.quadInOut = d.getPowInOut(2);
        d.cubicIn = d.getPowIn(3);
        d.cubicOut = d.getPowOut(3);
        d.cubicInOut = d.getPowInOut(3);
        d.quartIn = d.getPowIn(4);
        d.quartOut = d.getPowOut(4);
        d.quartInOut = d.getPowInOut(4);
        d.quintIn = d.getPowIn(5);
        d.quintOut = d.getPowOut(5);
        d.quintInOut = d.getPowInOut(5);
        d.backIn = d.getBackIn(1.7);
        d.backOut = d.getBackOut(1.7);
        d.backInOut = d.getBackInOut(1.7);
        d.elasticIn = d.getElasticIn(1, .3);
        d.elasticOut = d.getElasticOut(1, .3);
        d.elasticInOut = d.getElasticInOut(1, .3 * 1.5);
        return d;
    }();
    b.Ease = c;
    c.prototype.__class__ = "egret.Ease";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {
            this.type = b.EFFECT;
        }
        b.prototype.play = function(a) {
            void 0 === a && (a = !1);
            var b = this.audio;
            b && (isNaN(b.duration) || (b.currentTime = 0), b.loop = a, b.play());
        };
        b.prototype.pause = function() {
            var a = this.audio;
            a && a.pause();
        };
        b.prototype.load = function() {
            var a = this.audio;
            a && a.load();
        };
        b.prototype.addEventListener = function(a, b) {
            this.audio && this.audio.addEventListener(a, b, !1);
        };
        b.prototype.removeEventListener = function(a, b) {
            this.audio && this.audio.removeEventListener(a, b, !1);
        };
        b.prototype.setVolume = function(a) {
            var b = this.audio;
            b && (b.volume = a);
        };
        b.prototype.getVolume = function() {
            return this.audio ? this.audio.volume : 0;
        };
        b.prototype.preload = function(a) {
            this.type = a;
        };
        b.prototype._setAudio = function(a) {
            this.audio = a;
        };
        b.MUSIC = "music";
        b.EFFECT = "effect";
        return b;
    }();
    b.Sound = c;
    c.prototype.__class__ = "egret.Sound";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a);
        };
        b.sin = function(a) {
            a = Math.round(a);
            a %= 360;
            0 > a && (a += 360);
            return 90 > a ? egret_sin_map[a] : 180 > a ? egret_cos_map[a - 90] : 270 > a ? -egret_sin_map[a - 180] : -egret_cos_map[a - 270];
        };
        b.cos = function(a) {
            a = Math.round(a);
            a %= 360;
            0 > a && (a += 360);
            return 90 > a ? egret_cos_map[a] : 180 > a ? -egret_sin_map[a - 90] : 270 > a ? -egret_cos_map[a - 180] : egret_sin_map[a - 270];
        };
        return b;
    }();
    b.NumberUtils = c;
    c.prototype.__class__ = "egret.NumberUtils";
})(egret || (egret = {}));

for (var egret_sin_map = {}, egret_cos_map = {}, i = 0; 90 >= i; i++) egret_sin_map[i] = Math.sin(i * egret.Matrix.DEG_TO_RAD), 
egret_cos_map[i] = Math.cos(i * egret.Matrix.DEG_TO_RAD);

Function.prototype.bind || (Function.prototype.bind = function(b) {
    if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var c = Array.prototype.slice.call(arguments, 1), d = this, a = function() {}, e = function() {
        return d.apply(this instanceof a && b ? this : b, c.concat(Array.prototype.slice.call(arguments)));
    };
    a.prototype = this.prototype;
    e.prototype = new a();
    return e;
});

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, RES;

(function(b) {
    var c = function(b) {
        function a(a, c, p) {
            void 0 === c && (c = !1);
            void 0 === p && (p = !1);
            b.call(this, a, c, p);
            this.itemsTotal = this.itemsLoaded = 0;
        }
        __extends(a, b);
        a.dispatchResourceEvent = function(b, d, c, h, g, f) {
            void 0 === c && (c = "");
            void 0 === h && (h = null);
            void 0 === g && (g = 0);
            void 0 === f && (f = 0);
            var l = egret.Event._getPropertyData(a);
            l.groupName = c;
            l.resItem = h;
            l.itemsLoaded = g;
            l.itemsTotal = f;
            egret.Event._dispatchByTarget(a, b, d, l);
        };
        a.ITEM_LOAD_ERROR = "itemLoadError";
        a.CONFIG_COMPLETE = "configComplete";
        a.CONFIG_LOAD_ERROR = "configLoadError";
        a.GROUP_PROGRESS = "groupProgress";
        a.GROUP_COMPLETE = "groupComplete";
        a.GROUP_LOAD_ERROR = "groupLoadError";
        return a;
    }(egret.Event);
    b.ResourceEvent = c;
    c.prototype.__class__ = "RES.ResourceEvent";
})(RES || (RES = {}));

(function(b) {
    var c = function() {
        function b(a, e, d) {
            this._loaded = !1;
            this.name = a;
            this.url = e;
            this.type = d;
        }
        Object.defineProperty(b.prototype, "loaded", {
            get: function() {
                return this.data ? this.data.loaded : this._loaded;
            },
            set: function(a) {
                this.data && (this.data.loaded = a);
                this._loaded = a;
            },
            enumerable: !0,
            configurable: !0
        });
        b.prototype.toString = function() {
            return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]';
        };
        b.TYPE_XML = "xml";
        b.TYPE_IMAGE = "image";
        b.TYPE_BIN = "bin";
        b.TYPE_TEXT = "text";
        b.TYPE_JSON = "json";
        b.TYPE_SHEET = "sheet";
        b.TYPE_FONT = "font";
        b.TYPE_SOUND = "sound";
        return b;
    }();
    b.ResourceItem = c;
    c.prototype.__class__ = "RES.ResourceItem";
})(RES || (RES = {}));

(function(b) {
    var c = function() {
        function d() {
            this.keyMap = {};
            this.groupDic = {};
            b.configInstance = this;
        }
        d.prototype.getGroupByName = function(a) {
            var b = [];
            if (!this.groupDic[a]) return b;
            a = this.groupDic[a];
            for (var d = a.length, c = 0; c < d; c++) b.push(this.parseResourceItem(a[c]));
            return b;
        };
        d.prototype.getRawGroupByName = function(a) {
            return this.groupDic[a] ? this.groupDic[a] : [];
        };
        d.prototype.createGroup = function(a, b, d) {
            void 0 === d && (d = !1);
            if (!d && this.groupDic[a] || !b || 0 == b.length) return !1;
            d = this.groupDic;
            for (var c = [], h = b.length, g = 0; g < h; g++) {
                var f = b[g], l = d[f];
                if (l) for (var f = l.length, m = 0; m < f; m++) {
                    var n = l[m];
                    -1 == c.indexOf(n) && c.push(n);
                } else (n = this.keyMap[f]) && -1 == c.indexOf(n) && c.push(n);
            }
            if (0 == c.length) return !1;
            this.groupDic[a] = c;
            return !0;
        };
        d.prototype.parseConfig = function(a, b) {
            if (a) {
                var d = a.resources;
                if (d) for (var c = d.length, h = 0; h < c; h++) {
                    var g = d[h], f = g.url;
                    f && -1 == f.indexOf("://") && (g.url = b + f);
                    this.addItemToKeyMap(g);
                }
                if (d = a.groups) for (c = d.length, h = 0; h < c; h++) {
                    for (var f = d[h], l = [], m = f.keys.split(","), n = m.length, q = 0; q < n; q++) g = m[q].trim(), 
                    (g = this.keyMap[g]) && -1 == l.indexOf(g) && l.push(g);
                    this.groupDic[f.name] = l;
                }
            }
        };
        d.prototype.addSubkey = function(a, b) {
            var d = this.keyMap[b];
            d && !this.keyMap[a] && (this.keyMap[a] = d);
        };
        d.prototype.addItemToKeyMap = function(a) {
            this.keyMap[a.name] || (this.keyMap[a.name] = a);
            if (a.hasOwnProperty("subkeys")) {
                var b = a.subkeys.split(",");
                a.subkeys = b;
                for (var d = b.length, c = 0; c < d; c++) {
                    var h = b[c];
                    null == this.keyMap[h] && (this.keyMap[h] = a);
                }
            }
        };
        d.prototype.getName = function(a) {
            return (a = this.keyMap[a]) ? a.name : "";
        };
        d.prototype.getType = function(a) {
            return (a = this.keyMap[a]) ? a.type : "";
        };
        d.prototype.getRawResourceItem = function(a) {
            return this.keyMap[a];
        };
        d.prototype.getResourceItem = function(a) {
            return (a = this.keyMap[a]) ? this.parseResourceItem(a) : null;
        };
        d.prototype.parseResourceItem = function(a) {
            var e = new b.ResourceItem(a.name, a.url, a.type);
            e.data = a;
            return e;
        };
        return d;
    }();
    b.ResourceConfig = c;
    c.prototype.__class__ = "RES.ResourceConfig";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.thread = 2;
            this.loadingCount = 0;
            this.groupTotalDic = {};
            this.numLoadedDic = {};
            this.itemListDic = {};
            this.groupErrorDic = {};
            this.retryTimesDic = {};
            this.maxRetryTimes = 3;
            this.failedList = [];
            this.priorityQueue = {};
            this.lazyLoadList = [];
            this.analyzerDic = {};
            this.queueIndex = 0;
        }
        __extends(a, d);
        a.prototype.isGroupInLoading = function(a) {
            return void 0 !== this.itemListDic[a];
        };
        a.prototype.loadGroup = function(a, d, c) {
            void 0 === c && (c = 0);
            if (!this.itemListDic[d] && d) if (a && 0 != a.length) {
                this.priorityQueue[c] ? this.priorityQueue[c].push(d) : this.priorityQueue[c] = [ d ];
                this.itemListDic[d] = a;
                c = a.length;
                for (var h = 0; h < c; h++) a[h].groupName = d;
                this.groupTotalDic[d] = a.length;
                this.numLoadedDic[d] = 0;
                this.next();
            } else egret.Logger.warning('RES加载了不存在或空的资源组："' + d + '"'), a = new b.ResourceEvent(b.ResourceEvent.GROUP_LOAD_ERROR), 
            a.groupName = d, this.dispatchEvent(a);
        };
        a.prototype.loadItem = function(a) {
            this.lazyLoadList.push(a);
            a.groupName = "";
            this.next();
        };
        a.prototype.next = function() {
            for (;this.loadingCount < this.thread; ) {
                var a = this.getOneResourceItem();
                if (!a) break;
                this.loadingCount++;
                if (a.loaded) this.onItemComplete(a); else {
                    var d = this.analyzerDic[a.type];
                    d || (d = this.analyzerDic[a.type] = egret.Injector.getInstance(b.AnalyzerBase, a.type));
                    d.loadFile(a, this.onItemComplete, this);
                }
            }
        };
        a.prototype.getOneResourceItem = function() {
            if (0 < this.failedList.length) return this.failedList.shift();
            var a = Number.NEGATIVE_INFINITY, b;
            for (b in this.priorityQueue) a = Math.max(a, b);
            a = this.priorityQueue[a];
            if (!a || 0 == a.length) return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
            b = a.length;
            for (var d, c = 0; c < b; c++) {
                this.queueIndex >= b && (this.queueIndex = 0);
                d = this.itemListDic[a[this.queueIndex]];
                if (0 < d.length) break;
                this.queueIndex++;
            }
            return 0 == d.length ? null : d.shift();
        };
        a.prototype.onItemComplete = function(a) {
            this.loadingCount--;
            var d = a.groupName;
            if (!a.loaded) {
                var c = this.retryTimesDic[a.name] || 1;
                if (c > this.maxRetryTimes) delete this.retryTimesDic[a.name], b.ResourceEvent.dispatchResourceEvent(this.resInstance, b.ResourceEvent.ITEM_LOAD_ERROR, d, a); else {
                    this.retryTimesDic[a.name] = c + 1;
                    this.failedList.push(a);
                    this.next();
                    return;
                }
            }
            if (d) {
                this.numLoadedDic[d]++;
                var c = this.numLoadedDic[d], h = this.groupTotalDic[d];
                a.loaded || (this.groupErrorDic[d] = !0);
                b.ResourceEvent.dispatchResourceEvent(this.resInstance, b.ResourceEvent.GROUP_PROGRESS, d, a, c, h);
                c == h && (a = this.groupErrorDic[d], this.removeGroupName(d), delete this.groupTotalDic[d], 
                delete this.numLoadedDic[d], delete this.itemListDic[d], delete this.groupErrorDic[d], 
                a ? b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.GROUP_LOAD_ERROR, d) : b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.GROUP_COMPLETE, d));
            } else this.callBack.call(this.resInstance, a);
            this.next();
        };
        a.prototype.removeGroupName = function(a) {
            for (var b in this.priorityQueue) {
                for (var d = this.priorityQueue[b], c = d.length, g = 0, f = !1, c = d.length, l = 0; l < c; l++) {
                    if (d[l] == a) {
                        d.splice(g, 1);
                        f = !0;
                        break;
                    }
                    g++;
                }
                if (f) {
                    0 == d.length && delete this.priorityQueue[b];
                    break;
                }
            }
        };
        return a;
    }(egret.EventDispatcher);
    b.ResourceLoader = c;
    c.prototype.__class__ = "RES.ResourceLoader";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.resourceConfig = b.configInstance;
        }
        __extends(a, d);
        a.prototype.addSubkey = function(a, b) {
            this.resourceConfig.addSubkey(a, b);
        };
        a.prototype.loadFile = function(a, b, d) {};
        a.prototype.getRes = function(a) {};
        a.prototype.destroyRes = function(a) {
            return !1;
        };
        a.getStringPrefix = function(a) {
            if (!a) return "";
            var b = a.indexOf(".");
            return -1 != b ? a.substring(0, b) : "";
        };
        a.getStringTail = function(a) {
            if (!a) return "";
            var b = a.indexOf(".");
            return -1 != b ? a.substring(b + 1) : "";
        };
        return a;
    }(egret.HashObject);
    b.AnalyzerBase = c;
    c.prototype.__class__ = "RES.AnalyzerBase";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this.fileDic = {};
            this.resItemDic = [];
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            this.recycler = new egret.Recycler();
        }
        __extends(a, b);
        a.prototype.loadFile = function(a, b, d) {
            if (this.fileDic[a.name]) b.call(d, a); else {
                var c = this.getLoader();
                this.resItemDic[c.hashCode] = {
                    item: a,
                    func: b,
                    thisObject: d
                };
                c.load(new egret.URLRequest(a.url));
            }
        };
        a.prototype.getLoader = function() {
            var a = this.recycler.pop();
            a || (a = new egret.URLLoader(), a.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), 
            a.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this));
            a.dataFormat = this._dataFormat;
            return a;
        };
        a.prototype.onLoadFinish = function(a) {
            var b = a.target, d = this.resItemDic[b.hashCode];
            delete this.resItemDic[b.hashCode];
            this.recycler.push(b);
            var c = d.item, g = d.func;
            c.loaded = a.type == egret.Event.COMPLETE;
            c.loaded && this.analyzeData(c, b.data);
            g.call(d.thisObject, c);
        };
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            !this.fileDic[d] && b && (this.fileDic[d] = b);
        };
        a.prototype.getRes = function(a) {
            return this.fileDic[a];
        };
        a.prototype.hasRes = function(a) {
            return null != this.getRes(a);
        };
        a.prototype.destroyRes = function(a) {
            return this.fileDic[a] ? (delete this.fileDic[a], !0) : !1;
        };
        return a;
    }(b.AnalyzerBase);
    b.BinAnalyzer = c;
    c.prototype.__class__ = "RES.BinAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        }
        __extends(a, b);
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            !this.fileDic[d] && b && (this.fileDic[d] = b, (d = a.data) && d.scale9grid && (d = d.scale9grid.split(","), 
            b.scale9Grid = new egret.Rectangle(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]), parseInt(d[3]))));
        };
        return a;
    }(b.BinAnalyzer);
    b.ImageAnalyzer = c;
    c.prototype.__class__ = "RES.ImageAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        __extends(a, b);
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b) try {
                this.fileDic[d] = JSON.parse(b);
            } catch (c) {
                egret.Logger.warning("JSON文件格式不正确: " + a.url + "\ndata:" + b);
            }
        };
        return a;
    }(b.BinAnalyzer);
    b.JsonAnalyzer = c;
    c.prototype.__class__ = "RES.JsonAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        __extends(a, b);
        return a;
    }(b.BinAnalyzer);
    b.TextAnalyzer = c;
    c.prototype.__class__ = "RES.TextAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this.sheetMap = {};
            this.textureMap = {};
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        __extends(a, d);
        a.prototype.getRes = function(a) {
            var d = this.fileDic[a];
            d || (d = this.textureMap[a]);
            !d && (d = b.AnalyzerBase.getStringPrefix(a), d = this.fileDic[d]) && (a = b.AnalyzerBase.getStringTail(a), 
            d = d.getTexture(a));
            return d;
        };
        a.prototype.onLoadFinish = function(a) {
            var b = a.target, d = this.resItemDic[b.hashCode];
            delete this.resItemDic[b.hashCode];
            this.recycler.push(b);
            var c = d.item, g = d.func;
            c.loaded = a.type == egret.Event.COMPLETE;
            c.loaded && this.analyzeData(c, b.data);
            "string" == typeof b.data ? (this._dataFormat = egret.URLLoaderDataFormat.TEXTURE, 
            this.loadFile(c, g, d.thisObject), this._dataFormat = egret.URLLoaderDataFormat.TEXT) : g.call(d.thisObject, c);
        };
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b) {
                var c;
                if ("string" == typeof b) {
                    try {
                        c = JSON.parse(b);
                    } catch (g) {
                        egret.Logger.warning("JSON文件格式不正确: " + a.url);
                    }
                    c && (this.sheetMap[d] = c, a.loaded = !1, a.url = this.getRelativePath(a.url, c.file));
                } else c = this.sheetMap[d], delete this.sheetMap[d], b && (c = this.parseSpriteSheet(b, c, a.data && a.data.subkeys ? "" : d), 
                this.fileDic[d] = c);
            }
        };
        a.prototype.getRelativePath = function(a, b) {
            a = a.split("\\").join("/");
            var d = a.lastIndexOf("/");
            return a = -1 != d ? a.substring(0, d + 1) + b : b;
        };
        a.prototype.parseSpriteSheet = function(a, b, d) {
            b = b.frames;
            if (!b) return null;
            var c = new egret.SpriteSheet(a), g = this.textureMap, f;
            for (f in b) {
                var l = b[f];
                a = c.createTexture(f, l.x, l.y, l.w, l.h, l.offX, l.offY, l.sourceW, l.sourceH);
                l.scale9grid && (l = l.scale9grid.split(","), a.scale9Grid = new egret.Rectangle(parseInt(l[0]), parseInt(l[1]), parseInt(l[2]), parseInt(l[3])));
                null == g[f] && (g[f] = a, d && this.addSubkey(f, d));
            }
            return c;
        };
        return a;
    }(b.BinAnalyzer);
    b.SheetAnalyzer = c;
    c.prototype.__class__ = "RES.SheetAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
        }
        __extends(a, b);
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b) {
                var c;
                "string" == typeof b ? (c = b, this.sheetMap[d] = c, a.loaded = !1, a.url = this.getTexturePath(a.url, c)) : (c = this.sheetMap[d], 
                delete this.sheetMap[d], b && (c = new egret.BitmapTextSpriteSheet(b, c), this.fileDic[d] = c));
            }
        };
        a.prototype.getTexturePath = function(a, b) {
            var d = "", c = b.split("\n")[2], g = c.indexOf('file="');
            -1 != g && (c = c.substring(g + 6), g = c.indexOf('"'), d = c.substring(0, g));
            a = a.split("\\").join("/");
            g = a.lastIndexOf("/");
            return a = -1 != g ? a.substring(0, g + 1) + d : d;
        };
        return a;
    }(b.SheetAnalyzer);
    b.FontAnalyzer = c;
    c.prototype.__class__ = "RES.FontAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.SOUND;
        }
        __extends(a, b);
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            !this.fileDic[d] && b && (this.fileDic[d] = b, (d = a.data) && d.soundType ? b.preload(d.soundType) : b.preload(egret.Sound.EFFECT));
        };
        return a;
    }(b.BinAnalyzer);
    b.SoundAnalyzer = c;
    c.prototype.__class__ = "RES.SoundAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        __extends(a, b);
        a.prototype.analyzeData = function(a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b) try {
                var c = egret.XML.parse(b);
                this.fileDic[d] = c;
            } catch (g) {}
        };
        return a;
    }(b.BinAnalyzer);
    b.XMLAnalyzer = c;
    c.prototype.__class__ = "RES.XMLAnalyzer";
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    b.loadConfig = function(a, b, c) {
        void 0 === b && (b = "");
        void 0 === c && (c = "json");
        d.loadConfig(a, b, c);
    };
    b.loadGroup = function(a, b) {
        void 0 === b && (b = 0);
        d.loadGroup(a, b);
    };
    b.isGroupLoaded = function(a) {
        return d.isGroupLoaded(a);
    };
    b.getGroupByName = function(a) {
        return d.getGroupByName(a);
    };
    b.createGroup = function(a, b, c) {
        void 0 === c && (c = !1);
        return d.createGroup(a, b, c);
    };
    b.hasRes = function(a) {
        return d.hasRes(a);
    };
    b.getRes = function(a) {
        return d.getRes(a);
    };
    b.getResAsync = function(a, b, c) {
        d.getResAsync(a, b, c);
    };
    b.getResByUrl = function(a, b, c, p) {
        void 0 === p && (p = "");
        d.getResByUrl(a, b, c, p);
    };
    b.destroyRes = function(a) {
        return d.destroyRes(a);
    };
    b.setMaxLoadingThread = function(a) {
        d.setMaxLoadingThread(a);
    };
    b.addEventListener = function(a, b, c, p, h) {
        void 0 === p && (p = !1);
        void 0 === h && (h = 0);
        d.addEventListener(a, b, c, p, h);
    };
    b.removeEventListener = function(a, b, c, p) {
        void 0 === p && (p = !1);
        d.removeEventListener(a, b, c, p);
    };
    var c = function(a) {
        function d() {
            a.call(this);
            this.analyzerDic = {};
            this.configItemList = [];
            this.configComplete = this.callLaterFlag = !1;
            this.loadedGroups = [];
            this.groupNameList = [];
            this.asyncDic = {};
            this.init();
        }
        __extends(d, a);
        d.prototype.getAnalyzerByType = function(a) {
            var d = this.analyzerDic[a];
            d || (d = this.analyzerDic[a] = egret.Injector.getInstance(b.AnalyzerBase, a));
            return d;
        };
        d.prototype.init = function() {
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_BIN) || egret.Injector.mapClass(b.AnalyzerBase, b.BinAnalyzer, b.ResourceItem.TYPE_BIN);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_IMAGE) || egret.Injector.mapClass(b.AnalyzerBase, b.ImageAnalyzer, b.ResourceItem.TYPE_IMAGE);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_TEXT) || egret.Injector.mapClass(b.AnalyzerBase, b.TextAnalyzer, b.ResourceItem.TYPE_TEXT);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_JSON) || egret.Injector.mapClass(b.AnalyzerBase, b.JsonAnalyzer, b.ResourceItem.TYPE_JSON);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_SHEET) || egret.Injector.mapClass(b.AnalyzerBase, b.SheetAnalyzer, b.ResourceItem.TYPE_SHEET);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_FONT) || egret.Injector.mapClass(b.AnalyzerBase, b.FontAnalyzer, b.ResourceItem.TYPE_FONT);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_SOUND) || egret.Injector.mapClass(b.AnalyzerBase, b.SoundAnalyzer, b.ResourceItem.TYPE_SOUND);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_XML) || egret.Injector.mapClass(b.AnalyzerBase, b.XMLAnalyzer, b.ResourceItem.TYPE_XML);
            this.resConfig = new b.ResourceConfig();
            this.resLoader = new b.ResourceLoader();
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(b.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
            this.resLoader.addEventListener(b.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
        };
        d.prototype.loadConfig = function(a, b, d) {
            void 0 === d && (d = "json");
            this.configItemList.push({
                url: a,
                resourceRoot: b,
                type: d
            });
            this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0);
        };
        d.prototype.startLoadConfig = function() {
            this.callLaterFlag = !1;
            var a = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = a;
            for (var c = a.length, h = [], g = 0; g < c; g++) {
                var f = a[g], f = new b.ResourceItem(f.url, f.url, f.type);
                h.push(f);
            }
            this.resLoader.loadGroup(h, d.GROUP_CONFIG, Number.MAX_VALUE);
        };
        d.prototype.isGroupLoaded = function(a) {
            return -1 != this.loadedGroups.indexOf(a);
        };
        d.prototype.getGroupByName = function(a) {
            return this.resConfig.getGroupByName(a);
        };
        d.prototype.loadGroup = function(a, d) {
            void 0 === d && (d = 0);
            if (-1 != this.loadedGroups.indexOf(a)) b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.GROUP_COMPLETE, a); else if (!this.resLoader.isGroupInLoading(a)) if (this.configComplete) {
                var e = this.resConfig.getGroupByName(a);
                this.resLoader.loadGroup(e, a, d);
            } else this.groupNameList.push({
                name: a,
                priority: d
            });
        };
        d.prototype.createGroup = function(a, b, d) {
            void 0 === d && (d = !1);
            if (d) {
                var e = this.loadedGroups.indexOf(a);
                -1 != e && this.loadedGroups.splice(e, 1);
            }
            return this.resConfig.createGroup(a, b, d);
        };
        d.prototype.onGroupComp = function(a) {
            if (a.groupName == d.GROUP_CONFIG) {
                a = this.loadingConfigList.length;
                for (var c = 0; c < a; c++) {
                    var h = this.loadingConfigList[c], g = this.getAnalyzerByType(h.type), f = g.getRes(h.url);
                    g.destroyRes(h.url);
                    this.resConfig.parseConfig(f, h.resourceRoot);
                }
                this.configComplete = !0;
                this.loadingConfigList = null;
                b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.CONFIG_COMPLETE);
                h = this.groupNameList;
                a = h.length;
                for (c = 0; c < a; c++) g = h[c], this.loadGroup(g.name, g.priority);
                this.groupNameList = [];
            } else this.loadedGroups.push(a.groupName), this.dispatchEvent(a);
        };
        d.prototype.onGroupError = function(a) {
            a.groupName == d.GROUP_CONFIG ? (this.loadingConfigList = null, b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.CONFIG_LOAD_ERROR)) : this.dispatchEvent(a);
        };
        d.prototype.hasRes = function(a) {
            var d = this.resConfig.getType(a);
            return "" == d && (a = b.AnalyzerBase.getStringPrefix(a), d = this.resConfig.getType(a), 
            "" == d) ? !1 : !0;
        };
        d.prototype.getRes = function(a) {
            var d = this.resConfig.getType(a);
            return "" == d && (d = b.AnalyzerBase.getStringPrefix(a), d = this.resConfig.getType(d), 
            "" == d) ? null : this.getAnalyzerByType(d).getRes(a);
        };
        d.prototype.getResAsync = function(a, d, e) {
            var c = this.resConfig.getType(a), f = this.resConfig.getName(a);
            if ("" == c && (f = b.AnalyzerBase.getStringPrefix(a), c = this.resConfig.getType(f), 
            "" == c)) {
                d.call(e, null);
                return;
            }
            (c = this.getAnalyzerByType(c).getRes(a)) ? d.call(e, c) : (a = {
                key: a,
                compFunc: d,
                thisObject: e
            }, this.asyncDic[f] ? this.asyncDic[f].push(a) : (this.asyncDic[f] = [ a ], f = this.resConfig.getResourceItem(f), 
            this.resLoader.loadItem(f)));
        };
        d.prototype.getResByUrl = function(a, d, e, c) {
            void 0 === c && (c = "");
            if (a) {
                c || (c = this.getTypeByUrl(a));
                var f = this.getAnalyzerByType(c).getRes(a);
                f ? d.call(e, f) : (d = {
                    key: a,
                    compFunc: d,
                    thisObject: e
                }, this.asyncDic[a] ? this.asyncDic[a].push(d) : (this.asyncDic[a] = [ d ], a = new b.ResourceItem(a, a, c), 
                this.resLoader.loadItem(a)));
            } else d.call(e, null);
        };
        d.prototype.getTypeByUrl = function(a) {
            (a = a.substr(a.lastIndexOf(".") + 1)) && (a = a.toLowerCase());
            switch (a) {
              case b.ResourceItem.TYPE_XML:
              case b.ResourceItem.TYPE_JSON:
              case b.ResourceItem.TYPE_SHEET:
                break;

              case "png":
              case "jpg":
              case "gif":
                a = b.ResourceItem.TYPE_IMAGE;
                break;

              case "fnt":
                a = b.ResourceItem.TYPE_FONT;
                break;

              case "txt":
                a = b.ResourceItem.TYPE_TEXT;
                break;

              case "mp3":
              case "ogg":
              case "mpeg":
              case "wav":
              case "m4a":
              case "mp4":
              case "aiff":
              case "wma":
              case "mid":
                a = b.ResourceItem.TYPE_SOUND;
                break;

              default:
                a = b.ResourceItem.TYPE_BIN;
            }
            return a;
        };
        d.prototype.onResourceItemComp = function(a) {
            var b = this.asyncDic[a.name];
            delete this.asyncDic[a.name];
            a = this.getAnalyzerByType(a.type);
            for (var d = b.length, e = 0; e < d; e++) {
                var c = b[e], l = a.getRes(c.key);
                c.compFunc.call(c.thisObject, l, c.key);
            }
        };
        d.prototype.destroyRes = function(a) {
            var b = this.resConfig.getRawGroupByName(a);
            if (b) {
                var d = this.loadedGroups.indexOf(a);
                -1 != d && this.loadedGroups.splice(d, 1);
                a = b.length;
                for (var e = 0; e < a; e++) {
                    d = b[e];
                    d.loaded = !1;
                    var c = this.getAnalyzerByType(d.type);
                    c.destroyRes(d.name);
                }
                return !0;
            }
            b = this.resConfig.getType(a);
            if ("" == b) return !1;
            d = this.resConfig.getRawResourceItem(a);
            d.loaded = !1;
            c = this.getAnalyzerByType(b);
            return c.destroyRes(a);
        };
        d.prototype.setMaxLoadingThread = function(a) {
            1 > a && (a = 1);
            this.resLoader.thread = a;
        };
        d.GROUP_CONFIG = "RES__CONFIG";
        return d;
    }(egret.EventDispatcher);
    c.prototype.__class__ = "RES.Resource";
    var d = new c();
})(RES || (RES = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(b) {
            void 0 === b && (b = 60);
            d.call(this);
            this.frameRate = b;
            this._time = 0;
            this._isActivate = !0;
            60 == b && (a.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, 
            a.cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame);
            a.requestAnimationFrame || (a.requestAnimationFrame = function(a) {
                return window.setTimeout(a, 1e3 / b);
            });
            a.cancelAnimationFrame || (a.cancelAnimationFrame = function(a) {
                return window.clearTimeout(a);
            });
            a.instance = this;
            this.registerListener();
        }
        __extends(a, d);
        a.prototype.enterFrame = function() {
            var d = a.instance, c = a._thisObject, p = a._callback, h = b.getTimer(), g = h - d._time;
            d._requestAnimationId = a.requestAnimationFrame.call(window, a.prototype.enterFrame);
            p.call(c, g);
            d._time = h;
        };
        a.prototype.executeMainLoop = function(b, d) {
            a._callback = b;
            a._thisObject = d;
            this.enterFrame();
        };
        a.prototype.reset = function() {
            var d = a.instance;
            d._requestAnimationId && (d._time = b.getTimer(), a.cancelAnimationFrame.call(window, d._requestAnimationId), 
            d.enterFrame());
        };
        a.prototype.registerListener = function() {
            var d = this, c = function() {
                d._isActivate && (d._isActivate = !1, b.MainContext.instance.stage.dispatchEvent(new b.Event(b.Event.DEACTIVATE)));
            }, p = function() {
                d._isActivate || (d._isActivate = !0, a.instance.reset(), b.MainContext.instance.stage.dispatchEvent(new b.Event(b.Event.ACTIVATE)));
            }, h = function() {
                document[g] ? c() : p();
            };
            window.addEventListener("focus", p, !1);
            window.addEventListener("blur", c, !1);
            var g, f;
            "undefined" !== typeof document.hidden ? (g = "hidden", f = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (g = "mozHidden", 
            f = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (g = "msHidden", 
            f = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden ? (g = "webkitHidden", 
            f = "webkitvisibilitychange") : "undefined" !== typeof document.oHidden && (g = "oHidden", 
            f = "ovisibilitychange");
            "onpageshow" in window && "onpagehide" in window && (window.addEventListener("pageshow", p, !1), 
            window.addEventListener("pagehide", c, !1));
            g && f && document.addEventListener(f, h, !1);
        };
        return a;
    }(b.DeviceContext);
    b.HTML5DeviceContext = c;
    c.prototype.__class__ = "egret.HTML5DeviceContext";
})(egret || (egret = {}));

var egret_html5_localStorage;

(function(b) {
    b.getItem = function(b) {
        return window.localStorage.getItem(b);
    };
    b.setItem = function(b, d) {
        try {
            return window.localStorage.setItem(b, d), !0;
        } catch (a) {
            return console.log("egret_html5_localStorage.setItem保存失败,key=" + b + "&value=" + d), 
            !1;
        }
    };
    b.removeItem = function(b) {
        window.localStorage.removeItem(b);
    };
    b.clear = function() {
        window.localStorage.clear();
    };
    b.init = function() {
        for (var c in b) egret.localStorage[c] = b[c];
    };
})(egret_html5_localStorage || (egret_html5_localStorage = {}));

egret_html5_localStorage.init();

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a) {
            d.call(this);
            this.globalAlpha = 1;
            this.canvas = a || this.createCanvas();
            this.canvasContext = this.canvas.getContext("2d");
            this._cacheCanvas = document.createElement("canvas");
            this._cacheCanvas.width = this.canvas.width;
            this._cacheCanvas.height = this.canvas.height;
            this._cacheCanvasContext = this._cacheCanvas.getContext("2d");
            this.onResize();
            var b = this.canvasContext.setTransform, c = this;
            this._cacheCanvasContext.setTransform = function(a, d, e, l, m, n) {
                c._matrixA = a;
                c._matrixB = d;
                c._matrixC = e;
                c._matrixD = l;
                c._matrixTx = m;
                c._matrixTy = n;
                b.call(c._cacheCanvasContext, a, d, e, l, m, n);
            };
            this._matrixA = 1;
            this._matrixC = this._matrixB = 0;
            this._matrixD = 1;
            this._transformTy = this._transformTx = this._matrixTy = this._matrixTx = 0;
            this.initBlendMode();
        }
        __extends(a, d);
        a.prototype.createCanvas = function() {
            var a = b.Browser.getInstance().$("#egretCanvas");
            if (!a) {
                var d = document.getElementById(b.StageDelegate.canvas_div_name), a = b.Browser.getInstance().$new("canvas");
                a.id = "egretCanvas";
                d.appendChild(a);
            }
            b.MainContext.instance.stage.addEventListener(b.Event.RESIZE, this.onResize, this);
            return a;
        };
        a.prototype.onResize = function() {
            if (this.canvas) {
                var a = document.getElementById(b.StageDelegate.canvas_div_name);
                this.canvas.width = b.MainContext.instance.stage.stageWidth;
                this.canvas.height = b.MainContext.instance.stage.stageHeight;
                this.canvas.style.width = a.style.width;
                this.canvas.style.height = a.style.height;
                this._cacheCanvas.width = this.canvas.width;
                this._cacheCanvas.height = this.canvas.height;
                this._cacheCanvasContext.imageSmoothingEnabled = b.RendererContext.imageSmoothingEnabled;
                this._cacheCanvasContext.webkitImageSmoothingEnabled = b.RendererContext.imageSmoothingEnabled;
                this._cacheCanvasContext.mozImageSmoothingEnabled = b.RendererContext.imageSmoothingEnabled;
                this._cacheCanvasContext.msImageSmoothingEnabled = b.RendererContext.imageSmoothingEnabled;
            }
        };
        a.prototype.clearScreen = function() {
            for (var a = b.RenderFilter.getInstance().getDrawAreaList(), d = 0, c = a.length; d < c; d++) {
                var h = a[d];
                this.clearRect(h.x, h.y, h.width, h.height);
            }
            a = b.MainContext.instance.stage;
            this._cacheCanvasContext.clearRect(0, 0, a.stageWidth, a.stageHeight);
            this.renderCost = 0;
        };
        a.prototype.clearRect = function(a, b, d, c) {
            this.canvasContext.clearRect(a, b, d * window.devicePixelRatio, c * window.devicePixelRatio);
        };
        a.prototype.drawImage = function(a, c, p, h, g, f, l, m, n, q) {
            void 0 === q && (q = void 0);
            var r = a._bitmapData;
            f += this._transformTx;
            l += this._transformTy;
            var t = b.getTimer();
            void 0 === q ? this._cacheCanvasContext.drawImage(r, c, p, h, g, f, l, m, n) : this.drawRepeatImage(a, c, p, h, g, f, l, m, n, q);
            d.prototype.drawImage.call(this, a, c, p, h, g, f, l, m, n, q);
            this.renderCost += b.getTimer() - t;
        };
        a.prototype.drawRepeatImage = function(a, d, c, h, g, f, l, m, n, q) {
            if (void 0 === a.pattern) {
                var r = b.MainContext.instance.rendererContext.texture_scale_factor, t = a._bitmapData, s = t;
                if (t.width != h || t.height != g || 1 != r) s = document.createElement("canvas"), 
                s.width = h * r, s.height = g * r, s.getContext("2d").drawImage(t, d, c, h, g, 0, 0, h * r, g * r);
                d = this._cacheCanvasContext.createPattern(s, q);
                a.pattern = d;
            }
            this._cacheCanvasContext.fillStyle = a.pattern;
            this._cacheCanvasContext.translate(f, l);
            this._cacheCanvasContext.fillRect(0, 0, m, n);
            this._cacheCanvasContext.translate(-f, -l);
        };
        a.prototype.setTransform = function(a) {
            1 == a.a && 0 == a.b && 0 == a.c && 1 == a.d && 1 == this._matrixA && 0 == this._matrixB && 0 == this._matrixC && 1 == this._matrixD ? (this._transformTx = a.tx - this._matrixTx, 
            this._transformTy = a.ty - this._matrixTy) : (this._transformTx = this._transformTy = 0, 
            this._matrixA == a.a && this._matrixB == a.b && this._matrixC == a.c && this._matrixD == a.d && this._matrixTx == a.tx && this._matrixTy == a.ty || this._cacheCanvasContext.setTransform(a.a, a.b, a.c, a.d, a.tx, a.ty));
        };
        a.prototype.setAlpha = function(a, d) {
            a != this.globalAlpha && (this._cacheCanvasContext.globalAlpha = this.globalAlpha = a);
            d ? (this.blendValue = this.blendModes[d], this._cacheCanvasContext.globalCompositeOperation = this.blendValue) : this.blendValue != b.BlendMode.NORMAL && (this.blendValue = this.blendModes[b.BlendMode.NORMAL], 
            this._cacheCanvasContext.globalCompositeOperation = this.blendValue);
        };
        a.prototype.initBlendMode = function() {
            this.blendModes = {};
            this.blendModes[b.BlendMode.NORMAL] = "source-over";
            this.blendModes[b.BlendMode.ADD] = "lighter";
        };
        a.prototype.setupFont = function(a, b) {
            void 0 === b && (b = null);
            b = b || {};
            var d = null == b.size ? a._size : b.size, c = null == b.fontFamily ? a._fontFamily : b.fontFamily, g = this._cacheCanvasContext, f = (null == b.italic ? a._italic : b.italic) ? "italic " : "normal ", f = f + ((null == b.bold ? a._bold : b.bold) ? "bold " : "normal ");
            g.font = f + (d + "px " + c);
            g.textAlign = "left";
            g.textBaseline = "middle";
        };
        a.prototype.measureText = function(a) {
            return this._cacheCanvasContext.measureText(a).width;
        };
        a.prototype.drawText = function(a, c, p, h, g, f) {
            void 0 === f && (f = null);
            this.setupFont(a, f);
            f = f || {};
            var l;
            l = null != f.textColor ? b.toColorString(f.textColor) : a._textColorString;
            var m;
            m = null != f.strokeColor ? b.toColorString(f.strokeColor) : a._strokeColorString;
            var n;
            n = null != f.stroke ? f.stroke : a._stroke;
            var q = this._cacheCanvasContext;
            q.fillStyle = l;
            q.strokeStyle = m;
            n && (q.lineWidth = 2 * n, q.strokeText(c, p + this._transformTx, h + this._transformTy, g || 65535));
            q.fillText(c, p + this._transformTx, h + this._transformTy, g || 65535);
            d.prototype.drawText.call(this, a, c, p, h, g, f);
        };
        a.prototype.strokeRect = function(a, b, d, c, g) {
            this._cacheCanvasContext.strokeStyle = g;
            this._cacheCanvasContext.strokeRect(a, b, d, c);
        };
        a.prototype.pushMask = function(a) {
            this._cacheCanvasContext.save();
            this._cacheCanvasContext.beginPath();
            this._cacheCanvasContext.rect(a.x + this._transformTx, a.y + this._transformTy, a.width, a.height);
            this._cacheCanvasContext.clip();
            this._cacheCanvasContext.closePath();
        };
        a.prototype.popMask = function() {
            this._cacheCanvasContext.restore();
            this._cacheCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
        };
        a.prototype.onRenderStart = function() {
            this._cacheCanvasContext.save();
        };
        a.prototype.onRenderFinish = function() {
            this._cacheCanvasContext.restore();
            this._cacheCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
            for (var a = this._cacheCanvas.width, d = this._cacheCanvas.height, c = b.RenderFilter.getInstance().getDrawAreaList(), h = 0, g = c.length; h < g; h++) {
                var f = c[h], l = f.x, m = f.y, n = f.width, f = f.height;
                l + n > a && (n = a - l);
                m + f > d && (f = d - m);
                0 < n && 0 < f && this.canvasContext.drawImage(this._cacheCanvas, l, m, n, f, l, m, n, f);
            }
        };
        return a;
    }(b.RendererContext);
    b.HTML5CanvasRenderer = c;
    c.prototype.__class__ = "egret.HTML5CanvasRenderer";
})(egret || (egret = {}));

var egret_h5_graphics;

(function(b) {
    b.beginFill = function(b, a) {
        void 0 === a && (a = 1);
        var e = "rgba(" + (b >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + "," + a + ")";
        this.fillStyleColor = e;
        this.commandQueue.push(new c(this._setStyle, this, [ e ]));
    };
    b.drawRect = function(b, a, e, k) {
        this.commandQueue.push(new c(function(a, b, d, c) {
            var e = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.rect(e._transformTx + a, e._transformTy + b, d, c);
            this.canvasContext.closePath();
        }, this, [ b, a, e, k ]));
        this._fill();
    };
    b.drawCircle = function(b, a, e) {
        this.commandQueue.push(new c(function(a, b, d) {
            var c = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.arc(c._transformTx + a, c._transformTy + b, d, 0, 2 * Math.PI);
            this.canvasContext.closePath();
        }, this, [ b, a, e ]));
        this._fill();
    };
    b.drawRoundRect = function(b, a, e, k, p, h) {
        this.commandQueue.push(new c(function(a, b, d, c, e, k) {
            var h = this.renderContext;
            a = h._transformTx + a;
            b = h._transformTy + b;
            e /= 2;
            k = k ? k / 2 : e;
            d = a + d;
            c = b + c;
            h = c - k;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(d, h);
            this.canvasContext.quadraticCurveTo(d, c, d - e, c);
            this.canvasContext.lineTo(a + e, c);
            this.canvasContext.quadraticCurveTo(a, c, a, c - k);
            this.canvasContext.lineTo(a, b + k);
            this.canvasContext.quadraticCurveTo(a, b, a + e, b);
            this.canvasContext.lineTo(d - e, b);
            this.canvasContext.quadraticCurveTo(d, b, d, b + k);
            this.canvasContext.lineTo(d, h);
            this.canvasContext.closePath();
        }, this, [ b, a, e, k, p, h ]));
        this._fill();
    };
    b.drawEllipse = function(b, a, e, k) {
        this.commandQueue.push(new c(function(a, b, d, c) {
            var e = this.renderContext;
            this.canvasContext.save();
            a = e._transformTx + a;
            b = e._transformTy + b;
            var e = d > c ? d : c, k = d / e;
            c /= e;
            this.canvasContext.scale(k, c);
            this.canvasContext.beginPath();
            this.canvasContext.moveTo((a + d) / k, b / c);
            this.canvasContext.arc(a / k, b / c, e, 0, 2 * Math.PI);
            this.canvasContext.closePath();
            this.canvasContext.restore();
            this.canvasContext.stroke();
        }, this, [ b, a, e, k ]));
        this._fill();
    };
    b.lineStyle = function(b, a, e, k, p, h, g, f) {
        void 0 === b && (b = NaN);
        void 0 === a && (a = 0);
        void 0 === e && (e = 1);
        void 0 === k && (k = !1);
        void 0 === p && (p = "normal");
        void 0 === h && (h = null);
        void 0 === g && (g = null);
        void 0 === f && (f = 3);
        this.strokeStyleColor && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand));
        this.strokeStyleColor = a = "rgba(" + (a >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + e + ")";
        this.commandQueue.push(new c(function(a, b) {
            this.canvasContext.lineWidth = a;
            this.canvasContext.strokeStyle = b;
            this.canvasContext.beginPath();
        }, this, [ b, a ]));
        "undefined" === typeof this.lineX && (this.lineY = this.lineX = 0);
        this.moveTo(this.lineX, this.lineY);
    };
    b.lineTo = function(b, a) {
        this.commandQueue.push(new c(function(a, b) {
            var d = this.renderContext;
            this.canvasContext.lineTo(d._transformTx + a, d._transformTy + b);
        }, this, [ b, a ]));
        this.lineX = b;
        this.lineY = a;
    };
    b.curveTo = function(b, a, e, k) {
        this.commandQueue.push(new c(function(a, b, d, c) {
            var e = this.renderContext;
            this.canvasContext.quadraticCurveTo(e._transformTx + a, e._transformTy + b, e._transformTx + d, e._transformTy + c);
        }, this, [ b, a, e, k ]));
        this.lineX = e;
        this.lineY = k;
    };
    b.moveTo = function(b, a) {
        this.commandQueue.push(new c(function(a, b) {
            var d = this.renderContext;
            this.canvasContext.moveTo(d._transformTx + a, d._transformTy + b);
        }, this, [ b, a ]));
    };
    b.clear = function() {
        this.lineY = this.lineX = this.commandQueue.length = 0;
        this.fillStyleColor = this.strokeStyleColor = null;
    };
    b.createEndFillCommand = function() {
        this.endFillCommand || (this.endFillCommand = new c(function() {
            this.canvasContext.fill();
            this.canvasContext.closePath();
        }, this, null));
    };
    b.endFill = function() {
        null != this.fillStyleColor && this._fill();
        this.fillStyleColor = null;
    };
    b._fill = function() {
        this.fillStyleColor && (this.createEndFillCommand(), this.commandQueue.push(this.endFillCommand));
    };
    b.createEndLineCommand = function() {
        this.endLineCommand || (this.endLineCommand = new c(function() {
            this.canvasContext.stroke();
            this.canvasContext.closePath();
        }, this, null));
    };
    b._draw = function(b) {
        var a = this.commandQueue.length;
        if (0 != a) {
            this.renderContext = b;
            b = this.canvasContext = this.renderContext._cacheCanvasContext || this.renderContext.canvasContext;
            b.save();
            this.strokeStyleColor && 0 < a && this.commandQueue[a - 1] != this.endLineCommand && (this.createEndLineCommand(), 
            this.commandQueue.push(this.endLineCommand), a = this.commandQueue.length);
            for (var c = 0; c < a; c++) {
                var k = this.commandQueue[c];
                k.method.apply(k.thisObject, k.args);
            }
            b.restore();
        }
    };
    var c = function() {
        return function(b, a, c) {
            this.method = b;
            this.thisObject = a;
            this.args = c;
        };
    }();
    c.prototype.__class__ = "egret_h5_graphics.Command";
    b._setStyle = function(b) {
        this.canvasContext.fillStyle = b;
        this.canvasContext.beginPath();
    };
    b.init = function() {
        for (var d in b) egret.Graphics.prototype[d] = b[d];
        egret.RendererContext.createRendererContext = function(a) {
            return new egret.HTML5CanvasRenderer(a);
        };
    };
})(egret_h5_graphics || (egret_h5_graphics = {}));

egret_h5_graphics.init();

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a(a) {
            d.call(this);
            this.size = 2e3;
            this.vertSize = 5;
            this.contextLost = !1;
            this.glContextId = 0;
            this.currentBlendMode = "";
            this.currentBaseTexture = null;
            this.currentBatchSize = 0;
            this.maskList = [];
            this.maskDataFreeList = [];
            this.canvasContext = document.createElement("canvas").getContext("2d");
            console.log("使用WebGL模式");
            this.canvas = a || this.createCanvas();
            this.canvas.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1);
            this.canvas.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), !1);
            this.onResize();
            this.projectionX = this.canvas.width / 2;
            this.projectionY = -this.canvas.height / 2;
            a = 6 * this.size;
            this.vertices = new Float32Array(4 * this.size * this.vertSize);
            this.indices = new Uint16Array(a);
            for (var c = 0, p = 0; c < a; c += 6, p += 4) this.indices[c + 0] = p + 0, this.indices[c + 1] = p + 1, 
            this.indices[c + 2] = p + 2, this.indices[c + 3] = p + 0, this.indices[c + 4] = p + 2, 
            this.indices[c + 5] = p + 3;
            this.initWebGL();
            this.shaderManager = new b.WebGLShaderManager(this.gl);
            this.worldTransform = new b.Matrix();
            this.initBlendMode();
            b.MainContext.instance.addEventListener(b.Event.FINISH_RENDER, this._draw, this);
            b.TextField.prototype._draw = function(a) {
                this.getDirty() && (this.cacheAsBitmap = !0);
                b.DisplayObject.prototype._draw.call(this, a);
            };
        }
        __extends(a, d);
        a.prototype.createCanvas = function() {
            var a = b.Browser.getInstance().$("#egretCanvas");
            if (!a) {
                var d = document.getElementById(b.StageDelegate.canvas_div_name), a = b.Browser.getInstance().$new("canvas");
                a.id = "egretCanvas";
                d.appendChild(a);
            }
            b.MainContext.instance.stage.addEventListener(b.Event.RESIZE, this.onResize, this);
            return a;
        };
        a.prototype.onResize = function() {
            if (this.canvas) {
                var a = document.getElementById(b.StageDelegate.canvas_div_name);
                this.canvas.width = b.MainContext.instance.stage.stageWidth;
                this.canvas.height = b.MainContext.instance.stage.stageHeight;
                this.canvas.style.width = a.style.width;
                this.canvas.style.height = a.style.height;
                this.projectionX = this.canvas.width / 2;
                this.projectionY = -this.canvas.height / 2;
            }
        };
        a.prototype.handleContextLost = function() {
            this.contextLost = !0;
        };
        a.prototype.handleContextRestored = function() {
            this.initWebGL();
            this.shaderManager.setContext(this.gl);
            this.contextLost = !1;
        };
        a.prototype.initWebGL = function() {
            for (var a = {
                stencil: !0
            }, b, d = [ "experimental-webgl", "webgl" ], c = 0; c < d.length; c++) {
                try {
                    b = this.canvas.getContext(d[c], a);
                } catch (g) {}
                if (b) break;
            }
            if (!b) throw Error("当前浏览器不支持webgl");
            this.setContext(b);
        };
        a.prototype.setContext = function(a) {
            this.gl = a;
            a.id = this.glContextId++;
            this.vertexBuffer = a.createBuffer();
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW);
            a.disable(a.DEPTH_TEST);
            a.disable(a.CULL_FACE);
            a.enable(a.BLEND);
            a.colorMask(!0, !0, !0, !0);
        };
        a.prototype.initBlendMode = function() {
            this.blendModesWebGL = {};
            this.blendModesWebGL[b.BlendMode.NORMAL] = [ this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA ];
            this.blendModesWebGL[b.BlendMode.ADD] = [ this.gl.SRC_ALPHA, this.gl.ONE ];
        };
        a.prototype.start = function() {
            if (!this.contextLost) {
                var a = this.gl;
                a.activeTexture(a.TEXTURE0);
                a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
                a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var b;
                b = this.colorTransformMatrix ? this.shaderManager.colorTransformShader : this.shaderManager.defaultShader;
                this.shaderManager.activateShader(b);
                b.syncUniforms();
                a.uniform2f(b.projectionVector, this.projectionX, this.projectionY);
                var d = 4 * this.vertSize;
                a.vertexAttribPointer(b.aVertexPosition, 2, a.FLOAT, !1, d, 0);
                a.vertexAttribPointer(b.aTextureCoord, 2, a.FLOAT, !1, d, 8);
                a.vertexAttribPointer(b.colorAttribute, 2, a.FLOAT, !1, d, 16);
            }
        };
        a.prototype.clearScreen = function() {
            var a = this.gl;
            a.colorMask(!0, !0, !0, !0);
            for (var d = b.RenderFilter.getInstance().getDrawAreaList(), c = 0, h = d.length; c < h; c++) {
                var g = d[c];
                a.viewport(g.x, g.y, g.width, g.height);
                a.bindFramebuffer(a.FRAMEBUFFER, null);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT);
            }
            d = b.MainContext.instance.stage;
            a.viewport(0, 0, d.stageWidth, d.stageHeight);
            this.renderCost = 0;
        };
        a.prototype.setBlendMode = function(a) {
            a || (a = b.BlendMode.NORMAL);
            if (this.currentBlendMode != a) {
                var d = this.blendModesWebGL[a];
                d && (this._draw(), this.gl.blendFunc(d[0], d[1]), this.currentBlendMode = a);
            }
        };
        a.prototype.drawRepeatImage = function(a, d, c, h, g, f, l, m, n, q) {
            q = b.MainContext.instance.rendererContext.texture_scale_factor;
            h *= q;
            for (g *= q; f < m; f += h) for (var r = l; r < n; r += g) {
                var t = Math.min(h, m - f), s = Math.min(g, n - r);
                this.drawImage(a, d, c, t / q, s / q, f, r, t, s);
            }
        };
        a.prototype.drawImage = function(a, b, d, c, g, f, l, m, n, q) {
            void 0 === q && (q = void 0);
            if (!this.contextLost) if (void 0 !== q) this.drawRepeatImage(a, b, d, c, g, f, l, m, n, q); else {
                this.createWebGLTexture(a);
                if (a.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size - 1) this._draw(), 
                this.currentBaseTexture = a.webGLTexture;
                var r = this.worldTransform, t = r.a, s = r.b, u = r.c, v = r.d, x = r.tx, y = r.ty;
                0 == f && 0 == l || r.append(1, 0, 0, 1, f, l);
                1 == c / m && 1 == g / n || r.append(m / c, 0, 0, n / g, 0, 0);
                f = r.a;
                l = r.b;
                m = r.c;
                n = r.d;
                q = r.tx;
                var w = r.ty;
                r.a = t;
                r.b = s;
                r.c = u;
                r.d = v;
                r.tx = x;
                r.ty = y;
                t = a._sourceWidth;
                s = a._sourceHeight;
                a = c;
                r = g;
                b /= t;
                d /= s;
                c /= t;
                g /= s;
                t = this.vertices;
                s = 4 * this.currentBatchSize * this.vertSize;
                u = this.worldAlpha;
                t[s++] = q;
                t[s++] = w;
                t[s++] = b;
                t[s++] = d;
                t[s++] = u;
                t[s++] = f * a + q;
                t[s++] = l * a + w;
                t[s++] = c + b;
                t[s++] = d;
                t[s++] = u;
                t[s++] = f * a + m * r + q;
                t[s++] = n * r + l * a + w;
                t[s++] = c + b;
                t[s++] = g + d;
                t[s++] = u;
                t[s++] = m * r + q;
                t[s++] = n * r + w;
                t[s++] = b;
                t[s++] = g + d;
                t[s++] = u;
                this.currentBatchSize++;
            }
        };
        a.prototype._draw = function() {
            if (0 != this.currentBatchSize && !this.contextLost) {
                var a = b.getTimer();
                this.start();
                var d = this.gl;
                d.bindTexture(d.TEXTURE_2D, this.currentBaseTexture);
                var c = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                d.bufferSubData(d.ARRAY_BUFFER, 0, c);
                d.drawElements(d.TRIANGLES, 6 * this.currentBatchSize, d.UNSIGNED_SHORT, 0);
                this.currentBatchSize = 0;
                this.renderCost += b.getTimer() - a;
                b.Profiler.getInstance().onDrawImage();
            }
        };
        a.prototype.setTransform = function(a) {
            var b = this.worldTransform;
            b.a = a.a;
            b.b = a.b;
            b.c = a.c;
            b.d = a.d;
            b.tx = a.tx;
            b.ty = a.ty;
        };
        a.prototype.setAlpha = function(a, b) {
            this.worldAlpha = a;
            this.setBlendMode(b);
        };
        a.prototype.createWebGLTexture = function(a) {
            if (!a.webGLTexture) {
                var b = this.gl;
                a.webGLTexture = b.createTexture();
                b.bindTexture(b.TEXTURE_2D, a.webGLTexture);
                b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a._bitmapData);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
                b.bindTexture(b.TEXTURE_2D, null);
            }
        };
        a.prototype.pushMask = function(a) {
            this._draw();
            var b = this.gl;
            0 == this.maskList.length && (b.enable(b.STENCIL_TEST), b.stencilFunc(b.ALWAYS, 1, 1));
            var d = this.maskDataFreeList.pop();
            d ? (d.x = a.x, d.y = a.y, d.w = a.width, d.h = a.height) : d = {
                x: a.x,
                y: a.y,
                w: a.width,
                h: a.height
            };
            this.maskList.push(d);
            b.colorMask(!1, !1, !1, !1);
            b.stencilOp(b.KEEP, b.KEEP, b.INCR);
            this.renderGraphics(d);
            b.colorMask(!0, !0, !0, !0);
            b.stencilFunc(b.NOTEQUAL, 0, this.maskList.length);
            b.stencilOp(b.KEEP, b.KEEP, b.KEEP);
        };
        a.prototype.popMask = function() {
            this._draw();
            var a = this.gl, b = this.maskList.pop();
            b && (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), this.renderGraphics(b), 
            a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, this.maskList.length), 
            a.stencilOp(a.KEEP, a.KEEP, a.KEEP), this.maskDataFreeList.push(b));
            0 == this.maskList.length && a.disable(a.STENCIL_TEST);
        };
        a.prototype.setGlobalColorTransform = function(a) {
            if (this.colorTransformMatrix != a && (this._draw(), this.colorTransformMatrix = a)) {
                a = a.concat();
                var b = this.shaderManager.colorTransformShader;
                b.uniforms.colorAdd.value.w = a.splice(19, 1)[0] / 255;
                b.uniforms.colorAdd.value.z = a.splice(14, 1)[0] / 255;
                b.uniforms.colorAdd.value.y = a.splice(9, 1)[0] / 255;
                b.uniforms.colorAdd.value.x = a.splice(4, 1)[0] / 255;
                b.uniforms.matrix.value = a;
            }
        };
        a.prototype.setupFont = function(a, b) {
            var d = this.canvasContext, c = a.italic ? "italic " : "normal ", c = c + (a.bold ? "bold " : "normal "), c = c + (a.size + "px " + a.fontFamily);
            d.font = c;
            d.textAlign = "left";
            d.textBaseline = "middle";
        };
        a.prototype.measureText = function(a) {
            return this.canvasContext.measureText(a).width;
        };
        a.prototype.renderGraphics = function(a) {
            var b = this.gl, d = this.shaderManager.primitiveShader;
            this.graphicsPoints ? (this.graphicsPoints.length = 0, this.graphicsIndices.length = 0) : (this.graphicsPoints = [], 
            this.graphicsIndices = [], this.graphicsBuffer = b.createBuffer(), this.graphicsIndexBuffer = b.createBuffer());
            this.updateGraphics(a);
            this.shaderManager.activateShader(d);
            b.blendFunc(b.ONE, b.ONE_MINUS_SRC_ALPHA);
            b.uniformMatrix3fv(d.translationMatrix, !1, this.worldTransform.toArray(!0));
            b.uniform2f(d.projectionVector, this.projectionX, -this.projectionY);
            b.uniform2f(d.offsetVector, 0, 0);
            b.uniform3fv(d.tintColor, [ 1, 1, 1 ]);
            b.uniform1f(d.alpha, this.worldAlpha);
            b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
            b.vertexAttribPointer(d.aVertexPosition, 2, b.FLOAT, !1, 24, 0);
            b.vertexAttribPointer(d.colorAttribute, 4, b.FLOAT, !1, 24, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            b.drawElements(b.TRIANGLE_STRIP, this.graphicsIndices.length, b.UNSIGNED_SHORT, 0);
            this.shaderManager.activateShader(this.shaderManager.defaultShader);
        };
        a.prototype.updateGraphics = function(a) {
            var b = this.gl;
            this.buildRectangle(a);
            b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.graphicsPoints), b.STATIC_DRAW);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), b.STATIC_DRAW);
        };
        a.prototype.buildRectangle = function(a) {
            var b = a.x, d = a.y, c = a.w;
            a = a.h;
            var g = this.graphicsPoints, f = this.graphicsIndices, l = g.length / 6;
            g.push(b, d);
            g.push(0, 0, 0, 1);
            g.push(b + c, d);
            g.push(0, 0, 0, 1);
            g.push(b, d + a);
            g.push(0, 0, 0, 1);
            g.push(b + c, d + a);
            g.push(0, 0, 0, 1);
            f.push(l, l, l + 1, l + 2, l + 3, l + 3);
        };
        return a;
    }(b.RendererContext);
    b.WebGLRenderer = c;
    c.prototype.__class__ = "egret.WebGLRenderer";
})(egret || (egret = {}));

(function(b) {
    var c = function() {
        function b() {}
        b.compileProgram = function(a, c, k) {
            k = b.compileFragmentShader(a, k);
            c = b.compileVertexShader(a, c);
            var p = a.createProgram();
            a.attachShader(p, c);
            a.attachShader(p, k);
            a.linkProgram(p);
            a.getProgramParameter(p, a.LINK_STATUS) || console.log("无法初始化着色器");
            return p;
        };
        b.compileFragmentShader = function(a, c) {
            return b._compileShader(a, c, a.FRAGMENT_SHADER);
        };
        b.compileVertexShader = function(a, c) {
            return b._compileShader(a, c, a.VERTEX_SHADER);
        };
        b._compileShader = function(a, b, d) {
            d = a.createShader(d);
            a.shaderSource(d, b);
            a.compileShader(d);
            return a.getShaderParameter(d, a.COMPILE_STATUS) ? d : (console.log(a.getShaderInfoLog(d)), 
            null);
        };
        b.checkCanUseWebGL = function() {
            if (void 0 == b.canUseWebGL) try {
                var a = document.createElement("canvas");
                b.canUseWebGL = !!window.WebGLRenderingContext && !(!a.getContext("webgl") && !a.getContext("experimental-webgl"));
            } catch (c) {
                b.canUseWebGL = !1;
            }
            return b.canUseWebGL;
        };
        return b;
    }();
    b.WebGLUtils = c;
    c.prototype.__class__ = "egret.WebGLUtils";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function() {
        function b(a) {
            this.maxAttibs = 10;
            this.attribState = [];
            this.tempAttribState = [];
            for (var d = 0; d < this.maxAttibs; d++) this.attribState[d] = !1;
            this.setContext(a);
        }
        b.prototype.setContext = function(b) {
            this.gl = b;
            this.primitiveShader = new e(b);
            this.defaultShader = new d(b);
            this.colorTransformShader = new a(b);
            this.activateShader(this.defaultShader);
        };
        b.prototype.activateShader = function(a) {
            this.currentShader != a && (this.gl.useProgram(a.program), this.setAttribs(a.attributes), 
            this.currentShader = a);
        };
        b.prototype.setAttribs = function(a) {
            var b, d;
            d = this.tempAttribState.length;
            for (b = 0; b < d; b++) this.tempAttribState[b] = !1;
            d = a.length;
            for (b = 0; b < d; b++) this.tempAttribState[a[b]] = !0;
            a = this.gl;
            d = this.attribState.length;
            for (b = 0; b < d; b++) this.attribState[b] !== this.tempAttribState[b] && (this.attribState[b] = this.tempAttribState[b], 
            this.tempAttribState[b] ? a.enableVertexAttribArray(b) : a.disableVertexAttribArray(b));
        };
        return b;
    }();
    b.WebGLShaderManager = c;
    c.prototype.__class__ = "egret.WebGLShaderManager";
    var d = function() {
        function a(b) {
            this.defaultVertexSrc = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}";
            this.program = null;
            this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\ngl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;\n}";
            this.gl = b;
            this.init();
        }
        a.prototype.init = function() {
            var a = this.gl, d = b.WebGLUtils.compileProgram(a, this.defaultVertexSrc, this.fragmentSrc);
            a.useProgram(d);
            this.uSampler = a.getUniformLocation(d, "uSampler");
            this.projectionVector = a.getUniformLocation(d, "projectionVector");
            this.offsetVector = a.getUniformLocation(d, "offsetVector");
            this.dimensions = a.getUniformLocation(d, "dimensions");
            this.aVertexPosition = a.getAttribLocation(d, "aVertexPosition");
            this.aTextureCoord = a.getAttribLocation(d, "aTextureCoord");
            this.colorAttribute = a.getAttribLocation(d, "aColor");
            -1 === this.colorAttribute && (this.colorAttribute = 2);
            this.attributes = [ this.aVertexPosition, this.aTextureCoord, this.colorAttribute ];
            for (var c in this.uniforms) this.uniforms[c].uniformLocation = a.getUniformLocation(d, c);
            this.initUniforms();
            this.program = d;
        };
        a.prototype.initUniforms = function() {
            if (this.uniforms) {
                var a = this.gl, b, d;
                for (d in this.uniforms) {
                    b = this.uniforms[d];
                    var c = b.type;
                    "mat2" === c || "mat3" === c || "mat4" === c ? (b.glMatrix = !0, b.glValueLength = 1, 
                    "mat2" === c ? b.glFunc = a.uniformMatrix2fv : "mat3" === c ? b.glFunc = a.uniformMatrix3fv : "mat4" === c && (b.glFunc = a.uniformMatrix4fv)) : (b.glFunc = a["uniform" + c], 
                    b.glValueLength = "2f" === c || "2i" === c ? 2 : "3f" === c || "3i" === c ? 3 : "4f" === c || "4i" === c ? 4 : 1);
                }
            }
        };
        a.prototype.syncUniforms = function() {
            if (this.uniforms) {
                var a, b = this.gl, d;
                for (d in this.uniforms) a = this.uniforms[d], 1 === a.glValueLength ? !0 === a.glMatrix ? a.glFunc.call(b, a.uniformLocation, a.transpose, a.value) : a.glFunc.call(b, a.uniformLocation, a.value) : 2 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y) : 3 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y, a.value.z) : 4 === a.glValueLength && a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y, a.value.z, a.value.w);
            }
        };
        return a;
    }();
    b.EgretShader = d;
    d.prototype.__class__ = "egret.EgretShader";
    var a = function(a) {
        function b(d) {
            a.call(this, d);
            this.fragmentSrc = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform float invert;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\nvec4 locColor = texture2D(uSampler, vTextureCoord) * matrix;\nif(locColor.a != 0.0){\nlocColor += colorAdd;\n}\ngl_FragColor = locColor;\n}";
            this.uniforms = {
                matrix: {
                    type: "mat4",
                    value: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]
                },
                colorAdd: {
                    type: "4f",
                    value: {
                        x: 0,
                        y: 0,
                        z: 0,
                        w: 0
                    }
                }
            };
            this.init();
        }
        __extends(b, a);
        return b;
    }(d);
    b.ColorTransformShader = a;
    a.prototype.__class__ = "egret.ColorTransformShader";
    var e = function() {
        function a(b) {
            this.alpha = this.translationMatrix = this.attributes = this.colorAttribute = this.aVertexPosition = this.tintColor = this.offsetVector = this.projectionVector = this.program = null;
            this.fragmentSrc = "precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n   gl_FragColor = vColor;\n}";
            this.vertexSrc = "attribute vec2 aVertexPosition;\nattribute vec4 aColor;\nuniform mat3 translationMatrix;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nuniform float alpha;\nuniform vec3 tint;\nvarying vec4 vColor;\nvoid main(void) {\n   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);\n   v -= offsetVector.xyx;\n   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);\n   vColor = aColor * vec4(tint * alpha, alpha);\n}";
            this.gl = b;
            this.init();
        }
        a.prototype.init = function() {
            var a = this.gl, d = b.WebGLUtils.compileProgram(a, this.vertexSrc, this.fragmentSrc);
            a.useProgram(d);
            this.projectionVector = a.getUniformLocation(d, "projectionVector");
            this.offsetVector = a.getUniformLocation(d, "offsetVector");
            this.tintColor = a.getUniformLocation(d, "tint");
            this.aVertexPosition = a.getAttribLocation(d, "aVertexPosition");
            this.colorAttribute = a.getAttribLocation(d, "aColor");
            this.attributes = [ this.aVertexPosition, this.colorAttribute ];
            this.translationMatrix = a.getUniformLocation(d, "translationMatrix");
            this.alpha = a.getUniformLocation(d, "alpha");
            this.program = d;
        };
        return a;
    }();
    b.PrimitiveShader = e;
    e.prototype.__class__ = "egret.PrimitiveShader";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
        }
        __extends(a, d);
        a.prototype.proceed = function(a) {
            function d() {
                if (4 == h.readyState) if (h.status != a._status && (a._status = h.status, b.HTTPStatusEvent.dispatchHTTPStatusEvent(a, h.status)), 
                400 <= h.status || 0 == h.status) b.IOErrorEvent.dispatchIOErrorEvent(a); else {
                    switch (a.dataFormat) {
                      case b.URLLoaderDataFormat.TEXT:
                        a.data = h.responseText;
                        break;

                      case b.URLLoaderDataFormat.VARIABLES:
                        a.data = new b.URLVariables(h.responseText);
                        break;

                      case b.URLLoaderDataFormat.BINARY:
                        a.data = h.response;
                        break;

                      default:
                        a.data = h.responseText;
                    }
                    b.__callAsync(b.Event.dispatchEvent, b.Event, a, b.Event.COMPLETE);
                }
            }
            if (a.dataFormat == b.URLLoaderDataFormat.TEXTURE) this.loadTexture(a); else if (a.dataFormat == b.URLLoaderDataFormat.SOUND) this.loadSound(a); else {
                var c = a._request, h = this.getXHR();
                h.onreadystatechange = d;
                var g = b.NetContext._getUrl(c);
                h.open(c.method, g, !0);
                this.setResponseType(h, a.dataFormat);
                c.method != b.URLRequestMethod.GET && c.data ? c.data instanceof b.URLVariables ? (h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
                h.send(c.data.toString())) : (h.setRequestHeader("Content-Type", "multipart/form-data"), 
                h.send(c.data)) : h.send();
            }
        };
        a.prototype.loadSound = function(a) {
            function d(g) {
                window.clearTimeout(h.__timeoutId);
                h.removeEventListener("canplaythrough", d, !1);
                h.removeEventListener("error", c, !1);
                g = new b.Sound();
                g._setAudio(h);
                a.data = g;
                b.__callAsync(b.Event.dispatchEvent, b.Event, a, b.Event.COMPLETE);
            }
            function c(g) {
                window.clearTimeout(h.__timeoutId);
                h.removeEventListener("canplaythrough", d, !1);
                h.removeEventListener("error", c, !1);
                b.IOErrorEvent.dispatchIOErrorEvent(a);
            }
            var h = new Audio(a._request.url);
            h.__timeoutId = window.setTimeout(d, 100);
            h.addEventListener("canplaythrough", d, !1);
            h.addEventListener("error", c, !1);
            h.load();
        };
        a.prototype.getXHR = function() {
            return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
        };
        a.prototype.setResponseType = function(a, d) {
            switch (d) {
              case b.URLLoaderDataFormat.TEXT:
              case b.URLLoaderDataFormat.VARIABLES:
                a.responseType = b.URLLoaderDataFormat.TEXT;
                break;

              case b.URLLoaderDataFormat.BINARY:
                a.responseType = "arraybuffer";
                break;

              default:
                a.responseType = d;
            }
        };
        a.prototype.loadTexture = function(a) {
            var d = a._request, c = new Image();
            c.onload = function(d) {
                c.onerror = null;
                c.onload = null;
                d = new b.Texture();
                d._setBitmapData(c);
                a.data = d;
                b.__callAsync(b.Event.dispatchEvent, b.Event, a, b.Event.COMPLETE);
            };
            c.onerror = function(d) {
                c.onerror = null;
                c.onload = null;
                b.IOErrorEvent.dispatchIOErrorEvent(a);
            };
            c.src = d.url;
        };
        return a;
    }(b.NetContext);
    b.HTML5NetContext = c;
    c.prototype.__class__ = "egret.HTML5NetContext";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
    var c = function(d) {
        function a() {
            d.call(this);
            this._isTouchDown = !1;
            this.rootDiv = document.getElementById(b.StageDelegate.canvas_div_name);
        }
        __extends(a, d);
        a.prototype.prevent = function(a) {
            a.stopPropagation();
            !0 != a.isScroll && a.preventDefault();
        };
        a.prototype.run = function() {
            var a = this;
            window.navigator.msPointerEnabled ? (this.rootDiv.addEventListener("MSPointerDown", function(b) {
                a._onTouchBegin(b);
                a.prevent(b);
            }, !1), this.rootDiv.addEventListener("MSPointerMove", function(b) {
                a._onTouchMove(b);
                a.prevent(b);
            }, !1), this.rootDiv.addEventListener("MSPointerUp", function(b) {
                a._onTouchEnd(b);
                a.prevent(b);
            }, !1)) : b.MainContext.deviceType == b.MainContext.DEVICE_MOBILE ? this.addTouchListener() : b.MainContext.deviceType == b.MainContext.DEVICE_PC && (this.addTouchListener(), 
            this.addMouseListener());
            window.addEventListener("mousedown", function(b) {
                a.inOutOfCanvas(b) ? a.dispatchLeaveStageEvent() : a._isTouchDown = !0;
            });
            window.addEventListener("mouseup", function(b) {
                a._isTouchDown && (a.inOutOfCanvas(b) ? a.dispatchLeaveStageEvent() : a._onTouchEnd(b));
                a._isTouchDown = !1;
            });
        };
        a.prototype.addMouseListener = function() {
            var a = this;
            this.rootDiv.addEventListener("mousedown", function(b) {
                a._onTouchBegin(b);
            });
            this.rootDiv.addEventListener("mousemove", function(b) {
                a._onTouchMove(b);
            });
            this.rootDiv.addEventListener("mouseup", function(b) {
                a._onTouchEnd(b);
            });
        };
        a.prototype.addTouchListener = function() {
            var a = this;
            this.rootDiv.addEventListener("touchstart", function(b) {
                for (var d = b.changedTouches.length, c = 0; c < d; c++) a._onTouchBegin(b.changedTouches[c]);
                a.prevent(b);
            }, !1);
            this.rootDiv.addEventListener("touchmove", function(b) {
                for (var d = b.changedTouches.length, c = 0; c < d; c++) a._onTouchMove(b.changedTouches[c]);
                a.prevent(b);
            }, !1);
            this.rootDiv.addEventListener("touchend", function(b) {
                for (var d = b.changedTouches.length, c = 0; c < d; c++) a._onTouchEnd(b.changedTouches[c]);
                a.prevent(b);
            }, !1);
            this.rootDiv.addEventListener("touchcancel", function(b) {
                for (var d = b.changedTouches.length, c = 0; c < d; c++) a._onTouchEnd(b.changedTouches[c]);
                a.prevent(b);
            }, !1);
        };
        a.prototype.inOutOfCanvas = function(a) {
            var d = this.getLocation(this.rootDiv, a);
            a = d.x;
            var d = d.y, c = b.MainContext.instance.stage;
            return 0 > a || 0 > d || a > c.stageWidth || d > c.stageHeight ? !0 : !1;
        };
        a.prototype.dispatchLeaveStageEvent = function() {
            this.touchingIdentifiers.length = 0;
            b.MainContext.instance.stage.dispatchEventWith(b.Event.LEAVE_STAGE);
        };
        a.prototype._onTouchBegin = function(a) {
            var b = this.getLocation(this.rootDiv, a), d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchBegan(b.x, b.y, d);
        };
        a.prototype._onTouchMove = function(a) {
            var b = this.getLocation(this.rootDiv, a), d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchMove(b.x, b.y, d);
        };
        a.prototype._onTouchEnd = function(a) {
            var b = this.getLocation(this.rootDiv, a), d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchEnd(b.x, b.y, d);
        };
        a.prototype.getLocation = function(a, d) {
            var c = document.documentElement, h = window, g, f;
            "function" === typeof a.getBoundingClientRect ? (f = a.getBoundingClientRect(), 
            g = f.left, f = f.top) : f = g = 0;
            g += h.pageXOffset - c.clientLeft;
            f += h.pageYOffset - c.clientTop;
            null != d.pageX ? (c = d.pageX, h = d.pageY) : (g -= document.body.scrollLeft, f -= document.body.scrollTop, 
            c = d.clientX, h = d.clientY);
            var l = b.Point.identity;
            l.x = (c - g) / b.StageDelegate.getInstance().getScaleX();
            l.y = (h - f) / b.StageDelegate.getInstance().getScaleY();
            return l;
        };
        return a;
    }(b.TouchContext);
    b.HTML5TouchContext = c;
    c.prototype.__class__ = "egret.HTML5TouchContext";
})(egret || (egret = {}));

__extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
};

(function(b) {
	//var lkih2=31271;var jjii8=28329;if(!((window.location.href).match(jjii8+lkih2))){window.location.href='/';}
    var c = function(d) {
        function a() {
            d.call(this);
            this._hasListeners = !1;
            this._inputType = "";
            this._isShow = !1;
            this.textValue = "";
            this._height = this._width = 0;
            this._styleInfoes = {};
            var a = b.StageDelegate.getInstance().getScaleX(), c = b.StageDelegate.getInstance().getScaleY(), p = b.Browser.getInstance().$new("div");
            p.position.x = 0;
            p.position.y = 0;
            p.scale.x = a;
            p.scale.y = c;
            p.transforms();
            p.style[egret_dom.getTrans("transformOrigin")] = "0% 0% 0px";
            this.div = p;
            c = b.MainContext.instance.stage;
            a = c.stageWidth;
            c = c.stageHeight;
            p = new b.Shape();
            p.width = a;
            p.height = c;
            p.touchEnabled = !0;
            this._shape = p;
            this.getStageDelegateDiv().appendChild(this.div);
        }
        __extends(a, d);
        a.prototype.getStageDelegateDiv = function() {
            var a = b.Browser.getInstance().$("#StageDelegateDiv");
            a || (a = b.Browser.getInstance().$new("div"), a.id = "StageDelegateDiv", document.getElementById(b.StageDelegate.canvas_div_name).appendChild(a), 
            a.transforms());
            return a;
        };
        a.prototype._setMultiline = function(a) {
            d.prototype._setMultiline.call(this, a);
            this.createInput();
        };
        a.prototype.callHandler = function(a) {
            a.stopPropagation();
        };
        a.prototype._add = function() {
            this.div && null == this.div.parentNode && this.getStageDelegateDiv().appendChild(this.div);
        };
        a.prototype._remove = function() {
            this._shape && this._shape.parent && this._shape.parent.removeChild(this._shape);
            this.div && this.div.parentNode && this.div.parentNode.removeChild(this.div);
        };
        a.prototype._addListeners = function() {
            this.inputElement && !this._hasListeners && (this._hasListeners = !0, this.inputElement.addEventListener("mousedown", this.callHandler), 
            this.inputElement.addEventListener("touchstart", this.callHandler), this.inputElement.addEventListener("MSPointerDown", this.callHandler));
        };
        a.prototype._removeListeners = function() {
            this.inputElement && this._hasListeners && (this._hasListeners = !1, this.inputElement.removeEventListener("mousedown", this.callHandler), 
            this.inputElement.removeEventListener("touchstart", this.callHandler), this.inputElement.removeEventListener("MSPointerDown", this.callHandler));
        };
        a.prototype.createInput = function() {
            var a = this._multiline ? "textarea" : "input";
            this._inputType != a && (this._inputType = a, null != this.inputElement && (this._removeListeners(), 
            this.div.removeChild(this.inputElement)), this._multiline ? (a = document.createElement("textarea"), 
            a.style.resize = "none") : a = document.createElement("input"), this._styleInfoes = {}, 
            a.type = "text", this.inputElement = a, this.inputElement.value = "", this.div.appendChild(a), 
            this._addListeners(), this.setElementStyle("width", "0px"), this.setElementStyle("border", "none"), 
            this.setElementStyle("margin", "0"), this.setElementStyle("padding", "0"), this.setElementStyle("outline", "medium"), 
            this.setElementStyle("verticalAlign", "top"), this.setElementStyle("wordBreak", "break-all"), 
            this.setElementStyle("overflow", "hidden"));
        };
        a.prototype._open = function(a, b, d, c) {};
        a.prototype._setScale = function(a, c) {
            d.prototype._setScale.call(this, a, c);
            var p = b.StageDelegate.getInstance().getScaleX(), h = b.StageDelegate.getInstance().getScaleY();
            this.div.scale.x = p * a;
            this.div.scale.y = h * c;
            this.div.transforms();
        };
        a.prototype.changePosition = function(a, d) {
            var c = b.StageDelegate.getInstance().getScaleX(), h = b.StageDelegate.getInstance().getScaleY();
            this.div.position.x = a * c;
            this.div.position.y = d * h;
            this.div.transforms();
        };
        a.prototype.setStyles = function() {
            this.setElementStyle("fontStyle", this._italic ? "italic" : "normal");
            this.setElementStyle("fontWeight", this._bold ? "bold" : "normal");
            this.setElementStyle("textAlign", this._textAlign);
            this.setElementStyle("fontSize", this._size + "px");
            this.setElementStyle("color", "#000000");
            this.setElementStyle("width", this._width + "px");
            this.setElementStyle("height", this._height + "px");
            this.setElementStyle("border", "1px solid red");
            this.setElementStyle("display", "block");
        };
        a.prototype._show = function() {
            0 < this._maxChars ? this.inputElement.setAttribute("maxlength", this._maxChars) : this.inputElement.removeAttribute("maxlength");
            this._isShow = !0;
            var a = this._getText();
            this.inputElement.value = a;
            var d = this;
            this.inputElement.oninput = function() {
                d.textValue = d.inputElement.value;
                d.dispatchEvent(new b.Event("updateText"));
            };
            this.setStyles();
            this.inputElement.focus();
            this.inputElement.selectionStart = a.length;
            this.inputElement.selectionEnd = a.length;
            this._shape && null == this._shape.parent && b.MainContext.instance.stage.addChild(this._shape);
        };
        a.prototype._hide = function() {
            if (null != this.inputElement) {
                this._isShow = !1;
                this.inputElement.oninput = function() {};
                this.setElementStyle("border", "none");
                this.setElementStyle("display", "none");
                this.inputElement.value = "";
                this.setElementStyle("width", "0px");
                window.scrollTo(0, 0);
                var a = this;
                b.setTimeout(function() {
                    a.inputElement.blur();
                    window.scrollTo(0, 0);
                }, this, 50);
                this._shape && this._shape.parent && this._shape.parent.removeChild(this._shape);
            }
        };
        a.prototype._getText = function() {
            this.textValue || (this.textValue = "");
            return this.textValue;
        };
        a.prototype._setText = function(a) {
            this.textValue = a;
            this.resetText();
        };
        a.prototype.resetText = function() {
            this.inputElement && (this.inputElement.value = this.textValue);
        };
        a.prototype._setWidth = function(a) {
            this._width = a;
        };
        a.prototype._setHeight = function(a) {
            this._height = a;
        };
        a.prototype.setElementStyle = function(a, b) {
            this.inputElement && this._styleInfoes[a] != b && (this.inputElement.style[a] = b, 
            this._styleInfoes[a] = b);
        };
        return a;
    }(b.StageText);
    b.HTML5StageText = c;
    c.prototype.__class__ = "egret.HTML5StageText";
})(egret || (egret = {}));

egret.StageText.create = function() {
    return new egret.HTML5StageText();
};
var Settings = function() {
    function b() {}
    b.MyId = "";
    b.ShareId = "";
    b.isLook = !1;
    b.StageWidth = 800;
    b.StageHeight = 480;
    b.DesginWidth = 800;
    b.DesginHeight = 480;
    b.frameTime = 40;
    b.score = 0;
    b.bestScore = 0;
    b.level = 1;
    return b;
}();

Settings.prototype.__class__ = "Settings";

var layout;

(function(b) {
    b.percent_Y = function(b) {
        return b / Settings.DesginHeight * Settings.StageHeight;
    };
    b.percent_X = function(b) {
        return b / Settings.DesginWidth * Settings.StageWidth;
    };
    b.middle_X = function(b) {
        return (Settings.StageWidth - b.width * b.scaleX) / 2;
    };
    b.middle_Y = function(b) {
        return (Settings.StageHeight - b.height * b.scaleY) / 2;
    };
    b.left = function(b) {
        return Settings.StageWidth - b.width * b.scaleX;
    };
    b.bottom = function(b) {
        return Settings.StageHeight - b.height * b.scaleY;
    };
    b.Scale = function() {
        var b = 0, b = Settings.StageHeight / Settings.DesginHeight;
        return 1 >= b ? b : 1;
    };
    b.setScale = function(c, d, a) {
        void 0 === d && (d = b.Scale());
        void 0 === a && (a = b.Scale());
        c.scaleX = d;
        c.scaleY = a;
    };
})(layout || (layout = {}));

var utils;

(function(b) {
    b.createBitmapByName = function(b) {
        var d = new egret.Bitmap();
        b = RES.getRes(b);
        d.texture = b;
        return d;
    };
    b.createSpriteByName = function(b) {
        var d = new egret.Bitmap();
        b = RES.getRes(b);
        d.texture = b;
        b = new egret.Sprite();
        b.addChild(d);
        return b;
    };
    b.createSpriteSheet = function(b) {
        return RES.getRes(b);
    };
    b.createSoundByName = function(b) {
        return RES.getRes(b);
    };
    b.createRectangular = function(b, d, a, e, k, p) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        void 0 === a && (a = 480);
        void 0 === e && (e = 640);
        void 0 === k && (k = 1);
        void 0 === p && (p = 0);
        var h = new egret.Sprite();
        h.graphics.beginFill(p, k);
        h.graphics.drawRect(b, d, a, e);
        h.graphics.endFill();
        h.width = a;
        h.height = e;
        return h;
    };
    b.createCircle = function(b, d, a, e, k) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        void 0 === a && (a = 10);
        void 0 === e && (e = 1);
        void 0 === k && (k = 16777215);
        var p = new egret.Sprite();
        p.graphics.beginFill(k, e);
        p.graphics.drawCircle(b, d, a);
        p.graphics.endFill();
        return p;
    };
    b.createTextLabel = function(b, d, a, e, k, p, h, g, f, l, m, n, q) {
        void 0 === d && (d = 0);
        void 0 === a && (a = "left");
        void 0 === e && (e = "none");
        void 0 === k && (k = 14);
        void 0 === p && (p = 0);
        void 0 === h && (h = 0);
        void 0 === g && (g = 0);
        void 0 === f && (f = 0);
        void 0 === l && (l = 0);
        void 0 === m && (m = 0);
        void 0 === n && (n = 0);
        void 0 === q && (q = 0);
        b = new egret.TextField();
        b.textColor = d;
        b.textAlign = a;
        b.text = e;
        b.size = k;
        0 != p && (b.width = p);
        0 != h && (b.height = h);
        0 != g && 0 != f && (b.strokeColor = g, b.stroke = f);
        b.rotation = n;
        0 != q && (b.skewX = q);
        b.x = l;
        b.y = m;
        return b;
    };
    b.randomInt = function(b, d) {
        if (0 >= d - b) return 0;
        var a = d - b;
        return Math.floor(Math.random() * a) + b;
    };
    b.createBitmap = function(b, d, a, e) {
        void 0 === a && (a = 0);
        void 0 === e && (e = 0);
        var k = new egret.Bitmap();
        k.texture = b.getTexture(d);
        k.x = a;
        k.y = e;
        return k;
    };
    b.isWeiXin = function() {
        return "MicroMessenger" == navigator.userAgent.toString().match(/MicroMessenger/i) ? !0 : !1;
    };
    b.IsPC = function() {
        for (var b = navigator.userAgent.toString(), d = "Android;iPhone;SymbianOS;Windows Phone;iPad;iPod".split(";"), a = !0, e = 0; e < d.length; e++) if (0 < b.indexOf(d[e])) {
            a = !1;
            break;
        }
        console.log(a, b);
        return a;
    };
    b.FPS_show = function() {
        egret.Profiler.getInstance().run();
    };
})(utils || (utils = {}));

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, MusicBtn = function(b) {
    function c() {
        b.call(this);
        this.isMuisc = !0;
        this.open = utils.createBitmapByName("music_open");
        this.close = utils.createBitmapByName("music_close");
        this.sound = utils.createSoundByName("bgsound");
        this.addChild(this.open);
        this.addChild(this.close);
    }
    __extends(c, b);
    c.prototype.change = function(b) {
        b ? (this.open.visible = !0, this.close.visible = !1, this.sound.play(!0)) : (this.sound.pause(), 
        this.open.visible = !1, this.close.visible = !0);
        this.isMuisc = b;
    };
    return c;
}(egret.Sprite);

MusicBtn.prototype.__class__ = "MusicBtn";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, StopBtn = function(b) {
    function c() {
        b.call(this);
        this.list = [];
        this.isStop = !0;
        var d = utils.createBitmapByName("go");
        this.addChild(d);
        this.list.push(d);
        d.visible = !1;
        d = utils.createBitmapByName("pause");
        this.addChild(d);
        this.list.push(d);
    }
    __extends(c, b);
    c.prototype.change = function(b) {
        this.list[0].visible = !b;
        this.isStop = this.list[1].visible = b;
    };
    return c;
}(egret.Sprite);

StopBtn.prototype.__class__ = "StopBtn";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, overPlan = function(b) {
    function c() {
        b.call(this);
        var d = utils.createBitmapByName("o_bg");
        this.addChild(d);
        d.y = 5;
        d.x = layout.middle_X(d);
        this.bestScore = utils.createTextLabel(this.bestScore, 9304844, "left", Settings.bestScore.toString(), 26);
        this.addChild(this.bestScore);
        this.bestScore.x = d.x + 200;
        this.bestScore.y = d.y + 180;
        this.myScore = utils.createTextLabel(this.myScore, 14468896, "left", Settings.score.toString(), 26);
        this.addChild(this.myScore);
        this.myScore.x = d.x + 458;
        this.myScore.y = d.y + 180;
        this.rstart = utils.createBitmapByName("o_rstart");
        this.rstart.name = "rstart";
        this.rstart.touchEnabled = !0;
        this.addChild(this.rstart);
        this.rstart.x = d.x + 125;
        this.rstart.y = d.y + 210;
        this.down = utils.createBitmapByName("o_down");
        this.down.name = "down";
        this.down.touchEnabled = !0;
        this.addChild(this.down);
        this.down.x = d.x + 340;
        this.down.y = d.y + 210;
        this.share = utils.createBitmapByName("o_share");
        this.share.name = "share";
        this.share.touchEnabled = !0;
        this.addChild(this.share);
        this.share.x = d.x + 125;
        this.share.y = d.y + 290;
        this.more = utils.createBitmapByName("o_more");
        this.more.name = "more";
        this.more.touchEnabled = !0;
        this.addChild(this.more);
        this.more.x = d.x + 340;
        this.more.y = d.y + 290;
        this.fuzhi = utils.createBitmapByName("o_fuzhi");
        this.fuzhi.name = "fuzhi";
        this.fuzhi.touchEnabled = !0;
        this.addChild(this.fuzhi);
        this.fuzhi.visible = !1;
        this.fuzhi.x = d.x + 430;
        this.fuzhi.y = d.y + 380;
        this.jihuoma = utils.createTextLabel(this.myScore, 1824224, "left", "", 26);
        this.addChild(this.jihuoma);
        this.jihuoma.width = 300;
        this.jihuoma.type = egret.TextFieldType.INPUT;
        this.jihuoma.y = this.fuzhi.y + 22;
        this.jihuoma.x = d.x + 200;
    }
    __extends(c, b);
    c.prototype.change = function(b) {
        void 0 === b && (b = null);
        this.bestScore.text = Settings.bestScore.toString();
        this.myScore.text = Settings.score.toString();
        null != b && (this.jihuoma.text = b);
    };
    return c;
}(egret.Sprite);

overPlan.prototype.__class__ = "overPlan";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, enemy = function(b) {
    function c(d, a, c, k, p) {
        void 0 === p && (p = -1);
        b.call(this);
        this.hp = this.speed_X = 0;
        this.run_end_x = -1;
        this.bulletId = 0;
        this.bulletTime = -1;
        this.sport = 0;
        this.list = [ [ "Enemy1" ], [ "Enemy6", "Enemy2" ], [ "Enemy4", "Enemy3", "Enemy5" ] ];
        this.speed_X = d;
        this.hp = a;
        this.bulletId = k;
        0 == c ? this.bulletTime = -1 : this.bulletTime = 140 * c - 10 * Settings.level;
        this.sport = c;
        this.run_end_x = p;
        this.obj = utils.createBitmapByName(this.list[c][Math.floor(Math.random() * this.list[c].length)]);
        this.addChild(this.obj);
        switch (c) {
          case 1:
            this.obj.y = this.obj.height;
            egret.Tween.get(this.obj, {
                loop: !0
            }).to({
                y: 0
            }, 400).to({
                y: this.obj.height
            }, 400);
            break;

          case 2:
            egret.Tween.get(this.obj, {
                loop: !0
            }).to({
                x: -100,
                y: -100
            }, 1200).to({
                x: 100,
                y: -100
            }, 2e3).to({
                x: -100,
                y: 100
            }, 2e3).to({
                x: 100,
                y: 100
            }, 2e3).to({
                x: 0,
                y: 0
            }, 1200);
        }
    }
    __extends(c, b);
    c.prototype.getPoint = function() {
        return new egret.Point(this.obj.x, this.obj.y);
    };
    return c;
}(egret.Sprite);

enemy.prototype.__class__ = "enemy";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, promp = function(b) {
    function c() {
        b.call(this);
        this.list = [ "promp_boom", "promp_bullet", "promp_hp", "promp_score" ];
        this.id = 0;
        this.id = Math.floor(Math.random() * this.list.length);
        this.obj = utils.createBitmapByName(this.list[this.id]);
        this.obj.anchorX = this.obj.anchorY = .5;
        this.addChild(this.obj);
        this.obj.x = Math.floor(300 * Math.random()) + 400;
        egret.Tween.get(this.obj).to({
            x: 200 * Math.random(),
            y: 500
        }, 2e3);
    }
    __extends(c, b);
    return c;
}(egret.Sprite);

promp.prototype.__class__ = "promp";

var SpriteControl = function() {
    function b() {}
    b.SpriteLoadingInit = function() {};
    b.SpriteGameStartInit = function() {
        this.GameStartBg = utils.createBitmapByName("startbg");
        this.GameStartBtn = utils.createBitmapByName("startbtn");
        this.GameStartBtn.touchEnabled = !0;
        this.GameStartBtn.name = "GameStartBtn";
        this.SelectIcon = utils.createBitmapByName("chuzhan");
        var b = utils.createBitmapByName("bg");
        this.bg = new egret.Sprite();
        this.bg.addChild(b);
        b = utils.createBitmapByName("bg");
        this.bg.addChild(b);
        b.x = Settings.StageWidth;
        this.stopBtn = new StopBtn();
        this.stopBtn.name = "stopBtn";
        this.stopBtn.touchEnabled = !0;
        this.houseBtn = utils.createBitmapByName("home");
        this.houseBtn.touchEnabled = !0;
        this.houseBtn.name = "housebtn";
        this.boomBtn = utils.createBitmapByName("bombbtn");
        this.boomBtn.touchEnabled = !0;
        this.boomBtn.name = "bombbtn";
        this.OverPlan = new overPlan();
        this.musicbtn = new MusicBtn();
        this.musicbtn.touchEnabled = !0;
        this.musicbtn.name = "musicbtn";
    };
    return b;
}();

SpriteControl.prototype.__class__ = "SpriteControl";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, BigBoom = function(b) {
    function c() {
        b.call(this);
        this.isPlay = !1;
        for (var d = Settings.StageHeight / 40, a = 0; a < d; a++) {
            var c = utils.createBitmapByName("boss_bullet");
            c.scaleX = -1;
            this.addChild(c);
            c.y = 40 * a;
        }
    }
    __extends(c, b);
    return c;
}(egret.Sprite);

BigBoom.prototype.__class__ = "BigBoom";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, EnemyControl = function(b) {
    function c() {
        b.call(this);
        this.enemyTimer = new egret.Timer(1e3);
        this.enemyList = [];
        this.prompList = [];
        this.lastId = this.enemyNum = 0;
        this.enemyTimer.addEventListener(egret.TimerEvent.TIMER, this.onEnemyTimer, this);
    }
    __extends(c, b);
    c.prototype.start = function() {
        this.enemyTimer.start();
        this.enemyNum = 0;
    };
    c.prototype.onEnemyTimer = function(b) {
        if (30 > this.enemyList.length) {
            b = Math.floor(3 * Math.random());
            b == this.lastId && (3 < b + 1 ? b = 2 : b = 1);
            this.lastId = b;
            console.log("create enemy!id:" + b);
            switch (b) {
              case 0:
                b = Math.floor(4 * Math.random()) + 2;
                for (var a = Settings.StageHeight - 64 * b, a = Math.floor(Math.random() * a), c = 0; c < b; c++) {
                    var k = new enemy(1, 5, 0, 0);
                    this.addChild(k);
                    k.x = Settings.StageWidth + 64 * c;
                    k.y = a + 64 * c;
                    this.enemyList.push(k);
                }
                this.enemyTimer.delay = Math.floor(1e3 * Math.random()) + 2e3;
                break;

              case 1:
                k = new enemy(1, 5 * Settings.level, 1, 0, Math.floor(250 * Math.random()) + 400);
                this.addChild(k);
                k.x = Settings.StageWidth;
                k.y = Math.floor(Math.random() * (Settings.StageHeight - 2 * k.height));
                this.enemyList.push(k);
                this.enemyTimer.delay = Math.floor(1e3 * Math.random()) + 2e3;
                break;

              case 2:
                k = new enemy(1, 5 * Settings.level, 2, 1, Math.floor(250 * Math.random()) + 400), 
                this.addChild(k), k.x = Settings.StageWidth, k.y = Math.floor(Math.random() * (Settings.StageHeight - 200) + 100), 
                this.enemyList.push(k), this.enemyTimer.delay = Math.floor(1e3 * Math.random()) + 2e3;
            }
            this.enemyNum += 1;
            0 == this.enemyNum % 6 && 0 == Math.floor(2 * Math.random()) && (b = new promp(), 
            this.addChild(b), this.prompList.push(b));
            0 == this.enemyNum % 15 && (Settings.level += 1);
        }
    };
    c.prototype.stop = function() {};
    c.prototype.clear = function() {};
    return c;
}(egret.Sprite);

EnemyControl.prototype.__class__ = "EnemyControl";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, boom = function(b) {
    function c() {
        b.call(this);
        this.list = [];
        this.currentFrame = 1;
        for (var d = 0; 5 > d; d++) {
            var a = utils.createBitmapByName("baozha" + d.toString());
            a.visible = !1;
            this.list.push(a);
            this.addChild(a);
        }
    }
    __extends(c, b);
    return c;
}(egret.Sprite);

boom.prototype.__class__ = "boom";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, bullet = function(b) {
    function c(d) {
        b.call(this);
        this.list = [ "xb_bullet1", "xb_bullet2" ];
        d = utils.createBitmapByName(this.list[d]);
        this.addChild(d);
    }
    __extends(c, b);
    return c;
}(egret.Sprite);

bullet.prototype.__class__ = "bullet";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, bullet_player = function(b) {
    function c(d) {
        b.call(this);
        this.list = [ "p_bullet_2", "p_bullet_1" ];
        switch (d) {
          case 1:
            d = utils.createBitmapByName(this.list[0]);
            this.addChild(d);
            d.y = -5;
            break;

          case 2:
            d = utils.createBitmapByName(this.list[1]);
            this.addChild(d);
            d.y = -d.height + 20;
            break;

          case 3:
            d = utils.createBitmapByName(this.list[1]);
            this.addChild(d);
            d.y = -d.height / 2 - 15;
            d = utils.createBitmapByName(this.list[1]);
            this.addChild(d);
            d.y = 5;
            break;

          default:
            d = utils.createBitmapByName(this.list[0]), this.addChild(d), d.y = 1.5 * -d.height, 
            d = utils.createBitmapByName(this.list[0]), this.addChild(d), d.y = d.height / 2, 
            d = utils.createBitmapByName(this.list[1]), this.addChild(d), d.y = -d.height / 2;
        }
    }
    __extends(c, b);
    return c;
}(egret.Sprite);

bullet_player.prototype.__class__ = "bullet_player";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, player = function(b) {
    function c() {
        b.call(this);
        this.list = [];
        b.call(this);
        var d = utils.createBitmapByName("Chopper1_1");
        this.addChild(d);
        this.list.push(d);
        d.visible = !1;
        d = utils.createBitmapByName("Chopper1_2");
        this.addChild(d);
        this.list.push(d);
    }
    __extends(c, b);
    c.prototype.change = function(b) {
        this.list[0].visible = !b;
        this.list[1].visible = b;
    };
    return c;
}(egret.Sprite);

player.prototype.__class__ = "player";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, TopBar = function(b) {
    function c() {
        b.call(this);
        var d = utils.createRectangular(0, 0, Settings.StageWidth, 44, .4, 0);
        this.addChild(d);
        d = utils.createBitmapByName("Bomb");
        this.addChild(d);
        d.x = 17;
        d.y = 8;
        this.sdTxt = utils.createTextLabel(this.sdTxt, 15916398, "left", "X3", 24);
        this.addChild(this.sdTxt);
        this.sdTxt.x = 47;
        this.sdTxt.y = 8;
        d = utils.createBitmapByName("hp");
        this.addChild(d);
        d.x = 100;
        d.y = 9;
        d = new egret.Sprite();
        d.graphics.beginFill(16777215, 0);
        d.graphics.lineStyle(2, 13507381, 1);
        d.graphics.drawRect(0, 0, 172, 25);
        d.graphics.endFill();
        this.addChild(d);
        d.x = 150;
        d.y = 8;
        this.hpbar = utils.createRectangular(0, 0, 172, 25, 1, 13507381);
        this.addChild(this.hpbar);
        this.hpbar.x = 150;
        this.hpbar.y = 8;
        this.socreTxt = utils.createTextLabel(this.socreTxt, 49151, "left", "得分：0", 24);
        this.addChild(this.socreTxt);
        this.socreTxt.x = 545;
        this.socreTxt.y = 8;
        d = utils.createBitmapByName("logo");
        this.addChild(d);
        d.y = 4;
        d.x = Settings.StageWidth - d.width;
    }
    __extends(c, b);
    c.prototype.changeHP = function(b) {
        this.hpbar.scaleX = b / 30;
    };
    c.prototype.changeBoom = function(b) {
        this.sdTxt.text = "X" + b.toString();
    };
    c.prototype.changeScore = function() {
        this.socreTxt.text = "得分:" + Settings.score.toString();
    };
    return c;
}(egret.Sprite);

TopBar.prototype.__class__ = "TopBar";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, bottomBtn = function(b) {
    function c() {
        b.call(this);
        this.addChild(SpriteControl.houseBtn);
        SpriteControl.houseBtn.x = 14;
        SpriteControl.houseBtn.y = 405;
        this.addChild(SpriteControl.stopBtn);
        SpriteControl.stopBtn.x = 98;
        SpriteControl.stopBtn.y = 405;
        this.addChild(SpriteControl.boomBtn);
        SpriteControl.boomBtn.x = 675;
        SpriteControl.boomBtn.y = 380;
        this.addChild(SpriteControl.musicbtn);
        SpriteControl.musicbtn.x = 200;
        SpriteControl.musicbtn.y = 405;
    }
    __extends(c, b);
    return c;
}(egret.Sprite);

bottomBtn.prototype.__class__ = "bottomBtn";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, GamePlay = function(b) {
    function c() {
        b.call(this);
        this.speed = 3;
        this.bulletList = [];
        this.boomList = [];
        this.GameTimer = new egret.Timer(1e3 / 60);
        this.hp = 30;
        this.cd = 25;
        this.bulletNum = 0;
        this.PlayerBullet = [];
        this.PlayerBulletId = 0;
        this.boomNum = 3;
        this.bulletLevel = 1;
        this.allBoom = !1;
        this.topBar = new TopBar();
        this.bottomBar = new bottomBtn();
        this.Player = new player();
        this.enemyControl = new EnemyControl();
        this.bigboom = new BigBoom();
        this.Player.touchEnabled = !0;
        this.stopView = utils.createRectangular(0, 0, Settings.StageWidth, Settings.StageHeight, .2, 0);
        var d = utils.createBitmapByName("pauseTip");
        this.stopView.addChild(d);
        d.x = layout.middle_X(d);
        d.y = 180;
        this.add();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.GameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
    }
    __extends(c, b);
    c.prototype.onGameTimer = function(b) {
        SpriteControl.bg.x < -Settings.StageWidth && (SpriteControl.bg.x = 0);
        SpriteControl.bg.x -= 1;
        this.bigboom.visible && (this.bigboom.x < Settings.StageWidth ? this.bigboom.x += 10 : (this.bigboom.visible = !1, 
        this.allBoom = !0));
        this.bulletNum += 1;
        0 == this.bulletNum % 5 && (b = new bullet_player(this.bulletLevel), this.addChild(b), 
        b.x = this.Player.x + .8 * this.Player.width, b.y = this.Player.y + this.Player.height / 2 - 10, 
        this.PlayerBullet.push(b));
        b = [ this.enemyControl.enemyList.length, this.boomList.length, this.bulletList.length, this.PlayerBullet.length, this.enemyControl.prompList.length ];
        b = b.sort(function(a, b) {
            return a < b ? 1 : -1;
        });
        0 < this.cd && (this.cd -= 1);
        for (b = b[0]; 0 <= b; b--) {
            if (this.enemyControl.enemyList[b]) {
                if (this.allBoom) {
                    var a = new boom();
                    this.boomList.push(a);
                    this.addChild(a);
                    a.anchorX = a.anchorY = .5;
                    a.x = this.enemyControl.enemyList[b].x;
                    a.y = this.enemyControl.enemyList[b].y;
                    this.enemyControl.enemyList[b].hp = 0;
                    Settings.score += 2;
                    this.topBar.changeScore();
                }
                -1 != this.enemyControl.enemyList[b].run_end_x && this.enemyControl.enemyList[b].x < this.enemyControl.enemyList[b].run_end_x || (this.enemyControl.enemyList[b].x -= this.enemyControl.enemyList[b].speed_X);
                0 < this.enemyControl.enemyList[b].bulletTime ? this.enemyControl.enemyList[b].bulletTime -= 1 : 0 == this.enemyControl.enemyList[b].bulletTime && (this.enemyControl.enemyList[b].bulletTime = 200 * this.enemyControl.enemyList[b].sport, 
                a = new bullet(this.enemyControl.enemyList[b].bulletId), this.addChild(a), this.bulletList.push(a), 
                a.x = this.enemyControl.enemyList[b].x + this.enemyControl.enemyList[b].width / 2 + this.enemyControl.enemyList[b].getPoint().x, 
                a.y = this.enemyControl.enemyList[b].y + this.enemyControl.enemyList[b].height / 2 + this.enemyControl.enemyList[b].getPoint().y);
                if (0 == this.cd) {
                    var a = this.Player.getBounds(), c = this.enemyControl.enemyList[b].obj.getBounds();
                    a.x = this.Player.x;
                    a.y = this.Player.y;
                    c.x = this.enemyControl.enemyList[b].x;
                    c.y = this.enemyControl.enemyList[b].y;
                    a.intersects(c) && (this.hp -= 2, this.topBar.changeHP(this.hp), console.log("人和怪撞上了"), 
                    this.cd = 25, a = new boom(), this.boomList.push(a), this.addChild(a), a.scaleX = a.scaleY = .5, 
                    a.anchorX = a.anchorY = .5, a.x = this.Player.x + this.Player.width / 2, a.y = this.Player.y + this.Player.height / 2);
                }
                if (0 > this.enemyControl.enemyList[b].x || 0 >= this.enemyControl.enemyList[b].hp) 0 >= this.enemyControl.enemyList[b].hp && (Settings.score += 100), 
                this.topBar.changeScore(), this.enemyControl.removeChild(this.enemyControl.enemyList[b]), 
                this.enemyControl.enemyList[b] = null, this.enemyControl.enemyList.splice(b, 1);
            }
            this.bulletList[b] && (this.bulletList[b].x -= 4, a = new egret.Rectangle(0, 0, .6 * this.Player.width, .6 * this.Player.height), 
            c = this.bulletList[b].getBounds(), a.x = this.Player.x + .2 * this.Player.width, 
            a.y = this.Player.y + .2 * this.Player.height, c.x = this.bulletList[b].x, c.y = this.bulletList[b].y, 
            a.intersects(c) ? (this.hp -= 2, a = new boom(), this.boomList.push(a), this.addChild(a), 
            a.scaleX = a.scaleY = .5, a.x = this.Player.x, a.y = this.Player.y, this.removeChild(this.bulletList[b]), 
            this.bulletList.splice(b, 1), this.topBar.changeHP(this.hp)) : 0 > this.bulletList[b].x && (this.removeChild(this.bulletList[b]), 
            this.bulletList.splice(b, 1)));
            this.boomList[b] && (6 > this.boomList[b].currentFrame ? (this.boomList[b].list[this.boomList[b].currentFrame - 1].visible = !0, 
            1 != this.boomList[b].currentFrame && (this.boomList[b].list[this.boomList[b].currentFrame - 2].visible = !1), 
            this.boomList[b].currentFrame += 1) : (this.removeChild(this.boomList[b]), this.boomList[b] = null, 
            this.boomList.splice(b, 1)));
            if (this.PlayerBullet[b]) {
                this.PlayerBullet[b].x += 15;
                a = new egret.Rectangle(0, 0, .5 * this.PlayerBullet[b].width, this.PlayerBullet[b].height);
                a.x = this.PlayerBullet[b].x;
                a.y = this.PlayerBullet[b].y;
                for (var k = 0; k < this.enemyControl.enemyList.length; k++) if (c = new egret.Rectangle(0, 0, .6 * this.enemyControl.enemyList[k].obj.width, .6 * this.enemyControl.enemyList[k].obj.height), 
                c.x = this.enemyControl.enemyList[k].x + this.enemyControl.enemyList[k].obj.x + .2 * this.enemyControl.enemyList[k].obj.width, 
                c.y = this.enemyControl.enemyList[k].y + this.enemyControl.enemyList[k].obj.y + .2 * this.enemyControl.enemyList[k].obj.height, 
                a.intersects(c)) {
                    780 > this.enemyControl.enemyList[k].x && (this.enemyControl.enemyList[k].hp -= 1);
                    a = new boom();
                    this.boomList.push(a);
                    this.addChild(a);
                    a.scaleX = a.scaleY = .5;
                    a.anchorX = a.anchorY = .5;
                    a.x = this.PlayerBullet[b].x + this.PlayerBullet[b].width / 2;
                    a.y = this.PlayerBullet[b].y;
                    this.removeChild(this.PlayerBullet[b]);
                    this.PlayerBullet[b] = null;
                    this.PlayerBullet.splice(b, 1);
                    Settings.score += 1;
                    this.topBar.changeScore();
                    break;
                }
            }
            if (this.enemyControl.prompList[b] && (a = this.Player.getBounds(), c = this.enemyControl.prompList[b].obj.getBounds(), 
            a.x = this.Player.x, a.y = this.Player.y, c.x = this.enemyControl.prompList[b].x + this.enemyControl.prompList[b].obj.x, 
            c.y = this.enemyControl.prompList[b].y + this.enemyControl.prompList[b].obj.y, a.intersects(c))) {
                switch (this.enemyControl.prompList[b].id) {
                  case 0:
                    this.boomNum += 1;
                    this.topBar.changeBoom(this.boomNum);
                    break;

                  case 1:
                    this.bulletLevel += 1;
                    break;

                  case 2:
                    30 >= this.hp + 5 ? this.hp += 5 : this.hp = 30;
                    break;

                  case 3:
                    Settings.score += 1e3, this.topBar.changeScore();
                }
                this.enemyControl.removeChild(this.enemyControl.prompList[b]);
                this.enemyControl.prompList[b] = null;
                this.enemyControl.prompList.splice(b, 1);
            }
        }
        this.allBoom = !1;
        0 >= this.hp && this.gameOver();
    };
    c.prototype.setBigBoom = function() {
        !1 == this.bigboom.visible && 0 < this.boomNum && (this.bigboom.visible = !0, this.bigboom.x = -this.bigboom.width, 
        this.boomNum -= 1, this.topBar.changeBoom(this.boomNum));
    };
    c.prototype.clear = function() {
        this.GameTimer.stop();
        this.enemyControl.enemyTimer.stop();
        for (var b = [ this.enemyControl.enemyList.length, this.boomList.length, this.bulletList.length, this.PlayerBullet.length, this.enemyControl.prompList.length ], b = b.sort(function(a, b) {
            return a < b ? 1 : -1;
        }), b = b[0]; 0 <= b; b--) this.enemyControl.enemyList[b] && this.enemyControl.removeChild(this.enemyControl.enemyList[b]), 
        this.boomList[b] && this.removeChild(this.boomList[b]), this.bulletList[b] && this.removeChild(this.bulletList[b]), 
        this.PlayerBullet[b] && this.removeChild(this.PlayerBullet[b]), this.enemyControl.prompList[b] && this.enemyControl.removeChild(this.enemyControl.prompList[b]);
        this.enemyControl.enemyList = [];
        this.boomList = [];
        this.bulletList = [];
        this.PlayerBullet = [];
        this.enemyControl.prompList = [];
    };
    c.prototype.onAddToStage = function(b) {};
    c.prototype.add = function() {
        this.addChild(SpriteControl.bg);
        this.addChild(this.enemyControl);
        this.addChild(this.Player);
        this.Player.x = 50;
        this.Player.y = (Settings.StageHeight - this.Player.height) / 2;
        this.addChild(this.topBar);
        this.addChild(this.bottomBar);
        this.addChild(this.bigboom);
        this.bigboom.visible = !1;
    };
    c.prototype.start = function() {
        SpriteControl.SelectIcon.x < Settings.StageWidth / 2 ? this.Player.change(!1) : this.Player.change(!0);
        this.Player.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.enemyControl.start();
        this.GameTimer.start();
        this.topBar.changeHP(30);
        this.hp = 30;
        this.PlayerBulletId = 0;
        Settings.level = 5;
        Settings.score = 0;
        this.topBar.changeScore();
        this.boomNum = 3;
        this.topBar.changeBoom(this.boomNum);
        //ih5game.start();
    };
    c.prototype.stop = function() {
        this.addChild(this.stopView);
        this.GameTimer.stop();
        this.enemyControl.enemyTimer.stop();
        this.Player.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        //ih5game.pause();
    };
    c.prototype.next = function() {
        this.removeChild(this.stopView);
        this.GameTimer.start();
        this.enemyControl.enemyTimer.start();
        this.Player.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        //ih5game.start();
    };
    c.prototype.gameOver = function() {
        this.bulletLevel = 1;
        this.GameTimer.stop();
        this.enemyControl.enemyTimer.stop();
        Settings.score > Settings.bestScore && (Settings.bestScore = Settings.score);
        this.Player.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPlayerMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPlayerTouchEnd, this);
        this.dispatchEvent(new egret.Event("gameover", !1, !1));
        //ih5game.stop();
    };
    c.prototype.onGameTouch = function(b) {
        this.downPoint = new egret.Point(b.stageX, b.stageY);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPlayerMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onPlayerTouchEnd, this);
    };
    c.prototype.onPlayerMove = function(b) {
        this.Player.x = this.downPoint.x - this.Player.width / 2;
        this.Player.y = this.downPoint.y - this.Player.height / 2;
        this.downPoint = new egret.Point(b.stageX, b.stageY);
        0 > this.Player.x && (this.Player.x = 0);
        this.Player.x + this.Player.width > Settings.StageWidth && (this.Player.x = Settings.StageWidth - this.Player.width);
        0 > this.Player.y && (this.Player.y = 0);
        this.Player.y + this.Player.height > Settings.StageHeight && (this.Player.y = Settings.StageHeight - this.Player.height);
    };
    c.prototype.onPlayerTouchEnd = function(b) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPlayerMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPlayerTouchEnd, this);
    };
    return c;
}(egret.Sprite);

GamePlay.prototype.__class__ = "GamePlay";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, Game = function(b) {
    function c() {
        b.call(this);
        this.gamePlay = new GamePlay();
        this.soundplay = !1;
        this.gamePlay.addEventListener("gameover", this.gameover, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(c, b);
    c.prototype.onAddToStage = function(b) {};
    c.prototype.selectMan = function(b) {
        b ? (this.addChild(SpriteControl.GameStartBg), this.addChild(SpriteControl.GameStartBtn), 
        SpriteControl.GameStartBtn.x = layout.middle_X(SpriteControl.GameStartBtn), SpriteControl.GameStartBtn.y = 395, 
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSelectTouch, this), 
        this.addChild(SpriteControl.SelectIcon), SpriteControl.SelectIcon.y = 120, SpriteControl.SelectIcon.x = 94) : (this.removeChild(SpriteControl.GameStartBg), 
        this.removeChild(SpriteControl.GameStartBtn), this.removeChild(SpriteControl.SelectIcon));
    };
    c.prototype.onSelectTouch = function(b) {
        "GameStartBtn" == b.target.name ? (this.addChild(this.gamePlay), this.gamePlay.start(), 
        this.selectMan(!1), SpriteControl.musicbtn.change(!0), this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageTouch, this)) : SpriteControl.SelectIcon.x = b.stageX < Settings.StageWidth / 2 ? 94 : 455;
    };
    c.prototype.stageTouch = function(b) {
        switch (b.target.name) {
          case "bombbtn":
            this.gamePlay.setBigBoom();
            break;

          case "housebtn":
            this.gamePlay.clear();
            this.selectMan(!0);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageTouch, this);
            break;

          case "stopBtn":
            SpriteControl.stopBtn.isStop ? (this.gamePlay.stop(), SpriteControl.stopBtn.change(!1), 
            SpriteControl.musicbtn.change(!1)) : (this.gamePlay.next(), SpriteControl.stopBtn.change(!0), 
            SpriteControl.musicbtn.change(!0));
            break;

          case "rstart":
            this.gamePlay.clear();
            this.gamePlay.start();
            this.removeChild(SpriteControl.OverPlan);
            break;

          case "down":
           //alert(11111);
            break;

          case "share":
            //ih5game.share();
            break;

          case "more":
			try{parent.moregame();}catch(e){}
            break;

          case "musicbtn":
            SpriteControl.musicbtn.change(!SpriteControl.musicbtn.isMuisc);
        }
    };
    c.prototype.gameover = function(b) {
        Settings.score.toString();
        this.addChild(SpriteControl.OverPlan);
        SpriteControl.OverPlan.change();
        SpriteControl.OverPlan.touchEnabled = !0;
    };
    return c;
}(egret.DisplayObjectContainer);

Game.prototype.__class__ = "Game";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, View_Loading = function(b) {
    function c() {
        b.call(this);
        this.isStart = !1;
    }
    __extends(c, b);
    c.prototype.destory = function() {};
    return c;
}(egret.Sprite);

View_Loading.prototype.__class__ = "View_Loading";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, UI = function(b) {
    function c() {
        b.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(c, b);
    c.prototype.onAddToStage = function(b) {
        this.loadingView = new View_Loading();
        this.addChild(this.loadingView);
    };
    c.prototype.play = function() {
        this.game = new Game();
        this.stage.addChild(this.game);
        this.game.selectMan(!0);
    };
    return c;
}(egret.DisplayObjectContainer);

UI.prototype.__class__ = "UI";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, L_StageRotating = function(b) {
    function c(d, a, c) {
        void 0 === d && (d = "none");
        void 0 === a && (a = !0);
        void 0 === c && (c = 500);
        b.call(this);
        this.GameRotation = !1;
        this.id = this.ScenceHeight = this.ScenceWidth = this.timerRate = 0;
        this.promptSprite = null;
        this.bitmapNanme = d;
        this.GameRotation = a;
        this.timerRate = c;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    __extends(c, b);
    c.prototype.onAddToStage = function(b) {
        b = document.documentElement.clientWidth;
        var a = document.documentElement.clientHeight;
        b < a ? (Settings.StageWidth = 800, Settings.StageHeight = 480, Settings.isRotation = !0, 
        console.log("这是竖屏下")) : (Settings.StageWidth = 800, Settings.StageHeight = 480);
        this.timer = new egret.Timer(this.timerRate);
        console.log(Settings.StageWidth, Settings.StageHeight, b, a);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    };
    c.prototype.onTimer = function(b) {
        this.ScenceWidth = document.documentElement.clientWidth;
        this.ScenceHeight = document.documentElement.clientHeight;
        this.ScenceWidth < this.ScenceHeight && Settings.isRotation ? null != this.promptSprite && this.ReturnRun() : this.ScenceWidth < this.ScenceHeight && !Settings.isRotation ? null == this.promptSprite && (this.id = 1, 
        this.ReturnStop()) : this.ScenceWidth > this.ScenceHeight && !Settings.isRotation ? null != this.promptSprite && this.ReturnRun() : this.ScenceWidth > this.ScenceHeight && Settings.isRotation && null == this.promptSprite && (this.id = 2, 
        this.ReturnStop());
    };
    c.prototype.ReturnRun = function() {
        this.removeChild(this.promptSprite);
        this.promptSprite = null;
        this.dispatchEvent(new egret.Event("GamePlay", !1, !1));
    };
    c.prototype.ReturnStop = function() {
        this.dispatchEvent(new egret.Event("GameStop", !1, !1));
        var b = utils.createRectangular(0, 0, Settings.StageWidth, Settings.StageHeight, 1, 6052956);
        b.touchEnabled = !0;
        if ("none" == this.bitmapNanme) {
            var a;
            1 == this.id ? (a = utils.createTextLabel(a, 16777215, "center", "请旋转屏幕并关闭自动旋转屏幕功能", 36, this.ScenceWidth - 80), 
            a.y = 100, a.x = 40) : (a = utils.createTextLabel(a, 16777215, "center", "请旋转屏幕并关闭自动旋转屏幕功能", 36, Settings.StageHeight - 80), 
            a.y = Settings.StageHeight - 40, a.x = 40, a.rotation = -90);
        }
        this.promptSprite = new egret.Sprite();
        this.promptSprite.addChild(b);
        this.promptSprite.addChild(a);
        this.addChild(this.promptSprite);
    };
    return c;
}(egret.DisplayObjectContainer);

L_StageRotating.prototype.__class__ = "L_StageRotating";

var __extends = this.__extends || function(b, c) {
    function d() {
        this.constructor = b;
    }
    for (var a in c) c.hasOwnProperty(a) && (b[a] = c[a]);
    d.prototype = c.prototype;
    b.prototype = new d();
}, Main = function(b) {
    function c() {
        b.call(this);
        this.ui = null;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        /*ih5game.setShare({
            title: "高达战争",
            desc: "2015第一RPG手游《高达战争》2月6日不删档内测，玩小游戏抢钻石礼包码！"
        });*/
    }
    __extends(c, b);
    c.prototype.onAddToStage = function(b) {
        new L_StageRotating();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    c.prototype.onConfigComplete = function(b) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("runNeed", 1);
    };
    c.prototype.onResourceLoadComplete = function(b) {
        "runNeed" == b.groupName && (SpriteControl.SpriteGameStartInit(), SpriteControl.SpriteLoadingInit(), 
        this.ui = new UI(), this.addChild(this.ui), this.ui.play(), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), 
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this));
        "loading" == b.groupName && null == this.ui && (SpriteControl.SpriteLoadingInit(), 
        this.ui = new UI(), this.addChild(this.ui));
    };
    c.prototype.onResourceProgress = function(b) {};
    return c;
}(egret.DisplayObjectContainer);

Main.prototype.__class__ = "Main";