import * as bcrypt from 'bcryptjs';

export class UserUtil {
  public static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  public static comparePassword(enteredPassword, dbPassword) {
    return bcrypt.compare(enteredPassword, dbPassword);
  }

  public static randomPassword() {
    let pass = '';
    const str =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    return pass;
  }
}
