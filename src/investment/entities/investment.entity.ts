import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('investment')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column({ name: 'investment_type', length: 40, nullable: false })
  public investimentType: string;
  @Column({ name: 'assetname', length: 40, nullable: false })
  public assetName: string;
  @Column({ name: 'asset_id', nullable: false })
  public assetId: string;
  @Column({ nullable: false })
  public quantity: number;
  @Column({ name: 'account_id', nullable: false })
  public accountid: string;
  @Column({ name: 'totalamount', nullable: false })
  public totalAmount: number;
  @Column({ name: 'currency', nullable: false, length: 5 })
  public currency: string;
  @CreateDateColumn({ name: 'createdat', nullable: false })
  public createdAt: Date;
}
