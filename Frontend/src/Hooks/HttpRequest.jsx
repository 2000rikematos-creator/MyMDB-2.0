import React from "react"

async function sendRequest(url, method = "GET", body = null){
   
    const options = {method, headers:{"Content-Type":"application/json"}, credentials:"include"}

    if(body){
        options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData.message || "request failed")
        
    }
    return await response.json();
    
}

export default sendRequest