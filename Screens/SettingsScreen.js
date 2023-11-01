import { Text, StyleSheet, View } from "react-native";
import Colors from "../Colors";

const SettingsScreen = () => {
    return (
        <View style={styles.centered}>
            <Text style={styles.text}>Settings</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100,
        backgroundColor: Colors.white,
    },
    text: {
        fontSize: 42,
        color: Colors.black,
    },
});

export default SettingsScreen;
