/**
 * English locale
 */
export default {
  app: {
    name: 'Admin WebUI',
  },

  common: {
    confirm: 'OK',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    reset: 'Reset',
    refresh: 'Refresh',
    export: 'Export',
    all: 'All',
  },

  time: {
    minutesAgo: '{n} minutes ago',
    hoursAgo: '{n} hours ago',
  },

  menu: {
    dashboard: 'Dashboard',
    example: 'Example',
    image: 'Image Demo',
    upload: 'Upload Demo',
  },

  layout: {
    footer: 'Admin WebUI © 2026 · Built with Arco Design Vue',
    theme: {
      toLight: 'Switch to light',
      toDark: 'Switch to dark',
    },
    lang: {
      tooltip: 'Switch language',
      zhCN: '简体中文',
      enUS: 'English',
      arSA: 'العربية',
      jaJP: '日本語',
    },
    user: {
      defaultName: 'Administrator',
      profile: 'Profile',
      profileInfo: 'Profile (demo)',
      logout: 'Logout',
    },
    logout: {
      title: 'Logout',
      content: 'Are you sure you want to log out?',
      ok: 'Logout',
      cancel: 'Cancel',
      success: 'Logged out',
    },
  },

  notif: {
    tooltip: 'Notifications',
    tabs: {
      all: 'All',
      message: 'Messages',
      notice: 'Notices',
      todo: 'Todo',
    },
    empty: 'No unread items',
    markAllRead: 'Mark all as read',
    clear: 'Clear all',
    viewAll: 'View all',
    toast: {
      markedAllRead: 'All marked as read',
      cleared: 'Notifications cleared',
      itemRead: 'Marked as read',
    },
    list: {
      newComment: {
        title: 'Zhang San commented on your post',
        desc: '"Great summary on Vue 3, really helpful…"',
      },
      dm: {
        title: 'New direct message from Li Si',
        desc: 'Can we move this week\'s review meeting to Wednesday?',
      },
      upgrade: {
        title: 'System upgrade notice',
        desc: 'Scheduled maintenance tonight from 23:00 to 24:00',
      },
      security: {
        title: 'Security alert',
        desc: 'New device sign-in detected — please confirm it was you',
      },
      review: {
        title: 'Approval pending: travel reimbursement',
        desc: 'Wang Wu submitted a ¥1,280 reimbursement waiting for your approval',
      },
      report: {
        title: 'Weekly report due',
        desc: 'Please submit your weekly report before 18:00',
      },
    },
  },

  breadcrumb: {
    home: 'Home',
  },

  login: {
    brand: {
      title: 'Admin WebUI',
      desc: 'An admin template built with Arco Design Vue',
    },
    title: 'Sign in',
    subtitle: 'Welcome back, please sign in to continue',
    form: {
      username: 'Username',
      usernamePlaceholder: 'Enter your username',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      usernameRequired: 'Username is required',
      passwordRequired: 'Password is required',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      submit: 'Sign In',
    },
    success: 'Signed in successfully',
    fail: 'Sign in failed, please try again',
    tips: 'Tip: any credentials work in this demo (default: admin / admin123)',
  },

  notFound: {
    title: 'Page Not Found',
    subtitle: 'The page you visited does not exist or has been removed.',
    home: 'Back to home',
    prev: 'Go back',
  },

  dashboard: {
    stats: {
      revenue: 'Monthly Revenue',
      newUsers: 'New Users',
      totalOrders: 'Total Orders',
      activeUsers: 'Active Users',
      compare: 'vs last month',
    },
    chart: {
      title: 'Sales of the Last 12 Months',
      unit: 'Unit: 10K',
      monthLabel: 'M{n}',
    },
    recent: {
      title: 'Recent Orders',
    },
    table: {
      title: 'Recent Order Details',
      cols: {
        id: 'Order ID',
        customer: 'Customer',
        amount: 'Amount',
        status: 'Status',
        time: 'Time',
      },
    },
    status: {
      pending: 'Pending',
      toShip: 'To Ship',
      shipped: 'Shipped',
      completed: 'Completed',
      refunded: 'Refunded',
    },
  },

  example: {
    search: {
      keyword: 'Keyword',
      keywordPlaceholder: 'Name / Email',
      role: 'Role',
      status: 'Status',
      all: 'All',
    },
    toolbar: {
      add: 'Add User',
      export: 'Export',
      refresh: 'Refresh',
      refreshSuccess: 'Refreshed',
    },
    cols: {
      id: 'ID',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      createdAt: 'Created At',
      actions: 'Actions',
    },
    actions: {
      edit: 'Edit',
      delete: 'Delete',
    },
    role: {
      admin: 'Admin',
      editor: 'Editor',
      viewer: 'Viewer',
    },
    status: {
      active: 'Active',
      disabled: 'Disabled',
    },
    modal: {
      titleCreate: 'Add User',
      titleEdit: 'Edit User',
      fields: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        status: 'Status',
      },
      placeholders: {
        name: 'Enter name',
      },
      rules: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailFormat: 'Invalid email format',
      },
    },
    create: {
      success: 'Created',
    },
    update: {
      success: 'Saved',
    },
    delete: {
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete "{name}"?',
      success: 'Deleted',
    },
  },

  image: {
    sections: {
      basic: 'Basic Usage',
      fit: 'Fit Mode',
      caption: 'Caption',
      group: 'Image Preview Group',
      states: 'Loading & Error States',
    },
    caption: {
      title: 'Image Title',
      inner: 'Description inside',
      outer: 'Description outside',
    },
    states: {
      loading: 'Loading Effect',
      error: 'Load Error',
      errorText: 'Failed to load image',
      noPreview: 'No Preview',
    },
  },

  upload: {
    sections: {
      basic: 'Basic Upload',
      drag: 'Drag to Upload',
      photoWall: 'Photo Wall',
      restrictions: 'Restrictions',
      manual: 'Manual Upload',
    },
    descriptions: {
      basic: 'Click or select a file to upload.',
      drag: 'Drag files to the upload area to upload.',
      photoWall: 'Uploaded images are displayed as a photo wall with preview support.',
      restrictions: 'Restrict file types (PNG / JPEG / GIF only) and count (max 3).',
      manual: 'Files are not uploaded automatically after selection. Submit manually.',
    },
    messages: {
      success: 'File "{name}" uploaded successfully',
    },
  },
}
