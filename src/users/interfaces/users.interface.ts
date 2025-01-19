export interface Users extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
}