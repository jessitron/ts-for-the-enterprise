import * as cp from "child_process";
import { spawn } from "child_process";
import boxen from "boxen";

spawn
cp.spawn

interface Status {
    kind: "running" | "stopped"
};

class RunningStatus {
    kind: "running" = "running";
    constructor(public readonly where: string) { }
}

// type guard
function
    isRunningStatus(status: Status): status is
    Status & {
        where: string
    } {
    return status.kind === "running";
}

export function printStatus(status?: Status) {
    if (status === undefined) {
        return
    }
    if (isRunningStatus(status)) {
        console.log(
            boxen(`Status is ${status.kind} at ${status.where}`));
    } else {
        console.log(
            `Status is ${status.kind} since ${status}`);
    }
}

printStatus(new RunningStatus("qcon"));
