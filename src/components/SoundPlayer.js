
import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';
import {Button} from 'antd'


const rainAudio = 'https://ia600803.us.archive.org/24/items/RainSounds10HoursTheSoundOfRainMeditationAutogencTrainingDeepSleepRelaxingSounds/Rain%20Sounds%2010%20HoursThe%20Sound%20of%20Rain%20MeditationAutogenc%20Training%20Deep%20SleepRelaxing%20Sounds.mp3'
const breakAudio = 'https://s3.us-east-2.amazonaws.com/russell.work.data/So+Blue.mp3'
const chillAudio = `https://s3.us-east-2.amazonaws.com/russell.work.data/'Forgotten+Memories'+-+Instrumental+Chill+Mix.mp3`
const SoundPlayer = () => {
    const [playCount, setPlayCount] = useState(0)
    const [allowAutoPlayHack, setAllowAutoPlayHack] = useState(false)
    const [working, setWorking] = useState(true)
    const songLogic = () => {
        const currentMinutes = new Date().getMinutes()
       if (currentMinutes >= 0 &&  currentMinutes < 5 || (currentMinutes >= 30 &&  currentMinutes < 35)) {
           setWorking(false)

       } 
       else {
           setWorking(true)
       }
     
    }

    useEffect(() => setInterval(songLogic, 1000), [])

    return (<>
        <Sound key={allowAutoPlayHack}
            url={working ? chillAudio : breakAudio}
            playStatus={Sound.status.PLAYING}
            loop
            // onPlaying gets rendered every second, no clue why
            onPlaying={() => setPlayCount(count => count + 1)}
        />
        {playCount < 1 && <Button type='primary'style={{marginTop: 16, marginBottom: 16}} onClick={() => setAllowAutoPlayHack(true)}>allow sound to autoplay</Button>}
    </>
    )

}


export default SoundPlayer