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

import { Tab } from 'bootstrap';
import defaultOptions from './DefaultOptions';

export default class BootstrapFormWizard
{
    public static instances: Array<BootstrapFormWizard> = [];
    public static defaultOptions: typeof defaultOptions = defaultOptions;

    public readonly id   : string;
    public element       : HTMLFormElement;
    public elementWrapper: Element;
    public options       : typeof defaultOptions;
    public step          : number;
    public stepList      : NodeListOf<HTMLElement>;
    public stepPanelList : NodeListOf<HTMLElement>;

    constructor(_dom: HTMLFormElement|string, _opts:  object = {}) {
        // --
        this.element        = (typeof _dom == 'string') ? document.querySelector(_dom) : _dom;
        this.id             = (new Date()).getTime().toString();
        this.elementWrapper = (this.element.dataset.bfwWrapper) ? document.querySelector(this.element.dataset.bfwWrapper) : this.element;

        if ((!this.element) || (this.element.tagName.toLowerCase() != 'form'))
            throw new Error('The form element is invalid.');
        else if (!this.elementWrapper)
            throw new Error('The wrapper element is invalid.');

        this.element.id = (this.element.id) ? this.element.id : this.id;

        // --
        this.options = Object.assign(
            {},
            defaultOptions,
            {
                backBtn: this.elementWrapper.querySelector('button[data-bfw-action="back"]'),
                nextBtn: this.elementWrapper.querySelector('button[data-bfw-action="next"]'),
            },
            _opts
        );

        if (
            (!this.options.backBtn) || (this.options.backBtn.tagName.toLowerCase() != 'button') ||
            (!this.options.nextBtn) || (this.options.nextBtn.tagName.toLowerCase() != 'button')
        )
            throw new Error('The selector of the back or next button is invalid.');

        // --
        this.options.backBtn.type      = 'button';
        this.options.backBtn.innerHTML = this.options.lang.backBtn;
        this.options.nextBtn.type      = 'button';
        this.options.backBtn.setAttribute('form', this.element.id);
        this.options.nextBtn.setAttribute('form', this.element.id);

        // --
        this.options.backBtn.onclick = event => { this.back() };
        this.options.nextBtn.onclick = event => { this.next() };
        this.element.onreset         = event => { this.goTo(1) };
        this.element.onsubmit        = event => {
            if (this.options.submitForm) {
                if (typeof this.options.onSubmit == 'function')
                    this.options.onSubmit(event);
            }
            else
                event.preventDefault();
        };

        // --
        this.loadListSteps();

        // --
        this.goTo(this.options.start);

        // --
        BootstrapFormWizard.instances.push(this);
    }

    // --
    private checkValidityForm(): boolean {
        let isValid = true;

        if (!this.element.noValidate) {
            if (!this.element.checkValidity()) {
                let parentStepPanelElem: HTMLElement,
                    inStepPanel        : boolean,
                    arrStepPanel = Array.from(this.stepPanelList);

                isValid = Array.from(this.element.elements)
                    .filter(elem => {
                        if ((elem == this.options.backBtn) || (elem == this.options.nextBtn))
                            return false;
                        else {
                            parentStepPanelElem = elem.parentElement;
                            inStepPanel = false;
                            while (parentStepPanelElem) {
                                if (arrStepPanel.includes(parentStepPanelElem)) {
                                    inStepPanel = true;
                                    return (arrStepPanel.indexOf(parentStepPanelElem) < this.step);
                                }
                                else if (parentStepPanelElem == this.elementWrapper)
                                    break;

                                parentStepPanelElem = parentStepPanelElem.parentElement;
                            }

                            if (!inStepPanel) {
                                let bfwInStep = Number((<HTMLInputElement>elem).dataset.bfwInStep);
                                if (!bfwInStep) bfwInStep = 1;
                                return (bfwInStep <= this.step);
                            }
                        }
                    })
                    .every(elem => (<HTMLInputElement>elem).checkValidity());
            }

            if (typeof this.options.onValidated == 'function')
                isValid = this.options.onValidated(isValid);
        }

        return isValid;
    }

