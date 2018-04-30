import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';
import { Header, Input, Button, Card, CardSection } from './components/common';

class App extends Component {
  state = { headerText: 'Choose Server', findServer: 'https://cloud.internalpositioning.com/', family: '', users: [], user: '', serverSetup: false };

  componentWillMount() {
    AsyncStorage.getItem('findServer').then((findServer) => this.setState({ findServer }));
    AsyncStorage.getItem('family').then((family) => this.setState({ family }));
  }

  getUsers() {
    // Get saved config
    AsyncStorage.setItem('findServer', this.state.findServer);
    AsyncStorage.setItem('family', this.state.family);
    const url = this.state.findServer + '/api/v1/devices/' + this.state.family;

    // Contact FIND server to get users
    axios.get(url)
      .then((response) => {
        this.setState({ users: response.data.devices, serverSetup: true, headerText: 'Choose User' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Set user in state
  setUser(user) {
      this.setState({ user });
  }

  // Display setup component based on state
  chooseContent() {
    if (this.state.serverSetup) {
      return (
        <Card>
          <CardSection>
            <Text>Choose your username from the list below.</Text>
          </CardSection>
          {this.renderUserList()}
          <CardSection>
            <Button>Next</Button>
          </CardSection>
        </Card>
      );
    }

    return (
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
    );
  }

  // List users
  renderUserList() {
    return this.state.users.map(user =>
      <CardSection key={user}>
        <Button onPress={() => this.setUser({ user })}>{user}</Button>
      </CardSection>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header headerText={this.state.headerText} />
        {this.chooseContent()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#F1ECE9',
    flex: 1
  },
  listItemStyle: {
    fontSize: 20
  }
};

export default App;
