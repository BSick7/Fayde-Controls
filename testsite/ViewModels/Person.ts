import DataErrorsChangedEventArgs = Fayde.Data.DataErrorsChangedEventArgs;

var FIRST_NAME_REQUIRED = "First Name is required.";
var LAST_NAME_REQUIRED = "Last Name is required.";

class Person extends Fayde.MVVM.ObservableObject implements Fayde.Data.INotifyDataErrorInfo {
    constructor () {
        super();
        this.FirstName = "";
        this.LastName = "";
    }

    private _Id: number = -1;
    get Id (): number {
        return this._Id;
    }

    set Id (value: number) {
        this._Id = value;
        this.OnPropertyChanged("Id");
    }

    private _FirstName: string;
    get FirstName (): string {
        return this._FirstName;
    }

    set FirstName (value: string) {
        if (this._FirstName === value)
            return;
        this._FirstName = value;
        (!value) ? this.AddError("FirstName", FIRST_NAME_REQUIRED) : this.RemoveError("FirstName", FIRST_NAME_REQUIRED);
        this.OnPropertyChanged("FirstName");
    }

    private _LastName: string;
    get LastName (): string {
        return this._LastName;
    }

    set LastName (value: string) {
        if (this._LastName === value)
            return;
        this._LastName = value;
        (!value) ? this.AddError("LastName", LAST_NAME_REQUIRED) : this.RemoveError("LastName", LAST_NAME_REQUIRED);
        this.OnPropertyChanged("LastName");
    }


    private _Errors = new Map<string, string[]>();
    ErrorsChanged = new nullstone.Event<DataErrorsChangedEventArgs>();

    get HasErrors (): boolean {
        return this._Errors.size > 0;
    }

    GetErrors (propertyName: string): nullstone.IEnumerable<string> {
        var all = this._Errors;
        if (!all.has(propertyName))
            return null;
        var errs = all.get(propertyName);
        return nullstone.IEnumerable_.fromArray(errs);
    }

    AddError (propertyName: string, error: string) {
        var all = this._Errors;
        if (!all.has(propertyName))
            all.set(propertyName, []);
        var errs = all.get(propertyName);
        errs.push(error);
        this.ErrorsChanged.raise(this, new DataErrorsChangedEventArgs(propertyName));
    }

    RemoveError (propertyName: string, error: string) {
        var all = this._Errors;
        if (!all.has(propertyName))
            return;
        var errs = all.get(propertyName);
        var index = errs.indexOf(error);
        if (index >= 0)
            errs.splice(index, 1);
        if (errs.length < 1)
            all.delete(propertyName);
        this.ErrorsChanged.raise(this, new DataErrorsChangedEventArgs(propertyName));
    }
}
Fayde.Data.INotifyDataErrorInfo_.mark(Person);
export = Person;