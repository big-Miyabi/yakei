import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

import ActiveMapButtonSvg from "../atoms/svg/ActiveMapButtonSvg";
import CollectionButtonSvg from "../atoms/svg/CollectionButtonSvg";
import PlusButtonSvg from "../atoms/svg/PlusButtonSvg";
import NotificationButtonSvg from "../atoms/svg/NotificationButtonSvg";
import RoundedUserImage from "../atoms/RoundedUserImage";
import NormalMapButtonSvg from "../atoms/svg/NormalMapButtonSvg";

type Props = {
  index: number;
  isFocused: boolean;
  label: string;
  style?: Object;
  changeStyle: () => void;
};

const BottomNavItem: FC<Props> = (props) => {
  const { index, isFocused, label, style, changeStyle } = props;
  const color = isFocused ? "#FC2E7E" : "#606578";

  const styles = StyleSheet.create({
    label: {
      color: isFocused ? "#FC2E7E" : "#fff",
      fontSize: 10,
      marginTop: 5,
    },
  });

  switch (index) {
    case 0:
      return (
        <>
          {isFocused ? <ActiveMapButtonSvg /> : <NormalMapButtonSvg />}
          <Text style={styles.label}>{label}</Text>
        </>
      );
    case 1:
      return (
        <>
          <CollectionButtonSvg color={color} />
          <Text style={styles.label}>{label}</Text>
        </>
      );
    case 2:
      return <PlusButtonSvg style={style} changeStyle={changeStyle} />;
    case 3:
      return (
        <>
          <NotificationButtonSvg color={color} />
          <Text style={styles.label}>{label}</Text>
        </>
      );
    default:
      return (
        <>
          <RoundedUserImage color={color} />
          <Text style={styles.label}>{label}</Text>
        </>
      );
  }
};

export default BottomNavItem;
