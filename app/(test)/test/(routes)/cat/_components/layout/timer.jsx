'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from '@/utils/misc';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const setupTimer = async () => {
      const decryptedToken = await getCookie('testSession');
      if (decryptedToken) {
        const expirationTime = decryptedToken.exp * 1000; // JWT exp is in seconds, convert to milliseconds
        const currentTime = Date.now();
        const remainingTime = expirationTime - currentTime;

        if (remainingTime > 0) {
          setTimeLeft(remainingTime);

          const intervalId = setInterval(() => {
            const newRemainingTime = expirationTime - Date.now();
            if (newRemainingTime <= 0) {
              clearInterval(intervalId);
              setTimeLeft(0);
              sessionStorage.removeItem('activeQuestionIndex');
              sessionStorage.removeItem('activeSectionIndex');
              sessionStorage.removeItem('session');
              router.push(`/test/submitted`);
            } else {
              setTimeLeft(newRemainingTime);
            }
          }, 1000);

          return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }
      }
    };
    pathname.includes('/test/cat') && setupTimer();
  }, [pathname]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return timeLeft > 0 && <p>{formatTime(timeLeft)}</p>;
};

export default Timer;
