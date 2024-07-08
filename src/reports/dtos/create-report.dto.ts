import {
  IsNumber,
  IsString,
  IsLongitude,
  IsLatitude,
  Min,
  Max,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  mileage: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsLatitude()
  @IsNumber()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  price: number;
}
