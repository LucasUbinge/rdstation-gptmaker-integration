class ApiServiceError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiServiceError";
    this.statusCode = statusCode;
  }
}

export default ApiServiceError;
