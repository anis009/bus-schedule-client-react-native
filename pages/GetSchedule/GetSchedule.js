import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Schedule from "../../components/Schedule";
import { useIsFocused } from "@react-navigation/native";
const GetSchedule = () => {
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

export default GetSchedule;

const styles = StyleSheet.create({});
