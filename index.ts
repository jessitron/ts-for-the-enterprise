import boxen from "boxen";
import * as url from "url";

// type Status = { kind: "running", hostname: string } | { kind: "stopped" }

url.parse("http://github.com");

export interface Status { kind: "running" | "stopped"; }

class RunningStatus implements Status {
    public kind: "running" = "running";
    constructor(public hostname: string) { }
}

// type guard
function isRunningStatus(s: Status): s is Status & { hostname: string } {
    return s.kind === "running";
}

export async function printStatus(status?: Status) {
    if (status === undefined) {
        return;
    }
    if (isRunningStatus(status)) {
        console.log(boxen(`status is ${status.kind} at ${status.hostname}`,
            { padding: 1 }));
    } else {
        console.log(`status is ${status.kind}`);
    }
}

printStatus(new RunningStatus("here"));
