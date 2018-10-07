// For including venue details with Foursquare API
// API call guidelines https://developer.foursquare.com/docs/api

// Items in this class are used to fill in fetch request
// Format should be like: https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD
class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2';
  }

  // Userless authentication
  static auth() {
    const keys = {
      client_id: '342ZVQQ0DRCMR2ERCT3OO0N3FUNZS0KPVQCYQVLW1AGUQ22R',
      client_secret: 'TFERMLJWIHNHVDG421H1ATNIVMNCNCAZKTQXZB5QX2ZXP0HO',
      v: '20181004'
    };

    // Object.keys() returns an array of a given object's own property names
    return Object.keys(keys)
      // .map() generates new array that is result of calling provided function on every element on calling array
      // For each property name (key) of keys object in newly generated array, generating a string, in the format property name/key=[property value, accessed with bracket notation]
      .map(key => `${key}=${keys[key]}`)
      // Joins elements of array into a string, separated with whatever is passed in as argument. So output of auth() is like key=value&key=value&key=value
      .join('&');
  }

  // Formatting venue search parameters (listed under "Parameters" in https://developer.foursquare.com/docs/api/venues/search) into format like name=MollyMoon&limit=10.
  static urlBuilder(searchParams) {
    if (!searchParams) {
      return '';
    }

    // Object.keys() returns an array of a given object's (searchParams) own property names
    return Object.keys(searchParams)
    // .map() generates new array that is result of calling provided function on every element on calling array
    // For each property name (key) of (searchParams) object in newly generated array, generating a string, in the format property name/key=[property value, accessed with bracket notation]
      .map(key => `${key}=${searchParams[key]}`)
      .join('&');
  }

  static headers() {
    return {
      Accept: 'application/json'
    };
  }

  // endpoint: Foursquare's venue endpoints, which follows base URL, such as /venues/search. Also can include venue ID in case of getVenueDetails and getVenuePhotos (static methods on FoursquareAPI). Some listed in https://developer.foursquare.com/docs/api/venues/details. searchParams: venue parameters (such as 'near', 'intent', 'radius'), listed in https://developer.foursquare.com/docs/api/venues/search. Note that default fetch HTTP method is GET, so no need to specify this in the request
  // Note: Verified credit card; I am in Foursquare's Personal Tier, allowing for about 10k Regular API Calls per day and 500 Premium API Calls per day
  static basicFetch(endpoint, searchParams) {
    let requestData = {
      headers: Helper.headers()
    };

    // fetch() returns a promise, which resolves to response sent back from the server. Once promise resolves, then() used to convert response to json
    return fetch(`${Helper.baseURL()}${endpoint}?${Helper.urlBuilder(searchParams)}&${Helper.auth()}`,
      requestData
    // json() method of Fetch API's Body mixin takes server's response stream and reads it to completion, then returns a promise that resolves with result of parsing body text as JSON (it converts string received from server to a JSON object)
    ).then(res => res.json());
  }
}

export default class FoursquareAPI {
  static getVenueDetails(VENUE_ID) {
    return Helper.basicFetch(`/venues/${VENUE_ID}`);
  }

  static search(searchParams) {
    return Helper.basicFetch('/venues/search', searchParams);
  }

  static getVenuePhotos(VENUE_ID) {
    return Helper.basicFetch(`/venues/${VENUE_ID}/photos`);
  }
}
