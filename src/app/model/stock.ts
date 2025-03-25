import * as CryptoJS from 'crypto-js';
export class Stock {
    favorite: boolean = false;
    id: string = "0";
    constructor(public name: string,
        public code: string,
        public price: number,
        public previousPrice: number,
        public exchange: string
    ) {
        this.id = this.generateHashId(code);
    }

    private generateHashId(code: string): string {
        // Tạo hash SHA-256 từ code và lấy 8 ký tự đầu
        return CryptoJS.SHA256(code).toString(CryptoJS.enc.Hex).substring(0, 8);
    }

    isPositiveChange(): boolean {
        return this.price > this.previousPrice;
    }
}
