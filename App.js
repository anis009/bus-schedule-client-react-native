import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthProvider, { AuthContext } from "./store/user-context";
import Login from "./pages/Login/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import {
	Feather,
	Entypo,
	Ionicons,
	AntDesign,
	MaterialIcons,
} from "@expo/vector-icons";
import { ToastProvider } from "react-native-toast-notifications";
import { useContext } from "react";
import Logout from "./pages/Logout/Logout";
import GetSchedule from "./pages/GetSchedule/GetSchedule";
import CreateSchedule from "./pages/CreateSchedule/CreateSchedule";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Route1 from "./pages/Route1/Route1";
import Route2 from "./pages/Route2/Route2";
import Route3 from "./pages/Route3/Route3";
import { QueryClient, QueryClientProvider } from "react-query";
import { Colors } from "./constants/Colors";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const queryClient = new QueryClient();

export default function App() {
	// TODO: topNavigator
	const TopTabNavigator = () => {
		return (
			<TopTab.Navigator
				screenOptions={{
					tabBarActiveTintColor: "blue",
					tabBarInactiveTintColor: "white",
					tabBarLabelStyle: { fontSize: 16 },
					tabBarStyle: {
						backgroundColor: Colors.success,
						paddingTop: 20,
					},
				}}
				initialRouteName="route3"
			>
				<TopTab.Screen name="all" component={GetSchedule} />
				<TopTab.Screen name="route1" component={Route1} />
				<TopTab.Screen name="route2" component={Route2} />
				<TopTab.Screen name="route3" component={Route3} />
			</TopTab.Navigator>
		);
	};
	// TODO: tab navigator route
	const TabNavigator = () => {
		const { user } = useContext(AuthContext);

		return (
			<Tab.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTintColor: "white",
					headerTitleAlign: "center",
					tabBarStyle: {
						backgroundColor: Colors.primary,
					},
					tabBarActiveBackgroundColor: Colors.secondary,
					tabBarLabelStyle: {
						color: Colors.success,
						fontSize: 14,
					},
				}}
			>
				<Tab.Screen
					name="Home"
					options={{
						tabBarIcon: () => <Feather name="home" size={24} color="white" />,
					}}
					component={Home}
				/>
				<Tab.Screen
					name="Schedule"
					options={{
						headerShown: false,
						tabBarIcon: () => (
							<MaterialIcons name="schedule" size={24} color="white" />
						),
					}}
					component={TopTabNavigator}
				/>
				{!user?.uid ? (
					<>
						<Tab.Screen
							name="Login"
							options={{
								tabBarIcon: () => (
									<Entypo name="login" size={24} color="white" />
								),
							}}
							component={Login}
						/>
					</>
				) : (
					<>
						<Tab.Screen
							name="Add"
							options={{
								tabBarIcon: () => (
									<AntDesign name="pluscircleo" size={24} color="white" />
								),
								headerTitle: "Create Schedule",
							}}
							component={CreateSchedule}
						/>
						<Tab.Screen
							name="Logout"
							options={{
								tabBarIcon: () => (
									<AntDesign name="logout" size={24} color="white" />
								),
							}}
							component={Logout}
						/>
						<Tab.Screen
							name="Profile"
							options={{
								tabBarIcon: () => (
									<Ionicons name="person" size={24} color="white" />
								),
							}}
							component={Profile}
						/>
					</>
				)}
			</Tab.Navigator>
		);
	};

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<ToastProvider>
						<StatusBar style="light" />
						<Stack.Navigator
							screenOptions={{
								headerStyle: {
									backgroundColor: "#711DB0",
								},
								headerTintColor: "white",
								headerTitleAlign: "center",
							}}
						>
							<Stack.Screen
								name="Tab"
								component={TabNavigator}
								options={{
									headerShown: false,
								}}
							/>

							<Stack.Screen name="Signup" component={SignUp} />
						</Stack.Navigator>
					</ToastProvider>
				</NavigationContainer>
			</QueryClientProvider>
		</AuthProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
