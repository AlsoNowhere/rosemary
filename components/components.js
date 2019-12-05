'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var services = require('services');

var Loading = function Loading() {
  return React__default.createElement("svg", {
    viewBox: "0 0 150 150",
    className: "block width height spin"
  }, React__default.createElement("circle", {
    cx: "75",
    cy: "75",
    r: "60",
    style: {
      fill: "transparent",
      stroke: "#888",
      strokeDasharray: 300,
      strokeWidth: "15px",
      strokeLinecap: "round"
    }
  }));
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var TableColumn = function TableColumn() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var options = arguments.length > 2 ? arguments[2] : undefined;

  _classCallCheck(this, TableColumn);

  this.name = typeof name !== "string" ? "" : name;
  this.label = typeof label !== "string" ? "" : label;

  if (!options) {
    return;
  }

  if (options.headerContent) {
    this.headerContent = options.headerContent;
  }

  if (options.cellContent) {
    this.cellContent = options.cellContent;
  }

  if (options.headerStyles) {
    this.headerStyles = options.headerStyles;
  }

  if (options.cellStyles) {
    this.cellStyles = options.cellStyles;
  } // if (options.rowContent) {
  // 	this.rowContent = options.rowContent;
  // }


  if (options.cellClick) {
    this.cellClick = options.cellClick;
  }
};
var Table = function Table(props) {
  var columns = props.columns ? props.columns.filter(function (x) {
    return x instanceof TableColumn;
  }) : [];
  var rows = props.rows || [];
  var rowStyles = props.rowStyles || {};
  var rowClasses = props.rowClasses || "";
  var cellClasses = props.cellClasses || "";
  return React__default.createElement("div", {
    className: "table-responsive-wrapper"
  }, React__default.createElement("table", {
    className: "table"
  }, React__default.createElement("thead", null, React__default.createElement("tr", null, columns.map(function (column, i) {
    return React__default.createElement("th", {
      style: column.headerStyles || {},
      onClick: function onClick() {
        return props.headerClick && props.headerClick(column, i);
      },
      key: i
    }, column.headerContent ? column.headerContent(column) : React__default.createElement("span", null, column.label));
  }))), React__default.createElement("tbody", null, rows.map(function (row, i) {
    return React__default.createElement(React__default.Fragment, {
      key: i
    }, row.rowContent ? row.rowContent() : React__default.createElement("tr", {
      className: rowClasses,
      style: _objectSpread2({}, rowStyles),
      onClick: function onClick() {
        return props.rowClick && props.rowClick(row, i);
      }
    }, columns.map(function (column, j) {
      return React__default.createElement("td", {
        className: cellClasses,
        style: column.cellStyles || {},
        onClick: function onClick(event) {
          return column.cellClick && column.cellClick(event, row, column, i, j);
        },
        key: j
      }, column.cellContent ? column.cellContent(row, column, i, j) : React__default.createElement("span", null, row[column.name]));
    })));
  }))));
};
var TableContentRow = function TableContentRow(rowContent) {
  if (!(rowContent instanceof Function)) {
    return services.loggerService.error("TableContentRow - AFS-Components - table.component.js", "You must pass a function to the argument 'rowContent' prop.");
  }

  this.rowContent = rowContent;
};

var DropdownItem = function DropdownItem(name, value) {
  this.name = name;
  this.value = value;
};

