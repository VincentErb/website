(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var cryptoJsExports = {};
	var cryptoJs = {
	  get exports(){ return cryptoJsExports; },
	  set exports(v){ cryptoJsExports = v; },
	};

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var coreExports = {};
	var core$7 = {
	  get exports(){ return coreExports; },
	  set exports(v){ coreExports = v; },
	};

	var _polyfillNode_crypto = {};

	var _polyfillNode_crypto$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: _polyfillNode_crypto
	});

	var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_crypto$1);

	var hasRequiredCore;

	function requireCore () {
		if (hasRequiredCore) return coreExports;
		hasRequiredCore = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory();
				}
			}(commonjsGlobal, function () {

				/*globals window, global, require*/

				/**
				 * CryptoJS core components.
				 */
				var CryptoJS = CryptoJS || (function (Math, undefined$1) {

				    var crypto;

				    // Native crypto from window (Browser)
				    if (typeof window !== 'undefined' && window.crypto) {
				        crypto = window.crypto;
				    }

				    // Native crypto in web worker (Browser)
				    if (typeof self !== 'undefined' && self.crypto) {
				        crypto = self.crypto;
				    }

				    // Native crypto from worker
				    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
				        crypto = globalThis.crypto;
				    }

				    // Native (experimental IE 11) crypto from window (Browser)
				    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
				        crypto = window.msCrypto;
				    }

				    // Native crypto from global (NodeJS)
				    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
				        crypto = commonjsGlobal.crypto;
				    }

				    // Native crypto import via require (NodeJS)
				    if (!crypto && typeof commonjsRequire === 'function') {
				        try {
				            crypto = require$$0$1;
				        } catch (err) {}
				    }

				    /*
				     * Cryptographically secure pseudorandom number generator
				     *
				     * As Math.random() is cryptographically not safe to use
				     */
				    var cryptoSecureRandomInt = function () {
				        if (crypto) {
				            // Use getRandomValues method (Browser)
				            if (typeof crypto.getRandomValues === 'function') {
				                try {
				                    return crypto.getRandomValues(new Uint32Array(1))[0];
				                } catch (err) {}
				            }

				            // Use randomBytes method (NodeJS)
				            if (typeof crypto.randomBytes === 'function') {
				                try {
				                    return crypto.randomBytes(4).readInt32LE();
				                } catch (err) {}
				            }
				        }

				        throw new Error('Native crypto module could not be used to get secure random number.');
				    };

				    /*
				     * Local polyfill of Object.create

				     */
				    var create = Object.create || (function () {
				        function F() {}

				        return function (obj) {
				            var subtype;

				            F.prototype = obj;

				            subtype = new F();

				            F.prototype = null;

				            return subtype;
				        };
				    }());

				    /**
				     * CryptoJS namespace.
				     */
				    var C = {};

				    /**
				     * Library namespace.
				     */
				    var C_lib = C.lib = {};

				    /**
				     * Base object for prototypal inheritance.
				     */
				    var Base = C_lib.Base = (function () {


				        return {
				            /**
				             * Creates a new object that inherits from this object.
				             *
				             * @param {Object} overrides Properties to copy into the new object.
				             *
				             * @return {Object} The new object.
				             *
				             * @static
				             *
				             * @example
				             *
				             *     var MyType = CryptoJS.lib.Base.extend({
				             *         field: 'value',
				             *
				             *         method: function () {
				             *         }
				             *     });
				             */
				            extend: function (overrides) {
				                // Spawn
				                var subtype = create(this);

				                // Augment
				                if (overrides) {
				                    subtype.mixIn(overrides);
				                }

				                // Create default initializer
				                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
				                    subtype.init = function () {
				                        subtype.$super.init.apply(this, arguments);
				                    };
				                }

				                // Initializer's prototype is the subtype object
				                subtype.init.prototype = subtype;

				                // Reference supertype
				                subtype.$super = this;

				                return subtype;
				            },

				            /**
				             * Extends this object and runs the init method.
				             * Arguments to create() will be passed to init().
				             *
				             * @return {Object} The new object.
				             *
				             * @static
				             *
				             * @example
				             *
				             *     var instance = MyType.create();
				             */
				            create: function () {
				                var instance = this.extend();
				                instance.init.apply(instance, arguments);

				                return instance;
				            },

				            /**
				             * Initializes a newly created object.
				             * Override this method to add some logic when your objects are created.
				             *
				             * @example
				             *
				             *     var MyType = CryptoJS.lib.Base.extend({
				             *         init: function () {
				             *             // ...
				             *         }
				             *     });
				             */
				            init: function () {
				            },

				            /**
				             * Copies properties into this object.
				             *
				             * @param {Object} properties The properties to mix in.
				             *
				             * @example
				             *
				             *     MyType.mixIn({
				             *         field: 'value'
				             *     });
				             */
				            mixIn: function (properties) {
				                for (var propertyName in properties) {
				                    if (properties.hasOwnProperty(propertyName)) {
				                        this[propertyName] = properties[propertyName];
				                    }
				                }

				                // IE won't copy toString using the loop above
				                if (properties.hasOwnProperty('toString')) {
				                    this.toString = properties.toString;
				                }
				            },

				            /**
				             * Creates a copy of this object.
				             *
				             * @return {Object} The clone.
				             *
				             * @example
				             *
				             *     var clone = instance.clone();
				             */
				            clone: function () {
				                return this.init.prototype.extend(this);
				            }
				        };
				    }());

				    /**
				     * An array of 32-bit words.
				     *
				     * @property {Array} words The array of 32-bit words.
				     * @property {number} sigBytes The number of significant bytes in this word array.
				     */
				    var WordArray = C_lib.WordArray = Base.extend({
				        /**
				         * Initializes a newly created word array.
				         *
				         * @param {Array} words (Optional) An array of 32-bit words.
				         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.lib.WordArray.create();
				         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
				         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
				         */
				        init: function (words, sigBytes) {
				            words = this.words = words || [];

				            if (sigBytes != undefined$1) {
				                this.sigBytes = sigBytes;
				            } else {
				                this.sigBytes = words.length * 4;
				            }
				        },

				        /**
				         * Converts this word array to a string.
				         *
				         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
				         *
				         * @return {string} The stringified word array.
				         *
				         * @example
				         *
				         *     var string = wordArray + '';
				         *     var string = wordArray.toString();
				         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
				         */
				        toString: function (encoder) {
				            return (encoder || Hex).stringify(this);
				        },

				        /**
				         * Concatenates a word array to this word array.
				         *
				         * @param {WordArray} wordArray The word array to append.
				         *
				         * @return {WordArray} This word array.
				         *
				         * @example
				         *
				         *     wordArray1.concat(wordArray2);
				         */
				        concat: function (wordArray) {
				            // Shortcuts
				            var thisWords = this.words;
				            var thatWords = wordArray.words;
				            var thisSigBytes = this.sigBytes;
				            var thatSigBytes = wordArray.sigBytes;

				            // Clamp excess bits
				            this.clamp();

				            // Concat
				            if (thisSigBytes % 4) {
				                // Copy one byte at a time
				                for (var i = 0; i < thatSigBytes; i++) {
				                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
				                }
				            } else {
				                // Copy one word at a time
				                for (var j = 0; j < thatSigBytes; j += 4) {
				                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
				                }
				            }
				            this.sigBytes += thatSigBytes;

				            // Chainable
				            return this;
				        },

				        /**
				         * Removes insignificant bits.
				         *
				         * @example
				         *
				         *     wordArray.clamp();
				         */
				        clamp: function () {
				            // Shortcuts
				            var words = this.words;
				            var sigBytes = this.sigBytes;

				            // Clamp
				            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
				            words.length = Math.ceil(sigBytes / 4);
				        },

				        /**
				         * Creates a copy of this word array.
				         *
				         * @return {WordArray} The clone.
				         *
				         * @example
				         *
				         *     var clone = wordArray.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);
				            clone.words = this.words.slice(0);

				            return clone;
				        },

				        /**
				         * Creates a word array filled with random bytes.
				         *
				         * @param {number} nBytes The number of random bytes to generate.
				         *
				         * @return {WordArray} The random word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.lib.WordArray.random(16);
				         */
				        random: function (nBytes) {
				            var words = [];

				            for (var i = 0; i < nBytes; i += 4) {
				                words.push(cryptoSecureRandomInt());
				            }

				            return new WordArray.init(words, nBytes);
				        }
				    });

				    /**
				     * Encoder namespace.
				     */
				    var C_enc = C.enc = {};

				    /**
				     * Hex encoding strategy.
				     */
				    var Hex = C_enc.Hex = {
				        /**
				         * Converts a word array to a hex string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The hex string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var hexChars = [];
				            for (var i = 0; i < sigBytes; i++) {
				                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                hexChars.push((bite >>> 4).toString(16));
				                hexChars.push((bite & 0x0f).toString(16));
				            }

				            return hexChars.join('');
				        },

				        /**
				         * Converts a hex string to a word array.
				         *
				         * @param {string} hexStr The hex string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
				         */
				        parse: function (hexStr) {
				            // Shortcut
				            var hexStrLength = hexStr.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < hexStrLength; i += 2) {
				                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
				            }

				            return new WordArray.init(words, hexStrLength / 2);
				        }
				    };

				    /**
				     * Latin1 encoding strategy.
				     */
				    var Latin1 = C_enc.Latin1 = {
				        /**
				         * Converts a word array to a Latin1 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The Latin1 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var latin1Chars = [];
				            for (var i = 0; i < sigBytes; i++) {
				                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                latin1Chars.push(String.fromCharCode(bite));
				            }

				            return latin1Chars.join('');
				        },

				        /**
				         * Converts a Latin1 string to a word array.
				         *
				         * @param {string} latin1Str The Latin1 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
				         */
				        parse: function (latin1Str) {
				            // Shortcut
				            var latin1StrLength = latin1Str.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < latin1StrLength; i++) {
				                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
				            }

				            return new WordArray.init(words, latin1StrLength);
				        }
				    };

				    /**
				     * UTF-8 encoding strategy.
				     */
				    var Utf8 = C_enc.Utf8 = {
				        /**
				         * Converts a word array to a UTF-8 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The UTF-8 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            try {
				                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
				            } catch (e) {
				                throw new Error('Malformed UTF-8 data');
				            }
				        },

				        /**
				         * Converts a UTF-8 string to a word array.
				         *
				         * @param {string} utf8Str The UTF-8 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
				         */
				        parse: function (utf8Str) {
				            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
				        }
				    };

				    /**
				     * Abstract buffered block algorithm template.
				     *
				     * The property blockSize must be implemented in a concrete subtype.
				     *
				     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
				     */
				    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
				        /**
				         * Resets this block algorithm's data buffer to its initial state.
				         *
				         * @example
				         *
				         *     bufferedBlockAlgorithm.reset();
				         */
				        reset: function () {
				            // Initial values
				            this._data = new WordArray.init();
				            this._nDataBytes = 0;
				        },

				        /**
				         * Adds new data to this block algorithm's buffer.
				         *
				         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
				         *
				         * @example
				         *
				         *     bufferedBlockAlgorithm._append('data');
				         *     bufferedBlockAlgorithm._append(wordArray);
				         */
				        _append: function (data) {
				            // Convert string to WordArray, else assume WordArray already
				            if (typeof data == 'string') {
				                data = Utf8.parse(data);
				            }

				            // Append
				            this._data.concat(data);
				            this._nDataBytes += data.sigBytes;
				        },

				        /**
				         * Processes available data blocks.
				         *
				         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
				         *
				         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
				         *
				         * @return {WordArray} The processed data.
				         *
				         * @example
				         *
				         *     var processedData = bufferedBlockAlgorithm._process();
				         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
				         */
				        _process: function (doFlush) {
				            var processedWords;

				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;
				            var dataSigBytes = data.sigBytes;
				            var blockSize = this.blockSize;
				            var blockSizeBytes = blockSize * 4;

				            // Count blocks ready
				            var nBlocksReady = dataSigBytes / blockSizeBytes;
				            if (doFlush) {
				                // Round up to include partial blocks
				                nBlocksReady = Math.ceil(nBlocksReady);
				            } else {
				                // Round down to include only full blocks,
				                // less the number of blocks that must remain in the buffer
				                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
				            }

				            // Count words ready
				            var nWordsReady = nBlocksReady * blockSize;

				            // Count bytes ready
				            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

				            // Process blocks
				            if (nWordsReady) {
				                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
				                    // Perform concrete-algorithm logic
				                    this._doProcessBlock(dataWords, offset);
				                }

				                // Remove processed words
				                processedWords = dataWords.splice(0, nWordsReady);
				                data.sigBytes -= nBytesReady;
				            }

				            // Return processed words
				            return new WordArray.init(processedWords, nBytesReady);
				        },

				        /**
				         * Creates a copy of this object.
				         *
				         * @return {Object} The clone.
				         *
				         * @example
				         *
				         *     var clone = bufferedBlockAlgorithm.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);
				            clone._data = this._data.clone();

				            return clone;
				        },

				        _minBufferSize: 0
				    });

				    /**
				     * Abstract hasher template.
				     *
				     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
				     */
				    C_lib.Hasher = BufferedBlockAlgorithm.extend({
				        /**
				         * Configuration options.
				         */
				        cfg: Base.extend(),

				        /**
				         * Initializes a newly created hasher.
				         *
				         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
				         *
				         * @example
				         *
				         *     var hasher = CryptoJS.algo.SHA256.create();
				         */
				        init: function (cfg) {
				            // Apply config defaults
				            this.cfg = this.cfg.extend(cfg);

				            // Set initial values
				            this.reset();
				        },

				        /**
				         * Resets this hasher to its initial state.
				         *
				         * @example
				         *
				         *     hasher.reset();
				         */
				        reset: function () {
				            // Reset data buffer
				            BufferedBlockAlgorithm.reset.call(this);

				            // Perform concrete-hasher logic
				            this._doReset();
				        },

				        /**
				         * Updates this hasher with a message.
				         *
				         * @param {WordArray|string} messageUpdate The message to append.
				         *
				         * @return {Hasher} This hasher.
				         *
				         * @example
				         *
				         *     hasher.update('message');
				         *     hasher.update(wordArray);
				         */
				        update: function (messageUpdate) {
				            // Append
				            this._append(messageUpdate);

				            // Update the hash
				            this._process();

				            // Chainable
				            return this;
				        },

				        /**
				         * Finalizes the hash computation.
				         * Note that the finalize operation is effectively a destructive, read-once operation.
				         *
				         * @param {WordArray|string} messageUpdate (Optional) A final message update.
				         *
				         * @return {WordArray} The hash.
				         *
				         * @example
				         *
				         *     var hash = hasher.finalize();
				         *     var hash = hasher.finalize('message');
				         *     var hash = hasher.finalize(wordArray);
				         */
				        finalize: function (messageUpdate) {
				            // Final message update
				            if (messageUpdate) {
				                this._append(messageUpdate);
				            }

				            // Perform concrete-hasher logic
				            var hash = this._doFinalize();

				            return hash;
				        },

				        blockSize: 512/32,

				        /**
				         * Creates a shortcut function to a hasher's object interface.
				         *
				         * @param {Hasher} hasher The hasher to create a helper for.
				         *
				         * @return {Function} The shortcut function.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
				         */
				        _createHelper: function (hasher) {
				            return function (message, cfg) {
				                return new hasher.init(cfg).finalize(message);
				            };
				        },

				        /**
				         * Creates a shortcut function to the HMAC's object interface.
				         *
				         * @param {Hasher} hasher The hasher to use in this HMAC helper.
				         *
				         * @return {Function} The shortcut function.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
				         */
				        _createHmacHelper: function (hasher) {
				            return function (message, key) {
				                return new C_algo.HMAC.init(hasher, key).finalize(message);
				            };
				        }
				    });

				    /**
				     * Algorithm namespace.
				     */
				    var C_algo = C.algo = {};

				    return C;
				}(Math));


				return CryptoJS;

			}));
	} (core$7));
		return coreExports;
	}

	var x64CoreExports = {};
	var x64Core = {
	  get exports(){ return x64CoreExports; },
	  set exports(v){ x64CoreExports = v; },
	};

	var hasRequiredX64Core;

	function requireX64Core () {
		if (hasRequiredX64Core) return x64CoreExports;
		hasRequiredX64Core = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function (undefined$1) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Base = C_lib.Base;
				    var X32WordArray = C_lib.WordArray;

				    /**
				     * x64 namespace.
				     */
				    var C_x64 = C.x64 = {};

				    /**
				     * A 64-bit word.
				     */
				    C_x64.Word = Base.extend({
				        /**
				         * Initializes a newly created 64-bit word.
				         *
				         * @param {number} high The high 32 bits.
				         * @param {number} low The low 32 bits.
				         *
				         * @example
				         *
				         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
				         */
				        init: function (high, low) {
				            this.high = high;
				            this.low = low;
				        }

				        /**
				         * Bitwise NOTs this word.
				         *
				         * @return {X64Word} A new x64-Word object after negating.
				         *
				         * @example
				         *
				         *     var negated = x64Word.not();
				         */
				        // not: function () {
				            // var high = ~this.high;
				            // var low = ~this.low;

				            // return X64Word.create(high, low);
				        // },

				        /**
				         * Bitwise ANDs this word with the passed word.
				         *
				         * @param {X64Word} word The x64-Word to AND with this word.
				         *
				         * @return {X64Word} A new x64-Word object after ANDing.
				         *
				         * @example
				         *
				         *     var anded = x64Word.and(anotherX64Word);
				         */
				        // and: function (word) {
				            // var high = this.high & word.high;
				            // var low = this.low & word.low;

				            // return X64Word.create(high, low);
				        // },

				        /**
				         * Bitwise ORs this word with the passed word.
				         *
				         * @param {X64Word} word The x64-Word to OR with this word.
				         *
				         * @return {X64Word} A new x64-Word object after ORing.
				         *
				         * @example
				         *
				         *     var ored = x64Word.or(anotherX64Word);
				         */
				        // or: function (word) {
				            // var high = this.high | word.high;
				            // var low = this.low | word.low;

				            // return X64Word.create(high, low);
				        // },

				        /**
				         * Bitwise XORs this word with the passed word.
				         *
				         * @param {X64Word} word The x64-Word to XOR with this word.
				         *
				         * @return {X64Word} A new x64-Word object after XORing.
				         *
				         * @example
				         *
				         *     var xored = x64Word.xor(anotherX64Word);
				         */
				        // xor: function (word) {
				            // var high = this.high ^ word.high;
				            // var low = this.low ^ word.low;

				            // return X64Word.create(high, low);
				        // },

				        /**
				         * Shifts this word n bits to the left.
				         *
				         * @param {number} n The number of bits to shift.
				         *
				         * @return {X64Word} A new x64-Word object after shifting.
				         *
				         * @example
				         *
				         *     var shifted = x64Word.shiftL(25);
				         */
				        // shiftL: function (n) {
				            // if (n < 32) {
				                // var high = (this.high << n) | (this.low >>> (32 - n));
				                // var low = this.low << n;
				            // } else {
				                // var high = this.low << (n - 32);
				                // var low = 0;
				            // }

				            // return X64Word.create(high, low);
				        // },

				        /**
				         * Shifts this word n bits to the right.
				         *
				         * @param {number} n The number of bits to shift.
				         *
				         * @return {X64Word} A new x64-Word object after shifting.
				         *
				         * @example
				         *
				         *     var shifted = x64Word.shiftR(7);
				         */
				        // shiftR: function (n) {
				            // if (n < 32) {
				                // var low = (this.low >>> n) | (this.high << (32 - n));
				                // var high = this.high >>> n;
				            // } else {
				                // var low = this.high >>> (n - 32);
				                // var high = 0;
				            // }

				            // return X64Word.create(high, low);
				        // },

				        /**
				         * Rotates this word n bits to the left.
				         *
				         * @param {number} n The number of bits to rotate.
				         *
				         * @return {X64Word} A new x64-Word object after rotating.
				         *
				         * @example
				         *
				         *     var rotated = x64Word.rotL(25);
				         */
				        // rotL: function (n) {
				            // return this.shiftL(n).or(this.shiftR(64 - n));
				        // },

				        /**
				         * Rotates this word n bits to the right.
				         *
				         * @param {number} n The number of bits to rotate.
				         *
				         * @return {X64Word} A new x64-Word object after rotating.
				         *
				         * @example
				         *
				         *     var rotated = x64Word.rotR(7);
				         */
				        // rotR: function (n) {
				            // return this.shiftR(n).or(this.shiftL(64 - n));
				        // },

				        /**
				         * Adds this word with the passed word.
				         *
				         * @param {X64Word} word The x64-Word to add with this word.
				         *
				         * @return {X64Word} A new x64-Word object after adding.
				         *
				         * @example
				         *
				         *     var added = x64Word.add(anotherX64Word);
				         */
				        // add: function (word) {
				            // var low = (this.low + word.low) | 0;
				            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
				            // var high = (this.high + word.high + carry) | 0;

				            // return X64Word.create(high, low);
				        // }
				    });

				    /**
				     * An array of 64-bit words.
				     *
				     * @property {Array} words The array of CryptoJS.x64.Word objects.
				     * @property {number} sigBytes The number of significant bytes in this word array.
				     */
				    C_x64.WordArray = Base.extend({
				        /**
				         * Initializes a newly created word array.
				         *
				         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
				         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.x64.WordArray.create();
				         *
				         *     var wordArray = CryptoJS.x64.WordArray.create([
				         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
				         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
				         *     ]);
				         *
				         *     var wordArray = CryptoJS.x64.WordArray.create([
				         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
				         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
				         *     ], 10);
				         */
				        init: function (words, sigBytes) {
				            words = this.words = words || [];

				            if (sigBytes != undefined$1) {
				                this.sigBytes = sigBytes;
				            } else {
				                this.sigBytes = words.length * 8;
				            }
				        },

				        /**
				         * Converts this 64-bit word array to a 32-bit word array.
				         *
				         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
				         *
				         * @example
				         *
				         *     var x32WordArray = x64WordArray.toX32();
				         */
				        toX32: function () {
				            // Shortcuts
				            var x64Words = this.words;
				            var x64WordsLength = x64Words.length;

				            // Convert
				            var x32Words = [];
				            for (var i = 0; i < x64WordsLength; i++) {
				                var x64Word = x64Words[i];
				                x32Words.push(x64Word.high);
				                x32Words.push(x64Word.low);
				            }

				            return X32WordArray.create(x32Words, this.sigBytes);
				        },

				        /**
				         * Creates a copy of this word array.
				         *
				         * @return {X64WordArray} The clone.
				         *
				         * @example
				         *
				         *     var clone = x64WordArray.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);

				            // Clone "words" array
				            var words = clone.words = this.words.slice(0);

				            // Clone each X64Word object
				            var wordsLength = words.length;
				            for (var i = 0; i < wordsLength; i++) {
				                words[i] = words[i].clone();
				            }

				            return clone;
				        }
				    });
				}());


				return CryptoJS;

			}));
	} (x64Core));
		return x64CoreExports;
	}

	var libTypedarraysExports = {};
	var libTypedarrays = {
	  get exports(){ return libTypedarraysExports; },
	  set exports(v){ libTypedarraysExports = v; },
	};

	var hasRequiredLibTypedarrays;

	function requireLibTypedarrays () {
		if (hasRequiredLibTypedarrays) return libTypedarraysExports;
		hasRequiredLibTypedarrays = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Check if typed arrays are supported
				    if (typeof ArrayBuffer != 'function') {
				        return;
				    }

				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;

				    // Reference original init
				    var superInit = WordArray.init;

				    // Augment WordArray.init to handle typed arrays
				    var subInit = WordArray.init = function (typedArray) {
				        // Convert buffers to uint8
				        if (typedArray instanceof ArrayBuffer) {
				            typedArray = new Uint8Array(typedArray);
				        }

				        // Convert other array views to uint8
				        if (
				            typedArray instanceof Int8Array ||
				            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
				            typedArray instanceof Int16Array ||
				            typedArray instanceof Uint16Array ||
				            typedArray instanceof Int32Array ||
				            typedArray instanceof Uint32Array ||
				            typedArray instanceof Float32Array ||
				            typedArray instanceof Float64Array
				        ) {
				            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
				        }

				        // Handle Uint8Array
				        if (typedArray instanceof Uint8Array) {
				            // Shortcut
				            var typedArrayByteLength = typedArray.byteLength;

				            // Extract bytes
				            var words = [];
				            for (var i = 0; i < typedArrayByteLength; i++) {
				                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
				            }

				            // Initialize this word array
				            superInit.call(this, words, typedArrayByteLength);
				        } else {
				            // Else call normal init
				            superInit.apply(this, arguments);
				        }
				    };

				    subInit.prototype = WordArray;
				}());


				return CryptoJS.lib.WordArray;

			}));
	} (libTypedarrays));
		return libTypedarraysExports;
	}

	var encUtf16Exports = {};
	var encUtf16 = {
	  get exports(){ return encUtf16Exports; },
	  set exports(v){ encUtf16Exports = v; },
	};

	var hasRequiredEncUtf16;

	function requireEncUtf16 () {
		if (hasRequiredEncUtf16) return encUtf16Exports;
		hasRequiredEncUtf16 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var C_enc = C.enc;

				    /**
				     * UTF-16 BE encoding strategy.
				     */
				    C_enc.Utf16 = C_enc.Utf16BE = {
				        /**
				         * Converts a word array to a UTF-16 BE string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The UTF-16 BE string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var utf16Chars = [];
				            for (var i = 0; i < sigBytes; i += 2) {
				                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
				                utf16Chars.push(String.fromCharCode(codePoint));
				            }

				            return utf16Chars.join('');
				        },

				        /**
				         * Converts a UTF-16 BE string to a word array.
				         *
				         * @param {string} utf16Str The UTF-16 BE string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
				         */
				        parse: function (utf16Str) {
				            // Shortcut
				            var utf16StrLength = utf16Str.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < utf16StrLength; i++) {
				                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
				            }

				            return WordArray.create(words, utf16StrLength * 2);
				        }
				    };

				    /**
				     * UTF-16 LE encoding strategy.
				     */
				    C_enc.Utf16LE = {
				        /**
				         * Converts a word array to a UTF-16 LE string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The UTF-16 LE string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var utf16Chars = [];
				            for (var i = 0; i < sigBytes; i += 2) {
				                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
				                utf16Chars.push(String.fromCharCode(codePoint));
				            }

				            return utf16Chars.join('');
				        },

				        /**
				         * Converts a UTF-16 LE string to a word array.
				         *
				         * @param {string} utf16Str The UTF-16 LE string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
				         */
				        parse: function (utf16Str) {
				            // Shortcut
				            var utf16StrLength = utf16Str.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < utf16StrLength; i++) {
				                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
				            }

				            return WordArray.create(words, utf16StrLength * 2);
				        }
				    };

				    function swapEndian(word) {
				        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
				    }
				}());


				return CryptoJS.enc.Utf16;

			}));
	} (encUtf16));
		return encUtf16Exports;
	}

	var encBase64Exports = {};
	var encBase64 = {
	  get exports(){ return encBase64Exports; },
	  set exports(v){ encBase64Exports = v; },
	};

	var hasRequiredEncBase64;

	function requireEncBase64 () {
		if (hasRequiredEncBase64) return encBase64Exports;
		hasRequiredEncBase64 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var C_enc = C.enc;

				    /**
				     * Base64 encoding strategy.
				     */
				    C_enc.Base64 = {
				        /**
				         * Converts a word array to a Base64 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The Base64 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;
				            var map = this._map;

				            // Clamp excess bits
				            wordArray.clamp();

				            // Convert
				            var base64Chars = [];
				            for (var i = 0; i < sigBytes; i += 3) {
				                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
				                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
				                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

				                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

				                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
				                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
				                }
				            }

				            // Add padding
				            var paddingChar = map.charAt(64);
				            if (paddingChar) {
				                while (base64Chars.length % 4) {
				                    base64Chars.push(paddingChar);
				                }
				            }

				            return base64Chars.join('');
				        },

				        /**
				         * Converts a Base64 string to a word array.
				         *
				         * @param {string} base64Str The Base64 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
				         */
				        parse: function (base64Str) {
				            // Shortcuts
				            var base64StrLength = base64Str.length;
				            var map = this._map;
				            var reverseMap = this._reverseMap;

				            if (!reverseMap) {
				                    reverseMap = this._reverseMap = [];
				                    for (var j = 0; j < map.length; j++) {
				                        reverseMap[map.charCodeAt(j)] = j;
				                    }
				            }

				            // Ignore padding
				            var paddingChar = map.charAt(64);
				            if (paddingChar) {
				                var paddingIndex = base64Str.indexOf(paddingChar);
				                if (paddingIndex !== -1) {
				                    base64StrLength = paddingIndex;
				                }
				            }

				            // Convert
				            return parseLoop(base64Str, base64StrLength, reverseMap);

				        },

				        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
				    };

				    function parseLoop(base64Str, base64StrLength, reverseMap) {
				      var words = [];
				      var nBytes = 0;
				      for (var i = 0; i < base64StrLength; i++) {
				          if (i % 4) {
				              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
				              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
				              var bitsCombined = bits1 | bits2;
				              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
				              nBytes++;
				          }
				      }
				      return WordArray.create(words, nBytes);
				    }
				}());


				return CryptoJS.enc.Base64;

			}));
	} (encBase64));
		return encBase64Exports;
	}

	var encBase64urlExports = {};
	var encBase64url = {
	  get exports(){ return encBase64urlExports; },
	  set exports(v){ encBase64urlExports = v; },
	};

	var hasRequiredEncBase64url;

	function requireEncBase64url () {
		if (hasRequiredEncBase64url) return encBase64urlExports;
		hasRequiredEncBase64url = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var C_enc = C.enc;

				    /**
				     * Base64url encoding strategy.
				     */
				    C_enc.Base64url = {
				        /**
				         * Converts a word array to a Base64url string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @param {boolean} urlSafe Whether to use url safe
				         *
				         * @return {string} The Base64url string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
				         */
				        stringify: function (wordArray, urlSafe=true) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;
				            var map = urlSafe ? this._safe_map : this._map;

				            // Clamp excess bits
				            wordArray.clamp();

				            // Convert
				            var base64Chars = [];
				            for (var i = 0; i < sigBytes; i += 3) {
				                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
				                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
				                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

				                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

				                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
				                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
				                }
				            }

				            // Add padding
				            var paddingChar = map.charAt(64);
				            if (paddingChar) {
				                while (base64Chars.length % 4) {
				                    base64Chars.push(paddingChar);
				                }
				            }

				            return base64Chars.join('');
				        },

				        /**
				         * Converts a Base64url string to a word array.
				         *
				         * @param {string} base64Str The Base64url string.
				         *
				         * @param {boolean} urlSafe Whether to use url safe
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
				         */
				        parse: function (base64Str, urlSafe=true) {
				            // Shortcuts
				            var base64StrLength = base64Str.length;
				            var map = urlSafe ? this._safe_map : this._map;
				            var reverseMap = this._reverseMap;

				            if (!reverseMap) {
				                reverseMap = this._reverseMap = [];
				                for (var j = 0; j < map.length; j++) {
				                    reverseMap[map.charCodeAt(j)] = j;
				                }
				            }

				            // Ignore padding
				            var paddingChar = map.charAt(64);
				            if (paddingChar) {
				                var paddingIndex = base64Str.indexOf(paddingChar);
				                if (paddingIndex !== -1) {
				                    base64StrLength = paddingIndex;
				                }
				            }

				            // Convert
				            return parseLoop(base64Str, base64StrLength, reverseMap);

				        },

				        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
				        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
				    };

				    function parseLoop(base64Str, base64StrLength, reverseMap) {
				        var words = [];
				        var nBytes = 0;
				        for (var i = 0; i < base64StrLength; i++) {
				            if (i % 4) {
				                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
				                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
				                var bitsCombined = bits1 | bits2;
				                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
				                nBytes++;
				            }
				        }
				        return WordArray.create(words, nBytes);
				    }
				}());

				return CryptoJS.enc.Base64url;

			}));
	} (encBase64url));
		return encBase64urlExports;
	}

	var md5Exports = {};
	var md5 = {
	  get exports(){ return md5Exports; },
	  set exports(v){ md5Exports = v; },
	};

	var hasRequiredMd5;

	function requireMd5 () {
		if (hasRequiredMd5) return md5Exports;
		hasRequiredMd5 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function (Math) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var Hasher = C_lib.Hasher;
				    var C_algo = C.algo;

				    // Constants table
				    var T = [];

				    // Compute constants
				    (function () {
				        for (var i = 0; i < 64; i++) {
				            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
				        }
				    }());

				    /**
				     * MD5 hash algorithm.
				     */
				    var MD5 = C_algo.MD5 = Hasher.extend({
				        _doReset: function () {
				            this._hash = new WordArray.init([
				                0x67452301, 0xefcdab89,
				                0x98badcfe, 0x10325476
				            ]);
				        },

				        _doProcessBlock: function (M, offset) {
				            // Swap endian
				            for (var i = 0; i < 16; i++) {
				                // Shortcuts
				                var offset_i = offset + i;
				                var M_offset_i = M[offset_i];

				                M[offset_i] = (
				                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
				                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
				                );
				            }

				            // Shortcuts
				            var H = this._hash.words;

				            var M_offset_0  = M[offset + 0];
				            var M_offset_1  = M[offset + 1];
				            var M_offset_2  = M[offset + 2];
				            var M_offset_3  = M[offset + 3];
				            var M_offset_4  = M[offset + 4];
				            var M_offset_5  = M[offset + 5];
				            var M_offset_6  = M[offset + 6];
				            var M_offset_7  = M[offset + 7];
				            var M_offset_8  = M[offset + 8];
				            var M_offset_9  = M[offset + 9];
				            var M_offset_10 = M[offset + 10];
				            var M_offset_11 = M[offset + 11];
				            var M_offset_12 = M[offset + 12];
				            var M_offset_13 = M[offset + 13];
				            var M_offset_14 = M[offset + 14];
				            var M_offset_15 = M[offset + 15];

				            // Working varialbes
				            var a = H[0];
				            var b = H[1];
				            var c = H[2];
				            var d = H[3];

				            // Computation
				            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
				            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
				            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
				            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
				            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
				            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
				            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
				            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
				            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
				            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
				            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
				            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
				            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
				            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
				            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
				            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

				            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
				            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
				            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
				            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
				            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
				            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
				            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
				            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
				            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
				            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
				            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
				            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
				            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
				            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
				            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
				            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

				            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
				            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
				            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
				            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
				            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
				            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
				            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
				            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
				            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
				            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
				            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
				            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
				            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
				            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
				            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
				            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

				            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
				            d = II(d, a, b, c, M_offset_7,  10, T[49]);
				            c = II(c, d, a, b, M_offset_14, 15, T[50]);
				            b = II(b, c, d, a, M_offset_5,  21, T[51]);
				            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
				            d = II(d, a, b, c, M_offset_3,  10, T[53]);
				            c = II(c, d, a, b, M_offset_10, 15, T[54]);
				            b = II(b, c, d, a, M_offset_1,  21, T[55]);
				            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
				            d = II(d, a, b, c, M_offset_15, 10, T[57]);
				            c = II(c, d, a, b, M_offset_6,  15, T[58]);
				            b = II(b, c, d, a, M_offset_13, 21, T[59]);
				            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
				            d = II(d, a, b, c, M_offset_11, 10, T[61]);
				            c = II(c, d, a, b, M_offset_2,  15, T[62]);
				            b = II(b, c, d, a, M_offset_9,  21, T[63]);

				            // Intermediate hash value
				            H[0] = (H[0] + a) | 0;
				            H[1] = (H[1] + b) | 0;
				            H[2] = (H[2] + c) | 0;
				            H[3] = (H[3] + d) | 0;
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;

				            var nBitsTotal = this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

				            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
				            var nBitsTotalL = nBitsTotal;
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
				                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
				                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
				            );
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
				                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
				                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
				            );

				            data.sigBytes = (dataWords.length + 1) * 4;

				            // Hash final blocks
				            this._process();

				            // Shortcuts
				            var hash = this._hash;
				            var H = hash.words;

				            // Swap endian
				            for (var i = 0; i < 4; i++) {
				                // Shortcut
				                var H_i = H[i];

				                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
				                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
				            }

				            // Return final computed hash
				            return hash;
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);
				            clone._hash = this._hash.clone();

				            return clone;
				        }
				    });

				    function FF(a, b, c, d, x, s, t) {
				        var n = a + ((b & c) | (~b & d)) + x + t;
				        return ((n << s) | (n >>> (32 - s))) + b;
				    }

				    function GG(a, b, c, d, x, s, t) {
				        var n = a + ((b & d) | (c & ~d)) + x + t;
				        return ((n << s) | (n >>> (32 - s))) + b;
				    }

				    function HH(a, b, c, d, x, s, t) {
				        var n = a + (b ^ c ^ d) + x + t;
				        return ((n << s) | (n >>> (32 - s))) + b;
				    }

				    function II(a, b, c, d, x, s, t) {
				        var n = a + (c ^ (b | ~d)) + x + t;
				        return ((n << s) | (n >>> (32 - s))) + b;
				    }

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.MD5('message');
				     *     var hash = CryptoJS.MD5(wordArray);
				     */
				    C.MD5 = Hasher._createHelper(MD5);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacMD5(message, key);
				     */
				    C.HmacMD5 = Hasher._createHmacHelper(MD5);
				}(Math));


				return CryptoJS.MD5;

			}));
	} (md5));
		return md5Exports;
	}

	var sha1Exports = {};
	var sha1 = {
	  get exports(){ return sha1Exports; },
	  set exports(v){ sha1Exports = v; },
	};

	var hasRequiredSha1;

	function requireSha1 () {
		if (hasRequiredSha1) return sha1Exports;
		hasRequiredSha1 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var Hasher = C_lib.Hasher;
				    var C_algo = C.algo;

				    // Reusable object
				    var W = [];

				    /**
				     * SHA-1 hash algorithm.
				     */
				    var SHA1 = C_algo.SHA1 = Hasher.extend({
				        _doReset: function () {
				            this._hash = new WordArray.init([
				                0x67452301, 0xefcdab89,
				                0x98badcfe, 0x10325476,
				                0xc3d2e1f0
				            ]);
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcut
				            var H = this._hash.words;

				            // Working variables
				            var a = H[0];
				            var b = H[1];
				            var c = H[2];
				            var d = H[3];
				            var e = H[4];

				            // Computation
				            for (var i = 0; i < 80; i++) {
				                if (i < 16) {
				                    W[i] = M[offset + i] | 0;
				                } else {
				                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
				                    W[i] = (n << 1) | (n >>> 31);
				                }

				                var t = ((a << 5) | (a >>> 27)) + e + W[i];
				                if (i < 20) {
				                    t += ((b & c) | (~b & d)) + 0x5a827999;
				                } else if (i < 40) {
				                    t += (b ^ c ^ d) + 0x6ed9eba1;
				                } else if (i < 60) {
				                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
				                } else /* if (i < 80) */ {
				                    t += (b ^ c ^ d) - 0x359d3e2a;
				                }

				                e = d;
				                d = c;
				                c = (b << 30) | (b >>> 2);
				                b = a;
				                a = t;
				            }

				            // Intermediate hash value
				            H[0] = (H[0] + a) | 0;
				            H[1] = (H[1] + b) | 0;
				            H[2] = (H[2] + c) | 0;
				            H[3] = (H[3] + d) | 0;
				            H[4] = (H[4] + e) | 0;
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;

				            var nBitsTotal = this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
				            data.sigBytes = dataWords.length * 4;

				            // Hash final blocks
				            this._process();

				            // Return final computed hash
				            return this._hash;
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);
				            clone._hash = this._hash.clone();

				            return clone;
				        }
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA1('message');
				     *     var hash = CryptoJS.SHA1(wordArray);
				     */
				    C.SHA1 = Hasher._createHelper(SHA1);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA1(message, key);
				     */
				    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
				}());


				return CryptoJS.SHA1;

			}));
	} (sha1));
		return sha1Exports;
	}

	var sha256Exports = {};
	var sha256 = {
	  get exports(){ return sha256Exports; },
	  set exports(v){ sha256Exports = v; },
	};

	var hasRequiredSha256;

	function requireSha256 () {
		if (hasRequiredSha256) return sha256Exports;
		hasRequiredSha256 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function (Math) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var Hasher = C_lib.Hasher;
				    var C_algo = C.algo;

				    // Initialization and round constants tables
				    var H = [];
				    var K = [];

				    // Compute constants
				    (function () {
				        function isPrime(n) {
				            var sqrtN = Math.sqrt(n);
				            for (var factor = 2; factor <= sqrtN; factor++) {
				                if (!(n % factor)) {
				                    return false;
				                }
				            }

				            return true;
				        }

				        function getFractionalBits(n) {
				            return ((n - (n | 0)) * 0x100000000) | 0;
				        }

				        var n = 2;
				        var nPrime = 0;
				        while (nPrime < 64) {
				            if (isPrime(n)) {
				                if (nPrime < 8) {
				                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
				                }
				                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

				                nPrime++;
				            }

				            n++;
				        }
				    }());

				    // Reusable object
				    var W = [];

				    /**
				     * SHA-256 hash algorithm.
				     */
				    var SHA256 = C_algo.SHA256 = Hasher.extend({
				        _doReset: function () {
				            this._hash = new WordArray.init(H.slice(0));
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcut
				            var H = this._hash.words;

				            // Working variables
				            var a = H[0];
				            var b = H[1];
				            var c = H[2];
				            var d = H[3];
				            var e = H[4];
				            var f = H[5];
				            var g = H[6];
				            var h = H[7];

				            // Computation
				            for (var i = 0; i < 64; i++) {
				                if (i < 16) {
				                    W[i] = M[offset + i] | 0;
				                } else {
				                    var gamma0x = W[i - 15];
				                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
				                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
				                                   (gamma0x >>> 3);

				                    var gamma1x = W[i - 2];
				                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
				                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
				                                   (gamma1x >>> 10);

				                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
				                }

				                var ch  = (e & f) ^ (~e & g);
				                var maj = (a & b) ^ (a & c) ^ (b & c);

				                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
				                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

				                var t1 = h + sigma1 + ch + K[i] + W[i];
				                var t2 = sigma0 + maj;

				                h = g;
				                g = f;
				                f = e;
				                e = (d + t1) | 0;
				                d = c;
				                c = b;
				                b = a;
				                a = (t1 + t2) | 0;
				            }

				            // Intermediate hash value
				            H[0] = (H[0] + a) | 0;
				            H[1] = (H[1] + b) | 0;
				            H[2] = (H[2] + c) | 0;
				            H[3] = (H[3] + d) | 0;
				            H[4] = (H[4] + e) | 0;
				            H[5] = (H[5] + f) | 0;
				            H[6] = (H[6] + g) | 0;
				            H[7] = (H[7] + h) | 0;
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;

				            var nBitsTotal = this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
				            data.sigBytes = dataWords.length * 4;

				            // Hash final blocks
				            this._process();

				            // Return final computed hash
				            return this._hash;
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);
				            clone._hash = this._hash.clone();

				            return clone;
				        }
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA256('message');
				     *     var hash = CryptoJS.SHA256(wordArray);
				     */
				    C.SHA256 = Hasher._createHelper(SHA256);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA256(message, key);
				     */
				    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
				}(Math));


				return CryptoJS.SHA256;

			}));
	} (sha256));
		return sha256Exports;
	}

	var sha224Exports = {};
	var sha224 = {
	  get exports(){ return sha224Exports; },
	  set exports(v){ sha224Exports = v; },
	};

	var hasRequiredSha224;

	function requireSha224 () {
		if (hasRequiredSha224) return sha224Exports;
		hasRequiredSha224 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireSha256());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var C_algo = C.algo;
				    var SHA256 = C_algo.SHA256;

				    /**
				     * SHA-224 hash algorithm.
				     */
				    var SHA224 = C_algo.SHA224 = SHA256.extend({
				        _doReset: function () {
				            this._hash = new WordArray.init([
				                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
				                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
				            ]);
				        },

				        _doFinalize: function () {
				            var hash = SHA256._doFinalize.call(this);

				            hash.sigBytes -= 4;

				            return hash;
				        }
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA224('message');
				     *     var hash = CryptoJS.SHA224(wordArray);
				     */
				    C.SHA224 = SHA256._createHelper(SHA224);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA224(message, key);
				     */
				    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
				}());


				return CryptoJS.SHA224;

			}));
	} (sha224));
		return sha224Exports;
	}

	var sha512Exports = {};
	var sha512 = {
	  get exports(){ return sha512Exports; },
	  set exports(v){ sha512Exports = v; },
	};

	var hasRequiredSha512;

	function requireSha512 () {
		if (hasRequiredSha512) return sha512Exports;
		hasRequiredSha512 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireX64Core());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Hasher = C_lib.Hasher;
				    var C_x64 = C.x64;
				    var X64Word = C_x64.Word;
				    var X64WordArray = C_x64.WordArray;
				    var C_algo = C.algo;

				    function X64Word_create() {
				        return X64Word.create.apply(X64Word, arguments);
				    }

				    // Constants
				    var K = [
				        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
				        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
				        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
				        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
				        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
				        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
				        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
				        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
				        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
				        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
				        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
				        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
				        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
				        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
				        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
				        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
				        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
				        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
				        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
				        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
				        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
				        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
				        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
				        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
				        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
				        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
				        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
				        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
				        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
				        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
				        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
				        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
				        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
				        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
				        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
				        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
				        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
				        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
				        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
				        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
				    ];

				    // Reusable objects
				    var W = [];
				    (function () {
				        for (var i = 0; i < 80; i++) {
				            W[i] = X64Word_create();
				        }
				    }());

				    /**
				     * SHA-512 hash algorithm.
				     */
				    var SHA512 = C_algo.SHA512 = Hasher.extend({
				        _doReset: function () {
				            this._hash = new X64WordArray.init([
				                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
				                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
				                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
				                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
				            ]);
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcuts
				            var H = this._hash.words;

				            var H0 = H[0];
				            var H1 = H[1];
				            var H2 = H[2];
				            var H3 = H[3];
				            var H4 = H[4];
				            var H5 = H[5];
				            var H6 = H[6];
				            var H7 = H[7];

				            var H0h = H0.high;
				            var H0l = H0.low;
				            var H1h = H1.high;
				            var H1l = H1.low;
				            var H2h = H2.high;
				            var H2l = H2.low;
				            var H3h = H3.high;
				            var H3l = H3.low;
				            var H4h = H4.high;
				            var H4l = H4.low;
				            var H5h = H5.high;
				            var H5l = H5.low;
				            var H6h = H6.high;
				            var H6l = H6.low;
				            var H7h = H7.high;
				            var H7l = H7.low;

				            // Working variables
				            var ah = H0h;
				            var al = H0l;
				            var bh = H1h;
				            var bl = H1l;
				            var ch = H2h;
				            var cl = H2l;
				            var dh = H3h;
				            var dl = H3l;
				            var eh = H4h;
				            var el = H4l;
				            var fh = H5h;
				            var fl = H5l;
				            var gh = H6h;
				            var gl = H6l;
				            var hh = H7h;
				            var hl = H7l;

				            // Rounds
				            for (var i = 0; i < 80; i++) {
				                var Wil;
				                var Wih;

				                // Shortcut
				                var Wi = W[i];

				                // Extend message
				                if (i < 16) {
				                    Wih = Wi.high = M[offset + i * 2]     | 0;
				                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
				                } else {
				                    // Gamma0
				                    var gamma0x  = W[i - 15];
				                    var gamma0xh = gamma0x.high;
				                    var gamma0xl = gamma0x.low;
				                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
				                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

				                    // Gamma1
				                    var gamma1x  = W[i - 2];
				                    var gamma1xh = gamma1x.high;
				                    var gamma1xl = gamma1x.low;
				                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
				                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

				                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
				                    var Wi7  = W[i - 7];
				                    var Wi7h = Wi7.high;
				                    var Wi7l = Wi7.low;

				                    var Wi16  = W[i - 16];
				                    var Wi16h = Wi16.high;
				                    var Wi16l = Wi16.low;

				                    Wil = gamma0l + Wi7l;
				                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
				                    Wil = Wil + gamma1l;
				                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
				                    Wil = Wil + Wi16l;
				                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

				                    Wi.high = Wih;
				                    Wi.low  = Wil;
				                }

				                var chh  = (eh & fh) ^ (~eh & gh);
				                var chl  = (el & fl) ^ (~el & gl);
				                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
				                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

				                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
				                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
				                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
				                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

				                // t1 = h + sigma1 + ch + K[i] + W[i]
				                var Ki  = K[i];
				                var Kih = Ki.high;
				                var Kil = Ki.low;

				                var t1l = hl + sigma1l;
				                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
				                var t1l = t1l + chl;
				                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
				                var t1l = t1l + Kil;
				                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
				                var t1l = t1l + Wil;
				                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

				                // t2 = sigma0 + maj
				                var t2l = sigma0l + majl;
				                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

				                // Update working variables
				                hh = gh;
				                hl = gl;
				                gh = fh;
				                gl = fl;
				                fh = eh;
				                fl = el;
				                el = (dl + t1l) | 0;
				                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
				                dh = ch;
				                dl = cl;
				                ch = bh;
				                cl = bl;
				                bh = ah;
				                bl = al;
				                al = (t1l + t2l) | 0;
				                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
				            }

				            // Intermediate hash value
				            H0l = H0.low  = (H0l + al);
				            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
				            H1l = H1.low  = (H1l + bl);
				            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
				            H2l = H2.low  = (H2l + cl);
				            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
				            H3l = H3.low  = (H3l + dl);
				            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
				            H4l = H4.low  = (H4l + el);
				            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
				            H5l = H5.low  = (H5l + fl);
				            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
				            H6l = H6.low  = (H6l + gl);
				            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
				            H7l = H7.low  = (H7l + hl);
				            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;

				            var nBitsTotal = this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
				            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
				            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
				            data.sigBytes = dataWords.length * 4;

				            // Hash final blocks
				            this._process();

				            // Convert hash to 32-bit word array before returning
				            var hash = this._hash.toX32();

				            // Return final computed hash
				            return hash;
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);
				            clone._hash = this._hash.clone();

				            return clone;
				        },

				        blockSize: 1024/32
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA512('message');
				     *     var hash = CryptoJS.SHA512(wordArray);
				     */
				    C.SHA512 = Hasher._createHelper(SHA512);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA512(message, key);
				     */
				    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
				}());


				return CryptoJS.SHA512;

			}));
	} (sha512));
		return sha512Exports;
	}

	var sha384Exports = {};
	var sha384 = {
	  get exports(){ return sha384Exports; },
	  set exports(v){ sha384Exports = v; },
	};

	var hasRequiredSha384;

	function requireSha384 () {
		if (hasRequiredSha384) return sha384Exports;
		hasRequiredSha384 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireX64Core(), requireSha512());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_x64 = C.x64;
				    var X64Word = C_x64.Word;
				    var X64WordArray = C_x64.WordArray;
				    var C_algo = C.algo;
				    var SHA512 = C_algo.SHA512;

				    /**
				     * SHA-384 hash algorithm.
				     */
				    var SHA384 = C_algo.SHA384 = SHA512.extend({
				        _doReset: function () {
				            this._hash = new X64WordArray.init([
				                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
				                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
				                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
				                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
				            ]);
				        },

				        _doFinalize: function () {
				            var hash = SHA512._doFinalize.call(this);

				            hash.sigBytes -= 16;

				            return hash;
				        }
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA384('message');
				     *     var hash = CryptoJS.SHA384(wordArray);
				     */
				    C.SHA384 = SHA512._createHelper(SHA384);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA384(message, key);
				     */
				    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
				}());


				return CryptoJS.SHA384;

			}));
	} (sha384));
		return sha384Exports;
	}

	var sha3Exports = {};
	var sha3 = {
	  get exports(){ return sha3Exports; },
	  set exports(v){ sha3Exports = v; },
	};

	var hasRequiredSha3;

	function requireSha3 () {
		if (hasRequiredSha3) return sha3Exports;
		hasRequiredSha3 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireX64Core());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function (Math) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var Hasher = C_lib.Hasher;
				    var C_x64 = C.x64;
				    var X64Word = C_x64.Word;
				    var C_algo = C.algo;

				    // Constants tables
				    var RHO_OFFSETS = [];
				    var PI_INDEXES  = [];
				    var ROUND_CONSTANTS = [];

				    // Compute Constants
				    (function () {
				        // Compute rho offset constants
				        var x = 1, y = 0;
				        for (var t = 0; t < 24; t++) {
				            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

				            var newX = y % 5;
				            var newY = (2 * x + 3 * y) % 5;
				            x = newX;
				            y = newY;
				        }

				        // Compute pi index constants
				        for (var x = 0; x < 5; x++) {
				            for (var y = 0; y < 5; y++) {
				                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
				            }
				        }

				        // Compute round constants
				        var LFSR = 0x01;
				        for (var i = 0; i < 24; i++) {
				            var roundConstantMsw = 0;
				            var roundConstantLsw = 0;

				            for (var j = 0; j < 7; j++) {
				                if (LFSR & 0x01) {
				                    var bitPosition = (1 << j) - 1;
				                    if (bitPosition < 32) {
				                        roundConstantLsw ^= 1 << bitPosition;
				                    } else /* if (bitPosition >= 32) */ {
				                        roundConstantMsw ^= 1 << (bitPosition - 32);
				                    }
				                }

				                // Compute next LFSR
				                if (LFSR & 0x80) {
				                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
				                    LFSR = (LFSR << 1) ^ 0x71;
				                } else {
				                    LFSR <<= 1;
				                }
				            }

				            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
				        }
				    }());

				    // Reusable objects for temporary values
				    var T = [];
				    (function () {
				        for (var i = 0; i < 25; i++) {
				            T[i] = X64Word.create();
				        }
				    }());

				    /**
				     * SHA-3 hash algorithm.
				     */
				    var SHA3 = C_algo.SHA3 = Hasher.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {number} outputLength
				         *   The desired number of bits in the output hash.
				         *   Only values permitted are: 224, 256, 384, 512.
				         *   Default: 512
				         */
				        cfg: Hasher.cfg.extend({
				            outputLength: 512
				        }),

				        _doReset: function () {
				            var state = this._state = [];
				            for (var i = 0; i < 25; i++) {
				                state[i] = new X64Word.init();
				            }

				            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcuts
				            var state = this._state;
				            var nBlockSizeLanes = this.blockSize / 2;

				            // Absorb
				            for (var i = 0; i < nBlockSizeLanes; i++) {
				                // Shortcuts
				                var M2i  = M[offset + 2 * i];
				                var M2i1 = M[offset + 2 * i + 1];

				                // Swap endian
				                M2i = (
				                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
				                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
				                );
				                M2i1 = (
				                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
				                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
				                );

				                // Absorb message into state
				                var lane = state[i];
				                lane.high ^= M2i1;
				                lane.low  ^= M2i;
				            }

				            // Rounds
				            for (var round = 0; round < 24; round++) {
				                // Theta
				                for (var x = 0; x < 5; x++) {
				                    // Mix column lanes
				                    var tMsw = 0, tLsw = 0;
				                    for (var y = 0; y < 5; y++) {
				                        var lane = state[x + 5 * y];
				                        tMsw ^= lane.high;
				                        tLsw ^= lane.low;
				                    }

				                    // Temporary values
				                    var Tx = T[x];
				                    Tx.high = tMsw;
				                    Tx.low  = tLsw;
				                }
				                for (var x = 0; x < 5; x++) {
				                    // Shortcuts
				                    var Tx4 = T[(x + 4) % 5];
				                    var Tx1 = T[(x + 1) % 5];
				                    var Tx1Msw = Tx1.high;
				                    var Tx1Lsw = Tx1.low;

				                    // Mix surrounding columns
				                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
				                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
				                    for (var y = 0; y < 5; y++) {
				                        var lane = state[x + 5 * y];
				                        lane.high ^= tMsw;
				                        lane.low  ^= tLsw;
				                    }
				                }

				                // Rho Pi
				                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
				                    var tMsw;
				                    var tLsw;

				                    // Shortcuts
				                    var lane = state[laneIndex];
				                    var laneMsw = lane.high;
				                    var laneLsw = lane.low;
				                    var rhoOffset = RHO_OFFSETS[laneIndex];

				                    // Rotate lanes
				                    if (rhoOffset < 32) {
				                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
				                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
				                    } else /* if (rhoOffset >= 32) */ {
				                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
				                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
				                    }

				                    // Transpose lanes
				                    var TPiLane = T[PI_INDEXES[laneIndex]];
				                    TPiLane.high = tMsw;
				                    TPiLane.low  = tLsw;
				                }

				                // Rho pi at x = y = 0
				                var T0 = T[0];
				                var state0 = state[0];
				                T0.high = state0.high;
				                T0.low  = state0.low;

				                // Chi
				                for (var x = 0; x < 5; x++) {
				                    for (var y = 0; y < 5; y++) {
				                        // Shortcuts
				                        var laneIndex = x + 5 * y;
				                        var lane = state[laneIndex];
				                        var TLane = T[laneIndex];
				                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
				                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

				                        // Mix rows
				                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
				                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
				                    }
				                }

				                // Iota
				                var lane = state[0];
				                var roundConstant = ROUND_CONSTANTS[round];
				                lane.high ^= roundConstant.high;
				                lane.low  ^= roundConstant.low;
				            }
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;
				            this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;
				            var blockSizeBits = this.blockSize * 32;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
				            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
				            data.sigBytes = dataWords.length * 4;

				            // Hash final blocks
				            this._process();

				            // Shortcuts
				            var state = this._state;
				            var outputLengthBytes = this.cfg.outputLength / 8;
				            var outputLengthLanes = outputLengthBytes / 8;

				            // Squeeze
				            var hashWords = [];
				            for (var i = 0; i < outputLengthLanes; i++) {
				                // Shortcuts
				                var lane = state[i];
				                var laneMsw = lane.high;
				                var laneLsw = lane.low;

				                // Swap endian
				                laneMsw = (
				                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
				                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
				                );
				                laneLsw = (
				                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
				                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
				                );

				                // Squeeze state to retrieve hash
				                hashWords.push(laneLsw);
				                hashWords.push(laneMsw);
				            }

				            // Return final computed hash
				            return new WordArray.init(hashWords, outputLengthBytes);
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);

				            var state = clone._state = this._state.slice(0);
				            for (var i = 0; i < 25; i++) {
				                state[i] = state[i].clone();
				            }

				            return clone;
				        }
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA3('message');
				     *     var hash = CryptoJS.SHA3(wordArray);
				     */
				    C.SHA3 = Hasher._createHelper(SHA3);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA3(message, key);
				     */
				    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
				}(Math));


				return CryptoJS.SHA3;

			}));
	} (sha3));
		return sha3Exports;
	}

	var ripemd160Exports = {};
	var ripemd160 = {
	  get exports(){ return ripemd160Exports; },
	  set exports(v){ ripemd160Exports = v; },
	};

	var hasRequiredRipemd160;

	function requireRipemd160 () {
		if (hasRequiredRipemd160) return ripemd160Exports;
		hasRequiredRipemd160 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/** @preserve
				(c) 2012 by Cédric Mesnil. All rights reserved.

				Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

				    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
				    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

				THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
				*/

				(function (Math) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var Hasher = C_lib.Hasher;
				    var C_algo = C.algo;

				    // Constants table
				    var _zl = WordArray.create([
				        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
				        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
				        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
				        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
				        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
				    var _zr = WordArray.create([
				        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
				        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
				        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
				        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
				        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
				    var _sl = WordArray.create([
				         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
				        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
				        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
				          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
				        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
				    var _sr = WordArray.create([
				        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
				        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
				        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
				        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
				        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

				    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
				    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

				    /**
				     * RIPEMD160 hash algorithm.
				     */
				    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
				        _doReset: function () {
				            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
				        },

				        _doProcessBlock: function (M, offset) {

				            // Swap endian
				            for (var i = 0; i < 16; i++) {
				                // Shortcuts
				                var offset_i = offset + i;
				                var M_offset_i = M[offset_i];

				                // Swap
				                M[offset_i] = (
				                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
				                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
				                );
				            }
				            // Shortcut
				            var H  = this._hash.words;
				            var hl = _hl.words;
				            var hr = _hr.words;
				            var zl = _zl.words;
				            var zr = _zr.words;
				            var sl = _sl.words;
				            var sr = _sr.words;

				            // Working variables
				            var al, bl, cl, dl, el;
				            var ar, br, cr, dr, er;

				            ar = al = H[0];
				            br = bl = H[1];
				            cr = cl = H[2];
				            dr = dl = H[3];
				            er = el = H[4];
				            // Computation
				            var t;
				            for (var i = 0; i < 80; i += 1) {
				                t = (al +  M[offset+zl[i]])|0;
				                if (i<16){
					            t +=  f1(bl,cl,dl) + hl[0];
				                } else if (i<32) {
					            t +=  f2(bl,cl,dl) + hl[1];
				                } else if (i<48) {
					            t +=  f3(bl,cl,dl) + hl[2];
				                } else if (i<64) {
					            t +=  f4(bl,cl,dl) + hl[3];
				                } else {// if (i<80) {
					            t +=  f5(bl,cl,dl) + hl[4];
				                }
				                t = t|0;
				                t =  rotl(t,sl[i]);
				                t = (t+el)|0;
				                al = el;
				                el = dl;
				                dl = rotl(cl, 10);
				                cl = bl;
				                bl = t;

				                t = (ar + M[offset+zr[i]])|0;
				                if (i<16){
					            t +=  f5(br,cr,dr) + hr[0];
				                } else if (i<32) {
					            t +=  f4(br,cr,dr) + hr[1];
				                } else if (i<48) {
					            t +=  f3(br,cr,dr) + hr[2];
				                } else if (i<64) {
					            t +=  f2(br,cr,dr) + hr[3];
				                } else {// if (i<80) {
					            t +=  f1(br,cr,dr) + hr[4];
				                }
				                t = t|0;
				                t =  rotl(t,sr[i]) ;
				                t = (t+er)|0;
				                ar = er;
				                er = dr;
				                dr = rotl(cr, 10);
				                cr = br;
				                br = t;
				            }
				            // Intermediate hash value
				            t    = (H[1] + cl + dr)|0;
				            H[1] = (H[2] + dl + er)|0;
				            H[2] = (H[3] + el + ar)|0;
				            H[3] = (H[4] + al + br)|0;
				            H[4] = (H[0] + bl + cr)|0;
				            H[0] =  t;
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;

				            var nBitsTotal = this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
				                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
				                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
				            );
				            data.sigBytes = (dataWords.length + 1) * 4;

				            // Hash final blocks
				            this._process();

				            // Shortcuts
				            var hash = this._hash;
				            var H = hash.words;

				            // Swap endian
				            for (var i = 0; i < 5; i++) {
				                // Shortcut
				                var H_i = H[i];

				                // Swap
				                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
				                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
				            }

				            // Return final computed hash
				            return hash;
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);
				            clone._hash = this._hash.clone();

				            return clone;
				        }
				    });


				    function f1(x, y, z) {
				        return ((x) ^ (y) ^ (z));

				    }

				    function f2(x, y, z) {
				        return (((x)&(y)) | ((~x)&(z)));
				    }

				    function f3(x, y, z) {
				        return (((x) | (~(y))) ^ (z));
				    }

				    function f4(x, y, z) {
				        return (((x) & (z)) | ((y)&(~(z))));
				    }

				    function f5(x, y, z) {
				        return ((x) ^ ((y) |(~(z))));

				    }

				    function rotl(x,n) {
				        return (x<<n) | (x>>>(32-n));
				    }


				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.RIPEMD160('message');
				     *     var hash = CryptoJS.RIPEMD160(wordArray);
				     */
				    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
				     */
				    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
				}());


				return CryptoJS.RIPEMD160;

			}));
	} (ripemd160));
		return ripemd160Exports;
	}

	var hmacExports = {};
	var hmac = {
	  get exports(){ return hmacExports; },
	  set exports(v){ hmacExports = v; },
	};

	var hasRequiredHmac;

	function requireHmac () {
		if (hasRequiredHmac) return hmacExports;
		hasRequiredHmac = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Base = C_lib.Base;
				    var C_enc = C.enc;
				    var Utf8 = C_enc.Utf8;
				    var C_algo = C.algo;

				    /**
				     * HMAC algorithm.
				     */
				    C_algo.HMAC = Base.extend({
				        /**
				         * Initializes a newly created HMAC.
				         *
				         * @param {Hasher} hasher The hash algorithm to use.
				         * @param {WordArray|string} key The secret key.
				         *
				         * @example
				         *
				         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
				         */
				        init: function (hasher, key) {
				            // Init hasher
				            hasher = this._hasher = new hasher.init();

				            // Convert string to WordArray, else assume WordArray already
				            if (typeof key == 'string') {
				                key = Utf8.parse(key);
				            }

				            // Shortcuts
				            var hasherBlockSize = hasher.blockSize;
				            var hasherBlockSizeBytes = hasherBlockSize * 4;

				            // Allow arbitrary length keys
				            if (key.sigBytes > hasherBlockSizeBytes) {
				                key = hasher.finalize(key);
				            }

				            // Clamp excess bits
				            key.clamp();

				            // Clone key for inner and outer pads
				            var oKey = this._oKey = key.clone();
				            var iKey = this._iKey = key.clone();

				            // Shortcuts
				            var oKeyWords = oKey.words;
				            var iKeyWords = iKey.words;

				            // XOR keys with pad constants
				            for (var i = 0; i < hasherBlockSize; i++) {
				                oKeyWords[i] ^= 0x5c5c5c5c;
				                iKeyWords[i] ^= 0x36363636;
				            }
				            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

				            // Set initial values
				            this.reset();
				        },

				        /**
				         * Resets this HMAC to its initial state.
				         *
				         * @example
				         *
				         *     hmacHasher.reset();
				         */
				        reset: function () {
				            // Shortcut
				            var hasher = this._hasher;

				            // Reset
				            hasher.reset();
				            hasher.update(this._iKey);
				        },

				        /**
				         * Updates this HMAC with a message.
				         *
				         * @param {WordArray|string} messageUpdate The message to append.
				         *
				         * @return {HMAC} This HMAC instance.
				         *
				         * @example
				         *
				         *     hmacHasher.update('message');
				         *     hmacHasher.update(wordArray);
				         */
				        update: function (messageUpdate) {
				            this._hasher.update(messageUpdate);

				            // Chainable
				            return this;
				        },

				        /**
				         * Finalizes the HMAC computation.
				         * Note that the finalize operation is effectively a destructive, read-once operation.
				         *
				         * @param {WordArray|string} messageUpdate (Optional) A final message update.
				         *
				         * @return {WordArray} The HMAC.
				         *
				         * @example
				         *
				         *     var hmac = hmacHasher.finalize();
				         *     var hmac = hmacHasher.finalize('message');
				         *     var hmac = hmacHasher.finalize(wordArray);
				         */
				        finalize: function (messageUpdate) {
				            // Shortcut
				            var hasher = this._hasher;

				            // Compute HMAC
				            var innerHash = hasher.finalize(messageUpdate);
				            hasher.reset();
				            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

				            return hmac;
				        }
				    });
				}());


			}));
	} (hmac));
		return hmacExports;
	}

	var pbkdf2Exports = {};
	var pbkdf2 = {
	  get exports(){ return pbkdf2Exports; },
	  set exports(v){ pbkdf2Exports = v; },
	};

	var hasRequiredPbkdf2;

	function requirePbkdf2 () {
		if (hasRequiredPbkdf2) return pbkdf2Exports;
		hasRequiredPbkdf2 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireSha1(), requireHmac());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Base = C_lib.Base;
				    var WordArray = C_lib.WordArray;
				    var C_algo = C.algo;
				    var SHA1 = C_algo.SHA1;
				    var HMAC = C_algo.HMAC;

				    /**
				     * Password-Based Key Derivation Function 2 algorithm.
				     */
				    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
				         * @property {Hasher} hasher The hasher to use. Default: SHA1
				         * @property {number} iterations The number of iterations to perform. Default: 1
				         */
				        cfg: Base.extend({
				            keySize: 128/32,
				            hasher: SHA1,
				            iterations: 1
				        }),

				        /**
				         * Initializes a newly created key derivation function.
				         *
				         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
				         *
				         * @example
				         *
				         *     var kdf = CryptoJS.algo.PBKDF2.create();
				         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
				         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
				         */
				        init: function (cfg) {
				            this.cfg = this.cfg.extend(cfg);
				        },

				        /**
				         * Computes the Password-Based Key Derivation Function 2.
				         *
				         * @param {WordArray|string} password The password.
				         * @param {WordArray|string} salt A salt.
				         *
				         * @return {WordArray} The derived key.
				         *
				         * @example
				         *
				         *     var key = kdf.compute(password, salt);
				         */
				        compute: function (password, salt) {
				            // Shortcut
				            var cfg = this.cfg;

				            // Init HMAC
				            var hmac = HMAC.create(cfg.hasher, password);

				            // Initial values
				            var derivedKey = WordArray.create();
				            var blockIndex = WordArray.create([0x00000001]);

				            // Shortcuts
				            var derivedKeyWords = derivedKey.words;
				            var blockIndexWords = blockIndex.words;
				            var keySize = cfg.keySize;
				            var iterations = cfg.iterations;

				            // Generate key
				            while (derivedKeyWords.length < keySize) {
				                var block = hmac.update(salt).finalize(blockIndex);
				                hmac.reset();

				                // Shortcuts
				                var blockWords = block.words;
				                var blockWordsLength = blockWords.length;

				                // Iterations
				                var intermediate = block;
				                for (var i = 1; i < iterations; i++) {
				                    intermediate = hmac.finalize(intermediate);
				                    hmac.reset();

				                    // Shortcut
				                    var intermediateWords = intermediate.words;

				                    // XOR intermediate with block
				                    for (var j = 0; j < blockWordsLength; j++) {
				                        blockWords[j] ^= intermediateWords[j];
				                    }
				                }

				                derivedKey.concat(block);
				                blockIndexWords[0]++;
				            }
				            derivedKey.sigBytes = keySize * 4;

				            return derivedKey;
				        }
				    });

				    /**
				     * Computes the Password-Based Key Derivation Function 2.
				     *
				     * @param {WordArray|string} password The password.
				     * @param {WordArray|string} salt A salt.
				     * @param {Object} cfg (Optional) The configuration options to use for this computation.
				     *
				     * @return {WordArray} The derived key.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var key = CryptoJS.PBKDF2(password, salt);
				     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
				     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
				     */
				    C.PBKDF2 = function (password, salt, cfg) {
				        return PBKDF2.create(cfg).compute(password, salt);
				    };
				}());


				return CryptoJS.PBKDF2;

			}));
	} (pbkdf2));
		return pbkdf2Exports;
	}

	var evpkdfExports = {};
	var evpkdf = {
	  get exports(){ return evpkdfExports; },
	  set exports(v){ evpkdfExports = v; },
	};

	var hasRequiredEvpkdf;

	function requireEvpkdf () {
		if (hasRequiredEvpkdf) return evpkdfExports;
		hasRequiredEvpkdf = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireSha1(), requireHmac());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Base = C_lib.Base;
				    var WordArray = C_lib.WordArray;
				    var C_algo = C.algo;
				    var MD5 = C_algo.MD5;

				    /**
				     * This key derivation function is meant to conform with EVP_BytesToKey.
				     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
				     */
				    var EvpKDF = C_algo.EvpKDF = Base.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
				         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
				         * @property {number} iterations The number of iterations to perform. Default: 1
				         */
				        cfg: Base.extend({
				            keySize: 128/32,
				            hasher: MD5,
				            iterations: 1
				        }),

				        /**
				         * Initializes a newly created key derivation function.
				         *
				         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
				         *
				         * @example
				         *
				         *     var kdf = CryptoJS.algo.EvpKDF.create();
				         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
				         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
				         */
				        init: function (cfg) {
				            this.cfg = this.cfg.extend(cfg);
				        },

				        /**
				         * Derives a key from a password.
				         *
				         * @param {WordArray|string} password The password.
				         * @param {WordArray|string} salt A salt.
				         *
				         * @return {WordArray} The derived key.
				         *
				         * @example
				         *
				         *     var key = kdf.compute(password, salt);
				         */
				        compute: function (password, salt) {
				            var block;

				            // Shortcut
				            var cfg = this.cfg;

				            // Init hasher
				            var hasher = cfg.hasher.create();

				            // Initial values
				            var derivedKey = WordArray.create();

				            // Shortcuts
				            var derivedKeyWords = derivedKey.words;
				            var keySize = cfg.keySize;
				            var iterations = cfg.iterations;

				            // Generate key
				            while (derivedKeyWords.length < keySize) {
				                if (block) {
				                    hasher.update(block);
				                }
				                block = hasher.update(password).finalize(salt);
				                hasher.reset();

				                // Iterations
				                for (var i = 1; i < iterations; i++) {
				                    block = hasher.finalize(block);
				                    hasher.reset();
				                }

				                derivedKey.concat(block);
				            }
				            derivedKey.sigBytes = keySize * 4;

				            return derivedKey;
				        }
				    });

				    /**
				     * Derives a key from a password.
				     *
				     * @param {WordArray|string} password The password.
				     * @param {WordArray|string} salt A salt.
				     * @param {Object} cfg (Optional) The configuration options to use for this computation.
				     *
				     * @return {WordArray} The derived key.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var key = CryptoJS.EvpKDF(password, salt);
				     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
				     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
				     */
				    C.EvpKDF = function (password, salt, cfg) {
				        return EvpKDF.create(cfg).compute(password, salt);
				    };
				}());


				return CryptoJS.EvpKDF;

			}));
	} (evpkdf));
		return evpkdfExports;
	}

	var cipherCoreExports = {};
	var cipherCore = {
	  get exports(){ return cipherCoreExports; },
	  set exports(v){ cipherCoreExports = v; },
	};

	var hasRequiredCipherCore;

	function requireCipherCore () {
		if (hasRequiredCipherCore) return cipherCoreExports;
		hasRequiredCipherCore = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireEvpkdf());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * Cipher core components.
				 */
				CryptoJS.lib.Cipher || (function (undefined$1) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Base = C_lib.Base;
				    var WordArray = C_lib.WordArray;
				    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
				    var C_enc = C.enc;
				    C_enc.Utf8;
				    var Base64 = C_enc.Base64;
				    var C_algo = C.algo;
				    var EvpKDF = C_algo.EvpKDF;

				    /**
				     * Abstract base cipher template.
				     *
				     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
				     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
				     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
				     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
				     */
				    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {WordArray} iv The IV to use for this operation.
				         */
				        cfg: Base.extend(),

				        /**
				         * Creates this cipher in encryption mode.
				         *
				         * @param {WordArray} key The key.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @return {Cipher} A cipher instance.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
				         */
				        createEncryptor: function (key, cfg) {
				            return this.create(this._ENC_XFORM_MODE, key, cfg);
				        },

				        /**
				         * Creates this cipher in decryption mode.
				         *
				         * @param {WordArray} key The key.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @return {Cipher} A cipher instance.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
				         */
				        createDecryptor: function (key, cfg) {
				            return this.create(this._DEC_XFORM_MODE, key, cfg);
				        },

				        /**
				         * Initializes a newly created cipher.
				         *
				         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
				         * @param {WordArray} key The key.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @example
				         *
				         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
				         */
				        init: function (xformMode, key, cfg) {
				            // Apply config defaults
				            this.cfg = this.cfg.extend(cfg);

				            // Store transform mode and key
				            this._xformMode = xformMode;
				            this._key = key;

				            // Set initial values
				            this.reset();
				        },

				        /**
				         * Resets this cipher to its initial state.
				         *
				         * @example
				         *
				         *     cipher.reset();
				         */
				        reset: function () {
				            // Reset data buffer
				            BufferedBlockAlgorithm.reset.call(this);

				            // Perform concrete-cipher logic
				            this._doReset();
				        },

				        /**
				         * Adds data to be encrypted or decrypted.
				         *
				         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
				         *
				         * @return {WordArray} The data after processing.
				         *
				         * @example
				         *
				         *     var encrypted = cipher.process('data');
				         *     var encrypted = cipher.process(wordArray);
				         */
				        process: function (dataUpdate) {
				            // Append
				            this._append(dataUpdate);

				            // Process available blocks
				            return this._process();
				        },

				        /**
				         * Finalizes the encryption or decryption process.
				         * Note that the finalize operation is effectively a destructive, read-once operation.
				         *
				         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
				         *
				         * @return {WordArray} The data after final processing.
				         *
				         * @example
				         *
				         *     var encrypted = cipher.finalize();
				         *     var encrypted = cipher.finalize('data');
				         *     var encrypted = cipher.finalize(wordArray);
				         */
				        finalize: function (dataUpdate) {
				            // Final data update
				            if (dataUpdate) {
				                this._append(dataUpdate);
				            }

				            // Perform concrete-cipher logic
				            var finalProcessedData = this._doFinalize();

				            return finalProcessedData;
				        },

				        keySize: 128/32,

				        ivSize: 128/32,

				        _ENC_XFORM_MODE: 1,

				        _DEC_XFORM_MODE: 2,

				        /**
				         * Creates shortcut functions to a cipher's object interface.
				         *
				         * @param {Cipher} cipher The cipher to create a helper for.
				         *
				         * @return {Object} An object with encrypt and decrypt shortcut functions.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
				         */
				        _createHelper: (function () {
				            function selectCipherStrategy(key) {
				                if (typeof key == 'string') {
				                    return PasswordBasedCipher;
				                } else {
				                    return SerializableCipher;
				                }
				            }

				            return function (cipher) {
				                return {
				                    encrypt: function (message, key, cfg) {
				                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
				                    },

				                    decrypt: function (ciphertext, key, cfg) {
				                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
				                    }
				                };
				            };
				        }())
				    });

				    /**
				     * Abstract base stream cipher template.
				     *
				     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
				     */
				    C_lib.StreamCipher = Cipher.extend({
				        _doFinalize: function () {
				            // Process partial blocks
				            var finalProcessedBlocks = this._process(!!'flush');

				            return finalProcessedBlocks;
				        },

				        blockSize: 1
				    });

				    /**
				     * Mode namespace.
				     */
				    var C_mode = C.mode = {};

				    /**
				     * Abstract base block cipher mode template.
				     */
				    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
				        /**
				         * Creates this mode for encryption.
				         *
				         * @param {Cipher} cipher A block cipher instance.
				         * @param {Array} iv The IV words.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
				         */
				        createEncryptor: function (cipher, iv) {
				            return this.Encryptor.create(cipher, iv);
				        },

				        /**
				         * Creates this mode for decryption.
				         *
				         * @param {Cipher} cipher A block cipher instance.
				         * @param {Array} iv The IV words.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
				         */
				        createDecryptor: function (cipher, iv) {
				            return this.Decryptor.create(cipher, iv);
				        },

				        /**
				         * Initializes a newly created mode.
				         *
				         * @param {Cipher} cipher A block cipher instance.
				         * @param {Array} iv The IV words.
				         *
				         * @example
				         *
				         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
				         */
				        init: function (cipher, iv) {
				            this._cipher = cipher;
				            this._iv = iv;
				        }
				    });

				    /**
				     * Cipher Block Chaining mode.
				     */
				    var CBC = C_mode.CBC = (function () {
				        /**
				         * Abstract base CBC mode.
				         */
				        var CBC = BlockCipherMode.extend();

				        /**
				         * CBC encryptor.
				         */
				        CBC.Encryptor = CBC.extend({
				            /**
				             * Processes the data block at offset.
				             *
				             * @param {Array} words The data words to operate on.
				             * @param {number} offset The offset where the block starts.
				             *
				             * @example
				             *
				             *     mode.processBlock(data.words, offset);
				             */
				            processBlock: function (words, offset) {
				                // Shortcuts
				                var cipher = this._cipher;
				                var blockSize = cipher.blockSize;

				                // XOR and encrypt
				                xorBlock.call(this, words, offset, blockSize);
				                cipher.encryptBlock(words, offset);

				                // Remember this block to use with next block
				                this._prevBlock = words.slice(offset, offset + blockSize);
				            }
				        });

				        /**
				         * CBC decryptor.
				         */
				        CBC.Decryptor = CBC.extend({
				            /**
				             * Processes the data block at offset.
				             *
				             * @param {Array} words The data words to operate on.
				             * @param {number} offset The offset where the block starts.
				             *
				             * @example
				             *
				             *     mode.processBlock(data.words, offset);
				             */
				            processBlock: function (words, offset) {
				                // Shortcuts
				                var cipher = this._cipher;
				                var blockSize = cipher.blockSize;

				                // Remember this block to use with next block
				                var thisBlock = words.slice(offset, offset + blockSize);

				                // Decrypt and XOR
				                cipher.decryptBlock(words, offset);
				                xorBlock.call(this, words, offset, blockSize);

				                // This block becomes the previous block
				                this._prevBlock = thisBlock;
				            }
				        });

				        function xorBlock(words, offset, blockSize) {
				            var block;

				            // Shortcut
				            var iv = this._iv;

				            // Choose mixing block
				            if (iv) {
				                block = iv;

				                // Remove IV for subsequent blocks
				                this._iv = undefined$1;
				            } else {
				                block = this._prevBlock;
				            }

				            // XOR blocks
				            for (var i = 0; i < blockSize; i++) {
				                words[offset + i] ^= block[i];
				            }
				        }

				        return CBC;
				    }());

				    /**
				     * Padding namespace.
				     */
				    var C_pad = C.pad = {};

				    /**
				     * PKCS #5/7 padding strategy.
				     */
				    var Pkcs7 = C_pad.Pkcs7 = {
				        /**
				         * Pads data using the algorithm defined in PKCS #5/7.
				         *
				         * @param {WordArray} data The data to pad.
				         * @param {number} blockSize The multiple that the data should be padded to.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
				         */
				        pad: function (data, blockSize) {
				            // Shortcut
				            var blockSizeBytes = blockSize * 4;

				            // Count padding bytes
				            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

				            // Create padding word
				            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

				            // Create padding
				            var paddingWords = [];
				            for (var i = 0; i < nPaddingBytes; i += 4) {
				                paddingWords.push(paddingWord);
				            }
				            var padding = WordArray.create(paddingWords, nPaddingBytes);

				            // Add padding
				            data.concat(padding);
				        },

				        /**
				         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
				         *
				         * @param {WordArray} data The data to unpad.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
				         */
				        unpad: function (data) {
				            // Get number of padding bytes from last byte
				            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

				            // Remove padding
				            data.sigBytes -= nPaddingBytes;
				        }
				    };

				    /**
				     * Abstract base block cipher template.
				     *
				     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
				     */
				    C_lib.BlockCipher = Cipher.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {Mode} mode The block mode to use. Default: CBC
				         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
				         */
				        cfg: Cipher.cfg.extend({
				            mode: CBC,
				            padding: Pkcs7
				        }),

				        reset: function () {
				            var modeCreator;

				            // Reset cipher
				            Cipher.reset.call(this);

				            // Shortcuts
				            var cfg = this.cfg;
				            var iv = cfg.iv;
				            var mode = cfg.mode;

				            // Reset block mode
				            if (this._xformMode == this._ENC_XFORM_MODE) {
				                modeCreator = mode.createEncryptor;
				            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
				                modeCreator = mode.createDecryptor;
				                // Keep at least one block in the buffer for unpadding
				                this._minBufferSize = 1;
				            }

				            if (this._mode && this._mode.__creator == modeCreator) {
				                this._mode.init(this, iv && iv.words);
				            } else {
				                this._mode = modeCreator.call(mode, this, iv && iv.words);
				                this._mode.__creator = modeCreator;
				            }
				        },

				        _doProcessBlock: function (words, offset) {
				            this._mode.processBlock(words, offset);
				        },

				        _doFinalize: function () {
				            var finalProcessedBlocks;

				            // Shortcut
				            var padding = this.cfg.padding;

				            // Finalize
				            if (this._xformMode == this._ENC_XFORM_MODE) {
				                // Pad data
				                padding.pad(this._data, this.blockSize);

				                // Process final blocks
				                finalProcessedBlocks = this._process(!!'flush');
				            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
				                // Process final blocks
				                finalProcessedBlocks = this._process(!!'flush');

				                // Unpad data
				                padding.unpad(finalProcessedBlocks);
				            }

				            return finalProcessedBlocks;
				        },

				        blockSize: 128/32
				    });

				    /**
				     * A collection of cipher parameters.
				     *
				     * @property {WordArray} ciphertext The raw ciphertext.
				     * @property {WordArray} key The key to this ciphertext.
				     * @property {WordArray} iv The IV used in the ciphering operation.
				     * @property {WordArray} salt The salt used with a key derivation function.
				     * @property {Cipher} algorithm The cipher algorithm.
				     * @property {Mode} mode The block mode used in the ciphering operation.
				     * @property {Padding} padding The padding scheme used in the ciphering operation.
				     * @property {number} blockSize The block size of the cipher.
				     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
				     */
				    var CipherParams = C_lib.CipherParams = Base.extend({
				        /**
				         * Initializes a newly created cipher params object.
				         *
				         * @param {Object} cipherParams An object with any of the possible cipher parameters.
				         *
				         * @example
				         *
				         *     var cipherParams = CryptoJS.lib.CipherParams.create({
				         *         ciphertext: ciphertextWordArray,
				         *         key: keyWordArray,
				         *         iv: ivWordArray,
				         *         salt: saltWordArray,
				         *         algorithm: CryptoJS.algo.AES,
				         *         mode: CryptoJS.mode.CBC,
				         *         padding: CryptoJS.pad.PKCS7,
				         *         blockSize: 4,
				         *         formatter: CryptoJS.format.OpenSSL
				         *     });
				         */
				        init: function (cipherParams) {
				            this.mixIn(cipherParams);
				        },

				        /**
				         * Converts this cipher params object to a string.
				         *
				         * @param {Format} formatter (Optional) The formatting strategy to use.
				         *
				         * @return {string} The stringified cipher params.
				         *
				         * @throws Error If neither the formatter nor the default formatter is set.
				         *
				         * @example
				         *
				         *     var string = cipherParams + '';
				         *     var string = cipherParams.toString();
				         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
				         */
				        toString: function (formatter) {
				            return (formatter || this.formatter).stringify(this);
				        }
				    });

				    /**
				     * Format namespace.
				     */
				    var C_format = C.format = {};

				    /**
				     * OpenSSL formatting strategy.
				     */
				    var OpenSSLFormatter = C_format.OpenSSL = {
				        /**
				         * Converts a cipher params object to an OpenSSL-compatible string.
				         *
				         * @param {CipherParams} cipherParams The cipher params object.
				         *
				         * @return {string} The OpenSSL-compatible string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
				         */
				        stringify: function (cipherParams) {
				            var wordArray;

				            // Shortcuts
				            var ciphertext = cipherParams.ciphertext;
				            var salt = cipherParams.salt;

				            // Format
				            if (salt) {
				                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
				            } else {
				                wordArray = ciphertext;
				            }

				            return wordArray.toString(Base64);
				        },

				        /**
				         * Converts an OpenSSL-compatible string to a cipher params object.
				         *
				         * @param {string} openSSLStr The OpenSSL-compatible string.
				         *
				         * @return {CipherParams} The cipher params object.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
				         */
				        parse: function (openSSLStr) {
				            var salt;

				            // Parse base64
				            var ciphertext = Base64.parse(openSSLStr);

				            // Shortcut
				            var ciphertextWords = ciphertext.words;

				            // Test for salt
				            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
				                // Extract salt
				                salt = WordArray.create(ciphertextWords.slice(2, 4));

				                // Remove salt from ciphertext
				                ciphertextWords.splice(0, 4);
				                ciphertext.sigBytes -= 16;
				            }

				            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
				        }
				    };

				    /**
				     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
				     */
				    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
				         */
				        cfg: Base.extend({
				            format: OpenSSLFormatter
				        }),

				        /**
				         * Encrypts a message.
				         *
				         * @param {Cipher} cipher The cipher algorithm to use.
				         * @param {WordArray|string} message The message to encrypt.
				         * @param {WordArray} key The key.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @return {CipherParams} A cipher params object.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
				         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
				         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
				         */
				        encrypt: function (cipher, message, key, cfg) {
				            // Apply config defaults
				            cfg = this.cfg.extend(cfg);

				            // Encrypt
				            var encryptor = cipher.createEncryptor(key, cfg);
				            var ciphertext = encryptor.finalize(message);

				            // Shortcut
				            var cipherCfg = encryptor.cfg;

				            // Create and return serializable cipher params
				            return CipherParams.create({
				                ciphertext: ciphertext,
				                key: key,
				                iv: cipherCfg.iv,
				                algorithm: cipher,
				                mode: cipherCfg.mode,
				                padding: cipherCfg.padding,
				                blockSize: cipher.blockSize,
				                formatter: cfg.format
				            });
				        },

				        /**
				         * Decrypts serialized ciphertext.
				         *
				         * @param {Cipher} cipher The cipher algorithm to use.
				         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
				         * @param {WordArray} key The key.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @return {WordArray} The plaintext.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
				         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
				         */
				        decrypt: function (cipher, ciphertext, key, cfg) {
				            // Apply config defaults
				            cfg = this.cfg.extend(cfg);

				            // Convert string to CipherParams
				            ciphertext = this._parse(ciphertext, cfg.format);

				            // Decrypt
				            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

				            return plaintext;
				        },

				        /**
				         * Converts serialized ciphertext to CipherParams,
				         * else assumed CipherParams already and returns ciphertext unchanged.
				         *
				         * @param {CipherParams|string} ciphertext The ciphertext.
				         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
				         *
				         * @return {CipherParams} The unserialized ciphertext.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
				         */
				        _parse: function (ciphertext, format) {
				            if (typeof ciphertext == 'string') {
				                return format.parse(ciphertext, this);
				            } else {
				                return ciphertext;
				            }
				        }
				    });

				    /**
				     * Key derivation function namespace.
				     */
				    var C_kdf = C.kdf = {};

				    /**
				     * OpenSSL key derivation function.
				     */
				    var OpenSSLKdf = C_kdf.OpenSSL = {
				        /**
				         * Derives a key and IV from a password.
				         *
				         * @param {string} password The password to derive from.
				         * @param {number} keySize The size in words of the key to generate.
				         * @param {number} ivSize The size in words of the IV to generate.
				         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
				         *
				         * @return {CipherParams} A cipher params object with the key, IV, and salt.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
				         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
				         */
				        execute: function (password, keySize, ivSize, salt) {
				            // Generate random salt
				            if (!salt) {
				                salt = WordArray.random(64/8);
				            }

				            // Derive key and IV
				            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

				            // Separate key and IV
				            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
				            key.sigBytes = keySize * 4;

				            // Return params
				            return CipherParams.create({ key: key, iv: iv, salt: salt });
				        }
				    };

				    /**
				     * A serializable cipher wrapper that derives the key from a password,
				     * and returns ciphertext as a serializable cipher params object.
				     */
				    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
				         */
				        cfg: SerializableCipher.cfg.extend({
				            kdf: OpenSSLKdf
				        }),

				        /**
				         * Encrypts a message using a password.
				         *
				         * @param {Cipher} cipher The cipher algorithm to use.
				         * @param {WordArray|string} message The message to encrypt.
				         * @param {string} password The password.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @return {CipherParams} A cipher params object.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
				         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
				         */
				        encrypt: function (cipher, message, password, cfg) {
				            // Apply config defaults
				            cfg = this.cfg.extend(cfg);

				            // Derive key and other params
				            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

				            // Add IV to config
				            cfg.iv = derivedParams.iv;

				            // Encrypt
				            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

				            // Mix in derived params
				            ciphertext.mixIn(derivedParams);

				            return ciphertext;
				        },

				        /**
				         * Decrypts serialized ciphertext using a password.
				         *
				         * @param {Cipher} cipher The cipher algorithm to use.
				         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
				         * @param {string} password The password.
				         * @param {Object} cfg (Optional) The configuration options to use for this operation.
				         *
				         * @return {WordArray} The plaintext.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
				         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
				         */
				        decrypt: function (cipher, ciphertext, password, cfg) {
				            // Apply config defaults
				            cfg = this.cfg.extend(cfg);

				            // Convert string to CipherParams
				            ciphertext = this._parse(ciphertext, cfg.format);

				            // Derive key and other params
				            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

				            // Add IV to config
				            cfg.iv = derivedParams.iv;

				            // Decrypt
				            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

				            return plaintext;
				        }
				    });
				}());


			}));
	} (cipherCore));
		return cipherCoreExports;
	}

	var modeCfbExports = {};
	var modeCfb = {
	  get exports(){ return modeCfbExports; },
	  set exports(v){ modeCfbExports = v; },
	};

	var hasRequiredModeCfb;

	function requireModeCfb () {
		if (hasRequiredModeCfb) return modeCfbExports;
		hasRequiredModeCfb = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * Cipher Feedback block mode.
				 */
				CryptoJS.mode.CFB = (function () {
				    var CFB = CryptoJS.lib.BlockCipherMode.extend();

				    CFB.Encryptor = CFB.extend({
				        processBlock: function (words, offset) {
				            // Shortcuts
				            var cipher = this._cipher;
				            var blockSize = cipher.blockSize;

				            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

				            // Remember this block to use with next block
				            this._prevBlock = words.slice(offset, offset + blockSize);
				        }
				    });

				    CFB.Decryptor = CFB.extend({
				        processBlock: function (words, offset) {
				            // Shortcuts
				            var cipher = this._cipher;
				            var blockSize = cipher.blockSize;

				            // Remember this block to use with next block
				            var thisBlock = words.slice(offset, offset + blockSize);

				            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

				            // This block becomes the previous block
				            this._prevBlock = thisBlock;
				        }
				    });

				    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
				        var keystream;

				        // Shortcut
				        var iv = this._iv;

				        // Generate keystream
				        if (iv) {
				            keystream = iv.slice(0);

				            // Remove IV for subsequent blocks
				            this._iv = undefined;
				        } else {
				            keystream = this._prevBlock;
				        }
				        cipher.encryptBlock(keystream, 0);

				        // Encrypt
				        for (var i = 0; i < blockSize; i++) {
				            words[offset + i] ^= keystream[i];
				        }
				    }

				    return CFB;
				}());


				return CryptoJS.mode.CFB;

			}));
	} (modeCfb));
		return modeCfbExports;
	}

	var modeCtrExports = {};
	var modeCtr = {
	  get exports(){ return modeCtrExports; },
	  set exports(v){ modeCtrExports = v; },
	};

	var hasRequiredModeCtr;

	function requireModeCtr () {
		if (hasRequiredModeCtr) return modeCtrExports;
		hasRequiredModeCtr = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * Counter block mode.
				 */
				CryptoJS.mode.CTR = (function () {
				    var CTR = CryptoJS.lib.BlockCipherMode.extend();

				    var Encryptor = CTR.Encryptor = CTR.extend({
				        processBlock: function (words, offset) {
				            // Shortcuts
				            var cipher = this._cipher;
				            var blockSize = cipher.blockSize;
				            var iv = this._iv;
				            var counter = this._counter;

				            // Generate keystream
				            if (iv) {
				                counter = this._counter = iv.slice(0);

				                // Remove IV for subsequent blocks
				                this._iv = undefined;
				            }
				            var keystream = counter.slice(0);
				            cipher.encryptBlock(keystream, 0);

				            // Increment counter
				            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

				            // Encrypt
				            for (var i = 0; i < blockSize; i++) {
				                words[offset + i] ^= keystream[i];
				            }
				        }
				    });

				    CTR.Decryptor = Encryptor;

				    return CTR;
				}());


				return CryptoJS.mode.CTR;

			}));
	} (modeCtr));
		return modeCtrExports;
	}

	var modeCtrGladmanExports = {};
	var modeCtrGladman = {
	  get exports(){ return modeCtrGladmanExports; },
	  set exports(v){ modeCtrGladmanExports = v; },
	};

	var hasRequiredModeCtrGladman;

	function requireModeCtrGladman () {
		if (hasRequiredModeCtrGladman) return modeCtrGladmanExports;
		hasRequiredModeCtrGladman = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/** @preserve
				 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
				 * derived from CryptoJS.mode.CTR
				 * Jan Hruby jhruby.web@gmail.com
				 */
				CryptoJS.mode.CTRGladman = (function () {
				    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

					function incWord(word)
					{
						if (((word >> 24) & 0xff) === 0xff) { //overflow
						var b1 = (word >> 16)&0xff;
						var b2 = (word >> 8)&0xff;
						var b3 = word & 0xff;

						if (b1 === 0xff) // overflow b1
						{
						b1 = 0;
						if (b2 === 0xff)
						{
							b2 = 0;
							if (b3 === 0xff)
							{
								b3 = 0;
							}
							else
							{
								++b3;
							}
						}
						else
						{
							++b2;
						}
						}
						else
						{
						++b1;
						}

						word = 0;
						word += (b1 << 16);
						word += (b2 << 8);
						word += b3;
						}
						else
						{
						word += (0x01 << 24);
						}
						return word;
					}

					function incCounter(counter)
					{
						if ((counter[0] = incWord(counter[0])) === 0)
						{
							// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
							counter[1] = incWord(counter[1]);
						}
						return counter;
					}

				    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
				        processBlock: function (words, offset) {
				            // Shortcuts
				            var cipher = this._cipher;
				            var blockSize = cipher.blockSize;
				            var iv = this._iv;
				            var counter = this._counter;

				            // Generate keystream
				            if (iv) {
				                counter = this._counter = iv.slice(0);

				                // Remove IV for subsequent blocks
				                this._iv = undefined;
				            }

							incCounter(counter);

							var keystream = counter.slice(0);
				            cipher.encryptBlock(keystream, 0);

				            // Encrypt
				            for (var i = 0; i < blockSize; i++) {
				                words[offset + i] ^= keystream[i];
				            }
				        }
				    });

				    CTRGladman.Decryptor = Encryptor;

				    return CTRGladman;
				}());




				return CryptoJS.mode.CTRGladman;

			}));
	} (modeCtrGladman));
		return modeCtrGladmanExports;
	}

	var modeOfbExports = {};
	var modeOfb = {
	  get exports(){ return modeOfbExports; },
	  set exports(v){ modeOfbExports = v; },
	};

	var hasRequiredModeOfb;

	function requireModeOfb () {
		if (hasRequiredModeOfb) return modeOfbExports;
		hasRequiredModeOfb = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * Output Feedback block mode.
				 */
				CryptoJS.mode.OFB = (function () {
				    var OFB = CryptoJS.lib.BlockCipherMode.extend();

				    var Encryptor = OFB.Encryptor = OFB.extend({
				        processBlock: function (words, offset) {
				            // Shortcuts
				            var cipher = this._cipher;
				            var blockSize = cipher.blockSize;
				            var iv = this._iv;
				            var keystream = this._keystream;

				            // Generate keystream
				            if (iv) {
				                keystream = this._keystream = iv.slice(0);

				                // Remove IV for subsequent blocks
				                this._iv = undefined;
				            }
				            cipher.encryptBlock(keystream, 0);

				            // Encrypt
				            for (var i = 0; i < blockSize; i++) {
				                words[offset + i] ^= keystream[i];
				            }
				        }
				    });

				    OFB.Decryptor = Encryptor;

				    return OFB;
				}());


				return CryptoJS.mode.OFB;

			}));
	} (modeOfb));
		return modeOfbExports;
	}

	var modeEcbExports = {};
	var modeEcb = {
	  get exports(){ return modeEcbExports; },
	  set exports(v){ modeEcbExports = v; },
	};

	var hasRequiredModeEcb;

	function requireModeEcb () {
		if (hasRequiredModeEcb) return modeEcbExports;
		hasRequiredModeEcb = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * Electronic Codebook block mode.
				 */
				CryptoJS.mode.ECB = (function () {
				    var ECB = CryptoJS.lib.BlockCipherMode.extend();

				    ECB.Encryptor = ECB.extend({
				        processBlock: function (words, offset) {
				            this._cipher.encryptBlock(words, offset);
				        }
				    });

				    ECB.Decryptor = ECB.extend({
				        processBlock: function (words, offset) {
				            this._cipher.decryptBlock(words, offset);
				        }
				    });

				    return ECB;
				}());


				return CryptoJS.mode.ECB;

			}));
	} (modeEcb));
		return modeEcbExports;
	}

	var padAnsix923Exports = {};
	var padAnsix923 = {
	  get exports(){ return padAnsix923Exports; },
	  set exports(v){ padAnsix923Exports = v; },
	};

	var hasRequiredPadAnsix923;

	function requirePadAnsix923 () {
		if (hasRequiredPadAnsix923) return padAnsix923Exports;
		hasRequiredPadAnsix923 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * ANSI X.923 padding strategy.
				 */
				CryptoJS.pad.AnsiX923 = {
				    pad: function (data, blockSize) {
				        // Shortcuts
				        var dataSigBytes = data.sigBytes;
				        var blockSizeBytes = blockSize * 4;

				        // Count padding bytes
				        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

				        // Compute last byte position
				        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

				        // Pad
				        data.clamp();
				        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
				        data.sigBytes += nPaddingBytes;
				    },

				    unpad: function (data) {
				        // Get number of padding bytes from last byte
				        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

				        // Remove padding
				        data.sigBytes -= nPaddingBytes;
				    }
				};


				return CryptoJS.pad.Ansix923;

			}));
	} (padAnsix923));
		return padAnsix923Exports;
	}

	var padIso10126Exports = {};
	var padIso10126 = {
	  get exports(){ return padIso10126Exports; },
	  set exports(v){ padIso10126Exports = v; },
	};

	var hasRequiredPadIso10126;

	function requirePadIso10126 () {
		if (hasRequiredPadIso10126) return padIso10126Exports;
		hasRequiredPadIso10126 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * ISO 10126 padding strategy.
				 */
				CryptoJS.pad.Iso10126 = {
				    pad: function (data, blockSize) {
				        // Shortcut
				        var blockSizeBytes = blockSize * 4;

				        // Count padding bytes
				        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

				        // Pad
				        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
				             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
				    },

				    unpad: function (data) {
				        // Get number of padding bytes from last byte
				        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

				        // Remove padding
				        data.sigBytes -= nPaddingBytes;
				    }
				};


				return CryptoJS.pad.Iso10126;

			}));
	} (padIso10126));
		return padIso10126Exports;
	}

	var padIso97971Exports = {};
	var padIso97971 = {
	  get exports(){ return padIso97971Exports; },
	  set exports(v){ padIso97971Exports = v; },
	};

	var hasRequiredPadIso97971;

	function requirePadIso97971 () {
		if (hasRequiredPadIso97971) return padIso97971Exports;
		hasRequiredPadIso97971 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * ISO/IEC 9797-1 Padding Method 2.
				 */
				CryptoJS.pad.Iso97971 = {
				    pad: function (data, blockSize) {
				        // Add 0x80 byte
				        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

				        // Zero pad the rest
				        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
				    },

				    unpad: function (data) {
				        // Remove zero padding
				        CryptoJS.pad.ZeroPadding.unpad(data);

				        // Remove one more byte -- the 0x80 byte
				        data.sigBytes--;
				    }
				};


				return CryptoJS.pad.Iso97971;

			}));
	} (padIso97971));
		return padIso97971Exports;
	}

	var padZeropaddingExports = {};
	var padZeropadding = {
	  get exports(){ return padZeropaddingExports; },
	  set exports(v){ padZeropaddingExports = v; },
	};

	var hasRequiredPadZeropadding;

	function requirePadZeropadding () {
		if (hasRequiredPadZeropadding) return padZeropaddingExports;
		hasRequiredPadZeropadding = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * Zero padding strategy.
				 */
				CryptoJS.pad.ZeroPadding = {
				    pad: function (data, blockSize) {
				        // Shortcut
				        var blockSizeBytes = blockSize * 4;

				        // Pad
				        data.clamp();
				        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
				    },

				    unpad: function (data) {
				        // Shortcut
				        var dataWords = data.words;

				        // Unpad
				        var i = data.sigBytes - 1;
				        for (var i = data.sigBytes - 1; i >= 0; i--) {
				            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
				                data.sigBytes = i + 1;
				                break;
				            }
				        }
				    }
				};


				return CryptoJS.pad.ZeroPadding;

			}));
	} (padZeropadding));
		return padZeropaddingExports;
	}

	var padNopaddingExports = {};
	var padNopadding = {
	  get exports(){ return padNopaddingExports; },
	  set exports(v){ padNopaddingExports = v; },
	};

	var hasRequiredPadNopadding;

	function requirePadNopadding () {
		if (hasRequiredPadNopadding) return padNopaddingExports;
		hasRequiredPadNopadding = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				/**
				 * A noop padding strategy.
				 */
				CryptoJS.pad.NoPadding = {
				    pad: function () {
				    },

				    unpad: function () {
				    }
				};


				return CryptoJS.pad.NoPadding;

			}));
	} (padNopadding));
		return padNopaddingExports;
	}

	var formatHexExports = {};
	var formatHex = {
	  get exports(){ return formatHexExports; },
	  set exports(v){ formatHexExports = v; },
	};

	var hasRequiredFormatHex;

	function requireFormatHex () {
		if (hasRequiredFormatHex) return formatHexExports;
		hasRequiredFormatHex = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function (undefined$1) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var CipherParams = C_lib.CipherParams;
				    var C_enc = C.enc;
				    var Hex = C_enc.Hex;
				    var C_format = C.format;

				    C_format.Hex = {
				        /**
				         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
				         *
				         * @param {CipherParams} cipherParams The cipher params object.
				         *
				         * @return {string} The hexadecimally encoded string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
				         */
				        stringify: function (cipherParams) {
				            return cipherParams.ciphertext.toString(Hex);
				        },

				        /**
				         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
				         *
				         * @param {string} input The hexadecimally encoded string.
				         *
				         * @return {CipherParams} The cipher params object.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
				         */
				        parse: function (input) {
				            var ciphertext = Hex.parse(input);
				            return CipherParams.create({ ciphertext: ciphertext });
				        }
				    };
				}());


				return CryptoJS.format.Hex;

			}));
	} (formatHex));
		return formatHexExports;
	}

	var aesExports = {};
	var aes = {
	  get exports(){ return aesExports; },
	  set exports(v){ aesExports = v; },
	};

	var hasRequiredAes;

	function requireAes () {
		if (hasRequiredAes) return aesExports;
		hasRequiredAes = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var BlockCipher = C_lib.BlockCipher;
				    var C_algo = C.algo;

				    // Lookup tables
				    var SBOX = [];
				    var INV_SBOX = [];
				    var SUB_MIX_0 = [];
				    var SUB_MIX_1 = [];
				    var SUB_MIX_2 = [];
				    var SUB_MIX_3 = [];
				    var INV_SUB_MIX_0 = [];
				    var INV_SUB_MIX_1 = [];
				    var INV_SUB_MIX_2 = [];
				    var INV_SUB_MIX_3 = [];

				    // Compute lookup tables
				    (function () {
				        // Compute double table
				        var d = [];
				        for (var i = 0; i < 256; i++) {
				            if (i < 128) {
				                d[i] = i << 1;
				            } else {
				                d[i] = (i << 1) ^ 0x11b;
				            }
				        }

				        // Walk GF(2^8)
				        var x = 0;
				        var xi = 0;
				        for (var i = 0; i < 256; i++) {
				            // Compute sbox
				            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
				            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
				            SBOX[x] = sx;
				            INV_SBOX[sx] = x;

				            // Compute multiplication
				            var x2 = d[x];
				            var x4 = d[x2];
				            var x8 = d[x4];

				            // Compute sub bytes, mix columns tables
				            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
				            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
				            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
				            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
				            SUB_MIX_3[x] = t;

				            // Compute inv sub bytes, inv mix columns tables
				            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
				            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
				            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
				            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
				            INV_SUB_MIX_3[sx] = t;

				            // Compute next counter
				            if (!x) {
				                x = xi = 1;
				            } else {
				                x = x2 ^ d[d[d[x8 ^ x2]]];
				                xi ^= d[d[xi]];
				            }
				        }
				    }());

				    // Precomputed Rcon lookup
				    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

				    /**
				     * AES block cipher algorithm.
				     */
				    var AES = C_algo.AES = BlockCipher.extend({
				        _doReset: function () {
				            var t;

				            // Skip reset of nRounds has been set before and key did not change
				            if (this._nRounds && this._keyPriorReset === this._key) {
				                return;
				            }

				            // Shortcuts
				            var key = this._keyPriorReset = this._key;
				            var keyWords = key.words;
				            var keySize = key.sigBytes / 4;

				            // Compute number of rounds
				            var nRounds = this._nRounds = keySize + 6;

				            // Compute number of key schedule rows
				            var ksRows = (nRounds + 1) * 4;

				            // Compute key schedule
				            var keySchedule = this._keySchedule = [];
				            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
				                if (ksRow < keySize) {
				                    keySchedule[ksRow] = keyWords[ksRow];
				                } else {
				                    t = keySchedule[ksRow - 1];

				                    if (!(ksRow % keySize)) {
				                        // Rot word
				                        t = (t << 8) | (t >>> 24);

				                        // Sub word
				                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

				                        // Mix Rcon
				                        t ^= RCON[(ksRow / keySize) | 0] << 24;
				                    } else if (keySize > 6 && ksRow % keySize == 4) {
				                        // Sub word
				                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
				                    }

				                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
				                }
				            }

				            // Compute inv key schedule
				            var invKeySchedule = this._invKeySchedule = [];
				            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
				                var ksRow = ksRows - invKsRow;

				                if (invKsRow % 4) {
				                    var t = keySchedule[ksRow];
				                } else {
				                    var t = keySchedule[ksRow - 4];
				                }

				                if (invKsRow < 4 || ksRow <= 4) {
				                    invKeySchedule[invKsRow] = t;
				                } else {
				                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
				                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
				                }
				            }
				        },

				        encryptBlock: function (M, offset) {
				            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
				        },

				        decryptBlock: function (M, offset) {
				            // Swap 2nd and 4th rows
				            var t = M[offset + 1];
				            M[offset + 1] = M[offset + 3];
				            M[offset + 3] = t;

				            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

				            // Inv swap 2nd and 4th rows
				            var t = M[offset + 1];
				            M[offset + 1] = M[offset + 3];
				            M[offset + 3] = t;
				        },

				        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
				            // Shortcut
				            var nRounds = this._nRounds;

				            // Get input, add round key
				            var s0 = M[offset]     ^ keySchedule[0];
				            var s1 = M[offset + 1] ^ keySchedule[1];
				            var s2 = M[offset + 2] ^ keySchedule[2];
				            var s3 = M[offset + 3] ^ keySchedule[3];

				            // Key schedule row counter
				            var ksRow = 4;

				            // Rounds
				            for (var round = 1; round < nRounds; round++) {
				                // Shift rows, sub bytes, mix columns, add round key
				                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
				                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
				                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
				                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

				                // Update state
				                s0 = t0;
				                s1 = t1;
				                s2 = t2;
				                s3 = t3;
				            }

				            // Shift rows, sub bytes, add round key
				            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
				            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
				            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
				            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

				            // Set output
				            M[offset]     = t0;
				            M[offset + 1] = t1;
				            M[offset + 2] = t2;
				            M[offset + 3] = t3;
				        },

				        keySize: 256/32
				    });

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
				     */
				    C.AES = BlockCipher._createHelper(AES);
				}());


				return CryptoJS.AES;

			}));
	} (aes));
		return aesExports;
	}

	var tripledesExports = {};
	var tripledes = {
	  get exports(){ return tripledesExports; },
	  set exports(v){ tripledesExports = v; },
	};

	var hasRequiredTripledes;

	function requireTripledes () {
		if (hasRequiredTripledes) return tripledesExports;
		hasRequiredTripledes = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var BlockCipher = C_lib.BlockCipher;
				    var C_algo = C.algo;

				    // Permuted Choice 1 constants
				    var PC1 = [
				        57, 49, 41, 33, 25, 17, 9,  1,
				        58, 50, 42, 34, 26, 18, 10, 2,
				        59, 51, 43, 35, 27, 19, 11, 3,
				        60, 52, 44, 36, 63, 55, 47, 39,
				        31, 23, 15, 7,  62, 54, 46, 38,
				        30, 22, 14, 6,  61, 53, 45, 37,
				        29, 21, 13, 5,  28, 20, 12, 4
				    ];

				    // Permuted Choice 2 constants
				    var PC2 = [
				        14, 17, 11, 24, 1,  5,
				        3,  28, 15, 6,  21, 10,
				        23, 19, 12, 4,  26, 8,
				        16, 7,  27, 20, 13, 2,
				        41, 52, 31, 37, 47, 55,
				        30, 40, 51, 45, 33, 48,
				        44, 49, 39, 56, 34, 53,
				        46, 42, 50, 36, 29, 32
				    ];

				    // Cumulative bit shift constants
				    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

				    // SBOXes and round permutation constants
				    var SBOX_P = [
				        {
				            0x0: 0x808200,
				            0x10000000: 0x8000,
				            0x20000000: 0x808002,
				            0x30000000: 0x2,
				            0x40000000: 0x200,
				            0x50000000: 0x808202,
				            0x60000000: 0x800202,
				            0x70000000: 0x800000,
				            0x80000000: 0x202,
				            0x90000000: 0x800200,
				            0xa0000000: 0x8200,
				            0xb0000000: 0x808000,
				            0xc0000000: 0x8002,
				            0xd0000000: 0x800002,
				            0xe0000000: 0x0,
				            0xf0000000: 0x8202,
				            0x8000000: 0x0,
				            0x18000000: 0x808202,
				            0x28000000: 0x8202,
				            0x38000000: 0x8000,
				            0x48000000: 0x808200,
				            0x58000000: 0x200,
				            0x68000000: 0x808002,
				            0x78000000: 0x2,
				            0x88000000: 0x800200,
				            0x98000000: 0x8200,
				            0xa8000000: 0x808000,
				            0xb8000000: 0x800202,
				            0xc8000000: 0x800002,
				            0xd8000000: 0x8002,
				            0xe8000000: 0x202,
				            0xf8000000: 0x800000,
				            0x1: 0x8000,
				            0x10000001: 0x2,
				            0x20000001: 0x808200,
				            0x30000001: 0x800000,
				            0x40000001: 0x808002,
				            0x50000001: 0x8200,
				            0x60000001: 0x200,
				            0x70000001: 0x800202,
				            0x80000001: 0x808202,
				            0x90000001: 0x808000,
				            0xa0000001: 0x800002,
				            0xb0000001: 0x8202,
				            0xc0000001: 0x202,
				            0xd0000001: 0x800200,
				            0xe0000001: 0x8002,
				            0xf0000001: 0x0,
				            0x8000001: 0x808202,
				            0x18000001: 0x808000,
				            0x28000001: 0x800000,
				            0x38000001: 0x200,
				            0x48000001: 0x8000,
				            0x58000001: 0x800002,
				            0x68000001: 0x2,
				            0x78000001: 0x8202,
				            0x88000001: 0x8002,
				            0x98000001: 0x800202,
				            0xa8000001: 0x202,
				            0xb8000001: 0x808200,
				            0xc8000001: 0x800200,
				            0xd8000001: 0x0,
				            0xe8000001: 0x8200,
				            0xf8000001: 0x808002
				        },
				        {
				            0x0: 0x40084010,
				            0x1000000: 0x4000,
				            0x2000000: 0x80000,
				            0x3000000: 0x40080010,
				            0x4000000: 0x40000010,
				            0x5000000: 0x40084000,
				            0x6000000: 0x40004000,
				            0x7000000: 0x10,
				            0x8000000: 0x84000,
				            0x9000000: 0x40004010,
				            0xa000000: 0x40000000,
				            0xb000000: 0x84010,
				            0xc000000: 0x80010,
				            0xd000000: 0x0,
				            0xe000000: 0x4010,
				            0xf000000: 0x40080000,
				            0x800000: 0x40004000,
				            0x1800000: 0x84010,
				            0x2800000: 0x10,
				            0x3800000: 0x40004010,
				            0x4800000: 0x40084010,
				            0x5800000: 0x40000000,
				            0x6800000: 0x80000,
				            0x7800000: 0x40080010,
				            0x8800000: 0x80010,
				            0x9800000: 0x0,
				            0xa800000: 0x4000,
				            0xb800000: 0x40080000,
				            0xc800000: 0x40000010,
				            0xd800000: 0x84000,
				            0xe800000: 0x40084000,
				            0xf800000: 0x4010,
				            0x10000000: 0x0,
				            0x11000000: 0x40080010,
				            0x12000000: 0x40004010,
				            0x13000000: 0x40084000,
				            0x14000000: 0x40080000,
				            0x15000000: 0x10,
				            0x16000000: 0x84010,
				            0x17000000: 0x4000,
				            0x18000000: 0x4010,
				            0x19000000: 0x80000,
				            0x1a000000: 0x80010,
				            0x1b000000: 0x40000010,
				            0x1c000000: 0x84000,
				            0x1d000000: 0x40004000,
				            0x1e000000: 0x40000000,
				            0x1f000000: 0x40084010,
				            0x10800000: 0x84010,
				            0x11800000: 0x80000,
				            0x12800000: 0x40080000,
				            0x13800000: 0x4000,
				            0x14800000: 0x40004000,
				            0x15800000: 0x40084010,
				            0x16800000: 0x10,
				            0x17800000: 0x40000000,
				            0x18800000: 0x40084000,
				            0x19800000: 0x40000010,
				            0x1a800000: 0x40004010,
				            0x1b800000: 0x80010,
				            0x1c800000: 0x0,
				            0x1d800000: 0x4010,
				            0x1e800000: 0x40080010,
				            0x1f800000: 0x84000
				        },
				        {
				            0x0: 0x104,
				            0x100000: 0x0,
				            0x200000: 0x4000100,
				            0x300000: 0x10104,
				            0x400000: 0x10004,
				            0x500000: 0x4000004,
				            0x600000: 0x4010104,
				            0x700000: 0x4010000,
				            0x800000: 0x4000000,
				            0x900000: 0x4010100,
				            0xa00000: 0x10100,
				            0xb00000: 0x4010004,
				            0xc00000: 0x4000104,
				            0xd00000: 0x10000,
				            0xe00000: 0x4,
				            0xf00000: 0x100,
				            0x80000: 0x4010100,
				            0x180000: 0x4010004,
				            0x280000: 0x0,
				            0x380000: 0x4000100,
				            0x480000: 0x4000004,
				            0x580000: 0x10000,
				            0x680000: 0x10004,
				            0x780000: 0x104,
				            0x880000: 0x4,
				            0x980000: 0x100,
				            0xa80000: 0x4010000,
				            0xb80000: 0x10104,
				            0xc80000: 0x10100,
				            0xd80000: 0x4000104,
				            0xe80000: 0x4010104,
				            0xf80000: 0x4000000,
				            0x1000000: 0x4010100,
				            0x1100000: 0x10004,
				            0x1200000: 0x10000,
				            0x1300000: 0x4000100,
				            0x1400000: 0x100,
				            0x1500000: 0x4010104,
				            0x1600000: 0x4000004,
				            0x1700000: 0x0,
				            0x1800000: 0x4000104,
				            0x1900000: 0x4000000,
				            0x1a00000: 0x4,
				            0x1b00000: 0x10100,
				            0x1c00000: 0x4010000,
				            0x1d00000: 0x104,
				            0x1e00000: 0x10104,
				            0x1f00000: 0x4010004,
				            0x1080000: 0x4000000,
				            0x1180000: 0x104,
				            0x1280000: 0x4010100,
				            0x1380000: 0x0,
				            0x1480000: 0x10004,
				            0x1580000: 0x4000100,
				            0x1680000: 0x100,
				            0x1780000: 0x4010004,
				            0x1880000: 0x10000,
				            0x1980000: 0x4010104,
				            0x1a80000: 0x10104,
				            0x1b80000: 0x4000004,
				            0x1c80000: 0x4000104,
				            0x1d80000: 0x4010000,
				            0x1e80000: 0x4,
				            0x1f80000: 0x10100
				        },
				        {
				            0x0: 0x80401000,
				            0x10000: 0x80001040,
				            0x20000: 0x401040,
				            0x30000: 0x80400000,
				            0x40000: 0x0,
				            0x50000: 0x401000,
				            0x60000: 0x80000040,
				            0x70000: 0x400040,
				            0x80000: 0x80000000,
				            0x90000: 0x400000,
				            0xa0000: 0x40,
				            0xb0000: 0x80001000,
				            0xc0000: 0x80400040,
				            0xd0000: 0x1040,
				            0xe0000: 0x1000,
				            0xf0000: 0x80401040,
				            0x8000: 0x80001040,
				            0x18000: 0x40,
				            0x28000: 0x80400040,
				            0x38000: 0x80001000,
				            0x48000: 0x401000,
				            0x58000: 0x80401040,
				            0x68000: 0x0,
				            0x78000: 0x80400000,
				            0x88000: 0x1000,
				            0x98000: 0x80401000,
				            0xa8000: 0x400000,
				            0xb8000: 0x1040,
				            0xc8000: 0x80000000,
				            0xd8000: 0x400040,
				            0xe8000: 0x401040,
				            0xf8000: 0x80000040,
				            0x100000: 0x400040,
				            0x110000: 0x401000,
				            0x120000: 0x80000040,
				            0x130000: 0x0,
				            0x140000: 0x1040,
				            0x150000: 0x80400040,
				            0x160000: 0x80401000,
				            0x170000: 0x80001040,
				            0x180000: 0x80401040,
				            0x190000: 0x80000000,
				            0x1a0000: 0x80400000,
				            0x1b0000: 0x401040,
				            0x1c0000: 0x80001000,
				            0x1d0000: 0x400000,
				            0x1e0000: 0x40,
				            0x1f0000: 0x1000,
				            0x108000: 0x80400000,
				            0x118000: 0x80401040,
				            0x128000: 0x0,
				            0x138000: 0x401000,
				            0x148000: 0x400040,
				            0x158000: 0x80000000,
				            0x168000: 0x80001040,
				            0x178000: 0x40,
				            0x188000: 0x80000040,
				            0x198000: 0x1000,
				            0x1a8000: 0x80001000,
				            0x1b8000: 0x80400040,
				            0x1c8000: 0x1040,
				            0x1d8000: 0x80401000,
				            0x1e8000: 0x400000,
				            0x1f8000: 0x401040
				        },
				        {
				            0x0: 0x80,
				            0x1000: 0x1040000,
				            0x2000: 0x40000,
				            0x3000: 0x20000000,
				            0x4000: 0x20040080,
				            0x5000: 0x1000080,
				            0x6000: 0x21000080,
				            0x7000: 0x40080,
				            0x8000: 0x1000000,
				            0x9000: 0x20040000,
				            0xa000: 0x20000080,
				            0xb000: 0x21040080,
				            0xc000: 0x21040000,
				            0xd000: 0x0,
				            0xe000: 0x1040080,
				            0xf000: 0x21000000,
				            0x800: 0x1040080,
				            0x1800: 0x21000080,
				            0x2800: 0x80,
				            0x3800: 0x1040000,
				            0x4800: 0x40000,
				            0x5800: 0x20040080,
				            0x6800: 0x21040000,
				            0x7800: 0x20000000,
				            0x8800: 0x20040000,
				            0x9800: 0x0,
				            0xa800: 0x21040080,
				            0xb800: 0x1000080,
				            0xc800: 0x20000080,
				            0xd800: 0x21000000,
				            0xe800: 0x1000000,
				            0xf800: 0x40080,
				            0x10000: 0x40000,
				            0x11000: 0x80,
				            0x12000: 0x20000000,
				            0x13000: 0x21000080,
				            0x14000: 0x1000080,
				            0x15000: 0x21040000,
				            0x16000: 0x20040080,
				            0x17000: 0x1000000,
				            0x18000: 0x21040080,
				            0x19000: 0x21000000,
				            0x1a000: 0x1040000,
				            0x1b000: 0x20040000,
				            0x1c000: 0x40080,
				            0x1d000: 0x20000080,
				            0x1e000: 0x0,
				            0x1f000: 0x1040080,
				            0x10800: 0x21000080,
				            0x11800: 0x1000000,
				            0x12800: 0x1040000,
				            0x13800: 0x20040080,
				            0x14800: 0x20000000,
				            0x15800: 0x1040080,
				            0x16800: 0x80,
				            0x17800: 0x21040000,
				            0x18800: 0x40080,
				            0x19800: 0x21040080,
				            0x1a800: 0x0,
				            0x1b800: 0x21000000,
				            0x1c800: 0x1000080,
				            0x1d800: 0x40000,
				            0x1e800: 0x20040000,
				            0x1f800: 0x20000080
				        },
				        {
				            0x0: 0x10000008,
				            0x100: 0x2000,
				            0x200: 0x10200000,
				            0x300: 0x10202008,
				            0x400: 0x10002000,
				            0x500: 0x200000,
				            0x600: 0x200008,
				            0x700: 0x10000000,
				            0x800: 0x0,
				            0x900: 0x10002008,
				            0xa00: 0x202000,
				            0xb00: 0x8,
				            0xc00: 0x10200008,
				            0xd00: 0x202008,
				            0xe00: 0x2008,
				            0xf00: 0x10202000,
				            0x80: 0x10200000,
				            0x180: 0x10202008,
				            0x280: 0x8,
				            0x380: 0x200000,
				            0x480: 0x202008,
				            0x580: 0x10000008,
				            0x680: 0x10002000,
				            0x780: 0x2008,
				            0x880: 0x200008,
				            0x980: 0x2000,
				            0xa80: 0x10002008,
				            0xb80: 0x10200008,
				            0xc80: 0x0,
				            0xd80: 0x10202000,
				            0xe80: 0x202000,
				            0xf80: 0x10000000,
				            0x1000: 0x10002000,
				            0x1100: 0x10200008,
				            0x1200: 0x10202008,
				            0x1300: 0x2008,
				            0x1400: 0x200000,
				            0x1500: 0x10000000,
				            0x1600: 0x10000008,
				            0x1700: 0x202000,
				            0x1800: 0x202008,
				            0x1900: 0x0,
				            0x1a00: 0x8,
				            0x1b00: 0x10200000,
				            0x1c00: 0x2000,
				            0x1d00: 0x10002008,
				            0x1e00: 0x10202000,
				            0x1f00: 0x200008,
				            0x1080: 0x8,
				            0x1180: 0x202000,
				            0x1280: 0x200000,
				            0x1380: 0x10000008,
				            0x1480: 0x10002000,
				            0x1580: 0x2008,
				            0x1680: 0x10202008,
				            0x1780: 0x10200000,
				            0x1880: 0x10202000,
				            0x1980: 0x10200008,
				            0x1a80: 0x2000,
				            0x1b80: 0x202008,
				            0x1c80: 0x200008,
				            0x1d80: 0x0,
				            0x1e80: 0x10000000,
				            0x1f80: 0x10002008
				        },
				        {
				            0x0: 0x100000,
				            0x10: 0x2000401,
				            0x20: 0x400,
				            0x30: 0x100401,
				            0x40: 0x2100401,
				            0x50: 0x0,
				            0x60: 0x1,
				            0x70: 0x2100001,
				            0x80: 0x2000400,
				            0x90: 0x100001,
				            0xa0: 0x2000001,
				            0xb0: 0x2100400,
				            0xc0: 0x2100000,
				            0xd0: 0x401,
				            0xe0: 0x100400,
				            0xf0: 0x2000000,
				            0x8: 0x2100001,
				            0x18: 0x0,
				            0x28: 0x2000401,
				            0x38: 0x2100400,
				            0x48: 0x100000,
				            0x58: 0x2000001,
				            0x68: 0x2000000,
				            0x78: 0x401,
				            0x88: 0x100401,
				            0x98: 0x2000400,
				            0xa8: 0x2100000,
				            0xb8: 0x100001,
				            0xc8: 0x400,
				            0xd8: 0x2100401,
				            0xe8: 0x1,
				            0xf8: 0x100400,
				            0x100: 0x2000000,
				            0x110: 0x100000,
				            0x120: 0x2000401,
				            0x130: 0x2100001,
				            0x140: 0x100001,
				            0x150: 0x2000400,
				            0x160: 0x2100400,
				            0x170: 0x100401,
				            0x180: 0x401,
				            0x190: 0x2100401,
				            0x1a0: 0x100400,
				            0x1b0: 0x1,
				            0x1c0: 0x0,
				            0x1d0: 0x2100000,
				            0x1e0: 0x2000001,
				            0x1f0: 0x400,
				            0x108: 0x100400,
				            0x118: 0x2000401,
				            0x128: 0x2100001,
				            0x138: 0x1,
				            0x148: 0x2000000,
				            0x158: 0x100000,
				            0x168: 0x401,
				            0x178: 0x2100400,
				            0x188: 0x2000001,
				            0x198: 0x2100000,
				            0x1a8: 0x0,
				            0x1b8: 0x2100401,
				            0x1c8: 0x100401,
				            0x1d8: 0x400,
				            0x1e8: 0x2000400,
				            0x1f8: 0x100001
				        },
				        {
				            0x0: 0x8000820,
				            0x1: 0x20000,
				            0x2: 0x8000000,
				            0x3: 0x20,
				            0x4: 0x20020,
				            0x5: 0x8020820,
				            0x6: 0x8020800,
				            0x7: 0x800,
				            0x8: 0x8020000,
				            0x9: 0x8000800,
				            0xa: 0x20800,
				            0xb: 0x8020020,
				            0xc: 0x820,
				            0xd: 0x0,
				            0xe: 0x8000020,
				            0xf: 0x20820,
				            0x80000000: 0x800,
				            0x80000001: 0x8020820,
				            0x80000002: 0x8000820,
				            0x80000003: 0x8000000,
				            0x80000004: 0x8020000,
				            0x80000005: 0x20800,
				            0x80000006: 0x20820,
				            0x80000007: 0x20,
				            0x80000008: 0x8000020,
				            0x80000009: 0x820,
				            0x8000000a: 0x20020,
				            0x8000000b: 0x8020800,
				            0x8000000c: 0x0,
				            0x8000000d: 0x8020020,
				            0x8000000e: 0x8000800,
				            0x8000000f: 0x20000,
				            0x10: 0x20820,
				            0x11: 0x8020800,
				            0x12: 0x20,
				            0x13: 0x800,
				            0x14: 0x8000800,
				            0x15: 0x8000020,
				            0x16: 0x8020020,
				            0x17: 0x20000,
				            0x18: 0x0,
				            0x19: 0x20020,
				            0x1a: 0x8020000,
				            0x1b: 0x8000820,
				            0x1c: 0x8020820,
				            0x1d: 0x20800,
				            0x1e: 0x820,
				            0x1f: 0x8000000,
				            0x80000010: 0x20000,
				            0x80000011: 0x800,
				            0x80000012: 0x8020020,
				            0x80000013: 0x20820,
				            0x80000014: 0x20,
				            0x80000015: 0x8020000,
				            0x80000016: 0x8000000,
				            0x80000017: 0x8000820,
				            0x80000018: 0x8020820,
				            0x80000019: 0x8000020,
				            0x8000001a: 0x8000800,
				            0x8000001b: 0x0,
				            0x8000001c: 0x20800,
				            0x8000001d: 0x820,
				            0x8000001e: 0x20020,
				            0x8000001f: 0x8020800
				        }
				    ];

				    // Masks that select the SBOX input
				    var SBOX_MASK = [
				        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
				        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
				    ];

				    /**
				     * DES block cipher algorithm.
				     */
				    var DES = C_algo.DES = BlockCipher.extend({
				        _doReset: function () {
				            // Shortcuts
				            var key = this._key;
				            var keyWords = key.words;

				            // Select 56 bits according to PC1
				            var keyBits = [];
				            for (var i = 0; i < 56; i++) {
				                var keyBitPos = PC1[i] - 1;
				                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
				            }

				            // Assemble 16 subkeys
				            var subKeys = this._subKeys = [];
				            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
				                // Create subkey
				                var subKey = subKeys[nSubKey] = [];

				                // Shortcut
				                var bitShift = BIT_SHIFTS[nSubKey];

				                // Select 48 bits according to PC2
				                for (var i = 0; i < 24; i++) {
				                    // Select from the left 28 key bits
				                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

				                    // Select from the right 28 key bits
				                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
				                }

				                // Since each subkey is applied to an expanded 32-bit input,
				                // the subkey can be broken into 8 values scaled to 32-bits,
				                // which allows the key to be used without expansion
				                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
				                for (var i = 1; i < 7; i++) {
				                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
				                }
				                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
				            }

				            // Compute inverse subkeys
				            var invSubKeys = this._invSubKeys = [];
				            for (var i = 0; i < 16; i++) {
				                invSubKeys[i] = subKeys[15 - i];
				            }
				        },

				        encryptBlock: function (M, offset) {
				            this._doCryptBlock(M, offset, this._subKeys);
				        },

				        decryptBlock: function (M, offset) {
				            this._doCryptBlock(M, offset, this._invSubKeys);
				        },

				        _doCryptBlock: function (M, offset, subKeys) {
				            // Get input
				            this._lBlock = M[offset];
				            this._rBlock = M[offset + 1];

				            // Initial permutation
				            exchangeLR.call(this, 4,  0x0f0f0f0f);
				            exchangeLR.call(this, 16, 0x0000ffff);
				            exchangeRL.call(this, 2,  0x33333333);
				            exchangeRL.call(this, 8,  0x00ff00ff);
				            exchangeLR.call(this, 1,  0x55555555);

				            // Rounds
				            for (var round = 0; round < 16; round++) {
				                // Shortcuts
				                var subKey = subKeys[round];
				                var lBlock = this._lBlock;
				                var rBlock = this._rBlock;

				                // Feistel function
				                var f = 0;
				                for (var i = 0; i < 8; i++) {
				                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
				                }
				                this._lBlock = rBlock;
				                this._rBlock = lBlock ^ f;
				            }

				            // Undo swap from last round
				            var t = this._lBlock;
				            this._lBlock = this._rBlock;
				            this._rBlock = t;

				            // Final permutation
				            exchangeLR.call(this, 1,  0x55555555);
				            exchangeRL.call(this, 8,  0x00ff00ff);
				            exchangeRL.call(this, 2,  0x33333333);
				            exchangeLR.call(this, 16, 0x0000ffff);
				            exchangeLR.call(this, 4,  0x0f0f0f0f);

				            // Set output
				            M[offset] = this._lBlock;
				            M[offset + 1] = this._rBlock;
				        },

				        keySize: 64/32,

				        ivSize: 64/32,

				        blockSize: 64/32
				    });

				    // Swap bits across the left and right words
				    function exchangeLR(offset, mask) {
				        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
				        this._rBlock ^= t;
				        this._lBlock ^= t << offset;
				    }

				    function exchangeRL(offset, mask) {
				        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
				        this._lBlock ^= t;
				        this._rBlock ^= t << offset;
				    }

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
				     */
				    C.DES = BlockCipher._createHelper(DES);

				    /**
				     * Triple-DES block cipher algorithm.
				     */
				    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
				        _doReset: function () {
				            // Shortcuts
				            var key = this._key;
				            var keyWords = key.words;
				            // Make sure the key length is valid (64, 128 or >= 192 bit)
				            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
				                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
				            }

				            // Extend the key according to the keying options defined in 3DES standard
				            var key1 = keyWords.slice(0, 2);
				            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
				            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

				            // Create DES instances
				            this._des1 = DES.createEncryptor(WordArray.create(key1));
				            this._des2 = DES.createEncryptor(WordArray.create(key2));
				            this._des3 = DES.createEncryptor(WordArray.create(key3));
				        },

				        encryptBlock: function (M, offset) {
				            this._des1.encryptBlock(M, offset);
				            this._des2.decryptBlock(M, offset);
				            this._des3.encryptBlock(M, offset);
				        },

				        decryptBlock: function (M, offset) {
				            this._des3.decryptBlock(M, offset);
				            this._des2.encryptBlock(M, offset);
				            this._des1.decryptBlock(M, offset);
				        },

				        keySize: 192/32,

				        ivSize: 64/32,

				        blockSize: 64/32
				    });

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
				     */
				    C.TripleDES = BlockCipher._createHelper(TripleDES);
				}());


				return CryptoJS.TripleDES;

			}));
	} (tripledes));
		return tripledesExports;
	}

	var rc4Exports = {};
	var rc4 = {
	  get exports(){ return rc4Exports; },
	  set exports(v){ rc4Exports = v; },
	};

	var hasRequiredRc4;

	function requireRc4 () {
		if (hasRequiredRc4) return rc4Exports;
		hasRequiredRc4 = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var StreamCipher = C_lib.StreamCipher;
				    var C_algo = C.algo;

				    /**
				     * RC4 stream cipher algorithm.
				     */
				    var RC4 = C_algo.RC4 = StreamCipher.extend({
				        _doReset: function () {
				            // Shortcuts
				            var key = this._key;
				            var keyWords = key.words;
				            var keySigBytes = key.sigBytes;

				            // Init sbox
				            var S = this._S = [];
				            for (var i = 0; i < 256; i++) {
				                S[i] = i;
				            }

				            // Key setup
				            for (var i = 0, j = 0; i < 256; i++) {
				                var keyByteIndex = i % keySigBytes;
				                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

				                j = (j + S[i] + keyByte) % 256;

				                // Swap
				                var t = S[i];
				                S[i] = S[j];
				                S[j] = t;
				            }

				            // Counters
				            this._i = this._j = 0;
				        },

				        _doProcessBlock: function (M, offset) {
				            M[offset] ^= generateKeystreamWord.call(this);
				        },

				        keySize: 256/32,

				        ivSize: 0
				    });

				    function generateKeystreamWord() {
				        // Shortcuts
				        var S = this._S;
				        var i = this._i;
				        var j = this._j;

				        // Generate keystream word
				        var keystreamWord = 0;
				        for (var n = 0; n < 4; n++) {
				            i = (i + 1) % 256;
				            j = (j + S[i]) % 256;

				            // Swap
				            var t = S[i];
				            S[i] = S[j];
				            S[j] = t;

				            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
				        }

				        // Update counters
				        this._i = i;
				        this._j = j;

				        return keystreamWord;
				    }

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
				     */
				    C.RC4 = StreamCipher._createHelper(RC4);

				    /**
				     * Modified RC4 stream cipher algorithm.
				     */
				    var RC4Drop = C_algo.RC4Drop = RC4.extend({
				        /**
				         * Configuration options.
				         *
				         * @property {number} drop The number of keystream words to drop. Default 192
				         */
				        cfg: RC4.cfg.extend({
				            drop: 192
				        }),

				        _doReset: function () {
				            RC4._doReset.call(this);

				            // Drop
				            for (var i = this.cfg.drop; i > 0; i--) {
				                generateKeystreamWord.call(this);
				            }
				        }
				    });

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
				     */
				    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
				}());


				return CryptoJS.RC4;

			}));
	} (rc4));
		return rc4Exports;
	}

	var rabbitExports = {};
	var rabbit = {
	  get exports(){ return rabbitExports; },
	  set exports(v){ rabbitExports = v; },
	};

	var hasRequiredRabbit;

	function requireRabbit () {
		if (hasRequiredRabbit) return rabbitExports;
		hasRequiredRabbit = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var StreamCipher = C_lib.StreamCipher;
				    var C_algo = C.algo;

				    // Reusable objects
				    var S  = [];
				    var C_ = [];
				    var G  = [];

				    /**
				     * Rabbit stream cipher algorithm
				     */
				    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
				        _doReset: function () {
				            // Shortcuts
				            var K = this._key.words;
				            var iv = this.cfg.iv;

				            // Swap endian
				            for (var i = 0; i < 4; i++) {
				                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
				                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
				            }

				            // Generate initial state values
				            var X = this._X = [
				                K[0], (K[3] << 16) | (K[2] >>> 16),
				                K[1], (K[0] << 16) | (K[3] >>> 16),
				                K[2], (K[1] << 16) | (K[0] >>> 16),
				                K[3], (K[2] << 16) | (K[1] >>> 16)
				            ];

				            // Generate initial counter values
				            var C = this._C = [
				                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
				                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
				                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
				                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
				            ];

				            // Carry bit
				            this._b = 0;

				            // Iterate the system four times
				            for (var i = 0; i < 4; i++) {
				                nextState.call(this);
				            }

				            // Modify the counters
				            for (var i = 0; i < 8; i++) {
				                C[i] ^= X[(i + 4) & 7];
				            }

				            // IV setup
				            if (iv) {
				                // Shortcuts
				                var IV = iv.words;
				                var IV_0 = IV[0];
				                var IV_1 = IV[1];

				                // Generate four subvectors
				                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
				                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
				                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
				                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

				                // Modify counter values
				                C[0] ^= i0;
				                C[1] ^= i1;
				                C[2] ^= i2;
				                C[3] ^= i3;
				                C[4] ^= i0;
				                C[5] ^= i1;
				                C[6] ^= i2;
				                C[7] ^= i3;

				                // Iterate the system four times
				                for (var i = 0; i < 4; i++) {
				                    nextState.call(this);
				                }
				            }
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcut
				            var X = this._X;

				            // Iterate the system
				            nextState.call(this);

				            // Generate four keystream words
				            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
				            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
				            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
				            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

				            for (var i = 0; i < 4; i++) {
				                // Swap endian
				                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
				                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

				                // Encrypt
				                M[offset + i] ^= S[i];
				            }
				        },

				        blockSize: 128/32,

				        ivSize: 64/32
				    });

				    function nextState() {
				        // Shortcuts
				        var X = this._X;
				        var C = this._C;

				        // Save old counter values
				        for (var i = 0; i < 8; i++) {
				            C_[i] = C[i];
				        }

				        // Calculate new counter values
				        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
				        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
				        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
				        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
				        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
				        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
				        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
				        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
				        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

				        // Calculate the g-values
				        for (var i = 0; i < 8; i++) {
				            var gx = X[i] + C[i];

				            // Construct high and low argument for squaring
				            var ga = gx & 0xffff;
				            var gb = gx >>> 16;

				            // Calculate high and low result of squaring
				            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
				            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

				            // High XOR low
				            G[i] = gh ^ gl;
				        }

				        // Calculate new state values
				        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
				        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
				        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
				        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
				        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
				        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
				        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
				        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
				    }

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
				     */
				    C.Rabbit = StreamCipher._createHelper(Rabbit);
				}());


				return CryptoJS.Rabbit;

			}));
	} (rabbit));
		return rabbitExports;
	}

	var rabbitLegacyExports = {};
	var rabbitLegacy = {
	  get exports(){ return rabbitLegacyExports; },
	  set exports(v){ rabbitLegacyExports = v; },
	};

	var hasRequiredRabbitLegacy;

	function requireRabbitLegacy () {
		if (hasRequiredRabbitLegacy) return rabbitLegacyExports;
		hasRequiredRabbitLegacy = 1;
		(function (module, exports) {
	(function (root, factory, undef) {
				{
					// CommonJS
					module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var StreamCipher = C_lib.StreamCipher;
				    var C_algo = C.algo;

				    // Reusable objects
				    var S  = [];
				    var C_ = [];
				    var G  = [];

				    /**
				     * Rabbit stream cipher algorithm.
				     *
				     * This is a legacy version that neglected to convert the key to little-endian.
				     * This error doesn't affect the cipher's security,
				     * but it does affect its compatibility with other implementations.
				     */
				    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
				        _doReset: function () {
				            // Shortcuts
				            var K = this._key.words;
				            var iv = this.cfg.iv;

				            // Generate initial state values
				            var X = this._X = [
				                K[0], (K[3] << 16) | (K[2] >>> 16),
				                K[1], (K[0] << 16) | (K[3] >>> 16),
				                K[2], (K[1] << 16) | (K[0] >>> 16),
				                K[3], (K[2] << 16) | (K[1] >>> 16)
				            ];

				            // Generate initial counter values
				            var C = this._C = [
				                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
				                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
				                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
				                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
				            ];

				            // Carry bit
				            this._b = 0;

				            // Iterate the system four times
				            for (var i = 0; i < 4; i++) {
				                nextState.call(this);
				            }

				            // Modify the counters
				            for (var i = 0; i < 8; i++) {
				                C[i] ^= X[(i + 4) & 7];
				            }

				            // IV setup
				            if (iv) {
				                // Shortcuts
				                var IV = iv.words;
				                var IV_0 = IV[0];
				                var IV_1 = IV[1];

				                // Generate four subvectors
				                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
				                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
				                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
				                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

				                // Modify counter values
				                C[0] ^= i0;
				                C[1] ^= i1;
				                C[2] ^= i2;
				                C[3] ^= i3;
				                C[4] ^= i0;
				                C[5] ^= i1;
				                C[6] ^= i2;
				                C[7] ^= i3;

				                // Iterate the system four times
				                for (var i = 0; i < 4; i++) {
				                    nextState.call(this);
				                }
				            }
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcut
				            var X = this._X;

				            // Iterate the system
				            nextState.call(this);

				            // Generate four keystream words
				            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
				            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
				            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
				            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

				            for (var i = 0; i < 4; i++) {
				                // Swap endian
				                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
				                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

				                // Encrypt
				                M[offset + i] ^= S[i];
				            }
				        },

				        blockSize: 128/32,

				        ivSize: 64/32
				    });

				    function nextState() {
				        // Shortcuts
				        var X = this._X;
				        var C = this._C;

				        // Save old counter values
				        for (var i = 0; i < 8; i++) {
				            C_[i] = C[i];
				        }

				        // Calculate new counter values
				        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
				        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
				        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
				        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
				        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
				        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
				        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
				        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
				        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

				        // Calculate the g-values
				        for (var i = 0; i < 8; i++) {
				            var gx = X[i] + C[i];

				            // Construct high and low argument for squaring
				            var ga = gx & 0xffff;
				            var gb = gx >>> 16;

				            // Calculate high and low result of squaring
				            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
				            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

				            // High XOR low
				            G[i] = gh ^ gl;
				        }

				        // Calculate new state values
				        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
				        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
				        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
				        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
				        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
				        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
				        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
				        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
				    }

				    /**
				     * Shortcut functions to the cipher's object interface.
				     *
				     * @example
				     *
				     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
				     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
				     */
				    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
				}());


				return CryptoJS.RabbitLegacy;

			}));
	} (rabbitLegacy));
		return rabbitLegacyExports;
	}

	(function (module, exports) {
	(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy());
			}
		}(commonjsGlobal, function (CryptoJS) {

			return CryptoJS;

		}));
	} (cryptoJs));

	class EnryptionServices{

	    static key = "FeV1uXb2P5UCVcK6";
	    static iv = "hT54WAA2b1Np47k3";

	    /**
	     * Encrypts data using AES algorithm
	     * @param data a string to encrypt
	     */
	    EncryptData(data){

	        // convert key and iv to byte array
	        var keyBytes = cryptoJsExports.enc.Utf8.parse(EnryptionServices.key);
	        var ivBytes = cryptoJsExports.enc.Utf8.parse(EnryptionServices.iv);

	        // encrypt data using key and iv (CryptoJS default config is cihperMode.CBC and padding.PKCS7)
	        var encryptedData = cryptoJsExports.AES.encrypt(data, keyBytes, {iv: ivBytes});

	        var result = encryptedData.ciphertext.toString();
	        return result;
	    }

	    /**
	     * Generates a string representing current timestamp multiplied by 142 and converted to base 27
	     * This function is used to add antiforgery attribute for http requests
	     */
	    GenerateAntiforgery(){
	        const timestamp = Date.now() * 142;
	        const to27 = timestamp.toString(27);
	        return to27;
	    }
	}

	class Backbone
	{
	    IsCorrectionAllowed() { return this.IsLogged() && this.IsAuthorised() }
	    IsLogged() { return this.isLogged }
	    IsAuthorised() { return this.isAuthorized }
	    IsAutomaticCorrectionActivated() { return this.isAutomaticCorrectionActivated }
	    IsCorrectionToBeLogged() {return false}
	    GetAutomaticCorrectionTimeMs() { return this.automaticCorrectionTimeMs}
	    

	    constructor(gatewayUrl, correctionData) {
	        this.isLogged = false;
	        this.isAuthorized = false;
	        this.isFirstRequestLoginWindow = false;
	        this.isCorrectionToBeLogged = false;
	        this.gatewayUrl = gatewayUrl;
	        this.currentTabActive = true;
	        this.cordialCorrApi = undefined;
	        this.apikey = correctionData.apikey;
	        this.isAutomaticCorrectionActivated = false;
	        this.automaticCorrectionTimeMs = 0;
	        this.encryptionServices = new EnryptionServices();
	    }
	    
	    SetCorrectionToBeLogged(isCorrectionToBeLogged){
	        this.isCorrectionToBeLogged = isCorrectionToBeLogged;
	    }



	    async sendCorrectionRequest(text, innerCorrectionStep){
	        const antiforgery = this.encryptionServices.GenerateAntiforgery();
	        const body = JSON.stringify({details: text, antiforgery: antiforgery, innerCorrectionStep});
	        const encryptedBody = JSON.stringify({details: this.encryptionServices.EncryptData(body), apikey: this.apikey});


	        const response = await fetch(
	            this.cordialCorrApi + `V2/correctionAF`, 
	            {
	                method: 'POST',
	                mode: 'cors',
	                cache: 'no-cache',
	                headers: {
	                'Content-Type': 'application/json',
	                },
	                body: encryptedBody
	            });
	          return response.json()
	    }

	    async IsUserConnected() {
	       this.isLogged = true; // always logged in for public web integration
	       this.isAuthorized = true;
	       const response = await fetch(
	            this.gatewayUrl + 'v1/keyAuth/correction/mode/' + this.apikey,
	            {
	                method: 'GET',
	                mode: 'cors',
	                cache: 'no-cache'
	            }
	        );
	        const data = await response.json();
	        this._IsAutomaticCorrectionActivated(data);
	    }

	    _IsAutomaticCorrectionActivated(data){
	        this.cordialCorrApi = data.cordialCorrApi;
	        if(correctionData.correctionAuto == true || correctionData.correctionAuto == false){ // if correctionData.correctionAuto
	            this.isAutomaticCorrectionActivated = correctionData.correctionAuto;
	            this.automaticCorrectionTimeMs = 600;
	        }
	        else {
	            this.isAutomaticCorrectionActivated = Boolean(data.automaticCorrectionActivated);
	            this.automaticCorrectionTimeMs = data.automaticCorrectionTimeMs;
	        }
	    }
	}

	var global$m = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	var shimExports = {};
	var shim = {
	  get exports(){ return shimExports; },
	  set exports(v){ shimExports = v; },
	};

	var _globalExports = {};
	var _global = {
	  get exports(){ return _globalExports; },
	  set exports(v){ _globalExports = v; },
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$l = _global.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global$l; // eslint-disable-line no-undef

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _coreExports = {};
	var _core = {
	  get exports(){ return _coreExports; },
	  set exports(v){ _coreExports = v; },
	};

	var core$6 = _core.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core$6; // eslint-disable-line no-undef

	var _objectDp = {};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$q = _isObject;
	var _anObject = function (it) {
	  if (!isObject$q(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _domCreate;
	var hasRequired_domCreate;

	function require_domCreate () {
		if (hasRequired_domCreate) return _domCreate;
		hasRequired_domCreate = 1;
		var isObject = _isObject;
		var document = _globalExports.document;
		// typeof document.createElement is 'object' in old IE
		var is = isObject(document) && isObject(document.createElement);
		_domCreate = function (it) {
		  return is ? document.createElement(it) : {};
		};
		return _domCreate;
	}

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(require_domCreate()('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject$p = _isObject;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject$p(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject$p(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject$p(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject$p(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var anObject$A = _anObject;
	var IE8_DOM_DEFINE$1 = _ie8DomDefine;
	var toPrimitive$8 = _toPrimitive;
	var dP$9 = Object.defineProperty;

	_objectDp.f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$A(O);
	  P = toPrimitive$8(P, true);
	  anObject$A(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return dP$9(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide;
	var hasRequired_hide;

	function require_hide () {
		if (hasRequired_hide) return _hide;
		hasRequired_hide = 1;
		var dP = _objectDp;
		var createDesc = _propertyDesc;
		_hide = _descriptors ? function (object, key, value) {
		  return dP.f(object, key, createDesc(1, value));
		} : function (object, key, value) {
		  object[key] = value;
		  return object;
		};
		return _hide;
	}

	var _redefineExports = {};
	var _redefine = {
	  get exports(){ return _redefineExports; },
	  set exports(v){ _redefineExports = v; },
	};

	var id$2 = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px).toString(36));
	};

	var _sharedExports = {};
	var _shared = {
	  get exports(){ return _sharedExports; },
	  set exports(v){ _sharedExports = v; },
	};

	var _library;
	var hasRequired_library;

	function require_library () {
		if (hasRequired_library) return _library;
		hasRequired_library = 1;
		_library = false;
		return _library;
	}

	var core$5 = _coreExports;
	var global$k = _globalExports;
	var SHARED = '__core-js_shared__';
	var store$3 = global$k[SHARED] || (global$k[SHARED] = {});

	(_shared.exports = function (key, value) {
	  return store$3[key] || (store$3[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core$5.version,
	  mode: require_library() ? 'pure' : 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});

	var _functionToString = _sharedExports('native-function-to-string', Function.toString);

	var global$j = _globalExports;
	var hide$7 = require_hide();
	var has$a = _has;
	var SRC = _uid('src');
	var $toString$2 = _functionToString;
	var TO_STRING$2 = 'toString';
	var TPL = ('' + $toString$2).split(TO_STRING$2);

	_coreExports.inspectSource = function (it) {
	  return $toString$2.call(it);
	};

	(_redefine.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has$a(val, 'name') || hide$7(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has$a(val, SRC) || hide$7(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global$j) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    hide$7(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    hide$7(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING$2, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString$2.call(this);
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding
	var aFunction$d = _aFunction;
	var _ctx = function (fn, that, length) {
	  aFunction$d(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var global$i = _globalExports;
	var core$4 = _coreExports;
	var hide$6 = require_hide();
	var redefine$6 = _redefineExports;
	var ctx$9 = _ctx;
	var PROTOTYPE$3 = 'prototype';

	var $export$23 = function (type, name, source) {
	  var IS_FORCED = type & $export$23.F;
	  var IS_GLOBAL = type & $export$23.G;
	  var IS_STATIC = type & $export$23.S;
	  var IS_PROTO = type & $export$23.P;
	  var IS_BIND = type & $export$23.B;
	  var target = IS_GLOBAL ? global$i : IS_STATIC ? global$i[name] || (global$i[name] = {}) : (global$i[name] || {})[PROTOTYPE$3];
	  var exports = IS_GLOBAL ? core$4 : core$4[name] || (core$4[name] = {});
	  var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx$9(out, global$i) : IS_PROTO && typeof out == 'function' ? ctx$9(Function.call, out) : out;
	    // extend global
	    if (target) redefine$6(target, key, out, type & $export$23.U);
	    // export
	    if (exports[key] != out) hide$6(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global$i.core = core$4;
	// type bitmap
	$export$23.F = 1;   // forced
	$export$23.G = 2;   // global
	$export$23.S = 4;   // static
	$export$23.P = 8;   // proto
	$export$23.B = 16;  // bind
	$export$23.W = 32;  // wrap
	$export$23.U = 64;  // safe
	$export$23.R = 128; // real proto method for `library`
	var _export = $export$23;

	var _metaExports = {};
	var _meta = {
	  get exports(){ return _metaExports; },
	  set exports(v){ _metaExports = v; },
	};

	var META$1 = _uid('meta');
	var isObject$o = _isObject;
	var has$9 = _has;
	var setDesc = _objectDp.f;
	var id$1 = 0;
	var isExtensible$1 = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible$1(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META$1, { value: {
	    i: 'O' + ++id$1, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey$1 = function (it, create) {
	  // return primitive with prefix
	  if (!isObject$o(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has$9(it, META$1)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META$1].i;
	};
	var getWeak$2 = function (it, create) {
	  if (!has$9(it, META$1)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META$1].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta$5.NEED && isExtensible$1(it) && !has$9(it, META$1)) setMeta(it);
	  return it;
	};
	var meta$5 = _meta.exports = {
	  KEY: META$1,
	  NEED: false,
	  fastKey: fastKey$1,
	  getWeak: getWeak$2,
	  onFreeze: onFreeze
	};

	var _wksExports = {};
	var _wks = {
	  get exports(){ return _wksExports; },
	  set exports(v){ _wksExports = v; },
	};

	var store$2 = _sharedExports('wks');
	var uid$4 = _uid;
	var Symbol$1 = _globalExports.Symbol;
	var USE_SYMBOL = typeof Symbol$1 == 'function';

	var $exports = _wks.exports = function (name) {
	  return store$2[name] || (store$2[name] =
	    USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$4)('Symbol.' + name));
	};

	$exports.store = store$2;

	var def = _objectDp.f;
	var has$8 = _has;
	var TAG$2 = _wksExports('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has$8(it = stat ? it : it.prototype, TAG$2)) def(it, TAG$2, { configurable: true, value: tag });
	};

	var _wksExt = {};

	_wksExt.f = _wksExports;

	var global$h = _globalExports;
	var core$3 = _coreExports;
	var LIBRARY$3 = require_library();
	var wksExt$1 = _wksExt;
	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = core$3.Symbol || (core$3.Symbol = LIBRARY$3 ? {} : global$h.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt$1.f(name) });
	};

	var toString$1 = {}.toString;

	var _cof = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var _iobject;
	var hasRequired_iobject;

	function require_iobject () {
		if (hasRequired_iobject) return _iobject;
		hasRequired_iobject = 1;
		// fallback for non-array-like ES3 and non-enumerable old V8 strings
		var cof = _cof;
		// eslint-disable-next-line no-prototype-builtins
		_iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
		  return cof(it) == 'String' ? it.split('') : Object(it);
		};
		return _iobject;
	}

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject$2 = require_iobject();
	var defined$9 = _defined;
	var _toIobject = function (it) {
	  return IObject$2(defined$9(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor$3 = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$3 : ceil)(it);
	};

	// 7.1.15 ToLength
	var toInteger$9 = _toInteger;
	var min$2 = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min$2(toInteger$9(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var toInteger$8 = _toInteger;
	var max$1 = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger$8(index);
	  return index < 0 ? max$1(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject$b = _toIobject;
	var toLength$k = _toLength;
	var toAbsoluteIndex$4 = _toAbsoluteIndex;
	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject$b($this);
	    var length = toLength$k(O.length);
	    var index = toAbsoluteIndex$4(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared$2 = _sharedExports('keys');
	var uid$3 = _uid;
	var _sharedKey = function (key) {
	  return shared$2[key] || (shared$2[key] = uid$3(key));
	};

	var has$7 = _has;
	var toIObject$a = _toIobject;
	var arrayIndexOf$1 = _arrayIncludes(false);
	var IE_PROTO$2 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject$a(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$2) has$7(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$7(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys$3 = _objectKeysInternal;
	var enumBugKeys$1 = _enumBugKeys;

	var _objectKeys = Object.keys || function keys(O) {
	  return $keys$3(O, enumBugKeys$1);
	};

	var _objectGops = {};

	_objectGops.f = Object.getOwnPropertySymbols;

	var _objectPie = {};

	var hasRequired_objectPie;

	function require_objectPie () {
		if (hasRequired_objectPie) return _objectPie;
		hasRequired_objectPie = 1;
		_objectPie.f = {}.propertyIsEnumerable;
		return _objectPie;
	}

	// all enumerable object keys, includes symbols
	var getKeys$2 = _objectKeys;
	var gOPS$1 = _objectGops;
	var pIE$1 = require_objectPie();
	var _enumKeys = function (it) {
	  var result = getKeys$2(it);
	  var getSymbols = gOPS$1.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE$1.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)
	var cof$6 = _cof;
	var _isArray = Array.isArray || function isArray(arg) {
	  return cof$6(arg) == 'Array';
	};

	// 7.1.13 ToObject(argument)
	var defined$8 = _defined;
	var _toObject = function (it) {
	  return Object(defined$8(it));
	};

	var _objectDps;
	var hasRequired_objectDps;

	function require_objectDps () {
		if (hasRequired_objectDps) return _objectDps;
		hasRequired_objectDps = 1;
		var dP = _objectDp;
		var anObject = _anObject;
		var getKeys = _objectKeys;

		_objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
		  anObject(O);
		  var keys = getKeys(Properties);
		  var length = keys.length;
		  var i = 0;
		  var P;
		  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
		  return O;
		};
		return _objectDps;
	}

	var document$1 = _globalExports.document;
	var _html = document$1 && document$1.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject$z = _anObject;
	var dPs = require_objectDps();
	var enumBugKeys = _enumBugKeys;
	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$2 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = require_domCreate()('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$2][enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$2] = anObject$z(O);
	    result = new Empty();
	    Empty[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectGopnExt = {};

	var _objectGopn = {};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys$2 = _objectKeysInternal;
	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	_objectGopn.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys$2(O, hiddenKeys);
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject$9 = _toIobject;
	var gOPN$5 = _objectGopn.f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$5(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	_objectGopnExt.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$5(toIObject$9(it));
	};

	var _objectGopd = {};

	var pIE = require_objectPie();
	var createDesc$3 = _propertyDesc;
	var toIObject$8 = _toIobject;
	var toPrimitive$7 = _toPrimitive;
	var has$6 = _has;
	var IE8_DOM_DEFINE = _ie8DomDefine;
	var gOPD$8 = Object.getOwnPropertyDescriptor;

	_objectGopd.f = _descriptors ? gOPD$8 : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject$8(O);
	  P = toPrimitive$7(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD$8(O, P);
	  } catch (e) { /* empty */ }
	  if (has$6(O, P)) return createDesc$3(!pIE.f.call(O, P), O[P]);
	};

	// ECMAScript 6 symbols shim
	var global$g = _globalExports;
	var has$5 = _has;
	var DESCRIPTORS$4 = _descriptors;
	var $export$22 = _export;
	var redefine$5 = _redefineExports;
	var META = _metaExports.KEY;
	var $fails$2 = _fails;
	var shared$1 = _sharedExports;
	var setToStringTag$3 = _setToStringTag;
	var uid$2 = _uid;
	var wks$3 = _wksExports;
	var wksExt = _wksExt;
	var wksDefine = _wksDefine;
	var enumKeys = _enumKeys;
	var isArray$2 = _isArray;
	var anObject$y = _anObject;
	var isObject$n = _isObject;
	var toObject$g = _toObject;
	var toIObject$7 = _toIobject;
	var toPrimitive$6 = _toPrimitive;
	var createDesc$2 = _propertyDesc;
	var _create = _objectCreate;
	var gOPNExt = _objectGopnExt;
	var $GOPD$1 = _objectGopd;
	var $GOPS = _objectGops;
	var $DP$1 = _objectDp;
	var $keys$1 = _objectKeys;
	var gOPD$7 = $GOPD$1.f;
	var dP$8 = $DP$1.f;
	var gOPN$4 = gOPNExt.f;
	var $Symbol = global$g.Symbol;
	var $JSON = global$g.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$1 = 'prototype';
	var HIDDEN = wks$3('_hidden');
	var TO_PRIMITIVE$1 = wks$3('toPrimitive');
	var isEnum$1 = {}.propertyIsEnumerable;
	var SymbolRegistry = shared$1('symbol-registry');
	var AllSymbols = shared$1('symbols');
	var OPSymbols = shared$1('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$1];
	var USE_NATIVE$1 = typeof $Symbol == 'function' && !!$GOPS.f;
	var QObject = global$g.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS$4 && $fails$2(function () {
	  return _create(dP$8({}, 'a', {
	    get: function () { return dP$8(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$7(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$8(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$8(ObjectProto$1, key, protoDesc);
	} : dP$8;

	var wrap$1 = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$1]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty$3 = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty$3(OPSymbols, key, D);
	  anObject$y(it);
	  key = toPrimitive$6(key, true);
	  anObject$y(D);
	  if (has$5(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has$5(it, HIDDEN)) dP$8(it, HIDDEN, createDesc$2(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has$5(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc$2(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$8(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject$y(it);
	  var keys = enumKeys(P = toIObject$7(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty$3(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum$1.call(this, key = toPrimitive$6(key, true));
	  if (this === ObjectProto$1 && has$5(AllSymbols, key) && !has$5(OPSymbols, key)) return false;
	  return E || !has$5(this, key) || !has$5(AllSymbols, key) || has$5(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject$7(it);
	  key = toPrimitive$6(key, true);
	  if (it === ObjectProto$1 && has$5(AllSymbols, key) && !has$5(OPSymbols, key)) return;
	  var D = gOPD$7(it, key);
	  if (D && has$5(AllSymbols, key) && !(has$5(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$4(toIObject$7(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has$5(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$4(IS_OP ? OPSymbols : toIObject$7(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has$5(AllSymbols, key = names[i++]) && (IS_OP ? has$5(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid$2(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (has$5(this, HIDDEN) && has$5(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc$2(1, value));
	    };
	    if (DESCRIPTORS$4 && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap$1(tag);
	  };
	  redefine$5($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD$1.f = $getOwnPropertyDescriptor$1;
	  $DP$1.f = $defineProperty$3;
	  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
	  require_objectPie().f = $propertyIsEnumerable;
	  $GOPS.f = $getOwnPropertySymbols;

	  if (DESCRIPTORS$4 && !require_library()) {
	    redefine$5(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap$1(wks$3(name));
	  };
	}

	$export$22($export$22.G + $export$22.W + $export$22.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j$1 = 0; es6Symbols.length > j$1;)wks$3(es6Symbols[j$1++]);

	for (var wellKnownSymbols = $keys$1(wks$3.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export$22($export$22.S + $export$22.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has$5(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export$22($export$22.S + $export$22.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$3,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = $fails$2(function () { $GOPS.f(1); });

	$export$22($export$22.S + $export$22.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return $GOPS.f(toObject$g(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$22($export$22.S + $export$22.F * (!USE_NATIVE$1 || $fails$2(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject$n(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray$2(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$1][TO_PRIMITIVE$1] || require_hide()($Symbol[PROTOTYPE$1], TO_PRIMITIVE$1, $Symbol[PROTOTYPE$1].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag$3($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag$3(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag$3(global$g.JSON, 'JSON', true);

	var $export$21 = _export;
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$21($export$21.S, 'Object', { create: _objectCreate });

	var $export$20 = _export;
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$20($export$20.S + $export$20.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $export$1$ = _export;
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export$1$($export$1$.S + $export$1$.F * !_descriptors, 'Object', { defineProperties: require_objectDps() });

	// most Object methods by ES6 should accept primitives
	var $export$1_ = _export;
	var core$2 = _coreExports;
	var fails$b = _fails;
	var _objectSap = function (KEY, exec) {
	  var fn = (core$2.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1_($export$1_.S + $export$1_.F * fails$b(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject$6 = _toIobject;
	var $getOwnPropertyDescriptor = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject$6(it), key);
	  };
	});

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has$4 = _has;
	var toObject$f = _toObject;
	var IE_PROTO = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject$f(O);
	  if (has$4(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject$e = _toObject;
	var $getPrototypeOf = _objectGpo;

	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject$e(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)
	var toObject$d = _toObject;
	var $keys = _objectKeys;

	_objectSap('keys', function () {
	  return function keys(it) {
	    return $keys(toObject$d(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)
	var isObject$m = _isObject;
	var meta$4 = _metaExports.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject$m(it) ? $freeze(meta$4(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)
	var isObject$l = _isObject;
	var meta$3 = _metaExports.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject$l(it) ? $seal(meta$3(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject$k = _isObject;
	var meta$2 = _metaExports.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject$k(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)
	var isObject$j = _isObject;

	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject$j(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)
	var isObject$i = _isObject;

	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject$i(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)
	var isObject$h = _isObject;

	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject$h(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	var _objectAssign;
	var hasRequired_objectAssign;

	function require_objectAssign () {
		if (hasRequired_objectAssign) return _objectAssign;
		hasRequired_objectAssign = 1;
		// 19.1.2.1 Object.assign(target, source, ...)
		var DESCRIPTORS = _descriptors;
		var getKeys = _objectKeys;
		var gOPS = _objectGops;
		var pIE = require_objectPie();
		var toObject = _toObject;
		var IObject = require_iobject();
		var $assign = Object.assign;

		// should work with symbols and should have deterministic property order (V8 bug)
		_objectAssign = !$assign || _fails(function () {
		  var A = {};
		  var B = {};
		  // eslint-disable-next-line no-undef
		  var S = Symbol();
		  var K = 'abcdefghijklmnopqrst';
		  A[S] = 7;
		  K.split('').forEach(function (k) { B[k] = k; });
		  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
		}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
		  var T = toObject(target);
		  var aLen = arguments.length;
		  var index = 1;
		  var getSymbols = gOPS.f;
		  var isEnum = pIE.f;
		  while (aLen > index) {
		    var S = IObject(arguments[index++]);
		    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
		    var length = keys.length;
		    var j = 0;
		    var key;
		    while (length > j) {
		      key = keys[j++];
		      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
		    }
		  } return T;
		} : $assign;
		return _objectAssign;
	}

	// 19.1.3.1 Object.assign(target, source)
	var $export$1Z = _export;

	$export$1Z($export$1Z.S + $export$1Z.F, 'Object', { assign: require_objectAssign() });

	var _sameValue;
	var hasRequired_sameValue;

	function require_sameValue () {
		if (hasRequired_sameValue) return _sameValue;
		hasRequired_sameValue = 1;
		// 7.2.9 SameValue(x, y)
		_sameValue = Object.is || function is(x, y) {
		  // eslint-disable-next-line no-self-compare
		  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
		};
		return _sameValue;
	}

	// 19.1.3.10 Object.is(value1, value2)
	var $export$1Y = _export;
	$export$1Y($export$1Y.S, 'Object', { is: require_sameValue() });

	var _setProto;
	var hasRequired_setProto;

	function require_setProto () {
		if (hasRequired_setProto) return _setProto;
		hasRequired_setProto = 1;
		// Works with __proto__ only. Old v8 can't work with null proto objects.
		/* eslint-disable no-proto */
		var isObject = _isObject;
		var anObject = _anObject;
		var check = function (O, proto) {
		  anObject(O);
		  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
		};
		_setProto = {
		  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
		    function (test, buggy, set) {
		      try {
		        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
		        set(test, []);
		        buggy = !(test instanceof Array);
		      } catch (e) { buggy = true; }
		      return function setPrototypeOf(O, proto) {
		        check(O, proto);
		        if (buggy) O.__proto__ = proto;
		        else set(O, proto);
		        return O;
		      };
		    }({}, false) : undefined),
		  check: check
		};
		return _setProto;
	}

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export$1X = _export;
	$export$1X($export$1X.S, 'Object', { setPrototypeOf: require_setProto().set });

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof$5 = _cof;
	var TAG$1 = _wksExports('toStringTag');
	// ES3 wrong here
	var ARG = cof$5(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof$5(O)
	    // ES3 arguments fallback
	    : (B = cof$5(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()
	var classof$4 = _classof;
	var test$1 = {};
	test$1[_wksExports('toStringTag')] = 'z';
	if (test$1 + '' != '[object z]') {
	  _redefineExports(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof$4(this) + ']';
	  }, true);
	}

	var _invoke;
	var hasRequired_invoke;

	function require_invoke () {
		if (hasRequired_invoke) return _invoke;
		hasRequired_invoke = 1;
		// fast apply, http://jsperf.lnkit.com/fast-apply/5
		_invoke = function (fn, args, that) {
		  var un = that === undefined;
		  switch (args.length) {
		    case 0: return un ? fn()
		                      : fn.call(that);
		    case 1: return un ? fn(args[0])
		                      : fn.call(that, args[0]);
		    case 2: return un ? fn(args[0], args[1])
		                      : fn.call(that, args[0], args[1]);
		    case 3: return un ? fn(args[0], args[1], args[2])
		                      : fn.call(that, args[0], args[1], args[2]);
		    case 4: return un ? fn(args[0], args[1], args[2], args[3])
		                      : fn.call(that, args[0], args[1], args[2], args[3]);
		  } return fn.apply(that, args);
		};
		return _invoke;
	}

	var _bind;
	var hasRequired_bind;

	function require_bind () {
		if (hasRequired_bind) return _bind;
		hasRequired_bind = 1;
		var aFunction = _aFunction;
		var isObject = _isObject;
		var invoke = require_invoke();
		var arraySlice = [].slice;
		var factories = {};

		var construct = function (F, len, args) {
		  if (!(len in factories)) {
		    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
		    // eslint-disable-next-line no-new-func
		    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
		  } return factories[len](F, args);
		};

		_bind = Function.bind || function bind(that /* , ...args */) {
		  var fn = aFunction(this);
		  var partArgs = arraySlice.call(arguments, 1);
		  var bound = function (/* args... */) {
		    var args = partArgs.concat(arraySlice.call(arguments));
		    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
		  };
		  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
		  return bound;
		};
		return _bind;
	}

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export$1W = _export;

	$export$1W($export$1W.P, 'Function', { bind: require_bind() });

	var dP$7 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors && dP$7(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var isObject$g = _isObject;
	var getPrototypeOf$9 = _objectGpo;
	var HAS_INSTANCE = _wksExports('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !isObject$g(O)) return false;
	  if (!isObject$g(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = getPrototypeOf$9(O)) if (this.prototype === O) return true;
	  return false;
	} });

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var $export$1V = _export;
	var defined$7 = _defined;
	var fails$a = _fails;
	var spaces = _stringWs;
	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails$a(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export$1V($export$1V.P + $export$1V.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined$7(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt$2 = _globalExports.parseInt;
	var $trim$2 = _stringTrim.trim;
	var ws = _stringWs;
	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt$2(ws + '08') !== 8 || $parseInt$2(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim$2(String(str), 3);
	  return $parseInt$2(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt$2;

	var $export$1U = _export;
	var $parseInt$1 = _parseInt;
	// 18.2.5 parseInt(string, radix)
	$export$1U($export$1U.G + $export$1U.F * (parseInt != $parseInt$1), { parseInt: $parseInt$1 });

	var $parseFloat$2 = _globalExports.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat$2(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat$2(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat$2;

	var $export$1T = _export;
	var $parseFloat$1 = _parseFloat;
	// 18.2.4 parseFloat(string)
	$export$1T($export$1T.G + $export$1T.F * (parseFloat != $parseFloat$1), { parseFloat: $parseFloat$1 });

	var isObject$f = _isObject;
	var setPrototypeOf = require_setProto().set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject$f(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var global$f = _globalExports;
	var has$3 = _has;
	var cof$4 = _cof;
	var inheritIfRequired$2 = _inheritIfRequired;
	var toPrimitive$5 = _toPrimitive;
	var fails$9 = _fails;
	var gOPN$3 = _objectGopn.f;
	var gOPD$6 = _objectGopd.f;
	var dP$6 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = global$f[NUMBER];
	var Base$1 = $Number;
	var proto$4 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = cof$4(_objectCreate(proto$4)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = toPrimitive$5(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails$9(function () { proto$4.valueOf.call(that); }) : cof$4(that) != NUMBER)
	        ? inheritIfRequired$2(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys$1 = _descriptors ? gOPN$3(Base$1) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key$1; keys$1.length > j; j++) {
	    if (has$3(Base$1, key$1 = keys$1[j]) && !has$3($Number, key$1)) {
	      dP$6($Number, key$1, gOPD$6(Base$1, key$1));
	    }
	  }
	  $Number.prototype = proto$4;
	  proto$4.constructor = $Number;
	  _redefineExports(global$f, NUMBER, $Number);
	}

	var cof$3 = _cof;
	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && cof$3(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var toInteger$7 = _toInteger;
	var defined$6 = _defined;

	var _stringRepeat = function repeat(count) {
	  var str = String(defined$6(this));
	  var res = '';
	  var n = toInteger$7(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $export$1S = _export;
	var toInteger$6 = _toInteger;
	var aNumberValue$1 = _aNumberValue;
	var repeat$1 = _stringRepeat;
	var $toFixed = 1.0.toFixed;
	var floor$2 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$2(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$2(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat$1.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	$export$1S($export$1S.P + $export$1S.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue$1(this, ERROR);
	    var f = toInteger$6(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat$1.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat$1.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

	var $export$1R = _export;
	var $fails$1 = _fails;
	var aNumberValue = _aNumberValue;
	var $toPrecision = 1.0.toPrecision;

	$export$1R($export$1R.P + $export$1R.F * ($fails$1(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails$1(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON
	var $export$1Q = _export;

	$export$1Q($export$1Q.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.2 Number.isFinite(number)
	var $export$1P = _export;
	var _isFinite = _globalExports.isFinite;

	$export$1P($export$1P.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)
	var isObject$e = _isObject;
	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !isObject$e(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)
	var $export$1O = _export;

	$export$1O($export$1O.S, 'Number', { isInteger: _isInteger });

	// 20.1.2.4 Number.isNaN(number)
	var $export$1N = _export;

	$export$1N($export$1N.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export$1M = _export;
	var isInteger = _isInteger;
	var abs$1 = Math.abs;

	$export$1M($export$1M.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs$1(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export$1L = _export;

	$export$1L($export$1L.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export$1K = _export;

	$export$1K($export$1K.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

	var $export$1J = _export;
	var $parseFloat = _parseFloat;
	// 20.1.2.12 Number.parseFloat(string)
	$export$1J($export$1J.S + $export$1J.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

	var $export$1I = _export;
	var $parseInt = _parseInt;
	// 20.1.2.13 Number.parseInt(string, radix)
	$export$1I($export$1I.S + $export$1I.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)
	var $export$1H = _export;
	var log1p = _mathLog1p;
	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	$export$1H($export$1H.S + $export$1H.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)
	var $export$1G = _export;
	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	$export$1G($export$1G.S + $export$1G.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)
	var $export$1F = _export;
	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	$export$1F($export$1F.S + $export$1F.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)
	var $export$1E = _export;
	var sign = _mathSign;

	$export$1E($export$1E.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)
	var $export$1D = _export;

	$export$1D($export$1D.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)
	var $export$1C = _export;
	var exp$3 = Math.exp;

	$export$1C($export$1C.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp$3(x = +x) + exp$3(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1$1 = Math.expm1;
	var _mathExpm1 = (!$expm1$1
	  // Old FF bug
	  || $expm1$1(10) > 22025.465794806719 || $expm1$1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1$1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1$1;

	// 20.2.2.14 Math.expm1(x)
	var $export$1B = _export;
	var $expm1 = _mathExpm1;

	$export$1B($export$1B.S + $export$1B.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

	var _mathFround;
	var hasRequired_mathFround;

	function require_mathFround () {
		if (hasRequired_mathFround) return _mathFround;
		hasRequired_mathFround = 1;
		// 20.2.2.16 Math.fround(x)
		var sign = _mathSign;
		var pow = Math.pow;
		var EPSILON = pow(2, -52);
		var EPSILON32 = pow(2, -23);
		var MAX32 = pow(2, 127) * (2 - EPSILON32);
		var MIN32 = pow(2, -126);

		var roundTiesToEven = function (n) {
		  return n + 1 / EPSILON - 1 / EPSILON;
		};

		_mathFround = Math.fround || function fround(x) {
		  var $abs = Math.abs(x);
		  var $sign = sign(x);
		  var a, result;
		  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
		  a = (1 + EPSILON32 / EPSILON) * $abs;
		  result = a - (a - $abs);
		  // eslint-disable-next-line no-self-compare
		  if (result > MAX32 || result != result) return $sign * Infinity;
		  return $sign * result;
		};
		return _mathFround;
	}

	// 20.2.2.16 Math.fround(x)
	var $export$1A = _export;

	$export$1A($export$1A.S, 'Math', { fround: require_mathFround() });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export$1z = _export;
	var abs = Math.abs;

	$export$1z($export$1z.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)
	var $export$1y = _export;
	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export$1y($export$1y.S + $export$1y.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)
	var $export$1x = _export;

	$export$1x($export$1x.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)
	var $export$1w = _export;

	$export$1w($export$1w.S, 'Math', { log1p: _mathLog1p });

	// 20.2.2.22 Math.log2(x)
	var $export$1v = _export;

	$export$1v($export$1v.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var $export$1u = _export;

	$export$1u($export$1u.S, 'Math', { sign: _mathSign });

	// 20.2.2.30 Math.sinh(x)
	var $export$1t = _export;
	var expm1$1 = _mathExpm1;
	var exp$2 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export$1t($export$1t.S + $export$1t.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (expm1$1(x) - expm1$1(-x)) / 2
	      : (exp$2(x - 1) - exp$2(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)
	var $export$1s = _export;
	var expm1 = _mathExpm1;
	var exp$1 = Math.exp;

	$export$1s($export$1s.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x);
	    var b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$1(x) + exp$1(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)
	var $export$1r = _export;

	$export$1r($export$1r.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var $export$1q = _export;
	var toAbsoluteIndex$3 = _toAbsoluteIndex;
	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export$1q($export$1q.S + $export$1q.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toAbsoluteIndex$3(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	var $export$1p = _export;
	var toIObject$5 = _toIobject;
	var toLength$j = _toLength;

	$export$1p($export$1p.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject$5(callSite.raw);
	    var len = toLength$j(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	var toInteger$5 = _toInteger;
	var defined$5 = _defined;
	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined$5(that));
	    var i = toInteger$5(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var create$3 = _objectCreate;
	var descriptor = _propertyDesc;
	var setToStringTag$2 = _setToStringTag;
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	require_hide()(IteratorPrototype, _wksExports('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = create$3(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag$2(Constructor, NAME + ' Iterator');
	};

	var LIBRARY$2 = require_library();
	var $export$1o = _export;
	var redefine$4 = _redefineExports;
	var hide$5 = require_hide();
	var Iterators$5 = _iterators;
	var $iterCreate = _iterCreate;
	var setToStringTag$1 = _setToStringTag;
	var getPrototypeOf$8 = _objectGpo;
	var ITERATOR$4 = _wksExports('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$4] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf$8($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag$1(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY$2 && typeof IteratorPrototype[ITERATOR$4] != 'function') hide$5(IteratorPrototype, ITERATOR$4, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY$2 || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$4])) {
	    hide$5(proto, ITERATOR$4, $default);
	  }
	  // Plug for library
	  Iterators$5[NAME] = $default;
	  Iterators$5[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine$4(proto, key, methods[key]);
	    } else $export$1o($export$1o.P + $export$1o.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at$2 = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at$2(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var $export$1n = _export;
	var $at$1 = _stringAt(false);
	$export$1n($export$1n.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)
	var isObject$d = _isObject;
	var cof$2 = _cof;
	var MATCH = _wksExports('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return isObject$d(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof$2(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp$3 = _isRegexp;
	var defined$4 = _defined;

	var _stringContext = function (that, searchString, NAME) {
	  if (isRegExp$3(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined$4(that));
	};

	var _failsIsRegexp;
	var hasRequired_failsIsRegexp;

	function require_failsIsRegexp () {
		if (hasRequired_failsIsRegexp) return _failsIsRegexp;
		hasRequired_failsIsRegexp = 1;
		var MATCH = _wksExports('match');
		_failsIsRegexp = function (KEY) {
		  var re = /./;
		  try {
		    '/./'[KEY](re);
		  } catch (e) {
		    try {
		      re[MATCH] = false;
		      return !'/./'[KEY](re);
		    } catch (f) { /* empty */ }
		  } return true;
		};
		return _failsIsRegexp;
	}

	var $export$1m = _export;
	var toLength$i = _toLength;
	var context$2 = _stringContext;
	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	$export$1m($export$1m.P + $export$1m.F * require_failsIsRegexp()(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = context$2(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength$i(that.length);
	    var end = endPosition === undefined ? len : Math.min(toLength$i(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var $export$1l = _export;
	var context$1 = _stringContext;
	var INCLUDES = 'includes';

	$export$1l($export$1l.P + $export$1l.F * require_failsIsRegexp()(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~context$1(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $export$1k = _export;

	$export$1k($export$1k.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var $export$1j = _export;
	var toLength$h = _toLength;
	var context = _stringContext;
	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	$export$1j($export$1j.P + $export$1j.F * require_failsIsRegexp()(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH);
	    var index = toLength$h(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var $export$1i = _export;
	var fails$8 = _fails;
	var defined$3 = _defined;
	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(defined$3(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export$1i($export$1i.P + $export$1i.F * fails$8(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export$1h = _export;

	$export$1h($export$1h.S, 'Date', { now: function () { return new Date().getTime(); } });

	var $export$1g = _export;
	var toObject$c = _toObject;
	var toPrimitive$4 = _toPrimitive;

	$export$1g($export$1g.P + $export$1g.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = toObject$c(this);
	    var pv = toPrimitive$4(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var fails$7 = _fails;
	var getTime$1 = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = (fails$7(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !fails$7(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime$1.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export$1f = _export;
	var toISOString = _dateToIsoString;

	// PhantomJS / old WebKit has a broken implementations
	$export$1f($export$1f.P + $export$1f.F * (Date.prototype.toISOString !== toISOString), 'Date', {
	  toISOString: toISOString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING$1 = 'toString';
	var $toString$1 = DateProto[TO_STRING$1];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefineExports(DateProto, TO_STRING$1, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString$1.call(this) : INVALID_DATE;
	  });
	}

	var _dateToPrimitive;
	var hasRequired_dateToPrimitive;

	function require_dateToPrimitive () {
		if (hasRequired_dateToPrimitive) return _dateToPrimitive;
		hasRequired_dateToPrimitive = 1;
		var anObject = _anObject;
		var toPrimitive = _toPrimitive;
		var NUMBER = 'number';

		_dateToPrimitive = function (hint) {
		  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
		  return toPrimitive(anObject(this), hint != NUMBER);
		};
		return _dateToPrimitive;
	}

	var TO_PRIMITIVE = _wksExports('toPrimitive');
	var proto$3 = Date.prototype;

	if (!(TO_PRIMITIVE in proto$3)) require_hide()(proto$3, TO_PRIMITIVE, require_dateToPrimitive());

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export$1e = _export;

	$export$1e($export$1e.S, 'Array', { isArray: _isArray });

	// call something on iterator step with safe closing on error
	var anObject$x = _anObject;
	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject$x(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject$x(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator
	var Iterators$4 = _iterators;
	var ITERATOR$3 = _wksExports('iterator');
	var ArrayProto$2 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators$4.Array === it || ArrayProto$2[ITERATOR$3] === it);
	};

	var $defineProperty$2 = _objectDp;
	var createDesc$1 = _propertyDesc;

	var _createProperty = function (object, index, value) {
	  if (index in object) $defineProperty$2.f(object, index, createDesc$1(0, value));
	  else object[index] = value;
	};

	var classof$3 = _classof;
	var ITERATOR$2 = _wksExports('iterator');
	var Iterators$3 = _iterators;
	var core_getIteratorMethod = _coreExports.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || Iterators$3[classof$3(it)];
	};

	var _iterDetect;
	var hasRequired_iterDetect;

	function require_iterDetect () {
		if (hasRequired_iterDetect) return _iterDetect;
		hasRequired_iterDetect = 1;
		var ITERATOR = _wksExports('iterator');
		var SAFE_CLOSING = false;

		try {
		  var riter = [7][ITERATOR]();
		  riter['return'] = function () { SAFE_CLOSING = true; };
		  // eslint-disable-next-line no-throw-literal
		  Array.from(riter, function () { throw 2; });
		} catch (e) { /* empty */ }

		_iterDetect = function (exec, skipClosing) {
		  if (!skipClosing && !SAFE_CLOSING) return false;
		  var safe = false;
		  try {
		    var arr = [7];
		    var iter = arr[ITERATOR]();
		    iter.next = function () { return { done: safe = true }; };
		    arr[ITERATOR] = function () { return iter; };
		    exec(arr);
		  } catch (e) { /* empty */ }
		  return safe;
		};
		return _iterDetect;
	}

	var ctx$8 = _ctx;
	var $export$1d = _export;
	var toObject$b = _toObject;
	var call$1 = _iterCall;
	var isArrayIter$2 = _isArrayIter;
	var toLength$g = _toLength;
	var createProperty$2 = _createProperty;
	var getIterFn$2 = core_getIteratorMethod;

	$export$1d($export$1d.S + $export$1d.F * !require_iterDetect()(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject$b(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn$2(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx$8(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter$2(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty$2(result, index, mapping ? call$1(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength$g(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty$2(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var $export$1c = _export;
	var createProperty$1 = _createProperty;

	// WebKit Array.of isn't generic
	$export$1c($export$1c.S + $export$1c.F * _fails(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) createProperty$1(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var fails$6 = _fails;

	var _strictMethod = function (method, arg) {
	  return !!method && fails$6(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)
	var $export$1b = _export;
	var toIObject$4 = _toIobject;
	var arrayJoin$1 = [].join;

	// fallback for not array-like strings
	$export$1b($export$1b.P + $export$1b.F * (require_iobject() != Object || !_strictMethod(arrayJoin$1)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin$1.call(toIObject$4(this), separator === undefined ? ',' : separator);
	  }
	});

	var $export$1a = _export;
	var html$1 = _html;
	var cof$1 = _cof;
	var toAbsoluteIndex$2 = _toAbsoluteIndex;
	var toLength$f = _toLength;
	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export$1a($export$1a.P + $export$1a.F * _fails(function () {
	  if (html$1) arraySlice$1.call(html$1);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength$f(this.length);
	    var klass = cof$1(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = toAbsoluteIndex$2(begin, len);
	    var upTo = toAbsoluteIndex$2(end, len);
	    var size = toLength$f(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	var $export$19 = _export;
	var aFunction$c = _aFunction;
	var toObject$a = _toObject;
	var fails$5 = _fails;
	var $sort = [].sort;
	var test = [1, 2, 3];

	$export$19($export$19.P + $export$19.F * (fails$5(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails$5(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(toObject$a(this))
	      : $sort.call(toObject$a(this), aFunction$c(comparefn));
	  }
	});

	var isObject$c = _isObject;
	var isArray$1 = _isArray;
	var SPECIES$3 = _wksExports('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (isArray$1(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
	    if (isObject$c(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor$5 = _arraySpeciesConstructor;

	var _arraySpeciesCreate = function (original, length) {
	  return new (speciesConstructor$5(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx$7 = _ctx;
	var IObject$1 = require_iobject();
	var toObject$9 = _toObject;
	var toLength$e = _toLength;
	var asc = _arraySpeciesCreate;
	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject$9($this);
	    var self = IObject$1(O);
	    var f = ctx$7(callbackfn, that, 3);
	    var length = toLength$e(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $export$18 = _export;
	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	$export$18($export$18.P + $export$18.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $export$17 = _export;
	var $map$1 = _arrayMethods(1);

	$export$17($export$17.P + $export$17.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map$1(this, callbackfn, arguments[1]);
	  }
	});

	var $export$16 = _export;
	var $filter = _arrayMethods(2);

	$export$16($export$16.P + $export$16.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $export$15 = _export;
	var $some = _arrayMethods(3);

	$export$15($export$15.P + $export$15.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $export$14 = _export;
	var $every = _arrayMethods(4);

	$export$14($export$14.P + $export$14.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var aFunction$b = _aFunction;
	var toObject$8 = _toObject;
	var IObject = require_iobject();
	var toLength$d = _toLength;

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction$b(callbackfn);
	  var O = toObject$8(that);
	  var self = IObject(O);
	  var length = toLength$d(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	var $export$13 = _export;
	var $reduce$1 = _arrayReduce;

	$export$13($export$13.P + $export$13.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce$1(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	var $export$12 = _export;
	var $reduce = _arrayReduce;

	$export$12($export$12.P + $export$12.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $export$11 = _export;
	var $indexOf = _arrayIncludes(false);
	var $native$1 = [].indexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].indexOf(1, -0) < 0;

	$export$11($export$11.P + $export$11.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO$1
	      // convert -0 to +0
	      ? $native$1.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $export$10 = _export;
	var toIObject$3 = _toIobject;
	var toInteger$4 = _toInteger;
	var toLength$c = _toLength;
	var $native = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export$10($export$10.P + $export$10.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject$3(this);
	    var length = toLength$c(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger$4(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin;
	var hasRequired_arrayCopyWithin;

	function require_arrayCopyWithin () {
		if (hasRequired_arrayCopyWithin) return _arrayCopyWithin;
		hasRequired_arrayCopyWithin = 1;
		var toObject = _toObject;
		var toAbsoluteIndex = _toAbsoluteIndex;
		var toLength = _toLength;

		_arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
		  var O = toObject(this);
		  var len = toLength(O.length);
		  var to = toAbsoluteIndex(target, len);
		  var from = toAbsoluteIndex(start, len);
		  var end = arguments.length > 2 ? arguments[2] : undefined;
		  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
		  var inc = 1;
		  if (from < to && to < from + count) {
		    inc = -1;
		    from += count - 1;
		    to += count - 1;
		  }
		  while (count-- > 0) {
		    if (from in O) O[to] = O[from];
		    else delete O[to];
		    to += inc;
		    from += inc;
		  } return O;
		};
		return _arrayCopyWithin;
	}

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wksExports('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) require_hide()(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export$$ = _export;

	$export$$($export$$.P, 'Array', { copyWithin: require_arrayCopyWithin() });

	_addToUnscopables('copyWithin');

	var _arrayFill;
	var hasRequired_arrayFill;

	function require_arrayFill () {
		if (hasRequired_arrayFill) return _arrayFill;
		hasRequired_arrayFill = 1;
		var toObject = _toObject;
		var toAbsoluteIndex = _toAbsoluteIndex;
		var toLength = _toLength;
		_arrayFill = function fill(value /* , start = 0, end = @length */) {
		  var O = toObject(this);
		  var length = toLength(O.length);
		  var aLen = arguments.length;
		  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
		  var end = aLen > 2 ? arguments[2] : undefined;
		  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
		  while (endPos > index) O[index++] = value;
		  return O;
		};
		return _arrayFill;
	}

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export$_ = _export;

	$export$_($export$_.P, 'Array', { fill: require_arrayFill() });

	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export$Z = _export;
	var $find$1 = _arrayMethods(5);
	var KEY$1 = 'find';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	$export$Z($export$Z.P + $export$Z.F * forced$1, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export$Y = _export;
	var $find = _arrayMethods(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export$Y($export$Y.P + $export$Y.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var global$e = _globalExports;
	var dP$5 = _objectDp;
	var DESCRIPTORS$3 = _descriptors;
	var SPECIES$2 = _wksExports('species');

	var _setSpecies = function (KEY) {
	  var C = global$e[KEY];
	  if (DESCRIPTORS$3 && C && !C[SPECIES$2]) dP$5.f(C, SPECIES$2, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var addToUnscopables = _addToUnscopables;
	var step$1 = _iterStep;
	var Iterators$2 = _iterators;
	var toIObject$2 = _toIobject;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject$2(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step$1(1);
	  }
	  if (kind == 'keys') return step$1(0, index);
	  if (kind == 'values') return step$1(0, O[index]);
	  return step$1(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators$2.Arguments = Iterators$2.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags
	var anObject$w = _anObject;
	var _flags = function () {
	  var that = anObject$w(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var global$d = _globalExports;
	var inheritIfRequired$1 = _inheritIfRequired;
	var dP$4 = _objectDp.f;
	var gOPN$2 = _objectGopn.f;
	var isRegExp$2 = _isRegexp;
	var $flags$1 = _flags;
	var $RegExp = global$d.RegExp;
	var Base = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wksExports('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = isRegExp$2(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired$1(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags$1.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN$2(Base), i$2 = 0; keys.length > i$2;) proxy(keys[i$2++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefineExports(global$d, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var regexpFlags = _flags;

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX$1 = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX$1] !== 0 || re2[LAST_INDEX$1] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX$1];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX$1] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	var regexpExec$2 = _regexpExec;
	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: regexpExec$2 !== /./.exec
	}, {
	  exec: regexpExec$2
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var anObject$v = _anObject;
	var $flags = _flags;
	var DESCRIPTORS$2 = _descriptors;
	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define$1 = function (fn) {
	  _redefineExports(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define$1(function toString() {
	    var R = anObject$v(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS$2 && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define$1(function toString() {
	    return $toString.call(this);
	  });
	}

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var classof$2 = _classof;
	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (classof$2(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var redefine$3 = _redefineExports;
	var hide$4 = require_hide();
	var fails$4 = _fails;
	var defined$2 = _defined;
	var wks$2 = _wksExports;
	var regexpExec$1 = _regexpExec;

	var SPECIES$1 = wks$2('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = wks$2(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$4(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails$4(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      defined$2,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === regexpExec$1) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    redefine$3(String.prototype, KEY, strfn);
	    hide$4(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var anObject$u = _anObject;
	var toLength$b = _toLength;
	var advanceStringIndex$2 = _advanceStringIndex;
	var regExpExec$2 = _regexpExecAbstract;

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = anObject$u(regexp);
	      var S = String(this);
	      if (!rx.global) return regExpExec$2(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$2(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$b(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var anObject$t = _anObject;
	var toObject$7 = _toObject;
	var toLength$a = _toLength;
	var toInteger$3 = _toInteger;
	var advanceStringIndex$1 = _advanceStringIndex;
	var regExpExec$1 = _regexpExecAbstract;
	var max = Math.max;
	var min = Math.min;
	var floor = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = anObject$t(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec$1(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$a(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max(min(toInteger$3(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject$7(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var anObject$s = _anObject;
	var sameValue = require_sameValue();
	var regExpExec = _regexpExecAbstract;

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative($search, regexp, this);
	      if (res.done) return res.value;
	      var rx = anObject$s(regexp);
	      var S = String(this);
	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regExpExec(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject$r = _anObject;
	var aFunction$a = _aFunction;
	var SPECIES = _wksExports('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject$r(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$r(C)[SPECIES]) == undefined ? D : aFunction$a(S);
	};

	var isRegExp$1 = _isRegexp;
	var anObject$q = _anObject;
	var speciesConstructor$4 = _speciesConstructor;
	var advanceStringIndex = _advanceStringIndex;
	var toLength$9 = _toLength;
	var callRegExpExec = _regexpExecAbstract;
	var regexpExec = _regexpExec;
	var fails$3 = _fails;
	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails$3(function () { RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$1(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = anObject$q(regexp);
	      var S = String(this);
	      var C = speciesConstructor$4(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(toLength$9(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOfExports = {};
	var _forOf = {
	  get exports(){ return _forOfExports; },
	  set exports(v){ _forOfExports = v; },
	};

	var ctx$6 = _ctx;
	var call = _iterCall;
	var isArrayIter$1 = _isArrayIter;
	var anObject$p = _anObject;
	var toLength$8 = _toLength;
	var getIterFn$1 = core_getIteratorMethod;
	var BREAK = {};
	var RETURN$1 = {};
	var exports$1 = _forOf.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn$1(iterable);
	  var f = ctx$6(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter$1(iterFn)) for (length = toLength$8(iterable.length); length > index; index++) {
	    result = entries ? f(anObject$p(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN$1) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN$1) return result;
	  }
	};
	exports$1.BREAK = BREAK;
	exports$1.RETURN = RETURN$1;

	var ctx$5 = _ctx;
	var invoke = require_invoke();
	var html = _html;
	var cel = require_domCreate();
	var global$c = _globalExports;
	var process$3 = global$c.process;
	var setTask = global$c.setImmediate;
	var clearTask = global$c.clearImmediate;
	var MessageChannel = global$c.MessageChannel;
	var Dispatch = global$c.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$3) == 'process') {
	    defer = function (id) {
	      process$3.nextTick(ctx$5(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx$5(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx$5(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$c.addEventListener && typeof postMessage == 'function' && !global$c.importScripts) {
	    defer = function (id) {
	      global$c.postMessage(id + '', '*');
	    };
	    global$c.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx$5(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var global$b = _globalExports;
	var macrotask = _task.set;
	var Observer = global$b.MutationObserver || global$b.WebKitMutationObserver;
	var process$2 = global$b.process;
	var Promise$1 = global$b.Promise;
	var isNode$2 = _cof(process$2) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode$2 && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode$2) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global$b.navigator && global$b.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$b, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _newPromiseCapability = {};

	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction$9 = _aFunction;

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$9(resolve);
	  this.reject = aFunction$9(reject);
	}

	_newPromiseCapability.f = function (C) {
	  return new PromiseCapability(C);
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var global$a = _globalExports;
	var navigator$1 = global$a.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

	var anObject$o = _anObject;
	var isObject$b = _isObject;
	var newPromiseCapability$2 = _newPromiseCapability;

	var _promiseResolve = function (C, x) {
	  anObject$o(C);
	  if (isObject$b(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$2.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll;
	var hasRequired_redefineAll;

	function require_redefineAll () {
		if (hasRequired_redefineAll) return _redefineAll;
		hasRequired_redefineAll = 1;
		var redefine = _redefineExports;
		_redefineAll = function (target, src, safe) {
		  for (var key in src) redefine(target, key, src[key], safe);
		  return target;
		};
		return _redefineAll;
	}

	var LIBRARY$1 = require_library();
	var global$9 = _globalExports;
	var ctx$4 = _ctx;
	var classof$1 = _classof;
	var $export$X = _export;
	var isObject$a = _isObject;
	var aFunction$8 = _aFunction;
	var anInstance$5 = _anInstance;
	var forOf$6 = _forOfExports;
	var speciesConstructor$3 = _speciesConstructor;
	var task = _task.set;
	var microtask$2 = _microtask();
	var newPromiseCapabilityModule = _newPromiseCapability;
	var perform$1 = _perform;
	var userAgent$3 = _userAgent;
	var promiseResolve$1 = _promiseResolve;
	var PROMISE = 'Promise';
	var TypeError$2 = global$9.TypeError;
	var process$1 = global$9.process;
	var versions = process$1 && process$1.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global$9[PROMISE];
	var isNode$1 = classof$1(process$1) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wksExports('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && userAgent$3.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$a(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask$2(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$2('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global$9, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform$1(function () {
	        if (isNode$1) {
	          process$1.emit('unhandledRejection', value, promise);
	        } else if (handler = global$9.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global$9.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global$9, function () {
	    var handler;
	    if (isNode$1) {
	      process$1.emit('rejectionHandled', promise);
	    } else if (handler = global$9.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$2("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask$2(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx$4($resolve, wrapper, 1), ctx$4($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance$5(this, $Promise, PROMISE, '_h');
	    aFunction$8(executor);
	    Internal.call(this);
	    try {
	      executor(ctx$4($resolve, this, 1), ctx$4($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = require_redefineAll()($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(speciesConstructor$3(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$1.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx$4($resolve, promise, 1);
	    this.reject = ctx$4($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$X($export$X.G + $export$X.W + $export$X.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _coreExports[PROMISE];

	// statics
	$export$X($export$X.S + $export$X.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$X($export$X.S + $export$X.F * (LIBRARY$1 || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve$1(LIBRARY$1 && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export$X($export$X.S + $export$X.F * !(USE_NATIVE && require_iterDetect()(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf$6(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      forOf$6(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var isObject$9 = _isObject;
	var _validateCollection = function (it, TYPE) {
	  if (!isObject$9(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$3 = _objectDp.f;
	var create$2 = _objectCreate;
	var redefineAll$4 = require_redefineAll();
	var ctx$3 = _ctx;
	var anInstance$4 = _anInstance;
	var forOf$5 = _forOfExports;
	var $iterDefine = _iterDefine;
	var step = _iterStep;
	var setSpecies$1 = _setSpecies;
	var DESCRIPTORS$1 = _descriptors;
	var fastKey = _metaExports.fastKey;
	var validate$6 = _validateCollection;
	var SIZE = DESCRIPTORS$1 ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$4(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create$2(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf$5(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll$4(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate$6(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate$6(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate$6(this, NAME);
	        var f = ctx$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate$6(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS$1) dP$3(C.prototype, 'size', {
	      get: function () {
	        return validate$6(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate$6(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies$1(NAME);
	  }
	};

	var global$8 = _globalExports;
	var $export$W = _export;
	var redefine$2 = _redefineExports;
	var redefineAll$3 = require_redefineAll();
	var meta$1 = _metaExports;
	var forOf$4 = _forOfExports;
	var anInstance$3 = _anInstance;
	var isObject$8 = _isObject;
	var fails$2 = _fails;
	var $iterDetect$1 = require_iterDetect();
	var setToStringTag = _setToStringTag;
	var inheritIfRequired = _inheritIfRequired;

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global$8[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    redefine$2(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject$8(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject$8(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject$8(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails$2(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll$3(C.prototype, methods);
	    meta$1.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$2(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = $iterDetect$1(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$2(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance$3(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf$4(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export$W($export$W.G + $export$W.W + $export$W.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var strong$1 = _collectionStrong;
	var validate$5 = _validateCollection;
	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong$1.getEntry(validate$5(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong$1.def(validate$5(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong$1, true);

	var strong = _collectionStrong;
	var validate$4 = _validateCollection;
	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(validate$4(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, strong);

	var es6_weakMapExports = {};
	var es6_weakMap = {
	  get exports(){ return es6_weakMapExports; },
	  set exports(v){ es6_weakMapExports = v; },
	};

	var redefineAll$2 = require_redefineAll();
	var getWeak$1 = _metaExports.getWeak;
	var anObject$n = _anObject;
	var isObject$7 = _isObject;
	var anInstance$2 = _anInstance;
	var forOf$3 = _forOfExports;
	var createArrayMethod$1 = _arrayMethods;
	var $has = _has;
	var validate$3 = _validateCollection;
	var arrayFind$1 = createArrayMethod$1(5);
	var arrayFindIndex$1 = createArrayMethod$1(6);
	var id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore$1 = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind$1(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex$1(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$2(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf$3(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll$2(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!isObject$7(key)) return false;
	        var data = getWeak$1(key);
	        if (data === true) return uncaughtFrozenStore$1(validate$3(this, NAME))['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject$7(key)) return false;
	        var data = getWeak$1(key);
	        if (data === true) return uncaughtFrozenStore$1(validate$3(this, NAME)).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak$1(anObject$n(key), true);
	    if (data === true) uncaughtFrozenStore$1(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore$1
	};

	var global$7 = _globalExports;
	var each = _arrayMethods(0);
	var redefine$1 = _redefineExports;
	var meta = _metaExports;
	var assign = require_objectAssign();
	var weak$1 = _collectionWeak;
	var isObject$6 = _isObject;
	var validate$2 = _validateCollection;
	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !global$7.ActiveXObject && 'ActiveXObject' in global$7;
	var WEAK_MAP = 'WeakMap';
	var getWeak = meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak$1.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject$6(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(validate$2(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak$1.def(validate$2(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = es6_weakMap.exports = _collection(WEAK_MAP, wrapper, methods, weak$1, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = weak$1.getConstructor(wrapper, WEAK_MAP);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    redefine$1(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject$6(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

	var weak = _collectionWeak;
	var validate$1 = _validateCollection;
	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(validate$1(this, WEAK_SET), value, true);
	  }
	}, weak, false, true);

	var global$6 = _globalExports;
	var hide$3 = require_hide();
	var uid$1 = _uid;
	var TYPED = uid$1('typed_array');
	var VIEW$2 = uid$1('view');
	var ABV = !!(global$6.ArrayBuffer && global$6.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i$1 < l) {
	  if (Typed = global$6[TypedArrayConstructors[i$1++]]) {
	    hide$3(Typed.prototype, TYPED, true);
	    hide$3(Typed.prototype, VIEW$2, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW$2
	};

	var _typedBuffer = {};

	// https://tc39.github.io/ecma262/#sec-toindex
	var toInteger$2 = _toInteger;
	var toLength$7 = _toLength;
	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger$2(it);
	  var length = toLength$7(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	(function (exports) {
		var global = _globalExports;
		var DESCRIPTORS = _descriptors;
		var LIBRARY = require_library();
		var $typed = _typed;
		var hide = require_hide();
		var redefineAll = require_redefineAll();
		var fails = _fails;
		var anInstance = _anInstance;
		var toInteger = _toInteger;
		var toLength = _toLength;
		var toIndex = _toIndex;
		var gOPN = _objectGopn.f;
		var dP = _objectDp.f;
		var arrayFill = require_arrayFill();
		var setToStringTag = _setToStringTag;
		var ARRAY_BUFFER = 'ArrayBuffer';
		var DATA_VIEW = 'DataView';
		var PROTOTYPE = 'prototype';
		var WRONG_LENGTH = 'Wrong length!';
		var WRONG_INDEX = 'Wrong index!';
		var $ArrayBuffer = global[ARRAY_BUFFER];
		var $DataView = global[DATA_VIEW];
		var Math = global.Math;
		var RangeError = global.RangeError;
		// eslint-disable-next-line no-shadow-restricted-names
		var Infinity = global.Infinity;
		var BaseBuffer = $ArrayBuffer;
		var abs = Math.abs;
		var pow = Math.pow;
		var floor = Math.floor;
		var log = Math.log;
		var LN2 = Math.LN2;
		var BUFFER = 'buffer';
		var BYTE_LENGTH = 'byteLength';
		var BYTE_OFFSET = 'byteOffset';
		var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
		var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
		var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

		// IEEE754 conversions based on https://github.com/feross/ieee754
		function packIEEE754(value, mLen, nBytes) {
		  var buffer = new Array(nBytes);
		  var eLen = nBytes * 8 - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
		  var i = 0;
		  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
		  var e, m, c;
		  value = abs(value);
		  // eslint-disable-next-line no-self-compare
		  if (value != value || value === Infinity) {
		    // eslint-disable-next-line no-self-compare
		    m = value != value ? 1 : 0;
		    e = eMax;
		  } else {
		    e = floor(log(value) / LN2);
		    if (value * (c = pow(2, -e)) < 1) {
		      e--;
		      c *= 2;
		    }
		    if (e + eBias >= 1) {
		      value += rt / c;
		    } else {
		      value += rt * pow(2, 1 - eBias);
		    }
		    if (value * c >= 2) {
		      e++;
		      c /= 2;
		    }
		    if (e + eBias >= eMax) {
		      m = 0;
		      e = eMax;
		    } else if (e + eBias >= 1) {
		      m = (value * c - 1) * pow(2, mLen);
		      e = e + eBias;
		    } else {
		      m = value * pow(2, eBias - 1) * pow(2, mLen);
		      e = 0;
		    }
		  }
		  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
		  e = e << mLen | m;
		  eLen += mLen;
		  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
		  buffer[--i] |= s * 128;
		  return buffer;
		}
		function unpackIEEE754(buffer, mLen, nBytes) {
		  var eLen = nBytes * 8 - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var nBits = eLen - 7;
		  var i = nBytes - 1;
		  var s = buffer[i--];
		  var e = s & 127;
		  var m;
		  s >>= 7;
		  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
		  m = e & (1 << -nBits) - 1;
		  e >>= -nBits;
		  nBits += mLen;
		  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
		  if (e === 0) {
		    e = 1 - eBias;
		  } else if (e === eMax) {
		    return m ? NaN : s ? -Infinity : Infinity;
		  } else {
		    m = m + pow(2, mLen);
		    e = e - eBias;
		  } return (s ? -1 : 1) * m * pow(2, e - mLen);
		}

		function unpackI32(bytes) {
		  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
		}
		function packI8(it) {
		  return [it & 0xff];
		}
		function packI16(it) {
		  return [it & 0xff, it >> 8 & 0xff];
		}
		function packI32(it) {
		  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
		}
		function packF64(it) {
		  return packIEEE754(it, 52, 8);
		}
		function packF32(it) {
		  return packIEEE754(it, 23, 4);
		}

		function addGetter(C, key, internal) {
		  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
		}

		function get(view, bytes, index, isLittleEndian) {
		  var numIndex = +index;
		  var intIndex = toIndex(numIndex);
		  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
		  var store = view[$BUFFER]._b;
		  var start = intIndex + view[$OFFSET];
		  var pack = store.slice(start, start + bytes);
		  return isLittleEndian ? pack : pack.reverse();
		}
		function set(view, bytes, index, conversion, value, isLittleEndian) {
		  var numIndex = +index;
		  var intIndex = toIndex(numIndex);
		  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
		  var store = view[$BUFFER]._b;
		  var start = intIndex + view[$OFFSET];
		  var pack = conversion(+value);
		  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
		}

		if (!$typed.ABV) {
		  $ArrayBuffer = function ArrayBuffer(length) {
		    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
		    var byteLength = toIndex(length);
		    this._b = arrayFill.call(new Array(byteLength), 0);
		    this[$LENGTH] = byteLength;
		  };

		  $DataView = function DataView(buffer, byteOffset, byteLength) {
		    anInstance(this, $DataView, DATA_VIEW);
		    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
		    var bufferLength = buffer[$LENGTH];
		    var offset = toInteger(byteOffset);
		    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
		    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
		    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
		    this[$BUFFER] = buffer;
		    this[$OFFSET] = offset;
		    this[$LENGTH] = byteLength;
		  };

		  if (DESCRIPTORS) {
		    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
		    addGetter($DataView, BUFFER, '_b');
		    addGetter($DataView, BYTE_LENGTH, '_l');
		    addGetter($DataView, BYTE_OFFSET, '_o');
		  }

		  redefineAll($DataView[PROTOTYPE], {
		    getInt8: function getInt8(byteOffset) {
		      return get(this, 1, byteOffset)[0] << 24 >> 24;
		    },
		    getUint8: function getUint8(byteOffset) {
		      return get(this, 1, byteOffset)[0];
		    },
		    getInt16: function getInt16(byteOffset /* , littleEndian */) {
		      var bytes = get(this, 2, byteOffset, arguments[1]);
		      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
		    },
		    getUint16: function getUint16(byteOffset /* , littleEndian */) {
		      var bytes = get(this, 2, byteOffset, arguments[1]);
		      return bytes[1] << 8 | bytes[0];
		    },
		    getInt32: function getInt32(byteOffset /* , littleEndian */) {
		      return unpackI32(get(this, 4, byteOffset, arguments[1]));
		    },
		    getUint32: function getUint32(byteOffset /* , littleEndian */) {
		      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
		    },
		    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
		      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
		    },
		    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
		      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
		    },
		    setInt8: function setInt8(byteOffset, value) {
		      set(this, 1, byteOffset, packI8, value);
		    },
		    setUint8: function setUint8(byteOffset, value) {
		      set(this, 1, byteOffset, packI8, value);
		    },
		    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
		      set(this, 2, byteOffset, packI16, value, arguments[2]);
		    },
		    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
		      set(this, 2, byteOffset, packI16, value, arguments[2]);
		    },
		    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
		      set(this, 4, byteOffset, packI32, value, arguments[2]);
		    },
		    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
		      set(this, 4, byteOffset, packI32, value, arguments[2]);
		    },
		    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
		      set(this, 4, byteOffset, packF32, value, arguments[2]);
		    },
		    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
		      set(this, 8, byteOffset, packF64, value, arguments[2]);
		    }
		  });
		} else {
		  if (!fails(function () {
		    $ArrayBuffer(1);
		  }) || !fails(function () {
		    new $ArrayBuffer(-1); // eslint-disable-line no-new
		  }) || fails(function () {
		    new $ArrayBuffer(); // eslint-disable-line no-new
		    new $ArrayBuffer(1.5); // eslint-disable-line no-new
		    new $ArrayBuffer(NaN); // eslint-disable-line no-new
		    return $ArrayBuffer.name != ARRAY_BUFFER;
		  })) {
		    $ArrayBuffer = function ArrayBuffer(length) {
		      anInstance(this, $ArrayBuffer);
		      return new BaseBuffer(toIndex(length));
		    };
		    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
		    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
		      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
		    }
		    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
		  }
		  // iOS Safari 7.x bug
		  var view = new $DataView(new $ArrayBuffer(2));
		  var $setInt8 = $DataView[PROTOTYPE].setInt8;
		  view.setInt8(0, 2147483648);
		  view.setInt8(1, 2147483649);
		  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
		    setInt8: function setInt8(byteOffset, value) {
		      $setInt8.call(this, byteOffset, value << 24 >> 24);
		    },
		    setUint8: function setUint8(byteOffset, value) {
		      $setInt8.call(this, byteOffset, value << 24 >> 24);
		    }
		  }, true);
		}
		setToStringTag($ArrayBuffer, ARRAY_BUFFER);
		setToStringTag($DataView, DATA_VIEW);
		hide($DataView[PROTOTYPE], $typed.VIEW, true);
		exports[ARRAY_BUFFER] = $ArrayBuffer;
		exports[DATA_VIEW] = $DataView;
	} (_typedBuffer));

	var $export$V = _export;
	var $typed$1 = _typed;
	var buffer = _typedBuffer;
	var anObject$m = _anObject;
	var toAbsoluteIndex$1 = _toAbsoluteIndex;
	var toLength$6 = _toLength;
	var isObject$5 = _isObject;
	var ArrayBuffer$1 = _globalExports.ArrayBuffer;
	var speciesConstructor$2 = _speciesConstructor;
	var $ArrayBuffer$1 = buffer.ArrayBuffer;
	var $DataView$1 = buffer.DataView;
	var $isView = $typed$1.ABV && ArrayBuffer$1.isView;
	var $slice$1 = $ArrayBuffer$1.prototype.slice;
	var VIEW$1 = $typed$1.VIEW;
	var ARRAY_BUFFER$1 = 'ArrayBuffer';

	$export$V($export$V.G + $export$V.W + $export$V.F * (ArrayBuffer$1 !== $ArrayBuffer$1), { ArrayBuffer: $ArrayBuffer$1 });

	$export$V($export$V.S + $export$V.F * !$typed$1.CONSTR, ARRAY_BUFFER$1, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject$5(it) && VIEW$1 in it;
	  }
	});

	$export$V($export$V.P + $export$V.U + $export$V.F * _fails(function () {
	  return !new $ArrayBuffer$1(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER$1, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice$1 !== undefined && end === undefined) return $slice$1.call(anObject$m(this), start); // FF fix
	    var len = anObject$m(this).byteLength;
	    var first = toAbsoluteIndex$1(start, len);
	    var fin = toAbsoluteIndex$1(end === undefined ? len : end, len);
	    var result = new (speciesConstructor$2(this, $ArrayBuffer$1))(toLength$6(fin - first));
	    var viewS = new $DataView$1(this);
	    var viewT = new $DataView$1(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER$1);

	var $export$U = _export;
	$export$U($export$U.G + $export$U.W + $export$U.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArrayExports = {};
	var _typedArray = {
	  get exports(){ return _typedArrayExports; },
	  set exports(v){ _typedArrayExports = v; },
	};

	if (_descriptors) {
	  var LIBRARY = require_library();
	  var global$5 = _globalExports;
	  var fails$1 = _fails;
	  var $export$T = _export;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx$2 = _ctx;
	  var anInstance$1 = _anInstance;
	  var propertyDesc = _propertyDesc;
	  var hide$2 = require_hide();
	  var redefineAll$1 = require_redefineAll();
	  var toInteger$1 = _toInteger;
	  var toLength$5 = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive$3 = _toPrimitive;
	  var has$2 = _has;
	  var classof = _classof;
	  var isObject$4 = _isObject;
	  var toObject$6 = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create$1 = _objectCreate;
	  var getPrototypeOf$7 = _objectGpo;
	  var gOPN$1 = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks$1 = _wksExports;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor$1 = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators$1 = _iterators;
	  var $iterDetect = require_iterDetect();
	  var setSpecies = _setSpecies;
	  var arrayFill = require_arrayFill();
	  var arrayCopyWithin = require_arrayCopyWithin();
	  var $DP = _objectDp;
	  var $GOPD = _objectGopd;
	  var dP$2 = $DP.f;
	  var gOPD$5 = $GOPD.f;
	  var RangeError$1 = global$5.RangeError;
	  var TypeError$1 = global$5.TypeError;
	  var Uint8Array$1 = global$5.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR$1 = wks$1('iterator');
	  var TAG = wks$1('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails$1(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array$1(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array$1 && !!Uint8Array$1[PROTOTYPE].set && fails$1(function () {
	    new Uint8Array$1(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger$1(it);
	    if (offset < 0 || offset % BYTES) throw RangeError$1('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject$4(it) && TYPED_ARRAY in it) return it;
	    throw TypeError$1(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject$4(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError$1('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP$2(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject$6(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx$2(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength$5(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array$1 && fails$1(function () { arrayToLocaleString.call(new Uint8Array$1(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto$1 = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor$1(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength$5((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject$6(arrayLike);
	    var len = toLength$5(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError$1(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators$1 = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject$4(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive$3(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD$5(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive$3(key, true))
	      && isObject$4(desc)
	      && has$2(desc, 'value')
	      && !has$2(desc, 'get')
	      && !has$2(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has$2(desc, 'writable') || desc.writable)
	      && (!has$2(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP$2(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export$T($export$T.S + $export$T.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails$1(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll$1({}, proto$1);
	  redefineAll$1($TypedArrayPrototype$, $iterators$1);
	  hide$2($TypedArrayPrototype$, ITERATOR$1, $iterators$1.values);
	  redefineAll$1($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP$2($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  _typedArray.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global$5[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf$7(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP$2(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance$1(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject$4(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$5($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError$1(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide$2(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create$1($TypedArrayPrototype$);
	      hide$2(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails$1(function () {
	      TypedArray(1);
	    }) || !fails$1(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance$1(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject$4(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN$1(Base).concat(gOPN$1(TAC)) : gOPN$1(Base), function (key) {
	        if (!(key in TypedArray)) hide$2(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR$1];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators$1.values;
	    hide$2(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide$2(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide$2(TypedArrayPrototype, VIEW, true);
	    hide$2(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP$2(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export$T($export$T.G + $export$T.W + $export$T.F * (TypedArray != Base), O);

	    $export$T($export$T.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export$T($export$T.S + $export$T.F * fails$1(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide$2(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export$T($export$T.P, NAME, proto$1);

	    setSpecies(NAME);

	    $export$T($export$T.P + $export$T.F * FORCED_SET, NAME, { set: $set });

	    $export$T($export$T.P + $export$T.F * !CORRECT_ITER_NAME, NAME, $iterators$1);

	    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export$T($export$T.P + $export$T.F * fails$1(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export$T($export$T.P + $export$T.F * (fails$1(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails$1(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators$1[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide$2(TypedArrayPrototype, ITERATOR$1, $iterator);
	  };
	} else _typedArray.exports = function () { /* empty */ };

	_typedArrayExports('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArrayExports('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export$S = _export;
	var aFunction$7 = _aFunction;
	var anObject$l = _anObject;
	var rApply = (_globalExports.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export$S($export$S.S + $export$S.F * !_fails(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction$7(target);
	    var L = anObject$l(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export$R = _export;
	var create = _objectCreate;
	var aFunction$6 = _aFunction;
	var anObject$k = _anObject;
	var isObject$3 = _isObject;
	var fails = _fails;
	var bind = require_bind();
	var rConstruct = (_globalExports.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	$export$R($export$R.S + $export$R.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$6(Target);
	    anObject$k(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$6(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject$3(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject$3(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP$1 = _objectDp;
	var $export$Q = _export;
	var anObject$j = _anObject;
	var toPrimitive$2 = _toPrimitive;

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export$Q($export$Q.S + $export$Q.F * _fails(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(dP$1.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject$j(target);
	    propertyKey = toPrimitive$2(propertyKey, true);
	    anObject$j(attributes);
	    try {
	      dP$1.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export$P = _export;
	var gOPD$4 = _objectGopd.f;
	var anObject$i = _anObject;

	$export$P($export$P.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$4(anObject$i(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)
	var $export$O = _export;
	var anObject$h = _anObject;
	var Enumerate = function (iterated) {
	  this._t = anObject$h(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	$export$O($export$O.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD$3 = _objectGopd;
	var getPrototypeOf$6 = _objectGpo;
	var has$1 = _has;
	var $export$N = _export;
	var isObject$2 = _isObject;
	var anObject$g = _anObject;

	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (anObject$g(target) === receiver) return target[propertyKey];
	  if (desc = gOPD$3.f(target, propertyKey)) return has$1(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (isObject$2(proto = getPrototypeOf$6(target))) return get(proto, propertyKey, receiver);
	}

	$export$N($export$N.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD$2 = _objectGopd;
	var $export$M = _export;
	var anObject$f = _anObject;

	$export$M($export$M.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD$2.f(anObject$f(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export$L = _export;
	var getProto = _objectGpo;
	var anObject$e = _anObject;

	$export$L($export$L.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject$e(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export$K = _export;

	$export$K($export$K.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)
	var $export$J = _export;
	var anObject$d = _anObject;
	var $isExtensible = Object.isExtensible;

	$export$J($export$J.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject$d(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols
	var gOPN = _objectGopn;
	var gOPS = _objectGops;
	var anObject$c = _anObject;
	var Reflect$1 = _globalExports.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject$c(it));
	  var getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)
	var $export$I = _export;

	$export$I($export$I.S, 'Reflect', { ownKeys: _ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)
	var $export$H = _export;
	var anObject$b = _anObject;
	var $preventExtensions = Object.preventExtensions;

	$export$H($export$H.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject$b(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = _objectDp;
	var gOPD$1 = _objectGopd;
	var getPrototypeOf$5 = _objectGpo;
	var has = _has;
	var $export$G = _export;
	var createDesc = _propertyDesc;
	var anObject$a = _anObject;
	var isObject$1 = _isObject;

	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = gOPD$1.f(anObject$a(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (isObject$1(proto = getPrototypeOf$5(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject$1(receiver)) return false;
	    if (existingDescriptor = gOPD$1.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      dP.f(receiver, propertyKey, existingDescriptor);
	    } else dP.f(receiver, propertyKey, createDesc(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export$G($export$G.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export$F = _export;
	var setProto = require_setProto();

	if (setProto) $export$F($export$F.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes
	var $export$E = _export;
	var $includes = _arrayIncludes(true);

	$export$E($export$E.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var isArray = _isArray;
	var isObject = _isObject;
	var toLength$4 = _toLength;
	var ctx$1 = _ctx;
	var IS_CONCAT_SPREADABLE = _wksExports('isConcatSpreadable');

	function flattenIntoArray$2(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? ctx$1(mapper, thisArg, 3) : false;
	  var element, spreadable;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      spreadable = false;
	      if (isObject(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
	      }

	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray$2(target, original, element, toLength$4(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}

	var _flattenIntoArray = flattenIntoArray$2;

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
	var $export$D = _export;
	var flattenIntoArray$1 = _flattenIntoArray;
	var toObject$5 = _toObject;
	var toLength$3 = _toLength;
	var aFunction$5 = _aFunction;
	var arraySpeciesCreate$1 = _arraySpeciesCreate;

	$export$D($export$D.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = toObject$5(this);
	    var sourceLen, A;
	    aFunction$5(callbackfn);
	    sourceLen = toLength$3(O.length);
	    A = arraySpeciesCreate$1(O, 0);
	    flattenIntoArray$1(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});

	_addToUnscopables('flatMap');

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
	var $export$C = _export;
	var flattenIntoArray = _flattenIntoArray;
	var toObject$4 = _toObject;
	var toLength$2 = _toLength;
	var toInteger = _toInteger;
	var arraySpeciesCreate = _arraySpeciesCreate;

	$export$C($export$C.P, 'Array', {
	  flatten: function flatten(/* depthArg = 1 */) {
	    var depthArg = arguments[0];
	    var O = toObject$4(this);
	    var sourceLen = toLength$2(O.length);
	    var A = arraySpeciesCreate(O, 0);
	    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
	    return A;
	  }
	});

	_addToUnscopables('flatten');

	// https://github.com/mathiasbynens/String.prototype.at
	var $export$B = _export;
	var $at = _stringAt(true);
	var $fails = _fails;

	var FORCED = $fails(function () {
	  return '𠮷'.at(0) !== '𠮷';
	});

	$export$B($export$B.P + $export$B.F * FORCED, 'String', {
	  at: function at(pos) {
	    return $at(this, pos);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength$1 = _toLength;
	var repeat = _stringRepeat;
	var defined$1 = _defined;

	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(defined$1(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = toLength$1(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export$A = _export;
	var $pad$1 = _stringPad;
	var userAgent$2 = _userAgent;

	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$2);

	$export$A($export$A.P + $export$A.F * WEBKIT_BUG$1, 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return $pad$1(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export$z = _export;
	var $pad = _stringPad;
	var userAgent$1 = _userAgent;

	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$1);

	$export$z($export$z.P + $export$z.F * WEBKIT_BUG, 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

	// https://tc39.github.io/String.prototype.matchAll/
	var $export$y = _export;
	var defined = _defined;
	var toLength = _toLength;
	var isRegExp = _isRegexp;
	var getFlags = _flags;
	var RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function (regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};

	_iterCreate($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return { value: match, done: match === null };
	});

	$export$y($export$y.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    defined(this);
	    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this);
	    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
	    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export$x = _export;
	var ownKeys = _ownKeys;
	var toIObject$1 = _toIobject;
	var gOPD = _objectGopd;
	var createProperty = _createProperty;

	$export$x($export$x.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject$1(object);
	    var getDesc = gOPD.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var DESCRIPTORS = _descriptors;
	var getKeys$1 = _objectKeys;
	var toIObject = _toIobject;
	var isEnum = require_objectPie().f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys$1(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || isEnum.call(O, key)) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries
	var $export$w = _export;
	var $values = _objectToArray(false);

	$export$w($export$w.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	// https://github.com/tc39/proposal-object-values-entries
	var $export$v = _export;
	var $entries = _objectToArray(true);

	$export$v($export$v.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var _objectForcedPam;
	var hasRequired_objectForcedPam;

	function require_objectForcedPam () {
		if (hasRequired_objectForcedPam) return _objectForcedPam;
		hasRequired_objectForcedPam = 1;
		// Forced replacement prototype accessors methods
		_objectForcedPam = require_library() || !_fails(function () {
		  var K = Math.random();
		  // In FF throws only define methods
		  // eslint-disable-next-line no-undef, no-useless-call
		  __defineSetter__.call(null, K, function () { /* empty */ });
		  delete _globalExports[K];
		});
		return _objectForcedPam;
	}

	var $export$u = _export;
	var toObject$3 = _toObject;
	var aFunction$4 = _aFunction;
	var $defineProperty$1 = _objectDp;

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	_descriptors && $export$u($export$u.P + require_objectForcedPam(), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    $defineProperty$1.f(toObject$3(this), P, { get: aFunction$4(getter), enumerable: true, configurable: true });
	  }
	});

	var $export$t = _export;
	var toObject$2 = _toObject;
	var aFunction$3 = _aFunction;
	var $defineProperty = _objectDp;

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	_descriptors && $export$t($export$t.P + require_objectForcedPam(), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    $defineProperty.f(toObject$2(this), P, { set: aFunction$3(setter), enumerable: true, configurable: true });
	  }
	});

	var $export$s = _export;
	var toObject$1 = _toObject;
	var toPrimitive$1 = _toPrimitive;
	var getPrototypeOf$4 = _objectGpo;
	var getOwnPropertyDescriptor$1 = _objectGopd.f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	_descriptors && $export$s($export$s.P + require_objectForcedPam(), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = toObject$1(this);
	    var K = toPrimitive$1(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor$1(O, K)) return D.get;
	    } while (O = getPrototypeOf$4(O));
	  }
	});

	var $export$r = _export;
	var toObject = _toObject;
	var toPrimitive = _toPrimitive;
	var getPrototypeOf$3 = _objectGpo;
	var getOwnPropertyDescriptor = _objectGopd.f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	_descriptors && $export$r($export$r.P + require_objectForcedPam(), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = toObject(this);
	    var K = toPrimitive(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	    } while (O = getPrototypeOf$3(O));
	  }
	});

	var forOf$2 = _forOfExports;

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  forOf$2(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	var _collectionToJson;
	var hasRequired_collectionToJson;

	function require_collectionToJson () {
		if (hasRequired_collectionToJson) return _collectionToJson;
		hasRequired_collectionToJson = 1;
		// https://github.com/DavidBruant/Map-Set.prototype.toJSON
		var classof = _classof;
		var from = _arrayFromIterable;
		_collectionToJson = function (NAME) {
		  return function toJSON() {
		    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
		    return from(this);
		  };
		};
		return _collectionToJson;
	}

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export$q = _export;

	$export$q($export$q.P + $export$q.R, 'Map', { toJSON: require_collectionToJson()('Map') });

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export$p = _export;

	$export$p($export$p.P + $export$p.R, 'Set', { toJSON: require_collectionToJson()('Set') });

	// https://tc39.github.io/proposal-setmap-offrom/
	var $export$o = _export;

	var _setCollectionOf = function (COLLECTION) {
	  $export$o($export$o.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	_setCollectionOf('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
	_setCollectionOf('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	_setCollectionOf('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
	_setCollectionOf('WeakSet');

	// https://tc39.github.io/proposal-setmap-offrom/
	var $export$n = _export;
	var aFunction$2 = _aFunction;
	var ctx = _ctx;
	var forOf$1 = _forOfExports;

	var _setCollectionFrom = function (COLLECTION) {
	  $export$n($export$n.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
	    var mapFn = arguments[1];
	    var mapping, A, n, cb;
	    aFunction$2(this);
	    mapping = mapFn !== undefined;
	    if (mapping) aFunction$2(mapFn);
	    if (source == undefined) return new this();
	    A = [];
	    if (mapping) {
	      n = 0;
	      cb = ctx(mapFn, arguments[2], 2);
	      forOf$1(source, false, function (nextItem) {
	        A.push(cb(nextItem, n++));
	      });
	    } else {
	      forOf$1(source, false, A.push, A);
	    }
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	_setCollectionFrom('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
	_setCollectionFrom('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	_setCollectionFrom('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
	_setCollectionFrom('WeakSet');

	// https://github.com/tc39/proposal-global
	var $export$m = _export;

	$export$m($export$m.G, { global: _globalExports });

	// https://github.com/tc39/proposal-global
	var $export$l = _export;

	$export$l($export$l.S, 'System', { global: _globalExports });

	// https://github.com/ljharb/proposal-is-error
	var $export$k = _export;
	var cof = _cof;

	$export$k($export$k.S, 'Error', {
	  isError: function isError(it) {
	    return cof(it) === 'Error';
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$j = _export;

	$export$j($export$j.S, 'Math', {
	  clamp: function clamp(x, lower, upper) {
	    return Math.min(upper, Math.max(lower, x));
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$i = _export;

	$export$i($export$i.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$h = _export;
	var RAD_PER_DEG = 180 / Math.PI;

	$export$h($export$h.S, 'Math', {
	  degrees: function degrees(radians) {
	    return radians * RAD_PER_DEG;
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
	  if (
	    arguments.length === 0
	      // eslint-disable-next-line no-self-compare
	      || x != x
	      // eslint-disable-next-line no-self-compare
	      || inLow != inLow
	      // eslint-disable-next-line no-self-compare
	      || inHigh != inHigh
	      // eslint-disable-next-line no-self-compare
	      || outLow != outLow
	      // eslint-disable-next-line no-self-compare
	      || outHigh != outHigh
	  ) return NaN;
	  if (x === Infinity || x === -Infinity) return x;
	  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
	};

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$g = _export;
	var scale = _mathScale;
	var fround = require_mathFround();

	$export$g($export$g.S, 'Math', {
	  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
	    return fround(scale(x, inLow, inHigh, outLow, outHigh));
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$f = _export;

	$export$f($export$f.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$e = _export;

	$export$e($export$e.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$d = _export;

	$export$d($export$d.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >> 16;
	    var v1 = $v >> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$c = _export;

	$export$c($export$c.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$b = _export;
	var DEG_PER_RAD = Math.PI / 180;

	$export$b($export$b.S, 'Math', {
	  radians: function radians(degrees) {
	    return degrees * DEG_PER_RAD;
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export$a = _export;

	$export$a($export$a.S, 'Math', { scale: _mathScale });

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export$9 = _export;

	$export$9($export$9.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >>> 16;
	    var v1 = $v >>> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

	// http://jfbastien.github.io/papers/Math.signbit.html
	var $export$8 = _export;

	$export$8($export$8.S, 'Math', { signbit: function signbit(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
	} });

	var $export$7 = _export;
	var core$1 = _coreExports;
	var global$4 = _globalExports;
	var speciesConstructor = _speciesConstructor;
	var promiseResolve = _promiseResolve;

	$export$7($export$7.P + $export$7.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core$1.Promise || global$4.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try
	var $export$6 = _export;
	var newPromiseCapability = _newPromiseCapability;
	var perform = _perform;

	$export$6($export$6.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var Map = es6_map;
	var $export$5 = _export;
	var shared = _sharedExports('metadata');
	var store$1 = shared.store || (shared.store = new (es6_weakMapExports)());

	var getOrCreateMetadataMap$1 = function (target, targetKey, create) {
	  var targetMetadata = store$1.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store$1.set(target, targetMetadata = new Map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map());
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata$3 = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap$1(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata$2 = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap$1(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata$2 = function (MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap$1(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys$2 = function (target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap$1(target, targetKey, false);
	  var keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
	  return keys;
	};
	var toMetaKey$9 = function (it) {
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function (O) {
	  $export$5($export$5.S, 'Reflect', O);
	};

	var _metadata = {
	  store: store$1,
	  map: getOrCreateMetadataMap$1,
	  has: ordinaryHasOwnMetadata$3,
	  get: ordinaryGetOwnMetadata$2,
	  set: ordinaryDefineOwnMetadata$2,
	  keys: ordinaryOwnMetadataKeys$2,
	  key: toMetaKey$9,
	  exp: exp
	};

	var metadata$7 = _metadata;
	var anObject$9 = _anObject;
	var toMetaKey$8 = metadata$7.key;
	var ordinaryDefineOwnMetadata$1 = metadata$7.set;

	metadata$7.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	  ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, anObject$9(target), toMetaKey$8(targetKey));
	} });

	var metadata$6 = _metadata;
	var anObject$8 = _anObject;
	var toMetaKey$7 = metadata$6.key;
	var getOrCreateMetadataMap = metadata$6.map;
	var store = metadata$6.store;

	metadata$6.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
	  var targetKey = arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]);
	  var metadataMap = getOrCreateMetadataMap(anObject$8(target), targetKey, false);
	  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	  if (metadataMap.size) return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	} });

	var metadata$5 = _metadata;
	var anObject$7 = _anObject;
	var getPrototypeOf$2 = _objectGpo;
	var ordinaryHasOwnMetadata$2 = metadata$5.has;
	var ordinaryGetOwnMetadata$1 = metadata$5.get;
	var toMetaKey$6 = metadata$5.key;

	var ordinaryGetMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
	  var parent = getPrototypeOf$2(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	metadata$5.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryGetMetadata(metadataKey, anObject$7(target), arguments.length < 3 ? undefined : toMetaKey$6(arguments[2]));
	} });

	var Set$1 = es6_set;
	var from = _arrayFromIterable;
	var metadata$4 = _metadata;
	var anObject$6 = _anObject;
	var getPrototypeOf$1 = _objectGpo;
	var ordinaryOwnMetadataKeys$1 = metadata$4.keys;
	var toMetaKey$5 = metadata$4.key;

	var ordinaryMetadataKeys = function (O, P) {
	  var oKeys = ordinaryOwnMetadataKeys$1(O, P);
	  var parent = getPrototypeOf$1(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set$1(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	metadata$4.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
	  return ordinaryMetadataKeys(anObject$6(target), arguments.length < 2 ? undefined : toMetaKey$5(arguments[1]));
	} });

	var metadata$3 = _metadata;
	var anObject$5 = _anObject;
	var ordinaryGetOwnMetadata = metadata$3.get;
	var toMetaKey$4 = metadata$3.key;

	metadata$3.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryGetOwnMetadata(metadataKey, anObject$5(target)
	    , arguments.length < 3 ? undefined : toMetaKey$4(arguments[2]));
	} });

	var metadata$2 = _metadata;
	var anObject$4 = _anObject;
	var ordinaryOwnMetadataKeys = metadata$2.keys;
	var toMetaKey$3 = metadata$2.key;

	metadata$2.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
	  return ordinaryOwnMetadataKeys(anObject$4(target), arguments.length < 2 ? undefined : toMetaKey$3(arguments[1]));
	} });

	var metadata$1 = _metadata;
	var anObject$3 = _anObject;
	var getPrototypeOf = _objectGpo;
	var ordinaryHasOwnMetadata$1 = metadata$1.has;
	var toMetaKey$2 = metadata$1.key;

	var ordinaryHasMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	metadata$1.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryHasMetadata(metadataKey, anObject$3(target), arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]));
	} });

	var metadata = _metadata;
	var anObject$2 = _anObject;
	var ordinaryHasOwnMetadata = metadata.has;
	var toMetaKey$1 = metadata.key;

	metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryHasOwnMetadata(metadataKey, anObject$2(target)
	    , arguments.length < 3 ? undefined : toMetaKey$1(arguments[2]));
	} });

	var $metadata = _metadata;
	var anObject$1 = _anObject;
	var aFunction$1 = _aFunction;
	var toMetaKey = $metadata.key;
	var ordinaryDefineOwnMetadata = $metadata.set;

	$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	  return function decorator(target, targetKey) {
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject$1 : aFunction$1)(target),
	      toMetaKey(targetKey)
	    );
	  };
	} });

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export$4 = _export;
	var microtask$1 = _microtask();
	var process = _globalExports.process;
	var isNode = _cof(process) == 'process';

	$export$4($export$4.G, {
	  asap: function asap(fn) {
	    var domain = isNode && process.domain;
	    microtask$1(domain ? domain.bind(fn) : fn);
	  }
	});

	// https://github.com/zenparsing/es-observable
	var $export$3 = _export;
	var global$3 = _globalExports;
	var core = _coreExports;
	var microtask = _microtask();
	var OBSERVABLE = _wksExports('observable');
	var aFunction = _aFunction;
	var anObject = _anObject;
	var anInstance = _anInstance;
	var redefineAll = require_redefineAll();
	var hide$1 = require_hide();
	var forOf = _forOfExports;
	var RETURN = forOf.RETURN;

	var getMethod = function (fn) {
	  return fn == null ? undefined : aFunction(fn);
	};

	var cleanupSubscription = function (subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};

	var subscriptionClosed = function (subscription) {
	  return subscription._o === undefined;
	};

	var closeSubscription = function (subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};

	var Subscription = function (observer, subscriber) {
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer);
	    var subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  } if (subscriptionClosed(this)) cleanupSubscription(this);
	};

	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe() { closeSubscription(this); }
	});

	var SubscriptionObserver = function (subscription) {
	  this._s = subscription;
	};

	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});

	var $Observable = function Observable(subscriber) {
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};

	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (core.Promise || global$3.Promise)(function (resolve, reject) {
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next: function (value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});

	redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          try {
	            if (forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function () { done = true; };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          for (var j = 0; j < items.length; ++j) {
	            observer.next(items[j]);
	            if (done) return;
	          } observer.complete();
	        }
	      });
	      return function () { done = true; };
	    });
	  }
	});

	hide$1($Observable.prototype, OBSERVABLE, function () { return this; });

	$export$3($export$3.G, { Observable: $Observable });

	_setSpecies('Observable');

	// ie9- setTimeout & setInterval additional parameters fix
	var global$2 = _globalExports;
	var $export$2 = _export;
	var userAgent = _userAgent;
	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var wrap = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	$export$2($export$2.G + $export$2.B + $export$2.F * MSIE, {
	  setTimeout: wrap(global$2.setTimeout),
	  setInterval: wrap(global$2.setInterval)
	});

	var $export$1 = _export;
	var $task = _task;
	$export$1($export$1.G + $export$1.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});

	var $iterators = es6_array_iterator;
	var getKeys = _objectKeys;
	var redefine = _redefineExports;
	var global$1 = _globalExports;
	var hide = require_hide();
	var Iterators = _iterators;
	var wks = _wksExports;
	var ITERATOR = wks('iterator');
	var TO_STRING_TAG = wks('toStringTag');
	var ArrayValues = Iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = global$1[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
	  }
	}

	(function (module) {
		module.exports = _coreExports;
	} (shim));

	var runtimeExports = {};
	var runtime = {
	  get exports(){ return runtimeExports; },
	  set exports(v){ runtimeExports = v; },
	};

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	(function (module) {
		!(function(global) {

		  var Op = Object.prototype;
		  var hasOwn = Op.hasOwnProperty;
		  var undefined$1; // More compressible than void 0.
		  var $Symbol = typeof Symbol === "function" ? Symbol : {};
		  var iteratorSymbol = $Symbol.iterator || "@@iterator";
		  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
		  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
		  var runtime = global.regeneratorRuntime;
		  if (runtime) {
		    {
		      // If regeneratorRuntime is defined globally and we're in a module,
		      // make the exports object identical to regeneratorRuntime.
		      module.exports = runtime;
		    }
		    // Don't bother evaluating the rest of this file if the runtime was
		    // already defined globally.
		    return;
		  }

		  // Define the runtime globally (as expected by generated code) as either
		  // module.exports (if we're in a module) or a new, empty object.
		  runtime = global.regeneratorRuntime = module.exports ;

		  function wrap(innerFn, outerFn, self, tryLocsList) {
		    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
		    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
		    var generator = Object.create(protoGenerator.prototype);
		    var context = new Context(tryLocsList || []);

		    // The ._invoke method unifies the implementations of the .next,
		    // .throw, and .return methods.
		    generator._invoke = makeInvokeMethod(innerFn, self, context);

		    return generator;
		  }
		  runtime.wrap = wrap;

		  // Try/catch helper to minimize deoptimizations. Returns a completion
		  // record like context.tryEntries[i].completion. This interface could
		  // have been (and was previously) designed to take a closure to be
		  // invoked without arguments, but in all the cases we care about we
		  // already have an existing method we want to call, so there's no need
		  // to create a new function object. We can even get away with assuming
		  // the method takes exactly one argument, since that happens to be true
		  // in every case, so we don't have to touch the arguments object. The
		  // only additional allocation required is the completion record, which
		  // has a stable shape and so hopefully should be cheap to allocate.
		  function tryCatch(fn, obj, arg) {
		    try {
		      return { type: "normal", arg: fn.call(obj, arg) };
		    } catch (err) {
		      return { type: "throw", arg: err };
		    }
		  }

		  var GenStateSuspendedStart = "suspendedStart";
		  var GenStateSuspendedYield = "suspendedYield";
		  var GenStateExecuting = "executing";
		  var GenStateCompleted = "completed";

		  // Returning this object from the innerFn has the same effect as
		  // breaking out of the dispatch switch statement.
		  var ContinueSentinel = {};

		  // Dummy constructor functions that we use as the .constructor and
		  // .constructor.prototype properties for functions that return Generator
		  // objects. For full spec compliance, you may wish to configure your
		  // minifier not to mangle the names of these two functions.
		  function Generator() {}
		  function GeneratorFunction() {}
		  function GeneratorFunctionPrototype() {}

		  // This is a polyfill for %IteratorPrototype% for environments that
		  // don't natively support it.
		  var IteratorPrototype = {};
		  IteratorPrototype[iteratorSymbol] = function () {
		    return this;
		  };

		  var getProto = Object.getPrototypeOf;
		  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
		  if (NativeIteratorPrototype &&
		      NativeIteratorPrototype !== Op &&
		      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
		    // This environment has a native %IteratorPrototype%; use it instead
		    // of the polyfill.
		    IteratorPrototype = NativeIteratorPrototype;
		  }

		  var Gp = GeneratorFunctionPrototype.prototype =
		    Generator.prototype = Object.create(IteratorPrototype);
		  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
		  GeneratorFunctionPrototype.constructor = GeneratorFunction;
		  GeneratorFunctionPrototype[toStringTagSymbol] =
		    GeneratorFunction.displayName = "GeneratorFunction";

		  // Helper for defining the .next, .throw, and .return methods of the
		  // Iterator interface in terms of a single ._invoke method.
		  function defineIteratorMethods(prototype) {
		    ["next", "throw", "return"].forEach(function(method) {
		      prototype[method] = function(arg) {
		        return this._invoke(method, arg);
		      };
		    });
		  }

		  runtime.isGeneratorFunction = function(genFun) {
		    var ctor = typeof genFun === "function" && genFun.constructor;
		    return ctor
		      ? ctor === GeneratorFunction ||
		        // For the native GeneratorFunction constructor, the best we can
		        // do is to check its .name property.
		        (ctor.displayName || ctor.name) === "GeneratorFunction"
		      : false;
		  };

		  runtime.mark = function(genFun) {
		    if (Object.setPrototypeOf) {
		      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
		    } else {
		      genFun.__proto__ = GeneratorFunctionPrototype;
		      if (!(toStringTagSymbol in genFun)) {
		        genFun[toStringTagSymbol] = "GeneratorFunction";
		      }
		    }
		    genFun.prototype = Object.create(Gp);
		    return genFun;
		  };

		  // Within the body of any async function, `await x` is transformed to
		  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
		  // `hasOwn.call(value, "__await")` to determine if the yielded value is
		  // meant to be awaited.
		  runtime.awrap = function(arg) {
		    return { __await: arg };
		  };

		  function AsyncIterator(generator) {
		    function invoke(method, arg, resolve, reject) {
		      var record = tryCatch(generator[method], generator, arg);
		      if (record.type === "throw") {
		        reject(record.arg);
		      } else {
		        var result = record.arg;
		        var value = result.value;
		        if (value &&
		            typeof value === "object" &&
		            hasOwn.call(value, "__await")) {
		          return Promise.resolve(value.__await).then(function(value) {
		            invoke("next", value, resolve, reject);
		          }, function(err) {
		            invoke("throw", err, resolve, reject);
		          });
		        }

		        return Promise.resolve(value).then(function(unwrapped) {
		          // When a yielded Promise is resolved, its final value becomes
		          // the .value of the Promise<{value,done}> result for the
		          // current iteration. If the Promise is rejected, however, the
		          // result for this iteration will be rejected with the same
		          // reason. Note that rejections of yielded Promises are not
		          // thrown back into the generator function, as is the case
		          // when an awaited Promise is rejected. This difference in
		          // behavior between yield and await is important, because it
		          // allows the consumer to decide what to do with the yielded
		          // rejection (swallow it and continue, manually .throw it back
		          // into the generator, abandon iteration, whatever). With
		          // await, by contrast, there is no opportunity to examine the
		          // rejection reason outside the generator function, so the
		          // only option is to throw it from the await expression, and
		          // let the generator function handle the exception.
		          result.value = unwrapped;
		          resolve(result);
		        }, reject);
		      }
		    }

		    if (typeof global.process === "object" && global.process.domain) {
		      invoke = global.process.domain.bind(invoke);
		    }

		    var previousPromise;

		    function enqueue(method, arg) {
		      function callInvokeWithMethodAndArg() {
		        return new Promise(function(resolve, reject) {
		          invoke(method, arg, resolve, reject);
		        });
		      }

		      return previousPromise =
		        // If enqueue has been called before, then we want to wait until
		        // all previous Promises have been resolved before calling invoke,
		        // so that results are always delivered in the correct order. If
		        // enqueue has not been called before, then it is important to
		        // call invoke immediately, without waiting on a callback to fire,
		        // so that the async generator function has the opportunity to do
		        // any necessary setup in a predictable way. This predictability
		        // is why the Promise constructor synchronously invokes its
		        // executor callback, and why async functions synchronously
		        // execute code before the first await. Since we implement simple
		        // async functions in terms of async generators, it is especially
		        // important to get this right, even though it requires care.
		        previousPromise ? previousPromise.then(
		          callInvokeWithMethodAndArg,
		          // Avoid propagating failures to Promises returned by later
		          // invocations of the iterator.
		          callInvokeWithMethodAndArg
		        ) : callInvokeWithMethodAndArg();
		    }

		    // Define the unified helper method that is used to implement .next,
		    // .throw, and .return (see defineIteratorMethods).
		    this._invoke = enqueue;
		  }

		  defineIteratorMethods(AsyncIterator.prototype);
		  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
		    return this;
		  };
		  runtime.AsyncIterator = AsyncIterator;

		  // Note that simple async functions are implemented on top of
		  // AsyncIterator objects; they just return a Promise for the value of
		  // the final result produced by the iterator.
		  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
		    var iter = new AsyncIterator(
		      wrap(innerFn, outerFn, self, tryLocsList)
		    );

		    return runtime.isGeneratorFunction(outerFn)
		      ? iter // If outerFn is a generator, return the full iterator.
		      : iter.next().then(function(result) {
		          return result.done ? result.value : iter.next();
		        });
		  };

		  function makeInvokeMethod(innerFn, self, context) {
		    var state = GenStateSuspendedStart;

		    return function invoke(method, arg) {
		      if (state === GenStateExecuting) {
		        throw new Error("Generator is already running");
		      }

		      if (state === GenStateCompleted) {
		        if (method === "throw") {
		          throw arg;
		        }

		        // Be forgiving, per 25.3.3.3.3 of the spec:
		        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
		        return doneResult();
		      }

		      context.method = method;
		      context.arg = arg;

		      while (true) {
		        var delegate = context.delegate;
		        if (delegate) {
		          var delegateResult = maybeInvokeDelegate(delegate, context);
		          if (delegateResult) {
		            if (delegateResult === ContinueSentinel) continue;
		            return delegateResult;
		          }
		        }

		        if (context.method === "next") {
		          // Setting context._sent for legacy support of Babel's
		          // function.sent implementation.
		          context.sent = context._sent = context.arg;

		        } else if (context.method === "throw") {
		          if (state === GenStateSuspendedStart) {
		            state = GenStateCompleted;
		            throw context.arg;
		          }

		          context.dispatchException(context.arg);

		        } else if (context.method === "return") {
		          context.abrupt("return", context.arg);
		        }

		        state = GenStateExecuting;

		        var record = tryCatch(innerFn, self, context);
		        if (record.type === "normal") {
		          // If an exception is thrown from innerFn, we leave state ===
		          // GenStateExecuting and loop back for another invocation.
		          state = context.done
		            ? GenStateCompleted
		            : GenStateSuspendedYield;

		          if (record.arg === ContinueSentinel) {
		            continue;
		          }

		          return {
		            value: record.arg,
		            done: context.done
		          };

		        } else if (record.type === "throw") {
		          state = GenStateCompleted;
		          // Dispatch the exception by looping back around to the
		          // context.dispatchException(context.arg) call above.
		          context.method = "throw";
		          context.arg = record.arg;
		        }
		      }
		    };
		  }

		  // Call delegate.iterator[context.method](context.arg) and handle the
		  // result, either by returning a { value, done } result from the
		  // delegate iterator, or by modifying context.method and context.arg,
		  // setting context.delegate to null, and returning the ContinueSentinel.
		  function maybeInvokeDelegate(delegate, context) {
		    var method = delegate.iterator[context.method];
		    if (method === undefined$1) {
		      // A .throw or .return when the delegate iterator has no .throw
		      // method always terminates the yield* loop.
		      context.delegate = null;

		      if (context.method === "throw") {
		        if (delegate.iterator.return) {
		          // If the delegate iterator has a return method, give it a
		          // chance to clean up.
		          context.method = "return";
		          context.arg = undefined$1;
		          maybeInvokeDelegate(delegate, context);

		          if (context.method === "throw") {
		            // If maybeInvokeDelegate(context) changed context.method from
		            // "return" to "throw", let that override the TypeError below.
		            return ContinueSentinel;
		          }
		        }

		        context.method = "throw";
		        context.arg = new TypeError(
		          "The iterator does not provide a 'throw' method");
		      }

		      return ContinueSentinel;
		    }

		    var record = tryCatch(method, delegate.iterator, context.arg);

		    if (record.type === "throw") {
		      context.method = "throw";
		      context.arg = record.arg;
		      context.delegate = null;
		      return ContinueSentinel;
		    }

		    var info = record.arg;

		    if (! info) {
		      context.method = "throw";
		      context.arg = new TypeError("iterator result is not an object");
		      context.delegate = null;
		      return ContinueSentinel;
		    }

		    if (info.done) {
		      // Assign the result of the finished delegate to the temporary
		      // variable specified by delegate.resultName (see delegateYield).
		      context[delegate.resultName] = info.value;

		      // Resume execution at the desired location (see delegateYield).
		      context.next = delegate.nextLoc;

		      // If context.method was "throw" but the delegate handled the
		      // exception, let the outer generator proceed normally. If
		      // context.method was "next", forget context.arg since it has been
		      // "consumed" by the delegate iterator. If context.method was
		      // "return", allow the original .return call to continue in the
		      // outer generator.
		      if (context.method !== "return") {
		        context.method = "next";
		        context.arg = undefined$1;
		      }

		    } else {
		      // Re-yield the result returned by the delegate method.
		      return info;
		    }

		    // The delegate iterator is finished, so forget it and continue with
		    // the outer generator.
		    context.delegate = null;
		    return ContinueSentinel;
		  }

		  // Define Generator.prototype.{next,throw,return} in terms of the
		  // unified ._invoke helper method.
		  defineIteratorMethods(Gp);

		  Gp[toStringTagSymbol] = "Generator";

		  // A Generator should always return itself as the iterator object when the
		  // @@iterator function is called on it. Some browsers' implementations of the
		  // iterator prototype chain incorrectly implement this, causing the Generator
		  // object to not be returned from this call. This ensures that doesn't happen.
		  // See https://github.com/facebook/regenerator/issues/274 for more details.
		  Gp[iteratorSymbol] = function() {
		    return this;
		  };

		  Gp.toString = function() {
		    return "[object Generator]";
		  };

		  function pushTryEntry(locs) {
		    var entry = { tryLoc: locs[0] };

		    if (1 in locs) {
		      entry.catchLoc = locs[1];
		    }

		    if (2 in locs) {
		      entry.finallyLoc = locs[2];
		      entry.afterLoc = locs[3];
		    }

		    this.tryEntries.push(entry);
		  }

		  function resetTryEntry(entry) {
		    var record = entry.completion || {};
		    record.type = "normal";
		    delete record.arg;
		    entry.completion = record;
		  }

		  function Context(tryLocsList) {
		    // The root entry object (effectively a try statement without a catch
		    // or a finally block) gives us a place to store values thrown from
		    // locations where there is no enclosing try statement.
		    this.tryEntries = [{ tryLoc: "root" }];
		    tryLocsList.forEach(pushTryEntry, this);
		    this.reset(true);
		  }

		  runtime.keys = function(object) {
		    var keys = [];
		    for (var key in object) {
		      keys.push(key);
		    }
		    keys.reverse();

		    // Rather than returning an object with a next method, we keep
		    // things simple and return the next function itself.
		    return function next() {
		      while (keys.length) {
		        var key = keys.pop();
		        if (key in object) {
		          next.value = key;
		          next.done = false;
		          return next;
		        }
		      }

		      // To avoid creating an additional object, we just hang the .value
		      // and .done properties off the next function object itself. This
		      // also ensures that the minifier will not anonymize the function.
		      next.done = true;
		      return next;
		    };
		  };

		  function values(iterable) {
		    if (iterable) {
		      var iteratorMethod = iterable[iteratorSymbol];
		      if (iteratorMethod) {
		        return iteratorMethod.call(iterable);
		      }

		      if (typeof iterable.next === "function") {
		        return iterable;
		      }

		      if (!isNaN(iterable.length)) {
		        var i = -1, next = function next() {
		          while (++i < iterable.length) {
		            if (hasOwn.call(iterable, i)) {
		              next.value = iterable[i];
		              next.done = false;
		              return next;
		            }
		          }

		          next.value = undefined$1;
		          next.done = true;

		          return next;
		        };

		        return next.next = next;
		      }
		    }

		    // Return an iterator with no values.
		    return { next: doneResult };
		  }
		  runtime.values = values;

		  function doneResult() {
		    return { value: undefined$1, done: true };
		  }

		  Context.prototype = {
		    constructor: Context,

		    reset: function(skipTempReset) {
		      this.prev = 0;
		      this.next = 0;
		      // Resetting context._sent for legacy support of Babel's
		      // function.sent implementation.
		      this.sent = this._sent = undefined$1;
		      this.done = false;
		      this.delegate = null;

		      this.method = "next";
		      this.arg = undefined$1;

		      this.tryEntries.forEach(resetTryEntry);

		      if (!skipTempReset) {
		        for (var name in this) {
		          // Not sure about the optimal order of these conditions:
		          if (name.charAt(0) === "t" &&
		              hasOwn.call(this, name) &&
		              !isNaN(+name.slice(1))) {
		            this[name] = undefined$1;
		          }
		        }
		      }
		    },

		    stop: function() {
		      this.done = true;

		      var rootEntry = this.tryEntries[0];
		      var rootRecord = rootEntry.completion;
		      if (rootRecord.type === "throw") {
		        throw rootRecord.arg;
		      }

		      return this.rval;
		    },

		    dispatchException: function(exception) {
		      if (this.done) {
		        throw exception;
		      }

		      var context = this;
		      function handle(loc, caught) {
		        record.type = "throw";
		        record.arg = exception;
		        context.next = loc;

		        if (caught) {
		          // If the dispatched exception was caught by a catch block,
		          // then let that catch block handle the exception normally.
		          context.method = "next";
		          context.arg = undefined$1;
		        }

		        return !! caught;
		      }

		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        var record = entry.completion;

		        if (entry.tryLoc === "root") {
		          // Exception thrown outside of any try block that could handle
		          // it, so set the completion value of the entire function to
		          // throw the exception.
		          return handle("end");
		        }

		        if (entry.tryLoc <= this.prev) {
		          var hasCatch = hasOwn.call(entry, "catchLoc");
		          var hasFinally = hasOwn.call(entry, "finallyLoc");

		          if (hasCatch && hasFinally) {
		            if (this.prev < entry.catchLoc) {
		              return handle(entry.catchLoc, true);
		            } else if (this.prev < entry.finallyLoc) {
		              return handle(entry.finallyLoc);
		            }

		          } else if (hasCatch) {
		            if (this.prev < entry.catchLoc) {
		              return handle(entry.catchLoc, true);
		            }

		          } else if (hasFinally) {
		            if (this.prev < entry.finallyLoc) {
		              return handle(entry.finallyLoc);
		            }

		          } else {
		            throw new Error("try statement without catch or finally");
		          }
		        }
		      }
		    },

		    abrupt: function(type, arg) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc <= this.prev &&
		            hasOwn.call(entry, "finallyLoc") &&
		            this.prev < entry.finallyLoc) {
		          var finallyEntry = entry;
		          break;
		        }
		      }

		      if (finallyEntry &&
		          (type === "break" ||
		           type === "continue") &&
		          finallyEntry.tryLoc <= arg &&
		          arg <= finallyEntry.finallyLoc) {
		        // Ignore the finally entry if control is not jumping to a
		        // location outside the try/catch block.
		        finallyEntry = null;
		      }

		      var record = finallyEntry ? finallyEntry.completion : {};
		      record.type = type;
		      record.arg = arg;

		      if (finallyEntry) {
		        this.method = "next";
		        this.next = finallyEntry.finallyLoc;
		        return ContinueSentinel;
		      }

		      return this.complete(record);
		    },

		    complete: function(record, afterLoc) {
		      if (record.type === "throw") {
		        throw record.arg;
		      }

		      if (record.type === "break" ||
		          record.type === "continue") {
		        this.next = record.arg;
		      } else if (record.type === "return") {
		        this.rval = this.arg = record.arg;
		        this.method = "return";
		        this.next = "end";
		      } else if (record.type === "normal" && afterLoc) {
		        this.next = afterLoc;
		      }

		      return ContinueSentinel;
		    },

		    finish: function(finallyLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.finallyLoc === finallyLoc) {
		          this.complete(entry.completion, entry.afterLoc);
		          resetTryEntry(entry);
		          return ContinueSentinel;
		        }
		      }
		    },

		    "catch": function(tryLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc === tryLoc) {
		          var record = entry.completion;
		          if (record.type === "throw") {
		            var thrown = record.arg;
		            resetTryEntry(entry);
		          }
		          return thrown;
		        }
		      }

		      // The context.catch method must only be called with a location
		      // argument that corresponds to a known catch block.
		      throw new Error("illegal catch attempt");
		    },

		    delegateYield: function(iterable, resultName, nextLoc) {
		      this.delegate = {
		        iterator: values(iterable),
		        resultName: resultName,
		        nextLoc: nextLoc
		      };

		      if (this.method === "next") {
		        // Deliberately forget the last sent value so that we don't
		        // accidentally pass it on to the delegate.
		        this.arg = undefined$1;
		      }

		      return ContinueSentinel;
		    }
		  };
		})(
		  // Among the various tricks for obtaining a reference to the global
		  // object, this seems to be the most reliable technique that does not
		  // use indirect eval (which violates Content Security Policy).
		  typeof commonjsGlobal === "object" ? commonjsGlobal :
		  typeof window === "object" ? window :
		  typeof self === "object" ? self : commonjsGlobal
		);
	} (runtime));

	var _replacer = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};

	// https://github.com/benjamingr/RexExp.escape
	var $export = _export;
	var $re = _replacer(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

	_coreExports.RegExp.escape;

	if (commonjsGlobal._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	commonjsGlobal._babelPolyfill = true;

	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});

	let constants = {};

	constants.actions = {};
	constants.actions.GET_USER_ACTION = "getUser";
	constants.actions.AUTHENTICATION_ACTION = "authenticate";
	constants.actions.ENTREPRISE_AUTHENTICATION_ACTION = "entreprise_authentication";
	constants.actions.LOGOUT_ACTION = "logout";
	constants.actions.CORRECT_ACTION = "correct";
	constants.actions.GET_PASS_CORDIAL = "getPassCordial";
	constants.actions.SET_PASS_CORDIAL = "setPassCordial";
	constants.actions.GET_FORCE_AUTH = "getForceAuth";
	constants.actions.SET_FORCE_AUTH = "setForceAuth";

	constants.parameters = {};
	constants.parameters.IMG_URL = "https://cordial.fr/integration/img/";

	constants.clients = {};
	constants.clients['axa-maroc'] = "axa-maam";

	global$m.TYPES = {
	    INPUT_TEXT: {
	        VALUE: 'input text',
	        TAG: "input",
	        MATCH: "[type='text'], [type='search']"
	    },
	    TEXTAREA: {
	        VALUE: 'textarea',
	        TAG: "textarea"
	    },
	    EDITABLE_DIV: {
	        VALUE: 'diveditable',
	        TAG: "div",
	        MATCH: "[contenteditable='true'], [contenteditable], body[id='tinymce'], div.kix-zoomdocumentplugin-inner, div.ve-ce-surface, div.CodeMirror-code"
	    },
	    IFRAME: {
	      VALUE: 'iframe',
	      TAG: 'iframe'
	    },
	    CORDIAL: {
	        ATTRIBUTE: "cordial"
	    },
	    MODAL: {
	        ID: "cordial-modal"
	    }
	};

	global$m.EDITORS = {
	    CKEDITOR: {
	        VALUE: 'CKEditor',
	        MATCH: ".ck-content"
	    },
	    CKEDITOR4: {
	        VALUE: 'CKEditor4',
	        MATCH: '.cke_editable'
	    },
	    DRAFTEDITOR : {
	        VALUE: 'DraftEditor',
	        MATCH: '.public-DraftEditor-content'
	    },
	    QUASAR : {
	        VALUE : 'Quasar',
	        MATCH : '.q-editor__content'
	    },
	    TINY_MCE: {
	        VALUE: 'TinyMCE',
	        MATCH: "body[id='tinymce']"
	    },
	    PROSEMIRROR: {
	        VALUE: 'ProseMirror',
	        MATCH: '.ProseMirror'
	    },
	    GMAIL: {
	        VALUE: 'Gmail',
	        URL: "mail.google.com"
	    },
	    FACEBOOK: {
	        VALUE: 'Facebook',
	        URL: "facebook.com"
	    },
	    ORANGE: {
	        VALUE: 'Orange',
	        MATCH: "#mce_0",
	        URL: "orange.fr"
	    },
	    SFR_MAIL: {
	        VALUE: 'SFRMail',
	        MATCH: "body.cke_editable",
	        URL: "webmail.sfr.fr"
	    },
	    OUTLOOK_LIVE: {
	        VALUE: 'OutlookLive',
	        URL: "outlook"
	    },
	    SPEECH_TEXTER: {
	        VALUE: 'SpeechTexter',
	        MATCH: "#editor",
	        URL: "speechtexter.com"
	    },
	    GOOGLE_DOCS: {
	        VALUE: 'GoogleDocs',
	        MATCH: "div.kix-zoomdocumentplugin-inner",
	        URL: "docs.google.com"
	    },
	    WORDPRESS: {
	        VALUE: 'WordPress',
	        MATCH: '#wpbody [contenteditable="true"]'
	    },
	    WORDPRESS_VISUAL_BUILDER: {
	        VALUE: 'WordPressVisualBuilder',
	        MATCH: 'div.mce-content-body'
	    },
	    PIPEDRIVE: {
	        VALUE: 'PipeDrive',
	        URL: "pipedrive.com"
	    },
	    TWITTER: {
	        VALUE: 'Twitter',
	        URL: "twitter.com"
	    },
	    DUDA: {
	        VALUE: 'Duda',
	        URL: "duda.co"
	    },
	    LEBONCOIN: {
	        VALUE: 'LeBonCoin',
	        URL: "leboncoin.fr"
	    },
	    INSIGHTLY: {
	        VALUE: 'Insightly',
	        URL: "insightly.com"
	    },
	    JOOMLA: {
	        VALUE: 'Joomla',
	        MATCH: '.texteditor--popup'
	    },
	    WIKIPEDIA: {
	        VALUE: 'Wikipedia',
	        URL: 'wikipedia.org',
	        MATCH: 'div.ve-ce-surface'
	    },
	    SKRIBIX: {
	        VALUE: 'Skribix',
	        URL: 'skribix.com'
	    },
	    RAPID_TABLES: {
	        VALUE: 'RapidTables',
	        MATCH: '.CodeMirror-code'
	    },
	    SERVICE_NOW: {
	        VALUE: 'ServiceNow',
	        URL : 'service-now.com'
	    }
	};

	global$m.CSS_KEYS = {
	    LAYER: [
	        "align-content",
	        "align-items",
	        "align-self",
	        "alignment-baseline",
	        "baseline-shift",
	        "border-bottom-width",
	        "border-collapse",
	        "border-left-width",
	        "border-right-width",
	        "border-top-width",
	        "box-sizing",
	        "break-after",
	        "break-before",
	        "break-inside",
	        "direction",
	        "dominant-baseline",
	        "font-family",
	        "font-kerning",
	        "font-optical-sizing",
	        "font-size",
	        "font-stretch",
	        "font-style",
	        "font-variant",
	        "font-weight",
	        "hyphens",
	        "justify-content",
	        "justify-items",
	        "justify-self",
	        "letter-spacing",
	        "line-break",
	        "line-height",
	        "object-fit",
	        "outline-width",
	        "overflow-x",
	        "overflow-y",
	        "padding-bottom",
	        "padding-left",
	        "padding-right",
	        "padding-top",
	        "margin-bottom",
	        "margin-left",
	        "margin-right",
	        "margin-top",
	        "scroll-behavior",
	        "text-align",
	        "text-overflow",
	        "text-rendering",
	        "white-space",
	        "word-break",
	        "writing-mode",
	        "-webkit-font-smoothing",
	        "-webkit-line-break",
	        "-webkit-line-clamp",
	        "-webkit-text-combine",
	        "-webkit-text-orientation",
	        "-webkit-writing-mode"
	    ],
	    CONTAINER: [
	        "border-bottom-width",
	        "border-left-width",
	        "border-right-width",
	        "border-top-width"
	    ]
	};

	global$m.CONSTANTS = constants;

	const whiteSpaceRegex = new RegExp("^[\b\t          ‏　]$");
	const ZWCRegex = new RegExp("^[​‌‍­]$");

	let ToolBox$6 = class ToolBox
	{
	    constructor() {}

	    static IsTextNode(node) { return node?.nodeType === Node.TEXT_NODE }

	    /***
	     * Simple debounce function
	     * @param func (function to execute periodically)
	     * @param wait_ms (wait period between function calls)
	     * @param immediate (start immediately the function or wait)
	     * @returns {string}
	     */
	    static Debounce(func, wait_ms, immediate) {
	        let timeout;
	        return function () {
	            let context = this, args = arguments;
	            let later = function () {
	                timeout = null;
	                if (!immediate) func.apply(context, args);
	            };
	            let callNow = immediate && !timeout;
	            clearTimeout(timeout);
	            timeout = setTimeout(later, wait_ms);
	            if (callNow) func.apply(context, args);
	        };
	    }

	    /***
	     * Return the type of the input element
	     * @param element (input element)
	     * @returns {string}
	     */
	    static GetType(element) {
	        let type = undefined;
	        if (element.hasAttribute && !element.hasAttribute(TYPES.CORDIAL.ATTRIBUTE)) {
	            switch (element.tagName.toLowerCase()) {
	                case TYPES.INPUT_TEXT.TAG:
	                    if (element.matches(TYPES.INPUT_TEXT.MATCH)) type = TYPES.INPUT_TEXT.VALUE;
	                    break;
	                case TYPES.TEXTAREA.TAG:
	                    type = TYPES.TEXTAREA.VALUE;
	                    break;
	                case TYPES.IFRAME.TAG:
	                    type = TYPES.IFRAME.VALUE;
	                    break;
	                default:
	                    if (element.matches(TYPES.EDITABLE_DIV.MATCH)){
	                        type = TYPES.EDITABLE_DIV.VALUE;
	                    } 
	                    break;
	            }
	        }
	        return type;
	    }

	    /***
	     * Return the editor name of the input element if it exists
	     * @param element (input element)
	     * @returns {string}
	     */
	    static GetEditor(context, element) {
	        let editor = undefined;
	        if (element.hasAttribute) {
	            switch(true) {
	                case element.matches(EDITORS.CKEDITOR.MATCH):
	                    editor = EDITORS.CKEDITOR.VALUE;
	                    break;
	                case element.matches(EDITORS.CKEDITOR4.MATCH) || context.relativeDocument?.body.matches(EDITORS.CKEDITOR4.MATCH):
	                    editor = EDITORS.CKEDITOR4.VALUE;
	                    break;
	                case element.matches(EDITORS.DRAFTEDITOR.MATCH):
	                    editor = EDITORS.DRAFTEDITOR.VALUE;
	                    break;
	                case element.matches(EDITORS.QUASAR.MATCH):
	                    editor = EDITORS.QUASAR.VALUE;
	                    break;
	                case element.matches(EDITORS.TINY_MCE.MATCH) || context.relativeDocument?.body.matches(EDITORS.TINY_MCE.MATCH):
	                    editor = EDITORS.TINY_MCE.VALUE;
	                    break;
	                case element.matches(EDITORS.PROSEMIRROR.MATCH):
	                    editor = EDITORS.PROSEMIRROR.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.GMAIL.URL):
	                    editor = EDITORS.GMAIL.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.ORANGE.URL) && element.matches(EDITORS.ORANGE.MATCH):
	                    editor = EDITORS.ORANGE.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.SFR_MAIL.URL) && element.matches(EDITORS.SFR_MAIL.MATCH):
	                    editor = EDITORS.SFR_MAIL.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.OUTLOOK_LIVE.URL):
	                    editor = EDITORS.OUTLOOK_LIVE.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.SPEECH_TEXTER.URL) && element.matches(EDITORS.SPEECH_TEXTER.MATCH):
	                    editor = EDITORS.SPEECH_TEXTER.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.GOOGLE_DOCS.URL) && element.matches(EDITORS.GOOGLE_DOCS.MATCH):
	                    editor = EDITORS.GOOGLE_DOCS.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.FACEBOOK.URL):
	                    editor = EDITORS.FACEBOOK.VALUE;
	                    break;
	                case element.matches(EDITORS.WORDPRESS_VISUAL_BUILDER.MATCH):
	                    editor = EDITORS.WORDPRESS_VISUAL_BUILDER.VALUE;
	                    break;
	                case element.matches(EDITORS.WORDPRESS.MATCH):
	                    editor = EDITORS.WORDPRESS.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.PIPEDRIVE.URL):
	                    editor = EDITORS.PIPEDRIVE.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.TWITTER.URL):
	                    editor = EDITORS.TWITTER.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.DUDA.URL):
	                    editor = EDITORS.DUDA.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.LEBONCOIN.URL):
	                    editor = EDITORS.LEBONCOIN.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.INSIGHTLY.URL):
	                    editor = EDITORS.INSIGHTLY.VALUE;
	                    break;
	                case element.matches(EDITORS.JOOMLA.MATCH):
	                    editor = EDITORS.JOOMLA.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.WIKIPEDIA.URL) && element.matches(EDITORS.WIKIPEDIA.MATCH):
	                    editor = EDITORS.WIKIPEDIA.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.SKRIBIX.URL):
	                    editor = EDITORS.SKRIBIX.VALUE;
	                    break;
	                case element.matches(EDITORS.RAPID_TABLES.MATCH):
	                    editor = EDITORS.RAPID_TABLES.VALUE;
	                    break;
	                case context.RelativeWindow().location.href.includes(EDITORS.SERVICE_NOW.URL):
	                    editor = EDITORS.SERVICE_NOW.VALUE;
	                    break;
	                default:
	                    editor = undefined;
	                    break;
	            }
	        }
	        return editor;
	    }

	    static IsWhiteSpace(e) {
	        return whiteSpaceRegex.test(e)
	    }

	    static IsZWC(e) {
	        return ZWCRegex.test(e)
	    }

	    static IsExcludedCharacter(c) {
	        return ToolBox$6.IsWhiteSpace(c) || "\n" === c || "\t" === c || " " === c || ToolBox$6.IsZWC(c)
	    }


	    static CompareStrings(s1, s2, editor) {
	        if(s1.length !== s2.length) {
	            console.log(s1.length);
	            console.log(s2.length);
	            if (editor === EDITORS.GOOGLE_DOCS.VALUE){
	                if (s1.includes(s2)){
	                    return "NEW_PAGE"
	                } else {
	                    return false;
	                }
	            } else {
	                return false;
	            }
	        }

	        let formatedS1 = s1.split('').filter(letter => {
	            try{return btoa(unescape(!ToolBox$6.IsZWC(encodeURIComponent(letter))))} catch(e){return letter}
	        }).join('');
	        let formatedS2 = s2.split('').filter(letter => {
	            try{return btoa(unescape(!ToolBox$6.IsZWC(encodeURIComponent(letter))))} catch(e){return letter}
	        }).join('');

	        for(let i = 0; i < s1.length; i++) {
	            if(formatedS1[i] !== formatedS2[i]) {
	                console.log("difference");
	                if(ToolBox$6.IsExcludedCharacter(formatedS1[i]) && ToolBox$6.IsExcludedCharacter(formatedS2[i])) {
	                    console.log("exclude char false");
	                    return false;
	                }
	            }
	        }

	        //console.log("compare true")
	        return true;
	    }


	    static DeepCopy(obj){
	        return JSON.parse(JSON.stringify(obj))
	    }
	};

	var ToolBox_1 = ToolBox$6;

	const ToolBox$5 = ToolBox_1;

	const FOCUS_UPDATE_INTERVAL = 250;

	let Input$2 = class Input
	{
	    static lastActiveElement = undefined;

	    static queryFocusedElement = '.has-focus' // used when dom is divised in multiple shadowroot => document.activeElement can't work

	    SourceElement() { return this.sourceElement }
	    Corrector() { return this.corrector }
	    Overlay() { return this.overlay }

	    constructor(sourceElement, corrector, overlay, context) {
	        this.sourceElement = sourceElement;
	        this.corrector = corrector;
	        this.overlay = overlay;
	        this.context = context;
	        this.updateFocusTimeout = null;
	        this._UpdateFocus();

	    }

	    /***
	     * Update the input element overlay if it is the current or last focused element on the page
	     */
	    _UpdateFocus() {
	        if (this.overlay.backbone.currentTabActive) {
	            let editor = ToolBox$5.GetEditor(this.context, this.sourceElement);
	            switch (editor) {
	                case EDITORS.GOOGLE_DOCS.VALUE :
	                case EDITORS.RAPID_TABLES.VALUE :
	                    this.overlay.SetFocus(true);
	                    break;
	                default :
	                    if (this.sourceElement === this.context.RelativeDocument().activeElement) {
	                        Input$2.lastActiveElement = this.sourceElement;
	                    }
	                    else { // if document.activelement can't work, use css query to get focused element (used for dom using shadowdom)
	                        const focusedEls = this.context.DomParser().QuerySelectorAll(Input$2.queryFocusedElement, this.context.RelativeDocument() ); 
	                        if(focusedEls.length > 0 && this.isElementInsideOthers(this.sourceElement,focusedEls)){
	                        Input$2.lastActiveElement = this.sourceElement;
	                        }
	                    }
	                    if(this.sourceElement === Input$2.lastActiveElement) {
	                        if(!this.overlay.IsFocus()) {
	                            this.overlay.SetFocus(true);
	                        }
	                    }
	                    else
	                    {
	                        this.overlay.SetFocus(false);
	                    }
	                    break;
	            }
	        }
	        this.updateFocusTimeout = setTimeout(this._UpdateFocus.bind(this), FOCUS_UPDATE_INTERVAL);
	    }

	    isElementInsideOthers(element, parentElementArray){
	        let isInside = false;
	        parentElementArray.forEach( pel => {
	            if(pel.contains(element)){
	                isInside = true;
	            } 
	        });
	        return isInside
	    }

	    Destroy() {
	        clearTimeout(this.updateFocusTimeout);
	        this.overlay?.Destroy();
	        this.corrector?.Destroy();
	        this.context?.Destroy();
	        
	        delete this.sourceElement;
	        delete this.corrector;
	        delete this.overlay;
	        delete this.context;

	    }
	};

	var Input_1 = Input$2;

	const Input$1 = Input_1;

	let SimpleInput$2 = class SimpleInput extends Input$1
	{
	    constructor(sourceElement, corrector, overlay, context) {
	        super(sourceElement, corrector, overlay, context);
	    }
	};

	var SimpleInput_1 = SimpleInput$2;

	let IgnoredWords$1 = class IgnoredWords
	{
	    constructor() {
	        this.ignoredWords = [];
	    }

	    GetIgnoredWords() {
	        return this.ignoredWords
	    }

	    Includes(word) {
	        return this.ignoredWords.includes(word);
	    }

	    Add(word) {
	        if (!this.Includes(word)) this.ignoredWords.push(word);
	    }

	    Delete(word) {
	        this.ignoredWords = this.ignoredWords.filter(w => word !== w);
	    }
	};

	let instance = new IgnoredWords$1();
	var IgnoredWords_1 = instance;

	const ToolBox$4 = ToolBox_1;

	const TIMEOUT_DURATION = 5000;

	let Icon$2 = class Icon
	{
	    static STATES = {
	        INITIAL: 0, // just the icon, waiting for a click to launch correction
	        WAITING: 1, // rotating
	        CHECKED: 2, // no error
	        ERROR: 3, // there is a error (like a server error)
	        HIDDEN: 4, // when errors are underlined
	        WRITING: 5, // user is writing text 
	        STOPPED_WRITING: 6 // user is writing text 
	    }

	    Element() { return this.element }
	    State() { return this.state }
	    IsActivated() { return this.isActivated }

	    constructor(context, forceActivation = false) {
	        this.context = context;
	        this.forceActivation = forceActivation;
	        this.element = undefined;
	        this.state = undefined;
	        this.isActivated = false;
	        this.mustContinueRotation = true;

	        this._Init();
	    }

	    _Init() {
	        this.element = this.context.RelativeDocument().createElement('div');
	        this.element.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.element.classList.add('cordial-icon');
	        const currentEditor = ToolBox$4.GetEditor(this.context, this.element);
	        switch (currentEditor) {
	            case EDITORS.SKRIBIX.VALUE :
	                if(this.context.RelativeWindow().location.href.includes('redactool'))
	                {
	                    this.element.classList.add('skribix');
	                }
	                else
	                {
	                    this.element.classList.add('skribix2');
	                }
	            case EDITORS.CKEDITOR4.VALUE:
	            case EDITORS.TINY_MCE.VALUE:
	                this.element.style.position = 'fixed';
	                break;
	        }
	        this.element.addEventListener('animationend', this._OnAnimationEnd.bind(this));
	        this._SetState(this.forceActivation ? Icon$2.STATES.INITIAL : Icon$2.STATES.HIDDEN);
	    }

	    Bind(callback){
	        this.element.addEventListener('click', callback);
	    }

	    Activate(isActivated = true) {
	        this.isActivated = isActivated;
	        if(!this.isActivated) this._SetState(this.forceActivation ? Icon$2.STATES.INITIAL : Icon$2.STATES.HIDDEN);
	    }

	    SetState(state){
	        if(this.isActivated) {
	            this._SetState(state);
	        }
	    }

	    _SetState(state) {
	        if(state !== this.state) {
	            this._Reset();
	            this.state = state;
	        }

	        switch(state) {
	            case Icon$2.STATES.INITIAL:
	                this._Initial();
	                break;
	            case Icon$2.STATES.WAITING:
	                this._Waiting();
	                break;
	            case Icon$2.STATES.CHECKED:
	                this._Checked();
	                break;
	            case Icon$2.STATES.ERROR:
	                this._Error();
	                break;
	            case Icon$2.STATES.HIDDEN:
	                this._Hidden();
	                break;
	            case Icon$2.STATES.WRITING:
	                this._Writing();
	                break;
	            case Icon$2.STATES.STOPPED_WRITING:
	                this._StoppedWriting();
	                break;
	            default:
	                this._Initial();
	                break;
	        }
	    }

	    _Initial() {}

	    _Waiting() {
	        this.mustContinueRotation = true;
	        this.element.removeAttribute('stopped-writing', '');
	        this.element.removeAttribute('writing', '');
	        this.element.setAttribute('rotating', '');

	    }

	    _Checked() {
	        this.mustContinueRotation = false;
	        this.element.setAttribute('checked', '');
	        setTimeout(this._Reset.bind(this), TIMEOUT_DURATION);
	    }

	    _Error() {
	        this.mustContinueRotation = false;
	        this.element.setAttribute('error', '');
	        setTimeout(this._Reset.bind(this), TIMEOUT_DURATION);
	    }

	    _Hidden() {
	        this.mustContinueRotation = false;
	        this.element.setAttribute('hidden', '');
	        this.element.removeAttribute('rotating');
	    }

	    _Writing(){
	        this.mustContinueRotation = false;
	        this.element.removeAttribute('stopped-writing', '');
	        this.element.setAttribute('writing', '');
	        this.element.removeAttribute('rotating');
	    }

	    _StoppedWriting(){
	        this.mustContinueRotation = false;
	        this.element.removeAttribute('writing', '');
	        this.element.setAttribute('stopped-writing', '');
	        this.element.removeAttribute('rotating');
	    }

	    _Reset()
	    {
	        this.mustContinueRotation = false;
	        this.element.removeAttribute('checked');
	        this.element.removeAttribute('error');
	        this.element.removeAttribute('hidden');
	        this.element.removeAttribute('writing');
	        this.state = Icon$2.STATES.INITIAL;
	    }

	    _OnAnimationEnd() {
	        this.element.removeAttribute('rotating');
	        if(this.mustContinueRotation)
	        {
	            void this.element.offsetWidth;
	            this.element.setAttribute('rotating', '');
	        }
	    }

	    
	};

	var Icon_1 = Icon$2;

	const DISPLAY_DURATION = 7000;

	let Toast$1 = class Toast
	{
	    constructor(code, message, context) {
	        this.code = code;
	        this.message = message;
	        this.context = context;
	        this.element = undefined;

	        this._Init();
	        setTimeout(this._Remove.bind(this), DISPLAY_DURATION);
	    }

	    _Init() {
	        this.element = this.context.RelativeDocument().createElement('div');
	        this.element.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.element.classList.add('cordial-toast');
	        this.context.RelativeDocument().body.appendChild(this.element);

	        switch(this.code){
	            case "000":
	            case "001":
	            case "002":
	            case "003":
	                console.log('Error data : code=' + this.code +' message=' + this.message);
	                this.element.textContent = "Vous semblez rencontrer des problèmes de connexion. Si le problème persiste, merci de contacter support-cordialweb@synapse-fr.com en indiquant votre login.";
	                break;
	            /*case "003":
	                this.element.textContent = "Vous n'êtes pas autorisé à utiliser le service, veuillez le signaler dans votre organisation pour régler le problème"
	                break;*/
	            case "network-error":
	                console.log('Error data : code=' + this.code +' message=' + this.message);
	                this.element.textContent = "Vous semblez rencontrer des problèmes de connexion. Si le problème persiste, merci de contacter support-cordialweb@synapse-fr.com en indiquant votre login.";
	                break;
	            default:
	                this.element.textContent = "Vous semblez rencontrer des problèmes de connexion. Si le problème persiste, merci de contacter support-cordialweb@synapse-fr.com en indiquant votre login.";
	                break;
	        }
	    }

	    _Remove() {
	        this.element.remove();
	    }
	};

	var Toast_1 = Toast$1;

	const IgnoredWords = IgnoredWords_1;
	const ToolBox$3 = ToolBox_1;
	const Icon$1 = Icon_1;
	const Toast = Toast_1;

	let Corrector$3 = class Corrector {
	    constructor(inputElement, context, backbone, textSourceElement = inputElement) {
	        this.inputElement = inputElement;
	        this.context = context;
	        this.textSourceElement = textSourceElement;
	        this.textSource = undefined;
	        this.backbone =  backbone;

	        this.res = undefined;
	        this.corrections = []; // list of corrections to be underlined / applied --> used in other components
	        this.overlay = null;
	        this.hasFinished = false;
	        
	        /** cachedCorrectionData is an array of cached info. Each element looks like
	        * {
	        *   text (string),
	        *   initialOffeset (int),
	        *   corrections (list correction objects)
	        * }
	        */
	        this.cachedCorrectionData = [];
	        this.newCachedCorrectionData = [];
	    }

	    TextSource() {
	        return this.textSource
	    }

	    Corrections() {
	        return this.corrections
	    }

	    ActiveCorrections() {
	        return this.corrections.filter(c => !c?.ignored && !c?.corrected)
	    }

	    CorrectionByID(id) {
	        return this.corrections.find((correction) => correction.cordialID === id)
	    }

	    CorrectionAlternativesByID(id) {
	        return this.CorrectionByID(id)?.alternatives?.alternative?.map((alt) => {
	            return ({ text : alt.text, type: this.CorrectionByID(id)?.type})
	        })
	    }

	    HasFinished() {
	        return this.hasFinished
	    }

	    SetOverlay(overlay) {
	        this.overlay = overlay;
	    }

	    SetCorrections(corrections) {
	        this.corrections = corrections;
	    }

	    UpdateTextSource(textSource) {
	        console.log("UpdateTextSource");
	        this.textSource = textSource;
	    }

	    async ReplaceWord(e) {
	        e.preventDefault();
	        this.hasFinished = false;

	        let correctedWord = e.target.parentNode.childNodes[1].textContent; //e.target.parentNode.children[1].innerHTML;
	        let correctionID = this.context.Modal().CorrectionID();
	        let correction = this.CorrectionByID(correctionID);

	        let position = correction.end;
	        let delta = correctedWord.length - (correction.end - correction.start);

	        console.log("> Corrections");
	        console.log(this.corrections);

	        this.corrections = this.corrections.map((correction) => {
	            if (correction.cordialID === correctionID) correction.corrected = true;
	            if (correction.start > position) {
	                correction.start += delta;
	                correction.end += delta;
	            }
	            return correction;
	        });

	        console.log("> Formatted corrections");
	        console.log(this.corrections);

	        switch (ToolBox$3.GetType(this.inputElement)) {
	            case TYPES.INPUT_TEXT.VALUE:
	            case TYPES.TEXTAREA.VALUE:
	                this._UpdateWordSourceElementText(correctedWord, correction?.start, correction?.end);
	                break;
	            case TYPES.EDITABLE_DIV.VALUE:
	            case TYPES.IFRAME.VALUE:
	                await this._UpdateWordSourceElementHTML(correctedWord, correction);
	                break;
	        }
	        e.preventDefault();
	        this.context.Modal().Close();

	        await this.overlay.LaunchCorrection(true, true);
	        this.hasFinished = true;
	    }

	    _UpdateWordSourceElementText(word, start, end) {
	        console.log("_UpdateWordSourceElementText");
	        let replaceWord = (text, word, start, end) => [text.slice(0, start), word, text.slice(start + (end - start))].join('');

	        let value = this.textSourceElement.value ? this.textSourceElement.value : '';
	        value = replaceWord(value, word, start, end);
	        this.UpdateTextSource(value);
	        this.textSourceElement.value = value;

	        const t = new DataTransfer;
	        t.setData("text/plain", value);
	        const s = new InputEvent("input", {
	            bubbles: !0,
	            cancelable: !0,
	            inputType: "insertText",
	            data: value,
	            dataTransfer: t
	        });
	        this.inputElement.dispatchEvent(s);

	        return value
	    }

	    async _UpdateWordSourceElementHTML(correctedWord, correction) {
	        let replacementStrategy = undefined;
	        let editor = ToolBox$3.GetEditor(this.context, this.textSourceElement);
	        console.log("editor", editor);
	        switch (editor) {
	            case EDITORS.PROSEMIRROR.VALUE:
	            case EDITORS.TINY_MCE.VALUE :
	            case EDITORS.SPEECH_TEXTER.VALUE :
	            case EDITORS.SFR_MAIL.VALUE :
	                replacementStrategy = this._replace1.bind(this);
	                break;
	            case EDITORS.TWITTER.VALUE :
	            case EDITORS.LEBONCOIN.VALUE :
	            case EDITORS.DRAFTEDITOR.VALUE :
	                replacementStrategy = this._replace3.bind(this);
	                break;
	            case EDITORS.GOOGLE_DOCS.VALUE :
	            case EDITORS.RAPID_TABLES.VALUE :
	            case EDITORS.WORDPRESS_VISUAL_BUILDER.VALUE:
	            case EDITORS.QUASAR.VALUE :
	                replacementStrategy = this._replace7.bind(this);
	                break;
	            case EDITORS.FACEBOOK.VALUE :
	                replacementStrategy = this._replace6.bind(this);
	                break;
	            case EDITORS.CKEDITOR.VALUE :
	            case EDITORS.CKEDITOR4.VALUE :
	                replacementStrategy = this._replace4.bind(this);
	                break;
	            case EDITORS.GMAIL.VALUE :
	            case EDITORS.ORANGE.VALUE :
	            case EDITORS.OUTLOOK_LIVE.VALUE :
	                replacementStrategy = this._replace5.bind(this);
	                break;
	            case EDITORS.DUDA.VALUE :
	                replacementStrategy = this._replace8.bind(this);
	                break;
	            default :
	                replacementStrategy = this._replace1.bind(this);
	                break;
	        }
	        console.log("Update Word on " + editor);
	        console.log(replacementStrategy);
	        await replacementStrategy(correctedWord, correction);

	        this.UpdateTextSource(this.textSourceElement.innerText);
	    }

	    //delete ranges exec command insert
	    async _replace1(correctedWord, correction) {
	        let selection = this.context.RelativeWindow().getSelection();
	        selection.removeAllRanges();
	        selection.addRange(correction.correctionRanges[0]);

	        for (let i = 1; i < correction.correctionRanges.length; i++) {
	            correction.correctionRanges[i].deleteContents();
	        }

	        this.context.RelativeDocument().execCommand("insertText", false, correctedWord);
	    }

	    /*    //exec command for delete and insert
	        async _replace2(correctedWord, correction) {
	            let selection = this.context.RelativeWindow().getSelection()
	            selection.removeAllRanges();
	            selection.addRange(correction.correctionRange)

	            this.context.RelativeDocument().execCommand('delete')
	            this.context.RelativeDocument().execCommand("insertText", false, correctedWord);
	        }*/

	    //twitter version
	    async _replace3(correctedWord, correction) {
	        const mud = new MouseEvent("mousedown", {bubbles: !0, cancelable: !1});
	        this.textSourceElement.dispatchEvent(mud);

	        let selection = this.context.RelativeWindow().getSelection();
	        selection.removeAllRanges();
	        let r = new Range();
	        r.setStart(correction.correctionRanges[0].linkedNode, correction.correctionRanges[0].startOffset);
	        r.setEnd(correction.correctionRanges[correction.correctionRanges.length - 1].linkedNode, correction.correctionRanges[correction.correctionRanges.length - 1].endOffset);
	        selection.addRange(r);

	        const mup = new MouseEvent("mouseup", {bubbles: !0, cancelable: !1});
	        this.textSourceElement.dispatchEvent(mup);


	        const t = new DataTransfer;
	        t.setData("text/plain", correctedWord);
	        const s = new window.InputEvent("beforeinput", {
	            bubbles: !0,
	            cancelable: !0,
	            inputType: "insertText",
	            data: correctedWord,
	            dataTransfer: t
	        });
	        this.textSourceElement.dispatchEvent(s) && this.context.RelativeDocument().execCommand("insertText", !1, correctedWord);
	    }

	    //letter by letter
	    async _replace4(correctedWord, correction) {
	        const wordLength = correction.correctionRanges.length;
	        const arrayCorrectedWord = correctedWord.split('');
	        const selection = this.context.RelativeWindow().getSelection();
	        let range = undefined;

	        for (let i = correction.correctionRanges.length - 1; i >= 1; i--) {
	            range = correction.correctionRanges[i];
	            if (range.startOffset === range.endOffset) {
	                range.setEnd(correction.node, range.endOffset + 1);
	            }
	            range.deleteContents();
	            selection.removeAllRanges();
	            selection.addRange(range);
	            if (arrayCorrectedWord[i]) {
	                if (i === correction.correctionRanges.length - 1 && arrayCorrectedWord.length > correction.correctionRanges.length) {
	                    this.context.RelativeDocument().execCommand("insertText", false, correctedWord.slice(i, correctedWord.length));
	                } else {

	                    this.context.RelativeDocument().execCommand("insertText", false, arrayCorrectedWord[i]);
	                }
	            }
	        }

	        if (wordLength === 1) {
	            selection.removeAllRanges();
	            selection.addRange(correction.correctionRanges[0]);
	            this.context.RelativeDocument().execCommand("insertText", false, correctedWord);
	        } else {
	            selection.removeAllRanges();
	            selection.addRange(correction.correctionRanges[0]);
	            this.context.RelativeDocument().execCommand("insertText", false, arrayCorrectedWord[0]);
	        }

	    }

	    //letter by letter with init cursor empty string
	    async _replace5(correctedWord, correction) {
	        let correctedWordTrim = correctedWord.trim();
	        const arrayCorrectedWord = correctedWordTrim.split('');
	        console.log(arrayCorrectedWord);

	        const selection = this.context.RelativeWindow().getSelection();
	        selection.removeAllRanges();
	        selection.addRange(correction.correctionRanges[0]);
	        this.context.RelativeDocument().execCommand("insertText", false, ""); //Insert empty charac for outlook cursor
	        let range = undefined;

	        //let endLoop = arrayCorrectedWord[0] === " " ? 1 : 0
	        //console.log(endLoop);
	        for (let i = correction.correctionRanges.length - 1; i >= 1; i--) {
	            range = correction.correctionRanges[i];
	            if (range.startOffset === range.endOffset) {
	                range.setEnd(correction.node, range.endOffset + 1);
	            }
	            range.deleteContents();
	            selection.removeAllRanges();
	            selection.addRange(range);

	            if (arrayCorrectedWord[i]) {
	                if (i === correction.correctionRanges.length - 1 && arrayCorrectedWord.length > correction.correctionRanges.length) {
	                    this.context.RelativeDocument().execCommand("insertText", false, correctedWord.slice(i, correctedWord.length));
	                } else {
	                    this.context.RelativeDocument().execCommand("insertText", false, arrayCorrectedWord[i]);
	                }
	            }
	        }

	        if (correction.correctionRanges.length === 1) {
	            selection.removeAllRanges();
	            selection.addRange(correction.correctionRanges[0]);
	            this.context.RelativeDocument().execCommand("insertText", false, correctedWord);
	        } else {
	            selection.removeAllRanges();
	            selection.addRange(correction.correctionRanges[0]);
	            this.context.RelativeDocument().execCommand("insertText", false, arrayCorrectedWord[0]);
	        }

	        if (correctedWord.split('')[0] === " ") {
	            selection.removeAllRanges();
	            selection.addRange(correction.correctionRanges[0]);
	            this.context.RelativeDocument().execCommand("insertText", false, " ");
	        }
	    }

	    //fb
	    _replace6(correctedWord, correction) {
	        return new Promise(function (resolve) {
	            let selection = this.context.RelativeWindow().getSelection();
	            selection.removeAllRanges();
	            let r = new Range();
	            r.setStart(correction.correctionRanges[0].linkedNode, correction.correctionRanges[0].startOffset);
	            r.setEnd(correction.correctionRanges[correction.correctionRanges.length - 1].linkedNode, correction.correctionRanges[correction.correctionRanges.length - 1].endOffset);
	            selection.addRange(r);

	            this.inputElement.focus();

	            setTimeout(function () {
	                this.context.RelativeDocument().execCommand("insertText", false, correctedWord);
	                resolve(true);
	            }.bind(this), 50);
	        }.bind(this))
	    }

	    async _replace7(correctedWord, correction) {
	        let r = new Range();
	        r.setStart(correction.correctionRanges[0].linkedNode, correction.correctionRanges[0].startOffset);
	        r.setEnd(correction.correctionRanges[correction.correctionRanges.length - 1].linkedNode, correction.correctionRanges[correction.correctionRanges.length - 1].endOffset);

	        let selection = this.context.RelativeWindow().getSelection();
	        let textNode = this.context.RelativeDocument().createTextNode(correctedWord);

	        selection.removeAllRanges();
	        selection.addRange(correction.correctionRanges[0]);

	        for (let i = 0; i < correction.correctionRanges.length; i++) {
	            correction.correctionRanges[i].deleteContents();
	        }

	        textNode = this.context.RelativeDocument().createTextNode(correctedWord);
	        r.insertNode(textNode);
	    }

	    // Duda
	    _replace8(correctedWord, correction) {
	        return new Promise(function (resolve) {
	            this.inputElement.focus();
	            let selection = this.context.RelativeWindow().getSelection();

	            selection.removeAllRanges();

	            let r = new Range();
	            r.setStart(correction.correctionRanges[0].linkedNode, correction.correctionRanges[0].startOffset);
	            r.setEnd(correction.correctionRanges[correction.correctionRanges.length - 1].linkedNode, correction.correctionRanges[correction.correctionRanges.length - 1].endOffset);
	            selection.addRange(r);

	            const t = new DataTransfer;
	            t.setData("text/plain", correctedWord);
	            const s = new window.InputEvent("beforeinput", {
	                bubbles: !0,
	                cancelable: !0,
	                inputType: "insertText",
	                data: correctedWord,
	                dataTransfer: t
	            });
	            this.textSourceElement.dispatchEvent(s) && this.context.RelativeDocument().execCommand("insertText", !1, correctedWord);

	            setTimeout(function () {
	                resolve(true);
	            }.bind(this), 100);
	        }.bind(this))
	    }


	    /**
	     * Correction implements a cache mechanism to avoid overloading the API when dealing with long texts.
	     * How it's done:
	     * Go through each paragraph:
	     * - if paragraph has been changed, if needs correction
	     * - if not, reapply cached corrections
	     * Note that:
	     * if N consecutive paragraphs have been changed, it's better to send only one request to the API rather than N requests
	     * howerver, those N paragraphs should be cached separately as next time, maybe only one of those paragraphs will need correction
	     * while the others remain unchanged.
	     * @param {string} textSource 
	     * @param {boolean} makeNewRequest 
	     * @param {boolean}  innerCorrectionStep  true when replacing a word with correction suggestion, it will be logged in a different stats index (as correction applied)
	     */
	    async Correct(textSource, makeNewRequest = true, innerCorrectionStep = false) {
	        if (makeNewRequest) this.Reset();
	        this.textSource = textSource;

	        var paragraphs = textSource.split("\n"); // split text into paragraphs
	        var initialOffset = 0; // tmp var that will help us know the offset of each paragraph
	        var correctedPrevious = false; // boolean that tells us whether a paragraph before the current one has been modified

	        // use a temp variable to merge together all consecutive paragraphs that need correction
	        // so that we can send only one request to the API with N paragraphs
	        var forCorrection = undefined;

	        this.corrections =  [];

	        // first cut the text into paragraphs and check for which ones have changed / which one are identical (since last correction)
	        for (let i = 0; i < paragraphs.length; i++) {
	            var currentParagraph = paragraphs[i];
	            var cachedParagraph = undefined;

	            // get cached paragraph if exists
	            if (this.cachedCorrectionData !== undefined && i < this.cachedCorrectionData.length) {
	                cachedParagraph = this.cachedCorrectionData[i].text;
	            }
	            
	            // if no cache OR cache exists but paragraph changed --> need correction
	            if (cachedParagraph === undefined || currentParagraph !== cachedParagraph) { 
	                correctedPrevious = true;
	                
	                //append paragraph data to "forCorrection" var
	                if (forCorrection === undefined) { // first paragraph
	                    forCorrection = {
	                        mergedText: currentParagraph, 
	                        initialOffset: initialOffset
	                    };
	                } 
	                else { // not first paragraph; append to forCorrection
	                    forCorrection.mergedText += "\n" + currentParagraph;
	                }
	            }
	            else { // don't need correction
	                // send previous blocks for correction
	                if (forCorrection !== undefined && forCorrection.mergedText && forCorrection.mergedText.trim()){
	                    await this.RequestCorrection(forCorrection.mergedText, forCorrection.initialOffset, makeNewRequest, innerCorrectionStep);
	                }
	                // get cached corrections for current paragraph
	                var currentParagraphCorrections = ToolBox$3.DeepCopy(this.cachedCorrectionData[i].corrections);
	                if (correctedPrevious){ 
	                    // shift current paragraph's corrections if necessary
	                    currentParagraphCorrections?.forEach(cor => this.ShiftCorrection(cor, initialOffset));
	                }
	                // put current paragraph's corrections in corrections list if there are any
	                if (currentParagraphCorrections !== undefined && currentParagraphCorrections !== []) {
	                    this.corrections = this.corrections.concat(currentParagraphCorrections);
	                } 
	                // push to new cache data
	                this.newCachedCorrectionData.push({text: currentParagraph, initialOffset: initialOffset, corrections: currentParagraphCorrections});
	                // re-init forCorrection
	                forCorrection = undefined;
	            }

	            initialOffset += (currentParagraph.length + 1);
	        }
	        if (forCorrection !== undefined && forCorrection.mergedText && forCorrection.mergedText.trim()) {
	            await this.RequestCorrection(forCorrection.mergedText, forCorrection.initialOffset, makeNewRequest, innerCorrectionStep);
	        }

	        this.cachedCorrectionData = this.newCachedCorrectionData;
	        // console.log("this.newCachedCorrectionData", this.newCachedCorrectionData)
	        this.newCachedCorrectionData = [];
	        this.hasFinished = true;
	    }

	    /**
	     * Call correction API and process result.
	     * @param {string} textSource 
	     * @param {int} initialOffset actual offset of the text to be corrected
	     * @param {boolean} makeNewRequest 
	     * @param {boolean} innerCorrectionStep  
	     */
	    async RequestCorrection(textSource, initialOffset, makeNewRequest = true, innerCorrectionStep  = false){
	        var localCorrections = [];
	        if (textSource !== ""){
	            console.log("Request correction for\n---\n", textSource.substring(0,200));
	    
	            this.res = makeNewRequest ? await this._Request(textSource, innerCorrectionStep ) : this.res;
	            this.res?.corrected?.sentences?.sentence?.map(function (sentence) {
	                sentence?.errors?.error?.map((error) => {
	                    let word = this._GetWord(textSource, error.start, error.end);
	                    if (IgnoredWords.Includes(word)) error.ignored = true;
	                    let errorUpdated = {
	                        ...error,
	                        alternatives: {
	                            alternative: error.alternatives?.alternative?.filter((alt) => alt.text !== word)
	                        }
	                    };
	                    errorUpdated.startWithoutOffset = errorUpdated.start;
	                    errorUpdated.endWithoutOffest = errorUpdated.end;
	                    // start and end will be used to underline / apply corrections. They should correspond to the actual position of the word 
	                    // (not the position relative to the beginning of the paragraph)
	                    errorUpdated.start += initialOffset;
	                    errorUpdated.end += initialOffset;
	                    let cor = {cordialID: this._GenerateID(), textSource: textSource, ...errorUpdated};
	                    localCorrections.push(cor);
	                    if (makeNewRequest) {
	                        this.corrections.push(cor); 
	                    }
	                });
	            }.bind(this));
	    
	            this.CacheCorrectionsParagraphByParagraph(textSource, initialOffset, ToolBox$3.DeepCopy(localCorrections));
	        }
	    }

	    /**
	     * 
	     * @param {*} textSource 
	     * @param {*} initialOffset 
	     * @param {*} correctionsArr 
	     */
	    CacheCorrectionsParagraphByParagraph(textSource, initialOffset, correctionsArr){        
	        var paragraphs = textSource.split("\n");
	        var beginParagraph = undefined;
	        var endParagraph = initialOffset - 1;
	        // hot through each paragraph
	        paragraphs.forEach((paragraph) => {
	            beginParagraph = endParagraph + 1;
	            endParagraph = beginParagraph + paragraph.length;
	            var correctionsAssignedToParagraph = []; // tmp var to store corrections applied to current paragraph and remove them from the list of "available" corrections
	            correctionsArr.forEach((correction) => {
	                if (correction.start >= beginParagraph && correction.end <= endParagraph) { // correction belongs to paragraph
	                    correction.startWithoutOffset = correction.start - beginParagraph;
	                    correction.endWithoutOffset = correction.end - beginParagraph;
	                    correctionsAssignedToParagraph.push(correction);
	                }
	            });
	            this.newCachedCorrectionData.push({
	                text: paragraph,
	                initialOffeset: beginParagraph,
	                corrections: correctionsAssignedToParagraph
	            });
	            correctionsArr = correctionsArr.filter(item => !correctionsAssignedToParagraph.includes(item));
	        });
	        if (correctionsArr.length > 0) {
	            console.log("ERROR, some corrections are not assigned to any paragraph");
	            console.log(correctionsArr);
	            console.log(textSource);
	        }
	    }

	    LoadCorrections() {
	        let self = this;
	        this.corrections.forEach((correction) => {
	            let word = self._GetWord(self.textSource, correction.start, correction.end);
	            if (IgnoredWords.Includes(word)) correction.ignored = true;
	        });
	    }

	    ShiftCorrection(item, newOffset) {
	        console.log("shift", item, newOffset);
	        item.start = item.startWithoutOffset + newOffset;
	        item.end = item.endWithoutOffset + newOffset;
	    }

	    /**
	     * Get the origin word targeted by the correction
	     */
	    _GetWord(textSource, start, end) {
	        return textSource.slice(start, end);
	    }

	    _GenerateID() {
	        return "cordial-" + Math.random().toString(36).substr(2, 9);
	    }

	    
	    _Request(textSource, innerCorrectionStep  = false) {
	        return new Promise((resolve, reject) => {
	            const response = this.backbone.sendCorrectionRequest(textSource,innerCorrectionStep );
	            if (!response || response.error) {
	                this.overlay.Icon().SetState(Icon$1.STATES.ERROR);
	                new Toast(response?.status, response?.message, this.context);
	                console.log("ERROR", response);
	                reject(new Error("internal_error"));

	            } else {
	                console.log("Res : correction", response);
	                resolve(response);
	            }
	        });
	    }

	    IgnoreCorrection(id) {
	        let error = this.CorrectionByID(id);
	        let word = this._GetWord(this.textSource, error.start, error.end);
	        IgnoredWords.Add(word);
	    }

	    Reset() {
	        console.log("Reset corrector");
	        this.textSource = null;
	        this.corrections = [];
	        this.hasFinished = false;
	    }

	    Destroy() {
	        delete this.inputElement;
	        this.context?.Destroy();
	        delete this.context;
	        delete this.textSourceElement;
	        delete this.textSource;
	        delete this.backbone;

	        delete this.res;
	        delete this.corrections; // list of corrections to be underlined / applied --> used in other components
	        delete this.overlay;
	        delete this.hasFinished;
	        delete this.cachedCorrectionData;
	        delete this.newCachedCorrectionData;
	    }
	};

	var Corrector_1 = Corrector$3;

	let Underliner$2 = class Underliner
	{
	    constructor() {}

	    GetTypeErrorClass(type) {
	        return type === "spell" ? "cordial-error-spell" : "cordial-error-grammar"
	    }
	};

	var Underliner_1 = Underliner$2;

	const Underliner$1 = Underliner_1;

	let UnderlinerText$1 = class UnderlinerText extends Underliner$1
	{
	    OutputText() { return this.outputText }

	    constructor(sourceText, corrections) {
	        super();
	        this.sourceText = sourceText;
	        this.outputText = "";
	        this.corrections = corrections;
	    }

	    /***
	     * Underline the corrections
	     */
	    Underline() {
	        let startOffset = 0;
	        let endOffset = 0;

	        for (let i = this.corrections.length - 1; i >= 0; i--) {
	            if (i === this.corrections.length - 1) {
	                // Last intermediate text frag normalization
	                this._Normalize(this.corrections[i].end + endOffset);
	            } else {
	                // Intermediate text frag normalization
	                this._Normalize(this.corrections[i].end + startOffset, this.corrections[i + 1].start);
	            }

	            this._AddToOutput("</span>");
	            this._Normalize(this.corrections[i].start, this.corrections[i].end);
	            this._AddToOutput(`<span class="cordial-element ${this.GetTypeErrorClass(this.corrections[i].type)}" data-cordial-id="${this.corrections[i].cordialID}">`);

	            if (i === 0) {
	                // First intermediate text frag normalization
	                this._Normalize(0, this.corrections[i].start);
	            }
	        }
	    }

	    /***
	     * Normalize a text fragment for display purposes
	     * @param start (startIndex of the text fragment)
	     * @param end (endIndex of the text fragment)
	     */
	    _Normalize(start, end = this.sourceText.length) {
	        let textFrag = this.sourceText.slice(start + 0, end + 0);

	        textFrag = textFrag.split('<').join('&lt;');
	        textFrag = textFrag.split('>').join('&gt;');
	        textFrag = textFrag.replace(/\n|\r/g, '<br/>');
	        textFrag = textFrag.replace(/\s/g, '<span> </span>');

	        this._AddToOutput(textFrag);
	    }

	    /***
	     * Add a text fragment to the output
	     * @param frag (text fragment)
	     */
	    _AddToOutput(frag) {
	        this.outputText = frag + this.outputText;
	    }
	};

	var UnderlinerText_1 = UnderlinerText$1;

	const Underliner = Underliner_1;
	const ToolBox$2 = ToolBox_1;

	let UnderlinerHtml$1 = class UnderlinerHtml extends Underliner {
	  constructor(sourceText, element, layerElement, corrections, context, editor) {
	    super();
	    this.sourceText = sourceText;
	    this.element = element;
	    this.layerElement = layerElement;
	    this.corrections = corrections;
	    this.context = context;
	    this.editor = editor;
	  }

	  Corrections() {
	    return this.corrections
	  }

	  Underline() {
	    let corrections = this.corrections.sort((c1, c2) => c1.start - c2.start).map(c => {
	      delete c.correctionRange;
	      delete c.correctionRanges;
	      delete c.node;
	      return c
	    });
	    let insideCorrection = false;
	    let indexCorrection = 0;
	    let searchRange = this.context.RelativeDocument().createRange();
	    let offsetRange = 0;

	    //We get all flattened child nodes
	    let allTextNodes = this._ComputeFlattenedTextNodes(this.element);
	    let textNodeIndex = 0;

	    /**
	     * We iterate over the ranges and the nextNodes to get the next range
	     */
	    let setPositionOnFutureTextNodeLetter = () => {
	      //If we arrive to the end of the text node, we go to the next one and reset or we stop
	      while (offsetRange + 1 > allTextNodes[textNodeIndex]?.length) {
	        if (allTextNodes.length >= textNodeIndex + 1) {
	          textNodeIndex++;
	          offsetRange = 0;
	        } else {
	          //We come to an end
	          break;
	        }
	      }
	    };

	    /**
	     * Iterate over ranges to skip ranges with bad characters
	     */
	    let skipBadCharacters = (endCorrection) => {
	      //Skip backslash n
	      do {
	        searchRange.setStart(allTextNodes[textNodeIndex], offsetRange);
	        searchRange.setEnd(allTextNodes[textNodeIndex], offsetRange + 1);
	        if (ToolBox$2.IsExcludedCharacter(searchRange.toString())) {
	          if (insideCorrection && !endCorrection) {
	            corrections[indexCorrection].correctionRanges.push(this._GenerateRangeAndUnderlineLetter(corrections[indexCorrection], allTextNodes[textNodeIndex], offsetRange));
	          }
	          offsetRange++;
	          setPositionOnFutureTextNodeLetter();
	        }
	      } while (ToolBox$2.IsExcludedCharacter(searchRange.toString()))
	    };

	    /**
	     * Update corrections
	     * @param z (letterIndex)
	     */
	    let handleCorrectionsForLetter = (z) => {
	      //If we are inside a correction
	      if (z >= corrections[indexCorrection]?.start) {
	        insideCorrection = true;
	        //If we havent started the correction
	        if (!corrections[indexCorrection].correctionRanges) {
	          corrections[indexCorrection].correctionRanges = [];
	          corrections[indexCorrection].node = allTextNodes[textNodeIndex];
	        }

	        //If we're in the end of the correction
	        if (z >= corrections[indexCorrection].end) {
	          //console.log("CORRECTION END / ", "z : ", z, "corrections.end", corrections[indexCorrection].end, "rangeString", searchRange.toString())
	          insideCorrection = false;
	          indexCorrection++;
	          handleCorrectionsForLetter(z);
	        } else {
	          //console.log("DURING CORRECTION / ", "z : ", z, "corrections.end", corrections[indexCorrection].end, "rangeString", searchRange.toString())
	          corrections[indexCorrection].correctionRanges.push(this._GenerateRangeAndUnderlineLetter(corrections[indexCorrection], allTextNodes[textNodeIndex], offsetRange));
	        }
	      }

	    };

	    let sourceTextLetters = this.sourceText.split("");
	    for (let z = 0; z < sourceTextLetters.length; z++) {
	      try {
	        setPositionOnFutureTextNodeLetter();
	        searchRange.setStart(allTextNodes[textNodeIndex], offsetRange);
	        searchRange.setEnd(allTextNodes[textNodeIndex], offsetRange + 1);
	        skipBadCharacters(z >= corrections[indexCorrection].end);

	        //We found the letter inside innerText of a node
	        if (this._IsSameCharacter(searchRange.toString(), sourceTextLetters[z])) {
	          handleCorrectionsForLetter(z);
	          offsetRange++;
	        }
	      } catch (e) {
	        //console.log(e)
	      }
	    }

	    this.corrections = corrections;
	  }

	    /**
	   * Checks equality between two chars
	   * Takes into account special characters like \n and \r which are equivalent
	   */
	  _IsSameCharacter(char1, char2) {
	    return (char1 === char2) || (char1 === "\n" && char2 === "\r") || (char1 === "\r" && char2 === "\n");
	  }

	  _ComputeFlattenedTextNodes(rootNode) {
	    let flattenedTextNodes = [];
	    this._SearchAndGetTextChildNodes(rootNode, flattenedTextNodes);
	    return flattenedTextNodes;
	  }

	  _SearchAndGetTextChildNodes(node, flattenedTextNodes) {
	    if (ToolBox$2.IsTextNode(node) && !this._IsBlackListedNode(node)) {
	      flattenedTextNodes.push(node);
	    } else {
	      if (node.childNodes) {
	        node.childNodes.forEach(function (childNode) {
	          this._SearchAndGetTextChildNodes(childNode, flattenedTextNodes);
	        }.bind(this));
	      }
	    }
	  }

	  /**
	   * Defines cases in which text node has to be ignored
	   * @param {*} node a parsed text node
	   */
	  _IsBlackListedNode(node){
	    let isBlackListed = false;

	    // General checks

	    // If node only contains \r, ignore it
	    if (node.wholeText === '\r')
	      return true;

	    // Editor specific checks
	    switch(this.editor){
	      case EDITORS.DRAFTEDITOR.VALUE:
	        isBlackListed = (node.parentNode !== undefined && node.parentNode.className !== undefined && node.parentNode.className.includes("image-component-dimensions"));
	        break;
	    }
	    return isBlackListed;
	  }

	  _GenerateRangeAndUnderlineLetter(correction, node, offset) {
	    let range = null;
	    try {
	      range = this.context.RelativeDocument().createRange();
	      range.setStart(node, offset);
	      range.setEnd(node, offset + 1);
	      range.linkedNode = node;
	      let nodePos = range.getClientRects()[0];
	      let elementPos = this.element.getBoundingClientRect();
	      let underlineElement = this.context.RelativeDocument().createElement('div');

	      if (elementPos && underlineElement && nodePos){
	        underlineElement.setAttribute("data-cordial-id", correction.cordialID);
	        underlineElement.classList.add('cordial-element', this.GetTypeErrorClass(correction.type));
	        if (this.editor === EDITORS.DUDA.VALUE) underlineElement.classList.add('duda');
	        underlineElement.style.top = (nodePos.top - elementPos.top) + "px";
	        underlineElement.style.left = (nodePos.left - elementPos.left) + "px";
	        underlineElement.style.width = nodePos.width + "px";
	        underlineElement.style.height = nodePos.height + "px";
	        this.layerElement.appendChild(underlineElement);
	      }
	    } catch (e) {
	      console.log(e);
	    }
	    return range
	  }

	};

	var UnderlinerHtml_1 = UnderlinerHtml$1;

	const ToolBox$1 = ToolBox_1;
	const Icon = Icon_1;
	const UnderlinerText = UnderlinerText_1;
	const UnderlinerHtml = UnderlinerHtml_1;

	const  DEFAULT_UPDATE_INTERVAL = 500; 
	const  FAST_UPDATE_INTERVAL = 20; 
	const RESIZE_DEBOUNCE_MS = 250;


	const excludedInputContainers = [
	    "aLF-aPX-aPF aLF-aPX-bhI" // Gmail attachment preview container case
	];

	let Overlay$3 = class Overlay {
	    Icon() { return this.icon }
	    IsFocus() { return this.containerElement.hasAttribute('focus') }

	    constructor(inputElement, context, backbone, textSourceElement = inputElement) {
	        this.inputElement = inputElement;
	        this.context = context;
	        this.backbone = backbone;
	        this.inputContainerElement = inputElement.parentNode;
	        this.updateInterval = DEFAULT_UPDATE_INTERVAL;
	        //If inputElement is iFrame, textSourceElement is different
	        this.textSourceElement = textSourceElement;
	        this.inputElementComputedStyle = undefined;

	        this.editor = ToolBox$1.GetEditor(this.context, this.textSourceElement);
	        if (this.editor === EDITORS.DUDA.VALUE && !this.context.Modal().GetCross()) this.context.Modal().AddCross();

	        this.inputElement.addEventListener('click', this._OnInputClick.bind(this));
	        this.inputElement.addEventListener('scroll' , this._ChangeUpdateInterval.bind(this));
	        this.previousTextSourceInnerText = this._GetSourceInnerText();
	        this.previousTextSourceInnerTextAtPause = this._GetSourceInnerText();
	        this.previousTextSourceInnerHTML = undefined;

	        this.containerElement = undefined;
	        this.layerElement = undefined;
	        this.icon = undefined;
	        this.corrector = undefined;
	        this.underliner = undefined;

	        this.lastPressedKeyTime = undefined;
	        this.updateTimeout = null;

	        this.pause = false;

	        this._Init();
	        this._CreateIcon();

	        if (this.backbone.IsAutomaticCorrectionActivated()) {
	            this.backbone.SetCorrectionToBeLogged(true);
	            this._AddKeyboardListenerAutoCorrect();
	            this.isFirstCorrection = true;
	            this.icon.Activate(false);
	        }else {
	            this._AddKeyboardListenerStoppedWriting();
	            this._AddKeyboardListenerWriting();
	        }

	        this._CreateContainer();

	        this.skipResizeCallback = true; // avoid the first trigger of resize observer callback  (this observer tigger callback when it's initialized even if element didn't change)
	        this.resizeObserver = new ResizeObserver(ToolBox$1.Debounce(this._OnInputElementResize.bind(this), RESIZE_DEBOUNCE_MS));
	        this.resizeObserver.observe(this.inputElement);

	        this.updateHasBeenLaunched = false;

	        
	    }


	    _Init() {
	        if ((!this.inputContainerElement.style.position || this.inputContainerElement.style.position === "static") 
	        && !excludedInputContainers.includes(this.inputContainerElement.className)){
	            this.inputContainerElement.style.setProperty("position", "relative", "important");
	        } 
	        this._RemoveOldContainerElement();
	        this._DisableDefaultBehaviour(this.inputElement);
	    }

	    _OnInputElementResize() {
	        if(!this.skipResizeCallback){
	            if(!this.layerElement){
	                this._CreateLayer(this._GetSourceInnerText());
	            }
	            this.ShowCorrections();
	        }
	        else {
	            this.skipResizeCallback = false;
	        }
	    }

	    _RemoveOldContainerElement() {
	        let oldContainerElement = this.inputElement.nextSibling;
	        if (oldContainerElement && oldContainerElement.hasAttribute
	            && oldContainerElement.matches('.cordial-container')) {
	            oldContainerElement.remove();
	        }
	    }

	    _DisableDefaultBehaviour(HTMLElement) {
	        HTMLElement.setAttribute("autocorrect", "off");
	        if (this._iOS()) {
	            HTMLElement.setAttribute("spellcheck", "true");
	        } else {
	            HTMLElement.setAttribute("spellcheck", "false");
	        }
	        HTMLElement.setAttribute("autocapitalize", "false");
	    }


	    _AddKeyboardListenerAutoCorrect() {
	        var overlay = this;
	        ['keyup', 'paste'].forEach(element => {
	            this.inputElement.addEventListener(element, (e) => {

	                this._ResetLayerElement();
	                if (this.corrector !== undefined) this.corrector.hasFinished = false;

	                overlay.lastPressedKeyTime = Date.now();

	                setTimeout(function () {
	                    var currentTime = Date.now();
	                    if (currentTime - overlay.lastPressedKeyTime >= overlay.backbone.GetAutomaticCorrectionTimeMs()) {
	                        overlay.LaunchCorrection(true, false).then();
	                        if (overlay.isFirstCorrection) {
	                            overlay.isFirstCorrection = false;
	                        }
	                        if (!overlay.backbone.IsCorrectionToBeLogged()) {
	                            overlay.backbone.SetCorrectionToBeLogged(true);
	                        }

	                    }
	                }, overlay.backbone.GetAutomaticCorrectionTimeMs());
	            });
	        });
	    }


	    _AddKeyboardListenerStoppedWriting() {
	        var overlay = this;
	        ['keyup', 'paste'].forEach(element => {
	            this.inputElement.addEventListener(element, (e) => {
	                overlay.lastPressedKeyTime = Date.now();
	                setTimeout(() => {
	                    var currentTime = Date.now();
	                    if (currentTime - overlay.lastPressedKeyTime >= 500 ) {
	                        overlay.icon.SetState(Icon.STATES.STOPPED_WRITING);
	                    }
	                }, 500);
	            });
	        });
	    }

	    _AddKeyboardListenerWriting () {
	        ['keydown', 'paste'].forEach(element => {
	            this.inputElement.addEventListener(element, (e) => {
	                this.icon.SetState(Icon.STATES.WRITING);    
	            });
	        });
	    }




	    _CreateIcon() {
	        this.icon = new Icon(this.context);
	        this.icon.Bind(this.LaunchCorrection.bind(this));
	    }

	    _CreateContainer() {
	        this.containerElement = this.context.RelativeDocument().createElement('div');
	        this.containerElement.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.containerElement.classList.add('cordial-container');
	        this._SetContainerPosition();
	        this.inputContainerElement.insertBefore(this.containerElement, this.inputElement.nextSibling);
	        this.containerElement.appendChild(this.icon.Element());
	    }

	    _SetContainerPosition(){
	       
	        let computedInputParentStyle = this.context.RelativeWindow().getComputedStyle(this.inputContainerElement);
	        let computedInputStyle = this.context.RelativeWindow().getComputedStyle(this.inputElement);
	        Array.from(computedInputParentStyle).forEach(key => {
	            if (CSS_KEYS.CONTAINER.includes(key)) {
	                this.containerElement.style.setProperty(key, computedInputParentStyle.getPropertyValue(key), computedInputParentStyle.getPropertyPriority(key));
	            }
	            this._HandleContainerCustomCases();
	        });
	        this.containerElement.style.setProperty("top", this.inputElement.offsetTop+"px");
	        this.containerElement.style.setProperty("left", this.inputElement.offsetLeft+"px");
	        this.containerElement.style.setProperty("height", computedInputStyle.height);
	        this.containerElement.style.setProperty("width", computedInputStyle.width);
	        if(computedInputStyle.zIndex && computedInputStyle.zIndex !== "auto"){
	            this.containerElement.style.zIndex =  computedInputStyle.zIndex;
	        }
	       
	    }

	    /**
	     * Handle specific editors/websites cases in which we must slightly adapt container style
	     */
	    _HandleContainerCustomCases(){
	        switch(this.editor){
	            case EDITORS.DRAFTEDITOR.VALUE:
	            case EDITORS.PROSEMIRROR.VALUE:
	                if(this.inputElement.baseURI?.includes("hubspot"))
	                {
	                    this.containerElement.style.height = this.inputElement.scrollHeight + "px";
	                }
	                break;
	        }
	    }

	    SetCorrector(corrector) {
	        this.corrector = corrector;
	    }

	    _CreateLayer() {
	        // Create layer
	        this.layerElement = this.context.RelativeDocument().createElement('div');
	        this.layerElement.contentEditable = true;
	        this._DisableDefaultBehaviour(this.layerElement);
	        this.layerElement.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.layerElement.classList.add('cordial-layer');
	        this._SetLayerElementPosition();
	        
	        switch (ToolBox$1.GetType(this.inputElement)) {
	            case TYPES.INPUT_TEXT.VALUE:
	                this.layerElement.classList.add('cordial-input');
	                break;
	            case TYPES.TEXTAREA.VALUE:
	                this.layerElement.classList.add('cordial-textarea');
	                break;
	            case TYPES.EDITABLE_DIV.VALUE:
	                this.layerElement.classList.add('cordial-editablediv');
	                break;
	            case TYPES.IFRAME.VALUE:
	                this.layerElement.classList.add('cordial-iframe');
	                break;
	        }
	        Array.from(this.inputElementComputedStyle).forEach(key => {
	            if (CSS_KEYS.LAYER.includes(key)) {
	                if (key.includes('margin')
	                    && this.inputElementComputedStyle.getPropertyValue(key)
	                    && this.inputElementComputedStyle.getPropertyValue(key)[0] === '-') ;
	                 else if (ToolBox$1.GetType(this.inputElement) === TYPES.TEXTAREA.VALUE && key.includes("margin")); 
	                else {
	                    this.layerElement.style.setProperty(key, this.inputElementComputedStyle.getPropertyValue(key), this.inputElementComputedStyle.getPropertyPriority(key));
	                }
	            }
	        });
	        this.containerElement.appendChild(this.layerElement);

	        // Auto update
	        if (!this.updateHasBeenLaunched) this.Update();
	    }


	    Update() {
	        if (this.backbone.currentTabActive) {
	            this.updateHasBeenLaunched = true;

	            this._HandleContainerCustomCases();
	            this._SetLayerElementPosition();
	            this._SetContainerPosition();

	            // Update layer value based on input value
	            switch (ToolBox$1.GetType(this.inputElement)) {
	                case TYPES.INPUT_TEXT.VALUE:
	                case TYPES.TEXTAREA.VALUE:
	                    //If the text has changed (the user has written for example) we reset
	                    if (this.corrector.TextSource() != null && this.textSourceElement.value !== this.corrector.TextSource()) {
	                        console.log(this.textSourceElement.value);
	                        console.log(this.corrector.TextSource());
	                        this._Reset();
	                    }
	                    break;
	                case TYPES.EDITABLE_DIV.VALUE:
	                case TYPES.IFRAME.VALUE:
	                    if (this.corrector.HasFinished()) {
	                        let compare = ToolBox$1.CompareStrings(this.textSourceElement.innerText, this.corrector.TextSource(), this.editor);
	                        if (compare) {
	                            if (compare === "NEW_PAGE") {
	                                console.log("relaunch correction new page");
	                                this.LaunchCorrection(true, false).then();
	                            } else {
	                                if (this.textSourceElement.innerHTML !== this.previousTextSourceInnerHTML) {
	                                    this.ShowCorrections();
	                                }
	                            }
	                        } else {
	                            console.log("Change detected... Reset");
	                            this._Reset();
	                        }
	                    }
	                    this.previousTextSourceInnerHTML = this.textSourceElement.innerHTML;
	                    break;
	            }
	            this.previousTextSourceInnerText = this._GetSourceInnerText();
	        }

	        this.updateTimeout = setTimeout(this.Update.bind(this), this.updateInterval);
	    }

	    _SetLayerElementPosition(){
	        this.inputElementComputedStyle = this.context.RelativeWindow().getComputedStyle(this.inputElement);

	        // Update style
	        this.layerElement.style.width = this.inputElement.scrollWidth + "px";
	        this.layerElement.style.height = this.inputElement.scrollHeight + "px";
	        this.layerElement.style.transform = "translate(" + (-this.inputElement.scrollLeft) + "px," + (-this.inputElement.scrollTop) + "px)";
	        
	        switch (this.editor) {
	            case EDITORS.PROSEMIRROR.VALUE:
	            case EDITORS.CKEDITOR.VALUE:
	            case EDITORS.WORDPRESS.VALUE:
	            case EDITORS.PIPEDRIVE.VALUE:
	            case EDITORS.GOOGLE_DOCS.VALUE:
	            case EDITORS.RAPID_TABLES.VALUE:
	                this.layerElement.style.top = (this.inputElement.offsetTop - parseInt(this.inputElementComputedStyle.getPropertyValue('margin-top'))) + "px";
	                this.layerElement.style.left = (this.inputElement.offsetLeft - parseInt(this.inputElementComputedStyle.getPropertyValue('margin-left'))) + "px";
	                break;
	            case EDITORS.INSIGHTLY.VALUE:
	            case EDITORS.JOOMLA.VALUE:
	                this.layerElement.style.margin = '0 0 0 0';
	                break;
	            case EDITORS.SKRIBIX.VALUE:
	                if (!this.inputElement.matches(".cke_editable")) {
	                    this.layerElement.style.margin = '0 0 0 0';
	                }
	                this.layerElement.style.top = "0px";
	                this.layerElement.style.left = "0px";
	            default:
	                this.layerElement.style.top = "0px";
	                this.layerElement.style.left = "0px";
	                break;
	        }
	    }

	    _GetSourceInnerText() {
	        let value = "";
	        switch (ToolBox$1.GetType(this.inputElement)) {
	            case TYPES.INPUT_TEXT.VALUE:
	            case TYPES.TEXTAREA.VALUE:
	                value = this.textSourceElement.value ? this.textSourceElement.value : '';
	                break;
	            case TYPES.EDITABLE_DIV.VALUE:
	            case TYPES.IFRAME.VALUE:
	                value = this.textSourceElement.innerText ? this.textSourceElement.innerText : '';
	                break;
	        }
	        return value
	    }

	    async LaunchCorrection(makeNewRequest = true, innerCorrectionStep  = false) {
	        console.log('Launching correction...');
	        let innerText = this._GetSourceInnerText();
	        if (innerText) {
	            this.icon.SetState(Icon.STATES.WAITING);
	            await this.corrector.Correct(innerText, makeNewRequest, innerCorrectionStep);
	            this._ResetLayerElement();
	            if (this.corrector.ActiveCorrections().length > 0) {
	                this.ShowCorrections();
	            }
	            else {
	                this.icon.SetState(Icon.STATES.CHECKED);
	            }
	        }
	        else {
	            this.icon.SetState(Icon.STATES.WAITING);
	            this.icon.SetState(Icon.STATES.CHECKED);
	        }
	    }

	    _ResetLayerElement() {
	        if (this.layerElement) this.layerElement.remove();
	        this._CreateLayer(this._GetSourceInnerText());
	    }

	    ShowCorrections() {
	        if (this.layerElement !== this.undefined) {
	            this.layerElement.innerHTML = "";
	            console.log(this.corrector.Corrections());

	            switch (ToolBox$1.GetType(this.inputElement)) {
	                case TYPES.INPUT_TEXT.VALUE:
	                case TYPES.TEXTAREA.VALUE:
	                    this.underliner = new UnderlinerText(this._GetSourceInnerText(), this.corrector.ActiveCorrections());
	                    this.underliner.Underline();
	                    this.layerElement.innerHTML = this.underliner.OutputText();
	                    break;
	                case TYPES.EDITABLE_DIV.VALUE:
	                case TYPES.IFRAME.VALUE:
	                    this.underliner = new UnderlinerHtml(this._GetSourceInnerText(), this.textSourceElement, this.layerElement, this.corrector.ActiveCorrections(), this.context, this.editor);
	                    this.underliner.Underline();
	                    this.corrector.SetCorrections(this.underliner.Corrections());
	                    break;
	            }

	            if (this.editor === EDITORS.DUDA.VALUE)
	                this.inputElement.addEventListener('click', this._ManageDuda.bind(this));
	            
	            this.corrector.ActiveCorrections().map((correction) => correction.cordialID).forEach((id) => {
	                const elements = this.context.DomParser().QuerySelectorAll(`[data-cordial-id=${CSS.escape(id)}]`, this.context.RelativeDocument());
	                if (elements && elements.length) {
	                    elements.forEach(element => element.addEventListener('mousedown', this._OpenModal.bind(this)));
	                    // avoid openning keyboard when clicking on underlined error
	                    if(this._iOS()){
	                        elements.forEach(element => element.addEventListener("mousedown", function(event) {
	                            event.preventDefault();
	                            document.activeElement.blur();
	                        }));
	                    }
	                }
	            });
	            this.icon.SetState(this.corrector.ActiveCorrections().length > 0 ? Icon.STATES.HIDDEN : Icon.STATES.INITIAL);
	        }
	    }

	    _ManageDuda(e) {
	        let elements = this.context.RelativeDocument().getElementsByClassName('duda');

	        if (elements && elements.length) {
	            for (let element of elements) {
	                element.classList.remove('duda');
	            }
	            let cordialElement = this.context.RelativeDocument().elementFromPoint(e.clientX, e.clientY);

	            for (let element of elements) {
	                element.classList.add('duda');
	            }

	            let id = cordialElement.getAttribute('data-cordial-id');
	            if (id) {
	                this.context.Modal().Open(e, id, this.corrector.CorrectionAlternativesByID(id), this.corrector.CorrectionByID(id).message, this.inputElement.tagName === "BODY");

	                this.context.RelativeDocument().getElementsByClassName('ignore-action-container')[0].addEventListener('click', this._IgnoreCorrection.bind(this));

	                this.context.RelativeDocument().getElementsByClassName('cross-icon')[0].addEventListener('click', CloseModal.bind(this));

	                function CloseModal() {
	                    this.context.Modal(this.context.Modal().ModalElement()).Close();
	                }

	                let words = this.context.RelativeDocument().getElementsByClassName("word-update-container");
	                for (let i = 0; i < words.length; i++) {
	                    //We set an event to launch the replacing word process if the user click on it
	                    words[i].addEventListener('click', this.corrector.ReplaceWord.bind(this.corrector));
	                }
	            }
	        }
	    }

	    _OpenModal(e) {
	        e.preventDefault();
	        if (this.editor === EDITORS.DUDA.VALUE) {
	            let elements = this.context.RelativeDocument().getElementsByClassName("cordial-element");

	            for (let element of elements) {
	                element.classList.add('duda');
	            }
	            this._ManageDuda(e);
	        } else {
	            let id = e.target.getAttribute('data-cordial-id');
	            let self = this;

	            // We launch popup in parent window if we're in an IFrame
	            let isIFrame = this.inputElement.tagName === "BODY" || this.inputElement.ownerDocument !== document;
	            
	            this.context.Modal().Open(e, id, this.corrector.CorrectionAlternativesByID(id),this.corrector.CorrectionByID(id).message , isIFrame);

	            if (isIFrame) {
	                this.context.GetMainPageContext().DomParser().QuerySelectorAll('.ignore-action-container', this.context.GetMainPageContext().RelativeDocument())[0].addEventListener('click', self._IgnoreCorrection.bind(self));
	                let words = this.context.GetMainPageContext().DomParser().QuerySelectorAll('.word-update-container', this.context.GetMainPageContext().RelativeDocument());           
	                for (let i = 0; i < words.length; i++) {
	                    //We set an event to launch the replacing word process if the user click on it
	                    words[i].addEventListener('click', self.corrector.ReplaceWord.bind(self.corrector));
	                }
	            } else {
	                this.context.DomParser().QuerySelectorAll('.ignore-action-container', this.context.RelativeDocument())[0].addEventListener('click', self._IgnoreCorrection.bind(self));
	                let words = this.context.DomParser().QuerySelectorAll('.word-update-container', this.context.RelativeDocument());
	                for (let i = 0; i < words.length; i++) {
	                    //We set an event to launch the replacing word process if the user click on it
	                    words[i].addEventListener('click', self.corrector.ReplaceWord.bind(self.corrector));
	                }
	            }

	        }
	    }

	    async _IgnoreCorrection() {
	        this.corrector.IgnoreCorrection(this.context.Modal().CorrectionID());
	        this.corrector.LoadCorrections();
	        this.ShowCorrections();
	        this.context.Modal().Close();
	    }

	    SetFocus(isFocused) {
	        if (isFocused) {
	            this.containerElement.setAttribute('focus', '');

	            if (this.backbone.IsCorrectionAllowed()) {
	                if (!this.icon.IsActivated() && !this.backbone.IsAutomaticCorrectionActivated()) {
	                    this.icon.Activate();
	                    this.icon.SetState(Icon.STATES.INITIAL);
	                }
	            }
	            else {
	                this._Reset();
	                this.icon.Activate(false);
	            }
	        }
	        else {
	            this.containerElement.removeAttribute('focus');
	        }
	    }

	    //Change update interval when need in order to have less delay on underliner position update
	    _ChangeUpdateInterval(){
	        if(this.layerElement && this.containerElement && this.updateInterval !== FAST_UPDATE_INTERVAL ){
	            this.updateInterval = FAST_UPDATE_INTERVAL;
	            this.Update();
	            setTimeout( () => { 
	                this.updateInterval = DEFAULT_UPDATE_INTERVAL;
	            } , 2000); 
	        }
	        
	    }

	    async _OnInputClick() {
	        if (this.backbone.IsCorrectionAllowed()) {
	            if (!this.icon.IsActivated() && !this.backbone.IsAutomaticCorrectionActivated()) {
	                this.icon.Activate();
	                this.icon.SetState(Icon.STATES.INITIAL);
	            }
	        }
	    }

	    Destroy() {
	        clearTimeout(this.updateTimeout);
	        this.containerElement?.remove();

	        delete this.inputElement;

	        this.context?.Destroy();
	        delete this.context;
	        delete this.backbone;
	        delete this.inputContainerElement;
	        delete this.textSourceElement;

	        delete this.editor;

	        this.inputElement?.removeEventListener('click', this._OnInputClick.bind(this));
	        this.inputElement?.removeEventListener('scroll' , this._ChangeUpdateInterval.bind(this));
	        delete this.inputElement;
	        delete this.inputElement;

	        delete this.previousTextSourceInnerText;
	        delete this.previousTextSourceInnerTextAtPause;
	        delete this.previousTextSourceInnerHTML;

	        delete this.containerElement;
	        delete this.layerElement;
	        delete this.icon;

	        delete this.corrector;
	        delete this.underliner;

	        this.resizeObserver.disconnect();
	        delete this.resizeObserver;
	    }

	    /**
	     * We reset the layer and the corrector
	     */
	    _Reset() {
	        console.log("Reset Overlay");
	        //console.trace();
	        this.icon.SetState(Icon.STATES.INITIAL);
	        if (this.layerElement) this.layerElement.remove();
	        this.corrector.Reset();
	    }

	    _iOS() {
	        return [
	          'iPad Simulator',
	          'iPhone Simulator',
	          'iPod Simulator',
	          'iPad',
	          'iPhone',
	          'iPod'
	        ].includes(navigator.platform)
	        // iPad on iOS 13 detection
	        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	      }
	};


	var Overlay_1 = Overlay$3;

	const SimpleInput$1 = SimpleInput_1;
	const Overlay$2 = Overlay_1;
	const Corrector$2 = Corrector_1;

	let TextInput$1 = class TextInput extends SimpleInput$1
	{
	    constructor(sourceElement, context, backbone) {
	        let corrector = new Corrector$2(sourceElement, context, backbone);
	        let overlay = new Overlay$2(sourceElement, context, backbone);
	        corrector.SetOverlay(overlay);
	        overlay.SetCorrector(corrector);
	        super(sourceElement, corrector, overlay, context);
	    }
	};

	var TextInput_1 = TextInput$1;

	const SimpleInput = SimpleInput_1;
	const Overlay$1 = Overlay_1;
	const Corrector$1 = Corrector_1;

	let TextArea$1 = class TextArea extends SimpleInput
	{
	    constructor(sourceElement, context, backbone) {
	        let corrector = new Corrector$1(sourceElement, context, backbone);
	        let overlay = new Overlay$1(sourceElement, context,backbone);
	        corrector.SetOverlay(overlay);
	        overlay.SetCorrector(corrector);
	        super(sourceElement, corrector, overlay, context);
	    }
	};

	var TextArea_1 = TextArea$1;

	const Input = Input_1;

	let ComplexInput$1 = class ComplexInput extends Input
	{
	    constructor(sourceElement, corrector, overlay, context) {
	        super(sourceElement, corrector, overlay, context);
	    }
	};

	var ComplexInput_1 = ComplexInput$1;

	const ComplexInput = ComplexInput_1;
	const Overlay = Overlay_1;
	const Corrector = Corrector_1;

	let EditableDiv$1 = class EditableDiv extends ComplexInput
	{
	    constructor(sourceElement, context, backbone) {
	        let corrector = new Corrector(sourceElement, context, backbone);
	        let overlay = new Overlay(sourceElement, context, backbone);
	        corrector.SetOverlay(overlay);
	        overlay.SetCorrector(corrector);
	        super(sourceElement, corrector, overlay, context);
	    }
	};

	var EditableDiv_1 = EditableDiv$1;

	/**
	 * Class used to get Cordial Dictionnary links for a word by using its cannonical form
	 * e.g. the canonical form of trees is tree, took is take, etc...
	 */

	let DictionnaryConnector$1 = class DictionnaryConnector {
	    LIST_CANNONICAL_FORM_API = 'https://www.cordial.fr/php/motDisponibleJSON.php'
	    DICTIONNARY_BASE_URL = 'https://www.cordial.fr/dictionnaire/'
	    
	    /**
	     * Get a link to the cordial Dictionnary for the word given
	     * Multiple possibilities:
	     * Only one form of the word found (e.g. tree is only a noun) the return will be the link to dictionnary page of tree
	     * Multiple form found (e.g. walk is a noun and a verb) the return will be the home page of dictionnary with  
	     * @param {*} word 
	     */
	    async getLinkToDictionnary(word){
	        const encodedLoweredWord = encodeURIComponent(word.toLowerCase());
	        const formBody = `mot=${encodedLoweredWord}`;
	        const rawResponse = await fetch('https://www.cordial.fr/php/motDisponibleJSON.php',
	        {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	            },
	            body: formBody
	        });

	        let link = '';
	        try{
	            const data = await rawResponse.json();
	            if(data.length == 1){ // direct link to definition page to avoid delay of redirection of the dictionnary home page
	                link =  `${this.DICTIONNARY_BASE_URL}definition/${data[0].link}`;
	            }
	            if(data.length > 1){ // multiple choice : redirect to home page of dictionnary with the choices
	                link = `${this.DICTIONNARY_BASE_URL}?mot=${data[0].word}`;
	            }
	        }
	        catch(e) {
	            console.log(e);
	            link = `${this.DICTIONNARY_BASE_URL}?mot=${encodedLoweredWord}`; // word not found => link to the "word not found" page 
	        }
	        return link
	    }
	};

	var DicionnaryConnector = DictionnaryConnector$1;

	const DictionnaryConnector = DicionnaryConnector;
	let Modal$1 = class Modal
	{
	    static excludedClickOutsideQuery = 'macroponent , [class^="q-field"]'

	    CorrectionID() { return this.correctionID }

	    constructor(context) {
	        this.context = context;

	        this.isOpen = false;
	        this.modalElement = undefined;
	        this.modalContent = undefined;
	        this.modalHeader = undefined;
	        this.modalBody = undefined;
	        this.modalFooter = undefined;
	        this.targetElement = undefined;
	        this.correctionID = undefined;
	        this.cross= false;

	        this._Create();
	        this._Resize();
	        this.dictionnaryConnector = new DictionnaryConnector();
	        this.context.RelativeDocument().addEventListener("click", this._ClickOutside.bind(this));
	        this.context.RelativeDocument().addEventListener("keydown", this._KeyDown.bind(this));
	    }

	    Open(event, id, words, message, iframe = false) {
	        this.isOpen = true;
	        this.targetElement = event.target;
	        this.correctionID = id;
	        this.modalElement.classList.add('active');

	        this._Scroll(iframe);
	        this._Reset();
	        this._InitHeader(words);
	        this._InitBody(message);
	        this._InitFooter();
	        if (iframe){
	            this._PositionInIFrame();
	            this.context.GetMainPageContext().RelativeDocument().body.parentNode.appendChild(this.modalElement);
	        } else
	            this._Position();
	    }

	    Close(modalElement) {
	        this.isOpen = false;
	        modalElement ? modalElement.classList.remove('active') : this.modalElement.classList.remove('active');
	    }

	    ModalElement() {
	        return this.modalElement;
	    }

	    _Resize() {
	        // document = 
	        // this.context.RelativeDocument().addEventListener('resize', function () {
	        //     this.Close();
	        // }.bind(this));
	    }

	    _Scroll(iframe) {
	        const event = this._IsUserOnMobile() ? 'touchmove' : 'scroll';
	        const doc = iframe ? this.context.GetMainPageContext().RelativeDocument() : this.context.RelativeDocument();

	        const checkScroll = () => {
	            this.Close();
	            doc.removeEventListener(event, checkScroll, false);
	        };
	        doc.addEventListener(event, checkScroll);
	    }

	    _ClickOutside(event) {
	        if (this.isOpen && event.target !== this.targetElement && !event.target.matches(Modal$1.excludedClickOutsideQuery)) {   
	            this.Close();
	        }
	    }

	    _KeyDown(event) {
	        if (this.isOpen) {       
	            this.Close();
	            document.activeElement.blur();
	        }
	    }

	    _Create() {
	        this.modalElement = this.context.RelativeDocument().createElement("div");
	        this.modalElement.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.modalElement.classList.add('modal-cordial');
	        this.modalElement.id = TYPES.MODAL.ID;

	        this.modalContent = this.context.RelativeDocument().createElement("div");
	        this.modalContent.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.modalContent.classList.add('correction-modal-content');
	        this.modalElement.appendChild(this.modalContent);

	        this.context.RelativeDocument().body.appendChild(this.modalElement);
	    }

	    AddCross() {
	        let crossIcon = this.context.RelativeDocument().createElement('img');
	        crossIcon.classList.add('cross-icon');
	        crossIcon.src = commonjsGlobal.CONSTANTS.parameters.IMG_URL+"icons/cross.svg";
	        this.modalContent.appendChild(crossIcon);
	        this.cross = true;
	    }

	    GetCross() {
	        return this.cross
	    }

	    _InitHeader(words) {
	        this.modalHeader = this.context.RelativeDocument().createElement("div");
	        this.modalHeader.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.modalHeader.classList.add('correction-modal-header');
	        this.modalContent.appendChild(this.modalHeader);

	        words?.forEach(function (word) {
	            // If the error is of type spell, a link to its definition is proposed
	            this._AddWord(word.text, word.type == 'spell');
	        }.bind(this));

	        this._AddIgnore();
	    }

	    _InitBody(text) {
	        this.modalBody = this.context.RelativeDocument().createElement("div");
	        this.modalBody.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.modalBody.classList.add('correction-modal-body');
	        this.modalContent.appendChild(this.modalBody);

	        let container = this.context.RelativeDocument().createElement("div");
	        container.classList.add('help-container');
	        this.modalBody.appendChild(container);

	        let helpIcon = this.context.RelativeDocument().createElement('img');
	        helpIcon.classList.add('cordial-icon');
	        helpIcon.src = commonjsGlobal.CONSTANTS.parameters.IMG_URL+"icons/def.png";

	        let div = this.context.RelativeDocument().createElement("div");
	        div.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        div.innerHTML = text || "Problème lors de la récupération des données";
	        div.classList.add('secondary-text');

	        container.appendChild(div);
	        div.prepend(helpIcon);
	        this._AddWatermark();
	    }

	    _InitFooter() {
	        this.modalFooter = this.context.RelativeDocument().createElement("div");
	        this.modalFooter.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        this.modalFooter.classList.add('correction-modal-footer');
	        this.modalContent.appendChild(this.modalFooter);

	        // Create cordial icon
	        let iconElement = this.context.RelativeDocument().createElement('div');
	        iconElement.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        iconElement.classList.add('modal-cordial-icon');
	        this.modalFooter.appendChild(iconElement);
	    }

	    // Compute position of modal
	    _Position() {

	        let rect = this.targetElement.getBoundingClientRect();

	        // Get size of the modal
	        let menuWidth = this.modalElement.offsetWidth;
	        let menuHeight = this.modalElement.offsetHeight;

	        // Get size of the window
	        let windowWidth = this.context.RelativeWindow().innerWidth;
	        let windowHeight = this.context.RelativeWindow().innerHeight;

	        // Variables to evaluate if modal can fit inside the page, depending on which side it wishes to be displayed
	        const fitRight =  (windowWidth - rect.left) > menuWidth; 
	        const fitLeft = (windowWidth - (windowWidth - rect.right))  > menuWidth;
	        const fitBot = (windowHeight - rect.bottom) > menuHeight;

	        if(this._IsUserOnMobile()){ // on mobile, always center the modal
	            this.modalElement.style.left =  '50%';
	            this.modalElement.style.position =  'fixed';
	            this.modalElement.style.transform = 'translate(-50%)';
	            this.modalElement.style.top = (rect.bottom + 10) + 'px';
	        }
	        else if (fitRight && fitBot) {
	            //Bottom right
	            this.modalElement.style.left = (rect.left) + "px";
	            this.modalElement.style.top = (rect.bottom + 5) + "px";
	        }
	        else if (fitRight && !fitBot) {
	            //Top right
	            this.modalElement.style.left = (rect.left) + "px";
	            this.modalElement.style.top = (rect.top - menuHeight) + "px";
	        }  else if (!fitRight && fitLeft && fitBot) {
	            //Bottom left
	            this.modalElement.style.left = (rect.right - menuWidth) + "px";
	            this.modalElement.style.top = (rect.bottom + 5) + "px";
	        } else if(!fitRight && fitLeft && !fitBot){
	            //Top left
	            this.modalElement.style.left = (rect.right - menuWidth) + "px";
	            this.modalElement.style.top = (rect.top - menuHeight) + "px";
	        }else if (!fitRight && !fitLeft && fitBot){
	            // if screen width too small => stick modal to the left (bottom version)
	            this.modalElement.style.left = "0px";
	            this.modalElement.style.top = (rect.bottom + 5) + "px";
	        }
	        else {
	            // if screen width too small => stick modal to the left (top version)
	            this.modalElement.style.left = "0px";
	            this.modalElement.style.top = (rect.top - menuHeight) + "px";
	        }
	    }

	    // Compute position of modal if text input is contained within an IFrame (or nested IFrames)
	    _PositionInIFrame() {
	        // Get position of input text in the page
	       // Returns a rectangle where each direction if the corresponding offset : rect.left = left offset from the page
	       const rect = this.targetElement.getBoundingClientRect();

	        // Get size of the modal
	       const menuWidth = this.modalElement.offsetWidth;
	       const menuHeight = this.modalElement.offsetHeight;
	       
	       // Get size of the window outside the iframe(s)
	       const mainPageContext = this.context.GetMainPageContext();
	       const windowWidth = mainPageContext.RelativeWindow().innerWidth;
	       const windowHeight = mainPageContext.RelativeWindow().innerHeight;

	       // Get position of every iframe relative to its parent
	       // By adding each individual iframe offset, we manage to infer the total offset of a nested iframe relative to the main page DOM
	       let iframeRects = [];
	       let currentContext = this.context;
	       while (currentContext.ParentContext()!=null)
	       {
	           iframeRects.push(currentContext.RelativeWindow().frameElement.getBoundingClientRect());
	           currentContext = currentContext.ParentContext();
	       }
	       const totalOffsetLeft = iframeRects.reduce((n, {left}) => n + left, 0);
	       const totalOffsetTop = iframeRects.reduce((n, {top}) => n + top, 0);

	       // Check if popup has room to display in parent page of IFrame
	       const fitInWidth = (x) => ((windowWidth - x) > menuWidth);
	       const fitInHeight = (y) => ((windowHeight - y) > menuHeight);
	       const widthOk = fitInWidth(totalOffsetLeft + rect.left);
	       const heightOk = fitInHeight(totalOffsetTop + rect.bottom + 5);

	       // Choose which side to display the modal in
	       if(this._IsUserOnMobile()){ // on mobile, always center the modal
	            this.modalElement.style.left =  '50%';
	            this.modalElement.style.position =  'fixed';
	            this.modalElement.style.transform = 'translate(-50%)';
	            this.modalElement.style.top = heightOk ? (totalOffsetTop + rect.bottom + 5) + "px" : (totalOffsetTop + rect.top - menuHeight) + "px";
	        }
	        else if (widthOk && heightOk) {
	            //Bottom left
	            this.modalElement.style.left = (totalOffsetLeft + rect.left) + "px";
	            this.modalElement.style.top = (totalOffsetTop + rect.bottom + 5) + "px";
	        } else if (!widthOk && heightOk) {
	            //Bottom right
	            this.modalElement.style.left = (totalOffsetLeft + rect.right - menuWidth) + "px";
	            this.modalElement.style.top = (totalOffsetTop + rect.bottom + 5) + "px";
	        } else if (widthOk && !heightOk) {
	            //Top left
	            this.modalElement.style.left = (totalOffsetLeft + rect.left) + "px";
	            this.modalElement.style.top = (totalOffsetTop + rect.top - menuHeight) + "px";
	        } else {
	            //Top right
	            this.modalElement.style.left = (totalOffsetLeft + rect.right - menuWidth) + "px";
	            this.modalElement.style.top = (totalOffsetTop + rect.top - menuHeight) + "px";
	        }
	   }

	    _AddWord(word, dictionary = false) {
	        let container = this.context.RelativeDocument().createElement("div");
	        container.classList.add('word-container');
	        this.modalHeader.appendChild(container);

	        if (dictionary) {
	            let dictionaryElement = this.context.RelativeDocument().createElement('img');
	            dictionaryElement.classList.add('cordial-icon');
	            dictionaryElement.classList.add('dico-icon');
	            dictionaryElement.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	            dictionaryElement.src = commonjsGlobal.CONSTANTS.parameters.IMG_URL+"/icons/dico.png";
	            dictionaryElement.addEventListener("click", this._ClickDictionnaryIcon.bind(this,word));
	            container.appendChild(dictionaryElement);
	        }

	        let editContainer = this.context.RelativeDocument().createElement("div");
	        editContainer.classList.add('word-update-container');
	        container.appendChild(editContainer);

	        let pencilIcon = this.context.RelativeDocument().createElement('img');
	        pencilIcon.classList.add('cordial-icon');
	        pencilIcon.src = commonjsGlobal.CONSTANTS.parameters.IMG_URL+"icons/crayon.png";

	        let div = this.context.RelativeDocument().createElement("div");
	        div.innerHTML = word;

	        editContainer.appendChild(pencilIcon);
	        editContainer.appendChild(div);
	    }

	    async _ClickDictionnaryIcon(word){
	        const link = await this.dictionnaryConnector.getLinkToDictionnary(word);
	        if(link){
	            window.open(link, '_blank').focus();
	        }
	        
	    }

	    _AddIgnore() {
	        let container = this.context.RelativeDocument().createElement("div");
	        container.classList.add('align-right-container');
	        this.modalHeader.appendChild(container);

	        let voidDiv = this.context.RelativeDocument().createElement("div");
	        container.appendChild(voidDiv);

	        let actionContainer = this.context.RelativeDocument().createElement("div");
	        actionContainer.classList.add('ignore-action-container');
	        container.appendChild(actionContainer);

	        let ignoreIcon = this.context.RelativeDocument().createElement('img');
	        ignoreIcon.classList.add('cordial-icon');
	        ignoreIcon.src = commonjsGlobal.CONSTANTS.parameters.IMG_URL+"icons/corbeille.png";

	        let div = this.context.RelativeDocument().createElement("div");

	        div.innerHTML = "Ignorer";
	        div.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        div.classList.add('secondary-text');



	        actionContainer.appendChild(ignoreIcon);
	        actionContainer.appendChild(div);
	    }

	    _AddWatermark(){
	        let container = this.context.RelativeDocument().createElement("div");
	        container.classList.add('align-right-container');
	        this.modalBody.appendChild(container);

	        let voidDiv = this.context.RelativeDocument().createElement("div");
	        
	        
	        let iconElement = this.context.RelativeDocument().createElement('div');
	        iconElement.setAttribute(TYPES.CORDIAL.ATTRIBUTE, '');
	        iconElement.classList.add('modal-cordial-icon');

	        container.appendChild(voidDiv);
	        container.appendChild(iconElement);

	    }

	    _Reset() {
	        if (this.modalHeader) this.modalHeader.remove();
	        if (this.modalBody) this.modalBody.remove();
	        if (this.modalFooter) this.modalFooter.remove();
	    }

	    Destroy() {
	        this.modalElement.remove();
	        
	        delete this.context;
	        delete this.isOpen;
	        delete this.modalElement;
	        delete this.modalContent;
	        delete this.modalHeader;
	        delete this.modalBody;
	        delete this.modalFooter;
	        delete this.targetElement;
	        delete this.correctionID;
	        delete this.cross;
	    }

	    _IsUserOnMobile (){
	        let check = false;
	        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	        return check;
	      };


	};

	var Modal_1 = Modal$1;

	/* istanbul ignore file */


	// normalize-selector-rev-02.js
	/*
	  author: kyle simpson (@getify)
	  original source: https://gist.github.com/getify/9679380

	  modified for tests by david kaye (@dfkaye)
	  21 march 2014

	  rev-02 incorporate kyle's changes 3/2/42014
	*/

	function normalizeSelector(sel) {
	  // save unmatched text, if any
	  function saveUnmatched() {
	    if (unmatched) {
	      // whitespace needed after combinator?
	      if (tokens.length > 0 && /^[~+>]$/.test(tokens[tokens.length - 1])) {
	        tokens.push(" ");
	      }

	      // save unmatched text
	      tokens.push(unmatched);
	    }
	  }

	  var tokens = [],
	    match,
	    unmatched,
	    regex,
	    state = [0],
	    next_match_idx = 0,
	    prev_match_idx,
	    not_escaped_pattern = /(?:[^\\]|(?:^|[^\\])(?:\\\\)+)$/,
	    whitespace_pattern = /^\s+$/,
	    state_patterns = [
	      /\s+|\/\*|["'>~+[(]/g, // general
	      /\s+|\/\*|["'[\]()]/g, // [..] set
	      /\s+|\/\*|["'[\]()]/g, // (..) set
	      null, // string literal (placeholder)
	      /\*\//g, // comment
	    ];
	  sel = sel.trim();

	  // eslint-disable-next-line no-constant-condition
	  while (true) {
	    unmatched = "";

	    regex = state_patterns[state[state.length - 1]];

	    regex.lastIndex = next_match_idx;
	    match = regex.exec(sel);

	    // matched text to process?
	    if (match) {
	      prev_match_idx = next_match_idx;
	      next_match_idx = regex.lastIndex;

	      // collect the previous string chunk not matched before this token
	      if (prev_match_idx < next_match_idx - match[0].length) {
	        unmatched = sel.substring(
	          prev_match_idx,
	          next_match_idx - match[0].length
	        );
	      }

	      // general, [ ] pair, ( ) pair?
	      if (state[state.length - 1] < 3) {
	        saveUnmatched();

	        // starting a [ ] pair?
	        if (match[0] === "[") {
	          state.push(1);
	        }
	        // starting a ( ) pair?
	        else if (match[0] === "(") {
	          state.push(2);
	        }
	        // starting a string literal?
	        else if (/^["']$/.test(match[0])) {
	          state.push(3);
	          state_patterns[3] = new RegExp(match[0], "g");
	        }
	        // starting a comment?
	        else if (match[0] === "/*") {
	          state.push(4);
	        }
	        // ending a [ ] or ( ) pair?
	        else if (/^[\])]$/.test(match[0]) && state.length > 0) {
	          state.pop();
	        }
	        // handling whitespace or a combinator?
	        else if (/^(?:\s+|[~+>])$/.test(match[0])) {
	          // need to insert whitespace before?
	          if (
	            tokens.length > 0 &&
	            !whitespace_pattern.test(tokens[tokens.length - 1]) &&
	            state[state.length - 1] === 0
	          ) {
	            // add normalized whitespace
	            tokens.push(" ");
	          }

	          // case-insensitive attribute selector CSS L4
	          if (
	            state[state.length - 1] === 1 &&
	            tokens.length === 5 &&
	            tokens[2].charAt(tokens[2].length - 1) === "="
	          ) {
	            tokens[4] = " " + tokens[4];
	          }

	          // whitespace token we can skip?
	          if (whitespace_pattern.test(match[0])) {
	            continue;
	          }
	        }

	        // save matched text
	        tokens.push(match[0]);
	      }
	      // otherwise, string literal or comment
	      else {
	        // save unmatched text
	        tokens[tokens.length - 1] += unmatched;

	        // unescaped terminator to string literal or comment?
	        if (not_escaped_pattern.test(tokens[tokens.length - 1])) {
	          // comment terminator?
	          if (state[state.length - 1] === 4) {
	            // ok to drop comment?
	            if (
	              tokens.length < 2 ||
	              whitespace_pattern.test(tokens[tokens.length - 2])
	            ) {
	              tokens.pop();
	            }
	            // otherwise, turn comment into whitespace
	            else {
	              tokens[tokens.length - 1] = " ";
	            }

	            // handled already
	            match[0] = "";
	          }

	          state.pop();
	        }

	        // append matched text to existing token
	        tokens[tokens.length - 1] += match[0];
	      }
	    }
	    // otherwise, end of processing (no more matches)
	    else {
	      unmatched = sel.substr(next_match_idx);
	      saveUnmatched();

	      break;
	    }
	  }

	  return tokens.join("").trim();
	}

	/**
	* Finds first matching elements on the page that may be in a shadow root using a complex selector of n-depth
	*
	* Don't have to specify all shadow roots to button, tree is travered to find the correct element
	*
	* Example querySelectorAllDeep('downloads-item:nth-child(4) #remove');
	*
	* Example should work on chrome://downloads outputting the remove button inside of a download card component
	*
	* Example find first active download link element querySelectorDeep('#downloads-list .is-active a[href^="https://"]');
	*
	* Another example querySelectorAllDeep('#downloads-list div#title-area + a');
	e.g.
	*/
	function querySelectorAllDeep(selector, root = document, allElements = null) {
	    return _querySelectorDeep(selector, true, root, allElements);
	}

	function querySelectorDeep(selector, root = document, allElements = null) {
	    return _querySelectorDeep(selector, false, root, allElements);
	}

	function _querySelectorDeep(selector, findMany, root, allElements = null) {
	    selector = normalizeSelector(selector);
	    let lightElement = root.querySelector(selector);

	    if (document.head.createShadowRoot || document.head.attachShadow) {
	        // no need to do any special if selector matches something specific in light-dom
	        if (!findMany && lightElement) {
	            return lightElement;
	        }

	        // split on commas because those are a logical divide in the operation
	        const selectionsToMake = splitByCharacterUnlessQuoted(selector, ',');

	        return selectionsToMake.reduce((acc, minimalSelector) => {
	            // if not finding many just reduce the first match
	            if (!findMany && acc) {
	                return acc;
	            }
	            // do best to support complex selectors and split the query
	            const splitSelector = splitByCharacterUnlessQuoted(minimalSelector
	                    //remove white space at start of selector
	                    .replace(/^\s+/g, '')
	                    .replace(/\s*([>+~]+)\s*/g, '$1'), ' ')
	                    // filter out entry white selectors
	                    .filter((entry) => !!entry)
	                    // convert "a > b" to ["a", "b"]
	                    .map((entry) => splitByCharacterUnlessQuoted(entry, '>'));

	            const possibleElementsIndex = splitSelector.length - 1;
	            const lastSplitPart = splitSelector[possibleElementsIndex][splitSelector[possibleElementsIndex].length - 1];
	            const possibleElements = collectAllElementsDeep(lastSplitPart, root, allElements);
	            const findElements = findMatchingElement(splitSelector, possibleElementsIndex, root);
	            if (findMany) {
	                acc = acc.concat(possibleElements.filter(findElements));
	                return acc;
	            } else {
	                acc = possibleElements.find(findElements);
	                return acc || null;
	            }
	        }, findMany ? [] : null);


	    } else {
	        if (!findMany) {
	            return lightElement;
	        } else {
	            return root.querySelectorAll(selector);
	        }
	    }

	}

	function findMatchingElement(splitSelector, possibleElementsIndex, root) {
	    return (element) => {
	        let position = possibleElementsIndex;
	        let parent = element;
	        let foundElement = false;
	        while (parent && !isDocumentNode(parent)) {
	            let foundMatch = true;
	            if (splitSelector[position].length === 1) {
	                foundMatch = parent.matches(splitSelector[position]);
	            } else {
	                // selector is in the format "a > b"
	                // make sure a few parents match in order
	                const reversedParts = ([]).concat(splitSelector[position]).reverse();
	                let newParent = parent;
	                for (const part of reversedParts) {
	                    if (!newParent || !newParent.matches(part)) {
	                        foundMatch = false;
	                        break;
	                    }
	                    newParent = findParentOrHost(newParent, root);
	                }
	            }

	            if (foundMatch && position === 0) {
	                foundElement = true;
	                break;
	            }
	            if (foundMatch) {
	                position--;
	            }
	            parent = findParentOrHost(parent, root);
	        }
	        return foundElement;
	    };

	}

	function splitByCharacterUnlessQuoted(selector, character) {
	    return selector.match(/\\?.|^$/g).reduce((p, c) => {
	        if (c === '"' && !p.sQuote) {
	            p.quote ^= 1;
	            p.a[p.a.length - 1] += c;
	        } else if (c === '\'' && !p.quote) {
	            p.sQuote ^= 1;
	            p.a[p.a.length - 1] += c;

	        } else if (!p.quote && !p.sQuote && c === character) {
	            p.a.push('');
	        } else {
	            p.a[p.a.length - 1] += c;
	        }
	        return p;
	    }, { a: [''] }).a;
	}

	/**
	 * Checks if the node is a document node or not.
	 * @param {Node} node
	 * @returns {node is Document | DocumentFragment}
	 */
	function isDocumentNode(node) {
	    return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_NODE;
	}

	function findParentOrHost(element, root) {
	    const parentNode = element.parentNode;
	    return (parentNode && parentNode.host && parentNode.nodeType === 11) ? parentNode.host : parentNode === root ? null : parentNode;
	}

	/**
	 * Finds all elements on the page, inclusive of those within shadow roots.
	 * @param {string=} selector Simple selector to filter the elements by. e.g. 'a', 'div.main'
	 * @return {!Array<string>} List of anchor hrefs.
	 * @author ebidel@ (Eric Bidelman)
	 * License Apache-2.0
	 */
	function collectAllElementsDeep(selector = null, root, cachedElements = null) {
	    let allElements = [];

	    if (cachedElements) {
	        allElements = cachedElements;
	    } else {
	        const findAllElements = function(nodes) {
	            for (let i = 0; i < nodes.length; i++) {
	                const el = nodes[i];
	                allElements.push(el);
	                // If the element has a shadow root, dig deeper.
	                if (el.shadowRoot) {
	                    findAllElements(el.shadowRoot.querySelectorAll('*'));
	                }
	            }
	        };
	        if(root.shadowRoot) {
	            findAllElements(root.shadowRoot.querySelectorAll('*'));
	        }
	        findAllElements(root.querySelectorAll('*'));
	    }

	    return selector ? allElements.filter(el => el.matches(selector)) : allElements;	}

	var querySelectorDeep$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		collectAllElementsDeep: collectAllElementsDeep,
		querySelectorAllDeep: querySelectorAllDeep,
		querySelectorDeep: querySelectorDeep
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(querySelectorDeep$1);

	let ShadowDomParser$1 = class ShadowDomParser {

	  QuerySelectorAll(element, document) {
	    const querySelectorShadowDom = require$$0;
	    return querySelectorShadowDom.querySelectorAllDeep(element, document)
	  }
	};

	var ShadowDomParser_1 = ShadowDomParser$1;

	let DefaultDomParser$1 = class DefaultDomParser {

	  constructor(relativeDocument) {
	    this.relativeDocument = relativeDocument;
	  }

	  QuerySelectorAll(element, document) {
	    return this.relativeDocument.querySelectorAll(element, document)
	  }
	};

	var DefaultDomParser_1 = DefaultDomParser$1;

	const ShadowDomParser = ShadowDomParser_1;
	const DefaultDomParser = DefaultDomParser_1;

	let Context$1 = class Context {
	    RelativeDocument() { return this.relativeDocument }
	    RelativeWindow() { return this.relativeWindow }
	    ParentContext() { return this.parentContext }
	    DomParser() { return this.domParser }
	    Modal() { return this.modal }

	    constructor(relativeDocument, relativeWindow, parentContext) {
	        this.relativeDocument = relativeDocument;
	        this.relativeWindow = relativeWindow;
	        this.parentContext = parentContext;
	        this.domParser = this._IsShadowDomDetected() ? new ShadowDomParser() : new DefaultDomParser(relativeDocument);
	    }

	    SetModal(modal) {
	        this.modal = modal;
	    }

	    _IsShadowDomDetected() {
	        const shadowRoots = document.querySelectorAll('#shadow-root');
	        return (shadowRoots && shadowRoots.length > 0);
	    }

	    GetMainPageContext() {
	        let mainPageContext = this.ParentContext();
	        while (mainPageContext.ParentContext() != null)
	            mainPageContext = mainPageContext.ParentContext();
	        return mainPageContext;
	    }

	    Destroy() {
	        // Delete DOM links
	        delete this.relativeDocument;
	        delete this.relativeWindow;
	        delete this.domParser;

	        // Delete parent context ref
	        delete this.parentContext;

	        // Delete modal
	        this.modal?.Destroy();
	        delete this.modal;
	    }
	};

	var Context_1 = Context$1;

	var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

	var css = "\r\n@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n@media screen and (max-width: 1082px){\r\n  [cordial].modal-cordial .correction-modal-header {\r\n    padding: 10px;\r\n    border-bottom: solid 2px #1baec8;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-footer {\r\n    display: none;\r\n  }\r\n  [cordial].modal-cordial .correction-modal-body {\r\n    padding: 10px;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-content {\r\n    position: relative;\r\n    background-color: #fefefe;\r\n    border: 1px solid #d3d3d3;\r\n    width: calc(100% - 2px);\r\n    color: #000;\r\n    padding: 0 !important;\r\n    font-size: 15px;\r\n    font-family: Roboto;\r\n    border-radius: 10px;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-body .modal-cordial-icon {\r\n    margin-top: 10px;\r\n    height: 20px;\r\n    width: 69px;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiEAAACfCAYAAAAvSAmrAAAACXBIWXMAAAsTAAALEwEAmpwYAAA4JmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDctMjNUMTI6Mzc6MjMrMDI6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wOS0xMVQxNjoyNjoyOSswMjowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDktMTFUMTY6MjY6MjkrMDI6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YWIwYTQyMTgtNjE5Zi1kODQzLTlmM2QtYWI5ZWFmMjQyYTEzPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOmFiMGE0MjE4LTYxOWYtZDg0My05ZjNkLWFiOWVhZjI0MmExMzwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmFiMGE0MjE4LTYxOWYtZDg0My05ZjNkLWFiOWVhZjI0MmExMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDphYjBhNDIxOC02MTlmLWQ4NDMtOWYzZC1hYjllYWYyNDJhMTM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDctMjNUMTI6Mzc6MjMrMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NTQ1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE1OTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg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\");\r\n    background-size: contain;\r\n    background-repeat: no-repeat;\r\n  }\r\n\r\n  [cordial].secondary-text{\r\n    font-size: 12px;\r\n    color: #383838;\r\n  }\r\n\r\n  [cordial].dico-icon {\r\n    scale: 2;\r\n    margin-right: 10px !important;\r\n  }\r\n}\r\n\r\n@media screen and (min-width: 1083px) { \r\n  [cordial].modal-cordial .correction-modal-header {\r\n    padding: 10px;\r\n    border-bottom: solid 2px #1baec8;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-footer {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 15px;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-footer .modal-cordial-icon {\r\n    height: 35px;\r\n    width: 110px;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiEAAACfCAYAAAAvSAmrAAAACXBIWXMAAAsTAAALEwEAmpwYAAA4JmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDctMjNUMTI6Mzc6MjMrMDI6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wOS0xMVQxNjoyNjoyOSswMjowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDktMTFUMTY6MjY6MjkrMDI6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YWIwYTQyMTgtNjE5Zi1kODQzLTlmM2QtYWI5ZWFmMjQyYTEzPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOmFiMGE0MjE4LTYxOWYtZDg0My05ZjNkLWFiOWVhZjI0MmExMzwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmFiMGE0MjE4LTYxOWYtZDg0My05ZjNkLWFiOWVhZjI0MmExMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDphYjBhNDIxOC02MTlmLWQ4NDMtOWYzZC1hYjllYWYyNDJhMTM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDctMjNUMTI6Mzc6MjMrMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NTQ1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE1OTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg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\");\r\n    background-size: contain;\r\n    background-repeat: no-repeat;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-body {\r\n    padding: 10px;\r\n    border-bottom: solid 2px #1baec8;\r\n  }\r\n\r\n  [cordial].modal-cordial .correction-modal-content {\r\n    position: relative;\r\n    background-color: #fefefe;\r\n    border: 1px solid #d3d3d3;\r\n    width: calc(100% - 2px);\r\n    color: #000;\r\n    padding: 0 !important;\r\n    font-size: 12px;\r\n    border-radius: 10px;\r\n    font-family: Roboto;\r\n  }\r\n}\r\n\r\n\r\n[cordial] {\r\n  pointer-events: none !important;\r\n}\r\n[cordial].cordial-container {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  z-index: auto;\r\n  overflow: hidden !important;\r\n}\r\n[cordial].cordial-container .cordial-layer {\r\n  position: absolute;\r\n  background-color: rgba(148,103,207,0);\r\n  color: transparent;\r\n  white-space: pre-wrap;\r\n}\r\n.cordial-element {\r\n  text-decoration-line: underline;\r\n  text-decoration-style: solid;\r\n  white-space: pre-wrap;\r\n  cursor: pointer;\r\n  pointer-events: all !important;\r\n  text-decoration-thickness: 2px;\r\n}\r\n.cordial-element.duda {\r\n  pointer-events: inherit !important;\r\n}\r\n.cordial-error-grammar {\r\n  text-decoration-color: #6885bd !important;\r\n}\r\n.cordial-error-spell {\r\n  text-decoration-color: #e15555 !important;\r\n}\r\n[cordial].cordial-container .cordial-icon {\r\n  display: block !important;\r\n  position: absolute;\r\n  top: 5px;\r\n  right: 5px;\r\n  width: 20px ;\r\n  height: 20px ;\r\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAApNJREFUeNpiZCABSK07EQCk7IHYAIgVoBgEPgDxBSB+AMQHgXjDsyCLD8SYyUiEpQJAqh6IE4BYgAT3LgDiRqBDHpDtAKDlDUAqn0SLsTmkEFeIMOLx9XogdmCgDgCFQiDQERcIOgBq+X5oPFMTgELAEd0RjHSyHKcj0B2wn9hgl+ViZ5ABYhj49PsPw9WP34h1hCIsTbAgWV5AjOVhcqIMKSoSDNr8XBhyj7/9ZFj96A3D7DvPgQ76i8sIUCjPB6UJeAhAg/4+vtQO8vFcCzWsFqMDkOVJJ24xHH/zCZ8yUFQcYIJyCghZvstJlyjLQYCPlZlhja0mWB8eUI8cAu/xOYAUy2Gg8Ow9hlWPXhNSpsgCLV5xWl6sKYPV8h3P3zOsfvgaHO98rCwMHlKC4PQB8j2RloNAAAu0bMcJQuVEiPIdKL5XAR0ECnaQ44gE/iz48rylCB9GPPbdeIrTd6BsSGRWhAEDJnyyVqJ8GGKgLEZFIMBEimqQ7/Dkb7IAE8MAAyZoA4IoAMoNoFRObQccwCV57DVmSZaqIklVB8AKov+4FJxwN8DICbjyOSiESMyGB8DhyRue4oDUvkMB/Gws4OyIDECFjrYAN8Ovv/8YRDnYwJamAiuoRj0FhjB5UYYn334Rmx03MCI1veoHoCg2hOWCA/hUJQNrNlKzX7+xEqHK6AGoYQJzwAV8KkHlvfnO84SqVxT1bvsug2k8oBGlRYQvIVK5QQL2MND3hugOILo5Bqvztfm54fwnQMsJ+BhruxDZAfdx5QQqg0Sg5QuwFcV0txy5IAqAdkRoBT5Ae0cL0CVgrWJ/Glp+AepzrDmNEeh7BWiLmNrgAbRzugCfIlAI9FPR0gNQHy/E5WN0ABBgAF2SCkc46jBdAAAAAElFTkSuQmCC\");\r\n  background-size: cover;\r\n  cursor: pointer;\r\n  pointer-events: none !important;\r\n  opacity: 0;\r\n  transition: opacity 200ms;\r\n}\r\n[cordial].cordial-container .cordial-icon.skribix {\r\n  top: 40px;\r\n  right: 15px;\r\n}\r\n[cordial].cordial-container .cordial-icon.skribix2 {\r\n  top: 50%;\r\n  right: 15px;\r\n  transform: translateY(-50%);\r\n}\r\n[cordial][focus] .cordial-icon {\r\n  pointer-events: all !important;\r\n  opacity: 1;\r\n}\r\n@-webkit-keyframes rotating {\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n  }\r\n}\r\n[cordial][rotating].cordial-icon {\r\n  -webkit-animation: rotating 1s ease-in-out 1;\r\n  pointer-events: none !important;\r\n}\r\n[cordial][checked].cordial-icon {\r\n  background-image: url(\"data:image/png;base64,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\");\r\n}\r\n[cordial][error].cordial-icon {\r\n  background-image: url(\"data:image/png;base64,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\");\r\n}\r\n[cordial][hidden].cordial-icon {\r\n  pointer-events: none !important;\r\n  opacity: 0;\r\n}\r\n\r\n@keyframes shrink {\r\n  0% {\r\n    width:20px ;\r\n    height: 20px ;\r\n  }\r\n\r\n  100% {\r\n    width:9px ;\r\n    height: 9px ;\r\n  }\r\n}\r\n\r\n@keyframes reverseshrink {\r\n  100% {\r\n    width:20px ;\r\n    height: 20px ;\r\n  }\r\n\r\n  0% {\r\n    width:9px ;\r\n    height: 9px ;\r\n  }\r\n}\r\n\r\n\r\n[cordial][writing].cordial-icon {\r\n  animation: shrink 0.2s;\r\n  width:9px ;\r\n  height: 9px ;\r\n}\r\n\r\n[cordial][stopped-writing].cordial-icon {\r\n  animation: reverseshrink 0.2s;\r\n  width:20px ;\r\n  height: 20px ;\r\n}\r\n\r\n\r\n\r\n/* Input */\r\n[cordial] .cordial-input {\r\n  white-space: pre !important;\r\n  overflow: hidden !important;\r\n  display: flex !important;\r\n  align-items: center !important;\r\n}\r\n[cordial] .cordial-input br {\r\n  display: none !important;\r\n}\r\n[cordial] .cordial-input * {\r\n  display: inline !important;\r\n  white-space: pre !important;\r\n}\r\n/* TextArea */\r\n[cordial] .cordial-textarea {\r\n  white-space: pre-wrap !important;\r\n  word-break: break-word !important;\r\n  overflow: hidden !important;\r\n}\r\n/* Editable div */\r\n[cordial] .cordial-editablediv {\r\n  overflow: hidden !important;\r\n}\r\n[cordial] .cordial-editablediv .cordial-element {\r\n  position: absolute !important;\r\n  border-bottom: 2px solid !important;\r\n}\r\n[cordial] .cordial-editablediv * {\r\n  text-decoration: none !important;\r\n}\r\n[cordial] .cordial-editablediv .cordial-error-grammar {\r\n  border-bottom-color: #6885bd !important;\r\n  background-color: rgba(104,133,189,0.15) !important;\r\n}\r\n[cordial] .cordial-editablediv .cordial-error-spell {\r\n  border-bottom-color: #e15555 !important;\r\n  background-color: rgba(225,85,85,0.15) !important;\r\n}\r\n/* Modal */\r\n[cordial].modal-cordial {\r\n  display: none;\r\n  position: fixed;\r\n  min-height: 150px;\r\n  min-width: 200px;\r\n  max-width: 250px;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n  z-index: 1000000 !important;\r\n  pointer-events: all !important;\r\n}\r\n[cordial].modal-cordial * {\r\n  pointer-events: all !important;\r\n}\r\n[cordial].modal-cordial.active {\r\n  display: block;\r\n}\r\n\r\n[cordial].modal-cordial .word-container {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-bottom: 5px;\r\n}\r\n[cordial].modal-cordial .dictionary-container {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n[cordial].modal-cordial .word-update-container {\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n[cordial].modal-cordial .align-right-container {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n[cordial].modal-cordial .ignore-action-container {\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n[cordial].modal-cordial .cross-icon {\r\n  float: right;\r\n  width: 20px;\r\n  height: 20px;\r\n  cursor: pointer;\r\n}\r\n[cordial].modal-cordial .cordial-icon {\r\n  height: 12px;\r\n  width: 12px;\r\n  margin-right: 2px;\r\n  cursor: pointer;\r\n}\r\n.ng.Lm {\r\n  background-image: none !important;\r\n  pointer-events: none !important;\r\n}\r\n.docs-bubble {\r\n  display: none !important;\r\n}\r\n.kix-spelling-error-overlay-container {\r\n  display: none !important;\r\n}\r\ndiv[contentEditable=\"true\"].public-DraftEditor-content {\r\n  height: inherit !important;\r\n}\r\n/* Toast */\r\n[cordial].cordial-toast {\r\n  position: fixed;\r\n  top: 30px;\r\n  right: 30px;\r\n  padding: 10px;\r\n  max-width: 300px;\r\n  font-size: 12px;\r\n  color: #fff;\r\n  background-color: #ee6969;\r\n  z-index: 10000000 !important;\r\n}\r\n";
	n(css,{});

	var common = /*#__PURE__*/Object.freeze({
		__proto__: null,
		css: css,
		default: css
	});

	var require$$7 = /*@__PURE__*/getAugmentedNamespace(common);

	const TextInput = TextInput_1;
	const TextArea = TextArea_1;
	const EditableDiv = EditableDiv_1;
	const ToolBox = ToolBox_1;
	const Modal = Modal_1;
	const Context = Context_1;
	const UPDATE_TIMEOUT = 2000;

	class Atlas {
	    static inputsQueryString = 'input[type="text"], input[type="search"], textarea, [contenteditable="true"], [contenteditable], iframe, body[id="tinymce"], body.cke_editable, div.kix-zoomdocumentplugin-inner, div.ve-ce-surface, div.CodeMirror-code, .now-input-field'
	    IsStarting() { return this.isStarting }

	    constructor(relativeDocument, relativeWindow, backbone, customCssSelector, parentContext = null) {
	        console.log("Atlas launched...");
	        this.context = new Context(relativeDocument, relativeWindow, parentContext);
	        this.context.SetModal(new Modal(this.context));
	        this._SetMetaTag();
	        this.inputs = new Set();
	        this.excludedInputs = new Set();
	        this.subAtlasInstances = [];
	        this.isUpdateActivated = true;
	        this.isStarting = true;
	        this.previousInnerWidth = this.context.RelativeWindow().innerWidth;
	        this.backbone = backbone;
	        this.updateInputsTimeout = null;
	        this.customCssSelector = customCssSelector;
	        if (this.context.ParentContext() == null) { //root Atlas instance
	            this._InsertCSS(relativeDocument, relativeDocument.head || this.context.RelativeDocument().getElementsByTagName('head')[0]);
	        }
	    }

	    Launch() {
	        this._UpdateInputs();
	        this.isStarting = false;
	    }

	    _UpdateInputs() {
	        if (this.isUpdateActivated && this.backbone.currentTabActive) {
	            const inputElements = this._FindAndExcludeInputs();
	            this._CheckIFramesReplacedInDOM();
	            if (inputElements.size > 0) {
	                let alreadyRegisteredInputs = new Set(Array.from(this.inputs).map(input => input.SourceElement()));
	                this._AddInputs(inputElements, alreadyRegisteredInputs);
	                this._RemoveOldInputs(inputElements, alreadyRegisteredInputs);
	            }
	        }
	        this.updateInputsTimeout = setTimeout(this._UpdateInputs.bind(this), UPDATE_TIMEOUT);
	    }

	    _FindAndExcludeInputs() {

	        const { includedElementsId, excludedElementsId } = this.customCssSelector || {};

	        // Find default inputs + custom inputs
	        let completeQueryString = Atlas.inputsQueryString;
	        if (includedElementsId && includedElementsId.length > 0) {
	            completeQueryString += " , " + includedElementsId;
	        }

	        let inputElements = new Set(this.context.DomParser().QuerySelectorAll(completeQueryString, this.context.RelativeDocument()));

	        // Exclude custom excluded inputs
	        if (excludedElementsId && excludedElementsId.length > 0) {
	            const customExcludedElements = this.context.DomParser().QuerySelectorAll(excludedElementsId, this.context.RelativeDocument());
	            customExcludedElements.forEach(element => this.excludedInputs.add(element));
	        }
	        return inputElements;
	    }

	    _AddInputs(inputElements, alreadyRegisteredInputs) {
	        inputElements.forEach(function (inputElement) {
	            const inputType = ToolBox.GetType(inputElement);
	            if (!alreadyRegisteredInputs.has(inputElement) && !this.excludedInputs.has(inputElement) && inputType !== undefined) {
	                const isInShadowRoot = this._IsInShadowRoot(inputElement);
	                if (isInShadowRoot && ToolBox.GetType(inputElement) != TYPES.IFRAME.VALUE) { // if element in shadow root => insert css in his context
	                    this._InsertCSS(this.context.RelativeDocument(), inputElement.parentNode);
	                }
	                switch (inputType) {
	                    case TYPES.INPUT_TEXT.VALUE:
	                        this.inputs.add(new TextInput(inputElement, this.context, this.backbone));
	                        break;
	                    case TYPES.TEXTAREA.VALUE:
	                        this.inputs.add(new TextArea(inputElement, this.context, this.backbone));
	                        break;
	                    case TYPES.EDITABLE_DIV.VALUE:
	                        this.inputs.add(new EditableDiv(inputElement, this.context, this.backbone));
	                        break;
	                    case TYPES.IFRAME.VALUE:
	                        try {
	                            let innerDocument = inputElement.contentWindow.document;
	                            // Ensure inner document is loaded before creating a new Atlas.
	                            if (innerDocument) {
	                                if (innerDocument.readyState === "complete")
	                                    this._InitSubAtlas(innerDocument, inputElement);
	                                else {
	                                    innerDocument.addEventListener('DOMContentLoaded', () => {
	                                        this._InitSubAtlas(innerDocument, inputElement);
	                                    });
	                                }
	                            }
	                        }
	                        catch (e) {
	                            console.log(e);
	                            this.excludedInputs.add(inputElement);
	                        }
	                        break;
	                }
	            }
	        }.bind(this));
	    }

	    _InitSubAtlas(innerDocument, inputElement) {
	        const atlas = this._GetNewAtlas(innerDocument, inputElement.contentWindow);
	        this.subAtlasInstances.push(atlas);
	        this.excludedInputs.add(inputElement);
	    }

	    _GetNewAtlas(doc, window) {
	        this._InsertCSS(doc, doc.head || this.context.RelativeDocument().getElementsByTagName('head')[0]);
	        const atlas = new Atlas(doc, window, this.backbone, this.customCssSelector, this.context);
	        atlas.Launch();
	        return atlas
	    }

	    _IsInShadowRoot(node) {
	        for (; node; node = node.parentNode) {
	            if (node.toString() === "[object ShadowRoot]") {
	                return true;
	            }
	        }
	        return false;
	    }

	    _RemoveOldInputs(inputElements, alreadyRegisteredInputs) {
	        inputElements = Array.from(inputElements);
	        alreadyRegisteredInputs.forEach(function (registeredInputElement) {
	            if (!inputElements.includes(registeredInputElement)) {
	                //temp array to find and remove from it (there is no find on Sets in JS...)
	                let inputArray = Array.from(this.inputs);
	                let inputToRemove = inputArray.find(input => input.SourceElement() === registeredInputElement);
	                let indexOfInputToRemove = inputArray.indexOf(inputToRemove);
	                inputArray.splice(indexOfInputToRemove, 1);
	                this.inputs = new Set(inputArray);
	            }
	        }.bind(this));
	    }

	    // Check if any iframe has been removed from the DOM and replaced with a copy with the same name
	    _CheckIFramesReplacedInDOM() {
	        let iframes = this.context.RelativeDocument().querySelectorAll('iframe');
	        iframes.forEach((iframe) => {
	            if (this._CanAccessIframe(iframe)) {
	                let metaTag = iframe.contentWindow.document.querySelector('meta[name="cordial"]');
	                if (!metaTag) {
	                    console.log("iframe with following title has most likely reset, resetting cordial in it");
	                    this._ClearSubAtlas(iframe);
	                }
	            }
	        });
	    }

	    _ClearSubAtlas(iframe) {
	        const previousAtlasIndex = this.subAtlasInstances.findIndex((atlas) => {
	            if (!atlas.context || !atlas.context.relativeWindow)
	                return;
	            const atlasWindow = atlas.context.RelativeWindow();
	            const metaContent = this._GetMetaTagContentForWindow(atlasWindow);
	            return metaContent === null;
	        });
	        if (previousAtlasIndex != -1) {
	            console.log("previous atlas Found");
	            const iframeWindow = iframe.contentWindow;
	            const iframeDocument = iframe.contentWindow.document;
	            this.subAtlasInstances[previousAtlasIndex].Destroy();
	            if (iframeDocument) {
	                if (iframeDocument.readyState === "complete")
	                    this.subAtlasInstances[previousAtlasIndex] = this._GetNewAtlas(iframeDocument, iframeWindow);
	                else {
	                    iframeDocument.addEventListener('DOMContentLoaded', () => {
	                        this.subAtlasInstances[previousAtlasIndex] = this._GetNewAtlas(iframeDocument, iframeWindow);
	                    });
	                }
	            }
	        }
	    }

	    // Check if iframe can be accessed, or if it is blocked, for instance if it violates cross-origin policy
	    _CanAccessIframe(iframe) {
	        try {
	            return Boolean(iframe.contentWindow.document);
	        }
	        catch (e) {
	            return false;
	        }
	    }

	    // Include a meta tag in any document or iframe in which Cordial is running
	    // If the tag is missing, it means Cordial is not running into it and we can try to reintroduce it
	    _SetMetaTag() {
	        const meta = this.context.RelativeDocument().createElement('meta');
	        meta.name = "cordial";
	        meta.content = "true";
	        this.context.RelativeDocument().getElementsByTagName('head')[0].appendChild(meta);
	    }

	    _GetMetaTagContentForWindow(window) {
	        if (window && window.document) {
	            const meta = [...window.document.head.children].find(headElements => {
	                return headElements.nodeName === "META" && headElements.name === Atlas.cordialMetaName
	            });
	            if (meta) {
	                return meta.content
	            }
	        }
	        return null
	    }

	    _InsertCSS(innerDocument, location) {
	        const css = require$$7;
	        let style = innerDocument.createElement('style');
	        location.appendChild(style);
	        style.type = 'text/css';
	        if (style.styleSheet) {
	            style.styleSheet.cssText = css.default; // Support for IE
	        }
	        else {
	            style.appendChild(this.context.RelativeDocument().createTextNode(css.default));
	        }
	    }

	    Destroy() {
	        clearTimeout(this.updateInputsTimeout);
	        this.isUpdateActivated = false;

	        // Destroy inputs
	        this.inputs.forEach(input => input.Destroy());
	        this.excludedInputs.forEach(input => input?.Destroy());
	        delete this.backbone;
	        delete this.isUpdateActivated;
	        delete this.isStarting;

	        // Destroy context
	        this.context?.Destroy();
	        delete this.context;

	        delete this.inputs;
	        delete this.excludedInputs;

	        this.subAtlasInstances.forEach(subAtlas => subAtlas?.Destroy());
	        delete this.subAtlasInstances;
	        delete this.previousInnerWidth;
	        delete this.customCssSelector;
	    }
	}

	var Atlas_1 = Atlas;

	let rootAtlasInstance = undefined;

	const StartAtlas = (backbone,customCssSelector) => {
	    if (rootAtlasInstance) {
	        rootAtlasInstance.Reset();
	    }
	    rootAtlasInstance = new Atlas_1(document, window, backbone,customCssSelector);
	    rootAtlasInstance.Launch();
	};

	const StartCordial = (backbone, customCssSelector=null) => {

	    if (document.readyState === "complete") {
	        StartAtlas(backbone,customCssSelector);
	    } else {
	        document.addEventListener('readystatechange', () => {
	            if (document.readyState === "complete")
	                StartAtlas(backbone,customCssSelector);
	        });
	    }
	};

	const config = { 
	    GATEWAY_URL: "https://cordial-business-gateway.azurewebsites.net/"
	};

	async function startAll(){
	    const {includedElementsId , excludedElementsId} = window.correctionData;
	    const customElementSelector = {includedElementsId, excludedElementsId};
	    const backbone = new Backbone(config.GATEWAY_URL, window.correctionData);
	    await backbone.IsUserConnected();
	    StartCordial(backbone, customElementSelector);
	}

	startAll();

})();
