interface ICustomError {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
}

export const getError = (error: ICustomError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
