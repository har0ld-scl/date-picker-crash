import React, { Component } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import { add as dateAdd, sub as dateSubtract } from 'date-fns';

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

interface DatePickerState {
  selectedDate: Date;
  showModal: boolean;
}

export class DatePicker extends Component<DatePickerProps, DatePickerState> {
  state = {
    selectedDate: new Date(),
    showModal: false,
  };

  render() {
    const { selectedDate, showModal } = this.state;
    return (
      <>
        <TouchableOpacity onPress={this.showPicker}>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Set Date</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Modal
          visible={showModal}
          transparent={true}
          animationType={'slide'}
          statusBarTranslucent={true}
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={this.hidePicker}>
              <View style={styles.modalUnderlay}></View>
            </TouchableWithoutFeedback>
            <View style={styles.pickerContainer}>
              <RNDatePicker
                date={selectedDate}
                mode={'date'}
                androidVariant={'nativeAndroid'}
                maximumDate={dateAdd(new Date(), { days: 1 })}
                minimumDate={dateSubtract(new Date(), { days: 1 })}
                onDateChange={this.handleDateChange}
              />
              <View style={styles.modalFooter}>
                <Button title={'Accept'} onPress={this.handleAccept} />
                <Button title={'Cancel'} onPress={this.hidePicker} />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  private showPicker = () => {
    this.setState({ showModal: true });
  };

  private hidePicker = () => {
    this.setState({ showModal: false });
  };

  private handleDateChange = (date: Date) => {
    this.setState({ selectedDate: date });
  };

  private handleAccept = () => {
    const { onDateChange } = this.props;
    const { selectedDate } = this.state;

    onDateChange?.(selectedDate);
    this.setState({ showModal: false });
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalUnderlay: {
    flex: 1,
  },
  pickerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default DatePicker;
