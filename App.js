import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./Components/TabNavigator";
import { Text, LogBox } from "react-native";
import { useState } from "react";

const App = () => {
    LogBox.ignoreAllLogs();

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <NavigationContainer theme={DefaultTheme}>
            <TabNavigator />
        </NavigationContainer>
        // <Text>Hello</Text>
    );
};

export default App;
