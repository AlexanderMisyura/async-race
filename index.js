/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 42:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var deepmerge = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = deepmerge(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var svg$1 = namespaces_1.svg;
var xlink$1 = namespaces_1.xlink;

var defaultConfig = {
  attrs: ( obj = {
    style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
    'aria-hidden': 'true'
  }, obj[svg$1.name] = svg$1.uri, obj[xlink$1.name] = xlink$1.uri, obj )
};
var obj;

var Sprite = function Sprite(config) {
  this.config = deepmerge(defaultConfig, config || {});
  this.symbols = [];
};

/**
 * Add new symbol. If symbol with the same id exists it will be replaced.
 * @param {SpriteSymbol} symbol
 * @return {boolean} `true` - symbol was added, `false` - replaced
 */
Sprite.prototype.add = function add (symbol) {
  var ref = this;
    var symbols = ref.symbols;
  var existing = this.find(symbol.id);

  if (existing) {
    symbols[symbols.indexOf(existing)] = symbol;
    return false;
  }

  symbols.push(symbol);
  return true;
};

/**
 * Remove symbol & destroy it
 * @param {string} id
 * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
 */
Sprite.prototype.remove = function remove (id) {
  var ref = this;
    var symbols = ref.symbols;
  var symbol = this.find(id);

  if (symbol) {
    symbols.splice(symbols.indexOf(symbol), 1);
    symbol.destroy();
    return true;
  }

  return false;
};

/**
 * @param {string} id
 * @return {SpriteSymbol|null}
 */
Sprite.prototype.find = function find (id) {
  return this.symbols.filter(function (s) { return s.id === id; })[0] || null;
};

/**
 * @param {string} id
 * @return {boolean}
 */
Sprite.prototype.has = function has (id) {
  return this.find(id) !== null;
};

/**
 * @return {string}
 */
Sprite.prototype.stringify = function stringify () {
  var ref = this.config;
    var attrs = ref.attrs;
  var stringifiedSymbols = this.symbols.map(function (s) { return s.stringify(); }).join('');
  return wrapInSvgString(stringifiedSymbols, attrs);
};

/**
 * @return {string}
 */
Sprite.prototype.toString = function toString () {
  return this.stringify();
};

Sprite.prototype.destroy = function destroy () {
  this.symbols.forEach(function (s) { return s.destroy(); });
};

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

/**
 * @param {string} content
 * @return {Element}
 */
var parse = function (content) {
  var hasImportNode = !!document.importNode;
  var doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
};

var BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
  function BrowserSpriteSymbol () {
    SpriteSymbol$$1.apply(this, arguments);
  }

  if ( SpriteSymbol$$1 ) BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1;
  BrowserSpriteSymbol.prototype = Object.create( SpriteSymbol$$1 && SpriteSymbol$$1.prototype );
  BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol;

  var prototypeAccessors = { isMounted: {} };

  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  };

  BrowserSpriteSymbol.prototype.destroy = function destroy () {
    if (this.isMounted) {
      this.unmount();
    }
    SpriteSymbol$$1.prototype.destroy.call(this);
  };

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.mount = function mount (target) {
    if (this.isMounted) {
      return this.node;
    }

    var mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    var node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.render = function render () {
    var content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  };

  BrowserSpriteSymbol.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  Object.defineProperties( BrowserSpriteSymbol.prototype, prototypeAccessors );

  return BrowserSpriteSymbol;
}(SpriteSymbol));

var defaultConfig$1 = {
  /**
   * Should following options be automatically configured:
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @type {boolean}
   */
  autoConfigure: true,

  /**
   * Default mounting selector
   * @type {string}
   */
  mountTo: 'body',

  /**
   * Fix disappearing SVG elements when <base href> exists.
   * Executes when sprite mounted.
   * @see http://stackoverflow.com/a/18265336/796152
   * @see https://github.com/everdimension/angular-svg-base-fix
   * @see https://github.com/angular/angular.js/issues/8934#issuecomment-56568466
   * @type {boolean}
   */
  syncUrlsWithBaseTag: false,

  /**
   * Should sprite listen custom location change event
   * @type {boolean}
   */
  listenLocationChangeEvent: true,

  /**
   * Custom window event name which should be emitted to update sprite urls
   * @type {string}
   */
  locationChangeEvent: 'locationChange',

  /**
   * Emit location change event in Angular automatically
   * @type {boolean}
   */
  locationChangeAngularEmitter: false,

  /**
   * Selector to find symbols usages when updating sprite urls
   * @type {string}
   */
  usagesToUpdate: 'use[*|href]',

  /**
   * Fix Firefox bug when gradients and patterns don't work if they are within a symbol.
   * Executes when sprite is rendered, but not mounted.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=306674
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1235364
   * @type {boolean}
   */
  moveGradientsOutsideSymbol: false
};

/**
 * @param {*} arrayLike
 * @return {Array}
 */
var arrayFrom = function (arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
};

var browser = {
  isChrome: function () { return /chrome/i.test(navigator.userAgent); },
  isFirefox: function () { return /firefox/i.test(navigator.userAgent); },

  // https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
  isIE: function () { return /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent); },
  isEdge: function () { return /edge/i.test(navigator.userAgent); }
};

/**
 * @param {string} name
 * @param {*} data
 */
var dispatchEvent = function (name, data) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(name, false, false, data);
  window.dispatchEvent(event);
};

/**
 * IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
 * This trick will trigger IE to read and use any existing SVG <style> tags.
 * @see https://github.com/iconic/SVGInjector/issues/23
 * @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
 *
 * @param {Element} node DOM Element to search <style> tags in
 * @return {Array<HTMLStyleElement>}
 */
var evalStylesIEWorkaround = function (node) {
  var updatedNodes = [];

  arrayFrom(node.querySelectorAll('style'))
    .forEach(function (style) {
      style.textContent += '';
      updatedNodes.push(style);
    });

  return updatedNodes;
};

/**
 * @param {string} [url] If not provided - current URL will be used
 * @return {string}
 */
var getUrlWithoutFragment = function (url) {
  return (url || window.location.href).split('#')[0];
};

/* global angular */
/**
 * @param {string} eventName
 */
var locationChangeAngularEmitter = function (eventName) {
  angular.module('ng').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (e, newUrl, oldUrl) {
      dispatchEvent(eventName, { oldUrl: oldUrl, newUrl: newUrl });
    });
  }]);
};

var defaultSelector = 'linearGradient, radialGradient, pattern, mask, clipPath';

/**
 * @param {Element} svg
 * @param {string} [selector]
 * @return {Element}
 */
var moveGradientsOutsideSymbol = function (svg, selector) {
  if ( selector === void 0 ) selector = defaultSelector;

  arrayFrom(svg.querySelectorAll('symbol')).forEach(function (symbol) {
    arrayFrom(symbol.querySelectorAll(selector)).forEach(function (node) {
      symbol.parentNode.insertBefore(node, symbol);
    });
  });
  return svg;
};

/**
 * @param {NodeList} nodes
 * @param {Function} [matcher]
 * @return {Attr[]}
 */
function selectAttributes(nodes, matcher) {
  var attrs = arrayFrom(nodes).reduce(function (acc, node) {
    if (!node.attributes) {
      return acc;
    }

    var arrayfied = arrayFrom(node.attributes);
    var matched = matcher ? arrayfied.filter(matcher) : arrayfied;
    return acc.concat(matched);
  }, []);

  return attrs;
}

/**
 * @param {NodeList|Node} nodes
 * @param {boolean} [clone=true]
 * @return {string}
 */

var xLinkNS = namespaces_1.xlink.uri;
var xLinkAttrName = 'xlink:href';

// eslint-disable-next-line no-useless-escape
var specialUrlCharsPattern = /[{}|\\\^\[\]`"<>]/g;

function encoder(url) {
  return url.replace(specialUrlCharsPattern, function (match) {
    return ("%" + (match[0].charCodeAt(0).toString(16).toUpperCase()));
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/**
 * @param {NodeList} nodes
 * @param {string} startsWith
 * @param {string} replaceWith
 * @return {NodeList}
 */
function updateReferences(nodes, startsWith, replaceWith) {
  arrayFrom(nodes).forEach(function (node) {
    var href = node.getAttribute(xLinkAttrName);
    if (href && href.indexOf(startsWith) === 0) {
      var newUrl = href.replace(startsWith, replaceWith);
      node.setAttributeNS(xLinkNS, xLinkAttrName, newUrl);
    }
  });

  return nodes;
}

/**
 * List of SVG attributes to update url() target in them
 */
var attList = [
  'clipPath',
  'colorProfile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'markerStart',
  'markerMid',
  'markerEnd',
  'mask',
  'stroke',
  'style'
];

var attSelector = attList.map(function (attr) { return ("[" + attr + "]"); }).join(',');

/**
 * Update URLs in svg image (like `fill="url(...)"`) and update referencing elements
 * @param {Element} svg
 * @param {NodeList} references
 * @param {string|RegExp} startsWith
 * @param {string} replaceWith
 * @return {void}
 *
 * @example
 * const sprite = document.querySelector('svg.sprite');
 * const usages = document.querySelectorAll('use');
 * updateUrls(sprite, usages, '#', 'prefix#');
 */
var updateUrls = function (svg, references, startsWith, replaceWith) {
  var startsWithEncoded = encoder(startsWith);
  var replaceWithEncoded = encoder(replaceWith);

  var nodes = svg.querySelectorAll(attSelector);
  var attrs = selectAttributes(nodes, function (ref) {
    var localName = ref.localName;
    var value = ref.value;

    return attList.indexOf(localName) !== -1 && value.indexOf(("url(" + startsWithEncoded)) !== -1;
  });

  attrs.forEach(function (attr) { return attr.value = attr.value.replace(new RegExp(escapeRegExp(startsWithEncoded), 'g'), replaceWithEncoded); });
  updateReferences(references, startsWithEncoded, replaceWithEncoded);
};

/**
 * Internal emitter events
 * @enum
 * @private
 */
var Events = {
  MOUNT: 'mount',
  SYMBOL_MOUNT: 'symbol_mount'
};

var BrowserSprite = (function (Sprite$$1) {
  function BrowserSprite(cfg) {
    var this$1 = this;
    if ( cfg === void 0 ) cfg = {};

    Sprite$$1.call(this, deepmerge(defaultConfig$1, cfg));

    var emitter = mitt();
    this._emitter = emitter;
    this.node = null;

    var ref = this;
    var config = ref.config;

    if (config.autoConfigure) {
      this._autoConfigure(cfg);
    }

    if (config.syncUrlsWithBaseTag) {
      var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
      emitter.on(Events.MOUNT, function () { return this$1.updateUrls('#', baseUrl); });
    }

    var handleLocationChange = this._handleLocationChange.bind(this);
    this._handleLocationChange = handleLocationChange;

    // Provide way to update sprite urls externally via dispatching custom window event
    if (config.listenLocationChangeEvent) {
      window.addEventListener(config.locationChangeEvent, handleLocationChange);
    }

    // Emit location change event in Angular automatically
    if (config.locationChangeAngularEmitter) {
      locationChangeAngularEmitter(config.locationChangeEvent);
    }

    // After sprite mounted
    emitter.on(Events.MOUNT, function (spriteNode) {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(spriteNode);
      }
    });

    // After symbol mounted into sprite
    emitter.on(Events.SYMBOL_MOUNT, function (symbolNode) {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(symbolNode.parentNode);
      }

      if (browser.isIE() || browser.isEdge()) {
        evalStylesIEWorkaround(symbolNode);
      }
    });
  }

  if ( Sprite$$1 ) BrowserSprite.__proto__ = Sprite$$1;
  BrowserSprite.prototype = Object.create( Sprite$$1 && Sprite$$1.prototype );
  BrowserSprite.prototype.constructor = BrowserSprite;

  var prototypeAccessors = { isMounted: {} };

  /**
   * @return {boolean}
   */
  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
  BrowserSprite.prototype._autoConfigure = function _autoConfigure (cfg) {
    var ref = this;
    var config = ref.config;

    if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
      config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined';
    }

    if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
        config.locationChangeAngularEmitter = typeof window.angular !== 'undefined';
    }

    if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
      config.moveGradientsOutsideSymbol = browser.isFirefox();
    }
  };

  /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
  BrowserSprite.prototype._handleLocationChange = function _handleLocationChange (event) {
    var ref = event.detail;
    var oldUrl = ref.oldUrl;
    var newUrl = ref.newUrl;
    this.updateUrls(oldUrl, newUrl);
  };

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  BrowserSprite.prototype.add = function add (symbol) {
    var sprite = this;
    var isNewSymbol = Sprite$$1.prototype.add.call(this, symbol);

    if (this.isMounted && isNewSymbol) {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    }

    return isNewSymbol;
  };

  /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
  BrowserSprite.prototype.attach = function attach (target) {
    var this$1 = this;

    var sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    /** @type Element */
    var node = typeof target === 'string' ? document.querySelector(target) : target;
    sprite.node = node;

    // Already added symbols needs to be mounted
    this.symbols.forEach(function (symbol) {
      symbol.mount(sprite.node);
      this$1._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    });

    // Create symbols from existing DOM nodes, add and mount them
    arrayFrom(node.querySelectorAll('symbol'))
      .forEach(function (symbolNode) {
        var symbol = BrowserSpriteSymbol.createFromExistingNode(symbolNode);
        symbol.node = symbolNode; // hack to prevent symbol mounting to sprite when adding
        sprite.add(symbol);
      });

    this._emitter.emit(Events.MOUNT, node);

    return node;
  };

  BrowserSprite.prototype.destroy = function destroy () {
    var ref = this;
    var config = ref.config;
    var symbols = ref.symbols;
    var _emitter = ref._emitter;

    symbols.forEach(function (s) { return s.destroy(); });

    _emitter.off('*');
    window.removeEventListener(config.locationChangeEvent, this._handleLocationChange);

    if (this.isMounted) {
      this.unmount();
    }
  };

  /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
  BrowserSprite.prototype.mount = function mount (target, prepend) {
    if ( target === void 0 ) target = this.config.mountTo;
    if ( prepend === void 0 ) prepend = false;

    var sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    var mountNode = typeof target === 'string' ? document.querySelector(target) : target;
    var node = sprite.render();
    this.node = node;

    if (prepend && mountNode.childNodes[0]) {
      mountNode.insertBefore(node, mountNode.childNodes[0]);
    } else {
      mountNode.appendChild(node);
    }

    this._emitter.emit(Events.MOUNT, node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSprite.prototype.render = function render () {
    return parse(this.stringify());
  };

  /**
   * Detach sprite from the DOM
   */
  BrowserSprite.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
  BrowserSprite.prototype.updateUrls = function updateUrls$1 (oldUrl, newUrl) {
    if (!this.isMounted) {
      return false;
    }

    var usages = document.querySelectorAll(this.config.usagesToUpdate);

    updateUrls(
      this.node,
      usages,
      ((getUrlWithoutFragment(oldUrl)) + "#"),
      ((getUrlWithoutFragment(newUrl)) + "#")
    );

    return true;
  };

  Object.defineProperties( BrowserSprite.prototype, prototypeAccessors );

  return BrowserSprite;
}(Sprite));

var ready$1 = createCommonjsModule(function (module) {
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  { module.exports = definition(); }

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);


  if (!loaded)
  { doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) { listener(); }
  }); }

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }

});
});

var spriteNodeId = '__SVG_SPRITE_NODE__';
var spriteGlobalVarName = '__SVG_SPRITE__';
var isSpriteExists = !!window[spriteGlobalVarName];

// eslint-disable-next-line import/no-mutable-exports
var sprite;

if (isSpriteExists) {
  sprite = window[spriteGlobalVarName];
} else {
  sprite = new BrowserSprite({
    attrs: {
      id: spriteNodeId,
      'aria-hidden': 'true'
    }
  });
  window[spriteGlobalVarName] = sprite;
}

var loadSprite = function () {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  var existing = document.getElementById(spriteNodeId);

  if (existing) {
    sprite.attach(existing);
  } else {
    sprite.mount(document.body, true);
  }
};

if (document.body) {
  loadSprite();
} else {
  ready$1(loadSprite);
}

var sprite$1 = sprite;

return sprite$1;

})));


/***/ }),

/***/ 897:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

/**
 * @param {string} content
 * @return {Element}
 */
var parse = function (content) {
  var hasImportNode = !!document.importNode;
  var doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var deepmerge = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = deepmerge(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
  function BrowserSpriteSymbol () {
    SpriteSymbol$$1.apply(this, arguments);
  }

  if ( SpriteSymbol$$1 ) BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1;
  BrowserSpriteSymbol.prototype = Object.create( SpriteSymbol$$1 && SpriteSymbol$$1.prototype );
  BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol;

  var prototypeAccessors = { isMounted: {} };

  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  };

  BrowserSpriteSymbol.prototype.destroy = function destroy () {
    if (this.isMounted) {
      this.unmount();
    }
    SpriteSymbol$$1.prototype.destroy.call(this);
  };

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.mount = function mount (target) {
    if (this.isMounted) {
      return this.node;
    }

    var mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    var node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.render = function render () {
    var content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  };

  BrowserSpriteSymbol.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  Object.defineProperties( BrowserSpriteSymbol.prototype, prototypeAccessors );

  return BrowserSpriteSymbol;
}(SpriteSymbol));

return BrowserSpriteSymbol;

})));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/alexandermisyura-JSFE2024Q4/async-race/";
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

;// ./src/app/components/base-component.ts
const ZERO_LENGTH = 0;
class BaseComponent {
    childComponents = [];
    parentComponent = undefined;
    element;
    constructor(properties, ...children) {
        const { elementTag, text, classes, ...rest } = properties;
        this.element = document.createElement(elementTag);
        if (children.length > ZERO_LENGTH) {
            this.appendChildren(...children);
        }
        if (text) {
            this.setText(text);
        }
        if (classes && classes.length > ZERO_LENGTH) {
            this.addClasses(...classes);
        }
        Object.assign(this.element, rest);
    }
    appendChildren(...children) {
        for (const child of children)
            this.appendSingle(child);
        return this;
    }
    appendSingle(child) {
        this.element.append(child.getElement());
        this.childComponents.push(child);
        child.parentComponent = this;
        return this;
    }
    getElement() {
        return this.element;
    }
    removeSelf() {
        this.removeChildren();
        this.element.remove();
        if (this.parentComponent) {
            this.parentComponent.childComponents =
                this.parentComponent.childComponents.filter((child) => child !== this);
        }
    }
    removeChildren() {
        for (const child of this.childComponents)
            child.removeSelf();
        this.childComponents.length = 0;
        return this;
    }
    addClasses(...classes) {
        this.element.classList.add(...classes);
        return this;
    }
    removeClasses(...classes) {
        this.element.classList.remove(...classes);
        return this;
    }
    toggleClasses(...classes) {
        for (const className of classes) {
            this.element.classList.toggle(className);
        }
        return this;
    }
    setText(text) {
        this.element.textContent = text;
        return this;
    }
    addListener(eventType, handler, options) {
        this.element.addEventListener(eventType, handler, options);
        return this;
    }
    removeListener(eventType, handler) {
        this.element.removeEventListener(eventType, handler);
        return this;
    }
}

;// ./src/app/components/utility-components.ts

const span = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'span' }, ...children);
const div = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'div' }, ...children);
const h1 = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'h1' }, ...children);
const input = (properties) => new BaseComponent({ ...properties, elementTag: 'input' });
const a = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'a' }, ...children);
const label = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'label' }, ...children);
const img = (properties) => new BaseComponent({ ...properties, elementTag: 'img' });
const utility_components_button = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'button' }, ...children);
const details = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'details' }, ...children);
const summary = (properties) => new BaseComponent({ ...properties, elementTag: 'summary' });
const ul = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'ul' }, ...children);
const li = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'li' }, ...children);
const utility_components_textarea = (properties) => new BaseComponent({ ...properties, elementTag: 'textarea' });
/* harmony default export */ const utility_components = ({
    span,
    div,
    h1,
    input,
    label,
    a,
    img,
    button: utility_components_button,
    details,
    summary,
    ul,
    li,
    textarea: utility_components_textarea,
});

;// ./src/app/components/modal/modal.module.scss
// extracted by mini-css-extract-plugin
var _1 = "GBw_RoBD";
var _2 = "fc5Krxn2";
var _3 = "DjsQZilJ";


;// ./src/app/components/modal/modal.ts



class Modal extends BaseComponent {
    modalControls = {
        showModal: this.showModal.bind(this),
        closeModal: this.closeModal.bind(this),
        closeModalButton: utility_components.button({
            text: 'Hail !!!',
            classes: ['button', _1],
            onclick: this.closeModal.bind(this),
        }),
    };
    content;
    closeButton = this.modalControls.closeModalButton;
    isOpen = false;
    constructor() {
        super({ elementTag: 'dialog', classes: [_3] });
        this.addListeners();
    }
    showModal(component, closeText, closeCallback) {
        if (this.isOpen)
            return;
        this.isOpen = true;
        this.createModal(closeText, closeCallback);
        document.body.append(this.getElement());
        if (this.content) {
            this.content.appendSingle(component);
        }
        this.element.showModal();
    }
    showNoServer(callback) {
        this.showModal(utility_components.div({}, utility_components.div({
            text: 'This app only works with a server running locally.',
        }), utility_components.a({
            text: 'Start the server',
            href: 'https://github.com/mikhama/async-race-api',
            target: '_blank',
        }), utility_components.div({
            text: 'And try again.',
        })), 'Retry', callback);
    }
    addListeners() {
        this.addListener('click', (event) => {
            if (event.target === event.currentTarget)
                this.element.close();
        });
        this.addListener('close', () => {
            this.content?.removeSelf();
            this.getElement().remove();
        });
    }
    createModal(closeText, closeCallback) {
        this.content = utility_components.div({ classes: [_2] });
        this.closeButton =
            closeText && closeCallback
                ? utility_components.button({
                    text: closeText,
                    classes: ['button', _1],
                    onclick: (event) => {
                        this.closeModal(event);
                        closeCallback();
                    },
                })
                : this.modalControls.closeModalButton;
        this.appendChildren(this.content, this.closeButton);
    }
    closeModal(event) {
        event.preventDefault();
        this.isOpen = false;
        this.getElement().close();
        this.content?.removeSelf();
        this.closeButton.removeSelf();
        this.getElement().remove();
    }
}
const modal = new Modal();

;// ./src/app/components/create-svg-chunk.ts
function createSvgChunk(svgChunk, classes) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add(...classes);
    svg.setAttribute('viewBox', svgChunk.viewBox);
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${svgChunk.id}`);
    svg.append(use);
    return svg;
}

// EXTERNAL MODULE: ./node_modules/svg-baker-runtime/browser-symbol.js
var browser_symbol = __webpack_require__(897);
var browser_symbol_default = /*#__PURE__*/__webpack_require__.n(browser_symbol);
// EXTERNAL MODULE: ./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js
var browser_sprite_build = __webpack_require__(42);
var browser_sprite_build_default = /*#__PURE__*/__webpack_require__.n(browser_sprite_build);
;// ./src/app/assets/img/guitar.svg


