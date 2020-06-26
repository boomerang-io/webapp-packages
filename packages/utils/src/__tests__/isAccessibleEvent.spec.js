import { isAccessibleEvent } from "../index";

const keydownEnterEvent = { type: "keydown", key: "Enter" };

describe("isAccessibleEvent", () => {
  test("default click event", () => {
    expect(isAccessibleEvent({ type: "click" })).toBeTruthy();
  });

  test("default role=button keyboard event passes: enter code", () => {
    expect(isAccessibleEvent({ type: "keydown", code: "Enter" })).toBeTruthy();
  });

  test("default role=button keyboard event passes: space code", () => {
    expect(isAccessibleEvent({ type: "keydown", code: "Space" })).toBeTruthy();
  });

  test("default role=button keyboard event passes: enter key", () => {
    expect(isAccessibleEvent(keydownEnterEvent)).toBeTruthy();
  });

  test("default role=button keyboard event passes: space key", () => {
    expect(isAccessibleEvent({ type: "keydown", key: " " })).toBeTruthy();
  });

  test("non-interactive event type with defaults fails", () => {
    expect(isAccessibleEvent({ type: "hover" })).toBeFalsy();
  });

  test("non-interactive event key with defaults fails", () => {
    expect(isAccessibleEvent({ type: "keydown", key: "Escape" })).toBeFalsy();
  });

  test("custom event with matching event passes", () => {
    expect(isAccessibleEvent({ type: "keyup", key: "Enter" }, { types: ["keyup"] })).toBeTruthy();
  });

  test("custom key with matching event passes", () => {
    expect(isAccessibleEvent({ type: "keydown", key: "Escape" }, { keys: ["Escape"] })).toBeTruthy();
  });

  test("custom event with non-matching event fails", () => {
    expect(isAccessibleEvent(keydownEnterEvent, { types: "hover" })).toBeFalsy();
  });

  test("custom key with non-matching event fails", () => {
    expect(isAccessibleEvent(keydownEnterEvent, { keys: "Escape", codes: "Escape" })).toBeFalsy();
  });
});
