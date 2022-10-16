import { gettext } from 'i18n'
import { DEFAULT_DECK_LIST } from './../utils/constants'
AppSettingsPage({
  state: {
    deckList: [],
    props: {},
  },
  addDeckList(val) {
    this.state.deckList = [...this.state.deckList, val]
    this.setItem()
  },
  editDeckList(val, index) {
    this.state.deckList[index] = val
    this.setItem()
  },
  deleteDeckList(index) {
    this.state.deckList = this.state.deckList.filter((_, ind) => {
      return ind !== index
    })
    this.setItem()
  },
  setItem() {
    const newString = JSON.stringify(this.state.deckList)
    this.state.props.settingsStorage.setItem('deckList', newString)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('deckList')) {
      this.state.deckList = JSON.parse(
        props.settingsStorage.getItem('deckList'),
      )
    } else {
      this.state.deckList = [...DEFAULT_DECK_LIST]
    }
    console.log('deckList: ', this.state.deckList)
  },
  build(props) {
    this.setState(props)
    const contentItems = []
    const addBTN = View(
      {
        style: {
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#656565',
          color: 'white',
          textAlign: 'center',
          padding: '0 15px',
          width: '30%',
        },
      },
      [
        TextInput({
          label: gettext('addDeck'),
          onChange: (val) => {
            this.addDeckList(val)
          },
        }),
      ],
    )
    this.state.deckList.forEach((item, index) => {
      contentItems.push(
        View(
          {
            style: {
              borderBottom: '1px solid #eaeaea',
              padding: '6px 0',
              marginBottom: '6px',
              display: 'flex',
              flexDirection: 'row',
            },
          },
          [
            View(
              {
                style: {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justfyContent: 'center',
                  alignItems: 'center',
                },
              },
              [
                TextInput({
                  label: '',
                  bold: true,
                  value: item,
                  subStyle: {
                    color: '#333',
                    fontSize: '14px',
                  },
                  maxLength: 200,
                  onChange: (val) => {
                    if (val.length > 0 && val.length <= 200) {
                      this.editDeckList(val, index)
                    } else {
                      console.log("deckList can't be empty or too long!")
                    }
                  },
                }),
              ],
            ),
            Button({
              label: gettext('GoToDeck'),
              style: {
                fontSize: '12px',
                borderRadius: '30px',
                background: '#D85E33',
                color: 'white',
              },
              onClick: () => {
                this.deleteDeckList(index)
              },
            }),
            Button({
              label: gettext('-'),
              style: {
                fontSize: '12px',
                borderRadius: '30px',
                background: '#D85E33',
                color: 'white',
              },
              onClick: () => {
                this.deleteDeckList(index)
              },
            }),
          ],
        ),
      )
    })
    return View(
      {
        style: {
          padding: '12px 20px',
        },
      },
      [
        addBTN,
        contentItems.length > 0 &&
          View(
            {
              style: {
                marginTop: '12px',
                padding: '10px',
                border: '1px solid #eaeaea',
                borderRadius: '6px',
                backgroundColor: 'white',
              },
            },
            [...contentItems],
          ),
      ],
    )
  },
})
