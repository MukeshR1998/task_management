import { BaseEntity } from 'src/common/entity/baseEntity';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('candidate')
export class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CandidateID: number;

  @Column()
  CandidateName: string;

  @Column()
  AGE_YR: number;

  @Column()
  Gender: string;

  @Column()
  PoliticalPartyName: string;

  @Column()
  SYMBOLCODE: number;

  @Column()
  SymbolName: string;

  @Column()
  CTZDIST: string;

  @Column()
  DistrictName: string;

  @Column()
  StateName: string;

  @Column()
  STATE_ID: number;

  @Column()
  SCConstID: number;

  @Column()
  ConstName: number;

  @Column()
  TotalVoteReceived: number;

  @Column()
  R: number;

  @Column({ type: 'varchar', nullable: true })
  E_STATUS: string | null;

  @Column()
  DOB: number;

  @Column()
  FATHER_NAME: string;

  @Column()
  SPOUCE_NAME: string;

  @Column()
  QUALIFICATION: string;

  @Column()
  NAMEOFINST: string;

  @Column()
  EXPERIENCE: string;

  @Column()
  OTHERDETAILS: string;

  @Column()
  ADDRESS: string;

  @Column()
  PROFILE_IMAGE: string;

  @Column()
  PARTY_LOGO: string;
}
