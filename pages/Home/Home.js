import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "react-query";
import Schedule from "../../components/Schedule";
import { Colors } from "../../constants/Colors";
import HomeText from "../../components/HomeText";

const Home = () => {
	const isFocused = useIsFocused();
	const { data, refetch } = useQuery({
		queryKey: ["schedules"],
		queryFn: async () => {
			const response = await fetch(
				"https://bus-schedule-server.vercel.app/api/schedule/"
			);
			const scheduleData = await response.json();
			return scheduleData;
		},
	});
	useEffect(() => {
		refetch();
	}, [isFocused]);
	const renderSchedule = (renderData) => {
		const { item } = renderData;
		return <Schedule item={item} all="all" />;
	};
	return (
		<View style={styles.container}>
			<HomeText text="Upcoming Bus" />

			{data && (
				<FlatList
					data={data.slice(0, 5)}
					renderItem={renderSchedule}
					keyExtractor={(schedule) => schedule._id}
				/>
			)}

			<HomeText text="Recent Bus" />

			{data && (
				<FlatList
					data={data.slice(0, 5)}
					renderItem={renderSchedule}
					keyExtractor={(schedule) => schedule._id}
				/>
			)}
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
