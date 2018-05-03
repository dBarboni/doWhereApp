import React, { Component } from 'react';
import { View, Text, AsyncStorage, Picker, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Header, Input, Button, Card, CardSection, Spinner } from './components/common';

class App extends Component {
  state = { headerText: 'Choose Server', findServer: 'https://cloud.internalpositioning.com/', family: '', users: [], user: '', serverSetup: false, isLoading: false };

  componentWillMount() {
    AsyncStorage.getItem('findServer').then((findServer) => this.setState({ findServer }));
    AsyncStorage.getItem('family').then((family) => this.setState({ family }));
  }

  getUsers() {
    this.setState({ isLoading: true });

    // Get saved config
    AsyncStorage.setItem('findServer', this.state.findServer);
    AsyncStorage.setItem('family', this.state.family);
    const url = this.state.findServer + '/api/v1/devices/' + this.state.family;

    // Contact FIND server to get users
    axios.get(url)
      .then((response) => {
        if (response.data.success) {
          // Successful
          this.setState({ users: response.data.devices, serverSetup: true, headerText: 'Choose User' });
        } else {
          // Reached server successfully but no devices found for that family name
          ToastAndroid.show('No devices found for that family name', ToastAndroid.SHORT);
        }
        this.setState({ isLoading: false });
      })
      .catch(() => {
        // Failed to reach server
        this.setState({ isLoading: false });
        ToastAndroid.show('Unable to connect to FIND server', ToastAndroid.SHORT);
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
          <Picker selectedValue={this.state.user} onValueChange={(user) => this.setUser(user)}>
             <Picker.Item label='' value='' />
             {this.renderUserList()}
          </Picker>
          <CardSection>
            {this.renderButton('Finish')}
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
          {this.renderButton('Next')}
        </CardSection>
      </Card>
    );
  }

  // Determine button state
  renderButton(btnText = 'Submit') {
    if (this.state.isLoading) {
      return <Spinner size='small' />;
    } else if (this.state.family === '' || this.state.findServer === '' || (this.state.serverSetup && this.state.user === '')) {
      return <Button disabled>{btnText}</Button>;
    } else if (this.state.serverSetup) {
      return <Button>{btnText}</Button>;
    }

    return <Button onPress={() => this.getUsers()}>{btnText}</Button>;
  }

  // List users
  renderUserList() {
    return this.state.users.map(user =>
      <Picker.Item key={user} label={user} value={user} />
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
