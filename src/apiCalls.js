import axios from 'axios';

export const orderPairs =async  () => {
    const resp = await axios.get('https://www.bitstamp.net/api/v2/trading-pairs-info/')
    .then(function (response){
       return response;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

    return resp
}
