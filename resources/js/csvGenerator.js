const FILENAME_BASE = "questionAnswers";

function generateCsv(arrayOfQuestionAnswerPairs, delimiter) {
    // Spalte 1 Frage, Spalte 2 Antwort
    let csvContent = "",
        filename = getTimeStampedFileName();
    csvContent += "Question" + delimiter + "Answer" + "\n";

    for(let i = 0; i < arrayOfQuestionAnswerPairs.length; i+=2) {
        csvContent += arrayOfQuestionAnswerPairs[i] + delimiter + arrayOfQuestionAnswerPairs[i+1] + "\n";
    }

    console.log(csvContent);

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function getTimeStampedFileName() {
    let filename = FILENAME_BASE;
    let currentDate = new Date(Date.now());
    //hh_mm_ss_dd_mm_yyyy
    let timestamp = currentDate.getFullYear() + "_" + (currentDate.getMonth() + 1) + "_" + currentDate.getDay() + "-" + currentDate.getHours() + "_" + currentDate.getMinutes() + "_" + currentDate.getSeconds();

    filename += "-" + timestamp + ".csv";
    return filename;
}

export default generateCsv;