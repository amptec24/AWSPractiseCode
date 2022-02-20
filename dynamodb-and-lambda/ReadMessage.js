// NB: Don't forgot to create a role that the lambda function can use to read and wirte in the DynamoDB Table
// Loads in the AWS SDK
const AWS = require('aws-sdk'); 

// Creates the document client specifing the region, in my case it eu-west-2
const Ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'}); 

exports.handler = async (event, context, callback) => {
    // Handle promise fulfilled/rejected states
    await readMessage().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.message)
        });
        callback(null, {
            // If success return 200, and items
            statusCode: 200,
            body: data.Items,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
    }).catch((err) => {
        // If an error occurs write to the console
        console.error(err);
    })
};

// Function readMessage
// Reads 10 messages from the DynamoDb table ContactUs
// Returns promise
function readMessage() {
    const params = {
        TableName: 'ContactUs',
        Limit: 10
    }
    return Ddb.scan(params).promise();
}