import React from "react"

async function sendRequest(url, method = "GET", body = null){
   
    const options = {method, headers:{"Content-Type":"application/json"}, credentials:"include"}

    if(body){
        options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
   console.log("response is",response)
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log(errorData)
        throw new Error(errorData.message || "request failed")
        
    }
    return await response.json();
    
}

export default sendRequest