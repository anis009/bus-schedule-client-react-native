import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import Schedule from "../../components/Schedule";

const Route2 = () => {
	const { data } = useQuery({
		queryKey: ["schedules"],
		queryFn: async () => {
			const response = await fetch(
				"https://bus-schedule-server.vercel.app/api/schedule?route=route2"
			);
			const scheduleData = await response.json();
			return scheduleData;
		},
	});

	console.log("sina", data);
	const renderSchedule = (renderData) => {
		const { item } = renderData;
		return <Schedule item={item} />;
	};
	return (
		<View>
			{data && (
				<FlatList
					data={data}
					renderItem={renderSchedule}
					keyExtractor={(schedule) => schedule._id}
				/>
			)}
		</View>
	);
};

export default Route2;

const styles = StyleSheet.create({});
