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

const createRegistrable = (storeKey, vmReference) => {
  const reference = vmReference.charAt(0).toUpperCase() + vmReference.slice(1);
  const registerFn = `register${reference}`;
  const unregisterFn = `unregister${reference}`;
  const indexFn = `indexOf${reference}`;
  return {
    [registerFn]: function (vm) {
      this[storeKey].push(vm);
    },
    [unregisterFn]: function (uid) {
      const index = this[indexFn](uid);
      if (index < 0) return;
      this[storeKey].splice(index, 1);
    },
    [indexFn]: function (uid) {
      return this[storeKey].findIndex(vm => vm._uid === uid);
    }
  };
};

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
      const index = this.indexOfFocusable(val);
      if (index < 0) return;
      focusables[index].$el.focus();
    }

  },
  methods: { ...createRegistrable('focusables', 'focusable'),

    handleFocusout() {
      this.active = false;
      this.focusedChild = -1;
      if (this.$refs.menu.contains(event.relatedTarget)) return;
      this.$emit('exitfocus');
    },

    registerFocus(uid) {
      const index = this.indexOfFocusable(uid);
      this.focusedChild = uid;
    },

    registerBlur(uid) {
      const index = this.indexOfFocusable(uid);
      if (this.focusedChild !== index) return;
      this.focusedChild = -1;
    },

    focusNext() {
      const {
        active,
        focusables,
        indexOfFocusable,
        focusedChild
      } = this;
      if (!active) return;
      const index = focusNext(focusables, indexOfFocusable(focusedChild));
      this.focusedChild = index < 0 ? -1 : focusables[index]._uid;
    },

    focusPrev() {
      const {
        active,
        focusables,
        indexOfFocusable,
        focusedChild
      } = this;
      if (!active) return;
      const index = focusPrev(focusables, indexOfFocusable(focusedChild));
      this.focusedChild = index < 0 ? -1 : focusables[index]._uid;
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

var script$4 = {
  name: 'VcToggle',

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
const __vue_script__$4 = script$4;
/* template */

/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

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

var script$5 = {
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
var script$6 = {
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

var script$7 = {
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
      default: () => [],
      validator: val => val.every(fn => typeof fn === 'function')
    }
  },

  data() {
    return {
      validity: false,
      error: undefined
    };
  },

  watch: {
    value() {
      this.validate();
    }

  },
  methods: {
    validate() {
      const {
        rules,
        value
      } = this;

      if (rules.length === 0) {
        this.validity = true;
        this.error = undefined;
      } else {
        rules.forEach(rule => {
          const result = rule(value);

          if (typeof result === 'string') {
            this.error = result;
            this.validity = false;
          } else {
            this.validity = !!result;
            this.error = undefined;
          }
        });
      }
    },

    resetValidation() {
      this.error = undefined;
    }

  },

  beforeDestroy() {
    this.vcForm.unregisterValidatable(this._uid);
  },

  created() {
    this.vcForm.registerValidatable(this);
  },

  render(h) {
    const {
      error,
      validity,
      validate,
      resetValidation,
      wrap
    } = this;
    const content = this.$scopedSlots.default({
      error,
      validity,
      validate,
      resetValidation
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

//
var script$8 = {
  name: 'VcForm',

  data() {
    return {
      validatables: []
    };
  },

  provide() {
    return {
      vcForm: this
    };
  },

  methods: { ...createRegistrable('validatables', 'validatable'),

    validate() {
      this.validatables.forEach(validatable => validatable.validate());
    },

    resetValidation() {
      this.validatables.forEach(validatable => validatable.resetValidation());
    }

  },
  computed: {
    status() {
      const result = this.validatables.every(validatable => validatable.validity);
      this.$emit('input', result);
      return result;
    }

  },

  mounted() {
    this.validate();
    this.resetValidation();
  }

};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', _vm._g(_vm._b({}, 'form', _vm.$attrs, false), _vm.$listeners), [_vm._t("default", null, null, {
    validate: _vm.validate,
    resetValidation: _vm.resetValidation,
    value: _vm.status
  })], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = undefined;
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

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
//
var script$9 = {
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

  data() {
    return {
      showSelf: false,
      showContent: false
    };
  },

  watch: {
    value: {
      immediate: true,

      handler(val) {
        if (val) {
          this.showSelf = val;
        } else {
          this.showContent = val;
        }
      }

    }
  },
  methods: {
    toggle() {
      const state = [true, false].includes(arguments[0]) ? arguments[0] : !showSelf;

      if (state) {
        this.showSelf = state;
      } else {
        this.showContent = state;
      }
    }

  },
  computed: {
    margin() {
      return this.removeCenter ? '' : 'auto';
    }

  },

  created() {
    this.vcApp.registerDialogWrapper(this);
    this.registerWrapper(this);
  },

  beforeDestroy() {
    this.registerWrapper(null);
    this.vcApp.unregisterDialogWrapper(this._uid);
  }

};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    },
    on: {
      "after-enter": function ($event) {
        _vm.showContent = true;
      },
      "after-leave": function ($event) {
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
      "click": function ($event) {
        _vm.showContent = false;
      }
    }
  }), _vm._v(" "), _c('transition', _vm._b({
    on: {
      "after-leave": function ($event) {
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

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$9 = function (inject) {
  if (!inject) return;
  inject("data-v-5ef25b27_0", {
    source: ".vc-dialog-content-wrapper__button[data-v-5ef25b27]{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none;-webkit-appearance:button;background-color:transparent;background-image:none;padding:0;line-height:inherit;color:inherit;cursor:default;outline:0;position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0}.vc-dialog-content-wrapper__document[data-v-5ef25b27]{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1050;touch-action:none}.vc-dialog-content-wrapper__content-holder[data-v-5ef25b27]{overflow:auto;position:absolute;height:fit-content;top:0;left:0;right:0;bottom:0;touch-action:none}.fade-enter-active[data-v-5ef25b27],.fade-leave-active[data-v-5ef25b27]{transition:opacity ease-in-out .1s}.fade-enter[data-v-5ef25b27],.fade-leave-to[data-v-5ef25b27]{opacity:0}.scale-enter-active[data-v-5ef25b27],.scale-leave-active[data-v-5ef25b27]{transition:transform ease-out .1s}.scale-enter[data-v-5ef25b27],.scale-leave-to[data-v-5ef25b27]{transform:scale(0)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$9 = "data-v-5ef25b27";
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);

var script$a = {
  name: 'VcDialogRenderer',
  functional: true,
  components: {
    VcDialogContentWrapper: __vue_component__$9
  },
  props: {
    dialogs: {
      type: Array,
      default: []
    }
  },

  render(h, {
    props
  }) {
    return props.dialogs.map(dialog => h(__vue_component__$9, {
      attrs: {
        id: `vc-dialog-${dialog._uid}`
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
        default() {
          return dialog.$scopedSlots.default({
            toggle: dialog.toggle
          });
        }

      }
    }));
  }

};

/* script */
const __vue_script__$a = script$a;
/* template */

/* style */

const __vue_inject_styles__$a = undefined;
/* scoped */

const __vue_scope_id__$a = undefined;
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

//

function getFocusables(el) {
  return [...el.querySelectorAll('button, [href], input, select, textarea, [tabindex]')].filter(el => el.getAttribute('tabindex') !== '-1');
}

var script$b = {
  name: 'VcApp',
  components: {
    VcDialogRenderer: __vue_component__$a
  },

  provide() {
    return {
      vcApp: this
    };
  },

  data() {
    return {
      dialogs: [],
      dialogWrappers: []
    };
  },

  watch: {
    dialogWrapperStates: {
      immediate: true,

      handler() {
        this.$nextTick(() => {
          const lastDialogWrapper = this.lastDialogWrapper();

          if (lastDialogWrapper) {
            document.body.style.overflow = 'hidden';
            const dialogEl = lastDialogWrapper.$el;

            if (lastDialogWrapper.autofocus) {
              const focusables = getFocusables(dialogEl);
              focusables.length > 0 ? focusables[0].focus() : dialogEl.focus();
            } else {
              dialogEl?.focus();
            }
          } else {
            document.body.style.overflow = '';
          }
        });
      }

    }
  },
  computed: {
    dialogWrapperStates() {
      return this.dialogWrappers.map(wrapper => wrapper.showSelf);
    }

  },
  methods: { ...createRegistrable('dialogs', 'dialog'),
    ...createRegistrable('dialogWrappers', 'dialogWrapper'),

    lastDialogWrapper() {
      const {
        dialogWrappers
      } = this;
      const index = dialogWrappers.map(wrapper => wrapper.showSelf).lastIndexOf(true);
      return dialogWrappers[index];
    },

    toggleDialog(uid, val) {
      const index = this.indexOfDialog(uid);
      this.dialogWrappers[index].toggle(val);
    },

    escHandler() {
      const lastDialogWrapper = this.lastDialogWrapper();

      if (event.key === 'Escape' && lastDialogWrapper) {
        lastDialogWrapper.toggle(false);
      }
    },

    tabHandler() {
      const lastDialogWrapper = this.lastDialogWrapper();

      if (event.key === 'Tab' && lastDialogWrapper) {
        const dialogEl = lastDialogWrapper.$el;
        const focusables = getFocusables(dialogEl);
        let toBeFocusIndex = event.shiftKey ? focusPrev(focusables, focusables.indexOf(event.target)) : focusNext(focusables, focusables.indexOf(event.target));
        focusables[toBeFocusIndex].focus();
        event.preventDefault();
      }
    }

  },

  created() {
    document.body.addEventListener('keydown', this.escHandler);
    document.body.addEventListener('keydown', this.tabHandler);
  },

  beforeDestroy() {
    document.body.removeEventListener('keydown', this.escHandler);
    document.body.removeEventListener('keydown', this.tabHandler);
  }

};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._g(_vm._b({
    ref: "vcApp"
  }, 'div', _vm.$attrs, false), _vm.$listeners), [_vm._t("default"), _vm._v(" "), _c('vc-dialog-renderer', {
    attrs: {
      "dialogs": _vm.dialogs
    }
  })], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$b = undefined;
/* scoped */

const __vue_scope_id__$b = undefined;
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

var script$c = {
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
      default: () => ({
        name: 'scale'
      })
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

  data() {
    return {
      wrapper: null
    };
  },

  methods: {
    emitInput(val) {
      this.$emit('input', val);
    },

    registerWrapper(wrapper) {
      this.wrapper = wrapper;
    },

    toggle() {
      this.wrapper.toggle([true, false].includes(arguments[0]) ? arguments[0] : undefined);
    }

  },

  created() {
    this.vcApp.registerDialog(this);
  },

  beforeDestroy() {
    this.vcApp.unregisterDialog(this._uid);
  },

  render(h) {
    const {
      toggle
    } = this;
    return this.$scopedSlots.activator?.({
      toggle
    });
  }

};

/* script */
const __vue_script__$c = script$c;
/* template */

/* style */

const __vue_inject_styles__$c = undefined;
/* scoped */

const __vue_scope_id__$c = undefined;
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VcAsync: __vue_component__,
    VcMultiScreen: __vue_component__$1,
    VcResetable: __vue_component__$2,
    VcMenu: __vue_component__$3,
    VcToggle: __vue_component__$4,
    VcDates: __vue_component__$5,
    VcWeekdays: __vue_component__$6,
    VcValidatable: __vue_component__$7,
    VcForm: __vue_component__$8,
    VcApp: __vue_component__$b,
    VcDialog: __vue_component__$c
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
    },

    assign(key, value) {
    },

    log() {
      console.log(...arguments);
    },

    goldenRatio: 1.618
  };
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__$b as VcApp, __vue_component__ as VcAsync, __vue_component__$5 as VcDates, __vue_component__$c as VcDialog, __vue_component__$8 as VcForm, __vue_component__$3 as VcMenu, __vue_component__$1 as VcMultiScreen, __vue_component__$2 as VcResetable, __vue_component__$4 as VcToggle, __vue_component__$7 as VcValidatable, __vue_component__$6 as VcWeekdays };
