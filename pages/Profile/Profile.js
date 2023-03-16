import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../store/user-context";

const Profile = () => {
	const { user } = useContext(AuthContext);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				margin: 20,
			}}
		>
			<Image
				source="https://i.ibb.co/fp92Ldr/icons8-person-90.png"
				style={{
					width: 100,
					height: 100,
					borderWidth: 2,
					borderColor: "blue",
					borderRadius: 100,
				}}
			/>
			<Text
				style={{
					textAlign: "center",
					fontSize: 20,
				}}
			>
				{user?.displayName}
			</Text>
			<Text
				style={{
					fontSize: 16,
				}}
			>
				{user?.email}
			</Text>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({});
