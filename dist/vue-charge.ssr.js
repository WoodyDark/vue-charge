'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: 'VcAsync',
  props: {
    promise: {
      type: Function,
      required: true
    },
    default: {
      type: String,
      default: 'pending'
    },
    wrap: {
      type: String,
      default: undefined
    }
  },
  data: function data() {
    return {
      state: 'idle',
      error: null,
      response: null
    };
  },
  watch: {
    state: {
      immediate: true,
      handler: function handler(val, oldval) {
        if (val === 'pending') this.executePromise();
        if (val !== 'resolved') this.response = null;
        if (val !== 'rejected') this.error = null;
      }
    }
  },
  methods: {
    execute: function execute() {
      this.$emit('pending');
      this.state = 'pending';
    },
    executePromise: function executePromise() {
      var _this = this;

      this.promise().then(function (response) {
        _this.state = 'resolved';
        _this.response = response;

        _this.$emit('resolved', response);
      }).catch(function (error) {
        _this.state = 'rejected';
        _this.error = error;

        _this.$emit('rejected', error);
      });
    },
    reset: function reset() {
      this.state = 'idle';
    }
  },
  created: function created() {
    this.state = this.default;
  },
  render: function render(h) {
    var _this$$scopedSlots$re, _this$$scopedSlots;

    var state = this.state,
        execute = this.execute,
        reset = this.reset,
        response = this.response,
        error = this.error,
        wrap = this.wrap;
    var renderSlot = this.$scopedSlots.default ? 'default' : state;
    var content = (_this$$scopedSlots$re = (_this$$scopedSlots = this.$scopedSlots)[renderSlot]) === null || _this$$scopedSlots$re === void 0 ? void 0 : _this$$scopedSlots$re.call(_this$$scopedSlots, {
      state: state,
      execute: execute,
      reset: reset,
      response: response,
      error: error
    });
    return wrap ? h(wrap, content) : content;
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-ac0ef2be";
/* functional template */

var __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var script$1 = {
  name: 'VcMultiscreen',
  props: {
    screens: {
      type: Array,
      required: true
    },
    wrap: {
      type: String,
      default: undefined
    }
  },
  data: function data() {
    return {
      screen: ''
    };
  },
  methods: {
    transition: function transition(screen) {
      this.$emit('transition', screen);
      this.screen = screen;
    }
  },
  created: function created() {
    this.screen = this.screens[0];
  },
  render: function render(h) {
    var _this$$scopedSlots$sc, _this$$scopedSlots;

    var screen = this.screen,
        transition = this.transition,
        wrap = this.wrap;
    var content = (_this$$scopedSlots$sc = (_this$$scopedSlots = this.$scopedSlots)[screen]) === null || _this$$scopedSlots$sc === void 0 ? void 0 : _this$$scopedSlots$sc.call(_this$$scopedSlots, {
      screen: screen,
      transition: transition
    });
    return wrap ? h(wrap, content) : content;
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-216f947e";
/* functional template */

var __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var script$2 = {
  name: 'VcResetable',
  props: {
    wrap: {
      type: String,
      default: undefined
    }
  },
  data: function data() {
    return {
      counter: 0
    };
  },
  methods: {
    reset: function reset() {
      this.counter++;
    }
  },
  computed: {
    key: function key() {
      return "vc-resetable-".concat(this._uid * 1000 + this.counter);
    }
  },
  render: function render(h) {
    var key = this.key,
        reset = this.reset,
        wrap = this.wrap;
    var content = this.$scopedSlots.default({
      key: key,
      reset: reset
    });
    return wrap ? h(wrap, content) : content;
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-30670aab";
/* functional template */

var __vue_is_functional_template__$2 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var createRegistrable = function createRegistrable(storeKey, vmReference) {
  var _ref;

  var reference = vmReference.charAt(0).toUpperCase() + vmReference.slice(1);
  var registerFn = "register".concat(reference);
  var unregisterFn = "unregister".concat(reference);
  var indexFn = "indexOf".concat(reference);
  return _ref = {}, _defineProperty(_ref, registerFn, function (vm) {
    this[storeKey].push(vm);
  }), _defineProperty(_ref, unregisterFn, function (uid) {
    var index = this[indexFn](uid);
    if (index < 0) return;
    this[storeKey].splice(index, 1);
  }), _defineProperty(_ref, indexFn, function (uid) {
    return this[storeKey].findIndex(function (vm) {
      return vm._uid === uid;
    });
  }), _ref;
};var focusNext = function focusNext(focusables, currentIndex) {
  if (focusables.length === 0) return -1;

  if (currentIndex >= 0) {
    if (currentIndex === focusables.length - 1) {
      return 0;
    } else {
      return currentIndex + 1;
    }
  } else {
    return 0;
  }
};
var focusPrev = function focusPrev(focusables, currentIndex) {
  if (focusables.length === 0) return -1;

  if (currentIndex >= 0) {
    if (currentIndex === 0) {
      return focusables.length - 1;
    } else {
      return currentIndex - 1;
    }
  } else {
    return focusables.length - 1;
  }
};var script$3 = {
  name: 'VcMenu',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data: function data() {
    return {
      active: false,
      options: [],
      focusedChild: -1
    };
  },
  provide: function provide() {
    return {
      vcMenu: this
    };
  },
  watch: {
    focusedChild: function focusedChild(val) {
      var options = this.options;
      var index = this.indexOfOption(val);
      if (index < 0) return;
      options[index].$el.focus();
    }
  },
  methods: _objectSpread2(_objectSpread2({}, createRegistrable('options', 'option')), {}, {
    handleFocusout: function handleFocusout() {
      this.active = false;
      this.focusedChild = -1;
      if (this.$refs.menu.contains(event.relatedTarget)) return;
      this.$emit('exitfocus');
    },
    registerFocus: function registerFocus(uid) {
      var index = this.indexOfOption(uid);
      this.focusedChild = uid;
    },
    registerBlur: function registerBlur(uid) {
      var index = this.indexOfOption(uid);
      if (this.focusedChild !== index) return;
      this.focusedChild = -1;
    },
    focusNext: function focusNext$1() {
      var active = this.active,
          options = this.options,
          indexOfOption = this.indexOfOption,
          focusedChild = this.focusedChild;
      if (!active) return;

      var index = focusNext(options, indexOfOption(focusedChild));

      this.focusedChild = index < 0 ? -1 : options[index]._uid;
    },
    focusPrev: function focusPrev$1() {
      var active = this.active,
          options = this.options,
          indexOfOption = this.indexOfOption,
          focusedChild = this.focusedChild;
      if (!active) return;

      var index = focusPrev(options, indexOfOption(focusedChild));

      this.focusedChild = index < 0 ? -1 : options[index]._uid;
    }
  })
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g(_vm._b({
    ref: "menu",
    tag: "component",
    on: {
      "focusin": function focusin($event) {
        _vm.active = true;
      },
      "focusout": _vm.handleFocusout,
      "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
          return null;
        }

        return _vm.focusPrev($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
          return null;
        }

        return _vm.focusNext($event);
      }]
    }
  }, 'component', _vm.$attrs, false), _vm.$listeners), [_vm._t("default", null, null, {
    focusNext: _vm.focusNext,
    focusPrev: _vm.focusPrev
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-6e46e397";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
var script$4 = {
  name: 'VcOption',
  props: {
    tag: {
      type: String,
      default: 'button'
    }
  },
  inject: ['vcMenu'],
  methods: {
    registerFocus: function registerFocus() {
      this.vcMenu.registerFocus(this._uid);
    },
    registerBlur: function registerBlur() {
      this.vcMenu.registerBlur(this._uid);
    }
  },
  created: function created() {
    this.vcMenu.registerOption(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.vcMenu.unregisterOption(this._uid);
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        scopedSlots = _ref.scopedSlots;
    h(props.tag, scopedSlots.default());
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g(_vm._b({
    tag: "component",
    on: {
      "focus": _vm.registerFocus,
      "blur": _vm.registerBlur
    }
  }, 'component', _vm.$attrs, false), _vm.$listeners), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-7b8c6610";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);var script$5 = {
  name: 'VcToggle',
  data: function data() {
    return {
      activated: false
    };
  },
  methods: {
    toggle: function toggle() {
      if ([true, false].includes(arguments[0])) {
        this.activated = arguments[0];
      } else {
        this.activated = !this.activated;
      }
    }
  },
  render: function render() {
    var activated = this.activated,
        toggle = this.toggle;
    return this.$scopedSlots.default({
      activated: activated,
      toggle: toggle
    });
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-4eb590c6";
/* functional template */

var __vue_is_functional_template__$5 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);var prependZero = function prependZero(num) {
  return ('0' + num).slice(-2);
};function serializeMonthDates(dateString) {
  var splitDate = dateString.split('-');
  var year = splitDate[0];
  var month = splitDate[1];
  var maxDate = new Date(year, month, 0).getDate();
  var dates = [];

  for (var i = 0; i < maxDate; i++) {
    var formattedDate = "".concat(year, "-").concat(prependZero(month), "-").concat(prependZero(i + 1));
    dates.push(formattedDate);
  }

  return dates;
}var formatDate = function formatDate(datetime) {
  var date = new Date(datetime);
  return "".concat(date.getFullYear(), "-").concat(prependZero(date.getMonth() + 1), "-").concat(prependZero(date.getDate()));
};var weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var padRight = function padRight(formattedDate, weekday) {
  var date = new Date(formattedDate);
  var dates = [];

  while (weekdays[date.getDay()] !== weekday) {
    var newDate = formatDate(date.setDate(date.getDate() + 1));
    dates.push(newDate);
  }

  return dates;
};

var padLeft = function padLeft(formattedDate, weekday) {
  var date = new Date(formattedDate);
  var dates = [];

  while (weekdays[date.getDay()] !== weekday) {
    var newDate = formatDate(date.setDate(date.getDate() - 1));
    dates.push(newDate);
  }

  return dates.reverse();
};

var dateMeta = function dateMeta(formattedDate) {
  var jsDate = new Date(formattedDate);
  return {
    formatted: formattedDate,
    js: jsDate,
    weekday: weekdays[jsDate.getDay()],
    date: jsDate.getDate(),
    prepended: prependZero(jsDate.getDate())
  };
};

var script$6 = {
  name: 'VcDates',
  props: {
    wrap: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: formatDate(new Date())
    },
    weekStart: {
      type: String,
      default: 'sunday',
      validator: function validator(val) {
        return weekdays.indexOf(val) > -1;
      }
    },
    fill: {
      type: String,
      default: 'right',
      validator: function validator(val) {
        return ['left', 'right'].indexOf(val) > -1;
      }
    }
  },
  computed: {
    weekEnd: function weekEnd() {
      var weekEndIndex = weekdays.indexOf(this.weekStart) + 6;
      if (weekEndIndex > 6) weekEndIndex -= 6;
      return weekdays[weekEndIndex];
    },
    monthView: function monthView() {
      return serializeMonthDates(this.value).map(function (formattedDate) {
        return dateMeta(formattedDate);
      });
    },
    paddedMonthView: function paddedMonthView() {
      var weekStart = this.weekStart,
          weekEnd = this.weekEnd;
      var formattedMonthDates = this.monthView.map(function (meta) {
        return meta.formatted;
      });
      var leftPads = padLeft(formattedMonthDates[0], weekStart).map(function (formattedDate) {
        return _objectSpread2(_objectSpread2({}, dateMeta(formattedDate)), {}, {
          padding: true
        });
      });
      var rightPads = padRight(formattedMonthDates[formattedMonthDates.length - 1], weekEnd).map(function (formattedDate) {
        return _objectSpread2(_objectSpread2({}, dateMeta(formattedDate)), {}, {
          padding: true
        });
      });
      var mainDates = formattedMonthDates.map(function (formattedDate) {
        return dateMeta(formattedDate);
      });
      return [].concat(_toConsumableArray(leftPads), _toConsumableArray(mainDates), _toConsumableArray(rightPads));
    },
    filledMonthView: function filledMonthView() {
      var paddedMonthView = this.paddedMonthView,
          weekEnd = this.weekEnd,
          weekStart = this.weekStart,
          fill = this.fill;
      var dates = paddedMonthView.map(function (meta) {
        return _objectSpread2(_objectSpread2({}, meta), {}, {
          js: new Date(meta.formatted)
        });
      });

      while (dates.length < 42) {
        var index = fill === 'right' ? dates.length - 1 : 0;
        var lastDate = new Date(dates[index].formatted);
        var date = fill === 'right' ? lastDate.getDate() + 1 : lastDate.getDate() - 1;
        var nextDay = lastDate.setDate(date);
        var paddings = [formatDate(nextDay)].concat(_toConsumableArray(fill === 'right' ? padRight(formatDate(nextDay), weekEnd) : padLeft(formatDate(nextDay), weekStart)));
        dates = [].concat(_toConsumableArray(dates), _toConsumableArray(paddings.map(function (formattedDate) {
          return _objectSpread2(_objectSpread2({}, dateMeta(formattedDate)), {}, {
            padding: true
          });
        }))).sort(function (a, b) {
          return a.js - b.js;
        });
      }

      return dates;
    },
    weekView: function weekView() {
      var value = this.value,
          weekStart = this.weekStart,
          weekEnd = this.weekEnd;
      return [].concat(_toConsumableArray(padLeft(value, weekStart)), [value], _toConsumableArray(padRight(value, weekEnd))).map(function (formattedDate) {
        return dateMeta(formattedDate);
      });
    }
  },
  render: function render(h) {
    var wrap = this.wrap,
        monthView = this.monthView,
        weekView = this.weekView,
        paddedMonthView = this.paddedMonthView,
        filledMonthView = this.filledMonthView;
    var content = this.$scopedSlots.default({
      monthView: monthView,
      weekView: weekView,
      paddedMonthView: paddedMonthView,
      filledMonthView: filledMonthView
    });
    return wrap ? h(wrap, content) : content;
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = "data-v-4caf8abb";
/* functional template */

var __vue_is_functional_template__$6 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);var wdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var capString = function capString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var dayHelpers = {};
wdays.forEach(function (day) {
  dayHelpers["".concat(day, "s")] = function () {
    var value = this.value;
    if (!value) return [];
    return serializeMonthDates(value).filter(function (formattedDate) {
      return new Date(formattedDate).getDay() === wdays.indexOf(day);
    });
  };
});
var script$7 = {
  name: 'VcWeekdays',
  props: {
    wrap: {
      type: String,
      default: undefined
    },
    weekStart: {
      type: String,
      default: 'sunday'
    },
    value: {
      type: String,
      default: undefined
    }
  },
  computed: _objectSpread2({
    weekEnd: function weekEnd() {
      var weekEndIndex = wdays.indexOf(this.weekStart) + 6;
      if (weekEndIndex > 6) weekEndIndex -= 6;
      return wdays[weekEndIndex];
    },
    weekdays: function weekdays() {
      var weekdays = [];
      var startIndex = wdays.indexOf(this.weekStart);
      wdays.forEach(function (day) {
        if (wdays.indexOf(day) >= startIndex) {
          weekdays.push(day);
        }
      });
      wdays.forEach(function (day) {
        if (wdays.indexOf(day) < startIndex) {
          weekdays.push(day);
        }
      });
      return weekdays.map(function (day) {
        var capDay = capString(day);
        return {
          day: capDay,
          short: capDay.substr(0, 3),
          value: day
        };
      });
    }
  }, dayHelpers),
  render: function render(h) {
    var _this = this;

    var wrap = this.wrap,
        weekdays = this.weekdays;
    var helperNames = Object.keys(dayHelpers);
    var helpers = {};
    helperNames.forEach(function (fnName) {
      helpers[fnName] = _this[fnName];
    });
    var content = this.$scopedSlots.default(_objectSpread2({
      weekdays: weekdays
    }, helpers));
    return wrap ? h(wrap, content) : content;
  }
};/* script */
var __vue_script__$7 = script$7;
/* template */

/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = "data-v-0de3f608";
/* functional template */

var __vue_is_functional_template__$7 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);var script$8 = {
  name: 'VcValidatable',
  inject: ['vcForm'],
  props: {
    wrap: {
      type: String,
      default: ' '
    },
    value: {
      type: undefined,
      default: undefined
    },
    rules: {
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(val) {
        return val.every(function (fn) {
          return typeof fn === 'function';
        });
      }
    }
  },
  data: function data() {
    return {
      validity: false,
      error: undefined
    };
  },
  watch: {
    value: function value() {
      this.validate();
    }
  },
  methods: {
    validate: function validate() {
      var _this = this;

      var rules = this.rules,
          value = this.value;

      if (rules.length === 0) {
        this.validity = true;
        this.error = undefined;
      } else {
        rules.forEach(function (rule) {
          var result = rule(value);

          if (typeof result === 'string') {
            _this.error = result;
            _this.validity = false;
          } else {
            _this.validity = !!result;
            _this.error = undefined;
          }
        });
      }
    },
    resetValidation: function resetValidation() {
      this.error = undefined;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.vcForm.unregisterValidatable(this._uid);
  },
  created: function created() {
    this.vcForm.registerValidatable(this);
  },
  render: function render(h) {
    var error = this.error,
        validity = this.validity,
        validate = this.validate,
        resetValidation = this.resetValidation,
        wrap = this.wrap;
    var content = this.$scopedSlots.default({
      error: error,
      validity: validity,
      validate: validate,
      resetValidation: resetValidation
    });
    return wrap ? h(wrap, content) : content;
  }
};/* script */
var __vue_script__$8 = script$8;
/* template */

/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = "data-v-086744c4";
/* functional template */

var __vue_is_functional_template__$8 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);var script$9 = {
  name: 'VcForm',
  data: function data() {
    return {
      validatables: []
    };
  },
  provide: function provide() {
    return {
      vcForm: this
    };
  },
  methods: _objectSpread2(_objectSpread2({}, createRegistrable('validatables', 'validatable')), {}, {
    validate: function validate() {
      this.validatables.forEach(function (validatable) {
        return validatable.validate();
      });
    },
    resetValidation: function resetValidation() {
      this.validatables.forEach(function (validatable) {
        return validatable.resetValidation();
      });
    }
  }),
  computed: {
    status: function status() {
      var result = this.validatables.every(function (validatable) {
        return validatable.validity;
      });
      this.$emit('input', result);
      return result;
    }
  },
  mounted: function mounted() {
    this.validate();
    this.resetValidation();
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', _vm._g(_vm._b({}, 'form', _vm.$attrs, false), _vm.$listeners), [_vm._t("default", null, null, {
    validate: _vm.validate,
    resetValidation: _vm.resetValidation,
    value: _vm.status
  })], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = "data-v-64dea15a";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$a = {
  name: 'VcDialogContentWrapper',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    emitInput: {
      type: Function,
      required: true
    },
    transition: {
      type: undefined,
      default: undefined
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '600px'
    },
    maxHeight: {
      type: String,
      default: '90%'
    },
    maxWidth: {
      type: String,
      default: '90%'
    },
    removeCenter: {
      type: Boolean,
      default: false
    },
    backgroundOpacity: {
      type: Number,
      default: 0.5
    },
    registerWrapper: {
      type: Function,
      required: true
    }
  },
  inject: ['vcApp'],
  data: function data() {
    return {
      showSelf: false,
      showContent: false
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(val) {
        if (val) {
          this.showSelf = val;
        } else {
          this.showContent = val;
        }
      }
    }
  },
  methods: {
    toggle: function toggle() {
      var state = [true, false].includes(arguments[0]) ? arguments[0] : !showSelf;

      if (state) {
        this.showSelf = state;
      } else {
        this.showContent = state;
      }
    }
  },
  computed: {
    margin: function margin() {
      return this.removeCenter ? '' : 'auto';
    }
  },
  created: function created() {
    this.vcApp.registerDialogWrapper(this);
    this.registerWrapper(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.registerWrapper(null);
    this.vcApp.unregisterDialogWrapper(this._uid);
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    },
    on: {
      "after-enter": function afterEnter($event) {
        _vm.showContent = true;
      },
      "after-leave": function afterLeave($event) {
        return _vm.emitInput(false);
      }
    }
  }, [_vm.showSelf ? _c('div', {
    staticClass: "vc-dialog-content-wrapper__document",
    style: "background-color: rgba(0,0,0, " + _vm.backgroundOpacity + ");",
    attrs: {
      "tabindex": "-1",
      "role": "document"
    }
  }, [_c('button', {
    staticClass: "vc-dialog-content-wrapper__button",
    attrs: {
      "tabindex": "-1"
    },
    on: {
      "click": function click($event) {
        _vm.showContent = false;
      }
    }
  }), _vm._v(" "), _c('transition', _vm._b({
    on: {
      "after-leave": function afterLeave($event) {
        _vm.showSelf = false;
      }
    }
  }, 'transition', _vm.transition, false), [_vm.showContent ? _c('div', {
    staticClass: "vc-dialog-content-wrapper__content-holder",
    style: {
      width: _vm.width,
      maxHeight: _vm.maxHeight,
      maxWidth: _vm.maxWidth,
      margin: _vm.margin
    }
  }, [_vm._t("default")], 2) : _vm._e()])], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-5ef25b27_0", {
    source: ".vc-dialog-content-wrapper__button[data-v-5ef25b27]{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none;-webkit-appearance:button;background-color:transparent;background-image:none;padding:0;line-height:inherit;color:inherit;cursor:default;outline:0;position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0}.vc-dialog-content-wrapper__document[data-v-5ef25b27]{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1050;touch-action:none}.vc-dialog-content-wrapper__content-holder[data-v-5ef25b27]{overflow:auto;position:absolute;height:fit-content;top:0;left:0;right:0;bottom:0;touch-action:none}.fade-enter-active[data-v-5ef25b27],.fade-leave-active[data-v-5ef25b27]{transition:opacity ease-in-out .1s}.fade-enter[data-v-5ef25b27],.fade-leave-to[data-v-5ef25b27]{opacity:0}.scale-enter-active[data-v-5ef25b27],.scale-leave-active[data-v-5ef25b27]{transition:transform ease-out .1s}.scale-enter[data-v-5ef25b27],.scale-leave-to[data-v-5ef25b27]{transform:scale(0)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$a = "data-v-5ef25b27";
/* module identifier */

var __vue_module_identifier__$a = "data-v-5ef25b27";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, createInjectorSSR, undefined);var script$b = {
  name: 'VcDialogRenderer',
  functional: true,
  components: {
    VcDialogContentWrapper: __vue_component__$a
  },
  props: {
    dialogs: {
      type: Array,
      default: []
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props;
    return props.dialogs.map(function (dialog) {
      return h(__vue_component__$a, {
        attrs: {
          id: "vc-dialog-".concat(dialog._uid)
        },
        props: {
          value: dialog.value,
          emitInput: dialog.emitInput,
          transition: dialog.transition,
          autofocus: dialog.autofocus,
          width: dialog.width,
          maxHeight: dialog.maxHeight,
          maxWidth: dialog.maxWidth,
          removeCenter: dialog.removeCenter,
          backgroundOpacity: dialog.backgroundOpacity,
          registerWrapper: dialog.registerWrapper
        },
        scopedSlots: {
          default: function _default() {
            return dialog.$scopedSlots.default({
              toggle: dialog.toggle
            });
          }
        }
      });
    });
  }
};/* script */
var __vue_script__$b = script$b;
/* template */

/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = "data-v-d3c92f92";
/* functional template */

var __vue_is_functional_template__$b = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);function getFocusables(el) {
  return _toConsumableArray(el.querySelectorAll('button, [href], input, select, textarea, [tabindex]')).filter(function (el) {
    return el.getAttribute('tabindex') !== '-1';
  });
}

var script$c = {
  name: 'VcApp',
  components: {
    VcDialogRenderer: __vue_component__$b
  },
  provide: function provide() {
    return {
      vcApp: this
    };
  },
  data: function data() {
    return {
      dialogs: [],
      dialogWrappers: []
    };
  },
  watch: {
    dialogWrapperStates: {
      immediate: true,
      handler: function handler() {
        var _this = this;

        this.$nextTick(function () {
          var lastDialogWrapper = _this.lastDialogWrapper();

          if (lastDialogWrapper) {
            document.body.style.overflow = 'hidden';
            var dialogEl = lastDialogWrapper.$el;

            if (lastDialogWrapper.autofocus) {
              var focusables = getFocusables(dialogEl);
              focusables.length > 0 ? focusables[0].focus() : dialogEl.focus();
            } else {
              dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.focus();
            }
          } else {
            document.body.style.overflow = '';
          }
        });
      }
    }
  },
  computed: {
    dialogWrapperStates: function dialogWrapperStates() {
      return this.dialogWrappers.map(function (wrapper) {
        return wrapper.showSelf;
      });
    }
  },
  methods: _objectSpread2(_objectSpread2(_objectSpread2({}, createRegistrable('dialogs', 'dialog')), createRegistrable('dialogWrappers', 'dialogWrapper')), {}, {
    lastDialogWrapper: function lastDialogWrapper() {
      var dialogWrappers = this.dialogWrappers;
      var index = dialogWrappers.map(function (wrapper) {
        return wrapper.showSelf;
      }).lastIndexOf(true);
      return dialogWrappers[index];
    },
    toggleDialog: function toggleDialog(uid, val) {
      var index = this.indexOfDialog(uid);
      this.dialogWrappers[index].toggle(val);
    },
    escHandler: function escHandler() {
      var lastDialogWrapper = this.lastDialogWrapper();

      if (event.key === 'Escape' && lastDialogWrapper) {
        lastDialogWrapper.toggle(false);
      }
    },
    tabHandler: function tabHandler() {
      var lastDialogWrapper = this.lastDialogWrapper();

      if (event.key === 'Tab' && lastDialogWrapper) {
        var dialogEl = lastDialogWrapper.$el;
        var focusables = getFocusables(dialogEl);
        var toBeFocusIndex = event.shiftKey ? focusPrev(focusables, focusables.indexOf(event.target)) : focusNext(focusables, focusables.indexOf(event.target));
        focusables[toBeFocusIndex].focus();
        event.preventDefault();
      }
    }
  }),
  created: function created() {
    document.body.addEventListener('keydown', this.escHandler);
    document.body.addEventListener('keydown', this.tabHandler);
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('keydown', this.escHandler);
    document.body.removeEventListener('keydown', this.tabHandler);
  }
};/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._g(_vm._b({
    ref: "vcApp"
  }, 'div', _vm.$attrs, false), _vm.$listeners), [_vm._t("default"), _vm._ssrNode(" "), _c('vc-dialog-renderer', {
    attrs: {
      "dialogs": _vm.dialogs
    }
  })], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = "data-v-52ca41e9";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);var script$d = {
  name: 'VcDialog',
  inject: ['vcApp'],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    transition: {
      type: undefined,
      default: function _default() {
        return {
          name: 'scale'
        };
      }
    },
    width: {
      type: String,
      default: '600px'
    },
    maxHeight: {
      type: String,
      default: '90%'
    },
    maxWidth: {
      type: String,
      default: '90%'
    },
    removeCenter: {
      type: Boolean,
      default: false
    },
    backgroundOpacity: {
      type: Number,
      default: 0.5
    }
  },
  data: function data() {
    return {
      wrapper: null
    };
  },
  methods: {
    emitInput: function emitInput(val) {
      this.$emit('input', val);
    },
    registerWrapper: function registerWrapper(wrapper) {
      this.wrapper = wrapper;
    },
    toggle: function toggle() {
      this.wrapper.toggle([true, false].includes(arguments[0]) ? arguments[0] : undefined);
    }
  },
  created: function created() {
    this.vcApp.registerDialog(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.vcApp.unregisterDialog(this._uid);
  },
  render: function render(h) {
    var _this$$scopedSlots$ac, _this$$scopedSlots;

    var toggle = this.toggle;
    return (_this$$scopedSlots$ac = (_this$$scopedSlots = this.$scopedSlots).activator) === null || _this$$scopedSlots$ac === void 0 ? void 0 : _this$$scopedSlots$ac.call(_this$$scopedSlots, {
      toggle: toggle
    });
  }
};/* script */
var __vue_script__$d = script$d;
/* template */

/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = "data-v-243cae83";
/* functional template */

var __vue_is_functional_template__$d = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,VcAsync: __vue_component__,VcMultiScreen: __vue_component__$1,VcResetable: __vue_component__$2,VcMenu: __vue_component__$3,VcOption: __vue_component__$4,VcToggle: __vue_component__$5,VcDates: __vue_component__$6,VcWeekdays: __vue_component__$7,VcValidatable: __vue_component__$8,VcForm: __vue_component__$9,VcApp: __vue_component__$c,VcDialog: __vue_component__$d});var install = function installVueCharge(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.prototype.$vc = {
    run: function run() {
      var callbacks = Array.prototype.slice.call(arguments);
      callbacks.forEach(function (fn) {
        typeof fn === 'function' ? fn() : fn;
      });
    },
    assign: function assign(key, value) {
    },
    log: function log() {
      var _console;

      (_console = console).log.apply(_console, arguments);
    },
    goldenRatio: 1.618
  };
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.VcApp=__vue_component__$c;exports.VcAsync=__vue_component__;exports.VcDates=__vue_component__$6;exports.VcDialog=__vue_component__$d;exports.VcForm=__vue_component__$9;exports.VcMenu=__vue_component__$3;exports.VcMultiScreen=__vue_component__$1;exports.VcOption=__vue_component__$4;exports.VcResetable=__vue_component__$2;exports.VcToggle=__vue_component__$5;exports.VcValidatable=__vue_component__$8;exports.VcWeekdays=__vue_component__$7;exports.default=plugin;