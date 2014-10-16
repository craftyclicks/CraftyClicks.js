/*!
 * Crafty Clicks API Wrapper v1.1.0
 * https://github.com/dwmsw/CraftyClicks.js
 *
 * Copyright 2014, Digital Web Media Limited
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Date: 2014-10-15
 */


/**
 * Lets define the CraftyClicksForm Constructor
 * @param {string} apiKey Your Crafty Clicks API Key
 */
function CraftyClicksForm(apiKey) {
    CraftyClicks.call(this, apiKey);
    this.button = '';
  
}

/**
 * Copy the CraftyClicks prototype object into the CraftyClicksForm prototype object
 * @type {[type]}
 */
CraftyClicksForm.prototype = Object.create(CraftyClicks.prototype);

/**
 * This is the search function
 * @param {element} theButton   The element to watch for clicks
 * @param {element} thePostcode The element to get the value of the postcode from
 */
CraftyClicksForm.prototype.FrontSearch = function(theButton, thePostcode) {
    // Assign elements to the CCF object
    this.postCodeElement = thePostcode;
    this.button = theButton;
    // Bind button click to AddressLookup
    this.button.addEventListener('click', this.AddressLookup.bind(this), false);
}

/**
 * This will do the actual heavy lifting of this extension
 */
CraftyClicksForm.prototype.AddressLookup = function(event) { 
    // Prevent submitting if inside form
    event.preventDefault();

    // Check if any selects are in the DOM and delete if they are remove them
    var oldSelect = document.querySelectorAll('.CCFormSelect');
    if (oldSelect.length !== 0) {
        oldSelect[0].parentNode.removeChild(oldSelect[0]);
    }
  
    // Do search
    this.search('rapid', this.postCodeElement.value);
    // Get town
    this.town = this.getTown(); 
    // Get locality
    this.locality = this.getLocality();
    // Get County    
    this.county = this.getCounty();    
    // Get Postcode
    this.postCode = this.getPostcode();
    // Pull adresses into a variable
    this.addresses = this.getAddresses();
  
    // Create a select element
    this.select = document.createElement("select");
    // Assign the 'CCFormSelect' class to the select
    if (this.select.classList) {
        this.select.classList.add('CCFormSelect');
    } else {
        this.select.className += ' ' + 'CCFormSelect';
    }
    // Insert the select next to the button
    this.button.parentNode.insertBefore(this.select, this.button.nextSibling);
    
    // Creare the initial option
    var option = document.createElement("option");
    option.value = "";
    option.text = "Select an address";
    this.select.appendChild(option);
  
    // Loop through all returned addresses
    for (var i = 0; i < this.addresses.length; i++) {
        // Create option
        var option = document.createElement("option");
        // Set current address
        var current = this.addresses[i];
        // Empty array to hold the parts
        var parts = [];  
        // Check if the organisation name is set
        if (current.organisation_name !== "") {
            parts.push(current.organisation_name);
        } 
        // Check if the building name is set
        if (current.building_name !== "") {
            parts.push(current.building_name);
        }
        // Check if the building number is set
        if (current.building_number !== "") {
            parts.push(current.building_number);
        }
        // Implode the array using a comma followed by a space
        current.name = parts.join(", ");
        // Add the imploded name to the initial address object
        this.addresses[i].fullName = current.name;
        // Join the town, county and postcode to the name variable
        current.name += ', ' + this.town + ', ' + this.county + ', ' + this.postCode;
        // Set the option key to the array key
        option.value = i;
        // Set the option name to the imploded address
        option.text = current.name;
        // Append the option to the select
        this.select.appendChild(option);
    }
  // Bind a change event to the ReturnAddress object
  this.select.addEventListener('change', this.ReturnAddress.bind(this), false);
}

/**
 * Assign the chosen values into the form fields
 */
CraftyClicksForm.prototype.ReturnAddress = function() {
    // Use the form elements and assign the chosen values to them
    this.form.address.value = this.addresses[this.select.value].fullName;
    this.form.locality.value = this.locality;
    this.form.town.value = this.town;    
    this.form.county.value = this.county;    
    this.form.postcode.value = this.postCode;
}

/**
 * Set the form fields internally
 * @param {object} theForm An object holding the form fields
 */
CraftyClicksForm.prototype.setForm = function(theForm) {
    // Use the supplied form object to grab the form elements based upon their ID. 
    this.form = {};
    this.form.address = document.getElementById(theForm.address);
    this.form.locality = document.getElementById(theForm.locality);
    this.form.town = document.getElementById(theForm.town);
    this.form.county = document.getElementById(theForm.county);
    this.form.postcode = document.getElementById(theForm.postcode);
}