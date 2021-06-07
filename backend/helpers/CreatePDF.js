const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateHeader(doc, senderAddress) {
    doc
        .image("./helpers/Logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("ACME Inc.", 110, 57)
        .fontSize(10)
        .text(`${senderAddress.street}`, 200, 65, { align: "right" })
        .text(`${senderAddress.city}`, 200, 77, { align: "right" })
        .text(`${senderAddress.postCode}`, 200, 89, { align: "right" })
        .text(`${senderAddress.country}`, 200, 101, { align: "right" })
        .moveDown();
}

function generateFooter(doc, postion) {
    doc
        .fontSize(10)
        .text(
            "Thank you for doing business with us.",
            50,
            postion,
            { align: "center", width: 500 }
        );
}

function generateCustomerInformation(doc, invoice) {
    generateHr(doc, 185);
    const invDate = ((new Date(invoice.invoiceDate)).toDateString().toString())
    doc
        .text(`Invoice Date: `, 60, 215, { fontSize: 12 })
        .text(`${invDate}`, 130, 215, { fontSize: 12 })
        .text(`Due Date:`, 60, 235, { fontSize: 13 })
        .text(`${((new Date(invoice.dueDate)).toDateString()).toString()}`, 130, 235, { fontSize: 13 })
        .text(`Project Desc.:`, 60, 255, { fontSize: 13 })
        .text(`${invoice.billFor}`, 130, 255, { fontSize: 13, width: 150 })
        .text(`${invoice.recieverName}`, 320, 205)
        .text(`${invoice.email}`, 320, 220)
        .text(`${invoice.recieverAddress.street} - ${invoice.recieverAddress.postCode}`, 320, 240)
        .text(`${invoice.recieverAddress.city}, ${invoice.recieverAddress.country}`, 320, 255)
        .moveDown();
    generateHr(doc, 295);
}
function generateTableRow(doc, y, c1, c2, c3, c4) {
    doc
        .fontSize(10)
        .text(c1, 60, y)
        .text(c2, 230, y, { width: 30, align: "right" })
        .text(c3, 280, y, { width: 90, align: "right" })
        .text(c4, 400, y, { width: 90, align: "right" })

}
function generateInvoiceTable(doc, invoice) {
    let i,
        invoiceTableTop = 360;
    let position = invoiceTableTop;
    doc.font('Helvetica-Bold')
    generateTableRow(
        doc,
        position,
        "Item Name",
        "Qty",
        "Price",
        "Line Total"
    );
    generateHr(doc, position + 20, 2);
    doc.font('Helvetica')
    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.name,
            item.qty,
            `$${item.price}`,
            `$${(+item.price) * (+item.qty)}`,
            false
        );
        generateHr(doc, position + 20);
    }
    doc.text(`Total: `, 280, position + 33, { width: 90, align: 'right' })
    doc.text(`$${invoice.total}`, 400, position + 33, { width: 90, align: 'right' })
    generateFooter(doc, position + 80);

}
function generateHr(doc, y, thick = 1) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(thick)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function createInvoice(invoice, path) {
    let doc = new PDFDocument({ margin: 50, font: 'Helvetica' });
    generateHeader(doc, invoice.senderAddress);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

module.exports = (data, fileName) => {
    const path = process.cwd() + `\\helpers\\${fileName}.pdf`;
    const elements = path.split('\\');
    let actualPath = ""
    for (let i = 0; i < elements.length - 1; i++)
        actualPath += elements[i] + "/"
    actualPath += elements[elements.length - 1];
    createInvoice(data, actualPath)
}