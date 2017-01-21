
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
        }, (err) => {
            console.error('Error: ', err);
        });
    }

    render () {
        return (
            <div className="user-form-container">
                <Form
                    schema = {FIELDS}
                    onSubmit = {this.onMakePrediction.bind(this)}
                    renderSubmit = {this.renderSubmit}
                    title = "Cat or Dog Lover? We can guess"
                />
            </div>
        );
    }

    renderSubmit () {
        return <button type="submit" className="btn btn-primary">Make a Guess</button>;
    }
}
