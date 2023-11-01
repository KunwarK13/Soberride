import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import LogsScreen from "../Screens/LogsScreen";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef, useState } from "react";
import Colors from "../Colors";

const CONSTANTS = {
    tab_icon_size: 35,
    animation_duration: 200,
    tab_nav_color: Colors.soberrideMain,
};

const Tab = createBottomTabNavigator();

const tabArr = [
    {
        name: "Home",
        label: "Home",
        component: HomeScreen,
        focusedIcon: "home",
        unfocusedIcon: "home-outline",
    },
    {
        name: "Logs",
        label: "Logs",
        component: LogsScreen,
        focusedIcon: "view-list",
        unfocusedIcon: "format-list-bulleted",
    },
    {
        name: "Settings",
        label: "Settings",
        component: SettingsScreen,
        focusedIcon: "cog",
        unfocusedIcon: "cog-outline",
    },
];

const startingLogs = [
    {
        time: {
            hours: 17,
            minutes: 5,
        },
        duration: {
            hours: 0,
            minutes: 2,
            seconds: 0,
        },
    },
    {
        time: {
            hours: 8,
            minutes: 34,
        },
        duration: {
            hours: 0,
            minutes: 5,
            seconds: 0,
        },
    },
];

const animate1 = {
    0: { scale: 0.5, translateY: 7 },
    0.92: { translateY: -34 },
    1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
    0: { scale: 1.2, translateY: -24 },
    1: { scale: 1, translateY: 7 },
};

const circle1 = {
    0: { scale: 0 },
    // 0.3: { scale: 0.9 },
    // 0.5: { scale: 0.2 },
    // 0.8: { scale: 0.7 },
    1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const CustomButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
        >
            <Animatable.View
                ref={viewRef}
                duration={CONSTANTS.animation_duration}
                style={styles.container}
            >
                <View style={styles.btn}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle}
                        duration={CONSTANTS.animation_duration}
                    />
                    <MaterialCommunityIcons
                        name={focused ? item.focusedIcon : item.focusedIcon}
                        color={focused ? Colors.soberrideMain : Colors.white}
                        size={CONSTANTS.tab_icon_size}
                    />
                </View>
                <Animatable.Text ref={textRef} style={styles.text}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    );
};

const TabNavigator = () => {
    const [logs, setLogs] = useState(startingLogs);

    const addLog = (t_h, t_m, d_h, d_m, d_s) => {
        const new_obj = {
            time: {
                hours: t_h,
                minutes: t_m,
            },
            duration: {
                hours: d_h,
                minutes: d_m,
                seconds: d_s,
            },
        };
        new_logs = [new_obj, ...logs];
        setLogs(new_logs);
    };

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                // component={HomeScreen}
                options={{
                    tabBarButton: (props) => (
                        <CustomButton {...props} item={tabArr[0]} />
                    ),
                }}
                // initialParams={{ logAdder: addLog }}
            >
                {(props) => <HomeScreen {...props} logAdder={addLog} />}
            </Tab.Screen>
            <Tab.Screen
                name="Logs"
                // component={LogsScreen}
                options={{
                    tabBarButton: (props) => (
                        <CustomButton {...props} item={tabArr[1]} />
                    ),
                }}
                // initialParams={{ logs: logs }}
            >
                {(props) => <LogsScreen {...props} logs={logs} />}
            </Tab.Screen>
            {/* {tabArr.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.name}
                    component={item.component}
                    options={{
                        tabBarButton: (props) => (
                            <CustomButton {...props} item={item} />
                        ),
                    }}
                />
            ))} */}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        position: "absolute",
        bottom: 16,
        right: 16,
        left: 16,
        borderRadius: 16,
        backgroundColor: CONSTANTS.tab_nav_color,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: CONSTANTS.tab_nav_color,
        backgroundColor: CONSTANTS.tab_nav_color,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
        borderRadius: 25,
    },
    text: {
        fontSize: 13,
        textAlign: "center",
        color: Colors.white,
        fontWeight: "bold",
    },
});

export default TabNavigator;
