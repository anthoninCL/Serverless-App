import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Overlay} from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import {ViewCol, ViewRow} from "../layouts/FlexLayout/FlexViews";
import {ClickableIcon} from "../common/ClickableIcon/ClickableIcon";
import {FormInput} from "../common/FormInput/FormInput";
import {ClassicButton} from "../common/ClassicButton/ClassicButton";
import {Channel} from "../../types/Channel";

type Props = {
  isVisible: boolean;
  onBackDropPress: () => void;
  currentChannel: Channel;
};

export const ManageChannelModal = (props: Props) => {
  const {theme} = useTheme();
  const [name, setName] = useState(props.currentChannel.name);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    setButtonEnabled(name.length > 0 && name != props.currentChannel.name);
  }, [name]);

  return (
    <Overlay isVisible={props.isVisible} onBackdropPress={props.onBackDropPress} overlayStyle={{borderRadius: 10, maxWidth: 800}}>
      <ViewCol style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <ViewRow align={'center'} justify={'space-between'} style={{width: '100%'}}>
          <Text style={{fontWeight: '900', fontSize: theme.fontSizes.huge}}>Manage {props.currentChannel.name}</Text>
          <ClickableIcon type={"IonIcons"} name={"close"} onPress={props.onBackDropPress} colorName={"lightHigh"} sizeName={'huge'}/>
        </ViewRow>
        <Text style={{marginTop: 20, marginBottom: 30, color: theme.colors.lightHigh, fontSize: 18, paddingRight: 20}}>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</Text>
        <FormInput value={name} onChange={setName} backgroundColor={'white'} placeholderKey={"common.workspaceName"} style={{marginBottom: 20}}/>
        <ViewRow justify={'space-between'} align={'center'} style={{marginTop: 20}}>
          <ClassicButton onPress={() => {
          }} labelKey={"common.delete"} type={'danger'} />
          <ClassicButton onPress={() => {
          }} labelKey={"common.update"} type={'classic'} enabled={buttonEnabled} />
        </ViewRow>
      </ViewCol>
    </Overlay>
  );
};
