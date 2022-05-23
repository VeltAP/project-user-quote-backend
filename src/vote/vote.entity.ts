// import {Column, Entity, ManyToOne} from "typeorm";
// import {User} from "../user/user.entity";
// import {Quote} from "../quote/quote.entity";
//
// Entity()
// export class Vote {
//     @ManyToOne(() => User, (user) => user.votes, { primary: true })
//     user: User;
//
//     @ManyToOne(() => Quote, (quote) => quote.votes, { primary: true })
//     quote: Quote;
//
//     @Column({ type: 'smallint' })
//     vote: number;
// }