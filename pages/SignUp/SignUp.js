import {
	StyleSheet,
	ImageBackground,
	Text,
	TextInput,
	View,
	Image,
	Pressable,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import { AuthContext } from "../../store/user-context";
import { Colors } from "../../constants/Colors";

const Login = ({ navigation }) => {
	const [isPressed, setIsPressed] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { createUser, updateUserProfile } = useContext(AuthContext);
	const toast = useToast();
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

	const onPressHandler = () => {
		if (reg.test(email) === false) {
			console.log("");
			Alert.alert("Email is Not Correct", "Please,Give valid email", [
				{
					text: "Ok",
					onPress: () => {
						console.log("pressed!");
					},
				},
			]);
			return;
		}

		if (!name || !email || !password) {
			Alert.alert("Input Alert!!!!!", "Please,Fill the input filed", [
				{
					text: "Ok",
					onPress: () => {
						console.log("pressed!");
					},
				},
			]);
			return;
		}

		if (password.length < 6) {
			Alert.alert(
				"Input Alert!!!!!",
				"Password should be more than six character",
				[
					{
						text: "Ok",
						onPress: () => {
							console.log("pressed!");
						},
					},
				]
			);

			return;
		}
		// TODO: signup user
		createUser(email, password)
			.then((result) => {
				const user = result.user;
				//TODO: create user in mongoDB
				fetch("https://bus-schedule-server.vercel.app/api/user/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: name,
						email: user?.email,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						toast.show("SignUp successfully", {
							type: "success",
							placement: "top",
							duration: 2000,
							offset: 60,
							animationType: "slide-in",
						});
					})
					.catch((err) => {
						console.log(err);
					});
				// TODO: update user name
				handleUpdateUserProfile(name);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// TODO: update profile function
	const handleUpdateUserProfile = (name) => {
		const profile = {
			displayName: name,
		};
		updateUserProfile(profile)
			.then(() => {
				navigation.navigate("Home");
			})
			.catch((error) => {
				setError(error.message);
				console.error(error);
			});
	};

	const signUpPressHandler = () => {
		navigation.navigate("Login");
	};
	return (
		<View style={styles.loginContainer}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require("../../images/logo.png")} />
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholderTextColor="white"
					style={[styles.input, styles.focusInput]}
					placeholder="name"
					onChangeText={(value) => setName(value)}
					value={name}
				/>
			</View>

			<View style={styles.inputContainer}>
				<TextInput
					placeholderTextColor="white"
					style={[styles.input, styles.focusInput]}
					placeholder="email"
					textContentType="emailAddress"
					keyboardType="email-address"
					onChangeText={(value) => setEmail(value)}
					value={email}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="password"
					style={[styles.input, styles.focusInput]}
					placeholderTextColor="white"
					secureTextEntry={true}
					onChangeText={(value) => setPassword(value)}
					value={password}
				/>
			</View>
			<Button title="Signup" onPress={onPressHandler} />
			<View style={styles.textContainer}>
				<View>
					<Text style={styles.text}>Already have an account?</Text>
				</View>
				<TouchableOpacity
					onPressIn={() => setIsPressed(true)}
					onPressOut={() => setIsPressed(false)}
				>
					<Pressable onPress={signUpPressHandler}>
						<Text style={[styles.linkText, isPressed && styles.hoverLinkText]}>
							Login
						</Text>
					</Pressable>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: Colors.success,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: "white",
		borderBottomWidth: 2,
		borderBottomColor: Colors.primary,
		width: 200,
		textAlign: "center",
		padding: 10,
		marginVertical: 20,
	},

	inputContainer: {
		padding: 10,
		width: 300,
	},
	input: {
		borderWidth: 2,
		borderColor: "white",
		padding: 10,
		borderRadius: 5,
		outlineStyle: "none",
		fontSize: 18,
		fontWeight: "600",
		color: "white",
	},
	backGroundImage: {
		flex: 1,
		justifyContent: "center",
	},
	focusInput: {
		borderColor: Colors.primary,
	},
	exceptFocus: {
		borderColor: "white",
	},
	imageContainer: {
		width: 200,
		height: 200,
		margin: 30,
		backgroundColor: Colors.secondary,
		borderRadius: 200,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	textContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 20,
		marginHorizontal: 5,
	},
	text: {
		fontSize: 16,
		color: "white",
		fontWeight: "600",
		marginHorizontal: 20,
	},
	linkText: {
		color: Colors.primary,
		fontSize: 20,
	},
	hoverLinkText: {
		borderBottomColor: Colors.primary,
		borderBottomWidth: 2,
	},
});
