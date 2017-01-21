
// For our forms, we will use a schema,
// This allows to keep the code clean,
// while making our form easily customizable
// In addition, this makes localization easier
//
// See below an example of how the schema should be structured
// Field names are the keys in the schema object.
// const schema = {
//     name: {
//         type: 'input',
//         label: 'Name',
//         error: 'Name is required'
//     },
//     weight: {
//         type: 'input',
//         label: "What's your weight",
//         error: "Weight is required"
//     }
// }

class Form extends React.Component {
	static propTypes: {
		schema: React.PropTypes.object,		// See the structure of the schema above.
		title: React.PropTypes.string,
		onSubmit: React.PropTypes.func,
		renderSubmit: React.PropTypes.func
	}

    constructor(props) {
        super(props);

        // Get field names. this.state.name,...etc
        const s = _.keys(this.props.schema || {}).reduce((acc, o) => {
            acc[o] = '';
            return acc;
        }, {});

        s.errors = {};
        this.state = s;
    }

    handleInputChange (e) {
        e.preventDefault();

        const {name, value} = e.target;
        if (name) {
            this.setState({[name]: value});
        }
    }

    handleSubmit (e) {
        e.preventDefault();

        this.validate(_.keys(this.props.schema));
        // We will submit the form only if there are no errors.
        const errs = _.values(this.state.errors);
        const isValid = _.every(errs, err => !err);
        if (isValid) {
            let values = {};
            _.map(this.props.schema, (v, k) => {
                return values[k] = this.state[k]
            });
            this.onSubmit(values);
        }
    }

    onSubmit (data) {
        this.props.onSubmit(data);
    }

    onInputBlur (e) {
        // To be completed
    }

	onInputFocus (e) {
		// To be completed
	}

    validate (fields) {
        const { errors } = this.state;
		const { schema } = this.props;
        fields.map((field) => {
            if (!this.state[field]) {
                errors[field] = schema[field].error;
            }
            else {
                errors[field] = '';
            }
        });

        this.setState({ errors });
    }

    renderField(config, field) {
        const value = this.state[field];
        const { errors } = this.state;

        return (
            <div className={`form-group ${errors[field] ? 'has-danger' : '' }`} key={field}>
                <label>{config.label}</label>
                <config.type
                    name={field}
                    value={value}
                    onBlur={(e) => this.onInputBlur(e)}
                    onChange={(e) => this.handleInputChange(e)}
                    type="text"
                    className="form-control"
                     />
                <div className="text-help">{errors[field] || ''}</div>
            </div>
        )
    }

    render () {
        return (
            <div className="form-wrapper">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h3>{this.props.title || ''}</h3>
                    {_.map(this.props.schema, this.renderField.bind(this))}
                    {this.renderSubmit()}
                </form>
            </div>
        );
	}

	renderSubmit () {
		if (this.props.renderSubmit) {
			return this.props.renderSubmit();
		}
		return () => {};
	}
}
