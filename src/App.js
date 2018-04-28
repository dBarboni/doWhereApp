import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { Header, Input, Button, Card, CardSection } from './components/common';

class App extends Component {
  state = { headerText: 'Setup', findServer: 'https://cloud.internalpositioning.com/', family: '' };

  getUsers() {
    const url = this.state.findServer + '/api/v1/devices/' + this.state.family;
    axios.get(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header headerText={this.state.headerText} />
        <Card>
          <CardSection>
            <Text>Enter the address of your FIND server, or use the public server (default).</Text>
          </CardSection>
          <CardSection>
            <Input
              value={this.state.findServer}
              onChangeText={findServer => this.setState({ findServer })}
            />
          </CardSection>
          <CardSection>
            <Text>Enter the family name used in your FIND server (case sensitive).</Text>
          </CardSection>
          <CardSection>
            <Input
              value={this.state.family}
              onChangeText={family => this.setState({ family })}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.getUsers()}>Next</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#F1ECE9',
    flex: 1
  }
};

export default App;
