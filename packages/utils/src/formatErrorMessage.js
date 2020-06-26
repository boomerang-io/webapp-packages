export default function formatErrorMessage({
  error,
  defaultMessage = "Request failed",
  defaultTitle = "Something's Wrong"
}) {
  let title = defaultTitle;
  let message = defaultMessage;
  const data = error?.response?.data;

  // No data, bail early and return default messages
  if (!data) {
    return { title, message };
  }

  // set title based on what is returned
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

  return { title, message };
}
