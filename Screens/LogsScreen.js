import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../Colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const timeToString = (t_h, t_m) => {
    return `${t_h % 12}:${t_m >= 10 ? t_m : "0" + t_m} ${
        t_h >= 12 ? "PM" : "AM"
    }`;
};

const durationToString = (d_h, d_m, d_s) => {
    return `${d_h} ${d_h == 1 ? "hour" : "hours"}, ${d_m} ${
        d_m == 1 ? "minute" : "minutes"
    }, ${d_s} ${d_s == 1 ? "second" : "seconds"}`;
};

const LogsScreen = ({ logs }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Logs</Text>
            <ScrollView style={{ paddingTop: 30, width: windowWidth }}>
                {logs.map((item, index) => (
                    <View key={index} style={styles.logContainer}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Detected {"Drunk"}
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                            Time:{" "}
                            {timeToString(item.time.hours, item.time.minutes)}
                            {"\n"}
                            Duration:{" "}
                            {durationToString(
                                item.duration.hours,
                                item.duration.minutes,
                                item.duration.seconds
                            )}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.black,
        // borderBottomColor: Colors.black,
        // borderBottomWidth: 2,
        width: windowWidth * 0.8,
        marginBottom: 15,
    },
    logContainer: {
        paddingBottom: 15,
        paddingTop: 15,
        marginLeft: 30,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
});

export default LogsScreen;
