// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import {
//   LogOut,
//   Users,
//   TrendingUp,
//   Coins,
//   Copy,
//   Check,
//   ShoppingBag,
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { api } from '../../lib/api';
// import StatsCard from '../../components/StatsCard';
// import { useAuthStore } from '../../store/useAuthStore';
// import ReferralList from '../../components/ReferralList';
// import PurchaseModal from '../../components/PurchaseModal';
// import { useDashboardStore } from '../../store/useDashboardStore';

// export default function Dashboard() {
//   const router = useRouter();
//   const { user, logout, fetchProfile, updateCredits } = useAuthStore();
//   const { stats, referrals, fetchDashboard, fetchReferrals } = useDashboardStore();

//   const [copied, setCopied] = useState(false);
//   const [showPurchaseModal, setShowPurchaseModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!api.isAuthenticated()) {
//       router.push('/login');
//       return;
//     }

//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       await Promise.all([fetchProfile(), fetchDashboard(), fetchReferrals()]);
//     } catch (error) {
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCopyLink = () => {
//     if (stats?.referralLink) {
//       navigator.clipboard.writeText(stats.referralLink);
//       setCopied(true);
//       toast.success('Referral link copied!');
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   const handlePurchaseSuccess = async () => {
//     await loadData();
//     setShowPurchaseModal(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gradient">ReferralHub</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">Welcome back,</p>
//                 <p className="font-semibold text-gray-900">{user?.name}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 title="Logout"
//               >
//                 <LogOut className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
//         >
//           <StatsCard
//             icon={Users}
//             title="Total Referrals"
//             value={stats?.totalReferrals || 0}
//             color="blue"
//             delay={0}
//           />
//           <StatsCard
//             icon={TrendingUp}
//             title="Converted Referrals"
//             value={stats?.convertedReferrals || 0}
//             color="green"
//             delay={0.1}
//           />
//           <StatsCard
//             icon={Coins}
//             title="Total Credits"
//             value={stats?.totalCredits || 0}
//             color="purple"
//             delay={0.2}
//           />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="card mb-8"
//         >
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold mb-2">Your Referral Link</h3>
//               <div className="flex items-center gap-2">
//                 <code className="flex-1 px-4 py-3 bg-gray-50 rounded-lg text-sm font-mono text-gray-700 border border-gray-200">
//                   {stats?.referralLink}
//                 </code>
//                 <button
//                   onClick={handleCopyLink}
//                   className="btn-secondary flex items-center gap-2 whitespace-nowrap"
//                 >
//                   {copied ? (
//                     <>
//                       <Check className="w-4 h-4" />
//                       Copied!
//                     </>
//                   ) : (
//                     <>
//                       <Copy className="w-4 h-4" />
//                       Copy
//                     </>
//                   )}
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">
//                 Share this link to earn credits when your referrals make their first
//                 purchase
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mb-8"
//         >
//           <button
//             onClick={() => setShowPurchaseModal(true)}
//             className="btn-primary w-full md:w-auto flex items-center gap-2 justify-center"
//           >
//             <ShoppingBag className="w-5 h-5" />
//             Make a Purchase
//           </button>
//         </motion.div>

//         <ReferralList referrals={referrals} />
//       </main>

//       {showPurchaseModal && (
//         <PurchaseModal
//           onClose={() => setShowPurchaseModal(false)}
//           onSuccess={handlePurchaseSuccess}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StatsCard from '@/components/StatsCard';
import { useAuthStore } from '@/store/useAuthStore';
import ReferralList from '@/components/ReferralList';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Users, TrendingUp, Coins, Copy, Check, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user, fetchProfile } = useAuthStore();
  const { stats, referrals, fetchDashboard, fetchReferrals } = useDashboardStore();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([fetchProfile(), fetchDashboard(), fetchReferrals()]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (stats?.referralLink) {
      navigator.clipboard.writeText(stats.referralLink);
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Referral Dashboard</h1>
            <p className="text-gray-600">Track your referrals and earn credits</p>
          </div>
          <Link href="/">
            <button className="btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            icon={Users}
            title="Total Referrals"
            value={stats?.totalReferrals || 0}
            color="blue"
            delay={0}
          />
          <StatsCard
            icon={TrendingUp}
            title="Converted Referrals"
            value={stats?.convertedReferrals || 0}
            color="green"
            delay={0.1}
          />
          <StatsCard
            icon={Coins}
            title="Total Credits"
            value={stats?.totalCredits || 0}
            color="purple"
            delay={0.2}
          />
        </motion.div>

        {/* Referral Link Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Your Referral Link</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-3 bg-gray-50 rounded-lg text-sm font-mono text-gray-700 border border-gray-200">
                  {stats?.referralLink}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="btn-secondary flex items-center gap-2 whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Share this link to earn credits when your referrals make their first
                purchase
              </p>
            </div>
          </div>
        </motion.div>

        {/* Referrals List */}
        <ReferralList referrals={referrals} />
      </main>
    </div>
  );
}