export class Stream {
    constructor() {
        this.subscribers = [];
    }

    next(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback) {
        for (let i = 0; i < this.subscribers.length; i += 1) {
            if (callback === this.subscribers[i]) {
                this.subscribers.splice(i, 1);
                return;
            }
        }
    }
}
