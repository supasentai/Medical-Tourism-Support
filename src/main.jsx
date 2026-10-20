import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const images = {
  hero: "/images/hero.webp",
  clinic: "/images/assist.webp",
  vietnamLandmarks:
    "/images/vecteezy_vietnam-famous-landmark-silhouette-recolored.webp",
  careGuide: "/images/vietnam-care-guide.webp",
  recoveryGuide: "/images/recovery-guide.webp",
  antiAging: "/images/assist.webp",
};

const navItems = [
  ["Why Vietnam", "why-vietnam"],
  ["Before you fly", "service-01"],
  ["Care options", "service-02"],
  ["Local coordination", "service-04"],
  ["Recovery stays", "service-05"],
  ["For companions", "service-06"],
  ["How it works", "anti-aging"],
  ["Destinations", "destinations"],
];

const languageOptions = [
  ["en", "EN"],
  ["vi", "VI"],
  ["ko", "KO"],
  ["zh", "中"],
];

const languageCopy = {
  en: {
    nav: ["Why Vietnam", "Before you fly", "Care options", "Local coordination", "Recovery stays", "For companions", "How it works", "Destinations"],
    heroLabel: "Medical tourism support in Vietnam",
    heroTitle: ["Coming to Vietnam", "for Beauty?"],
    heroSub: "Plan your care journey with local support from arrival to home.",
    heroCta: "START PLANNING",
    trust: ["Private support", "Clear communication", "Vietnam care hubs", "Journey coordinator"],
    journey: ["Plan", "Match", "Arrive", "Treat", "Recover", "Follow up"],
    serviceCta: "VIEW MORE",
    serviceClose: "Close service details",
    serviceRequest: "Request this support",
    serviceLabels: [["Before you fly", "Plan with clarity"], ["Care matching", "Find the right care"], ["Arrival support", "Arrive with ease"], ["Interpretation", "Be understood"], ["Recovery stays", "Recover comfortably"], ["Follow-up care", "Stay supported"]],
    timelineEyebrow: "Your care journey",
    timelineTitle: ["One clear path,", "step by step."],
    whyEyebrow: "Why Vietnam",
    whyTitle: ["Care that leaves", "room to breathe."],
    contactTitle: "Plan your care in Vietnam.",
    startPlanning: "Start planning",
  },
  vi: {
    nav: ["Vì sao Việt Nam", "Trước chuyến bay", "Lựa chọn chăm sóc", "Điều phối địa phương", "Lưu trú hồi phục", "Dành cho người đi cùng", "Quy trình", "Điểm đến"],
    heroLabel: "Hỗ trợ du lịch y tế tại Việt Nam",
    heroTitle: ["Đến Việt Nam", "để làm đẹp?"],
    heroSub: "Đồng hành cùng hành trình chăm sóc của bạn từ lúc đến nơi đến khi trở về.",
    heroCta: "BẮT ĐẦU LÊN KẾ HOẠCH",
    trust: ["Hỗ trợ riêng tư", "Giao tiếp rõ ràng", "3 trung tâm chăm sóc", "Điều phối viên riêng"],
    journey: ["Lên kế hoạch", "Kết nối", "Đến nơi", "Điều trị", "Hồi phục", "Theo dõi"],
    serviceCta: "XEM THÊM",
    serviceClose: "Đóng chi tiết dịch vụ",
    serviceRequest: "Yêu cầu hỗ trợ này",
    serviceLabels: [["Trước chuyến bay", "Lên kế hoạch rõ ràng"], ["Kết nối chăm sóc", "Chọn đúng dịch vụ"], ["Hỗ trợ khi đến", "Đến nơi nhẹ nhàng"], ["Thông dịch", "Được thấu hiểu"], ["Lưu trú hồi phục", "Hồi phục thoải mái"], ["Chăm sóc tiếp nối", "Luôn được đồng hành"]],
    timelineEyebrow: "Hành trình chăm sóc",
    timelineTitle: ["Một lộ trình rõ ràng,", "từng bước một."],
    whyEyebrow: "Vì sao Việt Nam",
    whyTitle: ["Chăm sóc để bạn", "có thể an tâm."],
    contactTitle: "Lên kế hoạch chăm sóc tại Việt Nam.",
    startPlanning: "Bắt đầu lên kế hoạch",
  },
  ko: {
    nav: ["왜 베트남인가", "출국 전 준비", "케어 옵션", "현지 코디네이션", "회복 숙박", "동반자 안내", "진행 방법", "여행지"],
    heroLabel: "베트남 의료관광 지원",
    heroTitle: ["아름다움을 위해", "베트남에 오시나요?"],
    heroSub: "도착부터 귀국까지 현지 지원과 함께 케어 여정을 계획하세요.",
    heroCta: "계획 시작하기",
    trust: ["맞춤 지원", "명확한 소통", "베트남 케어 허브", "전담 코디네이터"],
    journey: ["계획", "매칭", "도착", "치료", "회복", "후속 관리"],
    serviceCta: "자세히 보기",
    serviceClose: "케어 상세 닫기",
    serviceRequest: "이 지원 요청하기",
    serviceLabels: [["출국 전 준비", "명확하게 계획하기"], ["케어 매칭", "맞는 케어 찾기"], ["도착 지원", "편안하게 도착하기"], ["통역 지원", "정확하게 소통하기"], ["회복 숙박", "편안하게 회복하기"], ["후속 관리", "계속 지원받기"]],
    timelineEyebrow: "케어 여정",
    timelineTitle: ["명확한 한 가지 경로,", "단계별로."],
    whyEyebrow: "왜 베트남인가",
    whyTitle: ["마음의 여유를 주는", "케어."],
    contactTitle: "베트남 케어를 계획하세요.",
    startPlanning: "계획 시작하기",
  },
  zh: {
    nav: ["为什么选择越南", "出发前准备", "护理选择", "当地协调", "康复住宿", "陪同者指南", "流程介绍", "目的地"],
    heroLabel: "越南医疗旅游支持",
    heroTitle: ["为了美丽", "来到越南？"],
    heroSub: "从抵达到回家，为您的护理旅程提供当地支持。",
    heroCta: "开始规划",
    trust: ["私人支持", "清晰沟通", "越南护理中心", "专属协调员"],
    journey: ["规划", "匹配", "抵达", "治疗", "康复", "后续护理"],
    serviceCta: "查看更多",
    serviceClose: "关闭服务详情",
    serviceRequest: "申请此项支持",
    serviceLabels: [["出发前准备", "清晰规划"], ["护理匹配", "找到合适的护理"], ["抵达支持", "轻松抵达"], ["翻译支持", "顺畅沟通"], ["康复住宿", "舒适恢复"], ["后续护理", "持续支持"]],
    timelineEyebrow: "您的护理旅程",
    timelineTitle: ["一条清晰的路径，", "一步一步。"],
    whyEyebrow: "为什么选择越南",
    whyTitle: ["让护理旅程", "从容展开。"],
    contactTitle: "规划您在越南的护理旅程。",
    startPlanning: "开始规划",
  },
};

