import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Selecione um Gênero</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Men');
                    }}
                    activeOpacity={0.7}
                >
                    <Image
                        source={require('./assets/man.png')}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.buttonTextStyle}>Masculino</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Women');
                    }}
                    activeOpacity={0.7}
                >
                    <Image
                        source={require('./assets/woman.png')}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.buttonTextStyle}>Feminino</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008B81',
    },
    header: {
        fontSize: 20,
        marginBottom: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 20,
        alignItems: 'center',
    },
    buttonImage: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginTop: 15,
        fontWeight: 'bold',
    },
});

export default App;
