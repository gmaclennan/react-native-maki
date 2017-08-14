import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import * as MakiIcons from 'react-native-maki'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 24
  },
  row: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    paddingHorizontal: 16
  },
  label: {
    fontSize: 18,
    paddingLeft: 16
  }
})

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: Object.keys(MakiIcons)
    }

    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon ({ item }) {
    const Icon = MakiIcons[item]

    return (
      <View style={styles.row}>
        <Icon />
        <Text style={styles.label}>{item}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Maki Icon Set</Text>
        <FlatList
          style={styles.list}
          data={this.state.data}
	  keyExtractor={(item) => item}
          renderItem={this.renderIcon} />
      </View>
    )
  }
}

export default App
