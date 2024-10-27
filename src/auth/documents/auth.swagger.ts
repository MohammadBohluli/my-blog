import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SigninDto } from '../dtos/signin.dto';

export const ApiSignUpSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'User Sign Up',
      description: `Registers a new user in the system by providing the required details.
         Upon successful registration, a verification email will be sent to the registered email address.`,
    }),
    ApiCreatedResponse({
      description:
        'User created successfully, verification email will be sent to the registered email address',
    }),
    ApiBody({
      type: CreateUserDto,
      description: `Object containing user registration details and
      All fields are required(except name) for successful registration.`,
    }),
  );
};

export const ApiSignInSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'User Sign In',
      description: `User authenticated successfully. A JWT token is returned for further requests. 
      If the account is not verified, a verification email will be sent to the registered email address.`,
    }),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            description:
              'JWT access token for authenticating subsequent requests.',
          },
          refreshToken: {
            type: 'string',
            description:
              'JWT refresh token used to obtain a new access token upon expiration.',
          },
        },
      },
      description:
        'User authenticated successfully. Returns a JWT token for further requests.',
    }),
    ApiBody({
      type: SigninDto,
      description: `Object containing user credentials.`,
    }),
  );
};

export const ApiSignOutSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'User Sign Out',
      description: `The user has successfully signed out of their account. Note: If you're using Swagger UI, 
        please log out using the 'Authorize' button`,
    }),
    ApiOkResponse({
      description: 'User signed out successfully.',
    }),
  );
};

export const ApiRefreshTokenSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiOkResponse({
      type: '',
      description: '',
    }),
  );
};

export const ApiVerifyAccountSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiOkResponse({
      type: '',
      description: '',
    }),
  );
};

export const ApiForgotPasswordSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiOkResponse({
      type: '',
      description: '',
    }),
  );
};

export const ApiResetPasswordSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiOkResponse({
      type: '',
      description: '',
    }),
  );
};

export const ApiChangePasswordSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiOkResponse({
      type: '',
      description: '',
    }),
  );
};
