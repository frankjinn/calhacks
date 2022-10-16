import { gettext as getText } from 'i18n'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo()

export const TITLE_TEXT_STYLE = {
  text: getText('Mem:re'),
  x: px(42),
  y: px(65),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(50),
  color: 0xffffff,
  text_size: 36,
  align_h: hmUI.align.CENTER_H,
  // text_style: hmUI.text_style.WRAP,
}

export const ADD_BUTTON = {
  text: getText('add'),
  x: px(30),
  y: px(65),
  w: px(120),
  h: px(50),
  normal_color: 0xfc6950,
  press_color: 0xfeb4a8,
  radius: px(12)
}

export const TIPS_TEXT_STYLE = {
  text: getText('noData'),
  x: px(15),
  y: px(120),
  w: DEVICE_WIDTH - px(15 * 2),
  h: DEVICE_HEIGHT - px(120),
  color: 0xffffff,
  text_size: 32,
  align_h: hmUI.align.CENTER_H,
  // align_v: hmUI.align.CENTER_V,
  // text_style: hmUI.text_style.WRAP,
}

export const SCROLL_LIST = {
  item_height: px(80),
  item_space: px(6),
  item_config: [
    {
      type_id: 1,
      item_bg_color: 0x333333,
      item_bg_radius: px(300),
      text_view: [
        {
          x: px(40),
          y: px(10),
          w: px(250),
          h: px(250),
          key: 'name',
          color: 0xffffff,
          text_size: px(60),
          align_h: hmUI.align.CENTER,
          text_style: hmUI.text_style.WRAP
        },
      ],
      text_view_count: 1,
      item_height: px(300),
    },
    {
      type_id: 2,
      item_bg_color: 0x43529D,
      item_bg_radius: px(400),
      text_view: [
        {
          x: px(300),
          y: px(0),
          w: px(120),
          h: px(350),
          key: 'name',
          color: 0x43529D,
          text_size: px(30),
          align_h: hmUI.align.CENTER,
        },
      ],
      text_view_count: 1,
      item_height: px(360),
    },
  ],
  item_config_count: 2,
  x: px(75),
  y: px(120),
  h: DEVICE_HEIGHT - px(75),
  w: DEVICE_WIDTH - px(150),
}
