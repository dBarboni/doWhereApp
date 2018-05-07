import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import axios from 'axios';

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
    const url = this.props.findServer + '/api/v1/location/' + this.state.family + '/' + this.state.user;

    axios.get(url)
      .then((response) => {
        if (response.data.success) {
          // Successful, continue to next step
          const rooms = response.data.analysis.location_names;
          this.setState({ rooms });
        } else {
          // Reached server successfully but...

        }
      })
      .catch(() => {
        // Failed to reach server

      });
  }

  showRooms() {
    return Object.values(this.state.rooms).map(room =>
      <Text key={room}>{room}</Text>
    );
  }

  render() {
    return (
      <ScrollView>
        <Text>Room list</Text>
        {this.showRooms()}
      </ScrollView>
    );
  }
}

export default RoomList;
