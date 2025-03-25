/**
 * Constants
 */

const API_SIMULATION_DELAY = 250;

/**
 * `Delay response` util.
 */

export const delayResponse = (duration = API_SIMULATION_DELAY) =>
	new Promise((resolve) => setTimeout(resolve, duration));
