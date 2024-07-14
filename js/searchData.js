import { Fetcher } from "./apiFetcher.js";

export class SearchData {
    constructor() {
        this.meals = undefined;
        this.status = false;
    }
    async init(key,val='',source='search') {
        const fetcher = new Fetcher();
        const result = await fetcher.get(source,key,val);
        this.status = result[0];
        this.meals = result[1];
    }
}