const obj = {
    "CAD": "Canadian Dollar",
    "HKD": "Hong Kong Dollar",
    "ISK": "Icelandic Króna",
    "PHP": "Philippine Peso",
    "DKK": "Danish Krone",
    "HUF": "Hungarian Forint",
    "CZK": "Czech Koruna",
    "GBP": "Pound Sterling",
    "RON": "Romanian Leu",
    "SEK": "Swedish Krona",
    "IDR": "Indonesian Rupiah",
    "INR": "Indian Rupee",
    "BRL": "Brazilian Real",
    "RUB": "Russian Ruble",
    "HRK": "Croatian Kuna",
    "JPY": "Japanese Yen",
    "THB": "Thai Baht",
    "CHF": "Swiss Franc",
    "EUR": "Euro",
    "MYR": "Malaysian Ringgit",
    "BGN": "Bulgarian Lev",
    "TRY": "Turkish Lira",
    "CNY": "Chinese Yuan",
    "NOK": "Norwegian Krone",
    "NZD": "New Zealand Dollar",
    "ZAR": "South African Rand",
    "USD": "United States Dollar",
    "MXN": "Mexican Peso",
    "SGD": "Singapore Dollar",
    "AUD": "Australian Dollar",
    "ILS": "Israeli New Shekel",
    "KRW": "South Korean Won",
    "PLN": "Poland Złoty"
}
const currencyInfo = new Map()

for (let elem in obj) {
    currencyInfo.set(obj[elem], elem)
}

export default currencyInfo
