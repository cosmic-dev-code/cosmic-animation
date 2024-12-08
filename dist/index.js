var _CosmicAnimation;
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _CosmicAnimation_brand = /*#__PURE__*/new WeakSet();
var _resources = /*#__PURE__*/new WeakMap();
var _validations = /*#__PURE__*/new WeakMap();
var _originalContent = /*#__PURE__*/new WeakMap();
// Interfaces

/**
 * @class CosmicAnimation
 */
class CosmicAnimation {
  /**
   * El constructor puede retornar un objeto CosmicAnimation o un arreglo de objetos CosmicAnimacion.
   * @author Brandon Anthony Olivares Amador
   * @param {string|string[]} selector
   * @param {string|string[]} name
   * @return {CosmicAnimation|CosmicAnimation[]}
   */
  constructor(selector, name) {
    /**
     * @private
     */
    _classPrivateMethodInitSpec(this, _CosmicAnimation_brand);
    // Por defecto crea un elemento DIV.
    _defineProperty(this, "target", document.createElement('div'));
    /**
     * Aqui se manejan las etapas de la animacion, (segun la que el usuario prefiera).
     * @private
     */
    // @ts-ignore
    _classPrivateFieldInitSpec(this, _resources, {});
    /**
     * @private
     */
    _classPrivateFieldInitSpec(this, _validations, {
      numeric: /^[0-9]$/,
      empty: function (data) {
        return data === undefined || data === null || Number.isNaN(data) || data === "";
      }
    });
    /**
     * Si el usuario desea reiniciar el elemento, tenemos un respaldo del contenido.
     * @private
     */
    _classPrivateFieldInitSpec(this, _originalContent, "");
    // Ajustes comunes de una animacion CSS.
    _defineProperty(this, "animation", {
      name: 'name',
      delay: 0,
      duration: 1500,
      iterationCount: 1,
      direction: 'normal',
      timingFunction: 'linear',
      fillMode: 'forwards'
    });
    // Configura si quieres que la animacion se ejecute cuando el elemento este visible en el viewport.
    _defineProperty(this, "observeViewport", {
      enabled: false,
      infinite: false // Indica si solo se ejecuta una vez o cada vez que entre y salga del viewport.
    });
    _assertClassBrand(_CosmicAnimation_brand, this, _assignDefaultValues).call(this);
    if (!name) name = _assertClassBrand(_CosmicAnimation_brand, this, _createAutomaticName).call(this);
    if (_classPrivateFieldGet(_validations, this).empty(selector)) {
      _assertClassBrand(_CosmicAnimation_brand, this, _error).call(this, 'The selector (' + selector + ') is not valid.');

      // Primer Arreglo.
    } else if (Array.isArray(selector)) {
      const arrCosmicsElements = new Array();

      // Segundo Arreglo.
      if (Array.isArray(name)) {
        // Verificamos si recibimos un arreglo con los nombres[] de animacion para cada selector[].
        for (let i in selector) {
          // Selector y Animacion
          const selectorName = selector[i],
            animationName = name[i];
          if (!_classPrivateFieldGet(_validations, this).empty(selectorName) && !_classPrivateFieldGet(_validations, this).empty(animationName)) {
            // Se relaciona cada Nombre con su Animacion.
            arrCosmicsElements.push(new CosmicAnimation(selectorName, animationName));
          } else {
            // Nombre de animacion automatica.
            arrCosmicsElements.push(new CosmicAnimation(animationName));
          }
        }
        // Solo fue el primer arreglo, (nombres de animacion automaticos).
      } else {
        for (let i in selector) arrCosmicsElements.push(new CosmicAnimation(selector[i]));
      }

      // @ts-ignore
      // Retorna un arreglo de objetos CosmicAnimation.
      return arrCosmicsElements;
    } else {
      const select = selector;

      // No tiene sentido tener un Selector y varios nombres de animacion.
      if (Array.isArray(name)) name = name[0];

      // Se comprueba que el selector pasado por argumento exista dentro del DOM.
      try {
        const element = document.querySelector(select);
        if (!element) {
          _assertClassBrand(_CosmicAnimation_brand, this, _warning).call(this, "The selector (" + select + ") not exists in DOM.");

          // Creamos el objeto CosmicAnimation.
        } else {
          this.target = element;
          this.animation.name = name;
        }
      } catch (error) {
        _assertClassBrand(_CosmicAnimation_brand, this, _error).call(this, "Error when extracting the selector (".concat(selector, ")"));
      }
    }
  }

