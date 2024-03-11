import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The user's name",
    example: "John Doe"
  })
  name: string;
  
  @ApiProperty({
    description: "The user's email",
    example: "example@cinder.org"
  })
  email: string;

  @ApiProperty({
    description: "The user's password",
    example: "password"
  })
  password: string;
  
  @ApiProperty({
    description: "The user's admin status",
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
  organizationId?: string;

  @ApiProperty({
    description: "The user's rooms ID",
    type: [String],
    example: ["65ea398ffd894565b7738174"]
  })
  roomIds?: string[];

  @ApiProperty({
    description: "The user's status in the org",
    type: Boolean,
    example: false
  })
  is_approved?: boolean;
}
