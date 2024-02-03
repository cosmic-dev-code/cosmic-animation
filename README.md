# CosmicAnimation

**(CosmicAnimation)** is an alternative for creating dynamic CSS animations using JavaScript, it is easy to use, easy to implement and requires no additional effort.

# Instances

Assuming you have an element you want to animate.

```html
    <div id="idDiv"></div>
```

You can instantiate a **CosmicAnimation** class using the following instruction.

```js
    // Receives a CSS selector, as does (document.querySelector).

    /* Instantiate an object of type (CosmicAnimation), receives by parameters: 
        --- The selector of our element.
        --- The name of our animation. */
    const cosmicDiv = new CosmicAnimation('#idDiv', 'div-animation');
```

If you do not define the second parameter, a random animation name is assigned.

```js
    const cosmicDiv = new CosmicAnimation('#idDiv');
```

## More elements

Now you have more elements.

```html
    <div></div>
    <div id="idDiv"></div>
    <div id="div"></div>
```

You can define more than one **CosmicAnimation** object at a time.

```js
    /* Returns CosmicAnimation[]: 
        --- Selectors.
        --- Names for each animation. */
    const arrElementsCosmic = new CosmicAnimation(
        ['#idDiv', '.div', 'div'], 
        ['animacion-1', 'animacion-2', 'animacion-3']
    );

    arrElementsCosmic[0]; // CosmicAnimation
```

The third element will have an automatic animation name.

```js
    const arrElementsCosmic = new CosmicAnimation(
        ['#idDiv', '.div', 'div'], 
        ['animacion-1', 'animacion-2']
    );
```

Animation names are assigned automatically.

```js
    const arrElementsCosmic = new CosmicAnimation(['#idDiv', '.div', 'div']);
```

Like any array, the returned array **CosmicAnimation[]** can be iterated.

```js
    arrElementsCosmic.forEach(elementCosmic => {
        // ...
    });
```

# Animation settings

Like any CSS animation, if you already know the common CSS animation settings, you will see that it is the same.

These are the default settings.

```js
    const cosmicDiv = new CosmicAnimation('#idDiv');

    // Settings for this element.
    cosmicDiv.animation = {
        // Animation name for this element.
        name: 'name',
        // Animation time.
        delay: 0,
        // Duration time.
        duration: 1500,
        // How many times the animation will be repeated.
        iterationCount: 1, 
        // Direction of the animation, (normal, reverse, alternate, etc).
        direction: 'normal', 
        // Type of functionality, (smooth, fast, same, etc).
        timingFunction: 'linear',
        // Save final styles, (save changes or not).
        fillMode: 'forwards'
    };
```

## ObserverViewport

We can configure the **ObserverViewport** to determine whether the animation is executed when it enters or exits the ObserverViewport.

The **ObserveViewport** object has two properties.

```js
    cosmicDiv.observeViewport = {
        // Defines if the object will take the animation only when it is inside the viewport, that is, the visible part of the user's page.
        enabled: false,
        // Defines whether the animation will be repeated only once or indefinitely.
        infinite: false
    };
```

# Create (start) and (end) animations

The methods receive two parameters: 
	--- The value with which to start the element in the animation.
	--- The value to end the element in the animation with.

Add the properties on the element, (start of animation, end of animation).

**Normal properties.**

```js
    cosmicDiv.width(0, 200);
    cosmicDiv.height(0, 200);
    cosmicDiv.color('red', 'blue');
    cosmicDiv.bgColor('yellow', 'green');
    cosmicDiv.opacity(0, 1);
    cosmicDiv.padding(0, 30);
    cosmicDiv.margin(0, 30);
```

**Properties that transform.**

```js
    cosmicDiv.rotate(0, 360);
    cosmicDiv.translateX(0, 300);
    cosmicDiv.translateY(0, 300);
    cosmicDiv.scale(0, 1);
```

## Method chaining

How? Is it unpleasant to use this form?

Then let's use the **method chaining**.

```js
    cosmicDiv
        .width(0, 200).height(0, 200)
        .color('red', 'blue').bgColor('yellow', 'green')
        .translateX(0, 300).translateY(0, 300).scale(0, 1)
        .padding(0, 30).margin(0, 30);
```

## Other properties

If you want to use a property that is not among these, use the following method.

```js
    // Property, (start, end).
    cosmicDiv.addProperty(
        'border: 2px solid #000;', 
        'border: 6px solid blue;'
    );
```

Exit.

```css
    @keyframes animation-name{
        from{
            border: 2px solid #000;
        }
        to{
            border: 6px solid blue;
        }
    }
```

Now run the animation.

```js
    cosmicDiv.execute();
```

This injects a tag (style) into the DOM with the animations.

# Animation by fractions

CosmicAnimation allows you to animate at different points.
- Animation at a specific point: **(start)** to **(end)**.
- Animation in fractions: **(3/3)**, **(5/5)** and **(9/9)**.

