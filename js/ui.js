import { UI_Helper } from "./uiHelper.js";
import { SearchData } from "./searchData.js";
const helper = new UI_Helper();
export class UI {
    constructor(data, ok, section) {
        this.data = undefined;
        if (ok) this.data = data;
        this.section = section;
        this.ok = ok;
    }
    showMeals() {
        helper.clearDiv(this.section);
        if (!this.ok) {
            $(this.section).html(helper.appendError());
            return;
        }
        let container = helper.createElement('div', 'my-container');
        let row = helper.createElement('div', 'flex flex-wrap');
        this.data.forEach(meal => {
            let box = helper.createElement('div', 'w-full md:w-1/2 lg:w-1/4 p-3');
            let inner = helper.createElement('div', 'group relative cursor-pointer rounded-md overflow-hidden');
            let overlay = helper.createElement('div', 'group-hover:translate-y-0 duration-500 absolute translate-y-80 top-0 bottom-0 start-0 end-0 bg-main-bg bg-opacity-70 flex px-3 items-center');
            let img = helper.createElement('img', 'w-full h-80 object-cover object-center');
            let p = helper.createElement('p', 'text-white text-4xl font-medium');
            $(p).html(meal.strMeal);
            $(img).attr('src', meal.strMealThumb);
            helper.nestElements(box, inner, img);
            helper.nestElements(inner, overlay, p);
            row.append(box);
            $(inner).click(async function () {
                helper.addLoader();
                const mealData = new SearchData();
                await mealData.init('i',`${meal.idMeal}`,'lookup');
                helper.removeLoader();
                let mealDataDisplayer = new UI(mealData.meals.meals[0], mealData.status, document.getElementById('single-meal'));
                mealDataDisplayer.showSingleMeal();
                $(`[role='main-section']:not(#single-meal)`).fadeOut(300);
                $('#single-meal').fadeIn(300);
            });
        });
        helper.nestElements(this.section, container, row);
    }
    showSingleMeal() {
        helper.clearDiv(this.section);
        if (!this.ok) {
            $(this.section).html(helper.appendError());
            return;
        }
        let box = '';
        let tags = this.data.strTags ? `<p class="text-white text-3xl mt-3"><span class="font-semibold">Tags : </span>${this.data.strTags}</p>` : '';
        for (let i = 1; i <= 20; i++) {
            if (!this.data['strIngredient' + i]) break;
            box += `
                <p class="my-1 py-1 px-2 me-1 rounded-md bg-cyan-300 inline-block">${this.data['strMeasure' + i]} ${this.data['strIngredient' + i]}</p>
            `
        }
        $(this.section).html(
            `
            <div class="my-container">
                <div class="flex justify-center lg:flex-row flex-col">
                    <div class="lg:w-[30%] w-full p-4">
                        <img src="${this.data.strMealThumb}" class="rounded-md w-full">
                        <p class="mt-3 px-2 text-white font-semibold text-3xl">${this.data.strMeal}</p>
                    </div>
                    <div class="lg:w-[70%] w-full p-4">
                        <p class="text-white font-bold text-4xl">Instructions</p>
                        <p class="text-white text-xl mt-3">${this.data.strInstructions}</p>
                        <p class="text-white text-3xl mt-3"><span class="font-semibold">Area : </span>${this.data.strArea}</p>
                        <p class="text-white text-3xl mt-3"><span class="font-semibold">Category : </span>${this.data.strCategory}</p>
                        <p class="text-white text-3xl mt-3"><span class="font-semibold">Ingredients :</span></p>
                        <div class="mt-2">
                            ${box}
                        </div>
                        ${tags}
                        <p class="my-5 py-2 px-3 rounded-md text-white bg-green-600 hover:bg-green-800 inline-block cursor-pointer duration-150 me-2" onclick="window.open('${this.data.strSource}')">Source</p>
                        <p class="my-5 py-2 px-3 rounded-md text-white bg-red-600 hover:bg-red-800 inline-block cursor-pointer duration-150" onclick="window.open('${this.data.strYoutube}')">YouTube</p>
                    </div>
                </div>
            </div>
            `
        );
        $(`[role='main-section']:not(#${$(this.section).attr('id')})`).fadeOut(200);
        $(this.section).fadeIn(200);
    }
    showCategories() {
        helper.clearDiv(this.section);
        if (!this.ok) {
            $(this.section).html(helper.appendError());
            return;
        }
        let container = helper.createElement('div', 'my-container');
        let row = helper.createElement('div', 'flex flex-wrap');
        this.data.forEach(meal => {
            let box = helper.createElement('div', 'w-full md:w-1/2 lg:w-1/4 p-3');
            let inner = helper.createElement('div', 'group relative cursor-pointer rounded-md overflow-hidden');
            let overlay = helper.createElement('div', 'group-hover:translate-y-0 text-center duration-500 absolute translate-y-48 top-0 bottom-0 start-0 end-0 bg-white bg-opacity-65 px-3');
            let img = helper.createElement('img', 'w-full h-48 object-cover object-center');
            let p = helper.createElement('p', 'text-3xl font-medium');
            let desc = helper.createElement('p', 'text-lg mt-4');
            $(p).html(meal.strCategory);
            $(desc).html(meal.strCategoryDescription);
            $(img).attr('src', meal.strCategoryThumb);
            helper.nestElements(box, inner, img);
            helper.nestElements(inner, overlay, p);
            helper.nestElements(overlay, desc);
            row.append(box);
            $(inner).click(async function () {
                helper.addLoader();
                const searchData = new SearchData();
                await searchData.init('c',meal.strCategory,'filter');
                helper.removeLoader();
                let dataDisplayer = new UI(searchData.meals.meals, searchData.status, document.getElementById('Home'));
                dataDisplayer.showMeals();
                $(`[role='main-section']:not(#Home)`).fadeOut(300);
                $('#Home').fadeIn(300);
            });
        });
        helper.nestElements(this.section, container, row);
    }
    showAreas() {
        helper.clearDiv(this.section);
        if (!this.ok) {
            $(this.section).html(helper.appendError());
            return;
        }
        let arr=[];
        for(let i = 0; i < Math.min(20,this.data.length); i++){
            arr.push(this.data[i]);
        }
        this.data=arr;
        let container = helper.createElement('div', 'my-container');
        let row = helper.createElement('div', 'flex flex-wrap');
        this.data.forEach(meal => {
            let box = helper.createElement('div', 'w-full md:w-1/2 lg:w-1/4 px-3 py-8');
            let inner = helper.createElement('div', 'cursor-pointer');
            let icon = helper.createElement('p', 'text-center text-white text-7xl font-medium');
            let p = helper.createElement('p', 'text-center mt-4 text-white text-2xl font-medium');
            $(icon).html('<i class="fa-solid fa-house"></i>');
            $(p).html(meal.strArea);
            helper.nestElements(box, inner, icon);
            helper.nestElements(inner, p);
            row.append(box);
            $(inner).click(async function () {
                helper.addLoader();
                const searchData = new SearchData();
                await searchData.init('a',meal.strArea,'filter');
                helper.removeLoader();
                let dataDisplayer = new UI(searchData.meals.meals, searchData.status, document.getElementById('Home'));
                dataDisplayer.showMeals();
                $(`[role='main-section']:not(#Home)`).fadeOut(300);
                $('#Home').fadeIn(300);
            });
        });
        helper.nestElements(this.section, container, row);
    }
    showIngredients() {
        helper.clearDiv(this.section);
        if (!this.ok) {
            $(this.section).html(helper.appendError());
            return;
        }
        let arr=[];
        for(let i = 0; i < Math.min(20,this.data.length); i++){
            arr.push(this.data[i]);
        }
        this.data=arr;
        let container = helper.createElement('div', 'my-container');
        let row = helper.createElement('div', 'flex flex-wrap');
        this.data.forEach(meal => {
            let box = helper.createElement('div', 'w-full md:w-1/2 lg:w-1/4 px-3 py-8');
            let inner = helper.createElement('div', 'cursor-pointer');
            let icon = helper.createElement('p', 'text-center text-white text-7xl font-medium');
            let p = helper.createElement('p', 'text-center mt-4 text-white text-2xl font-medium');
            let desc = helper.createElement('p', 'text-xl mt-4 text-white line-clamp-2');
            $(icon).html('<i class="fa-solid fa-drumstick-bite"></i>');
            $(p).html(meal.strIngredient);
            $(desc).html(meal.strDescription); 
            helper.nestElements(box, inner, icon);
            helper.nestElements(inner, p);
            helper.nestElements(inner, desc);
            row.append(box);
            $(inner).click(async function () {
                helper.addLoader();
                const searchData = new SearchData();
                await searchData.init('i',meal.strIngredient,'filter');
                helper.removeLoader();
                let dataDisplayer = new UI(searchData.meals.meals, searchData.status, document.getElementById('Home'));
                dataDisplayer.showMeals();
                $(`[role='main-section']:not(#Home)`).fadeOut(300);
                $('#Home').fadeIn(300);
            });
        });
        helper.nestElements(this.section, container, row);
    }
}