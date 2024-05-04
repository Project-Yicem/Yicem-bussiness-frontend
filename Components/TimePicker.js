import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === 'ios'); // For iOS, we toggle visibility on every change
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <Button onPress={showTimepicker} title="Select Time" />
     
    </View>
  );
};

export default TimePicker;