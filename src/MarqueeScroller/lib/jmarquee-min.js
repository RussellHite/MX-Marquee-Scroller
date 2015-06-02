/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */
;
(function (e) {
    e.fn.marquee = function (t) {
        return this.each(function () {
            var n = e.extend({}, e.fn.marquee.defaults, t),
                r = e(this),
                i, s, o, u, a, f = 3,
                l = "animation-play-state",
                c = false,
                h = function (e, t, n) {
                    var r = ["webkit", "moz", "MS", "o", ""];
                    for (var i = 0; i < r.length; i++) {
                        if (!r[i]) t = t.toLowerCase();
                        e.addEventListener(r[i] + t, n, false)
                    }
                },
                p = function (e) {
                    var t = [];
                    for (var n in e) {
                        if (e.hasOwnProperty(n)) {
                            t.push(n + ":" + e[n])
                        }
                    }
                    t.push();
                    return "{" + t.join(",") + "}"
                },
                d = function () {
                    r.timer = setTimeout(M, n.delayBeforeStart)
                },
                v = {
                    pause: function () {
                        if (c && n.allowCss3Support) {
                            i.css(l, "paused")
                        } else {
                            if (e.fn.pause) {
                                i.pause()
                            }
                        }
                        r.data("runningStatus", "paused");
                        r.trigger("paused")
                    },
                    resume: function () {
                        if (c && n.allowCss3Support) {
                            i.css(l, "running")
                        } else {
                            if (e.fn.resume) {
                                i.resume()
                            }
                        }
                        r.data("runningStatus", "resumed");
                        r.trigger("resumed")
                    },
                    toggle: function () {
                        v[r.data("runningStatus") == "resumed" ? "pause" : "resume"]()
                    },
                    destroy: function () {
                        clearTimeout(r.timer);
                        r.find("*").andSelf().unbind();
                        r.html(r.find(".js-marquee:first").html())
                    }
                };
            if (typeof t === "string") {
                if (e.isFunction(v[t])) {
                    if (!i) {
                        i = r.find(".js-marquee-wrapper")
                    }
                    if (r.data("css3AnimationIsSupported") === true) {
                        c = true
                    }
                    v[t]()
                }
                return
            }
            var m = {},
                g;
            e.each(n, function (e, t) {
                g = r.attr("data-" + e);
                if (typeof g !== "undefined") {
                    switch (g) {
                    case "true":
                        g = true;
                        break;
                    case "false":
                        g = false;
                        break
                    }
                    n[e] = g
                }
            });
            n.duration = n.speed || n.duration;
            u = n.direction == "up" || n.direction == "down";
            n.gap = n.duplicated ? parseInt(n.gap) : 0;
            r.wrapInner('<div class="js-marquee"></div>');
            var y = r.find(".js-marquee").css({
                "margin-right": n.gap,
                "float": "left"
            });
            if (n.duplicated) {
                y.clone(true).appendTo(r)
            }
            r.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
            i = r.find(".js-marquee-wrapper");
            if (u) {
                var b = r.height();
                i.removeAttr("style");
                r.height(b);
                r.find(".js-marquee").css({
                    "float": "none",
                    "margin-bottom": n.gap,
                    "margin-right": 0
                });
                if (n.duplicated) r.find(".js-marquee:last").css({
                    "margin-bottom": 0
                });
                var w = r.find(".js-marquee:first").height() + n.gap;
                n.duration = (parseInt(w, 10) + parseInt(b, 10)) / parseInt(b, 10) * n.duration
            } else {
                a = r.find(".js-marquee:first").width() + n.gap;
                s = r.width();
                n.duration = (parseInt(a, 10) + parseInt(s, 10)) / parseInt(s, 10) * n.duration
            } if (n.duplicated) {
                n.duration = n.duration / 2
            }
            if (n.allowCss3Support) {
                var E = document.body || document.createElement("div"),
                    S = "marqueeAnimation-" + Math.floor(Math.random() * 1e7),
                    x = "Webkit Moz O ms Khtml".split(" "),
                    T = "animation",
                    N = "",
                    C = "";
                if (E.style.animation) {
                    C = "@keyframes " + S + " ";
                    c = true
                }
                if (c === false) {
                    for (var k = 0; k < x.length; k++) {
                        if (E.style[x[k] + "AnimationName"] !== undefined) {
                            var L = "-" + x[k].toLowerCase() + "-";
                            T = L + T;
                            l = L + l;
                            C = "@" + L + "keyframes " + S + " ";
                            c = true;
                            break
                        }
                    }
                }
                if (c) {
                    N = S + " " + n.duration / 1e3 + "s " + n.delayBeforeStart / 1e3 + "s infinite " + n.css3easing;
                    r.data("css3AnimationIsSupported", true)
                }
            }
            var A = function () {
                    i.css("margin-top", n.direction == "up" ? b + "px" : "-" + w + "px")
                },
                O = function () {
                    i.css("margin-left", n.direction == "left" ? s + "px" : "-" + a + "px")
                };
            if (n.duplicated) {
                if (u) {
                    i.css("margin-top", n.direction == "up" ? b : "-" + (w * 2 - n.gap) + "px")
                } else {
                    i.css("margin-left", n.direction == "left" ? s + "px" : "-" + (a * 2 - n.gap) + "px")
                }
                f = 1
            } else {
                if (u) {
                    A()
                } else {
                    O()
                }
            }
            var M = function () {
                if (n.duplicated) {
                    if (f === 1) {
                        n._originalDuration = n.duration;
                        if (u) {
                            n.duration = n.direction == "up" ? n.duration + b / (w / n.duration) : n.duration * 2
                        } else {
                            n.duration = n.direction == "left" ? n.duration + s / (a / n.duration) : n.duration * 2
                        } if (N) {
                            N = S + " " + n.duration / 1e3 + "s " + n.delayBeforeStart / 1e3 + "s " + n.css3easing
                        }
                        f++
                    } else if (f === 2) {
                        n.duration = n._originalDuration;
                        if (N) {
                            S = S + "0";
                            C = e.trim(C) + "0 ";
                            N = S + " " + n.duration / 1e3 + "s 0s infinite " + n.css3easing
                        }
                        f++
                    }
                }
                if (u) {
                    if (n.duplicated) {
                        if (f > 2) {
                            i.css("margin-top", n.direction == "up" ? 0 : "-" + w + "px")
                        }
                        o = {
                            "margin-top": n.direction == "up" ? "-" + w + "px" : 0
                        }
                    } else {
                        A();
                        o = {
                            "margin-top": n.direction == "up" ? "-" + i.height() + "px" : b + "px"
                        }
                    }
                } else {
                    if (n.duplicated) {
                        if (f > 2) {
                            i.css("margin-left", n.direction == "left" ? 0 : "-" + a + "px")
                        }
                        o = {
                            "margin-left": n.direction == "left" ? "-" + a + "px" : 0
                        }
                    } else {
                        O();
                        o = {
                            "margin-left": n.direction == "left" ? "-" + a + "px" : s + "px"
                        }
                    }
                }
                r.trigger("beforeStarting");
                if (c) {
                    i.css(T, N);
                    var t = C + " { 100%  " + p(o) + "}",
                        l = e("style");
                    if (l.length !== 0) {
                        l.filter(":last").append(t)
                    } else {
                        e("head").append("<style>" + t + "</style>")
                    }
                    h(i[0], "AnimationIteration", function () {
                        r.trigger("finished")
                    });
                    h(i[0], "AnimationEnd", function () {
                        M();
                        r.trigger("finished")
                    })
                } else {
                    i.animate(o, n.duration, n.easing, function () {
                        r.trigger("finished");
                        if (n.pauseOnCycle) {
                            d()
                        } else {
                            M()
                        }
                    })
                }
                r.data("runningStatus", "resumed")
            };
            r.bind("pause", v.pause);
            r.bind("resume", v.resume);
            if (n.pauseOnHover) {
                r.bind("mouseenter mouseleave", v.toggle)
            }
            if (c && n.allowCss3Support) {
                M()
            } else {
                d()
            }
        })
    };
    e.fn.marquee.defaults = {
        allowCss3Support: true,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1e3,
        direction: "left",
        duplicated: false,
        duration: 5e3,
        gap: 20,
        pauseOnCycle: false,
        pauseOnHover: false
    }
})(jQuery);