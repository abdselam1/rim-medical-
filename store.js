/* =========================================================
   Rim Medical — طبقة البيانات (Data Layer) — نسخة Supabase
   ---------------------------------------------------------
   هذه الطبقة هي الوسيط الوحيد بين الصفحات والبيانات.
   القراءة: من قاعدة بيانات Supabase (مع نسخة مؤقتة في المتصفح
   للعرض الفوري، وبيانات data.js كاحتياط عند انقطاع الإنترنت).
   الكتابة: من لوحة التحكم فقط بعد تسجيل دخول حقيقي (Supabase Auth)،
   وقواعد الحماية في القاعدة تمنع أي كتابة من غير حساب المالك.
   ========================================================= */

(function () {
  "use strict";

  /* ---- إعدادات Supabase ----
     المفتاح أدناه "مفتاح عام قابل للنشر" مخصص لوضعه في كود
     المواقع — ليس سرياً، والحماية الحقيقية في قواعد RLS بالقاعدة */
  var SUPA_URL = "https://tqzqdpofajovfzslehdv.supabase.co";
  var SUPA_KEY = "sb_publishable_ix1uiR2CJi1KqcElGnEWyA_rtead14k";
  var OWNER_EMAIL = "senedmedical@gmail.com";

  var CACHE_KEY = "rim_medical_remote_cache_v1";
  var SESSION_KEY = "rim_medical_supa_session_v1";

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getDefaults() {
    return deepClone(window.RIM_DEFAULT_DATA);
  }

  function validData(d) {
    return d && d.settings && Array.isArray(d.products);
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (validData(d)) return d;
      }
    } catch (e) {}
    return null;
  }

  function writeCache(d) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (e) {}
  }

  /* البيانات الحالية في الذاكرة: آخر نسخة معروفة (كاش ثم القاعدة) */
  var current = readCache() || getDefaults();
  if (!Array.isArray(current.categories) || !current.categories.length) {
    current.categories = getDefaults().categories;
  }

  /* ---- جلب أحدث نسخة من قاعدة البيانات (وعد جاهزية) ---- */
  var ready = fetch(SUPA_URL + "/rest/v1/site_data?id=eq.1&select=data", {
    headers: { apikey: SUPA_KEY }
  })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)); })
    .then(function (rows) {
      var d = rows && rows[0] && rows[0].data;
      if (validData(d)) {
        current = d;
        writeCache(d);
      }
      return deepClone(current);
    })
    .catch(function () {
      /* لا إنترنت أو خطأ مؤقت — نكمل بالكاش/الافتراضي */
      return deepClone(current);
    });

  /* قراءة البيانات (فورية — من آخر نسخة معروفة) */
  function getData() {
    return deepClone(current);
  }

  /* حفظ في الذاكرة والكاش (النشر للجميع عبر publish أدناه) */
  function saveData(data) {
    current = deepClone(data);
    writeCache(current);
    return true;
  }

  function resetData() {
    try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
  }

  function hasLocalChanges() {
    return false;
  }

  /* =========================================================
     المصادقة (Supabase Auth) — للوحة التحكم فقط
     ========================================================= */
  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (s && s.access_token && s.refresh_token) return s;
    } catch (e) {}
    return null;
  }

  function setSession(s) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function authRequest(path, body) {
    return fetch(SUPA_URL + "/auth/v1/" + path, {
      method: "POST",
      headers: { apikey: SUPA_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().then(function (j) { return { ok: r.ok, json: j }; });
    });
  }

  function authError(j) {
    var msg = (j && (j.error_description || j.msg || (j.error && j.error.message))) || "";
    if (/invalid login credentials/i.test(msg)) return "كلمة المرور غير صحيحة";
    if (/already|registered/i.test(msg)) return "الحساب موجود مسبقاً — استخدم زر الدخول العادي";
    if (/at least|password/i.test(msg)) return "كلمة المرور قصيرة — 6 أحرف على الأقل";
    return msg || "تعذّر الاتصال — تحقق من الإنترنت";
  }

  function storeAuth(j) {
    var s = {
      access_token: j.access_token,
      refresh_token: j.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + (j.expires_in || 3600) - 60,
      email: j.user && j.user.email
    };
    setSession(s);
    return s;
  }

  /* تسجيل الدخول بكلمة المرور (بريد المالك ثابت) */
  function signIn(password) {
    return authRequest("token?grant_type=password", { email: OWNER_EMAIL, password: password })
      .then(function (res) {
        if (res.ok && res.json.access_token) return storeAuth(res.json);
        throw new Error(authError(res.json));
      });
  }

  /* إنشاء حساب المالك أول مرة (يدخل مباشرة بعد الإنشاء) */
  function signUp(password) {
    return authRequest("signup", { email: OWNER_EMAIL, password: password })
      .then(function (res) {
        if (res.ok && res.json.access_token) return storeAuth(res.json);
        throw new Error(authError(res.json));
      });
  }

  function refreshSession(s) {
    return authRequest("token?grant_type=refresh_token", { refresh_token: s.refresh_token })
      .then(function (res) {
        if (res.ok && res.json.access_token) return storeAuth(res.json);
        clearSession();
        throw new Error("انتهت الجلسة — سجّل الدخول من جديد");
      });
  }

  /* جلسة صالحة (تُجدَّد تلقائياً عند انتهائها) */
  function freshSession() {
    var s = getSession();
    if (!s) return Promise.reject(new Error("غير مسجّل الدخول"));
    if (s.expires_at > Math.floor(Date.now() / 1000)) return Promise.resolve(s);
    return refreshSession(s);
  }

  function signOut() {
    clearSession();
  }

  /* تغيير كلمة مرور الحساب */
  function changePassword(newPass) {
    return freshSession().then(function (s) {
      return fetch(SUPA_URL + "/auth/v1/user", {
        method: "PUT",
        headers: {
          apikey: SUPA_KEY,
          Authorization: "Bearer " + s.access_token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: newPass })
      }).then(function (r) {
        if (r.ok) return true;
        return r.json().then(function (j) { throw new Error(authError(j)); });
      });
    });
  }

  /* =========================================================
     النشر: كتابة البيانات في القاعدة ليراها كل الزوار فوراً
     ========================================================= */
  function publish(data) {
    var d = deepClone(data || current);
    return freshSession()
      .then(function (s) {
        return fetch(SUPA_URL + "/rest/v1/site_data?id=eq.1", {
          method: "PATCH",
          headers: {
            apikey: SUPA_KEY,
            Authorization: "Bearer " + s.access_token,
            "Content-Type": "application/json",
            Prefer: "return=representation"
          },
          body: JSON.stringify({ data: d })
        });
      })
      .then(function (r) {
        return r.json().then(function (rows) {
          if (r.ok && Array.isArray(rows) && rows.length) {
            current = d;
            writeCache(d);
            return true;
          }
          var msg = rows && rows.message;
          throw new Error(msg || "رُفض النشر — سجّل الخروج ثم الدخول وحاول مجدداً");
        });
      });
  }

  /* =========================================================
     تقييمات الزبائن (Reviews)
     ========================================================= */

  /* جلب التقييمات المعتمدة (للموقع العام) */
  function fetchReviews() {
    return fetch(SUPA_URL + "/rest/v1/reviews?approved=eq.true&select=name,reviewer_type,rating,comment,created_at&order=created_at.desc&limit=30", {
      headers: { apikey: SUPA_KEY }
    })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  }

  /* إرسال تقييم جديد (من أي زائر — يظهر بعد موافقة الإدارة) */
  function submitReview(review) {
    return fetch(SUPA_URL + "/rest/v1/reviews", {
      method: "POST",
      headers: { apikey: SUPA_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(review.name || "").trim().slice(0, 60),
        reviewer_type: review.reviewer_type === "institution" ? "institution" : "individual",
        rating: Math.min(5, Math.max(1, parseInt(review.rating, 10) || 5)),
        comment: String(review.comment || "").trim().slice(0, 600)
      })
    }).then(function (r) {
      if (r.ok) return true;
      return r.json().then(function (j) {
        throw new Error((j && j.message) || "تعذّر الإرسال — تحقق من البيانات");
      });
    });
  }

  /* (للوحة التحكم) كل التقييمات بما فيها غير المعتمدة */
  function adminFetchReviews() {
    return freshSession().then(function (s) {
      return fetch(SUPA_URL + "/rest/v1/reviews?select=*&order=created_at.desc", {
        headers: { apikey: SUPA_KEY, Authorization: "Bearer " + s.access_token }
      }).then(function (r) {
        if (!r.ok) throw new Error("تعذّر جلب التقييمات");
        return r.json();
      });
    });
  }

  /* (للوحة التحكم) اعتماد أو إخفاء تقييم */
  function setReviewApproval(id, approved) {
    return freshSession().then(function (s) {
      return fetch(SUPA_URL + "/rest/v1/reviews?id=eq." + encodeURIComponent(id), {
        method: "PATCH",
        headers: {
          apikey: SUPA_KEY, Authorization: "Bearer " + s.access_token,
          "Content-Type": "application/json", Prefer: "return=representation"
        },
        body: JSON.stringify({ approved: !!approved })
      }).then(function (r) {
        return r.json().then(function (rows) {
          if (r.ok && Array.isArray(rows) && rows.length) return true;
          throw new Error("لم يُنفَّذ — تحقق من تسجيل الدخول");
        });
      });
    });
  }

  /* (للوحة التحكم) حذف تقييم نهائياً */
  function deleteReview(id) {
    return freshSession().then(function (s) {
      return fetch(SUPA_URL + "/rest/v1/reviews?id=eq." + encodeURIComponent(id), {
        method: "DELETE",
        headers: { apikey: SUPA_KEY, Authorization: "Bearer " + s.access_token, Prefer: "return=representation" }
      }).then(function (r) {
        return r.json().then(function (rows) {
          if (r.ok && Array.isArray(rows) && rows.length) return true;
          throw new Error("لم يُحذف — تحقق من تسجيل الدخول");
        });
      });
    });
  }

  /* توليد محتوى ملف data.js من البيانات الحالية (نسخة احتياطية) */
  function exportDataFile() {
    var data = getData();
    return (
      "/* Rim Medical — ملف البيانات (تم توليده من لوحة التحكم بتاريخ " +
      new Date().toLocaleString() +
      ") */\n" +
      "window.RIM_DEFAULT_DATA = " +
      JSON.stringify(data, null, 2) +
      ";\n"
    );
  }

  /* رابط واتساب جاهز */
  function waLink(number, text) {
    var clean = String(number || "").replace(/[^0-9]/g, "");
    var url = "https://wa.me/" + clean;
    if (text) url += "?text=" + encodeURIComponent(text);
    return url;
  }

  window.RimStore = {
    STORAGE_KEY: CACHE_KEY,
    OWNER_EMAIL: OWNER_EMAIL,
    ready: ready,
    getDefaults: getDefaults,
    getData: getData,
    saveData: saveData,
    resetData: resetData,
    hasLocalChanges: hasLocalChanges,
    exportDataFile: exportDataFile,
    waLink: waLink,
    getSession: getSession,
    freshSession: freshSession,
    SUPA_URL: SUPA_URL,
    SUPA_KEY: SUPA_KEY,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    changePassword: changePassword,
    publish: publish,
    fetchReviews: fetchReviews,
    submitReview: submitReview,
    adminFetchReviews: adminFetchReviews,
    setReviewApproval: setReviewApproval,
    deleteReview: deleteReview
  };
})();
