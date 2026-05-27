import { ScrollView, View, ViewStyle } from 'react-native'
import GradientBar from '@/components/livery/gradientBar';
import useStyles from '@/hooks/styles/useStyles';
import PageLayoutView from '@/components/pageLayoutView';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/pageLayoutView');

const testProps = {
    children: <View />,
    style: {
        margin: 10,
    },
}

describe('<PageLayoutView>', () => {
    it('should render component', async () => {
        const result = await render(<PageLayoutView
            children={testProps.children}
            style={testProps.style}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
    it('should render component with props', async () => {
        const result = await render(<PageLayoutView
            children={testProps.children}
            style={testProps.style}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
});
