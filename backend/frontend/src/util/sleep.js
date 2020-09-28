

export function sleepUtil(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitingUtil(waitTime) {
    /** Returns a promise that should be followed by a
    *   .then((resolvedValue) => myFurtherCode)
    *   block specifying what to do after the wait period.
    *
    *    Args:
    *        waitTime (int): How long to wait in milliseconds.
    *
    **/
    await sleepUtil(waitTime);
}