var Dropdown = function Dropdown(props) {
  var button = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      updateActive = _useState2[1];

  var _useState3 = React.useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      query = _useState4[0],
      updateQuery = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      hasFocus = _useState6[0],
      updateHasFocus = _useState6[1];

  if (!(props.value === null || props.value instanceof DropdownItem)) {
    var location = "AFS-Components - Dropdown component - value prop";
    var error = "You must pass an instance of DropdownItem or null as the value for the Dropdown component.";
    services.loggerService.error(location, error);
    throw new Error(location + " " + error);
  }

  var value = props.value;
  var placeholder = props.placeholder || "";
  var label = props.label || "";

  if (!(props.options instanceof Array)) {
    services.loggerService.error("AFS-Components - Dropdown component - options prop", "You must pass an Array of DropdownItem objects to the options prop.");
    throw new Error("AFS-Components - Dropdown component - options prop. You must pass an Array of DropdownItem objects to the options prop.");
  }

  var nonOptions = props.options.filter(function (x) {
    return !(x instanceof DropdownItem);
  });

  if (nonOptions.length > 0) {
    services.loggerService.warn("AFS-Components - Dropdown component - options prop", "There were ".concat(nonOptions.length, " options filtered from the list passed to the options Array."));
  }

  var options = props.options.filter(function (x) {
    return x instanceof DropdownItem;
  }).filter(function (x) {
    return x.name.toLowerCase().includes(query.toLowerCase());
  });

  if (props.hasReset !== false) {
    options.unshift({
      name: " - none - ",
      value: "",
      colour: "transparent",
      initials: ""
    });
  }

  var selectedIndex = props.value === null ? null : options.reduce(function (a, b, i) {
    return a !== null ? a : props.value.value === b.value && props.value.name === b.name ? i : a;
  }, null);
  var name = props.name;
  var required = props.required || false;
  var disabled = props.disabled || false;

  var toggleActive = function toggleActive() {
    updateActive(!active);
  };

  var selectOption = function selectOption(option) {
    var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    props && props.onChange && props.onChange(option.name === " - none - " ? null : option);
    updateActive(active);

    if (active === false) {
      button.current.focus();
    }
  };

  var dropdownConductSearch = function () {
    var timeout;
    return function (value) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        updateQuery(value);
      }, 300);
    };
  }();

  var keyPressed = function keyPressed(event) {
    if (!hasFocus || !active) {
      return;
    }

    var key = event.which;

    if (key !== 38 && key !== 40 && key !== 13) {
      return;
    }

    if (key === 13 && event.target.nodeName === "INPUT") ; else if (key === 38) {
      if (selectedIndex === null) {
        selectOption(options[options.length - 1], true);
      } else if (selectedIndex > (props.hasReset !== false ? 1 : 0)) {
        selectOption(options[selectedIndex - 1], true);
      }
    } else if (key === 40) {
      if (selectedIndex === null) {
        selectOption(options[props.hasReset !== false ? 1 : 0], true);
      } else if (selectedIndex < options.length - 1) {
        selectOption(options[selectedIndex + 1], true);
      }
    }
  };

  return React__default.createElement("div", {
    className: "dropdown-component ".concat(required ? "required" : "")
  }, React__default.createElement("span", null, label), React__default.createElement("button", {
    type: "button",
    ref: button,
    disabled: disabled,
    onClick: function onClick() {
      return toggleActive();
    },
    onFocus: function onFocus() {
      return updateHasFocus(true);
    },
    onBlur: function onBlur() {
      return updateHasFocus(false);
    },
    onKeyUp: function onKeyUp(event) {
      return keyPressed(event);
    }
  }, React__default.createElement("span", {
    className: value ? "" : "text-grey"
  }, value === null ? placeholder : value.name || placeholder), React__default.createElement("span", {
    className: "caret fa fa-caret-down"
  })), React__default.createElement("input", {
    name: name,
    tabIndex: "-1",
    value: value === null ? "" : value.value,
    required: required,
    onChange: function onChange() {}
  }), React__default.createElement("ul", {
    className: "".concat(active ? "active" : "", " ").concat(props.noLabel ? "no-label" : "label")
  }, props.hasSearch !== false && React__default.createElement("li", {
    className: "search"
  }, React__default.createElement("label", null, React__default.createElement("input", {
    className: "search",
    tabIndex: active ? undefined : -1,
    placeholder: "search...",
    onChange: function onChange(event) {
      return dropdownConductSearch(event.target.value);
    },
    onFocus: function onFocus() {
      return updateHasFocus(true);
    },
    onBlur: function onBlur() {
      return updateHasFocus(false);
    },
    onKeyUp: function onKeyUp(event) {
      return keyPressed(event);
    }
  }))), options.map(function (x, i) {
    return (// console.log("Pop: ", x),
      React__default.createElement("li", {
        className: selectedIndex === i ? "active" : "",
        onClick: function onClick() {
          return selectOption(x);
        },
        key: i
      }, React__default.createElement("span", {
        className: selectedIndex === i ? "text-white" : ""
      }, x.name))
    );
  })));
};

