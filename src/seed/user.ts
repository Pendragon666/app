import User from '../models/User';

export const createUsers = () => {
  const users = [
    {
      username: 'harukaze',
      number: '568481771',
      email: 'saba@harukaze.dev',
      password: '$2a$10$my8UezfS40I9rPnJItMmWuEHR9T4mPwwPxD56pJMW12oGEHpfuF7C',
      verified: true,
      birthday: '2021-08-10T18:31:13.726+00:00',
      national_id: '01001099500',
    },
    {
      username: 'kawori',
      number: '451212324',
      email: 'kawori@harukaze.dev',
      password: '$2a$10$my8UezfS40I9rPnJItMmWuEHR9T4mPwwPxD56pJMW12oGEHpfuF7C',
      verified: true,
      birthday: '2021-08-10T18:31:13.726+00:00',
      national_id: '01001099501',
    },
    {
      username: 'mystical',
      number: '512412412',
      email: 'mystical@harukaze.dev',
      password: '$2a$10$my8UezfS40I9rPnJItMmWuEHR9T4mPwwPxD56pJMW12oGEHpfuF7C',
      verified: true,
      birthday: '2021-08-10T18:31:13.726+00:00',
      national_id: '01001099502',
    },
    {
      username: 'shirley',
      number: '512412413',
      email: 'shirley@harukaze.dev',
      password: '$2a$10$my8UezfS40I9rPnJItMmWuEHR9T4mPwwPxD56pJMW12oGEHpfuF7C',
      verified: true,
      birthday: '2021-08-10T18:31:13.726+00:00',
      national_id: '01001099503',
    },
    {
      username: 'annesix',
      number: '56840124012',
      email: 'annesix@harukaze.dev',
      password: '$2a$10$my8UezfS40I9rPnJItMmWuEHR9T4mPwwPxD56pJMW12oGEHpfuF7C',
      verified: true,
      birthday: '2021-08-10T18:31:13.726+00:00',
      national_id: '01001512412',
    },
    {
      username: 'dash',
      number: '58421412412',
      email: 'dash@harukaze.dev',
      password: '$2a$10$my8UezfS40I9rPnJItMmWuEHR9T4mPwwPxD56pJMW12oGEHpfuF7C',
      verified: true,
      birthday: '2021-08-10T18:31:13.726+00:00',
      national_id: '01000242142',
    },
  ];

  users.map(async (u) => {
    try {
      await User.create(u);
    } catch (_) {
      console.error('already exists user');
    }
  });
};
