import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GainLabel, Variant } from 'components/UI';
import classes from './Quiz.module.css';
import cx from 'classnames';

type VariantItem = {
  id: string;
  text: string;
};

type GiftItem = {
  id: number;
  numberOfRightAnswers: number;
  gift: string;
};

type QuestionItem = {
  id: number;
  question: string;
  variants: VariantItem[];
  rightVariantId: string[];
};

type AppState = {
  gifts: GiftItem[];
  questions: QuestionItem[];
};

const Quiz = () => {
  const [appState, setAppState] = useState<AppState>();
  const [answerStatus, setAnswerStatus] = useState('inactive');
  const [activeQuestion, setActiveQuestion] = useState(
    JSON.parse(localStorage.getItem('activeQuestion') || '{}') || 0
  );
  const [selectedVariant, setSelectedVariant] = useState('');
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const navigate = useNavigate();

  const getAppData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((r) => r.json())
      .then((result) => setAppState(result));
  };

  const handleVariantSelected = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
      e.preventDefault();
      setSelectedVariant(id);
      setAnswerStatus('selected');
    },
    [setSelectedVariant]
  );

  const checkSelectedVariant = useCallback((): void => {
    if (appState?.questions[activeQuestion]?.rightVariantId?.includes(selectedVariant)) {
      setAnswerStatus('correct');
      return;
    }
    setAnswerStatus('wrong');
  }, [activeQuestion, appState?.questions, selectedVariant]);

  const getLabelStatus = useCallback(
    (numberOfRightAnswers: number) => {
      if (numberOfRightAnswers - 1 === activeQuestion) {
        return 'active';
      }
      if (numberOfRightAnswers > activeQuestion) {
        return 'inactive';
      }
      return 'passed';
    },
    [activeQuestion]
  );

  useEffect(() => {
    getAppData();
  }, []);

  useEffect(() => {
    localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));
    if (activeQuestion === appState?.questions?.length) {
      const totalScore = appState?.gifts?.find(
        (item) => item?.numberOfRightAnswers === activeQuestion
      )?.gift;
      navigate(`/result?score=${totalScore}`);
    }
  }, [activeQuestion, appState?.gifts, appState?.questions?.length, navigate]);

  useEffect(() => {
    if (selectedVariant) {
      setTimeout(() => {
        checkSelectedVariant();
      }, 2000);
    }
  }, [selectedVariant, checkSelectedVariant]);

  useEffect(() => {
    if (answerStatus === 'correct') {
      setTimeout(() => {
        setActiveQuestion((prevState: number) => (prevState += 1));
        setSelectedVariant('');
        setAnswerStatus('inactive');
      }, 2000);
    }
    if (answerStatus === 'wrong') {
      const totalScore = appState?.gifts?.find(
        (item) => item?.numberOfRightAnswers === activeQuestion
      )?.gift;
      setTimeout(() => {
        navigate(`/result?score=${totalScore ? totalScore : 0}`);
      }, 2000);
    }
  }, [activeQuestion, answerStatus, appState?.gifts, navigate]);

  if (!appState) return null;

  return (
    <main className={classes.quiz}>
      <div className={classes.question_area}>
        <img
          className={classes.menu_icon}
          src="/Menu.svg"
          onClick={() => setMobileMenuOpened(true)}
        />
        <h2 className={classes.question}>{appState?.questions[activeQuestion]?.question}</h2>
        <div className={classes.variants_container}>
          {appState?.questions[activeQuestion]?.variants?.map(({ id, text }) => {
            return (
              <Variant
                key={id}
                status={id === selectedVariant ? answerStatus : 'inactive'}
                variantLabel={id}
                variantText={text}
                onClick={(e) => handleVariantSelected(e, id)}
              />
            );
          })}
        </div>
      </div>
      <aside className={cx(classes.gift_area, mobileMenuOpened ? classes.gift_area_opened : '')}>
        <img
          className={classes.close_icon}
          src="/Close.svg"
          onClick={() => setMobileMenuOpened(false)}
        />
        {appState?.gifts?.map(({ id, gift, numberOfRightAnswers }: GiftItem) => {
          return (
            <GainLabel key={id} labelText={gift} status={getLabelStatus(numberOfRightAnswers)} />
          );
        })}
      </aside>
    </main>
  );
};

export default Quiz;