var multiSelectConductSearch = function () {
  var timeout;
  return function (query, allOptions, updateOptions) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      var newOptions = allOptions.filter(function (x) {
        return x.name.toLowerCase().includes(query.toLowerCase());
      });
      updateOptions(newOptions);
    }, 300);
  };
}();

var MultiSelect = function MultiSelect(props) {
  var input = React.useRef(null);

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      active = _useState8[0],
      updateActive = _useState8[1];

  var values = props.values;
  var label = props.label || "";

  if (!(props.options instanceof Array)) {
    services.loggerService.error("AFS-Components - Dropdown component - options prop", "You must pass an Array of DropdownItem objects to the options prop.");
    throw new Error("AFS-Components - Dropdown component - options prop. You must pass an Array of DropdownItem objects to the options prop.");
  }

  var _useState9 = React.useState(function () {
    return props.options.filter(function (x) {
      return x instanceof DropdownItem;
    }).map(function (x) {
      return x;
    }) || [];
  }()),
      _useState10 = _slicedToArray(_useState9, 2),
      options = _useState10[0],
      updateOptions = _useState10[1];

  var name = props.name;
  var disabled = props.disabled || false;

  var toggleActive = function toggleActive() {
    updateActive(!active);
  };

  var selectOption = function selectOption(option) {
    var index = values.reduce(function (a, b, i) {
      return option.name === b.name ? i : a;
    }, null);
    index === null ? values.push({
      name: option.name,
      value: option.value
    }) : values.splice(index, 1);
    input.current.value = JSON.stringify(values);
    props.updateParent(values);
    updateActive(false);
  };

  return React__default.createElement("div", {
    className: "multi-select-component"
  }, React__default.createElement("span", null, label), React__default.createElement("div", {
    className: "".concat(disabled ? "disabled" : ""),
    onClick: toggleActive
  }, values instanceof Array && values.map(function (x, i) {
    return React__default.createElement("div", {
      className: "select-item",
      key: i
    }, React__default.createElement("span", null, x.name), React__default.createElement("button", {
      type: "button",
      onClick: function onClick(e) {
        e.stopPropagation();
        props.updateParent((values.splice(i, 1), values.map(function (x) {
          return x;
        })));
      }
    }, React__default.createElement("span", {
      className: "fa fa-times"
    })));
  }), React__default.createElement("span", {
    className: "caret fa fa-caret-down"
  })), React__default.createElement("input", {
    name: name,
    tabIndex: "-1",
    ref: input
  }), React__default.createElement("ul", {
    className: "".concat(active ? "active" : "")
  }, React__default.createElement("li", {
    className: "search"
  }, React__default.createElement("label", null, React__default.createElement("input", {
    className: "search",
    tabIndex: "-1",
    placeholder: "search...",
    onChange: function onChange(e) {
      return multiSelectConductSearch(e.target.value, props.options, updateOptions);
    }
  }))), options.map(function (x, i) {
    return React__default.createElement("li", {
      onClick: function onClick() {
        return selectOption(x);
      },
      key: i
    }, React__default.createElement("span", null, x.name));
  })));
};

var sizeEitherSide = 2;

var generatePages = function generatePages(total, resultsPerPage, currentPage) {
  var list = [1];

  if (total === 0) {
    return list;
  }

  var end = Math.ceil(total / resultsPerPage);

  for (var i = currentPage - sizeEitherSide; i <= currentPage + sizeEitherSide; i++) {
    if (i > 0 && i < end) {
      i !== 1 && list.push(i);
    }
  }

  if (list.find(function (x) {
    return x === end;
  }) === undefined) {
    list.push(end);
  }

  if (list.length > 1 && list[1] !== 2) {
    list.splice(1, 0, "...");
  }

  if (list.length > 1 && list[list.length - 2] !== list[list.length - 1] - 1) {
    list.splice(list.length - 1, 0, "...");
  }

  return list;
};

