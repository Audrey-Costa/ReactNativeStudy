import { Pressable, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';

export default function LoginForm({ onPress }) {
    return (

        <Formik
            initialValues={{ user: '', password: '' }}
            onSubmit={values => {
                console.log(values);
                onPress();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.formikContainer}>
                    <TextInput
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={values.user}
                        placeholder='User'
                        style={styles.textInputContainer}
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder='password'
                        style={styles.textInputContainer}
                    />
                    <Pressable onPress={handleSubmit} title="Submit" style={styles.button}><Text style={styles.buttonText}>Login</Text></Pressable>
                    <Pressable style={styles.button}><Text style={styles.buttonText}>Register</Text></Pressable>
                </View>
            )}
        </Formik>
    )
};

const styles = StyleSheet.create({
    formikContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: -150,
    },
    textInputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000',
        width: 200,
        height: 40,
        backgroundColor: '#CACACA',
        paddingLeft: 10
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        backgroundColor: '#77FFAA',
        borderRadius: 20
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
    },
});