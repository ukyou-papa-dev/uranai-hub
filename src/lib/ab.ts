import { NextRequest, NextResponse } from 'next/server';

export type TrialBucket = 'A' | 'B';

export function getTrialBucketFromCookies( cookieStore: { get(name: string): { value: string } | undefined } ): TrialBucket { const v = cookieStore.get('kc_trial')?.value; return v === 'A' || v === 'B' ? v : 'A'; }

export function assignTrialIfMissing( req: NextRequest, res: NextResponse ): NextResponse { const exists = req.cookies.get('kc_trial'); if (!exists) { const bucket: TrialBucket = Math.random() < 0.5 ? 'A' : 'B'; res.cookies.set('kc_trial', bucket, { maxAge: 31536000, // 365日（秒） secure: process.env.NODE_ENV === 'production', sameSite: 'lax', httpOnly: false, path: '/', }); } return res; }
