class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

class HuffmanCoding {
    static buildFrequencyTable(data) {
        const freq = {};
        for (let i = 0; i < data.length; i++) {
            const char = data[i];
            freq[char] = (freq[char] || 0) + 1;
        }
        return freq;
    }

    static buildHuffmanTree(freq) {
        const heap = [];
        
        // Create leaf nodes for each character
        for (const [char, frequency] of Object.entries(freq)) {
            heap.push(new HuffmanNode(char, frequency));
        }

        // Build tree bottom-up
        while (heap.length > 1) {
            // Sort by frequency (simple approach, could use proper heap)
            heap.sort((a, b) => a.freq - b.freq);
            
            const left = heap.shift();
            const right = heap.shift();
            
            const merged = new HuffmanNode(null, left.freq + right.freq, left, right);
            heap.push(merged);
        }

        return heap[0];
    }

    static buildCodes(root) {
        const codes = {};
        
        function traverse(node, code = '') {
            if (!node) return;
            
            if (node.char !== null) {
                codes[node.char] = code || '0'; // Handle single character case
                return;
            }
            
            if (node.left) traverse(node.left, code + '0');
            if (node.right) traverse(node.right, code + '1');
        }
        
        traverse(root);
        return codes;
    }

    static compress(data) {
        if (!data || data.length === 0) {
            return { compressedData: '', tree: null, originalSize: 0, compressedSize: 0 };
        }

        const freq = this.buildFrequencyTable(data);
        const tree = this.buildHuffmanTree(freq);
        const codes = this.buildCodes(tree);

        let compressedBits = '';
        for (let i = 0; i < data.length; i++) {
            compressedBits += codes[data[i]];
        }

        // Convert bits to bytes for storage
        const compressedData = this.bitsToBytes(compressedBits);
        
        return {
            compressedData,
            tree: this.serializeTree(tree),
            codes,
            originalSize: data.length,
            compressedSize: compressedData.length,
            compressionRatio: ((data.length - compressedData.length) / data.length * 100).toFixed(2)
        };
    }

    static decompress(compressedData, serializedTree) {
        if (!compressedData || !serializedTree) {
            return '';
        }

        const tree = this.deserializeTree(serializedTree);
        const bits = this.bytesToBits(compressedData);
        
        let result = '';
        let current = tree;
        
        for (const bit of bits) {
            if (current.char !== null) {
                result += current.char;
                current = tree;
            }
            
            if (bit === '0' && current.left) {
                current = current.left;
            } else if (bit === '1' && current.right) {
                current = current.right;
            }
        }
        
        // Handle last character
        if (current && current.char !== null) {
            result += current.char;
        }
        
        return result;
    }

    static bitsToBytes(bits) {
        const bytes = [];
        // Pad bits to make it divisible by 8
        const paddedBits = bits + '0'.repeat((8 - bits.length % 8) % 8);
        
        for (let i = 0; i < paddedBits.length; i += 8) {
            const byte = paddedBits.slice(i, i + 8);
            bytes.push(parseInt(byte, 2));
        }
        
        return Buffer.from(bytes);
    }

    static bytesToBits(buffer) {
        let bits = '';
        for (const byte of buffer) {
            bits += byte.toString(2).padStart(8, '0');
        }
        return bits;
    }

    static serializeTree(node) {
        if (!node) return null;
        
        return {
            char: node.char,
            freq: node.freq,
            left: this.serializeTree(node.left),
            right: this.serializeTree(node.right)
        };
    }

    static deserializeTree(serialized) {
        if (!serialized) return null;
        
        const node = new HuffmanNode(serialized.char, serialized.freq);
        node.left = this.deserializeTree(serialized.left);
        node.right = this.deserializeTree(serialized.right);
        
        return node;
    }
}

module.exports = HuffmanCoding; 