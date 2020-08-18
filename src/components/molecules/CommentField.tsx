import React, { FC } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "../../styles/postedImageDetail";

type Props = {
  postUserName: string;
  postUserImage: string;
  message: string;
  createTime: string;
};

const CommentField: FC<Props> = ({ ...props }) => {
  const { postUserName, postUserImage, message, createTime } = props;

  return (
    <View style={styles.commentBox}>
      <Image
        style={styles.userIcon}
        source={{
          uri: postUserImage,
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Text>{postUserName}</Text>
        <Text>{message}</Text>
        <Text>{createTime}</Text>
      </View>
    </View>
  );
};

export default CommentField;
