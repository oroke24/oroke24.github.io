function convertToPNG(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert to PNG
            canvas.toBlob(function (blob) {
                const pngFile = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.png', { type: 'image/png' });
                console.log('PNG file created:', pngFile);
                if (callback) {
                    callback(pngFile);
                }
            }, 'image/png');
        };
    };
    reader.readAsDataURL(file);
}