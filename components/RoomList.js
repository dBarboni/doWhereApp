import React, { Component } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Room } from './';
import { Button } from './common';

class RoomList extends Component {
  constructor(props) {
   super(props);

   this.state = {
     findServer: this.props.findServer,
     family: this.props.family,
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

  showRooms() {
    return Object.values(this.state.rooms).map(room =>
      <Room key={room} room={room} />
    );
  }

  render() {
    return (
      <View style={styles.parentStyle}>
        <ScrollView>
          {this.showRooms()}
        </ScrollView>
        <View style={styles.buttonContainerStyle}>
          <Button type='FAB'>+</Button>
        </View>
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
  parentStyle: {
    flex: 1
  }
};

export { RoomList };
