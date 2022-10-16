import { TITLE_TEXT_STYLE, STUDY_BUTTON, TIPS_TEXT_STYLE, SCROLL_LIST } from './index.style'
import { readFileSync, writeFileSync } from './../../../utils/fs'
import { getScrollListDataConfig } from './../../../utils/index'

const logger = DeviceRuntimeCore.HmLogger.getLogger('todo-list-page')
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {
    tipText: null,
    refreshText: null,
    scrollList: null,
    study: null,
    dataList: readFileSync()
  },
  onInit() {
    logger.debug('page onInit invoked')

  },
  build() {
    logger.debug('page build invoked')
    const title = hmUI.createWidget(hmUI.widget.TEXT, {
      ...TITLE_TEXT_STYLE
    })
    const studyButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...STUDY_BUTTON, 
      click_func: () => {
        title.setProperty(hmUI.prop.VISIBLE, false)
        studyButton.setProperty(hmUI.prop.VISIBLE, false)
        this.onMessage()
        this.getTodoList()
      }
    })
  },
  getTodoList() {
    messageBuilder
    .request({
        method: 'GET_TODO_LIST'
    })
    .then(({ result }) => {
        this.state.dataList = result.map((d) => ({ name: d }))
        logger.log('GET_TODO_LIST dataList', this.state.dataList)
        this.createAndUpdateList()
    })
    .catch((res) => {})
  },
  createAndUpdateList(showEmpty = true) {
    const _scrollListItemClick = (list, index) => {
    this.deleteTodoItem(index)
    }
    const { scrollList, dataList } = this.state
    this.changeUI(showEmpty)
    const dataTypeConfig = getScrollListDataConfig(dataList.length === 0 ? -1 : 0, dataList.length)
    if (scrollList) {
    scrollList.setProperty(hmUI.prop.UPDATE_DATA, {
        data_array: dataList,
        data_count: dataList.length,
        data_type_config: [{ start: 0, end: dataList.length, type_id: 2 }],
        data_type_config_count: dataTypeConfig.length,
        on_page: 1
    })
    } else {
    this.state.scrollList = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
        ...(SCROLL_LIST || {}),
        data_array: dataList,
        data_count: dataList.length,
        data_type_config: dataTypeConfig,
        data_type_config_count: dataTypeConfig.length,
        on_page: 1,
        item_click_func: _scrollListItemClick
    })
    }
  },
  onMessage() {
    messageBuilder.on('call', ({ payload: buf }) => {
    const data = messageBuilder.buf2Json(buf)
    const dataList = data.map((i) => ({ name: i }))
    logger.log('call dataList', dataList)
    this.refreshAndUpdate(dataList)
    })
  },
  refreshAndUpdate(dataList = []) {
    this.state.dataList = []
    this.createAndUpdateList(false)

    setTimeout(() => {
    this.state.dataList = dataList
    this.createAndUpdateList()
    }, 20)
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
  },
  
})
