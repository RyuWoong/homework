import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorBlack, ColorWhite} from '../Styles/pallete';
import {useWindowDimensions} from 'react-native';
dayjs.extend(weekday);
dayjs.extend(isoWeek);

type day = {
  type: 'prev' | 'now' | 'next';
  day: number;
};

const daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function CustomCalendar() {
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

  useEffect(() => {
    caculateDays(now);
  }, [now]);

  return (
    <View style={style.Container}>
      {/* 월 전환 및 년,월 */}
      <View style={style.Header}>
        <TouchableOpacity onPress={prevDate}>
          <Image
            style={style.Arrow}
            source={require('../Assets/Images/ic_left.png')}
          />
        </TouchableOpacity>
        <Text style={style.Date}>{now.format('YYYY년 MM월')}</Text>
        <TouchableOpacity onPress={nextDate}>
          <Image
            style={style.Arrow}
            source={require('../Assets/Images/ic_right.png')}
          />
        </TouchableOpacity>
      </View>
      {/* 일월화수목금토 */}
      <View>
        <View style={style.Wrapper}>
          {daysLabel.map((item, index) => (
            <Text
              key={`days-${item}${index}`}
              style={[style.Days, {flex: 1, color: '#919191'}]}>
              {item}
            </Text>
          ))}
        </View>

        {/* 일 */}
        {days.length > 0 &&
          days.map((item, index) => (
            <View key={`week-${index}`} style={style.Wrapper}>
              {item.map((deepitem, deepindex) => (
                <TouchableOpacity
                  key={`days-${deepitem}${deepindex}`}
                  style={[
                    style.DayBox,
                    {
                      borderWidth:
                        deepitem.type === 'now' && select === deepitem.day
                          ? 1
                          : 0,
                    },
                  ]}
                  onPress={() => handleSelect(deepitem)}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={[
                        style.Days,
                        {
                          color:
                            deepitem.type === 'now'
                              ? deepindex === 0
                                ? '#FF0000'
                                : deepindex === 6
                                ? '#0060EE'
                                : '#222222'
                              : '#EEEEEE',
                        },
                      ]}>
                      {deepitem.day}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Container: {
    width: '100%',
    padding: 20,
    backgroundColor: ColorWhite,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  Arrow: {
    width: 24,
    height: 24,
  },
  Date: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 30,
  },
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  DayBox: {
    flex: 1,
    height: undefined,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: ColorBlack,
  },
  Days: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomCalendar;
