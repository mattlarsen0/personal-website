// put shared mocks here, some expo incompatibility is preventing __mocks__ from working
jest.mock('@/hooks/styles/styleConstants', () => jest.requireActual('@/hooks/styles/styleConstants'));

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
