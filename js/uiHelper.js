export class UI_Helper {
    createElement(name, classes = undefined, id = undefined) {
        let ele = document.createElement(name);
        if (classes) {
            classes=classes.trim();
            classes = classes.split(' ');
            for (let i = 0; i < classes.length; i++)
                ele.classList.add(classes[i]);
        }
        if (id) ele.setAttribute('id', id);
        return ele;
    }
    nestElements(...eles) {
        for (let i = eles.length - 1; i > 0; i--)
            eles[i - 1].append(eles[i]);
        return eles[0];
    }
    clearDiv(div) {
        while (div.children.length > 0) div.removeChild(div.children[0]);
    }
    addLoader() {
        $('#loader').fadeIn(200);
        $('body').css('overflow', 'hidden');
    }
    removeLoader() {
        $('#loader').fadeOut(200);
        $('body').css('overflow', 'visible');
    }
    appendLoader(){
        return `
        <div class="flex-col gap-4 w-full flex items-center justify-center mt-28">
            <div
                class="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
            </div>
        </div>
        `;
    }
    appendError(){
        return `
        <div class="flex-col gap-4 w-full flex items-center justify-center mt-28">
            <p class="text-white text-4xl text-center">
                Somthing went wrong</br></br>
                Make sure you are connected and try again later
            </p>
        </div>
        `;
    }
}