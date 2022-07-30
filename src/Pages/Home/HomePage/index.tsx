import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {SectionList} from 'react-native';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {BottomTabScreenList} from '../../../Navigation/BottomNavigation';
import GlobalStyles from '../../../Styles/GlobalStyles';
import {
  ColorBlack,
  ColorBlue,
  ColorRed,
  ColorWhite,
} from '../../../Styles/pallete';

type HomePageProps = BottomTabScreenProps<BottomTabScreenList>;

interface Props {
  navigation: HomePageProps['navigation'];
  route: HomePageProps['route'];
}

function HomePage({navigation, route}: Props) {
  return (
    <SafeAreaView style={[GlobalStyles.Container, GlobalStyles.Center]}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

export default HomePage;
