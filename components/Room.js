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
     dowhereServer: 'http://192.168.1.224:8000',
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
   if (this.state.tasks.length > 0) {
     return this.state.tasks.map(task =>
      <Text key={task._id} style={styles.taskStyle}>- {task.task}</Text>
     );
   } else {
     return <Text style={styles.taskStyle}>No tasks found for this room.</Text>;
   }
 }

  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>{this.state.room}</Text>
        </CardSection>
        <CardSection layout='column'>
          {this.renderTasks()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    backgroundColor: '#247BA0',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    margin: -5,
    padding: 5
  },
  taskStyle: {
    fontSize: 17
  }
};

export { Room };
