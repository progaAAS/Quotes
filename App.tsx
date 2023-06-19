import {NavigationContainer} from "@react-navigation/native";
import Quotes from "./components/screens/home/Quotes";
import About from "./components/screens/about/About";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
      <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="О приложении" component={About} />
                <Tab.Screen name="Котировки" component={Quotes} />
            </Tab.Navigator>
      </NavigationContainer>
  );
}
