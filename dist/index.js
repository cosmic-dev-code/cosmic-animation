var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CosmicAnimation_instances, _a, _CosmicAnimation_assignDefaultValues, _CosmicAnimation_resources, _CosmicAnimation_validations, _CosmicAnimation_originalContent, _CosmicAnimation_animationExists, _CosmicAnimation_error, _CosmicAnimation_warning, _CosmicAnimation_addResources, _CosmicAnimation_lettersToElements, _CosmicAnimation_fadeOut, _CosmicAnimation_validateAnimationSettings;
/**
 * @class CosmicAnimation
 */
class CosmicAnimation {
    createAutomaticName() {
        return ("cosmic-animation-" + Math.round(Math.random() * 300));
    }
    /**
     * El constructor puede retornar un objeto CosmicAnimation o un arreglo de objetos CosmicAnimacion.
     * @author Brandon Anthony Olivares Amador
     * @param {string|string[]} selector
     * @param {string|string[]} name
     * @return {CosmicAnimation|CosmicAnimation[]}
     */
    constructor(selector, name) {
        _CosmicAnimation_instances.add(this);
        // Por defecto crea un elemento DIV.
        this.target = document.createElement('div');
        /**
         * Aqui se manejan las etapas de la animacion, (segun la que el usuario prefiera).
         * @private
         */
        // @ts-ignore
        _CosmicAnimation_resources.set(this, {});
        /**
         * @private
         */
        _CosmicAnimation_validations.set(this, {
            numeric: /^[0-9]$/,
            empty: function (data) {
                return (data === undefined ||
                    data === null ||
                    Number.isNaN(data) ||
                    data === "");
            }
        });
        /**
         * Si el usuario desea reiniciar el elemento, tenemos un respaldo del contenido.
         * @private
         */
        _CosmicAnimation_originalContent.set(this, ``);
        /**
         * Indica si el elemento ya tuvo una animacion asignada, (execute) o si todavia no la hay.
         * @private
         */
        _CosmicAnimation_animationExists.set(this, false);
        // Ajustes comunes de una animacion CSS.
        this.animation = {
            name: 'name',
            delay: 0,
            duration: 1500,
            iterationCount: 1,
            direction: 'normal',
            timingFunction: 'linear',
            fillMode: 'forwards'
        };
        // Configura si quieres que la animacion se ejecute cuando el elemento este visible en el viewport.
        this.observeViewport = {
            enabled: false,
            infinite: false // Indica si solo se ejecuta una vez o cada vez que entre y salga del viewport.
        };
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_assignDefaultValues).call(this);
        if (!name)
            name = this.createAutomaticName();
        if (__classPrivateFieldGet(this, _CosmicAnimation_validations, "f").empty(selector)) {
            __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_error).call(this, 'The selector (' + selector + ') is not valid.');
            // Primer Arreglo.
        }
        else if (Array.isArray(selector)) {
            const arrCosmicsElements = new Array();
            // Segundo Arreglo.
            if (Array.isArray(name)) {
                // Verificamos si recibimos un arreglo con los nombres[] de animacion para cada selector[].
                for (let i in selector) {
                    // Selector y Animacion
                    const selectorName = selector[i], animationName = name[i];
                    if (!__classPrivateFieldGet(this, _CosmicAnimation_validations, "f").empty(selectorName) && !__classPrivateFieldGet(this, _CosmicAnimation_validations, "f").empty(animationName)) {
                        // Se relaciona cada Nombre con su Animacion.
                        arrCosmicsElements.push(new _a(selectorName, animationName));
                    }
                    else {
                        // Nombre de animacion automatica.
                        arrCosmicsElements.push(new _a(animationName));
                    }
                }
                // Solo fue el primer arreglo, (nombres de animacion automaticos).
            }
            else {
                for (let i in selector)
                    arrCosmicsElements.push(new _a(selector[i]));
            }
            // @ts-ignore
            // Retorna un arreglo de objetos CosmicAnimation.
            return arrCosmicsElements;
        }
        else {
            const select = selector;
            // No tiene sentido tener un Selector y varios nombres de animacion.
            if (Array.isArray(name))
                name = name[0];
            // Se comprueba que el selector pasado por argumento exista dentro del DOM.
            try {
                const element = document.querySelector(select);
                if (!element) {
                    __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_warning).call(this, "The selector (" + select + ") not exists in DOM.");
                    // Creamos el objeto CosmicAnimation.
                }
                else {
                    this.target = element;
                    this.animation.name = name;
                }
            }
            catch (error) {
                __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_error).call(this, `Error when extracting the selector (${selector})`);
            }
        }
    }
    // Transformaciones.
    // Como puedes observar las propiedades de transformacion se almacenan en otro lugar.
    /**
     * @author Brandon Anthony Olivares Amador
     * @example scale(0.5, 1)
     * @example scale(0.5, '1/5')
     * @example scale(0.5, ['1/3', '2/3'])
     */
    scale(start = 1, end = 1) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, `scale(${start})`, `scale(${end})`, end, true);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example translateY(0.5, 1)
     * @example translateY(0.5, '1/5')
     * @example translateY(0.5, ['1/3', '2/3'])
     */
    translateY(start = 0, end = 0) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('translateY(' + start + 'px)'), ('translateY(' + end + 'px)'), end, true);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example translateX(0.5, 1)
     * @example translateX(0.5, '1/5')
     * @example translateX(0.5, ['1/3', '2/3'])
     */
    translateX(start = 0, end = 0) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('translateX(' + start + 'px)'), ('translateX(' + end + 'px)'), end, true);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example rotate(0.5, 1)
     * @example rotate(0.5, '1/5')
     * @example rotate(0.5, ['1/3', '2/3'])
     */
    rotate(start = 0, end = 0) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('rotate(' + start + 'deg)'), ('rotate(' + end + 'deg)'), end, true);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example opacity(0.5, 1)
     * @example opacity(0.5, '1/5')
     * @example opacity(0.5, ['1/3', '2/3'])
     */
    opacity(start = 0, end = 1) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('opacity: ' + start + ';'), ('opacity: ' + end + ';'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example bgColor("blue", "red")
     * @example bgColor("blue", '1/5')
     * @example bgColor("blue", ['1/3', '2/3'])
     */
    bgColor(start = "red", end = "red") {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('background-color: ' + start + ';'), ('background-color: ' + end + ';'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example color("blue", "red")
     * @example color("blue", '1/5')
     * @example color("blue", ['1/3', '2/3'])
     */
    color(start = "black", end = "black") {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('color: ' + start + ';'), ('color: ' + end + ';'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example width(300, 700)
     * @example width(300, '1/5')
     * @example width(300, ['1/3', '2/3'])
     */
    width(start = 300, end = 300) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('width: ' + start + 'px;'), ('width: ' + end + 'px;'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example height(300, 700)
     * @example height(300, '1/5')
     * @example height(300, ['1/3', '2/3'])
     */
    height(start = 300, end = 300) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('height: ' + start + 'px;'), ('height: ' + end + 'px;'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example padding(10, 6)
     * @example padding(10, '1/5')
     * @example padding(10, ['1/3', '2/3'])
     */
    padding(start = 300, end = 300) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('padding: ' + start + 'px;'), ('padding: ' + end + 'px;'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example margin(10, 6)
     * @example margin(10, '1/5')
     * @example margin(10, ['1/3', '2/3'])
     */
    margin(start = 300, end = 300) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, ('margin: ' + start + 'px;'), ('margin: ' + end + 'px;'), end);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @example addProperty("border: 2px solid #000;", "border: 6px solid blue;")
     * @example addProperty("border: 2px solid #000;", '1/5')
     * @example addProperty("border: 2px solid #000;", ["2/5", "3/5", "4/5"])
     */
    addProperty(cssStart = "", cssEnd = "") {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, cssStart, cssEnd, cssEnd);
        return this;
    }
    ;
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {string} mode
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    fromWindowShowTo(mode = "right", duration = 2000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-in-out';
        this.opacity(0, 1).opacity(0.3, '2/5').opacity(0.5, '3/5').opacity(0.7, '4/5');
        if (mode === "top") {
            this.translateY(window.innerWidth, 0); // + y 0
        }
        else if (mode === "right") {
            this.translateX(-window.innerWidth, 0); // - y 0
        }
        else if (mode === "bottom") {
            this.translateY(-window.innerWidth, 0); // - y 0
        }
        else {
            this.translateX(window.innerWidth, 0); // + y 0
        }
        return this;
    }
    /**
     * Desaperece el texto del elemento letra por letra.
     * @author Brandon Anthony Olivares Amador
     * @param {number} spaceInLetters
     * @param {number} time
     * @returns {CosmicAnimation}
     */
    fadeOutLetters(spaceInLetters = 6, time = 100) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_fadeOut).call(this, {
            spaceInLetters,
            time
        });
        return this;
    }
    /**
     * Desaperece el texto del elemento letra por letra hacia una direccion especificada.
     * @author Brandon Anthony Olivares Amador
     * @param {string} mode
     * @param {number} spaceInLetters
     * @param {number} time
     * @returns {CosmicAnimation}
     */
    fadeOutLettersTo(mode = "top", spaceInLetters = 6, time = 100) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_fadeOut).call(this, {
            mode,
            spaceInLetters,
            time
        });
        return this;
    }
    /**
     * Desaperece el texto del elemento letra por letra hacia una direccion random.
     * @author Brandon Anthony Olivares Amador
     * @param {number} spaceInLetters
     * @param {number} time
     * @returns {CosmicAnimation}
     */
    fadeOutLettersRandom(spaceInLetters = 6, time = 100) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_fadeOut).call(this, {
            spaceInLetters,
            time,
            random: true
        });
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    appear(duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-out';
        this.opacity(0, 1);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {string} direction
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    appearTo(direction = 'bottom', duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-in-out';
        this.opacity(0, '1/5').opacity(0.1, '2/5').opacity(0.2, '3/5')
            .opacity(0.3, '4/5').opacity(1, '5/5');
        // De acuerdo a la direccion, se crea la animacion.
        if (direction === 'top')
            this.translateY(300, 0);
        else if (direction === 'bottom')
            this.translateY(-300, 0);
        else if (direction === 'right')
            this.translateX(-300, 0);
        else if (direction === 'left')
            this.translateX(300, 0);
        else
            this.translateY(300, 0);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    fadeOut(duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-out';
        this.opacity(1, 0);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {string} direction
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    fadeOutTo(direction = 'bottom', duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-in';
        this.opacity(1, '1/5').opacity(0.3, '2/5').opacity(0.2, '3/5')
            .opacity(0.1, '4/5').opacity(0, '5/5');
        // De acuerdo a la direccion, se crea la animacion.
        if (direction === 'top')
            this.translateY(0, -300);
        else if (direction === 'bottom')
            this.translateY(0, 300);
        else if (direction === 'right')
            this.translateX(0, 300);
        else if (direction === 'left')
            this.translateX(0, -300);
        else
            this.translateY(0, -300);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    appearAndFadeOut(duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-out';
        this.translateY(120, "1/5").translateY(0, ["2/5", "3/5", "4/5"]).translateY(120, "5/5")
            .opacity(0, "1/5").opacity(1, ["2/5", "3/5", "4/5"]).opacity(0, "5/5");
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    increment(duration = 2000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-out-in';
        this.scale(0, 1).opacity(0, 1);
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    incrementPulse(duration = 2000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.scale(0, '1/5').scale(1, ['2/5', '3/5']).scale(1.2, '4/5').scale(1, '5/5')
            .opacity(0, '1/5').opacity(0.5, '2/5').opacity(1, '3/5');
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {string} direction
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    circleTo(direction = 'bottom', duration = 2500, delay = 3000) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.target.style.visibility = "hidden";
        this.addProperty('visibility: visible;', 'visibility: visible;');
        if (direction === 'bottom') {
            this.translateY(-window.innerHeight, '1/5')
                .translateY((-window.innerHeight / 2), '2/5')
                .translateY((-window.innerHeight / 3), '3/5');
        }
        else {
            this.translateY(window.innerHeight, '1/5')
                .translateY((window.innerHeight / 2), '2/5')
                .translateY((window.innerHeight / 3), '3/5');
        }
        this.translateY(0, ['4/5', '5/5'])
            .opacity(0, 1)
            .addProperty('border-radius: 100%;', 'border-radius: 0;')
            .scale(0.1, ['1/5', '2/5', '3/5', '4/5']).scale(1, '5/5');
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    pulse(duration = 1000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.scale(1, 1).scale(1.1, ['2/5', '4/5']).scale(1.3, '3/5');
        return this;
    }
    /**
     * @author Brandon Anthony Olivares Amador
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    palpite(duration = 3000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.scale(0.8, ['1/5', '3/5', '5/5'])
            .scale(1.1, ['2/5', '4/5']);
        return this;
    }
    /**
     * ¿Ya liste animaciones a tu objeto CosmicAnimation?
     *
     * Puedes limpiar todas las animaciones con este metodo.
     *
     * @author Brandon Anthony Olivares Amador
     * @returns {CosmicAnimation}
     */
    reset(restartContent = true) {
        const style = document.getElementsByTagName('style')[0];
        // las animaciones de este elemento inyectadas dentro del primer archivo de estilos que habia.
        if (style) {
            const comment = `/* end: ${this.animation.name} */`, animationName = `.${this.animation.name}`;
            // Desde todo, hasta donde inicia el nombre de la animacion.
            const partOne = style.innerHTML.slice(0, style.innerHTML.indexOf(animationName));
            // Desde donde termina el comentario de esta animacion, hasta el final.
            const partTwo = style.innerHTML.slice((style.innerHTML.indexOf(comment) + comment.length), style.innerHTML.length);
            // Lo de en medio se fue, hasta INICIO, desde FINAL.
            style.innerHTML = (partOne + partTwo);
        }
        // Restauramos ajustes por defecto.
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_assignDefaultValues).call(this);
        if (restartContent) {
            if (__classPrivateFieldGet(this, _CosmicAnimation_originalContent, "f"))
                this.target.innerHTML = __classPrivateFieldGet(this, _CosmicAnimation_originalContent, "f");
        }
        __classPrivateFieldSet(this, _CosmicAnimation_animationExists, false, "f");
        return this;
    }
    /**
     * Este metodo ejecuta acciones al finalizar la animacion.
     * @author Brandon Anthony Olivares Amador
     * @param {Function} callback
     * @param {Function} callbackErr
     */
    ends(callback, callbackErr) {
        try {
            // Suma el tiempo de duracion y retraso.
            let time = (this.animation.delay + this.animation.duration);
            // Verifica que la animacion no sea infinita.
            const isFinite = (Number.isFinite(this.animation.iterationCount) &&
                String(this.animation.iterationCount) !== "infinite");
            // Suma el tiempo segun la cantidad de iteraciones de la animacion.
            if (Number.isInteger(this.animation.iterationCount) && isFinite) {
                time = (time * this.animation.iterationCount);
            }
            // El callback se ejecuta al finalizar la animacion.
            if (isFinite && typeof callback === "function") {
                setTimeout(() => callback(), time);
            }
        }
        catch (error) {
            if (typeof callbackErr === "function")
                callbackErr(error);
        }
    }
    /**
     * Este metodo ejecuta acciones al finalizar la animacion de manera asincrona.
     * @author Brandon Anthony Olivares Amador
     * @returns {Promise<boolean|any>}
     */
    asyncEnds() {
        return new Promise((resolve, reject) => {
            this.ends(() => resolve(true), (error) => reject(error));
        });
    }
    /**
     * Ejecuta las animaciones.
     * @returns {CosmicAnimation}
     */
    execute() {
        var _b, _c, _d, _e, _f, _g;
        if (__classPrivateFieldGet(this, _CosmicAnimation_animationExists, "f"))
            this.reset(false);
        // Crea una etiqueta <style> para asignar la animacion.
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        // Si ya hay un style en nuestro DOM, pues tomamos ese.
        if (document.getElementsByTagName('style')[0] !== undefined) {
            // tomamos el primer <style>
            style = document.getElementsByTagName('style')[0];
        }
        // Este objeto contendra varios objetos, las partes de la animacion.
        /**
         *  {
         * 	   value: `
         * 		  0%{ animaciones }
         * 	   `
         *  }
        */
        const ANIMATION_PARTS = {};
        // Representacion de las partes del objeto, recordemos (3/3), (5/5) y (9/9).
        let partsThree = ['part1', 'part2', 'part3'];
        // La relacion en (%) de las partes.
        // Solo divide, (100% / 3) === (0%, 50%, 100%) === 3/3. Recuerda que el (0%) indica donde inicia la animacion.
        let percentageThree = ['0%', '50%', '100%'];
        let partsFive = ['part1', 'part2', 'part3', 'part4', 'part5'];
        let percentageFive = ['0%', '25%', '50%', '75%', '100%'];
        let partsNine = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7', 'part8', 'part9'];
        let percentageNine = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%', '100%'];
        const typeAnimation = __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").type;
        // Extrae la cantidad de veces a iterar segun el tipo de animacion.
        const iterarion = (typeAnimation === "default" ? partsFive.length : (typeAnimation === "nine" ? partsNine.length : partsThree.length)) - 1;
        for (let i = 0; i <= iterarion; i++) {
            let part, percentage;
            // Comprueba si el usuario utilizo una animacion (5/5).
            if (typeAnimation === "default") {
                part = partsFive[i],
                    percentage = percentageFive[i];
                // Comprueba si el usuario utilizo una animacion (9/9).
            }
            else if (typeAnimation === "nine") {
                part = partsNine[i],
                    percentage = percentageNine[i];
                // Si no fue (5/5 == normal), ni (9/9), entonces es (3/3), el proceso se repite.
            }
            else {
                part = partsThree[i],
                    percentage = percentageThree[i];
            }
            // Extrae las propiedades, (normales) y (transformaciones).
            let valueTransform, valueNormal;
            if (typeAnimation === "default") {
                valueTransform = (_b = Object.getOwnPropertyDescriptor(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsTransform, part)) === null || _b === void 0 ? void 0 : _b.value;
                valueNormal = (_c = Object.getOwnPropertyDescriptor(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").parts, part)) === null || _c === void 0 ? void 0 : _c.value;
            }
            else if (typeAnimation === "nine") {
                valueTransform = (_d = Object.getOwnPropertyDescriptor(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsNineTransform, part)) === null || _d === void 0 ? void 0 : _d.value;
                valueNormal = (_e = Object.getOwnPropertyDescriptor(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsNine, part)) === null || _e === void 0 ? void 0 : _e.value;
            }
            else {
                valueTransform = (_f = Object.getOwnPropertyDescriptor(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsThreeTransform, part)) === null || _f === void 0 ? void 0 : _f.value;
                valueNormal = (_g = Object.getOwnPropertyDescriptor(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsThree, part)) === null || _g === void 0 ? void 0 : _g.value;
            }
            // Verificamos que los (value) de las (part) de (resources) no se encuentren vacios.
            /**
             * Las transformaciones solo requiren un (key), y tienen muchos (values).
             * 		--- transform: translateY(-50rem) scale(1) skew(9deg) rotate(180deg);
             *
             * Pero las propiedades normales solo son un (key) y un (value).
             * 		--- opacity: 1; color: #000; font-size: 1.6rem;
             */
            if (valueTransform.length > 0 || (valueNormal.length > 0)) {
                // Agregregar parte de animacion. (%).
                Object.defineProperty(ANIMATION_PARTS, part, {
                    value: (`
						${percentage}{
							${valueTransform.length > 0 ? (`
									transform: ${valueTransform.join(' ')};
								`) : ``}
							${valueNormal.length > 0 ? (`
									${valueNormal.join('')}
								`) : ""}
						}
					`),
                    writable: true,
                    enumerable: true
                });
            }
        }
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_validateAnimationSettings).call(this);
        // Los porcentajes con las propiedades guardados en las keys (parts) de (ANIMATION_PARTS), luego se convierten a string.
        const getPercentages = () => {
            // @ts-ignore
            const partsValues = Object.values(ANIMATION_PARTS);
            // @ts-ignore
            window.ANIMATION_PARTS = ANIMATION_PARTS;
            return partsValues.join("");
        };
        console.log(this.animation);
        // En la hoja de estilos que inyectamos, ahora agregamos las configuraciones de nuestra animacion.
        style.innerHTML += (`
			.${this.animation.name}{
				animation-name: ${this.animation.name};
				animation-duration: ${this.animation.duration}ms;
				animation-delay: ${this.animation.delay}ms;
				animation-iteration-count: ${Number.isFinite(this.animation.iterationCount) ? this.animation.iterationCount : 'infinite'};
				animation-direction: ${this.animation.direction};
				animation-timing-function: ${this.animation.timingFunction};
				animation-fill-mode: ${this.animation.fillMode};
			}
			@keyframes ${this.animation.name}{
				${getPercentages()}
			}/* end: ${this.animation.name} */
		`);
        // Agregamos la hoja de estilos al DOM.
        document.getElementsByTagName('body')[0].appendChild(style);
        /**
         * ¿Como? ¿Quieres utilizar ObserverViewport?
         * Revisa que lo hayas configurado.
         */
        // Revisa que este habilitado.
        if (this.observeViewport.enabled) {
            // Lo aplica.
            const observeTarget = new IntersectionObserver(elements => {
                // Cuando el objeto es intersectado, aplica la animacion.
                if (elements[0].isIntersecting) {
                    this.target.classList.add(this.animation.name);
                    // Si configuraste (infinite), entonces la animacion se repite cada que el elemento abandona y entra de nuevo al viewport.
                }
                else if (this.observeViewport.infinite) {
                    this.target.classList.remove(this.animation.name);
                }
            });
            if (this.target.parentElement) {
                observeTarget.observe(this.target.parentElement);
            }
        }
        else {
            // Sino, solo aplica la animacion y ya.
            this.target.classList.add(this.animation.name);
        }
        __classPrivateFieldSet(this, _CosmicAnimation_animationExists, true, "f");
        return this;
    }
}
_a = CosmicAnimation, _CosmicAnimation_resources = new WeakMap(), _CosmicAnimation_validations = new WeakMap(), _CosmicAnimation_originalContent = new WeakMap(), _CosmicAnimation_animationExists = new WeakMap(), _CosmicAnimation_instances = new WeakSet(), _CosmicAnimation_assignDefaultValues = function _CosmicAnimation_assignDefaultValues() {
    // @ts-ignore
    this.target.classList = "";
    this.animation.name = ("cosmic-animation-" + Math.round(Math.random() * 300));
    __classPrivateFieldSet(this, _CosmicAnimation_resources, {
        type: 'default',
        // 3/3
        partsThree: {
            part1: [], part2: [], part3: []
        },
        partsThreeTransform: {
            part1: [], part2: [], part3: []
        },
        // 5/5
        parts: {
            part1: [], part2: [],
            part3: [], part4: [],
            part5: []
        },
        partsTransform: {
            part1: [], part2: [],
            part3: [], part4: [],
            part5: []
        },
        // 9/9
        partsNine: {
            part1: [], part2: [], part3: [], part4: [],
            part5: [], part6: [], part7: [], part8: [],
            part9: []
        },
        partsNineTransform: {
            part1: [], part2: [], part3: [], part4: [],
            part5: [], part6: [], part7: [], part8: [],
            part9: []
        }
    }, "f");
}, _CosmicAnimation_error = function _CosmicAnimation_error(args) {
    if (arguments.length > 1) {
        for (let arg of arguments)
            __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_error).call(this, arg);
    }
    else {
        console.log(`%cCosmicAnimation: ${arguments[0]}`, `
				display: block;
				width: 100%;
				padding: 10px;
				color: #641E16;
				background-color: #F5B7B1;
				font-size: 14px;
				letter-spacing: 3px;
			`);
    }
}, _CosmicAnimation_warning = function _CosmicAnimation_warning(args) {
    if (arguments.length > 1) {
        for (let arg of arguments)
            __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_warning).call(this, arg);
    }
    else {
        console.log(`%cCosmicAnimation: ${arguments[0]}`, `
				display: block;
				width: 100%;
				padding: 10px;
				color: #7E5109;
				background-color: #F1C40F;
				font-size: 14px;
				letter-spacing: 3px;
			`);
    }
}, _CosmicAnimation_addResources = function _CosmicAnimation_addResources(start, end, parts, isTransform) {
    /**
     * Si lo final es un numero, significa que hemos recibido:
     * 		@example funcion(start, parts)
     * 		@example funcion(1, 1)
     * Y esto por defecto hace que (start) y (end) posean las
     * propiedades declaradas a guardar en el arreglo por defecto.
     */
    if (typeof parts === "number") {
        if (isTransform) {
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsTransform.part1.push(start);
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsTransform.part5.push(end);
        }
        else {
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").parts.part1.push(start);
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").parts.part5.push(end);
        }
        return;
    }
    /**
     * Si (parts) es un string, significa que el usuario introdujo:
     * 		@example funcion(start, parts)
     * 		@example funcion(1, '1/3')
     * Lo que significa que (start) posee la propiedad a guardar
     * en el arreglo pertinente segun (parts), (end) no es necesario.
     */
    if (typeof parts === "string") {
        let firstNumber = parts.split("/")[0], // 1
        partName = `part${firstNumber}`; // part1, part2, part3, ...
        if (parts.includes("/9")) {
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").type = "nine";
            if (isTransform) {
                // @ts-ignore
                if (Array.isArray(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsNineTransform[partName])) {
                    // @ts-ignore
                    __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsNineTransform[partName].push(start);
                }
            }
            else {
                // @ts-ignore
                if (Array.isArray(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsNine[partName])) {
                    // @ts-ignore
                    __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsNine[partName].push(start);
                }
            }
            return;
        }
        else if (parts.includes("/3")) {
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").type = "three";
            if (isTransform) {
                // @ts-ignore
                if (Array.isArray(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsThreeTransform[partName])) {
                    // @ts-ignore
                    __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsThreeTransform[partName].push(start);
                }
            }
            else {
                // @ts-ignore
                if (Array.isArray(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsThree[partName])) {
                    // @ts-ignore
                    __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsThree[partName].push(start);
                }
            }
            return;
        }
        else if (parts.includes("/5")) {
            // Indicar que es por defecto.
            __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").type = "default";
            if (isTransform) {
                // @ts-ignore
                if (Array.isArray(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsTransform[partName])) {
                    // @ts-ignore
                    __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").partsTransform[partName].push(start);
                }
            }
            else {
                // @ts-ignore
                if (Array.isArray(__classPrivateFieldGet(this, _CosmicAnimation_resources, "f").parts[partName])) {
                    // @ts-ignore
                    __classPrivateFieldGet(this, _CosmicAnimation_resources, "f").parts[partName].push(start);
                }
            }
            return;
        }
    }
    /**
     * Si (parts) es un array, significa que el usuario introdujo:
     * 		@example funcion(start, parts)
     * 		@example funcion(1, ['1/3', '3/3'])
     * Lo que significa que (start) posee la propiedad a guardar, y se iteran cada
     * uno de los elementos del array, para guardar en cada parte el primer valor, (start).
     */
    if (Array.isArray(parts)) {
        for (let part of parts) {
            if (typeof part !== "string") {
                __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_error).call(this, `Data {${part}} is not accepted in {string[]}`);
                return;
            }
            __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, start, "", part, isTransform);
        }
    }
}, _CosmicAnimation_lettersToElements = function _CosmicAnimation_lettersToElements(spaceInLetters) {
    // Respaldo.
    __classPrivateFieldSet(this, _CosmicAnimation_originalContent, this.target.innerHTML, "f");
    if (this.target.textContent) {
        // Obtenermos el texto del elemento, convertido en array.
        let letters = this.target.textContent.split("");
        // Limpiar HTML y texto del elemento.
        this.target.innerHTML = "";
        // Iterar letra por letra.
        letters.forEach((letter) => {
            // Los espacios son reemplazados por un margen (X) con el valor (spaceInLetters).
            // Las demas letras son inyectadas en otro <span>, esto se hace para poder animar cada <span>
            if (letter === " " || letter === "\n" || letter === "\t") {
                this.target.innerHTML += (`
						<span style="display: inline-block; margin: 0 ${spaceInLetters}px;"></span>
					`).trim();
            }
            else {
                this.target.innerHTML += (`
						<span style="display: inline-block;">${letter}</span>
					`).trim();
            }
        });
    }
}, _CosmicAnimation_fadeOut = function _CosmicAnimation_fadeOut({ mode, spaceInLetters, time, random }) {
    // Transformar contenido del elemento en <span> con cada letra para animar cada letra de manera individual.
    __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_lettersToElements).call(this, spaceInLetters);
    let index = 0, 
    // Obtener los <span> inyectados.
    childs = this.target.children, 
    // Almacena los "ids" automaticas para cada <span>
    ids = new Array(), 
    // Utilizado para asignar un (mode) automatico, (si es random)
    randomModes = new Array("top", "right", "bottom", "left", "center");
    const createAutomaticRandIds = () => {
        const randomId = Math.round(Math.random() * 1000);
        if (ids.indexOf(randomId) === -1)
            ids.push(randomId);
        else
            createAutomaticRandIds();
    };
    for (let i = 0; i < childs.length; i++)
        createAutomaticRandIds();
    // Iterar <span> inyectados.
    const interval = setInterval(() => {
        const span = childs[index], randomId = `id${ids[index]}`;
        span.setAttribute("id", randomId);
        // Si no hay direccion, sino que es cada una a lo random.
        if (random) {
            let randomMode = randomModes[Math.floor(Math.random() * randomModes.length)];
            new _a("#" + randomId).fadeOutTo(randomMode).execute();
            // Si hay una direccion, desaparece hacia una direccion.
        }
        else if (mode)
            new _a("#" + randomId).fadeOutTo(mode).execute();
        // Sino, solo desaparece.
        else
            new _a("#" + randomId).fadeOut().execute();
        index++;
        // Detenemos el intervalo cuando ya hayamos recorrido todos los <span>
        if (index >= childs.length)
            clearInterval(interval);
    }, time);
}, _CosmicAnimation_validateAnimationSettings = function _CosmicAnimation_validateAnimationSettings() {
    // Las iteraciones deben ser un (numero entero), (pero puede ser Infinity)
    if (!Number.isInteger(this.animation.iterationCount) && typeof this.animation.iterationCount !== "number") {
        this.animation.iterationCount = 1;
    }
    // La duracion debe ser (finita) y debe ser un (numero entero).
    if (!Number.isFinite(this.animation.duration) || !Number.isInteger(this.animation.duration)) {
        this.animation.duration = 1000;
    }
    // El delay debe ser (finita) y debe ser un (numero entero).
    if (!Number.isFinite(this.animation.delay) || !Number.isInteger(this.animation.delay)) {
        this.animation.delay = 0;
    }
};
// @ts-ignore
window.CosmicAnimation = CosmicAnimation;
export {};
