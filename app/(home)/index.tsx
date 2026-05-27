import Icon from '@/components/icon';
import Resume from '@/components/resume/resume';
import useStyles from '@/hooks/styles/useStyles';
import TechList from '@/components/techList';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import PageLayoutView from '@/components/pageLayoutView';

export default function Index() {
    const styles = useStyles();
    return (
    <PageLayoutView>
      <ScrollView contentContainerStyle={{ width: '95%' }}>
        <Text style={styles.h1}>Welcome to Matt Larsen's website!</Text>
        <View style={styles.centerContainer}>
          <Text style={styles.h2}>Hire Me (Contact):&nbsp;</Text>
          <Link style={styles.titleLink} href="mailto:matt.larsen0@gmail.com">matt.larsen0@gmail.com</Link>
        </View>
        <Text style={styles.h2}></Text>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>Built with React Native, checkout my code here:&nbsp;</Text>
          <Link style={styles.titleLink} href='https://github.com/mattlarsen0/personal-website/'>https://github.com/mattlarsen0/personal-website/</Link>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>Download it for Android here:&nbsp;</Text>
          <Link style={styles.titleLink} href='https://www.github.com'>
            <Icon name="download" />
          </Link>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>Read my resume below, try out </Text>
          <Link href="/(snake)" style={styles.titleLink}>S-N-A-K-E</Link>
          <Text style={styles.titleText}> and refresh to change colors!</Text>
        </View>
        <View style={{alignItems: 'center', margin: 20}}>
          <Resume/>
        </View>
        <Text style={styles.h3}>
          This website was built with:
        </Text>
        <View style={styles.centerContainer}>
          <TechList
              style={styles.text}
              data={[
              <View style={styles.centerContainer}>
                <Icon name="react" size={styles.text.fontSize} />
                <Link style={styles.titleLink} key="0" href="https://reactnative.dev/">
                  React Native
                </Link>
              </View>,
              <View style={styles.centerContainer}>
                <Icon name="mobile" size={styles.text.fontSize} />
                <Link style={styles.titleLink} key="1" href="https://expo.dev/">
                  Expo
                </Link>
              </View>,
              <View style={styles.centerContainer}>
                <Icon name="check-double" size={styles.text.fontSize} />
                <Link style={styles.titleLink} key="2" href="https://www.typescriptlang.org/">
                  TypeScript
                </Link>
              </View>,
              <View style={styles.centerContainer}>
                <Icon name="microsoft" size={styles.text.fontSize} />
                <Link style={styles.titleLink} key="3" href="https://code.visualstudio.com/">
                  VS Code
                </Link>
              </View>,
              <View style={styles.centerContainer}>
                <Icon name="github-alt" size={styles.text.fontSize} />
                <Link style={styles.titleLink} key="4" href="https://github.com/features/copilot">
                  Github Copilot (Autocomplete only)
                </Link>
              </View>,
              <View style={styles.centerContainer}>
                <Icon name="cloud" size={styles.text.fontSize} />
                <Link style={styles.titleLink} key="5" href="https://pages.cloudflare.com/">
                  Cloudflare Pages (Automatic Deployment and Hosting)
                </Link>
              </View>,
              ]}
          />
          </View>
      </ScrollView>
    </PageLayoutView>
    );
}
