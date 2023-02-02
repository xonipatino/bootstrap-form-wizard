/**
 * Bootstrap Form Wizard
 * @requires
 * @author Nixon Fabian Patiño Pacheco <xoni.patino@outlook.com>.
 * @version 1.0.1.
 *
 * @summary
 * - Falta agregar el codigo para validacion con bootstrap.
 */
import defaultOptions from './DefaultOptions';
export default class BootstrapFormWizard {
    static instances: Array<BootstrapFormWizard>;
    static defaultOptions: typeof defaultOptions;
    readonly id: string;
    element: HTMLFormElement;
    elementWrapper: Element;
    options: typeof defaultOptions;
    step: number;
    stepNavList: NodeListOf<HTMLElement>;
    stepPanelList: NodeListOf<HTMLElement>;
    constructor(_dom: HTMLFormElement | string, _opts?: object);
    static forElement(_dom: HTMLFormElement | string): BootstrapFormWizard | undefined;
    checkValidityForm(): boolean;
    getCurrentStep(): Object;
    reportValidityForm(): void;
    loadListSteps(): void;
    reset(): void;
    goTo(_step: number): void;
    back(): void;
    next(): void;
}
