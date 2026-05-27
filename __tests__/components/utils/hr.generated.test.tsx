import { View } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import HR from '@/components/utils/hr';
import { render } from '@testing-library/react-native';

describe('<HR>', () => {
    it('should render component', () => {
        expect(render(<HR
        />).toJSON()).toMatchSnapshot();
    });

});