  /**
   * Para mandar mensajes de errores internos.
   * @author Brandon Anthony Olivares Amador
   * @param {string[]} arguments
   * @returns {void}
  */

  // Transformaciones.
  // Como puedes observar las propiedades de transformacion se almacenan en otro lugar.

  /**
   * @author Brandon Anthony Olivares Amador
   * @example scale(0.5, 1)
   * @example scale(0.5, '1/5')
   * @example scale(0.5, ['1/3', '2/3'])
   */
  scale() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, "scale(".concat(start, ")"), "scale(".concat(end, ")"), end, true);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example translateY(0.5, 1)
   * @example translateY(0.5, '1/5')
   * @example translateY(0.5, ['1/3', '2/3'])
   */
  translateY() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'translateY(' + start + 'px)', 'translateY(' + end + 'px)', end, true);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example translateX(0.5, 1)
   * @example translateX(0.5, '1/5')
   * @example translateX(0.5, ['1/3', '2/3'])
   */
  translateX() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'translateX(' + start + 'px)', 'translateX(' + end + 'px)', end, true);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example rotate(0.5, 1)
   * @example rotate(0.5, '1/5')
   * @example rotate(0.5, ['1/3', '2/3'])
   */
  rotate() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'rotate(' + start + 'deg)', 'rotate(' + end + 'deg)', end, true);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example opacity(0.5, 1)
   * @example opacity(0.5, '1/5')
   * @example opacity(0.5, ['1/3', '2/3'])
   */
  opacity() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'opacity: ' + start + ';', 'opacity: ' + end + ';', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example bgColor("blue", "red")
   * @example bgColor("blue", '1/5')
   * @example bgColor("blue", ['1/3', '2/3'])
   */
  bgColor() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "red";
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "red";
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'background-color: ' + start + ';', 'background-color: ' + end + ';', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example color("blue", "red")
   * @example color("blue", '1/5')
   * @example color("blue", ['1/3', '2/3'])
   */
  color() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "black";
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'color: ' + start + ';', 'color: ' + end + ';', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example width(300, 700)
   * @example width(300, '1/5')
   * @example width(300, ['1/3', '2/3'])
   */
  width() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'width: ' + start + 'px;', 'width: ' + end + 'px;', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example height(300, 700)
   * @example height(300, '1/5')
   * @example height(300, ['1/3', '2/3'])
   */
  height() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'height: ' + start + 'px;', 'height: ' + end + 'px;', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example padding(10, 6)
   * @example padding(10, '1/5')
   * @example padding(10, ['1/3', '2/3'])
   */
  padding() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'padding: ' + start + 'px;', 'padding: ' + end + 'px;', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example margin(10, 6)
   * @example margin(10, '1/5')
   * @example margin(10, ['1/3', '2/3'])
   */
  margin() {
    let start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, 'margin: ' + start + 'px;', 'margin: ' + end + 'px;', end);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   * @example addProperty("border: 2px solid #000;", "border: 6px solid blue;")
   * @example addProperty("border: 2px solid #000;", '1/5')
   * @example addProperty("border: 2px solid #000;", ["2/5", "3/5", "4/5"])
   */
  addProperty() {
    let cssStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    let cssEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, cssStart, cssEnd, cssEnd);
    return this;
  }

  /**
   * Metodo interno utilizado solo para la animacion letra por letra, debe complementarse, por eso es privado.
   * (appear) Inyecta opacity cuando el texto debe aparecer.
   * @author Brandon Anthony Olivares Amador
   * @private
   */

  /**
   * @author Brandon Anthony Olivares Amador
   */
  fromWindowShowTo() {
    let mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "right";
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
    let delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-in-out';
    this.opacity(0, 1).opacity(0.3, '2/5').opacity(0.5, '3/5').opacity(0.7, '4/5');
    if (mode === "top") {
      this.translateY(window.innerWidth, 0); // + y 0
    } else if (mode === "right") {
      this.translateX(-window.innerWidth, 0); // - y 0
    } else if (mode === "bottom") {
      this.translateY(-window.innerWidth, 0); // - y 0
    } else {
      this.translateX(window.innerWidth, 0); // + y 0
    }
    return this;
  }

  /**
   * Desaperece el texto del elemento letra por letra.
   * @author Brandon Anthony Olivares Amador
   */
  fadeOutLetters() {
    let spaceInLetters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    let time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _assertClassBrand(_CosmicAnimation_brand, this, _fadeOut).call(this, {
      spaceInLetters,
      time
    });
    return this;
  }

  /**
   * Desaperece el texto del elemento letra por letra.
   * @author Brandon Anthony Olivares Amador
   */
  appearLetters() {
    let spaceInLetters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    let time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _assertClassBrand(_CosmicAnimation_brand, this, _fadeOut).call(this, {
      spaceInLetters,
      time,
      appear: true
    });
    return this;
  }

  /**
   * Desaperece el texto del elemento letra por letra hacia una direccion especificada.
   * @author Brandon Anthony Olivares Amador
   */
  fadeOutLettersTo() {
    let mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "top";
    let spaceInLetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    _assertClassBrand(_CosmicAnimation_brand, this, _fadeOut).call(this, {
      mode,
      spaceInLetters,
      time
    });
    return this;
  }

  /**
   * Desaperece el texto del elemento letra por letra hacia una direccion especificada.
   * @author Brandon Anthony Olivares Amador
   */
  appearLettersTo() {
    let mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "top";
    let spaceInLetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    _assertClassBrand(_CosmicAnimation_brand, this, _fadeOut).call(this, {
      mode,
      spaceInLetters,
      time,
      appear: true
    });
    return this;
  }

  /**
   * Desaperece el texto del elemento letra por letra hacia una direccion random.
   * @author Brandon Anthony Olivares Amador
   */
  fadeOutLettersRandom() {
    let spaceInLetters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    let time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _assertClassBrand(_CosmicAnimation_brand, this, _fadeOut).call(this, {
      spaceInLetters,
      time,
      random: true
    });
    return this;
  }

  /**
   * Desaperece el texto del elemento letra por letra hacia una direccion random.
   * @author Brandon Anthony Olivares Amador
   */
  appearLettersRandom() {
    let spaceInLetters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    let time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _assertClassBrand(_CosmicAnimation_brand, this, _fadeOut).call(this, {
      spaceInLetters,
      time,
      random: true,
      appear: true
    });
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  appear() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1300;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-out';
    this.opacity(0, 1);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  appearTo() {
    let direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1300;
    let delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-in-out';
    this.opacity(0, '1/5').opacity(0.1, '2/5').opacity(0.2, '3/5').opacity(0.3, '4/5').opacity(1, '5/5');

    // De acuerdo a la direccion, se crea la animacion.
    if (direction === 'top') this.translateY(300, 0);else if (direction === 'bottom') this.translateY(-300, 0);else if (direction === 'right') this.translateX(-300, 0);else if (direction === 'left') this.translateX(300, 0);else this.translateY(300, 0);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  fadeOut() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1300;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-out';
    this.opacity(1, 0);
    return this;
  }
  fadeIn() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1300;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return this.appear(duration, delay);
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  fadeOutTo() {
    let direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1300;
    let delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-in';
    this.opacity(1, '1/5').opacity(0.3, '2/5').opacity(0.2, '3/5').opacity(0.1, '4/5').opacity(0, '5/5');

    // De acuerdo a la direccion, se crea la animacion.
    if (direction === 'top') this.translateY(0, -300);else if (direction === 'bottom') this.translateY(0, 300);else if (direction === 'right') this.translateX(0, 300);else if (direction === 'left') this.translateX(0, -300);else this.translateY(0, -300);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  appearAndFadeOut() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1300;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-out';
    this.translateY(120, "1/5").translateY(0, ["2/5", "3/5", "4/5"]).translateY(120, "5/5").opacity(0, "1/5").opacity(1, ["2/5", "3/5", "4/5"]).opacity(0, "5/5");
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  increment() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.animation.timingFunction = 'ease-out-in';
    this.scale(0, 1).opacity(0, 1);
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  incrementPulse() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.scale(0, '1/5').scale(1, ['2/5', '3/5']).scale(1.2, '4/5').scale(1, '5/5').opacity(0, '1/5').opacity(0.5, '2/5').opacity(1, '3/5');
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  circleTo() {
    let direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2500;
    let delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.target.style.visibility = "hidden";
    this.addProperty('visibility: visible;', 'visibility: visible;');
    if (direction === 'bottom') {
      this.translateY(-window.innerHeight, '1/5').translateY(-window.innerHeight / 2, '2/5').translateY(-window.innerHeight / 3, '3/5');
    } else {
      this.translateY(window.innerHeight, '1/5').translateY(window.innerHeight / 2, '2/5').translateY(window.innerHeight / 3, '3/5');
    }
    this.translateY(0, ['4/5', '5/5']).opacity(0, 1).addProperty('border-radius: 100%;', 'border-radius: 0;').scale(0.1, ['1/5', '2/5', '3/5', '4/5']).scale(1, '5/5');
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  pulse() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.scale(1, 1).scale(1.1, ['2/5', '4/5']).scale(1.3, '3/5');
    return this;
  }

  /**
   * @author Brandon Anthony Olivares Amador
   */
  palpite() {
    let duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
    let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.animation.delay = delay;
    this.animation.duration = duration;
    this.scale(0.8, ['1/5', '3/5', '5/5']).scale(1.1, ['2/5', '4/5']);
    return this;
  }

  /**
   * ¿Ya liste animaciones a tu objeto CosmicAnimation?
   * Puedes limpiar todas las animaciones con este metodo.
   * 
   * @author Brandon Anthony Olivares Amador
   */
  reset() {
    let restartContent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const style = document.getElementsByTagName('style')[0];

    // las animaciones de este elemento inyectadas dentro del primer archivo de estilos que habia.
    if (style) {
      const comment = "/* end: ".concat(this.animation.name, " */"),
        animationName = ".".concat(this.animation.name);

      // Desde todo, hasta donde inicia el nombre de la animacion.
      const partOne = style.innerHTML.slice(0, style.innerHTML.indexOf(animationName));

      // Desde donde termina el comentario de esta animacion, hasta el final.
      const partTwo = style.innerHTML.slice(style.innerHTML.indexOf(comment) + comment.length, style.innerHTML.length);

      // Lo de en medio se fue, hasta INICIO, desde FINAL.
      style.innerHTML = partOne + partTwo;
    }

    // Restauramos ajustes por defecto.
    _assertClassBrand(_CosmicAnimation_brand, this, _assignDefaultValues).call(this);
    if (restartContent) {
      if (_classPrivateFieldGet(_originalContent, this)) this.target.innerHTML = _classPrivateFieldGet(_originalContent, this);
    }
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
      let time = this.animation.delay + this.animation.duration;

      // Verifica que la animacion no sea infinita.
      const isFinite = Number.isFinite(this.animation.iterationCount) && String(this.animation.iterationCount) !== "infinite";

      // Suma el tiempo segun la cantidad de iteraciones de la animacion.
      if (Number.isInteger(this.animation.iterationCount) && isFinite) {
        time = time * this.animation.iterationCount;
      }

      // El callback se ejecuta al finalizar la animacion.
      if (isFinite && typeof callback === "function") {
        setTimeout(() => callback(), time);
      }
    } catch (error) {
      if (typeof callbackErr === "function") callbackErr(error);
    }
  }

  /**
   * Este metodo ejecuta acciones al finalizar la animacion de manera asincrona.
   * @author Brandon Anthony Olivares Amador
   * @returns {Promise<boolean|any>}
   */
  asyncEnds() {
    return new Promise((resolve, reject) => {
      this.ends(() => resolve(true), error => reject(error));
    });
  }

  /**
   * Validaciones para los ajustes de la animacion.
   * @author Brandon Anthony Olivares Amador
   * @private
   */

  /**
   * Ejecuta las animaciones.
   * @returns {CosmicAnimation}
   */
  execute() {
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
    const typeAnimation = _classPrivateFieldGet(_resources, this).type;

    // Extrae la cantidad de veces a iterar segun el tipo de animacion.
    const iterarion = (typeAnimation === "default" ? partsFive.length : typeAnimation === "nine" ? partsNine.length : partsThree.length) - 1;
    for (let i = 0; i <= iterarion; i++) {
      let part, percentage;

      // Comprueba si el usuario utilizo una animacion (5/5).
      if (typeAnimation === "default") {
        part = partsFive[i], percentage = percentageFive[i];
        // Comprueba si el usuario utilizo una animacion (9/9).
      } else if (typeAnimation === "nine") {
        part = partsNine[i], percentage = percentageNine[i];
        // Si no fue (5/5 == normal), ni (9/9), entonces es (3/3), el proceso se repite.
      } else {
        part = partsThree[i], percentage = percentageThree[i];
      }

      // Extrae las propiedades, (normales) y (transformaciones).
      let valueTransform, valueNormal;
      if (typeAnimation === "default") {
        var _Object$getOwnPropert, _Object$getOwnPropert2;
        valueTransform = (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(_classPrivateFieldGet(_resources, this).partsTransform, part)) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.value;
        valueNormal = (_Object$getOwnPropert2 = Object.getOwnPropertyDescriptor(_classPrivateFieldGet(_resources, this).parts, part)) === null || _Object$getOwnPropert2 === void 0 ? void 0 : _Object$getOwnPropert2.value;
      } else if (typeAnimation === "nine") {
        var _Object$getOwnPropert3, _Object$getOwnPropert4;
        valueTransform = (_Object$getOwnPropert3 = Object.getOwnPropertyDescriptor(_classPrivateFieldGet(_resources, this).partsNineTransform, part)) === null || _Object$getOwnPropert3 === void 0 ? void 0 : _Object$getOwnPropert3.value;
        valueNormal = (_Object$getOwnPropert4 = Object.getOwnPropertyDescriptor(_classPrivateFieldGet(_resources, this).partsNine, part)) === null || _Object$getOwnPropert4 === void 0 ? void 0 : _Object$getOwnPropert4.value;
      } else {
        var _Object$getOwnPropert5, _Object$getOwnPropert6;
        valueTransform = (_Object$getOwnPropert5 = Object.getOwnPropertyDescriptor(_classPrivateFieldGet(_resources, this).partsThreeTransform, part)) === null || _Object$getOwnPropert5 === void 0 ? void 0 : _Object$getOwnPropert5.value;
        valueNormal = (_Object$getOwnPropert6 = Object.getOwnPropertyDescriptor(_classPrivateFieldGet(_resources, this).partsThree, part)) === null || _Object$getOwnPropert6 === void 0 ? void 0 : _Object$getOwnPropert6.value;
      }

      // Verificamos que los (value) de las (part) de (resources) no se encuentren vacios.
      /**
       * Las transformaciones solo requiren un (key), y tienen muchos (values).
       * 		--- transform: translateY(-50rem) scale(1) skew(9deg) rotate(180deg);
       * 
       * Pero las propiedades normales solo son un (key) y un (value).
       * 		--- opacity: 1; color: #000; font-size: 1.6rem;
       */
      if (valueTransform.length > 0 || valueNormal.length > 0) {
        // Agregregar parte de animacion. (%).
        Object.defineProperty(ANIMATION_PARTS, part, {
          value: "\n\t\t\t\t\t\t".concat(percentage, "{\n\t\t\t\t\t\t\t").concat(valueTransform.length > 0 ? "\n\t\t\t\t\t\t\t\t\ttransform: ".concat(valueTransform.join(' '), ";\n\t\t\t\t\t\t\t\t") : "", "\n\t\t\t\t\t\t\t").concat(valueNormal.length > 0 ? "\n\t\t\t\t\t\t\t\t\t".concat(valueNormal.join(''), "\n\t\t\t\t\t\t\t\t") : "", "\n\t\t\t\t\t\t}\n\t\t\t\t\t"),
          writable: true,
          enumerable: true
        });
      }
    }
    _assertClassBrand(_CosmicAnimation_brand, this, _validateAnimationSettings).call(this);

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
    style.innerHTML += "\n\t\t\t.".concat(this.animation.name, "{\n\t\t\t\tanimation-name: ").concat(this.animation.name, ";\n\t\t\t\tanimation-duration: ").concat(this.animation.duration, "ms;\n\t\t\t\tanimation-delay: ").concat(this.animation.delay, "ms;\n\t\t\t\tanimation-iteration-count: ").concat(Number.isFinite(this.animation.iterationCount) ? this.animation.iterationCount : 'infinite', ";\n\t\t\t\tanimation-direction: ").concat(this.animation.direction, ";\n\t\t\t\tanimation-timing-function: ").concat(this.animation.timingFunction, ";\n\t\t\t\tanimation-fill-mode: ").concat(this.animation.fillMode, ";\n\t\t\t}\n\t\t\t@keyframes ").concat(this.animation.name, "{\n\t\t\t\t").concat(getPercentages(), "\n\t\t\t}/* end: ").concat(this.animation.name, " */\n\t\t");

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
        } else if (this.observeViewport.infinite) {
          this.target.classList.remove(this.animation.name);
        }
      });
      if (this.target.parentElement) {
        observeTarget.observe(this.target.parentElement);
      }
    } else {
      // Sino, solo aplica la animacion y ya.
      this.target.classList.add(this.animation.name);
    }
    return this;
  }
}

