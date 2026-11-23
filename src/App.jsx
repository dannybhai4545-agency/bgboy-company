import React, { useState, useEffect, useMemo } from 'react';
import {
  Crown,
  Search,
  MapPin,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  LogOut,
  Users,
  Clock,
  ArrowRight,
  Building2,
  PhoneCall,
  Star
} from 'lucide-react';

const CITIES_DATA = [
  {
    city: 'Mumbai',
    zone: 'South & Bandra West',
    activeMembers: 148,
    clients: [
      { id: 'MUM-101', name: 'Aarav Singhania', tier: 'ROYAL GOLD', area: 'Bandra West', status: 'Available Now', rating: '4.9' },
      { id: 'MUM-102', name: 'Rohan Malhotra', tier: 'VIP ELITE', area: 'Juhu', status: 'Available Now', rating: '4.8' },
      { id: 'MUM-103', name: 'Kabir Merchant', tier: 'ROYAL GOLD', area: 'Lower Parel', status: 'Slot Open 8 PM', rating: '5.0' }
    ]
  },
  {
    city: 'Surat',
    zone: 'Vesu & Piplod',
    activeMembers: 94,
    clients: [
      { id: 'SUR-201', name: 'Devansh Desai', tier: 'ROYAL GOLD', area: 'Vesu', status: 'Available Now', rating: '4.9' },
      { id: 'SUR-202', name: 'Harshil Patel', tier: 'VIP ELITE', area: 'Piplod', status: 'Available Now', rating: '4.7' },
      { id: 'SUR-203', name: 'Nikhil Zaveri', tier: 'ROYAL GOLD', area: 'Adajan', status: 'Slot Open 7 PM', rating: '4.9' }
    ]
  },
  {
    city: 'Delhi',
    zone: 'South Delhi & Aerocity',
    activeMembers: 172,
    clients: [
      { id: 'DEL-301', name: 'Vikramaditya Kapoor', tier: 'ROYAL GOLD', area: 'Vasant Vihar', status: 'Available Now', rating: '5.0' },
      { id: 'DEL-302', name: 'Siddharth Khanna', tier: 'VIP ELITE', area: 'Greater Kailash', status: 'Available Now', rating: '4.8' },
      { id: 'DEL-303', name: 'Arjun Oberoi', tier: 'ROYAL GOLD', area: 'Aerocity', status: 'Slot Open 9 PM', rating: '4.9' }
    ]
  },
  {
    city: 'Ahmedabad',
    zone: 'SG Highway & Bodakdev',
    activeMembers: 86,
    clients: [
      { id: 'AMD-401', name: 'Yashraj Shah', tier: 'ROYAL GOLD', area: 'Bodakdev', status: 'Available Now', rating: '4.8' },
      { id: 'AMD-402', name: 'Karan Mehta', tier: 'VIP ELITE', area: 'Sindhu Bhavan', status: 'Available Now', rating: '4.9' }
    ]
  },
  {
    city: 'Bengaluru',
    zone: 'Indiranagar & Koramangala',
    activeMembers: 121,
    clients: [
      { id: 'BLR-501', name: 'Pranav Reddy', tier: 'ROYAL GOLD', area: 'Indiranagar', status: 'Available Now', rating: '4.9' },
      { id: 'BLR-502', name: 'Aditya Nair', tier: 'VIP ELITE', area: 'Koramangala', status: 'Slot Open 6 PM', rating: '4.8' }
    ]
  },
  {
    city: 'Jaipur',
    zone: 'C-Scheme & Civil Lines',
    activeMembers: 63,
    clients: [
      { id: 'JAI-601', name: 'Rajveer Rathore', tier: 'ROYAL GOLD', area: 'C-Scheme', status: 'Available Now', rating: '5.0' },
      { id: 'JAI-602', name: 'Manvendra Singh', tier: 'VIP ELITE', area: 'Civil Lines', status: 'Available Now', rating: '4.8' }
    ]
  }
];

const INITIAL_FEED = [
  { id: 1, member: 'Aarav S.', city: 'Mumbai', action: 'Meeting Confirmed', time: 'Just now' },
  { id: 2, member: 'Devansh D.', city: 'Surat', action: 'VIP Slot Booked', time: '1 min ago' },
  { id: 3, member: 'Vikram K.', city: 'Delhi', action: 'Meeting Confirmed', time: '3 mins ago' },
  { id: 4, member: 'Yashraj S.', city: 'Ahmedabad', action: 'Client Verified', time: '5 mins ago' }
];

