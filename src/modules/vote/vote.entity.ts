import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../user/user.entity";
import {Quote} from "../quote/quote.entity";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    value : boolean

    @ManyToOne(() => Quote, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'quote_id' })
    quote : Quote

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User
}