import {User} from "../user/user.entity";
import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
// import {Vote} from "../vote/vote.entity";


@Entity(
    // {orderBy: { upVote: 'DESC'}}
)
export class Quote {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: true })
    text: string;

    @CreateDateColumn()
    date: Date;

    @OneToOne(() => User, (user) => user.quote)
    @JoinColumn()
    user: User;
//
//     @OneToMany(() => Vote, (vote) => vote.user)
//     votes: Vote[];
// //
//     // @Column({ nullable: true })
//     // votes: number;
//
//     @Column({ nullable: true })
//     upVote?: number;
//
//     @Column({ nullable: true })
//     downVote?: number;
//
//     @OneToOne(() => User)
//     @JoinColumn()
//     user: User;
//
//     @ManyToMany(() => User, (user) => user.upVoted, {
//         cascade: true,
//     })
//     @JoinTable()
//     usersUpVoted: User[];
//
//     @ManyToMany(() => User, (user) => user.downVoted, {
//         cascade: true,
//     })
//     @JoinTable()
//     usersDownVoted: User[];
}