const LIVE_UPDATES_POOL = [
  { member: 'Rohan M.', city: 'Mumbai', action: 'Meeting Confirmed' },
  { member: 'Harshil P.', city: 'Surat', action: 'VIP Slot Booked' },
  { member: 'Siddharth K.', city: 'Delhi', action: 'Meeting Confirmed' },
  { member: 'Karan M.', city: 'Ahmedabad', action: 'Priority Pass Issued' },
  { member: 'Rajveer R.', city: 'Jaipur', action: 'Meeting Confirmed' },
  { member: 'Pranav R.', city: 'Bengaluru', action: 'VIP Slot Booked' }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginCity, setLoginCity] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [liveFeed, setLiveFeed] = useState(INITIAL_FEED);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      const randomItem = LIVE_UPDATES_POOL[Math.floor(Math.random() * LIVE_UPDATES_POOL.length)];
      setLiveFeed((prev) => [
        {
          id: Date.now(),
          member: randomItem.member,
          city: randomItem.city,
          action: randomItem.action,
          time: 'Just now'
        },
        ...prev.slice(0, 4)
      ]);
    }, 4500);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginName.trim()) return;
    setUser({
      name: loginName.trim(),
      city: loginCity,
      memberId: 'BG-' + Math.floor(1000 + Math.random() * 9000)
    });
    setSelectedCity(loginCity);
  };

  const filteredCities = useMemo(() => {
    return CITIES_DATA.filter((item) => {
      const matchesCityDropdown = selectedCity === 'All' || item.city.toLowerCase() === selectedCity.toLowerCase();
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCityDropdown;
      const matchesCityName = item.city.toLowerCase().includes(q) || item.zone.toLowerCase().includes(q);
      const matchesClient = item.clients.some(
        (c) => c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q)
      );
      return matchesCityDropdown && (matchesCityName || matchesClient);
    });
  }, [searchQuery, selectedCity]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_55%)] pointer-events-none" />

        <header className="border-b border-amber-500/20 bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-700 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-widest bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                BG BOY COMPANY
              </h1>
              <p className="text-[10px] tracking-[0.25em] text-amber-400/70 uppercase">Exclusive Member Portal</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-medium">
            VIP ACCESS
          </span>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
          <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-zinc-950/90 p-8 shadow-[0_0_50px_rgba(212,175,55,0.12)]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Official Member Entry
              </div>
              <h2 className="text-2xl font-bold tracking-wide text-white">INSTANT LOGIN</h2>
              <p className="text-sm text-zinc-400 mt-1.5">
                Enter your details to access verified city clients & live meetings
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full rounded-xl bg-black border border-amber-500/30 px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Select Your City
                </label>
                <select
                  value={loginCity}
                  onChange={(e) => setLoginCity(e.target.value)}
                  className="w-full rounded-xl bg-black border border-amber-500/30 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                >
                  {CITIES_DATA.map((c) => (
                    <option key={c.city} value={c.city}>
                      {c.city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                INSTANT LOGIN <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> 100% Verified Network
              </span>
              <span className="text-amber-400/90 font-medium">680+ Active Members</span>
            </div>
          </div>
        </main>

        <footer className="border-t border-zinc-900 py-4 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} BG BOY COMPANY. All Rights Reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white pb-16">
      <header className="sticky top-0 z-30 border-b border-amber-500/25 bg-black/90 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-700 flex items-center justify-center text-black">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-widest bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                BG BOY COMPANY
              </h1>
              <p className="text-[11px] text-zinc-400">
                ID: <span className="text-amber-400 font-semibold">{user.memberId}</span> • {user.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Portal Active
            </div>
            <button
              onClick={() => setUser(null)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:border-amber-500/40 text-xs text-zinc-300 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_40px_rgba(212,175,55,0.08)]">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Member Dashboard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, <span className="text-amber-400">{user.name}</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Select your city below to view available high-profile clients and confirm your meeting slot.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="rounded-xl border border-amber-500/20 bg-black/70 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">Your City</p>
              <p className="text-base font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" /> {user.city}
              </p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-black/70 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">Account Status</p>
              <p className="text-base font-bold text-amber-400 mt-0.5">Pending Pass</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-extrabold tracking-wider uppercase text-amber-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> CHECK YOUR CITY
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Search city, area, or client profile</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Mumbai', 'Surat', 'Delhi', 'Ahmedabad'].map((cityBtn) => (
                    <button
                      key={cityBtn}
                      onClick={() => setSelectedCity(cityBtn)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        selectedCity === cityBtn
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-amber-500/40'
                      }`}
                    >
                      {cityBtn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type city name (e.g. Mumbai, Surat, Delhi)..."
                  className="w-full rounded-xl bg-black border border-amber-500/30 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-5">
              {filteredCities.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center text-zinc-400 text-sm">
                  No matching cities or clients found for "{searchQuery}".
                </div>
              ) : (
                filteredCities.map((cityGroup) => (
                  <div
                    key={cityGroup.city}
                    className="rounded-2xl border border-amber-500/25 bg-zinc-950/90 overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-b border-amber-500/20 flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-400" /> {cityGroup.city}
                        </h4>
                        <p className="text-xs text-zinc-400">{cityGroup.zone}</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {cityGroup.activeMembers} Active
                      </span>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cityGroup.clients.map((client) => (
                        <div
                          key={client.id}
                          className="rounded-xl border border-zinc-800 hover:border-amber-500/40 bg-black/80 p-4 flex flex-col justify-between transition"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                {client.tier}
                              </span>
                              <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                                <Star className="w-3.5 h-3.5 fill-amber-400" /> {client.rating}
                              </span>
                            </div>

                            <h5 className="text-base font-bold text-white">{client.name}</h5>
                            <p className="text-xs text-zinc-400 mt-0.5">
                              {client.area}, {cityGroup.city} • ID: {client.id}
                            </p>

                            <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {client.status}
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedBooking({ ...client, city: cityGroup.city })}
                            className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold text-xs tracking-wider uppercase hover:brightness-110 transition cursor-pointer"
                          >
                            BOOK · MEETING CONFIRM
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold tracking-wider uppercase text-amber-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> LIVE MEMBER MEETINGS
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-s
