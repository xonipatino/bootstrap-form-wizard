/**
 * Propiedades y ajustes predeterminados para las opciones de Bootstrap Form Wizard.
 * @const {Object}
 */
declare const defaultOptions: {
    backBtn?: HTMLButtonElement;
    class: {
        activeStep: string;
    };
    lang: {
        backBtn: string;
        nextBtn: string;
        nextBtnSubmit: string;
        fieldReqNotFocusable: string;
    };
    nextBtn?: HTMLButtonElement;
    onSubmit?: Function;
    onNext?: Function;
    onBack?: Function;
    onValidated?: Function;
    start: number;
    submitForm: boolean;
    useBootstrapValidation: boolean;
};
export default defaultOptions;
