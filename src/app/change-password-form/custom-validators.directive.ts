import { AbstractControl, ValidatorFn } from '@angular/forms';

interface IErrorObject {
    [key: string]: any
}

export class CustomValidators {
    private static atLeast(regex: RegExp, value: string, error: string): Object {
        const hasMatch = value.match(regex);

        let result: Object = null;
        if (!hasMatch)
            result = { [error]: { value } };

        return result;
    }

    public static atLeastOneSpecial(control: AbstractControl): IErrorObject | null {
        const regex = /(\$|@|!|%|\*|\?|&)/ig;
        const errorName = 'hasno' + 'special';

        return CustomValidators.atLeast(
            regex,
            control.value,
            errorName
        );
    }

    public static atLeastOneNumber(control: AbstractControl): IErrorObject | null {
        const regex = /\d/ig;
        const errorName = 'hasno' + 'number';

        return CustomValidators.atLeast(
            regex,
            control.value,
            errorName
        );
    }

    public static atLeastOneUppercase(control: AbstractControl): IErrorObject | null {
        const regex = /[A-Z]/g;
        const errorName = 'hasno' + 'uppercase';

        return CustomValidators.atLeast(
            regex,
            control.value,
            errorName
        );
    }

    public static atLeastOneLowercase(control: AbstractControl): IErrorObject | null {
        const regex = /[a-z]/g;
        const errorName = 'hasno' + 'lowercase';

        return CustomValidators.atLeast(
            regex,
            control.value,
            errorName
        );
    }

    public static equal(compareControl: AbstractControl): ValidatorFn {
        const validatorFunction = (control: AbstractControl): IErrorObject | null => {
            const equals = control.value === compareControl.value;

            let result: Object = null;
            if(!equals)
                result = {'different': {value: compareControl.value}};

            return result;
        }
        return validatorFunction;
    }
}