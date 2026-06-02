eas build -p android --profile preview --local
rm latestAndroidBuild.zip
rm personalWebsite.apk
mv build-*.apk personalWebsite.apk
7z a latestAndroidBuild.zip personalWebsite.apk