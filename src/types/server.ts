import { NextResponse } from 'next/server';
import ServerError from './error';

class Response {
  static success<T>(data?: T) {
    return NextResponse.json({ success: true, data }, { status: 200 });
  }

  static error(err: unknown) {
    const { message, statusCode } = ServerError.from(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: statusCode }
    );
  }

  static parseError(err: unknown) {
    return ServerError.from(err).message;
  }
}

export default Response;
