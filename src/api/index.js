// For including venue details with Foursquare API
// API call guidelines https://developer.foursquare.com/docs/api

// Items in this class are used to fill in fetch request
// Format should be like: https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD
class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2';
  }

  static auth() {
    const keys = {
      client_id: '342ZVQQ0DRCMR2ERCT3OO0N3FUNZS0KPVQCYQVLW1AGUQ22R',
      client_secret: 'TFERMLJWIHNHVDG421H1ATNIVMNCNCAZKTQXZB5QX2ZXP0HO',
      v: '20181004'
    };

    // Object.keys() returns an array of a given object's own property names
    return Object.keys(keys)
      // Generates new array that is result of calling provided function on every element on calling array
      // For each property name (key) of keys object in newly generated array, generating a string, in the format property name/key=[property value, accessed with bracket notation]
      .map(key => `${key}=${keys[key]}`)
      // Joins elements of array into a string, separated with whatever is passed in as argument. So output of auth() is like key=value&key=value&key=value
      .join('&');
  }

  static urlBuilder(urlParams) {
    if (!urlParams) {
      return '';
    }

    // Object.keys() returns an array of a given object's own property names
    return Object.keys(urlParams)
    // Generates new array that is result of calling provided function on every element on calling array
    // For each property name (key) of keys object in newly generated array, generating a string, in the format property name/key=[property value, accessed with bracket notation]
      .map(key => `${key}=${urlParams[key]}`)
      .join('&');
  }

  static headers() {
    return {
      Accept: 'application/json'
    };
  }

  // endpoint: anything after base URL, corresponding to Foursquare's venue endpoints, such as /venues/search). Method: PUT, GET, POST, etc. urlParam: venue parameters (such as 'near', 'intent', 'radius')
  // Note: Verified credit card; I am in Foursquare's Personal Tier, allowing for 99,500 Regular API Calls per day and 500 Premium API Calls per day
  static basicFetch(endpoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };

    // fetch() returns a promise, which resolves to response sent back from the server. Once promise resolves, then() used to convert response to json
    return fetch(`${Helper.baseURL()}${endpoint}?${Helper.urlBuilder(urlParams)}&${Helper.auth()}`,
      requestData
    // json() method of Fetch API's Body mixin takes server's response stream and reads it to completion, then returns a promise that resolves with result of parsing body text as JSON (it converts string received from server to a JSON object)
    ).then(res => res.json());
  }
}

export default class FoursquareAPI {
  static getVenueDetails(VENUE_ID) {
    return Helper.basicFetch(`/venues/${VENUE_ID}`, 'GET');
  }

  static search(urlParams) {
    return Helper.basicFetch('/venues/search', 'GET', urlParams);
  }

  static getVenuePhotos(VENUE_ID) {
    return Helper.basicFetch(`/venues/${VENUE_ID}/photos`, 'GET');
  }
}
