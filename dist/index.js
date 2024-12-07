var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CosmicAnimation_instances, _CosmicAnimation_error, _CosmicAnimation_warning, _CosmicAnimation_addResources, _CosmicAnimation_lettersToElements, _CosmicAnimation_validate;
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
        // Aqui se manejan las etapas de la animacion, (segun la que el usuario prefiera).
        this.resources = {
            type: 'default',
            // Tres partes. 3/3
            partsThree: {
                part1: [], part2: [], part3: []
            },
            partsThreeTransform: {
                part1: [], part2: [], part3: []
            },
            // Cinco partes. 5/5
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
            // Nueve partes. 9/9
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
        };
        this.validations = {
            numeric: /^[0-9]$/,
            empty: function (data) {
                return (data === undefined ||
                    data === null ||
                    Number.isNaN(data) ||
                    data === "");
            }
        };
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
        // Metodo interno utilizado solo para la animacion letra por letra, debe complementarse, por eso es privado.
        _CosmicAnimation_lettersToElements.set(this, function (spaceInLetters) {
            let letters = this.target.textContent.split("");
            this.target.innerHTML = ("");
            letters.forEach(letter => {
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
        });
        if (!name)
            name = this.createAutomaticName();
        if (this.validations.empty(selector)) {
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
                    if (!this.validations.empty(selectorName) && !this.validations.empty(animationName)) {
                        // Se relaciona cada Nombre con su Animacion.
                        arrCosmicsElements.push(new CosmicAnimation(selectorName, animationName));
                    }
                    else {
                        // Nombre de animacion automatica.
                        arrCosmicsElements.push(new CosmicAnimation(animationName));
                    }
                }
                // Solo fue el primer arreglo, (nombres de animacion automaticos).
            }
            else {
                for (let i in selector)
                    arrCosmicsElements.push(new CosmicAnimation(selector[i]));
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
    scale(start = 1, end = 1) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, end, `scale(${start})`, `scale(${end})`);
        return this;
    }
    translateY(start = 0, end = 0) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, end, ('translateY(' + start + 'px)'), ('translateY(' + end + 'px)'));
        return this;
    }
    translateX(start = 0, end = 0) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, end, ('translateX(' + start + 'px)'), ('translateX(' + end + 'px)'));
        return this;
    }
    rotate(start = 0, end = 0) {
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, end, ('rotate(' + start + 'deg)'), ('rotate(' + end + 'deg)'));
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
    /**
     * Metodos con animaciones establecidas por defecto.
     *
     * @param {string} mode
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    fromWindowShowTo(mode = "right", duration = 2000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-in-out';
        this.opacity(0, 1);
        this.opacity(0.3, '2/5');
        this.opacity(0.5, '3/5');
        this.opacity(0.7, '4/5');
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
     *
     * @param {string} mode
     * @param {number} spaceInLetters
     * @param {number} time
     * @returns {CosmicAnimation}
     */
    fadeOutLettersTo(mode = "top", spaceInLetters = 6, time = 100) {
        __classPrivateFieldGet(this, _CosmicAnimation_lettersToElements, "f").call(this, spaceInLetters);
        let index = 0, childs = this.target.children, allId = new Array();
        let interval = setInterval(() => {
            if (childs[index] !== undefined) {
                let randomId = undefined;
                while (true) {
                    let exists = false;
                    randomId = Math.round(Math.random() * 1000);
                    allId.forEach(id => {
                        if (id === randomId)
                            exists = true;
                    });
                    if (!exists)
                        break;
                }
                allId.push(randomId);
                childs[index].setAttribute("id", ("id" + allId[allId.length - 1]));
                let ani = new CosmicAnimation(`#id${allId[allId.length - 1]}`);
                if (mode === "top")
                    ani.fadeOutTo("top");
                else if (mode === "right")
                    ani.fadeOutTo("right");
                else if (mode === "bottom")
                    ani.fadeOutTo("bottom");
                else
                    ani.fadeOutTo("left");
                ani.execute();
                index++;
            }
            else {
                clearInterval(interval);
            }
        }, time);
        return this;
    }
    /**
     *
     * @param {number} spaceInLetters
     * @param {number} time
     * @returns {CosmicAnimation}
     */
    fadeOutLetters(spaceInLetters = 6, time = 100) {
        __classPrivateFieldGet(this, _CosmicAnimation_lettersToElements, "f").call(this, spaceInLetters);
        let index = 0, childs = this.target.children, allId = new Array();
        let interval = setInterval(() => {
            if (childs[index] !== undefined) {
                let randomId = undefined;
                while (true) {
                    let exists = false;
                    randomId = Math.round(Math.random() * 1000);
                    allId.forEach(id => {
                        if (id === randomId)
                            exists = true;
                    });
                    if (!exists)
                        break;
                }
                allId.push(randomId);
                childs[index].setAttribute("id", ("id" + allId[allId.length - 1]));
                let ani = new CosmicAnimation(`#id${allId[allId.length - 1]}`);
                ani.fadeOut();
                ani.execute();
                index++;
            }
            else {
                clearInterval(interval);
            }
        }, time);
        return this;
    }
    /**
     *
     * @param {number} spaceInLetters
     * @param {number} time
     * @returns {CosmicAnimation}
     */
    fadeOutLettersRandom(spaceInLetters = 6, time = 100) {
        __classPrivateFieldGet(this, _CosmicAnimation_lettersToElements, "f").call(this, spaceInLetters);
        let index = 0, childs = this.target.children, allId = new Array(), modes = new Array("top", "right", "bottom", "left", "center");
        let interval = setInterval(() => {
            if (childs[index] !== undefined) {
                let randomId = undefined, mode = modes[Math.floor(Math.random() * modes.length)];
                while (true) {
                    let exists = false;
                    randomId = Math.round(Math.random() * 1000);
                    allId.forEach(id => {
                        if (id === randomId)
                            exists = true;
                    });
                    if (!exists)
                        break;
                }
                allId.push(randomId);
                childs[index].setAttribute("id", ("id" + allId[allId.length - 1]));
                let ani = new CosmicAnimation(`#id${allId[allId.length - 1]}`);
                if (mode === "top")
                    ani.fadeOutTo("top");
                else if (mode === "right")
                    ani.fadeOutTo("right");
                else if (mode === "bottom")
                    ani.fadeOutTo("bottom");
                else if (mode === "left")
                    ani.fadeOutTo("left");
                else
                    ani.fadeOut();
                ani.execute();
                index++;
            }
            else {
                clearInterval(interval);
            }
        }, time);
        return this;
    }
    /**
     *
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
     *
     * @param {string} mode - Esta es la direccion de la animcion.
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    appearTo(mode = 'bottom', duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-in-out';
        this.opacity(0, '1/5');
        this.opacity(0.1, '2/5');
        this.opacity(0.2, '3/5');
        this.opacity(0.3, '4/5');
        this.opacity(1, '5/5');
        if (mode === 'top')
            this.translateY(300, 0);
        else if (mode === 'bottom')
            this.translateY(-300, 0);
        else if (mode === 'right')
            this.translateX(-300, 0);
        else if (mode === 'left')
            this.translateX(300, 0);
        else
            this.translateY(300, 0);
        return this;
    }
    /**
     *
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
     *
     * @param {string} mode - Esta es la direccion de la animacion.
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    fadeOutTo(mode = 'bottom', duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-in';
        this.opacity(1, '1/5');
        this.opacity(0.3, '2/5');
        this.opacity(0.2, '3/5');
        this.opacity(0.1, '4/5');
        this.opacity(0, '5/5');
        if (mode === 'top')
            this.translateY(0, -300);
        else if (mode === 'bottom')
            this.translateY(0, 300);
        else if (mode === 'right')
            this.translateX(0, 300);
        else if (mode === 'left')
            this.translateX(0, -300);
        else
            this.translateY(0, -300);
        return this;
    }
    /**
     *
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    appearAndFadeOut(duration = 1300, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-out';
        this.translateY("120", "1/5");
        this.translateY("0", ["2/5", "3/5", "4/5"]);
        this.translateY("120", "5/5");
        this.opacity(0, "1/5");
        this.opacity(1, ["2/5", "3/5", "4/5"]);
        this.opacity(0, "5/5");
        return this;
    }
    /**
     *
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    increment(duration = 2000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.animation.timingFunction = 'ease-out-in';
        this.scale(0, 1);
        this.opacity(0, 1);
        return this;
    }
    /**
     *
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    incrementPulse(duration = 2000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.scale(0, '1/5');
        this.scale(1, ['2/5', '3/5']);
        this.scale(1.2, '4/5');
        this.scale(1, '5/5');
        this.opacity(0, '1/5');
        this.opacity(0.5, '2/5');
        this.opacity(1, '3/5');
        return this;
    }
    /**
     *
     * @param {string} mode - Esta es la direccion de la animacion.
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    circleTo(mode = 'bottom', duration = 2500, delay = 3000) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.target.style.visibility = "hidden";
        this.addProperty('visibility: visible;', 'visibility: visible;');
        if (mode === 'bottom') {
            this.translateY(-window.innerHeight, '1/5');
            this.translateY((-window.innerHeight / 2), '2/5');
            this.translateY((-window.innerHeight / 3), '3/5');
        }
        else {
            this.translateY(window.innerHeight, '1/5');
            this.translateY((window.innerHeight / 2), '2/5');
            this.translateY((window.innerHeight / 3), '3/5');
        }
        this.translateY(0, ['4/5', '5/5']);
        this.opacity(0, 1);
        this.addProperty('border-radius: 100%;', 'border-radius: 0;');
        this.scale(0.1, ['1/5', '2/5', '3/5', '4/5']);
        this.scale(1, '5/5');
        return this;
    }
    /**
     *
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    pulse(duration = 1000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.scale(1, 1);
        this.scale(1.1, ['2/5', '4/5']);
        this.scale(1.3, '3/5');
        return this;
    }
    /**
     *
     * @param {number} duration
     * @param {number} delay
     * @returns {CosmicAnimation}
     */
    palpite(duration = 3000, delay = 0) {
        this.animation.delay = delay;
        this.animation.duration = duration;
        this.scale(0.8, ['1/5', '3/5', '5/5']);
        this.scale(1.1, ['2/5', '4/5']);
        return this;
    }
    /**
     * ¿Ya liste animaciones a tu objeto CosmicAnimation?
     *
     * Puedes limpiar todas las animaciones con este metodo.
     *
     * @returns {CosmicAnimation}
     */
    deleteAnimation() {
        const style = document.getElementsByTagName('style')[0];
        // las animaciones de este elemento inyectadas dentro del primer archivo de estilos que habia.
        if (style !== undefined && style !== null) {
            const partOne = style.innerHTML.slice(0, style.innerHTML.indexOf("." + this.animation.name));
            const partTwo = style.innerHTML.slice((style.innerHTML.indexOf(`/* end: ${this.animation.name} */`) + `/* end: ${this.animation.name} */`.length), style.innerHTML.length);
            style.innerHTML = (partOne + partTwo);
        }
        this.target.classList = "";
        this.animation.name = ("cosmic-animation-" + Math.round(Math.random() * 300));
        this. = new Object({
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
        });
        return this;
    }
    /**
     * Este metodo calcula los (duration) y (delay) segun la configuracion de la (this.animation).
     * El callback se ejecuta al final de la animacion.
     */
    terminate(callback = function () { }) {
        let time = (this.animation.delay + this.animation.duration);
        // Verifica que la animacion no sea infinita.
        if (!Number.isFinite(this.animation.iterationCount))
            this.animation.iterationCount = "infinite";
        // Suma las el tiempo segun el numero de iteraciones de la animacion.
        if (Number.isInteger(this.animation.iterationCount)) {
            time = (time * this.animation.iterationCount);
        }
        else {
            if (Number(this.animation.iterationCount) !== NaN) {
                time = (time * this.animation.iterationCount);
            }
        }
        if (time !== "infinite" && time !== NaN && Number.isInteger(time)) {
            setTimeout(() => callback(), time);
        }
    }
    // Ejecuta las animaciones.
    execute() {
        // Crea un archivo (style).
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        // Lo inyecta al DOM.
        if (document.getElementsByTagName('style')[0] !== undefined) {
            style = document.getElementsByTagName('style')[0];
        }
        const empty = resource => {
            if (resource.length > 0)
                return (`transform: ${resource.join(' ')};`);
            else
                return ("");
        };
        const isUndefined = resource => {
            if (resource === null || resource === undefined)
                return '';
            else
                return resource;
        };
        // Este objeto contendra varios objetos, las partes de la animacion.
        /**
         * {
         * 	value: `
         * 		0%{ animaciones }
         * 	`
         * }
        */
        let parts = {};
        // Representacion de las partes del objeto, recordemos (3/3), (5/5) y (9/9).
        let keysThree = ['part1', 'part2', 'part3'];
        let keys = ['part1', 'part2', 'part3', 'part4', 'part5'];
        let keysNine = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7', 'part8', 'part9'];
        // La relacion en (%) de las partes.
        // Solo divide, (100% / 3) === (0%, 50%, 100%) === 3/3. Recuerda que el (0%) indica donde inicia la animacion.
        let numbersThree = ['0%', '50%', '100%'];
        let numbers = ['0%', '25%', '50%', '75%', '100%'];
        let numbersNine = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%', '100%'];
        /**
         * Aqui creamos un objeto con todas las etapas de la animacion y sus propiedades.
         */
        // Comprueba si el usuario utilizo una animacion (5/5).
        if (this..type === "default") {
            // Itera cinco veces.
            for (let i in keys) {
                // Extrae las propiedades, (normales) y (transformaciones).
                let valueTransform = Object.getOwnPropertyDescriptor(this..partsTransform, keys[i]);
                let valueNormal = Object.getOwnPropertyDescriptor(this..parts, keys[i]);
                valueTransform = valueTransform.value;
                valueNormal = valueNormal.value;
                /* Si el elemento tiene una animacion, entonces el objeto (parts) agrega la animacion:
                    --- (Numbers), etapa de la animacion en la iteracion.
                    --- (Keys), la clave de la animacion.
                        --- (Styles), los estilos de la animacion.. */
                if (empty(valueTransform) !== "" || (valueNormal.length > 0)) {
                    Object.defineProperty(parts, keys[i], {
                        value: (`
							${numbers[i]}{
								${empty(valueTransform)}
								${valueNormal.join(' ')}
							}
						`),
                        writable: true
                    });
                }
            }
            // Comprueba si el usuario utilizo una animacion (9/9).
        }
        else if (this..type === "nine") {
            // Itera nueve veces.
            for (let i in keysNine) {
                // Extrae las propiedades, (normales) y (transformaciones).
                let valueTransform = Object.getOwnPropertyDescriptor(this..partsNineTransform, keysNine[i]);
                let valueNormal = Object.getOwnPropertyDescriptor(this..partsNine, keysNine[i]);
                valueTransform = valueTransform.value;
                valueNormal = valueNormal.value;
                // Hce el mismo proceso de arriba.
                if (empty(valueTransform) !== "" || (valueNormal.length > 0)) {
                    Object.defineProperty(parts, keysNine[i], {
                        value: (`
							${numbersNine[i]}{
								${empty(valueTransform)}
								${valueNormal.join(' ')}
							}
						`),
                        writable: true
                    });
                }
            }
        }
        else {
            // Si no fue (5/5 == normal), ni (9/9), entonces es (3/3), el proceso se repite.
            for (let i in keysThree) {
                let valueTransform = Object.getOwnPropertyDescriptor(this..partsThreeTransform, keysThree[i]);
                let valueNormal = Object.getOwnPropertyDescriptor(this..partsThree, keysThree[i]);
                valueTransform = valueTransform.value;
                valueNormal = valueNormal.value;
                if (empty(valueTransform) !== "" || (valueNormal.length > 0)) {
                    Object.defineProperty(parts, keysThree[i], {
                        value: (`
							${numbersThree[i]}{
								${empty(valueTransform)}
								${valueNormal.join(' ')}
							}
						`),
                        writable: true
                    });
                }
            }
        }
        __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_validate).call(this);
        // Obtenemos un arreglo con todas las etapas de la animacion, cada etapa con sus propiedades.
        const getParts = () => {
            // Aqui almacera las animaciones por separado, cada animacion tiene este formato: 
            /**
             * 	{
             * 		value: "50%{ animaciones }"
             * 	}
             *
             * Donde (50%) varia segun el tipo de animacion 5/5, 9/9 o 3/3.
             */
            let array = new Array();
            // 5/5.
            if (this..type === "default") {
                array = keys.map(key => {
                    let obj = isUndefined(Object.getOwnPropertyDescriptor(parts, key));
                    if (obj.value)
                        return obj.value;
                });
                // 9/9.
            }
            else if (this..type === "nine") {
                array = keysNine.map(key => {
                    let obj = isUndefined(Object.getOwnPropertyDescriptor(parts, key));
                    if (obj.value)
                        return obj.value;
                });
                // 3/3.
            }
            else if (this..type === "three") {
                array = keysThree.map(key => {
                    let obj = isUndefined(Object.getOwnPropertyDescriptor(parts, key));
                    if (obj.value)
                        return obj.value;
                });
            }
            return (array.join(""));
        };
        // En la hoja de estilos que inyectamos, ahora agregamos las configuraciones de nuestra animacion.
        style.innerHTML += (`
			.${this.animation.name}{
				animation-name: ${this.animation.name};
				animation-duration: ${this.animation.duration}ms;
				animation-delay: ${this.animation.delay}ms;
				animation-iteration-count: ${this.animation.iterationCount};
				animation-direction: ${this.animation.direction};
				animation-timing-function: ${this.animation.timingFunction};
				animation-fill-mode: ${this.animation.fillMode};
			}
			@keyframes ${this.animation.name}{
				${getParts()}
			}/* end: ${this.animation.name} */
		`);
        // Agregamos la hoja de estilos al DOM.
        document.getElementsByTagName('body')[0].appendChild(style);
        /**
         * ¿Como? ¿Quieres utilizar ObserverViewport?
         *
         * Revisa que lo hayas configurado.
         */
        // Revisa que este habilitado.
        if (this.observeViewport.enabled) {
            // Lo aplica.
            const intersectingObserver = () => {
                const observeTarget = new IntersectionObserver(elements => {
                    // Cuando el objeto es intersectado.
                    if (elements[0].isIntersecting) {
                        // Aplica la animacion.
                        this.target.classList.add(this.animation.name);
                    }
                    else {
                        // Si configuraste (infinite), entonces la animacion se repite cada que el elemento abandona y entra de nuevo al viewport.
                        if (this.observeViewport.infinite)
                            this.target.classList.remove(this.animation.name);
                    }
                });
                observeTarget.observe(this.target.parentElement);
            };
            // Ejecutamos.
            intersectingObserver();
        }
        else {
            // Sino, solo aplica la animacion y ya.
            this.target.classList.add(this.animation.name);
        }
    }
}
_CosmicAnimation_lettersToElements = new WeakMap(), _CosmicAnimation_instances = new WeakSet(), _CosmicAnimation_error = function _CosmicAnimation_error(args) {
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
}, _CosmicAnimation_addResources = function _CosmicAnimation_addResources(start, end, parts) {
    /**
     * Si lo final es un numero, significa que hemos recibido:
     * 		@example funcion(start, parts)
     * 		@example funcion(1, 1)
     * Y esto por defecto hace que (start) y (end) posean las
     * propiedades declaradas a guardar en el arreglo por defecto.
     */
    if (typeof parts === "number") {
        this.resources.parts.part1.push(start);
        this.resources.parts.part5.push(end);
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
            this.resources.type = "nine";
            // @ts-ignore
            if (Array.isArray(this.resources.partsNine[partName])) {
                // @ts-ignore
                this.resources.partsNine[partName].push(start);
            }
            return;
        }
        else if (parts.includes("/3")) {
            this.resources.type = "three";
            // @ts-ignore
            if (Array.isArray(this.resources.partsThree[partName])) {
                // @ts-ignore
                this.resources.partsThree[partName].push(start);
            }
            return;
        }
        else if (parts.includes("/5")) {
            // Indicar que es por defecto.
            this.resources.type = "default";
            // @ts-ignore
            if (Array.isArray(this.resources.parts[partName])) {
                // @ts-ignore
                this.resources.parts[partName].push(start);
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
            __classPrivateFieldGet(this, _CosmicAnimation_instances, "m", _CosmicAnimation_addResources).call(this, start, "", part);
        }
    }
}, _CosmicAnimation_validate = function _CosmicAnimation_validate() {
    if (!Number.isFinite(this.animation.iterationCount))
        this.animation.iterationCount = 'infinite';
    else if (!Number.isInteger(this.animation.iterationCount))
        this.animation.iterationCount = 1;
    if (!Number.isFinite(this.animation.duration))
        this.animation.duration = 1000;
    else if (!Number.isInteger(this.animation.duration))
        this.animation.duration = 1000;
    if (!Number.isFinite(this.animation.delay))
        this.animation.delay = 0;
    else if (!Number.isInteger(this.animation.delay))
        this.animation.iterationCount = 0;
    return true;
};
export {};
