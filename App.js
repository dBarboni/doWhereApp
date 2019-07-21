import React, { Component } from 'react';
import { View, Text, AsyncStorage, Picker, ToastAndroid, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { RoomList } from './components/';
import { Header, Input, Button, Card, CardSection, Spinner } from './components/common';

class App extends Component {
  state = {
    headerText: 'Choose Server',
    findServer: 'https://cloud.internalpositioning.com/',
    family: '',
    users: [],
    user: '',
    serverSetup: false,
    isLoading: true,
    refreshing: false,
    setupComplete: false
  };

  componentWillMount() {
    // Retrieve stored config and load into state
    AsyncStorage.multiGet(['findServer', 'family', 'user', 'setupComplete']).then((config) => {
      config.forEach((item) => {
        this.setState({ [item[0]]: item[1] });
      });
      this.setState({ isLoading: false });
    });
  }

  // Pull-to-refresh for user list
  onRefresh() {
    this.setState({ refreshing: true });
    this.getUsers();
  }

  // Get list of users on FIND server
  getUsers() {
    const { findServer, family } = this.state;
    this.setState({ isLoading: true });

    // Store config
    AsyncStorage.setItem('findServer', findServer);
    AsyncStorage.setItem('family', family);

    const url = `${findServer}/api/v1/devices/${family}`;

    // Contact FIND server to get users
    axios.get(url)
      .then((response) => {
        if (response.data.success) {
          // Successful, continue to next step
          this.setState({ users: response.data.devices, serverSetup: true, headerText: 'Choose User' });
        } else {
          // Reached server successfully but no devices found for that family name
          ToastAndroid.show('No devices found for that family name', ToastAndroid.SHORT);
        }
        this.setState({ isLoading: false, refreshing: false });
      })
      .catch(() => {
        // Failed to reach server
        this.setState({ isLoading: false, refreshing: false });
        ToastAndroid.show('Unable to connect to FIND server', ToastAndroid.SHORT);
      });
  }

  // Update state
  updateState(propName, propValue) {
      this.setState({ [propName]: propValue });
  }

  // Finish serverSetup
  completeSetup() {
    this.setState({ setupComplete: true, headerText: 'Rooms' });
    AsyncStorage.multiSet([['user', this.state.user], ['setupComplete', 'true']]);
  }

  // Display setup component based on state
  chooseContent() {
    if (this.state.isLoading) {
      return <Spinner size='large' />;
    } else if (this.state.serverSetup && !this.state.setupComplete) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <Card>
            <CardSection>
              <Text>Choose your username from the list below.</Text>
            </CardSection>
            <View style={styles.pickerContainerStyle}>
              <Picker selectedValue={this.state.user} onValueChange={(user) => this.setUser(user)}>
                 <Picker.Item label='- User -' value='' />
                 {this.renderUserList()}
              </Picker>
            </View>
            <CardSection>
              {this.renderButton('Finish')}
            </CardSection>
          </Card>
        </ScrollView>
      );
    } else if (this.state.setupComplete) {
      return <RoomList findServer={this.state.findServer} family={this.state.family} user={this.state.user} />;
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
            autoCapitalize={'none'}
            autoCorrect={false}
          />
        </CardSection>
        <CardSection>
          <Text>Enter the family name used in your FIND server (case sensitive).</Text>
        </CardSection>
        <CardSection>
          <Input
            value={this.state.family}
            onChangeText={family => this.setState({ family })}
            autoCapitalize={'none'}
            autoCorrect={false}
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
    const { isLoading, family, findServer, serverSetup, user } = this.state;

    if (isLoading) {
      return <Spinner size='small' />;
    } else if (family === '' || findServer === '' || (serverSetup && user === '')) {
      return <Button disabled>{btnText}</Button>;
    } else if (serverSetup) {
      return <Button onPress={() => this.completeSetup()}>{btnText}</Button>;
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
  pickerContainerStyle: {
    backgroundColor: '#fff',
    padding: 5
  }
};

export default App;
