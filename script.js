const api_url = "https://open.er-api.com/v6/latest/"
let res
let timeout

async function fetchAPI() {
    let currToConvert = document.getElementById("original").value
    const response = await fetch(api_url + currToConvert)
    res = await response.json();
    res = res.rates
}

fetchAPI()

function main(){
    let converted = document.getElementById("converted").value
    let output = document.getElementById("output")
    let amount = document.getElementById("input").value
    amount = parseFloat(amount)
    let rate = res[converted]
    console.log(Number.isInteger(rate))
    let result =  amount * rate
    output.value = result
}

function converter(amount) {
    clearTimeout(timeout)
    timeout = setTimeout(converter, 2000)
    main(amount)
}
