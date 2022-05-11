import React from 'react';
import {Image, View, Text} from 'react-native';
import {ViewCol, ViewRow} from 'components/layouts/FlexLayout/FlexViews';

type Props = {
  children?: React.ReactNode;
};

export const AuthLayout = (props: Props) => {

  return (
    <ViewCol align={"center"} justify={"center"} style={{backgroundColor: "#000", padding: 20, flex: 1}}>
      <ViewRow align={"center"} justify={"center"} style={{backgroundColor: "#131313", flex: 1, borderRadius: 10}}>
        <Image source={require('assets/background_auth.png')} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          resizeMode: 'cover',
          borderRadius: 10
        }}/>
        <View style={{
          width: 40,
          height: 40,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: 20,
          left: 20,
          bottom: 0,
          right: 0,
          borderRadius: 10,
          backgroundColor: '#393939'
        }}>
          <Text>Logo</Text>
        </View>
        <ViewCol align={"center"} justify={"center"} style={{
          backgroundColor: "#242424",
          height: "100%",
          width: "60%",
          borderLeftColor: "#393939",
          borderLeftWidth: 2,
          borderRightColor: "#393939",
          borderRightWidth: 2
        }}>
          {props.children}
        </ViewCol>
      </ViewRow>
    </ViewCol>
  );
};
