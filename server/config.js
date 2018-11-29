export default {
  development: {
    logging: {
      level: 'info'
    },
    notificationKey: { // for simplicity, keys are put in here
      public: 'BKf0o4IWFYmXXnw_06WXE92tkFkKWGt01WUN4m0W6pYIvgLp-ydBXQqkRXTikECB7uY0xOu_xtRBuOXKwH-eh2Y',
      private: 'dsHOwUwiFhMYznLpORoVNAveZOTdHIGcHxB5rOE9E3U'
    },
    db: {
      name: 'dev'
    }
  },
  test: {
    logging: {
      level: 'info',
      silent: true
    },
    notificationKey: {
      public: 'BKf0o4IWFYmXXnw_06WXE92tkFkKWGt01WUN4m0W6pYIvgLp-ydBXQqkRXTikECB7uY0xOu_xtRBuOXKwH-eh2Y',
      private: 'dsHOwUwiFhMYznLpORoVNAveZOTdHIGcHxB5rOE9E3U'
    },
    db: {
      name: 'test'
    }
  },
  production: {
    logging: {
      level: 'warn'
    },
    notificationKey: {
      public: 'BKf0o4IWFYmXXnw_06WXE92tkFkKWGt01WUN4m0W6pYIvgLp-ydBXQqkRXTikECB7uY0xOu_xtRBuOXKwH-eh2Y',
      private: 'dsHOwUwiFhMYznLpORoVNAveZOTdHIGcHxB5rOE9E3U'
    },
    db: {
      name: 'prod'
    }
  }
};
