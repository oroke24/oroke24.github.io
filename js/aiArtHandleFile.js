function handleFileSelect(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Define the size of the square canvas
                const size = Math.max(img.width, img.height);
                canvas.width = size;
                canvas.height = size;

                // Draw the image onto the canvas, centered
                ctx.fillRect(0, 0, size, size);
                const x = (size - img.width) / 2;
                const y = (size - img.height) / 2;
                ctx.drawImage(img, x, y);

                // Convert canvas to Blob and resolve with a File object
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], 'image.png', { type: 'image/png' }));
                    } else {
                        reject(new Error('Error converting canvas to Blob'));
                    }
                }, 'image/png');
            };

            img.onerror = function () {
                reject(new Error('Error loading image'));
            };

            img.src = e.target.result;
        };

        reader.onerror = function () {
            reject(new Error('Error reading file'));
        };

        reader.readAsDataURL(file);
    });
}
