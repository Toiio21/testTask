import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'hotels' })
export class Item extends BaseEntity {

  @ApiProperty({ description: 'Position number of storeys'})
  @Column({ type: 'smallint', default: 0 })
  storeys: number;
    
  @ApiProperty({ description: 'Name элемент'})
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ApiProperty({ description: 'Description элемент'})
  @Column({ type: 'varchar', length: 300, default: '' })
  description: string;

  @ApiProperty({ description: 'Is booked элемент'})
  @Column({ type: 'smallint', default: 0 })
  isBooked: number;

  @ApiProperty({ description: 'Attributes элемент'})
  @Column({ type: 'json', default: [], nullable: false })
  attributes: string;
    
  @ApiProperty({ description: 'Points plan-scheme'})
  @Column({ type: 'json', default: [], nullable: false })
  points: string;

  @ApiProperty({ description: 'Plan-Scheme'})
  @Column({ type: 'text', default: ''  })
  plan: string;

}
