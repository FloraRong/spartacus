export interface BodyModel {
    sex: Sex;
    size: BodySize;
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
    size: BodySize.INVERTED_TRIANGLE
};

