import React, { FC, useState, useEffect } from "react";
import { Timestamp } from "@google-cloud/firestore";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/index";
import { FieldValue } from "../../firebase/firebase";
import { accountFireStore } from "../../firebase/accountFireStore";
import { commentFireStore } from "../../firebase/commentFireStore";
import { photoFireStore } from "../../firebase/photoFireStore";
import { notificationFireStore } from "../../firebase/notificationFireStore";
import { useDisplayTime } from "../../utilities/hooks/date";
import { setAspectRatioIntoState } from "../../utilities/imageAspect";
import { upDateFavoriteList } from "../../actions/user";
import { sendPushFavoriteNotification } from "../../utilities/sendPushNotification";
import PostedPageItems from "../../components/molecules/PostedPageItems";

type Props = {
  navigation: any;
  photo_id: string;
  uid: string;
  create_time: Timestamp;
  url: string;
  latitude: number;
  longitude: number;
};

const PostedPageItemsContainer: FC<Props> = ({ ...props }) => {
  const {
    navigation,
    photo_id,
    uid,
    create_time,
    url,
    latitude,
    longitude,
  } = props;

  const selectFavoriteList = (state: RootState) =>
    state.userReducer.favoriteList;
  const selectOpponentUid = (state: RootState) => state.userReducer.uid;
  const selectOpponentUrl = (state: RootState) => state.userReducer.userImg;
  const selectOpponentName = (state: RootState) => state.userReducer.name;

  const favoriteList = useSelector(selectFavoriteList);
  const opponentUid = useSelector(selectOpponentUid);
  const opponentUrl = useSelector(selectOpponentUrl);
  const opponentName = useSelector(selectOpponentName);

  const [commentCount, setCommentCount] = useState<number>(0);
  const [favoriteNumber, setFavoriteNumber] = useState<number>(0);
  const [isFavoriteStatus, setIsFavoriteStatus] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(0);

  const dispach = useDispatch();
  const date = useDisplayTime(create_time.toMillis());

  // お気に入り数取得
  useEffect(() => {
    photoFireStore.getFavoriteNumber(photo_id).then((res) => {
      setFavoriteNumber(res);
    });
  }, [favoriteList]);

  // コメント数取得、画像サイズ取得
  useEffect(() => {
    commentFireStore.getCommentDataList(photo_id).then((res) => {
      setCommentCount(res.length);
    });
    setAspectRatioIntoState(url, setAspectRatio);
  }, []);

  // お気に入りチェック
  useEffect(() => {
    favoriteList.indexOf(photo_id) !== -1
      ? setIsFavoriteStatus(true)
      : setIsFavoriteStatus(false);
  });

  // お気に入り押下時
  const pressedFavorite = async () => {
    if (!isFavoriteStatus) {
      setIsFavoriteStatus(true);

      await accountFireStore.updateFavoriteList(photo_id);
      await photoFireStore.incrementFavoriteNumber(photo_id, favoriteNumber);
      await photoFireStore.getFavoriteNumber(photo_id).then((res) => {
        setFavoriteNumber(res);
      });

      const newFavoriteList = favoriteList.slice();
      newFavoriteList.push(photo_id);
      dispach(upDateFavoriteList(newFavoriteList));

      const notificationItems = {
        uid,
        opponent_uid: opponentUid,
        opponent_url: opponentUrl,
        opponent_name: opponentName,
        photo_url: url,
        content: "いいね",
        create_time: FieldValue.serverTimestamp() as Timestamp,
      };

      const notificationAlreadyExistsDecision = await notificationFireStore.notificationAlreadyExistsDecision(
        uid,
        url,
        opponentName
      );

      if (uid !== opponentUid && !notificationAlreadyExistsDecision) {
        await notificationFireStore.notificationOpponentFavorite(
          notificationItems
        );
        await accountFireStore.getDeviceToken(uid).then(async (res) => {
          await sendPushFavoriteNotification(res, opponentName);
        });
      }
    } else {
      await accountFireStore.deleteFavoriteItem(photo_id);
      await photoFireStore.decrementFavoriteNumber(photo_id, favoriteNumber);
      await photoFireStore.getFavoriteNumber(photo_id).then((res) => {
        setFavoriteNumber(res);
      });

      const newFavoriteList = favoriteList.slice();
      newFavoriteList.splice(newFavoriteList.indexOf(photo_id), 1);
      dispach(upDateFavoriteList(newFavoriteList));

      setIsFavoriteStatus(false);
    }
  };

  return (
    <PostedPageItems
      navigation={navigation}
      photo_id={photo_id}
      uid={uid}
      create_time={create_time}
      url={url}
      favoriteNumber={favoriteNumber}
      latitude={latitude}
      longitude={longitude}
      commentCount={commentCount}
      date={date}
      isFavoriteStatus={isFavoriteStatus}
      pressedFavorite={pressedFavorite}
      aspectRatio={aspectRatio}
    />
  );
};

export default PostedPageItemsContainer;
