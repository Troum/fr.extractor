export default interface ErrorResponseInterface {
  response: {
    data: {
      success: boolean;
      message: string;
      trace: string;
    }
  }
}
