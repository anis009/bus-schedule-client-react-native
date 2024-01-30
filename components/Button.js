import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const Button = ({ title, onPress }) => {
	return (
		<Pressable style={styles.buttonContainer}>
			<Text onPress={onPress} style={styles.buttonTitle}>
				{title}
			</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: Colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		elevation: 3,
		borderWidth: 1,
		borderColor: Colors.secondary,
		marginTop: 20,
		borderRadius: 10,
	},
	buttonTitle: {
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
		color: "white",
	},
});
