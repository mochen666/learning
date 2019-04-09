import React, { Component } from 'react'

export default class Swiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            hasTransition: true
        }
    }

    handleChangeIndex = (index) => {
        const { currentIndex } = this.state
        const length = this.props.children.length + 1

        let newIndex = currentIndex
        newIndex = (index + length) % length
        this.setState({ currentIndex: newIndex, hasTransition: true })
        if (newIndex === length - 1) {
            setTimeout(() => {
                this.setState({ currentIndex: 0, hasTransition: false })
            }, 500)
        }

        // 为了平滑无限循环，我们可以在一头一尾多加上一副图片，当carousel处于最后一幅图片并点击next按钮的时候，首先把下一幅图片移动到相框，在动画结束的时候，再把相框中的图片切换为第一幅图片。
        // 这里更合理的方式是使用 requestAnimationRequest，来保证当动画结束的时候，立即改变component state
    }

    renderChildren = () => {
        let { children, width, height } = this.props

        return children.concat(children[0]).map((child, index) => {
            return <div style={{ display: 'inline-block' }} key={index}>
                {React.cloneElement(child, { style: { width, height } })}
            </div>
        })
    }

    render() {
        const { currentIndex, hasTransition } = this.state
        const { width = 200, height = 100 } = this.props

        const parentStyle = {
            width,
            height,
            position: 'relative',
            overflow: 'hidden'
        }

        let containerStyle = {
            marginLeft: - currentIndex * width,
            whiteSpace: 'nowrap'
        }
        if (hasTransition) {
            containerStyle = { ...containerStyle, transition: '0.5s' }
        }

        return <div style={parentStyle}>
            <div style={containerStyle}>{this.renderChildren()}</div>
            <button onClick={() => this.handleChangeIndex(currentIndex - 1)}
                    style={{ position: 'absolute', left: 0, top: '50%', height: '30px', marginTop: '-15px' }}>上一张
            </button>
            <button onClick={() => this.handleChangeIndex(currentIndex + 1)}
                    style={{ position: 'absolute', right: 0, top: '50%', height: '30px', marginTop: '-15px' }}>下一张
            </button>
        </div>
    }
}
