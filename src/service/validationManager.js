export function validateLogin(email, password){
    const emailPattern = /\S+@\S+\.\S+/
    const newErrors = {}
    if (email === ''){
        newErrors.emailError = 'Please enter your email'
    } else if (!emailPattern.test(email)/*email.length < 5*/){
        newErrors.emailError = 'Incorrect email format'
    }

    if (password === '') newErrors.passwordError = 'Please enter your password'
    else if (password.length < 4) newErrors.passwordError = 'Password should have 4 symbols or more'

    return newErrors
}