import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function GET() {
    //32-hex
    const nonce = crypto.randomBytes(16).toString('hex');

    return NextResponse.json({ nonce });
}