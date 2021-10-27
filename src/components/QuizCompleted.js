import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import DonutChart from './DonutChart';

import ConfettiCannon from 'react-native-confetti-cannon';

const QuizCompleted = ({score}) => (
  <View style={styles.container}>
    <View style={{position: 'absolute'}}>
      <Text style={styles.scoreDescription}>
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#301934',
    height: '100%',
  },
  scoreDescription: {color: 'white', fontSize: 30},
  score: {
    textAlign: 'center',
    color: 'white',
    fontSize: 70,
  },
});

export default QuizCompleted;
