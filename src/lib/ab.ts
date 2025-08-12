import { NextRequest, NextResponse } from 'next/server'

export type TrialBucket = 'A' | 'B'

// 最小のCookieStore型（no-explicit-any回避）
type CookieStore = {
  get(name: string): { value: string } | undefined
}

export function getTrialBucketFromCookies(cookieStore: CookieStore): TrialBucket {
  const trialCookie = cookieStore.get('kc_trial')
  const bucket = trialCookie?.value
  if (bucket === 'A' || bucket === 'B') return bucket
  return 'A'
}

export function assignTrialIfMissing(req: NextRequest, res: NextResponse): NextResponse {
  const existingTrial = req.cookies.get('kc_trial')
  if (!existingTrial) {
    const bucket: TrialBucket = Math.random() < 0.5 ? 'A' : 'B'
    res.cookies.set('kc_trial', bucket, {
      maxAge: 31536000, // 365日
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: false,
      path: '/',
    })
  }
  return res
}
