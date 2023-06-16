import { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getItem } from "../utils/asyncStorage";
import { formatMsecsStringByLocale } from "../utils/time";
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

type SavedData = {
  seconds: number;
  date: string;
  time: string;
};

function Page(): ReactElement {
  const [total, setTotal] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    setTotalTime();
  }, []);

  const setTotalTime = async () => {
    let data = await getItem("recoding-json");
    let datajson = data ? JSON.parse(data) : [];
    let thisMonth = moment().format("MM");
    setMonth(thisMonth);
    // gether total time
    let total = 0;
    let todayTotal = 0;
    let weekTotal = 0;
    let monthTotal = 0;
    datajson.forEach((element: SavedData) => {
      // check element.date to today, this week, this month
      if (element.date === moment().format("YYYYMMDD")) {
        todayTotal += element.seconds;
      }
      if (
        element.date <= moment().format("YYYYMMDD") &&
        element.date >= moment().subtract(7, "days").format("YYYYMMDD")
      ) {
        weekTotal += element.seconds;
      }
      if (element.date.substring(4, 6) === thisMonth) {
        monthTotal += element.seconds;
      }
      // add total
      total += element.seconds;
    });
    setTotal(total);
    setTodayTotal(todayTotal);
    setWeekTotal(weekTotal);
    setMonthTotal(monthTotal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>총 독서시간: </Text>
      <Text>{formatMsecsStringByLocale(total)}</Text>
      <Text style={styles.text}>오늘 : </Text>


































      
      <Text>{formatMsecsStringByLocale(todayTotal)}</Text>
      <Text style={styles.text}>이번주 : </Text>
      <Text>{formatMsecsStringByLocale(weekTotal)}</Text>
      <Text style={styles.text}>{month}달 : </Text>
      <Text>{formatMsecsStringByLocale(monthTotal)}</Text>
    </View>
  );
}

export default Page;
