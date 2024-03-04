import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = '*/predict';

const FormScreen = () => {
    const showMessageGlucose = () => {
        Alert.alert(
            'Atenção',
            'Concentração de glicose plasmática após 2 horas em um teste de tolerância à glicose oral.',
            [{ text: 'OK' }]
        );
    };

    const showMessageInsulin = () => {
        Alert.alert(
            'Atenção',
            'Insulina sérica de 2 horas.',
            [{ text: 'OK' }]
        );
    };

    const showMessageInsulinPedigree = () => {
        Alert.alert(
            'Atenção',
            'É uma função que avalia a probabilidade de diabetes com base no histórico familiar da paciente. Ela considera as influências genéticas na predisposição ao diabetes.',
            [{ text: 'OK' }]
        );
    };

    const navigation = useNavigation();
    const [pregnancies, setPregnancies] = useState('0');
    const [glucose, setGlucose] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [skinThickness, setSkinThickness] = useState('');
    const [insulin, setInsulin] = useState('');
    const [bmi, setBMI] = useState('');
    const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const RNA = () => {
        const weightInKg = parseFloat(weight);
        const heightInCm = parseFloat(height) / 100;
        const bmi = (weightInKg / (heightInCm * heightInCm)).toFixed(2);
        setBMI(bmi);

        const requestBody = {
            Pregnancies: pregnancies,
            Glucose: glucose,
            BloodPressure: bloodPressure,
            SkinThickness: skinThickness,
            Insulin: insulin,
            BMI: bmi,
            DiabetesPedigreeFunction: diabetesPedigreeFunction,
            Age: age,
        };

        axios.post(API_URL, requestBody)
            .then(response => {
                navigation.navigate('Loop', { result: response.data });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const CheckForm = () => {
        if (glucose == "" || bloodPressure == "" || skinThickness == "" || insulin == "" || diabetesPedigreeFunction == "" || age == "" || weight == "" || height == "") {
            Alert.alert(
                'Aviso',
                'Preencher todos os campos do formulário!',
                [
                    { text: 'OK' }
                ]
            );
        }
        else {
            RNA();
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.container}>

                    <View style={styles.containerTxt}>
                        <Text style={styles.topics}>Numero de Gestações</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setPregnancies(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <View style={styles.textContainer}>
                            <Text style={styles.topics}>Glicemia</Text>
                        </View>
                        <TouchableOpacity style={styles.iconContainer} onPress={showMessageGlucose}>
                            <Icon name="help-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setGlucose(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <Text style={styles.topics}>Pressão Arterial Diastólica (mm Hg)</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setBloodPressure(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <Text style={styles.topics}>Espessura da Dobra Cutânea do Tríceps (mm)</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setSkinThickness(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <View style={styles.textContainer}>
                            <Text style={styles.topics}>Insulina</Text>
                        </View>
                        <TouchableOpacity style={styles.iconContainer} onPress={showMessageInsulin}>
                            <Icon name="help-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setInsulin(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <Text style={styles.topics}>Peso (kg)</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        value={weight}
                        onChangeText={text => setWeight(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <Text style={styles.topics}>Altura (cm)</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        value={height}
                        onChangeText={text => setHeight(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <View style={styles.textContainer}>
                            <Text style={styles.topics}>Função de Pedigree de Diabetes</Text>
                        </View>
                        <TouchableOpacity style={styles.iconContainer} onPress={showMessageInsulinPedigree}>
                            <Icon name="help-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setDiabetesPedigreeFunction(text)}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerTxt}>
                        <Text style={styles.topics}>Idade</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: '#fff' }]}
                        onChangeText={text => setAge(text)}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.button} onPress={CheckForm} >
                        <Text style={styles.buttonText}>Consultar</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#008B81',
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 10,
    },
    topics: {
        fontWeight: 'bold',
        color: '#fff',
        left: 8,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 300,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 50,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#008B81',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    containerTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        marginLeft: 10,
    },
    topicsFPD: {
        color: 'white',
        fontSize: 16,
    },
});

export default FormScreen;