// @ts-ignore
_CosmicAnimation = CosmicAnimation;
function _assignDefaultValues() {
  // @ts-ignore
  this.target.classList = "";
  this.animation.name = "cosmic-animation-" + Math.round(Math.random() * 300);
  _classPrivateFieldSet(_resources, this, {
    type: 'default',
    // 3/3
    partsThree: {
      part1: [],
      part2: [],
      part3: []
    },
    partsThreeTransform: {
      part1: [],
      part2: [],
      part3: []
    },
    // 5/5
    parts: {
      part1: [],
      part2: [],
      part3: [],
      part4: [],
      part5: []
    },
    partsTransform: {
      part1: [],
      part2: [],
      part3: [],
      part4: [],
      part5: []
    },
    // 9/9
    partsNine: {
      part1: [],
      part2: [],
      part3: [],
      part4: [],
      part5: [],
      part6: [],
      part7: [],
      part8: [],
      part9: []
    },
    partsNineTransform: {
      part1: [],
      part2: [],
      part3: [],
      part4: [],
      part5: [],
      part6: [],
      part7: [],
      part8: [],
      part9: []
    }
  });
}
function _createAutomaticName() {
  return "cosmic-animation-" + Math.round(Math.random() * 300);
}
function _error(args) {
  if (arguments.length > 1) {
    for (let arg of arguments) _assertClassBrand(_CosmicAnimation_brand, this, _error).call(this, arg);
  } else {
    console.log("%cCosmicAnimation: ".concat(arguments[0]), "\n\t\t\t\tdisplay: block;\n\t\t\t\twidth: 100%;\n\t\t\t\tpadding: 10px;\n\t\t\t\tcolor: #641E16;\n\t\t\t\tbackground-color: #F5B7B1;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tletter-spacing: 3px;\n\t\t\t");
  }
}
// Mensaje de advertencia, es lo mismo que el anterior.
function _warning(args) {
  if (arguments.length > 1) {
    for (let arg of arguments) _assertClassBrand(_CosmicAnimation_brand, this, _warning).call(this, arg);
  } else {
    console.log("%cCosmicAnimation: ".concat(arguments[0]), "\n\t\t\t\tdisplay: block;\n\t\t\t\twidth: 100%;\n\t\t\t\tpadding: 10px;\n\t\t\t\tcolor: #7E5109;\n\t\t\t\tbackground-color: #F1C40F;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tletter-spacing: 3px;\n\t\t\t");
  }
}
/**
 * Funcion para guardar cada propiedad en el arreglo de cada parte, sea: 
 * 		--- Novenos, Quintos o Tercios.
 * (start) y (end) NO reciben numeros, sino propiedades con los numeros ya incluidos, ejemplo: 
 * 		@example addResources("height: 10px", "height: 100px")
 * 		@example addResources("height: 10px", "height: '1/3'", '1/3')
 * 		@example addResources("height: 10px", "height: '1/3','2/3'", ['1/3', '2/3'])
 * Donde (end) no se toma en cuenta ya que (start) se asigna a '1/3' o se asigna a ['1/3', '2/3'].
 * @author Brandon Anthony Olivares Amador
 * @param {string} start
 * @param {string} end
 * @param {string|string[]|number} parts
 * @returns {void}
 */
