import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {BottomTabScreenList} from '../../../Navigation/BottomNavigation';
import GlobalStyles from '../../../Styles/GlobalStyles';

type LibarayPageProps = BottomTabScreenProps<BottomTabScreenList>;

interface Props {
  navigation: LibarayPageProps['navigation'];
  route: LibarayPageProps['route'];
}

function LibarayPage({navigation, route}: Props) {
  return (
    <SafeAreaView style={[GlobalStyles.Container, GlobalStyles.Center]}>
      <Text>Libaray</Text>
    </SafeAreaView>
  );
}

export default LibarayPage;
