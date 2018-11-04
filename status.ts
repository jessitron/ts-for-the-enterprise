import boxen from "boxen";

interface Status {
    kind: "running" | "stopped",
}

class RunningStatus implements Status {
    kind: "running" = "running";
    constructor(public readonly hostname: string) { }
}

function isRunningStatus(status: Status): status is RunningStatus {
    return status.kind === "running";
}

export async function printStatus(status?: Status) {
    if (status === undefined) {
        return;
    }
    if (isRunningStatus(status)) {
        console.log(boxen(`status is ${status.kind} on ${status.hostname}`,
            { padding: 1 }));
    } else {
        console.log(`status is ${status.kind} since ${status}`)
    }
}

printStatus(new RunningStatus("my computer"));
