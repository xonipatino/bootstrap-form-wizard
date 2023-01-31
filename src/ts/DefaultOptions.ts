/**
 * Propiedades y ajustes predeterminados para las opciones de Bootstrap Form Wizard.
 * @const {Object}
 */
const defaultOptions: {
    backBtn?: HTMLButtonElement,
    class   : {
        activeStep: string,
    },
    lang: {
        backBtn             : string,
        nextBtn             : string,
        nextBtnSubmit       : string,
        fieldReqNotFocusable: string,
    }
    nextBtn?              : HTMLButtonElement,
    onSubmit?             : Function,
    onNext?               : Function,
    onBack?               : Function,
    onValidated?          : Function,
    start                 : number,
    submitForm            : boolean,
    useBootstrapValidation: boolean,
} = {
    backBtn: undefined,
    class  : {
        activeStep: 'active',
    },
    lang: {
        backBtn             : '< Back',
        nextBtn             : 'Next >',
        nextBtnSubmit       : 'Send',
        fieldReqNotFocusable: 'A required field in the form is not focusable.',
    },
    nextBtn               : undefined,
    onSubmit              : undefined,
    onNext                : undefined,
    onBack                : undefined,
    onValidated           : undefined,
    start                 : 1,
    submitForm            : true,
    useBootstrapValidation: false,
}

export default defaultOptions;
