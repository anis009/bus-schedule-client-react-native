import {
	StyleSheet,
	ImageBackground,
	Text,
	TextInput,
	View,
	Image,
	Pressable,
	TouchableOpacity,
} from "react-native";

import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import { AuthContext } from "../../store/user-context";
import { useToast } from "react-native-toast-notifications";

const Login = ({ navigation }) => {
	const { user, signIn } = useContext(AuthContext);
	const [isPressed, setIsPressed] = useState(false);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const toast = useToast();
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
	const onPressHandler = () => {
		console.log("anis");
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
		signIn(email, password)
			.then((user) => {
				console.log(user);
				toast.show("Login successfully", {
					type: "success",
					placement: "top",
					duration: 2000,
					offset: 60,
					animationType: "slide-in",
				});
			})
			.catch((err) => {
				toast.show(err.message, {
					type: "danger",
					placement: "bottom",
					duration: 4000,
					offset: 60,
					animationType: "slide-in",
				});
				console.log(err);
			});
	};
	const signUpPressHandler = () => {
		console.log("signup");
		navigation.navigate("Signup");
	};
	return (
		<ImageBackground
			source={require("../../images/background.png")}
			resizeMode="cover"
			style={styles.backGroundImage}
		>
			<View style={styles.loginContainer}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={require("../../images/logo.png")}
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
				<Button title="login" onPress={onPressHandler} />
				<View style={styles.textContainer}>
					<Text style={styles.text}>New to Bu bus?</Text>
					<TouchableOpacity
						onPressIn={() => setIsPressed(true)}
						onPressOut={() => setIsPressed(false)}
					>
						<Pressable onPress={signUpPressHandler}>
							<Text
								style={[styles.linkText, isPressed && styles.hoverLinkText]}
							>
								signup
							</Text>
						</Pressable>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Login;

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: "white",
		borderBottomWidth: 2,
		borderBottomColor: "green",
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
		borderColor: "green",
	},
	exceptFocus: {
		borderColor: "white",
	},
	imageContainer: {
		width: 100,
		height: 100,
		margin: 30,
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
	},
	text: {
		fontSize: 24,
		color: "white",
		fontWeight: "600",
		marginHorizontal: 20,
	},
	linkText: {
		color: "green",
		fontSize: 24,
	},
	hoverLinkText: {
		borderBottomColor: "green",
		borderBottomWidth: 2,
	},
});
