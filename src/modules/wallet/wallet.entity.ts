/* eslint-disable import/prefer-default-export */
import { IsOptional, IsString } from 'class-validator';

export class createWalletBody {
  @IsString()
  name: string;

  @IsOptional()
  description: string;
}
