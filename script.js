const countries = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

// Main
const API_KEY = "ea56698f4c3227f852d53cef"; //? This should be your API key
const URL = "https://v6.exchangerate-api.com/";

const dropList = document.querySelectorAll(".converter__form-content select");
const btn = document.querySelector("form .converter__form-footer__btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const changeOfSides = document.querySelector(
  ".converter__form-content .converter__form-exchange",
);

for (let index = 0; index < dropList.length; index++) {
  for (let currencyCode of Object.keys(countries)) {
    //? Select current option
    let selected;
    if (index === 0) {
      selected = currencyCode === "USD" ? "selected" : "";
    } else if (index == 1) {
      selected = currencyCode === "UAH" ? "selected" : "";
    }

    //? Create new tag for the 'option' element
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    dropList[index].insertAdjacentHTML("beforeEnd", optionTag);
  }

  //? Showing flag of a selected country
  dropList[index].addEventListener("change", (event) => {
    loadFlag(event.target);
  });
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", () => {
  getExchangeRate();
});

//? Change of flags and country code
changeOfSides.addEventListener("click", () => {
  let changeFromCurrency = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = changeFromCurrency;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);

  getExchangeRate();
});

//? Create function for flags of a selected country
function loadFlag(item) {
  const countryCode = item.value;

  if (!countryCode) return;

  const imgTag = item
    .closest(".converter__form-content__selectBox")
    .querySelector(".converter__form-content__flag");

  if (imgTag) {
    imgTag.src = `https://flagcdn.com/w80/${countries[countryCode].toLowerCase()}.png`;
  }
}

function getExchangeRate() {
  const amount = document.querySelector(
    ".converter__form-header .converter__form-header__input",
  );
  const exchangeRatetext = document.querySelector(
    ".converter__form-footer__results",
  );

  let amountValue = amount.value;
  if (amountValue === "" || amountValue === "0") {
    amount.value = "1";
    amountValue = 1;
  }

  fetch(URL + `/v6/${API_KEY}/latest/${fromCurrency.value}`)
    .then((response) => response.json())
    .then((result) => {
      //? Change current rate "from to"
      let exchangeRate = result.conversion_rates[toCurrency.value];

      //? Total exchange rate "from to"
      let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);

      //? Get exchange rate text
      exchangeRatetext.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => "Error");

  exchangeRatetext.innerHTML = `
      <div class="isLoading"><img src='./img/loader.gif' /></div>
      `;
}
