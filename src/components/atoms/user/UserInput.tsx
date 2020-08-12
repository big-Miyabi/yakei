import React, { FC, Fragment } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { baseColor,utilityColor } from "../../../styles/thema/colors";
import { Size } from "../../../styles/thema/fonts";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const UserInput: FC<Props> = ({ ...props }) => {
  const { label, placeholder, value, setValue } = props;
  return (
    <Fragment>
      {/* インプットの説明 */}
      <Text style={styles.labelItem}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        keyboardType="twitter"
        returnKeyType="done"
        multiline={true}
        blurOnSubmit={true}
        editable={true}
        autoCapitalize="none"
        placeholderTextColor={utilityColor.placeholderText}
        onChangeText={(name) => setValue(name)}
        style={styles.editInput}
      />
    </Fragment>
  );
};


const styles = StyleSheet.create({
  //fontWeightを変数指定すると赤線が出る。影響はなし
  labelItem: {
    color: baseColor.text,
    fontSize: Size.Normal,
    fontWeight: "600",
    marginLeft: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: utilityColor.border,
    paddingLeft: 10,
  },
  editInput: {
    color: utilityColor.editBox,
    fontSize: Size.Large,
    fontWeight: "600",
    lineHeight: Size.lineHeight,
    paddingBottom: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderColor: utilityColor.border,
  },
});

export default UserInput;