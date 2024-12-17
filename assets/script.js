let dolar = 5.5

const usdInput = document.querySelector("#usd")
const brlInput = document.querySelector("#brl")


async function fetchDollarRate() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
        const data = await response.json();
        dolar = parseFloat(data.USDBRL.bid);
        console.log(`Cotação atualizada: ${dolar}`);
    } catch (error) {
        console.error("Erro ao buscar a cotação do dólar:", error);
    }
}

fetchDollarRate(); 
setInterval(fetchDollarRate, 30000);

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl")
})

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd")
})

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
})
brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
})

usdInput.value = "0,00"
convert("usd-to-brl")

function formatCurrency(value) {
    const fixedValue = fixValue(value)
    const options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    const formatter = new Intl.NumberFormat("pt-BR", options)
    return formatter.format(fixedValue)
}

function fixValue(value) {
    const fixedValue = value.replace(",", ".")
    const floatValue = parseFloat(fixedValue)
    if(floatValue == NaN) {
        floatValue = 0
    }
    return floatValue
}

function convert(type) {
    if(type == "usd-to-brl") {
        const fixedValue = fixValue(usdInput.value)
        let result = fixedValue * dolar 
        result = result.toFixed(2)

        brlInput.value = formatCurrency(result)
    }
    if(type == "brl-to-usd") {
        const fixedValue = fixValue(brlInput.value)
        let result = fixedValue / dolar 
        result = result.toFixed(2)

        usdInput.value = formatCurrency(result)
    }
}