/**
 * Arabic locale (ar-SA)
 */
export default {
  app: {
    name: 'لوحة التحكم',
  },

  common: {
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    create: 'إنشاء',
    search: 'بحث',
    reset: 'إعادة تعيين',
    refresh: 'تحديث',
    export: 'تصدير',
    all: 'الكل',
  },

  time: {
    minutesAgo: 'منذ {n} دقيقة',
    hoursAgo: 'منذ {n} ساعة',
  },

  menu: {
    dashboard: 'لوحة التحكم',
    example: 'صفحة مثال',
    image: 'عرض الصور',
  },

  layout: {
    footer: 'لوحة تحكم الويب © 2026 · مبني باستخدام Arco Design Vue',
    theme: {
      toLight: 'التبديل إلى الوضع الفاتح',
      toDark: 'التبديل إلى الوضع الداكن',
    },
    lang: {
      tooltip: 'تغيير اللغة',
      zhCN: 'الصينية المبسطة',
      enUS: 'الإنجليزية',
      arSA: 'العربية',
      jaJP: 'اليابانية',
    },
    user: {
      defaultName: 'المسؤول',
      profile: 'الملف الشخصي',
      profileInfo: 'الملف الشخصي (تجريبي)',
      logout: 'تسجيل الخروج',
    },
    logout: {
      title: 'تسجيل الخروج',
      content: 'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
      ok: 'خروج',
      cancel: 'إلغاء',
      success: 'تم تسجيل الخروج',
    },
  },

  notif: {
    tooltip: 'مركز الإشعارات',
    tabs: {
      all: 'الكل',
      message: 'الرسائل',
      notice: 'الإشعارات',
      todo: 'المهام',
    },
    empty: 'لا توجد عناصر غير مقروءة',
    markAllRead: 'تحديد الكل كمقروء',
    clear: 'مسح الإشعارات',
    viewAll: 'عرض الكل',
    toast: {
      markedAllRead: 'تم تحديد الكل كمقروء',
      cleared: 'تم مسح الإشعارات',
      itemRead: 'تم تحديده كمقروء',
    },
    list: {
      newComment: {
        title: 'علق تشانغ سان على منشورك',
        desc: '"ملخص رائع عن Vue 3، مفيد حقاً..."',
      },
      dm: {
        title: 'رسالة خاصة جديدة من لي سي',
        desc: 'هل يمكننا نقل اجتماع المراجعة الأسبوعي إلى الأربعاء؟',
      },
      upgrade: {
        title: 'إشعار ترقية النظام',
        desc: 'صيانة مجدولة الليلة من 23:00 إلى 24:00',
      },
      security: {
        title: 'تنبيه أمني',
        desc: 'تم اكتشاف تسجيل دخول من جهاز جديد — يرجى التأكد من ذلك',
      },
      review: {
        title: 'موافقة معلقة: طلب تعويض السفر',
        desc: 'قدم وانغ وو طلب تعويض بقيمة ¥1,280 في انتظار موافقتك',
      },
      report: {
        title: 'التقرير الأسبوعي مستحق',
        desc: 'يرجى تقديم تقريرك الأسبوعي قبل 18:00',
      },
    },
  },

  breadcrumb: {
    home: 'الرئيسية',
  },

  login: {
    brand: {
      title: 'لوحة تحكم الويب',
      desc: 'قالب إدارة لوحة التحكم مبني باستخدام Arco Design Vue',
    },
    title: 'تسجيل الدخول',
    subtitle: 'مرحباً بعودتك، يرجى تسجيل الدخول للمتابعة',
    form: {
      username: 'اسم المستخدم',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      usernameRequired: 'اسم المستخدم مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      remember: 'تذكرني',
      forgot: 'نسيت كلمة المرور؟',
      submit: 'تسجيل الدخول',
    },
    success: 'تم تسجيل الدخول بنجاح',
    fail: 'فشل تسجيل الدخول، يرجى المحاولة مرة أخرى',
    tips: 'ملاحظة: أي بيانات اعتماد تعمل في هذا العرض التوضيحي (الافتراضي: admin / admin123)',
  },

  notFound: {
    title: 'الصفحة غير موجودة',
    subtitle: 'الصفحة التي زرتها غير موجودة أو تمت إزالتها.',
    home: 'العودة إلى الرئيسية',
    prev: 'العودة',
  },

  dashboard: {
    stats: {
      revenue: 'إيرادات الشهر',
      newUsers: 'المستخدمون الجدد',
      totalOrders: 'إجمالي الطلبات',
      activeUsers: 'المستخدمون النشطون',
      compare: 'مقارنة بالشهر الماضي',
    },
    chart: {
      title: 'مبيعات آخر 12 شهراً',
      unit: 'الوحدة: 10 آلاف',
      monthLabel: 'شهر {n}',
    },
    recent: {
      title: 'الطلبات الأخيرة',
    },
    table: {
      title: 'تفاصيل الطلبات الأخيرة',
      cols: {
        id: 'رقم الطلب',
        customer: 'العميل',
        amount: 'المبلغ',
        status: 'الحالة',
        time: 'الوقت',
      },
    },
    status: {
      pending: 'انتظار الدفع',
      toShip: 'في انتظار الشحن',
      shipped: 'تم الشحن',
      completed: 'مكتمل',
      refunded: 'مسترد',
    },
  },

  example: {
    search: {
      keyword: 'كلمة مفتاحية',
      keywordPlaceholder: 'الاسم / البريد الإلكتروني',
      role: 'الدور',
      status: 'الحالة',
      all: 'الكل',
    },
    toolbar: {
      add: 'إضافة مستخدم',
      export: 'تصدير',
      refresh: 'تحديث',
      refreshSuccess: 'تم التحديث',
    },
    cols: {
      id: 'المعرف',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      role: 'الدور',
      status: 'الحالة',
      createdAt: 'تاريخ الإنشاء',
      actions: 'الإجراءات',
    },
    actions: {
      edit: 'تعديل',
      delete: 'حذف',
    },
    role: {
      admin: 'مسؤول',
      editor: 'محرر',
      viewer: 'قارئ',
    },
    status: {
      active: 'نشط',
      disabled: 'معطل',
    },
    modal: {
      titleCreate: 'إضافة مستخدم',
      titleEdit: 'تعديل مستخدم',
      fields: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        role: 'الدور',
        status: 'الحالة',
      },
      placeholders: {
        name: 'أدخل الاسم',
      },
      rules: {
        nameRequired: 'الاسم مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailFormat: 'تنسيق البريد الإلكتروني غير صحيح',
      },
    },
    create: {
      success: 'تم الإنشاء',
    },
    update: {
      success: 'تم الحفظ',
    },
    delete: {
      title: 'تأكيد الحذف',
      content: 'هل أنت متأكد من أنك تريد حذف "{name}"؟',
      success: 'تم الحذف',
    },
  },

  image: {
    sections: {
      basic: 'الاستخدام الأساسي',
      fit: 'وضع التعبئة',
      caption: 'العنوان والوصف',
      group: 'معاينة مجموعة الصور',
      states: 'حالات التحميل والخطأ',
    },
    caption: {
      title: 'عنوان الصورة',
      inner: 'الوصف بالداخل',
      outer: 'الوصف بالخارج',
    },
    states: {
      loading: 'تأثير التحميل',
      error: 'خطأ في التحميل',
      errorText: 'فشل تحميل الصورة',
      noPreview: 'بدون معاينة',
    },
  },
}
