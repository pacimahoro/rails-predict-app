// Define schema
const FIELDS = {}

class UserResult extends React.Component {
	renderEvaluation () {
		return (
			<Form
				schema={FIELDS}
				onSubmit={(data, e) => this.onSubmit(data, e)}
				renderSubmit={this.renderSubmit.bind(this)}
				title="Did we guess it right?"
			/>
		)
	}

	onSubmit (data, e) {
		// Do nothing intentionally.
		// Actions will be handled based on the review buttons selected.
	}

	isPredictionCorrect(value) {
		const {forecast, id} = this.props;
		const opposite = forecast === 'dog' ? 'cat' : 'dog'
		const actual = value ? forecast : opposite
		if (this.props.onSubmit) {
			this.props.onSubmit({ actual, id });
		}
	}

	renderSubmit () {
		return (
			<div className="footer">
				{this.renderReviewBtn('btn-primary', 'Yep! You got it!', true)}
				{this.renderReviewBtn('btn-danger', 'Nop, you missed!', false)}
			</div>
		)
	}

	renderReviewBtn(cls, text, value) {
		return (
			<button
				type="button"
				className={`btn ${cls}`}
				onClick={() => this.isPredictionCorrect(value)}>
				{text}
			</button>
		)
	}

	render () {
		return (
			<div className="user-results-container">
				<h1>Based on your info, we think you are:</h1>
				<h2>{`A ${this.props.forecast} Lover`}</h2>
				{this.renderEvaluation()}
			</div>
		)
	}
}

UserResult.propTypes = {
  user_id: React.PropTypes.string,
  id: React.PropTypes.number,
  forecast: React.PropTypes.string.isRequired,
  height: React.PropTypes.number,
  weight: React.PropTypes.number
};
