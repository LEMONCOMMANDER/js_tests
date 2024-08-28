
//axios is a npm install that is for api calls - installed 8/28/24

// function ask() {
//     let response = .get("https://bored-api.appbrewery.com/random");
//     console.log(response);
// };

// ask();

///see: https://www.freecodecamp.org/news/javascript-get-request-tutorial/


fetch("https://bored-api.appbrewery.com/random")
    .then((response) => response.json())
    .then((json) => console.log(json)); //takes the json from the first .then and logs it


//fetch is a native call that points to the url given
// the first .then takes the response object and uses the .json method to convert the stream of data from the request and
    //formats it into a json.

// from GPT:

    // What it represents: Inside the arrow function (response) =>, the response parameter is the Response object 
        // returned by the fetch call. This object contains all the information about the HTTP response, 
        // including the status code, headers, and the body of the response (which is often in a stream format).

// ME: Response, with a capital R, is the returned information from an api call. In this case, the data received from the 
    //fetch request

    // What it does: response.json() is a method of the Response object that reads the response body and parses it as JSON. 
        // This method returns another Promise that resolves to the parsed JSON data (which is typically a 
        // JavaScript object or array).
        // On the right side of the arrow (=>): The response.json() part is executed, and the result 
        // (a new Promise that resolves to the JSON data) is returned from the arrow function.

    // What’s Actually Happening:

        // Before the Arrow (response):
            // The response parameter is the Response object that fetch resolves to.
            
        // After the Arrow (response.json()):
            // The response.json() method is called on the Response object to extract and parse the JSON data 
            // from the response body. The function returns a new Promise that will resolve to the JSON data.