#CraftyClicks.js

CraftyClicks.js is a JavaScript wrapper for the [CraftyClicks](https://craftyclicks.co.uk) API.

You can access the API Documentation at the following URL: [https://craftyclicks.co.uk/api/jsonp-api-user-guide/](https://craftyclicks.co.uk/api/jsonp-api-user-guide/)

## Requirements
This wrapper is completely standalone and has no dependency on jQuery or any other JavaScript library or framework.

## Usage

Using this wrapper is fairly simple, it's just a case of calling a new instance of `CraftyClicks` and passing it your API key, from there you can use the `search` method to make searches. 

**Rapid Search**

```javascript
// Create a new instance of CraftyClicks
var test = new CraftyClicks('YOUR API KEY HERE');
// Pass it your preferred search method and postcode
test.search('rapid', 'AA11AA');
// Get the API response
var output = test.getAll();
// Log the output
console.log(output);
```

**Basic Search**

```javascript
// Create a new instance of CraftyClicks
var test = new CraftyClicks('YOUR API KEY HERE');
// Pass it your preferred search method and postcode
test.search('basic', 'AA11AA');
// Get the API response
var output = test.getAll();
// Log the output
console.log(output);
```

The wrapper will return the full API response, with no filtering. 

I'm hoping to add some specific getters in a later version for items but for now this will have to be done manually!
