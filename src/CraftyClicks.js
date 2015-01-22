/*!
 * Crafty Clicks API Wrapper v2.0.0
 * https://github.com/dwmsw/CraftyClicks.js
 *
 * Copyright 2014, Digital Web Media Limited
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Date: 2014-10-15
 */


/**
 * Lets define the CraftyClicks Constructor
 * @param {string} apiKey Your Crafty Clicks API Key
 */
function CraftyClicks(apiKey) {
    
    if (apiKey) {
        this.apiKey = apiKey;
    } else {
        this.apiKey = 'xxxxx-xxxxx-xxxxx-xxxxx';
    }
    this.baseURL = 'https://pcls1.craftyclicks.co.uk/json/';
    this.postCode = '';
    this.result = '';

}

/**
 * Returns the complete API Response
 * @return {string} The JSON response
 */
CraftyClicks.prototype.getAll = function() {
    return this.result
};

CraftyClicks.prototype.search = function(searchType, postCode) {
    // Check for a postcode and either set it or throw an exception
    if (postCode) {
        this.postCode = postCode;
    } else {
        throw 'No postcode supplied';
    }

    // Check the requested search type and either call the appropriate method, or throw exception
    if (searchType == 'basic') {
        this.result = this.BasicAddress();
    } else if (searchType == 'rapid') {
        this.result = this.RapidAddress();
    } else {
        throw 'Invalid Search Type';
    }
    
    // Check for a response from Crafty Clicks that specifies an invalid API key used on a non-sandbox postcode
    if (this.result.town == "Thank you, CraftyClicks.co.uk") {
        throw "Please enter a valid API key or use the sandbox postcodes";
    }
  
    // Check for proper errors and throw exceptions if they're found    
    if (this.result.error_code) {
        throw this.result.error_msg;
    }
};

/**
 * Get the Addresses
 * @return {array} The Addresses
 */
CraftyClicks.prototype.getAddresses = function() {
    return this.result.delivery_points;
};

/**
 * Get the County
 * @return {string} The County
 */
CraftyClicks.prototype.getCounty = function() {
    return this.result.postal_county;
};

/**
 * Get the postcode
 * @return {string} The postcode
 */
CraftyClicks.prototype.getPostcode = function() {
    return this.result.postcode;
};

/**
 * Get the town
 * @return {string} The town
 */
CraftyClicks.prototype.getTown = function() {
    return this.result.town;
};

/**
 * Make a RapidAddress Request
 */
CraftyClicks.prototype.RapidAddress = function() {
    var endpoint = 'rapidaddress';
    return this.makeRequest(endpoint);
};

/**
 * Make a BasicAddress Request
 */
CraftyClicks.prototype.BasicAddress = function() {
    var endpoint = 'basicaddress';
    return this.makeRequest(endpoint);
};

/**
 * Make a request to the CraftyClicks API
 * @param  {string} endpoint The endpoint to fire requests on
 * @return {string}          The JSON response
 */
CraftyClicks.prototype.makeRequest = function(endpoint) {

    // Set up the URL
    var url = this.baseURL + endpoint + '?response=data_formatted&key=' + this.apiKey + '&postcode=' + this.postCode;

    // Create new XMLHttpRequest, has to be synchronous so we can handle response
    request = new XMLHttpRequest();
    request.open('GET', url, false);

    // Wait for change and then either JSON parse response text or throw exception for HTTP error
    request.onreadystatechange = function() {
        if (this.readyState === 4){
            if (this.status >= 200 && this.status < 400){
                // Success!
                data = JSON.parse(this.responseText);
            } else {
                throw 'HTTP Request Error';
            }
        }
    };
    // Send request
    request.send();
    // Nullify request object 
    request = null;
    // Return JSON data
    return data;
};
