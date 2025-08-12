import { cookies } from 'next/headers';
import { getTrialBucketFromCookies } from '@/lib/ab';

export default function TrialPage() {
  const cookieStore = cookies();
  const bucket = getTrialBucketFromCookies(cookieStore);
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">A/B Trial Test</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-xl">
          You are in bucket: <strong className="text-blue-600">{bucket}</strong>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          このバケット情報は1年間Cookieに保存されます
        </p>
      </div>
    </div>
  );
}
