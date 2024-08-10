export interface Output<T> {
    code: string;
    message: string;
    data?: T;
}