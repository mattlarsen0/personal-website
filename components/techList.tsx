import useStyles from '@/hooks/styles/useStyles';
import { FlashList } from '@shopify/flash-list';
import { StyleProp, Text, TextStyle, View } from 'react-native';
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
    return (
        <FlashList
            data={props.data}
            renderItem={({item}) => (
                <View style={styles.centerContainer}>
                    <Icon name={item.icon} size={styles.text.fontSize} />
                    <Link style={styles.titleLink} href={item.href}>
                        {item.linkText}
                    </Link>
                </View>
            )}
            style={styles.list}
        />
    );
}
