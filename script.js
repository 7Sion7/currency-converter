const api_url = "https://open.er-api.com/v6/latest/"
let res
let timeout
let ot = document.getElementById("ot")
let output = document.getElementById("output")
output.value = "converted..."

const backgroundOptions = ['image-background', 'colorful-background', 'body'];

let currentIndex = 0;

function changeBackground() {
    let rootStyles = getComputedStyle(document.documentElement);
    let backgroundBox = document.getElementById('div')

    let imageBackground = rootStyles.getPropertyValue('--imageBackground');
    let backgroundOne = rootStyles.getPropertyValue('--BackgroundOne');
    let backgroundTwo = rootStyles.getPropertyValue('--BackgroundTwo');

    let currentBackground = getComputedStyle(document.body).getPropertyValue('background-image').includes("http://localhost:3000/") ? 
    getComputedStyle(document.body).getPropertyValue('background-image').replace("http://localhost:3000/", "").replace(/['"]+/g, '') :
    getComputedStyle(document.body).getPropertyValue('background-image').replace(/"url"[()]+/g, '');

    if (currentBackground === imageBackground) {
        backgroundBox.style.display = 'none'
        document.body.style.backgroundImage = `${backgroundOne}`;
    } else if (currentBackground === backgroundOne) {
        document.body.style.backgroundImage = `${backgroundTwo}`;
    } else if (currentBackground === backgroundTwo) {
        backgroundBox.style.display = 'block'
        document.body.style.backgroundImage = `${imageBackground}`;
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
        output.style.color = "rgba(0, 0, 0, 0.5)"
        output.value = "converted..."
        return;
    }
    amount = parseFloat(amount)
    let rate = res[converted]
    let result =  amount * rate
    ot.setAttribute("style", "display:inline-block;")
    output.style.color = "black"
    output.value = result.toFixed(2);
}

function converter(amount) {
    clearTimeout(timeout)
    timeout = setTimeout(converter, 2000)
    main(amount)
}