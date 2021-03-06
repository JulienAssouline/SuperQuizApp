/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import {useQuery} from './src/hooks/useQuery';
import QuizCompleted from './src/components/QuizCompleted';
import CustomStatusBar from './src/components/CustomStatusBar';

const w = Dimensions.get('window');

const calculateTimeLeft = time => {
  if (time === 0) return 0;
  return time - 1;
};

const App = () => {
  const {data, loading, error} = useQuery();
  const [selected, setSelected] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [timeCounter, setTimeCounter] = useState(10);
  const [page, setPage] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (!quizCompleted) {
      timer = setTimeout(() => {
        if (timeCounter === 0) {
          setAnswer(data[page].answer);
          setIsPlaying(false);

          if (data[page].answer === selected) {
            setScore(score + 1);
          }

          // wait a couple of seconds before going to the next question
          setTimeout(() => {
            if (page < 2) {
              setPage(page + 1);
            } else if (page === 2) {
              setQuizCompleted(true);
            }

            setTimeCounter(calculateTimeLeft(11));
            setIsPlaying(true);
            setAnswer(null);
            setSelected(null);
          }, 2000);
        } else {
          setTimeCounter(calculateTimeLeft(timeCounter));
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeCounter]);

  const isOutOfTime = answerNumber =>
    selected === null && timeCounter === 0 && answer === answerNumber;

  const isAnswerCorrect = (answerNumber, yes, no, notSelected) => {
    if (answer === selected && selected === answerNumber) {
      return yes;
    } else if (answer !== selected) {
      if (selected === answerNumber) return no;
      if (answer === answerNumber) return yes;
      return notSelected;
    } else return notSelected;
  };

  const highlightBackground = answerNumber => {
    if (isOutOfTime(answerNumber)) return '#008000';
    if (selected === null) return '#793f83';
    if (answer === null) {
      return selected === answerNumber ? 'purple' : '#793f83';
    } else {
      return isAnswerCorrect(answerNumber, '#008000', '#FF0000', '#793f83');
    }
  };

  const displayIconType = (answerNumber, faCheck, faTimes) => {
    if (isOutOfTime(answerNumber)) return faCheck;
    if (answer === null) return null;
    return isAnswerCorrect(answerNumber, faCheck, faTimes, null);
  };

  if (loading)
    return (
      <View style={styles.queryElements}>
        <Text style={styles.text}>...loading</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.queryElements}>
        <Text style={styles.text}>sorry something went wrong</Text>
      </View>
    );

  const selectedQuestion = data[page];

  return (
    <View style={styles.main}>
      <CustomStatusBar />
      {quizCompleted ? (
        <QuizCompleted
          handleReset={() => {
            setPage(0);
            setScore(0);
            setTimeCounter(10);
            setQuizCompleted(false);
            setAnswer(null);
          }}
          score={score}
        />
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{textAligned: 'right'}}>
            <View style={{backgroundColor: '#e1e4e8'}}>
              <Image
                style={{
                  opacity: imageLoading ? 0 : 1,
                  ...styles.image,
                }}
                width={w.width}
                height={340}
                source={{uri: selectedQuestion?.imageUrl}}
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
              />
            </View>
            <View style={styles.circleTimer}>
              <CountdownCircleTimer
                isPlaying={isPlaying}
                size={60}
                duration={10}
                rotation="counterclockwise"
                strokeWidth={8}
                colors={[
                  ['#FFFF00', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
                onComplete={() => [isPlaying, 3000]}>
                {({remainingTime}) => (
                  <Animated.Text style={{...styles.text, color: '#000000'}}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
            </View>
          </View>
          <View style={styles.questionContainer}>
            <Text style={{fontWeight: 'bold', ...styles.text}}>
              {selectedQuestion?.question}
            </Text>
          </View>
          <View style={styles.answerContainer}>
            {selectedQuestion?.options.map((answer, index) => (
              <TouchableOpacity
                onPress={() => setSelected(index)}
                key={index}
                style={{
                  backgroundColor: highlightBackground(index),
                  ...styles.answerItem,
                }}>
                <View style={styles.icons}>
                  {displayIconType(index, faCheck, faTimes) && (
                    <FontAwesomeIcon
                      size={35}
                      color="#FFFFFF"
                      icon={displayIconType(index, faCheck, faTimes)}
                    />
                  )}
                </View>
                <Text style={styles.text}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'white',
  },
  main: {backgroundColor: '#301934', flex: 1},
  queryElements: {
    backgroundColor: '#301934',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  circleTimer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    alignItems: 'center',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 25,
    backgroundColor: '#552c5c',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  answerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#301934',
    width: '100%',
    marginTop: 20,
  },
  answerItem: {
    width: '80%',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  icons: {
    position: 'absolute',
    left: 10,
  },
});

export default App;
