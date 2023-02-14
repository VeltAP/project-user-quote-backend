import {User} from "../user/user.entity";
import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";
// import {Vote} from "../vote/vote.entity";


@Entity(
    // {orderBy: { upVote: 'DESC'}}
)
export class Quote {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({default: 0})
    karma: number;

    @Column({ nullable: true })
    text: string;

    @CreateDateColumn()
    posted_date: Timestamp;

    @OneToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User
}