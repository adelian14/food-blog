import { UI_Helper } from "./uiHelper.js";
import { SearchData } from "./searchData.js";
import { UI } from "./ui.js";
import { Validation } from "./validation.js";

const valid = new Validation();
const helper = new UI_Helper();
const validArr = [0, 0, 0, 0, 0, 0];
$(document).ready(async function () {
    initSideMenu();
    $(`[role='main-section']:not(#Home)`).fadeOut(0);
    $(`#Home`).fadeIn(0);
    $('[role="invalid-msg"]').fadeOut(0);
    await init();
    helper.removeLoader();
    await loadData();
});

const searchData = new SearchData();
const listData = new SearchData();

async function loadData() {
    $('#Categories').html(helper.appendLoader());
    $('#Area').html(helper.appendLoader());
    $('#Ingredients').html(helper.appendLoader());
    await listData.init('', '', 'categories');
    const catDataDisplayer = new UI(listData.meals.categories, listData.status, document.getElementById('Categories'));
    catDataDisplayer.showCategories();
    await listData.init('a', 'list', 'list');
    const areaDataDisplayer = new UI(listData.meals.meals, listData.status, document.getElementById('Area'));
    areaDataDisplayer.showAreas();
    await listData.init('i', 'list', 'list');
    const ingredientDataDisplayer = new UI(listData.meals.meals, listData.status, document.getElementById('Ingredients'));
    ingredientDataDisplayer.showIngredients();
}

async function init() {
    await searchData.init('s');
    let mainDataDisplayer = new UI(searchData.meals.meals, searchData.status, document.getElementById('Home'));
    mainDataDisplayer.showMeals();
}

$('#searchByName').on('input', async function () {
    let s = $('#searchByName').val();
    s = s.trim();
    $('#secondary-section').html(helper.appendLoader());
    await searchData.init('s', s);
    let mainDataDisplayer = new UI(searchData.meals.meals, searchData.status, document.getElementById('secondary-section'));
    mainDataDisplayer.showMeals();
});

$('#searchByFirstLetter').on('input', async function () {
    let s = $('#searchByFirstLetter').val();
    s = s.trim();
    if (s == '') {
        $('#secondary-section').html('');
        return;
    }
    await searchData.init('f', s);
    let mainDataDisplayer = new UI(searchData.meals.meals, searchData.status, document.getElementById('secondary-section'));
    mainDataDisplayer.showMeals();
});

function initSideMenu(d = 0) {
    for (let i = 1; i <= 5; i++) {
        animateDown(d, i);
    }
    animateIn(d);
    if ($('#side-menu').attr('expand') == '1') animateIcon(45, 0);
    $('#side-menu').attr('expand', 0);
}

$('#side-menu li').click(function () {
    const id = '#' + $(this).attr('target');
    $(`[role='main-section']:not(${id})`).fadeOut(0);
    initSideMenu(400);
    $(id).fadeIn(0);
    clearInputs();
});

$(window).resize(function () {
    initSideMenu();
});


function clearInputs() {
    $('#searchByFirstLetter').val('');
    $('#searchByName').val('');
    $('#secondary-section').html('');
}

function animateIcon(x, y) {
    $({ deg: x }).animate({ deg: y }, {
        duration: 200,
        step: function (now) {
            $('.fa-plus').css('transform', `rotate(${now}deg)`);
        }
    });
}
function animateUp(duration, idx) {
    $(`#side-menu li:nth-child(${idx})`).animate({ paddingTop: '4px', opacity: 1 }, duration);
}
function animateDown(duration, idx) {
    $(`#side-menu li:nth-child(${idx})`).animate({ paddingTop: '50px', opacity: 0 }, duration);
}
function animateIn(duration) {
    $(`#side-menu`).animate({ left: `-${$('#side-menu > div:nth-child(1)').width()}px` }, duration);
}
function animateOut(duration) {
    $(`#side-menu`).animate({ left: '0px' }, duration);
}


