import { View } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import HR from '@/components/utils/hr';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/utils/hr');

describe('<HR>', () => {
    it('should render component', () => {
        expect(render(<HR
        />).toJSON()).toMatchSnapshot();
    });

});