var symbol = new (browser_symbol_default())({
  "id": "guitar",
  "use": "guitar-usage",
  "viewBox": "0 0 800 600.7",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 600.7\" id=\"guitar\"><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M129.22,406.73c-2.48,.96-4.72,1.82-7.11,2.74l-1-2.59c-.52,.28-1.02,.56-1.81,.99-.7-1.53-1.35-2.98-2.04-4.5l2.16-1.35c-.43-.89-.83-1.72-.96-1.99-1.43-.16-2.39-.27-3.37-.38,.85-1.31,1.35-2.1,1.86-2.89l-2.75,.26,1.41-3.25c-.62-.48-1.63-1.22-2.58-2.03-.29-.25-.66-.84-.56-1.01,.29-.48,.81-.82,1.4-1.36l-1.18-2.46c2.47-1.04,4.84-2.03,7.3-3.06-.92-5.27-1.68-11.08-2.98-16.76-4.88-21.29-1.55-41.49,7.32-61.15,6.46-14.31,13.45-28.28,23.36-40.57,13.04-16.16,29.72-26.21,50.26-29.59,3.05-.5,6.23-.33,9.34-.32,31.56,.04,63.11,.14,94.67,.12,1.58,0,3.41-.58,4.71-1.48,27.96-19.38,55.86-38.85,83.78-58.3,.33-.23,.72-.38,1.33-.69-1.48,8.15-2.9,16.02-4.33,23.9l.58,.21c1.8-3.87,3.59-7.74,5.39-11.61l.56,.18c-.84,3.15-1.62,6.31-2.52,9.44-4.99,17.25-10.08,34.47-14.97,51.75-2.03,7.18,.35,12.45,6.57,14.85,1.58,.61,3.78,.65,5.38,.07,17.68-6.46,35.28-13.15,52.95-19.65,49.21-18.1,98.42-36.23,147.71-54.09,6.84-2.48,12.35-6.45,17.54-11.2,1.53-1.4,3.24-2.68,4.52-4.29,3.69-4.62,8.52-6.81,14.27-7.29,.5-.04,.98-.27,2.38-.68-2.77-2.78-5.04-5.29-7.56-7.52-2.47-2.2-2.58-2.11-.56-4.63,.38-.47,.91-.94,1.03-1.48,.76-3.49,3.93-3.92,6.46-5.1,1.91-.89,2.84,.22,3.37,1.99,.58,1.94,1.31,3.83,1.87,5.42-1.07,3.27-2.14,6.51-3.2,9.76l.77,.54c5.79-1.84,11.58-3.68,17.54-5.58-1.67-3.4-4.01-6.05-6.92-8.27-2.68-2.04-2.66-2.35-.43-4.78,.35-.38,.84-.76,.95-1.22,.78-3.28,3.77-3.87,6.2-5.06,1.81-.89,3.09-.38,3.66,1.79,.51,1.95,1.35,3.82,2.16,6.04-.65,1.2-1.76,2.76-2.37,4.5-.61,1.74-.7,3.66-1.1,5.98,6.2-2.07,11.87-3.96,17.62-5.87-1.4-3.66-3.99-6.15-6.9-8.39-2.35-1.8-2.36-2.2-.41-4.48,.5-.59,1.13-1.19,1.35-1.89,.96-3.18,3.97-3.56,6.35-4.67,1.52-.71,2.55,.17,3.01,1.85,.56,2.04,1.36,4.01,1.9,5.58l-3.19,10.2,.83,.58c8.18-3.04,16.35-6.08,24.79-9.22,.52,6.66,1.18,13.02,1.45,19.41,.15,3.53,1.23,6.57,3.12,9.45,3.32,5.07,6.61,10.16,9.9,15.24,.59,.92,1.13,1.86,1.67,2.75-7.07,2.23-13.94,4.4-20.81,6.57-.04,.33-.08,.67-.13,1,1.65,1.15,3.29,2.33,4.96,3.44,.42,.28,1.02,.27,1.44,.55,.56,.37,1.55,1.13,1.46,1.31-1.27,2.73,4.08,4.95,.33,8.08-2.25,1.88-4.23,3.74-7.17,4.47-2.09,.52-3.59,.53-4.13-1.93-.05-.25-.18-.49-.3-.72-1.5-2.96-1.9-5.56,.68-8.46,1.18-1.33,.87-4,1.23-6.06l-.73-.47c-6.17,2.49-12.34,4.99-18.51,7.48-.11,.26-.23,.52-.34,.77,1.89,1.14,3.77,2.28,5.68,3.4,.2,.12,.61-.02,.75,.12,.47,.5,1.35,1.25,1.22,1.6-.94,2.56,3.69,4.67,.4,7.48-2.27,1.94-4.29,3.92-7.4,4.62-2.5,.57-3.5,.4-4.27-2.08-.15-.49-.2-1.04-.43-1.49-1.29-2.47-1.41-4.51,.64-6.95,1.23-1.47,1.11-4.06,1.6-6.14l-.83-.44c-6.2,2.52-12.41,5.04-19.56,7.95,2.51,1.45,4.47,2.49,6.31,3.71,.78,.52,1.35,1.4,1.94,2.17,.18,.24,.11,.67,.18,1.01,.43,2.15-.5,6.13-1.8,7.96-1.88,2.64-5.02,2.14-7.6,3-.36,.12-1.46-1.24-1.83-2.08-.79-1.8-1.33-3.7-2.03-5.72,2.14-2.51,4.32-5.21,3.16-9.36-3.01,1.36-5.75,2.78-8.63,3.84-1.89,.7-3.98,1.2-5.98,1.22-5.63,.05-11.27-.18-16.9-.32-4.82-.12-9.37,.69-13.87,2.64-34.65,14.98-69.35,29.85-104.06,44.7-26.29,11.25-52.64,22.36-78.88,33.71-3.08,1.33-5.86,3.6-8.44,5.82-4.72,4.06-9.2,8.41-14.02,12.87,17.05,18.1,33.35,35.4,49.94,53-7.45,.76-14.5,1.48-21.54,2.2l-.14,.36c10.61,3.11,21.21,6.21,31.82,9.32l-.09,.37c-3.32,0-6.65,.04-9.97,0-30.34-.47-60.67-.98-91.01-1.39-1.11-.01-2.57,.58-3.3,1.39-15.33,17.21-30.58,34.49-45.84,51.76-7,7.92-13.75,16.08-21.1,23.66-6.95,7.17-15.67,12.08-24.87,15.67-29.73,11.6-57.56,8.53-83-11.6-16.89-13.37-29.92-29.95-41.07-48.17-1.75-2.86-3.38-5.8-5.06-8.7Zm481.56-216.93l18.06-7.6c-.11-.24-.21-.49-.32-.73-4.35,1.97-8.71,3.92-13.04,5.93-1.59,.74-3.11,1.63-4.66,2.45-5.63,2.39-11.27,4.79-16.9,7.18,.12,.27,.25,.54,.37,.81,5.49-2.68,10.99-5.36,16.48-8.04Zm-316.6,142.92c1.35-.51,2.69-1.03,4.03-1.54,1.27,3.12,2.45,6.04,3.64,8.95,14.31-5.91,28.39-11.72,42.89-17.7-2.34-2.1-.82-5.86-4.22-6.97,1.27-3.17-1.63-5.13-2.32-7.75-.71-2.7-2.09-5.21-3.28-8.03,1.54-.46,2.89-.86,4.28-1.28,1.42,2.41,1.59,4.97,2.84,7.2,2,3.58,3.19,7.58,5.11,11.24,1.12,2.14,1.98,4.41,3.05,6.57,1.66,3.37,3.24,3.98,6.71,2.62,2.33-.91,4.61-1.94,6.93-2.89,4.16-1.71,4.96-3.51,3.21-7.64-1.77-4.19-3.6-8.35-5.43-12.57l1.96-1.28c.88-.33,1.77-.67,2.65-1,.65,.45,1.61,.77,1.89,1.39,1.27,2.77,2.35,5.64,3.6,8.73,74.64-30.92,149.03-61.74,223.65-92.65-3.42-7.97-6.76-15.76-10.19-23.75-77.61,28.48-155.2,56.95-232.88,85.45-.93-2.16-1.77-4.03-2.54-5.94-.91-2.27-2.77-3.09-4.82-2.33-3.47,1.28-6.82,2.9-10.12,4.57-2.49,1.26-2.9,3.45-1.98,5.98,.49,1.35,.92,2.71,1.36,4.04l-3.25,1.39,.08-.07c-.7-.4-1.76-.64-2.05-1.24-1.53-3.19-2.91-6.45-4.25-9.73-.98-2.41-.43-3.63,2.04-4.68,7.23-3.08,14.43-6.25,21.75-9.11,2.57-1,3.5-2.48,3.74-5.09,.46-4.9,1.24-9.77,1.88-14.65,.43-3.24,.85-6.48,1.29-9.88-14.73,13.29-29.15,26.3-43.58,39.32l-.63-.69c14.86-14.38,29.71-28.76,44.57-43.14l.52,.41c-.68,10.23-1.36,20.47-2.03,30.7l.77-.42c1.09,1.34,2.47,2.53,3.2,4.04,1.52,3.15,2.69,6.46,4.05,9.83,2.84-1.07,5.34-1.99,7.83-2.95,2.53-.97,5.04-1.98,7.74-3.04-9.42-6.26-11.39-11.46-8.56-22.2,3.96-15.02,7.93-30.03,11.89-45.05,1.1-4.18,2.17-8.36,3.34-12.86-.64,.29-.89,.36-1.09,.5-24.76,17.6-49.52,35.18-74.24,52.83-2.08,1.49-4.19,2.11-6.73,2.08-31.46-.4-62.93-.7-94.39-1.11-8.6-.11-16.89,1.34-24.86,4.47-19.45,7.64-33.1,21.64-43.05,39.59-7.39,13.34-11.29,27.79-13.16,42.84-.94,7.58-1.75,15.21-.33,22.77,2.78,14.82,7.85,28.79,16.34,41.41,11.18,16.63,24.31,31.3,41.53,41.94,11.46,7.08,23.79,11.33,37.36,11.84,16.53,.63,31.67-3.82,45.63-12.38,9.09-5.57,18.2-11.37,24.62-20.08,14.43-19.58,28.53-39.41,42.68-59.2,1.04-1.45,2.03-2,3.78-1.99,20.28,.06,40.57,.05,60.85,.06,1.26,0,2.51,0,4.26,0-9.26-8.95-19.3-16.39-25.42-27.48-8.25,3.49-16.36,6.9-24.46,10.35-3.25,1.39-3.95,1.13-5.26-2.12-1.3-3.23-2.59-6.46-3.92-9.77-14.26,5.92-28.19,11.7-42.36,17.57,1.51,3.62,2.89,6.87,4.23,10.13,1.01,2.47,.48,3.77-1.87,4.74-9.01,3.73-18.02,7.47-27.04,11.17-.78,.32-1.62,.52-2.45,.66-1.39,.24-2.9,.11-4.17,.61-10.45,4.11-20.85,8.32-31.44,12.57-8.26-19.9-16.48-39.71-24.75-59.62,11.52-4.64,22.7-9.15,33.99-13.7-.5-1.11-.89-1.96-1.27-2.82-1.71-3.88-1.24-4.89,2.59-6.47,8.54-3.54,17.06-7.15,25.57-10.76,2.92-1.24,4.18-.73,5.4,2.25,1.56,3.84,3.06,7.71,4.75,11.49,.6,1.33,.69,2.29-.54,3.17-1.25,.37-2.49,.75-3.74,1.12-1.21,.14-2.07,.05-2.34-1.55-.2-1.23-.92-2.42-1.6-3.51-1.24-2.01-3.12-2.8-5.35-1.95-3.54,1.35-7.07,2.76-10.5,4.37-2.97,1.4-3.45,2.99-2.27,6.16,.47,1.25,1.03,2.46,1.6,3.79-2.72,1.1-5.22,2.11-7.71,3.12l.22,.57c2.58-.99,5.15-1.98,7.79-2.99,.93,2.24,1.74,4.19,2.57,6.2-2.74,1.07-5.27,2.06-7.79,3.05l.27,.66c2.52-.99,5.03-1.98,7.69-3.03,1.03,2.21,1.96,4.19,2.92,6.24-2.86,1.08-5.49,2.06-8.12,3.05l.27,.69c2.69-.98,5.39-1.95,8.13-2.94,1.65,3.9,3.23,7.58,4.75,11.28,1.98,4.8,3.84,9.66,5.88,14.43,1.2,2.8,3.05,3.5,5.9,2.35,3.44-1.38,6.86-2.83,10.23-4.36,2.92-1.33,3.63-3.15,2.43-6.11-1.16-2.86-2.52-5.64-3.67-8.51-.46-1.15-.58-2.43-.86-3.65,.72-.13,1.44-.27,2.16-.4Zm115.6,21.88l-.34,.56c-1.12,0-2.25,0-3.37,0-22.1,0-44.21,0-66.31-.06-1.55,0-2.5,.43-3.41,1.71-11.17,15.63-22.35,31.26-33.63,46.81-4.11,5.67-7.95,11.7-12.91,16.55-8.31,8.12-17.87,14.79-28.43,19.8-25.19,11.95-50.23,12.15-74.82-1.64-15.27-8.56-27.84-20.21-37.92-34.51-2.31-3.28-4.48-6.65-6.72-9.98l-.54,.32c2.88,5.17,5.58,10.45,8.66,15.5,9.25,15.19,19.97,29.15,34.36,39.92,19.71,14.75,41.36,19.6,65.13,12.12,12.18-3.83,23.5-9.29,31.2-20.21,1.59-2.26,3.51-4.28,5.32-6.38,19.3-22.36,38.59-44.73,57.95-67.04,.66-.77,2.02-1.31,3.05-1.32,4.07-.02,8.14,.27,12.21,.35,24.87,.48,49.74,.94,74.61,1.4,.28,0,.57-.05,.85-.07l.58-.85c-17.54-17.19-35.09-34.39-52.91-51.85,4.52-4.5,8.71-8.66,13.45-13.39-7.22,2.92-13.72,5.56-20.52,8.32,2.25,5.3,4.24,10.36,6.56,15.26,1.02,2.15,2.52,4.19,4.17,5.92,4.18,4.39,8.52,8.63,12.9,12.82,3.54,3.39,7.21,6.63,10.83,9.94Zm-174.09-29.35c.21,.57,.34,1.07,.57,1.51,6.01,11.58,12.01,23.16,18.07,34.71,.27,.52,1.07,.77,1.62,1.14,.03-.73,.31-1.58,.04-2.19-2.74-6.25-5.55-12.46-8.38-18.67-2.75-6.03-5.55-12.04-8.37-18.14-1.3,.6-2.38,1.09-3.55,1.63Zm10.45,45.22l.54-.35c-.32-.88-.6-1.77-.97-2.63-5.2-12.23-10.39-24.47-15.62-36.69-1.22-2.86-2.53-5.68-3.92-8.46-.29-.58-1.13-.89-1.72-1.32-.07,.75-.31,1.53-.15,2.23,.21,1,.67,1.96,1.1,2.9,3.81,8.42,7.57,16.86,11.48,25.24,2.99,6.41,6.17,12.72,9.27,19.08Zm18.85-12.86c.34-.14,.68-.28,1.03-.42-2.71-6.51-5.32-13.06-8.15-19.52-3.46-7.91-7.11-15.73-10.66-23.6-.59-1.31-1.2-2.2-2.82-.4,6.83,14.56,13.71,29.25,20.6,43.93Zm322.71-163.6c2.27,1.25,30.89-8.82,34.27-11.56-.49-.73-.98-1.46-1.55-2.32l2.35-.73c-1.19-2.05-2.51-2.62-3.93-1.83-1.76,.98-2.01,2.97-.63,5.32-10,3.64-19.99,7.28-30.5,11.11ZM120.68,388.99l4.39,9.55c1.78-.74,3.34-1.38,5.01-2.07-1.46-3.28-2.85-6.4-4.25-9.56-1.76,.71-3.34,1.35-5.16,2.09ZM647.43,170.6c-1.12-1.03-2.62-2.5-4.61-1.02-1.99,1.48-1.63,3.32,.17,4.91-1.38,.75-2.56,1.39-3.75,2.04l.08,.2c2.34-.84,4.67-1.67,6.49-2.33,.54-1.29,.98-2.32,1.61-3.8Zm-1.39,25.88l-.15-.36c-2.48,.59-4.97,1.15-7.45,1.77-1.87,.46-1.09,2.2-1.5,3.36-.09,.27,.31,.71,.52,1.14,.27-.81,.48-1.45,.69-2.1l1,.11c-.04,.99-.09,1.98-.15,3.21,1.12,.66,2.32,.67,2.95-1.08,.84-2.33-.36-3.56-2.82-4.2,2.51-.67,4.71-1.26,6.91-1.85Zm29.6-34.1c-.61-2-1.79-3.11-3.49-2.43-1.06,.42-2.37,1.75-2.42,2.73-.05,.96,1.21,2.21,2.2,2.9,.43,.3,1.61-.5,2.46-.8l-.26-.67-1.87-.13-.04-.44,3.42-1.16Zm10.75,20.67c-1.83-.86-3.19-2.07-4.26-1.85-1.04,.22-2.25,1.77-2.55,2.95-.5,1.97,1.57,2.07,2.81,2.6,.43,.19,1.08-.11,1.95-.23l-1.38-1.56c.94-.52,1.73-.97,3.42-1.91Zm-35.09,42.38c.23-2.2,.41-3.99,.59-5.78l-.77-.47c-1.86,1.44-3.72,2.88-5.97,4.63,2.34,.62,4.05,1.07,6.15,1.62Zm10.63-32.29c.64-.68,1.12-1.19,1.6-1.7l.62,.41c-.53,.95-1.06,1.9-1.93,3.46,1.57-.3,3.39-.21,3.64-.79,.5-1.17,.15-2.71,.15-4.4,.03-.02,.47-.31,1.05-.69-5.72,.2-6.47,.71-5.13,3.71Zm32.49,9.31c-2.33,1.83-4.17,3.29-6.47,5.1,2.56,.55,4.44,.95,6.47,1.38v-6.48Zm-21.43,8.1c-2.19,1.72-4,3.14-6.25,4.9,2.52,.62,4.23,1.05,6.25,1.55v-6.45Zm-44.57-54.61l-.71,.22c-.69-1.23-1.38-2.45-2.33-4.16-.68,2.06-1.05,3.15-1.4,4.2l3.26,1.81c.43-.76,.8-1.42,1.18-2.07Zm37.14-17.2c-1.61,3.54-1.6,3.58,1.86,4.97,1.77-2.55,1.75-2.61-1.86-4.97Zm-17.88,11.78c1.82-2.45,1.68-2.8-2.04-5.3-.36,1.17-.71,2.29-1.07,3.45,1.07,.64,2.02,1.2,3.11,1.85ZM235.04,322.42c1.07-1.37,2.17-2.19,2.07-2.8-.15-.86-1.18-1.57-1.84-2.35-.7,.63-1.91,1.22-1.97,1.92-.08,.8,.85,1.7,1.74,3.23Zm22.46,48.12c.97-1.25,2.05-2.05,1.98-2.71-.08-.71-1.21-1.75-1.94-1.81-.62-.05-1.82,1.06-1.88,1.73-.06,.7,.94,1.5,1.85,2.79Zm35.85-13.7c-1.51-.6-2.27-1.14-3.02-1.12-.52,.02-1.02,.8-1.53,1.25,.59,.62,1.13,1.66,1.79,1.74,.63,.07,1.37-.86,2.76-1.86Zm71.8-32.98c-.89,1.1-1.66,1.69-1.86,2.44-.1,.37,.83,1.02,1.29,1.55,.59-.56,1.4-1.04,1.67-1.73,.16-.41-.52-1.15-1.09-2.26Zm-98.65-27.26c-1.02-.62-1.68-1.34-2.17-1.23-.67,.14-1.2,.91-1.79,1.41,.56,.52,1.12,1.45,1.69,1.46,.61,.01,1.23-.85,2.26-1.64Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M285.33,304.62c1.49-1.01,1.96,.09,2.39,1.18,1.54,3.9,3.05,7.81,4.68,11.96-2.04,.73-4.11,1.47-6.48,2.32-.93-2.42-2.52-4.47-2.51-7.44-1.62-.57-3.35-5.53-1.81-6.9,1.25-.37,2.49-.75,3.74-1.12Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M294.99,325.09c.88,1.69,1.81,3.35,2.58,5.08,.09,.2-.62,.85-1.05,1.16-.74,.52-1.55,.94-2.33,1.4-.72,.13-1.44,.27-2.16,.4-1.05-1.76-2.1-3.51-3.24-5.42,1.33-.69,2.28-1.18,3.23-1.67,.99-.31,1.98-.63,2.97-.94Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M363.6,301.66l-2.55,.43c-.49-1.87-.99-3.78-1.49-5.69,1.36-.48,2.73-.96,4.09-1.45,.71,.3,1.94,.5,2.03,.93,.33,1.55,2.69,2.95,.56,4.77-.88,.33-1.77,.67-2.65,1Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M342.54,303.87l2.28-1.75c-1.1,.21-1.74,.33-2.45,.46-.7-1.49-1.39-2.94-2.22-4.72,5.15-1.92,10.18-3.79,15.5-5.77,.17,1.99,2.67,3.27,1.08,5.58,2.59-.07,2.09,2.45,2.79,3.92,1.63,3.41,2.99,6.95,4.47,10.44,.67,1.59,1.38,3.16,1.99,4.76,.83,2.15,.53,3.82-1.94,4.75-2.5,.93-4.9,2.15-7.39,3.09-2.78,1.05-4.03,.61-5.22-2.05-1.99-4.46-3.7-9.04-5.7-13.49-.81-1.81-2.08-3.42-3.19-5.22Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M252.85,411.12c0-6.25,4.7-11.13,10.65-11.03,5.5,.09,10.18,5,10.21,10.71,.03,6.21-4.65,10.97-10.73,10.92-5.71-.05-10.12-4.67-10.13-10.6Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M301.93,383.76c.03,6.05-4.64,10.91-10.5,10.92-5.7,.01-10.33-4.81-10.35-10.78-.02-6,4.81-11.06,10.52-11.01,5.62,.05,10.3,4.97,10.33,10.87Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M219.68,411.84c5.76,.01,10.33,4.8,10.29,10.77-.03,5.81-4.81,10.53-10.64,10.52-5.78,0-10.59-4.9-10.5-10.67,.09-5.96,4.87-10.64,10.84-10.62Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M288.63,334.69c.7,.21,1.83,.23,2.04,.67,1.58,3.38,2.95,6.86,4.45,10.28,.97,2.21,.28,3.64-1.86,4.57-2.29,.99-4.57,2.02-6.83,3.02-3.01-4.17-4.93-9.72-3.99-11.62-.95,.19-1.89,.62-2.75,.49-.84-.12-1.59-.82-3.07-1.65l6.45-4,5.56-1.76Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M568.35,215.17c.33,0,.93-.09,.96,0,.37,1.21,.26,2.97,1.05,3.56,1.34,1,1.81,1.87,1.3,3.37-.04,.11-.1,.26-.06,.33q1.67,2.71-1.19,3.9c-3.57,1.49-7.13,2.98-11.14,4.66-.22-1.21-.41-2.23-.6-3.24l.62-.05c-.59-.5-1.41-.89-1.7-1.52-.28-.61,0-1.48,.03-2.04-.5-.53-1.4-1.07-1.51-1.73-.12-.77,.45-1.64,.73-2.47l11.51-4.77Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M288.63,334.69l-5.56,1.76c-4.19,.86-4.21,.87-5.99-3.38-1-2.37-1.9-4.78-2.98-7.53,3.13-1.18,6.36-2.46,9.65-3.56,.39-.13,1.42,.57,1.6,1.08,.55,1.56,.64,3.29,1.26,4.81,.53,1.29,1.49,2.41,2.35,3.54,.94,1.24,.68,2.27-.33,3.27Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M413.65,276.01c1.29-.41,2.59-.83,4.09-1.31,.66,1.43,1.3,2.8,2,4.3-.53,.37-1.04,.73-.96,.67,.74,.79,1.64,1.41,2.01,2.26,.33,.75,.07,1.75,.07,2.53,.62,.72,1.46,1.69,2.59,3-3.68,1.45-6.78,2.67-10.09,3.97-.5-1.06-.92-1.96-1.37-2.92,.66-.41,1.23-.76,2.35-1.45-1.25,.22-1.87,.32-2.54,.44-.51-1.1-1.02-2.18-1.59-3.41,.65-.52,1.28-1.02,2.22-1.78l-2.49,.62q-1.91-4.06,1.66-6.3c.68-.21,1.36-.41,2.03-.62Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M350.83,280.31c-5.04,1.83-9.86,3.57-14.86,5.38-.48-.98-.93-1.78-1.27-2.63-1.4-3.53-.87-5,2.54-6.6,2.41-1.13,4.91-2.04,7.36-3.08,1.99-.85,3.31-.27,4.09,1.73,.62,1.6,1.3,3.17,2.14,5.19Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M212.31,386.06c-.67,1.72-1.12,3.58-2.06,5.13-1.14,1.9-3.08,2.77-5.34,2.33-2.37-.45-4.09-2-4.06-4.35,.04-2.56,.44-5.28,1.45-7.6,.95-2.2,3.34-2.89,5.77-2.24,2.59,.7,3.86,2.96,4.24,6.72Zm-3.75,.89c-1.14-.77-1.79-1.55-2.36-1.5-.6,.05-1.12,.9-1.68,1.41,.49,.48,.95,1.33,1.46,1.35,.65,.03,1.33-.6,2.58-1.26Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M464.41,256.23c1.91-.72,3.83-1.43,5.9-2.21,.6,1.46,1.11,2.7,1.65,4-.62,.42-1.18,.79-2.07,1.38l2.32-.31c.43,.99,.88,1.99,1.37,3.12l-2.15,1.42-7.74,3.12c-1.77,.34-2.27-1-2.47-2.21-.12-.67,.54-1.47,.86-2.24l-1.57,.18c-.48-1.12-.97-2.28-1.52-3.57,1.08-.71,2.12-1.38,3.15-2.06,.76-.21,1.51-.41,2.27-.62Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M403.06,279.94c1.16-.28,2.33-.56,3.84-.93,.5,1.55,1.03,3.23,1.77,5.54,1.22,.54,2.05,3.12,.7,4.74-2.04,.81-4.09,1.63-6.13,2.44-2.26,.58-2.45-1.38-2.85-2.64-.21-.67,.57-1.65,.88-2.41l-1.61,.41c-.65-1.48-1.26-2.87-1.95-4.41,1.9-.99,3.66-1.9,5.42-2.82l-.08,.08Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M537.39,232.57c.81-.22,1.61-.44,3.09-.85-.06,1.41-.44,2.66-.06,3.62,.34,.85,1.51,1.38,2.76,2.42-4.87,2-9.03,3.71-13.33,5.48-.82-2.16-1.52-4.01-2.28-6.01,1.25-.75,2.41-1.44,3.57-2.13l6.25-2.52Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M275.9,307.82c-2.36,.77-4.75,1.47-7.07,2.34-1.21,.45-1.92,.35-2.42-.94-.65-1.67-1.43-3.28-2.28-5.23,3.05-1.34,5.83-2.65,8.69-3.78,1.44-.57,2.86-.16,3.43,1.4,.7,1.91,2.85,3.67,.92,6l-1.28,.2Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M459.17,269.45c-.78-1.36-1.62-2.2-1.66-3.09-.03-.7,.91-1.44,1.59-2.4,1.11,2.34,2,4.17,2.85,6.02,.14,.3,.11,.67,.21,1.32-4.14,1.73-8.29,3.58-12.54,5.1-.52,.19-1.65-1.3-2.7-2.18,1.2-.64,1.84-.98,3.05-1.62-1.3,.16-1.99,.24-2.81,.34-.46-1.14-.92-2.3-1.49-3.71,3.61-1.34,6.84-1.66,10.2,.37,.84,.51,2.34-.08,3.3-.15Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M495.85,249.09c1.07-.27,2.15-.54,3.38-.85,1.18,1.95,.75,4.7,3.3,6.43-4.36,1.81-8.14,3.38-12.5,5.18-.09-1.48-.16-2.59-.23-3.8-1.5-.13-2.23-1.79-1.11-3.89,2.39-1.02,4.77-2.04,7.16-3.07Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M281.57,314.08c.92,2.26,1.75,4.31,2.69,6.62-3.53,1.4-6.95,2.75-10.5,4.15-.2-.46-.45-.82-.51-1.21-.5-3.04-.47-2.99-3.52-2.03-.77,.24-1.68,.04-2.52,.04l-.21-1.1c2.33-1.2,4.61-2.5,7-3.56,2.35-1.05,4.8-1.85,7.57-2.9Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M351.14,280.94c.72,1.75,1.37,3.31,2.2,5.31-5.14,1.78-10.17,3.52-15.24,5.28-.82-1.86-1.47-3.33-2.23-5.06,5.14-1.86,10.09-3.66,15.27-5.53Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M582.42,217.79c2.37-.75,4.74-1.5,6.97-2.21-1.39-3.18-2.79-6.36-4.29-9.79,.74-.41,1.44-.8,2.37-1.32,1.86,4.25,3.64,8.3,5.45,12.42-5.97,2.49-11.8,4.93-17.8,7.43-.42-.94-.76-1.7-1.14-2.54,1-.6,2.01-1.21,3.02-1.82,1.81-.73,3.61-1.45,5.42-2.18Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M275.9,307.82l1.28-.2c.66,.26,1.65,.34,1.91,.82,.81,1.5,1.35,3.15,2.11,5.02-3.83,1.41-7.56,2.78-11.35,4.17-1.03-2.27-1.92-4.2-2.75-6.02l8.8-3.79Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M395.48,289.05c1.08-.18,2.15-.35,3.55-.59,.34,1.49,.65,2.89,1,4.44,.5,.75,1.22,1.83,2.18,3.27-3.27,1.28-6.09,2.39-8.88,3.49-1.86-2.26-1.87-2.49-.21-4.07-3,.57-2.1-2.26-3.21-3.47,.69-.52,1.28-.97,1.87-1.42,1.24-.55,2.47-1.1,3.71-1.65Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M473.59,258.67c2.82-.38,5.62-.85,8.45-1.09,.65-.06,2.38-.93,1.94,1.19,.88-.09,1.77-.18,2.63-.26-1.13-2.39-2.24-4.48-3.06-6.68-.2-.54,.5-1.43,.79-2.16l.13-.12c1.33,3.13,2.73,6.24,3.93,9.43,.18,.47-.45,1.66-.98,1.9-3.61,1.59-7.29,3.01-10.89,4.46-2.54-3.27,.48-3.56,2.02-4.82-1.11,.34-2.22,.67-3.47,1.05-.5-.98-.99-1.94-1.48-2.89h0Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M340.09,296.87c-.76-1.8-1.3-3.05-1.91-4.49l15.45-5.43c.51,1.35,1.01,2.66,1.66,4.35-5.15,1.89-10.12,3.71-15.19,5.57Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M516.95,245.56c-2.94,.23-2.97,.19-3.71-3.38h13.06c-1.04-1.49-3.47-2.19-1.43-4.13-2.77-1.44-3.01-2.97-.62-4.49,1.36,3.4,2.71,6.77,4.15,10.36-4.22,1.72-8.27,3.36-12.46,5.07-.96-1.23-1.76-2.37,1-3.43Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M434.02,279.54c1.19,1.78,1.26,3.14-1.42,4.01-2.75,.9-5.38,2.19-8.55,3.52-.2-1.51-.35-2.61-.52-3.88l-2.24-3.36c4.32-3.01,8.47-.49,12.73-.29Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M378.25,301.62l-2.45,.18c-1.19-2.93-2.47-6.07-3.84-9.44,1.99-.79,3.88-1.54,6.03-2.39,.34,2.05,3.43,3.59,.11,5.89l2.13-.21c.54,1.28,1.11,2.62,1.7,4.01l-1.54,.9c-.71,.36-1.43,.71-2.14,1.07Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M553.06,230.37c.8-.25,1.59-.49,2.3-.71-.78-1.46-1.55-2.71-2.14-4.03-.65-1.47-.95-3.12-1.75-4.49-.74-1.26-.24-1.94,.55-2.72l-.08,.08c.74,1.39,1.56,2.74,2.2,4.17,1.29,2.87,2.48,5.79,3.81,8.91-4.78,1.98-9.34,3.86-13.8,5.71-2.56-2.53,.35-2.84,1.18-3.94,2.58-.99,5.15-1.98,7.73-2.97Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M568.35,215.17l-11.51,4.77c-2.79,.66-2.45-1.74-3.32-3.39,4.17-1.61,8.2-3.21,12.28-4.69,.67-.24,2.11-.15,2.22,.15,.36,.96,.26,2.1,.33,3.16Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M380.21,289.45c1.6,1.29,2.97,2.69,2.32,5.36,4.65-.91,7.28,1.55,9.33,5.59-2.58,1.01-4.8,1.87-7,2.73q-1.9-2.99,2.17-5.22c-1.73,.38-2.84,.63-4.12,.91-1.16-2.79-2.36-5.6-3.48-8.44-.08-.21,.34-.61,.53-.93h.26Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M436.02,273.01l-2.91,.63c-.53-1.31-1.04-2.57-1.58-3.91,1.04-.68,2.02-1.32,2.99-1.96l5.04-1.89c.89-.23,1.78-.46,2.79-.72,.9,1.67,2.37,3.18,.57,5.13-2.3,.9-4.61,1.8-6.91,2.7Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M439.58,265.89l-5.04,1.89c-1.07,.27-2.14,.54-3.42,.87-.48-1.24-.98-2.54-1.62-4.21,3.68-1.5,7.21-2.94,10.79-4.41,.6,1.37,1.17,2.67,1.78,4.04-.8,.59-1.65,1.2-2.49,1.82Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M537.39,232.57c-2.08,.84-4.17,1.68-6.25,2.52-1.21,.39-2.42,.79-3.63,1.18q-2.18-2.97,1.67-5.39c1.64-.59,3.28-1.18,4.92-1.77,1.35-.41,2.71-.83,4.16-1.28,.48,1.07,.91,2.04,1.33,2.97-.84,.67-1.52,1.22-2.2,1.77Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M495.85,249.09c-2.39,1.02-4.77,2.04-7.16,3.07-2.12-.49-3-2.99-1.64-4.63l3.6-1.55c2.18-.71,4.36-1.42,6.75-2.2,.53,1.15,1.04,2.27,1.59,3.49-1.11,.65-2.13,1.24-3.14,1.83Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M439.55,254.1c-.6-1.51-1-2.54-1.5-3.82,4.63-1.7,9.19-3.37,14.39-5.28,.09,1.4,.18,2.61,.26,3.81l-2.98-.39c-1.69,4.23-6.67,3.35-10.17,5.68Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M534.1,229.11c-1.64,.59-3.28,1.18-4.92,1.77-1.23,.32-2.47,.64-3.87,1-.42-1.01-.86-2.07-1.44-3.46,4.25-1.63,8.45-3.25,12.75-4.9,.48,1.15,.91,2.16,1.39,3.3-1.32,.78-2.61,1.53-3.9,2.29Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M490.65,245.97c-1.2,.52-2.4,1.03-3.6,1.55-2.26,.39-1.98-1.69-2.49-2.82-.15-.32,.83-1.5,1.51-1.8,3.05-1.35,6.18-2.53,9.47-3.86,.54,1.26,1.02,2.41,1.6,3.76-2.27,1.11-4.38,2.14-6.49,3.17Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M464.41,256.23l-2.27,.62c-1.15,.28-2.3,.56-3.52,.86-.45-1.09-.93-2.27-1.6-3.89,3.79-1.51,7.48-2.98,11.31-4.51l1.54,3.67c-1.89,1.12-3.67,2.19-5.46,3.25Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M436.02,273.01c2.3-.9,4.61-1.8,6.91-2.7,3.32-1.03,1.58,2.26,3.01,3.04l-2.61,1.67c-2.09,.9-4.18,1.79-6.28,2.69l-2.33,.34-1.24-3.28c.91-.63,1.73-1.19,2.55-1.75Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M395.48,289.05l-3.71,1.65-2.37,.25c-.57-1.51-1.13-3.03-1.73-4.62,2.87-1.13,5.65-2.23,8.64-3.41,.67,1.5,1.32,2.95,2.02,4.52-1.09,.62-1.97,1.12-2.85,1.62Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M502.48,241.5c2.47-.94,4.94-1.88,7.54-2.87,.48,1.25,.93,2.4,1.43,3.69l-2.96,1.65c-2.43,.92-4.86,1.84-7.3,2.76-.78-.95-1.56-1.9-2.48-3.03,1.15-.76,2.02-1.33,2.9-1.91l.87-.3Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M413.65,276.01c-.68,.21-1.36,.41-2.03,.62-1.23,.31-2.46,.61-3.87,.96-.57-1.23-1.17-2.51-1.94-4.14,3.36-1.3,6.6-2.55,10.06-3.89,.58,1.52,1.05,2.76,1.53,4.03-1.36,.88-2.56,1.65-3.76,2.43Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M502.48,241.5l-.87,.3-2.97,.49c-.44-1.09-.91-2.23-1.49-3.65,3.78-1.57,7.32-3.04,10.97-4.55,.46,1.15,.91,2.24,1.47,3.64-2.39,1.27-4.75,2.51-7.1,3.76Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M536.31,222.6c-4.41,1.74-8.52,3.37-12.76,5.04l-1.4-3.41,12.73-4.98c.5,1.18,.92,2.15,1.43,3.35Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M425.35,255.01c3.92-1.51,7.49-2.89,11.29-4.35,.55,1.2,1.06,2.33,1.75,3.86-3.81,1.41-7.37,2.72-11.3,4.17-.56-1.17-1.07-2.25-1.75-3.68Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M551.75,212.66c4.96-1.8,9.62-3.49,14.4-5.23,.46,1.09,.84,2,1.25,2.96-4.75,1.78-9.41,3.53-14.18,5.32-.42-.87-.82-1.7-1.47-3.06Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M429.29,263.58l-1.81-3.83c3.69-1.44,7.24-2.84,10.91-4.27,.57,1.2,1.15,2.41,1.82,3.8-3.59,1.41-7.08,2.78-10.92,4.29Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M413.61,263.96c-2.63,1.05-4.82,2-7.07,2.8-3.24,1.16-3.95,.58-4.19-3.24,3.06-1.2,6.14-2.42,9.5-3.74,.59,1.4,1.1,2.62,1.75,4.18Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M464.89,240.29c.51,1.25,.92,2.27,1.5,3.68-3.94,1.43-7.75,2.82-11.71,4.26-.46-1.33-.81-2.35-1.21-3.53,3.83-1.48,7.49-2.9,11.43-4.42Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M501.19,246.73c2.43-.92,4.86-1.84,7.3-2.76,1.05-.27,2.1-.54,3.9-1-.18,1.55-.33,2.84-.47,4.13l-8.67,3.51c-2.59-.29-2.25-2.12-2.05-3.88Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M456.59,252.95c-.55-1.3-1-2.37-1.52-3.61,3.88-1.48,7.56-2.88,11.46-4.36l1.51,3.47c-3.82,1.5-7.46,2.93-11.45,4.5Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M482.06,238.17l-1.57-3.43c3.96-1.49,7.71-2.89,11.44-4.29,2.03,2.89,1.89,3.39-1.27,4.58-2.8,1.05-5.62,2.05-8.59,3.14Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M294.99,325.09c-.99,.31-1.98,.63-2.97,.94l-3.5,.55c-.67-1.77-1.36-3.57-2.16-5.66,1.9-.72,3.54-1.44,5.25-1.94,.5-.15,1.58,.17,1.71,.53,.68,1.81,1.13,3.71,1.67,5.58Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M493.87,234.85c.49,1.12,.9,2.04,1.49,3.38-3.86,1.52-7.67,3.02-11.57,4.55-.49-1.24-.89-2.25-1.41-3.55,3.76-1.44,7.56-2.89,11.48-4.39Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M403.14,279.86c-1.86,.53-3.73,1.07-5.82,1.66-.54-1.23-1.08-2.45-1.78-4.03,2.78-1.14,5.48-2.3,8.23-3.3,.35-.13,1.19,.46,1.47,.91,.48,.78,.7,1.72,1.08,2.73-1.07,.69-2.16,1.4-3.26,2.11l.08-.08Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M492.84,230.3c4.45-1.71,7.95-3.05,11.73-4.5,.59,.93,1.19,1.89,2.04,3.25-3.67,1.38-6.96,2.79-10.37,3.75-.69,.19-1.86-1.32-3.4-2.5Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M566.34,203.46c5.62-2.06,11.24-4.17,16.9-6.14,.58-.2,1.47,.47,2.22,.73-.06,.26-.13,.52-.19,.78-5.49,2.09-11.01,4.12-16.46,6.3-1.76,.7-2.11-.23-2.47-1.67Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M387.45,285.44c-.62-1.53-1.2-2.95-1.82-4.47,3.03-1.05,5.99-2.08,8.94-3.11q1.69,4.44-2.42,5.97c-1.45,.53-2.92,1-4.7,1.61Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M413.23,259.43c3.95-1.44,7.39-2.7,11.41-4.16,.17,1.53,.31,2.76,.45,3.99l-1.7-.57c-2.53,1.62-5.14,3.28-8.07,5.16-.78-1.66-1.37-2.91-2.08-4.41Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M400.69,263.94q2.1,4.03-1.7,5.47c-1.36,.51-2.72,1.02-4.09,1.51-.47,.17-.96,.26-1.68,.46-.52-1.14-1.03-2.28-1.72-3.81,3.14-1.24,6.1-2.41,9.18-3.63Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M465.81,240.05c4.66-1.66,8.92-3.18,13.59-4.85,.31,1.14,.59,2.05,.77,2.97,.02,.12-.67,.54-.73,.49-.61-.55-1.16-1.18-1.82-1.87,.47,2.25-1.18,2.82-2.86,3.46-1.92,.74-3.78,1.64-5.68,2.43-2.33,.97-2.09-1.27-3.28-2.64Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M413.98,264.83c.49,1.31,.9,2.42,1.41,3.8-3.26,1.32-6.38,2.59-9.61,3.9-.6-1.34-1.11-2.48-1.69-3.79,3.34-1.32,6.49-2.56,9.89-3.91Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M463.69,266.75c2.58-1.04,5.16-2.08,7.74-3.12,.75-.14,1.49-.28,2.4-.45,.42,.85,.85,1.75,1.4,2.89-3.94,1.56-7.63,3.03-11.4,4.52-.92-1.41-2.17-2.57-.14-3.85Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M521.8,223.09c-.47-1.08-.81-1.84-1.25-2.85,4.28-1.65,8.41-3.23,12.52-4.81,1.91,2.55,1.91,2.66-.9,3.76-3.35,1.31-6.72,2.54-10.36,3.9Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M437.05,277.69c2.09-.9,4.18-1.79,6.28-2.69,.9-.2,1.81-.4,2.86-.63,.38,.89,.78,1.8,1.3,3-3.75,1.55-7.34,3.04-10.97,4.54-1.52-1.72-1.51-3.11,.53-4.23Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M551.38,211.85c-.39-1.01-.65-1.72-1-2.64,4.73-1.72,9.39-3.42,14.25-5.19,.37,.58,.82,1.27,1.52,2.37-4.97,1.84-9.73,3.6-14.77,5.47Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M496.87,237.82l-1.57-3.4c3.79-1.42,7.43-2.78,11.26-4.21,.47,1.11,.85,2.02,1.34,3.18-3.67,1.47-7.21,2.9-11.03,4.44Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M395.33,276.45c-.47-.92-.81-1.6-1.15-2.27-.57-1.1-.54-1.87,.87-2.34,2.57-.86,5.09-1.87,7.73-2.86,.52,1.32,.98,2.48,1.56,3.93-3.01,1.19-5.98,2.35-9.01,3.55Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M383.31,275.02q-1.74-3.83,1.74-5.18c1.67-.65,3.35-1.28,5.24-2,.36,.77,.67,1.54,1.08,2.25,.76,1.3,.42,2.07-.98,2.55-1.13,.39-2.22,.92-3.36,1.31-1.2,.41-2.43,.71-3.72,1.08Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M503.24,250.61l8.67-3.51c2.29-.41,1.77,1.47,2.33,2.79-3.61,1.45-7.1,2.86-11.34,4.56,.14-1.53,.24-2.68,.35-3.84Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M550.42,211.71c-5.34,2.17-9.84,4-14.48,5.88-.45-.85-.8-1.5-1.39-2.61,4.66-1.67,9.13-3.32,13.66-4.79,.44-.14,1.24,.82,2.21,1.52Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M507.56,228.1c-.39-.72-.82-1.54-1.4-2.62,4.39-1.61,8.65-3.18,13.09-4.81,.35,.85,.7,1.68,.94,2.26-4.24,1.74-8.29,3.4-12.63,5.17Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M385.59,279.91c-.71-1.39-1.27-2.51-1.91-3.75,2.95-1.1,5.7-2.13,8.62-3.23,.55,1.2,1.06,2.31,1.74,3.78-2.83,1.07-5.5,2.08-8.46,3.2Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M352.42,280.39l6.26-2.16,2.08,5.33c-2.04,.74-3.93,1.43-6.03,2.2-.76-1.78-1.46-3.39-2.31-5.38Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M403.25,291.73c2.04-.81,4.09-1.63,6.13-2.44,2.44-.8,1.89,1.5,2.98,2.64-3.16,1.32-6.04,2.51-9.01,3.75-1.14-1.31-1.94-2.57-.11-3.95Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M363.65,294.96c-1.36,.48-2.73,.96-4.09,1.45-.84-1.49-1.68-2.97-2.99-5.29,2.87-.33,5-.89,7.01-.59,.51,.08,2.33,2.86,.07,4.44Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M372.91,274.27c2.64-.96,5.11-1.85,7.77-2.82,.46,1.29,.91,2.53,1.25,3.48-2.5,1.2-4.77,2.3-7.19,3.46-.54-1.22-1.14-2.59-1.83-4.13Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M367.1,281.29c-.61-1.52-1.14-2.85-1.69-4.23,2.18-.83,4.18-1.59,6.43-2.45,.49,1.4,.97,2.79,1.49,4.28-2.22,.86-4.13,1.6-6.22,2.41Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M375.72,284.82c.67,1.54,1.23,2.84,1.93,4.44l-6.14,2.32c-.59-1.53-1.1-2.86-1.7-4.4,2.01-.8,3.97-1.59,5.91-2.36Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M356.71,290.84c-.57-1.6-1.05-2.93-1.59-4.44,2.1-.7,3.93-1.3,5.86-1.94,.61,1.27,1.15,2.39,1.87,3.9-2.01,.81-3.93,1.59-6.14,2.48Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M553.06,230.37c-2.58,.99-5.15,1.98-7.73,2.97-.89,.22-1.79,.44-2.8,.69-.37-.94-.69-1.79-1.17-3.02,4.05-.6,7.7-2.67,11.71-.64Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M369.2,286.06c-.5-1.28-.95-2.46-1.5-3.85,2.05-.79,3.99-1.54,5.93-2.28,2.28,4.36,2.16,4.52-4.43,6.13Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M330.97,287.55l3.78-.41c.53,1.39,1.1,2.87,1.77,4.63-1.3,.48-2.62,.96-4.33,1.59-.08-2.13-2.92-3.4-1.14-5.89l-.08,.07Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M378.25,301.62c.71-.36,1.43-.71,2.14-1.07,2.33-.41,2.45,1.46,3.23,3.24-1.99,.82-3.89,1.6-5.9,2.42l-1.48-3.11c.7-.51,1.35-1,2.01-1.48Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M332.52,293.89c1.35-.37,2.74-.75,4.39-1.19,.65,1.37,1.29,2.72,2.09,4.43-1.51,.61-2.86,1.15-4.34,1.74-.77-1.79-1.42-3.31-2.14-4.98Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M446.66,252.51c.03,3.68-1.78,5.45-4.88,6.33-.56-1.24-1.12-2.46-1.73-3.81l6.6-2.52Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M473.59,258.67c-1.76-4.62-3.52-9.23-5.35-14.01,.57-.19,1.18-.39,1.67-.55,1.71,4.4,1.05,9.79,6,12.95-.62,.43-1.48,1.02-2.34,1.61h0Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M369.16,299.07c-.64-1.54-1.23-2.95-1.91-4.58,1.12-.52,2.18-1.02,3.22-1.51,3,4.63,2.96,4.79-1.31,6.09Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M582.42,217.79c-1.81,.73-3.61,1.45-5.42,2.18-1.08,.22-2.16,.44-3.49,.71-.77-2.12-1.54-4.25-2.31-6.38l-.05,.04c1.64,4.77,5.14,3.86,8.74,2.95,.75-.19,1.68,.32,2.53,.5Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M448.43,267.34c-.9,.4-1.79,.8-2.93,1.31-1.17-2.96-2.28-5.78-3.52-8.91,.98-.31,1.87-.6,3.02-.96-.08,3.46-1.59,7.28,3.98,8.01l-.56,.56Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M367.01,293.65c-.7-1.69-1.27-3.08-1.94-4.7,1.12-.43,2.11-.81,3.31-1.26,.69,1.34,1.37,2.66,2.13,4.12-1.15,.61-2.19,1.16-3.5,1.85Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M369.4,300.01c1.23-.52,2.31-.97,3.68-1.55,.54,1.17,1.09,2.35,1.74,3.76l-3.64,1.9c-.6-1.39-1.17-2.69-1.79-4.11Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M360.88,278.77c1.3-.47,2.32-.84,3.3-1.2q2.36,4.03-1.71,5.27c-.24-.6-.49-1.21-.73-1.83-.25-.63-.49-1.27-.86-2.24Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M363.03,284.16c.67-.32,1.35-.67,2.04-.97,.38-.16,.79-.24,1.32-.39,.52,1.2,1.01,2.32,1.48,3.41-2.9,2.17-3.29,2-4.84-2.05Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M372.77,307.91c-.42-.93-.86-1.89-1.38-3.04,1.21-.65,2.3-1.23,3.36-1.79,2.3,3.31,2.13,3.72-1.98,4.83Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M587.08,203.59c-.64,.44-1.05,.76-1.49,1.01-.29,.16-.63,.22-.99,.35-.62-1.35-1.22-2.63-1.93-4.17,.91-.4,1.8-.8,2.79-1.23,.56,1.41,1.05,2.65,1.61,4.04Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M456.77,264.43c-.48-1.32-.95-2.64-1.48-4.12l1.89-.97c2.3,3.49,2.26,4.07-.41,5.09Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M455.04,259.37q-1.91-4,.08-5.04c2.27,2.61,2.25,3.68-.08,5.04Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M429.97,270.26c-3.05,.44-2.41-2.4-3.28-3.84-.18-.3,.55-1.15,.86-1.75l.74,.15c.53,1.83,1.07,3.67,1.6,5.5l.07-.06Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M380.21,289.45l-.13,.02h-.13c-1.02-1.6-2.04-3.19-3.13-4.88,2.55-.79,2.62-.81,2.99,1.04,.25,1.25,.27,2.54,.4,3.82Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M386.37,286.51c1.18,2.97,2.27,5.71,3.49,8.78-3.26-3.21-4.82-7.01-3.49-8.78Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M376.65,283.49c-.65-1.49-1.15-2.62-1.69-3.85l2.41-.98c.48,1.1,.93,2.13,1.46,3.34-.65,.45-1.3,.89-2.18,1.5Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M521.99,233.77c-.63-1.33-1.17-2.48-1.82-3.85l1.76-1.21c2.07,3.2,2.08,3.87,.07,5.07Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M484.33,249.67c-.79-.56-1.74-.99-2.33-1.72-.55-.67-.71-1.66-1.1-2.63,.84-1.05,1.64-1.19,2.23,.36,.48,1.27,.88,2.57,1.32,3.86l-.13,.12Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M415.38,264.36l3.27-.85c-.37,1.84-.66,3.3-.95,4.77h-.66l-1.66-3.92Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M423.3,277.7c-.72,.38-1.36,.72-2.1,1.11l-1.95-4.39,1.05-.86c.96,1.32,1.91,2.64,3,4.14Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M552.02,218.42c-2.5,.49-1.96-1.93-2.75-3.02-.35-.48-.06-1.42-.06-2.15l1.19-.15c.52,1.8,1.03,3.59,1.55,5.39l.07-.08Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M538.66,219.78l1.48,.81c-.71,.75-1.26,1.34-1.95,2.07-.65-1.46-1.2-2.68-1.85-4.14l3.51-.94c-.57,1.06-.85,1.59-1.18,2.2Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M509.21,229.16c.96,3.01,1.92,6.02,2.88,9.03l-.49,.17-3.47-8.82,1.08-.38Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M520.73,224.78c.4,.93,.79,1.84,1.19,2.79-1.22,1.02-2.21,1.36-2.96-.21-.79-1.65,.13-2.28,1.77-2.58Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M571.2,214.3c-1.16-2.44-2.32-4.88-3.59-7.53,.41-.12,1.07-.33,1.08-.32,.85,2.62,1.66,5.25,2.46,7.89l.05-.04Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M454.44,250.13c-.12,1.23-.24,2.41-.35,3.59-.64-.35-1.6-.55-1.86-1.09-.67-1.36-.36-2.46,2.22-2.49Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M479.19,240.5c.53-.18,1.05-.36,1.71-.58,.5,1.19,.98,2.31,1.45,3.44q-2.02,.62-3.17-2.86Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M383.36,280.85c-.91-.87-1.81-1.74-2.94-2.82,.75-.56,1.31-.98,2.12-1.6,.56,1.41,1.04,2.61,1.52,3.81l-.7,.61Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M429.9,270.32c.65,1.34,1.3,2.67,1.95,4.01l-.59,.61c-.78-.59-2.05-1.06-2.22-1.8-.2-.84,.57-1.9,.93-2.88,0,0-.07,.05-.07,.05Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M382.49,282.18c1.13,.06,2.37-.12,2.49,.17,.42,1.02,.46,2.2,.64,3.32l-.88,.18c-.63-1.03-1.26-2.06-2.25-3.67Z\" /><path fill=\"currentColor\" stroke=\"currentColor\" d=\"M425.26,264.19v-3.55c.6,.54,1.49,.98,1.71,1.64,.21,.63-.28,1.5-.46,2.26l-1.25-.35Z\" /></symbol>"
});
var result = browser_sprite_build_default().add(symbol);
/* harmony default export */ const guitar = (symbol);
;// ./src/app/components/audioComponent/audio-button.module.scss
// extracted by mini-css-extract-plugin
var audio_button_module_1 = "H7oOExSm";
var audio_button_module_2 = "nToaw9G1";
var audio_button_module_3 = "SsMiR7iL";


