import React from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const CustomStatusBar = () => (
  <>
    <View style={styles.statusBar}>
      <StatusBar
        translucent
        backgroundColor={'#301934'}
        barStyle="light-content"
      />
    </View>
    <View style={styles.header} />
  </>
);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: '#301934',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#301934',
  },
});

export default CustomStatusBar;
