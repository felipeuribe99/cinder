import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateOrganizationDto {
  @ApiProperty({
    description: "The organization's name",
    type: String,
    example: "Cinder"
  })
  name: string;
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
