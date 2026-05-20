import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useStyles from '../hooks/styles/useStyles';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 24, color = '' }: IconProps) {
    const styles = useStyles();

    return (
        <FontAwesome5 style={{paddingRight: 10, paddingLeft: 10}} name={name} size={size} color={color === '' ? styles.text.color : color} />
    );
}