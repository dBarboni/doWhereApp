import React, { Component } from 'react';
import { View, ScrollView, ToastAndroid, Modal, Text, Picker } from 'react-native';
import axios from 'axios';
import { Room } from './';
import { Button, Input } from './common';

class RoomList extends Component {
  constructor(props) {
   super(props);

   this.state = {
     findServer: this.props.findServer,
     family: this.props.family,
     modalVisible: false,
     user: this.props.user,
     rooms: []
   };
 }

  componentWillMount() {
    const url = `${this.props.findServer}/api/v1/location/${this.state.family}/${this.state.user}`;

    axios.get(url)
      .then((response) => {
        if (response.data.success) {
          // Successful, continue to next step
          const rooms = response.data.analysis.location_names;
          this.setState({ rooms });
        } else {
          // Reached server successfully but nothing found
          // TODO: add 'add some rooms' text

        }
      })
      .catch(() => {
        // Failed to reach server
        ToastAndroid.show('Unable to connect to FIND server', ToastAndroid.SHORT);
      });
  }
  showModal(visible) {
    this.setState({ modalVisible: visible });
  }
  showRooms() {
    return Object.values(this.state.rooms).map(room =>
      <Room key={room} room={room} />
    );
  }
  renderRoomList() {
    return Object.values(this.state.rooms).map(room =>
      <Picker.Item key={room} label={room} value={room} />
    );
  }

  render() {
    return (
      <View style={styles.parentStyle}>
        <ScrollView>
          {this.showRooms()}
        </ScrollView>
        <View style={styles.buttonContainerStyle}>
          <Button type='FAB' onPress={() => this.showModal(true)}>+</Button>
        </View>
        <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.modalStyle}>
            <View style={styles.containerStyle}>
              <Text>Select a room:</Text>
              <View style={styles.pickerContainerStyle}>
                <Picker selectedValue={this.state.room} onValueChange={(room) => this.setState({ room })}>
                   <Picker.Item label='- Room -' value='' />
                   {this.renderRoomList()}
                </Picker>
              </View>
              <Text>Enter a task:</Text>
              <Input
                value={this.state.task}
                onChangeText={task => this.setState({ task })}
              />
              <Button>Submit</Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  buttonContainerStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  containerStyle: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    height: '50%'
  },
  modalStyle: {
    backgroundColor: '#00000075',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  parentStyle: {
    flex: 1
  },
  pickerContainerStyle: {
    backgroundColor: '#fff',
    padding: 5
  }
};

export { RoomList };