;// ./src/app/models/enums/car-status.ts
var CarStatus;
(function (CarStatus) {
    CarStatus["STARTED"] = "started";
    CarStatus["STOPPED"] = "stopped";
    CarStatus["DRIVE"] = "drive";
})(CarStatus || (CarStatus = {}));

;// ./src/app/models/enums/endpoint-type.ts
var EndpointType;
(function (EndpointType) {
    EndpointType["GARAGE"] = "garage";
    EndpointType["WINNERS"] = "winners";
    EndpointType["ENGINE"] = "engine";
})(EndpointType || (EndpointType = {}));

;// ./src/app/models/enums/method.ts
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["DELETE"] = "DELETE";
    Method["PATCH"] = "PATCH";
})(Method || (Method = {}));

;// ./src/app/models/enums/winners-order-parameter.ts
var WinnersOrderParameter;
(function (WinnersOrderParameter) {
    WinnersOrderParameter["ASC"] = "ASC";
    WinnersOrderParameter["DESC"] = "DESC";
})(WinnersOrderParameter || (WinnersOrderParameter = {}));

;// ./src/app/models/enums/winners-sort-parameter.ts
var WinnersSortParameter;
(function (WinnersSortParameter) {
    WinnersSortParameter["ID"] = "id";
    WinnersSortParameter["WINS"] = "wins";
    WinnersSortParameter["TIME"] = "time";
})(WinnersSortParameter || (WinnersSortParameter = {}));

;// ./src/app/models/enums/index.ts






;// ./src/app/config.ts

/* harmony default export */ const config = ({
    API_URL: 'http://localhost:3000/',
    DEFAULT_WINNERS_PER_PAGE: 10,
    DEFAULT_WINNERS_PAGE_NUMBER: 1,
    DEFAULT_WINNERS_SORT_BY: WinnersSortParameter.TIME,
    DEFAULT_WINNERS_SORT_ORDER: WinnersOrderParameter.ASC,
    DEFAULT_CARS_PER_PAGE: 7,
    DEFAULT_CARS_PAGE_NUMBER: 1,
    BULK_CARS_NUMBER: 100,
    ADJECTIVES: [
        'Savage',
        'Mighty',
        'Thunderous',
        'Infernal',
        'Ruthless',
        'Vicious',
        'Ironclad',
        'Fearsome',
        'Relentless',
        'Brutal',
        'Ferocious',
        'Unstoppable',
        'Demonic',
        'Colossal',
        'Wrathful',
        'Hellish',
        'Imperial',
        'Furious',
        'Bloodthirsty',
        'Unbreakable',
        'Destructive',
        'Immortal',
        'Doomed',
        'Monstrous',
        'Incredible',
        'Vengeful',
        'Cruel',
        'Devastating',
        'Invincible',
        'Dark',
        'Exiled',
    ],
    NOUNS: [
        'Beast',
        'Crusher',
        'Reaper',
        'Warlord',
        'Titan',
        'Fury',
        'Dominator',
        'Plow',
        'Harvester',
        'Ripper',
        'Juggernaut',
        'Annihilator',
        'Destroyer',
        'Gladiator',
        'Conqueror',
        'Nightmare',
        'Crusader',
        'Herald',
        'Slayer',
        'Champion',
        'DeathBringer',
        'Drill',
        'Cutter',
        'Mower',
        'Shredder',
        'Grinder',
        'Slicer',
        'Saw',
        'Scythe',
        'Fiend',
        'Demon',
        'Warrior',
        'Despoiler',
        'Desecrator',
        'Defiler',
        'Devourer',
        'Avenger',
    ],
});

;// ./src/app/utils/get-random.ts

const { ADJECTIVES, NOUNS } = config;
const MAX_RANGE_ADJUSTMENT = 1;
const HEX_LENGTH = 6;
const INDEX_OFFSET = 1;
const FIRST_ITEM = 0;
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + MAX_RANGE_ADJUSTMENT)) + min;
}
function getRandomHexColor() {
    const letters = [...'0123456789ABCDEF'];
    let color = '#';
    for (let index = 0; index < HEX_LENGTH; index++) {
        color +=
            letters[Math.round(Math.random() * (letters.length - INDEX_OFFSET))];
    }
    return color;
}
function getRandomRacer() {
    const name = getRandomName();
    const color = getRandomHexColor();
    return { name, color };
}
function getRandomName() {
    const adjective = ADJECTIVES[getRandom(FIRST_ITEM, ADJECTIVES.length - INDEX_OFFSET)];
    const noun = NOUNS[getRandom(FIRST_ITEM, NOUNS.length - INDEX_OFFSET)];
    return `${adjective} ${noun}`;
}

;// ./src/app/assets/audio/track_1.mp3
const track_1_namespaceObject = __webpack_require__.p + "assets/audio/84e59472f8e90fc9c54f.mp3";
;// ./src/app/assets/audio/track_2.mp3
const track_2_namespaceObject = __webpack_require__.p + "assets/audio/0d75c78b7eef89a39af7.mp3";
;// ./src/app/assets/audio/track_3.mp3
const track_3_namespaceObject = __webpack_require__.p + "assets/audio/19e1650216237e9641c5.mp3";
;// ./src/app/assets/audio/track_4.mp3
const track_4_namespaceObject = __webpack_require__.p + "assets/audio/1d1f82e3f3b39b1eb08c.mp3";
;// ./src/app/assets/audio/track_5.mp3
const track_5_namespaceObject = __webpack_require__.p + "assets/audio/4cf966d9c3718414f254.mp3";
;// ./src/app/assets/audio/track_6.mp3
const track_6_namespaceObject = __webpack_require__.p + "assets/audio/2679695d2115dff6eedb.mp3";
;// ./src/app/components/audioComponent/audio-controller.ts







const NEXT = 1;
const DEFAULT_FIRST_TRACK = 0;
const ARRAY_OFFSET = 1;
class AudioController {
    isPlaying = false;
    tracks = [
        new Audio(track_1_namespaceObject),
        new Audio(track_2_namespaceObject),
        new Audio(track_3_namespaceObject),
        new Audio(track_4_namespaceObject),
        new Audio(track_5_namespaceObject),
        new Audio(track_6_namespaceObject),
    ];
    constructor() {
        for (const [index, track] of this.tracks.entries()) {
            track.preload = 'auto';
            track.addEventListener('ended', () => {
                track.currentTime = 0;
                void this.tracks[(index + NEXT) % this.tracks.length].play();
            });
        }
    }
    playRandomTrack() {
        this.isPlaying = true;
        void this.tracks[getRandom(DEFAULT_FIRST_TRACK, this.tracks.length - ARRAY_OFFSET)].play();
    }
    stopTrack() {
        for (const track of this.tracks) {
            this.isPlaying = false;
            track.pause();
            track.currentTime = 0;
        }
    }
}
/* harmony default export */ const audio_controller = (new AudioController());

;// ./src/app/components/audioComponent/audio-button.ts





class AudioButton extends BaseComponent {
    guitarSvg = createSvgChunk(guitar, ['iconExtraSmall']);
    constructor() {
        super({
            elementTag: 'button',
            classes: [audio_button_module_2, 'button'],
            title: 'Play hell metal',
        });
        this.getElement().append(this.guitarSvg);
        this.addListener('click', () => this.handleClick());
    }
    handleClick() {
        if (audio_controller.isPlaying) {
            this.pause();
            this.removeClasses(audio_button_module_1);
        }
        else {
            this.play();
            this.addClasses(audio_button_module_1);
        }
    }
    play() {
        audio_controller.playRandomTrack();
    }
    pause() {
        audio_controller.stopTrack();
    }
}

;// ./src/app/utils/delay.ts
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

;// ./src/app/utils/make-request.ts

const MAX_RETRIES = 3;
const RETRY_DELAY = 500;
// eslint-disable-next-line max-lines-per-function
async function makeRequest(apiUrl, endpoint, maxRetries = MAX_RETRIES, retryDelay = RETRY_DELAY) {
    const { method, path, query, body } = endpoint;
    const fullPath = `${path.join('/')}${query
        ? `?${new URLSearchParams(query).toString()}`
        : ''}`;
    let attempt = 0;
    let lastError;
    while (attempt < maxRetries) {
        try {
            const response = await fetch(`${apiUrl}${fullPath}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : undefined,
            });
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            const data = (await response.json());
            const headers = response.headers.get('X-Total-Count')
                ? { 'X-Total-Count': response.headers.get('X-Total-Count') }
                : {};
            return { data, headers };
        }
        catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            attempt++;
            if (attempt < maxRetries &&
                lastError.message.includes('Failed to fetch')) {
                console.log(`Error - "${lastError.message}" with path "${fullPath}". Attempt (#${attempt}) to refetch. Retrying in ${retryDelay}ms. If no further errors, the request to ${fullPath} was successful.`);
                await delay(retryDelay);
            }
            else {
                throw lastError;
            }
        }
    }
    throw new Error('Request failed');
}

;// ./src/app/controller/loader.ts



class Loader {
    API_URL = config.API_URL;
    async getCars(carQuery) {
        return makeRequest(this.API_URL, {
            method: Method.GET,
            path: [EndpointType.GARAGE],
            body: undefined,
            query: carQuery,
        });
    }
    async getCar(id) {
        return makeRequest(this.API_URL, {
            method: Method.GET,
            path: [EndpointType.GARAGE, id],
            body: undefined,
            query: undefined,
        });
    }
    async createCar(body) {
        return makeRequest(this.API_URL, {
            method: Method.POST,
            path: [EndpointType.GARAGE],
            body,
            query: undefined,
        });
    }
    async deleteCar(id) {
        return makeRequest(this.API_URL, {
            method: Method.DELETE,
            path: [EndpointType.GARAGE, id],
            body: undefined,
            query: undefined,
        });
    }
    async updateCar(id, body) {
        return makeRequest(this.API_URL, {
            method: Method.PUT,
            path: [EndpointType.GARAGE, id],
            body,
            query: undefined,
        });
    }
    async startStopEngine(query) {
        return makeRequest(this.API_URL, {
            method: Method.PATCH,
            path: [EndpointType.ENGINE],
            body: undefined,
            query,
        });
    }
    async switchEngineToDrive(query) {
        return makeRequest(this.API_URL, {
            method: Method.PATCH,
            path: [EndpointType.ENGINE],
            body: undefined,
            query,
        });
    }
    async getWinners(query) {
        return makeRequest(this.API_URL, {
            method: Method.GET,
            path: [EndpointType.WINNERS],
            body: undefined,
            query,
        });
    }
    async getWinner(id) {
        return makeRequest(this.API_URL, {
            method: Method.GET,
            path: [EndpointType.WINNERS, id],
            body: undefined,
            query: undefined,
        });
    }
    async createWinner(body) {
        return makeRequest(this.API_URL, {
            method: Method.POST,
            path: [EndpointType.WINNERS],
            body,
            query: undefined,
        });
    }
    deleteWinner(id) {
        return makeRequest(this.API_URL, {
            method: Method.DELETE,
            path: [EndpointType.WINNERS, id],
            body: undefined,
            query: undefined,
        });
    }
    updateWinner(id, body) {
        return makeRequest(this.API_URL, {
            method: Method.PUT,
            path: [EndpointType.WINNERS, id],
            body,
            query: undefined,
        });
    }
}

;// ./src/app/controller/controller.ts



function generateCars(count) {
    return Array.from({ length: count }, () => getRandomRacer());
}
class Controller extends Loader {
    async saveWinner(body) {
        try {
            const { data: existedWinner } = await this.getWinner(body.id);
            return await this.updateWinner(body.id, {
                wins: existedWinner.wins + body.wins,
                time: Math.min(existedWinner.time, body.time),
            });
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                console.log('The winning car was not found on the winners list and will be added there.');
                return await this.createWinner({
                    id: body.id,
                    time: body.time,
                    wins: body.wins,
                });
            }
            throw error;
        }
    }
    async updateCar(id, body) {
        try {
            return await super.updateCar(id, body);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('404)')) {
                console.log('Car with such id was not found in the garage.');
            }
            throw error;
        }
    }
    async deleteCar(id) {
        try {
            try {
                await super.deleteWinner(id);
            }
            catch {
                console.log('Deleted car was not found in the winners list.');
            }
            return await super.deleteCar(id);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                return { data: {} };
            }
            throw error;
        }
    }
    async startEngine(id) {
        try {
            return await this.startStopEngine({ id, status: CarStatus.STARTED });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('400')) {
                    console.log('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"');
                }
                else if (error.message.includes('404')) {
                    console.log('Car with such id was not found in the garage.');
                }
            }
            throw error;
        }
    }
    async stopEngine(id) {
        try {
            return await this.startStopEngine({ id, status: CarStatus.STOPPED });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('400')) {
                    console.log('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"');
                }
                else if (error.message.includes('404')) {
                    console.log('No truck to stop. Perhaps it was removed.');
                }
            }
            throw error;
        }
    }
    async driveCar(id) {
        try {
            const result = await super.switchEngineToDrive({
                id,
                status: CarStatus.DRIVE,
            });
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('400')) {
                    console.log('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"');
                }
                if (error.message.includes('404')) {
                    console.log("No truck to drive. Perhaps it wasn't started beforehand or was removed.");
                }
                if (error.message.includes('429')) {
                    console.log("You can't make the truck move faster! Drive is already in progress.");
                }
                if (error.message.includes('500')) {
                    console.log('The truck has burned down! Hell yeah!');
                    return { data: { success: false } };
                }
            }
            throw error;
        }
    }
    async createCarsBulk(count) {
        const cars = generateCars(count);
        const carPromiseArray = cars.map((car) => this.createCar(car));
        const carsResponses = await Promise.all(carPromiseArray);
        const data = carsResponses.map((response) => response.data);
        return { data };
    }
}
/* harmony default export */ const controller = (new Controller());

;// ./src/app/utils/event-emitter-generic.ts
class Emitter {
    events = {};
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((l) => l !== listener);
        }
    }
    emit(event, ...arguments_) {
        if (this.events[event]) {
            for (const listener of this.events[event]) {
                listener(...arguments_);
            }
        }
    }
}
/* harmony default export */ const event_emitter_generic = (Emitter);

;// ./src/app/state-machine/event-emitter-machine.ts

class EmitterMachine extends event_emitter_generic {
}
/* harmony default export */ const event_emitter_machine = (EmitterMachine);

;// ./src/app/state-machine/machine-class.ts

class StateMachine {
    value;
    context;
    events = {
        machineStateChanged: 'machineStateChanged',
    };
    emitter = new event_emitter_machine();
    definition;
    constructor(stateMachineDefinition) {
        this.definition = stateMachineDefinition;
        this.value = stateMachineDefinition.initialState;
        this.context = stateMachineDefinition.context;
    }
    async makeTransition(currentState, trigger, contextData) {
        const currentStateDefinition = this.definition.states[currentState];
        const destinationTransition = currentStateDefinition.transitions[trigger];
        if (!destinationTransition)
            return;
        const destinationState = destinationTransition.target;
        const destinationStateDefinition = this.definition.states[destinationState];
        const payload = {
            updateContext: this.updateContext.bind(this),
            getFullContext: this.getFullContext.bind(this),
            contextData,
            trigger,
        };
        try {
            await destinationTransition.action?.(payload);
            await currentStateDefinition.actions.onExit?.(payload);
            await destinationStateDefinition.actions.onEnter?.(payload);
            this.value = destinationState;
            this.emit(this.events.machineStateChanged, payload);
        }
        catch (error) {
            console.log(`An error occurred during state machine's transition from ${currentState} to ${destinationState} with trigger ${trigger}:`, error);
            throw error;
        }
        return this.value;
    }
    updateContext(contextData) {
        this.context = { ...this.context, ...contextData };
    }
    getFullContext() {
        return this.context;
    }
    on(event, callback) {
        this.emitter.on(event, callback);
    }
    emit(event, payload, ...other) {
        this.emitter.emit(event, payload, ...other);
    }
}

;// ./src/app/state-machine/machine.ts




const stateMachineDefinition = {
    initialState: 'state:initial',
    context: {
        car: undefined,
        newCar: undefined,
        pageCars: [],
        carsTotal: 0,
        carId: undefined,
        newWinner: undefined,
        pageWinners: [],
        winnersTotal: 0,
        winnersPerPage: config.DEFAULT_WINNERS_PER_PAGE,
        winnersPageNumber: config.DEFAULT_WINNERS_PAGE_NUMBER,
        winnersSortBy: config.DEFAULT_WINNERS_SORT_BY,
        winnersSortOrder: config.DEFAULT_WINNERS_SORT_ORDER,
        carsPerPage: config.DEFAULT_CARS_PER_PAGE,
        carsPageNumber: config.DEFAULT_CARS_PAGE_NUMBER,
        isSoundEnabled: false,
    },
    states: {
        'state:initial': {
            actions: {
                async onEnter() { },
                // eslint-disable-next-line max-lines-per-function
                async onExit(payload) {
                    const { updateContext, getFullContext } = payload;
                    const { carsPerPage, carsPageNumber, winnersPerPage, winnersPageNumber, winnersSortBy, winnersSortOrder, carsTotal, winnersTotal, } = getFullContext();
                    const { data: cars, headers: carsHeaders } = await controller.getCars({
                        _limit: carsPerPage,
                        _page: carsPageNumber,
                    });
                    const { data: pageWinners, headers: winnersHeaders } = await controller.getWinners({
                        _limit: winnersPerPage,
                        _page: winnersPageNumber,
                        _sort: winnersSortBy,
                        _order: winnersSortOrder,
                    });
                    updateContext({
                        pageCars: cars.map((car) => ({
                            ...car,
                            status: CarStatus.STOPPED,
                            velocity: 0,
                            distance: 0,
                            driveSuccess: undefined,
                            stopDriveController: new AbortController(),
                        })),
                        carsTotal: carsHeaders['X-Total-Count']
                            ? Number(carsHeaders['X-Total-Count'])
                            : carsTotal,
                        pageWinners,
                        winnersTotal: winnersHeaders['X-Total-Count']
                            ? Number(winnersHeaders['X-Total-Count'])
                            : winnersTotal,
                    });
                },
            },
            transitions: {
                initialize: {
                    target: 'state:idle',
                    async action() { },
                },
            },
        },
        'state:idle': {
            actions: {
                async onEnter() { },
                async onExit() { },
            },
            transitions: {
                getCar: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, contextData } = payload;
                        if (contextData?.carId) {
                            const { carId } = contextData;
                            const { data: car } = await controller.getCar(carId);
                            updateContext({
                                car: {
                                    ...car,
                                    status: CarStatus.STOPPED,
                                    velocity: 0,
                                    distance: 0,
                                    driveSuccess: undefined,
                                    stopDriveController: new AbortController(),
                                },
                            });
                        }
                    },
                },
                getCars: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { carsPageNumber, carsPerPage, carsTotal } = getFullContext();
                        const pageNumber = contextData?.carsPageNumber ?? carsPageNumber;
                        const perPage = contextData?.carsPerPage ?? carsPerPage;
                        const updatedCarsData = await controller.getCars({
                            _page: pageNumber,
                            _limit: perPage,
                        });
                        updateContext({
                            pageCars: updatedCarsData.data.map((car) => ({
                                ...car,
                                status: CarStatus.STOPPED,
                                velocity: 0,
                                distance: 0,
                                driveSuccess: undefined,
                                stopDriveController: new AbortController(),
                            })),
                            carsTotal: updatedCarsData.headers['X-Total-Count']
                                ? Number(updatedCarsData.headers['X-Total-Count'])
                                : carsTotal,
                            carsPageNumber: pageNumber,
                            carsPerPage: perPage,
                        });
                    },
                },
                getWinners: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { winnersPageNumber, winnersPerPage, winnersTotal, winnersSortBy, winnersSortOrder, } = getFullContext();
                        const pageNumber = contextData?.winnersPageNumber ?? winnersPageNumber;
                        const perPage = contextData?.winnersPerPage ?? winnersPerPage;
                        const sortBy = contextData?.winnersSortBy ?? winnersSortBy;
                        const sortOrder = contextData?.winnersSortOrder ?? winnersSortOrder;
                        const updatedWinnersData = await controller.getWinners({
                            _page: pageNumber,
                            _limit: perPage,
                            _sort: sortBy,
                            _order: sortOrder,
                        });
                        updateContext({
                            pageWinners: updatedWinnersData.data,
                            winnersTotal: updatedWinnersData.headers['X-Total-Count']
                                ? Number(updatedWinnersData.headers['X-Total-Count'])
                                : winnersTotal,
                            winnersPageNumber: pageNumber,
                            winnersPerPage: perPage,
                            winnersSortBy: sortBy,
                            winnersSortOrder: sortOrder,
                        });
                    },
                },
                addCar: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { carsPageNumber, carsPerPage, carsTotal } = getFullContext();
                        if (contextData?.newCar) {
                            const { newCar } = contextData;
                            await controller.createCar(newCar);
                            const updatedCarsData = await controller.getCars({
                                _limit: carsPerPage,
                                _page: carsPageNumber,
                            });
                            updateContext({
                                pageCars: updatedCarsData.data.map((car) => ({
                                    ...car,
                                    status: CarStatus.STOPPED,
                                    velocity: 0,
                                    distance: 0,
                                    driveSuccess: undefined,
                                    stopDriveController: new AbortController(),
                                })),
                                carsTotal: updatedCarsData.headers['X-Total-Count']
                                    ? Number(updatedCarsData.headers['X-Total-Count'])
                                    : carsTotal,
                            });
                        }
                    },
                },
                addBulkCars: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext } = payload;
                        const { carsPageNumber, carsPerPage, carsTotal } = getFullContext();
                        await controller.createCarsBulk(config.BULK_CARS_NUMBER);
                        const updatedCarsData = await controller.getCars({
                            _limit: carsPerPage,
                            _page: carsPageNumber,
                        });
                        updateContext({
                            pageCars: updatedCarsData.data.map((car) => ({
                                ...car,
                                status: CarStatus.STOPPED,
                                velocity: 0,
                                distance: 0,
                                driveSuccess: undefined,
                                stopDriveController: new AbortController(),
                            })),
                            carsTotal: updatedCarsData.headers['X-Total-Count']
                                ? Number(updatedCarsData.headers['X-Total-Count'])
                                : carsTotal,
                        });
                    },
                },
                removeCar: {
                    target: 'state:idle',
                    // eslint-disable-next-line max-lines-per-function
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { carsPageNumber, carsPerPage, carsTotal, winnersPageNumber, winnersPerPage, winnersSortBy, winnersSortOrder, winnersTotal, pageCars, } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToRemove } = contextData;
                            await controller.deleteCar(carToRemove.id);
                            const updatedCarsData = await controller.getCars({
                                _limit: carsPerPage,
                                _page: carsPageNumber,
                            });
                            const updatedWinnersData = await controller.getWinners({
                                _limit: winnersPerPage,
                                _page: winnersPageNumber,
                                _sort: winnersSortBy,
                                _order: winnersSortOrder,
                            });
                            updateContext({
                                pageCars: updatedCarsData.data.map((updatedCar) => {
                                    const car = pageCars.find((car) => car.id === updatedCar.id);
                                    return (car ?? {
                                        ...updatedCar,
                                        status: CarStatus.STOPPED,
                                        velocity: 0,
                                        distance: 0,
                                        driveSuccess: undefined,
                                        stopDriveController: new AbortController(),
                                    });
                                }),
                                carsTotal: updatedCarsData.headers['X-Total-Count']
                                    ? Number(updatedCarsData.headers['X-Total-Count'])
                                    : carsTotal,
                                pageWinners: updatedWinnersData.data,
                                winnersTotal: updatedWinnersData.headers['X-Total-Count']
                                    ? Number(updatedWinnersData.headers['X-Total-Count'])
                                    : winnersTotal,
                            });
                        }
                    },
                },
                updateCar: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToUpdate } = contextData;
                            await controller.updateCar(carToUpdate.id, {
                                color: carToUpdate.color,
                                name: carToUpdate.name,
                            });
                            updateContext({
                                pageCars: pageCars.map((car) => {
                                    return car.id === carToUpdate.id
                                        ? Object.assign(carToUpdate, {
                                            color: carToUpdate.color,
                                            name: carToUpdate.name,
                                        })
                                        : car;
                                }),
                            });
                        }
                    },
                },
                startCar: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToStart } = contextData;
                            const { data: updatedCarEngine } = await controller.startEngine(carToStart.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToStart.id
                                    ? Object.assign(carToStart, {
                                        status: CarStatus.STARTED,
                                        velocity: updatedCarEngine.velocity,
                                        distance: updatedCarEngine.distance,
                                        driveSuccess: undefined,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                startRace: {
                    target: 'state:race',
                    async action(payload) {
                        const { updateContext, getFullContext } = payload;
                        const { pageCars } = getFullContext();
                        const result = await Promise.all(pageCars.map(async (carToStart) => {
                            return await controller.startEngine(carToStart.id);
                        }));
                        updateContext({
                            pageCars: pageCars.map((car, index) => {
                                return Object.assign(pageCars[index], {
                                    status: CarStatus.STARTED,
                                    velocity: result[index].data.velocity,
                                    distance: result[index].data.distance,
                                    driveSuccess: undefined,
                                });
                            }),
                            newWinner: undefined,
                        });
                    },
                },
                checkDriveSuccess: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToCheck } = contextData;
                            const { data: { success }, } = await controller.driveCar(carToCheck.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToCheck.id
                                    ? Object.assign(carToCheck, {
                                        ...car,
                                        driveSuccess: success,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                resetCar: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToStop } = contextData;
                            const { data: updatedCarEngine } = await controller.stopEngine(carToStop.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToStop.id
                                    ? Object.assign(carToStop, {
                                        status: CarStatus.STOPPED,
                                        velocity: updatedCarEngine.velocity,
                                        distance: updatedCarEngine.distance,
                                        driveSuccess: undefined,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                resetRace: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext } = payload;
                        const { pageCars } = getFullContext();
                        const result = await Promise.all(pageCars.map(async (carToStop) => {
                            return await controller.stopEngine(carToStop.id);
                        }));
                        updateContext({
                            pageCars: pageCars.map((car, index) => Object.assign(car, {
                                status: CarStatus.STOPPED,
                                velocity: result[index].data.velocity,
                                distance: result[index].data.distance,
                                driveSuccess: undefined,
                            })),
                        });
                    },
                },
            },
        },
        'state:race': {
            actions: {
                async onEnter() { },
                async onExit() { },
            },
            transitions: {
                finishRace: {
                    target: 'state:finish',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { winnersPageNumber, winnersPerPage, winnersSortBy, winnersSortOrder, winnersTotal, } = getFullContext();
                        if (contextData?.newWinner) {
                            const { newWinner } = contextData;
                            await controller.saveWinner(newWinner);
                            const updatedWinnersData = await controller.getWinners({
                                _page: winnersPageNumber,
                                _limit: winnersPerPage,
                                _sort: winnersSortBy,
                                _order: winnersSortOrder,
                            });
                            updateContext({
                                pageWinners: updatedWinnersData.data,
                                winnersTotal: updatedWinnersData.headers['X-Total-Count']
                                    ? Number(updatedWinnersData.headers['X-Total-Count'])
                                    : winnersTotal,
                            });
                        }
                    },
                },
                checkDriveSuccess: {
                    target: 'state:race',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToCheck } = contextData;
                            const { data: { success }, } = await controller.driveCar(carToCheck.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToCheck.id
                                    ? Object.assign(carToCheck, {
                                        ...car,
                                        driveSuccess: success,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                resetCar: {
                    target: 'state:race',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToStop } = contextData;
                            const { data: updatedCarEngine } = await controller.stopEngine(carToStop.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToStop.id
                                    ? Object.assign(carToStop, {
                                        status: CarStatus.STOPPED,
                                        velocity: updatedCarEngine.velocity,
                                        distance: updatedCarEngine.distance,
                                        driveSuccess: undefined,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                resetRace: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext } = payload;
                        const { pageCars } = getFullContext();
                        const result = await Promise.all(pageCars.map(async (carToStop) => {
                            return await controller.stopEngine(carToStop.id);
                        }));
                        updateContext({
                            pageCars: pageCars.map((car, index) => Object.assign(car, {
                                status: CarStatus.STOPPED,
                                velocity: result[index].data.velocity,
                                distance: result[index].data.distance,
                                driveSuccess: undefined,
                            })),
                        });
                    },
                },
                resetToIdle: {
                    target: 'state:idle',
                    async action() { },
                },
                getCar: {
                    target: 'state:race',
                    async action(payload) {
                        const { updateContext, contextData } = payload;
                        if (contextData?.carId) {
                            const { carId } = contextData;
                            const { data: car } = await controller.getCar(carId);
                            updateContext({
                                car: {
                                    ...car,
                                    status: CarStatus.STOPPED,
                                    velocity: 0,
                                    distance: 0,
                                    driveSuccess: undefined,
                                    stopDriveController: new AbortController(),
                                },
                            });
                        }
                    },
                },
                getWinners: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { winnersPageNumber, winnersPerPage, winnersTotal, winnersSortBy, winnersSortOrder, } = getFullContext();
                        const pageNumber = contextData?.winnersPageNumber ?? winnersPageNumber;
                        const perPage = contextData?.winnersPerPage ?? winnersPerPage;
                        const sortBy = contextData?.winnersSortBy ?? winnersSortBy;
                        const sortOrder = contextData?.winnersSortOrder ?? winnersSortOrder;
                        const updatedWinnersData = await controller.getWinners({
                            _page: pageNumber,
                            _limit: perPage,
                            _sort: sortBy,
                            _order: sortOrder,
                        });
                        updateContext({
                            pageWinners: updatedWinnersData.data,
                            winnersTotal: updatedWinnersData.headers['X-Total-Count']
                                ? Number(updatedWinnersData.headers['X-Total-Count'])
                                : winnersTotal,
                            winnersPageNumber: pageNumber,
                            winnersPerPage: perPage,
                            winnersSortBy: sortBy,
                            winnersSortOrder: sortOrder,
                        });
                    },
                },
            },
        },
        'state:finish': {
            actions: {
                async onEnter() { },
                async onExit() { },
            },
            transitions: {
                resetCar: {
                    target: 'state:finish',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToStop } = contextData;
                            const { data: updatedCarEngine } = await controller.stopEngine(carToStop.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToStop.id
                                    ? Object.assign(carToStop, {
                                        status: CarStatus.STOPPED,
                                        velocity: updatedCarEngine.velocity,
                                        distance: updatedCarEngine.distance,
                                        driveSuccess: undefined,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                resetRace: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext } = payload;
                        const { pageCars } = getFullContext();
                        const result = await Promise.all(pageCars.map(async (carToStop) => {
                            return await controller.stopEngine(carToStop.id);
                        }));
                        updateContext({
                            pageCars: pageCars.map((car, index) => Object.assign(car, {
                                status: CarStatus.STOPPED,
                                velocity: result[index].data.velocity,
                                distance: result[index].data.distance,
                                driveSuccess: undefined,
                            })),
                        });
                    },
                },
                getCar: {
                    target: 'state:finish',
                    async action(payload) {
                        const { updateContext, contextData } = payload;
                        if (contextData?.carId) {
                            const { carId } = contextData;
                            const { data: car } = await controller.getCar(carId);
                            updateContext({
                                car: {
                                    ...car,
                                    status: CarStatus.STOPPED,
                                    velocity: 0,
                                    distance: 0,
                                    driveSuccess: undefined,
                                    stopDriveController: new AbortController(),
                                },
                            });
                        }
                    },
                },
                checkDriveSuccess: {
                    target: 'state:finish',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { pageCars } = getFullContext();
                        if (contextData?.car) {
                            const { car: carToCheck } = contextData;
                            const { data: { success }, } = await controller.driveCar(carToCheck.id);
                            updateContext({
                                pageCars: pageCars.map((car) => car.id === carToCheck.id
                                    ? Object.assign(carToCheck, {
                                        ...car,
                                        driveSuccess: success,
                                    })
                                    : car),
                            });
                        }
                    },
                },
                resetToIdle: {
                    target: 'state:idle',
                    async action() { },
                },
                getWinners: {
                    target: 'state:idle',
                    async action(payload) {
                        const { updateContext, getFullContext, contextData } = payload;
                        const { winnersPageNumber, winnersPerPage, winnersTotal, winnersSortBy, winnersSortOrder, } = getFullContext();
                        const pageNumber = contextData?.winnersPageNumber ?? winnersPageNumber;
                        const perPage = contextData?.winnersPerPage ?? winnersPerPage;
                        const sortBy = contextData?.winnersSortBy ?? winnersSortBy;
                        const sortOrder = contextData?.winnersSortOrder ?? winnersSortOrder;
                        const updatedWinnersData = await controller.getWinners({
                            _page: pageNumber,
                            _limit: perPage,
                            _sort: sortBy,
                            _order: sortOrder,
                        });
                        updateContext({
                            pageWinners: updatedWinnersData.data,
                            winnersTotal: updatedWinnersData.headers['X-Total-Count']
                                ? Number(updatedWinnersData.headers['X-Total-Count'])
                                : winnersTotal,
                            winnersPageNumber: pageNumber,
                            winnersPerPage: perPage,
                            winnersSortBy: sortBy,
                            winnersSortOrder: sortOrder,
                        });
                    },
                },
            },
        },
    },
};
const machine = new StateMachine(stateMachineDefinition);
/* harmony default export */ const state_machine_machine = (machine);

