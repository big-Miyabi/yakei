import React, { Component,useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import db from "./Firebase";
import MyPage from "./MyPage";

// const STATUS_BAR_HEIGHT = Platform.OS == "ios" ? 20 : statusbar.currentHeight;

export default App = () => {
    const [data,setData] = useState(null);
    const userRef = db.collection("users").doc("0PNr22ScFq5DG5SXQxYE");

    
        userRef.get()
        .then(doc => {
            // if (!doc.exists) {
            //   console.log('No such document!');
            // } else {
            //   console.log('Document data:', doc.data());
            // }
            setData(doc.data());
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    return (
        <MyPage data={data}/>
    );
}