export interface BodyModel {
    sex: Sex;
    size: BodySize;
    age?: number;
    height?: number;
    weight?: number;
}

export enum Sex {
    MALE= 'Male',
    FEMALE = 'Female',
    UNKNOWN = 'Unknown'
}

export enum BodySize {
    RECTANGLE = 'Rectangle',
    PEAR = 'Pear',
    INVERTED_TRIANGLE = 'InvertedTriangle',
    HOURGLASS = 'Hourglass',
    ROUND = 'Round'
}


export const DefaultModel: BodyModel = {
    sex: Sex.FEMALE,
    age: 21,
    height: 165,
    weight: 48,
    size: BodySize.PEAR
};

