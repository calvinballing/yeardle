import React from 'react'

interface ICountdown {
    hours: number;
    minutes: number;
    seconds: number;
    handleRanOutOfTime: Function;
}



const CountDownTimer = ({ hours = 0, minutes = 0, seconds = 60, handleRanOutOfTime }: ICountdown) => {


    const [time, setTime] = React.useState < ICountdown > ({ hours, minutes, seconds, handleRanOutOfTime });

    const tick = () => {

        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
            failure()
        else if (time.minutes === 0 && time.seconds === 0) {
            setTime({ hours: time.hours, minutes: 59, seconds: 59, handleRanOutOfTime });
        } else if (time.seconds === 0) {
            setTime({ hours: time.hours, minutes: time.minutes - 1, seconds: 59, handleRanOutOfTime });
        } else {
            setTime({ hours: time.hours, minutes: time.minutes, seconds: time.seconds - 1, handleRanOutOfTime });
        }
    };


    const failure = () => handleRanOutOfTime(true);


    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });


    return (
        <div className='text-9xl flex justify-center'>
            <p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
                .toString()
                .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>

        </div>
    );
}

export default CountDownTimer;
