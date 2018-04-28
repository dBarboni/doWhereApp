import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';
import { Header, Input, Button, Card, CardSection } from './components/common';

class App extends Component {
  state = { headerText: 'Setup', findServer: 'https://cloud.internalpositioning.com/', family: '', users: [], user: '' };

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
        this.setState({ users: response.data.devices });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // List users
  renderUserList() {
    return this.state.users.map(user =>
      <Text style={styles.listItemStyle} key={user}>{user}</Text>
    );
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
          <CardSection>
            <Text>{this.renderUserList()}</Text>
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
  },
  listStyle: {
    flexDirection: 'row'
  },
  listItemStyle: {
    fontSize: 20
  }
};

export default App;
