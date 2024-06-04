const AWS = require('aws-sdk');

require('dotenv').config();

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const scanParams = {
  TableName: 'expedition'
};

const updateEachItem = (items) => {
items.forEach((item) => {
    let newState;
    if (item['state'][3] === 'b') {
    newState = 'aaacaaaaa';
    } else {
    newState = 'aaaaaaaaa';
    }

    const updateParams = {
    TableName: 'expedition',
    Key: {
        'owner': item['owner'],
        'nickname': item['nickname']
    },
    UpdateExpression: 'set #state = :newState',
    ExpressionAttributeNames: {
        '#state': 'state' // 업데이트할 속성명
    },
    ExpressionAttributeValues: {
        ':newState': newState // 새로운 상태값
    }
    };

    dynamoDB.update(updateParams, function(err, data) {
    if (err) {
        console.error('업데이트 실패:', err);
    } else {
        console.log('업데이트 성공:', data);
    }
    });
  });
};
  

dynamoDB.scan(scanParams, function(err, data) {
  if (err) {
    console.log('스캔 실패:', err);
  } else {
    updateEachItem(data.Items);
  }
});