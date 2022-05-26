import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Overlay} from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import {ViewCol, ViewRow} from "../layouts/FlexLayout/FlexViews";
import {ClickableIcon} from "../common/ClickableIcon/ClickableIcon";
import {FormInput} from "../common/FormInput/FormInput";
import {ClassicButton} from "../common/ClassicButton/ClassicButton";
import {User} from "../../types/User";
import {Divider} from "../common/Divider/Divider";
import {Avatar} from "../common/Avatar/Avatar";

type Props = {
  isVisible: boolean;
  onBackDropPress: () => void;
  currentUser: User;
};

export const UpdateProfileModal = (props: Props) => {
  const {theme} = useTheme();
  const [name, setName] = useState(props.currentUser.name);
  const [firstName, setFirstName] = useState(props.currentUser.firstName);
  const [lastName, setLastName] = useState(props.currentUser.lastName);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    setButtonEnabled(name.length > 0 && firstName.length > 0 && lastName.length > 0 && (name != props.currentUser.name || firstName != props.currentUser.firstName || lastName != props.currentUser.lastName));
  }, [name, firstName, lastName]);

  const onCancel = () => {
    setName(props.currentUser.name);
    setFirstName(props.currentUser.firstName);
    setLastName(props.currentUser.lastName);
    props.onBackDropPress();
  };

  return (
    <Overlay isVisible={props.isVisible} onBackdropPress={props.onBackDropPress} overlayStyle={{borderRadius: 10, width: 800}}>
      <ViewCol style={{paddingVertical: 20}}>
        <ViewRow align={'center'} justify={'space-between'} style={{width: '100%', paddingHorizontal: 20}}>
          <Text style={{fontWeight: '900', fontSize: theme.fontSizes.huge}}>Edit your profile</Text>
          <ClickableIcon type={"IonIcons"} name={"close"} onPress={props.onBackDropPress} colorName={"lightHigh"} sizeName={'huge'}/>
        </ViewRow>
        <ViewRow style={{padding: 20}}>
          <ViewCol style={{paddingRight: 40, flex: 2}}>
            <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 10}}>Username</Text>
            <FormInput value={name} onChange={setName} backgroundColor={'white'} placeholderKey={"common.workspaceName"} style={{marginBottom: 40}}/>
            <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 10}}>First Name</Text>
            <FormInput value={firstName} onChange={setFirstName} backgroundColor={'white'} placeholderKey={"common.firstName"} style={{marginBottom: 40}}/>
            <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 10}}>Last Name</Text>
            <FormInput value={lastName} onChange={setLastName} backgroundColor={'white'} placeholderKey={"common.lastName"} style={{marginBottom: 40}}/>
          </ViewCol>
          <ViewCol style={{flex: 1}}>
            <Text>Profile Picture</Text>
            <Avatar isImageUploader sizeName={'avatar'} />
          </ViewCol>
        </ViewRow>
        <Divider color={'#B6B6B6'}/>
        <ViewRow justify={'flex-end'} align={'center'} style={{marginTop: 20, paddingRight: 20}}>
          <ClassicButton onPress={onCancel} labelKey={"actions.cancel"} type={'danger'} />
          <ClassicButton onPress={() => {
          }} labelKey={"common.update"} type={'classic'} enabled={buttonEnabled} style={{marginLeft: 20}} />
        </ViewRow>
      </ViewCol>
    </Overlay>
  );
};
