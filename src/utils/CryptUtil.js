import CryptoJS from 'crypto-js';

export const BASE64Helper = {
    encode(str) {
        const wordArray = CryptoJS.enc.Utf8.parse(str);
        const base64 = CryptoJS.enc.Base64.stringify(wordArray);
        return base64;
    },
    decode(base64Str) {
        const parsedWordArray = CryptoJS.enc.Base64.parse(base64Str);
        return parsedWordArray.toString(CryptoJS.enc.Utf8);
    },
};

const AES = {
    key: CryptoJS.enc.Utf8.parse('36100-Autchan_ak'),
    iv: CryptoJS.enc.Utf16.parse('autchan-php36100'),
    encrypt(src) {
        if (!src) {
            return '';
        }
        const enc = CryptoJS.AES.encrypt(src, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return enc.ciphertext.toString(CryptoJS.enc.Base64);
    },
    decrypt(encryptStr) {
        if (!encryptStr) {
            return '';
        }
        const decBytes = CryptoJS.AES.decrypt(encryptStr, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decBytes.toString(CryptoJS.enc.Utf8);
    },
};

export const AESHelper = {
    /**
     * 加密
     */
    encrypt(src) {
        return AES.encrypt(src);
    },
    /**
     * 解密
     */
    decrypt(encryptStr) {
        return AES.decrypt(encryptStr);
    },
};
