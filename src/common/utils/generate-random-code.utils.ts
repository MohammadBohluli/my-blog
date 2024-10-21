import { randomBytes } from 'crypto';

const generateRandomCode = () => randomBytes(16).toString('hex');

export default generateRandomCode;
