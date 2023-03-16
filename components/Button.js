import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

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
		backgroundColor: "green",
		paddingVertical: 5,
		paddingHorizontal: 20,
		elevation: 3,
		borderWidth: 1,
		borderColor: "green",
		marginTop: 20,
	},
	buttonTitle: {
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "600",
		color: "white",
	},
});
