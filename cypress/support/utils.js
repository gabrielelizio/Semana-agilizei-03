export const format = (value) => {
    let formattedValue
    formattedValue = value.replace (',','.')
    formattedValue = Number(formattedValue.split('$') [1].trim())

    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue

    return formattedValue
}

export const randomNumber = () =>{
    return Math.floor(Math.random()*100)
}

export const prepareLocalStorage = (win) => {
    win.localStorage.setItem('dev.finances:transactions',JSON.stringify(
        [
            {
                description:"Mesada",
                amount: randomNumber() *100,
                date: "16/03/2021"
            },
            {
                description:"Suco Kapo",
                amount: -( randomNumber() *100),
                date: "16/03/2021"
            }
        ]
    ))
}