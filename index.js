/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

class AutoBot {
    // TODO no dupe keys flag/warning
    constructor () {
        this.transforms = {}
    }

    registerTransform (key, transformer) {
        this.transforms[key] = transformer
    }

    transform (entity) {
        let newEntity = {}

        for (let key in this.transforms) {
            let transform = this.transforms[key]

            // forward key as is
            if (transform === null) {
                newEntity[key] = entity[key]

            // or run a transform function on it
            } else {
                // all transforms are registered by the old key
                // all transforms return { newKey: newVal }
                // thus the new object is composed of the correct key names with
                // data extracted from old key names
                let res = transform(entity, key, entity[key])
                Object.assign(newEntity, res)
            }
        }

        return newEntity
    }
}

module.exports = AutoBot
