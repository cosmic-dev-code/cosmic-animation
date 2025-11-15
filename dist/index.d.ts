import { CosmicAnimateSettings, CosmicAnimateViewport } from "./interfaces/animation";
/**
 * @class CosmicAnimation
 */
declare class CosmicAnimation {
    #private;
    target: HTMLElement;
    /**
     * Common settings for a CSS animation.
     */
    animation: CosmicAnimateSettings;
    /**
     * Configure whether you want the animation to run when the element is visible in the viewport.
     */
    observeViewport: CosmicAnimateViewport;
    /**
     * The constructor can return a CosmicAnimation object or an array of CosmicAnimation objects.
     *
     * @author Brandon Anthony Olivares Amador
     * @param {string|string[]} selector - A CSS selector or an array of CSS selectors.
     * @param {string|string[]} name - A name or an array of animation names.
     * @return {CosmicAnimation|CosmicAnimation[]} A single CosmicAnimation object or an array of CosmicAnimation objects.
     */
    constructor(selector?: string | string[], name?: string | string[]);
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
    scale(start?: number, end?: string | string[] | number): CosmicAnimation;
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
    translateY(start?: number, end?: string | string[] | number): CosmicAnimation;
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
    translateX(start?: number, end?: string | string[] | number): CosmicAnimation;
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
    rotate(start?: number, end?: string | string[] | number): CosmicAnimation;
    /**
     * Applies a rotation transformation to the element or elements around the X-axis.
     * This method supports flexible input types for the rotation angle, such as numbers, strings, or arrays,
     * allowing for different rotation values to be applied, including fractional rotations or different values
     * for different parts of the element.
     *
     * @author Brandon Anthony Olivares Amador
     * @example rotateX(0.5, 1) // Rotates the element by 0.5 degrees and 1 degree around the X-axis.
     * @example rotateX(0.5, '1/5') // Rotates the element by 0.5 degrees and 1/5 of a full rotation around the X-axis.
     * @example rotateX(0.5, ['1/3', '2/3']) // Rotates the element by 0.5 degrees and applies different rotation values: 1/3 and 2/3 of a full rotation.
     *
     * @param {number} [start=0] - The starting rotation value around the X-axis in degrees (default is 0°).
     * @param {string|string[]|number} [end=0] - The ending rotation value around the X-axis in degrees.
     * Can be a number, a string (e.g., '1/3'), or an array of strings (e.g., ['1/3', '2/3']) to apply different rotation values to different parts.
     * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
     */
    rotateX(start?: number, end?: string | string[] | number): CosmicAnimation;
    /**
     * Applies a rotation transformation to the element or elements around the Y-axis.
     * This method supports flexible input types for the rotation angle, such as numbers, strings, or arrays,
     * allowing for different rotation values to be applied, including fractional rotations or different values
     * for different parts of the element.
     *
     * @author Brandon Anthony Olivares Amador
     * @example rotateY(0.5, 1) // Rotates the element by 0.5 degrees and 1 degree around the Y-axis.
     * @example rotateY(0.5, '1/5') // Rotates the element by 0.5 degrees and 1/5 of a full rotation around the Y-axis.
     * @example rotateY(0.5, ['1/3', '2/3']) // Rotates the element by 0.5 degrees and applies different rotation values: 1/3 and 2/3 of a full rotation.
     *
     * @param {number} [start=0] - The starting rotation value around the Y-axis in degrees (default is 0°).
     * @param {string|string[]|number} [end=0] - The ending rotation value around the Y-axis in degrees.
     * Can be a number, a string (e.g., '1/3'), or an array of strings (e.g., ['1/3', '2/3']) to apply different rotation values to different parts.
     * @returns {CosmicAnimation} The instance of the `CosmicAnimation` class for method chaining.
     */
    rotateY(start?: number, end?: string | string[] | number): CosmicAnimation;
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
    opacity(start?: number, end?: string | string[] | number): CosmicAnimation;
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
    bgColor(start?: string, end?: string): CosmicAnimation;
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
    color(start?: string, end?: string): CosmicAnimation;
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
    width(start?: number, end?: number | string | string[]): CosmicAnimation;
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
    height(start?: number, end?: number | string | string[]): CosmicAnimation;
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
    padding(start?: number, end?: number | string | string[]): CosmicAnimation;
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
    margin(start?: number, end?: number | string | string[]): CosmicAnimation;
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
    addProperty(cssStart?: string, cssEnd?: string): CosmicAnimation;
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
    fromWindowTo(mode?: string, duration?: number, delay?: number): CosmicAnimation;
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
    fadeOutLetters(spaceInLetters?: number, time?: number): CosmicAnimation;
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
    appearLetters(spaceInLetters?: number, time?: number): CosmicAnimation;
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
    fadeOutLettersTo(mode?: string, spaceInLetters?: number, time?: number): CosmicAnimation;
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
    appearLettersTo(mode?: string, spaceInLetters?: number, time?: number): CosmicAnimation;
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
    fadeOutLettersRandom(spaceInLetters?: number, time?: number): CosmicAnimation;
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
    appearLettersRandom(spaceInLetters?: number, time?: number): CosmicAnimation;
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
    appear(duration?: number, delay?: number): CosmicAnimation;
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
    appearTo(direction?: string, duration?: number, delay?: number): CosmicAnimation;
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
    fadeOut(duration?: number, delay?: number): CosmicAnimation;
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
    fadeIn(duration?: number, delay?: number): CosmicAnimation;
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
    fadeOutTo(direction?: string, duration?: number, delay?: number): CosmicAnimation;
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
    appearAndFadeOut(duration?: number, delay?: number): CosmicAnimation;
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
    increment(duration?: number, delay?: number): CosmicAnimation;
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
    incrementPulse(duration?: number, delay?: number): CosmicAnimation;
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
    circleTo(direction?: string, duration?: number, delay?: number): CosmicAnimation;
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
    pulse(duration?: number, delay?: number): CosmicAnimation;
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
    palpite(duration?: number, delay?: number): CosmicAnimation;
    /**
     * Applies a continuous rotation animation along the Y-axis, making the element
     * flip horizontally in 3D space. The animation alternates direction every cycle
     * (forward/backward) to create a smooth and natural flipping effect.
     *
     * @author Brandon Anthony Olivares Amador
     * @param {number} [duration=1700] - Duration (in milliseconds) of one full rotation.
     *     Default is 1700ms.
     * @returns {CosmicAnimation}
     *
     * @example
     * element.spinY();
     * element.spinY(2500); // Slower flip
     */
    spinY(duration?: number): CosmicAnimation;
    /**
     * Applies a continuous rotation animation along the X-axis, making the element
     * flip vertically in 3D space. The animation alternates direction automatically
     * for a smooth forward/backward motion.
     *
     * @author Brandon Anthony Olivares Amador
     * @param {number} [duration=1700] - Duration (in milliseconds) of one full rotation.
     * @returns {CosmicAnimation}
     *
     * @example
     * element.spinX();
     * element.spinX(2000); // Slightly slower vertical spin
     */
    spinX(duration?: number): CosmicAnimation;
    /**
     * Applies a continuous 2D rotation, spinning the element either clockwise or
     * counterclockwise depending on the selected direction. The rotation loops forever
     * without reversing direction (unlike spinX/spinY).
     *
     * Useful for icons, loaders, or decorative spinning elements.
     *
     * @author Brandon Anthony Olivares Amador
     * @param {"right" | "left"} [direction="right"] - Rotation direction.
     *     "right" = clockwise, "left" = counterclockwise.
     * @param {number} [duration=1700] - Duration (in milliseconds) of one full rotation.
     * @returns {CosmicAnimation}
     *
     * @example
     * element.spin(); // Spins to the right
     * element.spin("left"); // Spins to the left
     * element.spin("right", 2500); // Slower clockwise spin
     */
    spin(direction?: string, duration?: number): this;
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
    reset(restartContent?: boolean): CosmicAnimation;
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
    ends(callback: Function, callbackErr?: Function): void;
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
    asyncEnds(): Promise<boolean | any>;
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
    execute(): CosmicAnimation;
}
export default CosmicAnimation;
