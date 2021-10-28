import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import DonutChart from './DonutChart';
import ConfettiCannon from 'react-native-confetti-cannon';

const QuizCompleted = ({score, handleReset}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 100,
          borderBottomWidth: 2,
          borderBottomColor: '#FFFFFF',
        }}
        onPress={handleReset}>
        <Text style={styles.text}>Play Again!</Text>
      </TouchableOpacity>
      <View style={{position: 'absolute'}}>
        <Text style={styles.text}>
          {score === 3 ? 'PERFECT SCORE!' : 'YOUR SCORE'}
        </Text>
        <Text style={styles.score}>{`${score} / 3`}</Text>
      </View>
      <DonutChart score={score} />
      {score === 3 ? (
        <ConfettiCannon
          fadeOut={true}
          explosionSpeed={100}
          fallSpeed={3000}
          count={200}
          origin={{x: 0, y: 0}}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#301934',
    height: '100%',
  },
  text: {color: 'white', fontSize: 25},
  score: {
    textAlign: 'center',
    color: 'white',
    fontSize: 60,
  },
});

export default QuizCompleted;
