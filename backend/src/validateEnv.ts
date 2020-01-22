import {
  cleanEnv, str, port, bool
} from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DEBUG: bool(),
  });
}
