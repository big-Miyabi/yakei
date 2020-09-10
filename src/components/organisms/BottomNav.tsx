import React, { FC } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { baseColor } from "../../styles/thema/colors";
import CameraAlbumWrap from "../../containers/molecules/CameraAlbumWrap";
import FooterBackgroundSvg from "../atoms/svg/FooterBackgroundSvg";
import BottomNavTouchableOpacity from "../../containers/molecules/BottomNavTouchableOpacity";
import WhiteWrap from "../../containers/atoms/WhiteWrap";

type Props = {
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
  shouldDisplay: boolean;
  shouldAppearBtns: boolean;
  opacityAnim: Object;
  whiteWrapAnim: Animated.Value;
  safeAreaHeihgt: number;
  onLayoutBtmNvBg: (height: number) => void;
  onLayoutSafeAreaHeight: (height: number) => void;
  onPressOut: () => void;
};

const BottomNav: FC<Props> = ({ ...props }) => {
  const {
    state,
    descriptors,
    navigation,
    shouldDisplay,
    shouldAppearBtns,
    opacityAnim,
    whiteWrapAnim,
    safeAreaHeihgt,
    onLayoutBtmNvBg,
    onLayoutSafeAreaHeight,
    onPressOut,
  } = props;
  const postScreenIndex = 4;

  return (
    <>
      <View
        style={[styles.container, shouldDisplay ? {} : { display: "none" }]}
      >
        {shouldAppearBtns ? (
          <WhiteWrap
            onPressOut={onPressOut}
            whiteWrapAnim={whiteWrapAnim}
            styles={[styles.whiteWrap, opacityAnim]}
          />
        ) : (
          <></>
        )}
        <View
          style={styles.footerBackgroundWrap}
          onLayout={(e) => onLayoutBtmNvBg(e.nativeEvent.layout.height)}
        >
          <FooterBackgroundSvg
            style={styles.footerBackground}
            backColor={baseColor.darkNavy}
          />
        </View>
        <View style={styles.cameraAndAlbumWrap}>
          <CameraAlbumWrap
            state={state}
            routes={state.routes}
            navigation={navigation}
          />
        </View>
        <View style={styles.footerItemsWrap}>
          {state.routes.map((route, index) => {
            if (index > postScreenIndex) return;
            return (
              <BottomNavTouchableOpacity
                key={index}
                state={state}
                route={route}
                descriptors={descriptors}
                navigation={navigation}
                index={index}
              />
            );
          })}
        </View>
      </View>
      <SafeAreaView
        style={[
          { backgroundColor: baseColor.darkNavy },
          safeAreaHeihgt === 0 ? {} : { marginBottom: -21 },
        ]}
        onLayout={(e) => onLayoutSafeAreaHeight(e.nativeEvent.layout.height)}
      />
    </>
  );
};

const iPhone11Width = 414;
const displayWidth = Dimensions.get("window").width;
const displayHeight = Dimensions.get("window").height;
const itemsFloatingRatio = 0.00966;
const viewboxRatio = 4.4588; // viewbox.width / viewbox.height
const footerBgBtmRatio = -19 / iPhone11Width;
const footerBgBtm = displayWidth * footerBgBtmRatio;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 0,
  },
  whiteWrap: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: displayHeight,
  },
  footerBackgroundWrap: {
    position: "absolute",
    bottom: footerBgBtm,
    left: -2.75,
    width: displayWidth + 10,
    aspectRatio: viewboxRatio, // これがないと画面サイズぴったりのボトムナビにならない
  },
  footerBackground: {
    position: "absolute",
    shadowColor: "#aaaaaa",
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
  },
  cameraAndAlbumWrap: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    bottom: displayWidth * itemsFloatingRatio,
    width: displayWidth,
  },
  footerItemsWrap: {
    zIndex: 0,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: displayWidth * itemsFloatingRatio,
    width: displayWidth,
  },
});

export default BottomNav;
