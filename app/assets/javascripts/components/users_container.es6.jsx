class UsersContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentWillMount () {
        this.fetchUsers();
    }

    render () {
        const {users} = this.state;

        return (
            <div className="users">
                <h1>Show a list of users!!!</h1>
                {users.map((item) => this.renderUserItem(item))}
            </div>
        )
    }

    renderUserItem (user) {
        return (
            <UserItem
                key={user.id}
                name={user.name}
                height={user.height}
                weight={user.weight} />
        );
    }

    fetchUsers () {
        $.ajax({
            url: '/api/v1/users.json',
            dataType: 'JSON',
            method: 'GET',
            success: (data) => {
                this.setState({
                    users: data
                });
                console.log("Users: ", data);
            }
        });
    }
}
