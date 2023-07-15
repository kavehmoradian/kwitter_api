import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('username or password is wrong :(', HttpStatus.BAD_REQUEST);
  }
}
