import React, { FC, useState } from "react";
import { ScrollView, View, Image, TextInput, Dimensions } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { styles } from "../../styles/post";
import { baseColor, utilityColor } from "../../styles/thema/colors";
import EiffelTowerSvg from "../atoms/svg/EiffelTowerSvg";

type Props = {
  uri: string;
  aspectRatio: number;
};

const Post: FC<Props> = ({ ...props }) => {
  const { uri, aspectRatio } = props;

  const width = Dimensions.get("window").width;
  const height = width * aspectRatio;
  const viewBoxRatio = 18 / 23;
  const svgAspectRatio = { aspectRatio: viewBoxRatio };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={{
            width: width,
            height: height,
          }}
          source={{ uri }}
        />
        <View style={styles.rowWrap}>
          <View style={[styles.svgWrap, svgAspectRatio]}>
            <EiffelTowerSvg color={baseColor.text} />
          </View>
          <TextInput
            style={styles.photgenicSubjectInput}
            placeholder={"被写体を入力（例 : 東京スカイツリー）"}
            autoCapitalize={"none"}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={true}
            editable={true}
            placeholderTextColor={utilityColor.placeholderText}
          />
        </View>
        <KeyboardSpacer />
      </View>
    </ScrollView>
  );
};

export default Post;
