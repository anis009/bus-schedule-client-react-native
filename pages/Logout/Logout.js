import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../store/user-context";
import { useToast } from "react-native-toast-notifications";

const Logout = () => {
	const { logOut } = useContext(AuthContext);
	const toast = useToast();
	const logoutHandler = () => {
		logOut();
		toast.show("logout successfully", {
			type: "success",
			placement: "top",
			duration: 2000,
			offset: 60,
			animationType: "slide-in",
		});
	};
	return (
		<View style={styles.logoutContainer}>
			<Pressable onPress={logoutHandler} style={styles.innerContainer}>
				<Text style={styles.logoutText}>Logout</Text>
			</Pressable>
		</View>
	);
};

export default Logout;

const styles = StyleSheet.create({
	logoutContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	innerContainer: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: "#4535ee",
		elevation: 5,
	},
	logoutText: {
		fontSize: 24,
		fontWeight: "600",
		color: "red",
	},
});
