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
    const headers = {
        "Authorization": `Bearer ${HF_PARTNER_KEY}:${HF_API_KEY}`,
        "Content-Type": "application/json"
    };

    try {
        let response;
        if (body) {
            response = await fetch(url, {
                method: 'POST',
                headers, 
                body,
                timeout: 30000
            });
        } else {
            response = await fetch(url, {
                method: 'GET',
                headers,
                timeout: 30000
            });
        }

        const responseText = await response.text();
        
        try {
            return responseText ? JSON.parse(responseText) : null;
        } catch (jsonError) {
            return {
                statusCode: response.status,
                message: responseText,
            };
        }
    } catch (error) {
        // Remove console.error - it breaks MCP Inspector
        return {
            statusCode: 500,
            message: 'Network error',
        };
    }
} 