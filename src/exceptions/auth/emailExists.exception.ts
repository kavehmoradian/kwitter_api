import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExists extends HttpException {
  constructor() {
    super('this email has registered before :(', HttpStatus.BAD_REQUEST);
  }
}
