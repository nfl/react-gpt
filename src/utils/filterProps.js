export default function filterProps(propKeys, props, nextProps) {
    return propKeys.reduce(
        (filtered, key) => {
            filtered.props[key] = props[key];
            filtered.nextProps[key] = nextProps[key];
            return filtered;
        },
        {
            props: {},
            nextProps: {}
        }
    );
}
