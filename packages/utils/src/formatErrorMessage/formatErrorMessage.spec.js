import formatErrorMessage from "../formatErrorMessage";

const defaultTitle = "Something's Wrong";
const defaultMessage = "Request failed";

describe("formatErrorMessage Utility", () => {
  test("returns default error messages", () => {
    //empty object
    var { title, message } = formatErrorMessage({});
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);

    //has response object but nothing else
    var { title, message } = formatErrorMessage({ response: {} });
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);

    //has response and data objects, but still missing things
    var { title, message } = formatErrorMessage({ response: { data: {} } });
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);
  });

  test("returns fallback error messages", () => {
    const defaultTitle = " Title";
    const defaultMessage = "Message";
    const { title, message } = formatErrorMessage({ defaultTitle, defaultMessage });
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);
  });

  test("returns correct messages for different combinations", () => {
    const customStatus = 403;
    const customError = "Not allowed";
    const customMessage = "You can't do this";

    // uses full custom response
    var errorRes = { response: { data: { status: customStatus, error: customError, message: customMessage } } };
    var { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.status} - ${errorRes.response.data.error}`);
    expect(message).toBe(errorRes.response.data.message);

    // uses partial title
    var errorRes = { response: { data: { status: customStatus, message: customMessage } } };
    var { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.status} - ${defaultTitle}`);
    expect(message).toBe(errorRes.response.data.message);

    // uses other partial title
    var errorRes = { response: { data: { error: customError, message: customMessage } } };
    var { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.error}`);
    expect(message).toBe(errorRes.response.data.message);

    // uses only message
    var errorRes = { response: { data: { error: customError } } };
    var { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.error}`);
    expect(message).toBe(defaultMessage);
  });
});
