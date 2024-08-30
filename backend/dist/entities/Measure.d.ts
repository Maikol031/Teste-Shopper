import { Customer } from './Customer';
export interface MeasureProps {
    customer: Customer;
    value: number;
    imageUrl: string;
    type: 'WATER' | 'GAS';
    hasConfirmed: boolean;
    createdAt: Date;
}
export declare class Measure {
    private Id;
    private Customer;
    private Value;
    private ImageUrl;
    private Type;
    private HasConfirmed?;
    private CreatedAt;
    constructor(props: MeasureProps, id?: string);
    get id(): string;
    get customer(): Customer;
    get value(): number;
    get imageUrl(): string;
    get type(): "WATER" | "GAS";
    get hasConfirmed(): boolean | undefined;
    get createdAt(): Date;
}
//# sourceMappingURL=Measure.d.ts.map