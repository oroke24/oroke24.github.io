function handleFileSelect(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const maxDimension = 1600;
                let width = img.width;
                let height = img.height;


                // Calculate the new dimensions while maintaining the aspect ratio
                if (width > height) {
                    if (width > maxDimension) {
                        height = Math.round(height * (maxDimension / width));
                        width = maxDimension;
                    }
                } else {
                    if (height > maxDimension) {
                        width = Math.round(width * (maxDimension / height));
                        height = maxDimension;
                    }
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;

                // Draw the image onto the canvas with the new dimensions
                ctx.drawImage(img, 0, 0, width, height);

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
