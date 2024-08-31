/*! Video.js v4.9.1 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
/* Adapted by UesleiDev | AnimeFire Database Videos Access Granted */
(function() {
    var b = void 0,
        f = !0,
        j = null,
        l = !1;

    function m() {
        return function() {}
    }

    function p(a) {
        return function() {
            return this[a]
        }
    }

    function q(a) {
        return function() {
            return a
        }
    }
    var s;
    document.createElement("video");
    document.createElement("audio");
    document.createElement("track");

    function t(a, c, d) {
        if ("string" === typeof a) {
            0 === a.indexOf("#") && (a = a.slice(1));
            if (t.Ba[a]) return t.Ba[a];
            a = t.v(a)
        }
        if (!a || !a.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return a.player || new t.Player(a, c, d)
    }
    var videojs = window.videojs = t;
    t.Ub = "4.9";
    t.Uc = "https:" == document.location.protocol ? "https://" : "http://";
    t.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        playbackRates: [],
        inactivityTimeout: 2E3,
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {}
        },
        language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.we || navigator.language || "en",
        languages: {},
        notSupportedMessage: "No compatible source was found for this video."
    };
    "GENERATED_CDN_VSN" !== t.Ub && (videojs.options.flash.swf = t.Uc + "vjs.zencdn.net/" + t.Ub + "/video-js.swf");
    t.fd = function(a, c) {
        t.options.languages[a] = t.options.languages[a] !== b ? t.ga.Va(t.options.languages[a], c) : c;
        return t.options.languages
    };
    t.Ba = {};
    "function" === typeof define && define.amd ? define([], function() {
        return videojs
    }) : "object" === typeof exports && "object" === typeof module && (module.exports = videojs);
    t.qa = t.CoreObject = m();
    t.qa.extend = function(a) {
        var c, d;
        a = a || {};
        c = a.init || a.i || this.prototype.init || this.prototype.i || m();
        d = function() {
            c.apply(this, arguments)
        };
        d.prototype = t.g.create(this.prototype);
        d.prototype.constructor = d;
        d.extend = t.qa.extend;
        d.create = t.qa.create;
        for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e]);
        return d
    };
    t.qa.create = function() {
        var a = t.g.create(this.prototype);
        this.apply(a, arguments);
        return a
    };
    t.d = function(a, c, d) {
        if (t.g.isArray(c)) return u(t.d, a, c, d);
        var e = t.getData(a);
        e.C || (e.C = {});
        e.C[c] || (e.C[c] = []);
        d.w || (d.w = t.w++);
        e.C[c].push(d);
        e.X || (e.disabled = l, e.X = function(c) {
            if (!e.disabled) {
                c = t.qc(c);
                var d = e.C[c.type];
                if (d)
                    for (var d = d.slice(0), k = 0, n = d.length; k < n && !c.yc(); k++) d[k].call(a, c)
            }
        });
        1 == e.C[c].length && (a.addEventListener ? a.addEventListener(c, e.X, l) : a.attachEvent && a.attachEvent("on" + c, e.X))
    };
    t.o = function(a, c, d) {
        if (t.tc(a)) {
            var e = t.getData(a);
            if (e.C) {
                if (t.g.isArray(c)) return u(t.o, a, c, d);
                if (c) {
                    var g = e.C[c];
                    if (g) {
                        if (d) {
                            if (d.w)
                                for (e = 0; e < g.length; e++) g[e].w === d.w && g.splice(e--, 1)
                        } else e.C[c] = [];
                        t.jc(a, c)
                    }
                } else
                    for (g in e.C) c = g, e.C[c] = [], t.jc(a, c)
            }
        }
    };
    t.jc = function(a, c) {
        var d = t.getData(a);
        0 === d.C[c].length && (delete d.C[c], a.removeEventListener ? a.removeEventListener(c, d.X, l) : a.detachEvent && a.detachEvent("on" + c, d.X));
        t.Hb(d.C) && (delete d.C, delete d.X, delete d.disabled);
        t.Hb(d) && t.Hc(a)
    };
    t.qc = function(a) {
        function c() {
            return f
        }

        function d() {
            return l
        }
        if (!a || !a.Ib) {
            var e = a || window.event;
            a = {};
            for (var g in e) "layerX" !== g && ("layerY" !== g && "keyboardEvent.keyLocation" !== g) && ("returnValue" == g && e.preventDefault || (a[g] = e[g]));
            a.target || (a.target = a.srcElement || document);
            a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            a.preventDefault = function() {
                e.preventDefault && e.preventDefault();
                a.returnValue = l;
                a.zd = c;
                a.defaultPrevented = f
            };
            a.zd = d;
            a.defaultPrevented = l;
            a.stopPropagation = function() {
                e.stopPropagation &&
                    e.stopPropagation();
                a.cancelBubble = f;
                a.Ib = c
            };
            a.Ib = d;
            a.stopImmediatePropagation = function() {
                e.stopImmediatePropagation && e.stopImmediatePropagation();
                a.yc = c;
                a.stopPropagation()
            };
            a.yc = d;
            if (a.clientX != j) {
                g = document.documentElement;
                var h = document.body;
                a.pageX = a.clientX + (g && g.scrollLeft || h && h.scrollLeft || 0) - (g && g.clientLeft || h && h.clientLeft || 0);
                a.pageY = a.clientY + (g && g.scrollTop || h && h.scrollTop || 0) - (g && g.clientTop || h && h.clientTop || 0)
            }
            a.which = a.charCode || a.keyCode;
            a.button != j && (a.button = a.button & 1 ? 0 : a.button &
                4 ? 1 : a.button & 2 ? 2 : 0)
        }
        return a
    };
    t.k = function(a, c) {
        var d = t.tc(a) ? t.getData(a) : {},
            e = a.parentNode || a.ownerDocument;
        "string" === typeof c && (c = {
            type: c,
            target: a
        });
        c = t.qc(c);
        d.X && d.X.call(a, c);
        if (e && !c.Ib() && c.bubbles !== l) t.k(e, c);
        else if (!e && !c.defaultPrevented && (d = t.getData(c.target), c.target[c.type])) {
            d.disabled = f;
            if ("function" === typeof c.target[c.type]) c.target[c.type]();
            d.disabled = l
        }
        return !c.defaultPrevented
    };
    t.Q = function(a, c, d) {
        function e() {
            t.o(a, c, e);
            d.apply(this, arguments)
        }
        if (t.g.isArray(c)) return u(t.Q, a, c, d);
        e.w = d.w = d.w || t.w++;
        t.d(a, c, e)
    };

    function u(a, c, d, e) {
        t.hc.forEach(d, function(d) {
            a(c, d, e)
        })
    }
    var v = Object.prototype.hasOwnProperty;
    t.e = function(a, c) {
        var d;
        c = c || {};
        d = document.createElement(a || "div");
        t.g.Y(c, function(a, c) {
            -1 !== a.indexOf("aria-") || "role" == a ? d.setAttribute(a, c) : d[a] = c
        });
        return d
    };
    t.ba = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    };
    t.g = {};
    t.g.create = Object.create || function(a) {
        function c() {}
        c.prototype = a;
        return new c
    };
    t.g.Y = function(a, c, d) {
        for (var e in a) v.call(a, e) && c.call(d || this, e, a[e])
    };
    t.g.z = function(a, c) {
        if (!c) return a;
        for (var d in c) v.call(c, d) && (a[d] = c[d]);
        return a
    };
    t.g.od = function(a, c) {
        var d, e, g;
        a = t.g.copy(a);
        for (d in c) v.call(c, d) && (e = a[d], g = c[d], a[d] = t.g.Ta(e) && t.g.Ta(g) ? t.g.od(e, g) : c[d]);
        return a
    };
    t.g.copy = function(a) {
        return t.g.z({}, a)
    };
    t.g.Ta = function(a) {
        return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object
    };
    t.g.isArray = Array.isArray || function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    };
    t.Bd = function(a) {
        return a !== a
    };
    t.bind = function(a, c, d) {
        function e() {
            return c.apply(a, arguments)
        }
        c.w || (c.w = t.w++);
        e.w = d ? d + "_" + c.w : c.w;
        return e
    };
    t.ua = {};
    t.w = 1;
    t.expando = "vdata" + (new Date).getTime();
    t.getData = function(a) {
        var c = a[t.expando];
        c || (c = a[t.expando] = t.w++, t.ua[c] = {});
        return t.ua[c]
    };
    t.tc = function(a) {
        a = a[t.expando];
        return !(!a || t.Hb(t.ua[a]))
    };
    t.Hc = function(a) {
        var c = a[t.expando];
        if (c) {
            delete t.ua[c];
            try {
                delete a[t.expando]
            } catch (d) {
                a.removeAttribute ? a.removeAttribute(t.expando) : a[t.expando] = j
            }
        }
    };
    t.Hb = function(a) {
        for (var c in a)
            if (a[c] !== j) return l;
        return f
    };
    t.Sa = function(a, c) {
        return -1 !== (" " + a.className + " ").indexOf(" " + c + " ")
    };
    t.m = function(a, c) {
        t.Sa(a, c) || (a.className = "" === a.className ? c : a.className + " " + c)
    };
    t.p = function(a, c) {
        var d, e;
        if (t.Sa(a, c)) {
            d = a.className.split(" ");
            for (e = d.length - 1; 0 <= e; e--) d[e] === c && d.splice(e, 1);
            a.className = d.join(" ")
        }
    };
    t.A = t.e("video");
    t.N = navigator.userAgent;
    t.$c = /iPhone/i.test(t.N);
    t.Zc = /iPad/i.test(t.N);
    t.ad = /iPod/i.test(t.N);
    t.Yc = t.$c || t.Zc || t.ad;
    var aa = t,
        x;
    var y = t.N.match(/OS (\d+)_/i);
    x = y && y[1] ? y[1] : b;
    aa.le = x;
    t.Wc = /Android/i.test(t.N);
    var ba = t,
        z;
    var A = t.N.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
        B, C;
    A ? (B = A[1] && parseFloat(A[1]), C = A[2] && parseFloat(A[2]), z = B && C ? parseFloat(A[1] + "." + A[2]) : B ? B : j) : z = j;
    ba.Tb = z;
    t.bd = t.Wc && /webkit/i.test(t.N) && 2.3 > t.Tb;
    t.Xc = /Firefox/i.test(t.N);
    t.me = /Chrome/i.test(t.N);
    t.dc = !!("ontouchstart" in window || window.Vc && document instanceof window.Vc);
    t.Jc = function(a, c) {
        t.g.Y(c, function(c, e) {
            e === j || "undefined" === typeof e || e === l ? a.removeAttribute(c) : a.setAttribute(c, e === f ? "" : e)
        })
    };
    t.za = function(a) {
        var c, d, e, g;
        c = {};
        if (a && a.attributes && 0 < a.attributes.length) {
            d = a.attributes;
            for (var h = d.length - 1; 0 <= h; h--) {
                e = d[h].name;
                g = d[h].value;
                if ("boolean" === typeof a[e] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + e + ",")) g = g !== j ? f : l;
                c[e] = g
            }
        }
        return c
    };
    t.se = function(a, c) {
        var d = "";
        document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(c) : a.currentStyle && (d = a["client" + c.substr(0, 1).toUpperCase() + c.substr(1)] + "px");
        return d
    };
    t.Gb = function(a, c) {
        c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a)
    };
    t.Oa = {};
    t.v = function(a) {
        0 === a.indexOf("#") && (a = a.slice(1));
        return document.getElementById(a)
    };
    t.ya = function(a, c) {
        c = c || a;
        var d = Math.floor(a % 60),
            e = Math.floor(a / 60 % 60),
            g = Math.floor(a / 3600),
            h = Math.floor(c / 60 % 60),
            k = Math.floor(c / 3600);
        if (isNaN(a) || Infinity === a) g = e = d = "-";
        g = 0 < g || 0 < k ? g + ":" : "";
        return g + (((g || 10 <= h) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d)
    };
    t.hd = function() {
        document.body.focus();
        document.onselectstart = q(l)
    };
    t.he = function() {
        document.onselectstart = q(f)
    };
    t.trim = function(a) {
        return (a + "").replace(/^\s+|\s+$/g, "")
    };
    t.round = function(a, c) {
        c || (c = 0);
        return Math.round(a * Math.pow(10, c)) / Math.pow(10, c)
    };
    t.zb = function(a, c) {
        return {
            length: 1,
            start: function() {
                return a
            },
            end: function() {
                return c
            }
        }
    };
    t.get = function(a, c, d, e) {
        var g, h, k, n;
        d = d || m();
        "undefined" === typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (a) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (c) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (d) {}
            throw Error("This browser does not support XMLHttpRequest.");
        });
        h = new XMLHttpRequest;
        k = t.Ud(a);
        n = window.location;
        k.protocol + k.host !== n.protocol + n.host && window.XDomainRequest && !("withCredentials" in
            h) ? (h = new window.XDomainRequest, h.onload = function() {
            c(h.responseText)
        }, h.onerror = d, h.onprogress = m(), h.ontimeout = d) : (g = "file:" == k.protocol || "file:" == n.protocol, h.onreadystatechange = function() {
            4 === h.readyState && (200 === h.status || g && 0 === h.status ? c(h.responseText) : d(h.responseText))
        });
        try {
            h.open("GET", a, f).setRequestHeader("referer", "https://animefire.plus/"), e && (h.withCredentials = f)
        } catch (r) {
            d(r);
            return
        }
        try {
            h.send()
        } catch (w) {
            d(w)
        }
    };
    t.Yd = function(a) {
        try {
            var c = window.localStorage || l;
            c && (c.volume = a)
        } catch (d) {
            22 == d.code || 1014 == d.code ? t.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? t.log("LocalStorage not allowed (VideoJS)", d) : t.log("LocalStorage Error (VideoJS)", d)
        }
    };
    t.sc = function(a) {
        a.match(/^https?:\/\//) || (a = t.e("div", {
            innerHTML: '<a href="' + a + '">x</a>'
        }).firstChild.href);
        return a
    };
    t.Ud = function(a) {
        var c, d, e, g;
        g = "protocol hostname port pathname search hash host".split(" ");
        d = t.e("a", {
            href: a
        });
        if (e = "" === d.host && "file:" !== d.protocol) c = t.e("div"), c.innerHTML = '<a href="' + a + '"></a>', d = c.firstChild, c.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(c);
        a = {};
        for (var h = 0; h < g.length; h++) a[g[h]] = d[g[h]];
        e && document.body.removeChild(c);
        return a
    };

    function D(a, c) {
        var d, e;
        d = Array.prototype.slice.call(c);
        e = m();
        e = window.console || {
            log: e,
            warn: e,
            error: e
        };
        a ? d.unshift(a.toUpperCase() + ":") : a = "log";
        t.log.history.push(d);
        d.unshift("VIDEOJS:");
        if (e[a].apply) e[a].apply(e, d);
        else e[a](d.join(" "))
    }
    t.log = function() {
        D(j, arguments)
    };
    t.log.history = [];
    t.log.error = function() {
        D("error", arguments)
    };
    t.log.warn = function() {
        D("warn", arguments)
    };
    t.vd = function(a) {
        var c, d;
        a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect());
        if (!c) return {
            left: 0,
            top: 0
        };
        a = document.documentElement;
        d = document.body;
        return {
            left: t.round(c.left + (window.pageXOffset || d.scrollLeft) - (a.clientLeft || d.clientLeft || 0)),
            top: t.round(c.top + (window.pageYOffset || d.scrollTop) - (a.clientTop || d.clientTop || 0))
        }
    };
    t.hc = {};
    t.hc.forEach = function(a, c, d) {
        if (t.g.isArray(a) && c instanceof Function)
            for (var e = 0, g = a.length; e < g; ++e) c.call(d || t, a[e], e, a);
        return a
    };
    t.ga = {};
    t.ga.Va = function(a, c) {
        var d, e, g;
        a = t.g.copy(a);
        for (d in c) c.hasOwnProperty(d) && (e = a[d], g = c[d], a[d] = t.g.Ta(e) && t.g.Ta(g) ? t.ga.Va(e, g) : c[d]);
        return a
    };
    t.a = t.qa.extend({
        i: function(a, c, d) {
            this.c = a;
            this.l = t.g.copy(this.l);
            c = this.options(c);
            this.U = c.id || (c.el && c.el.id ? c.el.id : a.id() + "_component_" + t.w++);
            this.Hd = c.name || j;
            this.b = c.el || this.e();
            this.O = [];
            this.Pa = {};
            this.Qa = {};
            this.vc();
            this.J(d);
            if (c.Ic !== l) {
                var e, g;
                e = t.bind(this.j(), this.j().reportUserActivity);
                this.d("touchstart", function() {
                    e();
                    clearInterval(g);
                    g = setInterval(e, 250)
                });
                a = function() {
                    e();
                    clearInterval(g)
                };
                this.d("touchmove", e);
                this.d("touchend", a);
                this.d("touchcancel", a)
            }
        }
    });
    s = t.a.prototype;
    s.dispose = function() {
        this.k({
            type: "dispose",
            bubbles: l
        });
        if (this.O)
            for (var a = this.O.length - 1; 0 <= a; a--) this.O[a].dispose && this.O[a].dispose();
        this.Qa = this.Pa = this.O = j;
        this.o();
        this.b.parentNode && this.b.parentNode.removeChild(this.b);
        t.Hc(this.b);
        this.b = j
    };
    s.c = f;
    s.j = p("c");
    s.options = function(a) {
        return a === b ? this.l : this.l = t.ga.Va(this.l, a)
    };
    s.e = function(a, c) {
        return t.e(a, c)
    };
    s.s = function(a) {
        var c = this.c.language(),
            d = this.c.languages();
        return d && d[c] && d[c][a] ? d[c][a] : a
    };
    s.v = p("b");
    s.ja = function() {
        return this.u || this.b
    };
    s.id = p("U");
    s.name = p("Hd");
    s.children = p("O");
    s.xd = function(a) {
        return this.Pa[a]
    };
    s.ka = function(a) {
        return this.Qa[a]
    };
    s.S = function(a, c) {
        var d, e;
        "string" === typeof a ? (e = a, c = c || {}, d = c.componentClass || t.ba(e), c.name = e, d = new window.videojs[d](this.c || this, c)) : d = a;
        this.O.push(d);
        "function" === typeof d.id && (this.Pa[d.id()] = d);
        (e = e || d.name && d.name()) && (this.Qa[e] = d);
        "function" === typeof d.el && d.el() && this.ja().appendChild(d.el());
        return d
    };
    s.removeChild = function(a) {
        "string" === typeof a && (a = this.ka(a));
        if (a && this.O) {
            for (var c = l, d = this.O.length - 1; 0 <= d; d--)
                if (this.O[d] === a) {
                    c = f;
                    this.O.splice(d, 1);
                    break
                } c && (this.Pa[a.id] = j, this.Qa[a.name] = j, (c = a.v()) && c.parentNode === this.ja() && this.ja().removeChild(a.v()))
        }
    };
    s.vc = function() {
        var a, c, d, e;
        a = this;
        if (c = this.options().children)
            if (t.g.isArray(c))
                for (var g = 0; g < c.length; g++) d = c[g], "string" == typeof d ? (e = d, d = {}) : e = d.name, a[e] = a.S(e, d);
            else t.g.Y(c, function(c, d) {
                d !== l && (a[c] = a.S(c, d))
            })
    };
    s.T = q("");
    s.d = function(a, c) {
        t.d(this.b, a, t.bind(this, c));
        return this
    };
    s.o = function(a, c) {
        t.o(this.b, a, c);
        return this
    };
    s.Q = function(a, c) {
        t.Q(this.b, a, t.bind(this, c));
        return this
    };
    s.k = function(a) {
        t.k(this.b, a);
        return this
    };
    s.J = function(a) {
        a && (this.la ? a.call(this) : (this.ab === b && (this.ab = []), this.ab.push(a)));
        return this
    };
    s.Fa = function() {
        this.la = f;
        var a = this.ab;
        if (a && 0 < a.length) {
            for (var c = 0, d = a.length; c < d; c++) a[c].call(this);
            this.ab = [];
            this.k("ready")
        }
    };
    s.Sa = function(a) {
        return t.Sa(this.b, a)
    };
    s.m = function(a) {
        t.m(this.b, a);
        return this
    };
    s.p = function(a) {
        t.p(this.b, a);
        return this
    };
    s.show = function() {
        this.b.style.display = "block";
        return this
    };
    s.W = function() {
        this.b.style.display = "none";
        return this
    };

    function E(a) {
        a.p("vjs-lock-showing")
    }
    s.disable = function() {
        this.W();
        this.show = m()
    };
    s.width = function(a, c) {
        return F(this, "width", a, c)
    };
    s.height = function(a, c) {
        return F(this, "height", a, c)
    };
    s.rd = function(a, c) {
        return this.width(a, f).height(c)
    };

    function F(a, c, d, e) {
        if (d !== b) {
            if (d === j || t.Bd(d)) d = 0;
            a.b.style[c] = -1 !== ("" + d).indexOf("%") || -1 !== ("" + d).indexOf("px") ? d : "auto" === d ? "" : d + "px";
            e || a.k("resize");
            return a
        }
        if (!a.b) return 0;
        d = a.b.style[c];
        e = d.indexOf("px");
        return -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(a.b["offset" + t.ba(c)], 10)
    }

    function G(a) {
        var c, d, e, g, h, k, n, r;
        c = 0;
        d = j;
        a.d("touchstart", function(a) {
            1 === a.touches.length && (d = a.touches[0], c = (new Date).getTime(), g = f)
        });
        a.d("touchmove", function(a) {
            1 < a.touches.length ? g = l : d && (k = a.touches[0].pageX - d.pageX, n = a.touches[0].pageY - d.pageY, r = Math.sqrt(k * k + n * n), 22 < r && (g = l))
        });
        h = function() {
            g = l
        };
        a.d("touchleave", h);
        a.d("touchcancel", h);
        a.d("touchend", function(a) {
            d = j;
            g === f && (e = (new Date).getTime() - c, 250 > e && (a.preventDefault(), this.k("tap")))
        })
    }
    t.t = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            G(this);
            this.d("tap", this.r);
            this.d("click", this.r);
            this.d("focus", this.Ya);
            this.d("blur", this.Xa)
        }
    });
    s = t.t.prototype;
    s.e = function(a, c) {
        var d;
        c = t.g.z({
            className: this.T(),
            role: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, c);
        d = t.a.prototype.e.call(this, a, c);
        c.innerHTML || (this.u = t.e("div", {
            className: "vjs-control-content"
        }), this.xb = t.e("span", {
            className: "vjs-control-text",
            innerHTML: this.s(this.ta) || "Need Text"
        }), this.u.appendChild(this.xb), d.appendChild(this.u));
        return d
    };
    s.T = function() {
        return "vjs-control " + t.a.prototype.T.call(this)
    };
    s.r = m();
    s.Ya = function() {
        t.d(document, "keydown", t.bind(this, this.Z))
    };
    s.Z = function(a) {
        if (32 == a.which || 13 == a.which) a.preventDefault(), this.r()
    };
    s.Xa = function() {
        t.o(document, "keydown", t.bind(this, this.Z))
    };
    t.R = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            this.gd = this.ka(this.l.barName);
            this.handle = this.ka(this.l.handleName);
            this.d("mousedown", this.Za);
            this.d("touchstart", this.Za);
            this.d("focus", this.Ya);
            this.d("blur", this.Xa);
            this.d("click", this.r);
            this.c.d("controlsvisible", t.bind(this, this.update));
            a.d(this.Dc, t.bind(this, this.update));
            this.F = {};
            this.F.move = t.bind(this, this.$a);
            this.F.end = t.bind(this, this.Lb)
        }
    });
    s = t.R.prototype;
    s.dispose = function() {
        t.o(document, "mousemove", this.F.move, l);
        t.o(document, "mouseup", this.F.end, l);
        t.o(document, "touchmove", this.F.move, l);
        t.o(document, "touchend", this.F.end, l);
        t.o(document, "keyup", t.bind(this, this.Z));
        t.a.prototype.dispose.call(this)
    };
    s.e = function(a, c) {
        c = c || {};
        c.className += " vjs-slider";
        c = t.g.z({
            role: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, c);
        return t.a.prototype.e.call(this, a, c)
    };
    s.Za = function(a) {
        a.preventDefault();
        t.hd();
        this.m("vjs-sliding");
        t.d(document, "mousemove", this.F.move);
        t.d(document, "mouseup", this.F.end);
        t.d(document, "touchmove", this.F.move);
        t.d(document, "touchend", this.F.end);
        this.$a(a)
    };
    s.$a = m();
    s.Lb = function() {
        t.he();
        this.p("vjs-sliding");
        t.o(document, "mousemove", this.F.move, l);
        t.o(document, "mouseup", this.F.end, l);
        t.o(document, "touchmove", this.F.move, l);
        t.o(document, "touchend", this.F.end, l);
        this.update()
    };
    s.update = function() {
        if (this.b) {
            var a, c = this.Fb(),
                d = this.handle,
                e = this.gd;
            isNaN(c) && (c = 0);
            a = c;
            if (d) {
                a = this.b.offsetWidth;
                var g = d.v().offsetWidth;
                a = g ? g / a : 0;
                c *= 1 - a;
                a = c + a / 2;
                d.v().style.left = t.round(100 * c, 2) + "%"
            }
            e && (e.v().style.width = t.round(100 * a, 2) + "%")
        }
    };

    function H(a, c) {
        var d, e, g, h;
        d = a.b;
        e = t.vd(d);
        h = g = d.offsetWidth;
        d = a.handle;
        if (a.options().vertical) return h = e.top, e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY, d && (d = d.v().offsetHeight, h += d / 2, g -= d), Math.max(0, Math.min(1, (h - e + g) / g));
        g = e.left;
        e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX;
        d && (d = d.v().offsetWidth, g += d / 2, h -= d);
        return Math.max(0, Math.min(1, (e - g) / h))
    }
    s.Ya = function() {
        t.d(document, "keyup", t.bind(this, this.Z))
    };
    s.Z = function(a) {
        if (37 == a.which || 40 == a.which) a.preventDefault(), this.Mc();
        else if (38 == a.which || 39 == a.which) a.preventDefault(), this.Nc()
    };
    s.Xa = function() {
        t.o(document, "keyup", t.bind(this, this.Z))
    };
    s.r = function(a) {
        a.stopImmediatePropagation();
        a.preventDefault()
    };
    t.$ = t.a.extend();
    t.$.prototype.defaultValue = 0;
    t.$.prototype.e = function(a, c) {
        c = c || {};
        c.className += " vjs-slider-handle";
        c = t.g.z({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, c);
        return t.a.prototype.e.call(this, "div", c)
    };
    t.ha = t.a.extend();

    function ca(a, c) {
        a.S(c);
        c.d("click", t.bind(a, function() {
            E(this)
        }))
    }
    t.ha.prototype.e = function() {
        var a = this.options().kc || "ul";
        this.u = t.e(a, {
            className: "vjs-menu-content"
        });
        a = t.a.prototype.e.call(this, "div", {
            append: this.u,
            className: "vjs-menu"
        });
        a.appendChild(this.u);
        t.d(a, "click", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation()
        });
        return a
    };
    t.I = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            this.selected(c.selected)
        }
    });
    t.I.prototype.e = function(a, c) {
        return t.t.prototype.e.call(this, "li", t.g.z({
            className: "vjs-menu-item",
            innerHTML: this.l.label
        }, c))
    };
    t.I.prototype.r = function() {
        this.selected(f)
    };
    t.I.prototype.selected = function(a) {
        a ? (this.m("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.p("vjs-selected"), this.b.setAttribute("aria-selected", l))
    };
    t.M = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            this.Aa = this.wa();
            this.S(this.Aa);
            this.P && 0 === this.P.length && this.W();
            this.d("keyup", this.Z);
            this.b.setAttribute("aria-haspopup", f);
            this.b.setAttribute("role", "button")
        }
    });
    s = t.M.prototype;
    s.sa = l;
    s.wa = function() {
        var a = new t.ha(this.c);
        this.options().title && a.ja().appendChild(t.e("li", {
            className: "vjs-menu-title",
            innerHTML: t.ba(this.options().title),
            ee: -1
        }));
        if (this.P = this.createItems())
            for (var c = 0; c < this.P.length; c++) ca(a, this.P[c]);
        return a
    };
    s.va = m();
    s.T = function() {
        return this.className + " vjs-menu-button " + t.t.prototype.T.call(this)
    };
    s.Ya = m();
    s.Xa = m();
    s.r = function() {
        this.Q("mouseout", t.bind(this, function() {
            E(this.Aa);
            this.b.blur()
        }));
        this.sa ? I(this) : J(this)
    };
    s.Z = function(a) {
        a.preventDefault();
        32 == a.which || 13 == a.which ? this.sa ? I(this) : J(this) : 27 == a.which && this.sa && I(this)
    };

    function J(a) {
        a.sa = f;
        a.Aa.m("vjs-lock-showing");
        a.b.setAttribute("aria-pressed", f);
        a.P && 0 < a.P.length && a.P[0].v().focus()
    }

    function I(a) {
        a.sa = l;
        E(a.Aa);
        a.b.setAttribute("aria-pressed", l)
    }
    t.D = function(a) {
        "number" === typeof a ? this.code = a : "string" === typeof a ? this.message = a : "object" === typeof a && t.g.z(this, a);
        this.message || (this.message = t.D.pd[this.code] || "")
    };
    t.D.prototype.code = 0;
    t.D.prototype.message = "";
    t.D.prototype.status = j;
    t.D.Ra = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
    t.D.pd = {
        1: "You aborted the video playback",
        2: "A network error caused the video download to fail part-way.",
        3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
        4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
        5: "The video is encrypted and we do not have the keys to decrypt it."
    };
    for (var K = 0; K < t.D.Ra.length; K++) t.D[t.D.Ra[K]] = K, t.D.prototype[t.D.Ra[K]] = K;
    var L, M, N, O;
    L = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")];
    M = L[0];
    for (O = 0; O < L.length; O++)
        if (L[O][1] in document) {
            N = L[O];
            break
        } if (N) {
        t.Oa.Eb = {};
        for (O = 0; O < N.length; O++) t.Oa.Eb[M[O]] = N[O]
    }
    t.Player = t.a.extend({
        i: function(a, c, d) {
            this.L = a;
            a.id = a.id || "vjs_video_" + t.w++;
            this.fe = a && t.za(a);
            c = t.g.z(da(a), c);
            this.Ua = c.language || t.options.language;
            this.Fd = c.languages || t.options.languages;
            this.G = {};
            this.Ec = c.poster;
            this.yb = c.controls;
            a.controls = l;
            c.Ic = l;
            P(this, "audio" === this.L.nodeName.toLowerCase());
            t.a.call(this, this, c, d);
            this.controls() ? this.m("vjs-controls-enabled") : this.m("vjs-controls-disabled");
            P(this) && this.m("vjs-audio");
            t.Ba[this.U] = this;
            c.plugins && t.g.Y(c.plugins, function(a, c) {
                    this[a](c)
                },
                this);
            var e, g, h, k, n, r;
            e = t.bind(this, this.reportUserActivity);
            this.d("mousedown", function() {
                e();
                clearInterval(g);
                g = setInterval(e, 250)
            });
            this.d("mousemove", function(a) {
                if (a.screenX != n || a.screenY != r) n = a.screenX, r = a.screenY, e()
            });
            this.d("mouseup", function() {
                e();
                clearInterval(g)
            });
            this.d("keydown", e);
            this.d("keyup", e);
            h = setInterval(t.bind(this, function() {
                if (this.pa) {
                    this.pa = l;
                    this.userActive(f);
                    clearTimeout(k);
                    var a = this.options().inactivityTimeout;
                    0 < a && (k = setTimeout(t.bind(this, function() {
                            this.pa || this.userActive(l)
                        }),
                        a))
                }
            }), 250);
            this.d("dispose", function() {
                clearInterval(h);
                clearTimeout(k)
            })
        }
    });
    s = t.Player.prototype;
    s.language = function(a) {
        if (a === b) return this.Ua;
        this.Ua = a;
        return this
    };
    s.languages = p("Fd");
    s.l = t.options;
    s.dispose = function() {
        this.k("dispose");
        this.o("dispose");
        t.Ba[this.U] = j;
        this.L && this.L.player && (this.L.player = j);
        this.b && this.b.player && (this.b.player = j);
        this.n && this.n.dispose();
        t.a.prototype.dispose.call(this)
    };

    function da(a) {
        var c, d, e = {
            sources: [],
            tracks: []
        };
        c = t.za(a);
        d = c["data-setup"];
        d !== j && t.g.z(c, t.JSON.parse(d || "{}"));
        t.g.z(e, c);
        if (a.hasChildNodes()) {
            var g, h;
            a = a.childNodes;
            g = 0;
            for (h = a.length; g < h; g++) c = a[g], d = c.nodeName.toLowerCase(), "source" === d ? e.sources.push(t.za(c)) : "track" === d && e.tracks.push(t.za(c))
        }
        return e
    }
    s.e = function() {
        var a = this.b = t.a.prototype.e.call(this, "div"),
            c = this.L,
            d;
        c.removeAttribute("width");
        c.removeAttribute("height");
        if (c.hasChildNodes()) {
            var e, g, h, k, n;
            e = c.childNodes;
            g = e.length;
            for (n = []; g--;) h = e[g], k = h.nodeName.toLowerCase(), "track" === k && n.push(h);
            for (e = 0; e < n.length; e++) c.removeChild(n[e])
        }
        d = t.za(c);
        t.g.Y(d, function(c) {
            "class" == c ? a.className = d[c] : a.setAttribute(c, d[c])
        });
        c.id += "_html5_api";
        c.className = "vjs-tech";
        c.player = a.player = this;
        this.m("vjs-paused");
        this.width(this.l.width, f);
        this.height(this.l.height,
            f);
        c.parentNode && c.parentNode.insertBefore(a, c);
        t.Gb(c, a);
        this.b = a;
        this.d("loadstart", this.Md);
        this.d("waiting", this.Sd);
        this.d(["canplay", "canplaythrough", "playing", "ended"], this.Rd);
        this.d("seeking", this.Pd);
        this.d("seeked", this.Od);
        this.d("ended", this.Id);
        this.d("play", this.Nb);
        this.d("firstplay", this.Kd);
        this.d("pause", this.Mb);
        this.d("progress", this.Nd);
        this.d("durationchange", this.Bc);
        this.d("fullscreenchange", this.Ld);
        return a
    };

    function Q(a, c, d) {
        a.n && (a.la = l, a.n.dispose(), a.n = l);
        "Html5" !== c && a.L && (t.h.Bb(a.L), a.L = j);
        a.eb = c;
        a.la = l;
        var e = t.g.z({
            source: d,
            parentEl: a.b
        }, a.l[c.toLowerCase()]);
        d && (a.mc = d.type, d.src == a.G.src && 0 < a.G.currentTime && (e.startTime = a.G.currentTime), a.G.src = d.src);
        a.n = new window.videojs[c](a, e);
        a.n.J(function() {
            this.c.Fa()
        })
    }
    s.Md = function() {
        this.error(j);
        this.paused() ? (R(this, l), this.Q("play", function() {
            R(this, f)
        })) : this.k("firstplay")
    };
    s.uc = l;

    function R(a, c) {
        c !== b && a.uc !== c && ((a.uc = c) ? (a.m("vjs-has-started"), a.k("firstplay")) : a.p("vjs-has-started"))
    }
    s.Nb = function() {
        this.p("vjs-paused");
        this.m("vjs-playing")
    };
    s.Sd = function() {
        this.m("vjs-waiting")
    };
    s.Rd = function() {
        this.p("vjs-waiting")
    };
    s.Pd = function() {
        this.m("vjs-seeking")
    };
    s.Od = function() {
        this.p("vjs-seeking")
    };
    s.Kd = function() {
        this.l.starttime && this.currentTime(this.l.starttime);
        this.m("vjs-has-started")
    };
    s.Mb = function() {
        this.p("vjs-playing");
        this.m("vjs-paused")
    };
    s.Nd = function() {
        1 == this.bufferedPercent() && this.k("loadedalldata")
    };
    s.Id = function() {
        this.l.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause()
    };
    s.Bc = function() {
        var a = S(this, "duration");
        a && (0 > a && (a = Infinity), this.duration(a), Infinity === a ? this.m("vjs-live") : this.p("vjs-live"))
    };
    s.Ld = function() {
        this.isFullscreen() ? this.m("vjs-fullscreen") : this.p("vjs-fullscreen")
    };

    function T(a, c, d) {
        if (a.n && !a.n.la) a.n.J(function() {
            this[c](d)
        });
        else try {
            a.n[c](d)
        } catch (e) {
            throw t.log(e), e;
        }
    }

    function S(a, c) {
        if (a.n && a.n.la) try {
            return a.n[c]()
        } catch (d) {
            throw a.n[c] === b ? t.log("Video.js: " + c + " method not defined for " + a.eb + " playback technology.", d) : "TypeError" == d.name ? (t.log("Video.js: " + c + " unavailable on " + a.eb + " playback technology element.", d), a.n.la = l) : t.log(d), d;
        }
    }
    s.play = function() {
        T(this, "play");
        return this
    };
    s.pause = function() {
        T(this, "pause");
        return this
    };
    s.paused = function() {
        return S(this, "paused") === l ? l : f
    };
    s.currentTime = function(a) {
        return a !== b ? (T(this, "setCurrentTime", a), this) : this.G.currentTime = S(this, "currentTime") || 0
    };
    s.duration = function(a) {
        if (a !== b) return this.G.duration = parseFloat(a), this;
        this.G.duration === b && this.Bc();
        return this.G.duration || 0
    };
    s.remainingTime = function() {
        return this.duration() - this.currentTime()
    };
    s.buffered = function() {
        var a = S(this, "buffered");
        if (!a || !a.length) a = t.zb(0, 0);
        return a
    };
    s.bufferedPercent = function() {
        var a = this.duration(),
            c = this.buffered(),
            d = 0,
            e, g;
        if (!a) return 0;
        for (var h = 0; h < c.length; h++) e = c.start(h), g = c.end(h), g > a && (g = a), d += g - e;
        return d / a
    };
    s.volume = function(a) {
        if (a !== b) return a = Math.max(0, Math.min(1, parseFloat(a))), this.G.volume = a, T(this, "setVolume", a), t.Yd(a), this;
        a = parseFloat(S(this, "volume"));
        return isNaN(a) ? 1 : a
    };
    s.muted = function(a) {
        return a !== b ? (T(this, "setMuted", a), this) : S(this, "muted") || l
    };
    s.Da = function() {
        return S(this, "supportsFullScreen") || l
    };
    s.xc = l;
    s.isFullscreen = function(a) {
        return a !== b ? (this.xc = !!a, this) : this.xc
    };
    s.isFullScreen = function(a) {
        t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
        return this.isFullscreen(a)
    };
    s.requestFullscreen = function() {
        var a = t.Oa.Eb;
        this.isFullscreen(f);
        a ? (t.d(document, a.fullscreenchange, t.bind(this, function(c) {
            this.isFullscreen(document[a.fullscreenElement]);
            this.isFullscreen() === l && t.o(document, a.fullscreenchange, arguments.callee);
            this.k("fullscreenchange")
        })), this.b[a.requestFullscreen]()) : this.n.Da() ? T(this, "enterFullScreen") : (this.pc(), this.k("fullscreenchange"));
        return this
    };
    s.requestFullScreen = function() {
        t.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');
        return this.requestFullscreen()
    };
    s.exitFullscreen = function() {
        var a = t.Oa.Eb;
        this.isFullscreen(l);
        if (a) document[a.exitFullscreen]();
        else this.n.Da() ? T(this, "exitFullScreen") : (this.Cb(), this.k("fullscreenchange"));
        return this
    };
    s.cancelFullScreen = function() {
        t.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()");
        return this.exitFullscreen()
    };
    s.pc = function() {
        this.Ad = f;
        this.sd = document.documentElement.style.overflow;
        t.d(document, "keydown", t.bind(this, this.rc));
        document.documentElement.style.overflow = "hidden";
        t.m(document.body, "vjs-full-window");
        this.k("enterFullWindow")
    };
    s.rc = function(a) {
        27 === a.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : this.Cb())
    };
    s.Cb = function() {
        this.Ad = l;
        t.o(document, "keydown", this.rc);
        document.documentElement.style.overflow = this.sd;
        t.p(document.body, "vjs-full-window");
        this.k("exitFullWindow")
    };
    s.selectSource = function(a) {
        for (var c = 0, d = this.l.techOrder; c < d.length; c++) {
            var e = t.ba(d[c]),
                g = window.videojs[e];
            if (g) {
                if (g.isSupported())
                    for (var h = 0, k = a; h < k.length; h++) {
                        var n = k[h];
                        if (g.canPlaySource(n)) return {
                            source: n,
                            n: e
                        }
                    }
            } else t.log.error('The "' + e + '" tech is undefined. Skipped browser support check for that tech.')
        }
        return l
    };
    s.src = function(a) {
        if (a === b) return S(this, "src");
        t.g.isArray(a) ? U(this, a) : "string" === typeof a ? this.src({
            src: a
        }) : a instanceof Object && (a.type && !window.videojs[this.eb].canPlaySource(a) ? U(this, [a]) : (this.G.src = a.src, this.mc = a.type || "", this.J(function() {
            T(this, "src", a.src);
            "auto" == this.l.preload && this.load();
            this.l.autoplay && this.play()
        })));
        return this
    };

    function U(a, c) {
        var d = a.selectSource(c),
            e;
        d ? d.n === a.eb ? a.src(d.source) : Q(a, d.n, d.source) : (e = setTimeout(t.bind(a, function() {
            this.error({
                code: 4,
                message: this.s(this.options().notSupportedMessage)
            })
        }), 0), a.Fa(), a.d("dispose", function() {
            clearTimeout(e)
        }))
    }
    s.load = function() {
        T(this, "load");
        return this
    };
    s.currentSrc = function() {
        return S(this, "currentSrc") || this.G.src || ""
    };
    s.nd = function() {
        return this.mc || ""
    };
    s.Ca = function(a) {
        return a !== b ? (T(this, "setPreload", a), this.l.preload = a, this) : S(this, "preload")
    };
    s.autoplay = function(a) {
        return a !== b ? (T(this, "setAutoplay", a), this.l.autoplay = a, this) : S(this, "autoplay")
    };
    s.loop = function(a) {
        return a !== b ? (T(this, "setLoop", a), this.l.loop = a, this) : S(this, "loop")
    };
    s.poster = function(a) {
        if (a === b) return this.Ec;
        this.Ec = a;
        T(this, "setPoster", a);
        this.k("posterchange");
        return this
    };
    s.controls = function(a) {
        return a !== b ? (a = !!a, this.yb !== a && ((this.yb = a) ? (this.p("vjs-controls-disabled"), this.m("vjs-controls-enabled"), this.k("controlsenabled")) : (this.p("vjs-controls-enabled"), this.m("vjs-controls-disabled"), this.k("controlsdisabled"))), this) : this.yb
    };
    t.Player.prototype.Sb;
    s = t.Player.prototype;
    s.usingNativeControls = function(a) {
        return a !== b ? (a = !!a, this.Sb !== a && ((this.Sb = a) ? (this.m("vjs-using-native-controls"), this.k("usingnativecontrols")) : (this.p("vjs-using-native-controls"), this.k("usingcustomcontrols"))), this) : this.Sb
    };
    s.da = j;
    s.error = function(a) {
        if (a === b) return this.da;
        if (a === j) return this.da = a, this.p("vjs-error"), this;
        this.da = a instanceof t.D ? a : new t.D(a);
        this.k("error");
        this.m("vjs-error");
        t.log.error("(CODE:" + this.da.code + " " + t.D.Ra[this.da.code] + ")", this.da.message, this.da);
        return this
    };
    s.ended = function() {
        return S(this, "ended")
    };
    s.seeking = function() {
        return S(this, "seeking")
    };
    s.pa = f;
    s.reportUserActivity = function() {
        this.pa = f
    };
    s.Rb = f;
    s.userActive = function(a) {
        return a !== b ? (a = !!a, a !== this.Rb && ((this.Rb = a) ? (this.pa = f, this.p("vjs-user-inactive"), this.m("vjs-user-active"), this.k("useractive")) : (this.pa = l, this.n && this.n.Q("mousemove", function(a) {
            a.stopPropagation();
            a.preventDefault()
        }), this.p("vjs-user-active"), this.m("vjs-user-inactive"), this.k("userinactive"))), this) : this.Rb
    };
    s.playbackRate = function(a) {
        return a !== b ? (T(this, "setPlaybackRate", a), this) : this.n && this.n.featuresPlaybackRate ? S(this, "playbackRate") : 1
    };
    s.wc = l;

    function P(a, c) {
        return c !== b ? (a.wc = !!c, a) : a.wc
    }
    t.Ia = t.a.extend();
    t.Ia.prototype.l = {
        te: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            liveDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {},
            playbackRateMenuButton: {}
        }
    };
    t.Ia.prototype.e = function() {
        return t.e("div", {
            className: "vjs-control-bar"
        })
    };
    t.Xb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c)
        }
    });
    t.Xb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-live-controls vjs-control"
        });
        this.u = t.e("div", {
            className: "vjs-live-display",
            innerHTML: '<span class="vjs-control-text">' + this.s("Stream Type") + "</span>" + this.s("LIVE"),
            "aria-live": "off"
        });
        a.appendChild(this.u);
        return a
    };
    t.$b = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            a.d("play", t.bind(this, this.Nb));
            a.d("pause", t.bind(this, this.Mb))
        }
    });
    s = t.$b.prototype;
    s.ta = "Play";
    s.T = function() {
        return "vjs-play-control " + t.t.prototype.T.call(this)
    };
    s.r = function() {
        this.c.paused() ? this.c.play() : this.c.pause()
    };
    s.Nb = function() {
        t.p(this.b, "vjs-paused");
        t.m(this.b, "vjs-playing");
        this.b.children[0].children[0].innerHTML = this.s("Pause")
    };
    s.Mb = function() {
        t.p(this.b, "vjs-playing");
        t.m(this.b, "vjs-paused");
        this.b.children[0].children[0].innerHTML = this.s("Play")
    };
    t.hb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.fa))
        }
    });
    t.hb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-current-time vjs-time-controls vjs-control"
        });
        this.u = t.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        });
        a.appendChild(this.u);
        return a
    };
    t.hb.prototype.fa = function() {
        var a = this.c.bb ? this.c.G.currentTime : this.c.currentTime();
        this.u.innerHTML = '<span class="vjs-control-text">' + this.s("Current Time") + "</span> " + t.ya(a, this.c.duration())
    };
    t.ib = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.fa))
        }
    });
    t.ib.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-duration vjs-time-controls vjs-control"
        });
        this.u = t.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">' + this.s("Duration Time") + "</span> 0:00",
            "aria-live": "off"
        });
        a.appendChild(this.u);
        return a
    };
    t.ib.prototype.fa = function() {
        var a = this.c.duration();
        a && (this.u.innerHTML = '<span class="vjs-control-text">' + this.s("Duration Time") + "</span> " + t.ya(a))
    };
    t.fc = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c)
        }
    });
    t.fc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        })
    };
    t.pb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.fa))
        }
    });
    t.pb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-remaining-time vjs-time-controls vjs-control"
        });
        this.u = t.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">' + this.s("Remaining Time") + "</span> -0:00",
            "aria-live": "off"
        });
        a.appendChild(this.u);
        return a
    };
    t.pb.prototype.fa = function() {
        this.c.duration() && (this.u.innerHTML = '<span class="vjs-control-text">' + this.s("Remaining Time") + "</span> -" + t.ya(this.c.remainingTime()))
    };
    t.Ja = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c)
        }
    });
    t.Ja.prototype.ta = "Fullscreen";
    t.Ja.prototype.T = function() {
        return "vjs-fullscreen-control " + t.t.prototype.T.call(this)
    };
    t.Ja.prototype.r = function() {
        this.c.isFullscreen() ? (this.c.exitFullscreen(), this.xb.innerHTML = this.s("Fullscreen")) : (this.c.requestFullscreen(), this.xb.innerHTML = this.s("Non-Fullscreen"))
    };
    t.ob = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c)
        }
    });
    t.ob.prototype.l = {
        children: {
            seekBar: {}
        }
    };
    t.ob.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-progress-control vjs-control"
        })
    };
    t.bc = t.R.extend({
        i: function(a, c) {
            t.R.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.oa));
            a.J(t.bind(this, this.oa))
        }
    });
    s = t.bc.prototype;
    s.l = {
        children: {
            loadProgressBar: {},
            playProgressBar: {},
            seekHandle: {}
        },
        barName: "playProgressBar",
        handleName: "seekHandle"
    };
    s.Dc = "timeupdate";
    s.e = function() {
        return t.R.prototype.e.call(this, "div", {
            className: "vjs-progress-holder",
            "aria-label": "video progress bar"
        })
    };
    s.oa = function() {
        var a = this.c.bb ? this.c.G.currentTime : this.c.currentTime();
        this.b.setAttribute("aria-valuenow", t.round(100 * this.Fb(), 2));
        this.b.setAttribute("aria-valuetext", t.ya(a, this.c.duration()))
    };
    s.Fb = function() {
        return this.c.currentTime() / this.c.duration()
    };
    s.Za = function(a) {
        t.R.prototype.Za.call(this, a);
        this.c.bb = f;
        this.je = !this.c.paused();
        this.c.pause()
    };
    s.$a = function(a) {
        a = H(this, a) * this.c.duration();
        a == this.c.duration() && (a -= 0.1);
        this.c.currentTime(a)
    };
    s.Lb = function(a) {
        t.R.prototype.Lb.call(this, a);
        this.c.bb = l;
        this.je && this.c.play()
    };
    s.Nc = function() {
        this.c.currentTime(this.c.currentTime() + 5)
    };
    s.Mc = function() {
        this.c.currentTime(this.c.currentTime() - 5)
    };
    t.lb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("progress", t.bind(this, this.update))
        }
    });
    t.lb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.s("Loaded") + "</span>: 0%</span>"
        })
    };
    t.lb.prototype.update = function() {
        var a, c, d, e, g = this.c.buffered();
        a = this.c.duration();
        var h, k = this.c;
        h = k.buffered();
        k = k.duration();
        h = h.end(h.length - 1);
        h > k && (h = k);
        k = this.b.children;
        this.b.style.width = 100 * (h / a || 0) + "%";
        for (a = 0; a < g.length; a++) c = g.start(a), d = g.end(a), (e = k[a]) || (e = this.b.appendChild(t.e())), e.style.left = 100 * (c / h || 0) + "%", e.style.width = 100 * ((d - c) / h || 0) + "%";
        for (a = k.length; a > g.length; a--) this.b.removeChild(k[a - 1])
    };
    t.Zb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c)
        }
    });
    t.Zb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.s("Progress") + "</span>: 0%</span>"
        })
    };
    t.La = t.$.extend({
        i: function(a, c) {
            t.$.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.fa))
        }
    });
    t.La.prototype.defaultValue = "00:00";
    t.La.prototype.e = function() {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-seek-handle",
            "aria-live": "off"
        })
    };
    t.La.prototype.fa = function() {
        var a = this.c.bb ? this.c.G.currentTime : this.c.currentTime();
        this.b.innerHTML = '<span class="vjs-control-text">' + t.ya(a, this.c.duration()) + "</span>"
    };
    t.rb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.n && a.n.featuresVolumeControl === l && this.m("vjs-hidden");
            a.d("loadstart", t.bind(this, function() {
                a.n.featuresVolumeControl === l ? this.m("vjs-hidden") : this.p("vjs-hidden")
            }))
        }
    });
    t.rb.prototype.l = {
        children: {
            volumeBar: {}
        }
    };
    t.rb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-control vjs-control"
        })
    };
    t.qb = t.R.extend({
        i: function(a, c) {
            t.R.call(this, a, c);
            a.d("volumechange", t.bind(this, this.oa));
            a.J(t.bind(this, this.oa))
        }
    });
    s = t.qb.prototype;
    s.oa = function() {
        this.b.setAttribute("aria-valuenow", t.round(100 * this.c.volume(), 2));
        this.b.setAttribute("aria-valuetext", t.round(100 * this.c.volume(), 2) + "%")
    };
    s.l = {
        children: {
            volumeLevel: {},
            volumeHandle: {}
        },
        barName: "volumeLevel",
        handleName: "volumeHandle"
    };
    s.Dc = "volumechange";
    s.e = function() {
        return t.R.prototype.e.call(this, "div", {
            className: "vjs-volume-bar",
            "aria-label": "volume level"
        })
    };
    s.$a = function(a) {
        this.c.muted() && this.c.muted(l);
        this.c.volume(H(this, a))
    };
    s.Fb = function() {
        return this.c.muted() ? 0 : this.c.volume()
    };
    s.Nc = function() {
        this.c.volume(this.c.volume() + 0.1)
    };
    s.Mc = function() {
        this.c.volume(this.c.volume() - 0.1)
    };
    t.gc = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c)
        }
    });
    t.gc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        })
    };
    t.sb = t.$.extend();
    t.sb.prototype.defaultValue = "00:00";
    t.sb.prototype.e = function() {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-volume-handle"
        })
    };
    t.ia = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            a.d("volumechange", t.bind(this, this.update));
            a.n && a.n.featuresVolumeControl === l && this.m("vjs-hidden");
            a.d("loadstart", t.bind(this, function() {
                a.n.featuresVolumeControl === l ? this.m("vjs-hidden") : this.p("vjs-hidden")
            }))
        }
    });
    t.ia.prototype.e = function() {
        return t.t.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.s("Mute") + "</span></div>"
        })
    };
    t.ia.prototype.r = function() {
        this.c.muted(this.c.muted() ? l : f)
    };
    t.ia.prototype.update = function() {
        var a = this.c.volume(),
            c = 3;
        0 === a || this.c.muted() ? c = 0 : 0.33 > a ? c = 1 : 0.67 > a && (c = 2);
        this.c.muted() ? this.b.children[0].children[0].innerHTML != this.s("Unmute") && (this.b.children[0].children[0].innerHTML = this.s("Unmute")) : this.b.children[0].children[0].innerHTML != this.s("Mute") && (this.b.children[0].children[0].innerHTML = this.s("Mute"));
        for (a = 0; 4 > a; a++) t.p(this.b, "vjs-vol-" + a);
        t.m(this.b, "vjs-vol-" + c)
    };
    t.ra = t.M.extend({
        i: function(a, c) {
            t.M.call(this, a, c);
            a.d("volumechange", t.bind(this, this.update));
            a.n && a.n.featuresVolumeControl === l && this.m("vjs-hidden");
            a.d("loadstart", t.bind(this, function() {
                a.n.featuresVolumeControl === l ? this.m("vjs-hidden") : this.p("vjs-hidden")
            }));
            this.m("vjs-menu-button")
        }
    });
    t.ra.prototype.wa = function() {
        var a = new t.ha(this.c, {
                kc: "div"
            }),
            c = new t.qb(this.c, t.g.z({
                vertical: f
            }, this.l.xe));
        c.d("focus", function() {
            a.m("vjs-lock-showing")
        });
        c.d("blur", function() {
            E(a)
        });
        a.S(c);
        return a
    };
    t.ra.prototype.r = function() {
        t.ia.prototype.r.call(this);
        t.M.prototype.r.call(this)
    };
    t.ra.prototype.e = function() {
        return t.t.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.s("Mute") + "</span></div>"
        })
    };
    t.ra.prototype.update = t.ia.prototype.update;
    t.ac = t.M.extend({
        i: function(a, c) {
            t.M.call(this, a, c);
            this.Sc();
            this.Rc();
            a.d("loadstart", t.bind(this, this.Sc));
            a.d("ratechange", t.bind(this, this.Rc))
        }
    });
    s = t.ac.prototype;
    s.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-playback-rate vjs-menu-button vjs-control",
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + this.s("Playback Rate") + "</span></div>"
        });
        this.zc = t.e("div", {
            className: "vjs-playback-rate-value",
            innerHTML: 1
        });
        a.appendChild(this.zc);
        return a
    };
    s.wa = function() {
        var a = new t.ha(this.j()),
            c = this.j().options().playbackRates;
        if (c)
            for (var d = c.length - 1; 0 <= d; d--) a.S(new t.nb(this.j(), {
                rate: c[d] + "x"
            }));
        return a
    };
    s.oa = function() {
        this.v().setAttribute("aria-valuenow", this.j().playbackRate())
    };
    s.r = function() {
        for (var a = this.j().playbackRate(), c = this.j().options().playbackRates, d = c[0], e = 0; e < c.length; e++)
            if (c[e] > a) {
                d = c[e];
                break
            } this.j().playbackRate(d)
    };

    function ea(a) {
        return a.j().n && a.j().n.featuresPlaybackRate && a.j().options().playbackRates && 0 < a.j().options().playbackRates.length
    }
    s.Sc = function() {
        ea(this) ? this.p("vjs-hidden") : this.m("vjs-hidden")
    };
    s.Rc = function() {
        ea(this) && (this.zc.innerHTML = this.j().playbackRate() + "x")
    };
    t.nb = t.I.extend({
        kc: "button",
        i: function(a, c) {
            var d = this.label = c.rate,
                e = this.Gc = parseFloat(d, 10);
            c.label = d;
            c.selected = 1 === e;
            t.I.call(this, a, c);
            this.j().d("ratechange", t.bind(this, this.update))
        }
    });
    t.nb.prototype.r = function() {
        t.I.prototype.r.call(this);
        this.j().playbackRate(this.Gc)
    };
    t.nb.prototype.update = function() {
        this.selected(this.j().playbackRate() == this.Gc)
    };
    t.Ka = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            a.poster() && this.src(a.poster());
            (!a.poster() || !a.controls()) && this.W();
            a.d("posterchange", t.bind(this, function() {
                this.src(a.poster())
            }));
            P(a) || a.d("play", t.bind(this, this.W))
        }
    });
    var fa = "backgroundSize" in t.A.style;
    t.Ka.prototype.e = function() {
        var a = t.e("div", {
            className: "vjs-poster",
            tabIndex: -1
        });
        fa || a.appendChild(t.e("img"));
        return a
    };
    t.Ka.prototype.src = function(a) {
        var c = this.v();
        a !== b && (fa ? c.style.backgroundImage = 'url("' + a + '")' : c.firstChild.src = a)
    };
    t.Ka.prototype.r = function() {
        this.j().controls() && this.c.play()
    };
    t.Yb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c)
        }
    });
    t.Yb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-loading-spinner"
        })
    };
    t.fb = t.t.extend();
    t.fb.prototype.e = function() {
        return t.t.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: '<span aria-hidden="true"></span>',
            "aria-label": "play video"
        })
    };
    t.fb.prototype.r = function() {
        this.c.play()
    };
    t.jb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            this.update();
            a.d("error", t.bind(this, this.update))
        }
    });
    t.jb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-error-display"
        });
        this.u = t.e("div");
        a.appendChild(this.u);
        return a
    };
    t.jb.prototype.update = function() {
        this.j().error() && (this.u.innerHTML = this.s(this.j().error().message))
    };
    t.q = t.a.extend({
        i: function(a, c, d) {
            c = c || {};
            c.Ic = l;
            t.a.call(this, a, c, d);
            this.featuresProgressEvents || (this.Ac = f, this.Fc = setInterval(t.bind(this, function() {
                var a = this.j().bufferedPercent();
                this.jd != a && this.j().k("progress");
                this.jd = a;
                1 === a && clearInterval(this.Fc)
            }), 500));
            this.featuresTimeupdateEvents || (this.Kb = f, this.j().d("play", t.bind(this, this.Qc)), this.j().d("pause", t.bind(this, this.cb)), this.Q("timeupdate", function() {
                this.featuresTimeupdateEvents = f;
                ga(this)
            }));
            var e, g;
            g = this;
            e = this.j();
            a = function() {
                if (e.controls() &&
                    !e.usingNativeControls()) {
                    var a;
                    g.d("mousedown", g.r);
                    g.d("touchstart", function() {
                        a = this.c.userActive()
                    });
                    g.d("touchmove", function() {
                        a && this.j().reportUserActivity()
                    });
                    g.d("touchend", function(a) {
                        a.preventDefault()
                    });
                    G(g);
                    g.d("tap", g.Qd)
                }
            };
            c = t.bind(g, g.Wd);
            this.J(a);
            e.d("controlsenabled", a);
            e.d("controlsdisabled", c);
            this.J(function() {
                this.networkState && 0 < this.networkState() && this.j().k("loadstart")
            })
        }
    });
    s = t.q.prototype;
    s.Wd = function() {
        this.o("tap");
        this.o("touchstart");
        this.o("touchmove");
        this.o("touchleave");
        this.o("touchcancel");
        this.o("touchend");
        this.o("click");
        this.o("mousedown")
    };
    s.r = function(a) {
        0 === a.button && this.j().controls() && (this.j().paused() ? this.j().play() : this.j().pause())
    };
    s.Qd = function() {
        this.j().userActive(!this.j().userActive())
    };

    function ga(a) {
        a.Kb = l;
        a.cb();
        a.o("play", a.Qc);
        a.o("pause", a.cb)
    }
    s.Qc = function() {
        this.lc && this.cb();
        this.lc = setInterval(t.bind(this, function() {
            this.j().k("timeupdate")
        }), 250)
    };
    s.cb = function() {
        clearInterval(this.lc);
        this.j().k("timeupdate")
    };
    s.dispose = function() {
        this.Ac && (this.Ac = l, clearInterval(this.Fc));
        this.Kb && ga(this);
        t.a.prototype.dispose.call(this)
    };
    s.Pb = function() {
        this.Kb && this.j().k("timeupdate")
    };
    s.Kc = m();
    t.q.prototype.featuresVolumeControl = f;
    t.q.prototype.featuresFullscreenResize = l;
    t.q.prototype.featuresPlaybackRate = l;
    t.q.prototype.featuresProgressEvents = l;
    t.q.prototype.featuresTimeupdateEvents = l;
    t.media = {};
    t.h = t.q.extend({
        i: function(a, c, d) {
            this.featuresVolumeControl = t.h.ld();
            this.featuresPlaybackRate = t.h.kd();
            this.movingMediaElementInDOM = !t.Yc;
            this.featuresProgressEvents = this.featuresFullscreenResize = f;
            t.q.call(this, a, c, d);
            for (d = t.h.kb.length - 1; 0 <= d; d--) t.d(this.b, t.h.kb[d], t.bind(this, this.td));
            if ((c = c.source) && this.b.currentSrc !== c.src) this.b.src = c.src;
            if (t.dc && a.options().nativeControlsForTouch !== l) {
                var e, g, h, k;
                e = this;
                g = this.j();
                c = g.controls();
                e.b.controls = !!c;
                h = function() {
                    e.b.controls = f
                };
                k = function() {
                    e.b.controls =
                        l
                };
                g.d("controlsenabled", h);
                g.d("controlsdisabled", k);
                c = function() {
                    g.o("controlsenabled", h);
                    g.o("controlsdisabled", k)
                };
                e.d("dispose", c);
                g.d("usingcustomcontrols", c);
                g.usingNativeControls(f)
            }
            a.J(function() {
                this.L && (this.l.autoplay && this.paused()) && (delete this.L.poster, this.play())
            });
            this.Fa()
        }
    });
    s = t.h.prototype;
    s.dispose = function() {
        t.h.Bb(this.b);
        t.q.prototype.dispose.call(this)
    };
    s.e = function() {
        var a = this.c,
            c = a.L,
            d;
        if (!c || this.movingMediaElementInDOM === l) c ? (d = c.cloneNode(l), t.h.Bb(c), c = d, a.L = j) : (c = t.e("video"), t.Jc(c, t.g.z(a.fe || {}, {
            id: a.id() + "_html5_api",
            "class": "vjs-tech"
        }))), c.player = a, t.Gb(c, a.v());
        d = ["autoplay", "preload", "loop", "muted"];
        for (var e = d.length - 1; 0 <= e; e--) {
            var g = d[e],
                h = {};
            "undefined" !== typeof a.l[g] && (h[g] = a.l[g]);
            t.Jc(c, h)
        }
        return c
    };
    s.td = function(a) {
        "error" == a.type && this.error() ? this.j().error(this.error().code) : (a.bubbles = l, this.j().k(a))
    };
    s.play = function() {
        this.b.play()
    };
    s.pause = function() {
        this.b.pause()
    };
    s.paused = function() {
        return this.b.paused
    };
    s.currentTime = function() {
        return this.b.currentTime
    };
    s.Pb = function(a) {
        try {
            this.b.currentTime = a
        } catch (c) {
            t.log(c, "Video is not ready. (Video.js)")
        }
    };
    s.duration = function() {
        return this.b.duration || 0
    };
    s.buffered = function() {
        return this.b.buffered
    };
    s.volume = function() {
        return this.b.volume
    };
    s.ce = function(a) {
        this.b.volume = a
    };
    s.muted = function() {
        return this.b.muted
    };
    s.$d = function(a) {
        this.b.muted = a
    };
    s.width = function() {
        return this.b.offsetWidth
    };
    s.height = function() {
        return this.b.offsetHeight
    };
    s.Da = function() {
        return "function" == typeof this.b.webkitEnterFullScreen && (/Android/.test(t.N) || !/Chrome|Mac OS X 10.5/.test(t.N)) ? f : l
    };
    s.oc = function() {
        var a = this.b;
        "webkitDisplayingFullscreen" in a && this.Q("webkitbeginfullscreen", t.bind(this, function() {
            this.c.isFullscreen(f);
            this.Q("webkitendfullscreen", t.bind(this, function() {
                this.c.isFullscreen(l);
                this.c.k("fullscreenchange")
            }));
            this.c.k("fullscreenchange")
        }));
        a.paused && a.networkState <= a.ke ? (this.b.play(), setTimeout(function() {
            a.pause();
            a.webkitEnterFullScreen()
        }, 0)) : a.webkitEnterFullScreen()
    };
    s.ud = function() {
        this.b.webkitExitFullScreen()
    };
    s.src = function(a) {
        if (a === b) return this.b.src;
        this.b.src = a
    };
    s.load = function() {
        this.b.load()
    };
    s.currentSrc = function() {
        return this.b.currentSrc
    };
    s.poster = function() {
        return this.b.poster
    };
    s.Kc = function(a) {
        this.b.poster = a
    };
    s.Ca = function() {
        return this.b.Ca
    };
    s.be = function(a) {
        this.b.Ca = a
    };
    s.autoplay = function() {
        return this.b.autoplay
    };
    s.Xd = function(a) {
        this.b.autoplay = a
    };
    s.controls = function() {
        return this.b.controls
    };
    s.loop = function() {
        return this.b.loop
    };
    s.Zd = function(a) {
        this.b.loop = a
    };
    s.error = function() {
        return this.b.error
    };
    s.seeking = function() {
        return this.b.seeking
    };
    s.ended = function() {
        return this.b.ended
    };
    s.playbackRate = function() {
        return this.b.playbackRate
    };
    s.ae = function(a) {
        this.b.playbackRate = a
    };
    s.networkState = function() {
        return this.b.networkState
    };
    t.h.isSupported = function() {
        try {
            t.A.volume = 0.5
        } catch (a) {
            return l
        }
        return !!t.A.canPlayType
    };
    t.h.vb = function(a) {
        try {
            return !!t.A.canPlayType(a.type)
        } catch (c) {
            return ""
        }
    };
    t.h.ld = function() {
        var a = t.A.volume;
        t.A.volume = a / 2 + 0.1;
        return a !== t.A.volume
    };
    t.h.kd = function() {
        var a = t.A.playbackRate;
        t.A.playbackRate = a / 2 + 0.1;
        return a !== t.A.playbackRate
    };
    var V, ha = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
        ia = /^video\/mp4/i;
    t.h.Cc = function() {
        4 <= t.Tb && (V || (V = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function(a) {
            return a && ha.test(a) ? "maybe" : V.call(this, a)
        });
        t.bd && (V || (V = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function(a) {
            return a && ia.test(a) ? "maybe" : V.call(this, a)
        })
    };
    t.h.ie = function() {
        var a = t.A.constructor.prototype.canPlayType;
        t.A.constructor.prototype.canPlayType = V;
        V = j;
        return a
    };
    t.h.Cc();
    t.h.kb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
    t.h.Bb = function(a) {
        if (a) {
            a.player = j;
            for (a.parentNode && a.parentNode.removeChild(a); a.hasChildNodes();) a.removeChild(a.firstChild);
            a.removeAttribute("src");
            if ("function" === typeof a.load) try {
                a.load()
            } catch (c) {}
        }
    };
    t.f = t.q.extend({
        i: function(a, c, d) {
            t.q.call(this, a, c, d);
            var e = c.source;
            d = c.parentEl;
            var g = this.b = t.e("div", {
                    id: a.id() + "_temp_flash"
                }),
                h = a.id() + "_flash_api",
                k = a.l,
                k = t.g.z({
                    readyFunction: "videojs.Flash.onReady",
                    eventProxyFunction: "videojs.Flash.onEvent",
                    errorEventProxyFunction: "videojs.Flash.onError",
                    autoplay: k.autoplay,
                    preload: k.Ca,
                    loop: k.loop,
                    muted: k.muted
                }, c.flashVars),
                n = t.g.z({
                    wmode: "opaque",
                    bgcolor: "#000000"
                }, c.params),
                h = t.g.z({
                    id: h,
                    name: h,
                    "class": "vjs-tech"
                }, c.attributes);
            e && (e.type && t.f.Dd(e.type) ?
                (e = t.f.Oc(e.src), k.rtmpConnection = encodeURIComponent(e.wb), k.rtmpStream = encodeURIComponent(e.Qb)) : k.src = encodeURIComponent(t.sc(e.src)));
            t.Gb(g, d);
            c.startTime && this.J(function() {
                this.load();
                this.play();
                this.currentTime(c.startTime)
            });
            t.Xc && this.J(function() {
                t.d(this.v(), "mousemove", t.bind(this, function() {
                    this.j().k({
                        type: "mousemove",
                        bubbles: l
                    })
                }))
            });
            a.d("stageclick", a.reportUserActivity);
            this.b = t.f.nc(c.swf, g, k, n, h)
        }
    });
    t.f.prototype.dispose = function() {
        t.q.prototype.dispose.call(this)
    };
    t.f.prototype.play = function() {
        this.b.vjs_play()
    };
    t.f.prototype.pause = function() {
        this.b.vjs_pause()
    };
    t.f.prototype.src = function(a) {
        if (a === b) return this.currentSrc();
        t.f.Cd(a) ? (a = t.f.Oc(a), this.ue(a.wb), this.ve(a.Qb)) : (a = t.sc(a), this.b.vjs_src(a));
        if (this.c.autoplay()) {
            var c = this;
            setTimeout(function() {
                c.play()
            }, 0)
        }
    };
    t.f.prototype.setCurrentTime = function(a) {
        this.Gd = a;
        this.b.vjs_setProperty("currentTime", a);
        t.q.prototype.Pb.call(this)
    };
    t.f.prototype.currentTime = function() {
        return this.seeking() ? this.Gd || 0 : this.b.vjs_getProperty("currentTime")
    };
    t.f.prototype.currentSrc = function() {
        var a = this.b.vjs_getProperty("currentSrc");
        if (a == j) {
            var c = this.rtmpConnection(),
                d = this.rtmpStream();
            c && d && (a = t.f.de(c, d))
        }
        return a
    };
    t.f.prototype.load = function() {
        this.b.vjs_load()
    };
    t.f.prototype.poster = function() {
        this.b.vjs_getProperty("poster")
    };
    t.f.prototype.setPoster = m();
    t.f.prototype.buffered = function() {
        return t.zb(0, this.b.vjs_getProperty("buffered"))
    };
    t.f.prototype.Da = q(l);
    t.f.prototype.oc = q(l);

    function ja() {
        var a = W[X],
            c = a.charAt(0).toUpperCase() + a.slice(1);
        ka["set" + c] = function(c) {
            return this.b.vjs_setProperty(a, c)
        }
    }

    function la(a) {
        ka[a] = function() {
            return this.b.vjs_getProperty(a)
        }
    }
    var ka = t.f.prototype,
        W = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
        ma = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),
        X;
    for (X = 0; X < W.length; X++) la(W[X]), ja();
    for (X = 0; X < ma.length; X++) la(ma[X]);
    t.f.isSupported = function() {
        return 10 <= t.f.version()[0]
    };
    t.f.vb = function(a) {
        if (!a.type) return "";
        a = a.type.replace(/;.*/, "").toLowerCase();
        if (a in t.f.wd || a in t.f.Pc) return "maybe"
    };
    t.f.wd = {
        "video/flv": "FLV",
        "video/x-flv": "FLV",
        "video/mp4": "MP4",
        "video/m4v": "MP4"
    };
    t.f.Pc = {
        "rtmp/mp4": "MP4",
        "rtmp/flv": "FLV"
    };
    t.f.onReady = function(a) {
        var c;
        if (c = (a = t.v(a)) && a.parentNode && a.parentNode.player) a.player = c, t.f.checkReady(c.n)
    };
    t.f.checkReady = function(a) {
        a.v() && (a.v().vjs_getProperty ? a.Fa() : setTimeout(function() {
            t.f.checkReady(a)
        }, 50))
    };
    t.f.onEvent = function(a, c) {
        t.v(a).player.k(c)
    };
    t.f.onError = function(a, c) {
        var d = t.v(a).player,
            e = "FLASH: " + c;
        "srcnotfound" == c ? d.error({
            code: 4,
            message: e
        }) : d.error(e)
    };
    t.f.version = function() {
        var a = "0,0,0";
        try {
            a = (new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
        } catch (c) {
            try {
                navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
            } catch (d) {}
        }
        return a.split(",")
    };
    t.f.nc = function(a, c, d, e, g) {
        a = t.f.yd(a, d, e, g);
        a = t.e("div", {
            innerHTML: a
        }).childNodes[0];
        d = c.parentNode;
        c.parentNode.replaceChild(a, c);
        var h = d.childNodes[0];
        setTimeout(function() {
            h.style.display = "block"
        }, 1E3);
        return a
    };
    t.f.yd = function(a, c, d, e) {
        var g = "",
            h = "",
            k = "";
        c && t.g.Y(c, function(a, c) {
            g += a + "=" + c + "&amp;"
        });
        d = t.g.z({
            movie: a,
            flashvars: g,
            allowScriptAccess: "always",
            allowNetworking: "all"
        }, d);
        t.g.Y(d, function(a, c) {
            h += '<param name="' + a + '" value="' + c + '" />'
        });
        e = t.g.z({
            data: a,
            width: "100%",
            height: "100%"
        }, e);
        t.g.Y(e, function(a, c) {
            k += a + '="' + c + '" '
        });
        return '<object type="application/x-shockwave-flash"' + k + ">" + h + "</object>"
    };
    t.f.de = function(a, c) {
        return a + "&" + c
    };
    t.f.Oc = function(a) {
        var c = {
            wb: "",
            Qb: ""
        };
        if (!a) return c;
        var d = a.indexOf("&"),
            e; - 1 !== d ? e = d + 1 : (d = e = a.lastIndexOf("/") + 1, 0 === d && (d = e = a.length));
        c.wb = a.substring(0, d);
        c.Qb = a.substring(e, a.length);
        return c
    };
    t.f.Dd = function(a) {
        return a in t.f.Pc
    };
    t.f.dd = /^rtmp[set]?:\/\//i;
    t.f.Cd = function(a) {
        return t.f.dd.test(a)
    };
    t.cd = t.a.extend({
        i: function(a, c, d) {
            t.a.call(this, a, c, d);
            if (!a.l.sources || 0 === a.l.sources.length) {
                c = 0;
                for (d = a.l.techOrder; c < d.length; c++) {
                    var e = t.ba(d[c]),
                        g = window.videojs[e];
                    if (g && g.isSupported()) {
                        Q(a, e);
                        break
                    }
                }
            } else a.src(a.l.sources)
        }
    });
    t.Player.prototype.textTracks = function() {
        return this.Ea = this.Ea || []
    };

    function na(a, c, d, e, g) {
        var h = a.Ea = a.Ea || [];
        g = g || {};
        g.kind = c;
        g.label = d;
        g.language = e;
        c = t.ba(c || "subtitles");
        var k = new window.videojs[c + "Track"](a, g);
        h.push(k);
        k.Ab() && a.J(function() {
            setTimeout(function() {
                Y(k.j(), k.id())
            }, 0)
        })
    }

    function Y(a, c, d) {
        for (var e = a.Ea, g = 0, h = e.length, k, n; g < h; g++) k = e[g], k.id() === c ? (k.show(), n = k) : d && (k.K() == d && 0 < k.mode()) && k.disable();
        (c = n ? n.K() : d ? d : l) && a.k(c + "trackchange")
    }
    t.B = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            this.U = c.id || "vjs_" + c.kind + "_" + c.language + "_" + t.w++;
            this.Lc = c.src;
            this.qd = c["default"] || c.dflt;
            this.ge = c.title;
            this.Ua = c.srclang;
            this.Ed = c.label;
            this.ca = [];
            this.tb = [];
            this.ma = this.na = 0
        }
    });
    s = t.B.prototype;
    s.K = p("H");
    s.src = p("Lc");
    s.Ab = p("qd");
    s.title = p("ge");
    s.language = p("Ua");
    s.label = p("Ed");
    s.md = p("ca");
    s.ed = p("tb");
    s.readyState = p("na");
    s.mode = p("ma");
    s.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-" + this.H + " vjs-text-track"
        })
    };
    s.show = function() {
        oa(this);
        this.ma = 2;
        t.a.prototype.show.call(this)
    };
    s.W = function() {
        oa(this);
        this.ma = 1;
        t.a.prototype.W.call(this)
    };
    s.disable = function() {
        2 == this.ma && this.W();
        this.c.o("timeupdate", t.bind(this, this.update, this.U));
        this.c.o("ended", t.bind(this, this.reset, this.U));
        this.reset();
        this.c.ka("textTrackDisplay").removeChild(this);
        this.ma = 0
    };

    function oa(a) {
        0 === a.na && a.load();
        0 === a.ma && (a.c.d("timeupdate", t.bind(a, a.update, a.U)), a.c.d("ended", t.bind(a, a.reset, a.U)), ("captions" === a.H || "subtitles" === a.H) && a.c.ka("textTrackDisplay").S(a))
    }
    s.load = function() {
        0 === this.na && (this.na = 1, t.get(this.Lc, t.bind(this, this.Td), t.bind(this, this.Jd)))
    };
    s.Jd = function(a) {
        this.error = a;
        this.na = 3;
        this.k("error")
    };
    s.Td = function(a) {
        var c, d;
        a = a.split("\n");
        for (var e = "", g = 1, h = a.length; g < h; g++)
            if (e = t.trim(a[g])) {
                -1 == e.indexOf("--\x3e") ? (c = e, e = t.trim(a[++g])) : c = this.ca.length;
                c = {
                    id: c,
                    index: this.ca.length
                };
                d = e.split(/[\t ]+/);
                c.startTime = pa(d[0]);
                c.xa = pa(d[2]);
                for (d = []; a[++g] && (e = t.trim(a[g]));) d.push(e);
                c.text = d.join("<br/>");
                this.ca.push(c)
            } this.na = 2;
        this.k("loaded")
    };

    function pa(a) {
        var c = a.split(":");
        a = 0;
        var d, e, g;
        3 == c.length ? (d = c[0], e = c[1], c = c[2]) : (d = 0, e = c[0], c = c[1]);
        c = c.split(/\s+/);
        c = c.splice(0, 1)[0];
        c = c.split(/\.|,/);
        g = parseFloat(c[1]);
        c = c[0];
        a += 3600 * parseFloat(d);
        a += 60 * parseFloat(e);
        a += parseFloat(c);
        g && (a += g / 1E3);
        return a
    }
    s.update = function() {
        if (0 < this.ca.length) {
            var a = this.c.options().trackTimeOffset || 0,
                a = this.c.currentTime() + a;
            if (this.Ob === b || a < this.Ob || this.Wa <= a) {
                var c = this.ca,
                    d = this.c.duration(),
                    e = 0,
                    g = l,
                    h = [],
                    k, n, r, w;
                a >= this.Wa || this.Wa === b ? w = this.Db !== b ? this.Db : 0 : (g = f, w = this.Jb !== b ? this.Jb : c.length - 1);
                for (;;) {
                    r = c[w];
                    if (r.xa <= a) e = Math.max(e, r.xa), r.Na && (r.Na = l);
                    else if (a < r.startTime) {
                        if (d = Math.min(d, r.startTime), r.Na && (r.Na = l), !g) break
                    } else g ? (h.splice(0, 0, r), n === b && (n = w), k = w) : (h.push(r), k === b && (k = w), n = w), d = Math.min(d,
                        r.xa), e = Math.max(e, r.startTime), r.Na = f;
                    if (g)
                        if (0 === w) break;
                        else w--;
                    else if (w === c.length - 1) break;
                    else w++
                }
                this.tb = h;
                this.Wa = d;
                this.Ob = e;
                this.Db = k;
                this.Jb = n;
                k = this.tb;
                n = "";
                a = 0;
                for (c = k.length; a < c; a++) n += '<span class="vjs-tt-cue">' + k[a].text + "</span>";
                this.b.innerHTML = n;
                this.k("cuechange")
            }
        }
    };
    s.reset = function() {
        this.Wa = 0;
        this.Ob = this.c.duration();
        this.Jb = this.Db = 0
    };
    t.Vb = t.B.extend();
    t.Vb.prototype.H = "captions";
    t.cc = t.B.extend();
    t.cc.prototype.H = "subtitles";
    t.Wb = t.B.extend();
    t.Wb.prototype.H = "chapters";
    t.ec = t.a.extend({
        i: function(a, c, d) {
            t.a.call(this, a, c, d);
            if (a.l.tracks && 0 < a.l.tracks.length) {
                c = this.c;
                a = a.l.tracks;
                for (var e = 0; e < a.length; e++) d = a[e], na(c, d.kind, d.label, d.language, d)
            }
        }
    });
    t.ec.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-text-track-display"
        })
    };
    t.aa = t.I.extend({
        i: function(a, c) {
            var d = this.ea = c.track;
            c.label = d.label();
            c.selected = d.Ab();
            t.I.call(this, a, c);
            this.c.d(d.K() + "trackchange", t.bind(this, this.update))
        }
    });
    t.aa.prototype.r = function() {
        t.I.prototype.r.call(this);
        Y(this.c, this.ea.U, this.ea.K())
    };
    t.aa.prototype.update = function() {
        this.selected(2 == this.ea.mode())
    };
    t.mb = t.aa.extend({
        i: function(a, c) {
            c.track = {
                K: function() {
                    return c.kind
                },
                j: a,
                label: function() {
                    return c.kind + " off"
                },
                Ab: q(l),
                mode: q(l)
            };
            t.aa.call(this, a, c);
            this.selected(f)
        }
    });
    t.mb.prototype.r = function() {
        t.aa.prototype.r.call(this);
        Y(this.c, this.ea.U, this.ea.K())
    };
    t.mb.prototype.update = function() {
        for (var a = this.c.textTracks(), c = 0, d = a.length, e, g = f; c < d; c++) e = a[c], e.K() == this.ea.K() && 2 == e.mode() && (g = l);
        this.selected(g)
    };
    t.V = t.M.extend({
        i: function(a, c) {
            t.M.call(this, a, c);
            1 >= this.P.length && this.W()
        }
    });
    t.V.prototype.va = function() {
        var a = [],
            c;
        a.push(new t.mb(this.c, {
            kind: this.H
        }));
        for (var d = 0; d < this.c.textTracks().length; d++) c = this.c.textTracks()[d], c.K() === this.H && a.push(new t.aa(this.c, {
            track: c
        }));
        return a
    };
    t.Ga = t.V.extend({
        i: function(a, c, d) {
            t.V.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Captions Menu")
        }
    });
    t.Ga.prototype.H = "captions";
    t.Ga.prototype.ta = "Captions";
    t.Ga.prototype.className = "vjs-captions-button";
    t.Ma = t.V.extend({
        i: function(a, c, d) {
            t.V.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Subtitles Menu")
        }
    });
    t.Ma.prototype.H = "subtitles";
    t.Ma.prototype.ta = "Subtitles";
    t.Ma.prototype.className = "vjs-subtitles-button";
    t.Ha = t.V.extend({
        i: function(a, c, d) {
            t.V.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Chapters Menu")
        }
    });
    s = t.Ha.prototype;
    s.H = "chapters";
    s.ta = "Chapters";
    s.className = "vjs-chapters-button";
    s.va = function() {
        for (var a = [], c, d = 0; d < this.c.textTracks().length; d++) c = this.c.textTracks()[d], c.K() === this.H && a.push(new t.aa(this.c, {
            track: c
        }));
        return a
    };
    s.wa = function() {
        for (var a = this.c.textTracks(), c = 0, d = a.length, e, g, h = this.P = []; c < d; c++)
            if (e = a[c], e.K() == this.H)
                if (0 === e.readyState()) e.load(), e.d("loaded", t.bind(this, this.wa));
                else {
                    g = e;
                    break
                } a = this.Aa;
        a === b && (a = new t.ha(this.c), a.ja().appendChild(t.e("li", {
            className: "vjs-menu-title",
            innerHTML: t.ba(this.H),
            ee: -1
        })));
        if (g) {
            e = g.ca;
            for (var k, c = 0, d = e.length; c < d; c++) k = e[c], k = new t.gb(this.c, {
                track: g,
                cue: k
            }), h.push(k), a.S(k);
            this.S(a)
        }
        0 < this.P.length && this.show();
        return a
    };
    t.gb = t.I.extend({
        i: function(a, c) {
            var d = this.ea = c.track,
                e = this.cue = c.cue,
                g = a.currentTime();
            c.label = e.text;
            c.selected = e.startTime <= g && g < e.xa;
            t.I.call(this, a, c);
            d.d("cuechange", t.bind(this, this.update))
        }
    });
    t.gb.prototype.r = function() {
        t.I.prototype.r.call(this);
        this.c.currentTime(this.cue.startTime);
        this.update(this.cue.startTime)
    };
    t.gb.prototype.update = function() {
        var a = this.cue,
            c = this.c.currentTime();
        this.selected(a.startTime <= c && c < a.xa)
    };
    t.g.z(t.Ia.prototype.l.children, {
        subtitlesButton: {},
        captionsButton: {},
        chaptersButton: {}
    });
    if ("undefined" !== typeof window.JSON && "function" === window.JSON.parse) t.JSON = window.JSON;
    else {
        t.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        t.JSON.parse = function(a, c) {
            function d(a, e) {
                var k, n, r = a[e];
                if (r && "object" === typeof r)
                    for (k in r) Object.prototype.hasOwnProperty.call(r, k) && (n = d(r, k), n !== b ? r[k] = n : delete r[k]);
                return c.call(a, e, r)
            }
            var e;
            a = String(a);
            Z.lastIndex = 0;
            Z.test(a) && (a = a.replace(Z, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" === typeof c ? d({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
        }
    }
    t.ic = function() {
        var a, c, d, e;
        a = document.getElementsByTagName("video");
        c = document.getElementsByTagName("audio");
        var g = [];
        if (a && 0 < a.length) {
            d = 0;
            for (e = a.length; d < e; d++) g.push(a[d])
        }
        if (c && 0 < c.length) {
            d = 0;
            for (e = c.length; d < e; d++) g.push(c[d])
        }
        if (g && 0 < g.length) {
            d = 0;
            for (e = g.length; d < e; d++)
                if ((c = g[d]) && c.getAttribute) c.player === b && (a = c.getAttribute("data-setup"), a !== j && videojs(c));
                else {
                    t.ub();
                    break
                }
        } else t.Tc || t.ub()
    };
    t.ub = function() {
        setTimeout(t.ic, 1)
    };
    "complete" === document.readyState ? t.Tc = f : t.Q(window, "load", function() {
        t.Tc = f
    });
    t.ub();
    t.Vd = function(a, c) {
        t.Player.prototype[a] = c
    };
    var qa = this;

    function $(a, c) {
        var d = a.split("."),
            e = qa;
        !(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
        for (var g; d.length && (g = d.shift());) !d.length && c !== b ? e[g] = c : e = e[g] ? e[g] : e[g] = {}
    };
    $("videojs", t);
    $("_V_", t);
    $("videojs.options", t.options);
    $("videojs.players", t.Ba);
    $("videojs.TOUCH_ENABLED", t.dc);
    $("videojs.cache", t.ua);
    $("videojs.Component", t.a);
    t.a.prototype.player = t.a.prototype.j;
    t.a.prototype.options = t.a.prototype.options;
    t.a.prototype.init = t.a.prototype.i;
    t.a.prototype.dispose = t.a.prototype.dispose;
    t.a.prototype.createEl = t.a.prototype.e;
    t.a.prototype.contentEl = t.a.prototype.ja;
    t.a.prototype.el = t.a.prototype.v;
    t.a.prototype.addChild = t.a.prototype.S;
    t.a.prototype.getChild = t.a.prototype.ka;
    t.a.prototype.getChildById = t.a.prototype.xd;
    t.a.prototype.children = t.a.prototype.children;
    t.a.prototype.initChildren = t.a.prototype.vc;
    t.a.prototype.removeChild = t.a.prototype.removeChild;
    t.a.prototype.on = t.a.prototype.d;
    t.a.prototype.off = t.a.prototype.o;
    t.a.prototype.one = t.a.prototype.Q;
    t.a.prototype.trigger = t.a.prototype.k;
    t.a.prototype.triggerReady = t.a.prototype.Fa;
    t.a.prototype.show = t.a.prototype.show;
    t.a.prototype.hide = t.a.prototype.W;
    t.a.prototype.width = t.a.prototype.width;
    t.a.prototype.height = t.a.prototype.height;
    t.a.prototype.dimensions = t.a.prototype.rd;
    t.a.prototype.ready = t.a.prototype.J;
    t.a.prototype.addClass = t.a.prototype.m;
    t.a.prototype.removeClass = t.a.prototype.p;
    t.a.prototype.buildCSSClass = t.a.prototype.T;
    t.a.prototype.localize = t.a.prototype.s;
    t.Player.prototype.ended = t.Player.prototype.ended;
    t.Player.prototype.enterFullWindow = t.Player.prototype.pc;
    t.Player.prototype.exitFullWindow = t.Player.prototype.Cb;
    t.Player.prototype.preload = t.Player.prototype.Ca;
    t.Player.prototype.remainingTime = t.Player.prototype.remainingTime;
    t.Player.prototype.supportsFullScreen = t.Player.prototype.Da;
    t.Player.prototype.currentType = t.Player.prototype.nd;
    t.Player.prototype.requestFullScreen = t.Player.prototype.requestFullScreen;
    t.Player.prototype.requestFullscreen = t.Player.prototype.requestFullscreen;
    t.Player.prototype.cancelFullScreen = t.Player.prototype.cancelFullScreen;
    t.Player.prototype.exitFullscreen = t.Player.prototype.exitFullscreen;
    t.Player.prototype.isFullScreen = t.Player.prototype.isFullScreen;
    t.Player.prototype.isFullscreen = t.Player.prototype.isFullscreen;
    $("videojs.MediaLoader", t.cd);
    $("videojs.TextTrackDisplay", t.ec);
    $("videojs.ControlBar", t.Ia);
    $("videojs.Button", t.t);
    $("videojs.PlayToggle", t.$b);
    $("videojs.FullscreenToggle", t.Ja);
    $("videojs.BigPlayButton", t.fb);
    $("videojs.LoadingSpinner", t.Yb);
    $("videojs.CurrentTimeDisplay", t.hb);
    $("videojs.DurationDisplay", t.ib);
    $("videojs.TimeDivider", t.fc);
    $("videojs.RemainingTimeDisplay", t.pb);
    $("videojs.LiveDisplay", t.Xb);
    $("videojs.ErrorDisplay", t.jb);
    $("videojs.Slider", t.R);
    $("videojs.ProgressControl", t.ob);
    $("videojs.SeekBar", t.bc);
    $("videojs.LoadProgressBar", t.lb);
    $("videojs.PlayProgressBar", t.Zb);
    $("videojs.SeekHandle", t.La);
    $("videojs.VolumeControl", t.rb);
    $("videojs.VolumeBar", t.qb);
    $("videojs.VolumeLevel", t.gc);
    $("videojs.VolumeMenuButton", t.ra);
    $("videojs.VolumeHandle", t.sb);
    $("videojs.MuteToggle", t.ia);
    $("videojs.PosterImage", t.Ka);
    $("videojs.Menu", t.ha);
    $("videojs.MenuItem", t.I);
    $("videojs.MenuButton", t.M);
    $("videojs.PlaybackRateMenuButton", t.ac);
    t.M.prototype.createItems = t.M.prototype.va;
    t.V.prototype.createItems = t.V.prototype.va;
    t.Ha.prototype.createItems = t.Ha.prototype.va;
    $("videojs.SubtitlesButton", t.Ma);
    $("videojs.CaptionsButton", t.Ga);
    $("videojs.ChaptersButton", t.Ha);
    $("videojs.MediaTechController", t.q);
    t.q.prototype.featuresVolumeControl = t.q.prototype.re;
    t.q.prototype.featuresFullscreenResize = t.q.prototype.ne;
    t.q.prototype.featuresPlaybackRate = t.q.prototype.oe;
    t.q.prototype.featuresProgressEvents = t.q.prototype.pe;
    t.q.prototype.featuresTimeupdateEvents = t.q.prototype.qe;
    t.q.prototype.setPoster = t.q.prototype.Kc;
    $("videojs.Html5", t.h);
    t.h.Events = t.h.kb;
    t.h.isSupported = t.h.isSupported;
    t.h.canPlaySource = t.h.vb;
    t.h.patchCanPlayType = t.h.Cc;
    t.h.unpatchCanPlayType = t.h.ie;
    t.h.prototype.setCurrentTime = t.h.prototype.Pb;
    t.h.prototype.setVolume = t.h.prototype.ce;
    t.h.prototype.setMuted = t.h.prototype.$d;
    t.h.prototype.setPreload = t.h.prototype.be;
    t.h.prototype.setAutoplay = t.h.prototype.Xd;
    t.h.prototype.setLoop = t.h.prototype.Zd;
    t.h.prototype.enterFullScreen = t.h.prototype.oc;
    t.h.prototype.exitFullScreen = t.h.prototype.ud;
    t.h.prototype.playbackRate = t.h.prototype.playbackRate;
    t.h.prototype.setPlaybackRate = t.h.prototype.ae;
    $("videojs.Flash", t.f);
    t.f.isSupported = t.f.isSupported;
    t.f.canPlaySource = t.f.vb;
    t.f.onReady = t.f.onReady;
    t.f.embed = t.f.nc;
    t.f.version = t.f.version;
    $("videojs.TextTrack", t.B);
    t.B.prototype.label = t.B.prototype.label;
    t.B.prototype.kind = t.B.prototype.K;
    t.B.prototype.mode = t.B.prototype.mode;
    t.B.prototype.cues = t.B.prototype.md;
    t.B.prototype.activeCues = t.B.prototype.ed;
    $("videojs.CaptionsTrack", t.Vb);
    $("videojs.SubtitlesTrack", t.cc);
    $("videojs.ChaptersTrack", t.Wb);
    $("videojs.autoSetup", t.ic);
    $("videojs.plugin", t.Vd);
    $("videojs.createTimeRange", t.zb);
    $("videojs.util", t.ga);
    t.ga.mergeOptions = t.ga.Va;
    t.addLanguage = t.fd;
})();
! function(t, a, e, n, m) {
    m = a.location, t.src = "//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-2&utmn=1&utmhn=" + n(m.hostname) + "&utmsr=" + a.screen.availWidth + "x" + a.screen.availHeight + "&utmul=" + (e.language || e.userLanguage || "").toLowerCase() + "&utmr=" + n(m.href) + "&utmp=" + n(m.hostname + m.pathname) + "&utmcc=__utma%3D1." + Math.floor(1e10 * Math.random()) + ".1.1.1.1%3B" + "&utme=8(vjsv)9(v4.9.1)"
}(new Image, window, navigator, encodeURIComponent);