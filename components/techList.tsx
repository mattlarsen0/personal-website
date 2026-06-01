import useStyles from '@/hooks/styles/useStyles';
import { View } from 'react-native';
import Icon from '@/components/icon';
import { Link, LinkProps } from 'expo-router';

export type TechListItem = {
    href: LinkProps['href'],
    linkText: string
    icon: string
}
export type TechListProps = {
  data: TechListItem[];
};

export default function TechList(props: TechListProps) {
    const styles = useStyles();
    const items = props.data.map((item, index) => (
        <View key={`techListItem-${index}`} style={styles.centerContainer}>
            <Icon name={item.icon} size={styles.text.fontSize} />
            <Link style={styles.titleLink} href={item.href}>
                {item.linkText}
            </Link>
        </View>
    ));

    return (
        <View style={styles.list}>
            {items}
        </View>
    );
}
