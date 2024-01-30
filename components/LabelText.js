import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LabelText = ({ text }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		alignItems: "flex-start",
		marginTop: 20,
		width: "100%",
		paddingHorizontal: 25,
		marginBottom: 10,
	},
	text: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 10,
	},
});

export default LabelText;