    // --
    private reportValidityForm() {
        if (this.options.useBootstrapValidation) {}
        else {
            let invalidElem = Array.from(this.element.elements).find(elem => !(<HTMLInputElement>elem).checkValidity());

            if (invalidElem) {
                let parentStepPanelElem = invalidElem.parentElement,
                    inStepPanel         = false,
                    arrStepPanel        = Array.from(this.stepPanelList);

                while (parentStepPanelElem) {
                    if (arrStepPanel.includes(parentStepPanelElem)) {
                        inStepPanel = true;
                        this.goTo(arrStepPanel.indexOf(parentStepPanelElem) + 1);
                        break;
                    }
                    else if (parentStepPanelElem == this.elementWrapper)
                        break;

                    parentStepPanelElem = parentStepPanelElem.parentElement;
                }

                if (!inStepPanel) {
                    let bfwInStep = Number((<HTMLInputElement>invalidElem).dataset.bfwInStep);
                    if (!bfwInStep) bfwInStep = 1;

                    this.goTo(bfwInStep);
                }

                if ((<HTMLInputElement>invalidElem).reportValidity())
                    alert(this.options.lang.fieldReqNotFocusable);
            }
        }
    } 

    // --
    public loadListSteps() {
        this.stepList = this.elementWrapper.querySelectorAll('[data-bs-toggle="step"]');

        if (this.stepList.length == 0)
            throw new Error('No step elements were found in the list.');
        else {
            let arrSelectors: Array<string> = [];

            this.stepList.forEach((stepElem, index) => {
                let stepPanelSelector = (stepElem.dataset.bsTarget) ? stepElem.dataset.bsTarget : stepElem.getAttribute('href'),
                    stepPanelElem     = this.elementWrapper.querySelector(stepPanelSelector),
                    stepNum           = (index + 1).toString();

                if (stepPanelElem) {
                    stepPanelElem.role = 'steppanel';
                    stepPanelElem.setAttribute('panel', stepNum);

                    arrSelectors.push(stepPanelSelector);
                }
                else
                    throw new Error('The step panel for one of the steps in the list was not found.');

                stepElem.setAttribute('step', stepNum);
                stepElem.addEventListener('shown.bs.tab', event => {
                    let currentStepElem  = <HTMLElement>event.target,
                        indexCurrentStep = Array.from(this.stepList).indexOf(currentStepElem);

                    this.step = indexCurrentStep + 1;
                    
                    if (this.step == 1)
                        this.options.backBtn.setAttribute('disabled', '');
                    else
                        this.options.backBtn.removeAttribute('disabled');
                    this.options.nextBtn.innerHTML = (this.step == this.stepList.length) ? this.options.lang.nextBtnSubmit : this.options.lang.nextBtn;
                    this.options.nextBtn.type      = 'button';
                });
            });
            
            this.stepPanelList = this.elementWrapper.querySelectorAll(arrSelectors.join(', '));
        }
    }

    // --
    public reset() {
        this.element.reset();
    }

    // --
    public goTo(_step: number) {
        let stepElem = this.stepList.item(_step - 1);

        if (stepElem) {
            Tab.getOrCreateInstance(stepElem).show();

            if (!this.step) {
                this.step = _step;

                if (this.step == 1)
                    this.options.backBtn.setAttribute('disabled', '');
                else
                    this.options.backBtn.removeAttribute('disabled');
                this.options.nextBtn.innerHTML = (this.step == this.stepList.length) ? this.options.lang.nextBtnSubmit : this.options.lang.nextBtn;
                this.options.nextBtn.type      = 'button';
            }
        }
        else
            throw new Error('The step number to display is less than or greater than the number of recordfed steps.');
    }

    // --
    public back () {
        if (this.stepList.item(this.step - 1)) {
            this.goTo(this.step - 1);

            if (typeof this.options.onBack == 'function')
                this.options.onBack(this.step);
        }   
    }

    // --
    public next() {
        if (!this.checkValidityForm())
            this.reportValidityForm();
        else if (this.step == this.stepList.length) {
            this.options.nextBtn.type = 'submit';
            this.element.requestSubmit(this.options.nextBtn);
        }
        else {
            this.goTo(this.step + 1);
            
            if (typeof this.options.onNext == 'function')
                this.options.onNext(this.step);
        }
    }

}
