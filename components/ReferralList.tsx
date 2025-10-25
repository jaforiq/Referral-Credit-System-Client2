import { Referral } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, User } from 'lucide-react';

interface ReferralListProps {
  referrals: Referral[];
}

export default function ReferralList({ referrals }: ReferralListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (referrals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card text-center py-12"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Referrals Yet
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Start sharing your referral link to see your referrals here. You'll earn
          credits when they make their first purchase!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card"
    >
      <h2 className="text-2xl font-bold mb-6">Your Referrals</h2>
      <div className="space-y-4">
        {referrals.map((referral, index) => (
          <motion.div
            key={referral._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                {referral.referredId.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {referral.referredId.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {referral.referredId.email}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Joined {formatDate(referral.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {referral.status === 'converted' ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Converted</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Pending</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}