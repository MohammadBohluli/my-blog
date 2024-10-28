import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CategoryDto } from '../dtos/category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export const ApiFindAllCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find All Categories',
      description: `Retrieves a list of all categories available.`,
    }),
    ApiOkResponse({
      type: CategoryDto,
      description: `successful response with an array of category objects.`,
    }),
  );
};

export const ApiFindCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find Category',
      description: `Fetches the details of a specific category by its unique ID.`,
    }),
    ApiOkResponse({
      type: CategoryDto,
      description: `Category has been successfully founded.`,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `The unique identifier of the category to be retrieved.`,
      type: Number,
    }),
  );
};

export const ApiCreateCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create Category',
      description: `Creates a new category with the provided name. (just ADMIN users)`,
    }),
    ApiCreatedResponse({
      description: `Category has been successfully created.`,
    }),

    ApiBody({
      type: CreateCategoryDto,
      description: `The data needed to create a new category, including the category name.`,
    }),
  );
};

export const ApiUpdateCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update Category',
      description: `Updates an existing category with new details based on the provided category ID. (just ADMIN users)`,
    }),
    ApiOkResponse({
      description: `Category has been successfully updated.`,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `The unique identifier of the category to be updated.`,
      type: Number,
    }),
    ApiBody({
      type: UpdateCategoryDto,
      description: `The data required to update the category. Note: name must be unique.`,
    }),
  );
};

export const ApiDeleteCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete Category',
      description: `Deletes an existing category based on the provided category ID. (just ADMIN users)`,
    }),
    ApiOkResponse({
      description: `Category has been successfully deleted.`,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `The unique identifier of the category to be deleted.`,
      type: Number,
    }),
  );
};
// ///////////////////////////////
// export const ApiSignUpSwagger = () => {
//   return applyDecorators(
//     ApiOperation({
//       summary: 'User Sign Up',
//       description: `Registers a new user in the system by providing the required details.
//          Upon successful registration, a verification email will be sent to the registered email address.`,
//     }),
//     ApiCreatedResponse({
//       description:
//         'User created successfully, verification email will be sent to the registered email address',
//     }),
//     ApiBody({
//       type: CreateUserDto,
//       description: `Object containing user registration details and
//       All fields are required(except name) for successful registration.`,
//     }),
//   );
// };

// export const ApiSignInSwagger = () => {
//   return applyDecorators(
//     ApiOperation({
//       summary: 'User Sign In',
//       description: `User authenticated successfully. A JWT token is returned for further requests.
//       If the account is not verified, a verification email will be sent to the registered email address.`,
//     }),
//     ApiOkResponse({
//       schema: {
//         type: 'object',
//         properties: {
//           accessToken: {
//             type: 'string',
//             description:
//               'JWT access token for authenticating subsequent requests.',
//           },
//           refreshToken: {
//             type: 'string',
//             description:
//               'JWT refresh token used to obtain a new access token upon expiration.',
//           },
//         },
//       },
//       description:
//         'User authenticated successfully. Returns a JWT token for further requests.',
//     }),
//     ApiBody({
//       type: SigninDto,
//       description: `Object containing user credentials.`,
//     }),
//   );
// };

// export const ApiSignOutSwagger = () => {
//   return applyDecorators(
//     ApiBearerAuth(),
//     ApiOperation({
//       summary: 'User Sign Out',
//       description: `The user has successfully signed out of their account. Note: If you're using Swagger UI,
//         please log out using the 'Authorize' button`,
//     }),
//     ApiOkResponse({
//       description: 'User signed out successfully.',
//     }),
//   );
// };

// export const ApiRefreshTokenSwagger = () => {
//   return applyDecorators(
//     ApiBearerAuth(),
//     ApiOperation({
//       summary: 'Refresh the Access Token',
//       description: `Allows users to obtain a new access token using a valid refresh token.
//                     The refresh token should be provided in the Authorization header as Bearer <refresh_token>.`,
//     }),
//     ApiOkResponse({
//       description: `Returns a new access and refresh token.`,
//     }),
//   );
// };

// export const ApiVerifyAccountSwagger = () => {
//   return applyDecorators(
//     ApiOperation({
//       summary: 'Account Verification',
//       description: `Verifies a user's account using the provided user ID and verification code.
//       This endpoint ensures that the user's email has been validated and that they can access
//       the system securely.`,
//     }),
//     ApiOkResponse({
//       description: `Account verified successfully. The user can now access their account.`,
//     }),
//     ApiParam({
//       name: 'userId',
//       required: true,
//       description:
//         'The unique identifier of the user whose account is being verified.',
//       type: Number,
//     }),
//     ApiParam({
//       name: 'verificationCode',
//       required: true,
//       description: `The verification code sent to the user’s email for account validation.`,
//       type: String,
//     }),
//   );
// };

// export const ApiForgotPasswordSwagger = () => {
//   return applyDecorators(
//     ApiOperation({
//       summary: 'Forgot Password',
//       description: `Initiates the password recovery process by sending a password reset link
//       to the user's registered email address. This endpoint requires the user to provide their
//       email to receive the reset instructions.`,
//     }),
//     ApiOkResponse({
//       description: `A password reset link has been successfully sent to the provided email address.`,
//     }),
//     ApiBody({
//       type: ForgotPasswordDto,
//       description: `Object containing the user’s email address for password recovery.`,
//     }),
//   );
// };

// export const ApiResetPasswordSwagger = () => {
//   return applyDecorators(
//     ApiOperation({
//       summary: 'Reset Password',
//       description: `Initiates the process of resetting a user's password using a valid reset token.
//       The user must provide their unique identifier, along with the new password and the reset token
//       received via email. Upon successful reset, the user's password will be updated.`,
//     }),
//     ApiOkResponse({
//       description: 'Your password has been successfully changed.',
//     }),
//     ApiBody({
//       type: ForgotPasswordDto,
//       description: `An object containing the new password that the user wants to set.
//       This is required to complete the password reset process.`,
//     }),
//     ApiParam({
//       name: 'userId',
//       required: true,
//       description:
//         'The unique identifier of the user whose account is being verified.',
//       type: Number,
//     }),
//     ApiParam({
//       name: 'resetToken',
//       required: true,
//       description: `The reset token sent to the user’s email for reset password.`,
//       type: String,
//     }),
//   );
// };

// export const ApiChangePasswordSwagger = () => {
//   return applyDecorators(
//     ApiBearerAuth(),
//     ApiOperation({
//       summary: 'Change Password',
//       description: `Allows the authenticated user to change their password.
//       The user must provide their current password along with the new password.`,
//     }),
//     ApiOkResponse({
//       description: 'Your password has been successfully changed.',
//     }),
//     ApiBody({
//       type: ChangePasswordDto,
//       description: `An object containing the new password.`,
//     }),
//   );
// };
