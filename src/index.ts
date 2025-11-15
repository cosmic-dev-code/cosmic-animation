// Interfaces
import { CosmicAnimateResources, CosmicAnimateSettings, CosmicAnimateValidations, CosmicAnimateViewport, CosmicFadeOutSettings } from "./interfaces/animation";

/**
 * @class CosmicAnimation
 */
class CosmicAnimation{
	// By default, it creates a DIV element.
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
	 * Here you can manage the stages of the animation (according to the user's preference).
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
	 * If the user wishes to reset the item, we have a backup of the content.
	 * @private
	 */
	#originalContent:string = ``;

	/**
	 * Common settings for a CSS animation.
	 */
	public animation:CosmicAnimateSettings = {
		name: 'name',
		delay: 0,
		duration: 1500,
		iterationCount: 1,
		direction: 'normal',
		timingFunction: 'linear',
		fillMode: 'forwards'
	};

	/**
	 * Configure whether you want the animation to run when the element is visible in the viewport.
	 */
	observeViewport:CosmicAnimateViewport = {
		enabled: false,
		infinite: false // Indica si solo se ejecuta una vez o cada vez que entre y salga del viewport.
	};

	#createAutomaticName():string{
		return ("cosmic-animation-"+Math.round(Math.random()*300));
	}

	/**
	 * The constructor can return a CosmicAnimation object or an array of CosmicAnimation objects.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string|string[]} selector - A CSS selector or an array of CSS selectors.
	 * @param {string|string[]} name - A name or an array of animation names.
	 * @return {CosmicAnimation|CosmicAnimation[]} A single CosmicAnimation object or an array of CosmicAnimation objects.
	 */
	constructor(selector?: string | string[], name?: string | string[]) {
		this.#assignDefaultValues();

		if (!name) name = this.#createAutomaticName();

		if (this.#validations.empty(selector)) {
			this.#error('The selector (' + selector + ') is not valid.');
		// First Array.
		} else if (Array.isArray(selector)) {
			const arrCosmicsElements: CosmicAnimation[] = new Array();

			// Second Array.
			if (Array.isArray(name)) {
				// Check if we received an array of animation names[] for each selector[].
				for (let i in selector) {
					// Selector and Animation
					const selectorName: string = selector[i],
						animationName: string = name[i];

					if (!this.#validations.empty(selectorName) && !this.#validations.empty(animationName)) {
						// Associate each Name with its Animation.
						arrCosmicsElements.push(new CosmicAnimation(selectorName, animationName));
					} else {
						// Automatic animation name.
						arrCosmicsElements.push(new CosmicAnimation(animationName));
					}
				}
			// Only the first array was provided (automatic animation names).
			} else {
				for (let i in selector) arrCosmicsElements.push(new CosmicAnimation(selector[i]));
			}

			// @ts-ignore
			// Returns an array of CosmicAnimation objects.
			return arrCosmicsElements;
		} else {
			const select = selector as string;

			// It doesn't make sense to have a selector and multiple animation names.
			if (Array.isArray(name)) name = name[0];

			// Check if the passed selector exists in the DOM.
			try {
				const element: HTMLElement | null = document.querySelector(select);

				if (!element) {
					this.#warning("The selector (" + select + ") does not exist in the DOM.");
				// Create the CosmicAnimation object.
				} else {
					this.target = element;
					this.animation.name = name;
				}
			} catch (error) {
				this.#error(`Error when extracting the selector (${selector})`);
			}
		}
	}

