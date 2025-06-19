import { handler } from './handler.js';

const event = {
    path: '/hello',
    httpMethod: 'GET',
    headers: {},
    body: null,
    requestContext: {},
    multiValueHeaders: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    isBase64Encoded: false
};

const context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'test',
    functionVersion: '$LATEST',
    memoryLimitInMB: 512,
    logGroupName: '/aws/lambda/test',
    logStreamName: 'test',
    requestId: 'test-request-id',
    awsRequestId: 'test-aws-request-id'
};

console.log('Testing handler...');
console.time('Handler execution');

handler(event, context)
    .then(result => {
        console.timeEnd('Handler execution');
        console.log('Handler result:', result);
        process.exit(0);
    })
    .catch(err => {
        console.timeEnd('Handler execution');
        console.error('Handler error:', err);
        process.exit(1);
    });

// Add timeout to prevent hanging
setTimeout(() => {
    console.error('Handler timed out after 10 seconds');
    process.exit(1);
}, 10000); 