const api_url = "https://open.er-api.com/v6/latest/"
let res
let timeout
let ot = document.getElementById("ot")
let output = document.getElementById("output")
    output.value = "converted..."

const backgroundOptions = ['image-background', 'colorful-background', 'body'];

let currentIndex = 0;

function changeBackground() {
    let element = document.body;
    let nav = document.getElementById("nav")
    element.classList.remove(backgroundOptions[currentIndex]);
    currentIndex += 1
    if (currentIndex === backgroundOptions.length) {
        currentIndex = 0;
    }
    element.classList.add(backgroundOptions[currentIndex]);
    if (backgroundOptions[currentIndex] !== 'body') {
        nav.classList.add("transparent");
        if (backgroundOptions[currentIndex] === 'image-background') {
            let div = document.getElementById("div")
            div.setAttribute("style", "display:block;")
        } else {
            div.setAttribute("style", "display:none;")
        }
    } else {
        nav.classList.remove("transparent");
    } 
}

async function fetchAPI() {
    let currToConvert = document.getElementById("original").value
    const response = await fetch(api_url + currToConvert)
    res = await response.json();
    res = res.rates
}

fetchAPI()

function main(){
    let converted = document.getElementById("converted").value
    let amount = document.getElementById("input").value
    if (amount === "") {
        output.value = "converted..."
        return;
    }
    amount = parseFloat(amount)
    let rate = res[converted]
    let result =  amount * rate
    ot.setAttribute("style", "display:inline-block;")
    output.value = result.toFixed(2);
}

function converter(amount) {
    clearTimeout(timeout)
    timeout = setTimeout(converter, 2000)
    main(amount)
}