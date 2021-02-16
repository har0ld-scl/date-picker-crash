import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import DatePicker from './src/DatePicker';

const App = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
      <SafeAreaView style={styles.container}>
        <DatePicker onDateChange={setSelectedDate} />
        <View style={styles.labelContainer}>
          <Text style={styles.dateLabel}>{selectedDate.toDateString()}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 16,
  },
});

export default App;
