Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = isInViewport;
function isInViewport(el) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0],
        _ref2 = _slicedToArray(_ref, 2),
        width = _ref2[0],
        height = _ref2[1];

    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (!el || el.nodeType !== 1) {
        return false;
    }
    var clientRect = el.getBoundingClientRect();
    var rect = {
        top: clientRect.top,
        left: clientRect.left,
        bottom: clientRect.bottom,
        right: clientRect.right
    };
    var viewport = {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth
    };
    var inViewport = rect.bottom >= viewport.top + height * offset && rect.right >= viewport.left + width * offset && rect.top <= viewport.bottom - height * offset && rect.left <= viewport.right - width * offset;
    return inViewport;
}