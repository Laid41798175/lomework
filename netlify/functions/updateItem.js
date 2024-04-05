// /netlify/functions/updateItem.js

const AWS = require('aws-sdk');

// AWS SDK 구성
const dynamodb = new AWS.DynamoDB({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.handler = async (event) => {
    // DynamoDB 업데이트 파라미터
    const params = JSON.parse(event.body);

    try {
        const data = await dynamodb.updateItem(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item updated successfully", data }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error updating item", details: err }),
        };
    }
};
