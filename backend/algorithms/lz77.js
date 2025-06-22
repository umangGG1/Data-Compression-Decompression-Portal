class LZ77 {
    constructor(windowSize = 4096, lookAheadSize = 18) {
        this.windowSize = windowSize;
        this.lookAheadSize = lookAheadSize;
    }

    static compress(data, windowSize = 4096, lookAheadSize = 18) {
        if (!data || data.length === 0) {
            return {
                compressedData: Buffer.alloc(0),
                originalSize: 0,
                compressedSize: 0,
                compressionRatio: '0.00'
            };
        }

        const compressed = [];
        let position = 0;

        while (position < data.length) {
            const match = this.findLongestMatch(data, position, windowSize, lookAheadSize);
            
            if (match.length > 2) {
                // Found a match worth encoding
                compressed.push({
                    type: 'match',
                    offset: match.offset,
                    length: match.length,
                    nextChar: position + match.length < data.length ? data[position + match.length] : null
                });
                position += match.length + (match.nextChar ? 1 : 0);
            } else {
                // No good match found, encode as literal
                compressed.push({
                    type: 'literal',
                    char: data[position]
                });
                position++;
            }
        }

        // Convert to binary format
        const binaryData = this.encodeToBinary(compressed);
        const originalSize = Buffer.from(data, 'utf8').length;
        const compressedSize = binaryData.length;

        return {
            compressedData: binaryData,
            tokens: compressed,
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

        try {
            const tokens = this.decodeFromBinary(compressedData);
            let result = '';

            for (const token of tokens) {
                if (token.type === 'literal') {
                    result += token.char;
                } else if (token.type === 'match') {
                    // Copy from the sliding window
                    const startPos = result.length - token.offset;
                    for (let i = 0; i < token.length; i++) {
                        result += result[startPos + i];
                    }
                    if (token.nextChar) {
                        result += token.nextChar;
                    }
                }
            }

            return result;
        } catch (error) {
            console.error('LZ77 decompression error:', error);
            return '';
        }
    }

    static findLongestMatch(data, position, windowSize, lookAheadSize) {
        const windowStart = Math.max(0, position - windowSize);
        const windowEnd = position;
        const lookAheadEnd = Math.min(data.length, position + lookAheadSize);

        let bestMatch = { offset: 0, length: 0, nextChar: null };

        // Search for matches in the sliding window
        for (let i = windowStart; i < windowEnd; i++) {
            let matchLength = 0;
            
            // Find how long the match extends
            while (
                position + matchLength < lookAheadEnd &&
                i + matchLength < windowEnd &&
                data[i + matchLength] === data[position + matchLength]
            ) {
                matchLength++;
            }

            // Update best match if this is better
            if (matchLength > bestMatch.length) {
                bestMatch = {
                    offset: position - i,
                    length: matchLength,
                    nextChar: position + matchLength < data.length ? data[position + matchLength] : null
                };
            }
        }

        return bestMatch;
    }

    static encodeToBinary(tokens) {
        const buffer = [];
        
        for (const token of tokens) {
            if (token.type === 'literal') {
                // Format: 0 + 8-bit char
                buffer.push(0); // Type flag
                buffer.push(token.char.charCodeAt(0));
            } else {
                // Format: 1 + 12-bit offset + 4-bit length + optional 8-bit next char
                buffer.push(1); // Type flag
                
                // Encode offset in 2 bytes (12 bits used)
                buffer.push((token.offset >> 4) & 0xFF);
                buffer.push(((token.offset & 0x0F) << 4) | (token.length & 0x0F));
                
                // Add next character if present
                if (token.nextChar) {
                    buffer.push(token.nextChar.charCodeAt(0));
                } else {
                    buffer.push(0); // Null terminator
                }
            }
        }

        return Buffer.from(buffer);
    }

    static decodeFromBinary(buffer) {
        const tokens = [];
        let i = 0;

        while (i < buffer.length) {
            const type = buffer[i++];
            
            if (type === 0) {
                // Literal
                if (i < buffer.length) {
                    tokens.push({
                        type: 'literal',
                        char: String.fromCharCode(buffer[i++])
                    });
                }
            } else {
                // Match
                if (i + 2 < buffer.length) {
                    const offsetHigh = buffer[i++];
                    const offsetLowAndLength = buffer[i++];
                    const nextCharCode = buffer[i++];
                    
                    const offset = (offsetHigh << 4) | ((offsetLowAndLength >> 4) & 0x0F);
                    const length = offsetLowAndLength & 0x0F;
                    const nextChar = nextCharCode !== 0 ? String.fromCharCode(nextCharCode) : null;
                    
                    tokens.push({
                        type: 'match',
                        offset,
                        length,
                        nextChar
                    });
                }
            }
        }

        return tokens;
    }

    // Alternative simple implementation for educational purposes
    static compressSimple(data) {
        if (!data || data.length === 0) {
            return {
                compressedData: '',
                originalSize: 0,
                compressedSize: 0,
                compressionRatio: '0.00'
            };
        }

        const result = [];
        let i = 0;

        while (i < data.length) {
            let bestMatch = { distance: 0, length: 0 };
            
            // Look for matches in the previous 255 characters
            for (let j = Math.max(0, i - 255); j < i; j++) {
                let length = 0;
                while (
                    i + length < data.length &&
                    j + length < i &&
                    data[j + length] === data[i + length] &&
                    length < 255
                ) {
                    length++;
                }
                
                if (length > bestMatch.length) {
                    bestMatch = { distance: i - j, length };
                }
            }

            if (bestMatch.length > 2) {
                result.push(`<${bestMatch.distance},${bestMatch.length}>`);
                i += bestMatch.length;
            } else {
                result.push(data[i]);
                i++;
            }
        }

        const compressed = result.join('');
        const originalSize = data.length;
        const compressedSize = compressed.length;

        return {
            compressedData: Buffer.from(compressed, 'utf8'),
            originalSize,
            compressedSize,
            compressionRatio: originalSize > 0 ? 
                ((originalSize - compressedSize) / originalSize * 100).toFixed(2) : '0.00'
        };
    }

    static decompressSimple(compressedData) {
        if (!compressedData || compressedData.length === 0) {
            return '';
        }

        const data = compressedData.toString('utf8');
        let result = '';
        let i = 0;

        while (i < data.length) {
            if (data[i] === '<') {
                // Find the closing bracket
                const closeIndex = data.indexOf('>', i);
                if (closeIndex !== -1) {
                    const matchInfo = data.substring(i + 1, closeIndex);
                    const [distance, length] = matchInfo.split(',').map(Number);
                    
                    // Copy characters from the result
                    const startPos = result.length - distance;
                    for (let j = 0; j < length; j++) {
                        result += result[startPos + j];
                    }
                    
                    i = closeIndex + 1;
                } else {
                    result += data[i];
                    i++;
                }
            } else {
                result += data[i];
                i++;
            }
        }

        return result;
    }
}

module.exports = LZ77; 