import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Schedule = ({ item, all }) => {
	const { bus, route, time } = item;
	// console.log(bus, route, time);
	return (
		<View
			style={{
				padding: 10,
			}}
		>
			<View style={styles.scheduleContainer}>
				<Text style={styles.scheduleItem}>{time}</Text>
				{all && <Text style={styles.scheduleItem}>{route}</Text>}
				<Text style={styles.scheduleItem}>{bus}</Text>
			</View>
		</View>
	);
};

export default Schedule;

const styles = StyleSheet.create({
	scheduleContainer: {
		width: "100%",
		height: 60,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#30336b",
		borderRadius: 20,
		elevation: 4,
	},
	scheduleItem: {
		fontSize: 20,
		fontWeight: "500",
		paddingHorizontal: 20,
		color: "white",
	},
});