	/**
	 * For logging internal error messages.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string[]} args - The error messages to be logged.
	 * @returns {void} No return value.
	 */
	#error(args?: string): void {
		if (arguments.length > 1) {
			for (let arg of arguments) this.#error(arg);
		} else {
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

	/**
	 * For logging internal warning messages. This is similar to the error logging method.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string[]} args - The warning messages to be logged.
	 * @returns {void} No return value.
	 */
	#warning(args?: string): void {
		if (arguments.length > 1) {
			for (let arg of arguments) this.#warning(arg);
		} else {
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
	 * Function to save each property in the array of each part, such as:
	 *     --- Ninths, Fifths, or Thirds.
	 * (start) and (end) do not receive numbers but rather properties with numbers already included. For example:
	 *     @example addResources("height: 10px", "height: 100px")
	 *     @example addResources("height: 10px", "height: '1/3'", '1/3')
	 *     @example addResources("height: 10px", "height: '1/3','2/3'", ['1/3', '2/3'])
	 * Where (end) is not considered because (start) is assigned to '1/3' or assigned to ['1/3', '2/3'].
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string} start - The starting property to save.
	 * @param {string} end - The ending property to save.
	 * @param {string|string[]|number} parts - The parts to save, which can be a string, array of strings, or a number.
	 * @param {boolean} [isTransform] - An optional flag to indicate whether to apply a transformation.
	 * @returns {void} No return value.
	 */
	#addResources(start: string, end: string, parts: string | string[] | number, isTransform?: boolean): void {
		/**
		 * If `parts` is a number, it means we received:
		 *     @example function(start, parts)
		 *     @example function(1, 1)
		 * This by default means that (start) and (end) will have the properties declared to be saved in the default array.
		 */
		if (typeof parts === "number") {
			if (isTransform) {
				this.#resources.partsTransform.part1.push(start);
				this.#resources.partsTransform.part5.push(end);
			} else {
				this.#resources.parts.part1.push(start);
				this.#resources.parts.part5.push(end);
			}
			return;
		}

		/**
		 * If `parts` is a string, it means the user entered:
		 *     @example function(start, parts)
		 *     @example function(1, '1/3')
		 * This means (start) contains the property to be saved in the corresponding array according to `parts`. (end) is not needed.
		 */
		if (typeof parts === "string") {
			let firstNumber: string = parts.split("/")[0], // 1
				partName: string = `part${firstNumber}`; // part1, part2, part3, ...

			if (parts.includes("/9")) {
				this.#resources.type = "nine";

				if (isTransform) {
					// @ts-ignore
					if (Array.isArray(this.#resources.partsNineTransform[partName])) {
						// @ts-ignore
						this.#resources.partsNineTransform[partName].push(start);
					}
				} else {
					// @ts-ignore
					if (Array.isArray(this.#resources.partsNine[partName])) {
						// @ts-ignore
						this.#resources.partsNine[partName].push(start);
					}
				}
				return;
			} else if (parts.includes("/3")) {
				this.#resources.type = "three";

				if (isTransform) {
					// @ts-ignore
					if (Array.isArray(this.#resources.partsThreeTransform[partName])) {
						// @ts-ignore
						this.#resources.partsThreeTransform[partName].push(start);
					}
				} else {
					// @ts-ignore
					if (Array.isArray(this.#resources.partsThree[partName])) {
						// @ts-ignore
						this.#resources.partsThree[partName].push(start);
					}
				}
				return;
			} else if (parts.includes("/5")) {
				// Indicating that it is default.
				this.#resources.type = "default";

				if (isTransform) {
					// @ts-ignore
					if (Array.isArray(this.#resources.partsTransform[partName])) {
						// @ts-ignore
						this.#resources.partsTransform[partName].push(start);
					}
				} else {
					// @ts-ignore
					if (Array.isArray(this.#resources.parts[partName])) {
						// @ts-ignore
						this.#resources.parts[partName].push(start);
					}
				}
				return;
			}
		}

		/**
		 * If `parts` is an array, it means the user entered:
		 *     @example function(start, parts)
		 *     @example function(1, ['1/3', '3/3'])
		 * This means that (start) contains the property to be saved, and each element of the array is iterated to save the first value, (start), in each part.
		 */
		if (Array.isArray(parts)) {
			for (let part of parts) {

				if (typeof part !== "string") {
					this.#error(`Data {${part}} is not accepted in {string[]}`);
					return;
				}

				this.#addResources(start, "", part, isTransform);
			}
		}
	}

	// Transformations.
	// As you can see, transformation properties are stored elsewhere.

	/**
	 * Applies a scale transformation to the element or elements. The method can handle 
	 * different input types for the scaling factor, including numbers, strings, and arrays.
	 * This allows for flexible scaling based on the user's needs, such as scaling to a 
	 * specific fraction of the original size or applying different scaling factors to different parts.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example scale(0.5, 1) // Scales the element by 0.5 on the x-axis and 1 on the y-axis.
	 * @example scale(0.5, '1/5') // Scales the element by 0.5 on the x-axis and 1/5 on the y-axis.
	 * @example scale(0.5, ['1/3', '2/3']) // Scales the element by 0.5 on the x-axis and different values on the y-axis: 1/3 and 2/3.
	 * 
	 * @param {number} [start=1] - The starting scaling factor for the x-axis (default is 1).
	 * @param {string|string[]|number} [end=1] - The ending scaling factor for the y-axis. Can be a number, a string (e.g., '1/3'), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different scaling factors to different parts.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for chaining.
	 */
	public scale(start: number = 1, end: string | string[] | number = 1): CosmicAnimation {
		this.#addResources(`scale(${start})`, `scale(${end})`, end, true);
		return this;
	}

	/**
	 * Applies a vertical translation (along the Y-axis) transformation to the element or elements.
	 * Similar to the `scale` method, it allows for flexible inputs such as numbers, strings, or arrays
	 * for the translation values. This enables translating to a specific distance or applying different 
	 * translation values to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example translateY(0.5, 1) // Translates the element by 0.5px on the Y-axis and 1px on the Y-axis.
	 * @example translateY(0.5, '1/5') // Translates the element by 0.5px on the Y-axis and 1/5 on the Y-axis.
	 * @example translateY(0.5, ['1/3', '2/3']) // Translates the element by 0.5px on the Y-axis and different values on the Y-axis: 1/3px and 2/3px.
	 * 
	 * @param {number} [start=0] - The starting translation value for the Y-axis (default is 0px).
	 * @param {string|string[]|number} [end=0] - The ending translation value for the Y-axis. Can be a number, a string (e.g., '1/3'), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different translation values to different parts.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public translateY(start: number = 0, end: string | string[] | number = 0): CosmicAnimation {
		this.#addResources(('translateY(' + start + 'px)'), ('translateY(' + end + 'px)'), end, true);
		return this;
	}

	/**
	 * Applies a horizontal translation (along the X-axis) transformation to the element or elements.
	 * Like the `scale` and `translateY` methods, this function supports flexible input types for the
	 * translation values. This allows for translating to specific distances or applying different 
	 * translation values to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example translateX(0.5, 1) // Translates the element by 0.5px on the X-axis and 1px on the X-axis.
	 * @example translateX(0.5, '1/5') // Translates the element by 0.5px on the X-axis and 1/5 on the X-axis.
	 * @example translateX(0.5, ['1/3', '2/3']) // Translates the element by 0.5px on the X-axis and different values on the X-axis: 1/3px and 2/3px.
	 * 
	 * @param {number} [start=0] - The starting translation value for the X-axis (default is 0px).
	 * @param {string|string[]|number} [end=0] - The ending translation value for the X-axis. Can be a number, a string (e.g., '1/3'), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different translation values to different parts.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public translateX(start: number = 0, end: string | string[] | number = 0): CosmicAnimation {
		this.#addResources(('translateX(' + start + 'px)'), ('translateX(' + end + 'px)'), end, true);
		return this;
	}
	
	/**
	 * Applies a rotation transformation to the element or elements around the Z-axis.
	 * This method supports flexible input types for the rotation angle, such as numbers, strings, or arrays,
	 * allowing for different rotation values to be applied, including fractional rotations or different values 
	 * for different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example rotate(0.5, 1) // Rotates the element by 0.5 degrees and 1 degree around the Z-axis.
	 * @example rotate(0.5, '1/5') // Rotates the element by 0.5 degrees and 1/5 of a full rotation around the Z-axis.
	 * @example rotate(0.5, ['1/3', '2/3']) // Rotates the element by 0.5 degrees and applies different rotation values: 1/3 and 2/3 of a full rotation.
	 * 
	 * @param {number} [start=0] - The starting rotation value in degrees (default is 0°).
	 * @param {string|string[]|number} [end=0] - The ending rotation value in degrees. Can be a number, a string (e.g., '1/3'), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different rotation values to different parts.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public rotate(start: number = 0, end: string | string[] | number = 0): CosmicAnimation {
		this.#addResources(('rotate(' + start + 'deg)'), ('rotate(' + end + 'deg)'), end, true);
		return this;
	}

	/**
	 * Applies an opacity transformation to the element or elements.
	 * The method allows for flexible input types, such as numbers, strings, or arrays,
	 * enabling the opacity to be set to specific values, including fractional values or different opacity 
	 * values for different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example opacity(0.5, 1) // Sets the opacity of the element from 0.5 to 1.
	 * @example opacity(0.5, '1/5') // Sets the opacity of the element from 0.5 to 1/5 (20% opacity).
	 * @example opacity(0.5, ['1/3', '2/3']) // Sets the opacity of the element from 0.5 to different values: 1/3 and 2/3 opacity.
	 * 
	 * @param {number} [start=0] - The starting opacity value (default is 0).
	 * @param {string|string[]|number} [end=1] - The ending opacity value. Can be a number, a string (e.g., '1/3'), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different opacity values to different parts of the element.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public opacity(start: number = 0, end: string | string[] | number = 1): CosmicAnimation {
		this.#addResources(('opacity: ' + start + ';'), ('opacity: ' + end + ';'), end);
		return this;
	}

	/**
	 * Applies a background color transformation to the element or elements.
	 * This method allows you to set a starting and ending background color, with flexibility for fractional or 
	 * dynamic values, including arrays of colors to apply different background colors to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example bgColor("blue", "red") // Sets the background color of the element from blue to red.
	 * @example bgColor("blue", '1/5') // Sets the background color of the element from blue to a color corresponding to 1/5 of the total range.
	 * @example bgColor("blue", ['1/3', '2/3']) // Sets the background color of the element from blue to different values, based on 1/3 and 2/3 ranges.
	 * 
	 * @param {string} [start="red"] - The starting background color (default is 'red').
	 * @param {string} [end="red"] - The ending background color (default is 'red'). This can be a string representing a color name, 
	 * or a color value represented as a fraction of a color range, or an array of fractional color values.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public bgColor(start: string = "red", end: string = "red"): CosmicAnimation {
		this.#addResources(('background-color: ' + start + ';'), ('background-color: ' + end + ';'), end);
		return this;
	}

	/**
	 * Applies a text color transformation to the element or elements.
	 * This method allows you to set a starting and ending text color, with flexibility for fractional or 
	 * dynamic values, including arrays of colors to apply different text colors to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example color("blue", "red") // Sets the text color of the element from blue to red.
	 * @example color("blue", '1/5') // Sets the text color of the element from blue to a color corresponding to 1/5 of the total color range.
	 * @example color("blue", ['1/3', '2/3']) // Sets the text color of the element from blue to different color values based on 1/3 and 2/3 ranges.
	 * 
	 * @param {string} [start="black"] - The starting text color (default is 'black').
	 * @param {string} [end="black"] - The ending text color (default is 'black'). This can be a string representing a color name,
	 * or a color value represented as a fraction of a color range, or an array of fractional color values.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public color(start: string = "black", end: string = "black"): CosmicAnimation {
		this.#addResources(('color: ' + start + ';'), ('color: ' + end + ';'), end);
		return this;
	}

	/**
	 * Applies a width transformation to the element or elements.
	 * This method allows you to set a starting and ending width, with flexibility for fractional or 
	 * dynamic values, including arrays of widths to apply different widths to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example width(300, 700) // Sets the width of the element from 300px to 700px.
	 * @example width(300, '1/5') // Sets the width of the element from 300px to 1/5 of the total width.
	 * @example width(300, ['1/3', '2/3']) // Sets the width of the element from 300px to different width values based on 1/3 and 2/3 of the total width.
	 * 
	 * @param {number} [start=300] - The starting width value in pixels (default is 300px).
	 * @param {number|string|string[]} [end=300] - The ending width value, which can be a number (in pixels), a string (e.g., '1/5' for fractional width), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different widths to different parts of the element.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public width(start: number = 300, end: number | string | string[] = 300): CosmicAnimation {
		this.#addResources(('width: ' + start + 'px;'), ('width: ' + end + 'px;'), end);
		return this;
	}

	/**
	 * Applies a height transformation to the element or elements.
	 * This method allows you to set a starting and ending height, with flexibility for fractional or 
	 * dynamic values, including arrays of heights to apply different heights to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example height(300, 700) // Sets the height of the element from 300px to 700px.
	 * @example height(300, '1/5') // Sets the height of the element from 300px to 1/5 of the total height.
	 * @example height(300, ['1/3', '2/3']) // Sets the height of the element from 300px to different height values based on 1/3 and 2/3 of the total height.
	 * 
	 * @param {number} [start=300] - The starting height value in pixels (default is 300px).
	 * @param {number|string|string[]} [end=300] - The ending height value, which can be a number (in pixels), a string (e.g., '1/5' for fractional height), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different heights to different parts of the element.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public height(start: number = 300, end: number | string | string[] = 300): CosmicAnimation {
		this.#addResources(('height: ' + start + 'px;'), ('height: ' + end + 'px;'), end);
		return this;
	}

	/**
	 * Applies a padding transformation to the element or elements.
	 * This method allows you to set a starting and ending padding, with flexibility for fractional or 
	 * dynamic values, including arrays of padding values to apply different paddings to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example padding(10, 6) // Sets the padding of the element from 10px to 6px.
	 * @example padding(10, '1/5') // Sets the padding of the element from 10px to 1/5 of the total padding.
	 * @example padding(10, ['1/3', '2/3']) // Sets the padding of the element from 10px to different padding values based on 1/3 and 2/3 of the total padding.
	 * 
	 * @param {number} [start=300] - The starting padding value in pixels (default is 300px).
	 * @param {number|string|string[]} [end=300] - The ending padding value, which can be a number (in pixels), a string (e.g., '1/5' for fractional padding), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different paddings to different parts of the element.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public padding(start: number = 300, end: number | string | string[] = 300): CosmicAnimation {
		this.#addResources(('padding: ' + start + 'px;'), ('padding: ' + end + 'px;'), end);
		return this;
	}

	/**
	 * Applies a margin transformation to the element or elements.
	 * This method allows you to set a starting and ending margin, with flexibility for fractional or 
	 * dynamic values, including arrays of margin values to apply different margins to different parts of the element.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example margin(10, 6) // Sets the margin of the element from 10px to 6px.
	 * @example margin(10, '1/5') // Sets the margin of the element from 10px to 1/5 of the total margin.
	 * @example margin(10, ['1/3', '2/3']) // Sets the margin of the element from 10px to different margin values based on 1/3 and 2/3 of the total margin.
	 * 
	 * @param {number} [start=300] - The starting margin value in pixels (default is 300px).
	 * @param {number|string|string[]} [end=300] - The ending margin value, which can be a number (in pixels), a string (e.g., '1/5' for fractional margin), 
	 * or an array of strings (e.g., ['1/3', '2/3']) to apply different margins to different parts of the element.
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public margin(start: number = 300, end: number | string | string[] = 300): CosmicAnimation {
		this.#addResources(('margin: ' + start + 'px;'), ('margin: ' + end + 'px;'), end);
		return this;
	}

	/**
	 * Adds a custom CSS property transformation to the element or elements.
	 * This method allows you to define a starting and ending value for any CSS property, offering flexibility
	 * to use dynamic values such as fractions or arrays for multiple transformations at once.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @example addProperty("border: 2px solid #000;", "border: 6px solid blue;") 
	 * // Sets the border property from `2px solid black` to `6px solid blue`.
	 * 
	 * @example addProperty("border: 2px solid #000;", '1/5') 
	 * // Sets the border property from `2px solid black` to `1/5` of the total border value.
	 * 
	 * @example addProperty("border: 2px solid #000;", ["2/5", "3/5", "4/5"]) 
	 * // Sets the border property from `2px solid black` to different border values based on fractions `2/5`, `3/5`, and `4/5`.
	 * 
	 * @param {string} [cssStart=""] - The starting CSS property value (e.g., `border: 2px solid #000;`).
	 * @param {string|string[]} [cssEnd=""] - The ending CSS property value, which can be a string (e.g., `border: 6px solid blue;`), 
	 * a string representing a fraction (e.g., `'1/5'`), or an array of strings (e.g., `['2/5', '3/5', '4/5']`).
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
	 */
	public addProperty(cssStart: string = "", cssEnd: string = ""): CosmicAnimation {
		this.#addResources(cssStart, cssEnd, cssEnd);
		return this;
	}

	/**
	 * Internal method used for letter-by-letter animation. This method is private and should be used in conjunction
	 * with other animation methods. It injects opacity to each letter when the text needs to appear.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @private
	 * 
	 * @param {number} spaceInLetters - The space (in pixels) to be added between letters. This value is applied as margin
	 * between each letter, and helps control the spacing between letters in the animation.
	 * @param {boolean} [appear=false] - A flag that determines whether to inject opacity to each letter (default is false). 
	 * If `true`, the letters will initially have `opacity: 0`, making them invisible until they are animated to appear.
	 * 
	 * @returns {void}
	 * 
	 * @description
	 * This method takes the text content of the target element, splits it into individual letters, and wraps each letter 
	 * in a `<span>` element. The letters are styled inline to allow animations to be applied to them individually. Spaces, 
	 * line breaks, and tabs are replaced with empty `<span>` elements to maintain the layout and spacing. 
	 * The `spaceInLetters` parameter controls the spacing between each letter, while the `appear` flag controls the initial opacity.
	 */
	#lettersToElements(spaceInLetters: number, appear: boolean = false): void {
		// Backup original content
		this.#originalContent = this.target.innerHTML;

		if (this.target.textContent) {
			// Split the text content into an array of individual letters
			let letters: string[] = this.target.textContent.split("");

			// Clear the target element's HTML content
			this.target.innerHTML = "";

			// Iterate through each letter
			letters.forEach((letter: string) => {
				// Replace spaces, newlines, and tabs with an empty <span> with the specified margin
				// Other letters are wrapped in <span> for individual animation
				if (letter === " " || letter === "\n" || letter === "\t") {
					this.target.innerHTML += (`
						<span style="
							${appear ? 'opacity: 0;' : ''}
							display: inline-block;
							margin: 0 ${spaceInLetters}px;
						"></span>
					`).trim();
				} else {
					this.target.innerHTML += (`
						<span style="
							${appear ? 'opacity: 0;' : ''}
							display: inline-block;
						">${letter}</span>
					`).trim();
				}
			});
		}
	};

	/**
	 * Makes the text of the element fade out or appear letter by letter. The method can either take a specific direction 
	 * for the animation or just fade out the text without a particular direction.
	 * 
	 * This method is typically used for creating letter-by-letter fade effects on text content.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @private
	 * 
	 * @param {CosmicFadeOutSettings} param0 - The settings object that controls the fade-out behavior.
	 * @param {string} [param0.mode] - The direction in which the letters should fade (e.g., "top", "right", "bottom", "left").
	 *                                 If not provided, a random direction is chosen or no direction at all.
	 * @param {number} [param0.spaceInLetters] - The space (in pixels) between each letter. This is applied as margin between each letter.
	 * @param {number} [param0.time] - The time interval (in milliseconds) between the fade-out of each letter.
	 * @param {boolean} [param0.random=false] - A flag that determines whether the letters should fade out in random directions.
	 * @param {boolean} [param0.appear=false] - A flag that determines whether the text should appear (`true`) or fade out (`false`).
	 * 
	 * @returns {void}
	 * 
	 * @description
	 * This method splits the target text into individual letters by wrapping each one in a `<span>` tag, allowing for 
	 * individual animation on each letter. Then, it applies either a fade-in or fade-out effect on each letter, one by one, 
	 * with the possibility of random or specific directions. The `appear` flag controls whether the letters fade in 
	 * (appearing) or fade out (disappearing).
	 * 
	 * If `mode` is provided, the letters will fade out in a specific direction. If `random` is `true`, the letters will 
	 * fade out in random directions. If no `mode` or `random` flag is provided, the letters will simply fade in or out 
	 * without any directional effect.
	 */
	#fadeOut({ mode, spaceInLetters, time, random, appear }: CosmicFadeOutSettings): void {
		// Transform the content of the target element into <span> elements for each letter to animate them individually.
		this.#lettersToElements(spaceInLetters, appear);

		let index = 0, 
			// Get the injected <span> elements.
			childs: HTMLCollection = this.target.children, 
			// Store the automatically generated IDs for each <span>.
			ids: number[] = new Array(), 
			// Used to assign random modes (if random is enabled).
			randomModes: string[] = new Array("top", "right", "bottom", "left", "center");

		// Function to generate unique random IDs for the <span> elements.
		const createAutomaticRandIds: Function = (): void => {
			const randomId: number = Math.round(Math.random() * 1000);

			if (ids.indexOf(randomId) === -1) ids.push(randomId);
			else createAutomaticRandIds(); // Recursively generate a new ID if the current one already exists.
		};

		// Generate unique random IDs for each letter.
		for (let i = 0; i < childs.length; i++) createAutomaticRandIds();

		// Iterate through each injected <span> element.
		const interval: number = setInterval(() => {
			const span = childs[index] as HTMLSpanElement, 
				randomId: string = `id${ids[index]}`;

			span.setAttribute("id", randomId);

			// If no specific direction is provided, fade letters out to random directions.
			if (random) {
				let randomMode: string = randomModes[
					Math.floor(Math.random() * randomModes.length)
				];

				if (appear) new CosmicAnimation("#" + randomId).appearTo(randomMode).execute();
				else new CosmicAnimation("#" + randomId).fadeOutTo(randomMode).execute();
			// If a specific direction is provided, fade letters out to that direction.
			} else if (mode) {
				if (appear) new CosmicAnimation("#" + randomId).appearTo(mode).execute();
				else new CosmicAnimation("#" + randomId).fadeOutTo(mode).execute();
			// If no direction or random flag is provided, simply fade the letter in or out without any direction.
			} else {
				if (appear) new CosmicAnimation("#" + randomId).appear().execute();
				else new CosmicAnimation("#" + randomId).fadeOut().execute();
			}

			index++;

			// Stop the interval when all the <span> elements have been processed.
			if (index >= childs.length) clearInterval(interval);
		}, time);
	}

	/**
	 * Animates an element to appear from a specified direction (e.g., top, right, bottom, or left) 
	 * by changing its opacity and position on the screen. The animation includes a timing function 
	 * with a delay and duration that can be customized.
	 * 
	 * This method is typically used to create sliding and fading animations from one of the window's edges.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * 
	 * @param {string} [mode="right"] - The direction from which the element should appear. Possible values:
	 *   - `"top"`: The element will slide in from the top.
	 *   - `"right"`: The element will slide in from the right.
	 *   - `"bottom"`: The element will slide in from the bottom.
	 *   - `"left"`: The element will slide in from the left.
	 * 
	 * @param {number} [duration=2000] - The duration of the animation in milliseconds. This controls how long the animation lasts.
	 * 
	 * @param {number} [delay=0] - The delay before the animation starts, in milliseconds.
	 * 
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @description
	 * This method combines a fade-in effect with a translation effect to animate an element sliding in 
	 * from the specified direction while changing its opacity from 0 to 1. It sets the `opacity` at different 
	 * stages of the animation to create a smooth fade-in effect.
	 * 
	 * - The animation begins with an initial opacity of 0.
	 * - It gradually increases opacity in 20% increments at specific intervals (`0.3`, `0.5`, `0.7`).
	 * - The element's translation depends on the `mode` specified, either sliding in from the top, right, 
	 *   bottom, or left based on the window's width.
	 */
	public fromWindowTo(mode: string = "right", duration: number = 2000, delay: number = 0): CosmicAnimation {
		// Set the animation's delay, duration, and timing function
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in-out';

		// Set opacity at different stages of the animation for smooth fade-in effect
		this.opacity(0, 1)        // Fade in from 0 to 1
			.opacity(0.3, '2/5')   // Set opacity at 2/5
			.opacity(0.5, '3/5')   // Set opacity at 3/5
			.opacity(0.7, '4/5');  // Set opacity at 4/5

		// Apply the translation effect based on the specified mode
		if (mode === "top") {
			this.translateY(window.innerWidth, 0); // Slide in from the top (Y-axis)
		} else if (mode === "right") {
			this.translateX(-window.innerWidth, 0); // Slide in from the right (X-axis)
		} else if (mode === "bottom") {
			this.translateY(-window.innerWidth, 0); // Slide in from the bottom (Y-axis)
		} else {
			this.translateX(window.innerWidth, 0); // Slide in from the left (X-axis)
		}

		return this;  // Return the CosmicAnimation instance to allow method chaining
	}

	/**
	 * Animates the disappearance of the text in an element letter by letter.
	 * This method applies a fade-out effect to each individual letter, allowing for a staggered
	 * disappearance effect. The spacing between each letter can be customized, as well as the
	 * speed of the animation.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * 
	 * @param {number} [spaceInLetters=6] - The space (in pixels) between each letter as they are animated. 
	 *   This value determines the margin between each letter, allowing for a more spread-out or compact effect.
	 * 
	 * @param {number} [time=100] - The duration (in milliseconds) between each letter's fade-out animation. 
	 *   Smaller values will make the letters disappear more quickly, while larger values will slow down the effect.
	 * 
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @description
	 * This method works by first transforming the text content of the element into individual `<span>` 
	 * elements for each letter. It then applies a staggered fade-out effect, animating each letter's opacity 
	 * to 0 over the specified time. The `spaceInLetters` parameter adjusts the margin between each letter as 
	 * they fade out.
	 */
	public fadeOutLetters(spaceInLetters: number = 6, time: number = 100): CosmicAnimation {
		this.#fadeOut({
			spaceInLetters, 
			time
		});
		return this;
	}

	/**
	 * Animates the appearance of the text in an element letter by letter.
	 * This method applies an appearance (fade-in) effect to each individual letter, allowing for a staggered
	 * appearance effect. The spacing between each letter can be customized, as well as the speed of the animation.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * 
	 * @param {number} [spaceInLetters=6] - The space (in pixels) between each letter as they are animated. 
	 *   This value determines the margin between each letter, allowing for a more spread-out or compact effect.
	 * 
	 * @param {number} [time=100] - The duration (in milliseconds) between each letter's appearance animation. 
	 *   Smaller values will make the letters appear more quickly, while larger values will slow down the effect.
	 * 
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @description
	 * This method works by first transforming the text content of the element into individual `<span>` 
	 * elements for each letter. It then applies a staggered appearance (fade-in) effect, animating each letter's opacity 
	 * from 0 to 1 over the specified time. The `spaceInLetters` parameter adjusts the margin between each letter as 
	 * they appear.
	 */
	public appearLetters(spaceInLetters: number = 6, time: number = 100): CosmicAnimation {
		this.#fadeOut({
			spaceInLetters, 
			time, 
			appear: true
		});
		return this;
	}

