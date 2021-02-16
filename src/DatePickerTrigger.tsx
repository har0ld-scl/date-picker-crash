import React, { Component } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNDatePicker from 'react-native-date-picker';

interface DatePickerTriggerProps {
  value: Date;
  onDateChange: (date: Date) => void;
  children: React.ReactChild;
}

interface DatePickerTriggerState {
  value: Date;
  pickerVisible: boolean;
}

export class DatePickerTrigger extends Component<
  DatePickerTriggerProps,
  DatePickerTriggerState
> {
  constructor(props: DatePickerTriggerProps) {
    super(props);

    this.state = {
      value: this.props.value || new Date(),
      pickerVisible: false,
    };
  }

  render() {
    const { children } = this.props;
    const { value, pickerVisible } = this.state;

    return (
      <>
        <TouchableOpacity onPress={this.showPicker}>
          {children}
        </TouchableOpacity>
        <Modal
          visible={pickerVisible}
          transparent={true}
          animationType={'slide'}
          statusBarTranslucent={true}
        >
          <View style={styles.overlay}>
            <View style={styles.calendarContainer}>
              <RNDatePicker
                date={value}
                mode={'date'}
                onDateChange={this.handleDateChange}
                androidVariant={'nativeAndroid'}
                maximumDate={new Date()}
                minimumDate={new Date()}
              />
              <View style={styles.calendarFooter}>
                <Button title={'Accept'} onPress={this.handleAcceptPress} />
                <Button title={'Cancel'} onPress={this.hidePicker} />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  private handleDateChange = (date: Date) => {
    this.setState({ value: date });
  };

  private handleAcceptPress = () => {
    const { onDateChange } = this.props;
    const { value } = this.state;

    onDateChange?.(value);

    this.setState({ pickerVisible: false });
  };

  private showPicker = () => {
    this.setState({ pickerVisible: true });
  };

  private hidePicker = () => {
    this.setState({ pickerVisible: false });
  };
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  calendarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  calendarFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default DatePickerTrigger;
