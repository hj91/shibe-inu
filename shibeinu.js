/**

 Copyright 2023 Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/


const fs = require('fs');

const State = {
    AWAKE: "awake",
    SLEEPING: "sleeping",
    HUNGRY: "hungry",
    EATING: "eating",
    PLAYING: "playing",
    POOPING: "pooping",
    BORED: "bored",
    ANGRY: "angry",
    HAPPY: "happy",
    WAGGING_TAIL: "wagging tail",
    BARKING: "barking"
}

class ShibeInu {

    constructor() {
        this.state = State.SLEEPING;
        this.emotion = "neutral";
        this.lastFeedTime = Date.now();
        this.poopAmount = 0;
        this.energyLevel = 100;
        this.health = 100;
        this.cleanliness = 100;
        this.restoreState();
    }

    restoreState() {
        try {
            const savedState = JSON.parse(fs.readFileSync('shibe_state.txt'));
            this.state = savedState.state;
            this.emotion = savedState.emotion;
            this.lastFeedTime = savedState.lastFeedTime;
            this.poopAmount = savedState.poopAmount;
            this.energyLevel = savedState.energyLevel;
            this.health = savedState.health;
            this.cleanliness = savedState.cleanliness;
        } catch (error) {
            console.log('State file not found, starting with defaults and creating state file.');
            this.saveState();
        }
    }

    saveState() {
        const savedState = JSON.stringify({
            state: this.state,
            emotion: this.emotion,
            lastFeedTime: this.lastFeedTime,
            poopAmount: this.poopAmount,
            energyLevel: this.energyLevel,
            health: this.health,
            cleanliness: this.cleanliness
        });
        fs.writeFileSync('shibe_state.txt', savedState);
    }

    feed() {
        if (this.state !== State.SLEEPING) {
            this.state = State.EATING;
            this.lastFeedTime = Date.now();
            this.energyLevel = Math.min(this.energyLevel + 30, 100);
            this.emotion = "satisfied";
            this.saveState();
        }
    }

    play() {
        if (this.state !== State.SLEEPING) {
            this.state = State.PLAYING;
            this.energyLevel = Math.max(this.energyLevel - 20, 0);
            this.emotion = "happy";
            this.saveState();
        }
    }

    sleep() {
        this.state = State.SLEEPING;
        this.energyLevel = Math.min(this.energyLevel + 50, 100);
        this.emotion = "neutral";
        this.saveState();
    }

    wakeUp() {
        if (this.state === State.SLEEPING) {
            this.state = State.AWAKE;
            this.saveState();
        }
    }

    cleanPoop() {
        this.poopAmount = 0;
        if (this.emotion === "angry") {
            this.emotion = "happy";
        }
        this.cleanliness = 100;
        this.saveState();
    }

    exercise() {
        if (this.state !== State.SLEEPING) {
            this.energyLevel = Math.max(this.energyLevel - 30, 0);
            this.health = Math.min(this.health + 10, 100);
            this.state = State.PLAYING;
            this.emotion = "happy";
            this.saveState();
        }
    }

    update() {
        const currentTime = Date.now();
        if (this.state === State.SLEEPING && currentTime - this.lastFeedTime > 2*60*60*1000) {
            this.poopAmount += 1;
            this.cleanliness = Math.max(this.cleanliness - 10, 0);
            this.saveState();
        } else if (this.state === State.AWAKE) {
            if (currentTime - this.lastFeedTime > 2*60*60*1000) {
                this.emotion = State.HUNGRY;
            } else if (this.poopAmount > 0) {
                this.emotion = State.ANGRY;
            } else if (this.state !== State.PLAYING) {
                this.emotion = State.BORED;
            }
            this.saveState();
        }
    }

    bark() {
        if (this.state === State.AWAKE && (this.emotion === State.HUNGRY || this.emotion === State.ANGRY || this.emotion === State.BORED)) {
            return "Barking";
        } else {
            return "Quiet";
        }
    }

    wagTail() {
        if (this.emotion === State.HAPPY || this.state === State.PLAYING) {
            return "Wagging tail";
        } else {
            return "Not wagging tail";
        }
    }
}

module.exports = {
    ShibeInu,
    State
};

// End of module
