export function validateEmail(email = ''){
    const emailPattern = /\S+@\S+\.\S+/
    const newErrors = {}
    if (email === ''){
        newErrors.emailError = 'Please enter your email'
    } else if (!emailPattern.test(email)/*email.length < 5*/){
        newErrors.emailError = 'Incorrect email format'
    }
    return newErrors
}

export function validatePassword(password = ''){
    const newErrors = {}
    if (password === '') newErrors.passwordError = 'Please enter your password'
    else if (password.length < 4) newErrors.passwordError = 'Password should have 4 symbols or more'
    return newErrors
}

export function validateName(name = ''){
    const newErrors = {}
    if (name === '') newErrors.nameError = 'Please enter your name'
    else if (name.length < 2) newErrors.passwordError = 'Name should have 2 symbols or more'
    return newErrors
}

//Add telephone validation

export function validateLogin(email = '', password = ''){
    const newErrors = {...validateEmail(email), ...validatePassword(password)}
    return newErrors
}

export function validateRegister(email = '', password = '', name = ''){
    const newErrors = {...validateEmail(email), ...validatePassword(password), ...validateName(name)}
    return newErrors
}