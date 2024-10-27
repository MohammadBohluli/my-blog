import { ApiProperty } from '@nestjs/swagger';

export class CustomResponse<T> {
  @ApiProperty({
    description: 'Indicates if the response was successful or not',
    type: Boolean,
    required: false,
  })
  status: boolean;
  @ApiProperty({
    description: 'HTTP status code of the response',
    type: Number,
    required: false,
  })
  statusCode: number;

  @ApiProperty({
    description: 'The endpoint path that was requested',
    type: String,
    required: false,
  })
  path: string;

  @ApiProperty({
    description: 'Detailed message from the server regarding the response',
    type: String,
    required: false,
  })
  message: string;
  @ApiProperty({
    description:
      'Payload containing the response data; can be an object or an array of objects',
    required: false,
    oneOf: [
      { type: 'object', additionalProperties: true },
      { type: 'array', items: { type: 'object' } },
    ],
  })
  data: T;
  @ApiProperty({
    description: 'Timestamp indicating when the response was generated',
    type: Date,
    required: false,
  })
  timestamp: Date;
}