;// ./src/app/utils/animate.ts
const FULL_ANIMATION = 1;
function animate(animationParameter) {
    const { timing, draw, duration } = animationParameter;
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > FULL_ANIMATION)
            timeFraction = FULL_ANIMATION;
        const progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < FULL_ANIMATION) {
            requestAnimationFrame(animate);
        }
    });
}

;// ./src/app/utils/timing-function.ts
function easeInQuad(timeFraction) {
    const POW_TWO = 2;
    return Math.pow(timeFraction, POW_TWO);
}

;// ./src/app/assets/img/flag.svg


var flag_symbol = new (browser_symbol_default())({
  "id": "flag",
  "use": "flag-usage",
  "viewBox": "0 0 512.000000 512.000000",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512.000000 512.000000\" preserveAspectRatio=\"xMidYMid meet\" id=\"flag\">\n<metadata>\nCreated by potrace 1.16, written by Peter Selinger 2001-2019\n</metadata>\n<g transform=\"translate(0.000000,512.000000) scale(0.100000,-0.100000)\" fill=\"currentColor\" stroke=\"none\">\n<path d=\"M4080 4764 c15 -38 12 -120 -5 -161 -14 -33 -14 -35 2 -22 58 45 76\n103 49 153 -9 18 -26 37 -36 44 -18 11 -19 10 -10 -14z\" />\n<path d=\"M3563 4564 c-8 -21 13 -42 28 -27 13 13 5 43 -11 43 -6 0 -13 -7 -17\n-16z\" />\n<path d=\"M3495 4550 c-11 -17 5 -32 21 -19 7 6 11 15 8 20 -7 12 -21 11 -29\n-1z\" />\n<path d=\"M3855 4499 c-4 -11 -4 -23 -1 -26 8 -9 36 17 36 33 0 22 -28 16 -35\n-7z\" />\n<path d=\"M4117 4425 c-93 -55 -210 -169 -251 -245 -26 -48 -30 -67 -36 -181\n-7 -111 -11 -133 -35 -176 -29 -54 -89 -105 -172 -147 -46 -23 -82 -60 -71\n-72 11 -10 75 19 132 60 132 94 166 157 176 326 4 63 8 106 8 94 1 -11 13 -54\n27 -94 14 -40 25 -87 25 -103 0 -42 -27 -93 -69 -130 -21 -18 -53 -52 -72 -76\n-19 -25 -76 -71 -131 -107 -92 -60 -98 -62 -128 -51 -29 11 -34 10 -51 -12\n-26 -32 -24 -64 7 -100 25 -30 26 -35 19 -102 -4 -39 -13 -95 -20 -125 l-12\n-54 26 0 c14 0 41 4 58 9 l33 9 -30 -57 c-43 -86 -75 -119 -127 -133 -82 -20\n-146 -98 -68 -84 34 7 34 7 24 -22 -14 -42 -65 -90 -108 -103 -21 -6 -61 -10\n-89 -8 -36 3 -52 0 -52 -8 0 -7 -5 -24 -12 -38 -9 -20 -26 -30 -82 -46 -85\n-25 -121 -47 -204 -126 -48 -47 -71 -80 -101 -144 -21 -46 -41 -92 -45 -103\n-10 -29 -36 -1 -36 40 0 34 31 74 57 74 7 0 22 17 32 39 11 21 46 62 78 91 59\n54 56 58 -7 10 -19 -15 -55 -37 -78 -49 l-44 -22 7 30 c4 17 4 31 0 31 -13 0\n-56 -111 -53 -137 2 -23 -1 -29 -19 -31 -17 -2 -26 3 -32 21 -5 13 -16 27 -25\n30 -25 10 -31 91 -11 144 34 89 200 221 267 211 22 -3 21 -5 -19 -48 -36 -39\n-41 -41 -36 -20 9 39 -100 -71 -132 -134 l-27 -51 29 26 c15 15 42 35 58 45\n17 10 38 26 47 35 16 17 127 32 186 26 20 -2 27 8 55 75 18 42 35 80 39 84 4\n4 35 -1 70 -11 61 -17 62 -17 79 3 9 11 33 63 53 114 41 101 52 119 108 161\n46 34 96 133 105 206 7 61 14 60 -89 22 -56 -20 -98 -27 -98 -15 0 3 36 51 80\n107 85 108 99 135 49 93 -65 -55 -119 -23 -119 71 0 44 5 58 31 87 32 37 79\n56 141 56 51 0 135 33 182 72 73 60 92 148 60 272 -25 96 -21 165 12 227 16\n28 44 63 64 77 55 41 58 45 15 27 -63 -25 -103 -56 -134 -103 -35 -51 -44\n-108 -31 -187 21 -128 4 -222 -51 -281 -22 -24 -89 -55 -170 -78 -70 -20 -95\n-40 -164 -126 -60 -75 -121 -112 -221 -133 -30 -6 -54 -14 -54 -18 0 -3 15\n-35 34 -71 19 -36 37 -84 41 -107 l7 -42 41 7 c23 3 69 14 102 23 l60 17 2\n-26 c4 -73 -9 -131 -43 -180 -19 -27 -32 -50 -30 -50 3 0 29 9 57 20 59 24 86\n22 48 -3 -31 -21 -114 -37 -185 -37 l-53 0 25 74 c23 69 29 76 80 110 53 35\n72 62 37 52 -27 -7 -73 -15 -123 -21 -53 -7 -222 -25 -231 -25 -4 0 -14 -21\n-24 -46 -25 -66 -12 -89 60 -105 31 -7 58 -16 61 -21 3 -4 28 -8 55 -8 34 0\n51 -5 55 -15 3 -8 -5 -47 -18 -87 -27 -84 -29 -85 -153 -87 -72 -1 -81 -3 -90\n-22 -6 -12 -41 -42 -80 -66 l-70 -45 55 58 c30 32 60 62 65 66 6 4 -6 8 -26 8\n-41 0 -99 -21 -118 -43 -6 -8 -24 -63 -39 -121 l-27 -107 -62 -31 c-66 -32\n-65 -30 -78 -132 -6 -41 -3 -51 16 -72 27 -29 39 -30 65 -7 11 10 35 29 53 42\n45 31 58 17 66 -74 6 -69 6 -70 -22 -86 -15 -8 -50 -28 -77 -44 -49 -28 -49\n-28 -34 -4 17 26 33 141 21 152 -8 9 -54 -114 -60 -164 -4 -27 -9 -36 -21 -33\n-69 13 -74 16 -88 50 -19 45 -6 91 37 131 36 35 36 41 0 35 -27 -4 -84 18 -95\n37 -4 5 1 40 9 78 8 37 18 78 20 90 l5 23 33 -20 c17 -11 46 -20 62 -20 l30 0\n32 132 c18 73 31 133 30 134 -1 1 -34 5 -73 9 l-71 7 -17 -89 c-10 -48 -19\n-98 -22 -111 l-5 -23 -18 22 c-23 28 -65 29 -117 2 -45 -23 -49 -34 -58 -170\nl-7 -101 51 19 c27 10 63 19 78 19 l27 0 -20 -105 -19 -105 -46 0 c-71 0 -90\n-8 -90 -39 1 -25 -12 -108 -25 -160 -5 -18 -9 -21 -15 -12 -8 14 -57 12 -92\n-3 -13 -6 -18 -1 -23 26 -10 52 -2 120 15 129 8 5 32 15 53 23 l37 15 -26 38\nc-18 26 -23 45 -19 63 9 37 33 69 60 82 23 10 43 44 32 54 -6 6 -61 -18 -100\n-43 -28 -18 -28 -18 -47 7 -11 14 -22 41 -26 60 -17 100 -18 100 -44 4 -36\n-135 -29 -186 36 -263 25 -30 25 -31 4 -31 -21 0 -51 25 -80 66 -8 11 -31 31\n-49 45 -19 13 -46 35 -59 49 l-24 25 21 -31 c11 -17 31 -38 44 -47 26 -17 83\n-119 118 -212 25 -65 31 -168 16 -259 -6 -33 -5 -46 2 -42 6 4 43 52 82 107\n71 100 138 159 181 159 21 0 21 -5 5 -84 l-13 -60 -54 -13 c-47 -11 -65 -15\n-110 -22 -3 -1 1 -5 8 -10 10 -6 11 -25 6 -74 -7 -65 -7 -66 -55 -96 -30 -19\n-67 -55 -96 -97 -86 -120 -98 -127 -50 -29 82 166 91 230 57 394 -26 129 -96\n269 -196 391 -103 127 -132 174 -140 228 l-7 45 -18 -24 -17 -24 -7 27 c-4 14\n-2 43 4 64 13 47 8 55 -9 14 -17 -42 -8 -148 19 -202 11 -24 57 -88 102 -143\n91 -111 164 -215 152 -215 -4 0 -2 -4 5 -9 7 -4 24 -37 37 -72 19 -53 20 -66\n10 -76 -10 -10 -11 -21 -4 -45 17 -55 14 -198 -5 -243 -23 -54 -65 -97 -88\n-89 -16 5 -18 -1 -18 -53 0 -32 4 -75 9 -95 5 -22 5 -57 -1 -85 -5 -26 -13\n-84 -16 -127 l-7 -79 -32 27 c-38 32 -53 78 -52 156 l0 55 18 -40 c10 -22 27\n-48 38 -58 20 -17 20 -17 26 40 3 32 9 76 12 98 l6 40 -17 -37 c-20 -47 -31\n-48 -40 -2 -7 39 -4 73 22 219 17 97 13 185 -10 260 -3 11 4 0 16 -25 18 -36\n22 -63 23 -130 0 -47 -4 -103 -8 -125 l-9 -40 20 28 c10 15 28 34 39 42 16 11\n19 23 15 67 -2 29 -9 60 -16 68 -8 8 -19 33 -26 55 -7 22 -21 57 -31 77 -10\n20 -17 50 -15 67 3 23 -8 45 -51 103 -30 40 -83 102 -116 137 -34 35 -54 61\n-44 58 11 -4 17 -1 17 8 0 9 6 12 18 8 19 -7 -8 28 -64 82 -42 41 -78 113 -65\n129 10 12 4 56 -8 56 -3 0 -7 26 -8 58 l-2 57 18 -57 c26 -81 99 -195 132\n-207 l26 -9 -33 49 c-47 70 -62 131 -63 266 -2 127 17 251 46 312 36 73 132\n102 272 81 47 -7 108 -13 134 -12 102 2 215 83 325 232 79 106 164 193 257\n262 124 94 208 130 450 193 55 14 141 46 191 70 181 87 265 229 224 377 -13\n45 -54 96 -87 109 -40 15 -46 0 -14 -37 54 -61 51 -123 -9 -182 -76 -76 -204\n-123 -400 -147 -162 -20 -265 -51 -348 -104 -69 -45 -95 -79 -94 -122 1 -34\n-18 -82 -47 -119 -18 -23 -20 -23 -27 -7 -4 10 -1 30 7 45 7 15 14 40 14 56\nl1 28 -34 -38 c-61 -72 -109 -148 -180 -291 -115 -229 -139 -245 -368 -253\n-157 -6 -163 -7 -228 -39 -99 -48 -162 -135 -217 -296 -20 -59 -24 -89 -24\n-195 0 -198 44 -299 195 -450 108 -109 173 -181 167 -186 -2 -2 -30 27 -63 66\n-32 38 -105 106 -161 151 -156 124 -192 170 -228 293 -13 45 -16 82 -12 160 3\n55 8 112 11 126 4 14 0 8 -9 -14 -18 -48 -45 -209 -45 -274 0 -123 61 -225\n215 -360 58 -52 120 -112 136 -135 43 -59 71 -157 71 -251 1 -74 -2 -84 -43\n-164 -25 -47 -49 -87 -55 -89 -6 -2 -17 10 -24 28 -25 59 -87 144 -189 259\n-204 230 -301 412 -332 622 -11 76 -8 203 7 271 8 35 -14 36 -46 2 -27 -29\n-43 -21 -64 29 -13 31 -13 30 -21 -37 -4 -37 -4 -101 0 -143 6 -64 11 -79 36\n-105 33 -34 35 -46 15 -94 -15 -34 -48 -60 -61 -47 -14 14 37 -104 73 -167 61\n-110 150 -219 328 -402 207 -213 224 -240 233 -392 8 -118 30 -181 31 -86 0\n63 22 111 122 274 30 50 60 104 66 120 20 57 12 -1 -12 -85 -40 -137 -47 -178\n-47 -280 0 -138 21 -227 82 -344 47 -92 51 -104 47 -156 -2 -34 -16 -81 -35\n-123 -18 -37 -30 -67 -27 -67 3 0 89 67 192 148 103 81 257 201 342 265 85 64\n168 128 183 142 l29 25 -21 43 c-12 24 -21 48 -21 54 0 6 26 20 58 32 83 30\n145 76 134 99 -5 9 -12 31 -15 48 -5 28 -4 31 18 26 34 -6 71 34 80 89 4 24\n18 76 31 114 l24 70 -40 -46 c-34 -40 -94 -79 -104 -68 -2 2 -2 45 1 94 l5 90\n52 0 c33 0 62 7 80 18 29 20 84 127 93 186 l6 34 -39 -27 c-39 -26 -107 -36\n-119 -17 -3 6 4 37 15 70 11 35 21 91 22 133 l2 73 5 -70 6 -70 8 47 c6 34 16\n54 38 73 17 14 34 25 37 25 4 0 8 -28 9 -63 1 -34 9 -98 18 -142 29 -151 18\n-236 -56 -427 -27 -70 -49 -131 -49 -135 0 -4 14 14 30 41 17 26 34 45 38 42\n11 -7 70 55 109 114 47 70 92 164 108 227 18 70 19 78 3 65 -7 -5 -27 -13 -44\n-16 l-30 -7 -17 113 c-9 62 -17 138 -17 169 0 113 61 251 144 325 59 54 98 75\n223 120 51 19 104 40 116 49 20 13 18 5 -17 -67 l-41 -81 0 -131 c0 -118 -2\n-135 -22 -166 -26 -41 -95 -84 -122 -75 -10 3 -23 15 -29 28 -11 22 -11 22\n-11 -4 -2 -45 22 -64 76 -64 39 0 58 6 86 28 63 48 87 103 99 219 23 239 96\n362 288 486 47 30 100 68 119 86 37 34 81 118 81 155 0 14 14 36 34 55 41 37\n55 70 49 111 -6 38 26 81 70 94 l32 9 -38 1 c-65 2 -117 -43 -117 -100 0 -26\n-43 -69 -70 -69 -29 0 -60 35 -60 69 0 43 42 87 120 126 70 35 97 61 142 138\n16 27 43 55 65 67 34 19 35 20 9 15 -16 -3 -45 -17 -65 -31 -46 -31 -59 -30\n-67 3 -11 44 15 74 106 124 76 41 87 51 113 100 28 52 28 57 22 150 -8 105 5\n154 49 184 11 8 16 15 10 15 -23 0 -78 -46 -95 -80 -10 -19 -21 -62 -25 -95\n-6 -58 -38 -145 -53 -145 -5 0 -11 22 -14 50 -3 27 -16 82 -28 122 -28 97 -23\n184 15 255 35 64 114 142 190 187 33 20 55 36 50 36 -5 0 -44 -20 -87 -45z\nm-906 -478 c-26 -42 -98 -110 -139 -131 -52 -27 -47 -18 15 27 59 44 133 122\n133 140 0 6 3 8 6 4 4 -3 -3 -21 -15 -40z m-203 -92 c-50 -34 -109 -56 -268\n-100 -143 -40 -269 -92 -345 -145 -50 -34 -61 -34 -50 0 19 60 147 158 240\n185 27 8 113 24 190 35 77 11 163 27 190 34 74 21 84 19 43 -9z m788 -252\nc-13 -101 -33 -139 -104 -200 -36 -32 -92 -84 -125 -116 -32 -32 -56 -50 -53\n-40 3 11 10 50 15 89 12 98 31 129 104 172 34 21 84 60 112 88 27 28 52 52 54\n53 2 0 1 -20 -3 -46z m-58 -514 c-6 -17 -25 -51 -42 -77 -32 -47 -70 -71 -198\n-126 l-57 -24 50 69 c28 38 55 71 60 75 20 12 21 -6 2 -45 -17 -34 -17 -39 -4\n-31 26 14 66 61 96 113 25 44 63 76 92 77 9 0 9 -8 1 -31z m-1241 -621 c-3 -8\n-6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z m-10 -50 c-3 -8 -6 -5 -6 6 -1\n11 2 17 5 13 3 -3 4 -12 1 -19z m-10 -65 c-3 -10 -5 -4 -5 12 0 17 2 24 5 18\n2 -7 2 -21 0 -30z m-224 -249 c33 -17 67 -27 95 -26 47 0 48 -3 34 -82 l-7\n-40 -113 -1 c-61 -1 -112 0 -112 3 0 2 6 30 14 61 8 31 17 68 20 84 4 15 9 27\n12 27 2 0 28 -12 57 -26z m230 -179 c20 -3 37 -9 37 -13 -1 -4 -16 -45 -34\n-92 l-33 -85 -69 0 -69 0 -22 -65 c-36 -106 -34 -110 82 -132 l67 -13 -6 -65\nc-4 -35 -12 -68 -19 -72 -21 -14 -109 -38 -138 -38 -43 0 -51 19 -39 94 6 36\n15 77 20 92 6 15 9 28 8 29 -9 6 -170 55 -181 55 -8 0 -17 -10 -21 -22 -7 -30\n-8 -133 0 -179 6 -36 8 -37 68 -49 33 -7 68 -14 76 -16 11 -3 20 -31 31 -88\n17 -96 17 -96 -62 -96 -55 0 -67 16 -85 110 -9 47 -22 90 -28 97 -6 7 -37 15\n-69 19 -72 9 -77 3 -77 -87 l0 -66 -58 -12 c-33 -6 -85 -27 -117 -46 -32 -20\n-60 -33 -63 -31 -10 11 11 98 36 148 33 64 71 88 152 95 66 6 63 1 75 120 9\n78 20 94 77 100 l45 5 23 80 c13 44 29 82 36 85 7 2 48 -4 91 -15 43 -11 84\n-22 92 -24 13 -3 36 52 61 150 12 47 1 45 113 27z m-888 -45 c3 -5 2 -10 -4\n-10 -5 0 -13 5 -16 10 -3 6 -2 10 4 10 5 0 13 -4 16 -10z m72 -277 c-3 -10 -5\n-4 -5 12 0 17 2 24 5 18 2 -7 2 -21 0 -30z m384 -393 c33 -9 40 -16 49 -48 5\n-20 16 -58 24 -84 17 -55 19 -54 -69 -33 -33 8 -77 15 -97 15 l-38 0 0 86 0\n87 46 -7 c26 -3 64 -11 85 -16z m-136 -230 c8 -92 7 -95 -64 -134 -60 -32\n-138 -44 -164 -24 -22 16 -36 74 -37 145 l0 53 43 -6 c30 -4 62 2 112 20 105\n37 102 39 110 -54z\" />\n<path d=\"M4020 4440 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0\n-10 -4 -10 -10z\" />\n<path d=\"M3375 4370 c-3 -5 -4 -14 0 -20 8 -13 35 -1 35 16 0 16 -26 19 -35 4z\" />\n<path d=\"M3596 4364 c-14 -14 -23 -54 -12 -54 2 0 13 16 25 35 21 36 14 47\n-13 19z\" />\n<path d=\"M3307 4354 c-8 -8 1 -24 14 -24 5 0 9 7 9 15 0 15 -12 20 -23 9z\" />\n<path d=\"M4122 4290 c-58 -34 -96 -90 -74 -112 17 -17 36 4 51 53 9 29 22 46\n47 61 19 11 34 22 34 24 0 6 -2 5 -58 -26z\" />\n<path d=\"M4252 4308 c-7 -7 -12 -16 -12 -20 0 -15 15 -8 28 12 13 22 3 27 -16\n8z\" />\n<path d=\"M3440 4182 c0 -39 -21 -93 -47 -119 -41 -41 -63 -77 -63 -102 0 -29\n16 -51 37 -51 18 0 82 58 99 91 17 34 18 113 3 160 -17 50 -29 58 -29 21z\" />\n<path d=\"M4192 4068 c-16 -16 -15 -48 1 -48 19 0 37 21 37 42 0 21 -20 24 -38\n6z\" />\n<path d=\"M3552 4039 c2 -7 10 -15 17 -17 8 -3 12 1 9 9 -2 7 -10 15 -17 17 -8\n3 -12 -1 -9 -9z\" />\n<path d=\"M4190 3885 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0\n-10 -7 -10 -15z\" />\n<path d=\"M3435 3819 c-11 -17 1 -21 15 -4 8 9 8 15 2 15 -6 0 -14 -5 -17 -11z\" />\n<path d=\"M4212 3767 c-12 -12 -26 -46 -32 -74 -12 -55 -30 -77 -98 -124 -35\n-25 -43 -35 -40 -57 4 -35 26 -38 68 -10 46 31 77 89 85 160 8 63 35 108 66\n108 10 0 19 5 19 10 0 19 -46 10 -68 -13z\" />\n<path d=\"M4050 3679 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10\n-5 -10 -11z\" />\n<path d=\"M3333 3624 c-14 -14 -22 -28 -19 -31 3 -4 12 0 19 9 6 8 23 22 37 32\n19 13 21 16 7 16 -10 0 -29 -12 -44 -26z\" />\n<path d=\"M2958 3633 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z\" />\n<path d=\"M3079 3623 c-13 -15 -12 -15 6 -6 11 6 27 13 35 16 10 4 8 6 -6 6\n-12 1 -28 -6 -35 -16z\" />\n<path d=\"M1193 3595 c-27 -19 -63 -77 -63 -101 0 -16 3 -14 18 8 9 14 32 45\n50 67 35 42 33 52 -5 26z\" />\n<path d=\"M2885 3501 c-9 -57 -30 -78 -108 -111 -151 -63 -230 -164 -213 -270\n5 -31 2 -37 -22 -48 -15 -6 -54 -33 -86 -58 -55 -44 -58 -48 -38 -55 15 -6 22\n-17 22 -36 0 -15 9 -41 20 -58 16 -23 19 -39 14 -72 -7 -50 -3 -52 68 -26 42\n15 49 22 68 67 11 28 39 75 61 104 47 63 39 63 -76 3 l-70 -36 29 83 c28 81\n30 83 95 126 36 25 86 50 110 58 38 11 48 21 83 81 22 38 51 94 65 125 23 52\n24 61 14 102 -17 62 -28 69 -36 21z\" />\n<path d=\"M2605 3466 c-16 -8 -43 -27 -59 -44 -24 -26 -30 -42 -35 -103 -6 -58\n-11 -75 -30 -90 -13 -11 -30 -19 -38 -19 -10 0 -13 -9 -11 -27 6 -57 99 -27\n132 41 18 38 22 121 6 111 -17 -10 -11 16 10 51 23 37 91 74 136 74 22 0 26 3\n14 10 -21 14 -90 12 -125 -4z\" />\n<path d=\"M1175 3406 c-44 -19 -87 -73 -83 -105 2 -21 9 -27 33 -29 48 -5 142\n67 145 110 0 13 -32 38 -48 38 -9 -1 -31 -7 -47 -14z\" />\n<path d=\"M1406 3410 c-53 -17 -128 -81 -113 -96 2 -2 30 9 63 26 121 62 227\n59 326 -6 51 -34 51 -34 18 -5 -81 71 -213 107 -294 81z\" />\n<path d=\"M2276 3167 c-82 -83 -90 -95 -98 -141 -4 -28 -18 -87 -30 -130 l-23\n-79 -75 -32 c-108 -47 -125 -51 -116 -30 9 26 36 208 31 214 -3 2 -13 -3 -22\n-12 -26 -23 -124 -67 -150 -67 -13 0 -23 -3 -23 -7 0 -5 -5 -38 -10 -75 -9\n-63 -14 -71 -59 -115 -59 -58 -75 -105 -75 -216 1 -73 4 -84 48 -170 38 -75\n53 -95 82 -110 20 -10 34 -14 32 -10 -71 143 -72 146 -76 246 -3 53 -1 97 2\n97 4 0 18 -7 32 -16 l25 -17 -7 115 -7 115 79 5 c44 3 80 4 82 3 2 -2 -10 -46\n-27 -99 -17 -53 -31 -103 -31 -111 0 -21 -17 -27 -42 -15 -21 10 -21 10 2 -9\n41 -34 113 -28 198 14 l71 36 6 57 c3 31 11 83 17 114 10 54 13 59 52 78 53\n25 72 25 115 -1 26 -16 36 -18 42 -8 9 15 16 96 25 278 4 74 10 147 15 163 4\n15 7 27 6 27 -1 -1 -42 -42 -91 -92z\" />\n<path d=\"M1236 3214 c-19 -19 -21 -34 -3 -34 17 0 37 20 37 37 0 18 -15 16\n-34 -3z\" />\n<path d=\"M1003 3208 c-26 -34 -25 -40 6 -24 32 17 41 36 17 36 -7 0 -18 -6\n-23 -12z\" />\n<path d=\"M2184 3209 c-8 -14 14 -19 25 -6 8 10 7 14 -5 14 -8 0 -17 -4 -20 -8z\" />\n<path d=\"M4005 3209 c-4 -6 -5 -13 -2 -16 7 -7 27 6 27 18 0 12 -17 12 -25 -2z\" />\n<path d=\"M1290 3164 c0 -14 3 -14 15 -4 8 7 15 14 15 16 0 2 -7 4 -15 4 -8 0\n-15 -7 -15 -16z\" />\n<path d=\"M1046 3100 c-15 -23 -26 -44 -23 -46 7 -7 59 66 55 77 -2 6 -16 -8\n-32 -31z\" />\n<path d=\"M871 3081 c-44 -44 -75 -96 -66 -111 3 -5 20 -2 40 7 28 13 37 14 50\n3 22 -18 19 -28 -8 -23 -30 6 -42 -9 -61 -77 l-15 -55 5 55 c5 47 2 59 -16 83\n-17 22 -21 35 -16 62 10 52 -6 43 -47 -27 -87 -147 -125 -359 -96 -537 9 -60\n47 -166 55 -158 3 2 -3 39 -12 82 -12 59 -15 111 -11 204 5 132 21 211 53 258\n17 25 19 26 22 8 1 -11 -4 -49 -12 -85 -11 -56 -11 -69 1 -93 21 -42 44 -30\n78 38 16 33 64 126 107 208 43 81 78 152 78 157 0 18 -33 40 -61 40 -20 0 -40\n-11 -68 -39z\" />\n<path d=\"M1186 3081 c-4 -7 -5 -15 -2 -18 9 -9 19 4 14 18 -4 11 -6 11 -12 0z\" />\n<path d=\"M1385 3060 c-10 -11 -15 -23 -12 -26 10 -10 35 3 47 25 15 28 -10 29\n-35 1z\" />\n<path d=\"M3887 3073 c-4 -3 -7 -11 -7 -17 0 -6 5 -5 12 2 6 6 9 14 7 17 -3 3\n-9 2 -12 -2z\" />\n<path d=\"M2752 3000 c-21 -9 -68 -95 -87 -157 -6 -22 -4 -23 57 -23 64 0 64 0\n77 35 7 19 28 58 47 86 19 29 37 56 40 61 7 11 -105 9 -134 -2z\" />\n<path d=\"M1006 2944 c-20 -19 -20 -28 -2 -43 12 -10 19 -8 35 8 21 21 19 51\n-4 51 -8 0 -21 -7 -29 -16z\" />\n<path d=\"M1130 2940 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0\n-10 -4 -10 -10z\" />\n<path d=\"M1535 2902 c-40 -25 -99 -92 -124 -141 l-21 -40 36 -42 c19 -23 42\n-58 50 -78 l15 -36 30 60 c16 33 49 79 73 102 40 38 42 43 24 49 -27 8 -98 73\n-98 89 0 7 12 23 28 34 34 25 27 27 -13 3z\" />\n<path d=\"M1181 2803 c-31 -46 -37 -79 -22 -118 l8 -20 6 20 c3 11 8 38 12 60\n3 22 15 55 25 73 29 49 6 38 -29 -15z\" />\n<path d=\"M958 2814 c-5 -4 -8 -19 -8 -33 1 -23 2 -24 11 -8 11 19 9 53 -3 41z\" />\n<path d=\"M3110 2531 c-75 -24 -107 -42 -162 -90 -47 -41 -95 -107 -85 -117 3\n-3 14 8 26 25 23 31 102 93 136 105 12 4 6 -5 -15 -23 l-35 -29 21 -20 c14\n-14 26 -17 35 -11 8 5 42 18 75 29 60 20 62 22 68 63 3 23 9 52 12 65 8 26 0\n27 -76 3z\" />\n<path d=\"M2581 2434 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z\" />\n<path d=\"M1550 2404 c6 -16 34 -54 61 -84 l50 -55 -36 61 c-19 34 -47 72 -60\n84 l-25 24 10 -30z\" />\n<path d=\"M2045 2268 c-21 -94 -25 -124 -19 -156 l7 -36 12 40 c17 59 28 174\n15 174 -5 0 -12 -10 -15 -22z\" />\n<path d=\"M1500 2245 c13 -14 26 -25 28 -25 3 0 -5 11 -18 25 -13 14 -26 25\n-28 25 -3 0 5 -11 18 -25z\" />\n<path d=\"M1130 2131 c0 -12 29 -35 36 -28 11 10 -5 37 -21 37 -8 0 -15 -4 -15\n-9z\" />\n<path d=\"M2995 2040 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0\n-7 -4 -4 -10z\" />\n<path d=\"M3059 1995 c-54 -33 -94 -87 -114 -155 -6 -21 -2 -19 23 13 17 21 54\n56 82 79 45 36 93 99 73 97 -5 0 -33 -16 -64 -34z\" />\n<path d=\"M1210 2012 c0 -5 14 -28 31 -52 24 -33 33 -39 40 -29 15 23 10 47\n-13 69 -22 20 -58 27 -58 12z\" />\n<path d=\"M1170 1919 c0 -29 18 -59 35 -59 19 0 19 2 -2 45 -19 39 -33 46 -33\n14z\" />\n<path d=\"M1256 1881 c22 -37 54 -69 54 -54 0 16 -44 76 -59 81 -10 3 -8 -4 5\n-27z\" />\n<path d=\"M1379 1809 c25 -55 36 -65 56 -49 24 20 18 49 -17 70 -51 31 -60 26\n-39 -21z\" />\n<path d=\"M1292 1774 c3 -11 9 -28 14 -39 7 -18 6 -18 -9 -6 -15 11 -17 11 -17\n-2 0 -21 26 -29 40 -12 8 10 9 23 3 42 -11 31 -39 47 -31 17z\" />\n<path d=\"M2929 1516 c-99 -96 -139 -122 -168 -106 -11 5 -21 21 -23 35 -3 23\n-10 15 -56 -55 -30 -44 -91 -118 -136 -163 -149 -149 -558 -480 -870 -705\n-135 -97 -217 -161 -191 -149 24 11 336 204 405 250 172 115 440 323 660 512\n163 140 492 467 468 465 -1 0 -42 -38 -89 -84z\" />\n<path d=\"M1445 311 c-28 -11 55 -21 174 -21 113 0 179 9 159 21 -16 11 -306\n10 -333 0z\" />\n</g>\n</symbol>"
});
var flag_result = browser_sprite_build_default().add(flag_symbol);
/* harmony default export */ const img_flag = (flag_symbol);
;// ./src/app/assets/img/monster-truck.svg


