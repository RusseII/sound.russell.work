import React, { useState, useEffect } from 'react';
import SoundPlayer from '../components/SoundPlayer'
import Leaderboard from '../components/Leaderboard'


const BackgroundNoise = () => {

  const [location, setLocation] = useState(null)
  const [leaderboard, setLeaderboard] = useState(null)


  const getCoords = async () => {
    update({city: "visit", state:'visit'})
    navigator.geolocation.getCurrentPosition(getLocation, (err) => console.log(err))
  }

  const getLocation = async ({ coords: { longitude, latitude } }) => {
    // hack me with the API and make everyone sad :(
    const url = `https://api.opencagedata.com/geocode/v1/json?key=11b9d7f2104c4b6bb9a860a8424ff3ba&q=${latitude}%2C${longitude}&pretty=1&no_annotations=1`
    const data = await fetch(url)
    const jsonData = await data.json()
    console.log(jsonData)
    setLocation(jsonData?.results?.[0]?.components)

  }


  const update = async (location) => {
    const url = 'https://4mpgsamyqb.execute-api.us-east-1.amazonaws.com/update_listen'
    const leaderboard = await fetch(url, { method: 'POST', body: JSON.stringify(location) })
    const leaderboardJson = await leaderboard.json()
    setLeaderboard(leaderboardJson)
  }

  const useMount = () =>  useEffect(() => {getCoords()}, [])
  useMount()

  useEffect(() => {
    const interval = setInterval(() =>
      update(location), 10000);
    return () => clearInterval(interval);
  }, [location]);



  return (<div><SoundPlayer /><Leaderboard dataSource={leaderboard} /></div>
  )

}

export default BackgroundNoise