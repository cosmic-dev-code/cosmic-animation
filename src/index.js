/**
 * @class CosmicAnimation
 */
class CosmicAnimation{
	// Por defecto crea un elemento DIV.
	target = document.createElement('div');

	// Aqui se manejan las etapas de la animacion, (segun la que el usuario prefiera).
	#resources = new Object({
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
	});

	// Ajustes comunes de una animacion CSS.
	animation = new Object({
		name: 'name',
		delay: 0,
		duration: 1500,
		iterationCount: 1,
		direction: 'normal',
		timingFunction: 'linear',
		fillMode: 'forwards'
	});

	// Configura si quieres que la animacion se ejecute cuando el elemento este visible en el viewport.
	observeViewport = new Object({
		enabled: false,
		infinite: false // Indica si solo se ejecuta una vez o cada vez que entre y salga del viewport.
	});

	/**
	 * El constructor puede retornar un objeto CosmicAnimation o un arreglo de objetos CosmicAnimacion.
	 * 
	 * @param {string|string[]} selector
	 * @param {string|string[]} name
	 * @return {CosmicAnimation|CosmicAnimation[]}
	 */
	constructor(selector = null, name = ("cosmic-animation-"+Math.round(Math.random()*300))){
		// Verifica que el selector recibido sea algo.
		if(selector === null || selector === undefined || selector === NaN){
			this.#error('The selector ('+selector+') is not valid.');
		// Verifica si se trata de un arreglo.

		}else if(/^[0-9]$/.test(selector) || typeof selector === "number"){
			this.#error('The selector ('+selector+') is not valid.');
		}else if(Array.isArray(selector)){

			// Se crea un arrglo para almacenar los objetos CosmicAnimation.
			var arrCosmicsElements = new Array();

			// Verificamos si recibimos un arreglo con los nombres[] de animacion para cada selector[].
			if(Array.isArray(name)){
				for(let i in selector){
					// Se extrae el nombre de animacion.
					let nameTemporary = name[i];

					if(nameTemporary !== null && nameTemporary !== undefined){
						// Se relaciona el primer nombre con el primer nombre de animacion.
						arrCosmicsElements.push(new CosmicAnimation(selector[i], name[i]));
					}else{
						arrCosmicsElements.push(new CosmicAnimation(selector[i]));
					}
				}
			}else{
				for(let i in selector) arrCosmicsElements.push(new CosmicAnimation(selector[i]));
			}

			// Retorna un arreglo de objetos CosmicAnimation.
			return arrCosmicsElements;
		// Si el objeto pasado como argumento no fue un arreglo, entonces es un selector.
		}else{
			// Se comprueba que el selector pasado por argumento exista dentro del DOM.
			try{
				let element = document.querySelector(selector);

				// Creamos el objeto CosmicAnimation.

				if(element !== null && element !== undefined){
					this.target = element;
					this.animation.name = name;
				}else{
					this.#warning("The selector (" + selector + ") not exists in DOM.");
				}
			}catch(error){
				this.#error(`Error when extracting the selector (${selector})`);
			}
		}
	}

	/**
	 * Para mandar mensajes de errores internos.
	 * 
	 * @param {string}
	 * @return {void}
	 * 
	 * Recibe multiples parametros.
	*/
	#error(){
		if(arguments.length > 1){
			for(let arg of arguments) this.#error(arg);
		}else{
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
	}

	// Mensaje de advertencia, es lo mismo que el anterior.
	#warning(){
		if(arguments.length > 1){
			for(let arg of arguments) this.#warning(arg);
		}else{
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
	}

	/**
	 * Este metodo interno es quien separa por partes la animacion.
	 * 
	 * Solo para propiedades normales, (no transformaciones CSS, ya que esas requiere llamarse): 
	 * 	--- opacity: 5; - Propiedad normal.
	 * 	--- transform: scale(1); - Propiedad de transformacion.
	 * 
	 * @param {string} part Puede ser (string === "inicio - fin"). O puede ser ("3/5").
	 */
	#addResources(part = null, start = 0, end = 0){
		if(Array.isArray(part)){
			part.forEach(partElement => this.#addResources(partElement, start));
			return 0;
		}

		if(typeof part === "string"){
			if(part.includes("/9")){
				this.#resources.type = "nine";
				switch(part){
					case "1/9": this.#resources.partsNine.part1.push(start); break;
					case "2/9": this.#resources.partsNine.part2.push(start); break;
					case "3/9": this.#resources.partsNine.part3.push(start); break;
					case "4/9": this.#resources.partsNine.part4.push(start); break;
					case "5/9": this.#resources.partsNine.part5.push(start); break;
					case "6/9": this.#resources.partsNine.part6.push(start); break;
					case "7/9": this.#resources.partsNine.part7.push(start); break;
					case "8/9": this.#resources.partsNine.part8.push(start); break;
					case "9/9": this.#resources.partsNine.part9.push(start); break;
					default: break;
				}
				return false;
			}else if(part.includes("/3")){
				this.#resources.type = "three";
				switch(part){
					case "1/3": this.#resources.partsThree.part1.push(start); break;
					case "2/3": this.#resources.partsThree.part2.push(start); break;
					case "3/3": this.#resources.partsThree.part3.push(start); break;
					default: break;
				}
				return false;
			}
		}

		this.#resources.type = "default";
		switch(part){
			case "1/5": this.#resources.parts.part1.push(start); break;
			case "2/5": this.#resources.parts.part2.push(start); break;
			case "3/5": this.#resources.parts.part3.push(start); break;
			case "4/5": this.#resources.parts.part4.push(start); break;
			case "5/5": this.#resources.parts.part5.push(start); break;
			default: this.#resources.parts.part1.push(start); this.#resources.parts.part5.push(end); break;
		}
	}

	/**
	 * Este metodo interno separa las animaciones por partes, (como el anterior).
	 * 
	 * Solo para propiedades de transformacion, (no normales, ya que esas no requieren llamarse): 
	 * 	--- opacity: 5; - Propiedad normal.
	 * 	--- transform: scale(1); - Propiedad de transformacion.
	 */
	#addResourcesTransform(part = null, start = 0, end = 0){
		if(Array.isArray(part)){
			part.forEach(partElement => {
				this.#addResourcesTransform(partElement, start);
			});
			return false;
		}

		if(typeof part === "string"){
			if(part.includes("/9")){
				this.#resources.type = "nine";
				switch(part){
					case "1/9": this.#resources.partsNineTransform.part1.push(start); break;
					case "2/9": this.#resources.partsNineTransform.part2.push(start); break;
					case "3/9": this.#resources.partsNineTransform.part3.push(start); break;
					case "4/9": this.#resources.partsNineTransform.part4.push(start); break;
					case "5/9": this.#resources.partsNineTransform.part5.push(start); break;
					case "6/9": this.#resources.partsNineTransform.part6.push(start); break;
					case "7/9": this.#resources.partsNineTransform.part7.push(start); break;
					case "8/9": this.#resources.partsNineTransform.part8.push(start); break;
					case "9/9": this.#resources.partsNineTransform.part9.push(start); break;
					default: break;
				}
				return false;
			}else if(part.includes("/3")){
				this.#resources.type = "three";
				switch(part){
					case "1/3": this.#resources.partsThreeTransform.part1.push(start); break;
					case "2/3": this.#resources.partsThreeTransform.part2.push(start); break;
					case "3/3": this.#resources.partsThreeTransform.part3.push(start); break;
					default: break;
				}
				return false;
			}
		}

		this.#resources.type = "default";
		switch(part){
			case "1/5": this.#resources.partsTransform.part1.push(start); break;
			case "2/5": this.#resources.partsTransform.part2.push(start); break;
			case "3/5": this.#resources.partsTransform.part3.push(start); break;
			case "4/5": this.#resources.partsTransform.part4.push(start); break;
			case "5/5": this.#resources.partsTransform.part5.push(start); break;
			default: this.#resources.partsTransform.part1.push(start); this.#resources.partsTransform.part5.push(end); break;
		}
	}

	// Transformaciones.
	// Como puedes observar las propiedades de transformacion se almacenan en otro lugar.

	scale(start = 1, end = 1){
		this.#addResourcesTransform(end, ('scale('+start+')'), ('scale('+end+')'));
		return this;
	}

	translateY(start = 0, end = 0){
		this.#addResourcesTransform(end, ('translateY('+start+'px)'), ('translateY('+end+'px)'));
		return this;
	}

	translateX(start = 0, end = 0){
		this.#addResourcesTransform(end, ('translateX('+start+'px)'), ('translateX('+end+'px)'));
		return this;
	}

	rotate(start = 0, end = 0){
		this.#addResourcesTransform(end, ('rotate('+start+'deg)'), ('rotate('+end+'deg)'));
		return this;
	}

	// Propiedades.
	// Las propiedades normales se almacenan por separado de las transformaciones.

	opacity(start = 1, end = 1){
		this.#addResources(end, ('opacity: '+start+';'), ('opacity: '+end+';'));
		return this;
	}

	bgColor(start = "red", end = "red"){
		this.#addResources(end, ('background-color: '+start+';'), ('background-color: '+end+';'));
		return this;
	}

	color(start = "black", end = "black"){
		this.#addResources(end, ('color: '+start+';'), ('color: '+end+';'));
		return this;
	}

	width(start = 300, end = 300){
		this.#addResources(end, ('width: '+start+'px;'), ('width: '+end+'px;'));
		return this;
	}

	height(start = 300, end = 300){
		this.#addResources(end, ('height: '+start+'px;'), ('height: '+end+'px;'));
		return this;
	}

	padding(start = 300, end = 300){
		this.#addResources(end, ('padding: '+start+'px;'), ('padding: '+end+'px;'));
		return this;
	}

	margin(start = 300, end = 300){
		this.#addResources(end, ('margin: '+start+'px;'), ('margin: '+end+'px;'));
		return this;
	}

	addProperty(cssStart = "", cssEnd = ""){
		this.#addResources(cssEnd, cssStart, cssEnd);
		return this;
	}

	// Metodo interno utilizado solo para la animacion letra por letra, debe complementarse, por eso es privado.
	#lettersToElements = function(spaceInLetters){
		let letters = this.target.textContent.split("");

		this.target.innerHTML = ("");

		letters.forEach(letter => {
			if(letter === " " || letter === "\n" || letter === "\t"){
				this.target.innerHTML += (`
					<span style="display: inline-block; margin: 0 ${spaceInLetters}px;"></span>
				`).trim();
			}else{
				this.target.innerHTML += (`
					<span style="display: inline-block;">${letter}</span>
				`).trim();
			}
		});
	};

	/**
	 * Metodos con animaciones establecidas por defecto.
	 * 
	 * @param {string} mode 
	 * @param {number} duration 
	 * @param {number} delay 
	 * @returns {CosmicAnimation}
	 */
	fromWindowTo(mode = "right", duration = 2000, delay = 0){
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in-out';
		this.opacity(0, 1);
		this.opacity(0.3, '2/5');
		this.opacity(0.5, '3/5');
		this.opacity(0.7, '4/5');
		if(mode === "top"){
			this.translateY(window.innerWidth, 0); // + y 0
		}else if(mode === "right"){
			this.translateX(-window.innerWidth, 0); // - y 0
		}else if(mode === "bottom"){
			this.translateY(-window.innerWidth, 0); // - y 0
		}else{
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
	fadeOutLettersTo(mode = "top", spaceInLetters = 6, time = 100){
		this.#lettersToElements(spaceInLetters);

		let index = 0, 
			childs = this.target.children, 
			allId = new Array();

		let interval = setInterval(() => {
			if(childs[index] !== undefined){
				let randomId = undefined;

				while(true){
					let exists = false;
					randomId = Math.round(Math.random()*1000);

					allId.forEach(id => {
						if(id === randomId) exists = true;
					});

					if(!exists) break;
				}

				allId.push(randomId);

				childs[index].setAttribute("id", ("id"+allId[allId.length - 1]));
				let ani = new CosmicAnimation(`#id${allId[allId.length - 1]}`);

				if(mode === "top") ani.fadeOutTo("top");
				else if(mode === "right") ani.fadeOutTo("right");
				else if(mode === "bottom") ani.fadeOutTo("bottom");
				else ani.fadeOutTo("left");
				ani.execute();
				index++;
			}else{
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
	fadeOutLetters(spaceInLetters = 6, time = 100){
		this.#lettersToElements(spaceInLetters);

		let index = 0, 
			childs = this.target.children, 
			allId = new Array();

		let interval = setInterval(() => {
			if(childs[index] !== undefined){
				let randomId = undefined;

				while(true){
					let exists = false;
					randomId = Math.round(Math.random()*1000);

					allId.forEach(id => {
						if(id === randomId) exists = true;
					});

					if(!exists) break;
				}

				allId.push(randomId);

				childs[index].setAttribute("id", ("id"+allId[allId.length - 1]));
				let ani = new CosmicAnimation(`#id${allId[allId.length - 1]}`);
				ani.fadeOut();
				ani.execute();
				index++;
			}else{
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
	fadeOutLettersRandom(spaceInLetters = 6, time = 100){
		this.#lettersToElements(spaceInLetters);

		let index = 0, 
			childs = this.target.children, 
			allId = new Array(), 
			modes = new Array("top", "right", "bottom", "left", "center");

		let interval = setInterval(() => {
			if(childs[index] !== undefined){
				let randomId = undefined, 
					mode = modes[Math.floor(Math.random()*modes.length)];

				while(true){
					let exists = false;
					randomId = Math.round(Math.random()*1000);

					allId.forEach(id => {
						if(id === randomId) exists = true;
					});

					if(!exists) break;
				}

				allId.push(randomId);

				childs[index].setAttribute("id", ("id"+allId[allId.length - 1]));
				let ani = new CosmicAnimation(`#id${allId[allId.length - 1]}`);

				if(mode === "top") ani.fadeOutTo("top");
				else if(mode === "right") ani.fadeOutTo("right");
				else if(mode === "bottom") ani.fadeOutTo("bottom");
				else if(mode === "left") ani.fadeOutTo("left");
				else ani.fadeOut();
				ani.execute();
				index++;
			}else{
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
	appear(duration = 1300, delay = 0){
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
	appearTo(mode = 'bottom', duration = 1300, delay = 0){
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in-out';
		this.opacity(0, '1/5');
		this.opacity(0.1, '2/5');
		this.opacity(0.2, '3/5');
		this.opacity(0.3, '4/5');
		this.opacity(1, '5/5');
		if(mode === 'top') this.translateY(300, 0);
		else if(mode === 'bottom') this.translateY(-300, 0);
		else if(mode === 'right') this.translateX(-300, 0);
		else if(mode === 'left') this.translateX(300, 0);
		else this.translateY(300, 0);
		return this;
	}

	/**
	 * 
	 * @param {number} duration 
	 * @param {number} delay 
	 * @returns {CosmicAnimation}
	 */
	fadeOut(duration = 1300, delay = 0){
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
	fadeOutTo(mode = 'bottom', duration = 1300, delay = 0){
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in';
		this.opacity(1, '1/5');
		this.opacity(0.3, '2/5');
		this.opacity(0.2, '3/5');
		this.opacity(0.1, '4/5');
		this.opacity(0, '5/5');
		if(mode === 'top') this.translateY(0, -300);
		else if(mode === 'bottom') this.translateY(0, 300);
		else if(mode === 'right') this.translateX(0, 300);
		else if(mode === 'left') this.translateX(0, -300);
		else this.translateY(0, -300);
		return this;
	}

	/**
	 * 
	 * @param {number} duration 
	 * @param {number} delay 
	 * @returns {CosmicAnimation}
	 */
	appearAndFadeOut(duration = 1300, delay = 0){
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
	increment(duration = 2000, delay = 0){
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
	incrementPulse(duration = 2000, delay = 0){
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
	circleTo(mode = 'bottom', duration = 2500, delay = 3000){
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.target.style.visibility = "hidden";
		this.addProperty('visibility: visible;', 'visibility: visible;');
		if(mode === 'bottom'){
			this.translateY(-window.innerHeight, '1/5');
			this.translateY((-window.innerHeight / 2), '2/5');
			this.translateY((-window.innerHeight / 3), '3/5');
		}else{
			this.translateY(window.innerHeight, '1/5');
			this.translateY((window.innerHeight / 2), '2/5');
			this.translateY((window.innerHeight / 3), '3/5');
		}		
		this.translateY(0, ['4/5', '5/5']);
		this.opacity(0, 1);
		this.addProperty('border-radius: 100%;', 'border-radius: 0;')
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
	pulse(duration = 1000, delay = 0){
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
	palpite(duration = 3000, delay = 0){
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
	deleteAnimation(){
		const style = document.getElementsByTagName('style')[0];

		// las animaciones de este elemento inyectadas dentro del primer archivo de estilos que habia.
		if(style !== undefined && style !== null){
			const partOne = style.innerHTML.slice(
				0, style.innerHTML.indexOf("."+this.animation.name)
			);
			const partTwo = style.innerHTML.slice(
				(style.innerHTML.indexOf(`/* end: ${this.animation.name} */`) + `/* end: ${this.animation.name} */`.length), 
				style.innerHTML.length
			);
			style.innerHTML = (partOne + partTwo);
		}

		this.target.classList = "";
		this.animation.name = ("cosmic-animation-"+Math.round(Math.random()*300));
		this.#resources = new Object({
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
	terminate(callback = function(){}){
		let time = (this.animation.delay + this.animation.duration);

		// Verifica que la animacion no sea infinita.
		if(!Number.isFinite(this.animation.iterationCount)) this.animation.iterationCount = "infinite";

		// Suma las el tiempo segun el numero de iteraciones de la animacion.
		if(Number.isInteger(this.animation.iterationCount)){
			time = (time * this.animation.iterationCount);
		}else{
			if(Number(this.animation.iterationCount) !== NaN){
				time = (time * this.animation.iterationCount);
			}
		}

		if(time !== "infinite" && time !== NaN && Number.isInteger(time)){
			setTimeout(() => callback(), time);
		}
	}

	// Algunas validaciones.
	#validate(){
		if(!Number.isFinite(this.animation.iterationCount)) this.animation.iterationCount = 'infinite';
		else if(!Number.isInteger(this.animation.iterationCount)) this.animation.iterationCount = 1;

		if(!Number.isFinite(this.animation.duration)) this.animation.duration = 1000;
		else if(!Number.isInteger(this.animation.duration)) this.animation.duration = 1000;

		if(!Number.isFinite(this.animation.delay)) this.animation.delay = 0;
		else if(!Number.isInteger(this.animation.delay)) this.animation.iterationCount = 0;

		return true;
	}

	// Ejecuta las animaciones.
	execute(){
		// Crea un archivo (style).
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');

		// Lo inyecta al DOM.
		if(document.getElementsByTagName('style')[0] !== undefined){
			style = document.getElementsByTagName('style')[0];
		}

		const empty = resource => {
			if(resource.length > 0) return (`transform: ${resource.join(' ')};`);
			else return ("");
		};

		const isUndefined = resource => {
			if(resource === null || resource === undefined) return '';
			else return resource;
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
		if(this.#resources.type === "default"){
			// Itera cinco veces.
			for(let i in keys){
				// Extrae las propiedades, (normales) y (transformaciones).
				let valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsTransform, keys[i]);
				let valueNormal = Object.getOwnPropertyDescriptor(this.#resources.parts, keys[i]);
				valueTransform = valueTransform.value;
				valueNormal = valueNormal.value;

				/* Si el elemento tiene una animacion, entonces el objeto (parts) agrega la animacion: 
					--- (Numbers), etapa de la animacion en la iteracion.
					--- (Keys), la clave de la animacion.
						--- (Styles), los estilos de la animacion.. */
				if(empty(valueTransform) !== "" || (valueNormal.length > 0)){

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
		}else if(this.#resources.type === "nine"){
			// Itera nueve veces.
			for(let i in keysNine){
				// Extrae las propiedades, (normales) y (transformaciones).
				let valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsNineTransform, keysNine[i]);
				let valueNormal = Object.getOwnPropertyDescriptor(this.#resources.partsNine, keysNine[i]);
				valueTransform = valueTransform.value;
				valueNormal = valueNormal.value;

				// Hce el mismo proceso de arriba.
				if(empty(valueTransform) !== "" || (valueNormal.length > 0)){
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
		}else{
			// Si no fue (5/5 == normal), ni (9/9), entonces es (3/3), el proceso se repite.
			for(let i in keysThree){
				
				let valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsThreeTransform, keysThree[i]);
				let valueNormal = Object.getOwnPropertyDescriptor(this.#resources.partsThree, keysThree[i]);
				valueTransform = valueTransform.value;
				valueNormal = valueNormal.value;

				if(empty(valueTransform) !== "" || (valueNormal.length > 0)){
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

		this.#validate();

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
			if(this.#resources.type === "default"){
				array = keys.map(key => {
					let obj = isUndefined(Object.getOwnPropertyDescriptor(parts, key));
					if(obj.value) return obj.value;
				});
			// 9/9.
			}else if(this.#resources.type === "nine"){
				array = keysNine.map(key => {
					let obj = isUndefined(Object.getOwnPropertyDescriptor(parts, key));
					if(obj.value) return obj.value;
				});
			// 3/3.
			}else if(this.#resources.type === "three"){
				array = keysThree.map(key => {
					let obj = isUndefined(Object.getOwnPropertyDescriptor(parts, key));
					if(obj.value) return obj.value;
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
		if(this.observeViewport.enabled){
			// Lo aplica.
			const intersectingObserver = () => {
				const observeTarget = new IntersectionObserver(elements => {
					// Cuando el objeto es intersectado.
					if(elements[0].isIntersecting){
						// Aplica la animacion.
						this.target.classList.add(this.animation.name);
					}else{
						// Si configuraste (infinite), entonces la animacion se repite cada que el elemento abandona y entra de nuevo al viewport.
						if(this.observeViewport.infinite) this.target.classList.remove(this.animation.name);
					}
				});

				observeTarget.observe(this.target.parentElement);
			};

			// Ejecutamos.
			intersectingObserver();
		}else{
			// Sino, solo aplica la animacion y ya.
			this.target.classList.add(this.animation.name);
		}
	}
}

export default CosmicAnimation;