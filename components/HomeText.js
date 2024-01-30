import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const HomeText = ({ text }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

export default HomeText;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.success,
		width: "90%",
		padding: 10,
		margin: "auto",
		justifyContent: "center",
		alignSelf: "center",
		marginVertical: 10,
		borderRadius: 20,
		paddingVertical: 10,
		marginTop: 10,
	},
	text: {
		fontSize: 20,
		color: "white",
	},
});
