import { Text, StyleSheet, View } from "react-native";
import Colors from "../Colors";
import Blob from "../Components/3dPerlinNoise/Blob";
import { Canvas } from "@react-three/fiber/native";
import LoaderKit from "react-native-loader-kit";
import {
    SafeAreaView,
    Dimensions,
    Pressable,
    Image,
    PermissionsAndroid,
    ActivityIndicator,
} from "react-native";
import {
    useState,
    Suspense,
    useEffect,
    useCallback,
    useRef,
    useLayoutEffect,
} from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const CustomButton = ({ onPressHandler, text }) => {
    return (
        <Pressable style={styles.button} onPress={onPressHandler}>
            <Text style={{ color: Colors.white, fontSize: 18 }}>{text}</Text>
        </Pressable>
    );
};

const NotConnected = ({ bluetoothSimulate }) => {
    const [loading, setLoading] = useState(false);

    const connectPressHandler = () => {
        setLoading(true);
        bluetoothSimulate();
    };

    if (!loading) {
        return (
            <CustomButton onPressHandler={connectPressHandler} text="Connect" />
        );
    } else
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.soberrideMain} />
            </View>
        );
};

const Connected = ({ connectHandler }) => {
    const [showMessage, setShowMessage] = useState(true);
    const [loading, setLoading] = useState(false);

    setTimeout(() => setShowMessage(false), 1500);

    const disconnectPressHandler = () => {
        setLoading(true);
        setTimeout(() => connectHandler(false), 1000);
    };

    if (showMessage) {
        return (
            <View style={styles.connectMessage}>
                <Text style={{ color: Colors.white, fontSize: 18 }}>
                    Connected!
                </Text>
            </View>
        );
    } else {
        if (!loading) {
            return (
                <CustomButton
                    onPressHandler={disconnectPressHandler}
                    text="Disconnect"
                />
            );
        } else {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator
                        size="large"
                        color={Colors.soberrideMain}
                    />
                </View>
            );
        }
    }
};

const HomeScreen = ({ logAdder }) => {
    const [sober, setSober] = useState(true);
    const [renderBlob, setRenderBlob] = useState(false);
    const [connected, setConnected] = useState(false);

    const bluetoothSimulate = () => {
        setTimeout(() => {
            setConnected(true);
            setTimeout(() => {
                setSober(false);
                setTimeout(() => {
                    setSober(true);
                    const currDate = new Date();
                    logAdder(
                        currDate.getHours(),
                        currDate.getMinutes(),
                        0,
                        0,
                        5
                    );
                }, 5000);
            }, 5000);
        }, 1000);
    };

    useFocusEffect(
        useCallback(() => {
            setRenderBlob(false);
            setTimeout(() => setRenderBlob(true), 300);
        }, [])
    );

    return (
        <View style={styles.container}>
            <Canvas
                // frameloop="demand"
                camera={{ position: [0.0, 0.0, 8.0] }}
                style={styles.canvas}
            >
                <Blob sober={sober} toRender={renderBlob} />
            </Canvas>
            <Image
                style={styles.logo}
                source={require("../Imgs/SoberrideNoBG.png")}
            />
            <Text
                style={[
                    styles.mainText,
                    { color: renderBlob ? Colors.white : Colors.black },
                ]}
            >
                {sober ? "Sober" : "Drunk"}
            </Text>
            {!connected ? (
                <NotConnected bluetoothSimulate={bluetoothSimulate} />
            ) : (
                <Connected connectHandler={setConnected} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: (windowWidth * 2.0) / 3.0,
        resizeMode: "contain",
        position: "absolute",
        top: 50,
        // backgroundColor: Colors.white,
    },
    mainText: {
        fontSize: 42,
        fontWeight: "bold",
    },
    container: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight,
        width: windowWidth,
        overflow: "hidden",
    },
    canvas: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        height: windowHeight,
        width: windowWidth,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: Colors.soberrideMain,
        position: "absolute",
        bottom: 75,
    },
    loader: {
        position: "absolute",
        bottom: 75,
    },
    bar: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: Colors.green,
        position: "absolute",
        bottom: 90,
    },
    connectMessage: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: windowWidth / 1.5,
        borderRadius: 4,
        backgroundColor: Colors.connectMessageBlue,
        position: "absolute",
        bottom: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
