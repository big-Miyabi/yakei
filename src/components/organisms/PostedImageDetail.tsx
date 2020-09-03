import React, { FC, MutableRefObject } from "react";
import { ScrollView, View, ActivityIndicator, TextInput } from "react-native";
import { Image } from "react-native-elements";
import { Timestamp } from "@google-cloud/firestore";
import { styles } from "../../styles/postedImageDetail";
import InformationUserPosted from "../../containers/molecules/InformationUserPosted";
import DetailPostedPageItems from "../../containers/molecules/DetailPostedPageItems";
import KeyboardInputView from "../../containers/molecules/KeyboardInputView";
import CommentInputField from "../../containers/molecules/CommentInputField";
import CommentField from "../../containers/molecules/CommentField";

type Props = {
  photo_id: string;
  uid: string;
  create_time: Timestamp;
  url: string;
  latitude: number;
  longitude: number;
  photogenic_subjec: string;
  commentDataList: firebase.firestore.DocumentData[];
  textInputRef: MutableRefObject<TextInput | null>;
  focusOnInput: () => void;
};

const PostedImageDetail: FC<Props> = ({ ...props }) => {
  const {
    photo_id,
    uid,
    create_time,
    url,
    latitude,
    longitude,
    photogenic_subjec,
    commentDataList,
    textInputRef,
    focusOnInput,
  } = props;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.allWrap}>
        <View>
          <InformationUserPosted
            uid={uid}
            photogenic_subjec={photogenic_subjec}
          />
          <Image
            style={styles.image}
            source={{
              uri: url,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <DetailPostedPageItems
            photo_id={photo_id}
            latitude={latitude}
            longitude={longitude}
            create_time={create_time}
          />
        </View>
        <CommentInputField focusOnInput={focusOnInput} />
        {commentDataList !== undefined &&
          commentDataList.map((item, index) => (
            <View key={index}>
              <CommentField
                uid={item.uid}
                message={item.message}
                create_time={item.create_time}
              />
            </View>
          ))}
      </ScrollView>
      <KeyboardInputView textInputRef={textInputRef} photo_id={photo_id} />
    </View>
  );
};

export default PostedImageDetail;
