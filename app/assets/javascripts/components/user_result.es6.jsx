// Define schema
const FIELDS = {}

class UserResult extends React.Component {
	renderEvaluation () {
		return (
			<Form
				schema={FIELDS}
				onSubmit={this.onSubmit.bind(this)}
				renderSubmit={this.renderSubmit}
				title="Did we guess it right?"
			/>
		)
	}

	onSubmit (data) {
		console.log("Need to submit the form changes")
	}

	renderSubmit () {
		return (
			<div className="footer">
				<button type="submit" className="btn btn-primary">Yep! You got it!</button>
				<button type="submit" className="btn btn-primary has-danger">Nop, you missed!</button>
			</div>
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
  id: React.PropTypes.string,
  forecast: React.PropTypes.string.required,
  height: React.PropTypes.number,
  weight: React.PropTypes.number
};
