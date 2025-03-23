import fetch from 'node-fetch';

// Endpoints and API keys
export const HF_AUTH_ENDPOINT = "https://hypefury-dev.firebaseapp.com/api/externalApps/auth";
export const HF_SCHEDULE_ENDPOINT = "https://hypefury-dev.firebaseapp.com/api/externalApps/posts/save";
export const HF_PARTNER_KEY = "YzVhYTJiYjYtODFiOC00ZDJkLWJjYWEtNTQyNzYxOTdmYTZl";
export const HF_API_KEY = process.env.HF_API_KEY;

/**
 * Makes requests to the Hypefury API
 * @param url The API endpoint URL
 * @param body Optional request body for POST requests
 * @returns API response data
 */
export async function makeHfRequest(url: string, body?: string) {
    if (!HF_API_KEY) {
        console.error('HF_API_KEY is not defined');
        return {
            statusCode: 500,
            message: 'API key is missing',
        };
    }

    const headers = {
        "Authorization": `Bearer ${HF_PARTNER_KEY}:${HF_API_KEY}`,
        "Content-Type": "application/json"
    };

    console.error(`Making request to ${url}`);
    
    try {
        let response;
        if (body) {
            console.error('POST request with body');
            response = await fetch(url, {
                method: 'POST',
                headers, 
                body,
                timeout: 30000
            });
        } else {
            console.error('GET request');
            response = await fetch(url, {
                method: 'GET',
                headers,
                timeout: 30000
            });
        }

        console.error(`Response status: ${response.status}`);
        const responseText = await response.text();
        
        try {
            return responseText ? JSON.parse(responseText) : null;
        } catch (jsonError) {
            console.error('Error parsing JSON response:', jsonError);
            console.error('Raw response:', responseText);
            return {
                statusCode: response.status,
                message: responseText,
            };
        }
    } catch (error) {
        console.error('Network error in makeHfRequest:', error);
        return {
            statusCode: 500,
            message: `Network error: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
} 