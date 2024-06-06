import minus from '@assets/minus.svg';
import plus from '@assets/plus.svg';
import style from './style.module.css';

interface StepperProps {
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

function Stepper({ value, handleDecrement, handleIncrement }: StepperProps) {
  return (
    <div className={style.stepper}>
      <button className={style.stepperButton} onClick={handleDecrement}>
        <img src={minus} alt="handle-decrement" className={style.stepperImg} />
      </button>
      <span className="text">{value}</span>
      <button className={style.stepperButton} onClick={handleIncrement}>
        <img src={plus} alt="handle-increment" className={style.stepperImg} />
      </button>
    </div>
  );
}

export default Stepper;
