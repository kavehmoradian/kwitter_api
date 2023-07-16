import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class PostDto {
  @IsString()
  @Length(1, 40)
  @ApiProperty()
  title: string;
  @IsString()
  @Length(1, 400)
  @ApiProperty()
  content: string;
}
