import { ScrollView, View, ViewStyle } from 'react-native'
import GradientBar from '@/components/livery/gradientBar';
import useStyles from '@/hooks/styles/useStyles';
import PageLayoutView from '@/components/pageLayoutView';
import { render } from '@testing-library/react-native';

const testProps = {
    children: <View />,
    style: {
        margin: 10,
    },
}

describe('<PageLayoutView>', () => {
    it('should render component', () => {
        expect(render(<PageLayoutView
            children={testProps.children}
            style={testProps.style}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(render(<PageLayoutView
            children={testProps.children}
            style={testProps.style}
        />).toJSON()).toMatchSnapshot();
    });
});
