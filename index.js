
const url = "https://www.thecolorapi.com"
const schemeEndpoint = "/scheme"
const colorEndpoint = "color"
const startColorHex = "F55A5A"
const schemesArr = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]

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


// document.addEventListener("click", (e) => {
//     if (e.target.id = "get-color-btn"){
//         handleGetColorSchemeBtn(e)
//     }
//     else if (e.target.id="monochrome"){
//         handleMonochrome()
//     }
// })


const selectElement = document.getElementById("colors");

selectElement.addEventListener('change', function(e) {
    const selectedSchemeName = e.target.value
    console.log("selectedName: ", selectedSchemeName)
    getSchemeColors(selectedSchemeName)
});



function handleGetColorSchemeBtn(string){
  fetch(`${url}${schemeEndpoint}?hex=${startColorHex}&mode=${string}`)
    .then(res => res.json())
    .then(data => {
        // data.colors is an array of five color objects with hexcode, rgb values nested as objects
        console.log(data.colors)
        renderColors(data.colors)
    })
}


function renderColors(arr){
    let html = ""
    arr.forEach( (colorObj) => {
        html += `
            <div class="color-bar" 
                style="background: ${colorObj.hex.value};">
            </div>
        `
    });
    document.getElementById("colors-container").innerHTML = html
}


// function renderColors(arr) {
//     let html = "";
//     arr.forEach((colorObj) => {
//       html += `
//         <div class="color-bar" style="background: ${colorObj.hex.value};"></div>
//       `;
//     });
//     console.log("html: ", html);
//     document.getElementById("colors-container").innerHTML = html;
//   }
  
// function handleGetColorSchemeBtn(e){
//     e.preventDefault()

//     fetch(`${url}${schemeEndpoint}?hex=${startColorHex}&mode=monochrome`)
//     .then(res => res.json())
//     .then(data => {
//         console.log("data-colors: ", data.colors)
//         let html = ""

//         for (color of data.colors){
//             html = `
//                 <div class="color-bar" style="background: ${color.hex.value};"></div>
//             `
//             console.log(html)
//             document.getElementById("colors-container").innerHTML += html
//         }
//     })
// }



