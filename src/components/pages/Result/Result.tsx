import { Button } from 'components/UI';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classes from './Result.module.css';

const Result = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/quiz');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem('activeQuestion', JSON.stringify(0));
  }, []);

  return (
    <main className={classes.result}>
      <div className={classes.result_container}>
        <div>
          <img className={classes.img_hand} src="/hand.svg" alt="" />
        </div>
        <div className={classes.result_content}>
          <div>
            <p className={classes.total}>Total Score:</p>
            <h1 className={classes.heading}>{searchParams.get('score')} earned</h1>
          </div>
          <Button onClick={handleClick}>Try Again</Button>
        </div>
      </div>
    </main>
  );
};

export default Result;