	/**
	 * Animates the disappearance of the text in an element letter by letter towards a specified direction.
	 * This method animates each letter fading out, while also applying a directional movement to each letter 
	 * (e.g., moving them "top", "right", "bottom", or "left") as they fade out. The spacing and duration of the 
	 * animation can be customized.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * 
	 * @param {string} [mode="top"] - The direction in which the letters will fade out. Possible values:
	 *   - `"top"`: Letters will fade and move upwards.
	 *   - `"right"`: Letters will fade and move to the right.
	 *   - `"bottom"`: Letters will fade and move downwards.
	 *   - `"left"`: Letters will fade and move to the left.
	 *   
	 *   This controls the direction of the fade-out effect.
	 * 
	 * @param {number} [spaceInLetters=6] - The space (in pixels) between each letter as they are animated. 
	 *   This value determines the margin between each letter, allowing for a more spread-out or compact effect.
	 * 
	 * @param {number} [time=100] - The duration (in milliseconds) between each letter's disappearance animation. 
	 *   Smaller values will make the letters fade out more quickly, while larger values will slow down the effect.
	 * 
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @description
	 * This method works by first transforming the text content of the element into individual `<span>` 
	 * elements for each letter. Then it applies a directional fade-out effect to each letter, moving them in the 
	 * specified direction while fading out their opacity. The `spaceInLetters` parameter controls the spacing between 
	 * letters, and the `time` parameter determines the speed of the effect.
	 */
	public fadeOutLettersTo(mode: string = "top", spaceInLetters: number = 6, time: number = 100): CosmicAnimation {
		this.#fadeOut({
			mode, 
			spaceInLetters, 
			time
		});
		return this;
	}

	/**
	 * Animates the appearance of the text in an element letter by letter towards a specified direction.
	 * This method animates each letter appearing individually, while also applying a directional movement to each letter 
	 * (e.g., moving them "top", "right", "bottom", or "left") as they appear. The spacing and duration of the animation 
	 * can be customized.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * 
	 * @param {string} [mode="top"] - The direction in which the letters will appear. Possible values:
	 *   - `"top"`: Letters will appear and move upwards.
	 *   - `"right"`: Letters will appear and move to the right.
	 *   - `"bottom"`: Letters will appear and move downwards.
	 *   - `"left"`: Letters will appear and move to the left.
	 *   
	 *   This controls the direction of the appear animation.
	 * 
	 * @param {number} [spaceInLetters=6] - The space (in pixels) between each letter as they are animated. 
	 *   This value determines the margin between each letter, allowing for a more spread-out or compact effect.
	 * 
	 * @param {number} [time=100] - The duration (in milliseconds) between each letter's appearance animation. 
	 *   Smaller values will make the letters appear more quickly, while larger values will slow down the effect.
	 * 
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @description
	 * This method works by first transforming the text content of the element into individual `<span>` 
	 * elements for each letter. Then it applies a directional appear effect to each letter, moving them in the 
	 * specified direction while increasing their opacity. The `spaceInLetters` parameter controls the spacing between 
	 * letters, and the `time` parameter determines the speed of the effect.
	 */
	public appearLettersTo(mode: string = "top", spaceInLetters: number = 6, time: number = 100): CosmicAnimation {
		this.#fadeOut({
			mode, 
			spaceInLetters, 
			time, 
			appear: true
		});
		return this;
	}

	/**
	 * Disappears the text of the element letter by letter towards a random direction. 
	 * This effect randomly animates the disappearance of each letter from the text content 
	 * by gradually fading them out in different directions (top, right, bottom, left, or center). 
	 * You can adjust the space between letters and the timing of the animation.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [spaceInLetters=6] - The space (in pixels) between each letter during the animation. 
	 * This helps to control the visual spacing between the letters as they disappear.
	 * @param {number} [time=100] - The time (in milliseconds) between each letter's disappearance. 
	 * This controls the speed of the effect, with a lower number making the animation faster.
	 * @returns {CosmicAnimation} - Returns the instance of `CosmicAnimation` to allow for method chaining. 
	 * The method modifies the current animation and triggers the letter-by-letter fade-out animation.
	 * 
	 * @example
	 * element.fadeOutLettersRandom(10, 150); // Letters disappear with 10px space and 150ms delay between each letter.
	 * element.fadeOutLettersRandom(5); // Default 6px space and 100ms delay between letters.
	 */
	public fadeOutLettersRandom(spaceInLetters: number = 6, time: number = 100): CosmicAnimation {
		this.#fadeOut({
			spaceInLetters, 
			time, 
			random: true
		});
		return this;
	}

	/**
	 * Makes the text of the element appear letter by letter from a random direction. 
	 * This effect randomly animates each letter's appearance, making them fade in from various directions 
	 * (top, right, bottom, left, or center). The space between letters and the timing of the animation 
	 * can also be customized.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [spaceInLetters=6] - The space (in pixels) between each letter during the animation. 
	 * This affects how far apart the letters are as they appear, creating a visual spacing effect between them.
	 * @param {number} [time=100] - The time (in milliseconds) between each letter's appearance. 
	 * A lower value will make the letters appear faster.
	 * @returns {CosmicAnimation} - Returns the instance of `CosmicAnimation` to allow for method chaining. 
	 * This method triggers the letter-by-letter appearance effect with the specified settings.
	 * 
	 * @example
	 * element.appearLettersRandom(10, 150); // Letters appear with 10px space and 150ms delay between each letter.
	 * element.appearLettersRandom(); // Default space of 6px and 100ms delay between letters.
	 */
	public appearLettersRandom(spaceInLetters: number = 6, time: number = 100): CosmicAnimation {
		this.#fadeOut({
			spaceInLetters, 
			time, 
			random: true, 
			appear: true
		});
		return this;
	}

	/**
	 * Animates the appearance of the element by gradually fading in its opacity from 0 to 1. 
	 * This method allows for customizable duration and delay, and the element will use an "ease-out" timing function 
	 * for a smooth fading effect.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=1300] - The duration (in milliseconds) of the animation. This determines how long 
	 * the element will take to appear from fully transparent (opacity 0) to fully visible (opacity 1).
	 * @param {number} [delay=0] - The delay (in milliseconds) before the animation starts. 
	 * A value greater than 0 will wait for that amount of time before beginning the fade-in animation.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance, allowing for method chaining.
	 * 
	 * @example
	 * element.appear(2000); // The element will fade in over 2 seconds.
	 * element.appear(1500, 500); // The element will fade in over 1.5 seconds with a 500ms delay.
	 * element.appear(); // Default duration of 1300ms and no delay.
	 */
	public appear(duration: number = 1300, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out';
		this.opacity(0, 1);
		return this;
	}

	/**
	 * Animates the element to appear from a specific direction with a fading effect.
	 * The element will gradually fade in and move from the specified direction (top, bottom, left, or right). 
	 * It uses an "ease-in-out" timing function for a smooth transition.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string} [direction='bottom'] - The direction from which the element will appear. 
	 * Options include "top", "bottom", "left", "right". If no direction is specified, it defaults to 'bottom'.
	 * @param {number} [duration=1300] - The duration (in milliseconds) of the animation. Controls how long the 
	 * element will take to appear and move into view.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the animation starts. A value greater than 
	 * 0 will cause the animation to wait for that amount of time before beginning.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance, allowing for method chaining.
	 * 
	 * @example
	 * element.appearTo('top'); // The element will fade in and slide down from the top.
	 * element.appearTo('right', 2000); // The element will fade in and slide in from the right over 2 seconds.
	 * element.appearTo('left', 1500, 500); // The element will fade in and slide from the left with a 500ms delay.
	 * element.appearTo(); // The element will fade in and slide up from the bottom by default.
	 */
	public appearTo(direction = 'bottom', duration = 1300, delay = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in-out';
		this.opacity(0, '1/5').opacity(0.1, '2/5').opacity(0.2, '3/5')
			.opacity(0.3, '4/5').opacity(1, '5/5');
		
		// Animate according to the specified direction
		if (direction === 'top') this.translateY(300, 0);
		else if (direction === 'bottom') this.translateY(-300, 0);
		else if (direction === 'right') this.translateX(-300, 0);
		else if (direction === 'left') this.translateX(300, 0);
		else this.translateY(300, 0);
		return this;
	}

	/**
	 * Animates the element to fade out by gradually reducing its opacity from 1 to 0.
	 * The element will slowly disappear over the specified duration, using an "ease-out" timing function for a smooth transition.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=1300] - The duration (in milliseconds) of the fade-out animation. This controls how 
	 * long the element will take to fade out completely.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the fade-out animation starts. If set to a value 
	 * greater than 0, the animation will wait that long before starting.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance, allowing for method chaining.
	 * 
	 * @example
	 * element.fadeOut(); // The element will fade out over 1.3 seconds.
	 * element.fadeOut(2000); // The element will fade out over 2 seconds.
	 * element.fadeOut(1500, 500); // The element will fade out over 1.5 seconds, with a 500ms delay.
	 */
	public fadeOut(duration: number = 1300, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out';
		this.opacity(1, 0);
		return this;
	}

	/**
	 * Animates the element to fade in by gradually increasing its opacity from 0 to 1.
	 * This is a shorthand method that uses the `appear` method internally to create the fade-in effect.
	 * The element will slowly appear over the specified duration, using an "ease-out" timing function.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=1300] - The duration (in milliseconds) of the fade-in animation. This controls how long 
	 * the element will take to fade in completely.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the fade-in animation starts. If set to a value greater 
	 * than 0, the animation will wait that long before starting.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance, allowing for method chaining.
	 * 
	 * @example
	 * element.fadeIn(); // The element will fade in over 1.3 seconds.
	 * element.fadeIn(2000); // The element will fade in over 2 seconds.
	 * element.fadeIn(1500, 500); // The element will fade in over 1.5 seconds, with a 500ms delay.
	 */
	public fadeIn(duration: number = 1300, delay: number = 0): CosmicAnimation {
		return this.appear(duration, delay);
	}

	/**
	 * Animates the element to fade out while translating it in a specified direction.
	 * The element's opacity gradually decreases from 1 to 0, while it moves towards the specified direction (top, bottom, left, or right).
	 * The animation uses an "ease-in" timing function for a smooth transition.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string} [direction='bottom'] - The direction in which the element will move while fading out. It can be one of 
	 * the following values: `'top'`, `'bottom'`, `'left'`, or `'right'`. Default is `'bottom'`.
	 * @param {number} [duration=1300] - The duration (in milliseconds) of the fade-out animation. Controls how long the element 
	 * will take to fade out and move to the target direction.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the fade-out animation starts. If set to a value greater 
	 * than 0, the animation will wait for that time before starting.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance, allowing for method chaining.
	 * 
	 * @example
	 * element.fadeOutTo('top'); // The element will fade out and move upwards.
	 * element.fadeOutTo('right', 2000); // The element will fade out and move to the right over 2 seconds.
	 * element.fadeOutTo('left', 1500, 500); // The element will fade out and move to the left over 1.5 seconds, with a 500ms delay.
	 */
	public fadeOutTo(direction: string = 'bottom', duration: number = 1300, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-in';
		this.opacity(1, '1/5').opacity(0.3, '2/5').opacity(0.2, '3/5')
			.opacity(0.1, '4/5').opacity(0, '5/5');

		// De acuerdo a la direccion, se crea la animacion.
		if (direction === 'top') this.translateY(0, -300);
		else if (direction === 'bottom') this.translateY(0, 300);
		else if (direction === 'right') this.translateX(0, 300);
		else if (direction === 'left') this.translateX(0, -300);
		else this.translateY(0, -300);
		return this;
	}

	/**
	 * Makes the element appear and fade out in a sequence of steps.
	 * The element first moves vertically (using `translateY`) and its opacity changes in a series of steps, 
	 * with the element fading in and out while translating.
	 * The movement and opacity change follow a smooth "ease-out" timing function for the entire animation.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=1300] - The total duration (in milliseconds) of the entire animation. This controls how long 
	 * the element will take to appear and fade out.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the animation starts. A value greater than 0 will delay 
	 * the start of the animation.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance, allowing for method chaining.
	 * 
	 * @example
	 * element.appearAndFadeOut(); // The element will appear and fade out over 1.3 seconds with no delay.
	 * element.appearAndFadeOut(2000); // The element will take 2 seconds to appear and fade out.
	 * element.appearAndFadeOut(1500, 500); // The element will take 1.5 seconds to appear and fade out, with a 500ms delay.
	 */
	public appearAndFadeOut(duration: number = 1300, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out';
		this.translateY(120, "1/5").translateY(0, ["2/5", "3/5", "4/5"]).translateY(120, "5/5")
			.opacity(0, "1/5").opacity(1, ["2/5", "3/5", "4/5"]).opacity(0, "5/5");
		return this;
	}

	/**
	 * Animates the element to gradually scale up and fade in.
	 * The element will first be scaled down to 0 and then scale up to its normal size (1), while its opacity 
	 * will transition from 0 to 1. This creates an effect of the element appearing and scaling up at the same time.
	 * The animation follows an `ease-out-in` timing function, meaning it will start slow, accelerate, and then slow down again.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=2000] - The total duration (in milliseconds) of the animation. By default, the animation lasts 2000ms.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the animation begins. By default, there is no delay (0ms).
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @example
	 * element.increment(); // The element will scale and fade in over 2 seconds with no delay.
	 * element.increment(3000); // The element will take 3 seconds to scale and fade in.
	 * element.increment(2500, 500); // The element will take 2.5 seconds to animate, with a 500ms delay.
	 */
	public increment(duration: number = 2000, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.animation.timingFunction = 'ease-out-in';
		this.scale(0, 1).opacity(0, 1);
		return this;
	}

	/**
	 * Creates a pulsing animation where the element scales up and down while gradually becoming more opaque.
	 * The element will scale from 0 to its normal size, then pulse to 1.2 times its size before returning to normal size.
	 * At the same time, its opacity will increase from 0 to 1 in a pulsating manner. This creates an effect of the element
	 * "growing" and becoming more visible in a smooth, pulsing animation.
	 * The animation follows an `ease-out-in` timing function, meaning it starts slow, accelerates, and slows down again.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=2000] - The total duration (in milliseconds) of the animation. By default, the animation lasts 2000ms.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the animation begins. By default, there is no delay (0ms).
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @example
	 * element.incrementPulse(); // The element will pulse with a duration of 2 seconds and no delay.
	 * element.incrementPulse(2500); // The element will pulse over 2.5 seconds.
	 * element.incrementPulse(2000, 500); // The element will pulse with a 500ms delay.
	 */
	public incrementPulse(duration: number = 2000, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;
		this.scale(0, '1/5').scale(1, ['2/5', '3/5']).scale(1.2, '4/5').scale(1, '5/5')
			.opacity(0, '1/5').opacity(0.5, '2/5').opacity(1, '3/5');
		return this;
	}

	/**
	 * Creates an animation where the element transitions into a circular shape while moving and fading.
	 * The element will move vertically (either up or down depending on the direction), 
	 * gradually changing its size and opacity, while also transitioning into a circle by modifying 
	 * its border-radius. The element starts off invisible, becomes visible, and animates its scale 
	 * from small to full size, while also transitioning its opacity.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {string} [direction='bottom'] - The direction in which the element will move vertically. 
	 *     Can be either `'bottom'` (move up from below) or `'top'` (move down from above).
	 *     Default is `'bottom'`.
	 * @param {number} [duration=2500] - The duration (in milliseconds) for the entire animation. 
	 *     Default is 2500ms.
	 * @param {number} [delay=3000] - The delay (in milliseconds) before the animation starts. 
	 *     Default is 3000ms.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @example
	 * element.circleTo(); // The element will move up from below, turn into a circle, and animate over 2.5 seconds.
	 * element.circleTo('top'); // The element will move down from above and animate as a circle.
	 * element.circleTo('bottom', 3000, 1000); // The element will move up from below with a 3-second duration and 1-second delay.
	 */
	public circleTo(direction: string = 'bottom', duration: number = 2500, delay: number = 3000): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;

		// Set movement direction based on the input (top or bottom)
		if (direction === 'bottom') {
			this.translateY(-window.innerHeight, '1/5')
				.translateY((-window.innerHeight / 2), '2/5')
				.translateY((-window.innerHeight / 3), '3/5');
		} else {
			this.translateY(window.innerHeight, '1/5')
				.translateY((window.innerHeight / 2), '2/5')
				.translateY((window.innerHeight / 3), '3/5');
		}        

		// Finalize translation, opacity, border-radius, and scaling
		this.translateY(0, ['4/5', '5/5'])
			.opacity(0, 1)
			.addProperty('border-radius: 100%;', 'border-radius: 0;')
			.scale(0.1, ['1/5', '2/5', '3/5', '4/5']).scale(1, '5/5');

		return this;
	}
	
	/**
	 * Creates a "pulse" animation on the element where it scales up and down in size over a set duration.
	 * The element starts at its normal size, gradually scales up, and then returns to its original size.
	 * The scaling occurs in stages to create a pulsating effect.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=1000] - The duration (in milliseconds) for the pulse animation. 
	 *     Default is 1000ms.
	 * @param {number} [delay=0] - The delay (in milliseconds) before the pulse animation starts. 
	 *     Default is 0ms.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow for method chaining.
	 * 
	 * @example
	 * element.pulse(); // The element will pulse with default duration of 1 second.
	 * element.pulse(1500); // The element will pulse for 1.5 seconds.
	 * element.pulse(1000, 500); // The element will pulse for 1 second, but with a 500ms delay before starting.
	 */
	public pulse(duration: number = 1000, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;

		// The scaling sequence to create the "pulse" effect.
		this.scale(1, 1)                  // Starts at normal size.
			.scale(1.1, ['2/5', '4/5'])   // Scales up to 1.1x at the middle of the animation.
			.scale(1.3, '3/5');            // Scales up further to 1.3x before returning to normal.

		return this;
	}

	/**
	 * Creates a "palpite" (heartbeat-like) animation on the element where it pulses
	 * by scaling it down and then scaling it up in a rhythmic manner.
	 * The element starts slightly smaller, then grows and shrinks in a cycle to create a heartbeat effect.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {number} [duration=3000] - The total duration (in milliseconds) of the animation cycle.
	 *     Default is 3000ms (3 seconds).
	 * @param {number} [delay=0] - The delay (in milliseconds) before the animation starts. 
	 *     Default is 0ms (no delay).
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow method chaining.
	 * 
	 * @example
	 * element.palpite(); // The element will perform the "palpite" animation with the default duration of 3 seconds.
	 * element.palpite(4000); // The element will pulse over 4 seconds.
	 * element.palpite(3000, 500); // The element will pulse with a delay of 500ms before starting.
	 */
	public palpite(duration: number = 3000, delay: number = 0): CosmicAnimation {
		this.animation.delay = delay;
		this.animation.duration = duration;

		// Create the rhythmic scale effect, like a heartbeat.
		this.scale(0.8, ['1/5', '3/5', '5/5'])   // Scales down to 0.8x at different stages.
			.scale(1.1, ['2/5', '4/5']);          // Scales up to 1.1x at intermediate stages.

		return this;
	}

	/**
	 * Resets all animations applied to the `CosmicAnimation` object, restoring the element's
	 * state to its original configuration. Optionally, the element's inner content can be restored
	 * to its initial state as well.
	 *
	 * This method removes any injected animation styles from the page and resets the target element
	 * to its default styling and content, if necessary.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {boolean} [restartContent=true] - If `true`, restores the element's inner HTML to
	 *     its original state (before any animation). If `false`, leaves the content as is.
	 *     Default is `true`.
	 * @returns {CosmicAnimation} - Returns the `CosmicAnimation` instance to allow method chaining.
	 * 
	 * @example
	 * element.reset(); // Resets all animations and restores the content of the element to its original state.
	 * element.reset(false); // Resets the animations, but does not restore the content.
	 */
	public reset(restartContent: boolean = true): CosmicAnimation {
		const style: HTMLStyleElement = document.getElementsByTagName('style')[0];

		// Check if a style element exists and remove animations from it.
		if (style) {
			const comment: string = `/* end: ${this.animation.name} */`,
				animationName: string = `.${this.animation.name}`;

			// Split the style content to remove the animation part.
			const partOne = style.innerHTML.slice(
				0, style.innerHTML.indexOf(animationName)
			);

			const partTwo = style.innerHTML.slice(
				(style.innerHTML.indexOf(comment) + comment.length),
				style.innerHTML.length
			);

			// Reassemble the style content without the animation.
			style.innerHTML = (partOne + partTwo);
		}

		// Restore the default values for the animation.
		this.#assignDefaultValues();

		// Optionally restore the original content of the element.
		if (restartContent) {
			if (this.#originalContent) this.target.innerHTML = this.#originalContent;
		}

		return this;
	}

	/**
	 * Executes a specific action after the animation has completed. This method allows 
	 * you to define a callback that will be executed once the animation finishes. 
	 * If an error occurs, you can also provide a callback to handle it.
	 * 
	 * The execution time is calculated by summing the duration of the animation, the delay, 
	 * and the iterations (if any). If the animation has a finite number of repetitions, 
	 * the callback will be executed after all iterations are completed.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @param {Function} callback - The function to execute once the animation finishes. 
	 *     This callback does not receive any parameters.
	 * @param {Function} [callbackErr] - An optional function that will be executed if 
	 *     an error occurs during the execution of the callback. It receives the error as a parameter.
	 * @returns {void} - No return value. It is used for triggering side effects.
	 * 
	 * @example
	 * element.ends(() => {
	 *     console.log("Animation finished");
	 * }, (error) => {
	 *     console.error("Error during animation", error);
	 * });
	 */
	public ends(callback: Function, callbackErr?: Function): void {
		try {
			// Calculate the total time considering delay and duration.
			let time = (this.animation.delay + this.animation.duration);

			// Check if the animation has a finite number of iterations.
			const isFinite: boolean = (
				Number.isFinite(this.animation.iterationCount) && 
				String(this.animation.iterationCount) !== "infinite"
			);

			// If the animation has a finite number of iterations, multiply the total time.
			if (Number.isInteger(this.animation.iterationCount) && isFinite) {
				time = (time * this.animation.iterationCount);
			}

			// Execute the callback after the animation completes, if valid.
			if (isFinite && typeof callback === "function") {
				setTimeout(() => callback(), time);
			}
		} catch (error) {
			// If an error occurs, execute callbackErr, if defined.
			if (typeof callbackErr === "function") callbackErr(error);
		}
	}

	/**
	 * Executes actions asynchronously when the animation finishes. This method returns 
	 * a promise that resolves when the animation ends successfully and rejects if an error occurs.
	 * It wraps the `ends` method in a promise, making it easier to work with asynchronous workflows 
	 * using `async/await` or `.then()/.catch()` syntax.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @returns {Promise<boolean|any>} - A promise that resolves to `true` if the animation 
	 *     finishes successfully, or rejects with the error if the callback encounters an issue.
	 * 
	 * @example
	 * element.asyncEnds()
	 *     .then(() => {
	 *         console.log("Animation finished successfully");
	 *     })
	 *     .catch((error) => {
	 *         console.error("Error during animation", error);
	 *     });
	 */
	public asyncEnds(): Promise<boolean | any> {
		return new Promise((resolve, reject) => {
			this.ends(
				() => resolve(true), 
				(error: any) => reject(error)
			);
		});
	}

	/**
	 * Validates the animation settings to ensure they meet the required criteria:
	 * - The `iterationCount` must be an integer or `Infinity`. If invalid, it is set to `1`.
	 * - The `duration` must be a finite integer. If invalid, it is set to `1000` milliseconds.
	 * - The `delay` must be a finite integer. If invalid, it is set to `0` milliseconds.
	 * 
	 * This method is used internally to validate and sanitize the animation settings before execution.
	 * 
	 * @author Brandon Anthony Olivares Amador
	 * @private
	 */
	#validateAnimationSettings(): void {
		// The iteration count must be an integer or "Infinity".
		if (!Number.isInteger(this.animation.iterationCount) && typeof this.animation.iterationCount !== "number") {
			this.animation.iterationCount = 1;
		}

		// The duration must be a finite integer.
		if (!Number.isFinite(this.animation.duration) || !Number.isInteger(this.animation.duration)) {
			this.animation.duration = 1000;
		}

		// The delay must be a finite integer.
		if (!Number.isFinite(this.animation.delay) || !Number.isInteger(this.animation.delay)) {
			this.animation.delay = 0;
		}
	}

	/**
	 * Executes the animation by injecting the necessary CSS styles into the document.
	 * It prepares the animation, sets its keyframes, and appends a `<style>` element to the DOM.
	 * The method checks whether the animation should be triggered via `IntersectionObserver`
	 * based on the viewport visibility, and adds the appropriate classes to the target element.
	 * 
	 * The animation properties are determined dynamically based on the type of animation 
	 * (e.g., "default", "nine", or "three"), and then applied through keyframes and styles.
	 * 
	 * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for chaining.
	 * 
	 * @example
	 * const animation = new CosmicAnimation(targetElement);
	 * animation.execute(); // Executes the animation on the target element.
	 */
	public execute(): CosmicAnimation {
		// Create a <style> tag to assign the animation.
		var style: HTMLStyleElement = document.createElement('style');
		style.setAttribute('type', 'text/css');

		// If there's already a <style> in the DOM, use the first one.
		if (document.getElementsByTagName('style')[0] !== undefined) {
			style = document.getElementsByTagName('style')[0];
		}

		// This object will contain the animation parts.
		const ANIMATION_PARTS = {};

		// Representation of the animation parts (3/3, 5/5, 9/9).
		let partsThree: string[] = ['part1', 'part2', 'part3'];
		let percentageThree: string[] = ['0%', '50%', '100%'];

		let partsFive: string[] = ['part1', 'part2', 'part3', 'part4', 'part5'];
		let percentageFive: string[] = ['0%', '25%', '50%', '75%', '100%'];

		let partsNine: string[] = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7', 'part8', 'part9'];
		let percentageNine: string[] = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%', '100%'];

		const typeAnimation: string = this.#resources.type;

		// Get the iteration count based on the animation type.
		const iteration: number = (
			typeAnimation === "default" ? partsFive.length : (
				typeAnimation === "nine" ? partsNine.length : partsThree.length
			)
		) - 1;

		for (let i = 0; i <= iteration; i++) {
			let part: string, percentage: string;

			// Check which animation type is being used.
			if (typeAnimation === "default") {
				part = partsFive[i], percentage = percentageFive[i];
			} else if (typeAnimation === "nine") {
				part = partsNine[i], percentage = percentageNine[i];
			} else {
				part = partsThree[i], percentage = percentageThree[i];
			}

			// Get the properties for the current part.
			let valueTransform: string[], valueNormal: string[];

			if (typeAnimation === "default") {
				valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsTransform, part)?.value;
				valueNormal = Object.getOwnPropertyDescriptor(this.#resources.parts, part)?.value;
			} else if (typeAnimation === "nine") {
				valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsNineTransform, part)?.value;
				valueNormal = Object.getOwnPropertyDescriptor(this.#resources.partsNine, part)?.value;
			} else {
				valueTransform = Object.getOwnPropertyDescriptor(this.#resources.partsThreeTransform, part)?.value;
				valueNormal = Object.getOwnPropertyDescriptor(this.#resources.partsThree, part)?.value;
			}

			// If there are valid values, add them to the animation parts.
			if (valueTransform.length > 0 || (valueNormal.length > 0)) {
				Object.defineProperty(ANIMATION_PARTS, part, {
					value: (`
						${percentage} {
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

		// Get the percentages and properties as a string.
		const getPercentages = () => {
			// @ts-ignore
			const partsValues: string[] = Object.values(ANIMATION_PARTS);

			// @ts-ignore
			window.ANIMATION_PARTS = ANIMATION_PARTS;

			return partsValues.join("");
		};

		// Add the animation to the style tag with the keyframes and properties.
		style.innerHTML += (`
			.${this.animation.name} {
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
			@keyframes ${this.animation.name} {
				${getPercentages()}
			}/* end: ${this.animation.name} */
		`);

		// Append the style element to the DOM.
		document.getElementsByTagName('body')[0].appendChild(style);

		// Check if viewport observation is enabled.
		if (this.observeViewport.enabled) {
			const observeTarget = new IntersectionObserver(elements => {
				if (elements[0].isIntersecting) {
					this.target.classList.add(this.animation.name);
				} else if (this.observeViewport.infinite) {
					this.target.classList.remove(this.animation.name);
				}
			});

			if (this.target.parentElement) {
				observeTarget.observe(this.target.parentElement);
			}
		} else {
			// If no viewport observation, apply the animation directly.
			this.target.classList.add(this.animation.name);
		}

		return this;
	}
}

export default CosmicAnimation;