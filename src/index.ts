// Interfaces
import { CosmicAnimateResources, CosmicAnimateSettings, CosmicAnimateValidations, CosmicAnimateViewport, CosmicFadeOutSettings } from "./interfaces/animation";

/**
 * @class CosmicAnimation
 */
class CosmicAnimation{
	// Por defecto crea un elemento DIV.
	public target:HTMLElement = document.createElement('div');

	/**
	 * @private
	 */
	#assignDefaultValues():void{
		// @ts-ignore
		this.target.classList = "";
		this.animation.name = ("cosmic-animation-"+Math.round(Math.random()*300));
		this.#resources = {
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
		};
	}

	/**
	 * Aqui se manejan las etapas de la animacion, (segun la que el usuario prefiera).
	 * @private
	 */
	// @ts-ignore
	#resources:CosmicAnimateResources = {};

	/**
	 * @private
	 */
	#validations:CosmicAnimateValidations = {
		numeric: /^[0-9]$/, 
		empty: function(data:any):boolean{
			return (
				data === undefined || 
				data === null || 
				Number.isNaN(data) || 
				data === ""
			);
		}
	};

	/**
	 * Si el usuario desea reiniciar el elemento, tenemos un respaldo del contenido.
	 * @private
	 */
	#originalContent:string = ``;

	// Ajustes comunes de una animacion CSS.
	public animation:CosmicAnimateSettings = {
		name: 'name',
		delay: 0,
		duration: 1500,
		iterationCount: 1,
		direction: 'normal',
		timingFunction: 'linear',
		fillMode: 'forwards'
	};

	// Configura si quieres que la animacion se ejecute cuando el elemento este visible en el viewport.
	observeViewport:CosmicAnimateViewport = {
		enabled: false,
		infinite: false // Indica si solo se ejecuta una vez o cada vez que entre y salga del viewport.
	};

	#createAutomaticName():string{
		return ("cosmic-animation-"+Math.round(Math.random()*300));
	}

	/**
	 * El constructor puede retornar un objeto CosmicAnimation o un arreglo de objetos CosmicAnimacion.
	 * @author Brandon Anthony Olivares Amador
	 * @param {string|string[]} selector
	 * @param {string|string[]} name
	 * @return {CosmicAnimation|CosmicAnimation[]}
	 */
	constructor(selector?:string|string[], name?:string|string[]){
		this.#assignDefaultValues();

		if(!name) name = this.#createAutomaticName();

		if(this.#validations.empty(selector)){
			this.#error('The selector ('+selector+') is not valid.');

		// Primer Arreglo.
		}else if(Array.isArray(selector)){
			const arrCosmicsElements:CosmicAnimation[] = new Array();

			// Segundo Arreglo.
			if(Array.isArray(name)){
				// Verificamos si recibimos un arreglo con los nombres[] de animacion para cada selector[].
				for(let i in selector){
					// Selector y Animacion
					const selectorName:string = selector[i], 
						  animationName:string = name[i];

					if(!this.#validations.empty(selectorName) && !this.#validations.empty(animationName)){
						// Se relaciona cada Nombre con su Animacion.
						arrCosmicsElements.push(new CosmicAnimation(selectorName, animationName));
					}else{
						// Nombre de animacion automatica.
						arrCosmicsElements.push(new CosmicAnimation(animationName));
					}
				}
			// Solo fue el primer arreglo, (nombres de animacion automaticos).
			}else{
				for(let i in selector) arrCosmicsElements.push(new CosmicAnimation(selector[i]));
			}

			// @ts-ignore
			// Retorna un arreglo de objetos CosmicAnimation.
			return arrCosmicsElements;
		}else{
			const select = selector as string;

			// No tiene sentido tener un Selector y varios nombres de animacion.
			if(Array.isArray(name)) name = name[0];

			// Se comprueba que el selector pasado por argumento exista dentro del DOM.
			try{
				const element:HTMLElement|null = document.querySelector(select);

				if(!element){
					this.#warning("The selector (" + select + ") not exists in DOM.");

				// Creamos el objeto CosmicAnimation.
				}else{
					this.target = element;
					this.animation.name = name;
				}
			}catch(error){
				this.#error(`Error when extracting the selector (${selector})`);
			}
		}
	}

	/**
	 * Para mandar mensajes de errores internos.
	 * @author Brandon Anthony Olivares Amador
	 * @param {string[]} arguments
	 * @returns {void}
	*/
	#error(args?:string):void{
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
	#warning(args?:string):void{
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
	#addResources(start:string, end:string, parts:string|string[]|number, isTransform?:boolean){
		/**
		 * Si lo final es un numero, significa que hemos recibido: 
		 * 		@example funcion(start, parts)
		 * 		@example funcion(1, 1)
		 * Y esto por defecto hace que (start) y (end) posean las 
		 * propiedades declaradas a guardar en el arreglo por defecto.
		 */
		if(typeof parts === "number"){
			if(isTransform){
				this.#resources.partsTransform.part1.push(start);
				this.#resources.partsTransform.part5.push(end);
			}else{
				this.#resources.parts.part1.push(start);
				this.#resources.parts.part5.push(end);
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
		if(typeof parts === "string"){
			let firstNumber:string = parts.split("/")[0], // 1
				partName:string = `part${firstNumber}`; // part1, part2, part3, ...
		
			if(parts.includes("/9")){
				this.#resources.type = "nine";

				if(isTransform){
					// @ts-ignore
					if(Array.isArray(this.#resources.partsNineTransform[partName])){
						// @ts-ignore
						this.#resources.partsNineTransform[partName].push(start);
					}
				}else{
					// @ts-ignore
					if(Array.isArray(this.#resources.partsNine[partName])){
						// @ts-ignore
						this.#resources.partsNine[partName].push(start);
					}
				}
				return;
			}else if(parts.includes("/3")){
				this.#resources.type = "three";

				if(isTransform){
					// @ts-ignore
					if(Array.isArray(this.#resources.partsThreeTransform[partName])){
						// @ts-ignore
						this.#resources.partsThreeTransform[partName].push(start);
					}
				}else{
					// @ts-ignore
					if(Array.isArray(this.#resources.partsThree[partName])){
						// @ts-ignore
						this.#resources.partsThree[partName].push(start);
					}
				}
				return;
			}else if(parts.includes("/5")){
				// Indicar que es por defecto.
				this.#resources.type = "default";

				if(isTransform){
					// @ts-ignore
					if(Array.isArray(this.#resources.partsTransform[partName])){
						// @ts-ignore
						this.#resources.partsTransform[partName].push(start);
					}
				}else{
					// @ts-ignore
					if(Array.isArray(this.#resources.parts[partName])){
						// @ts-ignore
						this.#resources.parts[partName].push(start);
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
		if(Array.isArray(parts)){
			for(let part of parts){

				if(typeof part !== "string"){
					this.#error(`Data {${part}} is not accepted in {string[]}`);
					return;
				}

				this.#addResources(start, "", part, isTransform);
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
	public scale(start:number = 1, end:string|string[]|number = 1):CosmicAnimation{
		this.#addResources(`scale(${start})`, `scale(${end})`, end, true);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example translateY(0.5, 1)
	 * @example translateY(0.5, '1/5')
	 * @example translateY(0.5, ['1/3', '2/3'])
	 */
	public translateY(start:number = 0, end:string|string[]|number = 0):CosmicAnimation{
		this.#addResources(('translateY('+start+'px)'), ('translateY('+end+'px)'), end, true);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example translateX(0.5, 1)
	 * @example translateX(0.5, '1/5')
	 * @example translateX(0.5, ['1/3', '2/3'])
	 */
	public translateX(start:number = 0, end:string|string[]|number = 0):CosmicAnimation{
		this.#addResources(('translateX('+start+'px)'), ('translateX('+end+'px)'), end, true);
		return this;
	}
	
	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example rotate(0.5, 1)
	 * @example rotate(0.5, '1/5')
	 * @example rotate(0.5, ['1/3', '2/3'])
	 */
	public rotate(start:number = 0, end:string|string[]|number = 0):CosmicAnimation{
		this.#addResources(('rotate('+start+'deg)'), ('rotate('+end+'deg)'), end, true);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example opacity(0.5, 1)
	 * @example opacity(0.5, '1/5')
	 * @example opacity(0.5, ['1/3', '2/3'])
	 */
	public opacity(start:number = 0, end:string|string[]|number = 1):CosmicAnimation{
		this.#addResources(('opacity: '+start+';'), ('opacity: '+end+';'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example bgColor("blue", "red")
	 * @example bgColor("blue", '1/5')
	 * @example bgColor("blue", ['1/3', '2/3'])
	 */
	public bgColor(start:string = "red", end:string = "red"):CosmicAnimation{
		this.#addResources(('background-color: '+start+';'), ('background-color: '+end+';'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example color("blue", "red")
	 * @example color("blue", '1/5')
	 * @example color("blue", ['1/3', '2/3'])
	 */
	public color(start:string = "black", end:string = "black"):CosmicAnimation{
		this.#addResources(('color: '+start+';'), ('color: '+end+';'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example width(300, 700)
	 * @example width(300, '1/5')
	 * @example width(300, ['1/3', '2/3'])
	 */
	public width(start:number = 300, end:number = 300):CosmicAnimation{
		this.#addResources(('width: '+start+'px;'), ('width: '+end+'px;'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example height(300, 700)
	 * @example height(300, '1/5')
	 * @example height(300, ['1/3', '2/3'])
	 */
	public height(start:number = 300, end:number = 300):CosmicAnimation{
		this.#addResources(('height: '+start+'px;'), ('height: '+end+'px;'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example padding(10, 6)
	 * @example padding(10, '1/5')
	 * @example padding(10, ['1/3', '2/3'])
	 */
	public padding(start:number = 300, end:number = 300):CosmicAnimation{
		this.#addResources(('padding: '+start+'px;'), ('padding: '+end+'px;'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example margin(10, 6)
	 * @example margin(10, '1/5')
	 * @example margin(10, ['1/3', '2/3'])
	 */
	public margin(start:number = 300, end:number = 300):CosmicAnimation{
		this.#addResources(('margin: '+start+'px;'), ('margin: '+end+'px;'), end);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 * @example addProperty("border: 2px solid #000;", "border: 6px solid blue;")
	 * @example addProperty("border: 2px solid #000;", '1/5')
	 * @example addProperty("border: 2px solid #000;", ["2/5", "3/5", "4/5"])
	 */
	public addProperty(cssStart:string = "", cssEnd:string = ""):CosmicAnimation{
		this.#addResources(cssStart, cssEnd, cssEnd);
		return this;
	}

	/**
	 * Metodo interno utilizado solo para la animacion letra por letra, debe complementarse, por eso es privado.
	 * (appear) Inyecta opacity cuando el texto debe aparecer.
	 * @author Brandon Anthony Olivares Amador
	 * @private
	 */
	#lettersToElements(spaceInLetters:number, appear:boolean = false):void{
		// Respaldo.
		this.#originalContent = this.target.innerHTML;

		if(this.target.textContent){
			// Obtenermos el texto del elemento, convertido en array.
			let letters:string[] = this.target.textContent.split("");

			// Limpiar HTML y texto del elemento.
			this.target.innerHTML = "";

			// Iterar letra por letra.
			letters.forEach((letter:string) => {
				// Los espacios son reemplazados por un margen (X) con el valor (spaceInLetters).
				// Las demas letras son inyectadas en otro <span>, esto se hace para poder animar cada <span>
				if(letter === " " || letter === "\n" || letter === "\t"){
					this.target.innerHTML += (`
						<span style="
							${ appear ? 'opacity: 0;' : '' }
							display: inline-block;
							margin: 0 ${spaceInLetters}px;
						"></span>
					`).trim();
				}else{
					this.target.innerHTML += (`
						<span style="
							${ appear ? 'opacity: 0;' : '' }
							display: inline-block;
						">${letter}</span>
					`).trim();
				}
			});
		}
	};

	/**
	 * Desaperece o Aparece el texto del elemento letra por letra, puede recibir una 
	 * direccion especifica o solo desaparecer.
	 * @author Brandon Anthony Olivares Amador
	 * @param {CosmicFadeOutSettings} param0
	 * @private
	 */
	#fadeOut({ mode, spaceInLetters, time, random, appear }:CosmicFadeOutSettings):void{
		// Transformar contenido del elemento en <span> con cada letra para animar cada letra de manera individual.
		this.#lettersToElements(spaceInLetters, appear);

		let index = 0, 
			// Obtener los <span> inyectados.
			childs:HTMLCollection = this.target.children, 
			// Almacena los "ids" automaticas para cada <span>
			ids:number[] = new Array(), 
			// Utilizado para asignar un (mode) automatico, (si es random)
			randomModes:string[] = new Array("top", "right", "bottom", "left", "center");

		const createAutomaticRandIds:Function = ():void => {
			const randomId:number = Math.round(Math.random()*1000);

			if(ids.indexOf(randomId) === -1) ids.push(randomId);
			else createAutomaticRandIds();
		};

		for(let i = 0; i < childs.length; i++) createAutomaticRandIds();

		// Iterar <span> inyectados.
		const interval:number = setInterval(() => {
			const span = childs[index] as HTMLSpanElement, 
				  randomId:string = `id${ids[index]}`;

			span.setAttribute("id", randomId);

			// Si no hay direccion, sino que es cada una a lo random.
			if(random){
				let randomMode:string = randomModes[
					Math.floor(Math.random()*randomModes.length)
				];

				if(appear) new CosmicAnimation("#" + randomId).appearTo(randomMode).execute();
				else new CosmicAnimation("#" + randomId).fadeOutTo(randomMode).execute();
			// Si hay una direccion, desaparece hacia una direccion.
			}else if(mode){
				if(appear) new CosmicAnimation("#" + randomId).appearTo(mode).execute();
				else new CosmicAnimation("#" + randomId).fadeOutTo(mode).execute();

			// Sino, solo desaparece.
			}else{
				if(appear) new CosmicAnimation("#" + randomId).appear().execute();
				else new CosmicAnimation("#" + randomId).fadeOut().execute();
			}

			index++;

			// Detenemos el intervalo cuando ya hayamos recorrido todos los <span>
			if(index >= childs.length) clearInterval(interval);
		}, time);
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public fromWindowShowTo(mode:string = "right", duration:number = 2000, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in-out';
		this.opacity(0, 1).opacity(0.3, '2/5').opacity(0.5, '3/5').opacity(0.7, '4/5');

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
	 * Desaperece el texto del elemento letra por letra.
	 * @author Brandon Anthony Olivares Amador
	 */
	public fadeOutLetters(spaceInLetters:number = 6, time:number = 100):CosmicAnimation{
		this.#fadeOut({
			spaceInLetters, 
			time
		});
		return this;
	}

	/**
	 * Desaperece el texto del elemento letra por letra.
	 * @author Brandon Anthony Olivares Amador
	 */
	public appearLetters(spaceInLetters:number = 6, time:number = 100):CosmicAnimation{
		this.#fadeOut({
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
	public fadeOutLettersTo(mode:string = "top", spaceInLetters:number = 6, time:number = 100):CosmicAnimation{
		this.#fadeOut({
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
	public appearLettersTo(mode:string = "top", spaceInLetters:number = 6, time:number = 100):CosmicAnimation{
		this.#fadeOut({
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
	public fadeOutLettersRandom(spaceInLetters:number = 6, time:number = 100):CosmicAnimation{
		this.#fadeOut({
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
	public appearLettersRandom(spaceInLetters:number = 6, time:number = 100):CosmicAnimation{
		this.#fadeOut({
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
	public appear(duration:number = 1300, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out';
		this.opacity(0, 1);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public appearTo(direction = 'bottom', duration = 1300, delay = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in-out';
		this.opacity(0, '1/5').opacity(0.1, '2/5').opacity(0.2, '3/5')
			.opacity(0.3, '4/5').opacity(1, '5/5');
		
		// De acuerdo a la direccion, se crea la animacion.
		if(direction === 'top') this.translateY(300, 0);
		else if(direction === 'bottom') this.translateY(-300, 0);
		else if(direction === 'right') this.translateX(-300, 0);
		else if(direction === 'left') this.translateX(300, 0);
		else this.translateY(300, 0);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public fadeOut(duration:number = 1300, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out';
		this.opacity(1, 0);
		return this;
	}

	public fadeIn(duration:number = 1300, delay:number = 0):CosmicAnimation{
		return this.appear(duration, delay);
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public fadeOutTo(direction:string = 'bottom', duration:number = 1300, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in';
		this.opacity(1, '1/5').opacity(0.3, '2/5').opacity(0.2, '3/5')
			.opacity(0.1, '4/5').opacity(0, '5/5');

		// De acuerdo a la direccion, se crea la animacion.
		if(direction === 'top') this.translateY(0, -300);
		else if(direction === 'bottom') this.translateY(0, 300);
		else if(direction === 'right') this.translateX(0, 300);
		else if(direction === 'left') this.translateX(0, -300);
		else this.translateY(0, -300);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public appearAndFadeOut(duration:number = 1300, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out';
		this.translateY(120, "1/5").translateY(0, ["2/5", "3/5", "4/5"]).translateY(120, "5/5")
			.opacity(0, "1/5").opacity(1, ["2/5", "3/5", "4/5"]).opacity(0, "5/5");
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public increment(duration:number = 2000, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out-in';
		this.scale(0, 1).opacity(0, 1);
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public incrementPulse(duration:number = 2000, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.scale(0, '1/5').scale(1, ['2/5', '3/5']).scale(1.2, '4/5').scale(1, '5/5')
			.opacity(0, '1/5').opacity(0.5, '2/5').opacity(1, '3/5');
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public circleTo(direction:string = 'bottom', duration:number = 2500, delay:number = 3000):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.target.style.visibility = "hidden";
		this.addProperty('visibility: visible;', 'visibility: visible;');
		if(direction === 'bottom'){
			this.translateY(-window.innerHeight, '1/5')
				.translateY((-window.innerHeight / 2), '2/5')
				.translateY((-window.innerHeight / 3), '3/5');
		}else{
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
	 */
	public pulse(duration:number = 1000, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.scale(1, 1).scale(1.1, ['2/5', '4/5']).scale(1.3, '3/5');
		return this;
	}

	/**
	 * @author Brandon Anthony Olivares Amador
	 */
	public palpite(duration:number = 3000, delay:number = 0):CosmicAnimation{
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.scale(0.8, ['1/5', '3/5', '5/5'])
			.scale(1.1, ['2/5', '4/5']);
		return this;
	}

	/**
	 * ¿Ya liste animaciones a tu objeto CosmicAnimation?
	 * Puedes limpiar todas las animaciones con este metodo.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 */
	public reset(restartContent:boolean = true):CosmicAnimation{
		const style:HTMLStyleElement = document.getElementsByTagName('style')[0];

		// las animaciones de este elemento inyectadas dentro del primer archivo de estilos que habia.
		if(style){
			const comment:string = `/* end: ${this.animation.name} */`, 
				  animationName:string = `.${this.animation.name}`;

			// Desde todo, hasta donde inicia el nombre de la animacion.
			const partOne = style.innerHTML.slice(
				0, style.innerHTML.indexOf(animationName)
			);

			// Desde donde termina el comentario de esta animacion, hasta el final.
			const partTwo = style.innerHTML.slice(
				(style.innerHTML.indexOf(comment) + comment.length), 
				style.innerHTML.length
			);

			// Lo de en medio se fue, hasta INICIO, desde FINAL.
			style.innerHTML = (partOne + partTwo);
		}

		// Restauramos ajustes por defecto.
		this.#assignDefaultValues();

		if(restartContent){
			if(this.#originalContent) this.target.innerHTML = this.#originalContent;
		}

		return this;
	}

	/**
	 * Este metodo ejecuta acciones al finalizar la animacion.
	 * @author Brandon Anthony Olivares Amador
	 * @param {Function} callback
	 * @param {Function} callbackErr
	 */
	public ends(callback:Function, callbackErr?:Function):void{
		try{
			// Suma el tiempo de duracion y retraso.
			let time = (this.animation.delay + this.animation.duration);

			// Verifica que la animacion no sea infinita.
			const isFinite:boolean = (
				Number.isFinite(this.animation.iterationCount) && 
				String(this.animation.iterationCount) !== "infinite"
			);

			// Suma el tiempo segun la cantidad de iteraciones de la animacion.
			if(Number.isInteger(this.animation.iterationCount) && isFinite){
				time = (time * this.animation.iterationCount);
			}

			// El callback se ejecuta al finalizar la animacion.
			if(isFinite && typeof callback === "function"){
				setTimeout(() => callback(), time);
			}
		}catch(error){
			if(typeof callbackErr === "function") callbackErr(error);
		}
	}

	/**
	 * Este metodo ejecuta acciones al finalizar la animacion de manera asincrona.
	 * @author Brandon Anthony Olivares Amador
	 * @returns {Promise<boolean|any>}
	 */
	public asyncEnds():Promise<boolean|any>{
		return new Promise((resolve, reject) => {
			this.ends(
				() => resolve(true), 
				(error:any) => reject(error)
			);
		});
	}

	/**
	 * Validaciones para los ajustes de la animacion.
	 * @author Brandon Anthony Olivares Amador
	 * @private
	 */
	#validateAnimationSettings():void{
		// Las iteraciones deben ser un (numero entero), (pero puede ser Infinity)
		if(!Number.isInteger(this.animation.iterationCount) && typeof this.animation.iterationCount !== "number"){
			this.animation.iterationCount = 1;
		}

		// La duracion debe ser (finita) y debe ser un (numero entero).
		if(!Number.isFinite(this.animation.duration) || !Number.isInteger(this.animation.duration)){
			this.animation.duration = 1000;
		}

		// El delay debe ser (finita) y debe ser un (numero entero).
		if(!Number.isFinite(this.animation.delay) || !Number.isInteger(this.animation.delay)){
			this.animation.delay = 0;
		}
	}

	/**
	 * Ejecuta las animaciones.
	 * @returns {CosmicAnimation}
	 */
	public execute():CosmicAnimation{
		// Crea una etiqueta <style> para asignar la animacion.
		var style:HTMLStyleElement = document.createElement('style');
			style.setAttribute('type', 'text/css');

		// Si ya hay un style en nuestro DOM, pues tomamos ese.
		if(document.getElementsByTagName('style')[0] !== undefined){
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
		let partsThree:string[] = ['part1', 'part2', 'part3'];
		// La relacion en (%) de las partes.
		// Solo divide, (100% / 3) === (0%, 50%, 100%) === 3/3. Recuerda que el (0%) indica donde inicia la animacion.
		let percentageThree:string[] = ['0%', '50%', '100%'];

		let partsFive:string[] = ['part1', 'part2', 'part3', 'part4', 'part5'];
		let percentageFive:string[] = ['0%', '25%', '50%', '75%', '100%'];

		let partsNine:string[] = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7', 'part8', 'part9'];
		let percentageNine:string[] = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%', '100%'];

		const typeAnimation:string = this.#resources.type;

		// Extrae la cantidad de veces a iterar segun el tipo de animacion.
		const iterarion:number = (
			typeAnimation === "default" ? partsFive.length : (
				typeAnimation === "nine" ? partsNine.length : partsThree.length
			)
		) - 1;

		for(let i = 0; i <= iterarion; i++){
			let part:string, percentage:string;

			// Comprueba si el usuario utilizo una animacion (5/5).
			if(typeAnimation === "default"){
				part = partsFive[i], 
				percentage = percentageFive[i];
			// Comprueba si el usuario utilizo una animacion (9/9).
			}else if(typeAnimation === "nine"){
				part = partsNine[i], 
				percentage = percentageNine[i];
			// Si no fue (5/5 == normal), ni (9/9), entonces es (3/3), el proceso se repite.
			}else{
				part = partsThree[i], 
				percentage = percentageThree[i];
			}

			// Extrae las propiedades, (normales) y (transformaciones).
			let valueTransform:string[], valueNormal:string[];

			if(typeAnimation === "default"){
				valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsTransform, part)?.value;
				valueNormal = Object.getOwnPropertyDescriptor(this.#resources.parts, part)?.value;
			}else if(typeAnimation === "nine"){
				valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsNineTransform, part)?.value;
				valueNormal = Object.getOwnPropertyDescriptor(this.#resources.partsNine, part)?.value;
			}else{
				valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsThreeTransform, part)?.value;
				valueNormal = Object.getOwnPropertyDescriptor(this.#resources.partsThree, part)?.value;
			}

			// Verificamos que los (value) de las (part) de (resources) no se encuentren vacios.
			/**
			 * Las transformaciones solo requiren un (key), y tienen muchos (values).
			 * 		--- transform: translateY(-50rem) scale(1) skew(9deg) rotate(180deg);
			 * 
			 * Pero las propiedades normales solo son un (key) y un (value).
			 * 		--- opacity: 1; color: #000; font-size: 1.6rem;
			 */
			if(valueTransform.length > 0 || (valueNormal.length > 0)){
				// Agregregar parte de animacion. (%).
				Object.defineProperty(ANIMATION_PARTS, part, {
					value: (`
						${percentage}{
							${
								valueTransform.length > 0 ? (`
									transform: ${valueTransform.join(' ')};
								`) : ``
							}
							${
								valueNormal.length > 0 ? (`
									${valueNormal.join('')}
								`) : ""
							}
						}
					`),
					writable: true, 
					enumerable: true
				});
			}
		}

		this.#validateAnimationSettings();

		// Los porcentajes con las propiedades guardados en las keys (parts) de (ANIMATION_PARTS), luego se convierten a string.
		const getPercentages = () => {
			// @ts-ignore
			const partsValues:string[] = Object.values(ANIMATION_PARTS);

			// @ts-ignore
			window.ANIMATION_PARTS = ANIMATION_PARTS;

			return partsValues.join("");
		};

		console.log(this.animation)

		// En la hoja de estilos que inyectamos, ahora agregamos las configuraciones de nuestra animacion.
		style.innerHTML += (`
			.${this.animation.name}{
				animation-name: ${this.animation.name};
				animation-duration: ${this.animation.duration}ms;
				animation-delay: ${this.animation.delay}ms;
				animation-iteration-count: ${
					Number.isFinite(this.animation.iterationCount) ? this.animation.iterationCount : 'infinite'
				};
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
		if(this.observeViewport.enabled){
			// Lo aplica.
			const observeTarget = new IntersectionObserver(elements => {
				// Cuando el objeto es intersectado, aplica la animacion.
				if(elements[0].isIntersecting){
					this.target.classList.add(this.animation.name);
				// Si configuraste (infinite), entonces la animacion se repite cada que el elemento abandona y entra de nuevo al viewport.
				}else if(this.observeViewport.infinite){
					this.target.classList.remove(this.animation.name);
				}
			});

			if(this.target.parentElement){
				observeTarget.observe(this.target.parentElement);
			}
		}else{
			// Sino, solo aplica la animacion y ya.
			this.target.classList.add(this.animation.name);
		}
		return this;
	}
}

// @ts-ignore
window.CosmicAnimation = CosmicAnimation;