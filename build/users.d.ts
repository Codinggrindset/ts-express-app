import mongoose from "mongoose";
declare const User: mongoose.Model<{
    name: string;
    email: string;
    registerDate: NativeDate;
    googleId?: string | null;
    password?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    registerDate: NativeDate;
    googleId?: string | null;
    password?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    email: string;
    registerDate: NativeDate;
    googleId?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    registerDate: NativeDate;
    googleId?: string | null;
    password?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    registerDate: NativeDate;
    googleId?: string | null;
    password?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    email: string;
    registerDate: NativeDate;
    googleId?: string | null;
    password?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { User };
//# sourceMappingURL=users.d.ts.map