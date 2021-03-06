import { Reducer } from "redux";
import { ActionTypes, UnionedAction } from "../actions/index";

type State = {
  uid: string;
  name: string;
  userImg: string;
  userHeaderImg: string;
  imgIndex: string;
  headerImgIndex: string;
  selfIntroduction: string;
  favoriteList: string[];
};

type UserReducer = Reducer<State, UnionedAction>;

const initialState: State = {
  uid: "",
  name: "",
  userImg: "",
  userHeaderImg: "",
  imgIndex: "",
  headerImgIndex: "",
  selfIntroduction: "",
  favoriteList: [],
};

export const userReducer: UserReducer = (
  state = initialState,
  action: UnionedAction
): State => {
  switch (action.type) {
    case ActionTypes.USER_DATA:
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        userImg: action.payload.userImg,
        userHeaderImg: action.payload.userHeaderImg,
        imgIndex: action.payload.imgIndex,
        headerImgIndex: action.payload.headerImgIndex,
        selfIntroduction: action.payload.selfIntroduction,
        favoriteList: action.payload.favoriteList,
      };
    case ActionTypes.UPDATE_USER_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case ActionTypes.UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        userImg: action.payload.userImg,
      };
    case ActionTypes.UPDATE_PROFILE_HEADER_IMAGE:
      return {
        ...state,
        userHeaderImg: action.payload.userHeaderImg,
      };
    case ActionTypes.UPDATE_IMG_INDEX:
      return {
        ...state,
        imgIndex: action.payload.imgIndex,
      };
    case ActionTypes.UPDATE_HEADER_IMG_INDEX:
      return {
        ...state,
        headerImgIndex: action.payload.headerImgIndex,
      };
    case ActionTypes.UPDATE_SELF_INTRODUCTION:
      return {
        ...state,
        selfIntroduction: action.payload.selfIntroduction,
      };
    case ActionTypes.UPDATE_FAVORITE_LIST:
      return {
        ...state,
        favoriteList: action.payload.favoriteList,
      };
    default: {
      return state;
    }
  }
};
