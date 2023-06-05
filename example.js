const { ShibeInu, State } = require('./shibeinu');  // Adjust the path accordingly

const myShibe = new ShibeInu();

// Now you can use the myShibe object, e.g.
myShibe.feed();
console.log(`My shibe is now ${myShibe.state}`);

