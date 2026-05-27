// put shared mocks here, some expo incompatibility is preventing __mocks__ from working
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
    Pressable: ({ children, onPress, style }) => (
        <div className="pressable" style={style} onClick={onPress}>
            {children}
        </div>
    ),
    AppState: {
        currentState: 'active',
        addEventListener: jest.fn().mockImplementation((event, callback) => {
            return {
                remove: jest.fn(),
            };
        }),
        removeEventListener: jest.fn(),
    },
    useWindowDimensions: jest.fn().mockReturnValue({ width: 800, height: 600 }),
}));

jest.mock('@expo/vector-icons/FontAwesome5', () => ({
    __esModule: true,
    default: ({ name, size, color }) => (
        <div className="fontAwesome5" style={{ fontSize: size, color }}>
            {name}
        </div>
    ),
}));

jest.mock('expo-router', () => ({
    Link: ({ href, children }) => (
        <a href={href} className="link">
            {children}
        </a>
    ),
}));

jest.mock('@/utils', () => ({
    __esModule: true,
    default: {
        wrap: jest.fn().mockImplementation((value, min, max) => {
            return value;
        })
    }
}));

jest.mock('@/components/utils/hr', () => ({
    __esModule: true,
    default: jest.fn(() => <div className='hr' />),
}));

jest.mock('@/components/ResumeList', () => ({
    __esModule: true,
    default: jest.fn(({ children, style }) => <div className='resumeList'>{children}</div>),
}));

jest.mock('@/components/livery/gradientBar', () => ({
    __esModule: true,
    default: jest.fn(() => (<div className='gradient-bar'></div>)),
}));
