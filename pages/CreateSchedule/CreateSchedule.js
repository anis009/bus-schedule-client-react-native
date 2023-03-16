import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { TimePicker } from "react-native-simple-time-picker";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/Button";
import { useToast } from "react-native-toast-notifications";
const CreateSchedule = () => {
	const [hours, setHours] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [ampm, setAmpm] = React.useState("");
	const [route, setRoute] = useState("");
	const [bus, setBus] = useState("");
	const toast = useToast();
	const handleChange = (value) => {
		console.log(value);
		if (value.hours) {
			setHours(value.hours);
		}
		if (value.minutes) {
			setMinutes(value.minutes);
		}

		if (value.ampm) {
			setAmpm(value.ampm);
		}
	};

	const countries = ["route1", "route2", "route3", "Barishal"];
	const submitButtonHandler = () => {
		const time = `${hours}:${minutes} ${ampm}`;
		if (!time || !route || !bus) {
			Alert.alert("Input error", "Plese,Fill the all input", [
				{
					text: "OK",
					onPress: () => {
						console.log("pressed");
					},
				},
			]);
			return;
		}
		const createSchedule = {
			time,
			bus,
			route,
		};

		console.log(createSchedule);
		//TODO: create schedule in mongoDB
		fetch("https://bus-schedule-server.vercel.app/api/schedule/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(createSchedule),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				toast.show("Create Schedule successfully", {
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
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="bus1,bus2,bus3"
					style={[styles.input, styles.focusInput]}
					placeholderTextColor="white"
					onChangeText={(value) => setBus(value)}
				/>
			</View>
			<View
				style={[
					styles.inputContainer,
					{ width: 300, borderWidth: 1, borderColor: "green", margin: 10 },
				]}
			>
				<TimePicker
					value={{ hours, minutes }}
					onChange={handleChange}
					ampmLocalization={{
						am: "AM",
						pm: "PM",
					}}
					isAmpm
					textColor="green"
					dropdownIconColor="white"
					dropdownIconRippleColor="red"
					onPointerDownCapture="green"
				/>
			</View>

			<View>
				<SelectDropdown
					buttonStyle={{
						width: 300,
						margin: "auto",
						backgroundColor: "green",
					}}
					dropdownStyle={{
						width: 300,
					}}
					buttonTextStyle={{
						color: "white",
					}}
					data={countries}
					onSelect={(selectedItem, index) => {
						console.log(selectedItem, index);
						setRoute(selectedItem);
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						// text represented after item is selected
						// if data array is an array of objects then return selectedItem.property to render after item is selected
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						// text represented for each item in dropdown
						// if data array is an array of objects then return item.property to represent item in dropdown
						return item;
					}}
				/>
			</View>

			<Button title="create schedule" onPress={submitButtonHandler} />
		</View>
	);
};

export default CreateSchedule;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#1B1464",
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
		width: 300,
	},
	input: {
		borderWidth: 2,
		borderColor: "white",
		padding: 10,
		borderRadius: 5,
		outlineStyle: "none",
		fontSize: 16,
		fontWeight: "600",
		color: "white",
		width: 300,
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
