var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.LogMessage = function (message) {
        console.log(message);
    };
    return ConsoleLogger;
}());
var HttpLogger = (function () {
    function HttpLogger() {
    }
    HttpLogger.prototype.LogMessage = function (message) {
        //$("#result").append("<p>" + message);
        console.log("<p>" + message);
    };
    return HttpLogger;
}());
var Motor = (function () {
    function Motor() {
        this._revs = 0;
    }
    Motor.prototype.SetRev = function (revs) {
        this._revs += revs;
        if (this._revs < 0) {
            this._revs = 0;
        }
    };
    Motor.prototype.GetStatus = function () {
        return "";
    };
    return Motor;
}());
/**
 * Motor
 */
var ElectricMotor = (function (_super) {
    __extends(ElectricMotor, _super);
    function ElectricMotor() {
        _super.apply(this, arguments);
        this._revs = 0;
        this._voltage = 0;
    }
    ElectricMotor.prototype.SetRev = function (revs) {
        _super.prototype.SetRev.call(this, revs);
        this._voltage = this._revs * 5;
    };
    ElectricMotor.prototype.GetStatus = function () {
        return "Electric Motor goes at " + this._revs + " with voltage: " + this._voltage;
    };
    return ElectricMotor;
}(Motor));
/**
 * Motor
 */
var InternalCombustionMotor = (function (_super) {
    __extends(InternalCombustionMotor, _super);
    function InternalCombustionMotor() {
        _super.apply(this, arguments);
        this._revs = 0;
        this._drossel = 0;
    }
    InternalCombustionMotor.prototype.SetRev = function (revs) {
        _super.prototype.SetRev.call(this, revs);
        this._drossel = this._revs * 10;
    };
    InternalCombustionMotor.prototype.GetStatus = function () {
        return "Internal Combustion Motor goes at " + this._revs + " with drossel: " + this._drossel;
    };
    return InternalCombustionMotor;
}(Motor));
/**
 * Car
 */
var Car = (function () {
    function Car(motor, loggerMethod) {
        this._motor = motor;
        this._loggerMethod = loggerMethod;
    }
    Car.prototype.SetMotor = function (motor) {
        this._motor = motor;
    };
    Car.prototype.GetMotor = function () {
        return this._motor;
    };
    Car.prototype.GoFaster = function () {
        this._motor.SetRev(10);
    };
    Car.prototype.GoSlower = function () {
        this._motor.SetRev(-10);
    };
    Car.prototype.GetStatus = function () {
        return this._motor.GetStatus();
    };
    Car.prototype.LogStatus = function (message) {
        if (this._loggerMethod) {
            this._loggerMethod(message);
        }
    };
    return Car;
}());
(function () {
    var emotor = new ElectricMotor();
    var pmotor = new InternalCombustionMotor();
    //add logging dependency.
    //let logger = new ConsoleLogger();
    var logger = new HttpLogger();
    //initialize with one dependency
    var c = new Car(emotor, logger.LogMessage);
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
}());
