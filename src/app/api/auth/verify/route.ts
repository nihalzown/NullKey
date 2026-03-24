import { NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';

export async function POST(request: Request) {
  try {
    const { message, signature } = await request.json();
    
    // Reconstruct the message object using the SIWE standard
    const siweMessage = new SiweMessage(message);

    // Verify the cryptographic signature against the data
    const { data, success } = await siweMessage.verify({ signature });

    if (success) {
      // Identity proven. In Phase 3, we will generate the session token here.
      return NextResponse.json({ verified: true, address: data.address });
    } else {
      return NextResponse.json({ verified: false, error: "Invalid signature" }, { status: 401 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ verified: false, error: "Server error" }, { status: 500 });
  }
}