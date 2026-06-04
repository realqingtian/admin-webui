/**
 * 中文语言包
 */
export default {
  app: {
    name: '管理后台',
  },

  common: {
    confirm: '确定',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    create: '新增',
    search: '查询',
    reset: '重置',
    refresh: '刷新',
    export: '导出',
    all: '全部',
  },

  time: {
    minutesAgo: '{n} 分钟前',
    hoursAgo: '{n} 小时前',
  },

  menu: {
    dashboard: '控制台',
    example: '示例页面',
    image: '图片示例',
    upload: '上传示例',
  },

  layout: {
    footer: 'Admin WebUI © 2026 · 基于 Arco Design Vue',
    theme: {
      toLight: '切换为浅色',
      toDark: '切换为深色',
    },
    lang: {
      tooltip: '切换语言',
      zhCN: '简体中文',
      enUS: 'English',
      arSA: 'العربية',
      jaJP: '日本語',
    },
    user: {
      defaultName: '管理员',
      profile: '个人中心',
      profileInfo: '个人中心(示例)',
      logout: '退出登录',
    },
    logout: {
      title: '退出登录',
      content: '确定要退出当前账号吗?',
      ok: '退出',
      cancel: '取消',
      success: '已退出登录',
    },
  },

  notif: {
    tooltip: '通知中心',
    tabs: {
      all: '全部',
      message: '消息',
      notice: '通知',
      todo: '待办',
    },
    empty: '当前没有未读的内容',
    markAllRead: '全部已读',
    clear: '清空通知',
    viewAll: '查看全部',
    toast: {
      markedAllRead: '已全部标记为已读',
      cleared: '已清空通知',
      itemRead: '已标记为已读',
    },
    list: {
      newComment: {
        title: '张三 评论了你的文章',
        desc: '「这篇关于 Vue 3 的总结写得真不错…」',
      },
      dm: {
        title: '你收到一条来自 李四 的私信',
        desc: '关于本周需求评审,能否调整到周三?',
      },
      upgrade: {
        title: '系统升级公告',
        desc: '今晚 23:00 - 24:00 将进行例行维护,期间服务短暂不可用',
      },
      security: {
        title: '安全提醒',
        desc: '检测到新设备登录,请确认是否本人操作',
      },
      review: {
        title: '待审批:差旅报销申请',
        desc: '王五 提交了一笔 ¥1,280 的差旅报销,等待你的审批',
      },
      report: {
        title: '本周日报截止提醒',
        desc: '请在 18:00 前提交本周的工作日报',
      },
    },
  },

  breadcrumb: {
    home: '首页',
  },

  login: {
    brand: {
      title: 'Admin WebUI',
      desc: '基于 Arco Design Vue 的后台管理示例',
    },
    title: '登录',
    subtitle: '欢迎回来,请输入账号密码登录',
    form: {
      username: '账号',
      usernamePlaceholder: '请输入账号',
      password: '密码',
      passwordPlaceholder: '请输入密码',
      usernameRequired: '请输入账号',
      passwordRequired: '请输入密码',
      remember: '记住我',
      forgot: '忘记密码?',
      submit: '登 录',
    },
    success: '登录成功',
    fail: '登录失败,请重试',
    tips: '提示:任意账号密码均可登录(演示用,默认 admin / admin123)',
  },

  notFound: {
    title: '页面不存在',
    subtitle: '你访问的路径不存在,或已被移除',
    home: '返回首页',
    prev: '返回上一页',
  },

  dashboard: {
    stats: {
      revenue: '本月收入',
      newUsers: '新增用户',
      totalOrders: '订单总数',
      activeUsers: '活跃用户',
      compare: '较上月',
    },
    chart: {
      title: '近 12 个月销售',
      unit: '单位:万',
      monthLabel: '{n}月',
    },
    recent: {
      title: '最近订单',
    },
    table: {
      title: '近期订单明细',
      cols: {
        id: '订单号',
        customer: '客户',
        amount: '金额',
        status: '状态',
        time: '时间',
      },
    },
    status: {
      pending: '待付款',
      toShip: '待发货',
      shipped: '已发货',
      completed: '已完成',
      refunded: '已退款',
    },
  },

  example: {
    search: {
      keyword: '关键字',
      keywordPlaceholder: '姓名 / 邮箱',
      role: '角色',
      status: '状态',
      all: '全部',
    },
    toolbar: {
      add: '新增用户',
      export: '导出',
      refresh: '刷新',
      refreshSuccess: '刷新成功',
    },
    cols: {
      id: 'ID',
      name: '姓名',
      email: '邮箱',
      role: '角色',
      status: '状态',
      createdAt: '注册时间',
      actions: '操作',
    },
    actions: {
      edit: '编辑',
      delete: '删除',
    },
    role: {
      admin: '管理员',
      editor: '编辑',
      viewer: '只读',
    },
    status: {
      active: '正常',
      disabled: '禁用',
    },
    modal: {
      titleCreate: '新增用户',
      titleEdit: '编辑用户',
      fields: {
        name: '姓名',
        email: '邮箱',
        role: '角色',
        status: '状态',
      },
      placeholders: {
        name: '请输入姓名',
      },
      rules: {
        nameRequired: '请输入姓名',
        emailRequired: '请输入邮箱',
        emailFormat: '邮箱格式不正确',
      },
    },
    create: {
      success: '已新增',
    },
    update: {
      success: '已保存',
    },
    delete: {
      title: '删除确认',
      content: '确定要删除「{name}」吗?',
      success: '已删除',
    },
  },

  image: {
    sections: {
      basic: '基础用法',
      fit: '填充模式',
      caption: '标题与描述',
      group: '多图预览',
      states: '加载与错误状态',
    },
    caption: {
      title: '图片标题',
      inner: '描述文字在内部',
      outer: '描述文字在外部',
    },
    states: {
      loading: '加载效果',
      error: '加载失败',
      errorText: '图片加载失败',
      noPreview: '不可预览',
    },
  },

  upload: {
    sections: {
      basic: '基础用法',
      drag: '拖拽上传',
      photoWall: '照片墙',
      restrictions: '限制条件',
      manual: '手动上传',
    },
    descriptions: {
      basic: '点击或选择文件进行上传。',
      drag: '将文件拖拽到上传区域即可上传。',
      photoWall: '上传图片后以照片墙的形式展示，支持预览。',
      restrictions: '限制上传文件的类型（仅允许 PNG / JPEG / GIF）和数量（最多 3 个）。',
      manual: '选择文件后不会自动上传，可统一手动提交。',
    },
    messages: {
      success: '文件「{name}」上传成功',
    },
  },
}
