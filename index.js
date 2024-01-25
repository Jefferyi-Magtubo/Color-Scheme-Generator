const btn = document.getElementById('submit')

document.addEventListener('click', (e)=> {
    if(e.target.dataset.copy) {
        const textToCopy = document.getElementById(`label${e.target.dataset.copy}`).innerText

        const tempTextArea = document.createElement("textarea")

        tempTextArea.value = textToCopy

        document.body.appendChild(tempTextArea)

        tempTextArea.select()

        document.execCommand("copy")

        document.body.removeChild(tempTextArea);

        const copyText = document.getElementById(`label${e.target.dataset.copy}`);
        copyText.innerText = "Copied!";

        setTimeout(() => {
            copyText.innerText = textToCopy
        }, 2000)
    }
})

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const color = (document.getElementById('colorPicker').value).slice(1)
    const colorMode = (document.getElementById('color-mode').value).toLowerCase()

    const colorsArray = []

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorMode}&count=6`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach( (color) => {
                colorsArray.push(color.hex.value)
            })
            for(let i = 0; i < 7; i++) {
                document.getElementById(`label${i + 1}`).innerText = colorsArray[i]
                document.getElementById(`color${i + 1}`).style.background = colorsArray[i]
            }
        })
})