import React, { Component } from 'react';
import { Text, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Card, CardSection } from './common';

class Room extends Component {
  constructor(props) {
   super(props);

   // TODO: Move dowhereServer definition to config
   this.state = {
     room: this.props.room,
     dowhereServer: 'http://192.168.1.191:8000',
     tasks: []
   };
 }

// Get tasks
 componentWillMount() {
   const url = `${this.state.dowhereServer}/rooms/${this.state.room}`;

   axios.get(url)
     .then((response) => {
       // Success
       this.setState({ tasks: response.data });
     })
     .catch(() => {
       // Failed to reach server
       ToastAndroid.show('Unable to connect to DoWhere server', ToastAndroid.SHORT);
     });
 }

 renderTasks() {
   return this.state.tasks.map(task =>
    <Text key={task._id}>{task.task}</Text>
   );
 }

  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>{this.state.room}</Text>
        </CardSection>
        <CardSection>
          <Text>Tasks:</Text>
          {this.renderTasks()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
};

export { Room };
