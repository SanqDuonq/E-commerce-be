import { ICommand } from "../interfaces/command.interface";

export class OTPInvoker {
    private command?: ICommand; 

    setCommand(command: ICommand) {
        this.command = command;
    }

    async executeCommand() {
        if (this.command) {
            await this.command.execute();
        }
    }
}