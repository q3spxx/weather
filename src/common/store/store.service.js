import { Stream } from '../stream';

class Store extends Stream {
    constructor() {
        super();
        this.state = {};
        this.prevState = {};
    }

    setState(state) {
        this.prevState = this.state;

        this.state = { ...this.state, ...state };

        this.next();
    }

    getState() {
        return this.state;
    }

    getPrevState() {
        return this.prevState;
    }

    initialize(initialState) {
        this.state = { ...initialState };
        this.prevState = { ...initialState };
    }
}

export default new Store();
