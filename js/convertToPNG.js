function convertToPng(fileVar) {
    const Jimp = require("jimp");
}

function fileIsToBig(filePath) {
    var maxSize = 4194304; // 4MB

    if (filePath.size > maxSize) {
        alert('File size exceeds the maximum limit');
        return true;
    } else {
        return false;
        // File size is within the limit, further processing can go here
    }
}
function fileTypeIsWrong(filePath) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return true;
    }
    else {
        return false;
        // File size is correct
    }
}
