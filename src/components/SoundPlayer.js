
import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';
import { Button, Row, Col, Icon, Slider } from 'antd'

import ReactPlayer from 'react-player'
import styles from './SoundPlayer.less'

// const rainAudio = 'https://ia600803.us.archive.org/24/items/RainSounds10HoursTheSoundOfRainMeditationAutogencTrainingDeepSleepRelaxingSounds/Rain%20Sounds%2010%20HoursThe%20Sound%20of%20Rain%20MeditationAutogenc%20Training%20Deep%20SleepRelaxing%20Sounds.mp3'
const breakAudio = 'https://s3.us-east-2.amazonaws.com/russell.work.data/So+Blue.mp3'
// const chillAudio = `https://s3.us-east-2.amazonaws.com/russell.work.data/'Forgotten+Memories'+-+Instrumental+Chill+Mix.mp3`
// const chillAudio = "https://www.youtube.com/embed/ajuCAfqVWbc"

const IconSlider = ({ volume, setVolume }) => {



    const updateVolume = (volume) => {
        localStorage.setItem('volume', volume)
        setVolume(volume)
    }



    return (
        <div className={styles.iconWrapper}>
            <Slider max={10} onChange={updateVolume} value={volume} />
            <Icon style={{ color: 'rgba(255,255,255,.5' }} type="sound" />
        </div>
    );
}


const SoundPlayer = () => {
    const startingVolume = localStorage.getItem("volume")
    const [playing, setPlaying] = useState(null)
    const [volume, setVolume] = useState(startingVolume ? startingVolume : 10)

    const [playingStorage, setPlayingStorage] = useState(null)
    const [working, setWorking] = useState(true)


    useEffect(() => {
        
        const songLogic = () => {
            const currentMinutes = new Date().getMinutes()
            if (currentMinutes >= 0 && currentMinutes < 5 || (currentMinutes >= 30 && currentMinutes < 35)) {
                setWorking(false)
    
            }
            else {
                setWorking(true)
            }
    
        }

        setInterval(songLogic, 1000)}, [])
    useEffect(() => {
        const handleWorking = (working) => {
            if (!working) {
                setPlayingStorage(playing)
                setPlaying(null)
            } 
            else {
                setPlaying(playingStorage)
            }
        
        }
        
        handleWorking()
    }, [working])

    return (<>
        <Sound
            url={working ? '' : breakAudio}
            playStatus={Sound.status.PLAYING}
            loop
        // onPlaying gets rendered every second, no clue why
        // onPlaying={() => setPlayCount(count => count + 1)}
        />
        {/* {playCount < 1 && <Button type='primary'style={{marginTop: 16, marginBottom: 16}} onClick={() => setAllowAutoPlayHack(true)}>allow sound to playing */}
        {/* onPlay={() => setPlaying(1)}</Button>} */}
        <Row>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=hHW1oY26kxQ'
                    volume={volume / 10}
                    light
                    playing={playing === 1}
                    onReady={() => setPlaying(1)}

                    onPlay={() => setPlaying(1)}
                    width='100%'
                    height='100%'
                />
            </div></Col>

            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=2atQnvunGCo'
                    volume={volume / 10}
                    light
                    playing={playing === 2}
                    onReady={() => setPlaying(2)}
                    onPlay={() => setPlaying(2)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=ZmNoiihmTXs'
                    volume={volume / 10}
                    light
                    playing={playing === 3}
                    onReady={() => setPlaying(3)}
                    onPlay={() => setPlaying(3)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
        </Row>
        <Row>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=XULUBg_ZcAU'
                    volume={volume / 10}
                    light

                    playing={playing === 4}
                    onReady={() => setPlaying(4)}
                    onPlay={() => setPlaying(4)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=-WOA1Dr2EUo'
                    volume={volume / 10}
                    light
                    playing={playing === 5}
                    onReady={() => setPlaying(5)}
                    onPlay={() => setPlaying(5)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=j24Lh9BYS-4'
                    volume={volume / 10}
                    light
                    playing={playing === 6}
                    onReady={() => setPlaying(6)}
                    onPlay={() => setPlaying(6)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
        </Row><Row>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=05689ErDUdM'
                    volume={volume / 10}
                    light
                    playing={playing === 7}
                    onReady={() => setPlaying(7)}
                    onPlay={() => setPlaying(7)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=IjMESxJdWkg'
                    volume={volume / 10}
                    light
                    playing={playing === 8}
                    onReady={() => setPlaying(8)}
                    onPlay={() => setPlaying(8)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
            <Col span={8}><div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url='https://www.youtube.com/watch?v=L9Q1HUdUMp0'
                    volume={volume / 10}
                    light
                    playing={playing === 9}
                    onReady={() => setPlaying(9)}
                    onPlay={() => setPlaying(9)}
                    width='100%'
                    height='100%'
                />
            </div></Col>
        </Row>
        <Row type='flex' justify='center'>
            <IconSlider volume={volume} setVolume={setVolume}></IconSlider>
        </Row>
    </>
    )

}


export default SoundPlayer