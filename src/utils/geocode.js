
const request=require('request')
const geocode =(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWtyMTEiLCJhIjoiY2syYm5pNGgxMDNtdDNtcWRtaXQ5ZDRuYSJ9.PSe6Chj0l2iBZwYNPwnbng&limit=1'
    request({url,json:true},(error,response)=>{
        // console.log(response);
        if (error) {
          callback('Unable to connect to location services ', response);
        } else if (response.body.features.length==0) {
          callback('unable to find location try to search another one', response);
        } else {
          callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
          })
        }
      })
      
}
module.exports=geocode