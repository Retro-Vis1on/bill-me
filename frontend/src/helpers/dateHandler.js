const dataHandler = (date) => {
    let cur = (new Date(date)).toDateString()
    cur = (cur.toString()).split(' ')
    return cur[2] + " " + cur[1] + " " + cur[3]
}
export default dataHandler