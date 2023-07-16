import { IsString, Length } from 'class-validator';

export class PostDto {
  @IsString()
  @Length(1, 40)
  title: string;
  @IsString()
  @Length(1, 400)
  content: string;
}
