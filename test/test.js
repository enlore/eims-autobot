'use strict'

let AutoBot = require('../index.js')
let assert = require('assert')

describe('AutoBot', function() {
    describe('transform() - no cross-key transforms', function() {
        it('should make a 1-to-1 transform', function() {

            let optimus = new AutoBot()
            optimus.registerTransform('Windshield', toChest)
            optimus.registerTransform('FrontWheels', toArms)
            optimus.registerTransform('BackWheels', toLegs)
            
            function toChest(truck, key, windshield) {
                return {
                    Chest: windshield
                }
            }
            
            function toArms(truck, key, frontWheels) {
                return {
                    Arms: frontWheels
                }
            }
            
            function toLegs(truck, key, backWheels) {
                return {
                    Legs: {
                        Left: backWheels / 2,
                        Right: backWheels / 2
                    }
                }
            }
            
            let truckForm = {
                Windshield: "black tinted",
                FrontWheels: 2,
                BackWheels: 8
            }

            let targetObject = {
                Chest: 'black tinted',
                Arms: 2,
                Legs: {
                    Left: 4,
                    Right: 4
                }
            }

            assert.deepEqual(targetObject, optimus.transform(truckForm))
        })
    })

    describe('transform() - with cross-key transforms', function() {
        it('should be able to save nested values from transforms into the same property', function() {

            let bumblebee = new AutoBot()
            bumblebee.registerTransform('Radio', toVoiceBox) 
            bumblebee.registerTransform('FrontWheels', toArms)
            bumblebee.registerTransform('BackWheels', toLegs)

            function toVoiceBox(car, key, radio) {
                return {
                    VoiceBox: radio
                }
            }

            // The following two transforms save data nested within an 'Appendages' property
            function toArms(car, key, frontWheels) {
                return {
                    Appendages: {
                        Arms: frontWheels
                    }
                }
            }

            function toLegs(car, key, backWheels) {
                return {
                    Appendages: {
                        Legs: backWheels
                    }
                }
            }

            let carForm = {
                Radio: 'Bluetooth Touchscreen Car Radio',
                FrontWheels: 2,
                BackWheels: 2
            }

            let targetObject = {
                VoiceBox: 'Bluetooth Touchscreen Car Radio',
                Appendages: {
                    Arms: 2,
                    Legs: 2
                }
            }

            assert.deepEqual(targetObject, bumblebee.transform(carForm))
        })
    })
})
