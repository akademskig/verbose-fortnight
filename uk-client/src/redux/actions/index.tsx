// action types
export const RESIZE_WINDOW = "RESIZE_WINDOW"


/*
 * action creators
 */


export function resizeWindow(width: number) {
    return { type: RESIZE_WINDOW, width }
}
