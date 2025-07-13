async function mergePDFs() {
    const pdfFiles = document.getElementById('pdfInput').files;
    if (pdfFiles.length < 2) {
        alert("Please select at least two PDFs to merge!");
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.create();

    for (const file of pdfFiles) {
        const pdfBytes = await file.arrayBuffer();
        const loadedPdf = await PDFLib.PDFDocument.load(pdfBytes);
        const pages = await pdfDoc.copyPages(loadedPdf, loadedPdf.getPageIndices());
        pages.forEach(page => pdfDoc.addPage(page));
    }

    const mergedPdfBytes = await pdfDoc.save();

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = URL.createObjectURL(new Blob([mergedPdfBytes], { type: 'application/pdf' }));
    downloadLink.style.display = 'inline-block';
}
