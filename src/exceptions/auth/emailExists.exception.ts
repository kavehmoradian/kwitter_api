import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExistsException extends HttpException {
  constructor() {
    super('this email has registered before :(', HttpStatus.BAD_REQUEST);
  }
}