const serviceSlides = [
  {
    number: "01",
    english: "Before you fly",
    title: "Plan with clarity",
    copy: "Understand your care options, timeline and budget\nbefore you book a flight to Vietnam.",
    image: "/images/slide-01.webp",
    details: ["Care timeline and budget planning", "Initial questions prepared before you fly", "Clear next steps for your first conversation"],
  },
  {
    number: "02",
    english: "Care matching",
    title: "Find the right care",
    copy: "We help you compare clinics, specialists and treatment plans\nfor a decision that feels informed.",
    image: "/images/slide-02.webp",
    details: ["Specialist and clinic comparisons", "Treatment questions organized for you", "A practical shortlist to discuss"],
  },
  {
    number: "03",
    english: "Arrival support",
    title: "Arrive with ease",
    copy: "From airport pickup to your first appointment,\nwe coordinate the details around your schedule.",
    image: "/images/slide-03.webp",
    details: ["Airport pickup coordination", "Hotel and hospital transfers", "Arrival timing planned around appointments"],
  },
  {
    number: "04",
    english: "Interpretation",
    title: "Be understood",
    copy: "Clear communication before, during and after treatment\nwith language support when you need it.",
    image: "/images/slide-04.webp",
    details: ["Language support when needed", "Questions prepared for appointments", "Practical updates shared clearly"],
  },
  {
    number: "05",
    english: "Recovery stays",
    title: "Recover comfortably",
    copy: "Choose a calm place to rest, with practical support\nfor your recovery between appointments.",
    image: "/images/slide-05.webp",
    details: ["Recovery-friendly accommodation options", "In-hotel nursing by arrangement", "Transport planned around rest"],
  },
  {
    number: "06",
    english: "Follow-up care",
    title: "Stay supported",
    copy: "Your journey continues after you return home,\nwith follow-up coordination and clear next steps.",
    image: "/images/slide-06.webp",
    details: ["Follow-up coordination", "Recovery questions organized", "Clear next steps after your return"],
  },
];

