// import CustomerModel from "../model/CustomerModel.js";
// import {customer_arr} from "../db/database.js";
// import {loadCustomers} from "./OrderController.js";

// $(document).ready(function () {
//     $("#customerForm").submit((event)=>{
//         event.preventDefault();
//     })
// })
// let generateCustomerId = function generateCustomerId(){

//     if (customer_arr.length === 0){
//         return "C001";
//     }else{
//         let id = customer_arr.length + 1;
//     return "C00" + id;
//     }
    
// }
// const validEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
// }

// const validMobile = (mobile) => {
//     const MobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
//     return MobileRegex.test(mobile);
// }


// let setCustomerId = () => {
//     $("#customerId").val(generateCustomerId());
// }
// const loadCustomerTable = () => {
//     $("#customerTableBody").empty();
//     customer_arr.map((item,index) =>{
//         console.log(item);

//         let data = `<tr><td>${item.customer_id}</td><td>${item.name}</td><td>${item.address}</td><td>${item.email}</td><td>${item.mobile}</td></tr>`
//         $('#customerTableBody').append(data);
//     })
// }

// const cleanCustomerForm  = () => {
//     $('#customerId').val("");
//     $('#customerName').val("");
//     $('#customerAddress').val("");
//     $('#customerEmail').val("");
//     $('#customerMobile').val("");
// }

// $("#saveBtn").on("click", function () {
//     let customer_id = generateCustomerId();
//     let name = $('#customerName').val();
//     let address = $('#customerAddress').val();
//     let email = $('#customerEmail').val();
//     let contact = $('#customerMobile').val();

//     if (name.length === 0){
//         Swal.fire("Invalid customer name!");
//     }else if(address.length === 0){
//         Swal.fire("Invalid customer address!");
//     }else if(!validEmail(email)){
//         Swal.fire({
//             icon: "error",
//             title: "Invalid Input",
//             text: "Invalid Email",
//         });
//     }else if(!validMobile(mobile)){
//         Swal.fire({
//             icon: "error",
//             title: "Invalid Input",
//             text: "Invalid Contact Number",
//         });
//     }
//     else{
//         let customer = new CustomerModel(
//             customer_id,
//             name,
//             address,
//             email,
//             contact
//         );

//         if (customer_arr.push(customer)){

//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: "center",
//                 showConfirmButton: false,
//                 timer: 3000,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                     toast.onmouseenter = Swal.stopTimer;
//                     toast.onmouseleave = Swal.resumeTimer;
//                 }
//             });
//             Toast.fire({
//                 icon: "success",
//                 title: "Customer save successfully"
//             });
//             loadCustomerTable();
//             loadCustomers();
//             cleanCustomerForm();
//             setCustomerId();



//         }else{
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Customer not been saved!!",

//             });
//         }

//     }

// });

// let customer_update_index;
// let customer_delete_index;

// $("#customerTableBody").on("click",'tr',function (){

//     let value=$(this).text();
//     let index=$(this).index();
//     console.log(index);
//     let customer_obj=customer_arr[index];
//     console.log(customer_obj);

//     //update customer
//     customer_update_index=index;

//     //delete customer
//     customer_delete_index=index;
//     let customerId = customer_obj.customer_id;
//     let customerName = customer_obj.name;
//     let address = customer_obj.address;
//     let email = customer_obj.email;
//     let mobile = customer_obj.mobile;

//     $('#customerId').val(customerId);
//     $('#customerName').val(customerName);
//     $('#customerAddress').val(address);
//     $('#customerEmail').val(email);
//     $('#customerMobile').val(mobile);


// });

// $("#updateBtn").on("click",function (){
//     let index=customer_update_index;

//     let customer_id = $('#customerId').val();
//     let name = $('#customerName').val();
//     let address = $('#customerAddress').val();
//     let email = $('#customerEmail').val();
//     let mobile = $('#customerMobile').val();

//     let customer = new CustomerModel(
//         customer_arr[index].customer_id,
//         name,
//         address,
//         email,
//         mobile
//     );
//     customer_arr[customer_update_index]=customer;
//     loadCustomerTable();
//     cleanCustomerForm();
//     setCustomerId();
// });

// $("#deleteBtn").on("click",function (){
//     let index=customer_delete_index;

//     customer_arr.splice(customer_delete_index);



//     cleanCustomerForm();
//     loadCustomerTable();
//     setCustomerId();

// });
// $("#clearBtn").on("click",function (){
//     cleanCustomerForm();
// });

