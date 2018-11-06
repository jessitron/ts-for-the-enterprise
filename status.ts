import boxen from "boxen";

interface Status {
    kind: "running" | "stopped",
}

class RunningStatus implements Status {
    kind: "running" = "running";
    constructor(public readonly hostname: string) { }
}

// type guard
function isRunningStatus(status: Status): status is Status & { hostname: string } {
    return status.kind === "running";
}

export async function printStatus(status?: Status): Promise<void> {
    if (status === undefined) {
        return;
    }
    if (isRunningStatus(status)) {
        console.log(boxen(`Status is ${status.kind} on ${status.hostname}`));
    } else {
        console.log(`Status is ${status} since ${status}`);
    }
}

printStatus(new RunningStatus("my computer"));
