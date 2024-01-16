import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const DiabetesDiagnosticScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.nameApp}>
                <Text style={styles.heading}>Diabetes Diagnostic App</Text>
                <Text style={styles.description}>
                    Através de tecnologia, ajudamos a avaliar o seu potencial risco de diabetes
                </Text>
            </View>
            <LottieView
                source={require('./animation/animation_lmsf53b6.json')}
                autoPlay
                loop
                style={{ width: 260, height: 260 }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('DefineForm');
                }}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Start Diagnosis</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008B81',
        padding: 40,
    },
    nameApp: {
        top: -30,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#fff',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 10,
        top: 35,
        alignSelf: 'stretch',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#008B81',
        textAlign: 'center',
    },
});

export default DiabetesDiagnosticScreen;