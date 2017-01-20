
const FIELDS = {
    name: {
        type: 'input',
        label: 'Name',
        error: 'Name is required'
    },
    height: {
        type: 'input',
        label: 'What\'s is your height',
        error: 'Height is required'
    },
    weight: {
        type: 'input',
        label: "What's your weight",
        error: "Weight is required"
    }
}

class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            weight: "",
            height: "",
            errors: {}
        };
    }

    handleInputChange (e) {
        e.preventDefault();
        console.log(e.target.value);
        const {name, value} = e.target;
        if (name && value) {
            this.setState({[name]: value});
        }
    }

    handleSubmit (e) {
        e.preventDefault();

        this.validate(_.keys(FIELDS));
        // We will submit the form only if there are no errors.
        const errs = _.values(this.state.errors);
        const isValid = _.every(errs, err => !err);
        if (isValid) {
            let values = {};
            _.map(FIELDS, (v, k) => {
                return values[k] = this.state[k]
            });
            this.onSubmit(values);
        }
    }

    onSubmit (data) {
        $.ajax({
            url: '/api/v1/users',
            type: 'POST',
            data: data
        })
        .then((response) => {
            console.log('success: ', response);
        })
        .error(() => {
            console.error('Error: ', arguments);
        });
    }

    onInputBlur (e) {
        // this.validate([e.target.name]);
    }

    validate (fields) {
        const { errors } = this.state;

        fields.map((field) => {
            if (!this.state[field]) {
                errors[field] = FIELDS[field].error;
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
                    <h3>Cat or Dog Lover? We can guess</h3>
                    {_.map(FIELDS, this.renderField.bind(this))}
                    <button type="submit" className="btn btn-primary">Make a Guess</button>

                </form>
            </div>
        );
  }
}
