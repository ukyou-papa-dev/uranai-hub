import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export type TrialBucket = 'A' | 'B';

export function getTrialBucketFromCookies(cookieStore: any): TrialBucket {
  const trialCookie = cookieStore.get('kc_trial');
  const bucket = trialCookie?.value;
  
  if (bucket === 'A' || bucket === 'B') {
    return bucket;
  }
  
  // デフォルトはA（通常はmiddlewareで設定されるため、ここは到達しない想定）
  return 'A';
}

export function assignTrialIfMissing(
  req: NextRequest, 
  res: NextResponse
): NextResponse {
  const existingTrial = req.cookies.get('kc_trial');
  
  if (!existingTrial) {
    // 50/50でA/Bを振り分け
    const bucket: TrialBucket = Math.random() < 0.5 ? 'A' : 'B';
    
    res.cookies.set('kc_trial', bucket, {
      maxAge: 31536000, // 1年 (365日 * 24時間 * 3600秒)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: false // フロントエンドからも読み取り可能
    });
  }
  
  return res;
}
