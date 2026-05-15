import Icon from "@/components/icon";
import Resume from "@/components/resume/resume";
import useStyles from "@/components/styles/styles";
import TechList from "@/components/techList";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import HR from "@/components/utils/hr";

export default function Index() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '95%' }}>
        <Text style={styles.titleText}>
          Welcome to my website!
          See my resume below!
          Hire Me (Contact): <Link href="mailto:matt.larsen0@gmail.com">matt.larsen0@gmail.com</Link>
        </Text>
        <View style={{alignItems: 'center', margin: 20}}>
          <Resume/>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.h3}>
            This website was built with:
          </Text>
          <TechList
            style={styles.text}
            data={[
              <Link key="0" href="https://reactnative.dev/">
                <Icon name="react"/> React Native
              </Link>,
              <Link key="1" href="https://expo.dev/">
                <Icon name="mobile"/> Expo
              </Link>,
              <Link key="2" href="https://www.typescriptlang.org/">
                <Icon name="check-double" />TypeScript
              </Link>,
              <Link key="3" href="https://code.visualstudio.com/">
                <Icon name="microsoft" />VS Code
              </Link>,
              <Link key="4" href="https://github.com/features/copilot">
                <Icon name="github-alt" />Github Copilot (Autocomplete only)
              </Link>,
              <Link key="5" href="https://pages.cloudflare.com/">
                <Icon name="cloud" />Cloudflare Pages (Automatic Deployment and Hosting)
              </Link>,
            ]}
          />
          </View>
      </ScrollView>
    </View>
  );
}
