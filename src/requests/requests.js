const apiHost = 'http://localhost:9000';

export function getToken(){
    return fetch(apiHost + "/dev/token", {
        method: 'GET',
        headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
        }
    });
}

export function syncronizeCustomer(tenant, organization){
    return fetch(apiHost + "/dev/sync/customer" + "?" + "tenant=" + tenant + "&" + "organization=" + organization, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        }
    });
}

export function syncronizeSupplier(tenant, organization){
    return fetch(apiHost + "/dev/sync/supplier" + "?" + "tenant=" + tenant + "&" + "organization=" + organization, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        } 
    });
}

export function login(tenant, organization, company, userType){
    if(userType === "Customer"){
        return fetch(apiHost + "/user/customer/add", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify({
                "tenant": tenant,
                "organization": organization,
                "company": company
            })          
        });
    }

    if(userType === "Supplier"){
        return fetch(apiHost + "/user/supplier/add", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify({
                "tenant": tenant,
                "organization": organization,
                "company": company
            })        
        });
    }
}