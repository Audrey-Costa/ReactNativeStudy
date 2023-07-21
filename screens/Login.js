import { View, Image, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../assets/icon.png';

export default function Login({ navigation }) {
    function navigator() {
        navigation.navigate('StickerSmash')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={Logo} style={styles.imageContainer}/>
            <LoginForm onPress={navigator}/>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        height: 200,
        marginTop: 50,
    },
});