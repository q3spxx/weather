import { Stream } from '../../common/stream';
import './search.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-form-box');

export class Search {
    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this);

        this.submitStream = new Stream();
        searchForm.addEventListener('submit', this.handleSubmit);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { value } = searchInput;

        this.submitStream.next(value);
    }
}
