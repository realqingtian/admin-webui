/**
 * 日本語ロケール (ja-JP)
 */
export default {
  app: {
    name: '管理画面',
  },

  common: {
    confirm: '確認',
    cancel: 'キャンセル',
    save: '保存',
    delete: '削除',
    edit: '編集',
    create: '新規作成',
    search: '検索',
    reset: 'リセット',
    refresh: '更新',
    export: 'エクスポート',
    all: 'すべて',
  },

  time: {
    minutesAgo: '{n} 分前',
    hoursAgo: '{n} 時間前',
  },

  menu: {
    dashboard: 'ダッシュボード',
    example: 'サンプルページ',
  },

  layout: {
    footer: 'Admin WebUI © 2026 · Arco Design Vue 製',
    theme: {
      toLight: 'ライトモードに切り替え',
      toDark: 'ダークモードに切り替え',
    },
    lang: {
      tooltip: '言語を切り替え',
      zhCN: '簡体字中国語',
      enUS: '英語',
      arSA: 'アラビア語',
      jaJP: '日本語',
    },
    user: {
      defaultName: '管理者',
      profile: 'プロフィール',
      profileInfo: 'プロフィール（デモ）',
      logout: 'ログアウト',
    },
    logout: {
      title: 'ログアウト',
      content: 'ログアウトしてもよろしいですか？',
      ok: 'ログアウト',
      cancel: 'キャンセル',
      success: 'ログアウトしました',
    },
  },

  notif: {
    tooltip: '通知センター',
    tabs: {
      all: 'すべて',
      message: 'メッセージ',
      notice: 'お知らせ',
      todo: 'やること',
    },
    empty: '未読の項目はありません',
    markAllRead: 'すべて既読にする',
    clear: '通知をクリア',
    viewAll: 'すべて表示',
    toast: {
      markedAllRead: 'すべて既読にしました',
      cleared: '通知をクリアしました',
      itemRead: '既読にしました',
    },
    list: {
      newComment: {
        title: '張三さんがあなたの投稿にコメントしました',
        desc: '「Vue 3 に関するまとめ、とても参考になります…」',
      },
      dm: {
        title: '李四さんから新しいメッセージ',
        desc: '今週のレビュー会議を水曜日に変更できますか？',
      },
      upgrade: {
        title: 'システムアップグレードのお知らせ',
        desc: '今晩 23:00 ～ 24:00 に定期メンテナンスを実施します',
      },
      security: {
        title: 'セキュリティアラート',
        desc: '新しいデバイスからのログインを検出しました。ご確認ください',
      },
      review: {
        title: '承認待ち：出張精算申請',
        desc: '王五さんが ¥1,280 の出張精算を申請しています',
      },
      report: {
        title: '週報の提出期限',
        desc: '18:00 までに週報を提出してください',
      },
    },
  },

  breadcrumb: {
    home: 'ホーム',
  },

  login: {
    brand: {
      title: 'Admin WebUI',
      desc: 'Arco Design Vue 製 管理画面テンプレート',
    },
    title: 'ログイン',
    subtitle: 'おかえりなさい。続行するにはログインしてください',
    form: {
      username: 'ユーザー名',
      usernamePlaceholder: 'ユーザー名を入力',
      password: 'パスワード',
      passwordPlaceholder: 'パスワードを入力',
      usernameRequired: 'ユーザー名は必須です',
      passwordRequired: 'パスワードは必須です',
      remember: 'ログイン状態を保持',
      forgot: 'パスワードをお忘れですか？',
      submit: 'ログイン',
    },
    success: 'ログインしました',
    fail: 'ログインに失敗しました。もう一度お試しください',
    tips: 'ヒント：デモでは任意の認証情報でログイン可能（デフォルト：admin / admin123）',
  },

  notFound: {
    title: 'ページが見つかりません',
    subtitle: 'アクセスしたページは存在しないか、削除されました。',
    home: 'ホームに戻る',
    prev: '前のページに戻る',
  },

  dashboard: {
    stats: {
      revenue: '月次売上',
      newUsers: '新規ユーザー',
      totalOrders: '注文総数',
      activeUsers: 'アクティブユーザー',
      compare: '前月比',
    },
    chart: {
      title: '過去12ヶ月の売上',
      unit: '単位：万',
      monthLabel: '{n}月',
    },
    recent: {
      title: '最近の注文',
    },
    table: {
      title: '最近の注文詳細',
      cols: {
        id: '注文番号',
        customer: '顧客',
        amount: '金額',
        status: 'ステータス',
        time: '日時',
      },
    },
    status: {
      pending: '支払待ち',
      toShip: '発送待ち',
      shipped: '発送済み',
      completed: '完了',
      refunded: '返金済み',
    },
  },

  example: {
    search: {
      keyword: 'キーワード',
      keywordPlaceholder: '名前 / メール',
      role: '権限',
      status: 'ステータス',
      all: 'すべて',
    },
    toolbar: {
      add: 'ユーザーを追加',
      export: 'エクスポート',
      refresh: '更新',
      refreshSuccess: '更新しました',
    },
    cols: {
      id: 'ID',
      name: '名前',
      email: 'メール',
      role: '権限',
      status: 'ステータス',
      createdAt: '登録日時',
      actions: '操作',
    },
    actions: {
      edit: '編集',
      delete: '削除',
    },
    role: {
      admin: '管理者',
      editor: '編集者',
      viewer: '閲覧者',
    },
    status: {
      active: '有効',
      disabled: '無効',
    },
    modal: {
      titleCreate: 'ユーザーを追加',
      titleEdit: 'ユーザーを編集',
      fields: {
        name: '名前',
        email: 'メール',
        role: '権限',
        status: 'ステータス',
      },
      placeholders: {
        name: '名前を入力',
      },
      rules: {
        nameRequired: '名前は必須です',
        emailRequired: 'メールは必須です',
        emailFormat: 'メールの形式が正しくありません',
      },
    },
    create: {
      success: '作成しました',
    },
    update: {
      success: '保存しました',
    },
    delete: {
      title: '削除の確認',
      content: '「{name}」を削除してもよろしいですか？',
      success: '削除しました',
    },
  },
}
