import { TITLE_TEXT_STYLE, STUDY_BUTTON } from './index.style'
import { readFileSync, writeFileSync } from './../../../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('todo-list-page')
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {
    studyButton: null,
    dataList: readFileSync()
  },
  onInit() {
    logger.debug('page onInit invoked')
  },
  build() {
    logger.debug('page build invoked')
    if (hmSetting.getDeviceInfo().screenShape !== 0) {
      this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE_TEXT_STYLE
      })
    }

    this.state.studyButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...STUDY_BUTTON, 
      click_func: () => {
        hmApp.gotoPage({
          file: 'index.page/index.page'
        })
      }
    })
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    
  },
  
})
