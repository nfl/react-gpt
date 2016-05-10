export default {
    button: {
        marginTop: 20,
        padding: "2px 6px 3px",
        border: "2px outset buttonface"
    },
    container: {
        marginTop: 20,
        position: "relative"
    },
    main: {
        display: "flex",
        flexDirection: "row",
        "@media (max-width: 768px)": {
            flexDirection: "column"
        }
    },
    adBorder: {
        padding: 10,
        border: "1px dashed #666"
    },
    lb: {
        position: "relative"
    },
    mr: {
        position: "relative",
        order: 1,
        flex: "1 1 auto"
    },
    ws: {
        position: "relative",
        order: 2,
        flex: "0 1 auto"
    }
};
