import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

export interface WelcomeData {
  name: string,
  enthusiasmLevel?: number,
  list: []
}

const WelcomeComponent: React.FC<WelcomeData> = (props: any) => {
  const image = require('./assets/About.png');

  const [name, setName] = React.useState(
    props.name
  );
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(
    props.enthusiasmLevel
  );
  const [list] = React.useState(
    props.list
  );

  const [showLoader, setShowLoader] = React.useState(
    false
  );
  const [showList, setShowList] = React.useState(
    false
  );

  const onIncrement = () => {
    setEnthusiasmLevel((enthusiasmLevel || 0) + 1);
  }

  const onDecrement = () => {
    setEnthusiasmLevel((enthusiasmLevel || 0) - 1);
  }

  const onNavigate = () => {
    setShowLoader(true)
    setTimeout(() => {
      setShowLoader(false)
      showList ? setShowList(false) : setShowList(true)
    }, 1000)
  }

  const onDataTextChange = (data: string) =>
    setName(data);

  const renderList = () => {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>{"Description about " + name}</Text>
        {list && list.length > 0 ?
          <FlatList data={list}
            renderItem={({ item }) =>
              <Text style={styles.description}>{"+ " + item}</Text>
            }
          /> : <Text style={styles.noData}>No Data Found</Text>}

      </View>
    );
  };

  const renderMain = () => {
    return (
      <View style={styles.root}>
        <Image source={image} style={styles.topSide} />
        <Text style={styles.greeting}>
          Hello{' '}
          {name + "!"}
        </Text>
        <TextInput
          value={name}
          placeholder={'Type here'}
          placeholderTextColor={'grey'}
          style={styles.textbox}
          onChangeText={(e: string) => { onDataTextChange(e) }} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>
          <View style={[styles.button]}>
            <Text>{enthusiasmLevel}</Text></View>
          <View style={styles.button}>
            <Button
              title="+"
              onPress={onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      { showLoader ? <ActivityIndicator style={styles.loaderView} /> 
        : showList ? renderList() : renderMain()
      }
      {
        !showLoader ? <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 40, width: '25%', backgroundColor: 'grey' }} onPress={() => onNavigate()}>
        <Text style={{ alignSelf: 'center', color: 'white' }}>{showList ? "Prev" : "Next"}</Text>
        </TouchableOpacity> : null
      }
    </SafeAreaView>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  root: {
    flex: 0,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    borderWidth: 2,
    width: '10%',
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  greeting: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    color: '#999',
    fontWeight: '600',
    marginBottom: 10
  },
  textbox: {
    borderColor: 'grey',
    borderWidth: 0.3,
    height: 35,
    width: '80%',
    fontSize: 13,
    fontWeight: '600',
    alignSelf: 'center',
    padding: 5
  },
  topSide: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    zIndex: 1,
  },
  loaderView: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  noData: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'center',
    fontWeight: '600'
  }
});
export default WelcomeComponent;
