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
    const errorTitle = data.error || data.title;
    if (data.status && errorTitle) {
      title = `${data.status} - ${errorTitle}`;
    } else if (data.status) {
      title = `${data.status} - ${defaultTitle}`;
    } else if (errorTitle) {
      title = errorTitle;
    }

    // set message if its there
    const errorMessage = data.detail || data.message;
    if (errorMessage) {
      message = errorMessage;
    }
  }

  return { title, message };
}
