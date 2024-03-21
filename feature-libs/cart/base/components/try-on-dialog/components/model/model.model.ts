export interface BodyModel {
    sex: Sex;
    size: BodySize;
}

export enum Sex {
    MALE= 'Male',
    FEMALE = 'Female'
}

export enum BodySize {
    THIN = 'Thin',
    MEDIUM = 'Medium',
    FAT = 'Fat'
}


export const DefaultModel: BodyModel = {
    sex: Sex.FEMALE,
    size: BodySize.MEDIUM
};