var monster_truck_symbol = new (browser_symbol_default())({
  "id": "monster-truck",
  "use": "monster-truck-usage",
  "viewBox": "0 0 512.000000 512.000000",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512.000000 512.000000\" preserveAspectRatio=\"xMidYMid meet\" id=\"monster-truck\">\n<metadata>\nCreated by potrace 1.16, written by Peter Selinger 2001-2019\n</metadata>\n<g transform=\"translate(0.000000,512.000000) scale(-0.100000,-0.100000)\" transform-origin=\"470 0\" fill=\"currentColor\" stroke=\"none\">\n<path d=\"M1926 4650 c-195 -64 -280 -163 -293 -343 -4 -61 -1 -99 12 -147 20\n-73 21 -108 10 -230 -5 -67 -4 -95 8 -130 9 -24 14 -46 11 -49 -5 -6 -86 -18\n-193 -30 -64 -7 -78 -12 -99 -36 -21 -25 -24 -36 -20 -84 4 -47 0 -66 -24\n-118 -17 -34 -28 -70 -26 -80 4 -20 56 -31 160 -32 31 -1 60 -5 63 -11 6 -10\n-11 -47 -88 -187 -45 -83 -54 -93 -78 -93 l-28 0 -3 98 c-3 96 -3 97 -28 97\n-25 0 -25 -1 -30 -104 l-5 -104 -45 -14 c-25 -7 -113 -29 -196 -48 -82 -18\n-186 -45 -230 -59 -43 -13 -113 -34 -154 -46 -84 -25 -183 -72 -218 -104 -32\n-28 -58 -81 -66 -132 -9 -64 13 -251 39 -327 l23 -67 -29 -15 c-66 -35 -71\n-84 -17 -186 35 -67 56 -79 158 -89 41 -4 60 -8 43 -9 -48 -2 -162 -50 -179\n-76 -8 -12 -12 -29 -8 -38 4 -11 -6 -22 -34 -36 -39 -20 -82 -64 -82 -84 0 -5\n11 -20 25 -32 l24 -23 -19 -39 c-10 -21 -32 -51 -49 -67 -38 -37 -50 -99 -27\n-144 21 -40 22 -178 2 -217 -17 -32 -13 -46 24 -95 15 -19 35 -56 44 -83 10\n-26 36 -74 58 -107 59 -90 245 -232 351 -271 45 -16 31 -29 -33 -29 -53 0\n-237 -27 -252 -37 -24 -14 42 -24 240 -35 222 -12 565 -2 917 28 143 12 206\n13 310 4 596 -49 1289 -33 1840 41 83 11 211 26 285 33 l135 13 -183 8 c-100\n4 -180 10 -178 13 3 3 153 6 333 7 181 1 369 8 418 14 145 18 315 52 309 62\n-3 5 -71 10 -152 10 l-147 2 95 12 95 12 -67 2 -68 1 45 61 c25 34 45 68 45\n77 0 8 -13 -3 -28 -24 -36 -50 -92 -98 -141 -124 -67 -34 -263 -54 -287 -30\n-8 8 -19 8 -38 0 -49 -18 -113 -13 -130 11 -13 19 -21 21 -63 16 -26 -4 -136\n-34 -243 -67 -133 -41 -220 -62 -272 -67 -43 -3 -78 -4 -78 -1 0 3 39 39 87\n79 48 41 94 80 102 87 9 7 -4 2 -29 -12 -47 -26 -187 -86 -201 -86 -4 0 -1 16\n7 36 24 58 12 57 -36 -4 -52 -65 -96 -95 -109 -74 -8 13 -47 12 -150 -4 -34\n-5 -34 -5 25 44 76 64 137 129 107 113 -12 -6 -44 -30 -70 -53 -61 -53 -151\n-95 -220 -104 -30 -3 -56 -4 -59 -2 -2 3 22 21 53 41 136 86 151 125 24 61\nl-79 -40 15 30 c14 28 14 31 -5 45 -11 9 -33 23 -49 32 -17 9 -66 58 -110 110\nl-80 94 15 32 16 33 24 -47 c75 -148 171 -223 284 -223 65 0 124 26 169 73 27\n29 36 33 51 24 27 -17 65 22 49 51 -8 15 -5 33 13 78 13 33 27 74 31 93 l7 34\n19 -24 c24 -31 24 -33 -6 -77 -38 -56 -30 -62 10 -6 41 57 42 70 14 100 -11\n12 -23 40 -26 63 -5 36 -3 41 14 41 10 0 28 6 39 14 18 14 18 15 -7 24 -23 9\n-27 18 -32 64 -5 60 -3 66 17 49 11 -9 14 -8 12 6 -1 15 9 19 59 24 33 3 54 6\n47 7 -7 1 -10 7 -7 12 7 11 68 14 78 4 7 -7 -13 -54 -24 -54 -4 0 -7 -17 -6\n-37 3 -41 29 -65 49 -45 9 9 7 12 -10 12 -12 0 -22 5 -22 10 0 17 29 23 45 10\n12 -10 15 -10 15 0 0 6 -9 14 -19 17 -18 5 -18 6 -3 36 10 18 18 33 18 35 1 2\n27 -14 57 -35 56 -38 56 -38 57 -90 0 -29 7 -73 16 -98 8 -25 12 -54 9 -65 -6\n-18 38 -117 75 -170 11 -15 16 -36 13 -51 -4 -20 3 -32 32 -57 42 -37 55 -40\n55 -11 l0 20 27 -21 c31 -24 51 -13 34 18 -20 38 -11 43 32 17 31 -17 58 -25\n92 -25 48 0 50 1 132 85 46 47 83 83 83 79 0 -3 -22 -34 -50 -69 -27 -35 -50\n-70 -50 -79 0 -29 47 -18 95 24 55 48 79 53 65 14 -6 -14 -10 -32 -10 -40 0\n-25 43 -15 78 19 l34 32 -6 -35 -7 -35 22 40 22 39 -24 15 c-69 44 -157 176\n-162 245 -4 50 19 39 37 -19 19 -62 70 -134 106 -152 14 -7 45 -13 69 -13 38\n0 49 5 81 39 21 22 43 59 51 85 14 50 35 57 32 11 -4 -53 -55 -139 -120 -201\n-69 -67 -80 -90 -36 -79 16 4 28 7 29 8 0 1 5 13 11 27 l11 25 11 -29 12 -29\n54 53 c34 34 51 58 48 68 -4 8 2 21 12 28 23 17 11 33 -13 17 -9 -6 -16 -20\n-15 -32 2 -15 -5 -24 -23 -32 -15 -5 -29 -7 -32 -5 -2 3 9 27 25 53 16 26 40\n78 52 115 12 37 27 66 34 65 6 -1 13 6 15 17 3 16 0 18 -22 12 l-26 -6 2 129\nc2 71 6 127 11 124 11 -6 4 91 -7 99 -5 3 -15 27 -21 52 -11 41 -10 46 5 46\n10 0 21 7 24 16 8 21 8 21 -11 26 -11 3 -29 34 -46 75 -15 38 -41 84 -56 101\n-25 27 -29 39 -33 116 -3 65 -9 90 -23 106 -30 34 -118 53 -240 54 -103 1\n-113 -1 -157 -27 -26 -15 -72 -58 -103 -95 -31 -37 -75 -89 -97 -116 -49 -57\n-95 -80 -199 -96 -111 -18 -116 -15 -81 41 l30 46 83 7 c48 4 94 14 109 23 33\n21 241 235 215 221 -11 -6 -56 -46 -101 -90 -44 -43 -85 -78 -91 -78 -6 0 -16\n7 -23 15 -9 11 -8 26 5 72 35 122 135 272 212 321 34 21 47 23 118 19 45 -2\n69 -1 55 3 -14 5 -54 8 -89 9 -77 1 -108 -15 -182 -97 -45 -51 -82 -119 -183\n-331 -14 -31 -56 -42 -124 -34 -70 8 -87 31 -78 106 23 171 86 318 171 395 62\n57 142 92 210 92 24 0 89 -9 145 -20 56 -11 111 -20 123 -19 21 0 20 1 -3 11\n-59 24 -217 58 -270 58 -122 0 -216 -61 -308 -198 -33 -49 -67 -111 -77 -138\n-10 -27 -24 -64 -32 -82 l-13 -34 -52 7 c-62 8 -80 21 -57 38 33 24 37 80 32\n372 -5 264 -4 285 12 292 42 16 47 -2 46 -187 -1 -96 -3 -197 -6 -225 -4 -50\n-4 -50 5 -10 5 22 11 116 13 208 2 123 7 171 16 176 45 28 811 -182 845 -231\n9 -12 14 -23 12 -25 -2 -2 -68 16 -147 41 -141 43 -536 137 -575 135 -27 -1\n42 -21 261 -78 181 -47 335 -92 490 -143 67 -22 70 -25 73 -57 3 -31 2 -33\n-20 -27 -125 35 -304 78 -349 82 -67 8 -125 -14 -188 -71 -50 -46 -120 -150\n-159 -236 -52 -115 -45 -117 12 -4 62 124 130 215 195 260 67 47 138 43 376\n-24 104 -29 197 -57 207 -62 25 -13 33 -89 19 -188 -6 -47 -14 -106 -16 -131\nl-4 -45 12 39 c11 35 13 37 26 22 10 -12 12 -32 7 -74 -7 -63 6 -57 25 12 7\n27 7 46 0 60 -5 12 -12 77 -14 146 -5 146 -19 190 -66 209 -21 9 -31 20 -31\n35 0 32 -26 64 -59 71 -22 5 -35 17 -51 50 -14 30 -30 47 -51 54 -16 5 -29 14\n-29 19 0 6 18 32 41 58 49 59 75 108 83 154 8 41 -5 92 -23 98 -11 4 -12 -4\n-7 -32 11 -56 -11 -115 -60 -168 -24 -26 -49 -59 -56 -73 -10 -22 -16 -25 -37\n-20 -52 13 -52 16 0 206 22 82 22 91 10 177 -17 123 -7 158 65 227 45 42 59\n64 76 116 23 75 33 205 20 269 l-10 45 -1 -46 c-3 -124 -53 -309 -84 -309 -23\n0 -75 -59 -93 -105 -16 -44 -16 -69 2 -227 5 -48 2 -69 -24 -142 -17 -46 -34\n-107 -38 -134 l-6 -49 -64 20 c-35 12 -64 25 -64 31 0 5 16 59 36 120 30 93\n37 130 41 229 3 64 9 117 13 117 4 0 13 -53 20 -117 15 -137 36 -182 26 -58\n-6 77 -5 79 9 46 8 -18 15 -39 15 -47 0 -7 4 -16 10 -19 15 -9 1 51 -33 134\n-26 66 -29 84 -25 158 2 72 1 80 -9 56 -15 -37 -31 -132 -43 -264 -11 -124\n-30 -179 -74 -214 -17 -14 -37 -30 -43 -36 -7 -5 -13 -6 -13 -1 0 4 6 14 13\n21 10 11 9 12 -2 6 -7 -4 -16 -2 -21 5 -6 9 -12 9 -29 1 -14 -8 -21 -8 -21 -1\n0 6 12 16 27 23 14 6 35 30 45 52 17 36 19 37 15 10 -3 -16 -8 -40 -12 -52\n-12 -39 15 -26 32 14 23 55 13 135 -27 214 -60 117 -44 192 73 346 31 40 65\n99 77 130 63 167 66 348 8 468 l-19 40 28 -31 c15 -17 34 -39 41 -50 7 -10 10\n-13 6 -5 -5 10 -3 12 5 7 7 -5 10 -15 7 -23 -3 -8 -1 -11 4 -8 15 9 70 -111\n87 -189 18 -86 11 -175 -22 -290 -13 -44 -22 -83 -19 -85 6 -7 42 81 59 144\n39 150 -1 326 -103 455 -56 71 -113 129 -159 161 -57 39 -62 36 -20 -11 119\n-131 154 -282 107 -464 -35 -139 -144 -307 -224 -346 -74 -36 -106 -97 -106\n-207 0 -70 10 -97 41 -113 31 -17 69 11 69 51 0 36 -27 92 -40 84 -6 -4 -4\n-18 5 -35 10 -19 12 -36 6 -51 l-8 -23 -18 27 c-23 36 -23 133 1 182 16 34 57\n75 76 75 5 0 4 -9 -2 -20 -34 -63 -28 -176 14 -272 18 -43 20 -85 6 -124 -13\n-33 -21 -26 -30 23 l-7 38 -18 -42 c-10 -24 -21 -43 -24 -43 -3 0 -15 14 -26\n31 -11 16 -50 50 -87 74 -37 25 -73 55 -80 67 -22 41 -15 155 15 243 14 44 33\n106 42 138 12 42 28 72 65 111 42 47 49 62 56 112 9 77 0 175 -25 254 -20 63\n-20 64 -1 40 52 -66 87 -218 75 -324 -6 -60 -11 -71 -45 -104 -33 -33 -80\n-108 -80 -128 0 -4 13 12 30 34 16 23 41 49 55 58 38 25 54 64 61 146 11 139\n-43 303 -127 383 -47 45 -47 39 -3 -65 22 -51 29 -86 32 -159 6 -132 -9 -192\n-57 -230 -22 -18 -54 -60 -75 -101 -20 -38 -45 -74 -56 -80 -10 -5 -60 -10\n-110 -10 -95 0 -143 -13 -178 -48 l-20 -20 -7 39 c-9 50 1 62 86 104 69 35\n115 79 125 122 20 78 -20 238 -79 315 -46 59 -57 58 -36 -4 23 -68 26 -206 4\n-248 -19 -37 -50 -53 -155 -80 -120 -31 -137 -16 -78 67 33 45 33 46 30 149\n-2 115 6 147 54 203 21 25 23 31 9 23 -64 -34 -104 -114 -107 -215 -1 -51 -6\n-81 -15 -89 -22 -18 -28 0 -7 23 19 21 19 21 -8 9 -52 -24 -61 -9 -55 83 8\n134 62 243 138 283 62 32 218 4 339 -62 l45 -24 -35 31 c-19 16 -67 46 -105\n64 -182 88 -314 67 -387 -62 -16 -29 -47 -66 -68 -83 l-38 -30 -6 25 c-4 14\n-11 25 -16 25 -9 0 -14 -24 -24 -110 -3 -25 -8 -55 -11 -65 -11 -32 122 114\n171 188 44 68 71 95 34 35 -34 -55 -60 -155 -60 -229 0 -53 5 -78 25 -115 27\n-50 31 -74 15 -74 -5 0 -10 5 -10 11 0 6 -12 -3 -26 -20 -41 -49 -89 -40 -52\n10 23 31 35 119 23 166 -7 26 -8 26 -15 8 -5 -11 -9 -41 -9 -66 -1 -31 -9 -58\n-25 -81 -17 -25 -21 -40 -14 -52 5 -9 5 -16 1 -16 -4 0 -14 12 -20 27 -10 21\n-10 30 0 42 21 27 -22 -8 -66 -54 -21 -22 -36 -32 -33 -22 3 9 9 25 12 35 3 9\n-4 5 -16 -10 -23 -29 -55 -37 -63 -15 -3 9 -8 8 -22 -3 -17 -14 -17 -14 -2 16\n21 40 34 50 82 59 53 9 111 40 130 69 10 15 15 40 13 68 l-3 43 -23 -42 c-22\n-43 -47 -63 -77 -63 -16 0 -16 2 -1 25 24 37 19 40 -19 11 -38 -30 -40 -29\n-25 9 15 40 3 47 -29 15 -36 -37 -72 -46 -121 -31 -121 36 -168 189 -95 305\nl26 41 -29 -33 c-33 -37 -62 -126 -62 -189 0 -62 -7 -73 -49 -73 -20 -1 -54\n-7 -76 -15 -48 -18 -45 -17 -45 -5 0 5 19 22 43 37 52 34 57 41 57 77 0 21 4\n27 15 22 11 -4 15 2 15 27 1 65 54 154 120 197 22 15 57 54 79 88 58 89 204\n192 344 242 45 16 48 19 22 19 -45 1 -131 -24 -204 -60 -76 -38 -177 -134\n-205 -196 -18 -41 -51 -63 -95 -63 -38 0 -94 -23 -127 -52 -43 -38 -68 -85\n-83 -157 -20 -94 -81 -152 -81 -76 0 44 -13 44 -39 1 -27 -42 -26 -52 3 -109\nl23 -47 -25 0 c-26 0 -92 -38 -92 -53 0 -5 -4 -5 -10 -2 -5 3 3 26 20 53 16\n26 34 70 40 97 11 52 43 106 85 145 22 20 25 21 25 6 0 -37 20 -2 44 77 14 45\n37 98 50 118 34 50 97 79 172 79 56 1 58 1 34 15 -14 7 -42 17 -64 20 l-39 7\n32 20 c41 26 33 35 -11 12 -65 -33 -147 -96 -173 -133 -14 -21 -37 -68 -51\n-104 -21 -54 -37 -76 -84 -117 -33 -28 -68 -70 -80 -95 -12 -25 -35 -56 -52\n-70 -33 -28 -58 -34 -38 -10 14 17 6 50 -10 40 -5 -3 -10 -17 -10 -31 0 -15\n-6 -24 -15 -24 -25 0 -18 59 14 126 22 47 45 74 93 114 79 66 98 98 97 170 -1\n79 -17 112 -18 37 -1 -79 -20 -110 -99 -161 -108 -69 -202 -176 -202 -230 0\n-32 -20 -24 -44 17 -33 57 -36 168 -6 235 10 23 17 42 15 42 -2 0 -17 -19 -33\n-43 -41 -59 -61 -134 -69 -252 -5 -82 -3 -106 11 -132 23 -46 4 -50 -42 -8\n-53 47 -86 125 -78 182 5 37 1 49 -27 89 -30 42 -32 51 -31 122 2 94 28 168\n89 251 61 83 136 137 275 199 l25 11 -25 0 c-14 0 -65 -13 -114 -29z m679\n-451 c-19 -28 -35 -56 -35 -63 0 -6 -4 -5 -9 3 -7 11 -12 7 -25 -15 -14 -27\n-15 -28 -16 -6 0 39 39 102 73 117 49 22 50 19 12 -36z m-718 -111 c-3 -7 -5\n-2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m-3 -105 c-9 -48 3 -98 32 -133\nl26 -30 -25 0 c-18 0 -29 9 -41 34 -18 38 -19 63 -9 157 6 57 7 61 15 34 4\n-16 5 -45 2 -62z m183 30 c-13 -27 -29 -67 -37 -91 -16 -51 -33 -68 -49 -49\n-12 15 11 66 67 150 35 52 47 46 19 -10z m188 -19 c-14 -32 -25 -64 -25 -70 0\n-22 -83 -93 -128 -109 -26 -9 -77 -20 -114 -24 -51 -5 -73 -12 -95 -31 -28\n-25 -28 -25 2 8 30 33 82 53 175 68 52 8 145 71 155 106 12 38 47 119 51 115\n2 -2 -8 -30 -21 -63z m-537 -125 c6 -15 25 -38 43 -52 28 -22 31 -27 17 -32\n-12 -5 -25 2 -41 21 -13 15 -29 24 -35 20 -7 -4 -2 -15 15 -32 22 -23 24 -27\n10 -42 -22 -25 -32 -83 -17 -92 8 -5 10 -15 5 -26 -6 -16 -9 -15 -16 11 -12\n37 -3 89 16 105 13 10 12 14 -6 29 -29 23 -39 91 -28 186 5 44 10 82 10 85 1\n3 5 -31 9 -75 4 -44 12 -92 18 -106z m231 -8 c26 -36 18 -42 -11 -8 -27 29\n-38 61 -37 100 1 29 2 28 14 -15 7 -25 22 -60 34 -77z m1654 -93 c3 -87 -9\n-100 -174 -177 -63 -29 -92 -49 -108 -73 l-21 -33 0 29 c0 16 8 35 18 42 20\n16 0 19 -27 4 -14 -7 -20 -4 -29 15 -11 23 -25 27 -49 12 -15 -9 -16 -6 -7 17\n4 11 19 16 47 16 47 0 208 53 250 82 43 31 57 68 58 160 l1 83 20 -60 c11 -33\n21 -86 21 -117z m-944 87 c17 -20 32 -47 32 -60 4 -72 3 -83 -3 -79 -3 2 -8\n-2 -11 -8 -3 -7 -2 6 0 28 7 59 -13 112 -51 135 -19 12 -25 19 -15 19 10 0 31\n-16 48 -35z m-46 4 c61 -47 58 -161 -6 -199 -83 -51 -167 6 -167 114 0 27 8\n41 40 70 47 42 92 48 133 15z m-234 -29 c47 -24 51 -118 8 -158 -31 -30 -41\n-17 -15 19 61 82 -27 175 -97 104 -14 -13 -25 -20 -25 -14 0 5 11 21 25 34 25\n26 72 33 104 15z m346 -20 c3 -5 -1 -10 -9 -10 -9 0 -16 5 -16 10 0 6 4 10 9\n10 6 0 13 -4 16 -10z m111 -62 c-31 -45 -36 -49 -36 -28 0 27 61 111 68 92 2\n-6 -13 -35 -32 -64z m-651 37 c14 -13 25 -30 25 -37 -1 -7 -7 -1 -16 14 -8 16\n-26 30 -42 34 -44 10 -48 12 -19 13 17 1 37 -9 52 -24z m189 -17 c22 -63 -39\n-124 -84 -83 -25 22 -26 71 -3 97 26 29 75 20 87 -14z m-207 0 c16 -15 23 -33\n23 -59 0 -32 -5 -41 -30 -54 -33 -17 -64 -20 -55 -5 3 6 -1 10 -9 10 -31 0\n-48 67 -22 89 11 9 15 8 20 -4 4 -13 10 -14 26 -5 21 11 23 9 33 -35 4 -17 5\n-16 6 4 1 27 -34 71 -57 71 -49 0 -68 -76 -32 -123 19 -24 96 -46 83 -22 -4 5\n-3 7 2 3 4 -4 15 -2 23 5 13 10 14 9 4 -9 -25 -47 -106 -33 -131 23 -16 34\n-14 85 5 111 21 30 79 30 111 0z m567 16 c22 -8 20 -24 -3 -24 -10 0 -21 7\n-25 15 -6 16 3 19 28 9z m-730 -36 c7 -13 17 -39 20 -60 9 -50 -24 -89 -76\n-91 -51 -1 -78 25 -78 75 0 77 98 132 134 76z m-170 -4 c3 -9 5 -28 5 -42 -1\n-21 -2 -23 -6 -7 -7 26 -33 55 -50 55 -8 0 -25 -12 -38 -26 -14 -15 -25 -22\n-25 -16 0 40 100 72 114 36z m24 -30 c-3 -27 -4 -26 -9 8 -3 22 -1 34 4 29 5\n-5 7 -21 5 -37z m404 -17 c13 -33 41 -50 68 -42 11 4 20 2 20 -3 0 -14 -32\n-20 -57 -11 -27 10 -53 59 -52 96 1 20 3 22 6 8 2 -11 9 -33 15 -48z m493 42\nc4 -6 5 -12 3 -14 -7 -7 -48 7 -48 16 0 13 37 11 45 -2z m-953 -26 c24 -28 29\n-67 12 -91 -15 -22 -58 -30 -68 -13 -3 4 5 6 17 4 14 -3 29 3 40 15 15 16 16\n23 4 44 l-12 25 -25 -29 c-28 -33 -40 -35 -40 -9 0 19 36 71 49 71 4 0 15 -8\n23 -17z m-150 -10 c25 -28 30 -60 18 -98 -19 -57 -66 -68 -114 -26 -16 13 -18\n14 -14 1 2 -8 18 -22 35 -31 l30 -15 -122 -30 -122 -30 10 26 c8 21 15 25 39\n22 48 -7 141 8 130 21 -13 16 -14 96 -1 128 18 46 83 64 111 32z m1103 -3 c-6\n-10 -45 -1 -45 10 0 4 11 5 25 2 14 -2 23 -8 20 -12z m-1267 -16 c17 -12 22\n-25 22 -60 0 -72 -54 -106 -108 -68 -28 20 -31 93 -4 116 34 30 59 34 90 12z\nm760 -51 c14 -12 13 -13 -9 -13 -23 0 -24 3 -20 43 5 36 6 38 9 12 2 -16 11\n-36 20 -42z m883 37 c10 0 21 -5 25 -11 11 -19 14 -69 4 -69 -21 0 -60 24 -60\n37 0 11 4 11 21 3 37 -21 43 -4 6 18 -21 12 -37 27 -37 34 0 9 3 9 12 0 7 -7\n20 -12 29 -12z m-1331 -19 c0 -13 -29 -35 -37 -28 -7 8 15 37 28 37 5 0 9 -4\n9 -9z m611 -11 c-13 -11 -28 -20 -35 -20 -6 0 3 9 19 19 39 25 46 25 16 1z\nm544 -19 c137 -36 272 -85 297 -108 10 -9 16 -23 13 -30 -2 -8 -1 -11 4 -8 11\n6 63 -97 94 -186 l22 -64 42 -1 c38 -2 42 0 33 16 -6 10 -19 22 -30 25 -11 3\n-20 10 -20 15 0 5 7 7 15 4 8 -4 15 -2 15 4 0 14 -21 29 -53 37 -41 11 -33 27\n9 19 31 -6 36 -4 32 12 -2 11 -20 25 -48 35 -51 19 -70 46 -24 35 57 -15 79\n-30 82 -60 2 -16 22 -70 44 -120 59 -134 98 -227 98 -235 0 -4 -23 -4 -51 -1\n-38 5 -56 13 -70 31 -30 40 -75 140 -99 219 -12 41 -33 98 -46 127 -25 59 -48\n73 -144 94 -78 17 -82 5 -5 -14 81 -20 109 -37 129 -76 24 -45 85 -289 92\n-363 7 -67 6 -68 -17 -68 -58 1 -219 34 -219 46 0 2 -14 67 -30 146 -41 194\n-76 328 -90 342 -9 8 -9 5 -1 -14 12 -29 51 -218 51 -250 0 -13 4 -19 11 -14\n8 4 9 -1 4 -16 -4 -12 -1 -60 5 -106 7 -47 11 -87 9 -88 -5 -4 -189 22 -204\n29 -5 2 23 2 63 -2 64 -5 72 -4 72 12 0 30 -81 379 -90 389 -15 15 -159 31\n-171 19 -8 -8 -8 -41 1 -121 7 -60 10 -116 8 -123 -2 -7 -10 44 -17 114 -8 69\n-11 133 -7 143 5 14 15 16 69 10 34 -4 79 -11 99 -17 41 -11 39 -4 94 -284 28\n-144 30 -152 40 -143 9 9 -76 412 -90 426 -15 16 -172 45 -202 37 -19 -4 -23\n-18 -37 -112 -9 -60 -22 -152 -28 -206 -13 -114 -8 -125 58 -134 40 -5 41 -5\n37 23 -4 28 -4 28 6 5 7 -17 7 -28 -1 -37 -16 -19 -45 -17 -104 5 -37 15 -49\n24 -47 38 6 45 52 391 55 416 3 20 0 26 -9 23 -23 -9 -26 12 -3 24 11 7 18 14\n15 17 -3 4 -1 12 5 20 25 30 218 2 424 -62 43 -13 81 -22 83 -20 6 6 -181 64\n-293 91 -55 13 -123 24 -151 24 -48 0 -55 -3 -93 -42 l-41 -43 -293 -1 c-375\n-1 -629 -28 -857 -91 -52 -14 -112 -28 -133 -31 -36 -4 -38 -3 -28 16 14 26\n66 46 198 76 164 37 359 60 763 92 113 9 224 17 248 19 l43 4 -22 -30 c-12\n-17 -18 -33 -14 -37 4 -4 16 7 28 23 12 17 36 45 55 64 l33 34 87 -6 c48 -4\n137 -20 197 -36z m-1121 -32 c-23 -26 -85 -26 -109 1 -21 23 -11 27 11 5 32\n-32 102 -4 105 43 1 10 3 8 6 -6 3 -14 -3 -32 -13 -43z m245 12 c9 -6 -1 -10\n-30 -13 -52 -6 -61 -2 -28 11 31 12 41 13 58 2z m-176 -28 c-7 -2 -19 -2 -25\n0 -7 3 -2 5 12 5 14 0 19 -2 13 -5z m-203 -23 c0 -5 -8 -10 -17 -10 -15 0 -16\n2 -3 10 19 12 20 12 20 0z m2081 -52 c-5 -13 -23 -52 -39 -86 -17 -35 -36 -96\n-42 -135 -13 -76 -29 -115 -54 -136 -21 -17 -20 -13 4 34 11 22 20 55 19 75\nl-1 35 -8 -35 c-7 -30 -37 -66 -48 -56 -2 2 4 18 12 35 21 41 20 56 -6 75 -16\n12 -19 18 -10 22 17 8 5 24 -13 17 -18 -6 -20 -43 -3 -43 6 0 9 -2 6 -5 -10\n-10 -38 7 -38 24 0 24 20 41 50 43 14 1 -4 4 -39 7 l-64 6 27 32 c14 17 40 34\n56 38 17 4 28 11 24 16 -9 16 -68 10 -109 -11 -45 -23 -45 -23 -45 -11 0 13\n75 41 109 41 46 0 141 -22 135 -31 -3 -5 -1 -9 5 -9 5 0 25 18 43 40 39 46 40\n47 29 18z m-1093 -13 c-3 -3 -9 2 -12 12 -6 14 -5 15 5 6 7 -7 10 -15 7 -18z\nm692 -7 c0 -21 -3 -29 -10 -22 -5 5 -7 19 -4 32 9 31 14 27 14 -10z m-703 -73\nc-21 -218 -31 -301 -40 -310 -6 -7 -8 0 -4 20 12 66 30 303 24 318 -13 34\n-566 16 -857 -28 -177 -26 -197 -33 -227 -73 -36 -49 -51 -64 -30 -29 44 71\n47 74 100 85 190 42 518 72 783 72 151 0 194 3 210 15 30 22 47 -7 41 -70z\nm-104 -22 c4 -24 -1 -67 -15 -120 -20 -76 -24 -83 -48 -84 -20 0 -18 -3 15\n-14 39 -12 36 -13 -60 -13 -96 0 -101 5 -22 22 18 4 27 13 27 26 0 17 -5 19\n-32 13 -18 -3 -42 -10 -53 -15 -20 -9 -20 -9 0 7 11 8 36 18 57 21 34 6 37 9\n43 48 13 90 15 93 38 91 12 -1 14 0 5 2 -10 2 -18 13 -18 23 0 17 14 26 46 29\n6 0 14 -16 17 -36z m-1010 -124 c-20 -33 -79 -103 -67 -79 11 22 75 110 80\n110 3 0 -3 -14 -13 -31z m34 -71 c-23 -57 -41 -104 -42 -104 0 -1 -22 -5 -48\n-8 l-48 -7 15 29 c28 54 136 192 150 192 11 0 4 -26 -27 -102z m193 83 c34 -7\n35 -8 35 -56 0 -35 5 -52 15 -57 11 -5 10 -7 -5 -7 -11 -1 -60 -14 -108 -31\n-49 -16 -104 -30 -122 -30 l-34 0 41 100 42 100 50 -6 c28 -3 67 -9 86 -13z\nm1816 -18 c-10 -10 -19 5 -10 18 6 11 8 11 12 0 2 -7 1 -15 -2 -18z m-2286\n-88 c0 -57 -4 -95 -10 -95 -11 0 -14 172 -3 183 12 13 13 7 13 -88z m2469\n-115 l22 -45 -24 28 c-29 34 -54 105 -62 172 -4 45 -2 41 18 -30 13 -44 33\n-100 46 -125z m-829 145 c0 -24 -10 -48 -35 -80 -19 -25 -39 -63 -46 -83 -11\n-37 -41 -54 -55 -31 -6 10 62 99 103 135 36 31 29 78 -11 82 -29 4 -29 3 -24\n-42 3 -25 2 -46 -3 -46 -5 0 -9 -6 -9 -13 0 -8 -9 -22 -19 -31 -19 -17 -19\n-17 -6 21 8 21 14 52 15 69 0 39 16 54 57 54 31 0 33 -2 33 -35z m-22 -21 c-5\n-28 -28 -29 -28 -1 0 13 3 27 7 31 10 10 25 -10 21 -30z m1007 -2 c-9 -9 -35\n8 -35 23 0 13 3 12 20 -2 11 -9 17 -19 15 -21z m-1912 11 c-7 -2 -21 -2 -30 0\n-10 3 -4 5 12 5 17 0 24 -2 18 -5z m-64 -7 c-2 -2 -29 -6 -59 -9 -36 -4 -46\n-3 -30 3 25 8 97 13 89 6z m828 -48 c-2 -13 -4 -5 -4 17 -1 22 1 32 4 23 2\n-10 2 -28 0 -40z m310 20 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z\nm-812 -12 c81 -24 295 -68 313 -64 18 4 55 -26 45 -36 -4 -3 4 -6 16 -6 34 0\n78 -27 85 -52 3 -13 9 -79 12 -148 l7 -125 -28 40 c-15 22 -40 54 -55 70 -19\n21 -32 49 -40 90 -6 33 -19 79 -28 102 -15 37 -22 43 -57 51 -71 14 -428 -4\n-549 -28 -129 -25 -225 -61 -257 -97 l-24 -26 40 26 c44 29 167 67 303 94 114\n23 489 26 516 4 15 -13 38 -79 50 -148 l5 -32 -56 26 c-78 36 -152 36 -226 0\n-59 -29 -134 -103 -162 -158 l-17 -34 33 40 c88 107 150 145 246 153 53 4 70\n1 116 -22 61 -29 127 -91 163 -152 53 -90 149 -392 131 -411 -11 -11 -15 -2\n-51 125 -56 194 -117 292 -208 335 -50 24 -132 22 -185 -4 -61 -30 -137 -118\n-178 -207 -66 -143 -45 -127 -175 -129 -63 -1 -108 1 -100 5 8 4 16 21 18 37\nl3 30 -23 -35 -24 -35 -104 -7 c-58 -5 -130 -14 -160 -23 -81 -21 -205 -30\n-215 -16 -4 7 -5 14 -4 16 2 2 44 8 93 14 57 7 96 17 108 27 25 23 23 88 -7\n248 -32 172 -40 180 -150 171 -158 -12 -748 -92 -844 -114 -42 -9 -42 -9 -28\n12 23 36 53 44 257 72 107 14 256 35 330 45 74 11 184 22 243 26 104 7 109 6\n132 -16 28 -26 31 -23 13 15 -6 14 -22 28 -34 31 -27 7 -238 -11 -378 -31 -55\n-8 -101 -15 -103 -15 -12 0 47 64 78 85 62 44 129 63 317 89 101 15 204 35\n231 46 58 23 157 49 226 61 74 12 282 3 340 -15z m1553 -55 c17 -23 32 -50 32\n-59 0 -10 -9 -3 -21 18 -12 19 -33 48 -48 64 -15 16 -20 27 -11 24 8 -2 30\n-24 48 -47z m-709 -86 c1 -32 -18 29 -22 75 l-6 55 14 -60 c8 -33 14 -64 14\n-70z m546 66 c97 -53 275 -169 275 -181 0 -6 -61 21 -135 60 -74 38 -143 70\n-153 70 -9 0 -28 -7 -40 -16 -24 -17 -23 -18 -40 46 -6 19 -13 43 -17 54 -7\n16 -5 17 16 11 13 -4 56 -24 94 -44z m-251 -36 c15 -24 36 -51 47 -59 17 -11\n19 -18 10 -34 -7 -13 -11 -109 -11 -267 0 -183 -3 -246 -12 -243 -8 3 -11 69\n-9 244 l2 241 -25 30 c-22 26 -49 133 -33 133 3 0 17 -20 31 -45z m501 -36\nc10 -28 14 -53 10 -57 -8 -8 -25 18 -25 41 0 10 -7 34 -15 54 -13 30 -13 34\n-1 23 8 -6 22 -34 31 -61z m-2641 37 c-92 -34 -150 -72 -187 -121 -28 -38 -38\n-44 -82 -50 -200 -25 -339 -47 -360 -57 -14 -6 -37 -32 -52 -57 -19 -32 -28\n-41 -31 -29 -6 32 31 90 87 134 65 52 161 85 376 133 77 17 169 40 205 50 90\n27 118 25 44 -3z m2691 -24 c-15 -16 -16 -15 -4 12 7 15 15 23 17 16 3 -7 -3\n-19 -13 -28z m-947 -7 c51 -7 99 -19 107 -25 26 -21 38 -114 39 -292 1 -97 -2\n-180 -7 -184 -7 -8 -88 3 -249 32 l-86 16 -21 50 c-17 40 -21 72 -21 152 0 99\n-11 204 -25 239 -11 26 8 21 43 -13 24 -23 41 -30 71 -30 49 0 60 15 32 41\n-12 11 -21 22 -21 24 0 8 41 5 138 -10z m560 -29 c2 -14 1 -26 -2 -26 -8 0\n-116 48 -116 52 0 2 26 2 57 2 55 -2 58 -3 61 -28z m-712 4 c19 0 34 -4 34\n-10 0 -14 -40 -11 -75 6 -16 8 -22 12 -12 9 10 -3 34 -5 53 -5z m414 -12 c52\n-6 103 -18 112 -26 25 -20 32 -139 20 -305 -6 -79 -14 -151 -18 -161 -6 -16\n-14 -17 -58 -12 -106 14 -96 -6 -98 200 l-2 181 -6 -180 c-3 -99 -8 -179 -12\n-177 -5 1 -16 2 -25 2 -17 0 -18 14 -15 168 3 160 -7 255 -33 316 -7 17 -5 18\n16 13 13 -4 67 -12 119 -19z m817 -70 c-11 -35 -21 -64 -22 -66 -3 -4 -65 20\n-65 25 0 3 101 101 107 103 0 0 -8 -28 -20 -62z m-3487 -45 c-58 -51 -65 -54\n-129 -67 -30 -6 -56 -16 -58 -23 -3 -8 9 -7 43 3 65 19 72 18 67 -10 -5 -26\n-13 -29 -106 -42 l-49 -7 15 29 c27 52 67 80 187 130 76 32 80 30 30 -13z\nm967 -41 c19 -12 31 -54 53 -184 23 -131 21 -161 -10 -178 -18 -10 -616 -68\n-876 -86 -100 -6 -102 -6 -117 17 -19 30 -37 140 -40 237 -2 59 1 76 15 86 20\n14 164 34 603 81 350 37 356 38 372 27z m-1014 -182 c22 -228 25 -242 44 -268\n15 -21 31 -28 69 -33 72 -8 36 -17 -106 -27 -126 -10 -150 -6 -150 24 0 10 15\n14 53 14 28 0 68 3 88 6 36 6 36 7 23 33 -8 14 -14 37 -14 50 0 23 -1 23 -82\n16 -46 -4 -84 -9 -86 -10 -2 -2 1 -20 7 -41 6 -21 6 -33 1 -28 -14 14 -40 149\n-39 197 1 30 4 21 10 -32 5 -41 10 -75 11 -77 2 -1 39 1 83 4 l80 7 -2 89 c-1\n50 -5 96 -7 103 -6 16 -95 18 -144 4 -29 -9 -33 -8 -30 7 2 12 21 20 68 29\n114 20 114 20 123 -67z m-38 4 c-25 -9 -125 -20 -125 -13 0 4 10 10 23 12 28\n5 115 7 102 1z m9 -67 c4 -24 4 -51 0 -60 -8 -22 -93 -35 -105 -16 -10 16 -12\n103 -2 112 3 4 28 7 54 7 l47 0 6 -43z m-127 -64 c-3 -10 -5 -2 -5 17 0 19 2\n27 5 18 2 -10 2 -26 0 -35z m2596 -4 c125 -20 147 -26 147 -41 0 -12 -8 -18\n-22 -18 -20 0 -281 40 -284 43 -1 1 -5 13 -9 26 -6 18 -4 23 6 19 8 -3 80 -16\n162 -29z m215 -51 c3 -13 -3 -18 -22 -18 -14 0 -26 2 -26 4 0 2 -3 12 -6 21\n-6 13 -1 16 22 13 18 -2 30 -10 32 -20z m131 -6 c22 -5 37 -15 42 -29 6 -15 4\n-21 -4 -18 -7 2 -45 9 -84 15 -62 10 -73 15 -73 32 0 20 18 20 119 0z m-299\n-17 c57 -9 106 -18 108 -20 6 -6 -10 -74 -22 -91 -11 -15 -22 -15 -119 -4 -59\n7 -113 18 -121 24 -8 6 -21 35 -29 65 l-16 54 47 -6 c26 -3 94 -13 152 -22z\nm-2496 -11 c4 -9 5 -18 4 -20 -2 -1 -31 -6 -64 -9 -56 -7 -62 -6 -66 13 -5 17\n0 22 26 25 72 9 94 7 100 -9z m2906 -15 c0 -17 -39 -9 -50 11 -9 18 -8 18 20\n9 16 -6 30 -15 30 -20z m-240 -10 c0 -24 -30 -78 -48 -88 -29 -15 -34 -14 -24\n7 6 9 13 35 16 58 7 37 10 41 32 36 13 -2 24 -8 24 -13z m-1797 5 c3 -3 -3\n-14 -14 -25 -25 -25 -24 -70 1 -170 23 -88 36 -122 62 -160 l18 -27 -38 -4\nc-20 -3 -45 -8 -55 -13 -15 -6 -17 -4 -12 17 3 13 -3 75 -14 138 -25 136 -26\n198 -5 228 14 21 44 29 57 16z m1985 -28 c8 -9 -12 -78 -30 -101 -14 -18 -29\n-25 -55 -25 -57 0 -166 21 -156 31 4 4 26 4 48 -1 22 -5 54 -9 70 -9 21 1 10\n6 -33 16 -45 11 -60 18 -53 26 5 7 14 30 21 53 l12 41 86 -14 c47 -7 88 -15\n90 -17z m-2074 10 c-6 -16 -24 -19 -274 -41 -91 -8 -182 -18 -202 -21 -30 -4\n-38 -3 -38 9 0 20 13 23 155 37 355 34 366 35 359 16z m925 -71 l0 -20 -8 20\nc-5 11 -11 36 -15 55 l-6 35 14 -35 c8 -19 15 -44 15 -55z m-1731 58 c-10 -2\n-28 -2 -40 0 -13 2 -5 4 17 4 22 1 32 -1 23 -4z m912 -8 c0 -8 -2 -15 -4 -15\n-2 0 -6 7 -10 15 -3 8 -1 15 4 15 6 0 10 -7 10 -15z m2010 -9 c0 -14 -4 -28\n-10 -31 -6 -4 -10 7 -10 24 0 17 5 31 10 31 6 0 10 -11 10 -24z m-1320 -11 c0\n-21 -45 -141 -64 -170 -9 -14 -29 -31 -44 -36 -37 -14 -406 -106 -459 -115\n-39 -6 -43 -4 -52 18 -12 32 -54 238 -50 242 2 2 88 9 191 16 111 7 232 21\n300 35 135 28 178 31 178 10z m-1360 -17 c-9 -24 -34 -244 -35 -311 l0 -38\n-45 3 c-38 3 -46 7 -48 25 -4 30 56 225 74 239 8 6 14 21 14 32 0 30 21 72 36\n72 10 0 11 -6 4 -22z m40 -20 c0 -9 4 -19 8 -22 4 -3 114 6 243 19 286 30 269\n30 269 5 0 -11 -1 -20 -2 -21 -2 0 -119 -13 -261 -28 -177 -19 -262 -32 -267\n-41 -14 -23 -22 -203 -10 -234 10 -27 9 -28 -7 -15 -26 20 -33 32 -29 45 3 6\n9 74 16 150 13 168 18 194 31 173 5 -7 9 -22 9 -31z m1072 32 c-28 -12 -419\n-36 -429 -27 -3 4 -4 9 -1 12 4 4 289 20 413 23 33 1 36 -1 17 -8z m-459 -85\nc4 -25 4 -33 -2 -20 -4 11 -11 38 -14 60 -4 25 -4 33 2 20 4 -11 11 -38 14\n-60z m1615 44 c56 -7 102 -16 102 -22 0 -6 -21 -7 -52 -3 -151 19 -208 29\n-208 38 0 6 12 8 28 5 15 -3 73 -11 130 -18z m-2344 -33 c-4 -9 -39 -15 -127\n-20 -67 -4 -140 -9 -162 -12 -33 -4 -37 -3 -22 6 10 6 80 17 155 25 75 7 142\n13 149 14 7 0 10 -5 7 -13z m1534 -5 c9 -5 2 -10 -24 -14 -45 -8 -57 -1 -23\n12 30 12 31 12 47 2z m-1548 -25 c0 -3 -11 -40 -25 -83 -22 -70 -27 -78 -51\n-80 -19 -1 -23 2 -15 10 33 33 -7 127 -54 127 -66 0 -75 -103 -12 -131 18 -8\n16 -9 -12 -4 -19 3 -43 12 -52 21 -23 21 -43 80 -34 102 5 13 3 14 -6 5 -18\n-18 -1 -82 31 -115 26 -25 35 -28 94 -28 36 0 66 -4 66 -9 0 -15 -91 -23 -144\n-12 -56 10 -77 31 -101 100 -26 76 -23 82 38 82 46 0 250 13 270 17 4 1 7 0 7\n-2z m2334 -22 c39 -5 46 -10 55 -37 15 -42 15 -42 -18 -14 -17 14 -60 32 -100\n42 -80 19 -93 30 -26 21 25 -3 65 -9 89 -12z m-784 -9 l25 -14 -35 -1 c-19 0\n-50 -9 -68 -20 -44 -27 -37 -3 8 28 38 26 37 26 70 7z m660 -12 c118 -32 260\n-126 260 -172 0 -31 -13 -26 -49 19 -47 59 -124 106 -221 134 -120 35 -148 47\n-90 40 25 -3 70 -13 100 -21z m-1453 -5 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3\n-3 4 -12 1 -19z m1303 -3 c43 -22 71 -61 77 -105 6 -45 23 -37 23 11 0 33 24\n41 74 24 43 -15 108 -63 101 -74 -2 -5 9 -14 26 -21 38 -16 125 -119 150 -177\n60 -139 97 -346 85 -473 -10 -105 -27 -200 -36 -200 -17 0 -18 29 -3 96 18 87\n12 292 -12 379 -26 94 -79 199 -125 249 -168 182 -387 65 -476 -255 -14 -48\n-18 -101 -18 -207 -1 -171 -14 -150 -25 38 l-8 125 -1 -121 c-1 -75 4 -153 13\n-203 l16 -82 -54 -65 c-30 -36 -69 -92 -88 -125 -51 -89 -62 -100 -38 -39 27\n72 54 115 106 171 l43 46 -15 64 c-8 35 -15 92 -15 125 0 50 -4 64 -20 75 -20\n14 -20 14 -1 54 24 50 17 128 -12 133 -39 8 -241 -176 -294 -266 -21 -35 -28\n-41 -38 -30 -23 25 -204 256 -217 277 -9 15 -9 24 -2 31 19 19 135 -121 220\n-265 9 -16 13 -13 38 29 58 99 266 286 303 272 9 -4 13 4 13 23 0 16 14 55 30\n86 24 46 28 60 18 72 -23 28 -168 -15 -278 -83 -53 -32 -76 -42 -84 -34 -8 8\n-4 17 14 31 38 30 150 86 200 99 75 21 173 30 188 18 7 -6 14 -9 16 -7 1 2 13\n22 27 44 13 22 41 59 63 83 34 37 38 46 33 78 -8 47 -32 82 -65 95 -53 21\n-191 2 -327 -45 -13 -5 -12 -2 5 8 94 58 295 80 370 41z m365 -26 c4 -17 9\n-28 12 -25 3 3 0 19 -6 37 l-11 32 46 -6 c26 -2 50 -11 55 -18 13 -21 10 -120\n-5 -154 l-12 -30 -7 32 c-3 17 -21 46 -39 65 -31 31 -58 77 -58 99 0 21 19 -3\n25 -32z m-2580 22 c-3 -5 1 -15 8 -23 17 -18 15 -53 -3 -53 -10 0 -15 11 -16\n35 -1 35 3 50 12 50 3 0 3 -4 -1 -9z m63 -65 c-2 -20 -9 -32 -21 -34 -15 -3\n-16 0 -6 22 9 20 9 32 1 51 -17 38 -14 43 9 16 13 -16 19 -36 17 -55z m2676\n20 c11 -82 14 -90 13 -28 -1 34 0 62 3 62 15 0 52 -34 65 -60 32 -63 6 -156\n-51 -182 -29 -14 -43 -1 -44 42 -1 22 -2 23 -11 8 -5 -10 -17 -18 -24 -18 -18\n0 -18 -5 1 71 10 40 14 80 10 110 -6 44 -5 47 13 42 15 -4 22 -16 25 -47z\nm-1914 24 c0 -5 -17 -10 -37 -10 -21 0 -123 -7 -228 -15 -202 -16 -261 -18\n-253 -10 4 4 269 29 413 38 28 2 62 4 78 5 15 1 27 -2 27 -8z m899 -4 c-2 -2\n-29 -16 -59 -31 -41 -21 -51 -23 -40 -10 16 19 66 44 89 45 8 0 12 -2 10 -4z\nm-884 -72 c3 -26 3 -50 -2 -55 -4 -4 -116 -17 -248 -29 -132 -11 -251 -21\n-265 -23 -23 -2 -25 1 -28 48 -1 28 1 55 5 61 7 9 334 38 484 43 l47 1 7 -46z\nm1346 29 c7 -7 -20 -12 -77 -17 -93 -7 -212 -42 -281 -82 -24 -14 -43 -21 -43\n-17 0 13 95 62 178 93 42 16 70 29 61 30 -24 0 -117 -34 -187 -69 -34 -17 -62\n-29 -62 -27 0 10 120 71 169 86 60 19 224 21 242 3z m685 2 c50 -35 57 -125 9\n-125 -23 0 -25 4 -25 44 0 25 -4 56 -10 70 -11 29 -4 32 26 11z m74 -45 c34\n-83 -60 -230 -148 -230 -59 0 -71 16 -17 23 62 6 94 31 128 98 31 60 31 106 0\n142 -18 19 -17 20 3 9 12 -6 27 -25 34 -42z m-1391 -34 c-3 -3 -18 12 -33 32\nl-29 37 34 -32 c18 -18 31 -35 28 -37z m2290 48 c2 -2 -36 -4 -85 -4 -49 0\n-100 -3 -114 -7 -14 -3 -22 -3 -18 2 16 18 198 25 217 9z m-2122 -18 c29 -36\n49 -104 35 -118 -8 -8 -15 -1 -25 24 -8 19 -28 50 -46 70 -17 19 -28 38 -24\n42 14 13 42 5 60 -18z m2183 4 c11 -8 7 -9 -15 -4 -37 8 -45 14 -19 14 10 0\n26 -5 34 -10z m-1 -30 c28 -13 56 -31 62 -41 8 -17 6 -19 -20 -19 -19 0 -35 8\n-44 20 -23 34 -86 60 -142 60 -67 0 -170 -25 -222 -55 -24 -13 -43 -20 -43\n-16 0 16 105 60 180 75 56 11 177 -2 229 -24z m80 -34 c-2 -2 -13 8 -23 22\nl-19 27 24 -22 c12 -12 21 -24 18 -27z m-1870 25 c21 -14 -50 -127 -76 -123\n-45 8 -94 1 -158 -22 -77 -28 -106 -26 -120 7 -11 24 5 42 77 86 86 52 234 79\n277 52z m1703 -22 l23 -10 -40 -43 c-36 -39 -42 -43 -67 -34 -15 6 -28 13 -28\n17 0 14 62 81 75 81 8 0 24 -5 37 -11z m-2632 -42 c0 -5 -7 -4 -15 3 -8 7 -15\n20 -15 29 1 13 3 13 15 -3 8 -11 15 -24 15 -29z m270 29 c0 -3 -4 -8 -10 -11\n-5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m-314 -37 c34 -11 70 -27\n80 -35 19 -15 18 -15 -1 -9 -11 4 -62 20 -112 36 -92 30 -123 47 -60 34 17 -3\n59 -15 93 -26z m276 -4 c3 -13 2 -22 -2 -20 -11 7 -20 45 -10 45 4 0 10 -11\n12 -25z m1604 -3 c-4 -3 -14 2 -24 12 -16 18 -16 18 6 6 13 -6 21 -14 18 -18z\nm-2838 3 c-2 -2 -27 -8 -55 -13 -40 -7 -53 -6 -53 3 0 19 5 20 60 16 28 -1 50\n-4 48 -6z m3810 -4 c3 -9 -2 -11 -17 -6 -52 16 -137 -45 -179 -130 -43 -86\n-66 -186 -66 -290 -1 -55 3 -126 7 -157 5 -36 5 -58 -1 -58 -18 0 -24 35 -30\n178 -5 136 -6 142 -26 142 -19 0 -19 1 4 17 14 9 26 17 27 18 2 1 13 38 26 83\nl24 81 -29 27 -28 28 -55 -18 c-31 -9 -86 -33 -123 -52 -43 -23 -58 -27 -42\n-14 43 36 182 100 218 100 19 0 47 -9 62 -20 l29 -21 17 26 c9 14 35 39 58 55\n32 24 49 30 80 28 22 -2 41 -9 44 -17z m-1342 -17 c-4 -9 -9 -15 -11 -12 -3 3\n-3 13 1 22 4 9 9 15 11 12 3 -3 3 -13 -1 -22z m355 -3 c13 -11 22 -22 19 -25\n-3 -3 -19 6 -35 19 -17 13 -25 24 -19 25 7 0 22 -9 35 -19z m463 -5 c-6 -16\n-24 -23 -24 -8 0 10 22 33 27 28 2 -2 1 -11 -3 -20z m-2911 7 c-7 -2 -21 -2\n-30 0 -10 3 -4 5 12 5 17 0 24 -2 18 -5z m2369 -67 c-32 -69 -100 -151 -132\n-159 -26 -7 -25 9 2 31 12 9 34 29 50 44 34 32 39 61 6 31 -39 -35 -66 -45\n-88 -33 -31 16 -24 30 15 30 20 0 49 7 64 15 16 8 31 12 33 9 3 -2 20 20 39\n50 19 30 36 53 38 51 2 -2 -10 -33 -27 -69z m-2537 54 c-3 -5 -13 -10 -21 -10\n-8 0 -14 5 -14 10 0 6 9 10 21 10 11 0 17 -4 14 -10z m-140 -10 c-11 -5 -45\n-16 -75 -25 -30 -9 -88 -34 -129 -56 -84 -45 -78 -27 9 26 57 35 143 64 190\n64 23 0 23 -1 5 -9z m396 -39 c-13 -46 -91 -38 -91 10 0 14 7 19 28 18 22 -1\n23 -2 5 -6 -30 -6 -19 -33 13 -33 19 0 26 7 31 31 3 19 9 26 13 19 4 -7 4 -24\n1 -39z m931 22 c32 -35 121 -210 109 -217 -4 -3 -18 14 -31 37 -13 23 -52 74\n-87 114 -35 40 -61 78 -58 83 11 18 41 10 67 -17z m-1667 -10 c3 -16 14 -49\n25 -75 23 -61 6 -75 -19 -16 -25 57 -37 118 -22 118 6 0 13 -12 16 -27z m865\n17 c8 -5 11 -10 5 -10 -5 0 -17 5 -25 10 -8 5 -10 10 -5 10 6 0 17 -5 25 -10z\nm3321 -52 c28 -55 16 -47 -21 14 -18 29 -25 46 -16 39 10 -8 26 -32 37 -53z\nm-3718 5 c-87 -115 -132 -256 -134 -428 -1 -68 -4 -90 -9 -70 -13 52 -10 187\n5 254 9 35 13 66 11 68 -7 8 -36 -97 -43 -156 -4 -33 -14 -63 -27 -78 -20 -22\n-22 -23 -44 -7 -19 13 -21 18 -10 31 7 8 22 19 34 23 18 7 23 22 33 85 15 100\n14 105 -8 105 -48 0 -232 -172 -268 -251 -19 -42 -21 -43 -42 -30 -17 11 -7\n31 67 129 53 72 123 133 190 166 17 9 32 21 32 26 0 15 33 12 58 -6 13 -9 25\n-14 26 -13 2 2 18 27 36 54 28 42 118 145 127 145 2 0 -14 -21 -34 -47z m324\n15 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m611 8 c26 -13 64\n-38 86 -55 45 -36 52 -37 65 -14 14 25 25 9 11 -16 -15 -28 -25 -27 -79 14\n-36 26 -70 39 -141 54 -105 23 -123 32 -62 29 23 -1 45 2 49 5 10 11 21 8 71\n-17z m1695 10 c9 -7 17 -16 17 -20 0 -12 -18 -6 -41 14 -28 22 -6 28 24 6z\nm1012 -28 c20 -17 47 -52 60 -78 48 -95 69 -292 45 -420 -11 -58 -14 -65 -28\n-56 -5 3 -3 32 4 68 18 82 17 176 -1 260 -50 240 -173 281 -264 88 -24 -50\n-26 -66 -26 -180 1 -106 4 -134 24 -183 12 -31 27 -55 32 -52 5 4 6 -1 3 -9\n-4 -10 7 -29 29 -51 55 -55 112 -44 159 29 17 27 19 28 13 6 -22 -78 -82 -128\n-131 -110 -42 17 -63 38 -95 102 -41 81 -59 167 -59 284 0 151 43 272 113 315\n46 28 81 24 122 -13z m-3256 -13 c-12 -19 -23 -35 -25 -35 -6 0 14 40 29 58\n18 23 16 12 -4 -23z m100 9 c14 -12 -19 -1 -35 12 -18 14 -18 14 6 3 14 -6 27\n-13 29 -15z m2131 -9 c33 -17 38 -25 16 -25 -14 0 -67 39 -53 40 4 0 21 -7 37\n-15z m-2780 -2 c-1 -19 -48 -88 -72 -106 l-28 -21 -22 21 c-13 11 -34 24 -47\n28 -23 7 -23 7 9 27 68 41 160 70 160 51z m3512 -3 c2 -17 -39 -111 -50 -115\n-10 -4 -12 0 -7 12 4 10 14 40 22 66 8 27 19 47 24 45 6 -2 11 -6 11 -8z\nm-2822 -9 c0 -29 -126 -103 -175 -103 -51 0 -105 35 -105 68 0 3 17 -7 37 -21\n58 -39 97 -34 163 20 53 43 80 55 80 36z m1581 -23 c87 -67 141 -228 121 -362\nl-11 -71 5 62 c12 149 -71 334 -167 373 -98 41 -223 -106 -248 -290 l-10 -75\n4 81 c7 129 62 247 138 295 45 28 121 22 168 -13z m-1481 -2 c8 -4 -1 -4 -20\n-1 -19 3 -39 10 -44 15 -10 10 19 3 64 -14z m999 -16 c-13 -37 -28 -38 -53 -3\n-11 14 -14 23 -8 19 6 -3 13 -2 17 4 3 5 17 10 30 10 22 0 23 -2 14 -30z m991\n15 c33 -17 38 -25 16 -25 -14 0 -67 39 -53 40 4 0 21 -7 37 -15z m-1997 -26\nl37 -10 0 -56 c0 -51 -1 -54 -17 -42 -18 15 -73 98 -73 111 0 10 7 10 53 -3z\nm2457 4 c0 -5 -12 -17 -27 -27 -25 -18 -25 -11 0 22 10 13 27 16 27 5z m-430\n-34 c0 -12 -51 0 -69 17 -11 10 -7 11 28 2 22 -6 41 -14 41 -19z m-265 10 c4\n-6 4 -27 0 -47 l-8 -37 -12 40 c-6 22 -10 43 -8 48 6 10 21 9 28 -4z m575 -39\nc28 -27 50 -56 50 -65 0 -8 -1 -15 -3 -15 -1 0 -32 29 -67 65 -44 45 -59 65\n-47 65 10 0 40 -22 67 -50z m642 36 c10 -7 30 -40 45 -72 25 -54 28 -69 28\n-174 -1 -98 -4 -122 -23 -165 -13 -27 -30 -57 -39 -67 -9 -10 -12 -18 -6 -18\n33 0 72 91 80 183 3 37 10 64 14 60 13 -13 -11 -155 -34 -202 -12 -25 -34 -54\n-49 -65 -26 -19 -30 -19 -62 -3 -19 9 -40 26 -47 39 -11 22 -11 22 7 6 10 -9\n31 -19 45 -23 25 -6 29 -2 53 48 41 83 54 210 32 308 -9 42 -23 84 -30 94 -9\n13 -8 -2 5 -51 10 -38 18 -96 18 -129 1 -105 -43 -236 -83 -243 -14 -3 -12 5\n13 50 37 67 55 155 47 233 -9 84 -23 130 -50 162 -21 25 -25 26 -41 13 -38\n-32 -55 -90 -55 -196 0 -108 7 -164 21 -164 5 0 12 12 15 27 5 18 2 30 -10 38\n-23 17 -20 25 14 36 37 13 40 39 5 39 -20 0 -25 5 -25 25 0 18 5 25 20 25 24\n0 27 32 4 51 -13 10 -17 10 -25 -2 -5 -8 -9 -9 -9 -3 0 21 27 47 44 41 24 -9\n36 -50 36 -120 0 -83 -15 -132 -48 -157 l-27 -22 -14 34 c-18 43 -20 219 -3\n275 26 85 86 126 134 89z m-4154 -38 c40 -58 94 -168 84 -168 -9 0 -63 78\n-113 162 -37 62 -13 67 29 6z m1352 15 c26 -9 84 -15 139 -15 59 0 89 -3 80\n-9 -22 -14 -161 -11 -211 5 -25 7 -57 21 -69 31 -20 14 -20 16 -4 10 11 -4 40\n-14 65 -22z m1209 12 c81 -42 137 -217 112 -350 -5 -30 -7 -15 -8 60 0 141\n-39 233 -120 282 -42 25 -29 32 16 8z m-1310 -85 c-1 -117 4 -124 87 -116 35\n4 65 2 68 -2 3 -5 -18 -12 -47 -16 -82 -9 -97 -8 -97 11 0 12 -3 14 -10 7 -7\n-7 -7 -19 -1 -36 l9 -25 64 13 c65 14 126 18 116 8 -3 -3 -46 -11 -94 -19\n-126 -18 -128 -16 -121 132 5 102 10 133 23 133 2 0 4 -41 3 -90z m908 68 c-3\n-8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z m-1417 -12 c0 -30 23 -50 49\n-41 10 3 22 1 25 -4 4 -6 -10 -13 -30 -17 -30 -5 -40 -3 -51 11 -15 22 -18 75\n-3 75 6 0 10 -11 10 -24z m380 14 c0 -5 16 -27 35 -49 19 -21 35 -41 35 -44 0\n-2 -16 -7 -36 -9 -34 -4 -38 -1 -64 41 l-28 45 21 12 c28 15 37 16 37 4z\nm1965 -32 c-24 -46 -55 -78 -77 -78 -15 0 -17 -6 -12 -44 6 -39 4 -45 -16 -51\n-12 -4 -23 -5 -25 -3 -2 2 -7 27 -11 56 l-7 52 31 0 c34 0 82 36 109 81 23 38\n29 29 8 -13z m112 18 c8 -8 -26 -7 -54 0 -38 10 -26 23 13 14 19 -5 38 -11 41\n-14z m-1913 -76 c2 -71 1 -80 -11 -64 -7 10 -13 28 -13 40 0 33 12 115 17 111\n2 -3 5 -42 7 -87z m-658 28 c-44 -62 -70 -128 -82 -213 -8 -49 -14 -99 -13\n-110 0 -18 1 -19 8 -2 4 11 7 -3 7 -35 0 -59 41 -159 95 -231 l31 -42 -42 45\nc-53 57 -76 102 -96 187 -29 126 2 307 67 386 33 40 51 51 25 15z m244 18 c0\n-9 -30 -14 -35 -6 -4 6 3 10 14 10 12 0 21 -2 21 -4z m100 -27 c15 -28 5 -23\n-15 7 -9 15 -12 23 -6 20 6 -4 16 -16 21 -27z m2225 21 c-3 -5 -24 -10 -46\n-10 -21 0 -39 5 -39 10 0 6 21 10 46 10 27 0 43 -4 39 -10z m655 1 c0 -5 -24\n-26 -52 -47 -78 -56 -116 -90 -180 -161 -65 -72 -88 -69 -29 4 94 117 261 247\n261 204z m-2340 -34 c0 -12 -113 -5 -122 8 -14 19 -8 20 57 11 36 -6 65 -14\n65 -19z m1031 -15 c47 -51 63 -103 64 -208 0 -95 -2 -103 -30 -150 -57 -91\n-123 -84 -175 19 -16 33 -30 67 -30 76 1 9 9 -6 20 -33 24 -62 46 -86 80 -86\n37 0 56 23 34 41 -28 23 -63 85 -75 133 -8 34 -16 46 -33 48 -19 3 -21 9 -18\n52 3 61 29 117 61 132 28 14 76 3 102 -24z m654 8 c-3 -5 -28 -10 -56 -10 -27\n0 -49 5 -49 10 0 6 25 10 56 10 34 0 53 -4 49 -10z m296 -62 c38 -40 69 -80\n69 -88 0 -15 -107 85 -141 133 -39 53 3 27 72 -45z m-1973 27 c10 -10 -59 -5\n-79 5 -10 6 -19 7 -19 2 0 -17 27 -33 64 -39 42 -7 47 -19 11 -25 -14 -3 -25\n-1 -25 3 0 5 -6 9 -14 9 -17 0 -60 56 -52 69 5 8 103 -12 114 -24z m2618 0\nc18 -43 18 -140 -1 -180 -12 -27 -13 -23 -8 55 3 47 1 102 -5 123 -13 47 -6\n48 14 2z m-3446 -7 c-35 -37 -60 -95 -69 -156 l-9 -57 -1 46 c0 25 6 66 14 90\n15 45 57 99 76 99 5 0 0 -10 -11 -22z m510 -18 c0 -14 -11 -22 -42 -30 -111\n-29 -392 -110 -396 -115 -11 -10 22 -64 41 -68 12 -3 7 -4 -12 -4 -29 2 -36 7\n-42 31 -10 37 12 81 51 101 27 14 360 104 388 105 6 0 12 -9 12 -20z m377 -2\nc-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z m-722 -20 l20 -21 -25\n17 c-13 9 -41 16 -60 16 -65 0 -110 -66 -110 -160 0 -64 19 -109 59 -143 38\n-32 59 -34 109 -8 43 22 67 46 81 81 7 19 10 21 10 7 1 -29 -29 -85 -57 -107\n-57 -45 -148 -12 -189 70 -29 57 -31 150 -4 200 40 76 118 99 166 48z m1891\n-24 c11 -76 -2 -213 -25 -276 -41 -106 -108 -140 -196 -99 l-40 19 36 1 c37 1\n94 35 84 51 -3 5 0 12 6 16 8 5 10 3 4 -7 -6 -11 -4 -10 8 1 29 28 57 119 63\n208 9 124 46 177 60 86z m87 33 c14 -36 18 -151 8 -215 -30 -196 -133 -332\n-251 -332 -78 0 -154 73 -195 189 -23 65 -17 72 12 16 34 -67 68 -101 119\n-121 64 -24 106 -13 163 44 79 80 114 183 115 339 1 63 5 93 12 93 7 0 14 -6\n17 -13z m245 -4 c-10 -2 -28 -2 -40 0 -13 2 -5 4 17 4 22 1 32 -1 23 -4z\nm-1488 -13 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4\n11 -10z m1846 -52 c83 -89 147 -168 141 -174 -3 -3 -54 44 -114 106 -60 61\n-107 113 -104 116 12 12 33 -1 77 -48z m-2694 10 c-10 -18 -17 -42 -15 -53 3\n-16 2 -17 -6 -5 -8 11 -11 1 -13 -40 -1 -46 -2 -49 -5 -16 -3 22 -2 49 1 60 7\n25 43 86 52 86 3 0 -3 -15 -14 -32z m-699 -217 c50 -58 59 -78 29 -62 -44 24\n-186 209 -192 251 -6 44 5 34 58 -46 32 -49 80 -113 105 -143z m1144 223 c-3\n-3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m-52 -11 c-11 -3 -92 -25\n-179 -49 -88 -24 -162 -42 -164 -39 -2 2 16 9 39 16 185 52 287 78 304 77 l20\n0 -20 -5z m65 -27 c0 -10 -31 -18 -111 -31 -61 -9 -112 -15 -115 -13 -2 2 47\n16 109 30 61 14 113 27 115 27 1 1 2 -5 2 -13z m260 -5 c0 -4 -19 -11 -42 -14\n-114 -16 -127 -15 -53 2 99 23 95 23 95 12z m-180 -39 c0 -16 63 -72 81 -72\n10 0 34 14 52 30 47 41 59 38 17 -5 -48 -50 -88 -48 -141 5 -43 43 -46 50 -24\n50 8 0 15 -4 15 -8z m1087 -29 c-3 -10 -5 -4 -5 12 0 17 2 24 5 18 2 -7 2 -21\n0 -30z m-1640 -25 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m511\n20 c18 -18 15 -25 -9 -23 -28 2 -48 35 -21 35 10 0 23 -5 30 -12z m157 2 c-3\n-5 -21 -10 -38 -9 -31 1 -31 1 -7 9 36 11 52 11 45 0z m129 0 c20 -7 26 -17\n26 -38 0 -16 17 -55 38 -88 47 -72 53 -89 40 -102 -18 -18 29 -148 70 -195 14\n-16 17 -16 33 -1 16 15 19 14 33 -15 13 -25 14 -35 4 -57 -12 -25 -10 -29 45\n-80 32 -30 57 -54 55 -54 -2 0 -30 -5 -63 -10 -33 -5 -150 -19 -260 -30 -110\n-12 -244 -27 -297 -35 -149 -23 -164 -18 -63 16 85 29 201 86 192 95 -2 3 -53\n-13 -113 -34 -128 -46 -193 -61 -177 -40 5 7 29 40 53 73 l44 60 -67 -62\nc-105 -97 -201 -138 -138 -59 17 21 31 41 31 43 0 2 -19 -8 -42 -22 -126 -78\n-154 -86 -337 -95 -190 -9 -225 -4 -309 40 -51 27 -53 30 -22 24 44 -9 138 -9\n147 -1 3 4 0 40 -7 80 -7 40 -10 82 -7 93 3 13 5 9 6 -12 1 -39 27 -124 43\n-146 7 -9 29 -20 49 -23 l37 -7 -19 54 c-10 29 -18 64 -18 78 1 21 3 19 11\n-10 11 -41 21 -53 45 -56 10 -1 26 -5 35 -9 13 -5 20 -1 26 15 8 21 8 21 20\n-5 13 -27 13 -27 34 -9 15 14 22 16 25 7 8 -22 31 -14 54 19 23 32 23 32 29 8\n9 -37 26 -34 51 9 27 49 43 51 64 11 9 -17 20 -30 25 -30 5 0 23 21 41 47 l32\n46 18 -22 18 -22 16 37 c8 20 15 38 15 40 0 2 14 25 30 51 35 55 37 73 10 98\n-21 19 -27 50 -11 59 5 3 28 -1 51 -9 23 -8 44 -15 45 -15 8 0 25 106 25 150\n0 27 4 60 10 74 l9 25 50 -25 c44 -23 53 -25 85 -14 20 6 49 28 67 51 17 21\n32 39 34 39 2 0 15 -4 29 -10z m76 0 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3\n6 8 10 11 10 2 0 4 -4 4 -10z m530 -2 c0 -6 -51 -64 -114 -127 -62 -64 -116\n-126 -120 -139 -4 -12 -11 -22 -15 -22 -24 0 -254 197 -266 227 -13 35 9 22\n97 -59 51 -46 108 -96 126 -111 l34 -27 25 37 c14 21 66 82 115 136 83 89 118\n115 118 85z m1703 0 c-50 -67 -173 -216 -186 -226 -23 -19 -44 -9 -107 49\nl-55 51 50 -35 c97 -66 82 -70 184 52 79 95 100 116 120 120 2 1 -1 -5 -6 -11z\nm-3565 -95 c-25 -32 -67 -91 -93 -131 -26 -40 -50 -70 -53 -68 -2 3 16 40 41\n83 46 78 135 188 144 179 3 -3 -15 -31 -39 -63z m2499 45 c-3 -8 -6 -5 -6 6\n-1 11 2 17 5 13 3 -3 4 -12 1 -19z m-1979 -8 c22 -7 23 -8 6 -9 -11 -1 -29 6\n-40 15 -10 8 -13 12 -6 9 8 -4 26 -11 40 -15z m5 -31 c21 5 47 17 58 27 25 23\n25 0 -1 -26 -42 -42 -103 -32 -131 22 -9 19 -7 18 13 -4 21 -25 27 -27 61 -19z\nm1857 4 c-11 -17 -11 -17 -6 0 3 10 6 24 7 30 0 9 2 9 5 0 3 -7 0 -20 -6 -30z\nm-1424 -10 c-3 -16 -11 -56 -17 -91 -6 -34 -16 -65 -22 -69 -6 -4 -8 3 -3 18\n3 13 11 57 17 97 6 39 16 72 21 72 5 0 7 -12 4 -27z m887 -14 c-10 -17 -26\n-38 -37 -47 -10 -9 -4 4 15 31 37 53 49 62 22 16z m-1041 -102 c-31 -66 -81\n-130 -116 -149 -11 -6 0 12 26 39 46 50 107 156 109 190 1 17 2 17 6 0 3 -10\n-9 -46 -25 -80z m-802 -35 c-16 -39 -30 -79 -30 -88 0 -10 -3 -15 -6 -11 -4 3\n-1 28 5 54 17 65 55 152 59 132 1 -8 -11 -47 -28 -87z m424 -10 c68 -59 115\n-66 192 -27 l49 24 -28 -24 c-57 -50 -131 -52 -198 -4 -33 23 -89 95 -89 113\n0 6 8 -3 18 -19 10 -17 36 -45 56 -63z m2801 23 c44 -29 95 -60 113 -69 19\n-10 32 -20 29 -23 -6 -6 -19 1 -160 80 -70 39 -104 63 -96 68 15 9 9 12 114\n-56z m325 61 c0 -2 -8 -10 -17 -17 -16 -13 -17 -12 -4 4 13 16 21 21 21 13z\nm-3832 -88 c44 -29 95 -61 113 -72 37 -20 25 -35 -13 -16 -66 34 -188 116\n-188 127 0 7 2 13 4 13 3 0 41 -24 84 -52z m2483 25 c13 -16 12 -17 -3 -4 -10\n7 -18 15 -18 17 0 8 8 3 21 -13z m-1988 -147 c46 -57 140 -123 205 -142 31 -9\n64 -19 72 -21 13 -4 12 -6 -2 -14 -12 -7 -32 -6 -60 2 -99 26 -181 85 -255\n182 -26 34 -53 67 -59 72 -7 6 -10 24 -7 43 l5 33 35 -58 c20 -32 49 -76 66\n-97z m2121 108 c29 4 37 3 26 -4 -8 -5 -28 -10 -43 -10 -27 0 -97 24 -97 34 0\n3 17 -2 37 -10 24 -11 51 -14 77 -10z m-826 -73 c37 -21 95 -53 129 -70 85\n-42 89 -57 6 -26 -72 28 -213 110 -213 126 0 14 7 12 78 -30z m-655 -19 c-2\n-10 -16 -32 -29 -48 -23 -26 -24 -27 -13 -4 14 29 40 70 44 70 2 0 1 -8 -2\n-18z m-775 -44 c-5 -18 -19 -60 -29 -93 l-19 -60 3 45 c4 41 39 140 51 140 2\n0 0 -15 -6 -32z m-308 -23 c19 -14 29 -25 23 -25 -12 0 -73 49 -62 50 3 0 20\n-11 39 -25z m189 -52 c2 -2 2 -5 0 -8 -6 -5 -129 51 -129 59 0 4 117 -42 129\n-51z m2093 -25 c-16 -29 -44 -79 -63 -110 l-34 -58 -51 0 c-65 0 -154 17 -222\n42 -69 26 -63 32 8 8 70 -24 219 -37 247 -22 11 6 35 35 53 64 68 109 80 128\n86 128 3 0 -8 -24 -24 -52z m-254 -73 c29 -9 51 -19 49 -22 -8 -8 -129 28\n-191 57 -103 47 -107 62 -6 21 52 -21 119 -46 148 -56z m-1841 4 c63 -23 95\n-44 47 -30 -35 10 -122 49 -112 50 4 1 33 -9 65 -20z m2198 -38 c-21 -41 -61\n-70 -86 -64 -20 5 -19 7 7 18 16 7 42 27 58 44 37 38 41 39 21 2z\" />\n<path d=\"M2500 3845 c-81 -43 -55 -172 37 -191 28 -6 37 -2 68 29 25 25 35 44\n35 66 0 47 -25 87 -61 100 -40 14 -48 13 -79 -4z m97 -27 c33 -31 32 -91 -3\n-123 -41 -38 -85 -32 -109 16 -22 41 -18 77 10 104 30 31 71 32 102 3z\" />\n<path d=\"M2514 3812 c-16 -10 -27 -49 -15 -56 5 -3 17 -3 27 1 16 6 16 7 -2\n14 -18 7 -18 7 0 14 11 5 21 3 26 -5 5 -9 9 -9 15 -1 8 13 -12 41 -29 41 -6 0\n-16 -4 -22 -8z\" />\n<path d=\"M1901 3724 c-55 -69 16 -148 87 -98 26 18 30 69 6 102 -22 31 -67 29\n-93 -4z m79 -4 c11 -11 20 -28 20 -38 0 -28 -34 -54 -67 -50 -24 3 -28 8 -31\n40 -2 28 2 40 20 52 29 20 34 20 58 -4z\" />\n<path d=\"M1567 3688 c-28 -22 -32 -73 -8 -97 36 -36 99 -19 102 27 4 57 -11\n82 -50 82 -15 0 -35 -6 -44 -12z m76 -19 c14 -23 0 -67 -24 -74 -23 -8 -59 19\n-59 43 0 43 61 66 83 31z\" />\n<path d=\"M1436 3668 c4 -7 3 -8 -5 -4 -32 20 -59 -67 -28 -92 25 -21 63 -24\n81 -7 20 21 21 79 0 99 -18 19 -59 22 -48 4z m-4 -65 c6 -7 20 -13 31 -13 16\n0 18 -3 9 -12 -9 -9 -18 -9 -37 0 -20 9 -25 18 -24 44 1 22 3 26 6 13 3 -11\n10 -26 15 -32z m48 16 c0 -12 -27 -11 -35 1 -11 17 5 32 21 19 8 -6 14 -15 14\n-20z\" />\n<path d=\"M3134 3367 c4 -24 23 -110 44 -192 41 -164 41 -165 125 -180 34 -7\n37 -5 37 16 0 24 -70 291 -89 342 -11 29 -61 57 -102 57 -19 0 -21 -4 -15 -43z\" />\n<path d=\"M3395 3188 c4 -13 22 -45 40 -73 18 -27 38 -60 44 -72 8 -16 21 -23\n40 -23 27 0 29 2 22 27 -5 17 -16 29 -31 33 -29 7 -37 27 -13 32 12 3 4 9 -23\n16 -36 10 -54 27 -54 48 0 3 10 -2 22 -10 25 -18 58 -21 58 -6 0 6 -1 10 -2\n10 -2 0 -27 9 -56 20 l-54 20 7 -22z\" />\n<path d=\"M2019 3110 c-143 -17 -319 -82 -369 -136 -25 -26 -24 -26 20 4 25 17\n56 34 70 37 22 6 20 2 -17 -34 -69 -70 -70 -76 -43 -300 12 -108 26 -200 30\n-204 4 -5 63 -3 131 3 133 13 153 22 164 70 8 38 -22 246 -42 288 -16 33 -15\n34 17 67 41 43 83 63 168 81 l67 14 -56 -5 c-79 -7 -138 -30 -181 -72 -35 -34\n-44 -37 -130 -48 -51 -7 -108 -16 -125 -19 -28 -6 -33 -5 -33 11 0 28 41 90\n79 118 93 68 219 90 511 88 213 -1 222 0 166 13 -63 15 -255 35 -321 33 -22\n-1 -70 -5 -106 -9z m-80 -272 c9 -26 41 -233 41 -271 0 -42 -27 -54 -140 -66\n-58 -5 -108 -7 -111 -3 -3 4 -14 63 -23 132 -9 69 -20 142 -23 162 -5 36 -5\n37 33 44 54 10 143 21 182 23 25 1 34 -4 41 -21z\" />\n<path d=\"M1706 2793 c9 -37 18 -45 12 -11 -3 15 0 29 6 32 6 2 3 5 -7 5 -14 1\n-16 -4 -11 -26z\" />\n<path d=\"M1760 2811 c-33 -9 -43 -63 -29 -154 l11 -68 86 6 c48 4 93 8 100 10\n15 5 15 71 -1 150 l-13 60 -64 2 c-36 1 -76 -2 -90 -6z m137 -41 c4 -13 3 -13\n-5 -1 -8 11 -26 13 -79 8 -46 -4 -63 -3 -53 3 24 16 133 8 137 -10z m-12 -51\nc4 -28 3 -55 -1 -59 -5 -5 -30 -11 -55 -15 -46 -7 -46 -7 -53 25 -3 18 -6 45\n-6 61 0 24 4 28 33 32 78 9 75 11 82 -44z m22 -11 c-3 -7 -5 -2 -5 12 0 14 2\n19 5 13 2 -7 2 -19 0 -25z m-170 -10 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7\n2 -19 0 -25z m14 -29 c-5 -13 -10 -19 -10 -12 -1 15 10 45 15 40 3 -2 0 -15\n-5 -28z m162 -39 c-13 -12 -156 -17 -160 -5 -2 6 15 9 42 7 73 -6 115 5 116\n31 2 21 2 21 6 -2 3 -13 1 -27 -4 -31z\" />\n<path d=\"M1845 2583 c-85 -6 -95 -10 -95 -43 0 -28 3 -30 38 -30 20 0 61 3 90\n6 49 6 52 9 52 35 0 18 6 29 18 32 19 5 -26 5 -103 0z m63 -30 c-4 -25 -138\n-33 -138 -9 0 11 14 16 48 19 26 2 57 4 70 5 17 2 23 -3 20 -15z\" />\n<path d=\"M2238 3003 c12 -2 32 -2 45 0 12 2 2 4 -23 4 -25 0 -35 -2 -22 -4z\" />\n<path d=\"M2329 2906 c-116 -41 -205 -151 -244 -303 -24 -91 -16 -95 14 -8 62\n179 135 264 262 309 24 8 35 15 24 15 -11 0 -36 -6 -56 -13z\" />\n<path d=\"M2218 2893 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z\" />\n<path d=\"M2180 2881 c0 -5 -8 -7 -17 -5 -25 6 -47 -11 -40 -30 7 -19 48 -21\n65 -4 15 15 16 48 2 48 -5 0 -10 -4 -10 -9z m-2 -32 c-19 -13 -35 -11 -35 4 0\n9 9 12 25 9 17 -3 20 -7 10 -13z\" />\n<path d=\"M2010 2865 c-9 -11 -10 -31 -2 -82 l11 -68 -5 68 c-4 45 -2 73 6 82\n7 8 10 15 7 15 -2 0 -10 -7 -17 -15z\" />\n<path d=\"M2359 2742 c-25 -16 -62 -49 -82 -73 -35 -40 -87 -135 -87 -158 0 -5\n-24 -12 -52 -14 l-53 -3 52 -2 52 -2 37 71 c36 69 113 158 164 192 14 9 23 16\n19 16 -3 1 -25 -12 -50 -27z\" />\n<path d=\"M2022 2685 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z\" />\n<path d=\"M3039 2849 c-21 -13 -1 -38 35 -45 20 -3 36 -10 36 -15 0 -16 48 -10\n54 7 15 40 7 53 -36 58 -52 6 -73 5 -89 -5z m71 -19 c0 -5 -11 -10 -24 -10\n-14 0 -28 5 -31 10 -4 6 7 10 24 10 17 0 31 -4 31 -10z m45 0 c3 -5 -1 -10 -9\n-10 -8 0 -18 5 -21 10 -3 6 1 10 9 10 8 0 18 -4 21 -10z\" />\n<path d=\"M3237 2895 c3 -22 7 -42 9 -44 8 -9 2 45 -6 64 -7 14 -8 8 -3 -20z\" />\n<path d=\"M1450 2773 c-558 -59 -824 -93 -832 -106 -4 -7 -8 -19 -8 -27 1 -40\n22 -171 35 -217 l16 -53 44 0 c91 0 879 75 909 86 9 3 19 18 23 32 7 29 -11\n163 -33 240 l-15 52 -52 -2 c-29 0 -68 -3 -87 -5z m100 -62 c-8 -5 -51 -12\n-95 -15 -82 -7 -701 -81 -767 -92 -44 -7 -53 11 -10 20 21 5 548 68 742 89 70\n8 145 6 130 -2z m40 -70 c-8 -4 -76 -14 -150 -20 -126 -11 -717 -76 -767 -85\n-27 -4 -31 10 -5 18 14 4 256 32 772 89 70 8 165 6 150 -2z m16 -68 c-3 -4\n-103 -15 -222 -25 -119 -10 -329 -32 -467 -48 -232 -28 -270 -30 -255 -14 7 6\n435 58 653 78 157 15 302 20 291 9z m-1 -73 c-3 -5 -25 -10 -48 -10 -41 0\n-567 -50 -737 -70 -105 -12 -157 -13 -144 -1 8 7 275 38 654 75 171 17 283 19\n275 6z\" />\n<path d=\"M1989 2273 c-11 -3 -19 -20 -24 -50 -4 -28 -16 -55 -31 -70 l-25 -25\n23 7 c47 14 84 42 105 81 13 21 23 45 23 52 0 12 -36 15 -71 5z\" />\n<path d=\"M1643 2224 c-24 -38 -22 -88 6 -118 l23 -25 -28 -4 c-16 -3 1 -3 37\n-2 60 3 225 43 215 52 -2 2 -29 -3 -60 -12 -32 -9 -63 -14 -71 -11 -8 3 -17 1\n-20 -4 -9 -15 -49 -12 -71 5 -18 14 -17 14 9 3 23 -10 30 -9 44 5 30 29 13\n107 -23 107 -17 0 -28 -42 -20 -77 6 -27 6 -27 -9 -9 -18 23 -19 35 -5 70 7\n21 16 26 42 26 25 0 29 3 18 10 -29 19 -69 11 -87 -16z m68 -97 c-4 -4 -8 9\n-8 30 -1 38 -1 38 8 8 5 -16 5 -33 0 -38z\" />\n<path d=\"M1780 2235 c-15 -18 -5 -64 15 -72 8 -3 26 -2 40 1 20 5 25 13 25 36\n0 44 -53 67 -80 35z m29 -26 c-10 -6 -8 -9 8 -9 17 0 21 4 17 18 -5 16 -5 16\n6 -1 14 -21 5 -37 -21 -37 -25 0 -35 26 -18 46 10 12 14 13 17 4 3 -7 -2 -16\n-9 -21z\" />\n<path d=\"M724 2186 c-3 -21 -4 -39 -1 -42 2 -3 8 11 11 32 4 20 5 38 2 41 -2\n3 -8 -11 -12 -31z\" />\n<path d=\"M2787 1961 c-40 -38 -99 -124 -112 -166 -4 -11 8 7 27 40 18 33 56\n84 85 113 61 61 61 69 0 13z\" />\n<path d=\"M2606 1734 c-9 -26 -16 -55 -15 -63 0 -9 9 11 20 44 22 71 18 86 -5\n19z\" />\n<path d=\"M2581 1634 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z\" />\n<path d=\"M2790 1595 c-34 -55 -41 -92 -22 -112 15 -15 17 -12 28 40 6 31 19\n67 28 81 14 22 14 26 2 26 -8 0 -24 -16 -36 -35z\" />\n<path d=\"M2872 1568 c3 -34 15 -43 37 -29 21 14 6 61 -20 61 -17 0 -20 -5 -17\n-32z m28 -8 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4\n11 -10z\" />\n<path d=\"M2910 1495 c-12 -14 -6 -65 11 -95 7 -12 8 -12 9 3 0 10 4 16 9 13\n17 -11 21 25 6 60 -16 39 -18 40 -35 19z m17 -47 c-3 -7 -5 -2 -5 12 0 14 2\n19 5 13 2 -7 2 -19 0 -25z\" />\n<path d=\"M2819 1479 c-21 -41 11 -122 42 -103 8 5 7 9 -5 16 -11 6 -16 23 -16\n50 0 23 3 38 8 34 4 -4 7 -13 7 -18 0 -6 6 -13 13 -15 18 -7 15 44 -4 51 -25\n10 -33 7 -45 -15z\" />\n<path d=\"M2906 1365 c-20 -20 -21 -71 -1 -78 20 -8 28 8 19 46 -6 28 -5 30 10\n18 9 -7 16 -9 16 -3 0 5 -6 15 -14 21 -11 9 -18 8 -30 -4z\" />\n<path d=\"M2946 1310 c-9 -23 -31 -56 -48 -71 -16 -16 -26 -29 -20 -29 23 0 97\n109 89 133 -2 6 -11 -9 -21 -33z\" />\n<path d=\"M3340 4563 c-144 -14 -293 -66 -339 -119 -31 -35 -42 -86 -20 -99 6\n-4 8 -13 5 -20 -8 -21 15 -34 47 -28 27 6 28 4 18 -15 -24 -45 -40 -52 -114\n-52 -50 0 -83 -6 -112 -20 -98 -48 -114 -193 -26 -230 65 -27 133 22 146 105\n9 66 19 81 63 104 20 11 57 40 82 66 25 26 56 52 70 57 24 11 24 11 -15 19\n-148 30 -165 43 -121 96 50 59 216 110 391 121 97 6 104 7 60 13 -53 8 -78 8\n-135 2z m-330 -253 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0\n11 -4 11 -10z m-152 -242 c-2 -17 -8 -33 -15 -35 -9 -3 -10 4 -3 26 4 17 6 40\n3 53 -4 20 -3 21 7 5 6 -9 10 -32 8 -49z\" />\n<path d=\"M2756 4504 c-33 -33 -9 -47 32 -18 23 16 21 34 -3 34 -7 0 -21 -7\n-29 -16z\" />\n<path d=\"M2869 4423 l-24 -28 28 24 c25 23 32 31 24 31 -2 0 -14 -12 -28 -27z\" />\n<path d=\"M3729 4422 l-22 -19 55 -6 c54 -5 126 -34 161 -65 30 -26 18 -4 -20\n39 -62 69 -127 88 -174 51z\" />\n<path d=\"M4312 4375 c14 -27 29 -68 32 -90 4 -21 16 -52 27 -66 11 -15 26 -43\n34 -61 8 -18 14 -27 15 -20 0 7 -11 39 -25 72 -27 65 -30 74 -16 65 17 -10 53\n-119 61 -185 l7 -65 2 62 c2 107 -51 234 -130 308 l-31 30 24 -50z\" />\n<path d=\"M1432 4330 c-80 -119 -113 -264 -93 -412 15 -113 32 -166 25 -78 -8\n92 10 210 48 326 18 54 32 107 30 117 -1 10 7 36 19 58 32 63 16 57 -29 -11z\" />\n<path d=\"M4292 4075 c0 -5 6 -26 13 -45 7 -19 14 -28 14 -20 0 8 -6 29 -14 45\n-7 17 -13 26 -13 20z\" />\n<path d=\"M3971 3904 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z\" />\n<path d=\"M4292 3813 c-8 -51 -20 -118 -27 -149 -11 -48 -11 -54 1 -42 21 20\n45 151 42 222 l-3 61 -13 -92z\" />\n<path d=\"M3705 3819 c-4 -5 -4 -22 0 -37 5 -20 8 -23 16 -11 12 19 12 59 0 59\n-6 0 -13 -5 -16 -11z\" />\n<path d=\"M4598 3567 c4 -111 -10 -201 -40 -260 -24 -48 -18 -59 11 -19 32 45\n42 80 50 172 l8 85 2 -81 c0 -46 -5 -102 -13 -129 -20 -64 -81 -156 -100 -149\n-33 13 -25 67 15 110 11 12 22 39 26 60 l5 39 -24 -45 c-13 -25 -38 -54 -55\n-65 -53 -34 -74 -76 -89 -177 -17 -112 -18 -194 -3 -204 24 -15 34 21 39 149\n5 95 11 140 23 162 l16 30 1 -30 c0 -59 50 -96 80 -60 7 8 18 32 26 52 l13 38\n0 -40 c0 -69 -18 -187 -33 -210 -11 -17 -11 -24 -1 -38 11 -16 14 -13 29 23 9\n22 16 57 17 78 l1 37 13 -30 c28 -60 22 -88 -53 -238 -2 -4 3 -4 12 -1 21 8\n64 98 72 151 5 33 2 51 -16 85 -31 57 -34 167 -5 218 30 55 33 209 6 297 -31\n102 -36 101 -33 -10z m-187 -571 c1 -32 -2 -60 -5 -63 -3 -4 -6 24 -6 62 0 38\n2 66 5 63 3 -3 6 -31 6 -62z\" />\n<path d=\"M4310 3584 c-6 -15 -24 -57 -40 -93 -27 -63 -48 -141 -37 -141 11 0\n69 138 82 195 15 64 12 85 -5 39z\" />\n<path d=\"M4047 3577 c-18 -28 -22 -47 -9 -47 12 0 35 46 30 60 -2 8 -11 2 -21\n-13z\" />\n<path d=\"M3679 3554 c-11 -14 -10 -15 11 -12 13 1 25 9 28 16 5 17 -23 15 -39\n-4z\" />\n<path d=\"M4127 3482 c-27 -38 -53 -100 -45 -107 4 -4 84 112 96 138 2 4 -3 7\n-11 7 -8 0 -26 -17 -40 -38z\" />\n<path d=\"M3821 3383 c-13 -46 -14 -73 -2 -91 5 -9 10 12 14 55 3 37 4 70 2 71\n-2 2 -8 -13 -14 -35z\" />\n<path d=\"M4840 3373 c0 -10 5 -25 11 -33 9 -13 10 -12 5 3 -3 9 -1 17 4 17 6\n0 10 7 10 15 0 8 -7 15 -15 15 -8 0 -15 -8 -15 -17z\" />\n<path d=\"M4668 3215 c-3 -24 4 -52 22 -88 23 -47 25 -49 28 -25 2 15 -4 40\n-12 57 -9 16 -16 44 -16 61 0 41 -17 38 -22 -5z\" />\n<path d=\"M4764 3157 c-1 -72 -5 -91 -36 -157 -33 -70 -35 -72 -31 -34 4 32 -3\n59 -33 129 -22 49 -40 82 -42 73 -2 -8 9 -42 24 -74 17 -36 27 -76 28 -104 0\n-69 -39 -182 -79 -230 -30 -35 -35 -50 -35 -91 0 -27 5 -49 10 -49 6 0 10 15\n10 34 0 37 21 62 45 52 11 -4 13 -16 8 -53 -3 -26 -2 -45 2 -41 4 4 13 0 20\n-9 10 -13 11 -1 7 63 -2 43 -9 81 -13 82 -24 10 3 118 31 125 12 3 31 29 49\n66 15 33 31 58 35 54 3 -3 6 0 6 7 0 7 2 11 5 8 6 -6 -19 -123 -40 -188 -17\n-51 -16 -68 4 -56 15 10 49 123 62 204 11 76 3 158 -24 235 -11 35 -12 32 -13\n-46z m23 -109 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z\" />\n<path d=\"M4512 2918 c-6 -29 -13 -62 -17 -73 -4 -14 -2 -12 9 5 15 26 32 107\n24 116 -3 2 -10 -19 -16 -48z\" />\n<path d=\"M3629 2793 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z\" />\n<path d=\"M4797 2747 c-56 -55 -80 -101 -101 -194 -20 -89 -20 -133 -1 -180 8\n-19 15 -46 15 -59 0 -13 5 -24 10 -24 13 0 13 31 -2 102 -9 46 -9 74 0 131 12\n68 66 206 77 195 3 -3 -5 -27 -17 -54 -28 -63 -36 -221 -14 -304 l14 -55 2 50\nc2 41 3 45 10 25 16 -49 11 -147 -10 -200 -11 -27 -18 -50 -15 -50 3 0 18 19\n35 42 27 36 30 49 30 113 0 51 -7 93 -26 146 -33 96 -29 173 15 278 17 41 29\n76 27 78 -2 2 -24 -16 -49 -40z\" />\n<path d=\"M3805 2657 c-86 -33 -151 -99 -201 -204 -30 -65 -25 -84 7 -21 64\n127 124 189 214 220 27 10 41 17 30 17 -11 0 -34 -6 -50 -12z\" />\n<path d=\"M4865 2510 c-3 -5 -1 -10 5 -10 6 0 8 -5 5 -10 -4 -6 -10 -8 -15 -5\n-4 3 -7 -3 -5 -12 2 -10 4 -27 5 -38 1 -14 8 -7 21 23 19 40 18 62 -1 62 -5 0\n-12 -4 -15 -10z\" />\n<path d=\"M4365 2464 c28 -7 57 -13 65 -13 8 0 -7 7 -35 15 -27 7 -57 13 -65\n13 -8 0 8 -7 35 -15z\" />\n<path d=\"M4623 2335 c0 -22 2 -30 4 -17 2 12 2 30 0 40 -3 9 -5 -1 -4 -23z\" />\n<path d=\"M4493 2326 c20 -20 46 -54 57 -74 10 -20 19 -33 20 -28 1 21 -52 96\n-83 117 -31 22 -31 22 6 -15z\" />\n<path d=\"M3521 2280 c-13 -11 -19 -20 -14 -20 6 0 18 9 28 20 23 25 17 25 -14\n0z\" />\n<path d=\"M4885 2180 c-6 -76 -15 -108 -62 -220 -6 -13 -5 -13 11 -1 21 18 47\n65 57 106 l7 30 1 -31 c1 -46 -25 -112 -64 -163 -34 -43 -44 -74 -26 -85 4 -3\n17 1 27 10 18 14 18 15 -3 9 -33 -9 -28 6 17 50 60 59 74 105 67 228 -3 56 -9\n113 -15 127 -8 21 -11 10 -17 -60z\" />\n<path d=\"M4856 2156 c-8 -42 -59 -113 -91 -128 -30 -13 -33 -28 -6 -28 24 0\n68 35 85 69 14 27 32 121 23 121 -3 0 -8 -15 -11 -34z\" />\n<path d=\"M4727 1984 c-7 -8 14 -54 25 -54 15 0 21 30 8 45 -13 16 -23 19 -33\n9z\" />\n<path d=\"M4897 1836 c-10 -24 -33 -62 -52 -84 -58 -67 -41 -89 18 -23 37 41\n61 97 55 131 -2 15 -8 9 -21 -24z\" />\n<path d=\"M4720 1839 c0 -24 23 -21 28 4 2 10 -3 17 -12 17 -10 0 -16 -9 -16\n-21z\" />\n<path d=\"M4752 1741 c-17 -10 -12 -53 7 -59 9 -3 11 1 7 16 -4 11 -2 23 4 27\n12 7 14 25 3 25 -5 0 -14 -4 -21 -9z\" />\n<path d=\"M4854 1646 c-8 -34 5 -53 20 -29 25 36 27 53 6 53 -12 0 -22 -9 -26\n-24z\" />\n<path d=\"M4773 1615 c-9 -28 -8 -35 3 -35 10 0 12 -11 8 -47 -4 -41 -3 -45 7\n-28 12 18 14 17 30 -20 l18 -40 0 41 c1 29 -5 46 -19 59 -14 13 -20 31 -20 62\n0 52 -13 56 -27 8z\" />\n<path d=\"M4886 1400 c-10 -36 -25 -76 -33 -90 l-16 -25 22 19 c23 21 55 114\n49 144 -2 9 -12 -12 -22 -48z\" />\n<path d=\"M3380 1415 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0\n-10 -7 -10 -15z\" />\n<path d=\"M4745 1410 c-8 -14 3 -30 21 -30 8 0 14 9 14 20 0 21 -24 28 -35 10z\" />\n<path d=\"M3612 1377 c-16 -38 -25 -77 -18 -77 12 0 37 62 33 83 -3 21 -4 20\n-15 -6z\" />\n<path d=\"M4791 1366 c-11 -13 -11 -20 -3 -28 8 -8 13 -7 18 5 10 27 0 41 -15\n23z\" />\n<path d=\"M3510 1335 c0 -8 5 -15 12 -15 6 0 4 -7 -5 -18 -10 -10 -17 -29 -17\n-43 0 -13 -16 -44 -35 -68 -49 -61 -44 -75 29 -81 59 -5 86 -24 86 -59 0 -28\n-41 -99 -90 -155 -31 -35 -50 -67 -50 -82 0 -35 16 -30 36 11 13 27 25 37 58\n45 62 16 64 18 24 19 l-38 1 37 51 c47 67 57 138 23 174 -12 13 -40 27 -61 30\n-21 4 -39 10 -39 14 0 5 11 25 25 45 14 20 25 46 25 57 0 10 5 28 12 38 6 10\n8 26 5 35 -8 20 -37 21 -37 1z\" />\n<path d=\"M3390 1295 c-10 -12 -10 -19 -2 -27 16 -16 42 -2 42 22 0 24 -22 26\n-40 5z\" />\n<path d=\"M4777 1236 c-48 -56 -54 -66 -37 -66 5 0 27 27 49 60 22 33 39 60 37\n60 -1 0 -23 -24 -49 -54z\" />\n<path d=\"M3591 1215 c-43 -49 -39 -58 6 -13 20 21 34 40 31 43 -3 3 -19 -10\n-37 -30z\" />\n<path d=\"M4839 1210 c-14 -14 -36 -33 -48 -43 -37 -30 -15 -32 24 -3 31 24 62\n64 53 70 -2 1 -15 -10 -29 -24z\" />\n<path d=\"M4800 1132 c0 -7 -7 -12 -15 -12 -17 0 -20 -16 -4 -26 6 -3 18 1 27\n10 13 12 14 19 4 28 -9 9 -12 9 -12 0z\" />\n<path d=\"M3524 1054 c11 -45 28 -55 24 -15 -2 19 -9 37 -17 39 -11 4 -12 -2\n-7 -24z\" />\n<path d=\"M4750 1015 c-12 -20 -20 -38 -17 -41 2 -3 15 11 27 31 12 20 20 38\n17 41 -2 3 -15 -11 -27 -31z\" />\n<path d=\"M3279 957 c-36 -45 -46 -68 -15 -32 25 29 50 65 44 65 -2 0 -15 -15\n-29 -33z\" />\n<path d=\"M3436 964 c-4 -10 -14 -14 -26 -11 -13 3 -20 0 -20 -10 0 -22 40 -12\n58 15 8 12 10 22 4 22 -5 0 -13 -7 -16 -16z\" />\n<path d=\"M3708 954 c-12 -11 4 -34 24 -34 13 0 18 6 16 17 -3 18 -29 29 -40\n17z\" />\n<path d=\"M4420 840 c-19 -16 -30 -30 -24 -30 5 0 23 14 39 30 36 38 30 38 -15\n0z\" />\n</g>\n</symbol>"
});
var monster_truck_result = browser_sprite_build_default().add(monster_truck_symbol);
/* harmony default export */ const monster_truck = (monster_truck_symbol);
;// ./src/app/components/car-track/car-track.module.scss
// extracted by mini-css-extract-plugin
var car_track_module_1 = "WZYtBxwY";
var car_track_module_2 = "hDVwszNy";
var car_track_module_3 = "BbW5hMFN";
var _4 = "sUBhieLN";
var _5 = "OXLvhiMd";
var _6 = "srqX1BOw";
var _7 = "BzZcIZqO";
var _8 = "ts9B4p9G";
var _9 = "VwInzo8X";
var _a = "jMqMjVSS";
var _b = "NCWl32zE";
var _c = "MFJ1wEoY";
var _d = "ibhs87zQ";
var _e = "Zuvvjl8H";
var _f = "yeTpqXF5";
var _10 = "Iq99xffw";
var _11 = "sMbzogaj";
var _12 = "br5yvnIE";
var _13 = "fYvc0jWo";


