import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import Schedule from "../../components/Schedule";

const Route1 = () => {
	const { data } = useQuery({
		queryKey: ["schedules", "route1"],
		queryFn: async () => {
			const response = await fetch(
				`https://bus-schedule-server.vercel.app/api/schedule?route=route1`
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

export default Route1;

const styles = StyleSheet.create({});
