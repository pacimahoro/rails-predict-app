
const USER_FIELDS = {
    name: {
        type: 'input',
        label: 'Name',
        error: 'Name is required'
    },
    height: {
        type: 'input',
        label: 'What\'s is your height (in feet, i.e. 5.10)',
        error: 'Height is required'
    },
    weight: {
        type: 'input',
        label: "What's your weight (in lbs, i.e. 143.0)",
        error: "Weight is required"
    }
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasResults: this.props.hasResults,
            forecast: this.props.forecast,
            height: null,
            width: null
        }
    }

    componentDidMount() {
        const appElement = document.getElementById('app-predict');
        ReactModal.setAppElement(appElement);
    }

    onSubmit (data) {
        $.ajax({
            url: '/api/v1/users',
            type: 'POST',
            data: {user: data}
        })
        .then((response) => {
            console.log('success: ', response);
        }, (err) => {
            console.error('Error: ', err);
        });
    }

    onMakePrediction (data) {
        $.ajax({
            url: '/api/v1/predictions',
            type: 'POST',
            data: {prediction: data}
        })
        .then((response) => {
            console.log('success: ', response);
            this.setState({
                hasResults: true,
                forecast: response.forecast,
                height: parseFloat(response.height),
                weight: parseFloat(response.weight),
                id: response.id
            });
        }, (err) => {
            console.error('Error: ', err);
        });
    }

    onResultResponse(data) {
        $.ajax({
            url: `/api/v1/predictions/${data.id}`,
            type: 'PUT',
            data: {prediction: data}
        })
        .then((response) => {
            console.log('success: ', response);
            // Reset everything to start over again.
            this.setState({
                hasResults: false,
                id: null,
                forecast: '',
                height: '',
                weight: '',
                isModalOpen: true
            });
        }, (err) => {
            console.error('Error: ', err);
        });
    }

    render () {
        const {hasResults, isModalOpen} = this.state;
        return (
            <div className="user-form-container">
                {hasResults ? this.showResult() : this.askForm()}
                {isModalOpen && this.showThanks()}
            </div>
        );
    }

    showThanks () {
        const style = {
            overlay: {
                backgroundColor: "rgba(0,0,0, 0.567)",

            },
            content: {
                maxWidth: 320,
                marginRight: "auto",
                marginLeft: "auto"
            }
        }

        return (
            <ReactModal
                isOpen={this.state.isModalOpen}
                contentLabel="Modal"
                style={style}>
                <button className="btn btn-primary dismiss" onClick={this.closeModal.bind(this)}>close</button>
                <h4>Thanks for your feedback!</h4>
                <i>Ready to try it again?</i>
            </ReactModal>
        )
    }

    closeModal () {
        this.setState({isModalOpen: false});
    }

    askForm () {
        return (
            <Form
               schema = {USER_FIELDS}
               onSubmit = {this.onMakePrediction.bind(this)}
               renderSubmit = {this.renderSubmit}
               title = "Cat or Dog Lover? We can guess"
               ref = "userForm"
           />
        )

    }

    showResult () {
        const { forecast, height, weight, id } = this.state;

        return (
            <UserResult
                forecast={forecast}
                weight={weight}
                weight={weight}
                id={id}
                ref="userFormResults"
                onSubmit={(data) => this.onResultResponse(data)}
            />
        )
    }

    renderSubmit () {
        return <button type="submit" className="btn btn-primary">Make a Guess</button>;
    }
}

UserForm.propTypes = {
    hasResults: React.PropTypes.bool,
    forecast: React.PropTypes.string
}

UserForm.defaultProps = {
    hasResults: false,
    forecast: ''
}
