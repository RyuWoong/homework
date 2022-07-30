import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import CalendarPage from '../Pages/Calendar/CalendarPage';
import HomePage from '../Pages/Home/HomePage';
import LibarayPage from '../Pages/Library/LibarayPage';
import MypagePage from '../Pages/Mypage/MypagePage';
import {ColorBlack} from '../Styles/pallete';

export type BottomTabScreenList = {
  HOME: undefined;
  CALENDAR: undefined;
  LIBRARY: undefined;
  MYPAGE: undefined;
};

const BottomTabList = [
  {
    name: 'HOME',
    component: HomePage,
    off: require('../Assets/Images/ic_home.png'),
    on: require('../Assets/Images/ic_home_on.png'),
  },
  {
    name: 'CALENDAR',
    component: CalendarPage,
    off: require('../Assets/Images/ic_calendar.png'),
    on: require('../Assets/Images/ic_calendar_on.png'),
  },
  {
    name: 'LIBRARY',
    component: LibarayPage,
    off: require('../Assets/Images/ic_library.png'),
    on: require('../Assets/Images/ic_library_on.png'),
  },
  {
    name: 'MYPAGE',
    component: MypagePage,
    off: require('../Assets/Images/ic_mypage.png'),
    on: require('../Assets/Images/ic_mypage_on.png'),
  },
];

const BottomTab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={{headerShown: false}}>
        {BottomTabList.map(screen => (
          <BottomTab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  source={focused ? screen.on : screen.off}
                  style={styles.Icon}
                />
              ),
              tabBarActiveTintColor: ColorBlack,
              tabBarInactiveTintColor: ColorBlack,
            }}
          />
        ))}
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Icon: {width: 24, height: 24},
});

export default BottomNavigation;