;// ./src/app/components/car-track/car-track.ts











const RESET_TIMEOUT = 2000;
class CarTrack extends BaseComponent {
    carData;
    emitCar;
    boundUnSelect;
    selectButton;
    removeButton;
    carName;
    startButton;
    stopButton;
    racer;
    track;
    racerSvg;
    isAnimating = false;
    constructor(carData, emitCar) {
        super({ elementTag: 'div', classes: [_12] });
        this.carData = carData;
        this.emitCar = emitCar;
        this.boundUnSelect = this.unSelect.bind(this);
        const controls = utility_components.div({ classes: [_5] }, ...this.createControls());
        this.racerSvg = createSvgChunk(monster_truck, ['icon', 'iconShadow']);
        this.racerSvg.style.color = this.carData.color;
        this.racer = utility_components.div({ classes: [_c] });
        this.racer.getElement().append(this.racerSvg);
        const flag = createSvgChunk(img_flag, ['icon']);
        const finish = utility_components.div({ classes: [_7] });
        finish.getElement().append(flag);
        this.track = utility_components.div({ classes: [_11] }, this.racer, finish);
        this.appendChildren(controls, this.track);
        this.addListeners();
    }
    enableStart() {
        this.startButton?.getElement().removeAttribute('disabled');
    }
    enableSelect() {
        this.selectButton?.getElement().removeAttribute('disabled');
    }
    enableRemove() {
        this.removeButton?.getElement().removeAttribute('disabled');
    }
    enableControls() {
        this.enableStart();
        this.enableSelect();
        this.enableRemove();
    }
    disableSelectRemoveControls() {
        this.selectButton?.getElement().setAttribute('disabled', '');
        this.removeButton?.getElement().setAttribute('disabled', '');
    }
    enableSelectRemoveControls() {
        this.enableSelect();
        this.enableRemove();
    }
    async start() {
        await state_machine_machine.makeTransition(state_machine_machine.value, 'startCar', {
            car: this.carData,
        });
    }
    unSelect(car) {
        if (typeof car === 'object' && car.id === this.carData.id)
            return;
        this.racer.removeClasses(_f);
    }
    addListeners() {
        state_machine_machine.on(state_machine_machine.events.machineStateChanged, this.handleStateChange.bind(this));
    }
    createCarControls() {
        this.startButton = utility_components.button({
            classes: [_b, car_track_module_1, 'button'],
            onclick: () => {
                this.startButton?.getElement().setAttribute('disabled', '');
                void this.start();
            },
        }, utility_components.div({ classes: [car_track_module_3], text: 'start' }));
        this.stopButton = utility_components.button({
            classes: [_b, 'button'],
            onclick: () => {
                this.stopButton?.getElement().setAttribute('disabled', '');
                void this.reset();
            },
            disabled: true,
        }, utility_components.div({ classes: [car_track_module_3], text: 'reset' }));
        return utility_components.div({ classes: [_4] }, this.startButton, this.stopButton);
    }
    createControls() {
        this.selectButton = utility_components.button({
            classes: [_e, 'button'],
            text: 'Select',
            onclick: () => {
                if (this.carData.status === CarStatus.STOPPED) {
                    this.racer.addClasses(_f);
                    this.emitCar(this.carData);
                }
            },
        });
        this.removeButton = utility_components.button({
            classes: [_d, 'button'],
            text: 'Remove',
            onclick: () => this.removeCar(),
        });
        this.carName = utility_components.div({
            classes: [_9],
            text: this.carData.name,
        });
        return [
            this.selectButton,
            this.removeButton,
            this.carName,
            this.createCarControls(),
        ];
    }
    async reset() {
        await state_machine_machine.makeTransition(state_machine_machine.value, 'resetCar', {
            car: this.carData,
        });
    }
    async removeCar() {
        await state_machine_machine.makeTransition(state_machine_machine.value, 'removeCar', {
            car: this.carData,
        });
        this.carData.id = Number.NaN;
    }
    // eslint-disable-next-line max-lines-per-function
    handleStateChange(payload) {
        const { trigger, getFullContext, contextData } = payload;
        switch (trigger) {
            case 'startRace': {
                const { pageCars } = getFullContext();
                if (!pageCars.includes(this.carData))
                    break;
                this.handleStartRace(getFullContext());
                break;
            }
            case 'startCar': {
                this.disableSelectRemoveControls();
                if (Number.isNaN(this.carData.id) ||
                    contextData?.car !== this.carData ||
                    !getFullContext().pageCars.includes(this.carData))
                    break;
                this.handleStartRace(getFullContext());
                void state_machine_machine.makeTransition(state_machine_machine.value, 'checkDriveSuccess', {
                    car: this.carData,
                });
                break;
            }
            case 'resetCar': {
                if (contextData?.car?.id !== this.carData.id)
                    break;
                this.handleResetCar(getFullContext());
                break;
            }
            case 'resetRace': {
                this.enableSelectRemoveControls();
                this.handleResetCar(getFullContext());
                break;
            }
            case 'resetToIdle': {
                this.enableSelectRemoveControls();
                break;
            }
            case 'updateCar': {
                if (contextData?.car?.id !== this.carData.id)
                    break;
                this.handleUpdateCar(contextData.car);
                break;
            }
            case 'checkDriveSuccess': {
                if (contextData?.car !== this.carData)
                    break;
                this.updateCarTrack(getFullContext());
                break;
            }
            case 'finishRace': {
                const { pageCars, car } = getFullContext();
                if (contextData?.newWinner &&
                    contextData.newWinner.id === this.carData.id &&
                    car === this.carData &&
                    car &&
                    pageCars.includes(this.carData)) {
                    this.showWinner(contextData.newWinner);
                }
            }
        }
    }
    handleResetCar(context) {
        if (this.startButton && this.stopButton) {
            if (state_machine_machine.value !== 'state:race' && state_machine_machine.value !== 'state:finish') {
                setTimeout(() => {
                    this.startButton?.getElement().removeAttribute('disabled');
                }, RESET_TIMEOUT);
            }
            this.stopButton.getElement().setAttribute('disabled', '');
            this.startButton.addClasses(car_track_module_1);
            this.stopButton.removeClasses(car_track_module_1);
        }
        this.updateCarTrack(context);
    }
    handleUpdateCar(car) {
        this.carData = Object.assign(this.carData, car);
        this.carName?.setText(this.carData.name);
        this.racerSvg.style.color = this.carData.color;
    }
    handleStartRace(context) {
        this.updateCarTrack(context);
        if (this.startButton && this.stopButton) {
            this.startButton.getElement().setAttribute('disabled', '');
            this.stopButton.getElement().removeAttribute('disabled');
            this.startButton.removeClasses(car_track_module_1);
            this.stopButton.addClasses(car_track_module_1);
        }
        this.disableSelectRemoveControls();
    }
    updateCarTrack(context) {
        const updatedCar = context.pageCars.find((car) => car === this.carData);
        if (!updatedCar)
            return;
        this.updateCarData(updatedCar);
        switch (this.carData.driveSuccess) {
            case undefined: {
                if (this.carData.status === CarStatus.STARTED) {
                    this.updateStartedCar();
                    break;
                }
                else if (this.carData.status === CarStatus.STOPPED) {
                    this.updateStoppedCar();
                }
                break;
            }
            case true: {
                this.isAnimating = false;
                if (this.carData.status === CarStatus.STOPPED) {
                    void state_machine_machine.makeTransition(state_machine_machine.value, 'resetCar', {
                        car: this.carData,
                    });
                    break;
                }
                if (state_machine_machine.getFullContext().newWinner)
                    break;
                else
                    this.updateWonCar();
                break;
            }
            case false: {
                this.updateDriveUnsuccessfulCar();
                break;
            }
        }
    }
    updateCarData(updatedCarData) {
        this.carData.status = updatedCarData.status;
        this.carData.distance = updatedCarData.distance;
        this.carData.velocity = updatedCarData.velocity;
        this.carData.driveSuccess = updatedCarData.driveSuccess;
    }
    updateStartedCar() {
        const THROTTLE_DURATION_MS = 2000;
        this.addClasses(_a);
        this.racerSvg.classList.add(_10);
        setTimeout(() => {
            this.racerSvg.classList.remove(_10);
        }, THROTTLE_DURATION_MS);
        this.isAnimating = true;
        const duration = this.carData.distance / this.carData.velocity;
        animate({
            duration,
            timing: easeInQuad,
            draw: this.moveRacer.bind(this),
        });
    }
    updateStoppedCar() {
        this.isAnimating = false;
        this.removeClasses(_a);
        this.racerSvg.classList.remove(_10);
        this.racer.getElement().style = '';
    }
    updateWonCar() {
        const ROUNDING_DIGITS = 2;
        const msInSecond = 1000;
        const timeSeconds = Number((this.carData.distance / this.carData.velocity / msInSecond).toFixed(ROUNDING_DIGITS));
        const winner = {
            id: this.carData.id,
            wins: 1,
            time: timeSeconds,
        };
        state_machine_machine.updateContext({ car: this.carData, newWinner: winner });
        void state_machine_machine.makeTransition(state_machine_machine.value, 'finishRace', {
            newWinner: winner,
        });
    }
    updateDriveUnsuccessfulCar() {
        this.isAnimating = false;
        this.racerSvg.classList.remove(_10);
        if (this.carData.status === CarStatus.STOPPED) {
            void state_machine_machine.makeTransition(state_machine_machine.value, 'resetCar', {
                car: this.carData,
            });
        }
    }
    showWinner(winner) {
        modal.showModal(this.createWinnerMessage(winner));
    }
    createWinnerMessage(winner) {
        const hail = utility_components.div({
            text: 'HAIL',
            classes: [_6],
        });
        const name = utility_components.div({
            text: `${this.carData.name} !!!`,
            classes: [_6, _13],
        });
        const message = utility_components.div({
            text: `who finished The METAL HELLSYNC RACE first in ${winner.time} seconds!`,
            classes: [_6],
        });
        return utility_components.div({}, hail, name, message);
    }
    moveRacer(progress) {
        const RACER_WIDTH = 57;
        const distance = this.track.getElement().clientWidth - RACER_WIDTH;
        if (!this.isAnimating)
            return;
        this.racer.getElement().style.transform = `translateX(${distance * progress}px)`;
    }
}

