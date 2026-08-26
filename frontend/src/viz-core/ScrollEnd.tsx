/**
 * Trailing spacer for scrollytelling pages. ScrollSection activates a step
 * once it crosses the vertical center of the viewport; without room to
 * scroll past it, the last step of the last section on a page can never
 * reach that center band and stays permanently dimmed.
 */
export function ScrollEnd() {
  return <div className="h-[40vh]" aria-hidden="true" />;
}
