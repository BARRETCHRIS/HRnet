import EmployeeForm from "../../components/employeeForm/EmployeeForm";

function CreateEmployee(){
    document.title = 'Create | Wealth Health';

    return (
        <main className="wrapper">
            <div className="container">
                <h2>Create Employee</h2>
                <EmployeeForm />
            </div>
        </main>
    )
}

export default CreateEmployee;