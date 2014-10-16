// Set up the form object which relates fields to input ID's
var form = {
  "building" : "HouseName",
  "address1" : "Address1",
  "address2" : "Address2",
  "locality" : "Locality",
  "town" : "Town",
  "county" : "County",
  "postcode" : "Postcode"
}
// Grab the Button element
var myAddress = document.getElementById('LookForAddress');
// Grab the postcode input element
var myPostcode = document.getElementById('AddressPostcode');
// New CraftyClicksForm instance
var CC = new CraftyClicksForm();
// Set form fields
CC.setForm(form);
// Do Search
CC.FrontSearch(myAddress, myPostcode);