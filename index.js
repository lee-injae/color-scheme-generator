const url = "https://www.thecolorapi.com"
const schemeEndpoint = "/scheme"
const colorEndpoint = "color"
const selectElement = document.getElementById("colors");
const getColorBtn = document.getElementById("get-color-btn")
const schemesArr = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]

const startColorHex = "800080"
let selectedSchemeName = ""

function distributeSchemes(arr){
    let htmlOption = ""
    for (scheme of schemesArr){
        htmlOption += `
            <option id=${scheme} value="${scheme}">${scheme}</option>
        `
    }
    document.getElementById("colors").innerHTML = htmlOption
}

distributeSchemes(schemesArr)

selectElement.addEventListener('change', function(e) {
    selectedSchemeName = e.target.value
    console.log("selectedName: ", selectedSchemeName)
})

getColorBtn.addEventListener("click", e => { 
    handleGetColorScheme(e, selectedSchemeName)})

function handleGetColorScheme(e, string){
    e.preventDefault()
    fetch(`${url}${schemeEndpoint}?hex=${startColorHex}&mode=${string}`)
        .then(res => res.json())
        .then(data => {
            // data.colors is an array of five color objects with hexcode, rgb values nested as objects
            renderColors(data.colors)
        })
}

function renderColors(arr){
    let html = ""
    arr.forEach( colorObj => {
        html += `
            <div class="color-bar" 
                style="background: ${colorObj.hex.value};">
            </div>
        `
    });
    document.getElementById("colors-container").innerHTML = html
}





