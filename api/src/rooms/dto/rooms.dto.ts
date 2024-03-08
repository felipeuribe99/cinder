import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
  @ApiProperty({
    description: "The room's name",
    type: String,
    example: "Room 1"
  })
  name: string;
  
  @ApiProperty({
    description: "The room's organization ID",
    type: String,
    example: "65ea398ffd894565b7738174"
  })
  organizationId: string;
}

export class UpdateRoomDto {
  @ApiProperty({
    description: "The room's name",
    type: String,
    example: "Room 1"
  })
  name: string;
}
