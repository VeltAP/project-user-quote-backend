import {
    Column,
    Entity, OneToMany, OneToOne,
    // ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Exclude} from "class-transformer";
import {Quote} from "../quote/quote.entity";
// import {Vote} from "../vote/vote.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    // @Exclude()
    password: string;

    @OneToOne(() => Quote, (quote) => quote.user)
    quote: Quote;
    //
    // @OneToMany(() => Vote, (vote) => vote.quote)
    // votes: Vote[];

    // @Column(
    //     // "int", { array: true, default: {} }
    // )
    // upVotes: Number[];
    //
    // @Column(
    //     // "int", { array: true, default: {} }
    // )
    // downVotes: Number[];

    // @ManyToMany(() => Quote, (quote) => quote.usersUpVoted)
    // upVoted: Quote;
    //
    // @ManyToMany(() => Quote, (quote) => quote.usersDownVoted)
    // downVoted: Quote;

}