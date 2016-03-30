/*!
 * VERSION: 1.15.1
 * DATE: 2015-01-08
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*!
 * VERSION: beta 1.9.4
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/*!
 * VERSION: 1.15.1
 * DATE: 2015-01-20
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */

define("oblio/utils/DeviceDetect", [], function() {
		var e = {},
			t = {
				isMobile: function() {
					var e = navigator.platform.toLowerCase(),
						t = /(iphone|ipod|android|palm|windows\sphone|blackberry)/g;
					return e.match(t) === null ? !1 : !0
				},
				searchString: function(e) {
					for (var t = 0; t < e.length; t++) {
						var n = e[t].string;
						this.versionSearchString = e[t].subString;
						if (n.indexOf(e[t].subString) != -1) return e[t].identity
					}
				},
				searchVersion: function(e) {
					var t = e.indexOf(this.versionSearchString);
					if (t == -1) return;
					return parseFloat(e.substring(t + this.versionSearchString.length + 1))
				},
				dataBrowser: [{
					string: navigator.userAgent,
					subString: "Android",
					identity: "Android"
				}, {
					string: navigator.userAgent,
					subString: "Chrome",
					identity: "Chrome"
				}, {
					string: navigator.userAgent,
					subString: "MSIE",
					identity: "Explorer"
				}, {
					string: navigator.userAgent,
					subString: "Trident",
					identity: "Explorer"
				}, {
					string: navigator.userAgent,
					subString: "Firefox",
					identity: "Firefox"
				}, {
					string: navigator.userAgent,
					subString: "Opera",
					identity: "Opera"
				}, {
					string: navigator.userAgent,
					subString: "iPod",
					identity: "iPod"
				}, {
					string: navigator.userAgent,
					subString: "iPad",
					identity: "iPad"
				}, {
					string: navigator.userAgent,
					subString: "iPhone",
					identity: "iPhone"
				}, {
					string: navigator.userAgent,
					subString: "Safari",
					identity: "Safari"
				}]
			};
		return e.browser = t.searchString(t.dataBrowser) || "Other", e.version = t.searchVersion(navigator.userAgent) || t.searchVersion(navigator.appVersion) || "Unknown", e.isIphone = e.browser === "iPhone", e.isIpod = e.browser === "iPod", e.isIpad = e.browser === "iPad", e.isIOS = e.browser === "iPhone" || e.browser === "iPad" || e.browser === "iPod", e.isAndroid = e.browser === "Android", e.isMobile = t.isMobile(), e.isMac = navigator.appVersion.indexOf("Mac") != -1 ? !0 : !1, e.isIE = e.browser === "Explorer" || e.browser === "MSIE" ? !0 : !1, e.isIETouch = e.browser === "Explorer" && navigator.userAgent.indexOf("Touch") >= 0 ? !0 : !1, e.isEarlyIE = navigator.userAgent.indexOf("MSIE 8.0") >= 0 ? !0 : !1, window.oblio = window.oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.DeviceDetect = e, oblio.utils.DeviceDetect
	}), define("oblio/utils/ArrayExecuter", [], function() {
		function t(e) {
			for (var t in e) e.hasOwnProperty(t) && (e[t] = null);
			e = null
		}
		var e = function(e, t) {
			this.task_arr = [], this.defaultScope = e || this, this.id = t || "", this.verbose = !1
		};
		return e.prototype = {
			execute: function(e) {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | execute"), this.addNext(e), this.runStep("")
			},
			addNext: function(e) {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | addNext");
				if (typeof e == "function") this.task_arr.unshift({
					fn: e,
					vars: null
				});
				else {
					e.reverse();
					for (var t = 0; t < e.length; t++) e[t] && this.task_arr.unshift(e[t])
				}
			},
			tackOn: function(e) {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | tackOn");
				for (var t = 0; t < e.length; t++) this.task_arr.push(e[t]);
				this.runStep("")
			},
			runFunctionInScope: function(e) {
				var t = e[0],
					n = e[1],
					r = e.length > 2 ? e[2] : null;
				e.length > 2 ? t[n](e[2]) : t[n]()
			},
			runStep: function(e) {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | runStep");
				if (this.task_arr.length == 0) return;
				var n = this.task_arr.shift(),
					r = n.fn;
				n.scope = n.scope || this.defaultScope, n.vars = n.vars || [], typeof n.vars == "string" && (n.vars = [n.vars]), r.apply(n.scope, n.vars), t(n)
			},
			stepComplete: function(e) {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | stepComplete"), this.task_arr.length > 0 && window.requestAnimationFrame(this.runStep.bind(this))
			},
			stepComplete_instant: function(e) {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | stepComplete_instant"), this.task_arr.length > 0 && this.runStep()
			},
			clearArrayExecuter: function() {
				this.verbose && console.log("ArrayExecuter | " + this.id + " | clearArrayExecuter"), this.task_arr = []
			},
			destroy: function() {
				for (var e = 0; e < this.task_arr.length; e++) t(this.task_arr[e]);
				this.task_arr = [], this.defaultScope = null
			}
		}, window.oblio = window.oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.ArrayExecuter = e, oblio.utils.ArrayExecuter
	}), define("oblio/utils/SectionLoader", ["oblio/utils/DeviceDetect", "oblio/utils/ArrayExecuter"], function() {
		function r(e, t) {
			$.ajax({
				dataType: "text",
				url: e,
				success: function(e) {
					e = e.replace(/(\r\n|\n|\r)/gm, ""), e = e.replace(/\t/g, ""), oblio.app.dataSrc = this.localizationJSON = $.parseJSON(String(e)), this.setupSections.call(this), t && t()
				}.bind(this)
			})
		}

		function i() {
			var e, t;
			for (e in oblio.app.dataSrc.sections)
				if (oblio.app.dataSrc.sections.hasOwnProperty(e)) {
					t = oblio.app.dataSrc.sections[e];
					if (t.visible === "false") continue;
					t.data.base = oblio.settings.base_url || "", this.addSection(e, t)
				}
		}

		function u(e) {
			this.verbose && console.log("SectionLoader | addLoaderUI: " + e), s.loader = e
		}

		function a(e, t) {
			var n = D(e);
			n.files = n.files || {};
			if (typeof t == "string") n.addFiles.push(t);
			else
				for (var r = t.length - 1; r >= 0; r--) n.addFiles.push(t[r])
		}

		function f(e, t) {
			this.verbose && console.log("SectionLoader | addSection: " + e);
			var n = s.sections.length,
				r = t.files || {},
				i = r.templatePath || !1,
				o = r.partials || {},
				u = r.images || !1,
				a = r.htmlPath || !1,
				f = r.cssPath || !1,
				c = r.jsPath || !1,
				h = r.addFiles || [];
			if (l(e)) {
				this.verbose && console.log("SectionLoader | addSection: section id " + e + " already exists");
				return
			}
			s.sections.push({
				id: e,
				images: u,
				data: t.data,
				templatePath: i,
				partials: o,
				htmlPath: a,
				htmlData: null,
				cssPath: f,
				cssData: null,
				jsPath: c,
				jsAttached: !0,
				jsData: null,
				addFiles: h,
				loaded: !1
			}), e === "work"
		}

		function l(e) {
			var t = s.sections.length;
			while (t--)
				if (s.sections[t].id === e) return !0;
			return !1
		}

		function c() {
			var t;
			this.verbose && (console.log("////////////////////////////////////////////"), console.log("////////////////////////////////////////////"), console.log("////////////////////////////////////////////"));
			var n = [],
				r = Array.prototype.slice.call(arguments),
				i;
			if (r.length === 1 && r[0] === "all") {
				r = [];
				for (t = s.sections.length - 1; t >= 0; t--) r.push(s.sections[t].id)
			}
			if (r !== undefined && r !== null)
				for (t = r.length - 1; t >= 0; t--) typeof r[t] == "function" ? i = r[t] : l(r[t]) ? (this.verbose && console.log("SectionLoader | loadSection: " + r[t]), n.push({
					scope: this,
					fn: this.initScrape,
					vars: r[t]
				})) : console.log("SECTION LOADER ERROR! section: " + r[t] + " does not exist");
			else this.verbose && console.log("SectionLoader | this.loadSection: input not valid");
			n.push({
				scope: this,
				fn: this.loadFiles,
				vars: null
			}), i && n.push({
				fn: i,
				vars: null
			}), e.execute(n)
		}

		function h() {
			var t = Array.prototype.slice.call(arguments),
				n = t.pop(),
				r, i, o = this.returnSectionOBJ(n),
				u;
			if (o === undefined) {
				this.verbose && console.log("SectionLoader | this.loadSection: section id " + n + " not found"), e.stepComplete_instant();
				return
			}
			if (o.loaded === !0) {
				this.verbose && console.log("SectionLoader | this.loadSection: " + n + " is already loaded"), e.stepComplete_instant();
				return
			}
			s.currentlyLoadingIDs.push(o.id);
			for (var a in o.partials) o.partials.hasOwnProperty(a) && s.templatesToLoad.push({
				template_name: a,
				template_path: o.partials[a]
			});
			r = o.addFiles.length;
			while (r--) u = o.addFiles[r], u.indexOf(".gif") > 0 || u.indexOf(".jpg") > 0 || u.indexOf(".jpeg") > 0 || u.indexOf(".png") > 0 ? x.call(this, u) : N.call(this, u);
			i = o.images.length;
			while (i--) u = o.images[i], u.indexOf(".gif") > 0 || u.indexOf(".jpg") > 0 || u.indexOf(".jpeg") > 0 || u.indexOf(".png") > 0 ? x.call(this, u) : this.verbose && console.log("SectionLoader | not a supported fileType: " + u);
			var f = [];
			o.htmlPath && f.push({
				scope: this,
				fn: this.loadHTML,
				vars: [o]
			}), o.templatePath && f.push({
				scope: this,
				fn: this.loadTemplate,
				vars: [o, o.templatePath]
			});
			for (var l = s.templatesToLoad.length - 1; l >= 0; l--) f.push({
				scope: this,
				fn: this.loadTemplate,
				vars: [o, s.templatesToLoad[l]]
			});
			o.cssPath && f.push({
				scope: this,
				fn: this.loadCSS,
				vars: [o]
			}), e.execute(f)
		}

		function p(e) {
			var t = this;
			this.verbose && console.log("SectionLoader | loadHTML: " + e.htmlPath), $.get(e.htmlPath, function(n) {
				t.htmlLoaded(e, n)
			})
		}

		function d(t, n) {
			this.verbose && console.log("SectionLoader | htmlLoaded: "), t.htmlData = n;
			var r = t.id;
			if (P.localizationJSON && P.localizationJSON.sections) {
				var i, s, o, u, a, f, l;
				if (P.localizationJSON.sections.shared && P.localizationJSON.sections.shared.html) {
					i = P.localizationJSON.sections.shared.html, s = i.length;
					while (s--) l = i[s], t.htmlData = v(t.htmlData, l)
				}
				if (P.localizationJSON.sections[r] && P.localizationJSON.sections[r].html) {
					i = P.localizationJSON.sections[r].html, s = i.length;
					while (s--) l = i[s], t.htmlData = v(t.htmlData, l)
				}
				var c = document.createElement("div");
				c.innerHTML = t.htmlData;
				var h = c.getElementsByClassName("styleholder");
				for (var p = h.length - 1; p >= 0; p--) h[p].parentNode.setAttribute("style", h[p].getAttribute("data-style")), h[p].parentNode.removeChild(h[p]);
				t.htmlData = c.innerHTML
			}
			var d = /<img [^>]*src="([^"]+)"[^>]*>/g,
				m;
			$(t.htmlData).data("backplate") && x.call(this, $(t.htmlData).data("backplate"));
			while ((m = d.exec(t.htmlData)) !== null) x.call(this, m[1]);
			e.stepComplete_instant()
		}

		function v(e, t) {
			var n = String(e),
				r, i, s, o;
			while (n.indexOf(String(t.ID)) > 0) {
				r = "", i = t.css ? t.css.length : 0;
				while (i--) o = t.css[i], o.VAL && (r += o.ID + ":" + o.VAL + ";");
				s = r === "" ? String(t.VAL) : '<span class="styleholder" data-style="' + r + '"></span>' + String(t.VAL), t.visible && String(t.visible).toLowerCase() === "false" && (s = ""), n = n.replace(String(t.ID), s)
			}
			return n
		}

		function m(e) {
			var t = this;
			this.verbose && console.log("SectionLoader | loadCSS: " + e.cssPath), $.get(e.cssPath, function(n) {
				t.cssLoaded(e, n)
			}, "text")
		}

		function g(t, n) {
			this.verbose && console.log("SectionLoader | this.cssLoaded: " + t.id), t.cssData = String(n);
			var r = t.id;
			if (P.localizationJSON && P.localizationJSON.sections && P.localizationJSON.sections[r] && P.localizationJSON.sections[r].css) {
				var i = P.localizationJSON.sections[r].css,
					s = i.length;
				while (s--)
					while (String(t.cssData).indexOf(String(i[s].ID)) > 0) t.cssData = t.cssData.replace(String(i[s].ID), String(i[s].VAL))
			}
			var o = t.cssData.match(/[^\(]+\.(gif|jpg|jpeg|png)/g);
			if (o) {
				var u = o.length;
				while (u--) {
					var a = o[u].replace("../", "");
					this.verbose && console.log("SectionLoader | cssLoaded: adding: " + a), x.call(this, a)
				}
			}
			e.stepComplete()
		}

		function y(e) {
			var t = this;
			this.verbose && console.log("SectionLoader | loadJS: " + e.jsPath), e.jsPath && t.jsLoaded(e, null)
		}

		function b(t, n) {
			this.verbose && console.log("SectionLoader | loadJS: success"), t.jsAttached = !0, e.stepComplete()
		}

		function w(e) {
			var t = s.imagesToLoad.length;
			while (t--)
				if (s.imagesToLoad[t].url === e) return !0;
			var n = s.miscToLoad.length;
			while (n--)
				if (s.miscToLoad[n].url === e) return !0;
			return !1
		}

		function E(t, r) {
			var i = this,
				s = typeof r == "string" ? r : r.template_path;
			$.get(n + s, function(n) {
				typeof r == "string" ? t.template = n : t.partials[r.template_name] = n, e.stepComplete_instant()
			})
		}

		function S() {
			var e = s.imagesToLoad.length,
				t = s.miscToLoad.length,
				n, r, i = this;
			if (e + t < 1) {
				this.complete(), oblio.settings.prepreloader && oblio.settings.prepreloader.goOut && oblio.settings.prepreloader.goOut();
				return
			}
			s.loader && s.loader.bringIn();
			while (e--) T.call(this, s.imagesToLoad[e]);
			while (t--) C.call(this, s.miscToLoad[t])
		}

		function x(e) {
			if (!this.isDuplicate(e)) {
				var t = s.imagesToLoad.length;
				s.imagesToLoad.push({
					url: e,
					index: t
				})
			}
		}

		function T(e) {
			this.verbose && console.log("SectionLoader | load image: " + e.url);
			var t = e.url;
			e.done = !1, e.size = this.getFileSize(t), newImage = new Image, newImage.alt = String(e.index), $(newImage).load(function() {
				this.verbose && console.log("SectionLoader | image Loaded: " + e.url), e.done = !0, s.imagesLoaded++, P.checkComplete()
			}.bind(this)).error("error", this.fileError), newImage.src = n + t
		}

		function N(e) {
			this.isDuplicate(e) || s.miscToLoad.push({
				url: e
			})
		}

		function C(e) {
			this.verbose && console.log("SectionLoader | xhr load: " + e.url);
			var t = e.url;
			e.perc = 0, e.done = !1, e.size = this.getFileSize(t), $.ajax({
				xhr: function() {
					var t = new window.XMLHttpRequest;
					return t.addEventListener("progress", function(t) {
						t.lengthComputable ? e.perc = t.loaded / t.total : e.perc = 0
					}.bind(this), !1), t
				}.bind(this),
				type: "GET",
				url: t,
				success: function() {
					e.done = !0, s.miscLoaded++, P.checkComplete()
				}.bind(this)
			})
		}

		function k(e, t) {
			this.filesizes.push({
				url: e,
				size: t
			})
		}

		function L(e) {
			for (var t = 0; t < this.filesizes.length; t++)
				if (e == this.filesizes[t].url) return this.filesizes[t].size;
			return this.defaultSize
		}

		function A() {
			var e = 0,
				t = 0;
			for (var n = 0; n < s.miscToLoad.length; n++) t += s.miscToLoad[n].size, s.miscToLoad[n].done ? e += s.miscToLoad[n].size : e += s.miscToLoad[n].size * s.miscToLoad[n].perc;
			for (var r = 0; r < s.imagesToLoad.length; r++) t += s.imagesToLoad[r].size, s.imagesToLoad[r].done && (e += s.imagesToLoad[r].size);
			return e / t
		}

		function O(e) {
			this.verbose && (console.log("SectionLoader | fileError"), console.log(e))
		}

		function M() {
			s.imagesLoaded >= s.imagesToLoad.length && s.miscLoaded >= s.miscToLoad.length && this.complete()
		}

		function _() {
			this.verbose && (console.log("SectionLoader | complete: "), console.log("******************************************* "), console.log("******************************************* "), console.log("******************************************* "));
			var t = s.currentlyLoadingIDs.length;
			while (t--) {
				var n = s.currentlyLoadingIDs[t],
					r = this.returnSectionOBJ(n);
				r.loaded = !0;
				if (r.cssPath) {
					this.verbose && console.log("SectionLoader | attachCSS: " + r.cssPath);
					if (P.localizationJSON && P.localizationJSON.sections && P.localizationJSON.sections[n] && P.localizationJSON.sections[n].css) $('<style type="text/css">' + r.cssData + "</style>").appendTo("head");
					else {
						var i = document.createElement("link");
						i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("href", r.cssPath), document.getElementsByTagName("head")[0].appendChild(i)
					}
				}
			}
			s.currentlyLoadingIDs = [], s.imagesToLoad = [], s.imagesLoaded = 0, s.miscToLoad = [], s.miscLoaded = 0, s.loader && !s.loader.finished ? s.loader.complete(e.stepComplete_instant.bind(e)) : e.stepComplete_instant()
		}

		function D(e) {
			var t, n = s.sections.length;
			while (n--) s.sections[n].id === e && (t = s.sections[n]);
			return t
		}
		var e = new oblio.utils.ArrayExecuter,
			t = oblio.utils.DeviceDetect,
			n = "";
		oblio.settings && (n = oblio.settings.base_url || "");
		var s = {
				sections: [],
				currentlyLoadingIDs: [],
				templatesToLoad: [],
				imagesToLoad: [],
				imagesLoaded: 0,
				miscToLoad: [],
				miscLoaded: 0,
				loader: null
			},
			o = t.isMobile,
			P = {
				verbose: !1,
				loadJSON: r,
				setupSections: i,
				localizationJSON: {},
				addLoaderUI: u,
				addSection: f,
				sectionExists: l,
				addFiles: a,
				loadSection: c,
				initScrape: h,
				loadHTML: p,
				loadTemplate: E,
				htmlLoaded: d,
				loadCSS: m,
				cssLoaded: g,
				loadJS: y,
				jsLoaded: b,
				isDuplicate: w,
				loadFiles: S,
				filesizes: [],
				defaultSize: 100,
				setFileSize: k,
				getFileSize: L,
				getPerc: A,
				fileError: O,
				checkComplete: M,
				complete: _,
				returnSectionOBJ: D
			};
		return window.oblio = window.oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.SectionLoader = P, oblio.utils.SectionLoader
	}),
	function(e, t) {
		"use strict";
		var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
		if (!n.TweenLite) {
			var r, i, s, o, u, a = function(e) {
					var t, r = e.split("."),
						i = n;
					for (t = 0; r.length > t; t++) i[r[t]] = i = i[r[t]] || {};
					return i
				},
				f = a("com.greensock"),
				l = 1e-10,
				c = function(e) {
					var t, n = [],
						r = e.length;
					for (t = 0; t !== r; n.push(e[t++]));
					return n
				},
				h = function() {},
				p = function() {
					var e = Object.prototype.toString,
						t = e.call([]);
					return function(n) {
						return null != n && (n instanceof Array || "object" == typeof n && !!n.push && e.call(n) === t)
					}
				}(),
				d = {},
				v = function(r, i, s, o) {
					this.sc = d[r] ? d[r].sc : [], d[r] = this, this.gsClass = null, this.func = s;
					var u = [];
					this.check = function(f) {
						for (var l, c, h, p, m = i.length, g = m; --m > -1;)(l = d[i[m]] || new v(i[m], [])).gsClass ? (u[m] = l.gsClass, g--) : f && l.sc.push(this);
						if (0 === g && s)
							for (c = ("com.greensock." + r).split("."), h = c.pop(), p = a(c.join("."))[h] = this.gsClass = s.apply(s, u), o && (n[h] = p, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function() {
									return p
								}) : r === t && "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; this.sc.length > m; m++) this.sc[m].check()
					}, this.check(!0)
				},
				m = e._gsDefine = function(e, t, n, r) {
					return new v(e, t, n, r)
				},
				g = f._class = function(e, t, n) {
					return t = t || function() {}, m(e, [], function() {
						return t
					}, n), t
				};
			m.globals = n;
			var y = [0, 0, 1, 1],
				b = [],
				w = g("easing.Ease", function(e, t, n, r) {
					this._func = e, this._type = n || 0, this._power = r || 0, this._params = t ? y.concat(t) : y
				}, !0),
				E = w.map = {},
				S = w.register = function(e, t, n, r) {
					for (var i, s, o, u, a = t.split(","), l = a.length, c = (n || "easeIn,easeOut,easeInOut").split(","); --l > -1;)
						for (s = a[l], i = r ? g("easing." + s, null, !0) : f.easing[s] || {}, o = c.length; --o > -1;) u = c[o], E[s + "." + u] = E[u + s] = i[u] = e.getRatio ? e : e[u] || new e
				};
			for (s = w.prototype, s._calcEnd = !1, s.getRatio = function(e) {
					if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
					var t = this._type,
						n = this._power,
						r = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
					return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r), 1 === t ? 1 - r : 2 === t ? r : .5 > e ? r / 2 : 1 - r / 2
				}, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = r.length; --i > -1;) s = r[i] + ",Power" + i, S(new w(null, null, 1, i), s, "easeOut", !0), S(new w(null, null, 2, i), s, "easeIn" + (0 === i ? ",easeNone" : "")), S(new w(null, null, 3, i), s, "easeInOut");
			E.linear = f.easing.Linear.easeIn, E.swing = f.easing.Quad.easeInOut;
			var x = g("events.EventDispatcher", function(e) {
				this._listeners = {}, this._eventTarget = e || this
			});
			s = x.prototype, s.addEventListener = function(e, t, n, r, i) {
				i = i || 0;
				var s, a, f = this._listeners[e],
					l = 0;
				for (null == f && (this._listeners[e] = f = []), a = f.length; --a > -1;) s = f[a], s.c === t && s.s === n ? f.splice(a, 1) : 0 === l && i > s.pr && (l = a + 1);
				f.splice(l, 0, {
					c: t,
					s: n,
					up: r,
					pr: i
				}), this !== o || u || o.wake()
			}, s.removeEventListener = function(e, t) {
				var n, r = this._listeners[e];
				if (r)
					for (n = r.length; --n > -1;)
						if (r[n].c === t) return r.splice(n, 1), void 0
			}, s.dispatchEvent = function(e) {
				var t, n, r, i = this._listeners[e];
				if (i)
					for (t = i.length, n = this._eventTarget; --t > -1;) r = i[t], r && (r.up ? r.c.call(r.s || n, {
						type: e,
						target: n
					}) : r.c.call(r.s || n))
			};
			var T = e.requestAnimationFrame,
				N = e.cancelAnimationFrame,
				C = Date.now || function() {
					return (new Date).getTime()
				},
				k = C();
			for (r = ["ms", "moz", "webkit", "o"], i = r.length; --i > -1 && !T;) T = e[r[i] + "RequestAnimationFrame"], N = e[r[i] + "CancelAnimationFrame"] || e[r[i] + "CancelRequestAnimationFrame"];
			g("Ticker", function(e, t) {
				var n, r, i, s, a, f = this,
					c = C(),
					p = t !== !1 && T,
					d = 500,
					v = 33,
					m = "tick",
					g = function(e) {
						var t, o, u = C() - k;
						u > d && (c += u - v), k += u, f.time = (k - c) / 1e3, t = f.time - a, (!n || t > 0 || e === !0) && (f.frame++, a += t + (t >= s ? .004 : s - t), o = !0), e !== !0 && (i = r(g)), o && f.dispatchEvent(m)
					};
				x.call(f), f.time = f.frame = 0, f.tick = function() {
					g(!0)
				}, f.lagSmoothing = function(e, t) {
					d = e || 1 / l, v = Math.min(t, d, 0)
				}, f.sleep = function() {
					null != i && (p && N ? N(i) : clearTimeout(i), r = h, i = null, f === o && (u = !1))
				}, f.wake = function() {
					null !== i ? f.sleep() : f.frame > 10 && (k = C() - d + 5), r = 0 === n ? h : p && T ? T : function(e) {
						return setTimeout(e, 0 | 1e3 * (a - f.time) + 1)
					}, f === o && (u = !0), g(2)
				}, f.fps = function(e) {
					return arguments.length ? (n = e, s = 1 / (n || 60), a = this.time + s, f.wake(), void 0) : n
				}, f.useRAF = function(e) {
					return arguments.length ? (f.sleep(), p = e, f.fps(n), void 0) : p
				}, f.fps(e), setTimeout(function() {
					p && (!i || 5 > f.frame) && f.useRAF(!1)
				}, 1500)
			}), s = f.Ticker.prototype = new f.events.EventDispatcher, s.constructor = f.Ticker;
			var L = g("core.Animation", function(e, t) {
				if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, z) {
					u || o.wake();
					var n = this.vars.useFrames ? U : z;
					n.add(this, n._time), this.vars.paused && this.paused(!0)
				}
			});
			o = L.ticker = new f.Ticker, s = L.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
			var A = function() {
				u && C() - k > 2e3 && o.wake(), setTimeout(A, 2e3)
			};
			A(), s.play = function(e, t) {
				return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
			}, s.pause = function(e, t) {
				return null != e && this.seek(e, t), this.paused(!0)
			}, s.resume = function(e, t) {
				return null != e && this.seek(e, t), this.paused(!1)
			}, s.seek = function(e, t) {
				return this.totalTime(Number(e), t !== !1)
			}, s.restart = function(e, t) {
				return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
			}, s.reverse = function(e, t) {
				return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
			}, s.render = function() {}, s.invalidate = function() {
				return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
			}, s.isActive = function() {
				var e, t = this._timeline,
					n = this._startTime;
				return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && n + this.totalDuration() / this._timeScale > e
			}, s._enabled = function(e, t) {
				return u || o.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
			}, s._kill = function() {
				return this._enabled(!1, !1)
			}, s.kill = function(e, t) {
				return this._kill(e, t), this
			}, s._uncache = function(e) {
				for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
				return this
			}, s._swapSelfInParams = function(e) {
				for (var t = e.length, n = e.concat(); --t > -1;) "{self}" === e[t] && (n[t] = this);
				return n
			}, s.eventCallback = function(e, t, n, r) {
				if ("on" === (e || "").substr(0, 2)) {
					var i = this.vars;
					if (1 === arguments.length) return i[e];
					null == t ? delete i[e] : (i[e] = t, i[e + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, i[e + "Scope"] = r), "onUpdate" === e && (this._onUpdate = t)
				}
				return this
			}, s.delay = function(e) {
				return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
			}, s.duration = function(e) {
				return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
			}, s.totalDuration = function(e) {
				return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
			}, s.time = function(e, t) {
				return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
			}, s.totalTime = function(e, t, n) {
				if (u || o.wake(), !arguments.length) return this._totalTime;
				if (this._timeline) {
					if (0 > e && !n && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
						this._dirty && this.totalDuration();
						var r = this._totalDuration,
							i = this._timeline;
						if (e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - e : e) / this._timeScale, i._dirty || this._uncache(!1), i._timeline)
							for (; i._timeline;) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
					}
					this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (this.render(e, t, !1), P.length && W())
				}
				return this
			}, s.progress = s.totalProgress = function(e, t) {
				return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
			}, s.startTime = function(e) {
				return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
			}, s.endTime = function(e) {
				return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
			}, s.timeScale = function(e) {
				if (!arguments.length) return this._timeScale;
				if (e = e || l, this._timeline && this._timeline.smoothChildTiming) {
					var t = this._pauseTime,
						n = t || 0 === t ? t : this._timeline.totalTime();
					this._startTime = n - (n - this._startTime) * this._timeScale / e
				}
				return this._timeScale = e, this._uncache(!1)
			}, s.reversed = function(e) {
				return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
			}, s.paused = function(e) {
				if (!arguments.length) return this._paused;
				if (e != this._paused && this._timeline) {
					u || e || o.wake();
					var t = this._timeline,
						n = t.rawTime(),
						r = n - this._pauseTime;
					!e && t.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = e ? n : null, this._paused = e, this._active = this.isActive(), !e && 0 !== r && this._initted && this.duration() && this.render(t.smoothChildTiming ? this._totalTime : (n - this._startTime) / this._timeScale, !0, !0)
				}
				return this._gc && !e && this._enabled(!0, !1), this
			};
			var O = g("core.SimpleTimeline", function(e) {
				L.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
			});
			s = O.prototype = new L, s.constructor = O, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function(e, t) {
				var n, r;
				if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), n = this._last, this._sortChildren)
					for (r = e._startTime; n && n._startTime > r;) n = n._prev;
				return n ? (e._next = n._next, n._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = n, this._recent = e, this._timeline && this._uncache(!0), this
			}, s._remove = function(e, t) {
				return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
			}, s.render = function(e, t, n) {
				var r, i = this._first;
				for (this._totalTime = this._time = this._rawPrevTime = e; i;) r = i._next, (i._active || e >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)), i = r
			}, s.rawTime = function() {
				return u || o.wake(), this._totalTime
			};
			var M = g("TweenLite", function(t, n, r) {
					if (L.call(this, n, r), this.render = M.prototype.render, null == t) throw "Cannot tween a null target.";
					this.target = t = "string" != typeof t ? t : M.selector(t) || t;
					var i, s, o, u = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
						a = this.vars.overwrite;
					if (this._overwrite = a = null == a ? R[M.defaultOverwrite] : "number" == typeof a ? a >> 0 : R[a], (u || t instanceof Array || t.push && p(t)) && "number" != typeof t[0])
						for (this._targets = o = c(t), this._propLookup = [], this._siblings = [], i = 0; o.length > i; i++) s = o[i], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(i--, 1), this._targets = o = o.concat(c(s))) : (this._siblings[i] = X(s, this, !1), 1 === a && this._siblings[i].length > 1 && $(s, this, null, 1, this._siblings[i])) : (s = o[i--] = M.selector(s), "string" == typeof s && o.splice(i + 1, 1)) : o.splice(i--, 1);
					else this._propLookup = {}, this._siblings = X(t, this, !1), 1 === a && this._siblings.length > 1 && $(t, this, null, 1, this._siblings);
					(this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(-this._delay))
				}, !0),
				_ = function(t) {
					return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
				},
				D = function(e, t) {
					var n, r = {};
					for (n in e) q[n] || n in t && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!j[n] || j[n] && j[n]._autoCSS) || (r[n] = e[n], delete e[n]);
					e.css = r
				};
			s = M.prototype = new L, s.constructor = M, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, M.version = "1.15.1", M.defaultEase = s._ease = new w(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = o, M.autoSleep = !0, M.lagSmoothing = function(e, t) {
				o.lagSmoothing(e, t)
			}, M.selector = e.$ || e.jQuery || function(t) {
				var n = e.$ || e.jQuery;
				return n ? (M.selector = n, n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
			};
			var P = [],
				H = {},
				B = M._internals = {
					isArray: p,
					isSelector: _,
					lazyTweens: P
				},
				j = M._plugins = {},
				F = B.tweenLookup = {},
				I = 0,
				q = B.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1,
					lazy: 1,
					onOverwrite: 1
				},
				R = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					"true": 1,
					"false": 0
				},
				U = L._rootFramesTimeline = new O,
				z = L._rootTimeline = new O,
				W = B.lazyRender = function() {
					var e, t = P.length;
					for (H = {}; --t > -1;) e = P[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
					P.length = 0
				};
			z._startTime = o.time, U._startTime = o.frame, z._active = U._active = !0, setTimeout(W, 1), L._updateRoot = M.render = function() {
				var e, t, n;
				if (P.length && W(), z.render((o.time - z._startTime) * z._timeScale, !1, !1), U.render((o.frame - U._startTime) * U._timeScale, !1, !1), P.length && W(), !(o.frame % 120)) {
					for (n in F) {
						for (t = F[n].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
						0 === t.length && delete F[n]
					}
					if (n = z._first, (!n || n._paused) && M.autoSleep && !U._first && 1 === o._listeners.tick.length) {
						for (; n && n._paused;) n = n._next;
						n || o.sleep()
					}
				}
			}, o.addEventListener("tick", L._updateRoot);
			var X = function(e, t, n) {
					var r, i, s = e._gsTweenID;
					if (F[s || (e._gsTweenID = s = "t" + I++)] || (F[s] = {
							target: e,
							tweens: []
						}), t && (r = F[s].tweens, r[i = r.length] = t, n))
						for (; --i > -1;) r[i] === t && r.splice(i, 1);
					return F[s].tweens
				},
				V = function(e, t, n, r) {
					var i, s, o = e.vars.onOverwrite;
					return o && (i = o(e, t, n, r)), o = M.onOverwrite, o && (s = o(e, t, n, r)), i !== !1 && s !== !1
				},
				$ = function(e, t, n, r, i) {
					var s, o, u, a;
					if (1 === r || r >= 4) {
						for (a = i.length, s = 0; a > s; s++)
							if ((u = i[s]) !== t) u._gc || V(u, t) && u._enabled(!1, !1) && (o = !0);
							else if (5 === r) break;
						return o
					}
					var f, c = t._startTime + l,
						h = [],
						p = 0,
						d = 0 === t._duration;
					for (s = i.length; --s > -1;)(u = i[s]) === t || u._gc || u._paused || (u._timeline !== t._timeline ? (f = f || J(t, 0, d), 0 === J(u, f, d) && (h[p++] = u)) : c >= u._startTime && u._startTime + u.totalDuration() / u._timeScale > c && ((d || !u._initted) && 2e-10 >= c - u._startTime || (h[p++] = u)));
					for (s = p; --s > -1;)
						if (u = h[s], 2 === r && u._kill(n, e, t) && (o = !0), 2 !== r || !u._firstPT && u._initted) {
							if (2 !== r && !V(u, t)) continue;
							u._enabled(!1, !1) && (o = !0)
						}
					return o
				},
				J = function(e, t, n) {
					for (var r = e._timeline, i = r._timeScale, s = e._startTime; r._timeline;) {
						if (s += r._startTime, i *= r._timeScale, r._paused) return -100;
						r = r._timeline
					}
					return s /= i, s > t ? s - t : n && s === t || !e._initted && 2 * l > s - t ? l : (s += e.totalDuration() / e._timeScale / i) > t + l ? 0 : s - t - l
				};
			s._init = function() {
				var e, t, n, r, i, s = this.vars,
					o = this._overwrittenProps,
					u = this._duration,
					a = !!s.immediateRender,
					f = s.ease;
				if (s.startAt) {
					this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), i = {};
					for (r in s.startAt) i[r] = s.startAt[r];
					if (i.overwrite = !1, i.immediateRender = !0, i.lazy = a && s.lazy !== !1, i.startAt = i.delay = null, this._startAt = M.to(this.target, 0, i), a)
						if (this._time > 0) this._startAt = null;
						else if (0 !== u) return
				} else if (s.runBackwards && 0 !== u)
					if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
					else {
						0 !== this._time && (a = !1), n = {};
						for (r in s) q[r] && "autoCSS" !== r || (n[r] = s[r]);
						if (n.overwrite = 0, n.data = "isFromStart", n.lazy = a && s.lazy !== !1, n.immediateRender = a, this._startAt = M.to(this.target, 0, n), a) {
							if (0 === this._time) return
						} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
					}
				if (this._ease = f = f ? f instanceof w ? f : "function" == typeof f ? new w(f, s.easeParams) : E[f] || M.defaultEase : M.defaultEase, s.easeParams instanceof Array && f.config && (this._ease = f.config.apply(f, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
					for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], o ? o[e] : null) && (t = !0);
				else t = this._initProps(this.target, this._propLookup, this._siblings, o);
				if (t && M._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
					for (n = this._firstPT; n;) n.s += n.c, n.c = -n.c, n = n._next;
				this._onUpdate = s.onUpdate, this._initted = !0
			}, s._initProps = function(t, n, r, i) {
				var s, o, u, a, f, l;
				if (null == t) return !1;
				H[t._gsTweenID] && W(), this.vars.css || t.style && t !== e && t.nodeType && j.css && this.vars.autoCSS !== !1 && D(this.vars, t);
				for (s in this.vars) {
					if (l = this.vars[s], q[s]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[s] = l = this._swapSelfInParams(l, this));
					else if (j[s] && (a = new j[s])._onInitTween(t, this.vars[s], this)) {
						for (this._firstPT = f = {
								_next: this._firstPT,
								t: a,
								p: "setRatio",
								s: 0,
								c: 1,
								f: !0,
								n: s,
								pg: !0,
								pr: a._priority
							}, o = a._overwriteProps.length; --o > -1;) n[a._overwriteProps[o]] = this._firstPT;
						(a._priority || a._onInitAllProps) && (u = !0), (a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0)
					} else this._firstPT = n[s] = f = {
						_next: this._firstPT,
						t: t,
						p: s,
						f: "function" == typeof t[s],
						n: s,
						pg: !1,
						pr: 0
					}, f.s = f.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), f.c = "string" == typeof l && "=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0;
					f && f._next && (f._next._prev = f)
				}
				return i && this._kill(i, t) ? this._initProps(t, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && $(t, this, n, this._overwrite, r) ? (this._kill(n, t), this._initProps(t, n, r, i)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (H[t._gsTweenID] = !0), u)
			}, s.render = function(e, t, n) {
				var r, i, s, o, u = this._time,
					a = this._duration,
					f = this._rawPrevTime;
				if (e >= a) this._totalTime = this._time = a, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, i = "onComplete"), 0 === a && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > f || f === l && "isPause" !== this.data) && f !== e && (n = !0, f > l && (i = "onReverseComplete")), this._rawPrevTime = o = !t || e || f === e ? e : l);
				else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== u || 0 === a && f > 0 && f !== l) && (i = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === a && (this._initted || !this.vars.lazy || n) && (f >= 0 && (f !== l || "isPause" !== this.data) && (n = !0), this._rawPrevTime = o = !t || e || f === e ? e : l)), this._initted || (n = !0);
				else if (this._totalTime = this._time = e, this._easeType) {
					var c = e / a,
						h = this._easeType,
						p = this._easePower;
					(1 === h || 3 === h && c >= .5) && (c = 1 - c), 3 === h && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), this.ratio = 1 === h ? 1 - c : 2 === h ? c : .5 > e / a ? c / 2 : 1 - c / 2
				} else this.ratio = this._ease.getRatio(e / a);
				if (this._time !== u || n) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = u, this._rawPrevTime = f, P.push(this), this._lazy = [e, t], void 0;
						this._time && !r ? this.ratio = this._ease.getRatio(this._time / a) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== u && e >= 0 && (this._active = !0), 0 === u && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === a) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || b))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
					this._onUpdate && (0 > e && this._startAt && e !== -0.0001 && this._startAt.render(e, t, n), t || (this._time !== u || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || b)), i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && e !== -0.0001 && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || b), 0 === a && this._rawPrevTime === l && o !== l && (this._rawPrevTime = 0))
				}
			}, s._kill = function(e, t, n) {
				if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
					t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
					var r, i, s, o, u, a, f, l, c;
					if ((p(t) || _(t)) && "number" != typeof t[0])
						for (r = t.length; --r > -1;) this._kill(e, t[r]) && (a = !0);
					else {
						if (this._targets) {
							for (r = this._targets.length; --r > -1;)
								if (t === this._targets[r]) {
									u = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], i = this._overwrittenProps[r] = e ? this._overwrittenProps[r] || {} : "all";
									break
								}
						} else {
							if (t !== this.target) return !1;
							u = this._propLookup, i = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
						}
						if (u) {
							if (f = e || u, l = e !== i && "all" !== i && e !== u && ("object" != typeof e || !e._tempKill), n && (M.onOverwrite || this.vars.onOverwrite)) {
								for (s in f) u[s] && (c || (c = []), c.push(s));
								if (!V(this, n, t, c)) return !1
							}
							for (s in f)(o = u[s]) && (o.pg && o.t._kill(f) && (a = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete u[s]), l && (i[s] = 1);
							!this._firstPT && this._initted && this._enabled(!1, !1)
						}
					}
					return a
				}
				return this._lazy = !1, this._enabled(!1, !1)
			}, s.invalidate = function() {
				return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], L.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -l, this.render(-this._delay)), this
			}, s._enabled = function(e, t) {
				if (u || o.wake(), e && this._gc) {
					var n, r = this._targets;
					if (r)
						for (n = r.length; --n > -1;) this._siblings[n] = X(r[n], this, !0);
					else this._siblings = X(this.target, this, !0)
				}
				return L.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
			}, M.to = function(e, t, n) {
				return new M(e, t, n)
			}, M.from = function(e, t, n) {
				return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new M(e, t, n)
			}, M.fromTo = function(e, t, n, r) {
				return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new M(e, t, r)
			}, M.delayedCall = function(e, t, n, r, i) {
				return new M(t, 0, {
					delay: e,
					onComplete: t,
					onCompleteParams: n,
					onCompleteScope: r,
					onReverseComplete: t,
					onReverseCompleteParams: n,
					onReverseCompleteScope: r,
					immediateRender: !1,
					lazy: !1,
					useFrames: i,
					overwrite: 0
				})
			}, M.set = function(e, t) {
				return new M(e, 0, t)
			}, M.getTweensOf = function(e, t) {
				if (null == e) return [];
				e = "string" != typeof e ? e : M.selector(e) || e;
				var n, r, i, s;
				if ((p(e) || _(e)) && "number" != typeof e[0]) {
					for (n = e.length, r = []; --n > -1;) r = r.concat(M.getTweensOf(e[n], t));
					for (n = r.length; --n > -1;)
						for (s = r[n], i = n; --i > -1;) s === r[i] && r.splice(n, 1)
				} else
					for (r = X(e).concat(), n = r.length; --n > -1;)(r[n]._gc || t && !r[n].isActive()) && r.splice(n, 1);
				return r
			}, M.killTweensOf = M.killDelayedCallsTo = function(e, t, n) {
				"object" == typeof t && (n = t, t = !1);
				for (var r = M.getTweensOf(e, t), i = r.length; --i > -1;) r[i]._kill(n, e)
			};
			var K = g("plugins.TweenPlugin", function(e, t) {
				this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = K.prototype
			}, !0);
			if (s = K.prototype, K.version = "1.10.1", K.API = 2, s._firstPT = null, s._addTween = function(e, t, n, r, i, s) {
					var o, u;
					return null != r && (o = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = u = {
						_next: this._firstPT,
						t: e,
						p: t,
						s: n,
						c: o,
						f: "function" == typeof e[t],
						n: i || t,
						r: s
					}, u._next && (u._next._prev = u), u) : void 0
				}, s.setRatio = function(e) {
					for (var t, n = this._firstPT, r = 1e-6; n;) t = n.c * e + n.s, n.r ? t = Math.round(t) : r > t && t > -r && (t = 0), n.f ? n.t[n.p](t) : n.t[n.p] = t, n = n._next
				}, s._kill = function(e) {
					var t, n = this._overwriteProps,
						r = this._firstPT;
					if (null != e[this._propName]) this._overwriteProps = [];
					else
						for (t = n.length; --t > -1;) null != e[n[t]] && n.splice(t, 1);
					for (; r;) null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
					return !1
				}, s._roundProps = function(e, t) {
					for (var n = this._firstPT; n;)(e[this._propName] || null != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t), n = n._next
				}, M._onPluginEvent = function(e, t) {
					var n, r, i, s, o, u = t._firstPT;
					if ("_onInitAllProps" === e) {
						for (; u;) {
							for (o = u._next, r = i; r && r.pr > u.pr;) r = r._next;
							(u._prev = r ? r._prev : s) ? u._prev._next = u: i = u, (u._next = r) ? r._prev = u : s = u, u = o
						}
						u = t._firstPT = i
					}
					for (; u;) u.pg && "function" == typeof u.t[e] && u.t[e]() && (n = !0), u = u._next;
					return n
				}, K.activate = function(e) {
					for (var t = e.length; --t > -1;) e[t].API === K.API && (j[(new e[t])._propName] = e[t]);
					return !0
				}, m.plugin = function(e) {
					if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
					var t, n = e.propName,
						r = e.priority || 0,
						i = e.overwriteProps,
						s = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_roundProps",
							initAll: "_onInitAllProps"
						},
						o = g("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
							K.call(this, n, r), this._overwriteProps = i || []
						}, e.global === !0),
						u = o.prototype = new K(n);
					u.constructor = o, o.API = e.API;
					for (t in s) "function" == typeof e[t] && (u[s[t]] = e[t]);
					return o.version = e.version, K.activate([o]), o
				}, r = e._gsQueue) {
				for (i = 0; r.length > i; i++) r[i]();
				for (s in d) d[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
			}
			u = !1
		}
	}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite"), define("greensock/TweenLite.min", function() {}), define("oblio/utils/Preloader", ["greensock/TweenLite.min", "oblio/utils/SectionLoader"], function() {
		function u(e) {
			n[e] ? t = e : console.log("preloader.js : switchLoader : no loader found with ID: " + e)
		}

		function a(e, r) {
			n[e.id] = e, t || (t = e.id), r && r()
		}

		function f() {
			console.log("preloader bringIn");
			if (!t) return;
			this.finished = !1, r = 0, oblio.settings.prepreloader && oblio.settings.prepreloader.goOut && oblio.settings.prepreloader.goOut(), t && n[t].bringIn !== undefined ? n[t].bringIn(l.bind(this)) : t && n[t].elem !== undefined ? (TweenLite.to(n[t].elem, .5, {
				autoAlpha: 1,
				onComplete: l.bind(this)
			}), h.apply(this)) : l()
		}

		function l() {
			console.log("preloader isIn"), c.apply(this)
		}

		function c(e) {
			i = h.bind(this), TweenLite.ticker.addEventListener("tick", i)
		}

		function h(s) {
			var o = e.getPerc();
			isNaN(o) && (o = 1), o = r + Math.ceil(10 * (o - r) / .2) / 1e3, r = Math.max(r, o);
			if (t && n[t].onProgress !== undefined) {
				var u = n[t].onProgress(r);
				r >= 1 && this.finished && u === !0 && (TweenLite.ticker.removeEventListener("tick", i), p())
			} else {
				t && n[t].updateBar !== undefined ? n[t].updateBar(r) : t && n[t].progressBar !== undefined && (n[t].progressBar.style.width = r * 100 + "%");
				if (t && n[t].updateLabel !== undefined) n[t].updateText(r);
				else if (t && n[t].loaderText !== undefined) {
					var a = "";
					t && n[t].loaderText_before !== undefined && (a += n[t].loaderText_before), a += Math.round(r * 100), t && n[t].loaderText_after !== undefined && (a += n[t].loaderText_after), n[t].loaderText.innerHTML = a
				}
				r >= 1 && this.finished && (TweenLite.ticker.removeEventListener("tick", i), p())
			}
		}

		function p() {
			console.log("preloader goOut"), t && n[t].goOut !== undefined ? n[t].goOut(d.bind(this)) : t && n[t].elem !== undefined ? TweenLite.to(n[t].elem, .5, {
				autoAlpha: 0,
				onComplete: d.bind(this)
			}) : d()
		}

		function d(e) {
			console.log("Preloader isOut"), s && s()
		}

		function v(e) {
			s = e || !1, t || d(), this.finished = !0
		}
		var e = oblio.utils.SectionLoader,
			t = !1,
			n = {},
			r = 0,
			i, s = !1,
			o = function() {
				oblio.settings.instaLoad || e.addLoaderUI(this), this.finished = !0
			};
		return o.prototype.switchLoader = u, o.prototype.addLoader = a, o.prototype.bringIn = f, o.prototype.complete = v, window.oblio = window.oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.Preloader = new o, oblio.utils.Preloader
	}),
	function(e, t) {
		if (typeof exports == "object" && exports) t(exports);
		else {
			var n = {};
			t(n), typeof define == "function" && define.amd ? define("mustache", n) : e.Mustache = n
		}
	}(this, function(e) {
		function n(e, n) {
			return t.call(e, n)
		}

		function i(e) {
			return !n(r, e)
		}

		function u(e) {
			return typeof e == "function"
		}

		function a(e) {
			return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		}

		function l(e) {
			return String(e).replace(/[&<>"'\/]/g, function(e) {
				return f[e]
			})
		}

		function c(e) {
			if (!o(e) || e.length !== 2) throw new Error("Invalid tags: " + e);
			return [new RegExp(a(e[0]) + "\\s*"), new RegExp("\\s*" + a(e[1]))]
		}

		function g(t, n) {
			function E() {
				if (l && !g)
					while (f.length) delete u[f.pop()];
				else f = [];
				l = !1, g = !1
			}
			n = n || e.tags, t = t || "", typeof n == "string" && (n = n.split(p));
			var r = c(n),
				s = new w(t),
				o = [],
				u = [],
				f = [],
				l = !1,
				g = !1,
				S, x, T, N, C, k;
			while (!s.eos()) {
				S = s.pos, T = s.scanUntil(r[0]);
				if (T)
					for (var L = 0, A = T.length; L < A; ++L) N = T.charAt(L), i(N) ? f.push(u.length) : g = !0, u.push(["text", N, S, S + 1]), S += 1, N === "\n" && E();
				if (!s.scan(r[0])) break;
				l = !0, x = s.scan(m) || "name", s.scan(h), x === "=" ? (T = s.scanUntil(d), s.scan(d), s.scanUntil(r[1])) : x === "{" ? (T = s.scanUntil(new RegExp("\\s*" + a("}" + n[1]))), s.scan(v), s.scanUntil(r[1]), x = "&") : T = s.scanUntil(r[1]);
				if (!s.scan(r[1])) throw new Error("Unclosed tag at " + s.pos);
				C = [x, T, S, s.pos], u.push(C);
				if (x === "#" || x === "^") o.push(C);
				else if (x === "/") {
					k = o.pop();
					if (!k) throw new Error('Unopened section "' + T + '" at ' + S);
					if (k[1] !== T) throw new Error('Unclosed section "' + k[1] + '" at ' + S)
				} else x === "name" || x === "{" || x === "&" ? g = !0 : x === "=" && (r = c(n = T.split(p)))
			}
			k = o.pop();
			if (k) throw new Error('Unclosed section "' + k[1] + '" at ' + s.pos);
			return b(y(u))
		}

		function y(e) {
			var t = [],
				n, r;
			for (var i = 0, s = e.length; i < s; ++i) n = e[i], n && (n[0] === "text" && r && r[0] === "text" ? (r[1] += n[1], r[3] = n[3]) : (t.push(n), r = n));
			return t
		}

		function b(e) {
			var t = [],
				n = t,
				r = [],
				i, s;
			for (var o = 0, u = e.length; o < u; ++o) {
				i = e[o];
				switch (i[0]) {
					case "#":
					case "^":
						n.push(i), r.push(i), n = i[4] = [];
						break;
					case "/":
						s = r.pop(), s[5] = i[2], n = r.length > 0 ? r[r.length - 1][4] : t;
						break;
					default:
						n.push(i)
				}
			}
			return t
		}

		function w(e) {
			this.string = e, this.tail = e, this.pos = 0
		}

		function E(e, t) {
			this.view = e == null ? {} : e, this.cache = {
				".": this.view
			}, this.parent = t
		}

		function S() {
			this.cache = {}
		}
		var t = RegExp.prototype.test,
			r = /\S/,
			s = Object.prototype.toString,
			o = Array.isArray || function(e) {
				return s.call(e) === "[object Array]"
			},
			f = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
				"/": "&#x2F;"
			},
			h = /\s*/,
			p = /\s+/,
			d = /\s*=/,
			v = /\s*\}/,
			m = /#|\^|\/|>|\{|&|=|!/;
		w.prototype.eos = function() {
			return this.tail === ""
		}, w.prototype.scan = function(e) {
			var t = this.tail.match(e);
			if (t && t.index === 0) {
				var n = t[0];
				return this.tail = this.tail.substring(n.length), this.pos += n.length, n
			}
			return ""
		}, w.prototype.scanUntil = function(e) {
			var t = this.tail.search(e),
				n;
			switch (t) {
				case -1:
					n = this.tail, this.tail = "";
					break;
				case 0:
					n = "";
					break;
				default:
					n = this.tail.substring(0, t), this.tail = this.tail.substring(t)
			}
			return this.pos += n.length, n
		}, E.prototype.push = function(e) {
			return new E(e, this)
		}, E.prototype.lookup = function(e) {
			var t;
			if (e in this.cache) t = this.cache[e];
			else {
				var n = this;
				while (n) {
					if (e.indexOf(".") > 0) {
						t = n.view;
						var r = e.split("."),
							i = 0;
						while (t != null && i < r.length) t = t[r[i++]]
					} else t = n.view[e];
					if (t != null) break;
					n = n.parent
				}
				this.cache[e] = t
			}
			return u(t) && (t = t.call(this.view)), t
		}, S.prototype.clearCache = function() {
			this.cache = {}
		}, S.prototype.parse = function(e, t) {
			var n = this.cache,
				r = n[e];
			return r == null && (r = n[e] = g(e, t)), r
		}, S.prototype.render = function(e, t, n) {
			var r = this.parse(e),
				i = t instanceof E ? t : new E(t);
			return this.renderTokens(r, i, n, e)
		}, S.prototype.renderTokens = function(t, n, r, i) {
			function f(e) {
				return a.render(e, n, r)
			}
			var s = "",
				a = this,
				l, c;
			for (var h = 0, p = t.length; h < p; ++h) {
				l = t[h];
				switch (l[0]) {
					case "#":
						c = n.lookup(l[1]);
						if (!c) continue;
						if (o(c))
							for (var d = 0, v = c.length; d < v; ++d) s += this.renderTokens(l[4], n.push(c[d]), r, i);
						else if (typeof c == "object" || typeof c == "string") s += this.renderTokens(l[4], n.push(c), r, i);
						else if (u(c)) {
							if (typeof i != "string") throw new Error("Cannot use higher-order sections without the original template");
							c = c.call(n.view, i.slice(l[3], l[5]), f), c != null && (s += c)
						} else s += this.renderTokens(l[4], n, r, i);
						break;
					case "^":
						c = n.lookup(l[1]);
						if (!c || o(c) && c.length === 0) s += this.renderTokens(l[4], n, r, i);
						break;
					case ">":
						if (!r) continue;
						c = u(r) ? r(l[1]) : r[l[1]], c != null && (s += this.renderTokens(this.parse(c), n, r, c));
						break;
					case "&":
						c = n.lookup(l[1]), c != null && (s += c);
						break;
					case "name":
						c = n.lookup(l[1]), c != null && (s += e.escape(c));
						break;
					case "text":
						s += l[1]
				}
			}
			return s
		}, e.name = "mustache.js", e.version = "0.8.1", e.tags = ["{{", "}}"];
		var x = new S;
		e.clearCache = function() {
			return x.clearCache()
		}, e.parse = function(e, t) {
			return x.parse(e, t)
		}, e.render = function(e, t, n) {
			return x.render(e, t, n)
		}, e.to_html = function(t, n, r, i) {
			var s = e.render(t, n, r);
			if (!u(i)) return s;
			i(s)
		}, e.escape = l, e.Scanner = w, e.Context = E, e.Writer = S
	});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
		var t, n, r, i = _gsScope.GreenSockGlobals || _gsScope,
			s = i.com.greensock,
			o = 2 * Math.PI,
			u = Math.PI / 2,
			a = s._class,
			f = function(t, n) {
				var r = a("easing." + t, function() {}, !0),
					i = r.prototype = new e;
				return i.constructor = r, i.getRatio = n, r
			},
			l = e.register || function() {},
			c = function(e, t, n, r) {
				var i = a("easing." + e, {
					easeOut: new t,
					easeIn: new n,
					easeInOut: new r
				}, !0);
				return l(i, e), i
			},
			h = function(e, t, n) {
				this.t = e, this.v = t, n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
			},
			p = function(t, n) {
				var r = a("easing." + t, function(e) {
						this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
					}, !0),
					i = r.prototype = new e;
				return i.constructor = r, i.getRatio = n, i.config = function(e) {
					return new r(e)
				}, r
			},
			d = c("Back", p("BackOut", function(e) {
				return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
			}), p("BackIn", function(e) {
				return e * e * ((this._p1 + 1) * e - this._p1)
			}), p("BackInOut", function(e) {
				return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
			})),
			v = a("easing.SlowMo", function(e, t, n) {
				t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
			}, !0),
			m = v.prototype = new e;
		return m.constructor = v, m.getRatio = function(e) {
			var t = e + (.5 - e) * this._p;
			return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
		}, v.ease = new v(.7, .7), m.config = v.config = function(e, t, n) {
			return new v(e, t, n)
		}, t = a("easing.SteppedEase", function(e) {
			e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
		}, !0), m = t.prototype = new e, m.constructor = t, m.getRatio = function(e) {
			return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
		}, m.config = t.config = function(e) {
			return new t(e)
		}, n = a("easing.RoughEase", function(t) {
			t = t || {};
			for (var n, r, i, s, o, u, a = t.taper || "none", f = [], l = 0, c = 0 | (t.points || 20), p = c, d = t.randomize !== !1, v = t.clamp === !0, m = t.template instanceof e ? t.template : null, g = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) n = d ? Math.random() : 1 / c * p, r = m ? m.getRatio(n) : n, "none" === a ? i = g : "out" === a ? (s = 1 - n, i = s * s * g) : "in" === a ? i = n * n * g : .5 > n ? (s = 2 * n, i = .5 * s * s * g) : (s = 2 * (1 - n), i = .5 * s * s * g), d ? r += Math.random() * i - .5 * i : p % 2 ? r += .5 * i : r -= .5 * i, v && (r > 1 ? r = 1 : 0 > r && (r = 0)), f[l++] = {
				x: n,
				y: r
			};
			for (f.sort(function(e, t) {
					return e.x - t.x
				}), u = new h(1, 1, null), p = c; --p > -1;) o = f[p], u = new h(o.x, o.y, u);
			this._prev = new h(0, 0, 0 !== u.t ? u : u.next)
		}, !0), m = n.prototype = new e, m.constructor = n, m.getRatio = function(e) {
			var t = this._prev;
			if (e > t.t) {
				for (; t.next && e >= t.t;) t = t.next;
				t = t.prev
			} else
				for (; t.prev && t.t >= e;) t = t.prev;
			return this._prev = t, t.v + (e - t.t) / t.gap * t.c
		}, m.config = function(e) {
			return new n(e)
		}, n.ease = new n, c("Bounce", f("BounceOut", function(e) {
			return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
		}), f("BounceIn", function(e) {
			return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
		}), f("BounceInOut", function(e) {
			var t = .5 > e;
			return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
		})), c("Circ", f("CircOut", function(e) {
			return Math.sqrt(1 - (e -= 1) * e)
		}), f("CircIn", function(e) {
			return -(Math.sqrt(1 - e * e) - 1)
		}), f("CircInOut", function(e) {
			return 1 > (e *= 2) ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
		})), r = function(t, n, r) {
			var i = a("easing." + t, function(e, t) {
					this._p1 = e || 1, this._p2 = t || r, this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0)
				}, !0),
				s = i.prototype = new e;
			return s.constructor = i, s.getRatio = n, s.config = function(e, t) {
				return new i(e, t)
			}, i
		}, c("Elastic", r("ElasticOut", function(e) {
			return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * o / this._p2) + 1
		}, .3), r("ElasticIn", function(e) {
			return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2))
		}, .3), r("ElasticInOut", function(e) {
			return 1 > (e *= 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2) + 1
		}, .45)), c("Expo", f("ExpoOut", function(e) {
			return 1 - Math.pow(2, -10 * e)
		}), f("ExpoIn", function(e) {
			return Math.pow(2, 10 * (e - 1)) - .001
		}), f("ExpoInOut", function(e) {
			return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
		})), c("Sine", f("SineOut", function(e) {
			return Math.sin(e * u)
		}), f("SineIn", function(e) {
			return -Math.cos(e * u) + 1
		}), f("SineInOut", function(e) {
			return -0.5 * (Math.cos(Math.PI * e) - 1)
		})), a("easing.EaseLookup", {
			find: function(t) {
				return e.map[t]
			}
		}, !0), l(i.SlowMo, "SlowMo", "ease,"), l(n, "RoughEase", "ease,"), l(t, "SteppedEase", "ease,"), d
	}, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), define("greensock/easing/EasePack.min", function() {});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		"use strict";
		_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
			var n, r, i, s, o = function() {
					e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
				},
				u = _gsScope._gsDefine.globals,
				a = {},
				f = o.prototype = new e("css");
			f.constructor = o, o.version = "1.15.1", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", f = "px", o.suffixMap = {
				top: f,
				right: f,
				bottom: f,
				left: f,
				width: f,
				height: f,
				fontSize: f,
				padding: f,
				margin: f,
				perspective: f,
				lineHeight: ""
			};
			var l, c, h, p, d, v, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
				g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
				y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
				b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
				w = /(?:\d|\-|\+|=|#|\.)*/g,
				E = /opacity *= *([^)]*)/i,
				S = /opacity:([^;]*)/i,
				x = /alpha\(opacity *=.+?\)/i,
				T = /^(rgb|hsl)/,
				N = /([A-Z])/g,
				C = /-([a-z])/gi,
				k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
				L = function(e, t) {
					return t.toUpperCase()
				},
				A = /(?:Left|Right|Width)/i,
				O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
				M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
				_ = /,(?=[^\)]*(?:\(|$))/gi,
				D = Math.PI / 180,
				P = 180 / Math.PI,
				H = {},
				B = document,
				j = function(e) {
					return B.createElementNS ? B.createElementNS("http://www.w3.org/1999/xhtml", e) : B.createElement(e)
				},
				F = j("div"),
				I = j("img"),
				q = o._internals = {
					_specialProps: a
				},
				R = navigator.userAgent,
				U = function() {
					var e = R.indexOf("Android"),
						t = j("a");
					return h = -1 !== R.indexOf("Safari") && -1 === R.indexOf("Chrome") && (-1 === e || Number(R.substr(e + 8, 1)) > 3), d = h && 6 > Number(R.substr(R.indexOf("Version/") + 8, 1)), p = -1 !== R.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(R) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(R)) && (v = parseFloat(RegExp.$1)), t ? (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity)) : !1
				}(),
				z = function(e) {
					return E.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
				},
				W = function(e) {
					window.console && console.log(e)
				},
				X = "",
				V = "",
				$ = function(e, t) {
					t = t || F;
					var n, r, i = t.style;
					if (void 0 !== i[e]) return e;
					for (e = e.charAt(0).toUpperCase() + e.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + e];);
					return r >= 0 ? (V = 3 === r ? "ms" : n[r], X = "-" + V.toLowerCase() + "-", V + e) : null
				},
				J = B.defaultView ? B.defaultView.getComputedStyle : function() {},
				K = o.getStyle = function(e, t, n, r, i) {
					var s;
					return U || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (n = n || J(e)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(N, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == i || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : i) : z(e)
				},
				Q = q.convertToPixels = function(e, n, r, i, s) {
					if ("px" === i || !i) return r;
					if ("auto" === i || !r) return 0;
					var u, a, f, l = A.test(n),
						c = e,
						h = F.style,
						p = 0 > r;
					if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) u = r / 100 * (l ? e.clientWidth : e.clientHeight);
					else {
						if (h.cssText = "border:0 solid red;position:" + K(e, "position") + ";line-height:0;", "%" !== i && c.appendChild) h[l ? "borderLeftWidth" : "borderTopWidth"] = r + i;
						else {
							if (c = e.parentNode || B.body, a = c._gsCache, f = t.ticker.frame, a && l && a.time === f) return a.width * r / 100;
							h[l ? "width" : "height"] = r + i
						}
						c.appendChild(F), u = parseFloat(F[l ? "offsetWidth" : "offsetHeight"]), c.removeChild(F), l && "%" === i && o.cacheWidths !== !1 && (a = c._gsCache = c._gsCache || {}, a.time = f, a.width = 100 * (u / r)), 0 !== u || s || (u = Q(e, n, r, i, !0))
					}
					return p ? -u : u
				},
				G = q.calculateOffset = function(e, t, n) {
					if ("absolute" !== K(e, "position", n)) return 0;
					var r = "left" === t ? "Left" : "Top",
						i = K(e, "margin" + r, n);
					return e["offset" + r] - (Q(e, t, parseFloat(i), i.replace(w, "")) || 0)
				},
				Y = function(e, t) {
					var n, r, i = {};
					if (t = t || J(e, null))
						for (n in t)(-1 === n.indexOf("Transform") || St === n) && (i[n] = t[n]);
					else if (t = e.currentStyle || e.style)
						for (n in t) "string" == typeof n && void 0 === i[n] && (i[n.replace(C, L)] = t[n]);
					return U || (i.opacity = z(e)), r = _t(e, t, !1), i.rotation = r.rotation, i.skewX = r.skewX, i.scaleX = r.scaleX, i.scaleY = r.scaleY, i.x = r.x, i.y = r.y, Nt && (i.z = r.z, i.rotationX = r.rotationX, i.rotationY = r.rotationY, i.scaleZ = r.scaleZ), i.filters && delete i.filters, i
				},
				Z = function(e, t, n, r, i) {
					var s, o, u, a = {},
						f = e.style;
					for (o in n) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = n[o]) || i && i[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : G(e, o), void 0 !== f[o] && (u = new pt(f, o, f[o], u)));
					if (r)
						for (o in r) "className" !== o && (a[o] = r[o]);
					return {
						difs: a,
						firstMPT: u
					}
				},
				et = {
					width: ["Left", "Right"],
					height: ["Top", "Bottom"]
				},
				tt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
				nt = function(e, t, n) {
					var r = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
						i = et[t],
						s = i.length;
					for (n = n || J(e, null); --s > -1;) r -= parseFloat(K(e, "padding" + i[s], n, !0)) || 0, r -= parseFloat(K(e, "border" + i[s] + "Width", n, !0)) || 0;
					return r
				},
				rt = function(e, t) {
					(null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
					var n = e.split(" "),
						r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
						i = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
					return null == i ? i = "center" === r ? "50%" : "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== i.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === i.charAt(1), t.ox = parseFloat(r.replace(b, "")), t.oy = parseFloat(i.replace(b, ""))), r + " " + i + (n.length > 2 ? " " + n[2] : "")
				},
				it = function(e, t) {
					return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
				},
				st = function(e, t) {
					return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e)
				},
				ot = function(e, t, n, r) {
					var i, s, o, u, a, f = 1e-6;
					return null == e ? u = t : "number" == typeof e ? u = e : (i = 360, s = e.split("_"), a = "=" === e.charAt(1), o = (a ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : P) - (a ? 0 : t), s.length && (r && (r[n] = t + o), -1 !== e.indexOf("short") && (o %= i, o !== o % (i / 2) && (o = 0 > o ? o + i : o - i)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * i) % i - (0 | o / i) * i : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * i) % i - (0 | o / i) * i)), u = t + o), f > u && u > -f && (u = 0), u
				},
				ut = {
					aqua: [0, 255, 255],
					lime: [0, 255, 0],
					silver: [192, 192, 192],
					black: [0, 0, 0],
					maroon: [128, 0, 0],
					teal: [0, 128, 128],
					blue: [0, 0, 255],
					navy: [0, 0, 128],
					white: [255, 255, 255],
					fuchsia: [255, 0, 255],
					olive: [128, 128, 0],
					yellow: [255, 255, 0],
					orange: [255, 165, 0],
					gray: [128, 128, 128],
					purple: [128, 0, 128],
					green: [0, 128, 0],
					red: [255, 0, 0],
					pink: [255, 192, 203],
					cyan: [0, 255, 255],
					transparent: [255, 255, 255, 0]
				},
				at = function(e, t, n) {
					return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (n - t) * e : .5 > e ? n : 2 > 3 * e ? t + 6 * (n - t) * (2 / 3 - e) : t) + .5
				},
				ft = o.parseColor = function(e) {
					var t, n, r, i, s, o;
					return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ut[e] ? ut[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), n = e.charAt(2), r = e.charAt(3), e = "#" + t + t + n + n + r + r), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(m), i = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, o = Number(e[2]) / 100, n = .5 >= o ? o * (s + 1) : o + s - o * s, t = 2 * o - n, e.length > 3 && (e[3] = Number(e[3])), e[0] = at(i + 1 / 3, t, n), e[1] = at(i, t, n), e[2] = at(i - 1 / 3, t, n), e) : (e = e.match(m) || ut.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : ut.black
				},
				lt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
			for (f in ut) lt += "|" + f + "\\b";
			lt = RegExp(lt + ")", "gi");
			var ct = function(e, t, n, r) {
					if (null == e) return function(e) {
						return e
					};
					var i, s = t ? (e.match(lt) || [""])[0] : "",
						o = e.split(s).join("").match(y) || [],
						u = e.substr(0, e.indexOf(o[0])),
						a = ")" === e.charAt(e.length - 1) ? ")" : "",
						f = -1 !== e.indexOf(" ") ? " " : ",",
						l = o.length,
						c = l > 0 ? o[0].replace(m, "") : "";
					return l ? i = t ? function(e) {
						var t, h, p, d;
						if ("number" == typeof e) e += c;
						else if (r && _.test(e)) {
							for (d = e.replace(_, "|").split("|"), p = 0; d.length > p; p++) d[p] = i(d[p]);
							return d.join(",")
						}
						if (t = (e.match(lt) || [s])[0], h = e.split(t).join("").match(y) || [], p = h.length, l > p--)
							for (; l > ++p;) h[p] = n ? h[0 | (p - 1) / 2] : o[p];
						return u + h.join(f) + f + t + a + (-1 !== e.indexOf("inset") ? " inset" : "")
					} : function(e) {
						var t, s, h;
						if ("number" == typeof e) e += c;
						else if (r && _.test(e)) {
							for (s = e.replace(_, "|").split("|"), h = 0; s.length > h; h++) s[h] = i(s[h]);
							return s.join(",")
						}
						if (t = e.match(y) || [], h = t.length, l > h--)
							for (; l > ++h;) t[h] = n ? t[0 | (h - 1) / 2] : o[h];
						return u + t.join(f) + a
					} : function(e) {
						return e
					}
				},
				ht = function(e) {
					return e = e.split(","),
						function(t, n, r, i, s, o, u) {
							var a, f = (n + "").split(" ");
							for (u = {}, a = 0; 4 > a; a++) u[e[a]] = f[a] = f[a] || f[(a - 1) / 2 >> 0];
							return i.parse(t, u, s, o)
						}
				},
				pt = (q._setPluginRatio = function(e) {
					this.plugin.setRatio(e);
					for (var t, n, r, i, s = this.data, o = s.proxy, u = s.firstMPT, a = 1e-6; u;) t = o[u.v], u.r ? t = Math.round(t) : a > t && t > -a && (t = 0), u.t[u.p] = t, u = u._next;
					if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === e)
						for (u = s.firstMPT; u;) {
							if (n = u.t, n.type) {
								if (1 === n.type) {
									for (i = n.xs0 + n.s + n.xs1, r = 1; n.l > r; r++) i += n["xn" + r] + n["xs" + (r + 1)];
									n.e = i
								}
							} else n.e = n.s + n.xs0;
							u = u._next
						}
				}, function(e, t, n, r, i) {
					this.t = e, this.p = t, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
				}),
				dt = (q._parseToProxy = function(e, t, n, r, i, s) {
					var o, u, a, f, l, c = r,
						h = {},
						p = {},
						d = n._transform,
						v = H;
					for (n._transform = null, H = t, r = l = n.parse(e, t, r, i), H = v, s && (n._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
						if (1 >= r.type && (u = r.p, p[u] = r.s + r.c, h[u] = r.s, s || (f = new pt(r, "s", u, f, r.r), r.c = 0), 1 === r.type))
							for (o = r.l; --o > 0;) a = "xn" + o, u = r.p + "_" + a, p[u] = r.data[a], h[u] = r[a], s || (f = new pt(r, a, u, f, r.rxp[a]));
						r = r._next
					}
					return {
						proxy: h,
						end: p,
						firstMPT: f,
						pt: l
					}
				}, q.CSSPropTween = function(e, t, r, i, o, u, a, f, l, c, h) {
					this.t = e, this.p = t, this.s = r, this.c = i, this.n = a || t, e instanceof dt || s.push(this.n), this.r = f, this.type = u || 0, l && (this.pr = l, n = !0), this.b = void 0 === c ? r : c, this.e = void 0 === h ? r + i : h, o && (this._next = o, o._prev = this)
				}),
				vt = o.parseComplex = function(e, t, n, r, i, s, o, u, a, f) {
					n = n || s || "", o = new dt(e, t, 0, 0, o, f ? 2 : 1, null, !1, u, n, r), r += "";
					var c, h, p, d, v, y, b, w, E, S, x, N, C = n.split(", ").join(",").split(" "),
						k = r.split(", ").join(",").split(" "),
						L = C.length,
						A = l !== !1;
					for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (C = C.join(" ").replace(_, ", ").split(" "), k = k.join(" ").replace(_, ", ").split(" "), L = C.length), L !== k.length && (C = (s || "").split(" "), L = C.length), o.plugin = a, o.setRatio = f, c = 0; L > c; c++)
						if (d = C[c], v = k[c], w = parseFloat(d), w || 0 === w) o.appendXtra("", w, it(v, w), v.replace(g, ""), A && -1 !== v.indexOf("px"), !0);
						else if (i && ("#" === d.charAt(0) || ut[d] || T.test(d))) N = "," === v.charAt(v.length - 1) ? ")," : ")", d = ft(d), v = ft(v), E = d.length + v.length > 6, E && !U && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[c]).join("transparent")) : (U || (E = !1), o.appendXtra(E ? "rgba(" : "rgb(", d[0], v[0] - d[0], ",", !0, !0).appendXtra("", d[1], v[1] - d[1], ",", !0).appendXtra("", d[2], v[2] - d[2], E ? "," : N, !0), E && (d = 4 > d.length ? 1 : d[3], o.appendXtra("", d, (4 > v.length ? 1 : v[3]) - d, N, !1)));
					else if (y = d.match(m)) {
						if (b = v.match(g), !b || b.length !== y.length) return o;
						for (p = 0, h = 0; y.length > h; h++) x = y[h], S = d.indexOf(x, p), o.appendXtra(d.substr(p, S - p), Number(x), it(b[h], x), "", A && "px" === d.substr(S + x.length, 2), 0 === h), p = S + x.length;
						o["xs" + o.l] += d.substr(p)
					} else o["xs" + o.l] += o.l ? " " + d : d;
					if (-1 !== r.indexOf("=") && o.data) {
						for (N = o.xs0 + o.data.s, c = 1; o.l > c; c++) N += o["xs" + c] + o.data["xn" + c];
						o.e = N + o["xs" + c]
					}
					return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
				},
				mt = 9;
			for (f = dt.prototype, f.l = f.pr = 0; --mt > 0;) f["xn" + mt] = 0, f["xs" + mt] = "";
			f.xs0 = "", f._next = f._prev = f.xfirst = f.data = f.plugin = f.setRatio = f.rxp = null, f.appendXtra = function(e, t, n, r, i, s) {
				var o = this,
					u = o.l;
				return o["xs" + u] += s && u ? " " + e : e || "", n || 0 === u || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new dt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
					s: t + n
				}, o.rxp = {}, o.s = t, o.c = n, o.r = i, o)) : (o["xs" + u] += t + (r || ""), o)
			};
			var gt = function(e, t) {
					t = t || {}, this.p = t.prefix ? $(e) || e : e, a[e] = a[this.p] = this, this.format = t.formatter || ct(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
				},
				yt = q._registerComplexSpecialProp = function(e, t, n) {
					"object" != typeof t && (t = {
						parser: n
					});
					var r, i, s = e.split(","),
						o = t.defaultValue;
					for (n = n || [o], r = 0; s.length > r; r++) t.prefix = 0 === r && t.prefix, t.defaultValue = n[r] || o, i = new gt(s[r], t)
				},
				bt = function(e) {
					if (!a[e]) {
						var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
						yt(e, {
							parser: function(e, n, r, i, s, o, f) {
								var l = u.com.greensock.plugins[t];
								return l ? (l._cssRegister(), a[r].parse(e, n, r, i, s, o, f)) : (W("Error: " + t + " js file not loaded."), s)
							}
						})
					}
				};
			f = gt.prototype, f.parseComplex = function(e, t, n, r, i, s) {
				var o, u, a, f, l, c, h = this.keyword;
				if (this.multi && (_.test(n) || _.test(t) ? (u = t.replace(_, "|").split("|"), a = n.replace(_, "|").split("|")) : h && (u = [t], a = [n])), a) {
					for (f = a.length > u.length ? a.length : u.length, o = 0; f > o; o++) t = u[o] = u[o] || this.dflt, n = a[o] = a[o] || this.dflt, h && (l = t.indexOf(h), c = n.indexOf(h), l !== c && (n = -1 === c ? a : u, n[o] += " " + h));
					t = u.join(", "), n = a.join(", ")
				}
				return vt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
			}, f.parse = function(e, t, n, r, s, o) {
				return this.parseComplex(e.style, this.format(K(e, this.p, i, !1, this.dflt)), this.format(t), s, o)
			}, o.registerSpecialProp = function(e, t, n) {
				yt(e, {
					parser: function(e, r, i, s, o, u) {
						var a = new dt(e, i, 0, 0, o, 2, i, !1, n);
						return a.plugin = u, a.setRatio = t(e, r, s._tween, i), a
					},
					priority: n
				})
			};
			var wt, Et = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
				St = $("transform"),
				xt = X + "transform",
				Tt = $("transformOrigin"),
				Nt = null !== $("perspective"),
				Ct = q.Transform = function() {
					this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = o.defaultForce3D !== !1 && Nt ? o.defaultForce3D || "auto" : !1
				},
				kt = window.SVGElement,
				Lt = function(e, t, n) {
					var r, i = B.createElementNS("http://www.w3.org/2000/svg", e),
						s = /([a-z])([A-Z])/g;
					for (r in n) i.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), n[r]);
					return t.appendChild(i), i
				},
				At = document.documentElement,
				Ot = function() {
					var e, t, n, r = v || /Android/i.test(R) && !window.chrome;
					return B.createElementNS && !r && (e = Lt("svg", At), t = Lt("rect", e, {
						width: 100,
						height: 50,
						x: 100
					}), n = t.getBoundingClientRect().width, t.style[Tt] = "50% 50%", t.style[St] = "scaleX(0.5)", r = n === t.getBoundingClientRect().width && (!p || !Nt), At.removeChild(e)), r
				}(),
				Mt = function(e, t, n) {
					var r = e.getBBox();
					t = rt(t).split(" "), n.xOrigin = (-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * r.width : parseFloat(t[0])) + r.x, n.yOrigin = (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * r.height : parseFloat(t[1])) + r.y
				},
				_t = q.getTransform = function(e, t, n, r) {
					if (e._gsTransform && n && !r) return e._gsTransform;
					var s, u, a, f, l, c, h, p, d, v, m = n ? e._gsTransform || new Ct : new Ct,
						g = 0 > m.scaleX,
						y = 2e-5,
						b = 1e5,
						w = Nt ? parseFloat(K(e, Tt, t, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
						E = parseFloat(o.defaultTransformPerspective) || 0;
					if (St ? u = K(e, xt, t, !0) : e.currentStyle && (u = e.currentStyle.filter.match(O), u = u && 4 === u.length ? [u[0].substr(4), Number(u[2].substr(4)), Number(u[1].substr(4)), u[3].substr(4), m.x || 0, m.y || 0].join(",") : ""), s = !u || "none" === u || "matrix(1, 0, 0, 1, 0, 0)" === u, m.svg = !!(kt && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM)), m.svg && (Mt(e, K(e, Tt, i, !1, "50% 50%") + "", m), wt = o.useSVGTransformAttr || Ot, a = e.getAttribute("transform"), s && a && -1 !== a.indexOf("matrix") && (u = a, s = 0)), !s) {
						for (a = (u || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], f = a.length; --f > -1;) l = Number(a[f]), a[f] = (c = l - (l |= 0)) ? (0 | c * b + (0 > c ? -0.5 : .5)) / b + l : l;
						if (16 === a.length) {
							var S, x, T, N, C, k = a[0],
								L = a[1],
								A = a[2],
								M = a[3],
								_ = a[4],
								D = a[5],
								H = a[6],
								B = a[7],
								j = a[8],
								F = a[9],
								I = a[10],
								q = a[12],
								R = a[13],
								U = a[14],
								z = a[11],
								W = Math.atan2(H, I);
							m.zOrigin && (U = -m.zOrigin, q = j * U - a[12], R = F * U - a[13], U = I * U + m.zOrigin - a[14]), m.rotationX = W * P, W && (N = Math.cos(-W), C = Math.sin(-W), S = _ * N + j * C, x = D * N + F * C, T = H * N + I * C, j = _ * -C + j * N, F = D * -C + F * N, I = H * -C + I * N, z = B * -C + z * N, _ = S, D = x, H = T), W = Math.atan2(j, I), m.rotationY = W * P, W && (N = Math.cos(-W), C = Math.sin(-W), S = k * N - j * C, x = L * N - F * C, T = A * N - I * C, F = L * C + F * N, I = A * C + I * N, z = M * C + z * N, k = S, L = x, A = T), W = Math.atan2(L, k), m.rotation = W * P, W && (N = Math.cos(-W), C = Math.sin(-W), k = k * N + _ * C, x = L * N + D * C, D = L * -C + D * N, H = A * -C + H * N, L = x), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY += 180), m.scaleX = (0 | Math.sqrt(k * k + L * L) * b + .5) / b, m.scaleY = (0 | Math.sqrt(D * D + F * F) * b + .5) / b, m.scaleZ = (0 | Math.sqrt(H * H + I * I) * b + .5) / b, m.skewX = 0, m.perspective = z ? 1 / (0 > z ? -z : z) : 0, m.x = q, m.y = R, m.z = U
						} else if (!(Nt && !r && a.length && m.x === a[4] && m.y === a[5] && (m.rotationX || m.rotationY) || void 0 !== m.x && "none" === K(e, "display", t))) {
							var X = a.length >= 6,
								V = X ? a[0] : 1,
								$ = a[1] || 0,
								J = a[2] || 0,
								Q = X ? a[3] : 1;
							m.x = a[4] || 0, m.y = a[5] || 0, h = Math.sqrt(V * V + $ * $), p = Math.sqrt(Q * Q + J * J), d = V || $ ? Math.atan2($, V) * P : m.rotation || 0, v = J || Q ? Math.atan2(J, Q) * P + d : m.skewX || 0, Math.abs(v) > 90 && 270 > Math.abs(v) && (g ? (h *= -1, v += 0 >= d ? 180 : -180, d += 0 >= d ? 180 : -180) : (p *= -1, v += 0 >= v ? 180 : -180)), m.scaleX = h, m.scaleY = p, m.rotation = d, m.skewX = v, Nt && (m.rotationX = m.rotationY = m.z = 0, m.perspective = E, m.scaleZ = 1)
						}
						m.zOrigin = w;
						for (f in m) y > m[f] && m[f] > -y && (m[f] = 0)
					}
					return n && (e._gsTransform = m), m
				},
				Dt = function(e) {
					var t, n, r = this.data,
						i = -r.rotation * D,
						s = i + r.skewX * D,
						o = 1e5,
						u = (0 | Math.cos(i) * r.scaleX * o) / o,
						a = (0 | Math.sin(i) * r.scaleX * o) / o,
						f = (0 | Math.sin(s) * -r.scaleY * o) / o,
						l = (0 | Math.cos(s) * r.scaleY * o) / o,
						c = this.t.style,
						h = this.t.currentStyle;
					if (h) {
						n = a, a = -f, f = -n, t = h.filter, c.filter = "";
						var p, d, m = this.t.offsetWidth,
							g = this.t.offsetHeight,
							y = "absolute" !== h.position,
							b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + a + ", M21=" + f + ", M22=" + l,
							S = r.x + m * r.xPercent / 100,
							x = r.y + g * r.yPercent / 100;
						if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, d = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, S += p - (p * u + d * a), x += d - (p * f + d * l)), y ? (p = m / 2, d = g / 2, b += ", Dx=" + (p - (p * u + d * a) + S) + ", Dy=" + (d - (p * f + d * l) + x) + ")") : b += ", sizingMethod='auto expand')", c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(M, b) : b + " " + t, (0 === e || 1 === e) && 1 === u && 0 === a && 0 === f && 1 === l && (y && -1 === b.indexOf("Dx=0, Dy=0") || E.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
							var T, N, C, k = 8 > v ? 1 : -1;
							for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > u ? -u : u) * m + (0 > a ? -a : a) * g)) / 2 + S), r.ieOffsetY = Math.round((g - ((0 > l ? -l : l) * g + (0 > f ? -f : f) * m)) / 2 + x), mt = 0; 4 > mt; mt++) N = tt[mt], T = h[N], n = -1 !== T.indexOf("px") ? parseFloat(T) : Q(this.t, N, parseFloat(T), T.replace(w, "")) || 0, C = n !== r[N] ? 2 > mt ? -r.ieOffsetX : -r.ieOffsetY : 2 > mt ? p - r.ieOffsetX : d - r.ieOffsetY, c[N] = (r[N] = Math.round(n - C * (0 === mt || 2 === mt ? 1 : k))) + "px"
						}
					}
				},
				Pt = q.set3DTransformRatio = function(e) {
					var t, n, r, i, s, o, u, a, f, l, c, h, d, v, m, g, y, b, w, E, S, x = this.data,
						T = this.t.style,
						N = x.rotation * D,
						C = x.scaleX,
						k = x.scaleY,
						L = x.scaleZ,
						A = x.x,
						O = x.y,
						M = x.z,
						_ = x.perspective;
					if (!(1 !== e && 0 !== e && x.force3D || x.force3D === !0 || x.rotationY || x.rotationX || 1 !== L || _ || M)) return Ht.call(this, e), void 0;
					if (p && (v = 1e-4, v > C && C > -v && (C = L = 2e-5), v > k && k > -v && (k = L = 2e-5), !_ || x.z || x.rotationX || x.rotationY || (_ = 0)), N || x.skewX) m = t = Math.cos(N), g = i = Math.sin(N), x.skewX && (N -= x.skewX * D, m = Math.cos(N), g = Math.sin(N), "simple" === x.skewType && (y = Math.tan(x.skewX * D), y = Math.sqrt(1 + y * y), m *= y, g *= y)), n = -g, s = m;
					else {
						if (!(x.rotationY || x.rotationX || 1 !== L || _ || x.svg)) return T[St] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) translate3d(" : "translate3d(") + A + "px," + O + "px," + M + "px)" + (1 !== C || 1 !== k ? " scale(" + C + "," + k + ")" : ""), void 0;
						t = s = 1, n = i = 0
					}
					f = 1, r = o = u = a = l = c = 0, h = _ ? -1 / _ : 0, d = x.zOrigin, v = 1e-6, E = ",", S = "0", N = x.rotationY * D, N && (m = Math.cos(N), g = Math.sin(N), u = -g, l = h * -g, r = t * g, o = i * g, f = m, h *= m, t *= m, i *= m), N = x.rotationX * D, N && (m = Math.cos(N), g = Math.sin(N), y = n * m + r * g, b = s * m + o * g, a = f * g, c = h * g, r = n * -g + r * m, o = s * -g + o * m, f *= m, h *= m, n = y, s = b), 1 !== L && (r *= L, o *= L, f *= L, h *= L), 1 !== k && (n *= k, s *= k, a *= k, c *= k), 1 !== C && (t *= C, i *= C, u *= C, l *= C), (d || x.svg) && (d && (A += r * -d, O += o * -d, M += f * -d + d), x.svg && (A += x.xOrigin - (x.xOrigin * t + x.yOrigin * n), O += x.yOrigin - (x.xOrigin * i + x.yOrigin * s)), v > A && A > -v && (A = S), v > O && O > -v && (O = S), v > M && M > -v && (M = 0)), w = x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix3d(" : "matrix3d(", w += (v > t && t > -v ? S : t) + E + (v > i && i > -v ? S : i) + E + (v > u && u > -v ? S : u), w += E + (v > l && l > -v ? S : l) + E + (v > n && n > -v ? S : n) + E + (v > s && s > -v ? S : s), x.rotationX || x.rotationY ? (w += E + (v > a && a > -v ? S : a) + E + (v > c && c > -v ? S : c) + E + (v > r && r > -v ? S : r), w += E + (v > o && o > -v ? S : o) + E + (v > f && f > -v ? S : f) + E + (v > h && h > -v ? S : h) + E) : w += ",0,0,0,0,1,0,", w += A + E + O + E + M + E + (_ ? 1 + -M / _ : 1) + ")", T[St] = w
				},
				Ht = q.set2DTransformRatio = function(e) {
					var t, n, r, i, s, o, u, a, f, l, c, h = this.data,
						p = this.t,
						d = p.style,
						v = h.x,
						m = h.y;
					return !(h.rotationX || h.rotationY || h.z || h.force3D === !0 || "auto" === h.force3D && 1 !== e && 0 !== e) || h.svg && wt || !Nt ? (i = h.scaleX, s = h.scaleY, h.rotation || h.skewX || h.svg ? (t = h.rotation * D, n = t - h.skewX * D, r = 1e5, o = Math.cos(t) * i, u = Math.sin(t) * i, a = Math.sin(n) * -s, f = Math.cos(n) * s, h.svg && (v += h.xOrigin - (h.xOrigin * o + h.yOrigin * a), m += h.yOrigin - (h.xOrigin * u + h.yOrigin * f), c = 1e-6, c > v && v > -c && (v = 0), c > m && m > -c && (m = 0)), l = (0 | o * r) / r + "," + (0 | u * r) / r + "," + (0 | a * r) / r + "," + (0 | f * r) / r + "," + v + "," + m + ")", h.svg && wt ? p.setAttribute("transform", "matrix(" + l) : d[St] = (h.xPercent || h.yPercent ? "translate(" + h.xPercent + "%," + h.yPercent + "%) matrix(" : "matrix(") + l) : d[St] = (h.xPercent || h.yPercent ? "translate(" + h.xPercent + "%," + h.yPercent + "%) matrix(" : "matrix(") + i + ",0,0," + s + "," + v + "," + m + ")", void 0) : (this.setRatio = Pt, Pt.call(this, e), void 0)
				};
			f = Ct.prototype, f.x = f.y = f.z = f.skewX = f.skewY = f.rotation = f.rotationX = f.rotationY = f.zOrigin = f.xPercent = f.yPercent = 0, f.scaleX = f.scaleY = f.scaleZ = 1, yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
				parser: function(e, t, n, r, s, u, a) {
					if (r._lastParsedTransform === a) return s;
					r._lastParsedTransform = a;
					var f, l, c, h, p, d, v, m = r._transform = _t(e, i, !0, a.parseTransform),
						g = e.style,
						y = 1e-6,
						b = Et.length,
						w = a,
						E = {};
					if ("string" == typeof w.transform && St) c = F.style, c[St] = w.transform, c.display = "block", c.position = "absolute", B.body.appendChild(F), f = _t(F, null, !1), B.body.removeChild(F);
					else if ("object" == typeof w) {
						if (f = {
								scaleX: st(null != w.scaleX ? w.scaleX : w.scale, m.scaleX),
								scaleY: st(null != w.scaleY ? w.scaleY : w.scale, m.scaleY),
								scaleZ: st(w.scaleZ, m.scaleZ),
								x: st(w.x, m.x),
								y: st(w.y, m.y),
								z: st(w.z, m.z),
								xPercent: st(w.xPercent, m.xPercent),
								yPercent: st(w.yPercent, m.yPercent),
								perspective: st(w.transformPerspective, m.perspective)
							}, v = w.directionalRotation, null != v)
							if ("object" == typeof v)
								for (c in v) w[c] = v[c];
							else w.rotation = v;
							"string" == typeof w.x && -1 !== w.x.indexOf("%") && (f.x = 0, f.xPercent = st(w.x, m.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (f.y = 0, f.yPercent = st(w.y, m.yPercent)), f.rotation = ot("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : m.rotation, m.rotation, "rotation", E), Nt && (f.rotationX = ot("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", E), f.rotationY = ot("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", E)), f.skewX = null == w.skewX ? m.skewX : ot(w.skewX, m.skewX), f.skewY = null == w.skewY ? m.skewY : ot(w.skewY, m.skewY), (l = f.skewY - m.skewY) && (f.skewX += l, f.rotation += l)
					}
					for (Nt && null != w.force3D && (m.force3D = w.force3D, d = !0), m.skewType = w.skewType || m.skewType || o.defaultSkewType, p = m.force3D || m.z || m.rotationX || m.rotationY || f.z || f.rotationX || f.rotationY || f.perspective, p || null == w.scale || (f.scaleZ = 1); --b > -1;) n = Et[b], h = f[n] - m[n], (h > y || -y > h || null != w[n] || null != H[n]) && (d = !0, s = new dt(m, n, m[n], h, s), n in E && (s.e = E[n]), s.xs0 = 0, s.plugin = u, r._overwriteProps.push(s.n));
					return h = w.transformOrigin, h && m.svg && (Mt(e, rt(h), f), s = new dt(m, "xOrigin", m.xOrigin, f.xOrigin - m.xOrigin, s, -1, "transformOrigin"), s.b = m.xOrigin, s.e = s.xs0 = f.xOrigin, s = new dt(m, "yOrigin", m.yOrigin, f.yOrigin - m.yOrigin, s, -1, "transformOrigin"), s.b = m.yOrigin, s.e = s.xs0 = f.yOrigin, h = "0px 0px"), (h || Nt && p && m.zOrigin) && (St ? (d = !0, n = Tt, h = (h || K(e, n, i, !1, "50% 50%")) + "", s = new dt(g, n, 0, 0, s, -1, "transformOrigin"), s.b = g[n], s.plugin = u, Nt ? (c = m.zOrigin, h = h.split(" "), m.zOrigin = (h.length > 2 && (0 === c || "0px" !== h[2]) ? parseFloat(h[2]) : c) || 0, s.xs0 = s.e = h[0] + " " + (h[1] || "50%") + " 0px", s = new dt(m, "zOrigin", 0, 0, s, -1, s.n), s.b = c, s.xs0 = s.e = m.zOrigin) : s.xs0 = s.e = h) : rt(h + "", m)), d && (r._transformType = m.svg && wt || !p && 3 !== this._transformType ? 2 : 3), s
				},
				prefix: !0
			}), yt("boxShadow", {
				defaultValue: "0px 0px 0px 0px #999",
				prefix: !0,
				color: !0,
				multi: !0,
				keyword: "inset"
			}), yt("borderRadius", {
				defaultValue: "0px",
				parser: function(e, t, n, s, o) {
					t = this.format(t);
					var u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
						T = e.style;
					for (v = parseFloat(e.offsetWidth), m = parseFloat(e.offsetHeight), u = t.split(" "), a = 0; x.length > a; a++) this.p.indexOf("border") && (x[a] = $(x[a])), c = l = K(e, x[a], i, !1, "0px"), -1 !== c.indexOf(" ") && (l = c.split(" "), c = l[0], l = l[1]), h = f = u[a], p = parseFloat(c), y = c.substr((p + "").length), b = "=" === h.charAt(1), b ? (d = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), d *= parseFloat(h), g = h.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(h), g = h.substr((d + "").length)), "" === g && (g = r[n] || y), g !== y && (w = Q(e, "borderLeft", p, y), E = Q(e, "borderTop", p, y), "%" === g ? (c = 100 * (w / v) + "%", l = 100 * (E / m) + "%") : "em" === g ? (S = Q(e, "borderLeft", 1, "em"), c = w / S + "em", l = E / S + "em") : (c = w + "px", l = E + "px"), b && (h = parseFloat(c) + d + g, f = parseFloat(l) + d + g)), o = vt(T, x[a], c + " " + l, h + " " + f, !1, "0px", o);
					return o
				},
				prefix: !0,
				formatter: ct("0px 0px 0px 0px", !1, !0)
			}), yt("backgroundPosition", {
				defaultValue: "0 0",
				parser: function(e, t, n, r, s, o) {
					var u, a, f, l, c, h, p = "background-position",
						d = i || J(e, null),
						m = this.format((d ? v ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
						g = this.format(t);
					if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (h = K(e, "backgroundImage").replace(k, ""), h && "none" !== h)) {
						for (u = m.split(" "), a = g.split(" "), I.setAttribute("src", h), f = 2; --f > -1;) m = u[f], l = -1 !== m.indexOf("%"), l !== (-1 !== a[f].indexOf("%")) && (c = 0 === f ? e.offsetWidth - I.width : e.offsetHeight - I.height, u[f] = l ? parseFloat(m) / 100 * c + "px" : 100 * (parseFloat(m) / c) + "%");
						m = u.join(" ")
					}
					return this.parseComplex(e.style, m, g, s, o)
				},
				formatter: rt
			}), yt("backgroundSize", {
				defaultValue: "0 0",
				formatter: rt
			}), yt("perspective", {
				defaultValue: "0px",
				prefix: !0
			}), yt("perspectiveOrigin", {
				defaultValue: "50% 50%",
				prefix: !0
			}), yt("transformStyle", {
				prefix: !0
			}), yt("backfaceVisibility", {
				prefix: !0
			}), yt("userSelect", {
				prefix: !0
			}), yt("margin", {
				parser: ht("marginTop,marginRight,marginBottom,marginLeft")
			}), yt("padding", {
				parser: ht("paddingTop,paddingRight,paddingBottom,paddingLeft")
			}), yt("clip", {
				defaultValue: "rect(0px,0px,0px,0px)",
				parser: function(e, t, n, r, s, o) {
					var u, a, f;
					return 9 > v ? (a = e.currentStyle, f = 8 > v ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format(K(e, this.p, i, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, u, t, s, o)
				}
			}), yt("textShadow", {
				defaultValue: "0px 0px 0px #999",
				color: !0,
				multi: !0
			}), yt("autoRound,strictUnits", {
				parser: function(e, t, n, r, i) {
					return i
				}
			}), yt("border", {
				defaultValue: "0px solid #000",
				parser: function(e, t, n, r, s, o) {
					return this.parseComplex(e.style, this.format(K(e, "borderTopWidth", i, !1, "0px") + " " + K(e, "borderTopStyle", i, !1, "solid") + " " + K(e, "borderTopColor", i, !1, "#000")), this.format(t), s, o)
				},
				color: !0,
				formatter: function(e) {
					var t = e.split(" ");
					return t[0] + " " + (t[1] || "solid") + " " + (e.match(lt) || ["#000"])[0]
				}
			}), yt("borderWidth", {
				parser: ht("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
			}), yt("float,cssFloat,styleFloat", {
				parser: function(e, t, n, r, i) {
					var s = e.style,
						o = "cssFloat" in s ? "cssFloat" : "styleFloat";
					return new dt(s, o, 0, 0, i, -1, n, !1, 0, s[o], t)
				}
			});
			var Bt = function(e) {
				var t, n = this.t,
					r = n.filter || K(this.data, "filter") || "",
					i = 0 | this.s + this.c * e;
				100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), t = !K(this.data, "filter")) : (n.filter = r.replace(x, ""), t = !0)), t || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("pacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(E, "opacity=" + i))
			};
			yt("opacity,alpha,autoAlpha", {
				defaultValue: "1",
				parser: function(e, t, n, r, s, o) {
					var u = parseFloat(K(e, "opacity", i, !1, "1")),
						a = e.style,
						f = "autoAlpha" === n;
					return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + u), f && 1 === u && "hidden" === K(e, "visibility", i) && 0 !== t && (u = 0), U ? s = new dt(a, "opacity", u, t - u, s) : (s = new dt(a, "opacity", 100 * u, 100 * (t - u), s), s.xn1 = f ? 1 : 0, a.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Bt), f && (s = new dt(a, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== u ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(n)), s
				}
			});
			var jt = function(e, t) {
					t && (e.removeProperty ? ("ms" === t.substr(0, 2) && (t = "M" + t.substr(1)), e.removeProperty(t.replace(N, "-$1").toLowerCase())) : e.removeAttribute(t))
				},
				Ft = function(e) {
					if (this.t._gsClassPT = this, 1 === e || 0 === e) {
						this.t.setAttribute("class", 0 === e ? this.b : this.e);
						for (var t = this.data, n = this.t.style; t;) t.v ? n[t.p] = t.v : jt(n, t.p), t = t._next;
						1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
					} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
				};
			yt("className", {
				parser: function(e, t, r, s, o, u, a) {
					var f, l, c, h, p, d = e.getAttribute("class") || "",
						v = e.style.cssText;
					if (o = s._classNamePT = new dt(e, r, 0, 0, o, 2), o.setRatio = Ft, o.pr = -11, n = !0, o.b = d, l = Y(e, i), c = e._gsClassPT) {
						for (h = {}, p = c.data; p;) h[p.p] = 1, p = p._next;
						c.setRatio(1)
					}
					return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : d.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), s._tween._duration && (e.setAttribute("class", o.e), f = Z(e, l, Y(e), a, h), e.setAttribute("class", d), o.data = f.firstMPT, e.style.cssText = v, o = o.xfirst = s.parse(e, f.difs, o, u)), o
				}
			});
			var It = function(e) {
				if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
					var t, n, r, i, s = this.t.style,
						o = a.transform.parse;
					if ("all" === this.e) s.cssText = "", i = !0;
					else
						for (t = this.e.split(" ").join("").split(","), r = t.length; --r > -1;) n = t[r], a[n] && (a[n].parse === o ? i = !0 : n = "transformOrigin" === n ? Tt : a[n].p), jt(s, n);
					i && (jt(s, St), this.t._gsTransform && delete this.t._gsTransform)
				}
			};
			for (yt("clearProps", {
					parser: function(e, t, r, i, s) {
						return s = new dt(e, r, 0, 0, s, 2), s.setRatio = It, s.e = t, s.pr = -10, s.data = i._tween, n = !0, s
					}
				}), f = "bezier,throwProps,physicsProps,physics2D".split(","), mt = f.length; mt--;) bt(f[mt]);
			f = o.prototype, f._firstPT = f._lastParsedTransform = f._transform = null, f._onInitTween = function(e, t, u) {
				if (!e.nodeType) return !1;
				this._target = e, this._tween = u, this._vars = t, l = t.autoRound, n = !1, r = t.suffixMap || o.suffixMap, i = J(e, ""), s = this._overwriteProps;
				var a, f, p, v, m, g, y, b, w, E = e.style;
				if (c && "" === E.zIndex && (a = K(e, "zIndex", i), ("auto" === a || "" === a) && this._addLazySet(E, "zIndex", 0)), "string" == typeof t && (v = E.cssText, a = Y(e, i), E.cssText = v + ";" + t, a = Z(e, a, Y(e)).difs, !U && S.test(t) && (a.opacity = parseFloat(RegExp.$1)), t = a, E.cssText = v), this._firstPT = f = this.parse(e, t, null), this._transformType) {
					for (w = 3 === this._transformType, St ? h && (c = !0, "" === E.zIndex && (y = K(e, "zIndex", i), ("auto" === y || "" === y) && this._addLazySet(E, "zIndex", 0)), d && this._addLazySet(E, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : E.zoom = 1, p = f; p && p._next;) p = p._next;
					b = new dt(e, "transform", 0, 0, null, 2), this._linkCSSP(b, null, p), b.setRatio = w && Nt ? Pt : St ? Ht : Dt, b.data = this._transform || _t(e, i, !0), s.pop()
				}
				if (n) {
					for (; f;) {
						for (g = f._next, p = v; p && p.pr > f.pr;) p = p._next;
						(f._prev = p ? p._prev : m) ? f._prev._next = f: v = f, (f._next = p) ? p._prev = f : m = f, f = g
					}
					this._firstPT = v
				}
				return !0
			}, f.parse = function(e, t, n, s) {
				var o, u, f, c, h, p, d, v, m, g, y = e.style;
				for (o in t) p = t[o], u = a[o], u ? n = u.parse(e, p, o, this, n, s, t) : (h = K(e, o, i) + "", m = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || m && T.test(p) ? (m || (p = ft(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = vt(y, o, h, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (f = parseFloat(h), d = f || 0 === f ? h.substr((f + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (f = nt(e, o, i), d = "px") : "left" === o || "top" === o ? (f = G(e, o, i), d = "px") : (f = "opacity" !== o ? 0 : 1, d = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), v = p.replace(w, "")) : (c = parseFloat(p), v = m ? p.replace(w, "") : ""), "" === v && (v = o in r ? r[o] : d), p = c || 0 === c ? (g ? c + f : c) + v : t[o], d !== v && "" !== v && (c || 0 === c) && f && (f = Q(e, o, f, d), "%" === v ? (f /= Q(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = f + "%")) : "em" === v ? f /= Q(e, o, 1, "em") : "px" !== v && (c = Q(e, o, c, v), v = "px"), g && (c || 0 === c) && (p = c + f + v)), g && (c += f), !f && 0 !== f || !c && 0 !== c ? void 0 !== y[o] && (p || "NaN" != p + "" && null != p) ? (n = new dt(y, o, c || f || 0, 0, n, -1, o, !1, 0, h, p), n.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : W("invalid " + o + " tween value: " + t[o]) : (n = new dt(y, o, f, c - f, n, 0, o, l !== !1 && ("px" === v || "zIndex" === o), 0, h, p), n.xs0 = v)) : n = vt(y, o, h, p, !0, null, n, 0, s)), s && n && !n.plugin && (n.plugin = s);
				return n
			}, f.setRatio = function(e) {
				var t, n, r, i = this._firstPT,
					s = 1e-6;
				if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
					if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001)
						for (; i;) {
							if (t = i.c * e + i.s, i.r ? t = Math.round(t) : s > t && t > -s && (t = 0), i.type)
								if (1 === i.type)
									if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2;
									else if (3 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
							else if (4 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
							else if (5 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
							else {
								for (n = i.xs0 + t + i.xs1, r = 1; i.l > r; r++) n += i["xn" + r] + i["xs" + (r + 1)];
								i.t[i.p] = n
							} else -1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(e);
							else i.t[i.p] = t + i.xs0;
							i = i._next
						} else
							for (; i;) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(e), i = i._next;
					else
						for (; i;) 2 !== i.type ? i.t[i.p] = i.e : i.setRatio(e), i = i._next
			}, f._enableTransforms = function(e) {
				this._transform = this._transform || _t(this._target, i, !0), this._transformType = this._transform.svg && wt || !e && 3 !== this._transformType ? 2 : 3
			};
			var qt = function() {
				this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
			};
			f._addLazySet = function(e, t, n) {
				var r = this._firstPT = new dt(e, t, 0, 0, this._firstPT, 2);
				r.e = n, r.setRatio = qt, r.data = this
			}, f._linkCSSP = function(e, t, n, r) {
				return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, r = !0), n ? n._next = e : r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = n), e
			}, f._kill = function(t) {
				var n, r, i, s = t;
				if (t.autoAlpha || t.alpha) {
					s = {};
					for (r in t) s[r] = t[r];
					s.opacity = 1, s.autoAlpha && (s.visibility = 1)
				}
				return t.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
			};
			var Rt = function(e, t, n) {
				var r, i, s, o;
				if (e.slice)
					for (i = e.length; --i > -1;) Rt(e[i], t, n);
				else
					for (r = e.childNodes, i = r.length; --i > -1;) s = r[i], o = s.type, s.style && (t.push(Y(s)), n && n.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Rt(s, t, n)
			};
			return o.cascadeTo = function(e, n, r) {
				var i, s, o, u = t.to(e, n, r),
					a = [u],
					f = [],
					l = [],
					c = [],
					h = t._internals.reservedProps;
				for (e = u._targets || u.target, Rt(e, f, c), u.render(n, !0), Rt(e, l), u.render(0, !0), u._enabled(!0), i = c.length; --i > -1;)
					if (s = Z(c[i], f[i], l[i]), s.firstMPT) {
						s = s.difs;
						for (o in r) h[o] && (s[o] = r[o]);
						a.push(t.to(c[i], n, s))
					}
				return a
			}, e.activate([o]), o
		}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(e) {
		"use strict";
		var t = function() {
			return (_gsScope.GreenSockGlobals || _gsScope)[e]
		};
		"function" == typeof define && define.amd ? define("greensock/plugins/CSSPlugin.min", ["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = t())
	}("CSSPlugin"), define("oblio/classes/MenuPaginator", ["greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function() {
		var e = function(e) {
			var t = 0,
				n = this;
			this.elements = {
				wrapper: e.wrapper,
				masker: $(e.wrapper).find(".paginatorMasker"),
				list: $(e.wrapper).find("ul"),
				prev: $('<p class="prev"></p>').appendTo(e.wrapper),
				next: $('<p class="next"></p>').appendTo(e.wrapper)
			}, this.elements.list.children("li").each(function() {
				this.style.display !== "none" && (t += $(this).outerWidth(!0) + 1)
			}), this.listWidth = t, this.elements.list[0].style.width = t + "px", $(this.elements.wrapper).on("click", ".prev, .next", function(e) {
				e.preventDefault();
				switch (this.className) {
					case "prev on":
						n.previous();
						break;
					case "next on":
						n.next();
						break;
					default:
				}
			}), this.paginated = !1, this.currentPage = 1, this.numPages = 1, this.resize()
		};
		return e.prototype = {
			paginate: function() {
				this.paginated === !1 && (this.currentPage = 1, this.elements.prev[0].className = "prev off", this.elements.next[0].className = "next on", this.paginated = !0)
			},
			unpaginate: function() {
				this.paginated === !0 && (this.currentPage = 1, this.elements.prev[0].className = "prev off", this.elements.next[0].className = "next off", this.elements.list[0].style.left = "0px", this.paginated = !1)
			},
			next: function() {
				var e, t;
				if (this.currentPage + 1 <= this.numPages) {
					this.currentPage += 1;
					if (this.currentPage === this.numPages) this.elements.next[0].className = "next off", t = this.elements.masker.width() - this.listWidth + "px", TweenLite.to(this.elements.list, 1, {
						left: t,
						ease: Power4.easeInOut
					});
					else {
						e = -(this.elements.masker.width() - this.listWidth) - this.elements.masker.width() * (this.currentPage - 1);
						if (e < 100) {
							this.next();
							return
						}
						t = -(this.elements.masker.width() * (this.currentPage - 1)) + "px", TweenLite.to(this.elements.list, 1, {
							left: t,
							ease: Power4.easeInOut
						})
					}
				}
				this.elements.prev[0].className = "prev on"
			},
			previous: function() {
				var e;
				if (this.currentPage - 1 >= 1) {
					this.currentPage -= 1;
					if (this.currentPage === 1) this.elements.prev[0].className = "prev off", TweenLite.to(this.elements.list, 1, {
						left: "0px",
						ease: Power4.easeInOut
					});
					else {
						e = -parseInt(this.elements.list[0].style.left) - this.elements.masker.width() * (this.currentPage - 1);
						if (e < 100) {
							this.previous();
							return
						}
						newleft = -(this.elements.masker.width() * (this.currentPage - 1)) + "px", TweenLite.to(this.elements.list, 1, {
							left: newleft,
							ease: Power4.easeInOut
						})
					}
				}
				this.elements.next[0].className = "next on"
			},
			resize: function() {
				var e = this.elements.masker.width(),
					t = -parseInt(this.elements.list[0].style.left) + this.elements.masker.width();
				e < this.listWidth ? (this.numPages = Math.ceil(this.listWidth / e), isNaN(t) || (this.listWidth > t ? (this.currentPage = parseInt(this.elements.list[0].style.left) === 0 ? 1 : Math.ceil(-parseInt(this.elements.list[0].style.left) / this.elements.masker.width()) + 1, this.elements.next[0].className = "next on") : (this.elements.next[0].className = "next off", this.currentPage = this.numPages, this.elements.list[0].style.left = -(this.listWidth - this.elements.masker.width()) + "px")), this.paginate()) : this.unpaginate()
			}
		}, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.MenuPaginator = e, oblio.classes.MenuPaginator
	});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		"use strict";
		_gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
			var r = function(e) {
					t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
					var n, r, i = this.vars;
					for (r in i) n = i[r], a(n) && -1 !== n.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(n));
					a(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
				},
				i = 1e-10,
				s = n._internals,
				o = r._internals = {},
				u = s.isSelector,
				a = s.isArray,
				f = s.lazyTweens,
				l = s.lazyRender,
				c = [],
				h = _gsScope._gsDefine.globals,
				p = function(e) {
					var t, n = {};
					for (t in e) n[t] = e[t];
					return n
				},
				d = o.pauseCallback = function(e, t, n, r) {
					var i = e._timeline,
						s = i._totalTime;
					!t && this._forcingPlayhead || i._rawPrevTime === e._startTime || (i.pause(e._startTime), t && t.apply(r || i, n || c), this._forcingPlayhead && i.seek(s))
				},
				v = function(e) {
					var t, n = [],
						r = e.length;
					for (t = 0; t !== r; n.push(e[t++]));
					return n
				},
				m = r.prototype = new t;
			return r.version = "1.15.1", m.constructor = r, m.kill()._gc = m._forcingPlayhead = !1, m.to = function(e, t, r, i) {
				var s = r.repeat && h.TweenMax || n;
				return t ? this.add(new s(e, t, r), i) : this.set(e, r, i)
			}, m.from = function(e, t, r, i) {
				return this.add((r.repeat && h.TweenMax || n).from(e, t, r), i)
			}, m.fromTo = function(e, t, r, i, s) {
				var o = i.repeat && h.TweenMax || n;
				return t ? this.add(o.fromTo(e, t, r, i), s) : this.set(e, i, s)
			}, m.staggerTo = function(e, t, i, s, o, a, f, l) {
				var c, h = new r({
					onComplete: a,
					onCompleteParams: f,
					onCompleteScope: l,
					smoothChildTiming: this.smoothChildTiming
				});
				for ("string" == typeof e && (e = n.selector(e) || e), e = e || [], u(e) && (e = v(e)), s = s || 0, 0 > s && (e = v(e), e.reverse(), s *= -1), c = 0; e.length > c; c++) i.startAt && (i.startAt = p(i.startAt)), h.to(e[c], t, p(i), c * s);
				return this.add(h, o)
			}, m.staggerFrom = function(e, t, n, r, i, s, o, u) {
				return n.immediateRender = 0 != n.immediateRender, n.runBackwards = !0, this.staggerTo(e, t, n, r, i, s, o, u)
			}, m.staggerFromTo = function(e, t, n, r, i, s, o, u, a) {
				return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, this.staggerTo(e, t, r, i, s, o, u, a)
			}, m.call = function(e, t, r, i) {
				return this.add(n.delayedCall(0, e, t, r), i)
			}, m.set = function(e, t, r) {
				return r = this._parseTimeOrLabel(r, 0, !0), null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused), this.add(new n(e, 0, t), r)
			}, r.exportRoot = function(e, t) {
				e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
				var i, s, o = new r(e),
					u = o._timeline;
				for (null == t && (t = !0), u._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = u._time, i = u._first; i;) s = i._next, t && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay), i = s;
				return u.add(o, 0), o
			}, m.add = function(i, s, o, u) {
				var f, l, c, h, p, d;
				if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof e)) {
					if (i instanceof Array || i && i.push && a(i)) {
						for (o = o || "normal", u = u || 0, f = s, l = i.length, c = 0; l > c; c++) a(h = i[c]) && (h = new r({
							tweens: h
						})), this.add(h, f), "string" != typeof h && "function" != typeof h && ("sequence" === o ? f = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())), f += u;
						return this._uncache(!0)
					}
					if ("string" == typeof i) return this.addLabel(i, s);
					if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
					i = n.delayedCall(0, i)
				}
				if (t.prototype.add.call(this, i, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
					for (p = this, d = p.rawTime() > i._startTime; p._timeline;) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
				return this
			}, m.remove = function(t) {
				if (t instanceof e) return this._remove(t, !1);
				if (t instanceof Array || t && t.push && a(t)) {
					for (var n = t.length; --n > -1;) this.remove(t[n]);
					return this
				}
				return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
			}, m._remove = function(e, n) {
				t.prototype._remove.call(this, e, n);
				var r = this._last;
				return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
			}, m.append = function(e, t) {
				return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
			}, m.insert = m.insertMultiple = function(e, t, n, r) {
				return this.add(e, t || 0, n, r)
			}, m.appendMultiple = function(e, t, n, r) {
				return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
			}, m.addLabel = function(e, t) {
				return this._labels[e] = this._parseTimeOrLabel(t), this
			}, m.addPause = function(e, t, r, i) {
				var s = n.delayedCall(0, d, ["{self}", t, r, i], this);
				return s.data = "isPause", this.add(s, e)
			}, m.removeLabel = function(e) {
				return delete this._labels[e], this
			}, m.getLabelTime = function(e) {
				return null != this._labels[e] ? this._labels[e] : -1
			}, m._parseTimeOrLabel = function(t, n, r, i) {
				var s;
				if (i instanceof e && i.timeline === this) this.remove(i);
				else if (i && (i instanceof Array || i.push && a(i)))
					for (s = i.length; --s > -1;) i[s] instanceof e && i[s].timeline === this && this.remove(i[s]);
				if ("string" == typeof n) return this._parseTimeOrLabel(n, r && "number" == typeof t && null == this._labels[n] ? t - this.duration() : 0, r);
				if (n = n || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
				else {
					if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
					n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
				}
				return Number(t) + n
			}, m.seek = function(e, t) {
				return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
			}, m.stop = function() {
				return this.paused(!0)
			}, m.gotoAndPlay = function(e, t) {
				return this.play(e, t)
			}, m.gotoAndStop = function(e, t) {
				return this.pause(e, t)
			}, m.render = function(e, t, n) {
				this._gc && this._enabled(!0, !1);
				var r, s, o, u, a, h = this._dirty ? this.totalDuration() : this._totalDuration,
					p = this._time,
					d = this._startTime,
					v = this._timeScale,
					m = this._paused;
				if (e >= h ? (this._totalTime = this._time = h, this._reversed || this._hasPausedChild() || (s = !0, u = "onComplete", 0 === this._duration && (0 === e || 0 > this._rawPrevTime || this._rawPrevTime === i) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > i && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = h + 1e-4) : 1e-7 > e ? (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== i && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (u = "onReverseComplete", s = this._reversed), 0 > e ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (a = !0), this._rawPrevTime = e) : (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = 0, this._initted || (a = !0))) : this._totalTime = this._time = this._rawPrevTime = e, this._time !== p && this._first || n || a) {
					if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && e > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._time && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || c)), this._time >= p)
						for (r = this._first; r && (o = r._next, !this._paused || m);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
					else
						for (r = this._last; r && (o = r._prev, !this._paused || m);)(r._active || p >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
					this._onUpdate && (t || (f.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c))), u && (this._gc || (d === this._startTime || v !== this._timeScale) && (0 === this._time || h >= this.totalDuration()) && (s && (f.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[u] && this.vars[u].apply(this.vars[u + "Scope"] || this, this.vars[u + "Params"] || c)))
				}
			}, m._hasPausedChild = function() {
				for (var e = this._first; e;) {
					if (e._paused || e instanceof r && e._hasPausedChild()) return !0;
					e = e._next
				}
				return !1
			}, m.getChildren = function(e, t, r, i) {
				i = i || -9999999999;
				for (var s = [], o = this._first, u = 0; o;) i > o._startTime || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))), o = o._next;
				return s
			}, m.getTweensOf = function(e, t) {
				var r, i, s = this._gc,
					o = [],
					u = 0;
				for (s && this._enabled(!0, !0), r = n.getTweensOf(e), i = r.length; --i > -1;)(r[i].timeline === this || t && this._contains(r[i])) && (o[u++] = r[i]);
				return s && this._enabled(!1, !0), o
			}, m.recent = function() {
				return this._recent
			}, m._contains = function(e) {
				for (var t = e.timeline; t;) {
					if (t === this) return !0;
					t = t.timeline
				}
				return !1
			}, m.shiftChildren = function(e, t, n) {
				n = n || 0;
				for (var r, i = this._first, s = this._labels; i;) i._startTime >= n && (i._startTime += e), i = i._next;
				if (t)
					for (r in s) s[r] >= n && (s[r] += e);
				return this._uncache(!0)
			}, m._kill = function(e, t) {
				if (!e && !t) return this._enabled(!1, !1);
				for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = n.length, i = !1; --r > -1;) n[r]._kill(e, t) && (i = !0);
				return i
			}, m.clear = function(e) {
				var t = this.getChildren(!1, !0, !0),
					n = t.length;
				for (this._time = this._totalTime = 0; --n > -1;) t[n]._enabled(!1, !1);
				return e !== !1 && (this._labels = {}), this._uncache(!0)
			}, m.invalidate = function() {
				for (var t = this._first; t;) t.invalidate(), t = t._next;
				return e.prototype.invalidate.call(this)
			}, m._enabled = function(e, n) {
				if (e === this._gc)
					for (var r = this._first; r;) r._enabled(e, !0), r = r._next;
				return t.prototype._enabled.call(this, e, n)
			}, m.totalTime = function() {
				this._forcingPlayhead = !0;
				var t = e.prototype.totalTime.apply(this, arguments);
				return this._forcingPlayhead = !1, t
			}, m.duration = function(e) {
				return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
			}, m.totalDuration = function(e) {
				if (!arguments.length) {
					if (this._dirty) {
						for (var t, n, r = 0, i = this._last, s = 999999999999; i;) t = i._prev, i._dirty && i.totalDuration(), i._startTime > s && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : s = i._startTime, 0 > i._startTime && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), s = 0), n = i._startTime + i._totalDuration / i._timeScale, n > r && (r = n), i = t;
						this._duration = this._totalDuration = r, this._dirty = !1
					}
					return this._totalDuration
				}
				return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
			}, m.usesFrames = function() {
				for (var t = this._timeline; t._timeline;) t = t._timeline;
				return t === e._rootFramesTimeline
			}, m.rawTime = function() {
				return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
			}, r
		}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(e) {
		"use strict";
		var t = function() {
			return (_gsScope.GreenSockGlobals || _gsScope)[e]
		};
		"function" == typeof define && define.amd ? define("greensock/TimelineLite.min", ["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = t())
	}("TimelineLite"), define("oblio/classes/Menu", ["mustache", "oblio/utils/DeviceDetect", "oblio/classes/MenuPaginator", "greensock/TweenLite.min", "greensock/TimelineLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function(e) {
		"use strict";

		function i(e) {
			this.verbose && console.log("Main Menu | " + this.menuID + " | init"), this.isHidden = !1, this.elements.listItems = this.elements.el.getElementsByTagName("li"), this.elements.selected = $('#menu a[data-section="' + e + '"]').addClass("selected"), this.selectMenuItem(this.elements.selected.data("section"), !1), this.hide(!0), this.resize()
		}

		function s() {
			this.verbose && console.log("Main Menu | " + this.menuID + " | buildMenu");
			switch (this.menuStyle) {
				case "vertical":
					o.call(this, this.menuList);
					break;
				case "horizontal":
					this.menuStyle = "horizontal", u.call(this, this.menuList);
					break;
				default:
					o.call(this, this.menuList)
			}
		}

		function o(t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				if (String(r.visible).toLowerCase() == "false" || r.comingSoon == "true") continue;
				var i = {},
					s = !1;
				r.className = "mainMenuBtn", r.type === "external" ? r.target = "_blank" : r.type === "popup" && (s = !0, r.rel = r.link + "," + r.dimensions[0] + "," + r.dimensions[1]);
				for (var o = 0; o < oblio.app.dataSrc.sections.main.html.length; o++) oblio.app.dataSrc.sections.main.html[o].ID === r.label && (r.label = oblio.app.dataSrc.sections.main.html[o].VAL);
				var u = $(e.render(this.template, r));
				s && u.click(this.openPopUp);
				var a = document.createElement("li");
				a.appendChild(u.get()[0]), this.elements.el.appendChild(a)
			}
		}

		function u(e) {
			this.elements.wrapper.className = "horizontal paginatorWrapper " + this.elements.wrapper.className, this.elements.el.className = "centeredMenu", this.elements.paginatorEl.className = "paginatorMasker";
			var t = !0;
			for (var n = 0; n < e.length; n++) {
				if (e[n].visible === !1) continue;
				!t || (t = !1);
				var r = document.createElement("li"),
					i = document.createElement("a");
				i.innerHTML = e[n].label, i.setAttribute("data-type", e[n].type), e[n].type === "external" && i.setAttribute("target", "_blank"), i.setAttribute("data-section", e[n].link), i.setAttribute("href", e[n].link), i.style.fontSize = e[n]["font-size"], e[n].type === "external" ? i.target = "_blank" : e[n].type === "popup" && (i.rel = e[n].link + "," + e[n].dimensions[0] + "," + e[n].dimensions[1], $(i).click(this.openPopUp)), r.appendChild(i), this.elements.el.appendChild(r)
			}
			var s = this;
			window.setTimeout(function() {
				s.menuPaginator = new oblio.classes.MenuPaginator({
					wrapper: s.elements.wrapper
				})
			}, 50)
		}

		function a(e, n) {
			this.verbose && console.log("Main Menu | " + this.menuID + " | selectMenuItem: " + e);
			var r = $(this.elements.el).find('a[data-section="' + e + '"]');
			if (r.length === 0) return;
			this.elements.selected[0] && (this.elements.selected[0].className = ""), n = !0, t, this.elements.selectedID = e, this.elements.selected = r, this.elements.selected[0].className = "selected"
		}

		function f(e) {
			this.verbose && console.log("Main Menu | " + this.menuID + " | hide");
			if (this.isHidden === !0) return;
			var t = .5;
			e && (t = 0), this.isHidden = !0;
			switch (this.menuStyle) {
				case "horizontal":
					TweenLite.to(this.elements.wrapper, t, {
						y: -this.elements.wrapper.offsetHeight + "px",
						ease: Power4.easeInOut
					});
					break;
				case "vertical":
					TweenLite.to(this.elements.wrapper, t, {
						x: -this.elements.wrapper.offsetWidth + "px",
						ease: Power4.easeInOut
					});
					break;
				default:
					console.log("invalid menustyle")
			}
		}

		function l(e) {
			e.preventDefault();
			var t = String(e.target.rel).split(",");
			return window.open(t[0], "_blank", "width=" + t[1] + ", height=" + t[2]), !1
		}

		function c(e) {
			this.verbose && console.log("Main Menu | " + this.menuID + " | show");
			if (this.isHidden === !1) return;
			var t = .5;
			e && (t = 0), this.isHidden = !1, document.getElementById("mainHeader").style.visibility = "visible";
			switch (this.menuStyle) {
				case "horizontal":
					TweenLite.to(this.elements.wrapper, t, {
						y: "0px",
						ease: Power4.easeInOut
					});
					break;
				case "vertical":
					TweenLite.to(this.elements.wrapper, t, {
						x: "0px",
						ease: Power4.easeInOut
					});
					break;
				default:
					console.log("invalid menustyle")
			}
		}

		function h() {
			this.menuPaginator && this.menuPaginator.resize(oblio.settings.windowDimensions.width, oblio.settings.windowDimensions.height);
			if (this.elements === undefined) return
		}
		var t = oblio.utils.DeviceDetect.isMobile,
			n, r = function(e) {
				this.menuID = e.menuID || "", this.verbose = !1, n = this, this.template = e.template ? e.template : '<a rel="{{{rel}}}" class="{{{className}}}" data-type="{{{type}}}" data-section="{{{link}}}" href="{{{link}}}" target="{{{target}}}" style="position: {{{position}}}; font-size: {{{font-size}}};">{{{label}}}</a>', this.elements = {
					el: document.getElementById(e.menuID),
					wrapper: document.getElementById(e.wrapperID),
					paginatorEl: document.getElementById(e.paginatorElID)
				}, this.menuList = e.menuList, this.menuStyle = e.menuStyle, e.menuList && this.buildMenu()
			};
		return r.prototype.init = i, r.prototype.openPopUp = l, r.prototype.hide = f, r.prototype.show = c, r.prototype.buildMenu = s, r.prototype.resize = h, r.prototype.selectMenuItem = a, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.Menu = r, oblio.classes.Menu
	}), define("oblio/classes/EventHandlers", ["oblio/utils/DeviceDetect", "oblio/classes/Menu", "greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function() {
		"use strict";

		function t(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].mousemoveHandler && oblio.sections[oblio.app.navigation.current_section].mousemoveHandler(e)
		}

		function n(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].mousewheelHandler && oblio.sections[oblio.app.navigation.current_section].mousewheelHandler(e)
		}

		function r(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].scrollHandler && oblio.sections[oblio.app.navigation.current_section].scrollHandler(e)
		}

		function i(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].keyHandler && oblio.sections[oblio.app.navigation.current_section].keyHandler(e)
		}

		function s(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].touchStartHandler && oblio.sections[oblio.app.navigation.current_section].touchStartHandler(e)
		}

		function o(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].touchMoveHandler && oblio.sections[oblio.app.navigation.current_section].touchMoveHandler(e)
		}

		function u(e) {
			oblio.sections[oblio.app.navigation.current_section] && oblio.sections[oblio.app.navigation.current_section].touchEndHandler && oblio.sections[oblio.app.navigation.current_section].touchEndHandler(e)
		}
		var e = function(e) {};
		return e.prototype.init = function(e) {
			var a = $(window),
				f = $(document);
			f.on("keydown", i), a.on("scroll", r), window.addWheelListener(document, n), Modernizr.touch ? (f.on("touchstart", s), f.on("touchmove", o), f.on("touchend", u)) : a.on("mousemove", t)
		}, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.EventHandlers = new e, oblio.classes.EventHandlers
	}), define("oblio/classes/Navigation", ["oblio/utils/SectionLoader", "oblio/utils/ArrayExecuter", "oblio/classes/Menu"], function() {
		"use strict";

		function t() {
			var e = document.getElementsByTagName("base")[0],
				t, n;
			if (e) t = e.href.split("/"), t.pop(), oblio.settings.basePath = t.join("/") + "/", n = window.location.href.replace(oblio.settings.basePath, "").split("/"), this.currentSection = n[0] !== "" ? n[0] : "home", this.currentSubsection = n[1];
			else {
				var r = window.location.hash;
				r.match("#/") ? (n = r.replace("#/", "").split("/"), this.currentSection = n.length > 0 ? n[0] : "home", this.currentSubsection = n[1]) : this.currentSection = "home"
			}
		}

		function n(e, t, n, r) {
			this.verbose && console.log("Navigation | changeSection: " + e + " | " + t);
			if (!this.active) {
				r && this.arrayExecuter.tackOn([{
					fn: this.changeSection,
					scope: this,
					vars: [e, t, null, !0]
				}]);
				return
			}
			if (this.currentSection === e && !this.forceChange) {
				t && oblio.sections[e].enterSubSection && oblio.sections[e].enterSubSection(t);
				return
			}
			oblio.app.mainMenu && oblio.app.mainMenu.selectMenuItem(e), this.currentSection !== e && (this.previous_section = this.currentSection), this.currentSection = e, this.currentSubsection = t || "";
			if (!r && oblio.settings.deepLinking !== !1 && window.history && window.history.pushState && this.previous_section !== "") {
				var i = {
						currentSection: this.currentSection,
						currentSubsection: this.currentSubsection
					},
					s = document.getElementsByTagName("base")[0];
				if (s) {
					var o = s.href.split("/");
					o.pop(), oblio.settings.basePath = o.join("/") + "/", window.innerHeight !== screen.height && history.pushState(i, "", this.currentSection == "home" ? oblio.settings.basePath : oblio.settings.basePath + this.currentSection + "/" + this.currentSubsection)
				} else window.innerHeight !== screen.height && history.pushState(i, "", this.currentSection == "home" ? oblio.settings.basePath : oblio.settings.basePath + "#/" + this.currentSection + "/" + this.currentSubsection)
			}
			this.loadQueue(e), this.arrayExecuter.execute(this.assembleChangeFunction(n)), this.forceChange = !1
		}

		function r(e) {
			this.changeSection(e.state.currentSection, e.state.currentSubSection, null, !0)
		}

		function i(e) {
			var t = [{
				fn: this.disable,
				vars: [this.stepComplete]
			}];
			for (var n = 0; n < this.changeOrder.length; n++) switch (this.changeOrder[n]) {
				case "load":
					t.push({
						fn: this.load,
						vars: [this.stepComplete]
					});
					break;
				case "section_add_next":
					t.push({
						fn: this.section_add,
						vars: [this.currentSection, this.stepComplete]
					});
					break;
				case "section_init_next":
					t.push({
						fn: this.section_init,
						vars: [this.currentSection, this.stepComplete]
					});
					break;
				case "section_startup_next":
					t.push({
						fn: this.section_startup,
						vars: [this.currentSection, this.stepComplete]
					});
					break;
				case "section_show_next":
					t.push({
						fn: this.section_show,
						vars: [this.currentSection, this.stepComplete]
					});
					break;
				case "section_hide_prev":
					t.push({
						fn: this.section_hide,
						vars: [this.previous_section, this.stepComplete]
					});
					break;
				case "section_shutdown_prev":
					t.push({
						fn: this.section_shutdown,
						vars: [this.previous_section, this.stepComplete]
					});
					break;
				case "section_remove_prev":
					t.push({
						fn: this.section_remove,
						vars: [this.previous_section, this.stepComplete]
					});
					break;
				default:
					typeof this.changeOrder[n] == "function" ? t.push({
						fn: this.changeOrder[n],
						vars: [this.currentSection, this.previous_section, this.stepComplete]
					}) : console.log("assembleChangeFunction cannot add: " + this.changeOrder[n])
			}
			return t.push({
				fn: this.enable,
				vars: [this.stepComplete]
			}), e && t.push({
				fn: e,
				vars: null
			}), t
		}

		function s(e) {
			var t = Array.prototype.slice.call(arguments);
			for (var n = 0; n < t.length; n++) this.verbose && console.log("Navigation | loadQueue: " + t[n]), oblio.utils.SectionLoader.sectionExists(t[n]) && this.loadlist.push(t[n]), oblio.sections[t[n]] && this.section_prepareLoad(t[n])
		}

		function o(e, t) {
			this.verbose && console.log("Navigation | load");
			var n = Array.prototype.slice.call(arguments);
			n.shift(), n.length && this.loadQueue(n);
			for (var r = 0; r < n.length; r++) oblio.sections[sectionID].prepare && oblio.sections[sectionID].prepare();
			this.loadlist.push(this.stepComplete);
			var i = [{
				fn: oblio.utils.SectionLoader.loadSection,
				scope: oblio.utils.SectionLoader,
				vars: this.loadlist
			}, {
				fn: this.load_done,
				vars: null
			}, {
				fn: e,
				vars: null
			}];
			this.arrayExecuter.execute(i)
		}

		function u() {
			this.verbose && console.log("Navigation | load_done"), this.loadlist = [], this.stepComplete()
		}

		function a(e) {
			this.verbose && console.log("Navigation | section_prepareLoad: " + e), oblio.sections[e].prepare && console.log("section " + e + " has prepare function"), oblio.sections[e].prepared || (oblio.sections[e].prepareLoad && oblio.sections[e].prepareLoad(), oblio.sections[e].prepared = !0)
		}

		function f(e, t) {
			this.verbose && console.log("Navigation | section_add: " + e);
			var n = oblio.sections[e] && oblio.sections[e].shell ? oblio.sections[e].shell : "#" + this.shell;
			oblio.sections[e] && !oblio.sections[e].added && (oblio.sections[e].added = !0, oblio.sections[e].htmlElem = $(oblio.utils.SectionLoader.returnSectionOBJ(e).htmlData), $(n).append(oblio.sections[e].htmlElem)), t()
		}

		function l(e, t) {
			this.verbose && console.log("Navigation | section_init: " + e);
			if (!oblio.sections[e].initialized) {
				oblio.sections[e].initialized = !0;
				if (oblio.sections[e].init) {
					oblio.sections[e].init(t);
					return
				}
			}
			t()
		}

		function c(e, t) {
			this.verbose && console.log("Navigation | section_startup: " + e);
			if (oblio.sections[e])
				if (oblio.sections[e].startup) oblio.sections[e].startup(t);
				else {
					var n = document.getElementById(e);
					n && (n.style.display = "block"), t()
				} else t()
		}

		function h(e, t) {
			this.verbose && console.log("Navigation | section_show: " + e), oblio.sections[e] && oblio.sections[e].show ? oblio.sections[e].show(t) : t()
		}

		function p(e, t) {
			this.verbose && console.log("Navigation | section_hide " + e);
			if (oblio.sections[e])
				if (oblio.sections[e].hide) oblio.sections[e].hide(t);
				else {
					var n = document.getElementById(e);
					n && (n.style.display = "none"), t()
				} else t()
		}

		function d(e, t) {
			this.verbose && console.log("Navigation | section_shutdown: " + e), oblio.sections[e] && oblio.sections[e].shutdown ? oblio.sections[e].shutdown(t) : t()
		}

		function v(e, t) {
			this.verbose && console.log("Navigation | section_remove " + e);
			if (!oblio.sections[e]) {
				t();
				return
			}
			var n = oblio.sections[e] && oblio.sections[e].shell ? oblio.sections[e].shell : "#" + this.shell;
			oblio.sections[e].destroy && (oblio.sections[e].destroy(), oblio.sections[e].initialized = !1), oblio.sections[e].added && (oblio.sections[e].added = !1, $(oblio.sections[e].htmlElem).remove(), oblio.sections[e].htmlElem = null), t()
		}

		function m(e) {
			this.verbose && console.log("/////// navigation_enable /////////"), this.active = !0, this.cover && (this.cover.style.display = "none"), e && e()
		}

		function g(e) {
			this.verbose && console.log("/////// navigation_disable /////////"), this.active = !1, this.cover && (this.cover.style.display = "block"), e && e()
		}

		function y() {
			this.verbose && console.log("navigation_freezeSite"), oblio.sections[sectionID].freeze && oblio.sections[sectionID].freeze()
		}

		function b() {
			this.verbose && console.log("navigation_unFreezeSite"), oblio.sections[sectionID].unfreeze && oblio.sections[sectionID].unfreeze()
		}

		function w() {
			this.verbose && console.log("navigation_unFreezeSiteDone")
		}
		var e = function(e) {
			this.shell = e || "shell", this.verbose = !1, this.currentSection = "", this.previous_section = "", this.forceChange = !1, this.loadlist = [], this.arrayExecuter = new oblio.utils.ArrayExecuter(this, "navigation"), this.stepComplete = this.arrayExecuter.stepComplete.bind(this.arrayExecuter), this.active = !0, this.changeOrder = ["load", "section_add_next", "section_init_next", "section_hide_prev", "section_shutdown_prev", "section_startup_next", "section_show_next"], window.onpopstate = r.bind(this)
		};
		return e.prototype.parseDeepLink = t, e.prototype.changeSection = n, e.prototype.assembleChangeFunction = i, e.prototype.loadQueue = s, e.prototype.load = o, e.prototype.load_done = u, e.prototype.section_prepareLoad = a, e.prototype.section_add = f, e.prototype.section_init = l, e.prototype.section_startup = c, e.prototype.section_show = h, e.prototype.section_hide = p, e.prototype.section_shutdown = d, e.prototype.section_remove = v, e.prototype.enable = m, e.prototype.disable = g, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.Navigation = e, oblio.classes.Navigation
	}), define("oblio/classes/DefaultLoader", [], function() {
		function n() {
			var e = document.createElement("div");
			return e.id = "default_loader", e.style.position = "absolute", e.style.zIndex = 200, e.style.width = "100%", e.style.height = "4px", e
		}

		function r() {
			var e = document.createElement("div");
			return e.id = "loader_bar", e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", e.style.height = "100%", e.style.width = "0%", e.style.background = "#FF0000", e
		}

		function i() {}
		var e = "DefaultLoader",
			t = function() {
				this.id = "DefaultLoader", this.elem = n(), $("body").append($(this.elem)), this.progressBar = r(), this.elem.appendChild(this.progressBar), this.elem.style.display = "block", this.elem.style.visibility = "hidden"
			};
		return t.prototype.resize = i, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.DefaultLoader = t, oblio.classes.DefaultLoader
	}), define("app/ReadoutLine", [], function() {
		"use strict";

		function t(e, t) {
			var r = 0,
				i;
			this.noCursor = t, window.requestAnimationFrame(function() {
				try {
					n.call(this, r, i, e)
				} catch (t) {
					e && e(), console.log(t)
				}
			}.bind(this))
		}

		function n(e, t, r) {
			if (e >= this.spans.length) r && r();
			else {
				this.d = (this.d + 1) % this.delay * .1;
				if (this.d !== 0) {
					window.requestAnimationFrame(function() {
						n.call(this, e, t, r)
					}.bind(this));
					return
				}
				e > 0 && (this.spans[e - 1].className = "on"), t = this.spans[e], this.noCursor ? t.className = "on" : t.className = "cursor", e++, window.requestAnimationFrame(function() {
					n.call(this, e, t, r)
				}.bind(this))
			}
		}

		function r() {
			try {
				for (var e = this.spans.length - 1; e >= 0; e--) this.spans[e].className = ""
			} catch (t) {}
		}

		function i(e) {
			return "<span>" + e.split("").join("</span><span>") + "</span>"
		}
		var e = function(e, t, n) {
			this.el = e, e.innerHTML = i(e.textContent), e.className = e.className + " readoutLine", window.requestAnimationFrame(function() {
				this.spans = e.getElementsByTagName("span"), this.d = 0, this.delay = Number(n) && Number(n) > 0 ? Number(n) : 1, t && t()
			}.bind(this))
		};
		return e.prototype.iter = n, e.prototype.spanify = i, e.prototype.draw = t, e.prototype.reset = r, e
	}), define("app/ReadoutWidget", ["app/ReadoutLine"], function(e) {
		"use strict";

		function n(e) {
			var t = "";
			for (var n = e.length - 1; n >= 0; n--) t += '<li class="readoutLine">' + e[n] + "</li>";
			this.elements.list.innerHTML = t, window.requestAnimationFrame(function() {
				this.lines = [], this.elements.list_items = this.elements.list.getElementsByTagName("li"), s.call(this), this.activeLines = []
			}.bind(this))
		}

		function r() {
			this.elements.wrapper.style.visibility = "visible", window.requestAnimationFrame(function() {
				o.call(this)
			}.bind(this))
		}

		function i() {}

		function s() {
			var t;
			for (var n = 0; n < this.elements.list_items.length; n++) t = new e(this.elements.list_items[n]), this.elements.list_items[n].readoutLine = t
		}

		function o() {
			var e = this.activeLines[this.activeLines.length - 1],
				t, n;
			e ? this.activeLines.push(e.nextElementSibling) : this.activeLines.push(this.elements.list_items[0]), this.activeLines.length > 4 && (t = this.activeLines.shift(), t.readoutLine.reset(), this.elements.list.appendChild(t)), this.activeLines[this.activeLines.length - 1].readoutLine.draw(function() {}.bind(this), !0)
		}
		var t = function(e, t) {
			this.elements = {
				wrapper: e,
				list: e.getElementsByTagName("ul")[0]
			}, this.lines = [], this.elements.list_items = this.elements.list.getElementsByTagName("li"), this.iterator = 0, s.call(this), t(), this.activeLines = []
		};
		return t.prototype.show = r, t.prototype.hide = i, t.prototype.nextLine = o, t
	}), define("app/DefaultLoader", ["app/ReadoutWidget"], function(e) {
		function r() {
			var e = document.createElement("div");
			return e.id = "default_loader", e.style.position = "absolute", e.style.width = "100%", e.style.height = "100%", e
		}

		function i(e) {
			this.progressBar.style.width = "0px", this.progressBar.style.display = "block", this.elem.style.display = "block", TweenLite.to(this.elem, 1, {
				autoAlpha: 1,
				onComplete: function() {
					e.call(this)
				}.bind(this)
			})
		}

		function s(e) {
			this.progressBar.style.width = e * 220 + "px", this.linesArray.length > 0 && e > this.linesArray[0] && (this.readoutWidget.nextLine(), this.linesArray.shift())
		}

		function o(e) {
			window.setTimeout(function() {
				u(function() {
					this.elem.style.display = "none", this.elem.innerHTML = "", e()
				}.bind(this))
			}.bind(this), 800)
		}

		function u(e) {
			var t = document.getElementById("readoutWidget"),
				n = document.getElementById("loader_bar"),
				r = document.getElementById("textContainer"),
				i = document.getElementById("loaderBox");
			tl = new TimelineLite, tl.add(TweenLite.to(r, .45, {
				x: "10px",
				alpha: 0,
				ease: Power4.easeOut
			}), .1), tl.add(TweenLite.to(t, .45, {
				height: "0",
				x: "10px",
				alpha: 0,
				ease: Power4.easeOut
			}), .1), tl.add(TweenLite.to(this.leftDecoration, .45, {
				x: "109px",
				ease: Power4.easeOut
			}), .1), tl.add(TweenLite.to(this.rightDecoration, .45, {
				x: "-109px",
				ease: Power4.easeOut
			}), .1), tl.add(TweenLite.to(n, .4, {
				x: "109px",
				width: 1,
				ease: Power4.easeOut
			}), .2), tl.add(TweenLite.to(i, .3, {
				scaleY: 4,
				opacity: 0,
				y: "-100px",
				ease: Power4.easeOut,
				onComplete: function() {
					e()
				}
			}), .55), tl.play()
		}

		function a() {
			var e = window.innerWidth,
				t = window.innerHeight
		}
		var t = "DefaultLoader",
			n = function() {
				this.id = "DefaultLoader", this.template = '<div id="loaderBox"><div id="textContainer">ASSET LOAD DETAIL \\\\</div><div id="widgetWrapper"><div id="leftDecoration" class="preload-decoration"></div><div id="rightDecoration" class="preload-decoration"></div><div id="readoutWidget" class="readoutWidget"><ul><li class="readoutLine readoutLine">INITIALIZING LOAD</li><li class="readoutLine readoutLine">ASSETS POOLED</li><li class="readoutLine readoutLine">MAPS LOAD COMPLETE</li><li class="readoutLine readoutLine">PODS LOAD COMPLETE</li><li class="readoutLine readoutLine">GRID CREATION COMPLETE</li><li class="readoutLine readoutLine">CELL ALIGNMENT COMPLETE</li><li class="readoutLine readoutLine">LOAD DONE</li></ul></div></div><div id="loader_bar" style="position: relative; top: 0px; left: 0px; height: 5px; width: 220px; display: block; background: rgb(174, 174, 174);"></div></div>', this.elem = r(), this.elem.innerHTML = this.template, $("body").append($(this.elem)), this.progressBar = document.getElementById("loader_bar"), this.leftDecoration = document.getElementById("leftDecoration"), this.rightDecoration = document.getElementById("rightDecoration"), this.linesArray = [.15, .35, .5, .75, .9, .99], this.readout = document.getElementById("readoutWidget"), this.readoutWidget = new e(this.readout, function() {}.bind(this)), window.requestAnimationFrame(this.readoutWidget.show.bind(this.readoutWidget)), this.elem.style.display = "block", this.elem.style.visibility = "hidden"
			};
		return n.prototype.resize = a, n.prototype.bringIn = i, n.prototype.updateBar = s, n.prototype.goOut = o, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.DefaultLoader = n, oblio.classes.DefaultLoader
	}), oblio = oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.inherit = function() {
		var e = function() {};
		return function(t, n) {
			e.prototype = n.prototype, t.prototype = new e, t.prototype._super = n, t.prototype.constructor = t
		}
	}(), define("oblio/utils/Inherit", function() {}), define("app/Menu", ["oblio/classes/Menu", "oblio/utils/Inherit"], function() {
		"use strict";
		var e, t = oblio.utils.DeviceDetect.isMobile,
			n, r, i = function(t) {
				console.log("main menu"), e = this, this.elements = {
					el: document.getElementById(t.menuID),
					wrapper: document.getElementById(t.wrapperID),
					paginatorEl: document.getElementById(t.paginatorElID)
				}, this.elements.listItems = this.elements.el.getElementsByTagName("li"), this.menuList = t.menuList, this.menuStyle = t.menuStyle, t.menuList && this.buildMenu()
			};
		return oblio.utils.inherit(i, oblio.classes.Menu), window.oblio = window.oblio || {}, oblio.app = oblio.app || {}, oblio.app.Menu = i, oblio.app.Menu
	}), define("app/Footer", ["oblio/utils/Inherit"], function() {
		"use strict";
		var e = function() {};
		return e.prototype.init = function() {}, e.prototype.show = function() {}, e.prototype.hide = function() {}, e.prototype.resize = function() {}, window.oblio = window.oblio || {}, oblio.app = oblio.app || {}, oblio.app.Footer = new e, oblio.app.Footer
	}), define("oblio/classes/Shell", ["oblio/utils/DeviceDetect", "oblio/classes/Menu", "greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function() {
		"use strict";

		function t(e) {
			console.log("Shell Init");
			var t = oblio.utils.SectionLoader.returnSectionOBJ("main");
			$("#shell").append($(t.htmlData)), window.requestAnimationFrame(function() {
				this.ready(e)
			}.bind(this))
		}

		function n(e) {
			console.log("Shell ready"), this.initialized = !0, oblio.app.Footer.init(document.getElementById("footer")), oblio.app.navigation.currentSection !== "videos" && oblio.app.Footer.show(), this.setupMenu(), this.resize(), e()
		}

		function r() {
			var e = {
					menuID: "menu",
					wrapperID: "mainHeader",
					paginatorElID: "mainNav",
					menuStyle: oblio.app.dataSrc.sections.main.data.menu.menuStyle,
					menuList: oblio.app.dataSrc.sections.main.data.menu.links
				},
				t = document.getElementById("menuTemplate");
			t && (e.template = t.innerHTML), oblio.app.mainMenu = new oblio.classes.Menu(e), oblio.app.mainMenu.init(oblio.app.navigation.currentSection), $("#menu").on("click", "a", function(e) {
				if (this.getAttribute("target") === "_blank") return;
				var t = $(this).data("section");
				return this.getAttribute("data-type") === "overlay" ? oblio.functions.showOverlay(t) : oblio.app.navigation.changeSection(t), !1
			})
		}

		function i() {
			if (!this.initialized) return;
			var e, t;
			oblio.settings.windowDimensions = {
				width: this.elements.window.width(),
				height: this.elements.window.height()
			}, e = Math.max(oblio.settings.minWidth, oblio.settings.windowDimensions.width), t = Math.max(oblio.settings.minHeight, oblio.settings.windowDimensions.height), this.elements.shell[0].style.width = e + "px", document.documentElement.className.match(/^(?=.*\bipad\b)(?=.*\bios7\b)/) || (this.elements.shell[0].style.height = t + "px"), oblio.app.mainMenu && oblio.app.mainMenu.elements && (oblio.settings.menuWidth = oblio.app.mainMenu.elements.el.offsetWidth);
			if (oblio.settings.isAndroid || oblio.settings.isMobile || oblio.settings.isIOS) {
				var n = e > t ? !0 : !1,
					r = document.getElementById("portraitTest");
				r && (n ? (r.style.display = "none", oblio.settings.isIpad && (t = oblio.settings.windowDimensions.height = 672)) : r.style.display = "block"), e != 1e3 && (t *= 1e3 / e, e = 1e3)
			}
			oblio.settings.sectionWidth = e, oblio.app.BGRenderer && oblio.app.BGRenderer.resize(), oblio.sections[oblio.app.navigation.currentSection] && oblio.sections[oblio.app.navigation.currentSection].initialized && oblio.sections[oblio.app.navigation.currentSection].resize(e, t), oblio.app.mainMenu && (oblio.settings.menuWidth = oblio.app.mainMenu.resize()), oblio.app.Footer && oblio.app.Footer.resize(), oblio.settings.windowDimensions.width < oblio.settings.minWidth || oblio.settings.windowDimensions.height < oblio.settings.minHeight ? this.elements.shell[0].style.position = "absolute" : this.elements.shell[0].style.position = "fixed"
		}
		var e = function(e) {
			this.elements = {
				shell: $("#shell"),
				window: $(window)
			}
		};
		return e.prototype.init = t, e.prototype.ready = n, e.prototype.setupMenu = r, e.prototype.resize = i, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.Shell = e, oblio.classes.Shell
	}), define("app/Shell", ["oblio/classes/Shell", "oblio/utils/Inherit", "oblio/utils/DeviceDetect"], function() {
		"use strict";

		function t() {
			if (!this.initialized) return;
			var e, t;
			oblio.settings.windowDimensions = {
				width: this.elements.window.width(),
				height: this.elements.window.height()
			}, e = Math.max(oblio.settings.minWidth, oblio.settings.windowDimensions.width), t = Math.max(oblio.settings.minHeight, oblio.settings.windowDimensions.height), this.elements.shell[0].style.width = e + "px", document.documentElement.className.match(/^(?=.*\bipad\b)(?=.*\bios7\b)/) || (this.elements.shell[0].style.height = t + "px"), oblio.app.mainMenu && oblio.app.mainMenu.elements && (oblio.settings.menuWidth = oblio.app.mainMenu.elements.el.offsetWidth);
			if (oblio.settings.isAndroid || oblio.settings.isMobile || oblio.settings.isIOS) {
				var n = e > t ? !0 : !1,
					r = document.getElementById("portraitTest");
				r && (n ? (r.style.display = "none", oblio.settings.isIpad && (t = oblio.settings.windowDimensions.height = 672)) : r.style.display = "block"), e != 1e3 && (t *= 1e3 / e, e = 1e3)
			}
			oblio.settings.sectionWidth = e, oblio.app.BGRenderer && oblio.app.BGRenderer.resize(), oblio.sections[oblio.app.navigation.currentSection] && oblio.sections[oblio.app.navigation.currentSection].initialized && oblio.sections[oblio.app.navigation.currentSection].resize(e, t), oblio.app.mainMenu && (oblio.settings.menuWidth = oblio.app.mainMenu.resize()), oblio.app.Footer && oblio.app.Footer.resize(), this.elements.shell[0].style.position = "absolute"
		}
		var e = function(e) {
			this._super()
		};
		return oblio.utils.inherit(e, oblio.classes.Shell), e.prototype.resize = t, window.oblio = window.oblio || {}, oblio.app = oblio.app || {}, oblio.app.Shell = new e, oblio.app.Shell
	}), define("oblio/classes/Backplate", [], function() {
		function t(e) {
			if (e.img === !1) return;
			this.obj && this.obj.destroy(), this.obj = e, this.elements.backplate = e.el, this.settings = {
				h: e.h,
				v: e.v,
				ratio: this._getRatio(),
				mode: "cover"
			};
			var t = this.elements.inner;
			while (t.lastChild) t.removeChild(t.lastChild);
			this.elements.backplate = e.el, this.elements.inner.appendChild(this.elements.backplate), this.onScreen = !0, this.loaded || $(this.elements.backplate).addClass("loading").on("load", this._onImageLoaded.bind(this))
		}

		function n() {
			if (!this.elements.backplate) return 1;
			var e = this.elements.backplate.height / this.elements.backplate.width;
			return e
		}

		function r(e) {
			this.resize(), window.setTimeout(this.resize.bind(this), 100), this.onScreen && !this.loaded && TweenLite.fromTo(this.elements.backplate, .5, {
				alpha: 0
			}, {
				alpha: 1
			})
		}

		function i(e, t) {
			if (!this.obj) return;
			e || (e = this.container.offsetWidth), t || (t = this.container.offsetHeight), this.width = e, this.height = t;
			var n, r;
			this.obj.dimensions ? (n = this.obj.dimensions.width, r = this.obj.dimensions.height) : (n = this.elements.backplate ? this.elements.backplate.offsetWidth : 0, r = this.elements.backplate ? this.elements.backplate.offsetHeight : 0);
			var i = {
					w: n,
					h: r
				},
				s = Math.max(e / i.w, t / i.h),
				o = i.w * s,
				u = i.h * s,
				a = 0,
				f = 0,
				l = -a / 2,
				c = e - o + a / 2 - l,
				h = -f / 2,
				p = t - u + f / 2 - h;
			this.elements.backplate && (this.elements.backplate.style.top = (h + p * this.obj.v).toFixed() + "px", this.elements.backplate.style.left = (l + c * this.obj.h).toFixed() + "px", this.elements.backplate.style.width = o + "px", this.elements.backplate.style.height = u + "px")
		}
		var e = function(e, n, r, i) {
			this.loaded = n === undefined ? !0 : n, this.elements = {
				outer: document.createElement("div"),
				inner: document.createElement("div"),
				resizeContainer: r || !1
			}, this.container = this.elements.outer, e && t.call(this, e), this.elements.outer.appendChild(this.elements.inner)
		};
		return e.prototype._onImageLoaded = r, e.prototype._getRatio = n, e.prototype.resize = i, e.prototype.changeImage = t, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.Backplate = e, oblio.classes.Backplate
	}), define("oblio/classes/BGRenderer", ["oblio/classes/Backplate", "oblio/utils/DeviceDetect", "greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function(e) {
		"use strict";

		function n() {
			this.verbose && console.log("BGRenderer | init"), this.initialized = !0, this.container = document.getElementById(this.container), this.addStyles(this.image1.elements.outer), this.addStyles(this.image1.elements.inner), this.container.appendChild(this.image1.elements.outer), this.addStyles(this.image2.elements.outer), this.addStyles(this.image2.elements.inner), this.container.appendChild(this.image2.elements.outer), this.image1.elements.outer.style.overflow = this.image2.elements.outer.style.overflow = "hidden", oblio.app.Shell.resize()
		}

		function r(e) {
			return e.style.position = "absolute", e.style.top = e.style.left = "0px", e.style.width = e.style.height = "100%", e
		}

		function i(e, t, n) {
			this.initialized || this.init();
			var r, i;
			this.nextContainer === 0 ? (r = this.image1, i = this.image2, this.image1.changeImage(e), this.currentBG = this.image1) : (r = this.image2, i = this.image1, this.image2.changeImage(e), this.currentBG = this.image2), this.resize(), this.transition(r, i, t, n)
		}

		function s(e, t, n, r) {
			var i = this,
				s = new TimelineLite({
					onComplete: function() {
						i.changeComplete(r)
					}.bind(this)
				});
			s.pause();
			var o = n ? 0 : 8 / 3;
			s.to(e.elements.outer, 0, {
				x: this.width + "px"
			}), s.to(t.elements.outer, o * 3.5 / 8, {
				x: -this.width + "px",
				ease: Expo.easeInOut
			}, 0), s.to(e.elements.outer, o * 3.5 / 8, {
				x: "0px",
				ease: Expo.easeInOut
			}, 0), s.play()
		}

		function o(e) {
			this.nextContainer === 0 ? (this.image2.elements.inner.innerHTML = "", this.image2.obj = null) : (this.image1.elements.inner.innerHTML = "", this.image1.obj = null), this.nextContainer = (this.nextContainer + 1) % 2, e && e()
		}

		function u() {
			this.image1.elements.inner.innerHTML = "", this.image1.obj.destroy(), this.image1.obj = null, this.image2.inner.innerHTML = "", this.image2.obj.destroy(), this.image2.obj = null
		}

		function a(e, t) {
			e || (e = this.container.offsetWidth), t || (t = this.container.offsetHeight), this.width = e, this.height = t, this.image1 && this.image1.resize(e, t), this.image2 && this.image2.resize(e, t)
		}
		var t = function(t) {
			this.container = t, this.initialized = !1, this.image1 = new e, this.image2 = new e, this.nextContainer = 0, this.verbose = !1, this.width = 0, this.height = 0
		};
		return t.prototype.init = n, t.prototype.addStyles = r, t.prototype.changeBg = i, t.prototype.changeComplete = o, t.prototype.transition = s, t.prototype.clear = u, t.prototype.resize = a, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.BGRenderer = t, oblio.classes.BGRenderer
	}), define("app/BGRenderer", ["oblio/classes/BGRenderer", "oblio/utils/Inherit"], function() {
		"use strict";
		var e, t = function(t) {
			e = this, this._super(t)
		};
		return oblio.utils.inherit(t, oblio.classes.BGRenderer), window.oblio = window.oblio || {}, oblio.app = oblio.app || {}, oblio.app.BGRenderer = t, oblio.app.BGRenderer
	}), define("oblio/classes/BG", [], function() {
		"use strict";
		var e = function(e, t) {
			this.el = e, this.onReady = t
		};
		return e.prototype.place = function(e) {
			return e.appendChild(this.el), this.el
		}, e.prototype.destroy = function() {
			for (var e in this) this.hasOwnProperty(e) && (this[e] = null)
		}, e
	}), define("oblio/classes/BG_Image", ["oblio/classes/BG"], function(e) {
		"use strict";
		var t = function(t, n) {
			for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]);
			this.el = new Image, this.el.style.position = "absolute", this.el.alt = "Background", $(this.el).on("load", function() {
				this.onReady()
			}.bind(this)), this.el.src = t.url, e.apply(this, [this.el, n])
		};
		return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
	}), define("oblio/utils/videoPlayerYT", [], function() {
		function e(e, s) {
			this.div = typeof e == "string" ? document.getElementById(e) : e, this.autoplay = 0, this.color = "white", this.showinfo = 0, this.controls = 1, this.videoSrc = undefined, this.isReady = !1, this.isMobile = !1, s.tracking === !0 && (this.tracking = !0, this.playerDiv = this.div, this.videoTitle = s.title, this.duration = null, this.nextPercentage = 10, this.progressInterval = !0, this.progressInterval = setInterval(t.bind(this), 1e3)), this.onComplete = undefined, this.onPlaying = undefined, this.onPaused = undefined, this.onBuffering = undefined, n.call(this);
			for (var o in s) s.hasOwnProperty(o) && (this[o] = s[o]);
			if (typeof YT == "undefined") {
				var u = document.createElement("script");
				u.type = "text/javascript", u.src = "https://www.youtube.com/iframe_api", document.body.appendChild(u), r.call(this)
			} else typeof YT.Player == "undefined" ? r.call(this) : i.call(this)
		}

		function t() {
			if (this.duration === null || this.duration === 0) {
				this.duration = this.player.getDuration();
				return
			}
			var e = this.player.getCurrentTime(),
				t = Math.ceil(e / this.duration * 100);
			if (t >= this.nextPercentage) {
				app.trackEvent("Video Completion", this.title, this.nextPercentage + "% complete");
				while (this.nextPercentage <= t) this.nextPercentage += 10
			}
		}

		function n() {
			var e = navigator.userAgent.toLowerCase();
			isAndroid = e.indexOf("android") > -1, isiPad = navigator.userAgent.match(/iPad/i) !== null;
			var t = navigator.platform.toLowerCase();
			if (isAndroid || isiPad || t === "ipad" || t === "iphone" || t === "ipod" || t === "android" || t === "palm" || t === "windows phone" || t === "blackberry") this.isMobile = !0
		}

		function r() {
			if (this.isReady) return !0;
			typeof YT == "undefined" || typeof YT.Player == "undefined" ? setTimeout(c(r, this), 100) : i.call(this)
		}

		function i() {
			var e = oblio.settings.isIpad ? "95%" : "100%";
			this.autoplay = this.isMobile ? 0 : this.autoplay, this.isReady = !1, this.player = new YT.Player(this.div, {
				height: e,
				width: "100%",
				videoId: this.videoSrc,
				playerVars: {
					autoplay: this.autoplay,
					enablejsapi: 1,
					color: this.color,
					showinfo: this.showinfo,
					controls: this.controls,
					wmode: "transparent",
					rel: 0
				},
				events: {
					onStateChange: c(s, this)
				}
			})
		}

		function s(e) {
			switch (e.data) {
				case YT.PlayerState.ENDED:
					this.onComplete && this.onComplete();
					break;
				case YT.PlayerState.PLAYING:
					this.onPlaying && this.onPlaying();
					break;
				case YT.PlayerState.PAUSED:
					this.onPaused && this.onPaused();
					break;
				case YT.PlayerState.BUFFERING:
					this.onBuffering && this.onBuffering()
			}
		}

		function o() {
			try {
				this.player.playVideo()
			} catch (e) {}
		}

		function u(e) {
			try {
				this.isMobile ? (this.player.destroy(), this.videoSrc = e, i.call(this)) : this.player.loadVideoById(e)
			} catch (t) {}
		}

		function a() {
			try {
				this.player.pauseVideo()
			} catch (e) {}
		}

		function f() {
			try {
				this.progressInterval && (window.clearInterval(this.progressInterval), this.progressInterval = null, this.nextPercentage = 10), this.onComplete = undefined, this.onPlaying = undefined, this.onPaused = undefined, this.onBuffering = undefined, this.player.destroy(), this.div.innerHTML = "", this.player = null
			} catch (e) {}
		}

		function l(e, t) {}

		function c(e, t) {
			return function() {
				return e.apply(t, arguments)
			}
		}
		return e.prototype.type = "youTube", e.prototype.loadVideo = u, e.prototype.play = o, e.prototype.pause = a, e.prototype.destroy = f, e.prototype.resize = l, window.oblio = window.oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.VideoPlayerYT = e, oblio.utils.VideoPlayerYT
	}), define("oblio/utils/videoPlayerHTML5", [], function() {
		"use strict";

		function e(e, r) {
			this.div = typeof e == "string" ? document.getElementById(e) : e, this.autoplay = r.autoplay || 0, this.loop = r.loop || 0, this.controls = r.controls !== undefined ? r.controls : !0, this.videoSrc = r.videoSrc, this.isReady = !1, this.isAndroid = !1, this.isiPad = !1, this.isMobile = t.call(this), this.player = null, Modernizr.video.h264 === "probably" ? this.extension = ".mp4" : Modernizr.video.webm === "probably" ? this.extension = ".webm" : this.extension = ".mp4", this.playerID = "player_" + (new Date).getTime() + Math.round(Math.random() * 999), this.onComplete = undefined, this.onPlaying = undefined, this.onPaused = undefined, this.onBuffering = undefined;
			for (var i in r) this[i] = r[i];
			this.videoSrc !== undefined && (this.videoSrc.match(".mp4") || (this.videoSrc = this.videoSrc + this.extension)), n.call(this)
		}

		function t() {
			var e = navigator.userAgent.toLowerCase(),
				t = navigator.platform.toLowerCase();
			return this.isAndroid = e.indexOf("android") > -1, this.isiPad = e.match(/ipad/i) !== null, this.isAndroid || this.isiPad || t === "ipad" || t === "iphone" || t === "ipod" || t === "android" || t === "palm" || t === "windows phone" || t === "blackberry"
		}

		function n() {
			var e = this;
			this.autoplay = this.isMobile ? 0 : this.autoplay, this.isReady = !1, this.player = document.createElement("video"), this.player.width = this.player.height = "500px", this.player.id = this.playerID, this.player.preload = "auto", this.player.controls = this.controls, this.player.style.position = "absolute", this.player.style.left = "0px", this.player.style.top = "0px", this.player.autoplay = this.autoplay, this.player.loop = this.loop, this.player.src = this.videoSrc, this.div.appendChild(this.player)
		}

		function r(e) {
			switch (e.data) {
				case "loadedmetadata":
					this.onLoadedMetadata && this.onLoadedMetadata();
					break;
				case "ended":
					this.onComplete && this.onComplete();
					break;
				case "playing":
					this.onPlaying && this.onPlaying();
					break;
				case "pause":
					this.onPaused && this.onPaused();
					break;
				case "buffering":
					this.onBuffering && this.onBuffering()
			}
		}

		function i() {
			this.player.play()
		}

		function s(e) {
			try {
				this.videoSrc = e, this.videoSrc.match(".mp4") || (this.videoSrc += this.extension), this.player.pause(), this.player.setSrc(this.videoSrc)
			} catch (t) {}
		}

		function o() {
			this.player.pause()
		}

		function u() {
			this.player.pause(), this.onComplete = undefined, this.onPlaying = undefined, this.onPaused = undefined, this.onBuffering = undefined, this.player.remove();
			var e = this.div;
			e && (e.innerHTML = ""), this.player = null
		}

		function a(e, t) {}

		function f(e, t) {
			return function() {
				return e.apply(t, arguments)
			}
		}
		return e.prototype.type = "htmlVideo", e.prototype.loadVideo = s, e.prototype.play = i, e.prototype.pause = o, e.prototype.destroy = u, e.prototype.resize = a, window.oblio = window.oblio || {}, oblio.utils = oblio.utils || {}, oblio.utils.VideoPlayerHTML5 = e, oblio.utils.VideoPlayerHTML5
	}), define("oblio/classes/BG_Video", ["oblio/classes/BG", "oblio/utils/videoPlayerYT", "oblio/utils/videoPlayerHTML5"], function(e, t, n) {
		"use strict";
		var r = function(r, i, s) {
			for (var o in r) r.hasOwnProperty(o) && (this[o] = r[o]);
			var u = {
				videoSrc: String(this.videoSrc),
				autoplay: 1,
				loop: 1,
				controls: !1
			};
			if (this.type === "youTube") this.playerObj = new t(wrapper, u);
			else {
				if (this.type !== "htmlVideo") return !1;
				this.playerObj = new n(wrapper, u), this.playerObj.player.width = "auto", this.playerObj.player.height = "auto", this.playerObj.player.style.position = "absolute", this.playerObj.player.style.width = "auto", this.playerObj.player.style.height = "auto"
			}
			this.el = this.playerObj.player, this.playerObj.onPlaying = function() {}.bind(this), i.call(this), this.el.play(), e.apply(this, [this.el, i])
		};
		return r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r
	}), define("oblio/classes/BGManager", ["oblio/classes/BG_Image", "oblio/classes/BG_Video", "oblio/utils/DeviceDetect", "greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function(e, t) {
		"use strict";

		function r() {
			this.verbose && console.log("BGManager | init"), this.initialized = !0, this.currBgObj = null;
			var e = this.sections.length;
			while (e--) {
				var t = this.sections[e];
				t.imgIDs && t.randomize !== !1 && (t.imgIDs = l(t.imgIDs))
			}
			for (var n in this.images) this.images[n].img = null, this.images[n].type === "image" && oblio.utils.SectionLoader.addSection("background_" + n, {
				files: {
					images: [this.images[n].url]
				}
			})
		}

		function i(e) {
			this.verbose && console.log("BGManager | returnSectionObj: " + e);
			var t = null,
				n = this.sections.length;
			while (n--)
				if (this.sections[n].id === e) {
					t = this.sections[n];
					break
				}
			return t
		}

		function s(e) {
			this.verbose && console.log("BGManager | deprioritize: " + e);
			var t = this.sections.length,
				n;
			while (t--) {
				n = this.sections[t].imgIDs ? this.sections[t].imgIDs.length : 0;
				while (n--) this.sections[t].imgIDs[n] === e && this.sections[t].imgIDs.push(this.sections[t].imgIDs.splice(n, 1)[0])
			}
		}

		function o(e, t, n) {
			this.verbose && console.log("BGManager | getBg: " + e), this.initialized || this.init();
			var r = this.returnSectionObj(e),
				i;
			return !r || !r.imgIDs || r.imgIDs.length <= 0 ? !1 : (i = r.imgIDs[0], n || this.deprioritize(i), t ? "background_" + i : i)
		}

		function u(n, r, i) {
			var s = this.getBg(n, !1, !1),
				o = this.images[s],
				u = !1,
				a = this;
			s === !1 && (o = {
				img: !1
			});
			if (o === this.currBgObj) {
				i && i();
				return
			}
			this.currBgObj = o, o.img === !1 || o.img && o.loaded ? this.renderer.changeBg(o, r, i) : o.type === "image" ? o = new e(o, function() {
				if (u) return;
				u = !0, o.loaded = !0, a.verbose && console.log("BGManager | image loaded: " + o.url), a.renderer.changeBg(o, r, i)
			}) : oblio.utils.DeviceDetect.isMobile || oblio.utils.DeviceDetect.isAndroid || oblio.utils.DeviceDetect.isIpad || !document.createElement("video").canPlayType ? (o.url = o.fallback, o = new e(o, function() {
				if (u) return;
				u = !0, o.loaded = !0, a.verbose && console.log("BGManager | image loaded: " + o.url), a.renderer.changeBg(o, r, i)
			})) : o = new t(o, function() {
				if (u) return;
				u = !0, this.loaded = !0, a.verbose && console.log("BGManager | image loaded: ", this), a.renderer.changeBg(this, r, i), oblio.app.Shell.resize()
			}, this.renderer.resize)
		}

		function a(e, t) {
			var n = this.getBg(e, !1, !0);
			if (!n) return;
			var r = this.images[n];
			r.img || (r.img = new Image, r.img.alt = "Background", $(r.img).bind("load readystatechange", function() {
				r.loaded = !0, t && t()
			}.bind(this)), r.img.src = r.url)
		}

		function f() {
			this.renderer.clear()
		}

		function l(e) {
			var t = [],
				n = e.length;
			while (n--) {
				var r = Math.floor(Math.random() * e.length),
					i = e.splice(r, 1)[0];
				t.unshift(i)
			}
			return t
		}
		var n = function(e, t) {
			console.log("BGManager | " + t), this.initialized = !1, this.verbose = !1, this.renderer = e, this.sections = t.sections, this.images = t.images
		};
		return n.prototype.init = r, n.prototype.returnSectionObj = i, n.prototype.deprioritize = s, n.prototype.getBg = o, n.prototype.preloadNextBg = a, n.prototype.clear = f, n.prototype.changeBg = u, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.BGManager = n, oblio.classes.BGManager
	}), define("app/BGManager", ["oblio/classes/BGManager", "oblio/utils/Inherit"], function() {
		"use strict";
		var e, t = function(t, n) {
			e = this, this._super(t, n)
		};
		return oblio.utils.inherit(t, oblio.classes.BGManager), window.oblio = window.oblio || {}, oblio.app = oblio.app || {}, oblio.app.BGManager = t, oblio.app.BGManager
	}), define("oblio/classes/Section", [], function() {
		function r() {
			console.log("hey there " + e), this.initialized = !1, this.verbose = !0
		}

		function i(e) {}

		function s(e, t) {
			this.backplate && this.backplate.resize()
		}

		function o(e) {}

		function u(e) {}

		function a(e) {}

		function f(e) {}

		function l(e) {}
		var e, t, n;
		return r.prototype.init = i, r.prototype.resize = s, r.prototype.keyHandler = o, r.prototype.touchStartHandler = u, r.prototype.touchEndHandler = a, r.prototype.touchMoveHandler = f, r.prototype.mousewheelHandler = l, window.oblio = window.oblio || {}, oblio.classes = oblio.classes || {}, oblio.classes.Section = r, oblio.classes.Section
	}), define("app/Background", [], function() {
		"use strict";

		function r(e) {
			this.onLoadedCallback = e;
			var t = document.body.className.match("prod") ? "pixi" : "pixi_dev";
			this.pixi = require([t], function(e) {
				i.call(this)
			}.bind(this))
		}

		function i() {
			var n = [{
				fn: u,
				scope: this,
				vars: [t]
			}, {
				fn: a,
				scope: this,
				vars: [t]
			}, {
				fn: f,
				scope: this,
				vars: [t]
			}, {
				fn: s,
				scope: this
			}];
			e.execute(n)
		}

		function s() {
			this.ready = !0, this.resize(), S.call(this), window.setTimeout(function() {
				o.call(this), this.onLoadedCallback()
			}.bind(this), 200)
		}

		function o() {
			var e = window.innerWidth,
				t = window.innerHeight;
			this.elements.canvas.style.opacity = 1, this.options = {
				width: 10,
				height: 0
			};
			var n = new TimelineLite;
			n.add(TweenLite.to(this.options, .18, {
				width: 5,
				height: t,
				ease: Power4.easeOut,
				onUpdate: function(e) {
					this.frameMask = l.apply(this, [this.frameMask, this.options.width, this.options.height])
				}.bind(this)
			})), n.add(TweenLite.to(this.options, .5, {
				width: e,
				ease: Power4.easeInOut,
				onUpdate: function(e) {
					this.frameMask = l.apply(this, [this.frameMask, this.options.width, t])
				}.bind(this),
				onComplete: function() {
					this.introComplete = !0
				}.bind(this)
			})), n.play()
		}

		function u(e) {
			this.loader = new PIXI.loaders.Loader, this.loader.add("city", "assets/images/marquee/backgrounds/bg-tile-blur.jpg", {
				crossOrigin: !0
			}), this.loader.add("wireframe", "assets/images/marquee/backgrounds/bg-tile-wireframe.png", {
				crossOrigin: !0
			}), this.loader.add("pods", "assets/images/marquee/backgrounds/podSprites.json", {
				crossOrigin: !0
			}), this.loader.on("progress", function(e) {}), this.loader.once("complete", function(t) {
				e()
			}), this.loader.load()
		}

		function a(e) {
			var t = document.createElement("canvas"),
				n = t.getContext("2d"),
				r = 200,
				i, s, o = this.podPositions,
				u = function(n) {
					while (r) i = Math.floor(Math.random() * t.width), s = Math.floor(Math.random() * t.height), n[3 + s * t.width * 4 + i * 4] === 0 && (o.push({
						x: i / t.width,
						y: s / t.height
					}), r--);
					e()
				},
				a = new Image;
			a.addEventListener("load", function() {
				t.width = a.width, t.height = a.height, n.drawImage(a, 0, 0);
				var e = n.getImageData(0, 0, a.width, a.height);
				u(e.data)
			}, !1), a.crossOrigin = "anonymous", a.src = "assets/images/marquee/backgrounds/map.png"
		}

		function f(e) {
			var t = this.elements.canvas,
				n = document.getElementById("marquee").getBoundingClientRect(),
				r = window.innerWidth,
				i = window.innerHeight;
			console.log("++++++++++++", r, i), this.speeds = {
				city: {
					vx: 0,
					vy: .5
				},
				grid: {
					vx: .5,
					vy: .5
				}
			}, this.maskObj = {
				scanRects: [],
				scanCircs: [{
					x: 0,
					y: 0,
					radius: 0
				}]
			}, t.style.background = "transparent", t.style.width = r + "px", t.style.height = i + "px", this.stage = new PIXI.Container, this.paused = !1, this.scale = window.devicePixelRatio, this.renderer = new PIXI.autoDetectRenderer(r, i, {
				resolution: this.scale,
				transparent: !0,
				antialias: !0,
				view: t
			}), this.moveCount = 0, this.tilingSprite = new PIXI.extras.TilingSprite(this.loader.resources.city.texture, r, i), this.stage.addChild(this.tilingSprite), this.wireframeSprite = new PIXI.extras.TilingSprite(this.loader.resources.wireframe.texture, r, i), this.wireframeSprite.blendMode = PIXI.BLEND_MODES.NORMAL, this.stage.addChild(this.wireframeSprite);
			var s = PIXI.Texture.fromCanvas(h());
			this.gridSprite = new PIXI.extras.TilingSprite(s, r, i), this.gridSprite.alpha = .25, this.stage.addChild(this.gridSprite), this.wireframeMask = new PIXI.Graphics, this.stage.addChild(this.wireframeMask), this.wireframeSprite.mask = this.wireframeMask, this.activePod = new PIXI.Texture.fromFrame("dimPod.png"), this.brightPod = new PIXI.Texture.fromFrame("brightPod.png"), this.deadPod = new PIXI.Texture.fromFrame("deadPod.png"), this.podContainer = new PIXI.Container, this.scanPodContainer = new PIXI.Container;
			var o, u;
			for (var a = this.podPositions.length - 1; a >= 0; a--) u = this.podPositions[a].dead ? this.deadPod : this.activePod, o = new PIXI.Sprite(u), o.position.x = this.podPositions[a].x * this.tilingSprite.texture.width, o.position.y = this.podPositions[a].y * this.tilingSprite.texture.height, this.podContainer.addChild(o), this.podPositions[a].dead || (o = new PIXI.Sprite(this.brightPod), o.position.x = this.podPositions[a].x * this.tilingSprite.texture.width, o.position.y = this.podPositions[a].y * this.tilingSprite.texture.height, this.scanPodContainer.addChild(o));
			var f = this.podContainer.generateTexture(this.renderer),
				l = this.scanPodContainer.generateTexture(this.renderer);
			this.podSprite = new PIXI.extras.TilingSprite(f, r, i), this.podScanSprite = new PIXI.extras.TilingSprite(l, r, i), this.stage.addChild(this.podSprite), this.wireframeSprite.addChild(this.podScanSprite), this.frameMask = new PIXI.Graphics, this.stage.mask = this.frameMask, t.style.opacity = 0, e()
		}

		function l(e, t, n) {
			var r = window.innerWidth,
				i = r / 2,
				s = 6 * (Math.PI / 180),
				o = i / Math.cos(s) * (t / r),
				u = Math.cos(s) * o,
				a = Math.sin(s) * o,
				f = Math.cos(Math.PI - s) * o;
			return e.clear(), e.beginFill(0), e.moveTo(i, n), e.lineTo(i + u, n - a), e.lineTo(i + u, 0), e.lineTo(i - u, 0), e.lineTo(i - u, n - a), e.lineTo(i, n), e.endFill(), e
		}

		function c(e) {
			this.tilingSprite.tileScale.x = e, this.tilingSprite.tileScale.y = e, this.wireframeSprite.tileScale.x = e, this.wireframeSprite.tileScale.y = e, this.podSprite.tileScale.x = e, this.podSprite.tileScale.y = e, this.podScanSprite.tileScale.x = e, this.podScanSprite.tileScale.y = e
		}

		function h() {
			var e = document.createElement("canvas"),
				t = e.getContext("2d");
			return e.width = 10, e.height = 10, t.strokeStyle = "rgba(255,255,255,.5)", t.beginPath(), t.moveTo(10, 0), t.lineTo(10, 10), t.lineTo(0, 10), t.stroke(), e
		}

		function p(e, t) {
			this.moveCount++;
			if (this.ready) {
				var n = 100 * Math.random(),
					r = Math.random() * Math.PI * 2,
					i = n * Math.cos(r),
					s = n * Math.sin(r);
				v.call(this, e + i, t + s)
			}
			this.moveCount > 5 && (this.moveCount = 0, b.call(this))
		}

		function d(e, t) {
			var n = Math.max(e, window.innerWidth - e),
				r = Math.max(t, window.innerHeight - t),
				i = Math.sqrt(n * n + r * r);
			return i
		}

		function v(e, t) {
			var n = {
					x: e,
					y: t,
					radius: 0,
					thickness: 50
				},
				r = d(e, t) / 2,
				i = .0025 * r;
			this.maskObj.scanCircs.push(n), TweenLite.to(n, i, {
				radius: r,
				thickness: 0,
				ease: Linear.easeOut,
				onComplete: function() {
					this.maskObj.scanCircs.splice(this.maskObj.scanCircs.indexOf(n), 1)
				}.bind(this)
			})
		}

		function m() {
			var e = {
				x: 0,
				width: 0
			};
			this.maskObj.scanRects.push(e);
			var t = function() {
					for (var t = this.maskObj.scanRects.length - 1; t >= 0; t--)
						if (this.maskObj.scanRects[t] === e) {
							this.maskObj.scanRects.splice(t, 1);
							return
						}
				}.bind(this),
				n = 1.5,
				r = new TimelineLite({
					onComplete: t
				});
			r.pause(), r.to(e, n / 2, {
				width: .5,
				ease: Power2.easeIn
			}, 0), r.to(e, n / 2, {
				width: 0,
				ease: Power2.easeOut
			}, n / 2), r.to(e, n, {
				x: 1,
				ease: Power2.easeInOut
			}, 0), r.play()
		}

		function g() {
			this.wireframeMask.clear();
			var e, t;
			for (t = this.maskObj.scanRects.length - 1; t >= 0; t--) e = this.maskObj.scanRects[t], this.wireframeMask.beginFill(), this.wireframeMask.drawRect(e.x * window.innerWidth, 0, e.width * window.innerWidth, window.innerHeight), this.wireframeMask.endFill();
			var n;
			for (t = this.maskObj.scanCircs.length - 1; t >= 0; t--) n = this.maskObj.scanCircs[t], this.wireframeMask.lineStyle(n.thickness, 0, 1), this.wireframeMask.drawCircle(n.x, n.y, n.radius)
		}

		function y() {
			this.tilingSprite.tilePosition.y = this.position.y, this.tilingSprite.tilePosition.x = this.position.x, this.wireframeSprite.tilePosition.y = this.position.y, this.wireframeSprite.tilePosition.x = this.position.x, this.gridSprite.tilePosition.y = this.position.y, this.gridSprite.tilePosition.x = this.position.x, this.podSprite.tilePosition.y = this.position.y, this.podSprite.tilePosition.x = this.position.x, this.podScanSprite.tilePosition.y = this.position.y, this.podScanSprite.tilePosition.x = this.position.x
		}

		function b() {
			this.animating = !0;
			var e = 50 + Math.random() * 1e3,
				t = Math.random() * Math.PI * 2,
				n = e * Math.cos(t),
				r = e * Math.sin(t),
				i = 2,
				s = Power4.easeInOut;
			TweenLite.to(this.position, i, {
				x: this.position.x + n,
				y: this.position.y + r,
				ease: s,
				onUpdate: y.bind(this),
				onComplete: function() {
					m.call(this), this.animating = !1
				}.bind(this)
			});
			for (var o = this.maskObj.scanCircs.length - 1; o >= 0; o--) TweenLite.to(this.maskObj.scanCircs[o], i, {
				x: this.maskObj.scanCircs[o].x + n,
				y: this.maskObj.scanCircs[o].y + r,
				ease: s
			})
		}

		function w(e) {
			if (this.animating) {
				this.lastScrollPos = e;
				return
			}
			var t = this.lastScrollPos - e;
			t *= .1, this.position.y -= t;
			for (var n = this.maskObj.scanCircs.length - 1; n >= 0; n--) this.maskObj.scanCircs[n].y -= t;
			this.lastScrollPos = e, y.call(this)
		}

		function E(e) {
			e && TweenLite.delayedCall(.5, e), this.renderer ? this.renderer.view.style.opacity = 0 : $("#bgWrapper").remove()
		}

		function S() {
			window.requestAnimationFrame(S.bind(this)), g.call(this), this.paused || this.renderer.render(this.stage)
		}

		function x() {
			this.paused = !1
		}

		function T() {
			this.paused = !0
		}

		function N(e, t) {
			this.renderer && (e || (e = window.innerWidth), t || (t = window.innerHeight), this.h = t, c.call(this, Math.max(e, t) / 1536), this.renderer.resize(e, t), this.renderer.view.style.width = e + "px", this.renderer.view.style.height = t + "px", this.tilingSprite.width = e, this.tilingSprite.height = t, this.wireframeSprite.width = e, this.wireframeSprite.height = t, this.gridSprite.width = e, this.gridSprite.height = t, this.introComplete && (this.frameMask = l.apply(this, [this.frameMask, e, t])))
		}
		var e = new oblio.utils.ArrayExecuter,
			t = e.stepComplete.bind(e),
			n = function(e) {
				this.ready = !1, this.position = {
					x: 0,
					y: 0
				}, this.elements = {
					wrapper: document.getElementById("bgWrapper"),
					canvas: document.getElementById("pixiCanvas")
				}, this.podPositions = [], this.loader = null, this.pixi = null, this.lastScrollPos = 0
			};
		return n.prototype.load = r, n.prototype.movePosition = b, n.prototype.sendScan = m, n.prototype.resize = N, n.prototype.click = p, n.prototype.goAway = E, n.prototype.pause = T, n.prototype.play = x, n.prototype.movePositionManual = w, n
	}), define("app/MarqueeApp", ["app/Background", "app/ReadoutLine", "greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function(e, t) {
		"use strict";

		function s(e) {
			console.log("********** init " + n), r = !1, this.counter = 0, this.wrapper = document.getElementById("marquee"), this.readText = document.getElementById("titleDescription"), this.tt = document.getElementById("tt"), this.decoration = document.getElementById("subTitleDecoration"), isMobile.any || o.call(this), a.call(this), p.call(this)
		}

		function o() {
			this.lineReader = new t(this.readText, null, 1)
		}

		function u() {
			this.tt.className += " on", this.decoration.className += " on", window.setTimeout(function() {
				isMobile.any ? this.readText.className += " on" : this.lineReader.draw(null)
			}.bind(this), 1600), requestAnimationFrame(l.bind(this)), window.setTimeout(f.bind(this), 500)
		}

		function a(t) {
			this.bg = new e, this.bg.load(u.bind(this))
		}

		function f() {
			this.contentBox = document.getElementById("subTitleBox"), this.contentBox.className += " on"
		}

		function l() {
			this.counter < Date.now() && (this.counter = Date.now() + Math.floor(Math.random() * 6e3 + 1e3), this.mouseX = Math.round(Math.random() * window.innerWidth), this.mouseY = Math.round(Math.random() * window.innerHeight), this.bg.click(this.mouseX, this.mouseY)), requestAnimationFrame(l.bind(this))
		}

		function c() {
			this.bg.play(), this.readText.className = "readoutLine"
		}

		function h() {
			this.bg.pause(), this.readText.className = ""
		}

		function p(e, t) {
			this.wrapper.style.height = t + "px", this.bg.resize(e, t)
		}

		function d(e) {
			this.bg.movePositionManual(e)
		}
		var n = "MarqueeApp",
			r = !1,
			i = function() {};
		return i.prototype.init = s, i.prototype.resize = p, i.prototype.show = c, i.prototype.hide = h, i.prototype.movePositionManual = d, window.oblio = window.oblio || {}, oblio.app = oblio.app || {}, oblio.app.MarqueeApp = i, oblio.app.MarqueeApp
	}),
	function(e, t, n) {
		function s(e, n) {
			this.wrapper = typeof e == "string" ? t.querySelector(e) : e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
				resizeScrollbars: !0,
				mouseWheelSpeed: 20,
				snapThreshold: .334,
				startX: 0,
				startY: 0,
				scrollY: !0,
				directionLockThreshold: 5,
				momentum: !0,
				bounce: !0,
				bounceTime: 600,
				bounceEasing: "",
				preventDefault: !0,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				HWCompositing: !0,
				useTransition: !0,
				useTransform: !0
			};
			for (var r in n) this.options[r] = n[r];
			this.translateZ = this.options.HWCompositing && i.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = i.hasTransition && this.options.useTransition, this.options.useTransform = i.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = this.options.eventPassthrough == "vertical" ? !1 : this.options.scrollY, this.options.scrollX = this.options.eventPassthrough == "horizontal" ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? i.ease[this.options.bounceEasing] || i.ease.circular : this.options.bounceEasing, this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.options.shrinkScrollbars == "scale" && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.options.probeType == 3 && (this.options.useTransition = !1), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
		}

		function o(e, n, r) {
			var i = t.createElement("div"),
				s = t.createElement("div");
			return r === !0 && (i.style.cssText = "position:absolute;z-index:9999", s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), s.className = "iScrollIndicator", e == "h" ? (r === !0 && (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", s.style.height = "100%"), i.className = "iScrollHorizontalScrollbar") : (r === !0 && (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", s.style.width = "100%"), i.className = "iScrollVerticalScrollbar"), i.style.cssText += ";overflow:hidden", n || (i.style.pointerEvents = "none"), i.appendChild(s), i
		}

		function u(n, r) {
			this.wrapper = typeof r.el == "string" ? t.querySelector(r.el) : r.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = n, this.options = {
				listenX: !0,
				listenY: !0,
				interactive: !1,
				resize: !0,
				defaultScrollbars: !1,
				shrink: !1,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			};
			for (var s in r) this.options[s] = r[s];
			this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (i.addEvent(this.indicator, "touchstart", this), i.addEvent(e, "touchend", this)), this.options.disablePointer || (i.addEvent(this.indicator, i.prefixPointerEvent("pointerdown"), this), i.addEvent(e, i.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (i.addEvent(this.indicator, "mousedown", this), i.addEvent(e, "mouseup", this))), this.options.fade && (this.wrapperStyle[i.style.transform] = this.scroller.translateZ, this.wrapperStyle[i.style.transitionDuration] = i.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
		}
		var r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t) {
				e.setTimeout(t, 1e3 / 60)
			},
			i = function() {
				function o(e) {
					return s === !1 ? !1 : s === "" ? e : s + e.charAt(0).toUpperCase() + e.substr(1)
				}
				var r = {},
					i = t.createElement("div").style,
					s = function() {
						var e = ["t", "webkitT", "MozT", "msT", "OT"],
							t, n = 0,
							r = e.length;
						for (; n < r; n++) {
							t = e[n] + "ransform";
							if (t in i) return e[n].substr(0, e[n].length - 1)
						}
						return !1
					}();
				r.getTime = Date.now || function() {
					return (new Date).getTime()
				}, r.extend = function(e, t) {
					for (var n in t) e[n] = t[n]
				}, r.addEvent = function(e, t, n, r) {
					e.addEventListener(t, n, !!r)
				}, r.removeEvent = function(e, t, n, r) {
					e.removeEventListener(t, n, !!r)
				}, r.prefixPointerEvent = function(t) {
					return e.MSPointerEvent ? "MSPointer" + t.charAt(9).toUpperCase() + t.substr(10) : t
				}, r.momentum = function(e, t, r, i, s, o) {
					var u = e - t,
						a = n.abs(u) / r,
						f, l;
					return o = o === undefined ? 6e-4 : o, f = e + a * a / (2 * o) * (u < 0 ? -1 : 1), l = a / o, f < i ? (f = s ? i - s / 2.5 * (a / 8) : i, u = n.abs(f - e), l = u / a) : f > 0 && (f = s ? s / 2.5 * (a / 8) : 0, u = n.abs(e) + f, l = u / a), {
						destination: n.round(f),
						duration: l
					}
				};
				var u = o("transform");
				return r.extend(r, {
					hasTransform: u !== !1,
					hasPerspective: o("perspective") in i,
					hasTouch: "ontouchstart" in e,
					hasPointer: e.PointerEvent || e.MSPointerEvent,
					hasTransition: o("transition") in i
				}), r.isBadAndroid = /Android /.test(e.navigator.appVersion) && !/Chrome\/\d/.test(e.navigator.appVersion), r.extend(r.style = {}, {
					transform: u,
					transitionTimingFunction: o("transitionTimingFunction"),
					transitionDuration: o("transitionDuration"),
					transitionDelay: o("transitionDelay"),
					transformOrigin: o("transformOrigin")
				}), r.hasClass = function(e, t) {
					var n = new RegExp("(^|\\s)" + t + "(\\s|$)");
					return n.test(e.className)
				}, r.addClass = function(e, t) {
					if (r.hasClass(e, t)) return;
					var n = e.className.split(" ");
					n.push(t), e.className = n.join(" ")
				}, r.removeClass = function(e, t) {
					if (!r.hasClass(e, t)) return;
					var n = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
					e.className = e.className.replace(n, " ")
				}, r.offset = function(e) {
					var t = -e.offsetLeft,
						n = -e.offsetTop;
					while (e = e.offsetParent) t -= e.offsetLeft, n -= e.offsetTop;
					return {
						left: t,
						top: n
					}
				}, r.preventDefaultException = function(e, t) {
					for (var n in t)
						if (t[n].test(e[n])) return !0;
					return !1
				}, r.extend(r.eventType = {}, {
					touchstart: 1,
					touchmove: 1,
					touchend: 1,
					mousedown: 2,
					mousemove: 2,
					mouseup: 2,
					pointerdown: 3,
					pointermove: 3,
					pointerup: 3,
					MSPointerDown: 3,
					MSPointerMove: 3,
					MSPointerUp: 3
				}), r.extend(r.ease = {}, {
					quadratic: {
						style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
						fn: function(e) {
							return e * (2 - e)
						}
					},
					circular: {
						style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
						fn: function(e) {
							return n.sqrt(1 - --e * e)
						}
					},
					back: {
						style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
						fn: function(e) {
							var t = 4;
							return (e -= 1) * e * ((t + 1) * e + t) + 1
						}
					},
					bounce: {
						style: "",
						fn: function(e) {
							return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
						}
					},
					elastic: {
						style: "",
						fn: function(e) {
							var t = .22,
								r = .4;
							return e === 0 ? 0 : e == 1 ? 1 : r * n.pow(2, -10 * e) * n.sin((e - t / 4) * 2 * n.PI / t) + 1
						}
					}
				}), r.tap = function(e, n) {
					var r = t.createEvent("Event");
					r.initEvent(n, !0, !0), r.pageX = e.pageX, r.pageY = e.pageY, e.target.dispatchEvent(r)
				}, r.click = function(e) {
					var n = e.target,
						r;
					/(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (r = t.createEvent("MouseEvents"), r.initMouseEvent("click", !0, !0, e.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), r._constructed = !0, n.dispatchEvent(r))
				}, r
			}();
		s.prototype = {
			version: "5.1.3",
			_init: function() {
				this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
			},
			destroy: function() {
				this._initEvents(!0), this._execEvent("destroy")
			},
			_transitionEnd: function(e) {
				if (e.target != this.scroller || !this.isInTransition) return;
				this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd"))
			},
			_start: function(e) {
				if (i.eventType[e.type] != 1 && e.button !== 0) return;
				if (!this.enabled || this.initiated && i.eventType[e.type] !== this.initiated) return;
				this.options.preventDefault && !i.isBadAndroid && !i.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
				var t = e.touches ? e.touches[0] : e,
					r;
				this.initiated = i.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = i.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, r = this.getComputedPosition(), this._translate(n.round(r.x), n.round(r.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = t.pageX, this.pointY = t.pageY, this._execEvent("beforeScrollStart")
			},
			_move: function(e) {
				if (!this.enabled || i.eventType[e.type] !== this.initiated) return;
				this.options.preventDefault && e.preventDefault();
				var t = e.touches ? e.touches[0] : e,
					r = t.pageX - this.pointX,
					s = t.pageY - this.pointY,
					o = i.getTime(),
					u, a, f, l;
				this.pointX = t.pageX, this.pointY = t.pageY, this.distX += r, this.distY += s, f = n.abs(this.distX), l = n.abs(this.distY);
				if (o - this.endTime > 300 && f < 10 && l < 10) return;
				!this.directionLocked && !this.options.freeScroll && (f > l + this.options.directionLockThreshold ? this.directionLocked = "h" : l >= f + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n");
				if (this.directionLocked == "h") {
					if (this.options.eventPassthrough == "vertical") e.preventDefault();
					else if (this.options.eventPassthrough == "horizontal") {
						this.initiated = !1;
						return
					}
					s = 0
				} else if (this.directionLocked == "v") {
					if (this.options.eventPassthrough == "horizontal") e.preventDefault();
					else if (this.options.eventPassthrough == "vertical") {
						this.initiated = !1;
						return
					}
					r = 0
				}
				r = this.hasHorizontalScroll ? r : 0, s = this.hasVerticalScroll ? s : 0, u = this.x + r, a = this.y + s;
				if (u > 0 || u < this.maxScrollX) u = this.options.bounce ? this.x + r / 3 : u > 0 ? 0 : this.maxScrollX;
				if (a > 0 || a < this.maxScrollY) a = this.options.bounce ? this.y + s / 3 : a > 0 ? 0 : this.maxScrollY;
				this.directionX = r > 0 ? -1 : r < 0 ? 1 : 0, this.directionY = s > 0 ? -1 : s < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(u, a), o - this.startTime > 300 && (this.startTime = o, this.startX = this.x, this.startY = this.y, this.options.probeType == 1 && this._execEvent("scroll")), this.options.probeType > 1 && this._execEvent("scroll")
			},
			_end: function(e) {
				if (!this.enabled || i.eventType[e.type] !== this.initiated) return;
				this.options.preventDefault && !i.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
				var t = e.changedTouches ? e.changedTouches[0] : e,
					r, s, o = i.getTime() - this.startTime,
					u = n.round(this.x),
					a = n.round(this.y),
					f = n.abs(u - this.startX),
					l = n.abs(a - this.startY),
					c = 0,
					h = "";
				this.isInTransition = 0, this.initiated = 0, this.endTime = i.getTime();
				if (this.resetPosition(this.options.bounceTime)) return;
				this.scrollTo(u, a);
				if (!this.moved) {
					this.options.tap && i.tap(e, this.options.tap), this.options.click && i.click(e), this._execEvent("scrollCancel");
					return
				}
				if (this._events.flick && o < 200 && f < 100 && l < 100) {
					this._execEvent("flick");
					return
				}
				this.options.momentum && o < 300 && (r = this.hasHorizontalScroll ? i.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: u,
					duration: 0
				}, s = this.hasVerticalScroll ? i.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: a,
					duration: 0
				}, u = r.destination, a = s.destination, c = n.max(r.duration, s.duration), this.isInTransition = 1);
				if (this.options.snap) {
					var p = this._nearestSnap(u, a);
					this.currentPage = p, c = this.options.snapSpeed || n.max(n.max(n.min(n.abs(u - p.x), 1e3), n.min(n.abs(a - p.y), 1e3)), 300), u = p.x, a = p.y, this.directionX = 0, this.directionY = 0, h = this.options.bounceEasing
				}
				if (u != this.x || a != this.y) {
					if (u > 0 || u < this.maxScrollX || a > 0 || a < this.maxScrollY) h = i.ease.quadratic;
					this.scrollTo(u, a, c, h);
					return
				}
				this._execEvent("scrollEnd")
			},
			_resize: function() {
				var e = this;
				clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
					e.refresh()
				}, this.options.resizePolling)
			},
			resetPosition: function(e) {
				var t = this.x,
					n = this.y;
				return e = e || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? n = 0 : this.y < this.maxScrollY && (n = this.maxScrollY), t == this.x && n == this.y ? !1 : (this.scrollTo(t, n, e, this.options.bounceEasing), !0)
			},
			disable: function() {
				this.enabled = !1
			},
			enable: function() {
				this.enabled = !0
			},
			refresh: function() {
				var e = this.wrapper.offsetHeight;
				this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = i.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
			},
			on: function(e, t) {
				this._events[e] || (this._events[e] = []), this._events[e].push(t)
			},
			off: function(e, t) {
				if (!this._events[e]) return;
				var n = this._events[e].indexOf(t);
				n > -1 && this._events[e].splice(n, 1)
			},
			_execEvent: function(e) {
				if (!this._events[e]) return;
				var t = 0,
					n = this._events[e].length;
				if (!n) return;
				for (; t < n; t++) this._events[e][t].apply(this, [].slice.call(arguments, 1))
			},
			scrollBy: function(e, t, n, r) {
				e = this.x + e, t = this.y + t, n = n || 0, this.scrollTo(e, t, n, r)
			},
			scrollTo: function(e, t, n, r) {
				r = r || i.ease.circular, this.isInTransition = this.options.useTransition && n > 0, !n || this.options.useTransition && r.style ? (this._transitionTimingFunction(r.style), this._transitionTime(n), this._translate(e, t)) : this._animate(e, t, n, r.fn)
			},
			scrollToElement: function(e, t, r, s, o) {
				e = e.nodeType ? e : this.scroller.querySelector(e);
				if (!e) return;
				var u = i.offset(e);
				u.left -= this.wrapperOffset.left, u.top -= this.wrapperOffset.top, r === !0 && (r = n.round(e.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), s === !0 && (s = n.round(e.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), u.left -= r || 0, u.top -= s || 0, u.left = u.left > 0 ? 0 : u.left < this.maxScrollX ? this.maxScrollX : u.left, u.top = u.top > 0 ? 0 : u.top < this.maxScrollY ? this.maxScrollY : u.top, t = t === undefined || t === null || t === "auto" ? n.max(n.abs(this.x - u.left), n.abs(this.y - u.top)) : t, this.scrollTo(u.left, u.top, t, o)
			},
			_transitionTime: function(e) {
				e = e || 0, this.scrollerStyle[i.style.transitionDuration] = e + "ms", !e && i.isBadAndroid && (this.scrollerStyle[i.style.transitionDuration] = "0.001s");
				if (this.indicators)
					for (var t = this.indicators.length; t--;) this.indicators[t].transitionTime(e)
			},
			_transitionTimingFunction: function(e) {
				this.scrollerStyle[i.style.transitionTimingFunction] = e;
				if (this.indicators)
					for (var t = this.indicators.length; t--;) this.indicators[t].transitionTimingFunction(e)
			},
			_translate: function(e, t) {
				this.options.useTransform ? this.scrollerStyle[i.style.transform] = "translate(" + e + "px," + t + "px)" + this.translateZ : (e = n.round(e), t = n.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.x = e, this.y = t;
				if (this.indicators)
					for (var r = this.indicators.length; r--;) this.indicators[r].updatePosition()
			},
			_initEvents: function(t) {
				var n = t ? i.removeEvent : i.addEvent,
					r = this.options.bindToWrapper ? this.wrapper : e;
				n(e, "orientationchange", this), n(e, "resize", this), this.options.click && n(this.wrapper, "click", this, !0), this.options.disableMouse || (n(this.wrapper, "mousedown", this), n(r, "mousemove", this), n(r, "mousecancel", this), n(r, "mouseup", this)), i.hasPointer && !this.options.disablePointer && (n(this.wrapper, i.prefixPointerEvent("pointerdown"), this), n(r, i.prefixPointerEvent("pointermove"), this), n(r, i.prefixPointerEvent("pointercancel"), this), n(r, i.prefixPointerEvent("pointerup"), this)), i.hasTouch && !this.options.disableTouch && (n(this.wrapper, "touchstart", this), n(r, "touchmove", this), n(r, "touchcancel", this), n(r, "touchend", this)), n(this.scroller, "transitionend", this), n(this.scroller, "webkitTransitionEnd", this), n(this.scroller, "oTransitionEnd", this), n(this.scroller, "MSTransitionEnd", this)
			},
			getComputedPosition: function() {
				var t = e.getComputedStyle(this.scroller, null),
					n, r;
				return this.options.useTransform ? (t = t[i.style.transform].split(")")[0].split(", "), n = +(t[12] || t[4]), r = +(t[13] || t[5])) : (n = +t.left.replace(/[^-\d.]/g, ""), r = +t.top.replace(/[^-\d.]/g, "")), {
					x: n,
					y: r
				}
			},
			_initIndicators: function() {
				function a(e) {
					for (var t = i.indicators.length; t--;) e.call(i.indicators[t])
				}
				var e = this.options.interactiveScrollbars,
					t = typeof this.options.scrollbars != "string",
					n = [],
					r, i = this;
				this.indicators = [], this.options.scrollbars && (this.options.scrollY && (r = {
					el: o("v", e, this.options.scrollbars),
					interactive: e,
					defaultScrollbars: !0,
					customStyle: t,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: !1
				}, this.wrapper.appendChild(r.el), n.push(r)), this.options.scrollX && (r = {
					el: o("h", e, this.options.scrollbars),
					interactive: e,
					defaultScrollbars: !0,
					customStyle: t,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: !1
				}, this.wrapper.appendChild(r.el), n.push(r))), this.options.indicators && (n = n.concat(this.options.indicators));
				for (var s = n.length; s--;) this.indicators.push(new u(this, n[s]));
				this.options.fadeScrollbars && (this.on("scrollEnd", function() {
					a(function() {
						this.fade()
					})
				}), this.on("scrollCancel", function() {
					a(function() {
						this.fade()
					})
				}), this.on("scrollStart", function() {
					a(function() {
						this.fade(1)
					})
				}), this.on("beforeScrollStart", function() {
					a(function() {
						this.fade(1, !0)
					})
				})), this.on("refresh", function() {
					a(function() {
						this.refresh()
					})
				}), this.on("destroy", function() {
					a(function() {
						this.destroy()
					}), delete this.indicators
				})
			},
			_initWheel: function() {
				i.addEvent(this.wrapper, "wheel", this), i.addEvent(this.wrapper, "mousewheel", this), i.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
					i.removeEvent(this.wrapper, "wheel", this), i.removeEvent(this.wrapper, "mousewheel", this), i.removeEvent(this.wrapper, "DOMMouseScroll", this)
				})
			},
			_wheel: function(e) {
				if (!this.enabled) return;
				e.preventDefault(), e.stopPropagation();
				var t, r, i, s, o = this;
				this.wheelTimeout === undefined && o._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
					o._execEvent("scrollEnd"), o.wheelTimeout = undefined
				}, 400);
				if ("deltaX" in e) e.deltaMode === 1 ? (t = -e.deltaX * this.options.mouseWheelSpeed, r = -e.deltaY * this.options.mouseWheelSpeed) : (t = -e.deltaX, r = -e.deltaY);
				else if ("wheelDeltaX" in e) t = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed, r = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
				else if ("wheelDelta" in e) t = r = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
				else {
					if (!("detail" in e)) return;
					t = r = -e.detail / 3 * this.options.mouseWheelSpeed
				}
				t *= this.options.invertWheelDirection, r *= this.options.invertWheelDirection, this.hasVerticalScroll || (t = r, r = 0);
				if (this.options.snap) {
					i = this.currentPage.pageX, s = this.currentPage.pageY, t > 0 ? i-- : t < 0 && i++, r > 0 ? s-- : r < 0 && s++, this.goToPage(i, s);
					return
				}
				i = this.x + n.round(this.hasHorizontalScroll ? t : 0), s = this.y + n.round(this.hasVerticalScroll ? r : 0), i > 0 ? i = 0 : i < this.maxScrollX && (i = this.maxScrollX), s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY), this.scrollTo(i, s, 0), this.options.probeType > 1 && this._execEvent("scroll")
			},
			_initSnap: function() {
				this.currentPage = {}, typeof this.options.snap == "string" && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
					var e = 0,
						t, r = 0,
						i, s, o, u = 0,
						a, f = this.options.snapStepX || this.wrapperWidth,
						l = this.options.snapStepY || this.wrapperHeight,
						c;
					this.pages = [];
					if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) return;
					if (this.options.snap === !0) {
						s = n.round(f / 2), o = n.round(l / 2);
						while (u > -this.scrollerWidth) {
							this.pages[e] = [], t = 0, a = 0;
							while (a > -this.scrollerHeight) this.pages[e][t] = {
								x: n.max(u, this.maxScrollX),
								y: n.max(a, this.maxScrollY),
								width: f,
								height: l,
								cx: u - s,
								cy: a - o
							}, a -= l, t++;
							u -= f, e++
						}
					} else {
						c = this.options.snap, t = c.length, i = -1;
						for (; e < t; e++) {
							if (e === 0 || c[e].offsetLeft <= c[e - 1].offsetLeft) r = 0, i++;
							this.pages[r] || (this.pages[r] = []), u = n.max(-c[e].offsetLeft, this.maxScrollX), a = n.max(-c[e].offsetTop, this.maxScrollY), s = u - n.round(c[e].offsetWidth / 2), o = a - n.round(c[e].offsetHeight / 2), this.pages[r][i] = {
								x: u,
								y: a,
								width: c[e].offsetWidth,
								height: c[e].offsetHeight,
								cx: s,
								cy: o
							}, u > this.maxScrollX && r++
						}
					}
					this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
				}), this.on("flick", function() {
					var e = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.x - this.startX), 1e3), n.min(n.abs(this.y - this.startY), 1e3)), 300);
					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, e)
				})
			},
			_nearestSnap: function(e, t) {
				if (!this.pages.length) return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				};
				var r = 0,
					i = this.pages.length,
					s = 0;
				if (n.abs(e - this.absStartX) < this.snapThresholdX && n.abs(t - this.absStartY) < this.snapThresholdY) return this.currentPage;
				e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY);
				for (; r < i; r++)
					if (e >= this.pages[r][0].cx) {
						e = this.pages[r][0].x;
						break
					}
				i = this.pages[r].length;
				for (; s < i; s++)
					if (t >= this.pages[0][s].cy) {
						t = this.pages[0][s].y;
						break
					}
				return r == this.currentPage.pageX && (r += this.directionX, r < 0 ? r = 0 : r >= this.pages.length && (r = this.pages.length - 1), e = this.pages[r][0].x), s == this.currentPage.pageY && (s += this.directionY, s < 0 ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1), t = this.pages[0][s].y), {
					x: e,
					y: t,
					pageX: r,
					pageY: s
				}
			},
			goToPage: function(e, t, r, i) {
				i = i || this.options.bounceEasing, e >= this.pages.length ? e = this.pages.length - 1 : e < 0 && (e = 0), t >= this.pages[e].length ? t = this.pages[e].length - 1 : t < 0 && (t = 0);
				var s = this.pages[e][t].x,
					o = this.pages[e][t].y;
				r = r === undefined ? this.options.snapSpeed || n.max(n.max(n.min(n.abs(s - this.x), 1e3), n.min(n.abs(o - this.y), 1e3)), 300) : r, this.currentPage = {
					x: s,
					y: o,
					pageX: e,
					pageY: t
				}, this.scrollTo(s, o, r, i)
			},
			next: function(e, t) {
				var n = this.currentPage.pageX,
					r = this.currentPage.pageY;
				n++, n >= this.pages.length && this.hasVerticalScroll && (n = 0, r++), this.goToPage(n, r, e, t)
			},
			prev: function(e, t) {
				var n = this.currentPage.pageX,
					r = this.currentPage.pageY;
				n--, n < 0 && this.hasVerticalScroll && (n = 0, r--), this.goToPage(n, r, e, t)
			},
			_initKeys: function(t) {
				var n = {
						pageUp: 33,
						pageDown: 34,
						end: 35,
						home: 36,
						left: 37,
						up: 38,
						right: 39,
						down: 40
					},
					r;
				if (typeof this.options.keyBindings == "object")
					for (r in this.options.keyBindings) typeof this.options.keyBindings[r] == "string" && (this.options.keyBindings[r] = this.options.keyBindings[r].toUpperCase().charCodeAt(0));
				else this.options.keyBindings = {};
				for (r in n) this.options.keyBindings[r] = this.options.keyBindings[r] || n[r];
				i.addEvent(e, "keydown", this), this.on("destroy", function() {
					i.removeEvent(e, "keydown", this)
				})
			},
			_key: function(e) {
				if (!this.enabled) return;
				var t = this.options.snap,
					r = t ? this.currentPage.pageX : this.x,
					s = t ? this.currentPage.pageY : this.y,
					o = i.getTime(),
					u = this.keyTime || 0,
					a = .25,
					f;
				this.options.useTransition && this.isInTransition && (f = this.getComputedPosition(), this._translate(n.round(f.x), n.round(f.y)), this.isInTransition = !1), this.keyAcceleration = o - u < 200 ? n.min(this.keyAcceleration + a, 50) : 0;
				switch (e.keyCode) {
					case this.options.keyBindings.pageUp:
						this.hasHorizontalScroll && !this.hasVerticalScroll ? r += t ? 1 : this.wrapperWidth : s += t ? 1 : this.wrapperHeight;
						break;
					case this.options.keyBindings.pageDown:
						this.hasHorizontalScroll && !this.hasVerticalScroll ? r -= t ? 1 : this.wrapperWidth : s -= t ? 1 : this.wrapperHeight;
						break;
					case this.options.keyBindings.end:
						r = t ? this.pages.length - 1 : this.maxScrollX, s = t ? this.pages[0].length - 1 : this.maxScrollY;
						break;
					case this.options.keyBindings.home:
						r = 0, s = 0;
						break;
					case this.options.keyBindings.left:
						r += t ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.up:
						s += t ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.right:
						r -= t ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.down:
						s -= t ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					default:
						return
				}
				if (t) {
					this.goToPage(r, s);
					return
				}
				r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollX && (r = this.maxScrollX, this.keyAcceleration = 0), s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(r, s, 0), this.keyTime = o
			},
			_animate: function(e, t, n, s) {
				function c() {
					var h = i.getTime(),
						p, d, v;
					if (h >= l) {
						o.isAnimating = !1, o._translate(e, t), o.resetPosition(o.options.bounceTime) || o._execEvent("scrollEnd");
						return
					}
					h = (h - f) / n, v = s(h), p = (e - u) * v + u, d = (t - a) * v + a, o._translate(p, d), o.isAnimating && r(c), o.options.probeType == 3 && o._execEvent("scroll")
				}
				var o = this,
					u = this.x,
					a = this.y,
					f = i.getTime(),
					l = f + n;
				this.isAnimating = !0, c()
			},
			handleEvent: function(e) {
				switch (e.type) {
					case "touchstart":
					case "pointerdown":
					case "MSPointerDown":
					case "mousedown":
						this._start(e);
						break;
					case "touchmove":
					case "pointermove":
					case "MSPointerMove":
					case "mousemove":
						this._move(e);
						break;
					case "touchend":
					case "pointerup":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "pointercancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(e);
						break;
					case "orientationchange":
					case "resize":
						this._resize();
						break;
					case "transitionend":
					case "webkitTransitionEnd":
					case "oTransitionEnd":
					case "MSTransitionEnd":
						this._transitionEnd(e);
						break;
					case "wheel":
					case "DOMMouseScroll":
					case "mousewheel":
						this._wheel(e);
						break;
					case "keydown":
						this._key(e);
						break;
					case "click":
						e._constructed || (e.preventDefault(), e.stopPropagation())
				}
			}
		}, u.prototype = {
			handleEvent: function(e) {
				switch (e.type) {
					case "touchstart":
					case "pointerdown":
					case "MSPointerDown":
					case "mousedown":
						this._start(e);
						break;
					case "touchmove":
					case "pointermove":
					case "MSPointerMove":
					case "mousemove":
						this._move(e);
						break;
					case "touchend":
					case "pointerup":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "pointercancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(e)
				}
			},
			destroy: function() {
				this.options.interactive && (i.removeEvent(this.indicator, "touchstart", this), i.removeEvent(this.indicator, i.prefixPointerEvent("pointerdown"), this), i.removeEvent(this.indicator, "mousedown", this), i.removeEvent(e, "touchmove", this), i.removeEvent(e, i.prefixPointerEvent("pointermove"), this), i.removeEvent(e, "mousemove", this), i.removeEvent(e, "touchend", this), i.removeEvent(e, i.prefixPointerEvent("pointerup"), this), i.removeEvent(e, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
			},
			_start: function(t) {
				var n = t.touches ? t.touches[0] : t;
				t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = n.pageX, this.lastPointY = n.pageY, this.startTime = i.getTime(), this.options.disableTouch || i.addEvent(e, "touchmove", this), this.options.disablePointer || i.addEvent(e, i.prefixPointerEvent("pointermove"), this), this.options.disableMouse || i.addEvent(e, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
			},
			_move: function(e) {
				var t = e.touches ? e.touches[0] : e,
					n, r, s, o, u = i.getTime();
				this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, n = t.pageX - this.lastPointX, this.lastPointX = t.pageX, r = t.pageY - this.lastPointY, this.lastPointY = t.pageY, s = this.x + n, o = this.y + r, this._pos(s, o), this.scroller.options.probeType == 1 && u - this.startTime > 300 ? (this.startTime = u, this.scroller._execEvent("scroll")) : this.scroller.options.probeType > 1 && this.scroller._execEvent("scroll"), e.preventDefault(), e.stopPropagation()
			},
			_end: function(t) {
				if (!this.initiated) return;
				this.initiated = !1, t.preventDefault(), t.stopPropagation(), i.removeEvent(e, "touchmove", this), i.removeEvent(e, i.prefixPointerEvent("pointermove"), this), i.removeEvent(e, "mousemove", this);
				if (this.scroller.options.snap) {
					var r = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
						s = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.scroller.x - r.x), 1e3), n.min(n.abs(this.scroller.y - r.y), 1e3)), 300);
					if (this.scroller.x != r.x || this.scroller.y != r.y) this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = r, this.scroller.scrollTo(r.x, r.y, s, this.scroller.options.bounceEasing)
				}
				this.moved && this.scroller._execEvent("scrollEnd")
			},
			transitionTime: function(e) {
				e = e || 0, this.indicatorStyle[i.style.transitionDuration] = e + "ms", !e && i.isBadAndroid && (this.indicatorStyle[i.style.transitionDuration] = "0.001s")
			},
			transitionTimingFunction: function(e) {
				this.indicatorStyle[i.style.transitionTimingFunction] = e
			},
			refresh: function() {
				this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (i.addClass(this.wrapper, "iScrollBothScrollbars"), i.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (i.removeClass(this.wrapper, "iScrollBothScrollbars"), i.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
				var e = this.wrapper.offsetHeight;
				this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = n.max(n.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.options.shrink == "clip" ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = n.max(n.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.options.shrink == "clip" ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
			},
			updatePosition: function() {
				var e = this.options.listenX && n.round(this.sizeRatioX * this.scroller.x) || 0,
					t = this.options.listenY && n.round(this.sizeRatioY * this.scroller.y) || 0;
				this.options.ignoreBoundaries || (e < this.minBoundaryX ? (this.options.shrink == "scale" && (this.width = n.max(this.indicatorWidth + e, 8), this.indicatorStyle.width = this.width + "px"), e = this.minBoundaryX) : e > this.maxBoundaryX ? this.options.shrink == "scale" ? (this.width = n.max(this.indicatorWidth - (e - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", e = this.maxPosX + this.indicatorWidth - this.width) : e = this.maxBoundaryX : this.options.shrink == "scale" && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), t < this.minBoundaryY ? (this.options.shrink == "scale" && (this.height = n.max(this.indicatorHeight + t * 3, 8), this.indicatorStyle.height = this.height + "px"), t = this.minBoundaryY) : t > this.maxBoundaryY ? this.options.shrink == "scale" ? (this.height = n.max(this.indicatorHeight - (t - this.maxPosY) * 3, 8), this.indicatorStyle.height = this.height + "px", t = this.maxPosY + this.indicatorHeight - this.height) : t = this.maxBoundaryY : this.options.shrink == "scale" && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = e, this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[i.style.transform] = "translate(" + e + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = e + "px", this.indicatorStyle.top = t + "px")
			},
			_pos: function(e, t) {
				e < 0 ? e = 0 : e > this.maxPosX && (e = this.maxPosX), t < 0 ? t = 0 : t > this.maxPosY && (t = this.maxPosY), e = this.options.listenX ? n.round(e / this.sizeRatioX) : this.scroller.x, t = this.options.listenY ? n.round(t / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(e, t)
			},
			fade: function(e, t) {
				if (t && !this.visible) return;
				clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
				var n = e ? 250 : 500,
					r = e ? 0 : 300;
				e = e ? "1" : "0", this.wrapperStyle[i.style.transitionDuration] = n + "ms", this.fadeTimeout = setTimeout(function(e) {
					this.wrapperStyle.opacity = e, this.visible = +e
				}.bind(this, e), r)
			}
		}, s.utils = i, typeof module != "undefined" && module.exports ? module.exports = s : e.IScroll = s
	}(window, document, Math), define("vendor/iscroll-probe", function() {}), define("sections/Home", ["oblio/utils/Inherit", "oblio/utils/SectionLoader", "oblio/classes/Section", "app/MarqueeApp", "vendor/iscroll-probe", "greensock/TweenLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min"], function() {
		"use strict";

		function s() {
			var e = oblio.settings.basePath;
			t = oblio.app.dataSrc.sections.home.data;
			var r = ["assets/images/marquee/backgrounds/map.png", "assets/images/marquee/backgrounds/bg-tile-blur.jpg", "assets/images/marquee/backgrounds/bg-tile-wireframe.png", "assets/images/marquee/backgrounds/podSprites.json"];
			r.length > 0 && n.addFiles("home", r), this.hideMenu = t.hideMenu
		}

		function u(t) {
			console.log("init " + e), this.elements = {
				sectionWrapper: document.getElementById(e.toLowerCase()),
				lineThing: document.getElementById("lineThing")
			}, isMobile.android.device && (this.elements.sectionWrapper.style["overflow-x"] = "hidden"), h.call(this), C.call(this);
			if (!isMobile.any) {
				this.buttons = document.getElementsByClassName("c-Button");
				for (var n = 0; n < this.buttons.length; n++) $(this.buttons[n]).on("mouseenter", l), $(this.buttons[n]).on("mouseleave", c);
				this.buttonsD = document.getElementsByClassName("d-Button");
				for (var n = 0; n < this.buttonsD.length; n++) $(this.buttonsD[n]).on("mouseenter", a), $(this.buttonsD[n]).on("mouseleave", f);
				this.elements.sectionWrapper.style.overflow = "hidden", p.call(this), this.scrollTargetEls = document.getElementsByClassName("partition"), this.targetPositions = N.apply(this, [this.scrollTargetEls, 0]), this.subTargetsA = document.getElementsByClassName("sub-el-dddd")
			}
			this.lastIndex = 0, t && t()
		}

		function a(e) {
			e.stopPropagation();
			var t = this.getElementsByClassName("button-text")[0],
				n = this.getElementsByClassName("button-border")[0],
				r = 0,
				i = .25,
				s = Power3.easeInOut,
				o = Power3.easeOut,
				u = new TimelineLite;
			u.to(n, .55, {
				scaleX: 1.1,
				ease: s
			}, r), u.to(t, i, {
				y: 9,
				alpha: 0,
				ease: o
			}, r), u.set(t, {
				y: -9,
				color: "#000000"
			}, i), u.to(t, i * 1.5, {
				y: 0,
				alpha: 1,
				ease: o
			}, i), u.play()
		}

		function f(e) {
			var t = this.getElementsByClassName("button-text")[0],
				n = this.getElementsByClassName("button-border")[0],
				r = 0,
				i = .25,
				s = Power3.easeInOut,
				o = Power3.easeOut,
				u = new TimelineLite;
			u.to(n, .55, {
				scaleX: 1,
				ease: s
			}, r), u.to(t, i, {
				y: -9,
				alpha: 0,
				ease: o
			}, r), u.set(t, {
				y: 9,
				color: "#494949"
			}, i), u.to(t, i * 1.5, {
				y: 0,
				alpha: 1,
				ease: o
			}, i), u.play()
		}

		function l(e) {
			var t = this.getElementsByClassName("button-text")[0],
				n = this.getElementsByClassName("bg-overlay")[0],
				r = 0,
				i = .25,
				s = Power3.easeInOut,
				o = Power3.easeOut,
				u = new TimelineLite;
			u.to(n, i, {
				scaleX: 1,
				ease: s
			}, r), u.to(t, i, {
				x: 20,
				alpha: 0,
				ease: o
			}, r), u.set(t, {
				x: -20,
				color: "#494949"
			}, i), u.to(t, i * 1.5, {
				x: 0,
				alpha: 1,
				ease: o
			}, i), u.play()
		}

		function c(e) {
			e.stopPropagation();
			var t = this.getElementsByClassName("button-text")[0],
				n = this.getElementsByClassName("bg-overlay")[0],
				r = 0,
				i = .25,
				s = Power3.easeInOut,
				o = Power3.easeOut,
				u = new TimelineLite;
			u.to(n, i, {
				scaleX: 0,
				ease: s
			}, r), u.to(t, i, {
				x: -20,
				alpha: 0,
				ease: o
			}, r), u.set(t, {
				x: 20,
				color: "#FFFFFF"
			}, i), u.to(t, i * 1.5, {
				x: 0,
				alpha: 1,
				ease: o
			}, i), u.play()
		}

		function h() {
			this.marqueeApp = new oblio.app.MarqueeApp, this.marqueeApp.init()
		}

		function p() {
			this.iscroll = new IScroll(this.elements.sectionWrapper, {
				mouseWheel: !0,
				probeType: 2
			}), this.iscroll.on("scroll", w.bind(this))
		}

		function w() {
			m = this.iscroll.y, d = g, y = Math.abs(m), b = T.apply(this, [y, this.targetPositions]), E.apply(this, [b, y]), v = m
		}

		function E(e, t) {
			this.lastIndex !== e && (S.apply(this, [this.lastIndex]), x.apply(this, [e]));
			var n = this.scrollTargetEls[e],
				r = this.subTargetsA[e],
				i = t - this.targetPositions[e].top,
				s = i / this.targetPositions[e].height,
				o = Math.floor(this.height * .05 * s);
			TweenLite.set(n, {
				y: o
			}), TweenLite.set(r, {
				y: -o * 4
			}), e === 0 && this.marqueeApp.movePositionManual(t), this.lastIndex = e
		}

		function S(e) {
			e === 0 && this.marqueeApp.hide()
		}

		function x(e) {
			e === 0 && this.marqueeApp.show()
		}

		function T(e, t) {
			var n = 0;
			for (var r = 0, i = t.length; r < i; r++) {
				if (e <= t[r].top) break;
				n = r
			}
			return n
		}

		function N(e, t) {
			var n = [],
				r;
			for (var i = 0, s = e.length; i < s; i++) r = e[i].getBoundingClientRect(), n[i] = {
				top: Math.abs(r.top - this.iscroll.y - t),
				height: r.height
			};
			return n
		}

		function C(e, t) {
			this.width = e ? e : window.innerWidth, this.height = t ? t : window.innerHeight, this.elements.sectionWrapper.style.height = $(window).height() + "px", this.marqueeApp.resize(this.width, this.height), this.iscroll && (this.iscroll.refresh(), this.targetPositions = N.apply(this, [this.scrollTargetEls, 0]))
		}
		var e = "Home",
			t, n = oblio.utils.SectionLoader,
			r = 100,
			i = r / 1e3,
			o = function() {
				console.log("hey there " + e), this.initialized = !1
			},
			d = Date.now(),
			v = 0,
			m, g, y, b;
		return oblio.utils.inherit(o, oblio.classes.Section), o.prototype.init = u, o.prototype.prepareLoad = s, o.prototype.resize = C, window.oblio = window.oblio || {}, oblio.sections = oblio.sections || {}, oblio.sections.home = new o, oblio.sections.home
	}), define("main", ["oblio/utils/SectionLoader", "oblio/utils/Preloader", "oblio/utils/ArrayExecuter", "oblio/utils/DeviceDetect", "oblio/classes/EventHandlers", "oblio/classes/Navigation", "oblio/classes/DefaultLoader", "app/DefaultLoader", "app/Menu", "app/Footer", "app/Shell", "app/BGRenderer", "app/BGManager", "greensock/TweenLite.min", "greensock/TimelineLite.min", "greensock/easing/EasePack.min", "greensock/plugins/CSSPlugin.min", "sections/Home"], function() {
		"use strict";

		function o() {
			i = {
				shell: $("#shell"),
				window: $(window)
			}, oblio.settings = oblio.settings || {}, oblio.settings.headerHeight = 28, oblio.settings.mpaaShown = !1, oblio.settings.footerHeight = 37, oblio.settings.minHeight = 0, oblio.settings.minWidth = 0, oblio.settings.windowDimensions = {
				width: i.shell.width(),
				height: i.shell.height()
			}, oblio.app.navigation = new oblio.classes.Navigation("mainContent"), oblio.classes.EventHandlers.init(), oblio.app.navigation.verbose = !0, window.onresize = d, window.onorientationchange = d, d();
			var e = [{
				fn: oblio.utils.SectionLoader.loadJSON,
				scope: oblio.utils.SectionLoader,
				vars: [oblio.settings.baseUrl + "json/" + oblio.settings.jsonFileName, t.stepComplete.bind(t)]
			}, {
				fn: u,
				vars: null
			}];
			t.execute(e)
		}

		function u() {
			var n = t.stepComplete.bind(t);
			s = new oblio.classes.DefaultLoader;
			for (var r in oblio.app.dataSrc.settings) oblio.app.dataSrc.settings.hasOwnProperty(r) && (oblio.settings[r] = oblio.app.dataSrc.settings[r], oblio.settings[r] && console.log("overriding " + r));
			oblio.app.BGRenderer = new oblio.app.BGRenderer("backgroundContainer"), oblio.app.BGManager = new oblio.app.BGManager(oblio.app.BGRenderer, oblio.app.dataSrc.backgrounds), oblio.app.BGManager.verbose = !0, a(), oblio.app.navigation.forceChange = !0, oblio.app.navigation.changeOrder = ["load", "section_add_next", "section_init_next", "section_startup_next", l, "section_show_next", p];
			var i = [{
				fn: e.addLoader,
				scope: e,
				vars: [s, n]
			}, {
				fn: oblio.app.navigation.load,
				scope: oblio.app.navigation,
				vars: [n]
			}, {
				fn: oblio.app.Shell.init,
				scope: oblio.app.Shell,
				vars: [n]
			}, {
				fn: oblio.app.navigation.changeSection,
				scope: oblio.app.navigation,
				vars: [oblio.app.navigation.currentSection, null, n]
			}, {
				fn: f
			}];
			t.execute(i)
		}

		function a() {
			var e;
			oblio.app.navigation.parseDeepLink(r), oblio.app.navigation.loadQueue(oblio.app.BGManager.getBg(oblio.app.navigation.currentSection, !0, !0)), oblio.app.navigation.loadQueue("main"), oblio.sections.videos === undefined && (oblio.app.dataSrc.settings.introTrailer = !1), oblio.app.dataSrc.settings.introTrailer && oblio.app.navigation.currentSection === "home" && (oblio.app.navigation.currentSection = "videos", oblio.sections.videos.introVideo = !0, oblio.sections.videos.defaultVideoIndex = oblio.app.dataSrc.settings.defaultVideoIndex, oblio.app.navigation.loadQueue("home")), oblio.app.navigation.loadQueue(oblio.app.navigation.currentSection)
		}

		function f() {
			console.log("siteIsIn!"), oblio.app.dataSrc.sections[oblio.app.navigation.currentSection].data.hideMenu || oblio.app.mainMenu && oblio.app.mainMenu.show(), oblio.app.navigation.changeOrder = [c, "load", "section_add_next", "section_init_next", "section_startup_next", l, "section_hide_prev", "section_shutdown_prev", "section_show_next", p]
		}

		function l(e, t, n) {
			h(e, t, n)
		}

		function c(e, t, n) {
			console.log("transitionPrepare " + e + " | " + t), oblio.app.navigation.loadQueue(oblio.app.BGManager.getBg(e, !0, !0)), n()
		}

		function h(e, t, n) {
			console.log("transitionStandard");
			var r = -oblio.settings.windowDimensions.height,
				i = oblio.settings.windowDimensions.height,
				s = oblio.sections[e];
			t !== e && t !== "" && (oblio.sections[t].hide ? oblio.sections[t].hide() : TweenLite.to("#" + t.toLowerCase(), .15, {
				alpha: 0,
				ease: Power4.easeInOut
			}));
			if (s.transitionIn) s.transitionIn(n);
			else {
				var o = document.getElementById(e.toLowerCase());
				TweenLite.fromTo("#" + e.toLowerCase(), 0, {
					y: i + "px",
					alpha: 0
				}, {
					y: "0px",
					ease: Power4.easeInOut,
					alpha: 1,
					onComplete: n
				}), window.requestAnimationFrame(function() {
					o.style.visibility = "visible"
				})
			}
		}

		function p(e, t, n) {
			oblio.app.navigation.currentSection !== "videos" && oblio.settings.mpaaShown === !1, oblio.app.mainMenu, n && n()
		}

		function d(e, t) {
			oblio.app.Shell.resize(), s && s.resize(), t && t()
		}
		window.oblio = window.oblio || {}, window.oblio.app = oblio.app || {};
		var e = oblio.utils.Preloader,
			t = new oblio.utils.ArrayExecuter,
			n = oblio.utils.SectionLoader,
			r = oblio.settings.deeplink,
			i, s;
		$(function() {
			oblio.app.main = new o
		})
	});