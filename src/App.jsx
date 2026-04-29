import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiChevronDown, FiDownload, FiInfo } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';

// --- [데이터] 지역 소개 ---
const regions =[
  {
    id: 'solaris',
    name: '🌾 솔라리스 (Solaris)',
    desc: '헤르빌 대륙 남부의 따뜻한 농경지역. 평화로운 농사와 채집이 주를 이룹니다.',
    color: 'text-[#A3E635]',
    bg: 'bg-orange-50',
  },
  {
    id: 'frontier',
    name: '❄️ 프론티어 (Frontier)',
    desc: '헤르빌 대륙 북부의 추운 마경을 마주보고 있는 지역. 위험하지만 진귀한 전리품을 얻을 수 있습니다.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
  },
  {
    id: 'wealthport',
    name: '⚓ 웰스포트 (Wealthport)',
    desc: '헤르빌 대륙 동부의 온갖 상단과 물자, 화폐가 오가는 항구 지역. 모든 거래의 중심지입니다.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    id: 'zenith',
    name: '⚙️ 제니스 (Zenith)',
    desc: '헤르빌 대륙 서부의 아티팩트 및 마도공학이 발달한 지역. 신비로운 마법과 기술이 융합된 곳입니다.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  }
];

// --- [데이터] FAQ ---
const faqs =[
  { q: '헤르빌 리부트는 어떤 서버인가요?', a: '전투나 경쟁보다는 농사, 탐험, 마도공학 등 천천히 자신만의 이야기를 만들어가는 힐링 오픈월드 RPG 서버입니다.' },
  { q: '서버 오픈 시간은 어떻게 되나요?', a: '점검 시간 제외 24시간 언제든 자유롭게 접속하여 즐기실 수 있습니다.' },
  { q: '마인크래프트 정품만 접속 가능한가요?', a: '네, 헤르빌 리부트는 건전한 서버 문화를 위해 100% 마인크래프트 정품 유저만 접속이 가능합니다.' },
  { q: '모드팩 적용은 필수인가요?', a: "네, 다양한 지역과 시스템을 구현하기 위해 전용 모드팩 설치가 필수적입니다. '다운로드' 탭을 참고해주세요." },
  { q: '모바일(BE)로도 접속할 수 있나요?', a: '아쉽게도 오직 모드가 적용된 자바 에디션(Java Edition) 1.20.1 버전으로만 접속이 가능합니다.' },
  { q: '초보자도 쉽게 적응할 수 있나요?', a: "물론입니다! 남부 '솔라리스' 지역에서 안전하게 튜토리얼을 진행하며, 서버의 기초적인 시스템부터 천천히 안내받을 수 있습니다." },
  { q: '유저 간 PVP(전투)가 가능한가요?', a: "원칙적으로 무분별한 PVP는 금지되어 있습니다. 단, 북부 '프론티어' 지역의 특정 구역에서는 예외사항이 적용될 수 있습니다." },
  { q: '건축에 제한이 있나요?', a: '개인 토지 안에서는 자유롭게 건축이 가능하지만, 서버 렉을 유발하는 Create 모드, 레드스톤 회로, 공장, 팜 등은 규제 대상입니다.' },
  { q: '과금 요소가 따로 존재하나요?', a: '게임 밸런스를 해치는(Pay to Win) 장비 판매는 없으며, 치장용 아이템이나 자원 위주의 가벼운 후원 기능만 운영될 예정입니다.' },
  { q: '게임 중 버그를 발견하면 어떻게 하나요?', a: "공식 디스코드 서버의 '서버문의' 채널에 티켓을 남겨주시면 운영진이 확인 후 신속히 조치해 드립니다." },
  { q: '조작키가 너무 겹치는데, 어떻게 해야 하나요?', a: "인게임에서의 서버 튜토리얼을 확인해주세요. 또는, 공식 디스코드 서버의 '서버문의' 채널에 티켓을 남겨주시면 운영진이 확인 후 도와드립니다." },
];

export default function App() {
  const[activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="font-sans text-gray-800 bg-bglight min-h-screen">
      {/* 1. Header (Navigation) */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-secondary-dark tracking-tighter">
            Hereuville<span className="text-primary">RE</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#home" className="hover:text-primary transition-colors">홈</a>
            <a href="#contents" className="hover:text-primary transition-colors">세계관</a>
            <a href="#download" className="hover:text-primary transition-colors">다운로드</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ/문의</a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary-dark/5">
        {/* 임시 배경 (실제 서버 셰이더 이미지로 교체 필요) */}
        <div className="absolute inset-0 w-full h-full object-cover opacity-20 bg-[url('https://source.unsplash.com/1920x1080/?nature,forest')] bg-center bg-cover" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-black text-secondary-dark mb-6 drop-shadow-sm">
            헤르빌 리부트
          </h1>
          <div className="text-xl md:text-2xl text-gray-700 font-medium h-10">
            <Typewriter
              words={['느린, 하지만 깊게.', '헤르빌에서 펼쳐지는 당신만의 이야기.']}
              loop={false}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
        </motion.div>

        {/* 바운스 화살표 애니메이션 */}
        <motion.div 
          className="absolute bottom-10 text-primary text-4xl cursor-pointer"
          animate={{ y:[0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <a href="#contents"><FiChevronDown /></a>
        </motion.div>
      </section>

      {/* 3. Contents Section (지역 소개) */}
      <section id="contents" className="max-w-6xl mx-auto px-6 py-32 space-y-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-secondary-dark mb-4">대륙 탐험</h2>
          <p className="text-gray-500">각기 다른 매력을 가진 4개의 지역을 만나보세요.</p>
        </div>

        {regions.map((region, idx) => (
          <motion.div 
            key={region.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
          >
            {/* 이미지 영역 (나중에 실제 인게임 스크린샷으로 교체) */}
            <div className={`w-full md:w-1/2 h-80 rounded-2xl shadow-lg ${region.bg} flex items-center justify-center text-4xl`}>[ {region.name} 이미지 영역 ]
            </div>
            
            {/* 텍스트 영역 */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className={`text-3xl font-bold ${region.color}`}>{region.name}</h3>
              <p className="text-lg text-gray-600 leading-relaxed break-keep">
                {region.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 4. Download Section */}
      <section id="download" className="bg-secondary/5 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-secondary-dark mb-12">접속 방법</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-6">1</div>
              <h3 className="text-2xl font-bold mb-4">필수 프로그램 설치</h3>
              <p className="text-gray-500 mb-8 text-sm">모드팩 구동을 위해 CurseForge를 설치해주세요.</p>
              <motion.a
                href="https://www.curseforge.com/download/app"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="w-full py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                CurseForge 다운로드
              </motion.a>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-6">2</div>
              <h3 className="text-2xl font-bold mb-4">전용 모드팩 설치</h3>
              <p className="text-gray-500 mb-8 text-sm">헤르빌 전용 모드팩을 설치하고 게임을 실행하세요.</p>
              
              <motion.a
                href="#"
                target="_blank"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(163, 230, 53, 0.6)" }}
                className="w-full py-4 bg-primary text-secondary-dark rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <FiDownload size={20}/> 모드팩 다운로드
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FAQ & Contact Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-32">
        <h2 className="text-4xl font-bold text-secondary-dark text-center mb-16">자주 묻는 질문</h2>
        
        <div className="space-y-4 mb-24">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800 flex items-center gap-3">
                  <span className="text-primary font-bold">Q.</span> {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: activeFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 py-5 bg-gray-50 text-gray-600 border-t border-gray-100 flex gap-3">
                      <span className="text-secondary font-bold">A.</span>
                      <p className="leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Discord Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#5865F2] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-xl"
        >
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-2">커뮤니티 합류하기</h3>
            <p className="text-indigo-100">버그 제보, 문의, 유저들과의 소통은 디스코드에서!</p>
          </div>
          <motion.a
            href="https://discord.gg/xe9Vn3CdtM" // 디스코드 링크 삽입
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-3 bg-white text-[#5865F2] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            <motion.div
              whileHover={{ rotate:[0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <FaDiscord size={28} />
            </motion.div>
            디스코드 참가하기
          </motion.a>
        </motion.div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-secondary-dark text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Hereuville<span className="text-primary">RE</span></h2>
            <p className="text-gray-400 text-sm">Minecraft 1.20.1 24/7 Healing RPG Server</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <a href="https://discord.gg/YOUR_INVITE_LINK" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <FaDiscord size={24} />
            </a>
            <p className="text-gray-500 text-xs">© 2026 HereuvilleRE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
