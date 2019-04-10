import React, { Component } from 'react'

export default class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            orientation: 1 // 轮播图滚动方向，默认正向，为1，反向是-1
        }
    }

    handleChangeIndex(orientation) {
        const length = this.props.children.length
        const { currentIndex } = this.state
        this.setState({
            currentIndex: (currentIndex + orientation + length) % length,
            orientation
        })
    }

    renderChildren() {
        const { children, width = 100 } = this.props
        const { currentIndex, orientation } = this.state
        const length = children.length
        // 这里需要特别注意， center、left、right 切换时，需要考虑动画的 z-index
        let itemStyles = {}
        if (orientation === 1) {
            itemStyles = {
                center: { position: 'absolute', width, left: 0, transition: 'left 0.5s ease-in-out', zIndex: 1 },
                left: { position: 'absolute', width, left: -width, transition: 'left 0.5s ease-in-out' },
                right: { position: 'absolute', width, left: width, transition: 'left 0.5s ease-in-out', zIndex: -1 }
            }
        } else if (orientation === -1) {
            itemStyles = {
                center: { position: 'absolute', width, left: 0, transition: 'left 0.5s ease-in-out', zIndex: 1 },
                left: { position: 'absolute', width, left: -width, transition: 'left 0.5s ease-in-out' },
                right: { position: 'absolute', width, left: width, transition: 'left 0.5s ease-in-out', zIndex: 1 }
            }
        }
        return children.map((child, index) => {
            let style = {}
            if (currentIndex === index) {
                style = itemStyles.center
            } else if (index === (currentIndex + length - 1) % length) {
                style = itemStyles.left
            } else {
                style = itemStyles.right
            }
            return React.cloneElement(child, { key: index, style })
        })
    }

    render() {
        const { width = 200, height = 100 } = this.props

        const parentStyle = {
            width,
            height,
            position: 'relative',
            overflow: 'hidden'
        }

        let containerStyle = {
            width,
            height,
            position: 'relative'
        }

        return <div style={parentStyle}>
            <div style={containerStyle}>{this.renderChildren()}</div>
            <button onClick={() => this.handleChangeIndex(-1)}
                    style={{ position: 'absolute', left: 0, top: '50%', height: '30px', marginTop: '-15px', zIndex: 10 }}>上一张
            </button>
            <button onClick={() => this.handleChangeIndex(1)}
                    style={{ position: 'absolute', right: 0, top: '50%', height: '30px', marginTop: '-15px', zIndex: 10 }}>下一张
            </button>
        </div>
    }
}

