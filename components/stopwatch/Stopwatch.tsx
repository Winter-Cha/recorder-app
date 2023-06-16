import React, { useState, useEffect } from "react";
import { getItem, setItem } from "../../utils/asyncStorage";
import { Time, Laps, Container, Actions } from "./index";
import moment from "moment";
import { Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "../Themed";

let interval: any = null;

// create big and circle stylish Button by StyleSheet
const styles = StyleSheet.create({
  // add container fixed items
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // button text style
  button_text_start: {
    fontSize: 30,
    // set text color to bright green by hash code
    color: "#37ff00",
    fontWeight: "bold",
  },
  button_text_stop: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff1493",
  },
  // add button_start animation
  button_start_animation: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // set background color to lightgreen by hash code
    backgroundColor: "#37ff0030",
    borderColor: "#37ff0050",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.1 }],
  },
  // add button_stop animation
  button_stop_animation: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // set background color to Pink by hash code
    backgroundColor: "#ff000030",
    borderColor: "#ff000050",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.1 }],
  },
  // add button_lap animation
  button_lap_animation_on: {
    width: 100,
    height: 50,
    borderRadius: 15,
    // set background color to lightblue by hash code
    backgroundColor: "#00bfff30",
    borderColor: "#00bfff50",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.1 }],
  },
  button_lap_animation_off: {
    width: 0,
    height: 50,
  },

  // add button_lap_text animation
  button_text_lap: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00bfff",
  },
});

export const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      clearInterval(interval);
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isRunning]);

  const onNewLap = () => {
    setData();
    setLaps([...laps, seconds]);
    setSeconds(0);
    setIsRunning(false);
  };

  const onReset = () => {
    setData();
    setSeconds(0);
    setIsRunning(false);
  };

  const setData = async () => {
    let data = await getItem("recoding-json");
    let datajson = data ? JSON.parse(data) : [];
    datajson.push({
      seconds: seconds,
      date: moment().format("YYYYMMDD"),
      time: moment().format("HH:mm:ss"),
    });
    console.log("recoding-json", datajson);
    await setItem("recoding-json", JSON.stringify(datajson));
  };

  const getData = async () => {
    const data = await getItem("recoding-json");
    console.log(data);
  };

  const initData = async () => {
    const mooks = [
      { seconds: 13100, date: "20230101", time: "10:00:00" },
      { seconds: 123100, date: "20230101", time: "10:00:00" },
      { seconds: 14400, date: "20230101", time: "10:00:00" },
      { seconds: 150, date: "20230101", time: "10:00:00" },
      { seconds: 15400, date: "20230201", time: "10:00:00" },
      { seconds: 14500, date: "20230201", time: "10:00:00" },
      { seconds: 1340, date: "20230201", time: "10:00:00" },
      { seconds: 103450, date: "20230201", time: "10:00:00" },
      { seconds: 50, date: "20230301", time: "10:00:00" },
      { seconds: 134500, date: "20230301", time: "10:00:00" },
      { seconds: 134500, date: "20230301", time: "10:00:00" },
      { seconds: 1400, date: "20230301", time: "10:00:00" },
      { seconds: 1500, date: "20230401", time: "10:00:00" },
      { seconds: 1060, date: "20230401", time: "10:00:00" },
      { seconds: 1070, date: "20230501", time: "10:00:00" },
      { seconds: 15050, date: "20230506", time: "10:00:00" },
      { seconds: 1700, date: "20230511", time: "10:00:00" },
      { seconds: 1800, date: "20230515", time: "10:00:00" },
      { seconds: 1900, date: "20230516", time: "10:00:00" },
      { seconds: 1600, date: "20230526", time: "10:00:00" },
      { seconds: 1600, date: "20230528", time: "10:00:00" },
      { seconds: 10450, date: "20230530", time: "10:00:00" },
      { seconds: 1300, date: "20230531", time: "10:00:00" },
    ];
    await setItem("recoding-json", JSON.stringify(mooks));
  };

  return (
    <Container>
      <Actions>
        <View style={styles.container}>
          <TouchableOpacity
            style={
              isRunning
                ? styles.button_stop_animation
                : styles.button_start_animation
            }
            onPress={() => setIsRunning(!isRunning)}
          >
            <Text
              style={
                isRunning ? styles.button_text_stop : styles.button_text_start
              }
            >
              {isRunning ? "Pause" : seconds > 0 ? "Restart" : "Start"}
            </Text>
          </TouchableOpacity>

          {/* <Button
          backgroundColor={'lightblue'}
          color={'black'}
          text={'New lap'}
          onClick={onNewLap}
        /> */}
          <Button
            color={"black"}
            title={"Record"}
            disabled={seconds === 0}
            onPress={onNewLap}
          />

          <Button color={"black"} title={"초기화"} onPress={initData} />
          <Time seconds={seconds} size={"large"} />
          <TouchableOpacity
            style={
              !isRunning && seconds > 0
                ? styles.button_lap_animation_on
                : styles.button_lap_animation_off
            }
            onPress={onReset}
          >
            <Text style={styles.button_text_lap}>Complete</Text>
          </TouchableOpacity>
        </View>
      </Actions>
      <Laps laps={laps} />
    </Container>
  );
};
