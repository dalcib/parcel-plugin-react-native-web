import { AppLoading, Asset } from 'expo'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TabViewPagerAndroid } from 'react-native-tab-view'
import SafeAreaView from 'react-native-safe-area-view'
import { Ionicons } from '@expo/vector-icons'
//import Expo, { KeepAwake } from 'expo'

export default class App extends React.Component {
  state = { assetsAreLoaded: false }

  componentDidMount() {
    this._loadAssetsAsync().done()
  }

  render() {
    if (!this.state.assetsAreLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <Text>Open up src/App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Ionicons name="md-options" size={28} />
        </View>
      )
    }
  }

  async _loadAssetsAsync() {
    try {
      await Asset.loadAsync([require('./assets/icon.png')])
    } finally {
      this.setState({ assetsAreLoaded: true })
    }
  }

  _handleEventAsync = async ({ nativeEvent, type = 'Event' }) => {
    console.log(type)
    for (let item of nativeEvent.collection) {
      console.log(item)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
