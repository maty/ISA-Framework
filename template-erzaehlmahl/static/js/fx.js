	function assignVendorCSSProperty(a, b, c) {
	    if (a[b] != c && (a[b] = c, VENDOR_PREFIX)) {
	        var d = b.charAt(0).toUpperCase() + b.substring(1);
	        a[VENDOR_PREFIX + d] = c
	    }
	}

	function childrenByNodeName(a, b, c) {
	    c || (c = new Array);
	    for (var d = a.childNodes, e = d.length; e--;) {
	        var f = d[e];
	        f.nodeName.toLowerCase() == b && c.push(f)
	    }
	    return c
	}
	var IS_IE = -1 != navigator.appName.indexOf("Microsoft") || -1 != navigator.userAgent.indexOf("Trident"),
	    IE_VERSION = IS_IE ? IE_VERSION = parseFloat(navigator.appVersion.split("MSIE")[1]) || 11 : -1,
	    IS_WEBKIT = -1 != navigator.userAgent.indexOf("WebKit"),
	    WEBKIT_VERSION = IS_WEBKIT ? Number(/WebKit\/([0-9]*)/.exec(navigator.userAgent)[1]) : -1,
	    IS_MOZILLA = !IS_IE && !IS_WEBKIT && -1 != navigator.userAgent.indexOf("Mozilla"),
	    MOZILLA_VERSION = IS_MOZILLA ? Number(/Firefox\/([0-9]*)/.exec(navigator.userAgent)[1]) : -1,
	    IS_TOUCH_DEVICE = "undefined" != typeof window.ontouchstart,
	    IS_IPAD = null != navigator.userAgent.match(/iPad/i),
	    IS_SAFARI = navigator.userAgent.indexOf("Safari") >= 0 && -1 == navigator.userAgent.indexOf("Chrome"),
	    IS_MOBILE_SAFARI = IS_SAFARI && navigator.userAgent.indexOf("Mobile") >= 0,
	    QUICK_CLICK_EVENT_TYPE = IS_TOUCH_DEVICE ? "touchend" : "click",
	    USER_AGENT = IS_IE ? "ie" : IS_WEBKIT ? "webkit" : IS_MOZILLA ? "mozilla" : "unknown",
	    SUPPORTS_TRANSPARENCY = !IS_IE || IE_VERSION >= 9,
	    ENABLE_CSS_TRANSFORM = IE_VERSION >= 9 || WEBKIT_VERSION >= 535 || MOZILLA_VERSION >= 10,
	    ENABLE_CSS_3D_TRANSFORM = IE_VERSION >= 10 || WEBKIT_VERSION >= 534 || MOZILLA_VERSION >= 12,
	    trace = function() {
	        var a = document.getElementById("debugOut");
	        if (a) {
	            for (var b = 20, c = document.createElement("pre"), d = "", e = 0; e < arguments.length; e++) d += (e ? " " : "") + arguments[e];
	            for (c.appendChild(document.createTextNode(d)), a.appendChild(c); a.childNodes.length > b;) a.removeChild(a.firstChild)
	        }
	    };
	window.console || (window.console = {
	    log: function() {}
	});
	var augmentDOMEventDispatcher = function(a) {
	    a.addEventListener || (a.addEventListener = function(a, b) {
	        this.attachEvent("on" + a, b)
	    }, a.removeEventListener = function(a, b) {
	        this.detachEvent("on" + a, b)
	    })
	};
	window.addEventListener || augmentDOMEventDispatcher(window);
	var cancelEvent = function(a) {
	    a.preventDefault ? a.preventDefault() : a.returnFalse = !0
	}, stopEventPropagation = function(a) {
	        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
	    }, VENDOR_PREFIX = function() {
	        var a = {
	            ie: "ms",
	            webkit: "webkit",
	            mozilla: "Moz"
	        };
	        return a[USER_AGENT]
	    }();
	Object.create || (Object.create = function(a) {
	    var b = function() {};
	    return b.prototype = a, new b
	}), Function.prototype.getSharedInstance = function() {
	    return this.sharedInstance || (this.sharedInstance = new this), this.sharedInstance
	}, Function.prototype.extendConstructor = function(a) {
	    var b = a.prototype;
	    for (var c in this) this.hasOwnProperty(c) && (b[c] = this[c])
	}, Function.prototype.extendPrototype = function(a) {
	    a.extendConstructor(this)
	}, Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
	    var c = b || 0;
	    for (c = c >= 0 ? c : Math.max(0, this.length + c); c < this.length; c++)
	        if (this[c] === a) return c;
	    return -1
	}), Array.prototype.toMap = function() {
	    for (var a = new Object, b = this.length; b--;) a[this[b]] = !0;
	    return a
	}, String.prototype.trim || (String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g, "")
	});
	var QueryMap = function() {
	    var a = window.location.search;
	    if (a) {
	        0 == a.indexOf("?") && (a = a.substring(1));
	        for (var b = a.split("&"), c = 0; c < b.length; c++) {
	            var d = b[c].split("=");
	            this[d[0]] = decodeURIComponent(d[1])
	        }
	    }
	};
	QueryMap.encodeQueryObject = function(a) {
	    var b;
	    for (var c in a) {
	        b ? b += "&" : b = "";
	        var d = a[c];
	        b += encodeURIComponent(c) + "=" + encodeURIComponent(d)
	    }
	    return b
	};
	var Dispatcher = function() {
	    this.events = new Object
	};
	Dispatcher.prototype.addListener = function(a, b, c) {
	    var d = this.events[a];
	    d || (d = new Array, this.events[a] = d);
	    var e = this.indexOfListener(d, b, c);
	    0 > e && d.push({
	        callback: b,
	        listener: c
	    })
	}, Dispatcher.prototype.removeListener = function(a, b, c) {
	    var d = this.events[a];
	    if (d) {
	        var e = this.indexOfListener(d, b, c);
	        e >= 0 && (d[e].didDispatch = !0, d.splice(e, 1), d.length || delete this.events[a])
	    }
	}, Dispatcher.prototype.indexOfListener = function(a, b, c) {
	    for (var d = a.length; d--;) {
	        var e = a[d];
	        if (e.callback === b && e.listener === c) return d
	    }
	    return -1
	}, Dispatcher.prototype.dispatchEvent = function(a) {
	    var b = this.events[a];
	    if (b) {
	        b = b.concat();
	        for (var c = b.length; c--;) {
	            var d = b[c];
	            d.didDispatch = !1
	        }
	        for (c = 0; c < b.length; c++)
	            if (d = b[c], !d.didDispatch) {
	                d.callback.call(d.listener, this);
	                try {} catch (e) {
	                    throw e
	                }
	                d.didDispatch = !0
	            }
	    }
	},
	function(a) {
	    function b(a) {
	        this.fontFamily = a || "fjs" + (999999 * Math.random() | 0)
	    }
	    b.prototype.base64 = "AAEAAAAKAIAAAwAgT1MvMgAAAAAAAACsAAAAWGNtYXAAAAAAAAABBAAAACxnbHlmAAAAAAAAATAAAAAQaGVhZAAAAAAAAAFAAAAAOGhoZWEAAAAAAAABeAAAACRobXR4AAAAAAAAAZwAAAAIbG9jYQAAAAAAAAGkAAAACG1heHAAAAAAAAABrAAAACBuYW1lAAAAAAAAAcwAAAAgcG9zdAAAAAAAAAHsAAAAEAAEAAEAZAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAABAAMAAQAAAAwABAAgAAAABAAEAAEAAABB//8AAABB////wAABAAAAAAABAAAAAAAAAAAAAAAAMQAAAQAAAAAAAAAAAABfDzz1AAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAEAAgAAAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAIAAAAAQAAAAIAAQABAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAIAHgADAAEECQABAAAAAAADAAEECQACAAIAAAAAAAEAAAAAAAAAAAAAAAAAAA==", b.prototype.loaded = !1, b.prototype.onload = function() {}, b.prototype.onerror = function() {}, b.prototype.validate = function(a, b, c, d) {
	        if (d !== !1 && 0 > d) return void this.onerror("Requested system font '" + this.fontFamily + "' could not be loaded (it may not be installed).");
	        var e = document.defaultView.getComputedStyle(a, ""),
	            f = e.getPropertyValue("width").replace("px", "");
	        f > 0 ? (document.head.removeChild(b), document.body.removeChild(a), this.loaded = !0, this.onload()) : setTimeout(function() {
	            c.validate(a, b, c, d === !1 ? !1 : d - 50)
	        }, 10)
	    }, b.prototype.bootstrapValidation = function(a, b) {
	        var c = this.fontFamily + " testfont",
	            d = document.createElement("style");
	        d.setAttribute("type", "text/css"), d.innerHTML = "@font-face {\n font-family: '" + c + "';\n src: url('data:application/x-font-ttf;base64," + this.base64 + "')\n format('truetype');}", document.head.appendChild(d);
	        var e = document.createElement("p");
	        e.style.cssText = "position: absolute; top: -8192px; left: 0; opacity: 0;", e.style.fontFamily = "'" + this.fontFamily + "', '" + c + "'", e.innerHTML = a + a + a + a + a + a + a + a + a + a, document.body.appendChild(e);
	        var f = this,
	            g = function() {
	                f.validate(e, d, f, b)
	            };
	        setTimeout(g, 10)
	    }, b.prototype.loadFont = function() {
	        var a = this;
	        setTimeout(function() {
	            a.bootstrapValidation(a.printChar || "A", 2e3)
	        }, 10)
	    }, b.prototype.toString = function() {
	        return "[Font " + this.fontFamily + "]"
	    }, a.Font = b
	}(window);
	var LoaderSystem = function() {
	    Dispatcher.apply(this, arguments), this.queue = new Array, this.queueMap = new Object, this.numCurrentJobs = 0, this.cache = LoaderCache.getSharedInstance()
	};
	LoaderSystem.prototype = Object.create(Dispatcher.prototype), LoaderSystem.MAX_NUM_CONCURRENT_JOBS = 2, LoaderSystem.prototype.jobForPathOfClass = function(a, b) {
	    var c = this.cache.cachedJobForPath(a);
	    return c || (c = new b(a), this.cache.storeJob(c)), c
	}, LoaderSystem.prototype.enqueueJob = function(a) {
	    if (a.state == LoaderJob.STATE_DONE) a.dispatchEvent("complete");
	    else {
	        var b = a.path;
	        this.queueMap[b] || (this.queue.push(a), this.queueMap[b] = a, this.processQueue())
	    }
	}, LoaderSystem.prototype.processQueue = function() {
	    if (!this.processTimerHandle) {
	        var a = this,
	            b = this.processQueueHandler;
	        b || (b = this.processQueueHandler = function() {
	            a._processQueue()
	        }), this.processTimerHandle = window.setInterval(b, 1e3 / 30)
	    }
	}, LoaderSystem.prototype._processQueue = function() {
	    var a = this.queue;
	    if (!a.length) return window.clearInterval(this.processTimerHandle), void delete this.processTimerHandle;
	    var b, c;
	    for (b = a.length; b--;) c = a[b], c.priorityClosure && (c.priority = c.priorityClosure());
	    a.sort(function(a, b) {
	        return a.priority > b.priority ? -1 : a.priority < b.priority ? 1 : 0
	    });
	    var d = 0;
	    for (b = 0; b < a.length && d < LoaderSystem.MAX_NUM_CONCURRENT_JOBS; d++) {
	        if (c = a[b], c.state) {
	            if (c.state == LoaderJob.STATE_DONE) {
	                a.splice(b, 1);
	                continue
	            }
	        } else c.addListener("complete", this.finishJob, this), c.addListener("ioError", this.finishJob, this), LoaderSystem.ENABLE_LOG, this.numCurrentJobs++, c.load();
	        c == a[b] && b++
	    }
	    LoaderSystem.ENABLE_LOG;
	    for (var b = LoaderSystem.MAX_NUM_CONCURRENT_JOBS; b < a.length; b++) this.cancelJob(a[b])
	}, LoaderSystem.prototype.flushQueue = function() {
	    for (var a = this.queue; a.length;) this._processQueue()
	}, LoaderSystem.prototype.cancelJob = function(a) {
	    a.removeListener("complete", this.finishJob, this), a.removeListener("ioError", this.finishJob, this), a.state == LoaderJob.STATE_BUSY && a.cancel()
	}, LoaderSystem.prototype.finishJob = function(a) {
	    this.numCurrentJobs--, this.removeJob(a), LoaderSystem.ENABLE_LOG, this.dispatchEvent("progress"), this.numCurrentJobs || this.queue.length || this.dispatchEvent("complete")
	}, LoaderSystem.prototype.removeJob = function(a) {
	    delete this.queueMap[a.path], this.cancelJob(a);
	    for (var b = this.queue, c = b.length; c--;) b[c] === a && b.splice(c, 1)
	};
	var LoaderCache = function() {
	    Dispatcher.apply(this, arguments), this.items = new Array, this.itemMap = new Object
	};
	LoaderCache.prototype = Object.create(Dispatcher.prototype), LoaderCache.CAPACITY = 128, LoaderCache.accessCounter = 0, LoaderCache.prototype.storeJob = function(a) {
	    var b = a.path;
	    if (!this.itemMap[b]) {
	        a.addListener("destroy", this.destroyResult, this);
	        var c = {
	            job: a,
	            lastAccessCount: LoaderCache.accessCounter
	        };
	        this.items.push(c), this.itemMap[b] = c, this.flushWithLimit(LoaderCache.CAPACITY, 1)
	    }
	}, LoaderCache.prototype.flush = function() {
	    this.flushWithLimit(0, 0)
	}, LoaderCache.prototype.flushWithLimit = function(a, b) {
	    var c = this.items,
	        d = c.length;
	    if (d > a) {
	        c.sort(function(a, b) {
	            return a.lastAccessCount > b.lastAccessCount ? 1 : -1
	        });
	        for (var e = d; e-- > b && d > a;) {
	            var f = c[e];
	            if (f.job.retainCount > 1);
	            else {
	                var g = f.job;
	                delete this.itemMap[g.path], this.items.splice(e, 1), d--
	            }
	        }
	    }
	}, LoaderCache.prototype.destroyResult = function(a) {
	    delete this.itemMap[a.path];
	    for (var b = this.items, c = b.length; c--;) b[c].job === a && b.splice(c, 1)
	}, LoaderCache.prototype.cachedJobForPath = function(a) {
	    var b = this.itemMap[a];
	    return b ? (b.lastAccessCount = LoaderCache.accessCount++, b.job) : void 0
	};
	var LoaderJob = function(a) {
	    Dispatcher.apply(this, arguments), this.path = a, this.state = LoaderJob.STATE_IDLE, this.retainCount = 0
	};
	LoaderJob.prototype = Object.create(Dispatcher.prototype), LoaderJob.STATE_IDLE = 0, LoaderJob.STATE_BUSY = 1, LoaderJob.STATE_DONE = 2, LoaderJob.prototype.priority = 0, LoaderJob.prototype.load = function() {
	    if (this.state) throw new Error("cannot load " + this + ", state is " + state + " already.");
	    this.state = LoaderJob.STATE_BUSY
	}, LoaderJob.prototype.completeLoading = function() {
	    this.state = LoaderJob.STATE_DONE, this.dispatchEvent("complete")
	}, LoaderJob.prototype.cancel = function() {
	    if (this.state != LoaderJob.STATE_BUSY) throw new Error("cannot cancel " + this + ", state is " + state + ".");
	    this.state = LoaderJob.STATE_IDLE
	}, LoaderJob.prototype.retain = function() {
	    this.retainCount++
	}, LoaderJob.prototype.release = function() {
	    if (this.retainCount--, this.retainCount < 0) throw new Error("cannot release " + this + ", retain count is " + this.retainCount + ".");
	    this.retainCount || this.dispatchEvent("destroy")
	}, LoaderJob.prototype.toString = function() {
	    return "[LoaderJob " + this.path + "]"
	};
	var DataLoaderJob = function() {
	    LoaderJob.apply(this, arguments)
	};
	DataLoaderJob.prototype = Object.create(LoaderJob.prototype), DataLoaderJob.prototype.loadAsynchronously = !0, DataLoaderJob.prototype.method = "GET", DataLoaderJob.prototype.load = function() {
	    if (LoaderJob.prototype.load.apply(this, arguments), !window.XMLHttpRequest)
	        for (var a = ["Microsoft.XMLHTTP", "Msxml2.XMLHTTP", "Msxml2.XMLHTTP.4.0"], b = a.length; b--;) try {
	            new ActiveXObject(a[b]), window.XMLHttpRequest = function() {
	                return new ActiveXObject(a[b])
	            };
	            break
	        } catch (c) {}
	    var d = this.request = new XMLHttpRequest,
	        e = this;
	    d.onreadystatechange = function() {
	        e.onStateChange()
	    };
	    try {
	        if (d.overrideMimeType) {
	            var f = this.dataMimeType;
	            f && d.overrideMimeType(f)
	        }
	        d.open(this.method, this.path, this.loadAsynchronously);
	        var g = null,
	            h = this.parameters || null;
	        if (h) {
	            d.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), g = "";
	            for (var i in h) g.length && (g += "&"), g += encodeURIComponent(i) + "=" + encodeURIComponent(h[i])
	        }
	        this.willSendRequest = !0, d.send(g), this.willSendRequest = !1
	    } catch (j) {
	        this.dispatchEvent("ioError")
	    }
	}, DataLoaderJob.prototype.returnResponseText = !0, DataLoaderJob.prototype.onStateChange = function() {
	    var a = this.request;
	    if (!this.willSendRequest && 4 == a.readyState)
	        if (a.status && 200 != a.status) this.dispatchEvent("ioError");
	        else {
	            var b = this.data = this.returnResponseText ? a.responseText : a.responseXML;
	            this.completeLoading(b)
	        }
	};
	var JSONLoaderJob = function() {
	    DataLoaderJob.apply(this, arguments)
	};
	JSONLoaderJob.prototype = Object.create(DataLoaderJob.prototype), JSONLoaderJob.prototype.dataMimeType = "application/json", JSONLoaderJob.prototype.completeLoading = function(a) {
	    try {
	        this.data = JSON.parse(a)
	    } catch (b) {}
	    LoaderJob.prototype.completeLoading.apply(this, arguments)
	};
	var AnimationTimer = function() {
	    Dispatcher.apply(this)
	};
	AnimationTimer.prototype = Object.create(Dispatcher.prototype), AnimationTimer.prototype.addListener = function(a) {
	    var b = this.events[a],
	        c = b ? b.length : 0;
	    Dispatcher.prototype.addListener.apply(this, arguments), c || "fire" != a || 1 != this.events[a].length || this.start()
	}, AnimationTimer.prototype.removeListener = function(a) {
	    this.events[a] && (Dispatcher.prototype.removeListener.apply(this, arguments), "fire" != a || this.events[a] || this.stop())
	}, AnimationTimer.prototype.start = function() {
	    var a = this,
	        b = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
	    if (b) {
	        var c = this.processAnimationFrame = function() {
	            a.fire(), b(a.processAnimationFrame)
	        };
	        b(c)
	    } else this.renderTimer = window.setInterval(function() {
	        a.fire()
	    }, 1e3 / 60)
	}, AnimationTimer.prototype.fire = function() {
	    this.dispatchEvent("preFire"), this.dispatchEvent("fire")
	}, AnimationTimer.prototype.stop = function() {
	    this.processAnimationFrame ? this.processAnimationFrame = function() {} : this.renderTimer && (window.clearInterval(this.renderTimer), delete this.renderTimer)
	};
	var RenderContext = function() {
	    Dispatcher.apply(this), this.animationTimer = AnimationTimer.getSharedInstance();
	    var a = this.resizeDispatcher = RenderContext.resizeDispatcher;
	    a || (a = this.resizeDispatcher = RenderContext.resizeDispatcher = new RenderContext.ResizeDispatcher, window.addEventListener("resize", function(b) {
	        a.currentEvent = b, a.resizeContext()
	    }, !1), window.addEventListener("scroll", function(b) {
	        a.currentEvent = b, a.scrollContext()
	    })), a.addListener("resize", function() {
	        this.dispatchEvent("resize")
	    }, this), a.addListener("postResize", function() {
	        this.dispatchEvent("postResize")
	    }, this)
	};
	RenderContext.prototype = Object.create(Dispatcher.prototype), RenderContext.fromElement = function(a) {
	    var b = new RenderContext;
	    return b.setUpWithElement(a), b
	}, RenderContext.prototype.setUpWithElement = function(a) {
	    this.rootElement = a
	}, RenderContext.prototype.getWindowSize = function() {
	    return [Math.max(0, this.rootElement.offsetWidth), Math.max(0, this.rootElement.offsetHeight)]
	}, RenderContext.getViewportSize = function() {
	    return [Math.max(0, Math.max(document.documentElement.clientWidth, window.innerWidth || 0)), Math.max(0, Math.max(document.documentElement.clientHeight, window.innerHeight || 0))]
	}, RenderContext.prototype.getViewportSize = function() {
	    return RenderContext.getViewportSize()
	}, RenderContext.getDocumentSize = function() {
	    var a = document.body,
	        b = document.documentElement;
	    return [Math.max(a.scrollWidth, a.offsetWidth, b.clientWidth, b.scrollWidth, b.offsetWidth), Math.max(a.scrollHeight, a.offsetHeight, b.clientHeight, b.scrollHeight, b.offsetHeight)]
	}, RenderContext.getScrollOffset = function() {
	    return document.all ? [document.documentElement.scrollLeft || document.body.scrollLeft, document.documentElement.scrollTop || document.body.scrollTop] : [window.pageXOffset, window.pageYOffset]
	}, RenderContext.ResizeDispatcher = function() {
	    Dispatcher.apply(this, arguments)
	}, RenderContext.ResizeDispatcher.prototype = Object.create(Dispatcher.prototype), RenderContext.ResizeDispatcher.prototype.resizeContext = function() {
	    this.updateModeForViewSize(), this.dispatchEvent("preResize"), this.dispatchEvent("resize"), this.dispatchEvent("postResize")
	}, RenderContext.ResizeDispatcher.prototype.scrollContext = function() {
	    this.dispatchEvent("scroll")
	}, RenderContext.ResizeDispatcher.prototype.takeModeList = function(a) {
	    this.modeList = a, this.resizeContext()
	}, RenderContext.ResizeDispatcher.prototype.updateModeForViewSize = function() {
	    var a = this.modeList;
	    if (a) {
	        for (var b = RenderContext.getViewportSize(), c = b[0], d = a.length; d--;) {
	            var e = a[d];
	            if (c >= e.width) break
	        }
	        var f = this.mode;
	        if (f != e) {
	            this.mode = e;
	            var g = e.className;
	            this.className != g && (document.body.className = g, this.className = g), this.dispatchEvent("toggleMode")
	        }
	    }
	}, RenderContext.ResizeDispatcher.prototype.setBodyClass = function(a, b) {
	    if (!IS_TOUCH_DEVICE) {
	        var c = this.bodyClasses;
	        if (c || (c = this.bodyClasses = new Array), a || (a = ""), isNaN(b) && (b = 1), c[b] != a) {
	            c[b] = a;
	            for (var d = "", e = 0; e < c.length; e++) {
	                var f = c[e];
	                if (f) {
	                    d = f;
	                    break
	                }
	            }
	            this.bodyClassName = d, document.body.className = d + (this.className ? " " + this.className : "")
	        }
	    }
	};
	var Animatable = function() {
	    this.states = new Object, this.runLoopHandlers = new Array
	};
	Animatable.addRunLoopHandler = function(a) {
	    var b = this[a];
	    if (b && b instanceof Function) {
	        var c = this.runLoopHandlers;
	        c.indexOf(a) >= 0 || (c.push(a), this.context.addListener("enterFrame", this.runLoop, this))
	    }
	}, Animatable.removeRunLoopHandler = function(a) {
	    var b = this.runLoopHandlers,
	        c = b.indexOf(a);
	    c >= 0 && b.splice(c, 1), b.length || this.context.removeListener("enterFrame", this.runLoop, this)
	}, Animatable.runLoop = function() {
	    for (var a = this.runLoopHandlers, b = a.length; b--;) {
	        var c = a[b];
	        c && this[c]()
	    }
	}, Animatable.startAnimation = function(a, b) {
	    var c = this.states[a];
	    c || (c = new Object, this.states[a] = c);
	    for (var d in b) c[d] = b[d];
	    if (c.phase || (c.phase = 0), c.rate || (c.rate = .05), !(c.direction <= 0 && 0 == c.phase || c.direction > 0 && 1 == c.phase)) {
	        var e = "animate" + a;
	        this.addRunLoopHandler(e), this[e]()
	    }
	}, Animatable.stopAnimation = function(a) {
	    var b = this.states[a],
	        c = "animate" + a;
	    if (b) {
	        var d = b.direction > 0 ? 1 : 0;
	        b.phase != d && (b.phase = d, this.dispatchEvent("complete" + a), this[c]())
	    }
	    this.removeRunLoopHandler(c)
	}, Animatable.updatedState = function(a) {
	    var b = this.states[a],
	        c = b.direction > 0 ? Math.min(1, b.phase + b.rate) : Math.max(0, b.phase - b.rate);
	    return b.phase = c, (0 == c || 1 == c) && (this.removeRunLoopHandler("animate" + a), this.dispatchEvent("complete" + a)), b
	};
	var Sprite = function(a) {
	    if (Dispatcher.apply(this), !a) throw new Error("sprite needs a context to be created in.");
	    this.context = a;
	    var b = this.element = document.createElement("div");
	    b.className = "sprite", this.children = new Array, this.setPosition([0, 0]), this.setCenter([0, 0]), this.setSize([0, 0]), this.setScale([1, 1]), this.setAlpha(1)
	};
	Sprite.prototype = Object.create(Dispatcher.prototype), Sprite.prototype.setPosition = function(a, b) {
	    if (1 == arguments.length) this.position = a.concat();
	    else {
	        var c = this.position;
	        c[0] = a, c[1] = b
	    }
	    this.needsRepositioning = !0, this.setNeedsRedraw()
	}, Sprite.prototype.setCenter = function(a, b) {
	    if (1 == arguments.length) this.center = a.concat();
	    else {
	        var c = this.center;
	        c[0] = a, c[1] = b
	    }
	    this.needsRepositioning = !0, this.setNeedsRedraw()
	}, Sprite.prototype.setScale = function(a, b) {
	    if (1 == arguments.length) this.scale = "number" != typeof a ? a.concat() : [a, a];
	    else {
	        var c = this.scale;
	        c[0] = a, c[1] = b
	    }
	    this.needsRepositioning = !0, this.setNeedsRedraw()
	}, Sprite.prototype.setRotation = function(a) {
	    this.rotation != a && (this.rotation = a, this.needsRepositioning = !0, this.setNeedsRedraw())
	}, Sprite.prototype.setSize = function(a, b) {
	    if (1 == arguments.length) this.size = a.concat();
	    else {
	        var c = this.size;
	        c[0] = a, c[1] = b
	    }
	    this.needsResizing = !0, this.setNeedsRedraw()
	}, Sprite.prototype.setAlpha = function(a) {
	    a = Math.max(0, Math.min(1, a)), a = Math.round(1024 * a) / 1024, this.alpha != a && (this.alpha = a, this.setNeedsRedraw())
	}, Sprite.prototype.needsRedraw = !0, Sprite.prototype.setNeedsRedraw = function() {
	    this.needsRedraw || (this.needsRedraw = !0, this.parent && this.parent.setNeedsRedraw())
	}, Sprite.prototype.addChild = function(a) {
	    this.addChildAt(a, this.children.length)
	}, Sprite.prototype.addChildAt = function(a, b) {
	    a.parent && a.parent.removeChild(a);
	    var c = this.children;
	    b < c.length ? c.splice(b, 0, a) : c.push(a), a.parent = this, this.element.appendChild(a.element), this.needsSortChildren = !0, this.setNeedsRedraw()
	}, Sprite.prototype.attachSprite = function(a) {
	    var b = new(a || Sprite)(this.context);
	    return this.addChild(b), b
	}, Sprite.prototype.removeChild = function(a) {
	    var b = this.children.indexOf(a);
	    b >= 0 && this.removeChildAt(b)
	}, Sprite.prototype.removeChildAt = function(a) {
	    var b = this.children;
	    if (a < b.length) {
	        var c = b[a];
	        delete c.parent, delete c.stage, b.splice(a, 1), c.element.parentNode.removeChild(c.element), this.setNeedsRedraw()
	    }
	}, Sprite.prototype.renderInContext = function(a) {
	    this.needsRedraw = !1;
	    var b = this.element,
	        c = b.style,
	        d = Math.round(1024 * this.alpha);
	    if (this.lastAlpha != d) {
	        if (this.lastAlpha = d, 0 >= d) return void("none" != c.display && (c.display = "none"));
	        c.opacity = d / 1024, c.display && (c.display = "")
	    }
	    var a = this.context;
	    this.renderSelfInContext(a);
	    var e, f, g = this.children,
	        h = this.sortChildren;
	    if (h && this.needsSortChildren)
	        for (this.needsSortChildren = !1, h.call(this), f = g.length; f--;) {
	            e = g[f];
	            var i = e.element.style;
	            i.zIndex != f + 1 && (i.zIndex = f + 1)
	        }
	    for (f = g.length; f--;) e = g[f], e.needsRedraw && e.renderInContext(a)
	}, Sprite.prototype.sortChildren = null, Sprite.prototype.sortChildrenByZ = function() {
	    var a = this.children;
	    a.sort(function(a, b) {
	        return a.depth > b.depth ? 1 : -1
	    })
	}, Sprite.prototype.rotation = 0, Sprite.prototype.renderSelfInContext = function() {
	    function a(a, b, c) {
	        a[b] != c && (a[b] = c)
	    }

	    function b(b, c, d) {
	        d = Math.round(d * e) / e, a(b, c, d + "px")
	    }
	    var c = this.element,
	        d = c.style,
	        e = 8192;
	    if (this.needsResizing) {
	        this.needsResizing = !1;
	        var f = this.size,
	            g = this.texture;
	        if (f && g) {
	            var h = g.style;
	            f[0] ? b(h, "width", f[0]) : h.width = "", f[1] ? b(h, "height", f[1]) : h.height = ""
	        }
	    }
	    if (this.needsRepositioning) {
	        this.needsRepositioning = !1;
	        var i = this.position,
	            j = this.center,
	            k = this.scale,
	            l = this.rotation % (2 * Math.PI);
	        if (ENABLE_CSS_TRANSFORM && (this.renderUsingCSSTransform || 1 != k[0] || 1 != k[1] || l)) {
	            a(d, "left", ""), a(d, "top", "");
	            var e = 8192,
	                m = "translate(" + Math.round((i[0] - j[0]) * e) / e + "px, " + Math.round((i[1] - j[1]) * e) / e + "px) scale(" + Math.round(k[0] * e) / e + ", " + Math.round(k[1] * e) / e + ")" + (l ? " rotate(" + Math.round(l * e) / e + "rad)" : "");
	            this.renderAsLayer && (m += " translateZ(0)");
	            var n = Math.round(j[0] * e) / e + "px " + Math.round(j[1] * e) / e + "px";
	            a(d, VENDOR_PREFIX + "TransformOrigin", n), a(d, VENDOR_PREFIX + "Transform", m), a(d, "transformOrigin", n), a(d, "transform", m)
	        } else {
	            if (b(d, "left", i[0] - j[0]), b(d, "top", i[1] - j[1]), this.loadTexture) {
	                var o = this.textureSize;
	                if (o) {
	                    var g = this.texture;
	                    g.style.width = Math.round(o[0] * k[0]) + "px", g.style.height = Math.round(o[1] * k[1]) + "px"
	                }
	            }
	            a(d, VENDOR_PREFIX + "Transform", ""), a(d, "transform", "")
	        }
	    }
	}, Sprite.prototype.getStage = function() {
	    return this.context.stage
	}, Sprite.supportedMouseEventMap = ["mousedown", "mousemove", "mouseup", "click", "dblclick", "mouseover", "mouseout", "touchstart", "touchmove", "touchcancel", "touchend"].toMap(), Sprite.touchEventSubstitues = {
	    mousedown: ["touchstart"],
	    mousemove: ["touchmove"],
	    mouseup: ["touchcancel", "touchend"]
	}, Sprite.prototype.addListener = function(a, b, c) {
	    var d = this.events[a],
	        e = d ? d.length : 0;
	    if (Dispatcher.prototype.addListener.apply(this, arguments), !e && Sprite.supportedMouseEventMap[a] && 1 == this.events[a].length) {
	        var f = this,
	            g = this.getMouseListenerTarget(a);
	        this.processMouseEventHandler || (this.processMouseEventHandler = function(a) {
	            a || (a = window.event);
	            var b;
	            switch (a.type) {
	                case "mouseover":
	                    b = a.relatedTarget || a.fromElement;
	                    break;
	                case "mouseout":
	                    b = a.relatedTarget || a.toElement
	            }
	            for (; b;) {
	                if (b == f.element) return;
	                b = b.parentNode
	            }
	            if (0 == a.type.indexOf("touch")) {
	                var c = a.touches.item(0);
	                c && (a.clientX = c.clientX, a.clientY = c.clientY)
	            }
	            f.dispatchMouseEvent(a)
	        }), g.addEventListener || augmentDOMEventDispatcher(g), g.addEventListener(a, this.processMouseEventHandler, !1)
	    }
	    if (IS_TOUCH_DEVICE) {
	        var h = Sprite.touchEventSubstitues[a];
	        if (h)
	            for (var i = h.length; i--;) this.addListener(h[i], b, c)
	    }
	}, Sprite.prototype.getMouseListenerTarget = function() {
	    return this.element
	}, Sprite.prototype.removeListener = function(a, b, c) {
	    if (this.events[a]) {
	        if (Dispatcher.prototype.removeListener.apply(this, arguments), Sprite.supportedMouseEventMap[a] && !this.events[a]) {
	            var d = this.getMouseListenerTarget(a);
	            d.removeEventListener(a, this.processMouseEventHandler, !1)
	        }
	        if (IS_TOUCH_DEVICE) {
	            var e = Sprite.touchEventSubstitues[a];
	            if (e)
	                for (var f = e.length; f--;) this.removeListener(e[f], b, c)
	        }
	    }
	}, Sprite.prototype.dispatchMouseEvent = function(a) {
	    this.currentEvent = a, this.dispatchEvent(a.type)
	}, Sprite.boundingRectForElement = function(a) {
	    var b = a.getBoundingClientRect();
	    return b = {
	        left: b.left + window.pageXOffset || document.documentElement.scrollLeft,
	        top: b.top + window.pageYOffset || document.documentElement.scrollTop,
	        width: b.width,
	        height: b.height
	    }
	}, Sprite.prototype.touchDescriptionForObject = function(a) {
	    var b = this.element.getBoundingClientRect(),
	        c = [a.clientX - b.left, a.clientY - b.top];
	    return c.time = (new Date).getTime(), c
	}, Sprite.prototype.toString = function() {
	    return this.name ? "[Sprite " + this.name + "]" : "[Sprite]"
	}, Sprite.colourStringForColour = function(a) {
	    if (Number(a) == a) {
	        var b = a.toString(16);
	        return "#" + "000000".substring(b.length) + b
	    }
	    return a
	};
	var AnimatableSprite = function() {
	    Sprite.apply(this, arguments), Animatable.apply(this)
	};
	AnimatableSprite.prototype = Object.create(Sprite.prototype), Animatable.extendConstructor(AnimatableSprite), AnimatableSprite.prototype.fadeIn = function(a, b) {
	    this.startAnimation("Fade", {
	        direction: 1,
	        rate: .05 * (a || 1),
	        phase: this.alpha,
	        delay: b
	    })
	}, AnimatableSprite.prototype.fadeOut = function(a, b) {
	    this.startAnimation("Fade", {
	        direction: -1,
	        rate: .05 * (a || 1),
	        phase: this.alpha,
	        delay: b
	    })
	}, AnimatableSprite.prototype.animateFade = function() {
	    var a = this.states.Fade;
	    return a.delay && a.delay-- ? void this.setAlpha(a.phase) : (a = this.updatedState("Fade"), void this.setAlpha(a.phase))
	};
	var TexturedSprite = function() {
	    AnimatableSprite.apply(this, arguments)
	};
	TexturedSprite.prototype = Object.create(AnimatableSprite.prototype), TexturedSprite.prototype.loadTexture = function(a) {
	    if (this.path != a) {
	        this.path = a;
	        var b = this.currentJob;
	        b && b.removeListener("complete", this.completeImage, this);
	        var c = LoaderSystem.getSharedInstance();
	        if (b = this.currentJob = c.jobForPathOfClass(a, ImageLoaderJob), !b.priorityClosure) {
	            var d = this.getStage();
	            b.priorityClosure = !this.priorityClosure && d && d.getDefaultLoadingPriority ? function() {
	                return d.getDefaultLoadingPriority()
	            } : this.priorityClosure
	        }
	        b.state != LoaderJob.STATE_DONE ? (b.addListener("complete", this.completeImage, this), c.enqueueJob(b)) : this.completeImage(b)
	    }
	}, TexturedSprite.prototype.completeImage = function(a) {
	    a.removeListener("complete", this.completeImage, this), delete this.currentJob;
	    var b = this.texture,
	        c = this.texture = a.image.cloneNode(!0),
	        d = this.textureSize = [Number(a.image.naturalWidth || a.image.width), Number(a.image.naturalHeight || a.image.height)];
	    d[0] || (document.body.appendChild(a.image), d = this.textureSize = [a.image.offsetWidth, a.image.offsetHeight], document.body.removeChild(a.image)), this.dontAssignTextureClass || (c.className = "sprite"), b ? TexturedSprite.copyStyles(b.style, c.style) : this.element.style.display = "none";
	    var e = this.element;
	    b && e.removeChild(b), e.childNodes.length ? e.insertBefore(c, e.childNodes[0]) : e.appendChild(c);
	    var f = this.size;
	    f[0] || (f[0] = d[0]), f[1] || (f[1] = d[1]);
	    var g = this.imageCenter;
	    g && this.setCenter(d[0] * g[0], d[1] * g[1]), this.isComplete = !0, this.needsResizing = !0, this.setNeedsRedraw(), this.dispatchEvent("complete")
	}, TexturedSprite.copyStyles = function(a, b) {
	    for (var c = a.length; c--;) b[a[c]] = a[a[c]]
	}, TexturedSprite.prototype.renderSelfInContext = function() {
	    if (this.isComplete) {
	        AnimatableSprite.prototype.renderSelfInContext.apply(this, arguments);
	        var a = this.element,
	            b = a.style,
	            c = this.texture,
	            d = (c.style, this.alpha);
	        return 0 >= d ? void("none" != b.display && (b.display = "none")) : void(b.display && (b.display = ""))
	    }
	};
	var ImageLoaderJob = function() {
	    LoaderJob.apply(this, arguments)
	};
	ImageLoaderJob.prototype = Object.create(LoaderJob.prototype), ImageLoaderJob.prototype.load = function() {
	    LoaderJob.prototype.load.apply(this, arguments);
	    var a = this.currentLoadingImage = new Image,
	        b = this;
	    a.addEventListener || augmentDOMEventDispatcher(a), a.addEventListener("load", function() {
	        b.completeLoading(a)
	    }, !1), a.addEventListener("error", function() {
	        b.completeLoading(a)
	    }, !1), a.src = this.path, a.complete && !this.image && this.completeLoading(a)
	}, ImageLoaderJob.prototype.completeLoading = function(a) {
	    delete this.currentLoadingImage, this.image = a, LoaderJob.prototype.completeLoading.apply(this, arguments)
	};
	var SolidSprite = function() {
	    AnimatableSprite.apply(this, arguments);
	    this.texture = this.element
	};
	SolidSprite.prototype = Object.create(AnimatableSprite.prototype), SolidSprite.prototype.isComplete = !0, SolidSprite.prototype.setColour = function(a) {
	    var b = Sprite.colourStringForColour(a),
	        c = this.texture.style;
	    c.backgroundColor != b && (c.backgroundColor = b)
	}, SolidSprite.prototype.loadTexture = TexturedSprite.prototype.loadTexture, SolidSprite.prototype.completeImage = function(a) {
	    var b = this.texture;
	    a.removeListener("complete", this.completeImage, this), delete this.currentJob, b.style.backgroundImage = "url(" + this.path + ")"
	};
	var CroppingSprite = function() {
	    TexturedSprite.apply(this, arguments);
	    var a = this.texture = this.element;
	    a.style.overflow = "hidden"
	};
	CroppingSprite.prototype = Object.create(SolidSprite.prototype);
	var ContainerSprite = function() {
	    AnimatableSprite.apply(this, arguments)
	};
	ContainerSprite.prototype = Object.create(AnimatableSprite.prototype), ContainerSprite.prototype.takeOverElement = function(a, b) {
	    this.texture = a, a.className += " sprite", this.estimateTextureSize(b), this.element.style.display = "none", this.element.style.top = "-16384px", this.element.style.left = "-16384px", this.element.appendChild(a), this.isComplete = !0
	}, Sprite.prototype.estimateTextureSize = function(a) {
	    var b = this.texture,
	        c = b.parentNode,
	        d = this.textureSize;
	    if (!d && (d = this.textureSize = [b.clientWidth, b.clientHeight], !d[0] || !d[1])) {
	        var e;
	        if (a && (e = b.className, b.className += " " + a), b.style.display = "block", document.body.appendChild(b), this.textureSize = [b.clientWidth, b.clientHeight], "break" == this.name) throw new Error("break.");
	        a && (b.className = e)
	    }
	    c && c.appendChild(b)
	}, Sprite.prototype.reestimateTextureSize = function(a) {
	    var b = this.texture,
	        c = this.size;
	    b.style.width = isNaN(c[0]) ? "" : c[0] + "px", b.style.height = isNaN(c[1]) ? "" : c[1] + "px", delete this.textureSize, this.estimateTextureSize(a)
	}, ContainerSprite.prototype.listenForToggling = function() {
	    this.getStage().addListener("toggleMode", this.reestimateTextureSize, this)
	};
	var Label = function() {
	    AnimatableSprite.apply(this, arguments);
	    var a = this.texture = this.element;
	    a.className += " textbox", a.style.display = "none"
	};
	Label.prototype = Object.create(AnimatableSprite.prototype), Label.prototype.fixedTextureScale = !0, Label.prototype.takeDescription = function(a) {
	    this.takeDescriptions([a])
	}, Label.prototype.takeDescriptionApplyingWordWrap = function(a) {
	    var b = a.labelText;
	    if (b.indexOf("\n") < 0) this.takeDescription(a);
	    else {
	        for (var c = new Array, d = b.split("\n"), e = 0; e < d.length; e++) c.push({
	            elementNames: a.elementNames,
	            className: a.className,
	            labelText: d[e]
	        });
	        this.takeDescriptions(c)
	    }
	}, Label.prototype.takeDescriptions = function(a, b, c) {
	    this.descriptions = a;
	    for (var d = this.texture; !c && d.childNodes.length;) d.removeChild(d.firstChild);
	    b ? d.appendChild(b) : b = c = d;
	    for (var e = 0; e < a.length; e++) {
	        var f = a[e];
	        if (f) {
	            var g = document.createElement(f.elementName || "div");
	            g.className = f.className;
	            for (var h = f.labelText.split("\n"), i = 0; i < h.length; i++) {
	                i && g.appendChild(document.createElement("br"));
	                var j = document.createTextNode(h[i]);
	                g.appendChild(j)
	            }
	            c.appendChild(g)
	        }
	    }
	    this.isComplete = !0
	}, Label.prototype.estimateTextureSize = function() {
	    var a = this.element,
	        b = this.texture,
	        c = a.style.display;
	    a.style.display = "";
	    var d = a.parentNode;
	    document.body.appendChild(a);
	    this.textureSize = [b.offsetWidth, b.offsetHeight];
	    d ? d.appendChild(a) : document.body.removeChild(a), a.style.display = c
	};
	var Button = function() {
	    AnimatableSprite.apply(this, arguments), this.element.className += " button", this.setState(Button.STATE_NONE), IS_TOUCH_DEVICE || this.addListener("mousedown", this.mouseDownButton, this)
	};
	Button.STATE_NONE = 0, Button.STATE_HOVERED = 1, Button.STATE_PRESSED = 2, Button.STATE_ACTIVE = 4, Button.prototype = Object.create(AnimatableSprite.prototype), Button.prototype.state = Button.STATE_NONE, Button.prototype.setState = function(a, b) {
	    this.state = b ? this.state | a : this.state & ~a
	}, Button.prototype.takeDescription = function(a) {
	    if (this.description = a, a.imagePath) {
	        var b = this.image = this.attachSprite(TexturedSprite);
	        b.loadTexture(a.imagePath)
	    }
	}, Button.prototype.mouseDownButton = function(a) {
	    stopEventPropagation(a.currentEvent), cancelEvent(a.currentEvent)
	};
	var Stage = function(a) {
	    AnimatableSprite.apply(this, arguments), a.stage = this, this.element = a.rootElement, this.shouldAutoResize && this.resizeContext(a), a.addListener("resize", this.resizeContext, this), this.ticks = 0, this.shouldAutoAwake && this.awake()
	};
	Stage.prototype = Object.create(AnimatableSprite.prototype), Stage.id = 0, Stage.fromElement = function(a) {
	    a.className += " sprite", a.style.left = a.style.top = "0px";
	    var b = RenderContext.fromElement(a),
	        c = new this(b);
	    return c
	}, Stage.prototype.shouldAutoAwake = !0, Stage.prototype.shouldAutoResize = !0, Stage.prototype.awake = function() {
	    this.isAwake || (this.isAwake = !0, this.startRenderLoop())
	}, Stage.prototype.sleep = function() {
	    this.isAwake && (this.isAwake = !1, this.stopRenderLoop())
	}, Stage.prototype.resizeContext = function(a) {
	    var b = a.getWindowSize();
	    this.size = b, this.dispatchEvent("resize")
	}, Stage.prototype.startRenderLoop = function() {
	    var a = this.context.animationTimer;
	    a.addListener("fire", this.renderNextFrame, this)
	}, Stage.prototype.stopRenderLoop = function() {
	    var a = this.context.animationTimer;
	    a.removeListener("fire", this.renderNextFrame, this)
	}, Stage.prototype.renderNextFrame = function() {
	    this.ticks += 1, this.context.dispatchEvent("enterFrame");
	    try {
	        if (this.needsRedraw) {
	            var a = this.context;
	            a.renderMode = RenderContext.RENDER_MODE_DISPLAY, this.renderInContext(a), "" != this.element.style.display && (this.element.style.display = "")
	        }
	    } catch (b) {
	        throw this.stopRenderLoop(), b
	    }
	}, Stage.prototype.getMouseListenerTarget = function() {
	    return window
	};
	var FontLoaderJob = function() {
	    LoaderJob.apply(this, arguments)
	};
	FontLoaderJob.prototype = Object.create(LoaderJob.prototype), FontLoaderJob.prototype.load = function() {
	    LoaderJob.prototype.load.apply(this, arguments);
	    var a = new Font(this.path);
	    a.printChar = this.testCharacter;
	    var b = this;
	    a.onload = function() {
	        b.fontComplete(a)
	    }, a.onerror = function() {
	        b.fontComplete(a)
	    }, a.loadFont()
	}, FontLoaderJob.prototype.fontComplete = function(a) {
	    this.data = this.font = a, delete a.onload, delete a.onerror, this.completeLoading(a)
	};
	var IconSprite = function() {
	    AnimatableSprite.apply(this, arguments), this.element.className += " button", this.addListener("mousedown", this.mouseDown, this)
	};
	IconSprite.STATE_HOVERED = Button.STATE_HOVERED, IconSprite.STATE_ACTIVE = 2, IconSprite.STATE_OPEN = 4, IconSprite.STATE_NEGATIVE = 8, IconSprite.prototype = Object.create(AnimatableSprite.prototype), IconSprite.prototype.mouseDown = function(a) {
	    var b = a.currentEvent;
	    b.preventDefault()
	}, IconSprite.prototype.setTextureSize = function(a) {
	    this.textureSize = a;
	    var b = this.indicators;
	    if (b) {
	        for (var c = b.length; c--;) {
	            var d = b[c];
	            d.textureSize = a, d.setSize(a)
	        }
	        var e = this.hover;
	        if (e) {
	            var f = 8;
	            e.setPosition(-f, -f), e.setSize(a[0] + 2 * f, a[1] + 2 * f)
	        }
	    }
	}, IconSprite.prototype.takeDescription = function(a) {
	    this.description = a;
	    var b = this.name = a.imageName,
	        c = this.fileType = a.imageFileType,
	        d = (this.imageContainer = this.attachSprite(AnimatableSprite), this.indicators = new Array),
	        e = a.textures || [""];
	    this.imagesToComplete = 1;
	    for (var f = e.length; f--;) {
	        var g = e[f],
	            h = new TexturedSprite(this.context);
	        h.element.className += " shape", h.addListener("complete", this.completeImage, this), h.priorityClosure = function(a) {
	            return function() {
	                return a.parent ? 1024 : 16
	            }
	        }(h), h.loadTexture(BASE_PATH + b + (g ? g : "") + (c ? "." + c : ".png")), d.unshift(h)
	    }
	    var i = a.label;
	    if (i) {
	        var j = this.label = this.attachSprite(Label);
	        j.takeDescription(i)
	    }
	    this.setState(0, !1)
	}, IconSprite.prototype.makeHoverable = function() {
	    IS_TOUCH_DEVICE || (this.addListener("mouseover", function() {
	        this.setState(Button.STATE_HOVERED, !0)
	    }, this), this.addListener("mouseout", function() {
	        this.setState(Button.STATE_HOVERED, !1)
	    }, this))
	}, IconSprite.prototype.completeImage = function(a) {
	    var b = this.textureSize;
	    if (b) {
	        a.setSize(b);
	        var c = this.hover = this.attachSprite(SolidSprite);
	        c.element.style.zIndex = 32;
	        var d = 8;
	        c.setPosition(-d, -d), c.setSize(b[0] + 2 * d, b[1] + 2 * d)
	    } else {
	        var b = a.textureSize;
	        a.setSize(b.width / 2, b.height / 2)
	    }--this.imagesToComplete || this.dispatchEvent("complete")
	}, IconSprite.prototype.setState = function() {
	    var a = this.state;
	    Button.prototype.setState.apply(this, arguments), this.state != a && this.addRunLoopHandler("deferredSetState")
	}, IconSprite.prototype.deferredSetState = function() {
	    this.removeRunLoopHandler("deferredSetState");
	    var a = this.indicators;
	    if (a) {
	        for (var b = this.imageContainer, c = this.state, d = c, e = a.length; e--;) e != d && b.removeChild(a[e]);
	        var f = a[Math.min(a.length - 1, d)];
	        b.addChild(f)
	    }
	}, TexturedSprite.prototype.fitInSize = function(a, b) {
	    var c = this.textureSize;
	    if (c) {
	        var d = Math.max(a[0] / c[0], a[1] / c[1]);
	        this.setScale(d), this.setPosition([((-a[0] + c[0] * d) * (.5 - b[0]) + (a[0] - c[0] * d) * (.5 + b[0])) / 2, ((-a[1] + c[1] * d) * (.5 - b[1]) + (a[1] - c[1] * d) * (.5 + b[1])) / 2])
	    }
	};
	var ScrollingController = function(a) {
	    Dispatcher.apply(this, arguments), Animatable.apply(this, arguments), this.context = a
	};
	ScrollingController.prototype = Object.create(Dispatcher.prototype), Animatable.extendConstructor(ScrollingController), ScrollingController.prototype.getMouseListenerTarget = function() {
	    return window
	}, ScrollingController.prototype.disableMouseWheel = !0, ScrollingController.prototype.awake = function() {
	    if (!this.isAwake) {
	        this.isAwake = !0;
	        var a = this,
	            b = this.getMouseListenerTarget();
	        b.addEventListener || augmentDOMEventDispatcher(b), this.processMouseWheelEventHandler || (this.processMouseWheelEventHandler = function(b) {
	            a.processMouseWheel(b || window.event)
	        }), IS_TOUCH_DEVICE || !window.addWheelListener || this.disableMouseWheel || addWheelListener(b, this.processMouseWheelEventHandler, !1), this.processTouchStartEventHandler || (this.processTouchStartEventHandler = function(b) {
	            a.processTouchStart(b || window.event)
	        }), IS_TOUCH_DEVICE ? b.addEventListener("touchstart", this.processTouchStartEventHandler, !1) : b.addEventListener("mousedown", this.processTouchStartEventHandler, !1), this.processTouchMoveEventHandler || (this.processTouchMoveEventHandler = function(b) {
	            a.processTouchMove(b || window.event)
	        }), this.processTouchEndEventHandler || (this.processTouchEndEventHandler = function(b) {
	            a.processTouchEnd(b || window.event)
	        });
	        var c = this.trackingTarget = IS_IE ? document : window;
	        c.addEventListener || augmentDOMEventDispatcher(c)
	    }
	}, ScrollingController.prototype.sleep = function() {
	    if (this.isAwake) {
	        this.isAwake = !1;
	        var a = this.getMouseListenerTarget();
	        !IS_TOUCH_DEVICE && window.removeWheelListener && removeWheelListener(a, this.processMouseWheelEventHandler, !1), IS_TOUCH_DEVICE ? a.removeEventListener("touchstart", this.processTouchStartEventHandler, !1) : a.removeEventListener("mousedown", this.processTouchStartEventHandler, !1)
	    }
	}, ScrollingController.prototype.removeSuppressClickHandler = function() {
	    this.didSuppressClick = !1;
	    var a = this.getMouseListenerTarget();
	    a.removeEventListener("click", this.suppressClickHandler, !0)
	}, ScrollingController.TOUCH_MOVE_DIRECTION_HORIZONTAL = 0, ScrollingController.TOUCH_MOVE_DIRECTION_VERTICAL = 1, ScrollingController.prototype.defaultTouchDirectionLock = ScrollingController.TOUCH_MOVE_DIRECTION_HORIZONTAL, ScrollingController.prototype.processTouchStart = function(a) {
	    if (this.showHand(!0), IS_IE || !a.button) {
	        var b = ScrollingController.touchDescriptionForEvent(a);
	        if (!(b.y < 0)) {
	            delete this.touchDirectionLock;
	            var c = 0 == a.type.indexOf("touch");
	            if (c) {
	                var d = a.target;
	                d && "a" == a.target.nodeName.toLowerCase() || document.activeElement && document.activeElement.blur()
	            } else this.touchDirectionLock = this.defaultTouchDirectionLock;
	            this.isTouching = !0, this.startTouch = b, this.lastTouches = [b], this.didDrag = !1, this.didDragX = !1, this.didDragY = !1, this.setUpDragListeners(c, a), this.didSuppressClick && this.removeSuppressClickHandler(), this.currentEvent = a, this.dispatchEvent("beginDrag")
	        }
	    }
	}, ScrollingController.prototype.setUpDragListeners = function(a, b) {
	    a ? (window.addEventListener("touchmove", this.processTouchMoveEventHandler, !1), window.addEventListener("touchend", this.processTouchEndEventHandler, !1), window.addEventListener("touchcancel", this.processTouchEndEventHandler, !1)) : this.skipEventCancellation ? this.skipEventCancellation = !1 : (b && cancelEvent(b), document.activeElement && document.activeElement.blur(), this.trackingTarget.addEventListener("mousemove", this.processTouchMoveEventHandler, !1), this.trackingTarget.addEventListener("mouseup", this.processTouchEndEventHandler, !1))
	}, ScrollingController.prototype.processTouchMove = function(a) {
	    var b = 0 == a.type.indexOf("touch");
	    if (!b || this.isTouching) {
	        this.lastDragEvent = this.currentEvent = a;
	        var c = this.startTouch,
	            d = ScrollingController.touchDescriptionForEvent(a),
	            e = this.touchDirectionLock,
	            f = this.delta = {
	                x: c.x - d.x,
	                y: c.y - d.y
	            }, g = f.x * f.x + f.y * f.y;
	        if (g > 36 && (this.didDrag = !0), void 0 == e && g > 64) {
	            var h = (Math.atan2(f.y, f.x) + Math.PI / 2) % Math.PI;
	            0 > h && (h += Math.PI), e = this.touchDirectionLock = h > Math.PI / 4 && h < Math.PI / 4 * 3 ? ScrollingController.TOUCH_MOVE_DIRECTION_HORIZONTAL : ScrollingController.TOUCH_MOVE_DIRECTION_VERTICAL, this.dispatchEvent(e == ScrollingController.TOUCH_MOVE_DIRECTION_VERTICAL ? "cancelDragHorizontal" : "cancelDragVertical")
	        }!this.didDragX && Math.abs(f.x) >= 2 && (this.didDragX = !0), !this.didDragY && Math.abs(f.y) >= 2 && (this.didDragY = !0);
	        var i = this.lastTouches;
	        for (c = i[i.length - 1], f = {
	            x: c.x - d.x,
	            y: c.y - d.y
	        }, e != ScrollingController.TOUCH_MOVE_DIRECTION_HORIZONTAL && this.didDragY && f.y && this.dispatchEvent("dragVertical"), e != ScrollingController.TOUCH_MOVE_DIRECTION_VERTICAL && this.didDragX && f.x && this.dispatchEvent("dragHorizontal"), b && e == ScrollingController.TOUCH_MOVE_DIRECTION_HORIZONTAL && cancelEvent(a), i.push(d); i.length > 8;) i.shift();
	        if (!this.didSuppressClick && Math.abs(d.x - this.startTouch.x) > 4) {
	            this.didSuppressClick = !0;
	            var j = this.suppressClickHandler;
	            if (!j) {
	                var k = this;
	                j = this.suppressClickHandler = function(a) {
	                    a = a || window.event, stopEventPropagation(a), cancelEvent(a), k.removeSuppressClickHandler()
	                }
	            }
	            var l = this.getMouseListenerTarget();
	            l.addEventListener("click", j, !0)
	        }
	    }
	}, ScrollingController.prototype.processTouchEnd = function(a) {
	    this.showHand(!1);
	    var b = 0 == a.type.indexOf("touch");
	    if (!b || this.isTouching) {
	        if (this.didDrag && stopEventPropagation(a), this.isTouching = !1, a.type.indexOf("move") < 0) {
	            var c = this.touchDirectionLock,
	                d = this.lastTouches.concat();
	            for (this.didFlickVertical = !1; d.length > 1 && c != ScrollingController.TOUCH_MOVE_DIRECTION_HORIZONTAL;) {
	                var e = d[d.length - 2],
	                    f = d[d.length - 1],
	                    g = f.time - e.time,
	                    h = (e.y - f.y) / g * ScrollingController.FLICK_ACCELERATION_SCALE,
	                    i = (new Date).getTime() - f.time;
	                if (Math.abs(h) > 4 && g > 2.5 && 250 > i) {
	                    this.didFlickVertical = !0, this.flickDeltaY = h;
	                    break
	                }
	                d.splice(d.length - 2, 1)
	            }
	            for (this.didFlickHorizontal = !1, d = this.lastTouches; d.length > 1 && c != ScrollingController.TOUCH_MOVE_DIRECTION_VERTICAL;) {
	                var e = d[d.length - 2],
	                    f = d[d.length - 1],
	                    g = f.time - e.time,
	                    h = (e.x - f.x) / g * ScrollingController.FLICK_ACCELERATION_SCALE,
	                    i = (new Date).getTime() - f.time;
	                if (Math.abs(h) > 100 && g > 2.5 && 250 > i) {
	                    this.didFlickHorizontal = !0, this.flickDeltaX = h;
	                    break
	                }
	                d.splice(d.length - 2, 1)
	            }
	        }
	        this.removeTouchListeners(b), this.currentEvent = a, this.dispatchEvent("endDrag")
	    }
	}, ScrollingController.prototype.removeTouchListeners = function(a) {
	    a ? (window.removeEventListener("touchmove", this.processTouchMoveEventHandler, !1), window.removeEventListener("touchend", this.processTouchEndEventHandler, !1), window.removeEventListener("touchcancel", this.processTouchEndEventHandler, !1)) : (this.trackingTarget.removeEventListener("mousemove", this.processTouchMoveEventHandler, !1), this.trackingTarget.removeEventListener("mouseup", this.processTouchEndEventHandler, !1))
	}, ScrollingController.FLICK_ACCELERATION_SCALE = 200, ScrollingController.touchDescriptionForEvent = function(a) {
	    var b = 0 == a.type.indexOf("touch"),
	        c = {
	            time: (new Date).getTime()
	        };
	    if (b) {
	        var d = a.touches.item(0);
	        c.x = d.pageX, c.y = d.pageY
	    } else isNaN(a.pageX) ? (c.x = a.clientX, c.y = a.clientY) : (c.x = a.pageX, c.y = a.pageY);
	    return c
	}, ScrollingController.prototype.processMouseWheel = function(a) {
	    if (this.currentEvent = a.originalEvent, cancelEvent(a), !this.isTouching) {
	        var b = a.deltaX,
	            c = a.deltaY;
	        this.delta = {
	            x: 2 * b,
	            y: 2 * c
	        }, Math.abs(2 * c) > Math.abs(b) && (this.addRunLoopHandler("trackMouseWheelY"), this.dispatchEvent("scrollVertical")), this.mouseWheelTrackingDelayY = 45, Math.abs(c) > 4 ? this.mouseWheelTrackingDelayX = 0 : Math.abs(2 * c) <= Math.abs(b) && (this.mouseWheelTrackingDelayX = 45, Math.abs(b) > 4 && (this.mouseWheelTrackingDelayY = 0), this.addRunLoopHandler("trackMouseWheelX"), this.dispatchEvent("scrollHorizontal"))
	    }
	}, ScrollingController.prototype.trackMouseWheelX = function() {
	    this.mouseWheelTrackingDelayX-- || (this.removeRunLoopHandler("trackMouseWheelX"), this.dispatchEvent("cancelScrollHorizontal"))
	}, ScrollingController.prototype.trackMouseWheelY = function() {
	    this.mouseWheelTrackingDelayY-- || (this.removeRunLoopHandler("trackMouseWheelY"), this.dispatchEvent("cancelScrollVertical"))
	}, ScrollingController.prototype.showHand = function(a) {
	    var b = this.stage;
	    b && RenderContext.resizeDispatcher.setBodyClass(a ? "grab" : void 0)
	}, ScrollingController.prototype.transferControlTo = function(a) {
	    a.touchDirectionLock = this.touchDirectionLock, this.isTouching = !1, a.isTouching = !0, a.startTouch = this.startTouch, a.lastTouches = this.lastTouches, a.didDrag = this.didDrag, a.didDragX = this.didDragX, a.didDragY = this.didDragY;
	    var b = a.currentEvent = this.currentEvent;
	    a.dispatchEvent("beginDrag"), a.setUpDragListeners(0 == b.type.indexOf("touch"), b), a.delta = this.delta, a.didDragX && a.dispatchEvent("dragHorizontal"), a.didDragY && a.dispatchEvent("dragVertical"), this.removeTouchListeners(!1), this.removeTouchListeners(!0)
	};
	var SlidingSprite = function(a) {
	    var b = this.scrollingController = new ScrollingController(a),
	        c = this;
	    this.getListenerTargetForScrollingController && (b.getMouseListenerTarget = function(a) {
	        return c.getListenerTargetForScrollingController(a)
	    })
	};
	SlidingSprite.viewOffset = 0, SlidingSprite.currentViewOffset = 0, SlidingSprite.updateViewOffset = function() {}, SlidingSprite.boundedViewOffset = function(a) {
	    return Math.max(-250, Math.min(250, a))
	}, SlidingSprite.processSliding = function() {
	    var a = this.viewOffsetMap,
	        b = a ? a["default"] : this.currentViewOffset,
	        c = this.slidingInertia,
	        d = this.viewOffset * (1 - c) + b * (c - 1),
	        e = this.maxScrollSpeed;
	    if (!isNaN(e)) {
	        Math.abs(d) > e && (d = e * (d > 0 ? 1 : -1));
	        var f = this.accelerationDescription || {
	            maxSpeed: 75,
	            acceleration: 4
	        };
	        this.maxScrollSpeed = Math.min(f.maxSpeed, (e + f.acceleration) / 1.03)
	    }
	    b += d, a ? a["default"] = b : this.currentViewOffset = b;
	    var g, h = this.boundedViewOffset(this.viewOffset);
	    if (h != this.viewOffset && b != this.boundedViewOffset(b)) {
	        var i = .5;
	        this.slidingInertia = .85, this.viewOffset = h * (1 - i) + this.viewOffset * i, Math.abs(this.viewOffset - h) < .25 ? this.viewOffset = h : (g = !0, this.bumpLockDirection = this.viewOffset > this.boundedViewOffset(this.viewOffset) ? 1 : -1)
	    }
	    this.isBumping = g, g || (this.lockDragging && Math.abs(b - h) < 5 && (this.lockDragging = !1), Math.abs(b - h) < .25 && (b = this.viewOffset = h, a ? a["default"] = b : this.currentViewOffset = b), b == h && (this.removeRunLoopHandler("processSliding"), this.dispatchEvent("completeSliding"))), this.updateViewOffset()
	}, SlidingSprite.snapToBounds = function() {
	    var a = this.viewOffsetMap,
	        b = a ? a["default"] : this.currentViewOffset,
	        c = this.boundedViewOffset(this.viewOffset);
	    (this.viewOffset != c || b != c) && (this.slidingInertia = .85, this.viewOffset = c, this.addRunLoopHandler("processSliding"))
	}, SlidingSprite.beginDrag = function(a) {
	    var b = a.currentEvent;
	    stopEventPropagation(b), this.removeRunLoopHandler("processSliding");
	    var c = this.viewOffsetMap,
	        d = c ? c["default"] : this.currentViewOffset;
	    this.startViewOffset = this.viewOffset = d, this.bumpLockDirection = 0
	}, SlidingSprite.cancelDrag = function() {
	    this.snapToBounds()
	}, SlidingSprite.cancelScroll = function(a) {
	    this.bumpLockDirection = 0, a.isTouching || this.snapToBounds()
	}, SlidingSprite.releaseDrag = function() {
	    var a = this.scrollingController;
	    a.removeTouchListeners(!0), a.removeTouchListeners(!1), a.isTouching = !1, a.showHand(!1)
	};
	var ImageModel = function(a) {
	    if (this.index = ++ImageModel.index, a) {
	        var b = this.id = a.getAttribute("data-src"),
	            c = this.path = b,
	            d = c.split("/"),
	            e = d.pop();
	        if (d.length) {
	            {
	                this.basePath = d.join("/") + "/"
	            }
	            b = this.id = e, c = this.path = b
	        }
	        this.element = a; {
	            var f = this.elementIndex = parseFloat(a.getAttribute("data-index"));
	            this.size = [parseFloat(a.getAttribute("width")), parseFloat(a.getAttribute("height"))]
	        }
	        if (!this.colour) {
	            var g = ImageModel.colourMap;
	            g || (g = ImageModel.colourMap = new Object);
	            var h = g[f];
	            if (void 0 == h) {
	                var i = Math.floor(95 * Math.random() + 15);
	                h = g[f] = 65536 * Math.floor(0 * Math.random() + i) + 256 * Math.floor(0 * Math.random() + i) + 1 * Math.floor(0 * Math.random() + i)
	            }
	            this.colour = h
	        } {
	            this.cacheMap = new Array
	        }
	    }
	};
	ImageModel.list = new Array, ImageModel.map = new Object, ImageModel.index = 0, ImageModel.elementIndex = 0, ImageModel.prototype = Object.create(Object.prototype), ImageModel.prototype.clone = function() {
	    var a = new ImageModel;
	    return a.id = this.id, a.element = this.element, a.elementIndex = this.elementIndex, a.basePath = this.basePath, a.path = this.path, a.size = this.size, a.colour = this.colour, a.cacheMap = this.cacheMap, a
	}, ImageModel.prototype.toString = function() {
	    return "[ImageModel " + this.id + "/" + this.elementIndex + "]"
	}, ImageModel.prototype.filePathForVersion = function(a, b) {
	    var c = window.IS_ONLINE && !b ? "img.php?file=" + encodeURIComponent(a + "/" + this.path) : BASE_PATH + ImageModel.BASE_PATH + a + "/" + this.path;
	    return c
	}, ImageModel.prototype.filePathForThumb = function() {
	    return this.filePathForVersion("thumbs_480")
	}, ImageModel.prototype.filePathForFullsize = function() {
	    return this.filePathForVersion("fullsize")
	}, ImageModel.forId = function(a) {
	    return this.map[a]
	}, ImageModel.forElement = function(a) {
	    var b = parseFloat(a.getAttribute("data-index"));
	    b || (b = ++ImageModel.elementIndex, a.setAttribute("data-index", b));
	    var c = this.forId(b);
	    return c || (c = new ImageModel(a), this.list.push(c), this.map[b] = c), c
	}, ImageModel.shuffle = function(a) {
	    for (var b = 0; b < a.length - 1; b++) {
	        var c = Math.floor(Math.random() * (a.length - b)) + b;
	        if (c != b) {
	            var d = a[c];
	            a[c] = a[b], a[b] = d
	        }
	    }
	}, ImageModel.fillUpList = function(a, b) {
	    if (!a.length) throw new Error("cannot fill up list.");
	    b || (b = 30);
	    for (var c = a.length; a.length < b;)
	        for (var d = 0; c > d; d++) a.push(a[d].clone())
	}, ImageModel.shuffledListForCategory = function(a) {
	    if (!a) return this.shuffledList;
	    var b = this.shuffledListMap;
	    b || (b = this.shuffledListMap = new Object);
	    var c = a.id,
	        d = b[c];
	    if (!d) {
	        var e = this.list;
	        d = new Array;
	        for (var f = e.length; f--;) {
	            var g = e[f];
	            g.containsCategory(a) && d.push(g)
	        }
	        if (!d.length) throw new Error("no items for category " + a + ".");
	        b[c] = d
	    }
	    return d
	}, ImageModel.traceList = function(a) {
	    for (var b, c = 0; c < a.length; c++) {
	        var d = a[c];
	        b ? b += ", " : b = "", b += d.index + "/" + d.id
	    }
	}, ImageModel.indexOf = function(a, b) {
	    var c = a.id;
	    b = b || this.list;
	    for (var d = 0; d < b.length; d++) {
	        var a = b[d];
	        if (a.id == c) return d
	    }
	    return -1
	};
	var GalleryController = function() {
	    Stage.apply(this, arguments);
	    var a = this.element;
	    this.texture = a, this.buildFromElement(a), this.addListener("resize", this.resize, this), this.resize(), this.setMode(this.rowContainer && this.behaviour == GalleryController.BEHAVIOUR_DESKTOP ? GalleryController.MODE_OVERVIEW : GalleryController.MODE_DETAIL)
	};
	GalleryController.BEHAVIOUR_MOBILE = "mobile", GalleryController.BEHAVIOUR_DESKTOP = "desktop", GalleryController.MODE_OVERVIEW = "overview", GalleryController.MODE_DETAIL = "detail", GalleryController.prototype = Object.create(Stage.prototype), GalleryController.prototype.shouldAutoResize = !1, GalleryController.progressBarOuterOffset = 20, GalleryController.prototype.buildFromElement = function(a) {
	    GalleryController.allowTextSelection = "yes" == a.getAttribute("data-allow-text-selection"), GalleryController.progressBarPlacement = "outside" == a.getAttribute("data-progress-bar-position") ? "outside" : "inside", GalleryController.alwaysShowProgressBar = "always" == a.getAttribute("data-show-progress-bar"), GalleryController.slideConstructor = window[a.getAttribute("data-slide-class-name") || "GallerySlide"];
	    var b = a.querySelectorAll ? a.querySelectorAll(".gallery-row") : jQuery(a).find(".gallery-row");
	    if (b.length) {
	        var c = this.rowContainer = this.attachSprite(GalleryRowContainer);
	        c.takeRowElements(b), c.addListener("select", this.selectRowContainer, this)
	    }
	    var d = a.querySelectorAll ? a.querySelectorAll(".gallery-slide") : jQuery(a).find(".gallery-slide"),
	        e = this.slideContainer = this.attachSprite(GallerySlideContainer);
	    e.takeSlideElements(d), e.addListener("close", this.closeSlideContainer, this), c ? e.setAlpha(0) : e.closeButton.setAlpha(0)
	}, GalleryController.prototype.resize = function(a) {
	    var b = this.context,
	        c = this.element,
	        d = c.style,
	        e = d.width,
	        f = d.height;
	    d.width = "", d.height = "";
	    var g = b.getViewportSize(),
	        h = b.getWindowSize(),
	        i = this.viewSize,
	        j = this.viewSize = [h[0], h[1]];
	    if (j[0] < 960 && (j[1] = Math.max(220, j[0] / 2.3)), i && i[0] == j[0] && i[1] == j[1]) return d.width = e, void(d.height = f);
	    this.viewSize = j, this.setBehaviour(g[0] >= 960 ? GalleryController.BEHAVIOUR_DESKTOP : GalleryController.BEHAVIOUR_MOBILE);
	    var k = this.rowContainer;
	    k && k.setViewSize(j);
	    var l = this.slideContainer;
	    l.setViewSize(this.behaviour == GalleryController.BEHAVIOUR_DESKTOP || "inside" == GalleryController.progressBarPlacement ? j : [j[0], j[1] - GalleryController.progressBarOuterOffset]), l.needsUpdateLayout && l.updateLayout();
	    var m = this.element.parentElement;
	    m.style.height = l.maxHeight + "px", a && this.renderInContext(this.context)
	}, GalleryController.prototype.setBehaviour = function(a) {
	    if (a != this.behaviour) {
	        this.behaviour = a;
	        var b = this.rowContainer,
	            c = this.slideContainer,
	            d = c.progressBar;
	        a == GalleryController.BEHAVIOUR_MOBILE ? (this.storedModeForDesktop = this.mode, this.mode == GalleryController.MODE_OVERVIEW && this.setMode(GalleryController.MODE_DETAIL), c.buttonContainer.setAlpha(0), d && d.setAlpha(1), c.imageStripe.disableCaptions()) : (this.setMode(this.storedModeForDesktop || (!this.rowContainer || GalleryController.alwaysShowProgressBar ? GalleryController.MODE_DETAIL : GalleryController.MODE_OVERVIEW)), b && c.buttonContainer.setAlpha(1), d && !GalleryController.alwaysShowProgressBar && c.progressBar.setAlpha(0), c.imageStripe.enableCaptions())
	    }
	}, GalleryController.prototype.setMode = function(a, b) {
	    if (a != this.mode) {
	        this.mode = a;
	        var c = this.rowContainer,
	            d = this.slideContainer;
	        d.removeListener("completeSlide", this.completeSlideSlideContainer, this), a == GalleryController.MODE_OVERVIEW ? (b ? d.slideOut() : d.sleep(), c && c.awake()) : (c && (b ? d.addListener("completeSlide", this.completeSlideSlideContainer, this) : c.sleep()), d.awake(this.lastSelectedElementIndex, b))
	    }
	}, GalleryController.prototype.completeSlideSlideContainer = function(a) {
	    if (a.removeListener("completeSlide", this.completeSlideSlideContainer, this), 1 == a.states.Slide.phase) {
	        var b = this.rowContainer;
	        b.sleep()
	    }
	}, GalleryController.prototype.lastSelectedElementIndex = 1, GalleryController.prototype.selectRowContainer = function(a) {
	    var b = a.selectedDescription;
	    this.lastSelectedElementIndex = b.elementIndex, this.setMode(GalleryController.MODE_DETAIL, !0)
	}, GalleryController.prototype.closeSlideContainer = function() {
	    this.setMode(GalleryController.MODE_OVERVIEW, !0)
	};
	var GalleryRowContainer = function() {
	    AnimatableSprite.apply(this, arguments);
	    this.rows = new Array
	};
	GalleryRowContainer.prototype = Object.create(AnimatableSprite.prototype), GalleryRowContainer.prototype.takeRowElements = function(a) {
	    this.rowElements = a;
	    for (var b = this.rows, c = 0; c < a.length; c++) {
	        var d = this.attachSprite(GalleryRow),
	            e = a[c];
	        d.addListener("select", this.selectRow, this), d.takeRowElement(e), b.push(d)
	    }
	}, GalleryRowContainer.prototype.awake = function() {
	    if (!this.isAwake) {
	        this.isAwake = !0, this.needsUpdateLayout && this.updateLayout();
	        for (var a = this.rows, b = a.length; b--;) {
	            var c = a[b];
	            c.awake()
	        }
	        this.setAlpha(1)
	    }
	}, GalleryRowContainer.prototype.sleep = function() {
	    if (this.isAwake) {
	        this.isAwake = !1;
	        for (var a = this.rows, b = a.length; b--;) {
	            var c = a[b];
	            c.sleep()
	        }
	        this.setAlpha(0)
	    }
	}, GalleryRowContainer.prototype.setViewSize = function(a) {
	    this.viewSize = a, this.isAwake ? this.updateLayout() : this.needsUpdateLayout = !0
	}, GalleryRowContainer.prototype.updateLayout = function() {
	    function a(a) {
	        return Math.round(a * b[1] / c.length)
	    }
	    this.needsUpdateLayout = !1;
	    for (var b = this.viewSize, c = this.rows, d = c.length, e = 0; d > e; e++) {
	        var f = c[e],
	            g = a(e),
	            h = a(e + 1);
	        f.setPosition(0, g), f.setViewSize([b[0], h - g])
	    }
	}, GalleryRowContainer.prototype.selectRow = function(a) {
	    this.selectedDescription = a.selectedDescription, this.dispatchEvent("select")
	};
	var GalleryRow = function() {
	    AnimatableSprite.apply(this, arguments), SlidingSprite.apply(this, arguments), this.element.className += " button", this.renderUsingCSSTransform = !0;
	    var a = this.itemContainer = this.attachSprite();
	    a.renderUsingCSSTransform = !0;
	    var b = (this.images = new Array, this.items = new Array, this.itemMap = new Object, this.viewOffsetMap = new Object);
	    b["default"] = 0, b.autoScroll = 0;
	    var c = this.speedMap = new Object;
	    c.scrollSpeed = 0;
	    var d = this.scrollingController;
	    d.stage = this.getStage(), d.addListener("beginDrag", this.beginDrag, this), d.addListener("dragHorizontal", this.dragHorizontal, this), d.addListener("cancelDragVertical", this.cancelDrag, this), d.addListener("endDrag", this.endDragVertical, this), d.addListener("scrollVertical", this.scrollVertical, this), d.addListener("cancelScrollVertical", this.cancelScroll, this)
	};
	GalleryRow.prototype = Object.create(AnimatableSprite.prototype), GalleryRow.extendPrototype(SlidingSprite), GalleryRow.prototype.getListenerTargetForScrollingController = function() {
	    return this.element
	}, GalleryRow.prototype.awake = function() {
	    var a = this.scrollingController;
	    a.awake()
	}, GalleryRow.prototype.sleep = function() {
	    var a = this.scrollingController;
	    a.sleep()
	}, GalleryRow.prototype.takeRowElement = function(a) {
	    this.rowElement = a;
	    for (var b = a.querySelectorAll ? a.querySelectorAll(".gallery-slide") : jQuery(a).find(".gallery-slide"), c = this.images, d = (this.items, 0); d < b.length; d++) {
	        var e = b[d],
	            f = (e.querySelectorAll ? e.querySelectorAll("img") : jQuery(e).find("img"))[0],
	            g = ImageModel.forElement(f);
	        c.push(g)
	    }
	    ImageModel.fillUpList(c, 15)
	}, GalleryRow.prototype.setViewSize = function(a) {
	    this.viewSize = a, this.updateLayout(), this.updateViewOffset(!0)
	}, GalleryRow.prototype.itemForImage = function(a, b) {
	    var c = a.index + (b ? "_" + b + "x" : ""),
	        d = this.itemMap,
	        e = d[c];
	    if (!e) {
	        var e = d[c] = new GalleryThumb(this.context);
	        if (e.parentStripe = this, e.mapKey = c, e.takeDescription(a), b) {
	            var f = a.index,
	                g = d[f];
	            e.originalItem = g, e.cover.states = g.cover.states
	        }
	        this.items.push(e), this.itemMap[c] = e, e.addListener(IS_TOUCH_DEVICE ? "touchend" : "click", this.clickItem, this)
	    }
	    return e
	}, GalleryRow.prototype.disposeItem = function(a) {
	    delete this.itemMap[a.mapKey];
	    var b = this.itemContainer,
	        c = a.originalItem || a;
	    c.parent == b && b.removeChild(c), a.removeListener("click", this.clickItem, this), a.removeListener("touchend", this.clickItem, this)
	}, GalleryRow.prototype.updateLayout = function(a) {
	    for (var b = (this.index, this.modulo), a = this.viewSize, c = this.items, d = this.images, e = c.length; e--;) {
	        var f = c[e];
	        f.isUsed = !1
	    }
	    for (var g, h = this.itemContainer, e = 0, i = 0, j = 0, k = 256; k--;) {
	        var l = d[e],
	            f = this.itemForImage(l, j);
	        if (f.isUsed = !0, f.modulo = b, f.setViewSizeForViewSize(a), f.originalPosition = [i, 0], f.setPosition(f.originalPosition), i += f.viewSize[0], e++, e >= d.length && (e = 0, j || (g = i), j++), j && i > a[0] + g) break
	    }
	    if (0 > k) throw new Error("loop.");
	    this.maxViewOffset = g;
	    for (var e = c.length; e--;) {
	        var f = c[e];
	        f.isUsed || (c.splice(e, 1), this.disposeItem(f))
	    }
	    if (this.lastModulo != b) {
	        this.lastModulo = b;
	        var m = this.itemRangeMap;
	        if (m) {
	            var n = m.visible;
	            if (delete m.visible, delete m.loading, n)
	                for (var e = n.begin; e < n.end; e++) {
	                    var f = c[e];
	                    f && (f = f.originalItem || f, f.parent && h.removeChild(f))
	                }
	        }
	        c.sort(function(a, b) {
	            return a.originalPosition[0] > b.originalPosition[0] ? 1 : -1
	        })
	    }
	    this.updateViewOffset()
	}, GalleryRow.prototype.updateViewOffset = function(a) {
	    var b = (window.USE_HIGH_RESOLUTION ? 2 : 1) * (IS_MOZILLA ? 1 : 2),
	        c = Math.round(this.getConvolutedViewOffset() * b) / b,
	        d = this.fixedViewOffset(c);
	    if (a || this.lastViewOffset != d) {
	        this.lastViewOffset = d;
	        var e = this.viewSize;
	        if (!e) return;
	        var f = this.itemContainer;
	        f.setPosition(-Math.round(d), 0);
	        var g = (this.index, this.category, new Array),
	            h = new Array;
	        this.processItemRange("visible", d, d + e[0], function(a) {
	            var b = a.originalItem || a;
	            g.push(b), b.parent != f && f.addChild(b), b.setPosition(a.originalItem ? a.originalPosition : a.originalPosition), b.needsUpdateLayout && b.updateLayout(), b.didStartLoading || b.startLoading()
	        }, function(a) {
	            a && h.push(a.originalItem || a)
	        });
	        for (var i = h.length; i--;) {
	            var j = h[i],
	                k = j.originalItem || j;
	            if (!(g.indexOf(k) >= 0) && k.parent == f) {
	                f.removeChild(k), k.isMouseOver && k.mouseOut();
	                var l = k.cover;
	                l.stopAnimation("Fade"), l.states.Fade = {
	                    phase: 0
	                }, l.setAlpha(0)
	            }
	        }
	        var m = 480;
	        this.processItemRange("loading", d - m, d + e[0] + m, function(a) {
	            var b = a.originalItem || a;
	            b.didStartLoading || b.startLoading()
	        }, function() {})
	    }
	    this.isMouseOver && this.trackMouse(), this.renderInContext(this.context)
	}, GalleryRow.prototype.getItemRangeForViewRange = function(a, b) {
	    function c(a, b) {
	        for (var c = 0, e = d.length; c != e;) {
	            var f = (c + e) / 2 | 0,
	                g = d[f],
	                h = g.originalPosition[0] + (b ? (g.originalItem || g).viewSize[0] : 0);
	            h > a ? e = f : c = f + 1
	        }
	        return c
	    }
	    var d = this.items;
	    return {
	        begin: c(a, !0),
	        end: c(b - 1)
	    }
	}, GalleryRow.prototype.processItemRange = function(a, b, c, d, e) {
	    var f = this.itemRangeMap;
	    f || (f = this.itemRangeMap = new Object);
	    var g = f[a],
	        h = this.items,
	        i = this.getItemRangeForViewRange(b, c);
	    if (g)
	        for (var j = g.begin; j < g.end; j++)
	            if (!(j >= i.begin && j < i.end)) {
	                var k = h[j];
	                e(k)
	            }
	    for (var j = i.begin; j < i.end; j++) {
	        var k = h[j];
	        d(k)
	    }
	    f[a] = i
	}, GalleryRow.prototype.getConvolutedViewOffset = function() {
	    var a = this.viewOffsetMap,
	        b = 0;
	    for (var c in a) b += a[c];
	    return b
	}, GalleryRow.prototype.fixedViewOffset = function(a) {
	    var b = this.maxViewOffset;
	    return a %= b, 0 > a && (a += b), a
	}, GalleryRow.prototype.boundedViewOffset = function(a) {
	    return a
	}, GalleryRow.prototype.beginDrag = function() {
	    SlidingSprite.beginDrag.apply(this, arguments), this.removeRunLoopHandler("processTargetScrollSpeed"), this.removeRunLoopHandler("processScrollSpeed"), this.removeRunLoopHandler("processSliding"), this.scrollSpeed = this.targetScrollSpeed = 0
	}, GalleryRow.prototype.dragHorizontal = function(a) {
	    this.viewOffset = this.viewOffsetMap["default"] = this.startViewOffset + a.delta.x, this.removeRunLoopHandler("processSliding"), this.updateViewOffset()
	}, GalleryRow.prototype.endDragVertical = function(a) {
	    var b = a.didFlickHorizontal;
	    b && (this.viewOffset += 1.5 * a.flickDeltaX, this.slidingInertia = .925, this.addRunLoopHandler("processSliding"), this.processSliding())
	}, GalleryRow.prototype.clickItem = function(a) {
	    this.selectedDescription = a.description, this.dispatchEvent("select")
	};
	var GallerySlideContainer = function() {
	    function a(a, b, d, e) {
	        var f = c.attachSprite(SolidSprite);
	        f.setSize(d), f.element.className += " button button-background" + (b ? " " + b : "");
	        var g = f.attachSprite(IconSprite);
	        return g.setTextureSize(d), g.takeDescription({
	            imageName: "img/" + a,
	            imageFileType: "svg",
	            textures: e
	        }), e && g.makeHoverable(), f
	    }
	    AnimatableSprite.apply(this, arguments), this.renderUsingCSSTransform = !0;
	    var b = (this.images = new Array, this.imageStripe = this.attachSprite(GallerySlideContainer.ImageStripe));
	    b.addListener("advance", this.advanceImageStripe, this);
	    var c = this.buttonContainer = this.attachSprite(),
	        d = this.closeButton = a("CloseIcon", "close-button", [45, 45]);
	    if (d.addListener("click", this.clickCloseButton, this), !GalleryController.alwaysShowProgressBar) {
	        var e = this.navigationButtonLeft = a("Navigation_left", "navigation-button", [45, 45]);
	        e.addListener("click", this.clickNavigationButton, this), e.setAlpha(0);
	        var f = this.navigationButtonRight = a("Navigation_right", "navigation-button", [45, 45]);
	        f.addListener("click", this.clickNavigationButton, this), f.setAlpha(0)
	    }
	};
	GallerySlideContainer.prototype = Object.create(AnimatableSprite.prototype), GallerySlideContainer.prototype.takeSlideElements = function(a) {
	    this.slideElements = a;
	    for (var b = this.images, c = 0; c < a.length; c++) {
	        var d = a[c],
	            e = (d.querySelectorAll ? d.querySelectorAll("img") : jQuery(d).find("img"))[0],
	            f = ImageModel.forElement(e);
	        b.push(f)
	    }
	    if (b.length > 1) {
	        var g = this.progressBar = this.attachSprite(ProgressBar);
	        g.addListener("select", this.selectProgressBar, this), g.buildWithCount(b.length)
	    }
	    var h = this.imageStripe;
	    h.takeImages(b)
	}, GallerySlideContainer.prototype.awake = function(a, b) {
	    this.isAwake = !0, this.pauseBuffering = IS_TOUCH_DEVICE && b, this.setAlpha(1);
	    var c = this.imageStripe;
	    c.currentImageIndex = 0;
	    for (var d = this.images, e = 0; e < d.length; e++) {
	        var f = d[e];
	        if (f.elementIndex == a) {
	            c.currentImageIndex = e;
	            break
	        }
	    }
	    this.updateLayout(), c.awake(), c.viewSize && c.updateViewOffset(), this.advanceImageStripe(c), this.addListener("mousemove", this.mouseMoveStage, this), this.addListener("mouseout", this.mouseOutStage, this), b ? this.startAnimation("Slide", {
	        direction: 1,
	        rate: .025
	    }) : (this.stopAnimation("Slide"), this.slideForT(0))
	}, GallerySlideContainer.prototype.slideOut = function() {
	    this.startAnimation("Slide", {
	        direction: 0,
	        rate: .04
	    }), this.addListener("completeSlide", this.completeSlide, this);
	    var a = this.navigationButtonLeft,
	        b = this.navigationButtonRight;
	    a && (a.fadeOut(2), b.fadeOut(2)), this.removeListener("mousemove", this.mouseMoveStage, this), this.removeListener("mouseout", this.mouseOutStage, this)
	}, GallerySlideContainer.prototype.completeSlide = function() {
	    this.states.Slide.phase || this.sleep()
	}, GallerySlideContainer.prototype.sleep = function() {
	    if (this.isAwake) {
	        this.isAwake = !1, this.removeListener("completeSlide", this.sleep, this);
	        var a = this.imageStripe;
	        a.sleep(), this.setAlpha(0);
	        var b = this.navigationButtonLeft,
	            c = this.navigationButtonRight;
	        b && (b.stopAnimation("Fade"), b.setAlpha(0), c.stopAnimation("Fade"), c.setAlpha(0)), this.removeListener("mousemove", this.mouseMoveStage, this), this.removeListener("mouseout", this.mouseOutStage, this)
	    }
	}, GallerySlideContainer.prototype.setViewSize = function(a) {
	    this.viewSize = a, this.isAwake ? this.updateLayout() : this.needsUpdateLayout = !0
	}, GallerySlideContainer.prototype.updateLayout = function() {
	    var a = this.viewSize;
	    if (a) {
	        this.needsUpdateLayout = !1;
	        var b = this.imageStripe;
	        b.setViewSize(a), this.maxHeight = a[1] = b.maxHeight;
	        var c = this.closeButton,
	            d = c.size;
	        c.setPosition(a[0] - d[0] - 20, 20);
	        var e = this.navigationButtonLeft,
	            f = this.navigationButtonRight;
	        if (e) {
	            var g = e.size;
	            e.setPosition(.3 * -g[0], (a[1] - g[1]) / 2), f.setPosition(a[0] - .7 * g[0], (a[1] - g[1]) / 2)
	        }
	        var h = RenderContext.getViewportSize(),
	            i = "inside" == GalleryController.progressBarPlacement,
	            j = this.progressBar;
	        j && j.setPosition(!i && h[0] <= 480 ? (a[0] - j.fullWidth) / 2 : a[0] - j.fullWidth - 20, i ? a[1] - j.textureSize[1] - 20 : a[1] + GalleryController.progressBarOuterOffset - j.textureSize[1])
	    }
	}, GallerySlideContainer.prototype.mouseMoveStage = function(a) {
	    var b = a.currentEvent,
	        c = this.viewSize,
	        d = this.touchDescriptionForObject(b),
	        e = this.navigationButtonLeft,
	        f = this.navigationButtonRight;
	    if (e) {
	        var g = .225;
	        d[0] < c[0] * g ? e.alpha || e.fadeIn() : e.alpha && e.fadeOut(), d[0] > c[0] * (1 - g) ? f.alpha || f.fadeIn() : f.alpha && f.fadeOut()
	    }
	}, GallerySlideContainer.prototype.mouseOutStage = function() {
	    var a = this.navigationButtonLeft,
	        b = this.navigationButtonRight;
	    a && (a.alpha && a.fadeOut(), b.alpha && b.fadeOut())
	}, GallerySlideContainer.prototype.clickNavigationButton = function(a) {
	    var b = this.imageStripe;
	    b.advanceInDirection(a == this.navigationButtonLeft ? -1 : 1)
	}, GallerySlideContainer.prototype.selectProgressBar = function(a) {
	    var b = a.index,
	        c = this.imageStripe;
	    c.setViewOffsetByIndex(b, !0)
	}, GallerySlideContainer.prototype.advanceImageStripe = function(a) {
	    var b = this.progressBar;
	    if (b) {
	        var c = a.currentImageIndex;
	        b.setIndex(c)
	    }
	}, GallerySlideContainer.prototype.clickCloseButton = function() {
	    this.dispatchEvent("close")
	}, GallerySlideContainer.prototype.animateSlide = function() {
	    var a = this.updatedState("Slide"),
	        b = 1 - a.phase;
	    if (b = a.direction > 0 ? b * b * b * b : b * b, this.slideForT(b), 1 == a.phase) {
	        this.pauseBuffering = !1;
	        var c = this.imageStripe;
	        c.updateViewOffset()
	    }
	}, GallerySlideContainer.prototype.slideForT = function(a) {
	    var b = this.viewSize;
	    if (b) {
	        var c = -b[0] * a;
	        this.setPosition(c, 0)
	    }
	}, GallerySlideContainer.ImageStripe = function() {
	    CroppingSprite.apply(this, arguments), SlidingSprite.apply(this, arguments), this.element.className += " image-stripe", this.scrollingController.disableMouseWheel = !0;
	    this.items = new Array;
	    this.addListener("completeSliding", this.completeSliding, this)
	}, GallerySlideContainer.ImageStripe.prototype = Object.create(CroppingSprite.prototype), GallerySlideContainer.ImageStripe.extendPrototype(SlidingSprite), GallerySlideContainer.ImageStripe.prototype.takeImages = function(a) {
	    for (var b = this.items; b.length;) {
	        var c = b.pop();
	        c.parent && c.parent.removeChild(c)
	    }
	    for (var d = this.context, e = 0; e < a.length; e++) {
	        var c = new GalleryController.slideConstructor(d);
	        c.parentStripe = this, c.renderUsingCSSTransform = !0;
	        var f = a[e];
	        c.takeDescription(f), b.push(c)
	    }
	    this.visibleItems = new Array;
	    if (a.length > 1) {
	        var g = this.scrollingController;
	        g.stage = this.getStage(), g.addListener("beginDrag", this.beginDrag, this), g.addListener("dragHorizontal", this.dragHorizontal, this), g.addListener("cancelDragHorizontal", this.cancelDrag, this), g.addListener("cancelDragHorizontal", this.cancelDragHorizontal, this), g.addListener("endDrag", this.endDragHorizontal, this)
	    }
	}, GallerySlideContainer.ImageStripe.prototype.getListenerTargetForScrollingController = function() {
	    return this.element
	}, GallerySlideContainer.ImageStripe.prototype.awake = function() {
	    var a = this.scrollingController;
	    a.awake()
	}, GallerySlideContainer.ImageStripe.prototype.sleep = function() {
	    var a = this.scrollingController;
	    a.sleep()
	}, GallerySlideContainer.ImageStripe.prototype.enableCaptions = function() {
	    if (!this.areCaptionsEnabled && (this.areCaptionsEnabled = !0, !IS_TOUCH_DEVICE)) {
	        var a = this.parent;
	        a.addListener("mousemove", this.mouseMoveContainer, this), a.addListener("mouseout", this.mouseOutContainer, this)
	    }
	}, GallerySlideContainer.ImageStripe.prototype.disableCaptions = function() {
	    if (this.areCaptionsEnabled && (this.areCaptionsEnabled = !1, !IS_TOUCH_DEVICE)) {
	        var a = this.parent;
	        a.removeListener("mousemove", this.mouseMoveContainer, this), a.removeListener("mouseout", this.mouseOutContainer, this), this.highlightItem(null)
	    }
	}, GallerySlideContainer.ImageStripe.prototype.setViewSize = function(a) {
	    this.viewSize = a, this.updateViewOffset(), this.setSize(a[0], this.maxHeight)
	}, GallerySlideContainer.ImageStripe.DRAG_DELTA = 150, GallerySlideContainer.ImageStripe.prototype.beginDrag = function() {
	    if (SlidingSprite.beginDrag.apply(this, arguments), this.completeSliding(this, !0), IS_TOUCH_DEVICE) {
	        var a = this.parent.overlay;
	        a && a.isShown && a.hide()
	    }
	}, GallerySlideContainer.ImageStripe.prototype.dragHorizontal = function(a) {
	    var b = a.delta.x;
	    this.viewOffset = this.currentViewOffset = this.startViewOffset + b, this.removeRunLoopHandler("processSliding");
	    var c = this.currentImageIndex,
	        d = this.items,
	        e = this.viewSize,
	        f = d[c];
	    f.setViewSize(e);
	    var g = Math.min(f.size[0] / 2, GallerySlideContainer.ImageStripe.DRAG_DELTA);
	    Math.abs(b) >= g && this.advanceInDirection(0 > b ? -1 : 1), this.updateViewOffset()
	}, GallerySlideContainer.ImageStripe.prototype.endDragHorizontal = function(a) {
	    var b = a.didFlickHorizontal;
	    if (b) {
	        var c = this.viewOffset + 1.5 * a.flickDeltaX,
	            d = this.currentImageIndex,
	            e = this.items,
	            f = (this.viewSize, e[d]),
	            g = Math.min(f.size[0] / 2, GallerySlideContainer.ImageStripe.DRAG_DELTA);
	        Math.abs(c) >= g ? this.advanceInDirection(0 > c ? -1 : 1) : this.snapToBounds()
	    } else this.snapToBounds()
	}, GallerySlideContainer.ImageStripe.prototype.cancelDragHorizontal = function(a) {
	    a.transferControlTo(Site.sharedInstance.contentContainer.scrollingController)
	}, GallerySlideContainer.ImageStripe.prototype.boundedViewOffset = function() {
	    return 0
	}, GallerySlideContainer.ImageStripe.prototype.scrollHorizontal = function(a) {
	    var b = 6 * a.delta.x / 4,
	        c = this.viewOffset + b;
	    Math.abs(c) > GallerySlideContainer.ImageStripe.DRAG_DELTA / 5 ? this.advanceInDirection(c > 0 ? 1 : -1) : (this.viewOffset = c, this.slidingInertia = .85, this.addRunLoopHandler("processSliding"))
	}, GallerySlideContainer.ImageStripe.prototype.updateViewOffset = function() {
	    var a = this.currentImageIndex || 0;
	    if (!isNaN(a)) {
	        for (var b = this.currentViewOffset, c = this.items, d = this.visibleItems, e = d.length; e--;) {
	            var f = d[e];
	            f.isUsed = !1
	        }
	        var g = this.viewSize,
	            e = a,
	            f = c[e];
	        f.setViewSizeForViewSize(g);
	        for (var h = new Array, i = g[0], j = Math.round(this.currentViewOffset), k = -Math.round(f.viewSize[0] / 2) - j, l = 0, m = 256; m-- && k > -i / 2;) {
	            e = (e - 1) % c.length, 0 > e && (e += c.length);
	            var f = c[e];
	            f.setViewSizeForViewSize(g), l = Math.max(l, f.viewSize[1]), k -= f.viewSize[0]
	        }
	        if (0 > m) throw new Error("loop.");
	        var b = Math.round(i / 2),
	            n = this.isLoadingPaused;
	        for (m = c.length; m-- && i / 2 > k;) {
	            var f = c[e];
	            f.isUsed = !0, f.setViewSizeForViewSize(g), l = Math.max(l, f.viewSize[1]), f.setPosition(k + b, 0), f.setAlpha(1), n || f.didStartLoading || f.startLoading(), f.parent || this.addChild(f), f.updateLayout(), h.push(f), e = (e + 1) % c.length, 0 > e && (e += c.length), k += f.viewSize[0]
	        }
	        this.maxHeight = l;
	        for (var e = d.length; e--;) {
	            var f = d[e];
	            if (!f.isUsed && (this.removeChild(f), f == this.highlightedItem)) {
	                this.highlightedItem = null;
	                var o = f.caption;
	                o && (o.stopAnimation("Fade"), o.setAlpha(0))
	            }
	        }
	        this.visibleItems = h, !IS_TOUCH_DEVICE && this.areCaptionsEnabled && this.mouseMoveContainer(), this.renderInContext(this.context)
	    }
	}, GallerySlideContainer.ImageStripe.prototype.advanceInDirection = function(a) {
	    var b = this.currentImageIndex,
	        c = this.items,
	        d = this.viewSize,
	        e = c[b];
	    e.setViewSize(d), b = (b + a) % c.length, 0 > b && (b += c.length);
	    var f = c[b];
	    f.setViewSize(d), this.currentImageIndex = b, this.parent.parent.lastSelectedElementIndex = b + 1, this.currentViewOffset = this.currentViewOffset + (e.size[0] + f.size[0]) / 2 * -a, this.releaseDrag(), this.snapToBounds();
	    var g = this.parent;
	    g.setCategory && g.setCategory(f.description.getMainCategory(), f.description), this.dispatchEvent("advance")
	}, GallerySlideContainer.ImageStripe.prototype.setViewOffsetByIndex = function(a, b) {
	    var c = this.items;
	    a %= c.length, 0 > a && (a += c.length);
	    var d = (this.viewOffset, this.currentImageIndex),
	        e = (a - d) % c.length;
	    if (0 > e && (e += c.length), e > c.length / 2 && (e -= c.length), e) {
	        var f = this.viewSize,
	            g = this.currentViewOffset;
	        if (this.currentImageIndex = a, b) {
	            for (var h = c[d], i = c.length > 2 ? e > 0 ? 1 : -1 : d > a ? -1 : 1, j = 0; j < Math.abs(e); j++) {
	                g -= h.viewSize[0] / 2 * i, d = (d + i) % c.length, 0 > d && (d += c.length);
	                var k = c[d];
	                k.setViewSizeForViewSize(f), k.updateLayout(), g -= k.viewSize[0] / 2 * i, h = k
	            }
	            this.viewOffset = 0, this.currentViewOffset = g, this.slidingInertia = .85, this.maxScrollSpeed = 4, this.accelerationDescription = void 0, this.addRunLoopHandler("processSliding")
	        } else this.viewOffset = this.currentViewOffset = 0, this.removeRunLoopHandler("processSliding"), this.updateViewOffset()
	    }
	}, GallerySlideContainer.ImageStripe.prototype.completeSliding = function(a, b) {
	    function c(a) {
	        a.didStartLoading || (a.setViewSizeForViewSize(f), a.startLoading())
	    }
	    var d = this.currentImageIndex,
	        e = this.items,
	        f = this.viewSize;
	    b || c(e[d]), e.length > 1 && c(e[(d + 1) % e.length]), e.length > 2 && c(e[(d + e.length - 1) % e.length]), e.length > 3 && c(e[(d + 2) % e.length]), e.length > 4 && c(e[(d + e.length - 2) % e.length])
	}, GallerySlideContainer.ImageStripe.prototype.mouseMoveContainer = function(a) {
	    if (!this.isTouching) {
	        var b;
	        if (a) {
	            var c = a.currentEvent;
	            b = this.lastMouse = this.touchDescriptionForObject(c)
	        } else if (b = this.lastMouse, !b) return;
	        for (var d = this.visibleItems, e = d.length; e--;) {
	            var f = d[e];
	            if (f.position[0] < b[0]) {
	                this.highlightItem(f);
	                break
	            }
	        }
	    }
	}, GallerySlideContainer.ImageStripe.prototype.mouseOutContainer = function() {
	    this.highlightItem(null)
	}, GallerySlideContainer.ImageStripe.prototype.highlightItem = function(a) {
	    var b = this.highlightedItem;
	    b != a && (b && b.mouseOut(), a && a.mouseOver(), this.highlightedItem = a)
	}, ProgressBar = function() {
	    AnimatableSprite.apply(this, arguments), this.element.className += " button";
	    var a = (this.lights = new Array, this.lightContainer = this.attachSprite(Sprite)),
	        b = this.hover = a.attachSprite(SolidSprite);
	    b.setColour("transparent")
	}, ProgressBar.prototype = Object.create(AnimatableSprite.prototype), ProgressBar.prototype.columnWidth = 25, ProgressBar.prototype.textureSize = [11, 11], ProgressBar.prototype.buildWithCount = function(a) {
	    for (var b = this.lights, c = this.lightContainer, d = this.columnWidth, e = this.textureSize, f = GalleryController.progressBarPlacement, g = "inside" == f ? "ProgressDot" : "ProgressDot_dark", h = IS_IE && 9 >= IE_VERSION ? "png" : "svg", i = a; i--;) {
	        var j = c.attachSprite(IconSprite);
	        j.element.className += " shape", j.setPosition(i * d, 0), j.setTextureSize(e), j.takeDescription({
	            imageName: "img/" + g,
	            imageFileType: h,
	            textures: ["_inactive", ""]
	        }), b.unshift(j)
	    }
	    var k = (this.fullWidth = (a - 1) * d + e[0], this.hover);
	    k.setSize((a + .5) * d, 20), k.setPosition(-d / 2, (e[1] - k.size[1]) / 2);
	    var c = this.lightContainer;
	    c.addListener("mousedown", this.mouseDown, this), c.addListener("mouseover", this.mouseOver, this), c.addListener("mouseout", this.mouseOut, this)
	}, ProgressBar.prototype.setViewSize = function(a) {
	    var b = this.background;
	    b && (b.setSize(a[0], 23), b.setPosition(-a[0] / 2, -6))
	}, ProgressBar.prototype.setIndex = function(a) {
	    this.index = a, this.redrawLights()
	}, ProgressBar.prototype.redrawLights = function() {
	    for (var a = this.lights, b = this.index, c = this.hoveredIndex, d = this.startIndex, e = a.length; e--;) {
	        var f = a[e],
	            g = e == b || e == c || e == d;
	        !f.state == g && f.setState(1, g)
	    }
	}, ProgressBar.prototype.mouseOver = function(a) {
	    if (this.isMouseOver = !0, !this.isTracking) {
	        {
	            a.currentEvent
	        }
	        this.beginTrack(a)
	    }
	}, ProgressBar.prototype.mouseOut = function() {
	    this.isMouseOver = !1
	}, ProgressBar.prototype.mouseDown = function(a) {
	    var b = a.currentEvent;
	    stopEventPropagation(b), cancelEvent(b), this.startIndex = this.index;
	    var c = this.getStage();
	    this.isTracking ? this.activateWhileTracking || (c.currentEvent = a.currentEvent, this.endTrack(this.lightContainer, !0), this.activateWhileTracking = !0, this.beginTrack(a, !0), this.redrawLights()) : (this.activateWhileTracking = !0, delete this.index, this.beginTrack(a), this.redrawLights())
	}, ProgressBar.prototype.beginTrack = function(a) {
	    if (!this.isTracking) {
	        var b = a.currentEvent;
	        stopEventPropagation(b), cancelEvent(b), this.isTracking = !0;
	        var c = this.getStage();
	        c.addListener("mousemove", this.doTrack, this), this.activateWhileTracking ? c.addListener("mouseup", this.endTrack, this) : this.lightContainer.addListener("mouseout", this.endTrack, this), c.currentEvent = b, this.doTrack(c)
	    }
	}, ProgressBar.prototype.doTrack = function(a) {
	    var b = a.currentEvent,
	        c = this.indexForTouchObject(b);
	    this.activateWhileTracking ? this.index != c && (this.setIndex(c), this.redrawLights()) : this.hoveredIndex != c && (this.hoveredIndex = c, this.redrawLights())
	}, ProgressBar.prototype.indexForTouchObject = function(a) {
	    var b = this.touchDescriptionForObject(a),
	        c = this.lights,
	        d = this.columnWidth,
	        e = Math.max(0, Math.min(c.length - 1, Math.round((b[0] + this.textureSize[0] / 2) / d - .5)));
	    return e
	}, ProgressBar.prototype.endTrack = function(a, b) {
	    if (this.isTracking) {
	        this.isTracking = !1;
	        var c = this.getStage();
	        c.removeListener("mousemove", this.doTrack, this), this.activateWhileTracking ? (c.removeListener("mouseup", this.endTrack, this), this.activateWhileTracking = !1, this.isMouseOver && this.beginTrack(c, !0), delete this.startIndex, this.redrawLights(), this.dispatchEvent("select")) : (a.removeListener("mouseout", this.endTrack, this), delete this.hoveredIndex, b || (this.isMouseOver = !1, this.redrawLights()))
	    }
	};
	var ResponsiveImage = function() {
	    AnimatableSprite.apply(this, arguments); {
	        var a = (this.background = this.attachSprite(SolidSprite), this.imageLayer = this.attachSprite());
	        this.image = a.attachSprite(TexturedSprite)
	    }
	};
	ResponsiveImage.prototype = Object.create(AnimatableSprite.prototype), ResponsiveImage.prototype.takeDescription = function(a) {
	    this.description = a;
	    this.background
	}, ResponsiveImage.prototype.startLoading = function() {
	    this.didStartLoading = !0
	}, ResponsiveImage.prototype.completeImage = function(a) {
	    a.removeListener("complete", this.completeImage, this), this.updateLayout(), this.renderInContext(this.context)
	}, ResponsiveImage.prototype.setViewSizeForViewSize = function(a) {
	    var b = this.description,
	        c = b.size,
	        d = [Math.ceil(a[1] / c[1] * c[0]), Math.round(a[1])];
	    if (!d[1]) throw new Error("undef.");
	    this.setViewSize(d)
	}, ResponsiveImage.prototype.setViewSize = function(a) {
	    var b = this.viewSize;
	    b && b[0] == a[0] && b[1] == a[1] || (this.viewSize = a, this.needsUpdateLayout = !0)
	}, ResponsiveImage.prototype.updateLayout = function() {
	    this.needsUpdateLayout = !1;
	    var a = this.viewSize;
	    this.setSize(a)
	};
	var GalleryThumb = function() {
	    ResponsiveImage.apply(this, arguments);
	    var a = this.cover = this.attachSprite(SolidSprite);
	    a.texture.className += " shape gallery-thumb-cover", a.setAlpha(0), this.addListener("mouseover", this.mouseOver, this), this.addListener("mouseout", this.mouseOut, this)
	};
	GalleryThumb.prototype = Object.create(ResponsiveImage.prototype), GalleryThumb.prototype.startLoading = function() {
	    ResponsiveImage.prototype.startLoading.apply(this, arguments);
	    var a = this.description,
	        b = this.image;
	    b.addListener("complete", this.completeImage, this);
	    var c = this;
	    b.priorityClosure = function() {
	        {
	            var a = c.parent;
	            c.originalItem || c
	        }
	        if (a && a.parent.parent.isAwake) {
	            var b = -c.originalPosition[0] - a.parent.position[1];
	            return b + 8192
	        }
	        return -8192
	    }, b.loadTexture(a.imagePathForPixelHeight(USE_HIGH_RESOLUTION ? 500 : 350))
	}, GalleryThumb.prototype.updateLayout = function() {
	    ResponsiveImage.prototype.updateLayout.apply(this, arguments);
	    var a = this.viewSize,
	        b = this.cover;
	    b.setSize(a);
	    var c = this.image;
	    if (c && c.isComplete) {
	        var d = c.textureSize;
	        c.setScale(a[0] / d[0], a[1] / d[1]), c.alpha || (this.parent ? c.fadeIn() : c.setAlpha(1))
	    }
	}, GalleryThumb.prototype.mouseOver = function() {
	    var a = this.cover;
	    a.alpha || a.fadeIn(2.5)
	}, GalleryThumb.prototype.mouseOut = function() {
	    var a = this.cover;
	    a.alpha && a.fadeOut(1.5)
	};
	var GalleryImage = function() {
	    ResponsiveImage.apply(this, arguments)
	};
	GalleryImage.prototype = Object.create(ResponsiveImage.prototype), GalleryImage.prototype.takeDescription = function() {
	    ResponsiveImage.prototype.takeDescription.apply(this, arguments)
	}, GalleryImage.prototype.startLoading = function() {
	    var a = this.viewSize;
	    if (a) {
	        ResponsiveImage.prototype.startLoading.apply(this, arguments);
	        var b = this.description,
	            c = this.image;
	        c.addListener("complete", this.completeImage, this), c.priorityClosure = this.getPriorityClosure(), c.loadTexture(b.cachedImagePathUpToPixelHeight(Math.min(b.size[1], a[1] * (USE_HIGH_RESOLUTION ? 2 : 1))))
	    }
	}, GalleryImage.prototype.getPriorityClosure = function() {
	    var a = this;
	    return function() {
	        var b = a.parent;
	        if (b) {
	            var c = -Math.abs(a.position[0] + a.viewSize[0] / 2 - (b.viewSize ? b.viewSize[0] / 2 : 0));
	            return c
	        }
	        return -8192
	    }
	}, GalleryImage.prototype.updateLayout = function() {
	    ResponsiveImage.prototype.updateLayout.apply(this, arguments);
	    var a = this.viewSize,
	        b = (this.context.getWindowSize(), this.image);
	    if (b) {
	        if (b.isComplete) {
	            var c = b.textureSize;
	            b.setScale(a[0] / c[0], a[1] / c[1])
	        }
	        var d = this.description,
	            e = d.imagePathForPixelHeight(a[1]);
	        if (!this.isBuffering && b.path && e != b.path) {
	            var f = this.parent;
	            f && !f.parent.pauseBuffering && this.bufferImageForPath(e)
	        }
	    }
	    var g = this.backgroundImage;
	    if (g && g.isComplete) {
	        var h = g.textureSize;
	        g.setScale(a[0] / h[0], a[1] / h[1])
	    }
	}, GalleryImage.prototype.bufferImageForPath = function(a) {
	    this.isBuffering = !0;
	    var b = this.bufferingImage;
	    b && (b.removeListener("complete", this.completeBufferingImage, this), this.imageLayer.removeChild(b)), b = this.bufferingImage = this.imageLayer.attachSprite(TexturedSprite), b.setAlpha(0), b.addListener("complete", this.completeBufferingImage, this), b.priorityClosure = this.getPriorityClosure(), b.loadTexture(a)
	}, GalleryImage.prototype.completeBufferingImage = function(a) {
	    this.isBuffering = !1, a.removeListener("complete", this.completeBufferingImage, this), this.backgroundImage = this.image, this.image = a, delete this.bufferingImage, a.addListener("completeFade", this.completeFadeBufferingImage, this), a.fadeIn(8), this.updateLayout()
	}, GalleryImage.prototype.completeFadeBufferingImage = function(a) {
	    a.removeListener("completeFade", this.completeFadeBufferingImage, this);
	    for (var b = this.imageLayer, c = b.children, d = c.length; d--;) {
	        var e = c[d];
	        e != this.image && b.removeChild(e)
	    }
	    var f = this.backgroundImage;
	    f && delete this.backgroundImage
	};
	var GallerySlide = function() {
	    GalleryImage.apply(this, arguments)
	};
	GallerySlide.prototype = Object.create(GalleryImage.prototype), GallerySlide.prototype.takeDescription = function(a) {
	    GalleryImage.prototype.takeDescription.apply(this, arguments);
	    var b = a.element.parentNode,
	        c = (b.querySelectorAll ? b.querySelectorAll(".caption") : jQuery(b).find(".caption"))[0];
	    if (c) {
	        var d = this.caption = this.attachSprite(ContainerSprite);
	        GalleryController.allowTextSelection ? d.addListener("mousedown", function(a) {
	            var b = a.currentEvent;
	            b.stopPropagation()
	        }, title) : d.element.className += " shape", d.setAlpha(0), d.takeOverElement(c)
	    }
	}, GallerySlide.prototype.updateLayout = function() {
	    GalleryImage.prototype.updateLayout.apply(this, arguments);
	    var a = this.viewSize,
	        b = this.context.getWindowSize(),
	        c = Math.min(b[0], a[0]),
	        d = Math.max(0, Math.floor(a[0] - c) / 2);
	    d && (c += 1);
	    var e = this.caption;
	    e && (e.setSize(c - (IS_ONLINE ? 0 : 30), void 0), e.setPosition(Math.max(0, Math.min(-this.position[0], a[0] - c)), a[1]))
	}, GallerySlide.prototype.mouseOver = function() {
	    var a = this.caption;
	    a && a.fadeIn(2.5)
	}, GallerySlide.prototype.mouseOut = function() {
	    var a = this.caption;
	    a && a.fadeOut(1.5)
	};
	var GalleryHeaderSlide = function() {
	    ResponsiveImage.apply(this, arguments)
	};
	GalleryHeaderSlide.prototype = Object.create(ResponsiveImage.prototype), GalleryHeaderSlide.prototype.takeDescription = function(a) {
	    ResponsiveImage.prototype.takeDescription.apply(this, arguments);
	    var b = a.element.parentNode,
	        c = (b.querySelectorAll ? b.querySelectorAll(".gallery-slide-title") : jQuery(b).find(".gallery-slide-title"))[0];
	    if (c) {
	        var d = this.title = this.attachSprite(ContainerSprite);
	        d.renderAsLayer = !0, GalleryController.allowTextSelection ? d.addListener("mousedown", function(a) {
	            var b = a.currentEvent;
	            b.stopPropagation()
	        }, d) : d.element.className += " shape", d.takeOverElement(c), c.style.display = "table", c.firstElementChild.style.display = "table-cell", c.firstElementChild.style.verticalAlign = "middle"
	    }
	}, GalleryHeaderSlide.prototype.startLoading = function() {
	    var a = this.viewSize;
	    if (a) {
	        ResponsiveImage.prototype.startLoading.apply(this, arguments);
	        var b = this.description,
	            c = this.image;
	        c.addListener("complete", this.completeImage, this), c.priorityClosure = this.getPriorityClosure(), c.loadTexture(b.getOriginalImagePath())
	    }
	}, GalleryHeaderSlide.prototype.getPriorityClosure = function() {
	    var a = this;
	    return function() {
	        var b = a.parent;
	        if (b) {
	            var c = -Math.abs(a.position[0] + a.viewSize[0] / 2 - b.viewSize[0] / 2);
	            return c
	        }
	        return -8192
	    }
	}, GalleryHeaderSlide.prototype.updateLayout = function() {
	    ResponsiveImage.prototype.updateLayout.apply(this, arguments);
	    var a = this.viewSize,
	        b = this.context.getWindowSize(),
	        c = Math.min(b[0], a[0]),
	        d = Math.max(0, Math.floor(a[0] - c) / 2);
	    d && (c += 1);
	    var e = this.title;
	    e && e.setSize(a);
	    var f = this.image;
	    if (f && f.isComplete) {
	        var g = f.textureSize;
	        f.setScale(a[0] / g[0], a[1] / g[1])
	    }
	    var h = this.backgroundImage;
	    if (h && h.isComplete) {
	        var i = h.textureSize;
	        h.setScale(a[0] / i[0], a[1] / i[1])
	    }
	}, GalleryHeaderSlide.prototype.mouseOver = function() {}, GalleryHeaderSlide.prototype.mouseOut = function() {};
	var GalleryQuadrupleSlide = function() {
	    GalleryHeaderSlide.apply(this, arguments);
	    for (var a = this.images = new Array, b = this.imageLayer, c = 0; 4 > c; c++) {
	        var d = b.attachSprite(CroppingSprite);
	        d.renderAsLayer = !0;
	        var e = d.attachSprite(GalleryImage);
	        a.push(e)
	    }
	};
	GalleryQuadrupleSlide.prototype = Object.create(GalleryHeaderSlide.prototype), GalleryQuadrupleSlide.prototype.takeDescription = function(a) {
	    GalleryHeaderSlide.prototype.takeDescription.apply(this, arguments);
	    for (var b = a.element.parentNode, c = b.querySelectorAll("img"), d = this.images, e = d.length; e--;) {
	        var f = d[e],
	            g = c[e],
	            h = ImageModel.forElement(g);
	        f.takeDescription(h)
	    }
	}, GalleryQuadrupleSlide.prototype.startLoading = function() {
	    ResponsiveImage.prototype.startLoading.apply(this, arguments);
	    for (var a = this.images, b = 0; b < a.length; b++) {
	        var c = a[b];
	        c.startLoading()
	    }
	}, GalleryQuadrupleSlide.MODE_SINGLE = "single", GalleryQuadrupleSlide.MODE_QUADRUPLE = "quadruple", GalleryQuadrupleSlide.prototype.setViewSizeForViewSize = function(a) {
	    var b = [Math.ceil(a[0]), Math.max(282, Math.round(a[0] / 900 * 460))];
	    if (!b[1]) throw new Error("undef.");
	    var c = RenderContext.getViewportSize(),
	        d = this.mode,
	        e = this.mode = c[0] < 768 ? GalleryQuadrupleSlide.MODE_SINGLE : GalleryQuadrupleSlide.MODE_QUADRUPLE;
	    if (d != e) {
	        var f = this.images;
	        switch (e) {
	            case GalleryQuadrupleSlide.MODE_SINGLE:
	                for (var g = 1; g < f.length; g++) {
	                    var h = f[g];
	                    h.setAlpha(0)
	                }
	                break;
	            case GalleryQuadrupleSlide.MODE_QUADRUPLE:
	                for (var g = 1; g < f.length; g++) {
	                    var h = f[g];
	                    h.setAlpha(1)
	                }
	        }
	    }
	    this.setViewSize(b), this.updateLayout()
	}, GalleryQuadrupleSlide.prototype.updateLayout = function() {
	    GalleryHeaderSlide.prototype.updateLayout.apply(this, arguments);
	    var a = this.mode;
	    switch (a) {
	        case GalleryQuadrupleSlide.MODE_SINGLE:
	            this.updateLayoutSingle();
	            break;
	        case GalleryQuadrupleSlide.MODE_QUADRUPLE:
	            this.updateLayoutQuadruple()
	    }
	}, GalleryQuadrupleSlide.prototype.updateLayoutSingle = function() {
	    var a = this.viewSize,
	        b = this.images,
	        c = b[0];
	    GalleryQuadrupleSlide.fitImage(c, 0, a[0], 0, a[1])
	}, GalleryQuadrupleSlide.prototype.updateLayoutQuadruple = function() {
	    function a(a) {
	        return Math.round(c[0] / 2 * a)
	    }

	    function b(a) {
	        return Math.round(c[1] / 2 * a)
	    }
	    for (var c = this.viewSize, d = this.images, e = d.length; e--;) {
	        var f = d[e],
	            g = e % 2,
	            h = Math.floor(e / 2),
	            i = a(g),
	            j = a(g + 1),
	            k = b(h),
	            l = b(h + 1);
	        GalleryQuadrupleSlide.fitImage(f, i, j, k, l)
	    }
	}, GalleryQuadrupleSlide.fitImage = function(a, b, c, d, e) {
	    var f = a.parent;
	    f.setPosition(b, d), f.setSize(c - b, e - d);
	    var g = f.size,
	        h = a.description.size,
	        i = Math.max(g[0] / h[0], g[1] / h[1]);
	    a.setViewSize([h[0] * i, h[1] * i]);
	    var j = a.description.alignment || [.5, .5];
	    a.setPosition(((-g[0] + h[0] * i) * (.5 - j[0]) + (g[0] - h[0] * i) * (.5 + j[0])) / 2, ((-g[1] + h[1] * i) * (.5 - j[1]) + (g[1] - h[1] * i) * (.5 + j[1])) / 2), a.didStartLoading || a.startLoading(), a.updateLayout()
	}, ImageModel.resolutions = [{
	    height: 1400,
	    path: "1400_height"
	}, {
	    height: 350,
	    path: "1400_height_thumb"
	}, {
	    height: 1e3,
	    path: "1000_height"
	}, {
	    height: 250,
	    path: "1000_height_thumb"
	}, {
	    height: 700,
	    path: "700_height"
	}, {
	    height: 175,
	    path: "700_height_thumb"
	}, {
	    height: 500,
	    path: "500_height"
	}, {
	    height: 125,
	    path: "500_height_thumb"
	}], ImageModel.resolutions.sort(function(a, b) {
	    return a.height > b.height ? -1 : 1
	}), ImageModel.prototype.getFolderPath = function() {
	    return IS_ONLINE ? "demo-gallery/" : "gallery/"
	}, ImageModel.prototype.getOriginalImagePath = function() {
	    return this.basePath ? this.basePath + this.path : BASE_PATH + this.getFolderPath() + this.path
	}, ImageModel.prototype.imagePathForResolution = function(a) {
	    return this.basePath ? this.basePath + a.path + "/" + this.path : BASE_PATH + this.getFolderPath() + a.path + "/" + this.path
	}, ImageModel.prototype.imagePathForPixelHeight = function(a) {
	    for (var b = ImageModel.resolutions, c = b.length; c--;) {
	        var d = b[c];
	        if (d.height >= a) break
	    }
	    var e = this.cacheMap;
	    return e[d.path] = !0, this.imagePathForResolution(d)
	}, ImageModel.prototype.cachedImagePathUpToPixelHeight = function(a) {
	    for (var b = ImageModel.resolutions, c = this.cacheMap, d = 0; d < b.length; d++) {
	        var e = b[d];
	        if (!(e.height > a) && c[e.path]) return this.imagePathForResolution(e)
	    }
	    return this.imagePathForPixelHeight(a)
	};
