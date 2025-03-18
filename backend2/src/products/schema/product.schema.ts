import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ required: true })
  categoria: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