const translatedServiceDetails = {
  vi: [
    {
      eyebrow: "Trước chuyến bay",
      title: "Lên kế hoạch rõ ràng",
      copy: "Hiểu rõ lựa chọn chăm sóc, thời gian và ngân sách trước khi đặt chuyến bay đến Việt Nam.",
      details: ["Lập kế hoạch thời gian và ngân sách", "Chuẩn bị câu hỏi trước chuyến đi", "Xác định bước tiếp theo rõ ràng"],
    },
    {
      eyebrow: "Kết nối chăm sóc",
      title: "Chọn đúng dịch vụ",
      copy: "So sánh phòng khám, chuyên gia và kế hoạch điều trị để bạn đưa ra quyết định có đủ thông tin.",
      details: ["So sánh chuyên gia và phòng khám", "Sắp xếp câu hỏi điều trị", "Tạo danh sách lựa chọn phù hợp"],
    },
    {
      eyebrow: "Hỗ trợ khi đến",
      title: "Đến nơi nhẹ nhàng",
      copy: "Từ sân bay đến buổi hẹn đầu tiên, các chi tiết được điều phối theo lịch trình của bạn.",
      details: ["Điều phối đón tại sân bay", "Kết nối xe đến khách sạn và bệnh viện", "Sắp xếp thời gian quanh lịch hẹn"],
    },
    {
      eyebrow: "Thông dịch",
      title: "Được thấu hiểu",
      copy: "Hỗ trợ giao tiếp rõ ràng trước, trong và sau điều trị khi bạn cần.",
      details: ["Hỗ trợ ngôn ngữ khi cần", "Chuẩn bị câu hỏi cho buổi hẹn", "Chia sẻ cập nhật thiết thực"],
    },
    {
      eyebrow: "Lưu trú hồi phục",
      title: "Hồi phục thoải mái",
      copy: "Chọn nơi nghỉ ngơi yên tĩnh cùng hỗ trợ thiết thực giữa các buổi hẹn.",
      details: ["Gợi ý nơi ở phù hợp hồi phục", "Điều dưỡng tại nơi lưu trú theo sắp xếp", "Điều phối di chuyển quanh thời gian nghỉ"],
    },
    {
      eyebrow: "Chăm sóc tiếp nối",
      title: "Luôn được đồng hành",
      copy: "Hành trình vẫn tiếp tục sau khi bạn về nhà với điều phối theo dõi và bước tiếp theo rõ ràng.",
      details: ["Điều phối chăm sóc sau chuyến đi", "Tổng hợp câu hỏi hồi phục", "Hướng dẫn bước tiếp theo sau khi về nhà"],
    },
  ],
  ko: [
    { eyebrow: "출국 전 준비", title: "명확하게 계획하기", copy: "비행기를 예약하기 전에 케어 옵션, 일정과 예산을 이해하세요.", details: ["케어 일정과 예산 계획", "출국 전 질문 준비", "첫 상담을 위한 다음 단계 정리"] },
    { eyebrow: "케어 매칭", title: "맞는 케어 찾기", copy: "클리닉, 전문의와 치료 계획을 비교해 더 informed한 결정을 돕습니다.", details: ["전문의와 클리닉 비교", "치료 질문 정리", "논의할 수 있는 후보 정리"] },
    { eyebrow: "도착 지원", title: "편안하게 도착하기", copy: "공항 픽업부터 첫 진료까지 일정에 맞춰 세부 사항을 조율합니다.", details: ["공항 픽업 조율", "호텔과 병원 이동 지원", "예약에 맞춘 도착 일정 계획"] },
    { eyebrow: "통역 지원", title: "정확하게 소통하기", copy: "필요한 순간 치료 전후의 명확한 소통을 지원합니다.", details: ["필요 시 언어 지원", "진료 질문 준비", "실용적인 업데이트 공유"] },
    { eyebrow: "회복 숙박", title: "편안하게 회복하기", copy: "진료 사이에 쉴 수 있는 차분한 공간과 실용적인 회복 지원을 찾습니다.", details: ["회복에 맞는 숙소 선택", "숙소 내 간호 지원 조율", "휴식 중심 이동 계획"] },
    { eyebrow: "후속 관리", title: "계속 지원받기", copy: "귀국 후에도 후속 조율과 명확한 다음 단계로 여정을 이어갑니다.", details: ["후속 관리 조율", "회복 관련 질문 정리", "귀국 후 다음 단계 안내"] },
  ],
  zh: [
    { eyebrow: "出发前准备", title: "清晰规划", copy: "在预订飞往越南的航班前，了解护理选择、时间和预算。", details: ["规划护理时间和预算", "出发前准备问题", "整理清晰的下一步"] },
    { eyebrow: "护理匹配", title: "找到合适的护理", copy: "比较诊所、专科医生和治疗计划，帮助您做出充分了解后的决定。", details: ["比较专科医生和诊所", "整理治疗问题", "建立可讨论的候选方案"] },
    { eyebrow: "抵达支持", title: "轻松抵达", copy: "从机场接送到第一次预约，我们会根据您的日程协调细节。", details: ["协调机场接送", "安排酒店和医院接送", "围绕预约规划抵达时间"] },
    { eyebrow: "翻译支持", title: "顺畅沟通", copy: "在需要时，为治疗前、中、后的沟通提供支持。", details: ["按需提供语言支持", "准备预约问题", "清晰分享实用更新"] },
    { eyebrow: "康复住宿", title: "舒适恢复", copy: "选择安静的休息空间，并在预约之间获得实用的恢复支持。", details: ["推荐适合恢复的住宿", "协调住宿内护理", "围绕休息安排交通"] },
    { eyebrow: "后续护理", title: "持续支持", copy: "回家后仍可获得后续协调和清晰的下一步安排。", details: ["协调后续护理", "整理恢复问题", "回家后的下一步指导"] },
  ],
};

