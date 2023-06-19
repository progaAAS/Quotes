import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function About(){
    return (
        <View style={styles.container}>
            <Text>О приложении</Text>
        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
