
export function payload(text) {
  return {
    payload: {
      slack: {
        text,
      }
    }
  }
}