var resultsPerPageOptions = [5, 10, 20, 50];
var resultsPerPageOptionsForDropdown = resultsPerPageOptions.map(function (x) {
  return new DropdownItem(x.toString(), x.toString());
});
var Paginationv2 = function Paginationv2(props) {
  if (props.total !== undefined && typeof props.total !== "number") {
    throw new Error("For total, you must either pass a number or leave the prop undefined.");
  }

  var total = parseInt(props.total) || 0;

  if (props._inheritence === undefined) {
    throw new Error("You must pass an _inheritence prop with an inheritor object from services");
  }

  if (props._inheritence.currentPage === undefined) {
    throw new Error("You must pass the current page and current page updater on the _inheritence");
  }

  if (props._inheritence.resultsPerPage === undefined) {
    throw new Error("You must pass the results per page and results per page updater on the _inheritence");
  }

  var currentPage = props._inheritence.currentPage;

  if (currentPage < 1) {
    throw new Error("The current page cannot be less than 1");
  }

  var _resultsPerPage = props._inheritence.resultsPerPage;
  var resultsPerPage = new DropdownItem(_resultsPerPage, _resultsPerPage);

  var changePage = function changePage(page) {
    props._inheritence.currentPage = page;
  };

  var list = generatePages(total, resultsPerPage.value, currentPage);

  var changeResultsPerPage = function changeResultsPerPage(resultsPer) {
    props._inheritence.resultsPerPage = resultsPer.value;

    if (currentPage > Math.ceil(total / resultsPer.value)) {
      props._inheritence.currentPage = 1;
    }
  };

  return React__default.createElement("div", {
    className: "flex"
  }, React__default.createElement("ul", {
    className: "reset-list flex"
  }, list.map(function (x, i) {
    return React__default.createElement("li", {
      className: "line-height-large margin-right ".concat(x === currentPage ? "active" : ""),
      onClick: function onClick() {
        return changePage(x);
      },
      key: i
    }, x === "..." ? React__default.createElement("span", null, x) : React__default.createElement("button", {
      type: "button",
      className: "large padded " + (x === currentPage ? "grey" : ""),
      style: {
        minWidth: "44px"
      },
      onClick: function onClick() {
        return changePage(x);
      }
    }, x));
  })), React__default.createElement("div", {
    style: {
      width: "120px"
    }
  }, React__default.createElement(Dropdown, {
    options: resultsPerPageOptionsForDropdown,
    value: resultsPerPage,
    hasReset: false,
    hasSearch: false,
    noLabel: true,
    onChange: function onChange(value) {
      return changeResultsPerPage(value);
    }
  })));
};

var WarningMessage = function WarningMessage(props) {
  return React__default.createElement("span", {
    className: "validator-error"
  }, props.message);
}; // ** Props object AND types AND defaults **
// ** KEY -> ! must have, ? could have
// .label? | string | ""
// .type? | string | ""
// .name? | string | ""
// .className? | string | ""
// .required? | boolean | false
// .disabled? | boolean | false
// .options(? if any type including select. ! if dropdown) | Array | []
// .placeholder? | string | ""
// .value? | any | undefined
// .valid? | {valid:boolean,message:string} | {valid:true,message:""}
// .onChange? | ()=>{} | undefined
// ** end **


