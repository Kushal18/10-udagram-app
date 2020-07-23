import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lamda'
import { uuid } from 'uuid';
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient();

const groupsTable = process.env.GROUPS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event);
    const itemId = uuid.v4();
    
    const parseBody = JSON.parse(event.body)

    const newItem = {
        id: itemId,
        ...parseBody
    }

    await docClient.put({
        TableName: groupsTable,
        Item: newItem
    }).promise()

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            newItem
        })
    }
};

