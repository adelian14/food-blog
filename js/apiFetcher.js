export class Fetcher {
    constructor() {
        this.base = 'https://www.themealdb.com/api/json/v1/1';
    }
    async get(source, key, val = '') {
        try {
            let url = `${this.base}/${source}.php`
            if(key) url+=`?${key}=${val}`;
            const response = await fetch(url);
            if (response.status == 200) {
                const data = await response.json();
                return [true, data];
            }
            else {
                const data = await response.json();
                console.log(response.statusText);
                return [false, data];
            }
        }
        catch (error) {
            console.log(error);
            return [false, error];
        }
    }
}