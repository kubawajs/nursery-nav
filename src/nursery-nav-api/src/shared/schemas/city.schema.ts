import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
    @Prop()
    city: string;

    @Prop()
    county: string;

    @Prop()
    community: string;

    @Prop()
    voivodeship: string;
}

export const CitySchema = SchemaFactory.createForClass(City);