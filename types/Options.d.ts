/**
 * Opciones predeterminadas para el Bootstrap Form Wizard.
 */
type Options = {
    /**
     * Elemento Button que realizara la accion de Anterior.
     */
    backBtn?: HTMLButtonElement;
    /**
     * Lenguaje o texto que se usara en los distintos elementos.
     */
    lang: {
        /**
         * Texto del elemento Button Anterior
         */
        backBtn: string;
        /**
         * Texto del elemento Button Siguiente
         */
        nextBtn: string;
        /**
         * Texto del elemento Button Siguiente cuando esta en el ultimo paso,
         * antes de hacer el envio del formulario (Submit).
         */
        nextBtnSubmit: string;
        /**
         * Texto que se mostrara en un Alert cuando un elemento invalido no se le puede dar el foco,
         * ocurre cuando un elemento del formulario esta oculto.
         */
        fieldReqNotFocusable: string;
    };
    /**
     * Elemento Button que realizara la ccion de Siguiente y Envio.
     */
    nextBtn?: HTMLButtonElement;
    /**
     * Metodo a llamar (callback) cuando se ha mostrado al paso anterior.
     * @method
     */
    onBack?: Function;
    /**
     * Metodo a llamar (callback) cuando se ha mostrado al siguiente paso.
     * @method
     */
    onNext?: Function;
    /**
     * Metodo a llamar (callback) cuando se ha hecho submit al formulario.
     * @method
     */
    onSubmit?: Function;
    /**
     * Funcion a llamar (callback) cuando se ha validado el formulario en cada paso,
     * se pasa un unico argumento de tipo boolean que identifica si el formulario en ese momento es valido o no,
     * la funcion debe retornar un boolean tambien.
     * @function
     * @returns {boolean} boolean
     */
    onValidated?: Function;
    /**
     * Numero de paso en el que se inicia,
     * puede generar un error si el numero asignado es mayor o menor al numero de pasos encontrados.
     */
    start: number;
    /**
     * Define si al llegar al ultimo paso se debe enviar o no el formulario,
     * si se ha asignado en false, no llama a la metodo onSubmit().
     */
    submitForm: boolean;
    /**
     * Si se debe usar el estilo de validacion de formulario de bootstrap,
     * (No disponible por el momento)
     * @see https://getbootstrap.com/docs/5.3/forms/validation/#custom-styles
     */
    useBootstrapValidation: boolean;
};
export default Options;
