const IsPasswordStrong = (password)=>{
    const lengthRegex = /.{8,}/
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /\d/
    const symbolRegex = /[\W_]/

    const hasLength = lengthRegex.test(password)
    const hasUppercase = uppercaseRegex.test(password)
    const hasNumber = numberRegex.test(password)
    const hasSymbol = symbolRegex.test(password)

    return hasLength && hasUppercase && hasNumber && hasSymbol
}

module.exports = IsPasswordStrong