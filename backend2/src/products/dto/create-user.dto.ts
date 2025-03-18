import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoria: string;
}
