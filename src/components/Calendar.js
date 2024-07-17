import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default function CalendarStripExample() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectDate = date => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>Calendar Strip</Text> */}
      <CalendarStrip
        calendarColor="#F5FCFF"
        calendarHeaderStyle={styles.calendarHeader}
        dateNumberStyle={styles.dateNumber}
        dateNameStyle={styles.dateName}
        highlightDateNumberStyle={styles.highlightDateNumber}
        highlightDateNameStyle={styles.highlightDateName}
        highlightDateContainerStyle={styles.highlightDateContainer}
        selectedDate={selectedDate}
        onDateSelected={onSelectDate}
        scrollable
      />
      {/* <Text style={styles.selectedDateText}>
        Selected date: {selectedDate.toDateString()}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarHeader: {
    color: '#333333',
    fontWeight: 'bold',
  },
  dateNumber: {
    color: '#333333',
  },
  dateName: {
    color: '#333333',
  },
  highlightDateNumber: {
    color: '#FFFFFF',
  },
  highlightDateName: {
    color: '#FFFFFF',
  },
  highlightDateContainer: {
    backgroundColor: '#FFCC00',
    borderRadius: 5,
  },
  selectedDateText: {
    fontSize: 18,
    marginTop: 10,
  },
});
