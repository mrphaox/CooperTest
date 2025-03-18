import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-user.dto';
import { UpdateProductDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // Crear producto 
    @ApiBearerAuth()
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    // Listar productos 
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    // Obtener un producto por ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findById(id);
    }

    // Actualizar producto
    @ApiBearerAuth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    // Eliminar producto
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
