import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty({
    description: "The message's content",
    type: String,
    example: "Hello World!"
  })
  text: string;

  @ApiProperty({
    description: "The message's room ID",
    type: String,
    example: "65ea398ffd894565b7738174"
  })
  roomId: string;
}

