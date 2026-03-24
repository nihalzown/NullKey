// src/app/api/auth/nonce/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  // Generate a random 32-character hexadecimal
  const nonce = crypto.randomBytes(16).toString('hex');
  
  return NextResponse.json({ nonce });
}