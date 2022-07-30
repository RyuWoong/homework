import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import CustomCalendar from '../../../Components/Calendar';
import WeekCalendar from '../../../Components/WeekCalendar';
import {BottomTabScreenList} from '../../../Navigation/BottomNavigation';
import GlobalStyles from '../../../Styles/GlobalStyles';
import {
  ColorBlack,
  ColorBlue,
  ColorRed,
  ColorWhite,
} from '../../../Styles/pallete';

type CalendarPageProps = BottomTabScreenProps<BottomTabScreenList>;

interface Props {
  navigation: CalendarPageProps['navigation'];
  route: CalendarPageProps['route'];
}

function CalendarPage() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={GlobalStyles.Container}>
        <WeekCalendar />
        <CustomCalendar />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default CalendarPage;
