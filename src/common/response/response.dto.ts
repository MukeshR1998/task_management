export class ResponseDto {
  data?: any;
  message?: string = 'Api successful';
  status?: number;

  constructor(data?, message?, code?) {
    if (data != undefined) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }

    if (code) {
      this.status = code;
    }
  }
}
