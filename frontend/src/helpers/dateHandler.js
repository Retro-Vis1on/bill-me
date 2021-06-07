const months = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const dataHandler = (date) => {
    let cur = (new Date(date)).toLocaleDateString()
    cur = (cur.toString()).split('/')
    const month = months[cur[0]]
    return cur[1] + " " + month + " " + cur[2]
}
export default dataHandler