import { ObjectId } from "mongodb"

export const compareObj = (array: any, oId: any) => {
    for (let obj of array) {
        if (obj.valueOf() == oId.valueOf()) {
            return true
        }
        }

    return false
    }