const antiAgingItems = [
  ["Visa support", "Fast-track visas", "Quick processing", "From $100 USD"],
  [
    "Private transfers",
    "24/7 private transfers",
    "Airport, hotel, and hospital rides",
    "Available 24/7",
  ],
  [
    "Hotel booking",
    "Tailored stays",
    "Comfortable stays",
    "From $20 USD / night",
  ],
  [
    "Doctor matching",
    "Find your specialist",
    "Direct connection to specialists",
    "Matched to your needs",
  ],
  [
    "In-hotel nursing",
    "Care where you stay",
    "Professional wound care",
    "By arrangement",
  ],
  [
    "Custom itineraries",
    "Balance your journey",
    "Travel, surgery, and dining plans",
    "Built around you",
  ],
];

const videos = [
  [
    "Destination notes",
    images.vietnamLandmarks,
    "Vietnam landmarks to explore around your care journey",
    "https://www.youtube.com/watch?v=kAd1ATih9_k",
  ],
  [
    "Vietnam care guide",
    images.careGuide,
    "What to expect from a medical journey in Vietnam",
    "https://www.youtube.com/watch?v=JFEHZud-NzE",
  ],
  [
    "Recovery guide",
    images.recoveryGuide,
    "How to plan rest and support after treatment",
    "https://www.youtube.com/watch?v=kAd1ATih9_k",
  ],
];

const journeySteps = [
  ["01", "Plan", "service-01"],
  ["02", "Match", "service-02"],
  ["03", "Arrive", "service-03"],
  ["04", "Treat", "service-04"],
  ["05", "Recover", "service-05"],
  ["06", "Follow up", "service-06"],
];

const faqItems = [
  [
    "Can you help before I book my flight?",
    "Yes. We can help you map out care options, timing, budget and practical arrival details before you travel.",
  ],
  [
    "Do I need to choose a clinic first?",
    "No. Share what you are looking for and we can help you understand suitable specialists and care settings.",
  ],
  [
    "Can a companion join the planning?",
    "Of course. Transport, accommodation and a simple day-by-day plan can be shaped for both patients and companions.",
  ],
];

function Arrow({ up = false }) {
  return (
    <span className={up ? "arrow arrow-up" : "arrow"} aria-hidden="true">
      {up ? "⌃" : "↗"}
    </span>
  );
}

function trackEvent(name, properties = {}) {
  if (typeof window === "undefined") return;
  const event = { event: name, ...properties };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent("medical-tourism:analytics", { detail: event }));
}

function LazyImage({ src, srcSet, sizes, alt, width, height, className = "" }) {
  const [isReady, setIsReady] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (isReady) return undefined;
    const node = imageRef.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setIsReady(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isReady]);

  return (
    <div ref={imageRef} className={`lazy-image ${className}`}>
      {isReady && (
        <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height} />
      )}
    </div>
  );
}