var Field2 = function Field2(props) {
  var label = props.label || "";
  var type = props.type || "text";
  var name = props.name || "";
  var className = props.className || "";
  var required = props.required || false;
  var disabled = props.disabled || false;
  var options = props.options || [];
  var placeholder = props.placeholder || "";
  var isTextarea = type === "textarea";
  var isSelect = type === "select";
  var valid = props.valid || {
    valid: true,
    message: ""
  };

  var updateValue = function updateValue(newValue) {
    props.onChange && props.onChange(newValue);
  };

  var onChange = function onChange(event) {
    return updateValue(event.target.value);
  };

  var value = props.value;

  if (type !== "radio") {
    value = function () {
      return props.value === undefined ? "" : props.value;
    }();
  }

  var checked = false;

  if (type === "radio" || type === "checkbox") {
    checked = props.checked || false;
  } // const Label = props => (
  //     <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
  //         {typeof label === "function"
  //             ? label()
  //             : (<span>{label}</span>)
  //         }
  //         {props.children}
  //     </label>
  // );


  var fieldProps = {
    type: type,
    name: name,
    required: required,
    disabled: disabled,
    placeholder: placeholder
  };

  if (type === "checkbox" || type === "radio") {
    return React__default.createElement("label", {
      className: "".concat(type === "checkbox" || type === "radio" ? type : "", " ").concat(required && type !== "radio" ? "required" : "", " ").concat(className)
    }, typeof label === "function" ? label() : React__default.createElement("span", null, label), React__default.createElement("input", _extends({}, fieldProps, {
      className: type,
      value: type === "radio" ? value : false,
      checked: checked,
      onChange: function onChange(event) {
        return updateValue(event.target.checked);
      }
    })), React__default.createElement("span", {
      className: "check bottom no-top"
    }, React__default.createElement("svg", {
      className: "middle",
      viewBox: "0 0 24 24"
    }, React__default.createElement("g", null, type === "checkbox" ? React__default.createElement("path", {
      style: {
        fill: "#444"
      },
      d: "M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z "
    }) : React__default.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "8",
      style: {
        fill: "#444"
      }
    })))));
  } else if (isTextarea) {
    return React__default.createElement("label", {
      className: "".concat(type === "checkbox" || type === "radio" ? type : "", " ").concat(required && type !== "radio" ? "required" : "", " ").concat(className)
    }, typeof label === "function" ? label() : React__default.createElement("span", null, label), React__default.createElement("textarea", _extends({}, fieldProps, {
      value: value,
      onChange: onChange
    })), !valid.valid && React__default.createElement(WarningMessage, {
      message: valid.message
    }));
  } else if (isSelect) {
    return React__default.createElement("label", {
      className: "".concat(type === "checkbox" || type === "radio" ? type : "", " ").concat(required && type !== "radio" ? "required" : "", " ").concat(className)
    }, typeof label === "function" ? label() : React__default.createElement("span", null, label), React__default.createElement("select", _extends({}, fieldProps, {
      value: value,
      onChange: onChange
    }), options.map(function (x, i) {
      return React__default.createElement("option", {
        value: x.value,
        key: i
      }, x.name);
    })), !valid.valid && React__default.createElement(WarningMessage, {
      message: valid.message
    }));
  } else if (type === "dropdown") {
    return React__default.createElement(Dropdown, _extends({}, fieldProps, {
      label: label,
      value: value,
      onChange: function onChange(value) {
        return updateValue(value);
      },
      options: options
    }));
  } else if (type === "file") {
    return React__default.createElement("label", {
      className: "".concat(type === "checkbox" || type === "radio" ? type : "", " ").concat(required && type !== "radio" ? "required" : "", " ").concat(className)
    }, typeof label === "function" ? label() : React__default.createElement("span", null, label), React__default.createElement("input", _extends({}, fieldProps, {
      onChange: function onChange(event) {
        return updateValue(event.target.files);
      }
    })), !valid.valid && React__default.createElement(WarningMessage, {
      message: valid.message
    }), React__default.createElement("span", {
      className: "for-file"
    }, "Click to attach a file"), value && value.image.type === "image/jpeg" && React__default.createElement("img", {
      src: value.renderString
    }));
  }

  return React__default.createElement("label", {
    className: "".concat(type === "checkbox" || type === "radio" ? type : "", " ").concat(required && type !== "radio" ? "required" : "", " ").concat(className)
  }, typeof label === "function" ? label() : React__default.createElement("span", null, label), React__default.createElement("input", _extends({}, fieldProps, {
    value: value,
    onChange: function onChange(event) {
      return updateValue(event.target.value);
    }
  })), !valid.valid && React__default.createElement(WarningMessage, {
    message: valid.message
  }));
};

var closeModal = function closeModal(update) {
  update("closing");
  setTimeout(function () {
    update("");
  }, 300);
};
var Modal = function Modal(props) {
  var state = props.state || "";
  var label = props.label || "";
  var full = props.full === true;
  var extraClasses = props.className || "";
  var closeOnClickOnBackground = props.closeOnClickOnBackground || false;

  var isFull = function isFull() {
    return full ? "full" : "";
  };

  var checkState = function checkState() {
    return state === "open" ? "visible" : state === "closing" ? "visible closing" : "";
  };

  return React__default.createElement("article", {
    className: "modal ".concat(isFull(), " ").concat(checkState(), " ").concat(extraClasses),
    onClick: function onClick() {
      return closeOnClickOnBackground && closeModal(props.update);
    }
  }, React__default.createElement("div", {
    className: "content",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, React__default.createElement("header", null, React__default.createElement("h2", null, label), React__default.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return closeModal(props.update);
    }
  })), props.children));
};

