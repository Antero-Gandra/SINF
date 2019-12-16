const apiHost = 'http://localhost:9000';

export function generateSalesOrderRequest (orderId){
    return fetch(apiHost + "/generate/salesOrder", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify({
            "orderId": orderId,
        })
    });
}

export function generatePurchaseInvoiceRequest (orderId){
    return fetch(apiHost + "/generate/purchaseInvoice", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify({
            "orderId": orderId,
        })
    });
}

export function generateKeyRequest (brandId){
    return fetch(apiHost + "/generate/key", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify({
            "brandId": brandId,
        })
    });
}

export function syncronizeCustomer(tenant, organization){
    return fetch(apiHost + "/sync/customer?" + "tenant=" + tenant + "&organization=" + organization, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        }
    });
}

export function syncronizeSupplier(tenant, organization){
    return fetch(apiHost + "/sync/supplier?" + "tenant=" + tenant + "&organization=" + organization, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        } 
    });
}

export function fetchSubscriptionsCustomer(tenant, organization, company){
    return fetch(apiHost + "/subscriptions/get/all/customer?" + "tenant=" + tenant + "&organization=" + organization + "&company=" + company, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        } 
    });
}

export function fetchSubscriptionsSupplier(tenant, organization, company){
    return fetch(apiHost + "/subscriptions/get/all/supplier?" + "tenant=" + tenant + "&organization=" + organization + "&company=" + company, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        } 
    });
}

export function getBrands(supplierId){
    return fetch(apiHost + "/brands/get/all/supplier/" + supplierId, {
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