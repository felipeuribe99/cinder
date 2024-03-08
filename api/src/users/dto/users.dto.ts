import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's name",
    type: String,
    example: "John Doe"
  })
  name: string;
  
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's email",
    type: String,
    example: "example@cinder.org"
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "The user's password",
    type: String,
    example: "password"
  })
  password: string;
  
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's admin status",
    type: Boolean,
    example: false
  })
  admin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @ApiProperty({
  //   description: "The user's organization ID",
  //   type: String,
  //   example: "65ea398ffd894565b7738174"
  // })
  // organization: string;

  // @ApiProperty({
  //   description: "The user's room ID",
  //   type: [String],
  //   example: ["65ea398ffd894565b7738174"]
  // })
  // room: string[];
}