var ModellerTable = function ModellerTable(props) {
  var model = props.model;
  var errorLocation = "AFS-Components - Modeller Table - model prop";

  if (!(model instanceof Function) || !(new model() instanceof services.modeller.Modeller)) {
    var error = "You must pass an instance of modeller.Modeller to use this component.";
    services.loggerService.error(errorLocation, error);
    throw new Error(errorLocation + " " + error);
  }

  if (!(props.extendColumns instanceof Array) && props.extendColumns !== undefined) {
    var _error = "You must pass an Array or 'undefined' to the extendColumns prop.";
    services.loggerService.error(errorLocation, _error);
    throw new Error(errorLocation + " " + _error);
  }

  var extendColumns = props.extendColumns || [];
  var rowStyles = props.rowStyles || {};
  var rowClasses = props.rowClasses || "";
  var cellClasses = props.cellClasses || "";

  var columns = function () {
    var columns = _toConsumableArray(extendColumns);

    var newContext = new (model ? model : props.model)();
    var aliases = newContext.getAliases();
    var options = newContext.getOptions();
    Object.keys(newContext).reduce(function (a, b) {
      if (options && options[b] && typeof options[b].hide === "boolean" && options[b].hide) {
        return a;
      }

      if (props.overwrites && props.overwrites[b] && props.overwrites[b].hide) {
        return a;
      }

      a.push(b);
      return a;
    }, []).reverse().forEach(function (x) {
      columns.unshift(props.overwrites && props.overwrites[x] && props.overwrites[x].tableColumn && props.overwrites[x].tableColumn instanceof TableColumn ? props.overwrites[x].tableColumn : new TableColumn(x, aliases[x], function () {
        if (typeof newContext[x] === "boolean") {
          return {
            cellContent: function cellContent(row, column) {
              return React__default.createElement("span", {
                className: "fa fa-".concat(row[column.name] ? "check" : "times")
              });
            }
          };
        }
      }()));
    });
    return columns;
  }();

  if (!(props.rows instanceof Array)) {
    var location = "AFS-Components - Modeller Table - rows prop";
    var _error2 = "You must pass an Array to the 'rows' prop. (This Array must be made up of instances of the constructor function you are passing to the 'model' prop.";
    services.loggerService.error(location, _error2);
    throw new Error(location + " " + _error2);
  }

  var rows = props.rows.filter(function (x) {
    return x instanceof model || x instanceof TableContentRow;
  });
  var outgoingProps = {
    columns: columns,
    rows: rows
  };

  if (props.rowClick) {
    outgoingProps.rowClick = props.rowClick;
  }

  if (rowStyles) {
    outgoingProps.rowStyles = rowStyles;
  }

  if (rowClasses) {
    outgoingProps.rowClasses = rowClasses;
  }

  if (cellClasses) {
    outgoingProps.cellClasses = cellClasses;
  }

  if (props.headerClick) {
    outgoingProps.headerClick = props.headerClick;
  }

  return React__default.createElement(Table, outgoingProps);
};

var isRequired = function isRequired(model, field) {
  var validators = model.validators;
  var required = validators[field] && validators[field].rules.find(function (x) {
    return x.type === "required";
  });
  return required === undefined ? false : !required.not;
};

var baseField = function baseField(name, type, alias, formValues, currentFormObject, props, overwrites, model, options, i, validChecks) {
  var extraProps = {};
  extraProps[type === "checkbox" || type === "radio" ? "checked" : "value"] = currentFormObject[name];

  if (options instanceof Array) {
    extraProps.options = options;
  }

  if (type === "dropdown" && !(currentFormObject[name] instanceof DropdownItem) && currentFormObject[name] !== null) {
    var valueFromOptions = extraProps.options.find(function (x) {
      return x.value === currentFormObject[name];
    });
    extraProps.value = valueFromOptions || null;
  }

  return React__default.createElement(Field2, _extends({
    name: name,
    type: type,
    label: alias,
    className: overwrites[name] && overwrites[name].className
  }, extraProps, {
    required: isRequired(model, name),
    disabled: overwrites[name] && overwrites[name].disabled,
    valid: validChecks[name],
    onChange: function onChange(value) {
      currentFormObject[name] = value;
      props._inheritence && props._inheritence.formValues ? props._inheritence.formValues = Object.assign(new model(), formValues) : props.updateFormValues(Object.assign(new model(), formValues));
    },
    key: i
  }));
};

