// export default class CustomerModel{

//     constructor(customer_id,name,address,email,mobile) {

//         this._customer_id = customer_id;
//         this._name = name;
//         this._address = address;
//         this._email = email;
//         this._mobile = mobile;
//     }


//     get customer_id() {
//         return this._customer_id;
//     }

//     set customer_id(value) {
//         this._customer_id = value;
//     }

//     get name() {
//         return this._name;
//     }

//     set name(value) {
//         this._name = value;
//     }

//     get address() {
//         return this._address;
//     }

//     set address(value) {
//         this._address = value;
//     }

//     get email() {
//         return this._email;
//     }

//     set email(value) {
//         this._email = value;
//     }

//     get mobile() {
//         return this._mobile;
//     }

//     set mobile(value) {
//         this._mobile = value;
//     }
// }

// CustomerModel.js

class Customer {
    constructor(customerId, customerName, customerAddress, customerEmail, customerMobile) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.customerEmail = customerEmail;
        this.customerMobile = customerMobile;
    }

    static getAllCustomers() {
        return JSON.parse(localStorage.getItem('customers')) || [];
    }

    static saveCustomer(customer) {
        const customers = Customer.getAllCustomers();
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    static deleteCustomerById(customerId) {
        const customers = Customer.getAllCustomers().filter(customer => customer.customerId !== customerId);
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    static updateCustomer(updatedCustomer) {
        const customers = Customer.getAllCustomers();
        const index = customers.findIndex(customer => customer.customerId === updatedCustomer.customerId);
        if (index !== -1) {
            customers[index] = updatedCustomer;
            localStorage.setItem('customers', JSON.stringify(customers));
        }
    }

    static getCustomerById(customerId) {
        return Customer.getAllCustomers().find(customer => customer.customerId === customerId);
    }
}

export default Customer;
