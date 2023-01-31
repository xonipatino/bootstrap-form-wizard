/**
 * Bootstrap Form Wizard
 * @requires
 * @author Nixon Fabian Patiño Pacheco <xoni.patino@outlook.com>.
 * @version 1.0.0.
 *
 * @summary
 * - Falta agregar el codigo para validacion con bootstrap.
 * - Falta poner el atributo step como solo lectura, a traves de la function Object.defineProperty()
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
    stepList: NodeListOf<HTMLElement>;
    stepPanelList: NodeListOf<HTMLElement>;
    constructor(_dom: HTMLFormElement | string, _opts?: object);
    private checkValidityForm;
    private reportValidityForm;
    loadListSteps(): void;
    reset(): void;
    goTo(_step: number): void;
    back(): void;
    next(): void;
}
