import boxen from "boxen";

export interface Status { kind: "running" | "stopped" }

export class RunningStatus implements Status {
    kind: "running" = "running";
    constructor(private hostname: string) { }

}

// type guard
function isRunningStatus(status: Status): status is Status & { hostname: string } {
    return status.kind === "running";
}

export async function printStatus(status?: Status): Promise<0 | 1> {
    if (status === undefined) {
        return 1;
    }
    if (isRunningStatus(status)) {
        console.log(boxen(`Status is: ${status.kind} on ${status.hostname}`, { padding: 1, color: "yellow" }));
    } else {
        console.log(`Status is: ${status.kind} since ${status}`)
    }
    return 0;
}

printStatus(new RunningStatus("my computer"));