This has to be specified explicitly.

# Create animations (3/3)

We can define each point of the animation in 3 steps, (3/3).

The output is the following.

```css
	@keyframes circle-move{
        /* 1/3 */
		0%{ background-color: blue; opacity: 0; }
        /* 2/3 */
		50%{ background-color: blue; opacity: 0.5; }
        /* 3/3 */
		100%{ background-color: red; opacity: 1; }
	}
```

**How do we do that?**

Simply with methods belonging to **CosmicAnimation**.

Some settings for the animation.

```js
    cosmicDiv.animation = {
        name: 'circle-move',
        delay: 0,
        duration: 3000,
        iterationCount: 'infinite',
        direction: 'alternate',
        timingFunction: 'linear',
        fillMode: 'forwards'
    };
```

Animations, now in thirds, (3/3).

```js
    cosmicDiv
        // We define each state of each property at each stage of the animation.
        .opacity(0, "1/3").opacity(0.5, "2/3").opacity(1, "3/3")
        .bgColor("blue", "1/3").bgColor("blue", "1/2").bgColor("red", "3/3")
        // We run the animation.
        .execute();
```

If some stages of the animation are the same, we can **simplify** it by using **Arrays**.

```js
    cosmicDiv
        .opacity(0, "1/3").opacity(0.5, "2/3").opacity(1, "3/3")
        // Same logic with Arrays.
        .bgColor("blue", ["1/3", "2/3"])
        .bgColor("red", "3/3")
        // We run the animation.
        .execute();
```

# Create animations (5/5)

The animation is built as follows (5/5).

```css
    @keyframes animation-name{
		0%{ transform: scale(0); background-color: red;}

		25%{ transform: scale(0.3); background-color: blue;}

		50%{ transform: scale(0.3); background-color: blue;}

		75%{ transform: scale(0.4); background-color: blue;}

		100%{ transform: scale(0.5); background-color: red;}
    }
```

Defines the state of a CSS property on this DIV element indicating it at each point of the animation.

```js
    // Some settings.
    cosmicDiv.animation.name = "AnimacionPulsacion";
    cosmicDiv.animation.duration = 3000;
    cosmicDiv.animation.iterationCount = Infinity;

    // Opacity at different points in the animation.
    cosmicDiv.scale(0, '1/5')
        .scale(0.3, '2/5').scale(0.3, '3/5')
        .scale(0.4, '4/5').scale(0.5, '5/5');

    // Now the background color.
    cosmicDiv.bgColor('red', '1/5')
        .bgColor('blue', '2/5')
        .bgColor('blue', '3/5')
        .bgColor('blue', '4/5')
        .bgColor('red', '5/5')
        .execute();
```

Remember that we can simplify it.

```js
    cosmicDiv.scale(0, '1/5')
        // The state of the property is the same at these points in the animation.
        .scale(0.3, ['2/5', '3/5'])
        .scale(0.4, '4/5')
        .scale(0.5, '5/5')
        // Others.
        .bgColor('red', ['1/5', '5/5'])
        .bgColor('blue', ['2/5', '3/5', '4/5'])
        .execute();
```

# Create animations (9/9)

Now we are controlling nine stages of the animation, by splitting the animation into (9/9).

CSS Output.

```css
	@keyframes circle-move{
		0%{ transform: translateX(0px); opacity: 0; }

		12.5%{ transform: translateX(0px); opacity: 0; }

		25%{ transform: translateX(100px); opacity: 0.3; }

		37.5%{ transform: translateX(100px); opacity: 0.3; }

		50%{ transform: translateX(200px); opacity: 0.6; }

		62.5%{ transform: translateX(200px); opacity: 0.6; }

		75%{ transform: translateX(300px); opacity: 0.8; }

		87.5%{ transform: translateX(400px); opacity: 1; }

		100%{ transform: translateX(400px); opacity: 1; }
	}
```

Properties with **CosmicAnimation*.

```js
    // Every two stages the animations are the same.
    cosmicDiv
        .opacity(0, ['1/9', '2/9'])
        .opacity(0.3, ['3/9', '4/9'])
        .opacity(0.6, ['5/9', '6/9'])
        // Here it is different.
        .opacity(0.8, '7/9')
        .opacity(1, ['8/9', '9/9']);

    // See that sometimes it can be neater without it (chaining of methods).
    // But it's your choice.
    cosmicDiv.translateX(100, ['1/9', '2/9', '3/9']);
    cosmicDiv.translateX(200, ['4/9', '5/9', '6/9']);
    cosmicDiv.translateX(300, ['7/9', '8/9', '9/9']);

    cosmicDic.execute();
```

# Prefabricated animations

If we have a few methods for creating animations, we have some pre-made methods that we can take advantage of.

## From screen

All of this applies to this DIV element that we are manipulating.

