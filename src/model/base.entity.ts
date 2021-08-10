import { PrimaryGeneratedColumn, Index, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
    
    @ApiProperty({ description: 'UUID элемент'})
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({ description: 'Родительский UUID'})
    @Index()
    @Column({ type: 'varchar', length: 300, default: '' })
    pid: string;

    @ApiProperty({ description: 'Is active элемент'})
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Is archived элемент'})
    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @ApiProperty({ description: 'Date create элемент'})
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @ApiProperty({ description: 'UUID создание пользователя'})
    @Column({ type: 'varchar', length: 300, default: '' })
    createdBy: string;

    @ApiProperty({ description: 'Date changed элемент'})
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @ApiProperty({ description: 'UUID обновление пользователя'})
    @Column({ type: 'varchar', length: 300, default: '' })
    lastChangedBy: string;

    @ApiProperty({ description: 'Comments'})
    @Column({ type: 'json', nullable: true })
    internalComment: string | null;

}
