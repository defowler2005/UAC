import { world } from '@minecraft/server';

/**
 * A class for interacting with a Dynamic properties.
 * @class
 */

export class databaseBuilder {
    /**
     * Constructs a new databaseBuilder instance.
     * @constructor
     */
    constructor() { };

    /**
     * Sets a dynamic property in the  world.
     * @param {string} key - The key for the dynamic property.
     * @param {number|boolean|string} value - The value to be stored.
     */
    set(key, value) {
        try {
            //console.warn(`Set ${key} to ${value}`)
            world.setDynamicProperty(`${key}`, value === null ? 0 : value);
        } catch (error) {
            console.warn(`An error occured while setting dynamic property in database: ${error}\n${error.stack}`)
        }
    }

    /**
     * Gets the value of a dynamic property from the  world.
     * @param {string} key - The key for the dynamic property.
     * @returns {number|boolean|string|null} The value of the dynamic property, or null if it doesn't exist.
     */
    get(key) {
        if (!world.getDynamicProperty(key)) {
            //console.warn(`Dynamic property: ${key} does not exist!`);
            world.setDynamicProperty(key, 0);
            return 0;
        }; return world.getDynamicProperty(key);
    }

    /**
     * Deletes a dynamic property from the  world.
     * @param {string} key - The key for the dynamic property.
     */
    delete(key) {
        if (!world.getDynamicProperty(key)) return console.warn(`Dynamic property: ${key} does not exist!`);
    }
};

export const Database = new databaseBuilder();