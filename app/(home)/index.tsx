import Icon from '@/components/icon';
import Resume from '@/components/resume/resume';
import useStyles from '@/hooks/styles/useStyles';
import { Link, LinkProps } from 'expo-router';
import { Platform, ScrollView, Text, View } from 'react-native';
import PageLayoutView from '@/components/pageLayoutView';
import TechList, { TechListItem } from '@/components/techList';

export default function Index() {
    const styles = useStyles();
    const techList: TechListItem[] = [
        {
            href: 'https://reactnative.dev/',
            linkText: 'React Native',
            icon: 'react'
        },
        {
            href: 'https://expo.dev/',
            linkText: 'Expo',
            icon: 'mobile'
        },
        {
            href: 'https://www.typescriptlang.org/',
            linkText: 'TypeScript',
            icon: 'check-double'
        },
        {
            href: 'https://code.visualstudio.com/',
            linkText: 'VS Code',
            icon: 'microsoft'
        },
        {
            href: 'https://github.com/features/copilot',
            linkText: 'Github Copilot',
            icon: 'github-alt'
        },
        {
            href: 'https://www.cloudflare.com/products/workers/',
            linkText: 'Cloudflare Workers',
            icon: 'cloud'
        },
    ];

    const refreshText = Platform.OS === 'web' ? 'refresh' : 're-open the app'
    const appName = Platform.OS === 'web' ? 'Website' : 'App'

    return (
    <PageLayoutView>
      <ScrollView>
        <Text style={styles.h1}>Welcome to Matt Larsen's {appName}!</Text>
        <View style={styles.centerContainer}>
          <Text style={styles.h2}>Hire Me (Contact):&nbsp;</Text>
          <Link style={styles.titleLink} href="mailto:matt.larsen0@gmail.com">matt.larsen0@gmail.com</Link>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>Built with React Native, checkout my code here:&nbsp;</Text>
          <Link style={styles.titleLink} href='https://github.com/mattlarsen0/personal-website/'>https://github.com/mattlarsen0/personal-website/</Link>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>Download it for Android here:&nbsp;</Text>
          <Link style={styles.titleLink} href='https://github.com/mattlarsen0/personal-website/raw/refs/heads/main/latestAndroidBuild.zip'>
            <Icon name="download" />
          </Link>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>Read my resume below, try out </Text>
          <Link href="/(snake)" style={styles.titleLink}>S-N-A-K-E</Link>
          <Text style={styles.titleText}> and {refreshText} to change colors!</Text>
        </View>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Resume />
        </View>
        <Text style={styles.h3}>
          This website was built with:
        </Text>
        <TechList data={techList}/>
      </ScrollView>
    </PageLayoutView>
    );
}
