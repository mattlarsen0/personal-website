import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View } from 'react-native';
import useStyles from './styles/styles';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 24, color = '' }: IconProps) {
    const styles = useStyles();

    return (
        <View style={{ margin: 20 }}>
            <FontAwesome5 name={name} size={size} color={color === '' ? styles.text.color : color} />
        </View>
    );
}