The parameters received are **(duration)** and **(delay)**.

```js
    /**
     * From.
    */

    // Appears to the right from off screen.
    cosmicDiv.fromWindowTo("right", 2000, 0);
    
    // Appears to the left from off screen.
    cosmicDiv.fromWindowTo("left", 2000, 0);

    // A small circle comes from above and leaves a square.
    cosmicDiv.circleTo('top', 2500, 3000);

    // A small circle comes from below and leaves a square.
    cosmicDiv.circleTo('bottom', 2500, 3000);

    /**
     * Appear.
    */

    // It only appears from a broadcast.
    cosmicDiv.appear(1300, 0);
    
    // Appears from a blur towards the specified direction.
    cosmicDiv.appearTo("top", 1300, 0);
    cosmicDiv.appearTo("right", 1300, 0);
    cosmicDiv.appearTo("bottom", 1300, 0);
    cosmicDiv.appearTo("left", 1300, 0);

    /**
     * Fade out.
    */

    // It just disappears.
    cosmicDiv.fadeOut(1300, 0);
    
    // Disappears into a blur in the specified direction.
    cosmicDiv.fadeOutTo("top", 1300, 0);
    cosmicDiv.fadeOutTo("right", 1300, 0);
    cosmicDiv.fadeOutTo("bottom", 1300, 0);
    cosmicDiv.fadeOutTo("left", 1300, 0);

    // The element appears from top to bottom, and after a moment it is hidden again.
    cosmicDiv.appearAndFadeOut(1300, 0);

    /**
     * Fade out by letters.
    */

    /* The letters of a text disappear one by one, receive by parameters: 
        --- Pixel spacing of text spaces.
        --- Time in which each letter disappears. */
    cosmicDiv.fadeOutLetters(6, 100);

    // The text of the element disappears letter by letter towards a specified direction.
    cosmicDiv.fadeOutLettersTo("top", 6, 100);
    cosmicDiv.fadeOutLettersTo("right", 6, 100);
    cosmicDiv.fadeOutLettersTo("bottom", 6, 100);
    cosmicDiv.fadeOutLettersTo("left", 6, 100);

    // The text disappears letter by letter to random addresses: ["top", "right", "bottom", "left", "center"].
    cosmicDiv.fadeOutLettersRandom(6, 100);

    /**
     * Scale.
    */

    // Increase from a minimum scale to its normal scale.
    cosmicDiv.increment(2000, 0);

    // It increases from a minimum scale to its normal scale and at the end gives a pulse.
    cosmicDiv.incrementPulse(2000, 0);

    // Give a pulse.
    cosmicDiv.pulse(1000, 0);

    // Alpita indefinitely increases and decreases its scale slightly.
    cosmicDiv.palpite(3000, 0);
```

# When (ending) and (restarting) animation

We have a few methods to finish the animation.

## (terminate) Method

```js
    // The time will be (x2) since the animation is repeated twice.
    cosmicDiv.animation.iterationCount = 2;

    // We use a prefabricated animation.
    cosmicDiv.spiralTo("right");

    // We run the animation.
    cosmicDiv.execute();

    /* The (terminate) method is executed only when the animation ends, receive by parameter: 
        --- A callback that is executed when the animation ends. */
    cosmicDiv.terminate(function(){
        console.info("The animation is over");
    });
```

## (deleteAnimation) Method

You can clean up all the animations you put in the element and the DOM.

```js
    const cosmicDiv = new CosmicAnimation(".my-element");
    cosmicDiv.animation.iterationCount = 2;
    cosmicDiv.spiralTo("right");
    cosmicDiv.execute();

    // When the animation ends.
    cosmicDiv.terminate(function(){
        // We clean up the element animations.
        cosmicDiv.deleteAnimation();
        // New animations and we run.
        cosmicDiv.spiralTo("left");
        cosmicDiv.execute();
    });
```

## Multiple animation

You can manipulate the element as many times as you want, clean up animations and define new animations.

```js
    const cosmicDiv = new CosmicAnimation("#idOne");

    // First animations.
    cosmicDiv.animation.iterationCount = 2;
    cosmicDiv.spiralTo("right");
    cosmicDiv.execute();

    // At the end of the animation.
    cosmicDiv.terminate(function(){
        
        // Second animation.
        cosmicDiv.deleteAnimation();
        cosmicDiv.spiralTo("left");
        cosmicDiv.execute();

        cosmicDiv.terminate(() => {
            // Third animation.
            cosmicDiv.deleteAnimation();
            cosmicDiv.increment();
            cosmicDiv.execute();

            cosmicDiv.terminate(() => {
                // Fourth animation.
                cosmicDiv.deleteAnimation();
                cosmicDiv.incrementPulse();
                cosmicDiv.execute();

                cosmicDiv.terminate(function(){
                    console.info("The last animation is cleared.");
                });		
            });
        });
    });
```