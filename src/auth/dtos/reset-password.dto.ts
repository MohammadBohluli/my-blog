export class ResetPasswordDto {
  resetToken: string | null;
  expiresAt: Date | null;
}
