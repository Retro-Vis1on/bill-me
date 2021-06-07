module.exports = (code) => {
    if (code === 409)
        return "Sorry! This user already exist!"
    if (code === 500)
        return "Please check your credentials!"
    if (code === 404)
        return "This user doesn't exist!"
    return "Woops! Something went Wrong!"

}