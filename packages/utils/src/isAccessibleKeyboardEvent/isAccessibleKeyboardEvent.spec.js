import isAccessibleKeyboardEvent from "./index";

const keydownEnterEvent = { type: "keydown", key: "Enter" };

describe("isAccessibleKeyboardEvent", () => {
  test("default click event", () => {
    expect(isAccessibleKeyboardEvent({ type: "click" })).toBeTruthy();
  });

  test("default role=button keyboard event passes: enter code", () => {
    expect(isAccessibleKeyboardEvent({ type: "keydown", code: "Enter" })).toBeTruthy();
  });

  test("default role=button keyboard event passes: space code", () => {
    expect(isAccessibleKeyboardEvent({ type: "keydown", code: "Space" })).toBeTruthy();
  });

  test("default role=button keyboard event passes: enter key", () => {
    expect(isAccessibleKeyboardEvent(keydownEnterEvent)).toBeTruthy();
  });

  test("default role=button keyboard event passes: space key", () => {
    expect(isAccessibleKeyboardEvent({ type: "keydown", key: " " })).toBeTruthy();
  });

  test("non-interactive event type with defaults fails", () => {
    expect(isAccessibleKeyboardEvent({ type: "hover" })).toBeFalsy();
  });

  test("non-interactive event key with defaults fails", () => {
    expect(isAccessibleKeyboardEvent({ type: "keydown", key: "Escape" })).toBeFalsy();
  });

  test("custom event with matching event passes", () => {
    expect(isAccessibleKeyboardEvent({ type: "keyup", key: "Enter" }, { types: ["keyup"] })).toBeTruthy();
  });

  test("custom key with matching event passes", () => {
    expect(isAccessibleKeyboardEvent({ type: "keydown", key: "Escape" }, { keys: ["Escape"] })).toBeTruthy();
  });

  test("custom event with non-matching event fails", () => {
    expect(isAccessibleKeyboardEvent(keydownEnterEvent, { types: "hover" })).toBeFalsy();
  });

  test("custom key with non-matching event fails", () => {
    expect(isAccessibleKeyboardEvent(keydownEnterEvent, { keys: "Escape", codes: "Escape" })).toBeFalsy();
  });
});
