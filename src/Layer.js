'use strict';

const React = require('react'),
    PropTypes = require('prop-types'),
    helpers = require('./helpers');

/**
 * Creates a new layer using specific `width` and `height` at specific `position`. It's useful when
 * you have two or more graphics on the same chart. Or in case you to have a margins.
 *
 * @example ../docs/examples/Layer.md
 */
class Layer extends React.Component {

    constructor(props) {
        super(props);

        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getCoords = this.getCoords.bind(this);
    }

    // helpers

    getWidth() {
        const {width, layerWidth} = this.props;
        return helpers.normalizeNumber(width, layerWidth);
    }

    getHeight() {
        const {height, layerHeight} = this.props;
        return helpers.normalizeNumber(height, layerHeight);
    }

    getCoords() {
        const {position, layerWidth, layerHeight} = this.props;
        return helpers.getCoords(position, layerWidth, layerHeight, this.getWidth(), this.getHeight());
    }

    // render

    render() {
        const {className, scaleX, scaleY, style} = this.props;

        const layerWidth = this.getWidth();
        const layerHeight = this.getHeight();

        const {x, y} = this.getCoords();

        const children = helpers.proxyChildren(
            this.props.children,
            this.props,
            {
                layerWidth,
                layerHeight,
                scaleX,
                scaleY
            }
        );

        return <g
            className={className}
            transform={'translate(' + x + ' ' + y + ')'}
            style={style}>
            {children}
        </g>;
    }

}

Layer.displayName = 'Layer';

Layer.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    position: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    series: PropTypes.array,
    scaleX: PropTypes.object,
    scaleY: PropTypes.object,
    layerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    layerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node
};

Layer.defaultProps = {
    width: '100%',
    height: '100%',
    position: 'middle center'
};

module.exports = Layer;
