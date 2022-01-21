//----------------------------------------------------------------------------------------------------------------------
// This function is used to fetch data to backend and after receiving response its returning it
//----------------------------------------------------------------------------------------------------------------------
export async function handleFetch (url,jsonData,method){
    const response = await fetch(url, {
        method: method,
        // headers:{"Content-type": "application/json"},
        body: JSON.stringify(jsonData),

    })

    if (response.ok) {
        console.log(response)
        return response;
    }
    else {
        const error = new Error(response.status.toString() ?? 'unknown')
        return Promise.reject(error)
    }
}
//----------------------------------------------------------------------------------------------------------------------