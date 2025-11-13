export interface IRequestHandler {
  data?: any;
  error?: any;
}
export interface RequestHandlerResponse {
  data?: any | null | undefined;
  isSuccess: boolean;
  errorMessage?: string | undefined;
  errorStatus?: string | undefined;
}
