import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ResultScreen = ({ route }) => {
    const navigation = useNavigation();
    const [curveData, setCurveData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { result } = route.params;

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('DefineForm');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        axios
            .get('*/calibration_curve')
            .then((response) => {
                setCurveData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });

        return () => {
            backHandler.remove();
        };
    }, [navigation]);

    const handleRetakeTest = () => {
        navigation.navigate('DefineForm');
    };

    let msgAlert = () => {
        if (result.results[0].prediction === 1) {
            Alert.alert(
                'Aviso Importante',
                'O resultado do teste sugere uma possível condição médica.\nÉ aconselhável que você procure um médico para uma avaliação mais detalhada.',
                [
                    { text: 'OK' }
                ]
            );
        }
        else {
            Alert.alert(
                'Aviso Importante',
                'É importante lembrar que o aplicativo foi desenvolvido com a intenção de ser um auxílio na compreensão dos sintomas e fatores relacionados à diabetes. Se você suspeita que possa estar enfrentando sintomas de diabetes ou tem preocupações sobre a sua saúde, recomendamos enfaticamente que procure um médico. O diagnóstico preciso e o tratamento adequado são essenciais para o seu bem-estar.',
                [
                    { text: 'OK' }
                ]
            );
        }
    }
    msgAlert();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.chartTitle}>Distribuição de Probabilidade</Text>
                <BarChart
                    data={{
                        labels: ['Diabetes', 'Não Diabetes'],
                        datasets: [
                            {
                                data: [
                                    result.results[0].probability_diabetes,
                                    result.results[0].probability_not_diabetes,
                                ],
                            },
                        ],
                    }}
                    width={400}
                    height={350}
                    yAxisSuffix="%"
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#f0f0f0',
                        backgroundGradientTo: '#f0f0f0',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 0.6) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            </View>

            {/*<View style={styles.chart}>
                <Text style={styles.chartTitle}>Calibration Curve</Text>
                {curveData ? (
                    <LineChart
                        data={{
                            labels: curveData.mean_predicted_value.map((value) => value.toFixed(2)),
                            datasets: [
                                {
                                    data: curveData.fraction_of_positives.map((value) => value.toFixed(2)),
                                },
                            ],
                        }}
                        width={400}
                        height={200}
                        yAxisSuffix="%"
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#f0f0f0',
                            backgroundGradientTo: '#f0f0f0',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 0.6) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                    />
                ) : (
                    <Text>Error fetching data</Text>
                )}
                </View>

            <View style={styles.container}>
                <Text style={styles.chartTitle}>Accuracy</Text>
                <BarChart
                    data={{
                        labels: ['Accuracy'],
                        datasets: [
                            {
                                data: [
                                    result.results[0].accuracy,
                                    "",
                                ],
                            },
                        ],
                    }}
                    width={400}
                    height={350}
                    yAxisSuffix="%"
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#f0f0f0',
                        backgroundGradientTo: '#f0f0f0',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 0.6) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            </View>*/}

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRetakeTest}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Refazer Teste</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#008B81',
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'stretch',
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonIA: {
        backgroundColor: '#008B81',
        padding: 10,
        borderRadius: 20,
        marginTop: 50,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 50,
    },
    chart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: 45,
    },
});

export default ResultScreen;