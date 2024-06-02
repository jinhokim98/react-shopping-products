import { useEffect, useState } from 'react';

function useToastModalAnimation(isError: boolean) {
  const [isOn, setIsOn] = useState(false);

  const timeout = 3000;

  const fadeInModal = () => {
    setIsOn(true);
  };
  const fadeOutModal = () =>
    setTimeout(() => {
      setIsOn(false);
    }, timeout);

  const trigger = () => {
    fadeInModal();
    const fadeOutTimer = fadeOutModal();

    return () => {
      clearTimeout(fadeOutTimer);
    };
  };

  useEffect(() => {
    if (isError) {
      trigger();
    }
  }, [isError]);

  return { isOn, trigger };
}

export default useToastModalAnimation;
