import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : string;

    @Column({ nullable: true })
    first_name : string;

    @Column({ nullable: true })
    last_name : string;

    @Column({ unique: true })
    email : string;

    @Column()
    @Exclude()
    password : string

    @Column({ nullable: true, default: null })
    @Exclude()
    refresh_token : string
}