import * as CryptoJS from 'crypto-js';
export class User {
  id: string = '0';
  constructor(
    public username: string,
    public password: string,
    public email: string
  ) {
    this.id = this.generateHashId(username);
  }

  private generateHashId(username: string): string {
    // Tạo hash SHA-256 từ username và lấy 8 ký tự đầu
    return CryptoJS.SHA256(username).toString(CryptoJS.enc.Hex).substring(0, 8);
  }
}