function _addResources(start, end, parts, isTransform) {
  /**
   * Si lo final es un numero, significa que hemos recibido: 
   * 		@example funcion(start, parts)
   * 		@example funcion(1, 1)
   * Y esto por defecto hace que (start) y (end) posean las 
   * propiedades declaradas a guardar en el arreglo por defecto.
   */
  if (typeof parts === "number") {
    if (isTransform) {
      _classPrivateFieldGet(_resources, this).partsTransform.part1.push(start);
      _classPrivateFieldGet(_resources, this).partsTransform.part5.push(end);
    } else {
      _classPrivateFieldGet(_resources, this).parts.part1.push(start);
      _classPrivateFieldGet(_resources, this).parts.part5.push(end);
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
    let firstNumber = parts.split("/")[0],
      // 1
      partName = "part".concat(firstNumber); // part1, part2, part3, ...

    if (parts.includes("/9")) {
      _classPrivateFieldGet(_resources, this).type = "nine";
      if (isTransform) {
        // @ts-ignore
        if (Array.isArray(_classPrivateFieldGet(_resources, this).partsNineTransform[partName])) {
          // @ts-ignore
          _classPrivateFieldGet(_resources, this).partsNineTransform[partName].push(start);
        }
      } else {
        // @ts-ignore
        if (Array.isArray(_classPrivateFieldGet(_resources, this).partsNine[partName])) {
          // @ts-ignore
          _classPrivateFieldGet(_resources, this).partsNine[partName].push(start);
        }
      }
      return;
    } else if (parts.includes("/3")) {
      _classPrivateFieldGet(_resources, this).type = "three";
      if (isTransform) {
        // @ts-ignore
        if (Array.isArray(_classPrivateFieldGet(_resources, this).partsThreeTransform[partName])) {
          // @ts-ignore
          _classPrivateFieldGet(_resources, this).partsThreeTransform[partName].push(start);
        }
      } else {
        // @ts-ignore
        if (Array.isArray(_classPrivateFieldGet(_resources, this).partsThree[partName])) {
          // @ts-ignore
          _classPrivateFieldGet(_resources, this).partsThree[partName].push(start);
        }
      }
      return;
    } else if (parts.includes("/5")) {
      // Indicar que es por defecto.
      _classPrivateFieldGet(_resources, this).type = "default";
      if (isTransform) {
        // @ts-ignore
        if (Array.isArray(_classPrivateFieldGet(_resources, this).partsTransform[partName])) {
          // @ts-ignore
          _classPrivateFieldGet(_resources, this).partsTransform[partName].push(start);
        }
      } else {
        // @ts-ignore
        if (Array.isArray(_classPrivateFieldGet(_resources, this).parts[partName])) {
          // @ts-ignore
          _classPrivateFieldGet(_resources, this).parts[partName].push(start);
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
        _assertClassBrand(_CosmicAnimation_brand, this, _error).call(this, "Data {".concat(part, "} is not accepted in {string[]}"));
        return;
      }
      _assertClassBrand(_CosmicAnimation_brand, this, _addResources).call(this, start, "", part, isTransform);
    }
  }
}
function _lettersToElements(spaceInLetters) {
  let appear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // Respaldo.
  _classPrivateFieldSet(_originalContent, this, this.target.innerHTML);
  if (this.target.textContent) {
    // Obtenermos el texto del elemento, convertido en array.
    let letters = this.target.textContent.split("");

    // Limpiar HTML y texto del elemento.
    this.target.innerHTML = "";

    // Iterar letra por letra.
    letters.forEach(letter => {
      // Los espacios son reemplazados por un margen (X) con el valor (spaceInLetters).
      // Las demas letras son inyectadas en otro <span>, esto se hace para poder animar cada <span>
      if (letter === " " || letter === "\n" || letter === "\t") {
        this.target.innerHTML += "\n\t\t\t\t\t\t<span style=\"\n\t\t\t\t\t\t\t".concat(appear ? 'opacity: 0;' : '', "\n\t\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\t\tmargin: 0 ").concat(spaceInLetters, "px;\n\t\t\t\t\t\t\"></span>\n\t\t\t\t\t").trim();
      } else {
        this.target.innerHTML += "\n\t\t\t\t\t\t<span style=\"\n\t\t\t\t\t\t\t".concat(appear ? 'opacity: 0;' : '', "\n\t\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\t\">").concat(letter, "</span>\n\t\t\t\t\t").trim();
      }
    });
  }
}
/**
 * Desaperece o Aparece el texto del elemento letra por letra, puede recibir una 
 * direccion especifica o solo desaparecer.
 * @author Brandon Anthony Olivares Amador
 * @param {CosmicFadeOutSettings} param0
 * @private
 */
function _fadeOut(_ref) {
  let {
    mode,
    spaceInLetters,
    time,
    random,
    appear
  } = _ref;
  // Transformar contenido del elemento en <span> con cada letra para animar cada letra de manera individual.
  _assertClassBrand(_CosmicAnimation_brand, this, _lettersToElements).call(this, spaceInLetters, appear);
  let index = 0,
    // Obtener los <span> inyectados.
    childs = this.target.children,
    // Almacena los "ids" automaticas para cada <span>
    ids = new Array(),
    // Utilizado para asignar un (mode) automatico, (si es random)
    randomModes = new Array("top", "right", "bottom", "left", "center");
  const createAutomaticRandIds = () => {
    const randomId = Math.round(Math.random() * 1000);
    if (ids.indexOf(randomId) === -1) ids.push(randomId);else createAutomaticRandIds();
  };
  for (let i = 0; i < childs.length; i++) createAutomaticRandIds();

  // Iterar <span> inyectados.
  const interval = setInterval(() => {
    const span = childs[index],
      randomId = "id".concat(ids[index]);
    span.setAttribute("id", randomId);

    // Si no hay direccion, sino que es cada una a lo random.
    if (random) {
      let randomMode = randomModes[Math.floor(Math.random() * randomModes.length)];
      if (appear) new _CosmicAnimation("#" + randomId).appearTo(randomMode).execute();else new _CosmicAnimation("#" + randomId).fadeOutTo(randomMode).execute();
      // Si hay una direccion, desaparece hacia una direccion.
    } else if (mode) {
      if (appear) new _CosmicAnimation("#" + randomId).appearTo(mode).execute();else new _CosmicAnimation("#" + randomId).fadeOutTo(mode).execute();

      // Sino, solo desaparece.
    } else {
      if (appear) new _CosmicAnimation("#" + randomId).appear().execute();else new _CosmicAnimation("#" + randomId).fadeOut().execute();
    }
    index++;

    // Detenemos el intervalo cuando ya hayamos recorrido todos los <span>
    if (index >= childs.length) clearInterval(interval);
  }, time);
}
function _validateAnimationSettings() {
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
}
window.CosmicAnimation = CosmicAnimation;
export {};