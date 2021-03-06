import formatErrorMessage from "./formatErrorMessage";

const defaultTitle = "Request Failed";
const defaultMessage = "Try again.";
const customStatus = 403;
const customError = "Not allowed";
const customMessage = "You can't do this";

describe("formatErrorMessage", () => {
  test("returns default error messages - empty object", () => {
    let { title, message } = formatErrorMessage({});
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);
  });

  test("returns default error messages - response object but nothing else", () => {
    //has response object but nothing else
    let { title, message } = formatErrorMessage({ response: {} });
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);
  });

  test("returns default error messages - response and data objects, but still missing things", () => {
    //has response and data objects, but still missing things
    let { title, message } = formatErrorMessage({ response: { data: {} } });
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

  test("returns correct messages for different combinations - full custom", () => {
    // uses full custom response
    let errorRes = { response: { data: { status: customStatus, error: customError, message: customMessage } } };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.status} - ${errorRes.response.data.error}`);
    expect(message).toBe(errorRes.response.data.message);
  });

  test("returns correct messages for different combinations - partial title", () => {
    // uses partial title
    let errorRes = { response: { data: { status: customStatus, message: customMessage } } };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.status} - ${defaultTitle}`);
    expect(message).toBe(errorRes.response.data.message);
  });

  test("returns correct messages for different combinations - other partial title", () => {
    // uses other partial title
    let errorRes = { response: { data: { error: customError, message: customMessage } } };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.error}`);
    expect(message).toBe(errorRes.response.data.message);
  });

  test("returns correct messages for different combinations - only message", () => {
    // uses only message
    let errorRes = { response: { data: { error: customError } } };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.error}`);
    expect(message).toBe(defaultMessage);
  });

  test("returns correct messages for different combinations - full error object ", () => {
    // uses only message
    let errorRes = {
      response: { data: { error: { code: customStatus, message: customMessage } } },
    };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.error.code} - ${errorRes.response.data.error.message}`);
    expect(message).toBe(defaultMessage);
  });

  test("returns correct messages for different combinations - error object without code", () => {
    // uses only message
    let errorRes = {
      response: { data: { error: { message: customMessage } } },
    };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(customMessage);
    expect(message).toBe(defaultMessage);
  });

  test("returns correct messages for different combinations - error object without message", () => {
    // uses only message
    let errorRes = {
      response: { data: { error: { code: customStatus } } },
    };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(`${errorRes.response.data.error.code} - ${defaultTitle}`);
    expect(message).toBe(defaultMessage);
  });

  test("returns correct messages for different combinations - empty title object and no message", () => {
    // uses only message
    let errorRes = {
      response: { data: { error: {} } },
    };
    let { title, message } = formatErrorMessage({ error: errorRes });
    expect(title).toBe(defaultTitle);
    expect(message).toBe(defaultMessage);
  });
});
