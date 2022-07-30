import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ColorBlack, ColorWhite} from '../Styles/pallete';
import {useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
dayjs.extend(weekday);
dayjs.extend(isoWeek);

type day = {
  type: 'prev' | 'now' | 'next';
  day: number;
};

const {width, height} = Dimensions.get('window');

const daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function WeekCalendar() {
  const [now, setNow] = useState(dayjs());
  const [days, setDays] = useState<day[][]>([]);
  const [select, setSelect] = useState<undefined | number>();

  const caculateDays = (month: Dayjs) => {
    const daysEndInMonth = month.daysInMonth(); // 이번달 마지막 일 (28,29,30,31)
    const daysEndInPrevMonth = month.subtract(1, 'month').daysInMonth(); // 저번달 마지막 일
    const startDayOfWeek = month.date(1).day(); // 일=0,월=1,화=2,수=3,목=4,금=5,토=6

    let dayArr: day[] = [];
    for (let i = 0; i <= 42; i++) {
      if (i < startDayOfWeek) {
        dayArr.push({
          type: 'prev',
          day: daysEndInPrevMonth - startDayOfWeek + i + 1,
        } as day); // 지난달 말일 일부분
      } else if (i >= startDayOfWeek && i < daysEndInMonth + startDayOfWeek) {
        dayArr.push({type: 'now', day: i - startDayOfWeek + 1} as day); // 이번달
      } else {
        dayArr.push({
          type: 'next',
          day: i - daysEndInMonth - startDayOfWeek + 1,
        } as day); // 다음달 앞부분
      }
    }

    const monthArr = new Array(6)
      .fill(null)
      .map((week, index) => dayArr.slice(index * 7, 7 * (index + 1)));

    setDays(monthArr);
  };

  const prevDate = () => {
    const date = dayjs(now).subtract(1, 'month');
    setSelect(undefined);
    setNow(date);
  };

  const nextDate = () => {
    const date = dayjs(now).add(1, 'month');
    setSelect(undefined);
    setNow(date);
  };

  const handleSelect = (day: day) => {
    if (day.type === 'prev') {
      prevDate();
      setSelect(day.day);
    } else if (day.type === 'next') {
      nextDate();
      setSelect(day.day);
    } else {
      setSelect(day.day);
    }
  };

  const translateX = useSharedValue(-width);
  const offsetX = useSharedValue(0);
  const swipe = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = offsetX.value + event.translationX;
      console.log(translateX.value);
    })
    .onEnd(() => {
      const MaxRight = -width * (days.length - 1);
      const SnapPoint = translateX.value % width;
      if (translateX.value > 0) {
        translateX.value = withSpring(0);
        offsetX.value = translateX.value;
        return;
      }
      if (translateX.value < MaxRight) {
        translateX.value = withSpring(MaxRight);
        offsetX.value = translateX.value;
        return;
      }
      if (SnapPoint < -width / 2) {
        const result = translateX.value - (SnapPoint + width);
        translateX.value = withTiming(result);
      }
      if (SnapPoint > -width / 2) {
        const result = translateX.value - SnapPoint;
        translateX.value = withTiming(result);
      }
      offsetX.value = translateX.value;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  useEffect(() => {
    caculateDays(now);
  }, [now]);

  return (
    <View style={{width: width, height: 100, backgroundColor: ColorWhite}}>
      <View
        style={{
          width: width,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {daysLabel.map(item => (
          <Text style={{flex: 1, textAlign: 'center'}}>{item}</Text>
        ))}
      </View>
      <View>
        <GestureDetector gesture={swipe}>
          <Animated.View style={[{justifyContent: 'center'}]}>
            <Animated.View style={[rStyle, styles.Box]}>
              {days.map((item, index) => (
                <View key={index} style={styles.BoxItem}>
                  {item.map(day => (
                    <Text style={{flex: 1, textAlign: 'center'}}>
                      {day.day}
                    </Text>
                  ))}
                </View>
              ))}
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Box: {
    flexDirection: 'row',
    width: width * 6,
  },
  BoxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorWhite,
    width: width,
    height: 50,
    overflow: 'hidden',
  },
});

export default WeekCalendar;
