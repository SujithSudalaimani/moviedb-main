const axios = require('axios');

exports.handler = async function(event, context) {
  const { search, title, page = 1 } = event.queryStringParameters;
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const baseUrl = 'https://www.omdbapi.com/';
  
  try {
    let params = {
      apikey: OMDB_API_KEY,
      page: page
    };

    // Determine if it's a search or detail request
    if (search) {
      params.s = search;
    } else if (title) {
      params.t = title;
      delete params.page; // No pagination for single movie
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing search or title parameter' })
      };
    }

    const response = await axios.get(baseUrl, { params });
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};