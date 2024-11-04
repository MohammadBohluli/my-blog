import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';

export const ApiGetProfileSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Retrieve User Profile',
      description:
        'Fetches the user profile information for the authenticated user.',
    }),
    ApiOkResponse({
      type: UserDto,
      description: 'User profile retrieved successfully.',
    }),
  );
};

export const ApiUpdateUserSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update User Profile',
      description:
        'Updates the user profile information. Each field is optional.',
    }),
    ApiOkResponse({
      type: UserDto,
      description: 'User profile updated successfully.',
    }),
    ApiBody({
      type: UpdateUserDto,
      description: 'Fields to update. All fields are optional.',
      required: false,
    }),
  );
};

export const ApiDeleteProfileSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete User Profile',
      description:
        'Completely deletes the user profile along with all articles.',
    }),
    ApiOkResponse({
      description:
        'The user profile and associated articles have been successfully deleted.',
    }),
  );
};
