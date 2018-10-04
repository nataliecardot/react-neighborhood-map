// For including venue details with Foursquare

class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2';
  }

  static auth() {
    const keys = {
      client_id: '342ZVQQ0DRCMR2ERCT3OO0N3FUNZS0KPVQCYQVLW1AGUQ22R',
      client_secret: 'E2H5EWNQ5X4LTNXM31WHPETUCPTXKB1FDWQDC15JEGVVEOYM',
      v: '20181002'
    };

    // Returns an array of a given object's own property names
    return Object.keys(keys)
      // Generates new array that is result of calling provided function on every element on calling array
      .map(key => `${key}=${keys[key]}`)
      // Joins elements of array into a string, separated with whatever is passed in as argument
      .join('&');
  }

  static urlBuilder(urlParams) {
    if (!urlParams) {
      return '';
    } else {
      return Object.keys(urlParams).map(key =>    `${key}=${urlParams[key]}`).join('&');
    }
  }

  static headers() {
    return {
      Accept: 'application/json'
    };
  }

  // endpoint: anything after base URL. Method: PUT, GET, POST, etc. urlParam: venue parameters (such as 'near', 'intent', 'radius')
  static basicFetch(endpoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };

    //  fetch() returns a promise, which resolves to response sent back from the server. Once promise resolves, then() used to convert response to json
    return fetch(
      `${Helper.baseURL()}${endpoint}?{Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
    // json() method of Fetch API's Body mixin takes server's response stream and reads it to completion, then returns a promise that resolves with result of parsing body text as JSON (it converts string received from server to a JSON object)
    ).then(res => res.json());
  }
}

export default class FoursquareAPI {
  static search(urlParams) {
    return Helper.basicFetch('/venues/search', 'GET', urlParams);
  }

  static getVenueDetails(VENUE_ID) {
    return Helper.basicFetch(`/venues/${VENUE_ID}`, 'GET')
  }

  static getVenuePhotos(VENUE_ID) {
    return Helper.basicFetch(`/venues/${VENUE_ID}/photos`, 'GET');
  }
}
