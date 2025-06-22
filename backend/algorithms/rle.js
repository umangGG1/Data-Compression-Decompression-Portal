class RunLengthEncoding {
    static compress(data) {
        if (!data || data.length === 0) {
            return {
                compressedData: '',
                originalSize: 0,
                compressedSize: 0,
                compressionRatio: '0.00'
            };
        }

        let compressed = '';
        let count = 1;
        let currentChar = data[0];

        for (let i = 1; i < data.length; i++) {
            if (data[i] === currentChar && count < 255) {
                count++;
            } else {
                // Encode the current run
                compressed += this.encodeRun(currentChar, count);
                currentChar = data[i];
                count = 1;
            }
        }

        // Don't forget the last run
        compressed += this.encodeRun(currentChar, count);

        const compressedBuffer = Buffer.from(compressed, 'binary');
        const originalSize = data.length;
        const compressedSize = compressedBuffer.length;

        return {
            compressedData: compressedBuffer,
            originalSize,
            compressedSize,
            compressionRatio: originalSize > 0 ? 
                ((originalSize - compressedSize) / originalSize * 100).toFixed(2) : '0.00'
        };
    }

    static decompress(compressedData) {
        if (!compressedData || compressedData.length === 0) {
            return '';
        }

        let decompressed = '';
        const data = compressedData.toString('binary');

        for (let i = 0; i < data.length; i += 2) {
            if (i + 1 < data.length) {
                const char = data[i];
                const count = data.charCodeAt(i + 1);
                decompressed += char.repeat(count);
            }
        }

        return decompressed;
    }

    static encodeRun(char, count) {
        // Store character followed by count as binary
        return char + String.fromCharCode(count);
    }

    // Alternative implementation for text files with better compression
    static compressText(data) {
        if (!data || data.length === 0) {
            return {
                compressedData: '',
                originalSize: 0,
                compressedSize: 0,
                compressionRatio: '0.00'
            };
        }

        let compressed = '';
        let i = 0;

        while (i < data.length) {
            let currentChar = data[i];
            let count = 1;

            // Count consecutive characters
            while (i + count < data.length && data[i + count] === currentChar && count < 999) {
                count++;
            }

            // Only use RLE if it saves space (count >= 4) or for whitespace characters with count >= 3
            if (count >= 4 || (this.isSpecialChar(currentChar) && count >= 3)) {
                compressed += `~${count}${currentChar}`;
            } else {
                // For short runs or single characters, just output them normally
                if (currentChar === '~') {
                    // Escape tildes by doubling them
                    compressed += '~~'.repeat(count);
                } else {
                    // Just repeat the character normally
                    compressed += currentChar.repeat(count);
                }
            }

            i += count;
        }

        const compressedBuffer = Buffer.from(compressed, 'utf8');
        const originalSize = Buffer.from(data, 'utf8').length;
        const compressedSize = compressedBuffer.length;

        return {
            compressedData: compressedBuffer,
            originalSize,
            compressedSize,
            compressionRatio: originalSize > 0 ? 
                ((originalSize - compressedSize) / originalSize * 100).toFixed(2) : '0.00',
            method: 'text'
        };
    }

    static decompressText(compressedData) {
        if (!compressedData || compressedData.length === 0) {
            return '';
        }

        let decompressed = '';
        const data = compressedData.toString('utf8');
        let i = 0;

        while (i < data.length) {
            if (data[i] === '~') {
                if (i + 1 < data.length && data[i + 1] === '~') {
                    // Escaped tilde
                    decompressed += '~';
                    i += 2;
                } else {
                    // RLE sequence
                    i++; // Skip the ~
                    let countStr = '';
                    
                    // Read the count
                    while (i < data.length && /\d/.test(data[i])) {
                        countStr += data[i];
                        i++;
                    }
                    
                    if (i < data.length && countStr) {
                        const count = parseInt(countStr);
                        const char = data[i];
                        decompressed += char.repeat(count);
                        i++;
                    }
                }
            } else {
                decompressed += data[i];
                i++;
            }
        }

        return decompressed;
    }

    static isSpecialChar(char) {
        // Characters that are worth compressing even in shorter runs (3+)
        return char === ' ' || char === '\n' || char === '\t' || char === '\r' || char === '0';
    }

    // Method to choose the best compression strategy
    static compressOptimal(data) {
        // For text data (like CSV), prefer the text method which is more intelligent
        const textResult = this.compressText(data);
        const binaryResult = this.compress(data);

        // Return the result with better compression ratio
        if (parseFloat(textResult.compressionRatio) > parseFloat(binaryResult.compressionRatio)) {
            return { ...textResult, method: 'text' };
        } else {
            return { ...binaryResult, method: 'binary' };
        }
    }

    static decompressOptimal(compressedData, method = 'binary') {
        if (method === 'text') {
            return this.decompressText(compressedData);
        } else {
            return this.decompress(compressedData);
        }
    }
}

module.exports = RunLengthEncoding; 