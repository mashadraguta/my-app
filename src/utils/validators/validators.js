

export const required = value => {
    if (value) return undefined
    else return `This field is required`
}


export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Maximum length exceeded`;
    return undefined;
}



