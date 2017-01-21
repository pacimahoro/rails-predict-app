
const USER_FIELDS = {
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
            isModalOpen: false,
            forecast: '',
            height: null,
            width: null
        }
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
                isModalOpen: true,
                forecast: response.forecast,
                height: parseFloat(response.height),
                weight: parseFloat(response.weight)
            });
        }, (err) => {
            console.error('Error: ', err);
        });
    }

    render () {
        const {isModalOpen} = this.state;
        return (
            <div className="user-form-container">
                {isModalOpen ? this.showResult() : this.askForm()}
            </div>
        );
    }

    askForm () {
        return <Form
            schema = {USER_FIELDS}
            onSubmit = {this.onMakePrediction.bind(this)}
            renderSubmit = {this.renderSubmit}
            title = "Cat or Dog Lover? We can guess"
        />
    }

    showResult () {
        const { forecast, height, weight } = this.state;

        return (
            <UserResult forecast={forecast} weight={weight} weight={weight} />
        )
    }

    renderSubmit () {
        return <button type="submit" className="btn btn-primary">Make a Guess</button>;
    }
}
