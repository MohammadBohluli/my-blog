import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';

export const ApiGetProfileSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({
      type: UserDto,
      description: 'User profile retrieved successfully.',
    }),
  );
};

export const ApiUpdateUserSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({ description: 'User profile updated successfully.' }),
    ApiBody({
      type: UpdateUserDto,
      description: 'Fields to update. All fields are optional.',
      required: false,
    }),
  );
};
