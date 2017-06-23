import React from 'react';
import PropTypes from 'prop-types';

export default class CounterInput extends React.Component {

	static Proptypes = {
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		min: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		max: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		glyphPlus: PropTypes.object,
		glyphMinus: PropTypes.object,
		styles: PropTypes.object
	}

	constructor(props) {
		super(props);

		const { value, min, max } = this.parseProps();

		this.state = {
			value: (value < min) ? min : ( value > max ) ? max : value,
			min: min || 0,
			max: max || -1,
			glyphPlus: this.props.glyphPlus || {glyph: "fa fa-plus", position: this.props.glyphMinus !== undefined && this.props.glyphMinus === "right" ? "left" : "right"},
			glyphMinus: this.props.glyphMinus || {glyph: "fa fa-minus", position: this.props.glyphPlus !== undefined && this.props.glyphPlus === "left" ? "right" : "left"},
			styles: this.props.styles || {cursor: 'pointer'}
		}
	}

	parseProps() {
		return {
			value : parseInt(this.props.value, 10),
			min: parseInt(this.props.min, 10),
			max: parseInt(this.props.max, 10)
		}
	}

	set = (value) => {
		this.setState({
			value
		})
		this.props.onChange(value);
	}

	_onChange = (e) => {
		let new_value = e.target.value;

		// check for empty string or invalid values
		if( new_value === '' ) {
			this.set(this.state.min) // fallback to min value
		} else if ( (new_value > this.state.max && this.state.max !== -1) || new_value < this.state.min) {
			return ; // don't update the value
		} else if (typeof new_value != 'number') {
			var parsed = parseInt(new_value, 10); // try to parse the number

			// if parsed is not a number
			if(isNaN(parsed)) {
				this.set(this.state.min) // fallback to min value
			} else {
				// if parsed succesfully update the value
				this.set(parsed);
			}
		}
	}

	_increase = (value) => {
		if( value === '' ) {
			this.set(this.state.min) // fallback to min value
		} else {
			let parsed = parseInt(value, 10);

			// if parsed is not a number
			if (isNaN(parsed)) {
				this.set(this.state.min) // fallback to min value
			} else {
				if(value < this.state.max || this.state.max === -1) {
					this.set(parsed + 1) // increment value
				}
			}
		}
	}

	_decrease = (value) => {
		if( value === '' ) {
			this.set(this.state.min) // fallback to min value
		} else {
			let parsed = parseInt(value, 10);

			// if parsed is not a number
			if (isNaN(parsed)) {
				this.set(this.state.min) // fallback to min value
			} else {
				if(value > this.state.min) {
					this.set(parsed - 1) // increment value
				}
			}
		}
	}

	render () {
		const { value, glyphPlus, glyphMinus } = this.state;
		const styles = this.state.styles;

		return (
			<div className="input-group counter-input d-flex justify-content-between w-100">
				{ glyphPlus.position === "left" ?
					<span className="input-group-addon w-100" style={ styles } onClick={() => {this._increase(value)}}>
						<i className={ glyphPlus.glyph } />
					</span> :
					<span className="input-group-addon w-100" style={ styles } onClick={() => {this._decrease(value)}}>
						<i className={ glyphMinus.glyph }/>
					</span>
				}
				<input className="form-control text-center w-100" type="text" onChange={this._onChange} value={value} />
				{ glyphPlus.position === "right" ?
					<span className="input-group-addon w-100" style={ styles } onClick={() => {this._increase(value)}}>
						<i className={ glyphPlus.glyph } />
					</span> :
					<span className="input-group-addon w-100" style={styles} onClick={() => {this._decrease(value)}}>
						<i className={ glyphMinus.glyph }/>
					</span>
				}
			</div>
		)
	}
}