var generateField = function generateField(props, model, formValues, currentFormObject, overwrites, fields, validChecks) {
  return function (x, i) {
    var type = "text";
    var options = false;
    var hide = false;
    var aliases = model.aliases;
    var propertyOptions = model.options[x];

    if (typeof fields[x] === "boolean") {
      type = "checkbox";
    }

    if (typeof fields[x] === "number") {
      type = "number";
    }

    if (!!propertyOptions) {
      if (typeof propertyOptions.type === "string") {
        type = propertyOptions.type;
      }

      if (typeof propertyOptions.hide === "boolean") {
        hide = propertyOptions.hide;
      }
    }

    if (fields[x] instanceof services.modeller.Single) {
      var contextOptions = fields[x].options;
      var context = new fields[x].context();

      if (!!contextOptions) {
        if (contextOptions.options instanceof Array) {
          if (!(contextOptions.options[0] instanceof DropdownItem) && typeof contextOptions.options[1] === "string") {
            options = contextOptions.options[0][contextOptions.options[1]];
          } else {
            options = contextOptions.options.filter(function (x) {
              return x instanceof DropdownItem;
            });
          }
        }
      }

      if (context instanceof DropdownItem) {
        type = "dropdown";
      } else if (context instanceof Date) {
        type = "date";

        if (!(formValues[x] instanceof Date)) {
          formValues[x] = "";
        }
      } else {
        formValues[x] = formValues[x] instanceof services.modeller.Single ? context : formValues[x];
        overwrites[x] = overwrites[x] || {};
        return Object.keys(context).map(function (y, j) {
          return generateField(props, model, formValues, formValues[x], overwrites[x], context, validChecks)(y, j);
        });
      }
    }

    if (overwrites[x]) {
      if (typeof overwrites[x].type === "string") {
        type = overwrites[x].type;
      }

      if (overwrites[x].options instanceof Array) {
        options = overwrites[x].options.filter(function (x) {
          return x instanceof DropdownItem;
        });
      }

      if (typeof overwrites[x].hide === "boolean") {
        hide = overwrites[x].hide;
      }
    }

    if (hide === true) {
      return React__default.createElement("span", {
        key: i
      });
    }

    return baseField(x, type, aliases[x], formValues, currentFormObject, props, overwrites, model, options, i, validChecks);
  };
};

