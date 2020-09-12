import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportContent from "../components/molecules/ReportContent";
import ReportComplete from "../components/molecules/ReportComplete";
import Inappropriate from "../components/molecules/Inappropriate";

const ModalScreen: FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="reportContent"
        component={ReportContent}
        options={{
          cardStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="reportComplete"
        component={ReportComplete}
        options={{
          cardStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="inappropriate"
        component={Inappropriate}
        options={{
          cardStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ModalScreen;
