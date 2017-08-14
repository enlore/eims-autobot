# Autobot

> A member of the EIMS family of utilties

Define a set of transform functions that consume properties on an imcoming
object and transform their keys/values however you like, ultimately compiling
a new object coming out the other end.

## Usage Example

    let autobot = new AutoBot()

    // lowercase key named id
    autobot.registerTransform('Id', renameId)

    function renameId (obj, key, val) {
        return {
            [key.toLowerCase()]: val
        }
    }

    // map integer status codes to status strings
    autobot.registerTransform('StatusCode', mapStatuses)

    function mapStatuses (obj, key, val) {
        const statusMap = {
            1: 'burning',
            2: 'serisously its burning',
            3: 'on fire holy crap',
            4: 'ash'
        }

        return {
            'status': statusMap[val] || 'no status'
        }
    }

    const items = [
        { 'Id': 'aodfoauisdofu', status: 4 },
        { 'Id': 'dkfasdfu', status: 2 }
    ]

    let newItems = items.map(autobot.transform)
