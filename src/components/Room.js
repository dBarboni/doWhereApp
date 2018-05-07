import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';
// import axios from 'axios';

class Room extends Component {
  constructor(props) {
   super(props);

   this.state = {
     room: this.props.room
   };
 }

  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>{this.state.room}</Text>
        </CardSection>
        <CardSection>
          <Text>Tasks:</Text>
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