// CustomerController.js

import Customer from './CustomerModel.js';

function validateCustomerId(customerId) {
    return customerId.trim() !== '';
}

function validateCustomerName(customerName) {
    return /^[A-Za-z\s]+$/.test(customerName) && customerName.trim() !== '';
}

function validateCustomerAddress(customerAddress) {
    return customerAddress.trim() !== '';
}

function validateCustomerEmail(customerEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(customerEmail);
}

function validateCustomerMobile(customerMobile) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(customerMobile);
}

function clearForm() {
    document.getElementById('customerForm').reset();
    clearValidationErrors();
}

function clearValidationErrors() {
    document.querySelectorAll('.error-message').forEach(elem => elem.remove());
}

function displayValidationError(element, message) {
    const errorElem = document.createElement('span');
    errorElem.classList.add('error-message', 'text-danger');
    errorElem.textContent = message;
    element.parentNode.appendChild(errorElem);
}

function validateForm() {
    clearValidationErrors();
    const customerId = document.getElementById('customerId');
    const customerName = document.getElementById('customerName');
    const customerAddress = document.getElementById('customerAddress');
    const customerEmail = document.getElementById('customerEmail');
    const customerMobile = document.getElementById('customerMobile');

    let isValid = true;

    if (!validateCustomerId(customerId.value)) {
        displayValidationError(customerId, 'Customer ID is required.');
        isValid = false;
    }
    if (!validateCustomerName(customerName.value)) {
        displayValidationError(customerName, 'Name must contain only letters.');
        isValid = false;
    }
    if (!validateCustomerAddress(customerAddress.value)) {
        displayValidationError(customerAddress, 'Address is required.');
        isValid = false;
    }
    if (!validateCustomerEmail(customerEmail.value)) {
        displayValidationError(customerEmail, 'Invalid email format.');
        isValid = false;
    }
    if (!validateCustomerMobile(customerMobile.value)) {
        displayValidationError(customerMobile, 'Mobile number must be 10 digits.');
        isValid = false;
    }

    return isValid;
}

function saveCustomer() {
    if (!validateForm()) return;

    const customer = new Customer(
        document.getElementById('customerId').value,
        document.getElementById('customerName').value,
        document.getElementById('customerAddress').value,
        document.getElementById('customerEmail').value,
        document.getElementById('customerMobile').value
    );

    Customer.saveCustomer(customer);
    loadCustomers();
    clearForm();
}

function deleteCustomer() {
    const customerId = document.getElementById('customerId').value;
    Customer.deleteCustomerById(customerId);
    loadCustomers();
    clearForm();
}

function searchCustomer() {
    const customerId = document.getElementById('customerId').value;
    const customer = Customer.getCustomerById(customerId);

    if (customer) {
        document.getElementById('customerName').value = customer.customerName;
        document.getElementById('customerAddress').value = customer.customerAddress;
        document.getElementById('customerEmail').value = customer.customerEmail;
        document.getElementById('customerMobile').value = customer.customerMobile;
    } else {
        alert('Customer not found');
    }
}

function updateCustomer() {
    if (!validateForm()) return;

    const customer = new Customer(
        document.getElementById('customerId').value,
        document.getElementById('customerName').value,
        document.getElementById('customerAddress').value,
        document.getElementById('customerEmail').value,
        document.getElementById('customerMobile').value
    );

    Customer.updateCustomer(customer);
    loadCustomers();
    clearForm();
}

function loadCustomers() {
    const customerTableBody = document.getElementById('customerTableBody');
    customerTableBody.innerHTML = ''; 

    const customers = Customer.getAllCustomers();
    customers.forEach((customer) => {
        const row = `<tr>
            <td>${customer.customerId}</td>
            <td>${customer.customerName}</td>
            <td>${customer.customerAddress}</td>
            <td>${customer.customerEmail}</td>
            <td>${customer.customerMobile}</td>
        </tr>`;
        customerTableBody.innerHTML += row;
    });
}

// Event listeners
document.getElementById('saveBtn').addEventListener('click', saveCustomer);
document.getElementById('deleteBtn').addEventListener('click', deleteCustomer);
document.getElementById('searchBtn').addEventListener('click', searchCustomer);
document.getElementById('clearBtn').addEventListener('click', clearForm);
document.getElementById('updateBtn').addEventListener('click', updateCustomer);
document.getElementById('getAllBtn').addEventListener('click', loadCustomers);

// Load customers on page load
document.addEventListener('DOMContentLoaded', loadCustomers);
