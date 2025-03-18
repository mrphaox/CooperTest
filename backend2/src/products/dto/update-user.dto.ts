import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-user.dto';


export class UpdateProductDto extends PartialType(CreateProductDto) {}