var ModellerForm2 = function ModellerForm2(props) {
  var form = React.useRef(null); // Validate the name from props.

  if (!props.name || typeof props.name !== "string") {
    services.goError("AFS-Components - Modeller Form - name prop", "You must pass a name for the form.");
  }

  var name = props.name; // Validate the model from props.

  if (!(props.model instanceof Function) || !(new props.model() instanceof services.modeller.Modeller)) {
    services.goError("AFS-Components - Modeller Form - model prop", "You must pass an instance of modeller.Modeller to use this component.");
  }

  if (props.model.type === "abstract") {
    // return loggerService.error("AFS-Components - Modeller Form - model prop",`The Model you have provided is an Abstract model and cannot be used (${props.model.name})`);
    services.goError("AFS-Components - Modeller Form - model prop", "The Model you have provided is an Abstract model and cannot be used (".concat(props.model.name, ")"));
  }

  var model = props.model; // Validate the formValues from props.

  if (!((props._inheritence ? props._inheritence.formValues : props.formValues) instanceof model)) {
    // return loggerService.error("AFS-Components - Modeller Form - formValues prop","You must pass an instance of the model you have provided for the formValues prop.");
    services.goError("AFS-Components - Modeller Form - formValues prop", "You must pass an instance of the model you have provided for the formValues prop.");
  }

  var formValues = props._inheritence ? props._inheritence.formValues : props.formValues; // Validate the footerContent from props.

  if (props.footerContent !== undefined && typeof props.footerContent !== "function") {
    return services.loggerService.error("AFS-Components - Modeller Form - footerContent prop", "You pass a function for the prop footerContent or undefined.");
  }

  var footerContent = props.footerContent; // Validate the submitLabel from props.

  if (props.submitLabel !== undefined && typeof props.submitLabel !== "string") {
    services.loggerService.warn("Props submitLabel should be a string. Value passed was ignored here.");
  }

  var submitLabel = typeof props.submitLabel === "string" ? props.submitLabel : "Submit"; // Validate the cancel from props.

  if (props.cancel !== undefined && !(props.cancel instanceof Function)) {
    services.goError("AFS-Components - Modeller Form - cancel prop", "You pass a function for the prop cancel or undefined.");
  }

  var cancel = props.cancel ? props.cancel : undefined; // Validate the loading from props.

  if (typeof (props._inheritence ? props._inheritence.loading : props.loading) !== "boolean" && (props._inheritence ? props._inheritence.loading : props.loading) !== undefined) {
    services.goError("AFS-Components - Modeller Form - loading prop", "You pass a boolean for the prop loading or undefined.");
  }

  var loading = props._inheritence ? props._inheritence.loading : props.loading;
  var newContext = new (model ? model : props.model)();

  var _useState = React.useState(newContext),
      _useState2 = _slicedToArray(_useState, 1),
      fields = _useState2[0];

  var structure = props.structure || (fields ? Object.keys(fields).map(function (x) {
    return {
      column: "grid_small-12",
      fields: [x]
    };
  }) : []);
  var overwrites = props.overwrites || {};

  var _useState3 = React.useState(Object.keys(newContext).reduce(function (a, b) {
    return a[b] = {
      valid: true,
      message: ""
    }, a;
  }, {})),
      _useState4 = _slicedToArray(_useState3, 2),
      validChecks = _useState4[0],
      setValidChecks = _useState4[1];

  var _onSubmit = function onSubmit(event) {
    event.preventDefault();
    var newValidChecks = services.validation2(formValues, model, validChecks);
    setValidChecks(newValidChecks);
    var valid = Object.keys(newValidChecks).reduce(function (a, b) {
      return a ? newValidChecks[b].valid : a;
    }, true);
    valid && props.onSubmit && props.onSubmit();
  };

  return React__default.createElement("form", {
    name: name,
    className: "flex",
    autoComplete: "off",
    ref: form,
    onSubmit: function onSubmit(event) {
      return _onSubmit(event);
    }
  }, props.topContent && props.topContent, structure.map(function (y, j) {
    return React__default.createElement("div", {
      className: y.column,
      key: j
    }, y.fields.map(generateField(props, model, formValues, formValues, overwrites, fields, validChecks)));
  }), footerContent ? footerContent() : React__default.createElement("div", {
    className: "flex"
  }, React__default.createElement("button", {
    className: "large margin-right"
  }, submitLabel), !!cancel && React__default.createElement("button", {
    type: "button",
    className: "grey large margin-right",
    onClick: cancel
  }, "Cancel"), loading && React__default.createElement("span", {
    className: "padding"
  }, React__default.createElement(Loading, null))));
};

var Loading$1 = Loading;
var Table$1 = Table;
var TableColumn$1 = TableColumn;
var TableContentRow$1 = TableContentRow;
var Paginationv2$1 = Paginationv2;
var Field2$1 = Field2;
var Dropdown$1 = Dropdown;
var MultiSelect$1 = MultiSelect;
var DropdownItem$1 = DropdownItem;
var closeModal$1 = closeModal;
var Modal$1 = Modal;
var modeller = services.modeller;
var ModellerTable$1 = ModellerTable;
var ModellerForm2$1 = ModellerForm2;
var _React = React__default;

exports.Dropdown = Dropdown$1;
exports.DropdownItem = DropdownItem$1;
exports.Field2 = Field2$1;
exports.Loading = Loading$1;
exports.Modal = Modal$1;
exports.ModellerForm2 = ModellerForm2$1;
exports.ModellerTable = ModellerTable$1;
exports.MultiSelect = MultiSelect$1;
exports.Paginationv2 = Paginationv2$1;
exports.Table = Table$1;
exports.TableColumn = TableColumn$1;
exports.TableContentRow = TableContentRow$1;
exports._React = _React;
exports.closeModal = closeModal$1;
exports.modeller = modeller;
//# sourceMappingURL=components.js.map
