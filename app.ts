interface IMotor {
    _revs: number;
    SetRev(revs: number);
    GetStatus(): string;
}

//interface is not used. Logger classes are used.
interface ILogger {
    LogMessage(message: string);
}

class ConsoleLogger implements ILogger {
    LogMessage(message: string) {
        console.log(message);
    }
}

class HttpLogger implements ILogger {
    LogMessage(message: string) {
        //$("#result").append("<p>" + message);
        console.log("<p>" + message);       
    }
}

abstract class Motor implements IMotor {
    _revs: number = 0;
    SetRev(revs) {
        this._revs += revs;
        if (this._revs < 0) {
            this._revs = 0;
        }
    }
    GetStatus() {
        return "";
    }
}

/**
 * Motor
 */
class ElectricMotor extends Motor implements IMotor {
    _revs: number = 0;
    _voltage: number = 0;
    SetRev(revs) {
        super.SetRev(revs);
        this._voltage = this._revs * 5;
    }
    GetStatus() {
        return "Electric Motor goes at " + this._revs + " with voltage: " + this._voltage;
    }
}

/**
 * Motor
 */
class InternalCombustionMotor extends Motor implements IMotor {
    _revs: number = 0;
    _drossel: number = 0;
    SetRev(revs) {
        super.SetRev(revs);
        this._drossel = this._revs * 10;
    }

    GetStatus(): string {
        return "Internal Combustion Motor goes at " + this._revs + " with drossel: " + this._drossel;
    }
}

/**
 * Car
 */
class Car {
    private _motor: IMotor;
    private _loggerMethod: (x: string) => void;

    constructor(motor: IMotor, loggerMethod: (x: string) => void) {
        this._motor = motor;
        this._loggerMethod = loggerMethod;
    }

    public SetMotor(motor: IMotor) {
        this._motor = motor;
    }

    public GetMotor(): IMotor {
        return this._motor;
    }

    public GoFaster(): void {
        this._motor.SetRev(10);
    }

    public GoSlower(): void {
        this._motor.SetRev(-10);
    }

    public GetStatus(): string {
        return this._motor.GetStatus();
    }

    public LogStatus(message): void {
        if (this._loggerMethod) {
            this._loggerMethod(message);
        }
    }
}

(function () {
    let emotor = new ElectricMotor();
    let pmotor = new InternalCombustionMotor();

    //add logging dependency.
    //let logger = new ConsoleLogger();
    let logger = new HttpLogger();

    //initialize with one dependency
    let c = new Car(emotor, logger.LogMessage);
    c.LogStatus(c.GetStatus());
    c.GoFaster();
    c.LogStatus(c.GetStatus());
    c.GoFaster();
    c.LogStatus(c.GetStatus());
    c.GoSlower();
    c.LogStatus(c.GetStatus());

    //insert another dependency
    c.SetMotor(pmotor);
    c.LogStatus(c.GetStatus());
    c.GoFaster();
    c.LogStatus(c.GetStatus());
    c.GoFaster();
    c.LogStatus(c.GetStatus());
    c.GoSlower();
    c.LogStatus(c.GetStatus());
} ());