'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var focusNext = function focusNext(focusables, currentIndex) {
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
};//
var script$3 = {
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
      focusables: [],
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
      var focusables = this.focusables;
      var index = this.indexOfUid(val);
      if (index < 0) return;
      focusables[index].$el.focus();
    }
  },
  methods: {
    handleFocusout: function handleFocusout() {
      this.active = false;
      this.focusedChild = -1;
      if (this.$refs.menu.contains(event.relatedTarget)) return;
      this.$emit('exitfocus');
    },
    registerFocus: function registerFocus(uid) {
      var index = this.indexOfUid(uid);
      this.focusedChild = uid;
    },
    registerBlur: function registerBlur(uid) {
      var index = this.indexOfUid(uid);
      if (this.focusedChild !== index) return;
      this.focusedChild = -1;
    },
    registerOption: function registerOption(optionVm) {
      this.focusables.push(optionVm);
    },
    unregisterOption: function unregisterOption(uid) {
      var index = this.indexOfUid(uid);
      if (index < 0) return;
      this.focusables.splice(index, 1);
    },
    indexOfUid: function indexOfUid(uid) {
      return this.focusables.findIndex(function (focusable) {
        return focusable._uid === uid;
      });
    },
    handleKeydownDown: function handleKeydownDown() {
      var active = this.active,
          focusables = this.focusables,
          indexOfUid = this.indexOfUid,
          focusedChild = this.focusedChild;
      if (!active) return;
      var index = focusNext(focusables, indexOfUid(focusedChild));
      this.focusedChild = focusables[index]._uid;
    },
    handleKeydownUp: function handleKeydownUp() {
      var active = this.active,
          focusables = this.focusables,
          indexOfUid = this.indexOfUid,
          focusedChild = this.focusedChild;
      if (!active) return;
      var index = focusPrev(focusables, indexOfUid(focusedChild));
      this.focusedChild = focusables[index]._uid;
    }
  }
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

        return _vm.handleKeydownUp($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
          return null;
        }

        return _vm.handleKeydownDown($event);
      }]
    }
  }, 'component', _vm.$attrs, false), _vm.$listeners), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-eb648ea0";
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

var __vue_module_identifier__$5 = "data-v-e3fea62a";
/* functional template */

var __vue_is_functional_template__$5 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,VcAsync: __vue_component__,VcMultiScreen: __vue_component__$1,VcResetable: __vue_component__$2,VcMenu: __vue_component__$3,VcOption: __vue_component__$4,VcToggle: __vue_component__$5});var install = function installVueCharge(Vue) {
  if (install.installed) return;
  install.installed = true;
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
exports.VcAsync=__vue_component__;exports.VcMenu=__vue_component__$3;exports.VcMultiScreen=__vue_component__$1;exports.VcOption=__vue_component__$4;exports.VcResetable=__vue_component__$2;exports.VcToggle=__vue_component__$5;exports.default=plugin;