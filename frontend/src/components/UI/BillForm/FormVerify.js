const formVerify = (senderDispatcher, recieverDispatcher, projectDispatcher, itemState, itemStateUpdater, senderState, recieverState, projectState) => {
    senderDispatcher({ type: "verify" })
    recieverDispatcher({ type: "verify" })
    projectDispatcher({ type: "verify" })
    let cpy = [...itemState]
    let ok = true
    for (let item of cpy) {
        item.isValid.itemName = item.itemName.trim().length > 0
        ok &= item.isValid.itemName
        if (!Number.isFinite(+item.price) || (+item.price) <= 0)
            item.isValid.price = false
        else item.isValid.price = true
        ok &= item.isValid.price
        if (!Number.isFinite(+item.qty) || (+item.qty) <= 0)
            item.isValid.qty = false
        else item.isValid.qty = true
        ok &= item.isValid.qty
    }
    itemStateUpdater(cpy)
    if (!ok)
        return ok
    for (let field in senderState)
        if (!senderState[field].isValid) {
            return false
        }
    for (let field in recieverState)
        if (!recieverState[field].isValid) {
            return false
        }
    for (let field in projectState)
        if (!projectState[field].isValid) {
            return false
        }
    return true
}
export default formVerify