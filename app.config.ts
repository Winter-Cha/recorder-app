import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'dangcu-recorder-app',
    description: 'dangcu-recorder-app',
    slug: 'dangcu-recorder-app',
    owner: 'dangcuapp',
    extra: {
        // add envrc variables here
        expoClientId: process.env.EXPO_CLIENT_ID,
        iosClientId: process.env.IOS_CLIENT_ID,
        androidClientId: process.env.ANDROID_CLIENT_ID,
    },
});

