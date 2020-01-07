import store from './store.service';

export class Component {
    constructor(pureProps) {
        this.handleUpdate = this.handleUpdate.bind(this);
        this.pureProps = pureProps || [];
        store.subscribe(this.handleUpdate);
        this.props = store.getState();
        this.mounted = false;

        this.handleUpdate();
    }

    setState(state) {
        store.setState(state);
    }

    handleUpdate() {
        this.props = store.getState();
        this.prevProps = store.getPrevState();
        if (this.shouldComponentUpdate()) {
            if (this.render) {
                this.render();
            }

            if (this.componentDidUpdate) {
                this.componentDidUpdate();
            }
        }

        if (!this.mounted) {
            if (this.componentDidMount) {
                this.componentDidMount();
            }
            this.mounted = true;
        }
    }

    shouldComponentUpdate() {
        for (const propName of this.pureProps) {
            if (this.props[propName] !== this.prevProps[propName]) {
                return true;
            }
        }

        return false;
    }
}
