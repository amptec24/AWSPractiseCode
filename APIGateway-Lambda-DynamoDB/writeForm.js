// NB: Don't forgot to create a role that the lambda function can use to read and wirte in the DynamoDB Table
// Loads in the AWS SDK
const AWS = require('aws-sdk');

// Creates the document client specifing the region, in my case it eu-west-2
const Ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

exports.handler = async (event, context, callback) => {
    // Captures the requestId from the context message
    const requestId = context.awsRequestId;

    // Handle promise fulfilled/rejected states
    await createMessage(requestId).then(() => {
        callback(null, {
            statusCode: 201,
            body: '',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }).catch((err) => {
        console.error(err)
    })
};

// Function createMessage
// Writes message to DynamoDb table Form 
function createMessage(requestId) {
    const params = {
        TableName: 'Form',
        Item: {
            'formId' : requestId,
            'message' : 'Hello from lambda'
        }
    }
    return Ddb.put(params).promise();
}