import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The user's name",
    type: String,
    example: "John Doe"
  })
  name: string;
  
  @ApiProperty({
    description: "The user's email",
    type: String,
    example: "example@cinder.org"
  })
  email: string;

  @ApiProperty({
    description: "The user's password",
    type: String,
    example: "password"
  })
  password: string;
  
  @ApiProperty({
    description: "The user's admin status",
    type: Boolean,
    example: false
  })
  admin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "The user's organization ID",
    type: String,
    example: "65ea398ffd894565b7738174"
  })
  organizationId: string;

  // @ApiProperty({
  //   description: "The user's room ID",
  //   type: [String],
  //   example: ["65ea398ffd894565b7738174"]
  // })
  // room: string[];
}