;// ./src/app/components/garage/event-emitter-garage-manager.ts

class EmitterGarageManager extends event_emitter_generic {
}
/* harmony default export */ const event_emitter_garage_manager = (EmitterGarageManager);

;// ./src/app/components/garage/garage.module.scss
// extracted by mini-css-extract-plugin
var garage_module_1 = "LJ47YIpq";
var garage_module_2 = "HrbuP_IL";
var garage_module_3 = "UvrNm0Rz";
var garage_module_4 = "VMcpLhzn";
var garage_module_5 = "RqNa2oHI";
var garage_module_6 = "IXzZJ2sb";
var garage_module_7 = "q7jA39S3";
var garage_module_8 = "OEsoqyA7";
var garage_module_9 = "Wf4cakw0";
var garage_module_a = "uFT6HPLP";
var garage_module_b = "EpQAe_n2";
var garage_module_c = "kh1tMZiK";
var garage_module_d = "N3he4XmW";


;// ./src/app/components/garage/garage.ts











const INITIAL_CARS_TOTAL = 0;
const DEFAULT_NON_SELECTED_CAR_COLOR = '#ffffff';
const garage_RESET_TIMEOUT = 2000;
class Garage extends BaseComponent {
    raceContainer;
    totalHeading;
    pageHeading;
    prevButton;
    nextButton;
    nameInputNew;
    imageInputNew;
    colorInputNew;
    nameInputUpdate;
    imageInputUpdate;
    colorInputUpdate;
    newCarButton;
    updateCarButton;
    generateButton;
    startAllButton;
    resetAllButton;
    carsPageNumber = config.DEFAULT_CARS_PAGE_NUMBER;
    carsPerPage = config.DEFAULT_CARS_PER_PAGE;
    carsTotal = INITIAL_CARS_TOTAL;
    selectedCar = undefined;
    pageCars = [];
    emitterGarageManager = new event_emitter_garage_manager();
    events = {
        carSelected: 'carSelected',
        carDropSelected: 'carDropSelected',
        inputNewChanged: 'inputNewChanged',
        inputUpdateChanged: 'inputUpdateChanged',
    };
    constructor() {
        super({ elementTag: 'div', classes: [garage_module_3] });
        const navigation = this.createNavigation();
        this.raceContainer = utility_components.div({ classes: [garage_module_a] });
        this.appendChildren(...this.createLines(), this.raceContainer, navigation);
        this.addListeners();
    }
    addListeners() {
        state_machine_machine.on(state_machine_machine.events.machineStateChanged, this.handleStateChange.bind(this));
        this.emitterGarageManager.on(this.events.carSelected, this.handleCarSelected.bind(this));
    }
    handleCarSelected(car) {
        this.selectedCar = car;
        if (this.nameInputUpdate &&
            this.colorInputUpdate &&
            this.imageInputUpdate) {
            this.nameInputUpdate.getElement().value = this.selectedCar.name;
            this.colorInputUpdate.getElement().value = this.selectedCar.color;
            this.imageInputUpdate.style.color = this.selectedCar.color;
            this.nameInputUpdate.getElement().removeAttribute('disabled');
            this.colorInputUpdate.getElement().removeAttribute('disabled');
            this.updateCarButton?.getElement().removeAttribute('disabled');
        }
    }
    // eslint-disable-next-line max-lines-per-function
    handleStateChange(payload) {
        const { trigger, getFullContext, contextData } = payload;
        const { carsPageNumber, carsPerPage, carsTotal, pageCars } = getFullContext();
        switch (trigger) {
            case 'removeCar': {
                this.handleRemoveCar(contextData, carsPageNumber, carsPerPage, carsTotal, pageCars);
                break;
            }
            case 'resetRace':
            case 'resetCar': {
                this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
                this.handleReset();
                break;
            }
            case 'startRace': {
                this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
                this.resetSelectedCar();
                break;
            }
            case 'startCar': {
                this.disableButtons();
                this.resetSelectedCar();
                this.resetAllButton?.getElement().removeAttribute('disabled');
                this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
                break;
            }
            case 'initialize':
            case 'getCars':
            case 'addCar':
            case 'addBulkCars': {
                this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
                this.updateUI(carsPageNumber, carsTotal, pageCars);
                break;
            }
            case 'finishRace': {
                this.resetAllButton?.getElement().removeAttribute('disabled');
                break;
            }
            case 'checkDriveSuccess': {
                if (this.pageCars.every((car) => car.driveSuccess === false)) {
                    this.resetAllButton?.getElement().removeAttribute('disabled');
                }
                if (this.pageCars.every((car) => car.driveSuccess !== undefined || car.status === CarStatus.STOPPED)) {
                    setTimeout(() => {
                        this.updateNavigation();
                    }, garage_RESET_TIMEOUT);
                }
                break;
            }
        }
    }
    handleRemoveCar(contextData, carsPageNumber, carsPerPage, carsTotal, pageCars) {
        if (contextData?.car?.id === this.selectedCar?.id) {
            this.resetSelectedCar();
        }
        this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
        this.updateUI(carsPageNumber, carsTotal, pageCars);
    }
    handleReset() {
        const areCarsReady = this.pageCars.every((car) => {
            return car.status === CarStatus.STOPPED;
        });
        if (areCarsReady) {
            setTimeout(() => {
                this.enableButtons();
                for (const car of this.raceContainer.childComponents) {
                    if (car instanceof CarTrack) {
                        car.enableControls();
                    }
                }
            }, garage_RESET_TIMEOUT);
            this.resetAllButton?.getElement().setAttribute('disabled', '');
            void state_machine_machine.makeTransition(state_machine_machine.value, 'resetToIdle');
        }
    }
    createLines() {
        this.totalHeading = utility_components.div({
            classes: [garage_module_d],
            text: `Garage (0)`,
        });
        this.pageHeading = utility_components.div({ classes: [garage_module_d] });
        const inputBlockNew = this.createInputNew();
        const inputBlockUpdate = this.createInputUpdate();
        const bottomLine = this.createControlsLine();
        return [
            utility_components.div({ classes: [garage_module_6] }, inputBlockNew, this.totalHeading),
            utility_components.div({ classes: [garage_module_6] }, inputBlockUpdate, this.pageHeading),
            bottomLine,
        ];
    }
    createControlsLine() {
        this.generateButton = this.createGenerateButton();
        this.resetAllButton = this.createResetAllButton();
        this.startAllButton = this.createStartAllButton();
        return utility_components.div({ classes: [garage_module_6] }, this.generateButton, utility_components.div({ classes: [garage_module_b] }, this.resetAllButton, this.startAllButton));
    }
    createGenerateButton() {
        return utility_components.button({
            classes: [garage_module_4, 'button'],
            text: 'Generate 100 Hell Trucks',
            title: "More Hell Trucks! Don't worry about them burning in hellfire.",
            onclick: () => void state_machine_machine.makeTransition(state_machine_machine.value, 'addBulkCars'),
        });
    }
    createResetAllButton() {
        return utility_components.button({
            classes: ['button'],
            text: 'Reset All',
            disabled: true,
            onclick: async () => {
                this.resetAllButton?.getElement().setAttribute('disabled', '');
                await state_machine_machine.makeTransition(state_machine_machine.value, 'resetRace');
            },
        });
    }
    createStartAllButton() {
        return utility_components.button({
            classes: ['button'],
            text: 'Race !!!',
            onclick: async () => {
                this.disableButtons();
                if (this.pageCars.some((car) => car.status !== CarStatus.STOPPED)) {
                    await state_machine_machine.makeTransition(state_machine_machine.value, 'resetRace');
                }
                await state_machine_machine.makeTransition(state_machine_machine.value, 'startRace');
                for (const car of this.pageCars) {
                    void state_machine_machine.makeTransition(state_machine_machine.value, 'checkDriveSuccess', {
                        car,
                    });
                }
            },
        });
    }
    // eslint-disable-next-line max-lines-per-function
    createNavigation() {
        const ONE_PAGE = 1;
        this.prevButton = utility_components.button({
            classes: ['button'],
            text: '<< prev',
            onclick: async () => {
                if (this.pageCars.some((car) => car.status !== CarStatus.STOPPED || car.driveSuccess !== undefined)) {
                    await state_machine_machine.makeTransition(state_machine_machine.value, 'resetRace');
                }
                await state_machine_machine.makeTransition(state_machine_machine.value, 'getCars', {
                    carsPageNumber: this.carsPageNumber - ONE_PAGE,
                });
            },
        });
        this.nextButton = utility_components.button({
            classes: ['button'],
            text: 'next >>',
            onclick: async () => {
                if (this.pageCars.some((car) => car.status !== CarStatus.STOPPED || car.driveSuccess !== undefined)) {
                    await state_machine_machine.makeTransition(state_machine_machine.value, 'resetRace');
                }
                await state_machine_machine.makeTransition(state_machine_machine.value, 'getCars', {
                    carsPageNumber: this.carsPageNumber + ONE_PAGE,
                });
            },
        });
        return utility_components.div({ classes: [garage_module_8] }, this.prevButton, this.nextButton);
    }
    updateData(carsPageNumber, carsPerPage, carsTotal, pageCars) {
        this.carsPageNumber = carsPageNumber;
        this.carsPerPage = carsPerPage;
        this.carsTotal = carsTotal;
        this.pageCars = pageCars;
    }
    updateUI(carsPageNumber, carsTotal, pageCars) {
        if (this.totalHeading)
            this.totalHeading.setText(`Garage (${carsTotal})`);
        if (this.pageHeading)
            this.pageHeading.setText(`Page #${carsPageNumber}`);
        this.updateNavigation();
        for (const child of this.raceContainer.childComponents) {
            if (child instanceof CarTrack) {
                this.emitterGarageManager.off(this.events.carDropSelected, child.boundUnSelect);
            }
        }
        this.raceContainer.removeChildren();
        for (const car of pageCars) {
            this.pageCars = this.pageCars.map((car) => ({ ...car }));
            const carTrack = new CarTrack(car, this.emitCar.bind(this));
            this.emitterGarageManager.on(this.events.carDropSelected, carTrack.boundUnSelect);
            this.raceContainer.appendSingle(carTrack);
        }
    }
    createInputNew() {
        this.nameInputNew = utility_components.input({
            classes: [garage_module_7, 'input'],
            placeholder: 'Cool truck name needed',
            value: getRandomName(),
            oninput: () => this.nameInputNewInputHandle(),
        });
        const labelInputNew = this.createLabelInputNew();
        this.newCarButton = utility_components.button({
            classes: [garage_module_4, 'button'],
            text: 'New Hell Truck',
            title: 'Shiny new Hell Truck. Maybe this is the one that will bring you glory.',
            onclick: () => this.addCar(),
        });
        this.emitterGarageManager.on(this.events.inputNewChanged, (isDisabled) => {
            if (isDisabled) {
                this.newCarButton?.getElement().setAttribute('disabled', '');
            }
            else {
                this.newCarButton?.getElement().removeAttribute('disabled');
            }
        });
        return utility_components.div({ classes: [garage_module_5] }, this.nameInputNew, labelInputNew, this.newCarButton);
    }
    createLabelInputNew() {
        const color = getRandomHexColor();
        this.imageInputNew = createSvgChunk(monster_truck, ['iconExtraSmall']);
        this.imageInputNew.style.color = color;
        this.colorInputNew = utility_components.input({
            classes: [garage_module_1],
            type: 'color',
            value: color,
            oninput: () => this.colorInputNewInputHandle(),
        });
        const labelInputNew = utility_components.label({
            classes: [garage_module_2],
        }, this.colorInputNew);
        labelInputNew.getElement().append(this.imageInputNew);
        return labelInputNew;
    }
    colorInputNewInputHandle() {
        if (this.imageInputNew && this.colorInputNew) {
            const color = this.colorInputNew?.getElement().value;
            this.imageInputNew.style.color = color;
        }
    }
    nameInputNewInputHandle() {
        this.emitterGarageManager.emit(this.events.inputNewChanged, !this.nameInputNew?.getElement().value);
    }
    async addCar() {
        if (this.nameInputNew?.getElement().value &&
            this.colorInputNew?.getElement().value) {
            await state_machine_machine.makeTransition(state_machine_machine.value, 'addCar', {
                newCar: {
                    name: this.nameInputNew.getElement().value,
                    color: this.colorInputNew.getElement().value,
                },
            });
            this.nameInputNew.getElement().value = getRandomName();
            this.colorInputNew.getElement().value = getRandomHexColor();
            if (this.imageInputNew) {
                this.imageInputNew.style.color = this.colorInputNew.getElement().value;
            }
        }
    }
    emitCar(car) {
        this.emitterGarageManager.emit(this.events.carSelected, car);
        this.emitterGarageManager.emit(this.events.carDropSelected, car);
    }
    createInputUpdate() {
        this.nameInputUpdate = utility_components.input({
            classes: [garage_module_7, 'input'],
            placeholder: 'Change not-so-cool name',
            disabled: true,
            oninput: () => this.nameInputUpdateInputHandle(),
        });
        const labelInputUpdate = this.createLabelInputUpdate();
        this.updateCarButton = utility_components.button({
            classes: ['button'],
            text: 'Update',
            disabled: true,
            onclick: () => this.updateCar(),
        });
        this.emitterGarageManager.on(this.events.inputUpdateChanged, (isDisabled) => {
            if (isDisabled) {
                this.updateCarButton?.getElement().setAttribute('disabled', '');
            }
            else {
                this.updateCarButton?.getElement().removeAttribute('disabled');
            }
        });
        return utility_components.div({ classes: [garage_module_5] }, this.nameInputUpdate, labelInputUpdate, this.updateCarButton);
    }
    createLabelInputUpdate() {
        const color = DEFAULT_NON_SELECTED_CAR_COLOR;
        this.imageInputUpdate = createSvgChunk(monster_truck, ['iconExtraSmall']);
        this.imageInputUpdate.style.color = color;
        this.colorInputUpdate = utility_components.input({
            classes: [garage_module_1],
            type: 'color',
            disabled: true,
            value: color,
            oninput: () => this.colorInputUpdateInputHandle(),
        });
        const labelInputUpdate = utility_components.label({
            classes: [garage_module_2],
        }, this.colorInputUpdate);
        labelInputUpdate.getElement().append(this.imageInputUpdate);
        return labelInputUpdate;
    }
    nameInputUpdateInputHandle() {
        this.emitterGarageManager.emit(this.events.inputUpdateChanged, !this.nameInputUpdate?.getElement().value);
    }
    colorInputUpdateInputHandle() {
        if (this.imageInputUpdate && this.colorInputUpdate) {
            const color = this.colorInputUpdate?.getElement().value;
            this.imageInputUpdate.style.color = color;
        }
    }
    updateCar() {
        if (this.nameInputUpdate?.getElement().value &&
            this.colorInputUpdate?.getElement().value &&
            this.selectedCar) {
            void state_machine_machine.makeTransition(state_machine_machine.value, 'updateCar', {
                car: Object.assign(this.selectedCar, {
                    name: this.nameInputUpdate.getElement().value,
                    color: this.colorInputUpdate.getElement().value,
                }),
            });
            this.resetSelectedCar();
        }
    }
    resetSelectedCar() {
        if (this.nameInputUpdate?.getElement() &&
            this.colorInputUpdate?.getElement() &&
            this.imageInputUpdate) {
            this.emitterGarageManager.emit(this.events.carDropSelected, true);
            this.selectedCar = undefined;
            const color = DEFAULT_NON_SELECTED_CAR_COLOR;
            this.nameInputUpdate.getElement().value = '';
            this.colorInputUpdate.getElement().value = color;
            this.imageInputUpdate.style.color = color;
            this.nameInputUpdate.getElement().setAttribute('disabled', '');
            this.colorInputUpdate.getElement().setAttribute('disabled', '');
            this.updateCarButton?.getElement().setAttribute('disabled', '');
        }
    }
    updateNavigation() {
        const FIRST_PAGE = 1;
        const { carsPageNumber, carsPerPage, carsTotal } = this;
        const lastPageNumber = Math.ceil(carsTotal / carsPerPage) || FIRST_PAGE;
        if (carsPageNumber > lastPageNumber && carsPageNumber !== FIRST_PAGE) {
            void state_machine_machine.makeTransition(state_machine_machine.value, 'getCars', {
                carsPageNumber: this.carsPageNumber - FIRST_PAGE,
            });
            return;
        }
        if (carsPageNumber === FIRST_PAGE) {
            this.prevButton?.getElement().setAttribute('disabled', '');
        }
        else {
            this.prevButton?.getElement().removeAttribute('disabled');
        }
        if (carsPageNumber === lastPageNumber) {
            this.nextButton?.getElement().setAttribute('disabled', '');
        }
        else {
            this.nextButton?.getElement().removeAttribute('disabled');
        }
    }
    disableButtons() {
        this.prevButton?.getElement().setAttribute('disabled', '');
        this.nextButton?.getElement().setAttribute('disabled', '');
        this.newCarButton?.getElement().setAttribute('disabled', '');
        this.updateCarButton?.getElement().setAttribute('disabled', '');
        this.generateButton?.getElement().setAttribute('disabled', '');
        this.startAllButton?.getElement().setAttribute('disabled', '');
    }
    enableButtons() {
        this.updateNavigation();
        this.newCarButton?.getElement().removeAttribute('disabled');
        this.generateButton?.getElement().removeAttribute('disabled');
        this.startAllButton?.getElement().removeAttribute('disabled');
    }
}

