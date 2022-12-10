/* This is a demo to of importing js file from github to GEE

 This is a function to calculate index NDVI of provided sentinel image

 To call this function on GEE use:
 var ndviFunc = require('users/rajpaul83/TestGEEImport:NDVIS2.js')
*/


// Exporting NDVI function which accepts 3 args... S2ImageCollection, fromDate & toDate and return a collection of NDVI Images 
