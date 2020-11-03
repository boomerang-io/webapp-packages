import isPlainObject from "lodash/isPlainObject";

export default function formatErrorMessage({
  error,
  defaultMessage = "Request failed",
  defaultTitle = "Something's Wrong",
}) {
  let title = defaultTitle;
  let message = defaultMessage;
  const data = error?.response?.data;

  // No data, bail early and return default messages
  if (!data) {
    return { title, message };
  }

  // if returning an object for the title
  if (isPlainObject(data.title)) {
    const titleObj = data.title;
    if (titleObj.code && titleObj.message) {
      message = `${titleObj.code} - ${titleObj.message}`;
    } else if (titleObj.code) {
      message = `${titleObj.code} - Something's Wrong`;
    } else if (titleObj.message) {
      message = titleObj.message;
    }
    if (data.message) {
      title = data.message;
    }
  } else {
    if (data.status && data.error) {
      title = `${data.status} - ${data.error}`;
    } else if (data.status) {
      title = `${data.status} - Something's Wrong`;
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
