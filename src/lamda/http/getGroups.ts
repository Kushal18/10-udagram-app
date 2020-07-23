import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lamda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient();

const groupsTable = process.env.GROUPS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      
    const result = await docClient.scan({ // Call parameters
        TableName: groupsTable
    }).promise()

    const items = result.Items;

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify({
            items
        }),
    };
      
    return response;
};

