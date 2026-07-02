/* =========================================================
   Rim Medical — البيانات الافتراضية (Default Data)
   ---------------------------------------------------------
   هذا الملف هو "قاعدة البيانات" المبدئية للموقع.
   أي تعديل تقوم به من لوحة التحكم يُحفَظ في متصفحك (localStorage)
   ويطغى على القيم الموجودة هنا.
   لنشر التعديلات للجميع: استخدم زر "تصدير ملف البيانات" في لوحة
   التحكم ثم استبدل هذا الملف بالملف الذي تم تنزيله.
   ========================================================= */

window.RIM_DEFAULT_DATA = {
  version: 2,

  settings: {
    /* رقم واتساب الزبائن العاديين (أفراد/عائلات) */
    customerWhatsapp: "22228646987",
    /* رقم واتساب المؤسسات (عيادات، صيدليات، جمعيات) — منفصل تماماً */
    institutionalWhatsapp: "22236199416",
    /* شعار الموقع: اتركه فارغاً لاستخدام الشعار الافتراضي،
       أو ارفع صورة من لوحة التحكم */
    logo: "",
    /* أرقام الإحصائيات (الدليل الاجتماعي) */
    stats: {
      ordersDelivered: 1250,
      happyClients: 940,
      partners: 35,
      yearsExperience: 8
    },
    /* روابط التواصل الاجتماعي (اتركها فارغة لإخفائها) */
    social: {
      facebook: "",
      instagram: "",
      tiktok: ""
    }
  },

  /* ------------------------------------------------------
     الفئات (التصنيفات) — قابلة للإضافة والتعديل والحذف من
     لوحة التحكم. لكل فئة: معرّف، أيقونة، اسم ووصف بالثلاث لغات
     ------------------------------------------------------ */
  categories: [
    {
      id: "furniture", icon: "🛏️",
      name: { ar: "الأثاث الطبي", fr: "Mobilier médical", en: "Medical Furniture" },
      desc: { ar: "أسرّة استشفاء، حوامل محاليل، وسواتر طبية", fr: "Lits d'hospitalisation, potences et paravents", en: "Hospital beds, IV stands and screens" }
    },
    {
      id: "logistics", icon: "🛒",
      name: { ar: "عربات وتجهيزات لوجستية", fr: "Chariots et logistique", en: "Carts & Logistics" },
      desc: { ar: "عربات نقل طبية متعددة الطوابق", fr: "Chariots médicaux à plusieurs étages", en: "Multi-tier medical transport carts" }
    },
    {
      id: "hygiene", icon: "🗑️",
      name: { ar: "مستلزمات النظافة الطبية", fr: "Hygiène médicale", en: "Medical Hygiene" },
      desc: { ar: "سلات مهملات طبية بأحجام متعددة", fr: "Poubelles médicales de toutes tailles", en: "Medical waste bins in multiple sizes" }
    },
    {
      id: "diagnostic", icon: "🩺",
      name: { ar: "أجهزة التشخيص والقياس", fr: "Diagnostic et mesure", en: "Diagnostics & Measurement" },
      desc: { ar: "دوبلر جنيني، أوتوسكوب، وموازين طبية", fr: "Doppler fœtal, otoscope et balances", en: "Fetal doppler, otoscope and scales" }
    },
    {
      id: "sterilization", icon: "♨️",
      name: { ar: "أجهزة التعقيم", fr: "Stérilisation", en: "Sterilization" },
      desc: { ar: "أجهزة أوتوكلاف بأحجام مختلفة", fr: "Autoclaves de différentes capacités", en: "Autoclaves in various capacities" }
    },
    {
      id: "mobility", icon: "🦯",
      name: { ar: "مساعدات الحركة والراحة", fr: "Mobilité et confort", en: "Mobility & Comfort" },
      desc: { ar: "عصي، كراسي حمام، وأحذية طبية", fr: "Cannes, chaises garde-robe et chaussures médicales", en: "Canes, commode chairs and medical shoes" }
    },
    {
      id: "care", icon: "🧴",
      name: { ar: "مستلزمات الرعاية والعلاج", fr: "Soins et thérapie", en: "Care & Therapy" },
      desc: { ar: "صناديق صيدلية، أحواض، وجوارب ضاغطة", fr: "Boîtes à pharmacie, bassins et bas de contention", en: "Pharmacy boxes, bedpans and compression stockings" }
    }
  ],

  /* ------------------------------------------------------
     المنتجات — لكل منتج:
     id        : معرّف فريد
     category  : furniture | logistics | hygiene | diagnostic | sterilization | mobility | care
     name/desc : الاسم والوصف بالثلاث لغات
     price     : السعر بالأوقية الجديدة (MRU) — اتركه null لعرض "السعر عند الطلب"
     image     : رابط صورة أو صورة مرفوعة من لوحة التحكم — فارغ = أيقونة افتراضية
     icon      : أيقونة (إيموجي) تُعرض إذا لم توجد صورة
     badge     : "best" (الأكثر طلباً) | "new" (جديد) | null
     ------------------------------------------------------ */
  products: [
    {
      id: "p-hospital-bed",
      category: "furniture",
      icon: "🛏️",
      image: "",
      price: null,
      badge: "best",
      name: {
        ar: "سرير استشفاء طبي",
        fr: "Lit d'hospitalisation",
        en: "Hospital Bed"
      },
      desc: {
        ar: "سرير استشفاء طبي متين بمواصفات صحية معتمدة، مثالي للمستشفيات والعيادات والرعاية المنزلية.",
        fr: "Lit d'hospitalisation robuste conforme aux normes sanitaires, idéal pour hôpitaux, cliniques et soins à domicile.",
        en: "Sturdy hospital bed compliant with approved health standards, ideal for hospitals, clinics and home care."
      }
    },
    {
      id: "p-iv-stand",
      category: "furniture",
      icon: "💉",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "حامل محاليل (علاقة سيروم)",
        fr: "Potence porte-sérum",
        en: "IV Drip Stand"
      },
      desc: {
        ar: "حامل محاليل طبي ثابت وقابل لتعديل الارتفاع، بخطافات متعددة لتعليق أكياس المحاليل بأمان.",
        fr: "Potence stable à hauteur réglable, avec plusieurs crochets pour suspendre les poches de sérum en toute sécurité.",
        en: "Stable, height-adjustable IV stand with multiple hooks to hang solution bags safely."
      }
    },
    {
      id: "p-screen",
      category: "furniture",
      icon: "🚪",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "ساتر طبي (بارافان)",
        fr: "Paravent médical",
        en: "Medical Privacy Screen"
      },
      desc: {
        ar: "ساتر طبي متنقل لعزل الأسرّة وضمان خصوصية المرضى في المستشفيات والعيادات.",
        fr: "Paravent mobile pour séparer les lits et garantir l'intimité des patients dans les hôpitaux et cliniques.",
        en: "Mobile privacy screen to separate beds and ensure patient privacy in hospitals and clinics."
      }
    },
    {
      id: "p-cart-2",
      category: "logistics",
      icon: "🛒",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "عربة نقل طبية — طابقان",
        fr: "Chariot médical 2 étages",
        en: "2-Tier Medical Trolley"
      },
      desc: {
        ar: "عربة نقل طبية بطابقين وعجلات سلسة الحركة، لنقل الأدوات والمستلزمات داخل المنشآت الصحية.",
        fr: "Chariot médical à 2 étages avec roues fluides, pour transporter instruments et fournitures dans les établissements de santé.",
        en: "2-tier medical trolley with smooth-rolling wheels for moving instruments and supplies in healthcare facilities."
      }
    },
    {
      id: "p-cart-3",
      category: "logistics",
      icon: "🛒",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "عربة نقل طبية — 3 طوابق",
        fr: "Chariot médical 3 étages",
        en: "3-Tier Medical Trolley"
      },
      desc: {
        ar: "عربة نقل طبية بثلاثة طوابق توفر مساحة تخزين أكبر، مثالية للمستشفيات والمختبرات والصيدليات.",
        fr: "Chariot médical à 3 étages offrant plus d'espace de rangement, idéal pour hôpitaux, laboratoires et pharmacies.",
        en: "3-tier medical trolley offering extra storage space, ideal for hospitals, laboratories and pharmacies."
      }
    },
    {
      id: "p-bin-12",
      category: "hygiene",
      icon: "🗑️",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "سلة مهملات طبية 12 لتر",
        fr: "Poubelle médicale 12 L",
        en: "Medical Waste Bin 12 L"
      },
      desc: {
        ar: "سلة مهملات طبية بسعة 12 لتراً، مناسبة لغرف الفحص والعيادات الصغيرة.",
        fr: "Poubelle médicale de 12 litres, adaptée aux salles d'examen et petites cliniques.",
        en: "12-litre medical waste bin, suitable for exam rooms and small clinics."
      }
    },
    {
      id: "p-bin-20",
      category: "hygiene",
      icon: "🗑️",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "سلة مهملات طبية بدواسة 20 لتر",
        fr: "Poubelle médicale à pédale 20 L",
        en: "Pedal Medical Waste Bin 20 L"
      },
      desc: {
        ar: "سلة مهملات طبية بدواسة قدم بسعة 20 لتراً، فتح دون لمس لنظافة وأمان أكبر.",
        fr: "Poubelle médicale à pédale de 20 litres, ouverture sans contact pour plus d'hygiène et de sécurité.",
        en: "20-litre pedal-operated medical bin with touch-free opening for better hygiene and safety."
      }
    },
    {
      id: "p-bin-30",
      category: "hygiene",
      icon: "🗑️",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "سلة مهملات طبية بدواسة 30 لتر",
        fr: "Poubelle médicale à pédale 30 L",
        en: "Pedal Medical Waste Bin 30 L"
      },
      desc: {
        ar: "سلة مهملات طبية بدواسة قدم بسعة 30 لتراً، مثالية لأقسام المستشفيات وقاعات الانتظار.",
        fr: "Poubelle médicale à pédale de 30 litres, idéale pour les services hospitaliers et salles d'attente.",
        en: "30-litre pedal-operated medical bin, ideal for hospital wards and waiting areas."
      }
    },
    {
      id: "p-bin-50",
      category: "hygiene",
      icon: "🗑️",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "سلة مهملات طبية بدواسة 50 لتر",
        fr: "Poubelle médicale à pédale 50 L",
        en: "Pedal Medical Waste Bin 50 L"
      },
      desc: {
        ar: "سلة مهملات طبية بدواسة قدم بسعة كبيرة 50 لتراً، للأقسام ذات الاستخدام الكثيف.",
        fr: "Grande poubelle médicale à pédale de 50 litres, pour les services à usage intensif.",
        en: "Large 50-litre pedal-operated medical bin for high-traffic departments."
      }
    },
    {
      id: "p-doppler",
      category: "diagnostic",
      icon: "👶",
      image: "",
      price: null,
      badge: "best",
      name: {
        ar: "جهاز سونار منزلي (دوبلر جنيني)",
        fr: "Doppler fœtal",
        en: "Fetal Doppler"
      },
      desc: {
        ar: "جهاز دوبلر جنيني منزلي للاستماع إلى نبض الجنين بوضوح وأمان، سهل الاستخدام للأمهات الحوامل.",
        fr: "Doppler fœtal à domicile pour écouter clairement et en toute sécurité les battements du cœur du fœtus, facile à utiliser.",
        en: "Home fetal doppler to hear the baby's heartbeat clearly and safely, easy for expectant mothers to use."
      }
    },
    {
      id: "p-otoscope",
      category: "diagnostic",
      icon: "👂",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "جهاز فحص الأذن (أوتوسكوب)",
        fr: "Otoscope",
        en: "Otoscope"
      },
      desc: {
        ar: "أوتوسكوب بإضاءة قوية وعدسة مكبّرة لفحص الأذن بدقة، مناسب للأطباء والعيادات.",
        fr: "Otoscope à éclairage puissant et loupe grossissante pour un examen précis de l'oreille, adapté aux médecins et cliniques.",
        en: "Otoscope with bright light and magnifying lens for precise ear examination, suitable for doctors and clinics."
      }
    },
    {
      id: "p-scale",
      category: "diagnostic",
      icon: "⚖️",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "ميزان طبي مع مقياس طول",
        fr: "Balance médicale avec toise",
        en: "Medical Scale with Height Rod"
      },
      desc: {
        ar: "ميزان طبي دقيق مزود بمقياس طول مدمج، لقياس الوزن والطول معاً في العيادات والمراكز الصحية.",
        fr: "Balance médicale précise équipée d'une toise intégrée, pour mesurer poids et taille dans les cliniques et centres de santé.",
        en: "Accurate medical scale with built-in height rod, measuring weight and height in clinics and health centres."
      }
    },
    {
      id: "p-autoclave-18",
      category: "sterilization",
      icon: "♨️",
      image: "",
      price: null,
      badge: "best",
      name: {
        ar: "جهاز تعقيم (أوتوكلاف) 18 لتر",
        fr: "Autoclave 18 L",
        en: "Autoclave 18 L"
      },
      desc: {
        ar: "جهاز أوتوكلاف بسعة 18 لتراً لتعقيم الأدوات الطبية بالبخار وفق المعايير الصحية المعتمدة.",
        fr: "Autoclave de 18 litres pour la stérilisation à la vapeur des instruments médicaux selon les normes sanitaires.",
        en: "18-litre autoclave for steam sterilization of medical instruments according to approved health standards."
      }
    },
    {
      id: "p-autoclave-24",
      category: "sterilization",
      icon: "♨️",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "جهاز تعقيم (أوتوكلاف) 24 لتر",
        fr: "Autoclave 24 L",
        en: "Autoclave 24 L"
      },
      desc: {
        ar: "جهاز أوتوكلاف بسعة 24 لتراً يلبي احتياجات العيادات والمختبرات ذات الحجم الأكبر.",
        fr: "Autoclave de 24 litres répondant aux besoins des cliniques et laboratoires de plus grande taille.",
        en: "24-litre autoclave meeting the needs of larger clinics and laboratories."
      }
    },
    {
      id: "p-cane-torch",
      category: "mobility",
      icon: "🦯",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "عصا طبية مزودة بكشاف",
        fr: "Canne médicale avec torche",
        en: "Medical Cane with Torch"
      },
      desc: {
        ar: "عصا طبية متينة مزودة بكشاف إضاءة مدمج، لمزيد من الأمان أثناء التنقل ليلاً.",
        fr: "Canne médicale robuste équipée d'une torche intégrée, pour plus de sécurité lors des déplacements nocturnes.",
        en: "Sturdy medical cane with built-in torch for extra safety when moving at night."
      }
    },
    {
      id: "p-toilet-chair-black",
      category: "mobility",
      icon: "🪑",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "كرسي حمام طبي — أسود",
        fr: "Chaise garde-robe noire",
        en: "Commode Chair — Black"
      },
      desc: {
        ar: "كرسي حمام طبي أسود متين ومريح، يسهّل العناية اليومية للمرضى وكبار السن.",
        fr: "Chaise garde-robe noire solide et confortable, facilitant les soins quotidiens des patients et personnes âgées.",
        en: "Sturdy, comfortable black commode chair, making daily care easier for patients and the elderly."
      }
    },
    {
      id: "p-toilet-chair-white",
      category: "mobility",
      icon: "🪑",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "كرسي حمام طبي — أبيض",
        fr: "Chaise garde-robe blanche",
        en: "Commode Chair — White"
      },
      desc: {
        ar: "كرسي حمام طبي أبيض بتصميم عملي وسهل التنظيف، للاستخدام المنزلي والمؤسسي.",
        fr: "Chaise garde-robe blanche au design pratique et facile à nettoyer, pour usage domestique et institutionnel.",
        en: "White commode chair with a practical, easy-to-clean design for home and institutional use."
      }
    },
    {
      id: "p-shoes",
      category: "mobility",
      icon: "👟",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "أحذية طبية",
        fr: "Chaussures médicales",
        en: "Medical Shoes"
      },
      desc: {
        ar: "أحذية طبية مريحة تدعم القدم وتخفف الضغط، مناسبة للعاملين في القطاع الصحي ولمن يقفون طويلاً.",
        fr: "Chaussures médicales confortables qui soutiennent le pied et réduisent la pression, idéales pour le personnel de santé.",
        en: "Comfortable medical shoes that support the foot and relieve pressure, ideal for healthcare workers."
      }
    },
    {
      id: "p-air-mattress",
      category: "care",
      icon: "🛏️",
      image: "",
      price: null,
      badge: "best",
      name: {
        ar: "مرتبة هوائية لمنع التقرحات",
        fr: "Matelas anti-escarres",
        en: "Anti-Bedsore Air Mattress"
      },
      desc: {
        ar: "مرتبة هوائية متموجة مع مضخة كهربائية هادئة، تقي المرضى طريحي الفراش من قرح الضغط.",
        fr: "Matelas à air alterné avec pompe électrique silencieuse, prévient les escarres chez les patients alités.",
        en: "Alternating air mattress with a quiet electric pump, prevents pressure sores for bedridden patients."
      }
    },
    {
      id: "p-pharmacy-box",
      category: "care",
      icon: "💊",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "صندوق صيدلية أبيض",
        fr: "Boîte à pharmacie blanche",
        en: "White First-Aid Box"
      },
      desc: {
        ar: "صندوق صيدلية أبيض منظم لحفظ الأدوية والإسعافات الأولية في المنزل أو العمل.",
        fr: "Boîte à pharmacie blanche bien organisée pour conserver médicaments et premiers secours à la maison ou au travail.",
        en: "Organized white first-aid box for storing medicines and first-aid supplies at home or work."
      }
    },
    {
      id: "p-bassin",
      category: "care",
      icon: "🚿",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "حوض غسيل طبي (باسين)",
        fr: "Bassin de lit",
        en: "Bedpan"
      },
      desc: {
        ar: "حوض غسيل طبي (باسين) عملي وسهل التعقيم، للعناية اليومية بالمرضى في السرير.",
        fr: "Bassin de lit pratique et facile à stériliser, pour les soins quotidiens des patients alités.",
        en: "Practical, easy-to-sterilize bedpan for daily care of bedridden patients."
      }
    },
    {
      id: "p-compression-socks",
      category: "care",
      icon: "🧦",
      image: "",
      price: null,
      badge: null,
      name: {
        ar: "جوارب ضاغطة",
        fr: "Bas de contention",
        en: "Compression Stockings"
      },
      desc: {
        ar: "جوارب ضاغطة طبية تحسّن الدورة الدموية وتخفف تورم الساقين ودوالي الأوردة.",
        fr: "Bas de contention médicaux qui améliorent la circulation sanguine et soulagent le gonflement des jambes et les varices.",
        en: "Medical compression stockings that improve blood circulation and relieve leg swelling and varicose veins."
      }
    }
  ]
};
