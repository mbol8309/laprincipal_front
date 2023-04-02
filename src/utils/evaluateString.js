const evaluateString = (text, defaultValue=null) => {
    return (record)=> text ? eval("`" + text + "`") : defaultValue 
}

export default evaluateString