function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [language, setLanguage] = useState("en");
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [planner, setPlanner] = useState({
    support: "",
    timing: "",
    travel: "",
  });
  const copy = languageCopy[language];

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", isMenuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [isMenuOpen]);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const submitConsultation = (event) => {
    event.preventDefault();
    trackEvent("support_request_submitted", {
      supportType: selectedSupport || "general",
    });
    setSubmitted(true);
  };
  const requestSupport = (slide) => {
    trackEvent("service_support_selected", {
      serviceNumber: slide.number,
      serviceName: slide.title,
    });
    setSelectedSupport(`${slide.english}: ${slide.title}`);
    scrollTo("contact");
  };
  const changeLanguage = (nextLanguage) => {
    trackEvent("language_changed", { language: nextLanguage });
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  };
  const updatePlanner = (field, value) => {
    setPlanner((current) => ({ ...current, [field]: value }));
  };
  const video = videos[activeVideo];
  const selectedDetailCopy = selectedServiceDetail
    ? translatedServiceDetails[language]?.[selectedServiceDetail.index] || {
        eyebrow: selectedServiceDetail.english,
        title: selectedServiceDetail.title,
        copy: selectedServiceDetail.copy,
        details: selectedServiceDetail.details,
      }
    : null;

  return (
    <div className="site-shell">
      <header className={`site-header ${isMenuOpen ? "menu-open" : ""}`}>
        <button
          className="brand-button"
          type="button"
          onClick={() => scrollTo("top")}
          aria-label="Medical tourism support home"
        >
          <span className="text-wordmark">
            <strong>MEDICAL TOURISM</strong>
            <em>VIETNAM SUPPORT</em>
          </span>
        </button>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(([, target], index) => (
            <button type="button" key={target} onClick={() => scrollTo(target)}>
              {copy.nav[index]}
            </button>
          ))}
        </nav>
        <button
          className="menu-backdrop"
          type="button"
          aria-label="Close navigation menu"
          tabIndex={-1}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="header-actions">
          <div className="language-switcher" aria-label="Choose language">
            {languageOptions.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={language === value ? "is-active" : ""}
                onClick={() => changeLanguage(value)}
                aria-label={`Change language to ${label}`}
                aria-pressed={language === value}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="skin-link"
            type="button"
            onClick={() => {
              trackEvent("start_planning_click", { location: "header" });
              scrollTo("contact");
            }}
          >
            <span className="skin-link-label">{copy.startPlanning}</span>
            <Arrow />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="about">
          <picture>
            <source media="(max-width: 720px)" srcSet="/images/hero-mobile.webp" />
            <img
              className="hero-image"
              src={images.hero}
              srcSet="/images/hero.webp 1800w, /images/hero-mobile.webp 900w"
              sizes="100vw"
              alt="A calm private healthcare setting in Vietnam"
              fetchPriority="high"
              width="2400"
              height="1400"
            />
          </picture>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-mark">V</div>
            <p className="hero-label">{copy.heroLabel}</p>
            <h1>
              {copy.heroTitle[0]}
              <br />
              <span>{copy.heroTitle[1]}</span>
            </h1>
            <p>{copy.heroSub}</p>
            <button
              className="circle-cta"
              type="button"
              onClick={() => {
                trackEvent("start_planning_click", { location: "hero" });
                scrollTo("planner");
              }}
            >
              <span className="circle-cta-label">{copy.heroCta}</span>
              <Arrow />
            </button>
          </div>
        </section>

        <section className="trust-strip" aria-label="Support at a glance">
          <div>
            <strong>24/7</strong>
            <span>{copy.trust[0]}</span>
          </div>
          <div>
            <strong>EN</strong>
            <span>{copy.trust[1]}</span>
          </div>
          <div>
            <strong>3</strong>
            <span>{copy.trust[2]}</span>
          </div>
          <div>
            <strong>01</strong>
            <span>{copy.trust[3]}</span>
          </div>
        </section>

        <div id="services" aria-label="Signature medical tourism support">
          <nav className="journey-rail" aria-label="Care journey steps">
            {journeySteps.map(([number, , target], index) => (
              <button type="button" key={target} onClick={() => scrollTo(target)}>
                <span>{number}</span>
                {copy.journey[index]}
              </button>
            ))}
          </nav>
          {serviceSlides.map((slide, index) => (
            <section
              id={`service-${slide.number}`}
              className={`service-story ${index % 2 === 0 ? "image-left" : "image-right"}`}
              key={slide.number}
            >
              <div className="story-number">{slide.number}</div>
              <div className="story-copy">
                <p className="eyebrow">{copy.serviceLabels[index][0]}</p>
                <h2>{copy.serviceLabels[index][1]}</h2>
                <p className="story-description">{slide.copy}</p>
                <button
                  className="round-link"
                  type="button"
                  onClick={() => {
                    trackEvent("service_detail_opened", { serviceNumber: slide.number });
                    setSelectedServiceDetail({ ...slide, index });
                  }}
                  aria-label={`${copy.serviceCta}: ${copy.serviceLabels[index][1]}`}
                >
                  <span className="round-link-label">{copy.serviceCta}</span>
                  <Arrow />
                </button>
              </div>
              <div className="story-image-wrap">
                <LazyImage
                  src={slide.image}
                  srcSet={`${slide.image.replace(".webp", "-mobile.webp")} 900w, ${slide.image} 1800w`}
                  sizes="(max-width: 720px) 100vw, 50vw"
                  alt={slide.title}
                  width="1200"
                  height="800"
                  className="story-lazy-image"
                />
              </div>
            </section>
          ))}
        </div>

        <section className="philosophy-section">
          <div className="philosophy-art">
            <img
              src={images.clinic}
              alt="A warm consultation space in Vietnam"
              loading="lazy"
              width="1200"
              height="900"
            />
          </div>
          <div className="philosophy-copy">
            <p className="eyebrow">Medical tourism support in Vietnam</p>
            <h2>
              You don't have to
              <br />
              <span>do it alone.</span>
            </h2>
            <p>
              Considering cosmetic or dental work in Vietnam? From trip prep and
              airport pickup to treatment and recovery, we're with you every
              step of the way.
            </p>
            <div className="experience">
              <strong>3</strong>
              <span>
                CARE HUBS
                <br />
                TO EXPLORE
              </span>
            </div>
          </div>
        </section>

        <section className="timeline-section" id="journey" aria-labelledby="journey-title">
          <div className="timeline-intro">
            <p className="eyebrow">{copy.timelineEyebrow}</p>
            <h2 id="journey-title">
              {copy.timelineTitle[0]}
              <br />
              <span>{copy.timelineTitle[1]}</span>
            </h2>
            <p>
              Good support makes the journey feel considered before you ever
              board the flight.
            </p>
          </div>
          <div className="timeline-list">
            {serviceSlides.map((slide, index) => (
              <button
                className="timeline-step"
                type="button"
                key={slide.number}
                onClick={() => scrollTo(`service-${slide.number}`)}
              >
                <span className="timeline-step-number">{slide.number}</span>
                <span className="timeline-step-copy">
                  <small>{copy.serviceLabels[index][0]}</small>
                  <strong>{copy.serviceLabels[index][1]}</strong>
                </span>
                <span className="timeline-step-line" aria-hidden="true">
                  {index < serviceSlides.length - 1 ? "→" : "✓"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="why-vietnam-section" id="why-vietnam" aria-labelledby="why-vietnam-title">
          <div className="why-vietnam-heading">
            <p className="eyebrow">{copy.whyEyebrow}</p>
            <h2 id="why-vietnam-title">
              {copy.whyTitle[0]}
              <br />
              <span>{copy.whyTitle[1]}</span>
            </h2>
          </div>
          <div className="why-vietnam-grid">
            <article>
              <span>01</span>
              <h3>Compare with clarity</h3>
              <p>Understand your options, timing and next steps before making a decision.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Stay understood</h3>
              <p>Keep communication practical with language and local coordination when needed.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Recover at your pace</h3>
              <p>Plan calm stays, transport and support around the rhythm of your recovery.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Make the trip yours</h3>
              <p>Leave room for good food, gentle exploring and the people traveling with you.</p>
            </article>
          </div>
        </section>

        <section className="testimonial-section" aria-labelledby="testimonial-title">
          <div className="testimonial-image">
            <img
              src="/images/testimonial-placeholder.webp"
              srcSet="/images/testimonial-placeholder-mobile.webp 900w, /images/testimonial-placeholder.webp 1800w"
              sizes="(max-width: 720px) 100vw, 42vw"
              alt="Placeholder portrait for a future patient testimonial"
              loading="lazy"
              width="900"
              height="1200"
            />
          </div>
          <div className="testimonial-copy">
            <p className="eyebrow">Sample testimonial</p>
            <h2 id="testimonial-title">
              A calmer way
              <br />
              <span>to make a big decision.</span>
            </h2>
            <blockquote>
              “The planning felt clear, calm and personal from my first message
              to the day I flew home.”
            </blockquote>
            <p className="testimonial-placeholder">
              Placeholder quote. Replace with an approved patient story before launch.
            </p>
          </div>
        </section>

        <section className="planner-section" id="planner" aria-labelledby="planner-title">
          <div className="planner-intro">
            <p className="eyebrow">Plan your first step</p>
            <h2 id="planner-title">
              Shape a journey
              <br />
              <span>that fits you.</span>
            </h2>
            <p>Choose a few starting points and we will help turn them into a practical conversation.</p>
          </div>
          <div className="planner-card">
            <label>
              What support do you need?
              <select value={planner.support} onChange={(event) => updatePlanner("support", event.target.value)}>
                <option value="">Choose one</option>
                <option value="Care options">Care options</option>
                <option value="Arrival support">Arrival support</option>
                <option value="Recovery care">Recovery care</option>
                <option value="Full journey planning">Full journey planning</option>
              </select>
            </label>
            <label>
              When are you thinking of traveling?
              <select value={planner.timing} onChange={(event) => updatePlanner("timing", event.target.value)}>
                <option value="">Choose a timeframe</option>
                <option value="Within the next 3 months">Within the next 3 months</option>
                <option value="In 3 to 6 months">In 3 to 6 months</option>
                <option value="Still exploring">Still exploring</option>
              </select>
            </label>
            <label>
              What should the trip feel like?
              <select value={planner.travel} onChange={(event) => updatePlanner("travel", event.target.value)}>
                <option value="">Choose a style</option>
                <option value="Calm and recovery-led">Calm and recovery-led</option>
                <option value="Balanced care and exploring">Balanced care and exploring</option>
                <option value="Care-focused and efficient">Care-focused and efficient</option>
              </select>
            </label>
            <div className="planner-summary" aria-live="polite">
              <small>Your starting plan</small>
              <strong>{planner.support || "Support to be chosen"}</strong>
              <span>{planner.timing || "Timing to be chosen"} · {planner.travel || "Travel style to be chosen"}</span>
              <button
                type="button"
                onClick={() => {
                  trackEvent("planner_continue_click", {
                    support: planner.support || "not-selected",
                  });
                  setSelectedSupport(planner.support || "a first journey plan");
                  scrollTo("contact");
                }}
              >
                Continue to support <Arrow />
              </button>
            </div>
          </div>
        </section>

        <section className="anti-aging-section" id="anti-aging">
          <div className="anti-aging-intro">
            <p className="eyebrow">Medical tourism support in Vietnam</p>
            <h2>
              Focus on your
              <br />
              <span>glow-up.</span>
            </h2>
            <p>
              From your first question to your return home, we'll handle the
              rest.
            </p>
          </div>
          <div className="anti-aging-visual">
            <img
              src={images.antiAging}
              alt="A consultation and care planning moment in Vietnam"
              loading="lazy"
              width="1200"
              height="1000"
            />
          </div>
          <div className="anti-aging-list">
            {antiAgingItems.map(([english, title, copy, detail]) => (
              <button
                type="button"
                className="anti-item"
                key={title}
                onClick={() => scrollTo("contact")}
              >
                <span>
                  <small>{english}</small>
                  <strong>{title}</strong>
                  <em>{copy}</em>
                  <b>{detail}</b>
                </span>
                <Arrow />
              </button>
            ))}
          </div>
        </section>

        <section className="media-section" id="media">
          <div className="media-heading">
            <p className="eyebrow">Vietnam, beyond the appointment</p>
            <h2>
              Prepare for the journey
              <br />
              <span>with confidence.</span>
            </h2>
            <div className="media-tabs">
              {videos.map(([label], index) => (
                <button
                  type="button"
                  className={index === activeVideo ? "is-active" : ""}
                  key={label}
                  onClick={() => setActiveVideo(index)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="media-feature">
            <img
              src={video[1]}
              srcSet={`${video[1].replace(".webp", "-mobile.webp")} 900w, ${video[1]} 1800w`}
              sizes="(max-width: 720px) 100vw, 58vw"
              alt={video[2]}
              loading="lazy"
              width="1400"
              height="900"
            />
            <button
              className="play-button"
              type="button"
              onClick={() => {
                trackEvent("video_opened", { videoName: video[0] });
                setActiveVideoModal(video);
              }}
              aria-label={`Watch ${video[0]}`}
            >
              ▶
            </button>
            <div className="media-caption">
              <span>Youtube</span>
              <strong>{video[2]}</strong>
            </div>
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="faq-intro">
            <p className="eyebrow">Before you book</p>
            <h2 id="faq-title">
              Start with a
              <br />
              <span>clear answer.</span>
            </h2>
            <p>
              A few practical answers before you decide whether Vietnam is the
              right next step for your care journey.
            </p>
          </div>
          <div className="faq-list">
            {faqItems.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="destinations-section" id="destinations" aria-labelledby="destinations-title">
          <div className="destinations-heading">
            <p className="eyebrow">Vietnam care hubs</p>
            <h2 id="destinations-title">
              Choose your
              <br />
              <span>base.</span>
            </h2>
            <p>Each city offers a different rhythm for treatment, recovery and the time around it.</p>
          </div>
          <div className="destination-cards">
            {[
              ["Ho Chi Minh City", "Energetic, connected and practical for appointments.", "/images/slide-03.webp"],
              ["Hanoi", "A slower cultural rhythm with calm spaces to reset.", "/images/vietnam-care-guide.webp"],
              ["Da Nang", "Coastal air, open space and an easy recovery pace.", "/images/vecteezy_vietnam-famous-landmark-silhouette-recolored.webp"],
            ].map(([city, description, image]) => (
              <article className="destination-card" key={city}>
                <div className="destination-card-image">
                  <img
                    src={image}
                    srcSet={`${image.replace(".webp", "-mobile.webp")} 900w, ${image} 1800w`}
                    sizes="(max-width: 720px) 100vw, 30vw"
                    alt={`${city} destination support`}
                    loading="lazy"
                    width="900"
                    height="650"
                  />
                </div>
                <div className="destination-card-copy">
                  <h3>{city}</h3>
                  <p>{description}</p>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("destination_interest", { destination: city });
                      setSelectedSupport(`${city} destination planning`);
                      scrollTo("contact");
                    }}
                  >
                    Ask about this city <Arrow />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-map">
            {isMapLoaded ? (
              <iframe
                title="Medical tourism destinations in Vietnam"
                src="https://www.google.com/maps?q=Ho%20Chi%20Minh%20City%2C%20Vietnam&output=embed"
                loading="lazy"
              ></iframe>
            ) : (
              <div className="map-placeholder">
                <div>
                  <span className="eyebrow">Vietnam care hubs</span>
                  <p>Load the interactive map when you are ready to explore.</p>
                  <button type="button" onClick={() => setIsMapLoaded(true)}>
                    Load interactive map <Arrow />
                  </button>
                </div>
              </div>
            )}
            <div className="address-block">
              <p className="eyebrow">Destinations</p>
              <h3>Vietnam care hubs</h3>
              <p>
                Ho Chi Minh City
                <br />
                Hanoi　Da Nang
              </p>
              <button type="button" onClick={() => scrollTo("contact")}>
                Ask about destinations <Arrow />
              </button>
            </div>
          </div>
          <div className="contact-panel">
            <p className="eyebrow">Start a conversation</p>
            <h2>{copy.contactTitle}</h2>
            <p className="contact-prompt">
              {selectedSupport
                ? `Tell us more about ${selectedSupport.toLowerCase()}.`
                : "Planning your trip? Send us a message to start!"}
            </p>
            <div className="hours">
              <h3>Support availability</h3>
              <p>
                Pre-arrival planning <span>Available daily</span>
              </p>
              <p>
                On-the-ground support <span>By arrangement</span>
              </p>
              <small>
                Response times depend on your travel dates and care needs.
              </small>
            </div>
            <div className="legal-note" id="privacy">
              <strong>Important information</strong>
              <p>
                This service provides travel and care coordination only. It does
                not replace advice from a licensed medical professional.
              </p>
              <p>
                Please do not send passport numbers, medical records or payment
                details through this form.
              </p>
            </div>
            {submitted ? (
              <div className="submit-success">
                <strong>Your journey request has been received.</strong>
                <span>We will be in touch with practical next steps.</span>
              </div>
            ) : (
              <form className="consult-form" onSubmit={submitConsultation}>
                <h3>Tell us what you need</h3>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                    name="name"
                    autoComplete="name"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email or WhatsApp"
                    aria-label="Email or WhatsApp"
                    name="contact"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="sr-only" htmlFor="support-type">
                    Support needed
                  </label>
                  <select id="support-type" name="support-type" defaultValue="" required>
                    <option value="" disabled>
                      Support needed
                    </option>
                    <option value="care-options">Care options</option>
                    <option value="arrival">Airport and arrival support</option>
                    <option value="doctor-matching">Doctor matching</option>
                    <option value="recovery">Recovery and nursing</option>
                    <option value="full-journey">Full journey planning</option>
                  </select>
                  <label className="sr-only" htmlFor="travel-date">
                    Expected travel date
                  </label>
                  <input
                    id="travel-date"
                    type="date"
                    name="travel-date"
                    aria-label="Expected travel date"
                  />
                </div>
                <div className="form-row">
                  <label className="sr-only" htmlFor="budget">
                    Estimated budget
                  </label>
                  <select id="budget" name="budget" defaultValue="" required>
                    <option value="" disabled>
                      Estimated budget
                    </option>
                    <option value="planning">Still planning</option>
                    <option value="under-3000">Under $3,000</option>
                    <option value="3000-7000">$3,000 to $7,000</option>
                    <option value="over-7000">Over $7,000</option>
                  </select>
                  <label className="sr-only" htmlFor="companions">
                    Traveling with a companion
                  </label>
                  <select id="companions" name="companions" defaultValue="" required>
                    <option value="" disabled>
                      Traveling with a companion?
                    </option>
                    <option value="solo">Traveling solo</option>
                    <option value="one-companion">One companion</option>
                    <option value="group">Two or more companions</option>
                  </select>
                </div>
                <textarea
                  placeholder="What kind of support are you looking for?"
                  aria-label="Support request"
                  name="support-request"
                  rows="3"
                  required
                ></textarea>
                <p className="form-note">
                  Share only what you are comfortable discussing. We will reply
                  with practical next steps.
                </p>
                <label className="agree">
                  <input type="checkbox" required /> I agree to be contacted
                  about my request.
                </label>
                <button type="submit">
                  Request support <Arrow />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {selectedServiceDetail && (
        <div
          className="service-detail-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedServiceDetail(null);
          }}
        >
          <section
            className="service-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
          >
            <button
              className="service-detail-close"
              type="button"
              aria-label={copy.serviceClose}
              onClick={() => setSelectedServiceDetail(null)}
            >
              ×
            </button>
            <p className="eyebrow">{selectedDetailCopy.eyebrow}</p>
            <h2 id="service-detail-title">{selectedDetailCopy.title}</h2>
            <p>{selectedDetailCopy.copy}</p>
            <ul>
              {selectedDetailCopy.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <button
              className="modal-cta"
              type="button"
              onClick={() => {
                const detail = selectedServiceDetail;
                setSelectedServiceDetail(null);
                requestSupport(detail);
              }}
            >
              {copy.serviceRequest} <Arrow />
            </button>
          </section>
        </div>
      )}

      {activeVideoModal && (
        <div
          className="video-modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveVideoModal(null);
          }}
        >
          <section
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <button
              className="video-modal-close"
              type="button"
              aria-label="Close video"
              onClick={() => setActiveVideoModal(null)}
            >
              ×
            </button>
            <div className="video-frame">
              <iframe
                title={activeVideoModal[2]}
                src={activeVideoModal[3].replace("watch?v=", "embed/")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h2 id="video-modal-title">{activeVideoModal[2]}</h2>
          </section>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="text-wordmark">
            <strong>MEDICAL TOURISM</strong>
            <em>VIETNAM SUPPORT</em>
          </span>
          <p>Clearer care journeys, from arrival to home.</p>
        </div>
        <div className="footer-links">
          <button type="button" onClick={() => scrollTo("about")}>
            Why Vietnam
          </button>
          <button type="button" onClick={() => scrollTo("services")}>
            Care options
          </button>
          <button type="button" onClick={() => scrollTo("media")}>
            Destination notes
          </button>
          <button type="button" onClick={() => scrollTo("privacy")}>
            Privacy & consent
          </button>
          <button type="button" onClick={() => scrollTo("contact")}>
            Request support
          </button>
        </div>
        <div className="footer-company">
          <p>Medical tourism support in Vietnam</p>
          <p>
            Independent coordination for international patients
            <br />
            Clinic matching, interpretation and local logistics
          </p>
          <p>Ho Chi Minh City　Hanoi　Da Nang</p>
        </div>
        <div className="footer-bottom">
          <span>Medical Tourism Support in Vietnam</span>
          <span>Privacy policy　Consent　Accessibility</span>
        </div>
      </footer>
      <div className="floating-tools">
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          aria-label="Request support"
        >
          ✦
        </button>
        <button
          type="button"
          onClick={() => scrollTo("top")}
          aria-label="Back to top"
        >
          <Arrow up />
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
