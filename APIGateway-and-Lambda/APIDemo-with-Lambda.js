// Testing how a simply static page on S3 can chat to lambda via API Gate

exports.handler = async (event) => {
    
    const response = {
        statusCode: 200,
        // Add the header below so this can be access from differnet domains
        headers: {
            "Acess-Control-Allow-Orgin" : "*"
        },
        body: JSON.stringify('Hello from Lambda on 20.02.2022!'),
    };
    return response;
};


// NB: For the following error "Access to fetch NULL had been blocked by CORS poliy", please complete the follwoing steps
// Step 1. Ensure your lambda allows all headers > see APIDemo-with-Lambda.js file
// Step 2. Do back to API Gateway uder Resources > Click "Actions" > then click "Enable CORS" > Click "Enable CORS and replace exisiting CORS headers" > "Yes, replace exisiting values"
// Step 3. Redeploy your "GET" method
// Step 4. Retest the web page on S3 bucket or local machine