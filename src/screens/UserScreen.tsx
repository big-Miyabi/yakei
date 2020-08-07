import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import User from "../containers/organisms/user/User";
import Setting from "../containers/organisms/user/Setting";
import EditProfile from "../containers/organisms/user/EditProfile";
import TermsOfService from "../componets/organisms/user/TermsOfService";
import PrivacyPolicy from "../componets/organisms/user/PrivacyPolicy";

const UserScreen: FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="設定"
        component={Setting}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#141D2C",
          },
        }}
      />
      <Stack.Screen
        name="プロフィール編集"
        component={EditProfile}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#141D2C",
          },
        }}
      />
      <Stack.Screen
        name="利用規約"
        component={TermsOfService}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="プライバシーポリシー"
        component={PrivacyPolicy}
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default UserScreen;
