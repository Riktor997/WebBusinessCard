import axios from 'axios';
const url = "https://business-api-638w.onrender.com";
// const url = "http://localhost:8080";   
const axiosHeaders = {
    "ngrok-skip-browser-warning": "ngrok-skip-browser-warning",
}

export class EmployeesApi {

    private urlLogo: string = '';

    async GetAllEmployees() {

        try {

            const res = await axios.get(url + '/users', {
                headers: axiosHeaders,
            });
            const companyData = res.data;
            console.log('in context', companyData);
            return companyData;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async GetDataEmployeesById(id: string) {

        try {

            const res = await axios.get(`${url}/users/${id}`, {
                headers: axiosHeaders,
            });

            const companyDataById = res.data;
            return companyDataById;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async UploadProfile(Logo: File) {

        const companyIdString = localStorage.getItem('LoggedIn');

        if (companyIdString !== null) {

            const companyId = JSON.parse(companyIdString);
            const folderName = 'logo';
            const formData = new FormData();

            formData.append('file', Logo);
            formData.append('folder', folderName);
            formData.append('uid', companyId.id);

            try {


                const res = await fetch(`${url}/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {

                    const data = await res.json();
                    this.setUrlProfile(data.Url)
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


        } else {
            console.log('Company ID is not available');
        }
    }

    async AddDataEmployee(
        firstnameValue : string ,
        lastnameValue  : string ,
        emailValue : string ,
        passwordValue : string ,
        genderValue  : string ,
        phoneValue  : string ,
        subdistrictValue  : string ,
        districtValue  : string ,
        provinceValue  : string ,
        countryValue  : string ,
        companyBranchValue  : string ,
        departmentValue  : string ,
        positionValue  : string ,
        startworkValue  : string) {

        const dataEmployee = {
            firstname : firstnameValue , 
            lastname : lastnameValue ,
            email: emailValue,
            password: passwordValue,
            gender: genderValue,
            phone: phoneValue,
            subdistrict: subdistrictValue,
            district: districtValue,
            province: provinceValue,
            country: countryValue , 
            companyBranch: companyBranchValue,
            department:departmentValue,
            position: positionValue,
            startwork: startworkValue
        }

        try {

            const res = await fetch(`${url}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataEmployee)
            });

            console.log('in context', res.status);
            return res.status;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async DeleteEmployee(companyId: string) {

        try {

            const res = await fetch(`${url}/companies/${companyId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: companyId
            });
            return res.status;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    setUrlProfile = (url: string) => {
        this.urlLogo = url;
        return this.urlLogo;
    }
}