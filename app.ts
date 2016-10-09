interface IMotor {
    _revs: number;
    SetRev(revs:number);
    GetStatus(): string;
}

/**
 * Motor
 */
class ElectricMotor implements IMotor {
    _revs: number = 0;
    _voltage: number = 0;
    SetRev(revs) {
        this._revs += revs;
        if (this._revs < 0)
        {
            this._revs = 0;
        }
        this._voltage = this._revs * 5;
    }
    GetStatus() {
        return "Electric Motor goes at " + this._revs + " with voltage: " + this._voltage;
    }
}

/**
 * Motor
 */
class InternalCombustionMotor implements IMotor {
    _revs: number = 0;
    _drossel: number = 0;
    SetRev(revs) {
        this._revs += revs;
        if (this._revs < 0)
        {
            this._revs = 0;
        }
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

    constructor(motor: IMotor) {
        this._motor = motor;
    }

    public SetMotor(motor: IMotor){
        this._motor = motor;
    }
    public GetMotor(): IMotor{
        return this._motor;
    }

    public GoFaster(): void { 
        this._motor.SetRev(10)
    }

    public GoSlower(): void {
        this._motor.SetRev(-10);
    }

    public GetStatus(): string{
        return this._motor.GetStatus();
    }
}

function Main() : void{
    let emotor = new ElectricMotor();
    let pmotor = new InternalCombustionMotor();

    //initialize with one dependency
    let c = new Car(emotor);
    console.log(c.GetMotor().GetStatus());
    c.GoFaster();
    console.log(c.GetMotor().GetStatus());
    c.GoFaster();
    console.log(c.GetMotor().GetStatus());
    c.GoSlower();
    console.log(c.GetMotor().GetStatus());

    //insert another dependency
    c.SetMotor(pmotor);
    console.log(c.GetMotor().GetStatus());
    c.GoFaster();
    console.log(c.GetMotor().GetStatus());
    c.GoFaster();
    console.log(c.GetMotor().GetStatus());
    c.GoSlower();
    console.log(c.GetMotor().GetStatus());
}

Main();
