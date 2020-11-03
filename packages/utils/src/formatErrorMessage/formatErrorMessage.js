import isPlainObject from "lodash/isPlainObject";

export default function formatErrorMessage({ error, defaultTitle = "Request Failed", defaultMessage = "Try again." }) {
  let title = defaultTitle;
  let message = defaultMessage;
  const data = error?.response?.data;

  // No data, bail early and return default messages
  if (!data) {
    return { title, message };
  }

  // if returning an object for the title
  if (isPlainObject(data.error)) {
    const errorObj = data.error;
    if (errorObj.code && errorObj.message) {
      title = `${errorObj.code} - ${errorObj.message}`;
    } else if (errorObj.code) {
      title = `${errorObj.code} - ${defaultTitle}`;
    } else if (errorObj.message) {
      title = errorObj.message;
    }
  } else {
    if (data.status && data.error) {
      title = `${data.status} - ${data.error}`;
    } else if (data.status) {
      title = `${data.status} - ${defaultTitle}`;
    } else if (data.error) {
      title = data.error;
    }

    // set message if its there
    if (data.message) {
      message = data.message;
    }
  }

  return { title, message };
}
