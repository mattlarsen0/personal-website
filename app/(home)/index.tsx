import Icon from "@/components/icon";
import Resume from "@/components/resume/resume";
import useStyles from "@/components/styles/styles";
import TechList from "@/components/techList";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to my website!
        See my resume below!
        
        Hire Me (Contact): <Link href="mailto:matt.larsen0@gmail.com">matt.larsen0@gmail.com</Link>
      </Text>
      <Resume />

      <Text>
        This website was built with:
      </Text>
      <View>
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
    </View>
  );
}
