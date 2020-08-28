import React, { FC, useRef } from "react";
import { View, Animated } from "react-native";
import CameraAlbumWrap from "../../components/molecules/CameraAlbumWrap";
import { RootState } from "../../reducers/index";
import { useSelector } from "react-redux";

const generateBottomInterpolate = (anim) =>
  anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

const generateHorizonInterpolate = (anim) =>
  anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "-30%"],
  });

const animateStart = (anim, toValue) => {
  Animated.timing(anim, {
    toValue: toValue,
    duration: 200,
    useNativeDriver: false,
  }).start();
};

const CameraAlbumWrapContainer: FC = () => {
  const viewRef = useRef<null | View>(null);
  const shouldAppear = useSelector(
    (state: RootState) => state.cameraAndAlbumReducer.shouldAppear
  );
  const moveUpperLeftAnim = useRef(new Animated.Value(0)).current;
  const moveUpperRightAnim = useRef(new Animated.Value(0)).current;

  if (shouldAppear) {
    animateStart(moveUpperLeftAnim, 1);
    animateStart(moveUpperRightAnim, 1);
    viewRef.current?.focus();
  } else {
    animateStart(moveUpperLeftAnim, 0);
    animateStart(moveUpperRightAnim, 0);
  }

  const horizonInterpolate = generateHorizonInterpolate(moveUpperRightAnim);
  const bottomInterpolate = generateBottomInterpolate(moveUpperLeftAnim);

  const animStyle = {
    UpperLeft: {
      bottom: bottomInterpolate,
      left: horizonInterpolate,
    },
    UpperRight: {
      bottom: bottomInterpolate,
      right: horizonInterpolate,
    },
  };

  return <CameraAlbumWrap animStyle={animStyle} viewRef={viewRef} />;
};

export default CameraAlbumWrapContainer;
