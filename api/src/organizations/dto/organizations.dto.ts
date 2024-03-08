import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrganizationDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "The organization's name",
    type: String,
    example: "Cinder"
  })
  name: string;
  
  @IsNotEmpty()
  @ApiProperty({
    description: "The admin id",
    type: String,
    example: "65ea398ffd894565b7738174"
  })
  admin: string;
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
