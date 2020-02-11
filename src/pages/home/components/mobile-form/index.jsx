
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal } from 'antd-mobile'
import { Toast } from 'components'
import { imgCodeUrl } from '@/config'
import { getVerifyCode } from '../../api'
import { valueChange, clearMobile } from '../../redux'
import styles from './index.less'

const mapStateToProps = ({ userLogin }) => ({
  ...userLogin,
})
const mapActionsToProps = dispatch => bindActionCreators({
  valueChange,
  clearMobile,
}, dispatch)

@connect(
  mapStateToProps,
  mapActionsToProps,
)
export default class MoblieForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeMessage: '获取验证码',
      modal: false,
      src: `${imgCodeUrl}/captcha`,
      captchaValue: '',
    }
    this.Timer = null
    this.second = 60
    this.canClickCode = true
  }
  componentWillUnmount() {
    this.Timer && clearTimeout(this.Timer)
  }
  onHandleClose = () => {
    this.setState({ modal: false })
  }
  getVerifyCaptcha = () => {
    this.setState({
      modal: true,
      src: `${imgCodeUrl}/captcha?time=${Math.random()}`,
    })
  }
  changeInput = (name, value) => {
    this.props.valueChange(name, value)
  }
  handleConfirm = () => {
    this.sendVerifyCode(() => {
      this.setState({ modal: false })
    })()
  }
  sendVerifyCode = callback => (async () => {
    if (!this.canClickCode || !this.checkValue()) {
      return
    }
    const phone = this.props.mobile
    const params = {
      mobile: phone,
      img_code: this.state.captchaValue,
    }
    try {
      Toast.loading('发送中...')
      const data = await getVerifyCode(params)
      Toast.hide()
      if (data.data.show === 1) { // 是否需要验证码
        this.getVerifyCaptcha({ mobile: phone })
      } else if (data.data.moblile) {
        callback && callback()
        this.countDown()
      }
    } catch (e) {
      console.log(e)
      this.setState({
        captchaValue: '',
      })
    }
  })
  countDown = () => {
    this.canClickCode = false
    clearInterval(this.Timer)
    this.Timer = setInterval(() => {
      if (this.second > 0) {
        this.setState({
          codeMessage: `${this.second--}s<i>后重新获取</i>`,
        })
      } else {
        this.canClickCode = true
        clearInterval(this.Timer)
        this.second = 60
        this.setState({
          codeMessage: '重新获取',
          captchaValue: '',
        })
      }
    }, 1000)
  }
  checkValue = () => {
    const {
      mobile,
    } = this.props
    // 效验策略
    const addressCheckStrategy = [{
      check: mobile === undefined || mobile === '',
      info: '手机号不能为空',
    }, {
      check: mobile.length !== 11 || !/\d{11}/.test(mobile),
      info: '手机号码格式错误',
    },
    ]
    for (const i in addressCheckStrategy) {
      if (addressCheckStrategy[i].check) {
        Toast.info(addressCheckStrategy[i].info)
        return false
      }
    }
    return true
  }

  handleCaptcha = (e) => {
    this.setState({ captchaValue: e.target.value })
  }
  hack = () => {
    document.body.scrollTop = '0px'
  }
  render() {
    const {
      codeMessage,
      modal,
      src,
      captchaValue,
    } = this.state
    const { mobile, smsCode } = this.props
    return (
      <div className={styles['login-form']}>
        <div className={styles['login-mobile']}>
          <p className={styles['mobile-title']}>手机号</p>
          <input value={mobile} onChange={e => this.changeInput('mobile', e.target.value)} type="tel" maxLength="11" placeholder="请输入手机号" />
        </div>
        <div className={styles['login-code']}>
          <p className={styles['mobile-title']}>验证码</p>
          <div>
            <input onBlur={this.hack.bind(this)} value={smsCode} onChange={e => this.changeInput('smsCode', e.target.value)} type="text" maxLength="6" placeholder="请输入验证码" />
            <span onClick={this.sendVerifyCode()} dangerouslySetInnerHTML={{ __html: codeMessage }} />
          </div>
        </div>
        <Modal
          visible={modal}
          transparent
          title="请输入图形验证码"
          afterClose={() => { this.setState({ captchaValue: '' }) }}
          footer={[{ text: '取消', onPress: () => { this.onHandleClose() } }, { text: '确定', onPress: () => { this.handleConfirm() } }]}
        >
          <div className={styles['captcha-box']}>
            <input type="text" value={captchaValue} onChange={this.handleCaptcha.bind(this)} maxLength="4" placeholder="请输入图形验证码" />
            <img src={src} alt="zan" onClick={this.getVerifyCaptcha.bind(this)} />
          </div>
        </Modal>
      </div>
    )
  }
}
