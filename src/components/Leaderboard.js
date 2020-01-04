
import React from 'react';
import {Table, Row, Col} from 'antd'


const columns = [
    {
      title: 'Location',
      // dataIndex: 'city',
      key: 'city',
      defaultFilteredValue: ['visit'],
      onFilter: (value,data) => data.city !== value,
      render: (text, data) => {
        const {city, state} = data
        return `${city}, ${state}`
      }
    },
    {
      title: 'Time',
      // dataIndex: 'seconds',
      key: 'seconds',
      sortOrder: 'decend',
      sorter: (a,b) => b.seconds - a.seconds,
      render: (data) => {
        var date = new Date(null);
        date.setSeconds(data.seconds); // specify value for SECONDS here
        var timeString = date.toISOString().substr(11, 8);
        return timeString
        
      }
    },
  ];

const LeaderBoard = ({dataSource}) => {
   

    return (<Row type='flex' justify='center'>
       <Col style={{backgroundColor: 'white'}} span={12}> <Table style={{}} dataSource={dataSource} columns={columns} pagination={false} /> </Col>
      
    </Row>
    )

}


export default LeaderBoard