import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import Schedule from "../../components/Schedule";

const Route3 = () => {
	const { data } = useQuery({
		queryKey: ["schedules", "route3"],
		queryFn: async () => {
			const response = await fetch(
				"https://bus-schedule-server.vercel.app/api/schedule?route=route3"
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

export default Route3;

const styles = StyleSheet.create({});
