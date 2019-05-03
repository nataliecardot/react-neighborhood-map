Seattle Scoops
======

This app was built using React as a project for Udacity's Front-End Web Developer Nanodegree program. The default map displays ice cream shops in the Seattle area and allows for viewing data (the name and an image) associated with individual shops.

### Get Started

To launch the project:

**[View online](https://nataliecardot.com/seattle-scoops/)**

**View locally**
1. Clone the repository
2. Using a command line tool, navigate to the directory's location
3. Run `npm install`, which installs all modules listed as dependencies in package.json.
4. Run `npm start` to start the development server, opening the app in your default browser. (The command causes node to look for a scripts object in your package.json file, which in this case specifies "react-scripts start."). You also may open the app on the local server by navigating to http://localhost:3000/ in your browser.

### Service Worker

A service worker for caching requests to the app's assets for offline use is available for use in the production build only. To run this version, run `npm install -g serve` then `serve -s build`, which serves the project on port 5000 (navigate to http://localhost:5000).

### Dependencies

This project's code was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), which installs the packages `react`, `react-dom`, and `react-scripts`. Additionally, `react-scripts` installs Babel, webpack, and `webpack-dev-server`, which provides auto-reload behavior, as well as provides a service worker.

I utilized the Google Maps API and the [react-google-maps](https://github.com/tomchentw/react-google-maps) component to integrate it into my app.

To display venue information for clicked markers, I used the [Foursquare Places API](https://developer.foursquare.com/places-api).

To deploy to GitHub Pages, I used the `gh-pages` [package](https://www.npmjs.com/package/gh-pages), with the help of [this tutorial](https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d).

### Future Improvements

* On mobile, use state to close sidebar when a venue from the list is selected
* Increase 'x' size on venue popup in mobile view
* Change color/size of 'x' that appears to clear input text
