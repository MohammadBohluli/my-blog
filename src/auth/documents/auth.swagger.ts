import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
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

// export const ApiRefreshTokenSwagger = () => {
//   return applyDecorators(
//     ApiBearerAuth(),
//     ApiOperation({
//       summary: '',
//       description: '',
//     }),
//     ApiOkResponse({
//       type: '',
//       description: '',
//     }),
//   );
// };

export const ApiVerifyAccountSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Account Verification',
      description: `Verifies a user's account using the provided user ID and verification code. 
      This endpoint ensures that the user's email has been validated and that they can access 
      the system securely.`,
    }),
    ApiOkResponse({
      description: `Account verified successfully. The user can now access their account.`,
    }),
    ApiParam({
      name: 'userId',
      required: true,
      description:
        'The unique identifier of the user whose account is being verified.',
      type: Number,
    }),
    ApiParam({
      name: 'verificationCode',
      required: true,
      description: `The verification code sent to the user’s email for account validation.`,
      type: String,
    }),
  );
};

export const ApiForgotPasswordSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Forgot Password',
      description: `Initiates the password recovery process by sending a password reset link 
      to the user's registered email address. This endpoint requires the user to provide their 
      email to receive the reset instructions.`,
    }),
    ApiOkResponse({
      description: `A password reset link has been successfully sent to the provided email address.`,
    }),
    ApiBody({
      type: ForgotPasswordDto,
      description: `Object containing the user’s email address for password recovery.`,
    }),
  );
};

export const ApiResetPasswordSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Reset Password',
      description: `Initiates the process of resetting a user's password using a valid reset token. 
      The user must provide their unique identifier, along with the new password and the reset token 
      received via email. Upon successful reset, the user's password will be updated.`,
    }),
    ApiOkResponse({
      description: 'Your password has been successfully changed.',
    }),
    ApiBody({
      type: ForgotPasswordDto,
      description: `An object containing the new password that the user wants to set. 
      This is required to complete the password reset process.`,
    }),
    ApiParam({
      name: 'userId',
      required: true,
      description:
        'The unique identifier of the user whose account is being verified.',
      type: Number,
    }),
    ApiParam({
      name: 'resetToken',
      required: true,
      description: `The reset token sent to the user’s email for reset password.`,
      type: String,
    }),
  );
};

export const ApiChangePasswordSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Change Password',
      description: `Allows the authenticated user to change their password. 
      The user must provide their current password along with the new password.`,
    }),
    ApiOkResponse({
      description: 'Your password has been successfully changed.',
    }),
    ApiBody({
      type: ChangePasswordDto,
      description: `An object containing the new password.`,
    }),
  );
};
