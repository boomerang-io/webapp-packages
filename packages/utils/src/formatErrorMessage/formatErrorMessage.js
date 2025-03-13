import isPlainObject from "lodash/isPlainObject";

export default function formatErrorMessage({ error, defaultTitle = "Request Failed", defaultMessage = "Please try again" }) {
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
    if (errorObj.message) {
      title = errorObj.message;
    }

  } else {
    const errorTitle = data.error || data.title;
    if (errorTitle) {
      title = errorTitle;
    }

    // set message if its there
    const errorMessage = data.detail || data.message;
    if (errorMessage) {
      message = errorMessage;
    }
  }

  title = `${title}.`;
  message = `${message}.`;

  return { title, message };
}
