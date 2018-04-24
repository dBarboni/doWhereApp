import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Input, Button, Card, CardSection } from './components/common';

class App extends Component {
  state = { headerText: 'Setup', findServer: 'https://cloud.internalpositioning.com/' };

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
            <Button>Next</Button>
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
