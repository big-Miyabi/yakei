import React from "react";
import { StyleSheet, Text, Image, View, StatusBar, SafeAreaView } from "react-native";
import icon from "./images/icon01.jpg";

// const STATUS_BAR_HEIGHT = Platform.OS == "ios" ? 20 : statusbar.currentHeight;

export default MyPage = (props) => {
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style={styles.item1}>
                    <Image style={styles.icon} source={icon}/>
                </View>
                <View style={styles.item2}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text}></Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#1D1D27",
    },
    safeArea:{
        marginTop: 80,
        flexDirection: 'row',
    },
    item1:{
        flex: 2,
        // justifyContent:"center",
        alignItems:"center",
        backgroundColor: "red",
    },
    item2:{
        flex: 3,
        justifyContent: "flex-end",
        backgroundColor: "blue",
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
    },
    icon:{
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderWidth: 4,
        borderColor: "#dedede",
        borderRadius: 50,
    },
    text:{
        color: "#fff",
        backgroundColor: "#165341",
        padding: 0,
        margin: 0,
    },
});