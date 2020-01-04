
import React from 'react';
import { Table, Row, Col, Typography, Tag } from 'antd'
import styles from './Leaderboard.less'
const {Title} = Typography


const timeFormater = (hours, minutes, seconds) => {
  let hourString = ''
  let minuteString = ''
  let secondString = ''
  if (hours) {
    if (hours === 1) {
      hourString = `${hours} hour`
    }
    if (hours > 1) {
      hourString = `${hours} hours`
    }
  }

  if (minutes) {
    if (minutes === 1) {
      minuteString = `${minutes} minute`
    }
    if (minutes > 1) {
      minuteString = `${minutes} minutes`
    }
  }

  if (seconds) {
    if (seconds === 1) {
      secondString = `${seconds} second`
    }
    if (seconds > 1) {
      secondString = `${seconds} seconds`
    }
  }

  return `${hourString} ${minuteString} ${secondString}`

}


const LeaderBoard = ({ dataSource, location }) => {


  const highlight = (data) => {
    const { city, state } = location || {}
    // below wants null == undefined to evaulate to true
    // eslint-disable-next-line eqeqeq
    if (city == data.city && state == data.state) { return styles.selected }
    if (data.online) { return styles.online }
  }

  const columns = [
    {
      title: 'Location',
      // dataIndex: 'city',
      key: 'city',
      defaultFilteredValue: ['visit'],
      onFilter: (value, data) => data.city !== value,
      render: (text, data) => {
        const { city: userCity, state: userState } = location || {}
        let { city, state } = data
        if (!city & !state) {
          if (data.online) {
            return <div>{`No Location`}<Tag style={{marginLeft: 8}} color='#52c41a'>Online</Tag></div>
            }

          return 'No Location'
        }
  
        if (userCity === data.city && userState === data.state) {
          return <div>{`${city} ${state}`}<Tag style={{marginLeft: 8}} color='#1890ff'>Your Location</Tag></div>
        }
        if (!city) city = 'Unknown City'
        if (!state) state = 'Unknown State'

        if (data.online) {
        return <div>{`${city} ${state}`}<Tag style={{marginLeft: 8}} color='#52c41a'>Online</Tag></div>
        }
      
       
      
        return `${city}, ${state}`
      },
      width: '50%'
    },
    {
      title: 'Time spent on page',
      // dataIndex: 'seconds',
      key: 'seconds',
      sortOrder: 'decend',
      sorter: (a, b) => b.seconds - a.seconds,
      render: (data) => {
        const { seconds: totalSeconds } = data
        const hours = Math.floor(totalSeconds / 3600);
        const totalSecondsLeft = totalSeconds % 3600
        const minutes = Math.floor(totalSecondsLeft / 60);
        const seconds = totalSecondsLeft % 60;
        return timeFormater(hours, minutes, seconds)
  
      },
      width: '50%'
    },
  ];
  return (<Row  type='flex' justify='center'>
    <Col className={styles.box} xs={24} sm={20} md={16} lg={12} xl={8}> <Title style={{marginTop: 16}}>Leaderboard</Title> <Table rowClassName={highlight} dataSource={dataSource} columns={columns} pagination={false} /> </Col>

  </Row>
  )

}


export default LeaderBoard