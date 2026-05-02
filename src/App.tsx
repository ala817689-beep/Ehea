/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Menu, 
  X, 
  ChevronRight, 
  User, 
  Wrench, 
  Hammer, 
  Truck, 
  Calculator, 
  Car,
  Image as ImageIcon,
  LogOut,
  CreditCard,
  Plus
} from 'lucide-react';
import { CATEGORIES, PROVINCES } from './constants';

type View = 'landing' | 'search' | 'profile' | 'register' | 'login' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('بغداد');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // To be replaced with Firebase Auth

  // Theme Colors
  const primaryColor = "#B08D57"; // Golden/Arabic Sand
  const secondaryColor = "#1A202C"; // Deep charcoal

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingView setView={setView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince} />;
      case 'search':
        return <SearchView setView={setView} searchQuery={searchQuery} province={selectedProvince} />;
      case 'profile':
        return <ProfileView setView={setView} />;
      case 'register':
        return <RegisterView setView={setView} />;
      case 'login':
        return <LoginView setView={setView} setUser={setUser} />;
      case 'dashboard':
        return <DashboardView setView={setView} user={user} />;
      default:
        return <LandingView setView={setView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans flex flex-col" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="bg-[#B08D57] p-1.5 rounded-lg">
            <Wrench className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#1A202C]">ماهر <span className="text-[#B08D57]">العراق</span></h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => setView('landing')} className="text-sm font-medium hover:text-[#B08D57] transition-colors">الرئيسية</button>
          <button onClick={() => setView('search')} className="text-sm font-medium hover:text-[#B08D57] transition-colors">البحث</button>
          {user ? (
            <button onClick={() => setView('dashboard')} className="text-sm font-medium hover:text-[#B08D57] transition-colors">لوحة التحكم</button>
          ) : (
            <button onClick={() => setView('login')} className="bg-[#1A202C] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">دخول المهنيين</button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-14 left-0 right-0 bg-white border-b border-gray-100 z-40 p-4 flex flex-col gap-4 shadow-lg"
          >
            <button onClick={() => { setView('landing'); setIsMenuOpen(false); }} className="text-right py-2 border-b border-gray-50">الرئيسية</button>
            <button onClick={() => { setView('search'); setIsMenuOpen(false); }} className="text-right py-2 border-b border-gray-50">البحث</button>
            {user ? (
              <button onClick={() => { setView('dashboard'); setIsMenuOpen(false); }} className="text-right py-2 border-b border-gray-50">لوحة التحكم</button>
            ) : (
              <button onClick={() => { setView('login'); setIsMenuOpen(false); }} className="text-right py-2">دخول المهنيين</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-[#1A202C] text-white/70 py-8 px-4 text-center mt-12">
        <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Wrench className="text-[#B08D57] w-6 h-6" />
            <h2 className="text-xl font-bold text-white italic">ماهر العراق</h2>
          </div>
          <p className="text-sm max-w-md">أكبر منصة تجمع المهنيين والحرفيين المهرة في العراق. ابحث عن الأسطى المناسب وصنّع مستقبلك.</p>
          <div className="flex gap-4 mt-4">
            <span className="text-xs">© 2026 جميع الحقوق محفوظة</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-Views ---

function LandingView({ setView, searchQuery, setSearchQuery, selectedProvince, setSelectedProvince }: any) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#1A202C] z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C] via-transparent to-[#1A202C]/50 z-10Opacity-70"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B08D57_1px,transparent_1px)] [background-size:20px_20px] shadow-inner"></div>
        </div>
        
        <div className="relative z-20 max-w-3xl w-full flex flex-col items-center gap-6">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight"
          >
            الأسطى المظبوط <br/><span className="text-[#B08D57]">بضغطة زر وحدة</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-lg"
          >
            تعبت وأنت تدور على مصلح أو فني ثقة؟ ماهر العراق يجمع لك أحسن العمال والمهنيين بمنطقتك.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2 mt-4"
          >
            <div className="flex-grow flex items-center px-4 gap-2 border-b md:border-b-0 md:border-l border-gray-100 py-2">
              <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="شنو محتاج؟ (مثلاً مصلح ثلاجات، صباغ...)" 
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center px-4 gap-2 py-2 min-w-[150px]">
              <MapPin className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <select 
                className="bg-transparent outline-none text-gray-800 appearance-none w-full text-right"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button 
              onClick={() => setView('search')}
              className="bg-[#B08D57] text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all flex-shrink-0"
            >
              بحث
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#B08D57] text-xs font-bold uppercase tracking-widest block mb-1">تصفح الخدمات</span>
            <h3 className="text-3xl font-bold text-[#1A202C]">التصنيفات الرئيسية</h3>
          </div>
          <button onClick={() => setView('search')} className="text-sm font-medium text-[#B08D57] flex items-center gap-1 group">
            عرض الكل <ChevronRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => { setSearchQuery(cat.name); setView('search'); }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#B08D57]/30 transition-all cursor-pointer group flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-[#FDFBF7] rounded-2xl flex items-center justify-center text-[#B08D57] group-hover:bg-[#B08D57] group-hover:text-white transition-all">
                {idx === 0 && <Hammer className="w-8 h-8" />}
                {idx === 1 && <Wrench className="w-8 h-8" />}
                {idx === 2 && <Car className="w-8 h-8" />}
                {idx === 3 && <Truck className="w-8 h-8" />}
                {idx === 4 && <Calculator className="w-8 h-8" />}
              </div>
              <h4 className="font-bold text-sm text-[#1A202C]">{cat.name}</h4>
              <p className="text-xs text-gray-400">{cat.professions.length} مهنة</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="bg-[#F7F4EF] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#1A202C] mb-4">أفضل المحترفين في {selectedProvince}</h3>
            <p className="text-gray-500">تم اختيارهم بناءً على تقييمات الزبائن الفائقة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <ProfessionalCard key={i} setView={setView} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Professionals */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#1A202C] rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08D57] opacity-20 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h3 className="text-3xl font-bold">أنت أسطى ومحترف؟</h3>
            <p className="text-white/60 max-w-md">سجل معانا اليوم وزيّد زبائنك ودخلك. عمولة بسيطة وخدمة مميزة لدعم كل الحرفيين بالعراق.</p>
            <button 
              onClick={() => setView('register')}
              className="bg-[#B08D57] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
            >
              سجل مهنتك الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfessionalCard({ setView }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={() => setView('profile')}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`} alt="avatar" />
          </div>
          <div>
            <h4 className="font-bold text-lg">أبو علي الحداد</h4>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>المنصور، بغداد</span>
            </div>
          </div>
        </div>
        <div className="bg-[#FDFBF7] px-2 py-1 rounded-lg flex items-center gap-1 border border-[#B08D57]/20">
          <Star className="w-3 h-3 text-[#B08D57] fill-[#B08D57]" />
          <span className="text-xs font-bold text-[#B08D57]">4.9</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <span className="bg-[#F7F4EF] text-[#B08D57] text-[10px] font-bold px-2 py-1 rounded-full border border-[#B08D57]/10 uppercase">حدادة عامة</span>
        <span className="bg-[#F7F4EF] text-[#B08D57] text-[10px] font-bold px-2 py-1 rounded-full border border-[#B08D57]/10 uppercase">تصليح بيبان</span>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2">خبرة أكثر من ١٥ سنة في أعمال الحدادة والنقوش وتصليح الأبواب والشبابيك وبأسعار تنافسية.</p>

      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>(١٢٤ تقييم)</span>
        </div>
        <button className="text-[#B08D57] font-bold text-sm flex items-center gap-1">
          عرض الملف <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function SearchView({ setView, searchQuery, province }: any) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">نتائج البحث عن "{searchQuery || 'الكل'}"</h2>
          <p className="text-gray-500">في محافظة {province}</p>
        </div>
        <div className="flex gap-2">
          {/* Filters could go here */}
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium">الأعلى تقييماً</button>
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium">الأحدث</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <ProfessionalCard key={i} setView={setView} />
        ))}
      </div>
    </div>
  );
}

function ProfileView({ setView }: any) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header/Cover */}
        <div className="h-40 bg-gradient-to-r from-[#1A202C] to-[#2D3748] relative">
          <div className="absolute -bottom-16 right-8 w-32 h-32 bg-white p-2 rounded-[32px] shadow-xl">
             <div className="w-full h-full bg-gray-100 rounded-[28px] overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=abu-ali`} alt="professional" />
             </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#1A202C] mb-1">أبو علي الحداد</h2>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1"><Wrench className="w-4 h-4 text-[#B08D57]" /> حداد</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#B08D57]" /> المنصور، بغداد</span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-[#B08D57]">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="font-bold text-sm">4.9</span>
                <span className="text-gray-400 text-xs">(١٢٤ زبون قيم الخدمة)</span>
              </div>
            </div>
            
            <a 
              href="tel:07701234567" 
              className="w-full md:w-auto bg-[#B08D57] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#B08D57]/20 hover:scale-105 transition-transform"
            >
              <Phone className="w-5 h-5" />
              اتصل الآن
            </a>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#B08D57]" />
                  عن المهني
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  خبرة طويلة في مجال الحدادة المنزلية والإنشائية. متخصص في عمل الأبواب الليزرية، الشبابيك، المحجرات، والدرج الحلزوني. نتميز بالدقة في المواعيد والأسعار المناسبة لجميع مناطق بغداد.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#B08D57]" />
                  صور الأعمال السابقة
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-video bg-gray-100 rounded-2xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer border border-gray-100 shadow-sm">
                      <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-xs">صورة العمل {i}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#B08D57]" />
                  آراء الزبائن
                </h3>
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold">أحمد محمود</span>
                        <span className="text-xs text-gray-400">قبل أسبوع</span>
                      </div>
                      <div className="flex text-[#B08D57] mb-3">
                         {[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 fill-current" />)}
                      </div>
                      <p className="text-sm text-gray-600">شغل نظيف ومرتب ومواعيد دقيقة جداً. أنصح بالتعامل معه.</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-gray-100">
                <h4 className="font-bold mb-4">المهارات والخدمات</h4>
                <div className="flex flex-wrap gap-2">
                  {["حدادة ليزر", "تصليح أقفال", "محجرات درج", "شبابيك ألمنيوم", "لحيم خارجي"].map(s => (
                    <span key={s} className="bg-white text-xs px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterView({ setView }: any) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-black mb-8 text-center">انضم إلى <span className="text-[#B08D57]">ماهر العراق</span></h2>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold pr-2">الاسم الثلاثي واللقب</label>
              <input type="text" className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors" placeholder="محمد علي كاظم" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold pr-2">رقم الهاتف (واتساب)</label>
              <input type="tel" className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors" placeholder="07XXXXXXXX" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold pr-2">المهنة الرئيسية</label>
              <select className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors">
                {CATEGORIES.flatMap(c => c.professions).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold pr-2">المحافظة</label>
              <select className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors">
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold pr-2">المنطقة السكنية</label>
            <input type="text" className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors" placeholder="مثلاً: حي الجامعة، الكرادة..." required />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold pr-2">وصف مختصر لخبراتك</label>
            <textarea className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors min-h-[100px]" placeholder="احكي لنا عن شغلك وخبرتك..."></textarea>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
             <p className="text-xs text-blue-800 leading-relaxed">
               بمجرد التسجيل، أنت توافق على نظام العمولة بنسبة 5% عن كل عمل يتم إتمامه عن طريق التطبيق. يمكنك شحن محفظتك داخل التطبيق لضمان استمرار ظهور خدماتك للزبائن.
             </p>
          </div>

          <button type="submit" className="w-full bg-[#1A202C] text-white p-5 rounded-2xl font-bold hover:bg-opacity-90 transition-all text-lg shadow-xl shadow-[#1A202C]/10">
            إنشاء حساب مهني
          </button>
          
          <p className="text-center text-sm text-gray-400">عنيك حساب؟ <button type="button" onClick={() => setView('login')} className="text-[#B08D57] font-bold">سجل دخول</button></p>
        </form>
      </div>
    </div>
  );
}

function LoginView({ setView, setUser }: any) {
  return (
    <div className="max-w-md mx-auto px-4 py-32">
      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 text-center">
        <h2 className="text-3xl font-black mb-2">تسجيل الدخول</h2>
        <p className="text-gray-400 text-sm mb-8">أهلاً بك مرة ثانية في عالم المحترفين</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setUser({ name: 'أبو علي' }); setView('dashboard'); }}>
          <input type="tel" className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors" placeholder="رقم الهاتف" required />
          <input type="password" className="w-full bg-[#FDFBF7] border border-gray-100 p-4 rounded-2xl outline-none focus:border-[#B08D57] transition-colors" placeholder="كلمة المرور" required />
          <button type="submit" className="w-full bg-[#1A202C] text-white p-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg">
            دخول
          </button>
          <div className="flex flex-col gap-2 mt-6">
            <button type="button" onClick={() => setView('register')} className="text-sm text-gray-500 underline">ماعندي حساب، أريد أسجل</button>
            <button type="button" onClick={() => setView('landing')} className="text-sm text-[#B08D57] font-medium">رجوع للرئيسية</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DashboardView({ setView, user }: any) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=abu-ali`} alt="avatar" />
            </div>
            <h4 className="font-bold text-lg">أبو علي الحداد</h4>
            <p className="text-xs text-gray-400 mt-1">حداد محترف</p>
            <div className="mt-4 flex justify-center gap-1 text-[#B08D57]">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
          </div>
          
          <nav className="flex flex-col gap-1">
             <button className="bg-[#B08D57] text-white p-4 rounded-2xl text-right font-bold flex items-center justify-between">
                إحصائيات العمل
                <ChevronRight className="w-4 h-4" />
             </button>
             <button className="bg-white p-4 rounded-2xl text-right text-gray-600 hover:bg-gray-50 transition-colors">تعديل الملف الشخصي</button>
             <button className="bg-white p-4 rounded-2xl text-right text-gray-600 hover:bg-gray-50 transition-colors">المحفظة والعمولات</button>
             <button onClick={() => { setView('landing'); }} className="bg-white p-4 rounded-2xl text-right text-red-500 hover:bg-red-50 transition-colors flex items-center justify-between">
                تسجيل الخروج
                <LogOut className="w-4 h-4 cursor-pointer" />
             </button>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-grow space-y-8 w-full">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-gray-400 font-bold uppercase">رصيد المحفظة</span>
                    <CreditCard className="text-[#B08D57] w-5 h-5" />
                 </div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">١٠,٥٠٠</span>
                    <span className="text-xs font-bold">د.ع</span>
                 </div>
                 <button className="mt-4 w-full bg-[#1A202C] text-white text-xs py-2 rounded-xl hover:bg-opacity-90 transition-all font-bold">شحن الرصيد</button>
              </div>
              
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-gray-400 font-bold uppercase">مرات الظهور</span>
                    <Search className="text-blue-500 w-5 h-5" />
                 </div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">١,٢٥٤</span>
                    <span className="text-xs font-bold">مشاهدة</span>
                 </div>
                 <p className="mt-4 text-[10px] text-gray-400">خلال آخر ٣٠ يوم</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-gray-400 font-bold uppercase">التقييمات</span>
                    <Star className="text-yellow-500 w-5 h-5" />
                 </div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">٤.٩</span>
                    <span className="text-xs font-bold">/ ٥</span>
                 </div>
                 <button onClick={() => setView('profile')} className="mt-4 w-full bg-[#FDFBF7] text-[#B08D57] text-xs py-2 rounded-xl border border-[#B08D57]/20 font-bold">عرض التقييمات</button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">أحدث الأعمال المنجزة</h3>
                <button className="bg-[#B08D57] text-white p-2 rounded-xl hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between p-4 bg-[#FDFBF7] rounded-2xl border border-gray-50">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${i}`} alt="job" />
                         </div>
                         <div>
                            <h5 className="font-bold text-sm">تصليح باب بيت - المنصور</h5>
                            <span className="text-[10px] text-gray-400">منذ ٢ يوم</span>
                         </div>
                      </div>
                      <div className="text-left">
                         <span className="text-xs font-bold text-red-500">- ٥٠٠ د.ع</span>
                         <p className="text-[8px] text-gray-400">عمولة ٥٪</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
