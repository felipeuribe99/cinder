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
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
