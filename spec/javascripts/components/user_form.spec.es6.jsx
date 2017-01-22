var TestUtils = React.addons.TestUtils

describe('UserForm', function () {
	var userForm;
	beforeEach(function() {
		var userForm = TestUtils.renderIntoDocument(
			<UserForm  />
    	);
	});

	afterEach(function() {
	})

	it('shows user form first', function () {
    	// Render a checkbox with label in the document
		var userFormNode = ReactDOM.findDOMNode(userForm);
		expect(userFormNode).toBeTruthy();
		expect(userForm.refs.userForm).toBeTruthy();
		expect(userForm.refs.userFormResults).toBeFalsy();
	})

	it('shows results if we have results', function () {
		var userForm = TestUtils.renderIntoDocument(
			<UserForm hasResults="true" forecast="dog" />
		);

		var userFormNode = ReactDOM.findDOMNode(userForm);
		expect(userForm.refs.userForm).toBeFalsy();
		expect(userForm.refs.userFormResults).toBeTruthy();
	})
})
