import React, { FC, useState } from "react";
import { TextInput, Keyboard } from "react-native";
import { Timestamp } from "@google-cloud/firestore";
import { RootState } from "../../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { FieldValue } from "../../firebase/firebase";
import { accountFireStore } from "../../firebase/accountFireStore";
import { commentFireStore } from "../../firebase/commentFireStore";
import { notificationFireStore } from "../../firebase/notificationFireStore";
import { setIsInputForm } from "../../actions/postedData";
import { setShouldDisplayBottomNav } from "../../actions/bottomNav";
import { sendPushCommentNotification } from "../../utilities/sendPushNotification";
import KeyboardInputView from "../../components/molecules/KeyboardInputView";

type Props = {
  textInputRef: React.MutableRefObject<TextInput | null>;
  photo_id: string;
  uid: string;
  url: string;
  setCommentDataList: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData[]>
  >;
};

const KeyboardInputViewContainer: FC<Props> = ({ ...props }) => {
  const { textInputRef, photo_id, uid, url, setCommentDataList } = props;

  const selectopponentUid = (state: RootState) => state.userReducer.uid;
  const selectOpponentUrl = (state: RootState) => state.userReducer.userImg;
  const selectOpponentName = (state: RootState) => state.userReducer.name;
  const selectIsInputForm = (state: RootState) =>
    state.postedDataReducer.isInputForm;

  const opponentUid = useSelector(selectopponentUid);
  const opponentUrl = useSelector(selectOpponentUrl);
  const opponentName = useSelector(selectOpponentName);
  const isInputForm = useSelector(selectIsInputForm);

  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  //コメントを送信
  const addComment = async (): Promise<void> => {
    if (!inputValue || inputValue.match(/\n/)) {
      return;
    } else {
      await commentFireStore
        .postedComment(
          photo_id,
          opponentUid,
          inputValue,
          opponentName,
          opponentUrl
        )
        .then(async () => {
          await commentFireStore.getCommentDataList(photo_id).then((res) => {
            setCommentDataList(res);
          });
        });

      const notificationItems = {
        uid,
        opponent_uid: opponentUid,
        opponent_url: opponentUrl,
        opponent_name: opponentName,
        photo_url: url,
        content: "コメント",
        create_time: FieldValue.serverTimestamp() as Timestamp,
      };

      if (uid !== opponentUid) {
        await notificationFireStore.notificationOpponentFavorite(
          notificationItems
        );
        await accountFireStore.getDeviceToken(uid).then(async (res) => {
          await sendPushCommentNotification(res, opponentName, inputValue);
        });
      }

      setInputValue("");
      dispatch(setIsInputForm(false));
      dispatch(setShouldDisplayBottomNav(true));
      Keyboard.dismiss();
    }
  };

  //キーボードが消えたとき
  const onBlur = (): void => {
    if (isInputForm) {
      dispatch(setIsInputForm(false));
      dispatch(setShouldDisplayBottomNav(true));
    }
  };

  return (
    <KeyboardInputView
      textInputRef={textInputRef}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isInputForm={isInputForm}
      addComment={addComment}
      onBlur={onBlur}
    />
  );
};

export default KeyboardInputViewContainer;
