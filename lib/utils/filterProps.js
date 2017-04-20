Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = filterProps;
function filterProps(propKeys, props, nextProps) {
    return propKeys.reduce(function (filtered, key) {
        filtered.props[key] = props[key];
        filtered.nextProps[key] = nextProps[key];
        return filtered;
    }, {
        props: {},
        nextProps: {}
    });
}