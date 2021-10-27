import {useEffect, useState} from 'react';

const calculateTimeLeft = time => {
  if (time === 0) return 0;
  return time - 1;
};

export const useTimer = ({data, selected, setSelected}) => {
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
          setTimeout(() => {
            setTimeCounter(calculateTimeLeft(11));
            if (page < 2) {
              setPage(page + 1);
            } else if (page === 2) {
              setQuizCompleted(true);
            }
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

  return {page, quizCompleted, answer, score, isPlaying, timeCounter};
};
