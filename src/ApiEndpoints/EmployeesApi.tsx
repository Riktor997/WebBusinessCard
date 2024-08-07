import axios from 'axios';
const url = "https://business-api-638w.onrender.com";
// const url = "http://localhost:8080"; 
import { GetEmployeeById } from '@/Model/GetEmployeeById';  


export class EmployeesApi {

    async GetAllEmployees() {

        try {
            const loggedInData = localStorage.getItem("LoggedIn");

            if (loggedInData) {

                const parsedData = JSON.parse(loggedInData);
                const CompanyId = parsedData.companyId;

                if (CompanyId) {
                    
                    const endpoint = `${url}/user/by-company/${CompanyId}`;
                    const res = await axios.get(endpoint);
                    const EmployeesData: GetEmployeeById[] = res.data;
                    
                    const filterEmployees = EmployeesData.filter(employee => {
                        return employee.department.name !== 'HR';
                    });                    
                    
                    return filterEmployees;
                }
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async GetDatadataemployeesById(id: string) {

        try {

            const res = await axios.get(`${url}/user/${id}`);

            const companyDataById = res.data;
            return companyDataById;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async GetAllDataemployeesByCompanyId(CompanyId: string) {

        try {

            const res = await axios.get(`${url}/user/by-company/${CompanyId}`);

            const employeesData = res.data;
            return employeesData;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async UploadProfile(Image: File, uid: string, folderName: string, collection: string) {


        console.log("image", Image);
        console.log("uid", uid);
        console.log("collection", collection);
        console.log("foldername", folderName);

        const formData = new FormData();

        formData.append('file', Image);
        formData.append('folder', folderName);
        formData.append('collection', collection)
        formData.append('uid', uid);

        try {

            const res = await fetch(`${url}/upload-image`, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {

                const data = await res.json();
                console.log(data);
                console.log('Upload logo successful:', res.status);
                return res.status;
            }
            else {
                console.log('in context upload logo', res.status);
                return res.status;
            }


        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async AddDataEmployee(
        firstnameValue: string,
        lastnameValue: string,
        emailValue: string,
        passwordValue: string,
        genderValue: string,
        phoneValue: string,
        subdistrictValue: string,
        districtValue: string,
        provinceValue: string,
        countryValue: string,
        companyBranchValue: string,
        departmentValue: string,
        positionValue: string,
        startworkValue: string,
        birthdateValue: string) {

        const dataEmployee = {
            firstname: firstnameValue,
            lastname: lastnameValue,
            email: emailValue,
            password: passwordValue,
            gender: genderValue,
            phone: phoneValue,
            subdistrict: subdistrictValue,
            district: districtValue,
            province: provinceValue,
            country: countryValue,
            companybranch: companyBranchValue,
            department: departmentValue,
            position: positionValue,
            startwork: startworkValue,
            birthdate: birthdateValue
        }
        try {

            const endpoint = `${url}/users`;
            const res = await axios.post(endpoint, dataEmployee);
            return res.data.userId;

        } catch (error) {
            console.error(error);
            return '0';
        }
    }

    async DeleteEmployee(EmployeeId: string) {

        try {

            const res = await axios.delete(`${url}/users/${EmployeeId}`);
            return res.status;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateDataEmployee(firstnameElement: string, lastnameElement: string, positionElement: string, 
        genderElement: string,birthdayElement: string, startworkElement: string, subdistrictElement: 
        string, districtElement: string,provinceElement: string, countryElement: string, telElement: string, 
        emailElement: string,branchElement: string, departmentElement: string, passwordElement: string, 
        HRId: string
    ) {

        try {

            const dataHr = {
                firstname: firstnameElement,
                lastname: lastnameElement,
                email: emailElement,
                password: passwordElement,
                gender: genderElement,
                birthdate: birthdayElement,
                companybranch: branchElement,
                department: departmentElement,
                phone: telElement,
                position: positionElement,
                startwork: startworkElement,
                subdistrict: subdistrictElement,
                district: districtElement,
                province: provinceElement,
                country: countryElement,

            }

            const res = await axios.put(`${url}/users/${HRId}`, dataHr);
            return res.status;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}