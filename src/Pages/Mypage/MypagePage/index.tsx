import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {BottomTabScreenList} from '../../../Navigation/BottomNavigation';
import GlobalStyles from '../../../Styles/GlobalStyles';

type MypagePageProps = BottomTabScreenProps<BottomTabScreenList>;

interface Props {
  navigation: MypagePageProps['navigation'];
  route: MypagePageProps['route'];
}

function MypagePage({navigation, route}: Props) {
  return (
    <SafeAreaView style={[GlobalStyles.Container, GlobalStyles.Center]}>
      <Text>Mypage</Text>
    </SafeAreaView>
  );
}

export default MypagePage;
