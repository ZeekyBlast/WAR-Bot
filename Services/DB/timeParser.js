function parseDuration(input){
    const regex = /^(\d+)(s|m|h|d)$/i;
    const match = input.match(regex)

    if(!match) return null

    const value = parseInt(match[1])
    const unit = match[2].toLowerCase()

    const multi = {
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24
    }

    return value * multi[unit];

}

module.exports = parseDuration;