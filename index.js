const url = "https://www.thecolorapi.com"
const schemeEndpoint = "/scheme"
const colorEndpoint = "color"
const selectEl = document.getElementById("colors");
const getColorBtn = document.getElementById("get-color-btn")
const colorInputEl = document.getElementById("start-color")

const schemesArr = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]

let startColorHex = "F55A5A"
let selectedSchemeName = ""


colorInputEl.addEventListener("change", e => {
    console.log("change")
    startColorHex = e.target.value.slice(1)
})

selectEl.addEventListener('change', e => {
    selectedSchemeName = e.target.value
})

getColorBtn.addEventListener("click", e => { 
    handleGetColorScheme(e, selectedSchemeName)
})

function handleGetColorScheme(e, string){
    e.preventDefault()
    getColors(string)
}

function getColors(string){
    fetch(`${url}${schemeEndpoint}?hex=${startColorHex}&mode=${string}`)
    .then(res => res.json())
    .then(data => {
        // data.colors is an array of five color objects with hexcode, rgb values nested as objects
        renderColorsHtml(data.colors)
    })
}

function renderColorsHtml(arr){
    let html = ""
    let footerDivs = ""
    arr.forEach( colorObj => {

        html += `
        <div class="color-bar" 
            style="background: ${colorObj.hex.value};">
        </div>
        `

        footerDivs += `
            <div id="footer-${colorObj.hex.value}">${colorObj.hex.value}</div>
        `
    });
    document.getElementById("colors-container").innerHTML = html
    document.getElementById("footer").innerHTML = footerDivs

}

function distributeSchemeOptions(arr){
    let selectOptions = ""
    
    for (scheme of schemesArr){
        selectOptions += `
            <option id=${scheme} value="${scheme}">${scheme}</option>
        `
        
    }
    document.getElementById("colors").innerHTML = selectOptions
}
        
function assignStartColor(string){
    document.getElementById("start-color").value = "#" + string
}
    
    
    
assignStartColor(startColorHex)
getColors("monochrome")
distributeSchemeOptions(schemesArr)



