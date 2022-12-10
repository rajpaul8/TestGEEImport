/* This is a demo to of importing js file from github to GEE

 This is a function to calculate index NDVI of provided sentinel image

 To call this function on GEE use:
 var ndviFunc = require('users/rajpaul83/NDVIS2.js')
*/
function maskS2clouds(image) {
    var qa = image.select('QA60');
  
    // Bits 10 and 11 are clouds and cirrus, respectively.
    var cloudBitMask = 1 << 10;
    var cirrusBitMask = 1 << 11;
  
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
        .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  
    return image.updateMask(mask).divide(10000);
  }

// Exporting NDVI function which accepts 4 args... S2ImageCollection, geometry,  fromDate & toDate and return a collection of NDVI Images 
exports.NDVIS2Func = function(S2_Image, geometry, fromDate, toDate){
    var filteredS2Image = S2_Image.filterDate(fromDate, toDate)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20)).filterBounds(geometry).map(function(image){return image.clip(geometry)})
    .map(maskS2clouds);

    var ndviCalc = filteredS2Image.map(function(image){
        return image.normalizedDifference(['B8','B4'])});

   return ndviCalc;     
}

