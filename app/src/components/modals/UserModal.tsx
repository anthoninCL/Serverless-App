import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {User} from "types/User";
import {ViewCol, ViewRow} from "../layouts/FlexLayout/FlexViews";
import {Avatar} from "../common/Avatar/Avatar";
import {Divider} from "../common/Divider/Divider";
import useUser from "../../hooks/useUser";
import {getStoredData, getStoredObjectData} from "../../utils/fnAsyncStorage";

type Props = {
  currentUser?: User;
  isModalVisible: boolean;
  navigateToProfile: () => void;
  signOut: () => void;
  deleteAccount: () => void;
};

export const UserModal = (props: Props) => {
  const {fetchUser} = useUser();
  const [user, setUser] = useState<User | null>(props.currentUser || null);

  useEffect(() => {
    const getUser = async () => {
      const uid = await getStoredData('uid');
      const res = await fetchUser(uid);
      setUser(res);
    }

    if (!props.currentUser || props.isModalVisible) {
      getUser().catch(console.error);
    }
  }, [props.currentUser, props.isModalVisible]);

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
        {user ?
          <>
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
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{user.name}</Text>
                <Text>{user.firstName} {user.lastName}</Text>
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
          </> : <ActivityIndicator/>
        }
      </ViewCol>
  );
};
