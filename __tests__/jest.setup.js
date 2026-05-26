export const useStyles = () => ({
    list: {
        backgroundColor: '#FFFFFF',
    },
});

export const reactNative = () => ({
    FlatList: ({ data = [], style }) => (
        <div className="flatList" style={style}>
        {data?.map((item, index) => (
            <div key={index}>{item}</div>
        ))}
        </div>
    ),
    Text: ({ children, style }) => (
        <div className="text" style={style}>{children}</div>
    ),
    View: ({ children, style }) => (
        <div className="view" style={style}>{children}</div>
    ),
});

export default reactNative();
