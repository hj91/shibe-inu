# ShibeInu Simulator

This is a Node.js module that allows you to simulate a Shiba Inu dog's behavior. You can feed it, play with it, and manage its needs. 

## Installation

You can install the module by running:

```bash
npm install shibe-inu
```

## Usage

Import the `ShibeInu` and `State` classes from the module:

```javascript
const { ShibeInu, State } = require('shibeinu');
```

Create an instance of the `ShibeInu` class:

```javascript
const myShibe = new ShibeInu();
```

You can then use the different methods available on the `ShibeInu` class to interact with your Shibe Inu:

```javascript
myShibe.feed();
myShibe.play();
myShibe.sleep();
myShibe.wakeUp();
myShibe.cleanPoop();
myShibe.exercise();
myShibe.update();
console.log(myShibe.bark());
console.log(myShibe.wagTail());
```

## State

The `State` object has the following keys:

- AWAKE: "awake"
- SLEEPING: "sleeping"
- HUNGRY: "hungry"
- EATING: "eating"
- PLAYING: "playing"
- POOPING: "pooping"
- BORED: "bored"
- ANGRY: "angry"
- HAPPY: "happy"
- WAGGING_TAIL: "wagging tail"
- BARKING: "barking"

These can be used to compare to the current state of your Shiba Inu.

## Methods

Here is a list of the methods you can call on a `ShibeInu` instance, along with a brief description:

- `feed()`: Feeds the Shiba Inu, increasing its energy and setting its state to eating.
- `play()`: Plays with the Shiba Inu, decreasing its energy and setting its state to playing.
- `sleep()`: Puts the Shiba Inu to sleep, increasing its energy.
- `wakeUp()`: Wakes up the Shiba Inu.
- `cleanPoop()`: Cleans up after the Shiba Inu, resetting its poop amount and potentially improving its mood.
- `exercise()`: Lets the Shiba Inu exercise, increasing its health and decreasing its energy.
- `update()`: Updates the state of the Shiba Inu based on the current time.
- `bark()`: Makes the Shiba Inu bark, if it's not sleeping and is either hungry, angry, or bored.
- `wagTail()`: Makes the Shiba Inu wag its tail, if it's happy or playing.

## Author

[Harshad Joshi](https://github.com/hj91)

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.
