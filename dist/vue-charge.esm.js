var script = {
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

  data() {
    return {
      state: 'idle',
      error: null,
      response: null
    };
  },

  watch: {
    state: {
      immediate: true,

      handler(val, oldval) {
        if (val === 'pending') this.executePromise();
        if (val !== 'resolved') this.response = null;
        if (val !== 'rejected') this.error = null;
      }

    }
  },
  methods: {
    execute() {
      this.$emit('pending');
      this.state = 'pending';
    },

    executePromise() {
      this.promise().then(response => {
        this.state = 'resolved';
        this.response = response;
        this.$emit('resolved', response);
      }).catch(error => {
        this.state = 'rejected';
        this.error = error;
        this.$emit('rejected', error);
      });
    },

    reset() {
      this.state = 'idle';
    }

  },

  created() {
    this.state = this.default;
  },

  render(h) {
    const {
      state,
      execute,
      reset,
      response,
      error,
      wrap
    } = this;
    const renderSlot = this.$scopedSlots.default ? 'default' : state;
    const content = this.$scopedSlots[renderSlot]?.({
      state,
      execute,
      reset,
      response,
      error
    });
    return wrap ? h(wrap, content) : content;
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var script$1 = {
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

  data() {
    return {
      screen: ''
    };
  },

  methods: {
    transition(screen) {
      this.$emit('transition', screen);
      this.screen = screen;
    }

  },

  created() {
    this.screen = this.screens[0];
  },

  render(h) {
    const {
      screen,
      transition,
      wrap
    } = this;
    const content = this.$scopedSlots[screen]?.({
      screen,
      transition
    });
    return wrap ? h(wrap, content) : content;
  }

};

/* script */
const __vue_script__$1 = script$1;
/* template */

/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var script$2 = {
  name: 'VcResetable',
  props: {
    wrap: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      counter: 0
    };
  },

  methods: {
    reset() {
      this.counter++;
    }

  },
  computed: {
    key() {
      return `vc-resetable-${this._uid * 1000 + this.counter}`;
    }

  },

  render(h) {
    const {
      key,
      reset,
      wrap
    } = this;
    const content = this.$scopedSlots.default({
      key,
      reset
    });
    return wrap ? h(wrap, content) : content;
  }

};

/* script */
const __vue_script__$2 = script$2;
/* template */

/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

const focusNext = (focusables, currentIndex) => {
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
const focusPrev = (focusables, currentIndex) => {
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
};

//
var script$3 = {
  name: 'VcMenu',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },

  data() {
    return {
      active: false,
      focusables: [],
      focusedChild: -1
    };
  },

  provide() {
    return {
      vcMenu: this
    };
  },

  watch: {
    focusedChild(val) {
      const {
        focusables
      } = this;
      const index = this.indexOfUid(val);
      if (index < 0) return;
      focusables[index].$el.focus();
    }

  },
  methods: {
    handleFocusout() {
      this.active = false;
      this.focusedChild = -1;
      if (this.$refs.menu.contains(event.relatedTarget)) return;
      this.$emit('exitfocus');
    },

    registerFocus(uid) {
      const index = this.indexOfUid(uid);
      this.focusedChild = uid;
    },

    registerBlur(uid) {
      const index = this.indexOfUid(uid);
      if (this.focusedChild !== index) return;
      this.focusedChild = -1;
    },

    registerOption(optionVm) {
      this.focusables.push(optionVm);
    },

    unregisterOption(uid) {
      const index = this.indexOfUid(uid);
      if (index < 0) return;
      this.focusables.splice(index, 1);
    },

    indexOfUid(uid) {
      return this.focusables.findIndex(focusable => focusable._uid === uid);
    },

    focusNext() {
      const {
        active,
        focusables,
        indexOfUid,
        focusedChild
      } = this;
      if (!active) return;
      const index = focusNext(focusables, indexOfUid(focusedChild));
      this.focusedChild = focusables[index]._uid;
    },

    focusPrev() {
      const {
        active,
        focusables,
        indexOfUid,
        focusedChild
      } = this;
      if (!active) return;
      const index = focusPrev(focusables, indexOfUid(focusedChild));
      this.focusedChild = focusables[index]._uid;
    }

  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g(_vm._b({
    ref: "menu",
    tag: "component",
    on: {
      "focusin": function ($event) {
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

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

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
    registerFocus() {
      this.vcMenu.registerFocus(this._uid);
    },

    registerBlur() {
      this.vcMenu.registerBlur(this._uid);
    }

  },

  created() {
    this.vcMenu.registerOption(this);
  },

  beforeDestroy() {
    this.vcMenu.unregisterOption(this._uid);
  },

  render(h, {
    props,
    scopedSlots
  }) {
    h(props.tag, scopedSlots.default());
  }

};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$1 = function () {
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

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var script$5 = {
  data() {
    return {
      activated: false
    };
  },

  methods: {
    toggle() {
      if ([true, false].includes(arguments[0])) {
        this.activated = arguments[0];
      } else {
        this.activated = !this.activated;
      }
    }

  },

  render() {
    const {
      activated,
      toggle
    } = this;
    return this.$scopedSlots.default({
      activated,
      toggle
    });
  }

};

/* script */
const __vue_script__$5 = script$5;
/* template */

/* style */

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

const prependZero = num => ('0' + num).slice(-2);

function serializeMonthDates(dateString) {
  const splitDate = dateString.split('-');
  const year = splitDate[0];
  const month = splitDate[1];
  const maxDate = new Date(year, month, 0).getDate();
  let dates = [];

  for (let i = 0; i < maxDate; i++) {
    const formattedDate = `${year}-${prependZero(month)}-${prependZero(i + 1)}`;
    dates.push(formattedDate);
  }

  return dates;
}

const formatDate = datetime => {
  const date = new Date(datetime);
  return `${date.getFullYear()}-${prependZero(date.getMonth() + 1)}-${prependZero(date.getDate())}`;
};

const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const padRight = (formattedDate, weekday) => {
  let date = new Date(formattedDate);
  const dates = [];

  while (weekdays[date.getDay()] !== weekday) {
    const newDate = formatDate(date.setDate(date.getDate() + 1));
    dates.push(newDate);
  }

  return dates;
};

const padLeft = (formattedDate, weekday) => {
  let date = new Date(formattedDate);
  const dates = [];

  while (weekdays[date.getDay()] !== weekday) {
    const newDate = formatDate(date.setDate(date.getDate() - 1));
    dates.push(newDate);
  }

  return dates.reverse();
};

const dateMeta = formattedDate => {
  const jsDate = new Date(formattedDate);
  return {
    formatted: formattedDate,
    js: jsDate,
    weekday: weekdays[jsDate.getDay()],
    date: jsDate.getDate(),
    prepended: prependZero(jsDate.getDate())
  };
};

var script$6 = {
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
      validator: val => weekdays.indexOf(val) > -1
    },
    fill: {
      type: String,
      default: 'right',
      validator: val => ['left', 'right'].indexOf(val) > -1
    }
  },
  computed: {
    weekEnd() {
      let weekEndIndex = weekdays.indexOf(this.weekStart) + 6;
      if (weekEndIndex > 6) weekEndIndex -= 6;
      return weekdays[weekEndIndex];
    },

    monthView() {
      return serializeMonthDates(this.value).map(formattedDate => dateMeta(formattedDate));
    },

    paddedMonthView() {
      const {
        weekStart,
        weekEnd
      } = this;
      const formattedMonthDates = this.monthView.map(meta => meta.formatted);
      const leftPads = padLeft(formattedMonthDates[0], weekStart).map(formattedDate => ({ ...dateMeta(formattedDate),
        padding: true
      }));
      const rightPads = padRight(formattedMonthDates[formattedMonthDates.length - 1], weekEnd).map(formattedDate => ({ ...dateMeta(formattedDate),
        padding: true
      }));
      const mainDates = formattedMonthDates.map(formattedDate => dateMeta(formattedDate));
      return [...leftPads, ...mainDates, ...rightPads];
    },

    filledMonthView() {
      const {
        paddedMonthView,
        weekEnd,
        weekStart,
        fill
      } = this;
      let dates = paddedMonthView.map(meta => ({ ...meta,
        js: new Date(meta.formatted)
      }));

      while (dates.length < 42) {
        const index = fill === 'right' ? dates.length - 1 : 0;
        const lastDate = new Date(dates[index].formatted);
        const date = fill === 'right' ? lastDate.getDate() + 1 : lastDate.getDate() - 1;
        const nextDay = lastDate.setDate(date);
        const paddings = [formatDate(nextDay), ...(fill === 'right' ? padRight(formatDate(nextDay), weekEnd) : padLeft(formatDate(nextDay), weekStart))];
        dates = [...dates, ...paddings.map(formattedDate => ({ ...dateMeta(formattedDate),
          padding: true
        }))].sort((a, b) => a.js - b.js);
      }

      return dates;
    },

    weekView() {
      const {
        value,
        weekStart,
        weekEnd
      } = this;
      return [...padLeft(value, weekStart), value, ...padRight(value, weekEnd)].map(formattedDate => dateMeta(formattedDate));
    }

  },

  render(h) {
    const {
      wrap,
      monthView,
      weekView,
      paddedMonthView,
      filledMonthView
    } = this;
    const content = this.$scopedSlots.default({
      monthView,
      weekView,
      paddedMonthView,
      filledMonthView
    });
    return wrap ? h(wrap, content) : content;
  }

};

/* script */
const __vue_script__$6 = script$6;
/* template */

/* style */

const __vue_inject_styles__$6 = undefined;
/* scoped */

const __vue_scope_id__$6 = undefined;
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

const wdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const capString = string => string.charAt(0).toUpperCase() + string.slice(1);

const dayHelpers = {};
wdays.forEach(day => {
  dayHelpers[`${day}s`] = function () {
    const {
      value
    } = this;
    if (!value) return [];
    return serializeMonthDates(value).filter(formattedDate => {
      return new Date(formattedDate).getDay() === wdays.indexOf(day);
    });
  };
});
var script$7 = {
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
  computed: {
    weekEnd() {
      let weekEndIndex = wdays.indexOf(this.weekStart) + 6;
      if (weekEndIndex > 6) weekEndIndex -= 6;
      return wdays[weekEndIndex];
    },

    weekdays() {
      let weekdays = [];
      const startIndex = wdays.indexOf(this.weekStart);
      wdays.forEach(day => {
        if (wdays.indexOf(day) >= startIndex) {
          weekdays.push(day);
        }
      });
      wdays.forEach(day => {
        if (wdays.indexOf(day) < startIndex) {
          weekdays.push(day);
        }
      });
      return weekdays.map(day => {
        const capDay = capString(day);
        return {
          day: capDay,
          short: capDay.substr(0, 3),
          value: day
        };
      });
    },

    ...dayHelpers
  },

  render(h) {
    const {
      wrap,
      weekdays
    } = this;
    const helperNames = Object.keys(dayHelpers);
    const helpers = {};
    helperNames.forEach(fnName => {
      helpers[fnName] = this[fnName];
    });
    const content = this.$scopedSlots.default({
      weekdays,
      ...helpers
    });
    return wrap ? h(wrap, content) : content;
  }

};

/* script */
const __vue_script__$7 = script$7;
/* template */

/* style */

const __vue_inject_styles__$7 = undefined;
/* scoped */

const __vue_scope_id__$7 = undefined;
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VcAsync: __vue_component__,
    VcMultiScreen: __vue_component__$1,
    VcResetable: __vue_component__$2,
    VcMenu: __vue_component__$3,
    VcOption: __vue_component__$4,
    VcToggle: __vue_component__$5,
    VcDates: __vue_component__$6,
    VcWeekdays: __vue_component__$7
});

// Import vue components

const install = function installVueCharge(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.prototype.$vc = {
    run() {
      const callbacks = [...arguments];
      callbacks.forEach(fn => {
        typeof fn === 'function' ? fn() : fn;
      });
    }

  };
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as VcAsync, __vue_component__$6 as VcDates, __vue_component__$3 as VcMenu, __vue_component__$1 as VcMultiScreen, __vue_component__$4 as VcOption, __vue_component__$2 as VcResetable, __vue_component__$5 as VcToggle, __vue_component__$7 as VcWeekdays };