$('#expand-menu').click(function (e) {
    let expand = +$('#side-menu').attr('expand');
    if (expand) {
        expand = 0;
        animateIcon(45, 0);
        for (let i = 1; i <= 5; i++)
            animateDown(300, i);
        animateIn(400);
    }
    else {
        expand = 1;
        animateIcon(0, 45);
        for (let i = 1; i <= 5; i++)
            animateUp(400 + i * 120, i);
        animateOut(400);
    }
    $('#side-menu').attr('expand', expand);
});



$('#name-input').on('input', function () {
    if (valid.matchName($(this).val())) {
        $(`[target="${$(this).attr('id')}"]`).fadeOut(150);
        $(this).removeClass('my-input-danger');
        validArr[0]=1;
    }
    else {
        $(this).addClass('my-input-danger');
        $(`[target="${$(this).attr('id')}"]`).fadeIn(150);
        validArr[0]=0;
    }
});
$('#email-input').on('input', function () {
    if (valid.matchEmail($(this).val())) {
        $(`[target="${$(this).attr('id')}"]`).fadeOut(150);
        $(this).removeClass('my-input-danger');
        validArr[1]=1;
    }
    else {
        $(this).addClass('my-input-danger');
        $(`[target="${$(this).attr('id')}"]`).fadeIn(150);
        validArr[1]=0;
    }
});
$('#phone-input').on('input', function () {
    if (valid.matchPhone($(this).val())) {
        $(`[target="${$(this).attr('id')}"]`).fadeOut(150);
        $(this).removeClass('my-input-danger');
        validArr[2]=1;
    }
    else {
        $(this).addClass('my-input-danger');
        $(`[target="${$(this).attr('id')}"]`).fadeIn(150);
        validArr[2]=0;
    }
});
$('#age-input').on('input', function () {
    if (valid.matchAge($(this).val())) {
        $(`[target="${$(this).attr('id')}"]`).fadeOut(150);
        $(this).removeClass('my-input-danger');
        validArr[3]=1
    }
    else {
        $(this).addClass('my-input-danger');
        $(`[target="${$(this).attr('id')}"]`).fadeIn(150);
        validArr[3]=0;
    }
});
$('#password-input').on('input', function () {
    if (valid.matchPassword($(this).val())) {
        $(`[target="${$(this).attr('id')}"]`).fadeOut(150);
        $(this).removeClass('my-input-danger');
        validArr[4]=1
    }
    else {
        $(this).addClass('my-input-danger');
        $(`[target="${$(this).attr('id')}"]`).fadeIn(150);
        validArr[4]=0;
    }
    if(valid.comparePasswords($(this).val(),$('#repassword-input').val())){
        $(`[target="repassword-input"]`).fadeOut(150);
        $('#repassword-input').removeClass('my-input-danger');
        validArr[5]=1
    }
    else{
        $('#repassword-input').addClass('my-input-danger');
        $(`[target="repassword-input"]`).fadeIn(150);
        validArr[5]=0;
    }
});
$('#repassword-input').on('input', function () {
    if(valid.comparePasswords($(this).val(),$('#password-input').val())){
        $(`[target="${$(this).attr('id')}"]`).fadeOut(150);
        $(this).removeClass('my-input-danger');
        validArr[5]=1
    }
    else{
        $(this).addClass('my-input-danger');
        $(`[target="${$(this).attr('id')}"]`).fadeIn(150);
        validArr[5]=0;
    }
});

$('#Contact-Us input').on('input', function () {
    let sum=0;
    validArr.forEach(x=>{
        sum+=x;
    });
    if(sum==6){
        $('#Contact-Us h4').addClass('cursor-pointer bg-green-600 hover:bg-green-800');
        $('#Contact-Us h4').removeClass('bg-red-400 cursor-not-allowed');
    }
    else{
        $('#Contact-Us h4').removeClass('cursor-pointer bg-green-600 hover:bg-green-800');
        $('#Contact-Us h4').addClass('bg-red-400 cursor-not-allowed');
    }
});