;// ./src/app/components/winner-record/winner-record.module.scss
// extracted by mini-css-extract-plugin
var winner_record_module_1 = "NKCyuUWF";
var winner_record_module_2 = "GadsEewX";
var winner_record_module_3 = "Iv9G5knb";
var winner_record_module_4 = "tUkX8pzo";
var winner_record_module_5 = "kjtFTVqj";
var winner_record_module_6 = "m01mOeAH";
var winner_record_module_7 = "gz7F5Ws8";
var winner_record_module_8 = "Vner_ddX";


;// ./src/app/components/winner-record/winner-record.ts






class WinnerRecord extends BaseComponent {
    winnerData;
    id;
    image;
    name;
    wins;
    racerSvg;
    racer;
    bestTime;
    constructor(winnerData, seqNumber) {
        super({ elementTag: 'div', classes: [winner_record_module_7] });
        this.winnerData = winnerData;
        void state_machine_machine.makeTransition(state_machine_machine.value, 'getCar', {
            carId: this.winnerData.id,
        });
        const recordFields = this.createRecordFields(seqNumber);
        this.appendChildren(...recordFields);
        state_machine_machine.on(state_machine_machine.events.machineStateChanged, this.handleStateChange.bind(this));
    }
    handleStateChange(payload) {
        const { trigger, getFullContext, contextData } = payload;
        switch (trigger) {
            case 'updateCar': {
                if (contextData?.car?.id !== this.winnerData.id)
                    break;
                this.updateRecord(contextData.car);
                break;
            }
            case 'getCar': {
                if (contextData?.carId !== this.winnerData.id)
                    break;
                const { car } = getFullContext();
                if (car)
                    this.updateRecord(car);
            }
        }
    }
    createRecordFields(seqNumber) {
        const number = utility_components.div({
            classes: [winner_record_module_5],
            text: seqNumber.toString(),
        });
        this.id = utility_components.div({
            classes: [winner_record_module_2],
            text: this.winnerData.id.toString(),
        });
        this.racer = utility_components.div({ classes: [winner_record_module_6] });
        this.racerSvg = createSvgChunk(monster_truck, ['iconSmall']);
        this.racer.getElement().append(this.racerSvg);
        this.name = utility_components.div({ classes: [winner_record_module_3] });
        const nameContainer = utility_components.div({ classes: [winner_record_module_4] }, this.name);
        this.wins = utility_components.div({
            classes: [winner_record_module_8],
            text: this.winnerData.wins.toString(),
        });
        this.bestTime = utility_components.div({
            classes: [winner_record_module_1],
            text: this.winnerData.time.toString(),
        });
        return [
            number,
            this.id,
            this.racer,
            nameContainer,
            this.wins,
            this.bestTime,
        ];
    }
    updateRecord(car) {
        if (this.racer)
            this.racer.getElement().style.color = car.color;
        this.name?.setText(car.name);
    }
}

;// ./src/app/components/winners/winners.module.scss
// extracted by mini-css-extract-plugin
var winners_module_1 = "jMygIKw1";
var winners_module_2 = "wTOZN_ZU";
var winners_module_3 = "IX3THaQa";
var winners_module_4 = "HhoS38UL";
var winners_module_5 = "pywsYS9Y";
var winners_module_6 = "Q6b5jf93";
var winners_module_7 = "iXVdXTTQ";
var winners_module_8 = "Qh6VImdP";
var winners_module_9 = "IJY4TRIP";
var winners_module_a = "_Hx_i5eN";
var winners_module_b = "AyGhfFSK";


;// ./src/app/components/winners/winners.ts







const winners_INITIAL_CARS_TOTAL = 0;
const winners_INDEX_OFFSET = 1;
const PAGE_OFFSET = 1;
class Winners extends BaseComponent {
    winnersTable;
    totalHeading;
    pageHeading;
    prevButton;
    nextButton;
    winsButton;
    timeButton;
    idButton;
    winnersPageNumber = config.DEFAULT_WINNERS_PAGE_NUMBER;
    winnersPerPage = config.DEFAULT_WINNERS_PER_PAGE;
    winnersSortBy = config.DEFAULT_WINNERS_SORT_BY;
    winnersSortOrder = config.DEFAULT_WINNERS_SORT_ORDER;
    winnersTotal = winners_INITIAL_CARS_TOTAL;
    pageWinners = [];
    constructor() {
        super({ elementTag: 'div', classes: [winners_module_a] });
        const [topLine, bottomLine] = this.createLines();
        const navigation = this.createNavigation();
        const tableHead = this.createHead();
        this.winnersTable = utility_components.div({ classes: [winners_module_b] });
        this.appendChildren(topLine, bottomLine, tableHead, this.winnersTable, navigation);
        state_machine_machine.on(state_machine_machine.events.machineStateChanged, this.handleStateChange.bind(this));
    }
    createHead() {
        const number = utility_components.div({ classes: [winners_module_5], text: '№' });
        const truckImage = utility_components.div({
            classes: [winners_module_9],
            text: 'Truck',
        });
        this.idButton = utility_components.button({
            classes: [winners_module_7, winners_module_8, 'button'],
            onclick: () => this.handleSortId(),
        });
        const name = utility_components.div({ classes: [winners_module_3], text: 'Name' });
        this.winsButton = utility_components.button({
            classes: [winners_module_7, 'button'],
            onclick: () => this.handleSortWins(),
        });
        this.timeButton = utility_components.button({
            classes: [winners_module_7, 'button'],
            onclick: () => this.handleSortTime(),
        });
        return utility_components.div({ classes: [winners_module_1] }, number, this.idButton, truckImage, name, this.winsButton, this.timeButton);
    }
    handleSortWins() {
        let winnersSortOrder;
        const winnersSortBy = WinnersSortParameter.WINS;
        if (this.winnersSortBy === WinnersSortParameter.WINS) {
            winnersSortOrder =
                this.winnersSortOrder === WinnersOrderParameter.ASC
                    ? WinnersOrderParameter.DESC
                    : WinnersOrderParameter.ASC;
        }
        else {
            winnersSortOrder = WinnersOrderParameter.DESC;
        }
        void state_machine_machine.makeTransition(state_machine_machine.value, 'getWinners', {
            winnersPageNumber: this.winnersPageNumber,
            winnersPerPage: this.winnersPerPage,
            winnersSortBy,
            winnersSortOrder,
        });
    }
    handleSortTime() {
        let winnersSortOrder;
        const winnersSortBy = WinnersSortParameter.TIME;
        if (this.winnersSortBy === WinnersSortParameter.TIME) {
            winnersSortOrder =
                this.winnersSortOrder === WinnersOrderParameter.ASC
                    ? WinnersOrderParameter.DESC
                    : WinnersOrderParameter.ASC;
        }
        else {
            winnersSortOrder = WinnersOrderParameter.ASC;
        }
        void state_machine_machine.makeTransition(state_machine_machine.value, 'getWinners', {
            winnersPageNumber: this.winnersPageNumber,
            winnersPerPage: this.winnersPerPage,
            winnersSortBy,
            winnersSortOrder,
        });
    }
    handleSortId() {
        let winnersSortOrder;
        const winnersSortBy = WinnersSortParameter.ID;
        if (this.winnersSortBy === WinnersSortParameter.ID) {
            winnersSortOrder =
                this.winnersSortOrder === WinnersOrderParameter.ASC
                    ? WinnersOrderParameter.DESC
                    : WinnersOrderParameter.ASC;
        }
        else {
            winnersSortOrder = WinnersOrderParameter.ASC;
        }
        void state_machine_machine.makeTransition(state_machine_machine.value, 'getWinners', {
            winnersPageNumber: this.winnersPageNumber,
            winnersPerPage: this.winnersPerPage,
            winnersSortBy,
            winnersSortOrder,
        });
    }
    createLines() {
        this.totalHeading = utility_components.div({
            classes: [winners_module_6],
            text: `Garage (0)`,
        });
        this.pageHeading = utility_components.div({ classes: [winners_module_6] });
        return [
            utility_components.div({ classes: [winners_module_2] }, this.totalHeading),
            utility_components.div({ classes: [winners_module_2] }, this.pageHeading),
        ];
    }
    createNavigation() {
        const ONE_PAGE = 1;
        this.prevButton = utility_components.button({
            classes: ['button'],
            text: '<< prev',
            onclick: () => state_machine_machine.makeTransition(state_machine_machine.value, 'getWinners', {
                winnersPageNumber: this.winnersPageNumber - ONE_PAGE,
            }),
        });
        this.nextButton = utility_components.button({
            classes: ['button'],
            text: 'next >>',
            onclick: () => state_machine_machine.makeTransition(state_machine_machine.value, 'getWinners', {
                winnersPageNumber: this.winnersPageNumber + ONE_PAGE,
            }),
        });
        return utility_components.div({ classes: [winners_module_4] }, this.prevButton, this.nextButton);
    }
    handleStateChange(payload) {
        const { trigger, getFullContext } = payload;
        const { winnersPageNumber, winnersPerPage, winnersSortBy, winnersSortOrder, winnersTotal, pageWinners, } = getFullContext();
        switch (trigger) {
            case 'initialize':
            case 'getWinners':
            case 'finishRace':
            case 'removeCar': {
                this.updateData(winnersPageNumber, winnersPerPage, winnersSortBy, winnersSortOrder, winnersTotal, pageWinners);
                this.updateUI(winnersPageNumber, winnersSortBy, winnersSortOrder, winnersTotal, pageWinners);
                break;
            }
        }
    }
    updateData(winnersPageNumber, winnersPerPage, winnersSortBy, winnersSortOrder, winnersTotal, pageWinners) {
        this.winnersPageNumber = winnersPageNumber;
        this.winnersPerPage = winnersPerPage;
        this.winnersSortBy = winnersSortBy;
        this.winnersSortOrder = winnersSortOrder;
        this.winnersTotal = winnersTotal;
        this.pageWinners = pageWinners;
    }
    updateUI(winnersPageNumber, winnersSortBy, winnersSortOrder, winnersTotal, pageWinners) {
        if (this.totalHeading)
            this.totalHeading.setText(`Winners (${winnersTotal})`);
        if (this.pageHeading)
            this.pageHeading.setText(`Page #${winnersPageNumber}`);
        this.updateNavigation();
        this.updateHead();
        this.winnersTable.removeChildren();
        for (const [index, winner] of pageWinners.entries()) {
            const seqNumber = (winnersPageNumber - PAGE_OFFSET) * this.winnersPerPage +
                index +
                winners_INDEX_OFFSET;
            const winnerRecord = new WinnerRecord(winner, seqNumber);
            this.winnersTable.appendSingle(winnerRecord);
        }
    }
    updateNavigation() {
        const FIRST_PAGE = 1;
        const { winnersPageNumber, winnersPerPage, winnersTotal } = this;
        const lastPageNumber = Math.ceil(winnersTotal / winnersPerPage) || FIRST_PAGE;
        if (winnersPageNumber > lastPageNumber &&
            winnersPageNumber !== FIRST_PAGE) {
            void state_machine_machine.makeTransition(state_machine_machine.value, 'getWinners', {
                winnersPageNumber: this.winnersPageNumber - FIRST_PAGE,
            });
            return;
        }
        if (winnersPageNumber === FIRST_PAGE) {
            this.prevButton?.getElement().setAttribute('disabled', '');
        }
        else {
            this.prevButton?.getElement().removeAttribute('disabled');
        }
        if (winnersPageNumber === lastPageNumber) {
            this.nextButton?.getElement().setAttribute('disabled', '');
        }
        else {
            this.nextButton?.getElement().removeAttribute('disabled');
        }
    }
    updateHead() {
        const { winnersSortBy, winnersSortOrder } = this;
        switch (winnersSortBy) {
            case WinnersSortParameter.TIME: {
                this.sortByTime(winnersSortOrder);
                break;
            }
            case WinnersSortParameter.WINS: {
                this.sortByWins(winnersSortOrder);
                break;
            }
            case WinnersSortParameter.ID: {
                this.sortById(winnersSortOrder);
                break;
            }
        }
    }
    sortByTime(sortOrder) {
        if (sortOrder === WinnersOrderParameter.ASC) {
            this.idButton?.setText('Id');
            this.winsButton?.setText('Wins');
            this.timeButton?.setText('Time ↑');
        }
        else {
            this.idButton?.setText('Id');
            this.winsButton?.setText('Wins');
            this.timeButton?.setText('Time ↓');
        }
    }
    sortByWins(sortOrder) {
        if (sortOrder === WinnersOrderParameter.ASC) {
            this.idButton?.setText('Id');
            this.winsButton?.setText('Wins ↑');
            this.timeButton?.setText('Time');
        }
        else {
            this.idButton?.setText('Id');
            this.winsButton?.setText('Wins ↓');
            this.timeButton?.setText('Time');
        }
    }
    sortById(sortOrder) {
        if (sortOrder === WinnersOrderParameter.ASC) {
            this.idButton?.setText('Id ↑');
            this.winsButton?.setText('Wins');
            this.timeButton?.setText('Time');
        }
        else {
            this.idButton?.setText('Id ↓');
            this.winsButton?.setText('Wins');
            this.timeButton?.setText('Time');
        }
    }
}

;// ./src/app/components/page/event-emitter-view-manager.ts

class EmitterViewManager extends event_emitter_generic {
}
/* harmony default export */ const event_emitter_view_manager = (EmitterViewManager);

;// ./src/app/components/page/page.module.scss
// extracted by mini-css-extract-plugin
var page_module_1 = "OMANdYSa";
var page_module_2 = "cCle5Ih9";
var page_module_3 = "RKZlRR0J";
var page_module_4 = "XVRwuXtF";
var page_module_5 = "teSzgQ6N";
var page_module_6 = "dQDdLIr8";
var page_module_7 = "C8Dn1lrC";
var page_module_8 = "P4RjUzFG";
var page_module_9 = "pgFiI26Y";


;// ./src/app/components/page/page.ts







class Page extends BaseComponent {
    garage = new Garage();
    winners = new Winners();
    winnersButton;
    garageButton;
    pageContainer;
    viewManager = new event_emitter_view_manager();
    events = {
        changeView: 'changeView',
    };
    currentView = 'garage';
    constructor() {
        super({ elementTag: 'main', classes: [page_module_6] });
        const heading = utility_components.h1({
            classes: [page_module_5],
            text: `Welcome to The Metal HellSync Race !!!`,
        });
        const buttonsContainer = this.createButtons();
        this.pageContainer = utility_components.div({ classes: [page_module_7] });
        this.pageContainer.appendSingle(this.garage);
        this.appendChildren(heading, buttonsContainer, this.pageContainer);
        this.viewManager.on(this.events.changeView, this.changeView.bind(this));
    }
    mount() {
        document.body.append(this.getElement());
    }
    createButtons() {
        const audioButton = new AudioButton();
        audioButton.addClasses(page_module_2);
        this.winnersButton = utility_components.button({
            classes: [page_module_8, page_module_1, 'button'],
            onclick: () => this.triggerViewChange('winners'),
        }, utility_components.div({ classes: [page_module_3], text: 'winners >>' }));
        this.garageButton = utility_components.button({
            classes: [page_module_8, 'button'],
            onclick: () => this.triggerViewChange('garage'),
        }, utility_components.div({ classes: [page_module_3], text: '<< garage' }));
        const viewButtons = utility_components.div({ classes: [page_module_9] }, this.winnersButton, this.garageButton);
        return utility_components.div({
            classes: [page_module_4],
        }, audioButton, viewButtons);
    }
    triggerViewChange(payload) {
        this.viewManager.emit(this.events.changeView, payload);
    }
    changeView(pageView) {
        if (this.currentView !== pageView) {
            this.currentView = pageView;
            this.garageButton?.toggleClasses(page_module_1);
            this.winnersButton?.toggleClasses(page_module_1);
            if (pageView === 'garage') {
                this.changeContent(this.garage);
            }
            else if (pageView === 'winners') {
                this.changeContent(this.winners);
            }
        }
    }
    changeContent(newContent) {
        this.pageContainer.getElement().replaceChildren(newContent.getElement());
    }
}

;// ./src/app/app.ts




class App {
    page;
    constructor() {
        this.page = new Page();
    }
    init() {
        void state_machine_machine
            .makeTransition('state:initial', 'initialize')
            .then(() => this.page.mount())
            .catch(() => modal.showNoServer(() => this.init.call(this)));
    }
}

;// ./src/index.ts

const app = new App();
app.init();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map