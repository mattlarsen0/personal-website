jest.mock('@/hooks/styles/useStyles', () => ({
    __esModule: true,
    default: () => ({
        text: {
            color: '#000000',
        },
        list: {
            backgroundColor: '#FFFFFF',
        },
        background: {
            backgroundColor: 'transparent',
        }
    })
}));

jest.mock('react-native', () => ({
    FlatList: ({ data = [], renderItem, style }) => (
        <div className="flatList" style={style}>
            {data.map((item, index) =>
                renderItem ? renderItem({ item, index }) : null
            )}
        </div>
    ),
    Text: ({ children, style }) => (
        <div className="text" style={style}>{children}</div>
    ),
    View: ({ children, style }) => (
        <div className="view" style={style}>{children}</div>
    ),
    ScrollView: ({ children, style }) => (
        <div className="scrollView" style={style}>{children}</div>
    ),
}));

jest.mock('@expo/vector-icons/FontAwesome5', () => ({
    __esModule: true,
    default: ({ name, size, color }) => (
        <div className="fontAwesome5" style={{ fontSize: size, color }}>
            {name}
        </div>
    ),
}));
