export type Response<T> = {
  success: true;
  data: T;
};

export type SuccessResponseNoData = {
  success: true;
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type BaseResponse<T> = Response<T>;

export type BaseResponseNoData = SuccessResponseNoData;
