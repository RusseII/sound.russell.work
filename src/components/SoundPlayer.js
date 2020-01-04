
import React, { useState } from 'react';
import Sound from 'react-sound';
import {Button} from 'antd'

const SoundPlayer = () => {
    const [playCount, setPlayCount] = useState(0)
    const [allowAutoPlayHack, setAllowAutoPlayHack] = useState(false)

    return (<>
        <Sound key={allowAutoPlayHack}
            // host this somewhere else, or change for a better
            url="https://ia600803.us.archive.org/24/items/RainSounds10HoursTheSoundOfRainMeditationAutogencTrainingDeepSleepRelaxingSounds/Rain%20Sounds%2010%20HoursThe%20Sound%20of%20Rain%20MeditationAutogenc%20Training%20Deep%20SleepRelaxing%20Sounds.mp3"
            playStatus={Sound.status.PLAYING}
            loop
            // onPlaying gets rendered every second, no clue why
            onPlaying={() => setPlayCount(count => count + 1)}
        />
        {playCount < 1 && <Button type='primary'style={{marginTop: 16}} onClick={() => setAllowAutoPlayHack(true)}>allow sound to autoplay</Button>}
    </>
    )

}


export default SoundPlayer