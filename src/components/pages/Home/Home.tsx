import { Button } from 'components/UI';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/quiz');

  useEffect(() => {
    localStorage.setItem('activeQuestion', JSON.stringify(0));
  }, []);

  return (
    <main className={classes.home}>
      <div className={classes.home_container}>
        <div>
          <img className={classes.img_hand} src="/hand.svg" alt="" />
        </div>
        <div className={classes.home_content}>
          <h1 className={classes.heading}>Who wants to be a millionaire?</h1>
          <Button onClick={handleClick}>Start</Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
