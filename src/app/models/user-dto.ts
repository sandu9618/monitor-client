export class UserDto {
    userId: string;
    username: string;
    email: string;
    telephone: string;
  constructor(userId: string, username: string, email: string, telephone: string) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.telephone = telephone;
  }
}
