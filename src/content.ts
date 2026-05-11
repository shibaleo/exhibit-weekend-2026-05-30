export const trip = {
  date: '2026.05.30',
  dateLong: '二〇二六年 五月三十日（土）',
  origin: '横浜',
  destination: '埼玉',
  subtitle: '車で巡る、初夏の埼玉',
  tagline: 'Yokohama → Saitama, a one-day drive',
}

export const route = [
  { time: '07:00', place: '横浜', note: '出発' },
  { time: '09:30', place: '川越', note: '蔵造りの町並みを散策' },
  { time: '12:30', place: '長瀞', note: '荒川沿いで昼食' },
  { time: '14:30', place: '秩父', note: '神社と山の眺め' },
  { time: '17:00', place: '飯能', note: '帰路へ' },
  { time: '19:30', place: '横浜', note: '帰着' },
]

export const stops = [
  {
    id: 'kawagoe',
    index: '01',
    title: '川越',
    subtitle: 'Kawagoe',
    description:
      '小江戸と呼ばれる蔵造りの町。時の鐘、菓子屋横丁。古い町並みの中を歩きながら、午前の光を受ける。',
    time: '09:30 — 11:30',
  },
  {
    id: 'nagatoro',
    index: '02',
    title: '長瀞',
    subtitle: 'Nagatoro',
    description:
      '荒川の渓谷美。岩畳の上で休憩し、川沿いの店で昼食。余裕があれば舟下りも検討する。',
    time: '12:30 — 14:00',
  },
  {
    id: 'chichibu',
    index: '03',
    title: '秩父',
    subtitle: 'Chichibu',
    description:
      '秩父神社、武甲山の眺め。山に囲まれた静かな町を歩く。日が傾く前に出発するのが目安。',
    time: '14:30 — 16:30',
  },
]

export const closing = {
  message: '行ってきます。',
  meta: 'この記録は、出発前に書かれています。',
}
