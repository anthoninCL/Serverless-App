import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {User} from "types/User";
import {ViewCol, ViewRow} from "../layouts/FlexLayout/FlexViews";
import {Avatar} from "../common/Avatar/Avatar";
import {Divider} from "../common/Divider/Divider";

type Props = {
  currentUser: User;
  isModalVisible: boolean;
  navigateToProfile: () => void;
  signOut: () => void;
  deleteAccount: () => void;
};

export const UserModal = (props: Props) => {
  return (props.isModalVisible &&
      <ViewCol style={{
        position: 'absolute',
        backgroundColor: '#FFF',
        right: 10, top: 50,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        borderRadius: 10,
        elevation: 3,
        minWidth: 300
      }}>
          <ViewRow align={"bottom"} style={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20}}>
              <Avatar sizeName={'sz50'} style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                borderRadius: 10,
                elevation: 3,
              }}/>
              <ViewCol style={{marginLeft: 10}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>{props.currentUser.name}</Text>
                  <Text>{props.currentUser.firstName} {props.currentUser.lastName}</Text>
              </ViewCol>
          </ViewRow>
          <Divider color={'#B6B6B6'}/>
          <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 20}} onPress={props.navigateToProfile}>
              <Text>Profile</Text>
          </TouchableOpacity>
          <Divider color={'#B6B6B6'}/>
          <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 20}} onPress={props.signOut}>
              <Text>Sign out</Text>
          </TouchableOpacity>
          <Divider color={'#B6B6B6'}/>
          <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 20}} onPress={props.deleteAccount}>
              <Text>Delete your account</Text>
          </TouchableOpacity>
      </ViewCol>
  );
};
