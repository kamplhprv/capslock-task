/**
 * Default options for the loader.
 * @typedef {Object} Options
 * @property {string|null} url - The URL to fetch data from.
 * @property {HTMLElement|null} shapeToMove - The shape (div element) to move.
 * @property {number} delayInMs - Delay in milliseconds before starting movement.
 * @property {number} moveDurationInMs - Duration in milliseconds for the movement.
 */
const defaultOpts = {
    url: null,
    shapeToMove: null,
    delayInMs: 1000,
    moveDurationInMs: 1000
}

/**
 * Creates a square shape (div element) with specified size and background color.
 * @param {number} [pxSize=100] - The size of the square in pixels.
 * @param {string} [defaultBgColor='black'] - The default background color of the square.
 * @returns {HTMLElement} The created square div element.
 */
function createSquare(pxSize = 100, defaultBgColor = 'black') {
    const shape = document.createElement('div');

    shape.style.width = `${pxSize}px`;
    shape.style.height = `${pxSize}px`;
    
    shape.style.position = 'absolute';
    shape.style.top = '0px';
    shape.style.left = '0px';

    shape.style.backgroundColor = defaultBgColor;

    return shape;
}

/**
 * Validates if the shape is created and exists within the DOM.
 * @param {HTMLElement} shape - The shape (div element) to validate.
 * @returns {boolean} True if the shape is in the DOM, false otherwise.
 */
function validateShape(shape) {
    // check if shape is created and exist within DOM
    if (!shape) {
        console.error('Shape is null or undefined.');
        return false;
    }

    return document.body.contains(shape);
}


/**
 * Sets the position of the shape by adjusting the left CSS property.
 * @param {HTMLElement} shapeToMove - The shape (div element) to move.
 * @param {number} progress - The progress of the movement (value between 0 and 1).
 */
function setShapePostion(shapeToMove, progress = 0) {
    shapeToMove.style.left = `${progress * 100}px`;
}

/**
 * Fetches data from the provided URL and returns the response text.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<[string|null, Error|null]>} A promise that resolves to an array containing the response text and an error (if any).
 */
async function handleFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response was not ok');
        }
        return [await response.text(), null];
    } catch (error) {
        return [null, error];
    }
}

/**
 * Creates a background color manager that assigns different colors based on the value.
 * @returns {Object} An object with a method to apply the background color to a shape.
 */
function createBgColorManager() {
    const shapeBgColor = Object.freeze({
        default: 'black',
        progress: 'blue',
        complete: 'green',
        error: 'red'
    });

    function getBgColor(value = -1) {
        switch (+value) {
            case 0:
                return shapeBgColor.progress;
            case 1:
                return shapeBgColor.complete;
            default:
                return shapeBgColor.error;
        }
    }

    return {
        /**
         * Applies a background color based on the provided value.
         * @param {number|string} value - The value to determine the background color.
         * @param {HTMLElement} shapeToMove - The shape (div element) to change the background color.
         */
        applyBgColor(value = -1, shapeToMove) {
            const color = getBgColor(value);
            shapeToMove.style.backgroundColor = color;
        }
    };
}

/**
 * Moves the shape across the screen and fetches data once the movement is complete.
 * @param {Options} opts - The options for the movement and fetching.
 */
async function move(opts) {
    if(!opts.shapeToMove) {
        console.error('In order to move shape you have to provide it.');
        return;
    }

    setTimeout(() => {
        const startTime = Date.now();
        const fetchPromise = handleFetch(opts.url);
        const bgColorManager = createBgColorManager();

        function animate() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / opts.moveDurationInMs, 1);

            setShapePostion(opts.shapeToMove, progress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                fetchPromise
                    .then(([fetchResult, fetchError]) => bgColorManager
                        .applyBgColor(fetchResult || fetchError, opts.shapeToMove));
            }
        }

        requestAnimationFrame(animate);

    }, opts.delayInMs);
}

/**
 * Appends the shape to the DOM and starts its movement.
 * @param {HTMLElement} shapeToMove - The shape (div element) to append and move.
 */
function appendShape(shapeToMove) {
    document.body.appendChild(shapeToMove);

    if (!shapeToMove || !validateShape(shapeToMove)) {
        console.error('Shape was not found within a DOM.');
        return;
    }
}

/**
 * Initializes the loader with the specified URL and starts the loading process.
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} An object with a method to start the loader.
 */
function initializeLoader(url) {
    const opts = {
        ...defaultOpts,
        shapeToMove: createSquare(),
        url,
    };

    function startLoader() {
        appendShape(opts.shapeToMove);
        move(opts);
    }

    return { startLoader };
}

export { initializeLoader };