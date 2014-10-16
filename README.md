#CraftyClicks.js

CraftyClicks.js is a JavaScript wrapper for the [CraftyClicks](http://craftyclicks.co.uk) API.

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

#CraftyClicksForm.js

CraftyClicksForm.js is an extension to the CraftyClicks.js library. It allows easy integration with forms, by passing an object that specifies the relationship of the form with the API fields. Then when a search is done, the wrapper will update your form with the selected data.

## Usage

Using CraftyClicksForm is fairly simple, you have to set up an object to relates your form to the internal fields using your form field ID's (see below)

```javascript
var form = {
    "address" : "AddressID",
    "locality" : "LocalityID",
    "town" : "TownID",
    "county" : "CountyID",
    "postcode" : "PostcodeID"
}
```

Once this object is set up, you can then call the instance of `CraftyClicksForm`:

```javascript
// Grab the Button element that will be used to check for clicks
var myAddress = document.getElementById('LookForAddress');
// Grab the postcode input element that will be used
var myPostcode = document.getElementById('AddressPostcode');
// New CraftyClicksForm instance
var CC = new CraftyClicksForm('YOUR API KEY');
// Pass form fields to CC
CC.setForm(form);
// Run the search
CC.FrontSearch(myAddress, myPostcode);
```

## Demos
You can see a basic demo at [Codepen.io](http://codepen.io/darylldoyle/pen/IjAly/) or check the `demos` directory in the repo.